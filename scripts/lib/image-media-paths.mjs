import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.join(__dirname, "../..");

/** Drop raw images here (gitignored). */
export const imageInputDir = path.join(repoRoot, "media/images/in");

/** Optimized outputs ready for Bunny upload (gitignored). */
export const imageOutputDir = path.join(repoRoot, "media/images/out");

/** Sidecar manifest written after each optimize run. */
export const imageManifestPath = path.join(imageOutputDir, ".manifest.json");
