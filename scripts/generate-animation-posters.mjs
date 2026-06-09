#!/usr/bin/env node
/**
 * Generate gallery poster JPGs alongside preview mp4s.
 * Uses ffmpeg on local mp4s; falls back to Osmo still images when no mp4 exists.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import {
  animationLibraryDir,
  osmoArchiveDir,
  previewMediaDir,
} from "./lib/animation-media-paths.mjs";

const previewsDir = previewMediaDir;
const osmoDir = osmoArchiveDir;
const libraryDir = animationLibraryDir;

const IMAGE_URL =
  /!\[[^\]]*\]\((https?:\/\/[^)]+\.(?:avif|jpe?g|webp|png)(?:\?[^)]*)?)\)/i;

function walkFiles(dir, ext, prefix = "") {
  /** @type {string[]} */
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(path.join(dir, prefix), {
    withFileTypes: true,
  })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...walkFiles(dir, ext, rel));
    else if (entry.name.endsWith(ext)) files.push(rel);
  }
  return files;
}

function posterPathForMp4(mp4Rel) {
  return mp4Rel.replace(/\.mp4$/i, ".jpg");
}

function isFresh(poster, source) {
  if (!fs.existsSync(poster)) return false;
  return fs.statSync(poster).mtimeMs >= fs.statSync(source).mtimeMs;
}

function extractOsmoImageUrl(slug) {
  const md = path.join(osmoDir, `${slug}.md`);
  if (!fs.existsSync(md)) return null;
  const raw = fs.readFileSync(md, "utf8");
  const match = raw.match(IMAGE_URL);
  return match?.[1] ?? null;
}

function ffmpegFrame(input, output) {
  execFileSync(
    "ffmpeg",
    ["-y", "-i", input, "-frames:v", "1", "-q:v", "2", output],
    { stdio: "pipe" },
  );
}

function download(url, dest) {
  const res = fetch(url);
  return res.then(async (r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    fs.writeFileSync(dest, buf);
  });
}

async function ensurePosterFromMp4(mp4Rel) {
  const mp4Path = path.join(previewsDir, mp4Rel);
  const jpgRel = posterPathForMp4(mp4Rel);
  const jpgPath = path.join(previewsDir, jpgRel);
  fs.mkdirSync(path.dirname(jpgPath), { recursive: true });

  if (isFresh(jpgPath, mp4Path)) {
    return { slug: jpgRel, status: "skip" };
  }

  ffmpegFrame(mp4Path, jpgPath);
  return { slug: jpgRel, status: "mp4" };
}

async function ensurePosterFromOsmo(slug) {
  const baseName = path.basename(slug);
  const jpgRel =
    path.dirname(slug) === "."
      ? `${baseName}.jpg`
      : `${path.dirname(slug)}/${baseName}.jpg`;
  const jpgPath = path.join(previewsDir, jpgRel);

  if (fs.existsSync(jpgPath)) return { slug: jpgRel, status: "skip" };

  const imageUrl = extractOsmoImageUrl(slug);
  if (!imageUrl) return { slug, status: "missing" };

  fs.mkdirSync(path.dirname(jpgPath), { recursive: true });
  const tmp = path.join(previewsDir, `.tmp-${baseName}${path.extname(new URL(imageUrl).pathname) || ".avif"}`);

  try {
    await download(imageUrl, tmp);
    ffmpegFrame(tmp, jpgPath);
    return { slug: jpgRel, status: "osmo" };
  } finally {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }
}

async function main() {
  const mp4s = walkFiles(previewsDir, ".mp4");
  let fromMp4 = 0;
  let skipped = 0;

  for (const mp4Rel of mp4s) {
    const { status } = await ensurePosterFromMp4(mp4Rel);
    if (status === "mp4") fromMp4++;
    else skipped++;
    console.log(`${status === "skip" ? "·" : "✓"} ${posterPathForMp4(mp4Rel)} (${status})`);
  }

  const librarySlugs = walkFiles(libraryDir, ".md").map((f) =>
    f.replace(/\.md$/, ""),
  );
  let fromOsmo = 0;
  let missing = 0;

  for (const slug of librarySlugs) {
    const baseName = path.basename(slug);
    const mp4A = path.join(previewsDir, `${slug}.mp4`);
    const mp4B = path.join(previewsDir, path.dirname(slug), `${baseName}.mp4`);
    if (fs.existsSync(mp4A) || fs.existsSync(mp4B)) continue;

    const { status } = await ensurePosterFromOsmo(slug);
    if (status === "osmo") {
      fromOsmo++;
      console.log(`✓ ${slug}.jpg (osmo)`);
    } else if (status === "missing") {
      missing++;
    }
  }

  console.log(
    `\nDone. ${fromMp4} from mp4, ${fromOsmo} from Osmo stills, ${skipped} up to date, ${missing} without poster.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
