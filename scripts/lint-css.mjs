#!/usr/bin/env node
/**
 * Bundle src/styles/global.css via postcss-import, then lint the flattened output
 * so cross-file duplicate selectors are caught.
 */
import { execSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import postcssImport from "postcss-import";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entry = path.join(root, "src/styles/global.css");
const bundleDir = path.join(root, ".stylelint");
const bundlePath = path.join(bundleDir, "bundle.css");

const css = await readFile(entry, "utf8");
const result = await postcss([postcssImport()]).process(css, { from: entry });

await mkdir(bundleDir, { recursive: true });
await writeFile(bundlePath, result.css);

execSync(`npx stylelint "${bundlePath}"`, {
  cwd: root,
  stdio: "inherit",
});

console.log("CSS lint passed (bundled from src/styles/global.css)");
