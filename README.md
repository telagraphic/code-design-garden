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

**Source of truth:** [`src/styles/`](src/styles/) (imported once via [`src/styles/global.css`](src/styles/global.css) in Astro).

| Layer | File | Role |
|-------|------|------|
| — | `tokens.css`, `fonts.css` | Design tokens and `@font-face` |
| `reset` | `reset.css` | Reset |
| `layout` | `layout.css` | Page shell |
| `components` | `components.css` | Nav, sidebar, landing, `article-header`, `.article` shell |
| `prose` | `prose.css` | Typography inside `.prose` (markdown body) |
| `blocks` | `blocks.css` | Checklist, reading-list, comparison-table, code-block |
| `utilities` | `command-menu.css` | Cmd+K palette |

Article pages use `<article class="article"><div class="prose">…</div></article>`. Title and lede live in `.article-header` (from frontmatter), not in `.prose`.

Static HTML prototypes load a copy of these files from [`css/`](css/). Refresh after style changes:

```bash
pnpm sync:css
```

Lint the flattened bundle (catches cross-file duplicate selectors):

```bash
pnpm lint:css
```

Fonts are served from [`public/fonts/`](public/fonts/) via `fonts.css`.

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

**Docker (local):** bind-mounted dev server with hot reload — see [DOCKER_README.md](DOCKER_README.md).

```bash
docker compose up --build
```

### Build

```bash
pnpm build
pnpm preview
```

Content lives in `src/content/{domain}/{section}/{slug}.md`. Each section should include `1-overview.md` at the section root with `sectionTitle` (display name, e.g. `CSS`) and `description` for the homepage card (nested `…/1-overview.md` works as a fallback, e.g. `react/01-react/1-overview.md`). Run `pnpm sync:css` when updating styles used by root HTML prototypes. Fonts are in `public/fonts/`.

Blog posts live in `src/content/blog/*.md` and render at `/blog/{slug}`.

### Prose video player (Bunny.net HLS)

Blog and article markdown can embed autoplaying HLS videos hosted on **Bunny Stream**. Authors only specify a short video name; a single base URL config resolves full CDN paths at build time.

**Setup**

1. Set your Bunny pull zone in `.env` (see [`.env.example`](.env.example)):

   ```bash
   PUBLIC_BUNNY_VIDEO_BASE_URL=https://vz-xxxx.b-cdn.net
   ```

2. Upload videos to Bunny Stream. Use each video's library ID (or your path segment under the pull zone) as the embed name.

**Markdown usage**

Paste an HTML block inside `.prose` content (works in blog posts and wiki articles):

```html
<figure class="prose-video" data-prose-video data-video="gsap-architecture/scrolling-page">
  <video muted loop playsinline autoplay controls preload="metadata" aria-label="Scrolling page demo"></video>
  <figcaption>Scrolling page demo</figcaption>
</figure>
```

| Attribute / element | Purpose |
|---------------------|---------|
| `data-video` | Short Bunny video name — resolved to `{base}/{name}/playlist.m3u8` and `{base}/{name}/play_720p.mp4` |
| `muted` + `playsinline` + `autoplay` | Required for reliable autoplay |
| `controls` | Native browser player UI |
| `figcaption` | Optional caption below the clip |

Override a single embed with full URLs by setting `data-hls` directly on the `<figure>` (skips build-time resolution).

**How it works**

```text
Markdown (data-video) → <figure> in HTML
                              ↓
              prose-video.ts resolves {base}/{name}/playlist.m3u8 at runtime
                              ↓
                    hls.js (Chrome/Firefox) · Safari native HLS
```

`PUBLIC_BUNNY_VIDEO_BASE_URL` is embedded in the client bundle at build time. An optional `rehype-prose-video` plugin can also resolve URLs at build time if you switch to the unified markdown processor later.

| File | Role |
|------|------|
| [`src/config/video.mjs`](src/config/video.mjs) | `PUBLIC_BUNNY_VIDEO_BASE_URL` and URL builder |
| [`src/rehype/rehype-prose-video.mjs`](src/rehype/rehype-prose-video.mjs) | Optional build-time resolution (unified processor) |
| [`src/lib/prose-video.ts`](src/lib/prose-video.ts) | Runtime URL resolution, HLS attach, MP4 fallback, Barba cleanup |
| [`src/styles/prose.css`](src/styles/prose.css) | `.prose-video` and `.prose-image` frame styles |
| [`src/components/CodeCopy.astro`](src/components/CodeCopy.astro) | Initializes players on page load and Barba navigation |

### Prose images

Blog and article markdown can include images with the same rounded frame as video embeds.

**Where to put files**

Store images in [`public/blog/`](public/blog/) (or any path under `public/`). Reference them from the site root:

```text
public/blog/gsap-architecture/grid-sections.png  →  /blog/gsap-architecture/grid-sections.png
```

**Markdown usage**

Simple image on its own line (no caption):

```markdown
![12-column grid with vertical sections](/blog/gsap-architecture/grid-sections.png)
```

Image with a caption — use an HTML `<figure>`:

```html
<figure class="prose-image">
  <img src="/blog/gsap-architecture/grid-sections.png" alt="12-column grid with vertical sections" width="1440" height="900" loading="lazy" decoding="async" />
  <figcaption>12-column grid with vertical sections</figcaption>
</figure>
```

| Approach | When to use |
|----------|-------------|
| `![alt](url)` | Quick inline image, no caption |
| `<figure class="prose-image">` | Caption, explicit dimensions, or lazy-loading attrs |

Images use their natural aspect ratio. Videos keep a fixed 16:10 frame with `object-fit: cover`.

**Cmd+K** search uses [`@cmd-kit/astro`](https://www.npmjs.com/package/@cmd-kit/astro) — paste additional chapter Markdown into `src/content/{domain}/`.

Static HTML prototypes (`index.html`, `landing-page.html`, `content-page.html`) remain at repo root for reference until Astro parity is complete.
