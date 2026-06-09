# Animation library migration checklist

All Osmo and MWG entries are migrated under `src/content/design/animation-library/`. Raw sources are archived locally (not in the repo).

## Run migration

```bash
pnpm migrate:animations:pilot
pnpm migrate:animations:mwg   # optional MWG tutorials
```

Writes markdown to `animation-library/` and copies mp4 previews to `media/animations/previews/` (gitignored).

Sources must be restored from archive or set via env:

- `ANIMATION_OSMO_ARCHIVE` (default `~/Archive/code-design-garden-osmo`)
- `ANIMATION_MWG_ARCHIVE` (default `~/Archive/code-design-garden-mwg`)

After migrating, link media for local dev:

```bash
pnpm media:link
```

See [`media/animations/README.md`](../media/animations/README.md) for Docker setup.

The migrator supports two Osmo formats:

- **Vault resources** — body starts at `## Documentation` → output uses `## Setup` + code sections
- **Course lessons** (e.g. `page-transitions/`) — body starts at intro / `### Lesson notes` when no Documentation heading

Generate gallery poster stills (first frame or Osmo still):

```bash
pnpm generate:animation-posters
```

## Per-entry review (before scaling)

- [ ] **Title** — `title` in frontmatter is human-readable (not “The Vault”).
- [ ] **Description** — One-line summary is accurate.
- [ ] **Preview** — Card hover plays correct mp4; detail hero matches.
- [ ] **Taxonomy** — `categories`, `triggers`, `libraries` match the effect; Cmd+K finds it by keyword.
- [ ] **Body** — No SVG/images/iframes; instructional text + fenced code only.
- [ ] **Code blocks** — HTML / CSS / JS complete; language tags correct (re-tag `text` fences if needed).
- [ ] **Links** — Detail URL `/design/animations/library/{slug}` works with Barba.

## Tabbed setup code

Add `<!-- code-tabs -->` after `## Setup` in a library markdown file, then add the slug to `CODE_TABS_SLUGS` in [`src/rehype/rehype-code-tabs.mjs`](../src/rehype/rehype-code-tabs.mjs) (or rely on the marker alone).

**Tabbed setup:** Any library entry with 2+ of `### Scripts` / `HTML` / `CSS` / `Javascript` gets tabbed UI automatically when the file is under `animation-library/`.

## Known limitations

- Migrator strips Osmo/Webflow chrome; some steps may be missing.
- Code fences may default to `text` when source lacks explicit language tags.
- Only published entries appear in gallery and search.

## Publishing more entries

1. Review migrated markdown in `animation-library/` (title, description, taxonomy, code blocks).
2. Optionally add curated metadata to `animation-overrides.ts` for a slug.
3. Re-run `pnpm migrate:animations:pilot` (manual overrides win over auto-inferred metadata).
4. Entries without local mp4 — preview videos may 404 on those detail pages until added.
