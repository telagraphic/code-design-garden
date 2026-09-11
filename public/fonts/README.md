# Web fonts (local fallback)

Astro serves `@font-face` from `FontFaces.astro`. When `PUBLIC_BUNNY_FONT_BASE_URL` is set, those URLs point at Bunny; otherwise they use `/fonts/…` from this folder.

## Upload to Bunny (same relative paths)

```
basier-circle/Basier Circle Regular.woff2
basier-circle/Basier Circle Medium.woff2
basier-circle/BasierCircle Bold.woff2
editorial-new/PPEditorialNew-Ultralight.otf
editorial-new/PPEditorialNew-Regular.otf
maple-mono/MapleMono-Regular.ttf
maple-mono/MapleMono-SemiBold.ttf
```

Example: if files live at `https://code-design-garden.b-cdn.net/fonts/basier-circle/...`, set:

```bash
PUBLIC_BUNNY_FONT_BASE_URL=https://code-design-garden.b-cdn.net/fonts
```

Only these used weights are kept in the repo for local/Docker fallbacks.
