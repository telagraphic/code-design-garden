# Docker — local development

Run the Astro wiki in Docker on your machine. **One copy of the repo** lives on disk; the container reads it through a bind mount. Edit files in Cursor as usual — the dev server hot-reloads the browser.

No cloud deployment, no nginx. This is for local use only.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Mac)
- Optional: [lazydocker](https://github.com/jesseduffield/lazydocker) — terminal UI for containers, images, logs

## How it works

```
Your Mac (single source of truth)
  └── code-design-garden/          ← you edit here
           │
           │  bind mount (.:/app)
           ▼
Docker container
  └── pnpm dev                     ← watches /app, hot reload on save
  └── /app/node_modules            ← separate volume (deps live in container)
```

The Dockerfile bakes Node, pnpm, and dependencies into an **image**. Compose **mounts your folder over `/app`**, so saves in Cursor are visible immediately. You do not maintain two copies of the repo.

Rebuild the image only when `Dockerfile`, `package.json`, or `pnpm-lock.yaml` change — not on every file edit.

---

## Quick start

**First time** (build image + start dev server):

```bash
docker compose up --build
```

Open [http://localhost:4321](http://localhost:4321).

**Every day after** (container already built):

```bash
docker compose up
```

Stop with `Ctrl+C`, or in another terminal:

```bash
docker compose down
```

---

## Workflow patterns

Use these as a cheat sheet when you change something and need to know what to run.

### Pattern 1 — Edit content or styles (most common)

**You changed:** markdown in `src/content/`, CSS in `src/styles/` or `css/`, Astro components, etc.

**What happens:** Astro dev server detects the save and hot-reloads. No Docker command needed.

**You run:** nothing — keep `docker compose up` running in a terminal tab.

```bash
# Terminal tab 1 (leave running)
docker compose up

# Terminal tab 2 — edit in Cursor, save, check browser
```

---

### Pattern 2 — Add or update an npm dependency

**You changed:** `package.json` or `pnpm-lock.yaml`

**You run:**

```bash
docker compose down
docker compose up --build
```

The rebuild refreshes the image; `pnpm install` inside the container syncs the `node_modules` volume.

---

### Pattern 3 — Change the Dockerfile or compose file

**You changed:** `Dockerfile`, `docker-compose.yml`, `.dockerignore`

**You run:**

```bash
docker compose down
docker compose up --build
```

---

### Pattern 4 — Validate the production build

**You want:** to see the static output (`dist/`) as it would ship — no hot reload.

**You run:**

```bash
docker compose --profile preview up --build preview
```

Open [http://localhost:4322](http://localhost:4322). Stop with `Ctrl+C`.

To rebuild after edits:

```bash
docker compose --profile preview up --build preview
```

Each start runs `pnpm build` then `pnpm preview`.

---

### Pattern 5 — Animation preview videos

**You added:** `.mp4` / `.jpg` files under `media/animations/previews/` on your Mac.

Compose mounts that folder to `public/animation-previews` automatically. Restart if the container was already running:

```bash
docker compose restart web
```

See [media/animations/README.md](media/animations/README.md) for migration and linking details.

Force the gallery on or off with `PUBLIC_ANIMATION_LIBRARY_ENABLED` in [docker-compose.yml](docker-compose.yml).

---

### Pattern 6 — Something looks stuck or broken

**Try in order:**

```bash
# 1. Restart the dev service
docker compose restart web

# 2. Fresh containers (keeps node_modules volume)
docker compose down
docker compose up

# 3. Nuclear option — wipe container node_modules volume and reinstall
docker compose down -v
docker compose up --build
```

`-v` removes anonymous volumes (including `/app/node_modules`). Next start reinstalls dependencies.

---

### Pattern 7 — Run a one-off command inside the container

**Examples:** lint CSS, run a migration script, open a shell.

```bash
# Shell inside the running dev container
docker compose exec web sh

# One-off script (container must be up)
docker compose exec web pnpm lint:css
docker compose exec web pnpm sync:css
```

If the container is not running:

```bash
docker compose run --rm web sh
docker compose run --rm web pnpm lint:css
```

---

### Pattern 8 — Manual image build (without compose)

Useful if you want a named image or to run outside compose.

**Build:**

```bash
docker build --target dev -t code-design-garden:dev .
docker build --target preview -t code-design-garden:preview .
```

**Run dev with bind mount** (same single-copy workflow as compose):

```bash
docker run --rm -it \
  -p 4321:4321 \
  -v "$(pwd):/app" \
  -v /app/node_modules \
  -v "$(pwd)/media/animations/previews:/app/public/animation-previews" \
  -e PUBLIC_ANIMATION_LIBRARY_ENABLED=true \
  code-design-garden:dev \
  sh -c "pnpm install && pnpm dev --host 0.0.0.0"
```

---

## lazydocker — start/stop without a terminal tab

**Yes.** lazydocker can start and stop the dev server so you do not need `docker compose up` running in a foreground terminal. The trick is to run containers in **detached** mode (`-d`) first — lazydocker manages containers that already exist; it does not replace `docker compose up` on a project that has never been created.

### One-time setup

```bash
cd /path/to/code-design-garden
docker compose up -d --build
```

`-d` runs the container in the background. You can close the terminal; the site stays up at [http://localhost:4321](http://localhost:4321).

### Daily use (lazydocker only)

```bash
lazydocker
```

1. Open the **Containers** panel (default).
2. Find **`code-design-garden-web-1`** (exact name may vary; look for `web` in the name).
3. Use keyboard shortcuts on the selected container:

| Action | Key | When to use |
|--------|-----|-------------|
| **Stop** | `s` | End of day, free port 4321 |
| **Start** | `S` (shift+s) | Next session — no terminal command |
| **Restart** | `r` | After changing `docker-compose.yml` env vars |
| **Logs** | `l` or Logs tab | Debug without a separate terminal |
| **Remove** | `d` | Same as removing the container (see below) |

Press `?` for the full key map, `q` to quit lazydocker (quitting does **not** stop the container).

### When you still need the terminal

| Situation | Command |
|-----------|---------|
| First time / after `docker compose down` | `docker compose up -d --build` |
| Changed `package.json` or Dockerfile | `docker compose up -d --build` |
| Fully tear down (remove containers + volumes) | `docker compose down -v` |
| Run a one-off script | `docker compose exec web pnpm lint:css` |

**Do not** use lazydocker **Remove** (`d`) if you only want to stop — use **Stop** (`s`). Remove deletes the container; you will need `docker compose up -d` again to recreate it (quick, but not instant like Start).

### Preview service

Same pattern for the optional preview container:

```bash
docker compose --profile preview up -d --build preview
```

Then start/stop **`code-design-garden-preview-1`** in lazydocker. Preview runs on [http://localhost:4322](http://localhost:4322).

---

## lazydocker — reference

[lazydocker](https://github.com/jesseduffield/lazydocker) is a terminal UI for Docker.

**Install (Mac):**

```bash
brew install lazydocker
```

**Launch** (any directory — containers are global to Docker Desktop):

```bash
lazydocker
```

| Task | lazydocker |
|------|------------|
| See if dev server is running | **Containers** → `code-design-garden-web-1` |
| Start / stop without compose in a tab | `S` / `s` on selected container |
| View dev server logs | Select container → **Logs** tab or `l` |
| Restart after env change | `r` |
| Inspect images | **Images** panel |
| Free disk space | **Images** → delete unused |

---

## Reference — common commands

| Goal | Command |
|------|---------|
| Start dev (foreground, logs in terminal) | `docker compose up` |
| Start dev (background — use with lazydocker) | `docker compose up -d` |
| Rebuild image + start (background) | `docker compose up -d --build` |
| Stop | `docker compose down` |
| Stop + remove volumes | `docker compose down -v` |
| View logs | `docker compose logs -f web` |
| Production build preview | `docker compose --profile preview up --build preview` |

---

## Troubleshooting

**Port 4321 already in use**

Another process (or a local `pnpm dev`) is using the port. Stop it or change the host port in `docker-compose.yml`:

```yaml
ports:
  - "4323:4321"
```

**Changes not appearing**

- Confirm you saved the file in Cursor.
- Check logs: `docker compose logs -f web`.
- Restart: `docker compose restart web`.

**Animation gallery empty**

- Add preview `.mp4` files to `media/animations/previews/` on your host.
- Ensure `PUBLIC_ANIMATION_LIBRARY_ENABLED=true` in compose, or leave unset and rely on auto-detect when mp4s exist.

**`pnpm install` errors after dependency change**

```bash
docker compose down -v
docker compose up --build
```

**Prefer native Node instead of Docker**

You can still run locally without Docker:

```bash
pnpm install
pnpm media:link   # if using animation previews
pnpm dev
```

See [README.md](README.md).
