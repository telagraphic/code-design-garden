#!/usr/bin/env node
/**
 * Symlink media/animations/previews → public/animation-previews for local dev.
 */
import fs from "node:fs";
import path from "node:path";
import {
  previewMediaDir,
  publicPreviewsDir,
} from "./lib/animation-media-paths.mjs";

fs.mkdirSync(previewMediaDir, { recursive: true });

if (fs.existsSync(publicPreviewsDir)) {
  const stat = fs.lstatSync(publicPreviewsDir);
  if (stat.isSymbolicLink()) {
    fs.unlinkSync(publicPreviewsDir);
  } else if (stat.isDirectory()) {
    const entries = fs.readdirSync(publicPreviewsDir).filter(
      (name) => name !== ".gitkeep",
    );
    if (entries.length > 0) {
      console.error(
        `public/animation-previews exists and is not empty.\n` +
          `Move contents to media/animations/previews/ first, then re-run.\n` +
          `  mv public/animation-previews/* media/animations/previews/`,
      );
      process.exit(1);
    }
    const gitkeep = path.join(publicPreviewsDir, ".gitkeep");
    if (fs.existsSync(gitkeep)) fs.unlinkSync(gitkeep);
    fs.rmdirSync(publicPreviewsDir);
  } else {
    fs.unlinkSync(publicPreviewsDir);
  }
}

const target = path.relative(
  path.dirname(publicPreviewsDir),
  previewMediaDir,
);
fs.symlinkSync(target, publicPreviewsDir, "dir");
console.log(`Linked public/animation-previews → ${target}`);
