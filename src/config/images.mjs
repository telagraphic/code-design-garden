/** @returns {string} Bunny pull zone hostname for static images, no trailing slash. */
export function getBunnyImageBaseUrl() {
  return String(
    import.meta.env?.PUBLIC_BUNNY_IMAGE_BASE_URL ??
      process.env.PUBLIC_BUNNY_IMAGE_BASE_URL ??
      "",
  ).replace(/\/$/, "");
}

/**
 * @param {string} imagePath Path under the pull zone, e.g. `blog/gsap/grid.avif`.
 * @returns {string | null}
 */
export function getBunnyImageUrl(imagePath) {
  const base = getBunnyImageBaseUrl();
  if (!base || !imagePath) return null;

  const path = imagePath.replace(/^\/+/, "");
  return `${base}/${path}`;
}
