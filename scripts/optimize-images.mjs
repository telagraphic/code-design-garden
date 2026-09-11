#!/usr/bin/env node
/**
 * Optimize images from media/images/in → media/images/out.
 * Opaque rasters → AVIF; images with alpha → WebP; SVG → svgo.
 * Override with --format webp|avif.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { optimize as optimizeSvg } from "svgo";
import {
  imageInputDir,
  imageManifestPath,
  imageOutputDir,
} from "./lib/image-media-paths.mjs";

const MAX_EDGE = 2560;
const RASTER_EXT = new Set([
  ".avif",
  ".bmp",
  ".gif",
  ".heic",
  ".heif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);
const SVG_EXT = ".svg";

function parseArgs(argv) {
  const force = argv.includes("--force");
  /** @type {"webp" | "avif" | null} */
  let format = null;

  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--" || arg === "--force") continue;
    if (arg === "--format" || arg === "-f") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) {
        throw new Error("--format requires webp or avif");
      }
      format = parseFormatValue(next);
      i++;
      continue;
    }
    if (arg.startsWith("--format=")) {
      format = parseFormatValue(arg.slice("--format=".length));
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    positional.push(arg);
  }

  const filter = positional[0] ?? null;
  return { force, format, filter };
}

/** @param {string} value */
function parseFormatValue(value) {
  const normalized = value.toLowerCase();
  if (normalized === "webp" || normalized === "avif") return normalized;
  throw new Error(`Invalid format "${value}". Use webp or avif.`);
}

function walkFiles(dir, prefix = "") {
  /** @type {string[]} */
  const files = [];
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(path.join(dir, prefix), {
    withFileTypes: true,
  })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...walkFiles(dir, rel));
      continue;
    }
    if (entry.name.startsWith(".")) continue;
    files.push(rel);
  }
  return files;
}

function isFresh(outputPath, inputPath) {
  if (!fs.existsSync(outputPath)) return false;
  return fs.statSync(outputPath).mtimeMs >= fs.statSync(inputPath).mtimeMs;
}

function resolveRasterFormat(hasAlpha, formatOverride) {
  if (formatOverride) return formatOverride;
  return hasAlpha ? "webp" : "avif";
}

function outputExtForInput(inputRel, hasAlpha, formatOverride) {
  const ext = path.extname(inputRel).toLowerCase();
  if (ext === SVG_EXT) return SVG_EXT;
  const format = resolveRasterFormat(hasAlpha, formatOverride);
  return `.${format}`;
}

function outputRelForInput(inputRel, hasAlpha, formatOverride) {
  const base = inputRel.slice(0, -path.extname(inputRel).length);
  return `${base}${outputExtForInput(inputRel, hasAlpha, formatOverride)}`;
}

async function hasAlphaChannel(inputPath) {
  const { channels, hasAlpha } = await sharp(inputPath).metadata();
  if (typeof hasAlpha === "boolean") return hasAlpha;
  return channels === 4;
}

async function resizePipeline(inputPath) {
  const image = sharp(inputPath, { animated: false });
  const meta = await image.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const longest = Math.max(width, height);

  if (longest <= MAX_EDGE) return image;

  return image.resize({
    width: width >= height ? MAX_EDGE : undefined,
    height: height > width ? MAX_EDGE : undefined,
    fit: "inside",
    withoutEnlargement: true,
  });
}

async function encodeRaster(inputPath, outputPath, format) {
  const pipeline = await resizePipeline(inputPath);
  const meta = await pipeline.metadata();

  if (format === "webp") {
    await pipeline
      .webp({ quality: 80, lossless: false, effort: 6 })
      .toFile(outputPath);
    return { format: "webp", width: meta.width, height: meta.height };
  }

  await pipeline
    .avif({ quality: 50, effort: 6 })
    .toFile(outputPath);
  return { format: "avif", width: meta.width, height: meta.height };
}

function optimizeSvgFile(inputPath, outputPath) {
  const source = fs.readFileSync(inputPath, "utf8");
  const result = optimizeSvg(source, {
    path: inputPath,
    multipass: true,
  });
  fs.writeFileSync(outputPath, result.data);
  return { format: "svg" };
}

async function shouldKeepExistingOutput(inputPath, outputPath, format) {
  if (!fs.existsSync(outputPath)) return false;
  const bytesIn = fs.statSync(inputPath).size;
  const bytesOut = fs.statSync(outputPath).size;
  if (bytesOut >= bytesIn) return true;

  const tmp = `${outputPath}.tmp`;
  try {
    if (path.extname(outputPath).toLowerCase() === SVG_EXT) {
      optimizeSvgFile(inputPath, tmp);
    } else {
      await encodeRaster(inputPath, tmp, format);
    }
    const tmpSize = fs.statSync(tmp).size;
    if (tmpSize >= bytesOut) {
      fs.unlinkSync(tmp);
      return true;
    }
    fs.renameSync(tmp, outputPath);
    return true;
  } catch {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    return false;
  }
}

async function processFile(inputRel, { force, format: formatOverride }) {
  const inputPath = path.join(imageInputDir, inputRel);
  const ext = path.extname(inputRel).toLowerCase();

  if (!RASTER_EXT.has(ext) && ext !== SVG_EXT) {
    return { inputRel, status: "unsupported" };
  }

  let hasAlpha = false;
  if (RASTER_EXT.has(ext)) {
    hasAlpha = await hasAlphaChannel(inputPath);
  }

  const rasterFormat = resolveRasterFormat(hasAlpha, formatOverride);
  const outputRel = outputRelForInput(inputRel, hasAlpha, formatOverride);
  const outputPath = path.join(imageOutputDir, outputRel);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  if (!force && isFresh(outputPath, inputPath)) {
    const meta = await sharp(outputPath).metadata().catch(() => ({}));
    return {
      inputRel,
      outputRel,
      status: "skip",
      bytesIn: fs.statSync(inputPath).size,
      bytesOut: fs.statSync(outputPath).size,
      format: path.extname(outputRel).slice(1),
      width: meta.width,
      height: meta.height,
    };
  }

  const bytesIn = fs.statSync(inputPath).size;

  if (
    !force &&
    (await shouldKeepExistingOutput(inputPath, outputPath, rasterFormat))
  ) {
    const meta = await sharp(outputPath).metadata().catch(() => ({}));
    return {
      inputRel,
      outputRel,
      status: "skip",
      bytesIn,
      bytesOut: fs.statSync(outputPath).size,
      format: path.extname(outputRel).slice(1),
      width: meta.width,
      height: meta.height,
    };
  }

  let encodeMeta;
  if (ext === SVG_EXT) {
    encodeMeta = optimizeSvgFile(inputPath, outputPath);
  } else {
    encodeMeta = await encodeRaster(inputPath, outputPath, rasterFormat);
  }

  const outMeta =
    encodeMeta.format === "svg"
      ? {}
      : await sharp(outputPath).metadata();
  const bytesOut = fs.statSync(outputPath).size;

  return {
    inputRel,
    outputRel,
    status: "ok",
    bytesIn,
    bytesOut,
    format: encodeMeta.format,
    width: outMeta.width ?? encodeMeta.width,
    height: outMeta.height ?? encodeMeta.height,
  };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function savingsPct(bytesIn, bytesOut) {
  if (!bytesIn) return 0;
  return Math.round((1 - bytesOut / bytesIn) * 100);
}

async function main() {
  const { force, format, filter } = parseArgs(process.argv.slice(2));

  if (format) {
    console.log(`Format override: ${format}`);
  }

  if (!fs.existsSync(imageInputDir)) {
    fs.mkdirSync(imageInputDir, { recursive: true });
  }
  if (!fs.existsSync(imageOutputDir)) {
    fs.mkdirSync(imageOutputDir, { recursive: true });
  }

  let inputs = walkFiles(imageInputDir);
  if (filter) {
    inputs = inputs.filter(
      (rel) => rel === filter || rel.startsWith(`${filter}/`),
    );
  }

  if (inputs.length === 0) {
    console.log(`No images found in ${imageInputDir}`);
    return;
  }

  /** @type {Record<string, object>} */
  const manifest = fs.existsSync(imageManifestPath)
    ? JSON.parse(fs.readFileSync(imageManifestPath, "utf8"))
    : {};

  let optimized = 0;
  let skipped = 0;
  let unsupported = 0;

  for (const inputRel of inputs) {
    const result = await processFile(inputRel, { force, format });
    const { status } = result;

    if (status === "unsupported") {
      unsupported++;
      console.log(`? ${inputRel} (unsupported)`);
      continue;
    }

    if (status === "skip") {
      skipped++;
      console.log(`· ${result.outputRel} (skip)`);
    } else {
      optimized++;
      const pct = savingsPct(result.bytesIn, result.bytesOut);
      console.log(
        `✓ ${result.outputRel} (${formatBytes(result.bytesIn)} → ${formatBytes(result.bytesOut)}, −${pct}%)`,
      );
    }

    manifest[result.inputRel] = {
      input: result.inputRel,
      output: result.outputRel,
      format: result.format,
      bytesIn: result.bytesIn,
      bytesOut: result.bytesOut,
      width: result.width,
      height: result.height,
      updatedAt: new Date().toISOString(),
    };
  }

  fs.writeFileSync(imageManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `\nDone. ${optimized} optimized, ${skipped} up to date, ${unsupported} unsupported.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
