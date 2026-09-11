/** @returns {string} Bunny Stream pull zone hostname, no trailing slash. */
export function getBunnyVideoBaseUrl() {
  return String(
    import.meta.env?.PUBLIC_BUNNY_VIDEO_BASE_URL ??
      process.env.PUBLIC_BUNNY_VIDEO_BASE_URL ??
      "",
  ).replace(/\/$/, "");
}

/** Default MP4 rendition filename on Bunny Stream. */
export const BUNNY_MP4_RENDITION = "play_720p.mp4";

/**
 * @param {string} name Bunny video ID or path segment under the pull zone.
 * @returns {{ hls: string; mp4: string } | null}
 */
export function getBunnyVideoUrls(name) {
  const base = getBunnyVideoBaseUrl();
  if (!base || !name) return null;

  const id = name.replace(/^\/|\/$/g, "");
  return {
    hls: `${base}/${id}/playlist.m3u8`,
    mp4: `${base}/${id}/${BUNNY_MP4_RENDITION}`,
  };
}
