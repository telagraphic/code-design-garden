#!/usr/bin/env node
/**
 * Copy src/styles → css/ for static HTML prototypes.
 * Source of truth: src/styles/ (excluding global.css and command-menu.css).
 */
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src/styles");
const destDir = path.join(root, "css");

const files = [
  "tokens.css",
  "fonts.css",
  "reset.css",
  "layout.css",
  "components.css",
  "prose.css",
  "blocks.css",
];

await mkdir(destDir, { recursive: true });

for (const file of files) {
  await copyFile(path.join(srcDir, file), path.join(destDir, file));
  console.log(`synced ${file}`);
}
