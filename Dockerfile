# Local dev and preview for the Astro wiki (static site).
# Daily editing uses docker compose with a bind mount — one copy of source on your machine.

FROM node:22-bookworm AS base

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Dev server with hot reload (use with compose bind mount for live edits)
FROM base AS dev

COPY . .

EXPOSE 4321

CMD ["pnpm", "dev", "--host", "0.0.0.0"]

# Production-style build + preview (no hot reload; rebuild to see changes)
FROM base AS preview

COPY . .

EXPOSE 4321

CMD ["sh", "-c", "pnpm build && pnpm preview --host 0.0.0.0"]
