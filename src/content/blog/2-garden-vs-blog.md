---
title: "Garden vs Blog — Two Halves of One Site"
description: "Why the wiki lives at /garden and writing lives at / — and how they serve different jobs."
pubDate: 2026-06-18
published: true
---

This site now has two front doors. **Blog** (`/`) is the default — writing meant to be read in order or discovered by date. **Garden** (`/garden`) is the reference wiki: Code, Design, AI, Tools, and References, organized the way documentation should be.

Splitting them was a product decision as much as a routing one. I don't want visitors to wade through a curriculum when they're looking for an essay, and I don't want to bury reference pages inside a chronological feed.

## Garden: structured reference

The Garden follows a hierarchy that should feel familiar if you've used any wiki or course site:

```text
Domain → Section → Chapter → Page
```

Examples: `/code/design-patterns/challenges/1-module-pattern`, `/design/library/big-typo-scroll-preview`. URLs are stable. Pages link to each other by topic, not by publish date. Section hubs list chapters; article sidebars list sibling pages in the same chapter.

That's the right shape for:

- Pattern catalogs and challenge walkthroughs
- API notes you'll grep for later
- Animation library entries with preview video and source links
- Anything you'd bookmark and return to six months from now

The homepage at `/garden` is a map of domains — big section labels, cards linking to section hubs. It's optimized for **orientation**, not narrative.

## Blog: chronological writing

The blog inverts the priority. The homepage is a feed of recent posts: date, title, description. No domain indices, no `01` / `02` labels. You scroll, you pick a post, you read.

Individual posts live at `/blog/[slug]`. The slug comes from the filename — `hello-world.md` → `/blog/hello-world` — so there's one source of truth and no drift between frontmatter and disk.

Posts share the article layout with Garden pages (header, lede, prose, sidebar TOC), but the **nav context** is different: back to Blog, "More posts" instead of chapter siblings, Cmd+K grouped under a Blog section.

## When content belongs where

| Question | Garden | Blog |
|----------|--------|------|
| Will I link to this from many other pages? | Yes | Maybe |
| Does it need a fixed place in a curriculum? | Yes | No |
| Is it tied to "today" or a release? | Rarely | Often |
| Should it appear in search by topic? | Yes | Yes, by title/date |

When in doubt, I default to the Garden if the piece is **reference**, and the blog if it's **reading**.

## Navigation ties them together

The site nav is intentionally minimal: **Blog** and **Garden**. The logo ("My Website For This") always goes home to `/`. Garden stays active when you're anywhere under `/garden` or a domain path like `/code/...`.

You don't lose the wiki by making the blog primary — you just stop asking readers to enter through a table of contents.

## Practical implications for me

- **Writing flow:** Draft in markdown under `src/content/blog/`. Set `published: false` to hide a post; flip to `true` when ready.
- **Reference flow:** Keep adding to `src/content/code`, `src/content/design`, etc. The Garden doesn't care about blog dates.
- **Cross-linking:** Blog posts can link into Garden pages freely. Garden pages don't need to link back unless it's useful.

If you're landing here for the first time, start with a post. When you need a lookup table, hit **Garden** in the nav.
