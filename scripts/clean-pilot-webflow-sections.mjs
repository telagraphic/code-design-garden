#!/usr/bin/env node
/**
 * Normalize animation library markdown: drop Webflow section titles/blurbs,
 * use Scripts / HTML / Javascript / CSS headings, strip Creator Credits.
 */
import fs from "node:fs";
import path from "node:path";
import { animationLibraryDir } from "./lib/animation-media-paths.mjs";

const libraryDir = animationLibraryDir;

const HEADING_REPLACE = {
  "### External Scripts in Webflow": "### Scripts",
  "### Copy structure to Webflow": "### HTML",
  "### Custom Javascript in Webflow": "### Javascript",
  "### Custom JavaScript in Webflow": "### Javascript",
  "### Custom CSS in Webflow": "### CSS",
};

const SKIP_LINE = [
  /^Make sure to always put the External Scripts/i,
  /^In the video below we described how you can copy/i,
  /^In this video, Ilja gives you some guidance/i,
  /^Curious about where to put custom CSS/i,
];

const STANDALONE_LANG = /^(HTML|CSS|Javascript|JavaScript|Scripts)$/i;

function shouldSkipLine(trimmed) {
  if (!trimmed) return false;
  if (STANDALONE_LANG.test(trimmed)) return true;
  return SKIP_LINE.some((re) => re.test(trimmed));
}

function stripCreatorCredits(text) {
  let out = text.replace(/\n*#{2,3}\s+Creator Credits[\s\S]*$/i, "");
  out = out.replace(/\n*Resource details\n[\s\S]*$/i, "");
  return out.trim();
}

function cleanBody(body) {
  const lines = body.split("\n");
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (/^#{2,3}\s+Creator Credits/i.test(trimmed)) break;

    const replaced = HEADING_REPLACE[trimmed];

    if (replaced) {
      out.push(replaced);
      i++;
      while (i < lines.length) {
        const t = lines[i].trim();
        if (t.startsWith("```") || t.startsWith("#")) break;
        if (shouldSkipLine(t)) {
          i++;
          continue;
        }
        if (t === "") {
          i++;
          continue;
        }
        break;
      }
      continue;
    }

    if (shouldSkipLine(trimmed)) continue;
    out.push(lines[i]);
  }

  return stripCreatorCredits(
    removeEmptyLangHeadings(out.join("\n").replace(/\n{3,}/g, "\n\n").trim()),
  );
}

/** Drop ### Scripts / ### Javascript when the section has no fenced code. */
function removeEmptyLangHeadings(text) {
  const lines = text.split("\n");
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === "### Scripts" || trimmed === "### Javascript") {
      let j = i + 1;
      let hasCode = false;
      while (j < lines.length) {
        const t = lines[j].trim();
        if (t.startsWith("###")) break;
        if (t.startsWith("```")) hasCode = true;
        j++;
      }
      if (!hasCode) continue;
    }
    out.push(lines[i]);
  }

  return out.join("\n");
}

function walkMd(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) files.push(...walkMd(full));
    else if (name.name.endsWith(".md")) files.push(full);
  }
  return files;
}

for (const file of walkMd(libraryDir)) {
  const raw = fs.readFileSync(file, "utf8");
  if (!raw.startsWith("---")) continue;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) continue;
  const fm = raw.slice(0, end + 4);
  const body = raw.slice(end + 4).replace(/^\n/, "");
  const cleaned = cleanBody(body);
  fs.writeFileSync(file, `${fm}\n${cleaned}\n`);
  console.log(`✓ ${path.relative(libraryDir, file)}`);
}

console.log("\nDone.");
