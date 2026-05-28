# code-design-guide

Static HTML/CSS homepage prototype based on the Paper artboard **Prototype 1 — Variant 2**.

## Preview

Open [`index.html`](index.html) (homepage), [`landing-page.html`](landing-page.html) (React landing), or [`content-page.html`](content-page.html) (useRef article) in a browser at **1440px** viewport width (use devtools device mode).

Optional local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Styles

Design tokens live in [`css/tokens.css`](css/tokens.css). Component and layout styles are split across [`css/layout.css`](css/layout.css) and [`css/components.css`](css/components.css).

Fonts are loaded from [`fonts/`](fonts/) via [`css/fonts.css`](css/fonts.css).

### Design tokens

Primitives in `tokens.css` are reusable across pages. Compose them in layout/component CSS; avoid adding page-specific names to `:root` unless shared globally.

| Layer | Examples | Use |
|-------|----------|-----|
| **Colors** | `--color-bg`, `--color-text`, `--color-muted` | Surfaces, text, borders |
| **Microcopy** | `--font-size-micro`, `--font-size-sm` | Nav, labels, captions (~13–14px at desktop) |
| **Mid** | `--font-size-md` | List titles, subheads (~26px at desktop) |
| **Modular scale** | `--font-size-step--2` … `--font-size-step-5` | Article/prose pages (Utopia, 360–1240px) |
| **Display** | `--font-size-display` | Hero section titles (fluid, ~276px max) |
| **Line height** | `--line-height-micro`, `--line-height-display`, … | Unitless ratios paired with font-size |
| **Tracking** | `--tracking-tight` … `--tracking-widest` | Letter-spacing |
| **Spacing** | `--space-1` … `--space-24` | 4px grid (`--space-unit` = 4px) |
| **Layout** | `--layout-max`, `--layout-main`, `--layout-aside` | Page shell widths |
| **Homepage only** | `--size-section-min` | Topic section min-height; override per template as needed |

Homepage mapping (1440px targets): nav/index → `--font-size-micro`; list desc → `--font-size-sm`; list title → `--font-size-md`; hero → `--font-size-display`; gutters → `--space-20`; nav height → `--size-nav-height`.

## Astro wiki

Architecture and decisions: [`REQUIREMENTS.md`](REQUIREMENTS.md).

### Develop

```bash
pnpm install
pnpm dev
```

### Build

```bash
pnpm build
pnpm preview
```

Content lives in `src/content/{domain}/{section}/{slug}.md`. Each section should include `1-overview.md` at the section root with `sectionTitle` (display name, e.g. `CSS`) and `description` for the homepage card (nested `…/1-overview.md` works as a fallback, e.g. `react/01-react/1-overview.md`). Styles are in `src/styles/` (ported from `css/`). Fonts are in `public/fonts/`.

**Cmd+K** search uses [`@cmd-kit/astro`](https://www.npmjs.com/package/@cmd-kit/astro) — paste additional chapter Markdown into `src/content/{domain}/`.

Static HTML prototypes (`index.html`, `landing-page.html`, `content-page.html`) remain at repo root for reference until Astro parity is complete.
