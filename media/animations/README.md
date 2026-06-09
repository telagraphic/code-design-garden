# Animation library media (local only)

Preview mp4 and jpg files for the animation gallery live here. This directory is **gitignored** — too large for GitHub.

## Setup

1. Run migrations (copies/clips into `previews/`):

   ```bash
   pnpm migrate:animations:pilot
   pnpm migrate:animations:mwg   # when MWG archive is available
   pnpm generate:animation-posters
   ```

   Source trees (`osmo/`, `mwg/`) are archived outside the repo. Set `ANIMATION_OSMO_ARCHIVE` / `ANIMATION_MWG_ARCHIVE` if not using `~/Archive/`.

2. Link for local Astro dev (serves via `public/animation-previews`):

   ```bash
   pnpm media:link
   ```

3. Or use Docker Compose (mounts this folder automatically):

   ```bash
   docker compose up
   ```

## Layout

```
media/animations/
  previews/          # gallery mp4 + jpg (same paths as /animation-previews URLs)
    buttons/
    *.mp4
```

Markdown lives in `src/content/design/animation-library/`. Source mp4s from Osmo/MWG are gitignored and kept in a local archive.

## Enable / disable

- **Auto:** library is on when `previews/` contains at least one `.mp4`
- **Override:** set `PUBLIC_ANIMATION_LIBRARY_ENABLED=true|false` in `.env`

Without media, the animation gallery routes and Cmd+K section are hidden at build time.
