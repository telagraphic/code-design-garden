import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.join(__dirname, "../..");

/** Canonical store for gallery mp4 + jpg (gitignored). */
export const previewMediaDir = path.join(
  repoRoot,
  "media/animations/previews",
);

/** Runtime serve path — symlink or Docker mount to previewMediaDir. */
export const publicPreviewsDir = path.join(
  repoRoot,
  "public/animation-previews",
);

/** Canonical animation library markdown (Astro `animations` collection). */
export const animationLibraryDir = path.join(
  repoRoot,
  "src/content/design/animation-library",
);

/** Archived Osmo/MWG sources (outside repo). Override via env. */
export const osmoArchiveDir =
  process.env.ANIMATION_OSMO_ARCHIVE ??
  path.join(process.env.HOME ?? "", "Archive/code-design-garden-osmo");

export const mwgArchiveDir =
  process.env.ANIMATION_MWG_ARCHIVE ??
  path.join(process.env.HOME ?? "", "Archive/code-design-garden-mwg");
