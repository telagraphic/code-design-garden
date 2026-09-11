# Web fonts (local fallback)

Astro serves `@font-face` from `FontFaces.astro`. When `PUBLIC_BUNNY_FONT_BASE_URL` is set, those URLs point at Bunny; otherwise they use `/fonts/…` from this folder.

## Upload to Bunny (same relative paths)

```
basier-circle/Basier Circle Regular.woff2
basier-circle/Basier Circle Medium.woff2
basier-circle/BasierCircle Bold.woff2
editorial-new/PPEditorialNew-Ultralight.woff2
editorial-new/PPEditorialNew-Regular.woff2
maple-mono/MapleMono-Regular.woff2
maple-mono/MapleMono-SemiBold.woff2
```

Example: if files live at `https://code-design-garden.b-cdn.net/fonts/basier-circle/...`, set:

```bash
PUBLIC_BUNNY_FONT_BASE_URL=https://code-design-garden.b-cdn.net/fonts
```

## CORS (required for cross-origin fonts)

Browsers treat web fonts as CORS-gated. The site origin (`mywebsiteforthis.com`) and the Bunny host (`*.b-cdn.net`) differ, so the pull zone must return `Access-Control-Allow-Origin`.

In Bunny: **Pull Zone → Headers** (or **Security → CORS**) → enable CORS / add:

```
Access-Control-Allow-Origin: *
```

(or restrict to `https://mywebsiteforthis.com`). Without that header you’ll see console CORS errors; the typeface may still “look right” if the same family is installed locally or a fallback kicks in.

Only these used weights are kept in the repo for local/Docker fallbacks.
