import fs from "node:fs";
import path from "node:path";
import { getCollection, type CollectionEntry } from "astro:content";

export type AnimationEntry = CollectionEntry<"animations">;
export type PreviewFit = "contain" | "cover";

const LIBRARY_BASE = "/design/animations/library";
const PREVIEW_MEDIA_ROOT = path.join(
  process.cwd(),
  "media/animations/previews",
);
const PUBLIC_PREVIEWS_ROOT = path.join(
  process.cwd(),
  "public/animation-previews",
);

function hasAnyMp4InDir(dir: string): boolean {
  if (!fs.existsSync(dir)) return false;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (hasAnyMp4InDir(full)) return true;
    } else if (entry.name.toLowerCase().endsWith(".mp4")) {
      return true;
    }
  }

  return false;
}

/** Gallery is local-only unless preview media exists or env forces enable. */
export function isAnimationLibraryEnabled(): boolean {
  const env = import.meta.env.PUBLIC_ANIMATION_LIBRARY_ENABLED;
  if (env === "true") return true;
  if (env === "false") return false;
  return (
    hasAnyMp4InDir(PREVIEW_MEDIA_ROOT) ||
    hasAnyMp4InDir(PUBLIC_PREVIEWS_ROOT)
  );
}

/** MWG previews are 16:9 in a 16:10 box; Osmo previews are typically 16:10. */
export function getPreviewFit(entry: AnimationEntry): PreviewFit {
  if (entry.data.sourceUrl?.includes("madewithgsap.com")) {
    return "cover";
  }
  return "contain";
}

export function getAnimationPath(entry: AnimationEntry): string {
  return `${LIBRARY_BASE}/${entry.data.slug}`;
}

function getPreviewRelativePath(entry: AnimationEntry, filename: string): string {
  const file = filename.replace(/^\.\//, "");
  const dir = entry.id.includes("/")
    ? entry.id.slice(0, entry.id.lastIndexOf("/"))
    : "";
  return dir ? `${dir}/${file}` : file;
}

function getPreviewAssetUrl(entry: AnimationEntry, filename: string): string {
  return `/animation-previews/${getPreviewRelativePath(entry, filename)}`;
}

function resolvePreviewFile(relativePath: string): string | null {
  const media = path.join(PREVIEW_MEDIA_ROOT, relativePath);
  if (fs.existsSync(media)) return media;
  const pub = path.join(PUBLIC_PREVIEWS_ROOT, relativePath);
  if (fs.existsSync(pub)) return pub;
  return null;
}

function getPreviewAssetPath(entry: AnimationEntry, filename: string): string {
  const relative = getPreviewRelativePath(entry, filename);
  return (
    resolvePreviewFile(relative) ??
    path.join(PUBLIC_PREVIEWS_ROOT, relative)
  );
}

/** Public URL for preview mp4 (served from public/animation-previews). */
export function getPreviewVideoUrl(entry: AnimationEntry): string {
  return getPreviewAssetUrl(entry, entry.data.previewVideo);
}

/** Public URL for gallery poster JPG (same path as video, .jpg extension). */
export function getPreviewPosterUrl(entry: AnimationEntry): string {
  return getPreviewAssetUrl(
    entry,
    entry.data.previewVideo.replace(/\.mp4$/i, ".jpg"),
  );
}

/** Whether the preview mp4 exists in local media or public mount. */
export function hasPreviewVideo(entry: AnimationEntry): boolean {
  const relative = getPreviewRelativePath(entry, entry.data.previewVideo);
  return resolvePreviewFile(relative) !== null;
}

/** Whether a gallery poster jpg exists in local media or public mount. */
export function hasPreviewPoster(entry: AnimationEntry): boolean {
  const relative = getPreviewRelativePath(
    entry,
    entry.data.previewVideo.replace(/\.mp4$/i, ".jpg"),
  );
  return resolvePreviewFile(relative) !== null;
}

export async function getPublishedAnimations(): Promise<AnimationEntry[]> {
  if (!isAnimationLibraryEnabled()) return [];

  const all = await getCollection("animations");
  return all
    .filter((e) => e.data.published)
    .sort((a, b) => b.data.order - a.data.order);
}

export async function getAllAnimationsForSearch(): Promise<AnimationEntry[]> {
  return getPublishedAnimations();
}
