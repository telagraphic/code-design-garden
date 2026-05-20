# code-design-guide

Static HTML/CSS homepage prototype based on the Paper artboard **Prototype 1 — Variant 2**.

## Preview

Open [`index.html`](index.html) in a browser at **1440px** viewport width (use devtools device mode).

Optional local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Styles

Design tokens live in [`css/tokens.css`](css/tokens.css). Component and layout styles are split across [`css/layout.css`](css/layout.css) and [`css/components.css`](css/components.css).

Fonts are loaded from [`fonts/`](fonts/) via [`css/fonts.css`](css/fonts.css).

## Astro handoff

When moving to Astro, copy the `css/` token and component files into `src/styles/` and split `index.html` into `Nav.astro`, `TopicSection.astro`, and content collections.
