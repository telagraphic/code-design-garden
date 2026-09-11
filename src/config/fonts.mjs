/** Bunny pull zone for web fonts, no trailing slash.
 *  e.g. https://code-design-garden.b-cdn.net/fonts
 *  Expected object keys match local paths under public/fonts/:
 *    basier-circle/Basier Circle Regular.woff2
 *    basier-circle/Basier Circle Medium.woff2
 *    basier-circle/BasierCircle Bold.woff2
 *    editorial-new/PPEditorialNew-Ultralight.woff2
 *    editorial-new/PPEditorialNew-Regular.woff2
 *    maple-mono/MapleMono-Regular.woff2
 *    maple-mono/MapleMono-SemiBold.woff2
 */
export function getBunnyFontBaseUrl() {
  return String(
    import.meta.env?.PUBLIC_BUNNY_FONT_BASE_URL ??
      process.env.PUBLIC_BUNNY_FONT_BASE_URL ??
      "",
  ).replace(/\/$/, "");
}

/** Resolve a font file to Bunny CDN or local `/fonts/…` for Docker/dev. */
export function getFontUrl(relativePath) {
  const base = getBunnyFontBaseUrl();
  const path = relativePath.replace(/^\//, "");
  if (base) return `${base}/${path}`;
  return `/fonts/${path}`;
}
