---
title: "Hello World"
description: "First blog post on the site — a quick hello from the new blog."
pubDate: 2026-06-24
published: true
---

Welcome to the blog. This is where longer-form writing lives — separate from the Garden reference wiki. If you landed here from the nav, you're in the right place for essays and walkthroughs. If you need a lookup table or a pattern reference, head to **Garden**.

## Why a blog at all

The Garden is organized for retrieval: domains, sections, chapters, pages. That structure is perfect when you know what you're looking for, or when you're browsing a curriculum. It's less ideal when you want to tell a story, ship a release note, or work through an idea in public without deciding where it belongs in the tree.

The blog solves a different job. Posts are chronological. They can be opinionated, incomplete, or tied to a moment in time. They don't need a permanent slot under `/code/react` or `/design/interface`.

## What to expect here

Most posts will sit somewhere on a spectrum:

- **Notes** — short observations, things I tried, things that surprised me
- **Walkthroughs** — step-by-step explanations with code you can paste into a REPL
- **Essays** — longer pieces on craft, tools, or how I think about front-end work

Everything uses the same article shell as the wiki: sidebar with a table of contents, prose typography, and syntax-highlighted code blocks. The reading column is narrower than the Garden on purpose — around 90 characters wide — so long-form text stays comfortable.

## A tiny code sample

Posts support fenced code blocks out of the box:

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("blog"));
```

Inline code like `const x = 1` picks up the same chip styling as wiki pages.

## Where this goes next

Over the next few posts I'll mock out realistic lengths so the homepage and archive feel like a real site — not a scaffold with three-line stubs. The Garden keeps growing as reference material; the blog keeps growing as reading material.

Thanks for stopping by. More soon.
