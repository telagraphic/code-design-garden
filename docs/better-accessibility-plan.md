# Better accessibility plan

Branch: `better-accessibility`

Work from the accessibility audit. **HIGH and MEDIUM only.** One iteration per slice. Verify that slice in the browser before starting the next. Do not mix slices in a single pass.

LOW items (copy-failure `aria-label`, code-tabs Home/End, unlabeled inner `<nav>` when the parent aside is already labeled) stay out of this plan.

---

## Execution rules

1. Finish and verify the current slice before starting another.
2. Use existing tokens and CSS layers. No new color system, no new animation library.
3. Prefer native HTML over ARIA. Add ARIA only when there is no native element.
4. Style `:focus-visible`, not bare `:focus`. Never `outline: none` without a verified 2px replacement.
5. Gate hover treatments with `@media (hover: hover)`.
6. After each slice: keyboard the affected flow, confirm a visible focus ring, and check the accessibility tree for name / role / state.

---

## Iteration 1 — Page titles and skip targets

**Severity:** HIGH (unblocks skip link + SPA focus) / MEDIUM (missing `h1`)

Home and Garden have no `<h1>`. Content pages already have `<h1>` inside `#introduction`, but that id is missing on listing pages. Skip-to-content and post-navigation focus both need a stable target.

### Tasks

- Add a single page `<h1>` on `/` (`src/pages/index.astro`) and `/garden` (`src/pages/garden/index.astro`). Keep post/domain titles as `h2`.
- Give every primary content heading a skip/focus target:
  - Reuse `#introduction` on article, blog, and animation-detail pages (already present).
  - Add `id="introduction"` (or `id="main-content"` used consistently) on listing heroes: `/`, `/blog`, `/garden`, domain/section indexes, animation library.
- Put `tabindex="-1"` on that heading so it can receive programmatic focus.

### Acceptance

- Accessibility tree: one `h1` on `/` and `/garden`.
- Every page has a heading with `id` that a skip link can point at.

---

## Iteration 2 — Skip link

**Severity:** HIGH

Repeated chrome is logo + Blog + Garden, then on content pages a long sidebar *inside* `<main>`. A skip link to `<main>` would still land in the sidebar.

### Tasks

- In `src/layouts/BaseLayout.astro`, make a “Skip to content” link the first focusable element. Target the heading from iteration 1 (`#introduction`), not `<main>`.
- Visually hide it until focused (canonical skip-link pattern).
- Add `scroll-margin-top` on the target so a sticky sidebar / nav does not cover it.

### Acceptance

- First Tab stop is the skip link.
- Activating it moves focus to the page `h1` and skips site nav **and** the sidebar.

---

## Iteration 3 — SPA focus on Barba navigation

**Severity:** HIGH

`updateDocumentTitle` already runs. Focus does not. After in-app navigation, `document.activeElement` is `body`.

### Tasks

- In `initAfterEnterFunctions` (`src/lib/barba/shutter/hooks.ts`), after the new container is in, focus the new view’s `h1[tabindex="-1"]`, falling back to `<main>`.
- Use `{ preventScroll: true }` only if Lenis/scroll restoration already handled position; otherwise let the heading receive focus and scroll.

### Acceptance

- Click an internal link (e.g. animation detail → Collection). After the transition, focus is on the new `h1`, not `body`.
- `document.title` still updates.

---

## Iteration 4 — Command palette (search)

**Severity:** HIGH (unlabeled field, no trigger, no focus trap, no focus ring) / MEDIUM (`reducedMotion` ignored)

Treat this as one product slice. The palette is `@cmd-kit/astro` wrapped by `CommandMenu.astro`.

### Tasks

- **Visible trigger:** Add a named “Search” control in `SiteNav.astro` that opens the palette. Keyboard shortcut `mod+k` stays as an extra path.
- **Name the field:** Do not rely on placeholder. Label via `aria-label="Search"` or a visible/`sr-only` `<label for>`. Patch in `CommandMenu.astro` after mount if the package does not accept a label prop.
- **Focus ring:** Remove `outline: none !important` in `src/styles/command-menu.css`. Use a 2px `var(--color-text)` `:focus-visible` ring with offset.
- **Trap and restore:** Prefer the package’s dialog if it can use native `<dialog>.showModal()`. Otherwise set `inert` on `SiteNav` + `<main>` while open, Tab-cycle inside the overlay, Escape closes, restore focus to the Search trigger.
- **Reduced motion:** Pass `reducedMotion` from `matchMedia('(prefers-reduced-motion: reduce)')` (and listen for changes).

### Acceptance

- Search is in the tab order and usable on touch.
- Open palette: input announces a name; keyboard focus is visible; Tab does not reach the page behind; Escape returns focus to Search.
- With reduced motion, palette item hover/scale motion does not run.

---

## Iteration 5 — Lenis honors reduced motion

**Severity:** HIGH

`initLenis` always starts smooth scroll. The CSS `prefers-reduced-motion` kill switch does not stop JS interpolation.

### Tasks

- In `src/lib/barba/shutter/lenis.ts`, skip creating Lenis (or force duration 0 / instant `scrollTo`) when `prefers-reduced-motion: reduce`.
- Keep the existing `setReducedMotion` listener in `initBarba.ts` in sync: if the user toggles the OS setting, destroy or disable Lenis rather than only skipping GSAP page transitions.

### Acceptance

- With the OS reduced-motion setting on, TOC / hash / sidebar jumps are instant. Wheel scroll is native, not lerped.

---

## Iteration 6 — Reflow at 320px

**Severity:** HIGH

At 320px the logo overlaps “Blog”, Garden display titles clip, and content pages stay `flex; nowrap` with a 16rem sidebar (~64px left for the article). Horizontal `scrollWidth` exceeds the viewport.

### Tasks

- **Site nav** (`src/styles/layout.css`, `src/styles/components.css`): wrap or stack brand + links so they never overlap. Reduce `padding-inline: var(--space-20)` on small viewports.
- **Garden heroes** (`--font-size-display`, `.topic-section__hero`): allow wrapping; do not clip. Prefer `min-height` over a 900px section floor if it forces overflow.
- **Content chrome** (`.landing-body`): do not keep sidebar + article in one nowrap row at narrow widths. Stack, or collapse the sidebar, so the article is full width and the page scrolls vertically only.
- Prefer `rem` breakpoints if they fit the existing token file; otherwise add one consistent narrow breakpoint and reuse it.

### Acceptance

- At 320px width: no horizontal scroll, no overlapping hit targets, Garden “Code” fully readable, article text is a usable column.
- Recheck `/`, `/garden`, a wiki article, and `/design/library`.

---

## Iteration 7 — Animation library filters and search

**Severity:** MEDIUM

### Tasks

- **Chip state:** Set `aria-pressed` on `[data-filter]` buttons in `src/pages/design/library/index.astro` and keep it in sync in `applyFilters` (`src/lib/animation-gallery.ts`).
- **Live region:** Render a stable empty `role="status"` node; update it with visible count or “No animations match your filters.”
- **Search focus:** Restore a 2px `:focus-visible` ring on `.animation-gallery__search-input` (`src/styles/animation-gallery.css`). Keep `aria-label`; a visible label is optional if the empty field stays obviously a search.

### Acceptance

- Active chip announces as pressed.
- Filtering updates the status region.
- Keyboard focus on the search field is a clear 2px ring.

---

## Iteration 8 — Code tabs name/control pairing

**Severity:** MEDIUM

### Tasks

- In `src/rehype/rehype-code-tabs.mjs`, give each tab and panel a stable `id`.
- Set `aria-controls` on the tab and `aria-labelledby` on the panel.
- Keep existing roving tabindex and arrow-key behavior in `src/lib/code-tabs.ts`.

### Acceptance

- On an animation detail page, the selected tab exposes its panel in the accessibility tree (named, not a generic unlabeled region).

---

## Iteration 9 — Autoplay vs reduced motion

**Severity:** MEDIUM

Detail and prose videos have `controls` (2.2.2 is covered) but still ship `autoplay` in markup. JS only skips `play()` after the fact.

### Tasks

- `src/pages/design/library/[...slug].astro`: do not output `autoplay` unconditionally; start paused when reduced motion is set (server cannot know OS setting — default to `autoplay` off in markup and play in JS only when `prefers-reduced-motion: no-preference`, **or** strip `autoplay` immediately on `initAnimationGallery` / `initFigure` before `canplay`).
- Same for `src/lib/prose-video.ts` (already removes the attribute under reduced motion; make sure it happens before the element can start).

### Acceptance

- With reduced motion enabled, preview and prose videos do not start by themselves. Pause control remains available when motion is allowed.

---

## Iteration 10 — Hover latching on touch

**Severity:** MEDIUM

### Tasks

- Wrap hover-only color/background/underline rules in `@media (hover: hover)` in:
  - `src/styles/components.css`
  - `src/styles/blocks.css`
  - `src/styles/animation-gallery.css`
  - `src/styles/command-menu.css`
  - `src/styles/prose.css`
- Keep `:focus-visible` rules outside that query so keyboard hover-lookalikes still work.

### Acceptance

- On a coarse pointer, tapping a chip or list row does not leave a stuck hover style.

---

## Suggested order

| # | Slice | Unblocks |
| --- | --- | --- |
| 1 | Page titles and skip targets | 2, 3 |
| 2 | Skip link | Keyboard chrome |
| 3 | Barba focus | Every in-app navigation |
| 4 | Command palette | Search, modal, focus |
| 5 | Lenis reduced motion | Vestibular |
| 6 | 320px reflow | Small screens / zoom |
| 7 | Gallery filters and search | Library |
| 8 | Code tabs ARIA | Setup tabs |
| 9 | Autoplay vs reduced motion | Video |
| 10 | Hover media query | Touch |

Slices 7–10 are independent of 1–6 and can move earlier if you want a smaller first PR. Slices 1 → 2 → 3 must stay in order.

## Out of scope

- Contrast / `better-colors`
- LOW findings
- Rewriting `@cmd-kit/astro` unless the wrapper cannot meet iteration 4
- Visual redesign beyond what reflow and focus require
