# Interface guidelines

Prioritized UI improvements for **code-design-guide**, based on a review of `src/styles/`, components, and layout templates against interface craft principles (typography, surfaces, animations, performance).

Styles live in `src/styles/` (source of truth). Run `pnpm sync:css` after changes to keep static HTML prototypes in sync.

---

## Already in good shape

| Area | Status |
| --- | --- |
| Font smoothing | `-webkit-font-smoothing: antialiased` on `html` (`reset.css`) and `.prose` |
| Transition specificity | No `transition: all` anywhere; properties are listed explicitly |
| Code block depth | `.prose pre.astro-code` uses layered transparent `box-shadow` instead of a hard border |
| Focus rings | Most links (sidebar, topic list, article list, prose links) have `:focus-visible` outlines |
| Reduced motion (scroll) | `LenisSmoothScroll` skips initialization when `prefers-reduced-motion: reduce` |
| Design tokens | OKLCH palette and spacing scale in `tokens.css` cover most surfaces |

---

## Priority 1 — Fix first

These are accessibility gaps or inconsistencies that will be noticeable on every session.

### 1.1 Restore keyboard focus in the command palette

`.cmdkit-astro-item:focus-visible` sets `outline: none`, removing the only visible focus indicator for keyboard users navigating search results.

| Before | After |
| --- | --- |
| `outline: none` on focused palette items (`command-menu.css`) | `outline: 2px solid var(--color-text); outline-offset: -2px` (or inset box-shadow ring matching sidebar links) |

**Files:** `src/styles/command-menu.css`

---

### 1.2 Enlarge the copy button hit area

The copy control is `1.75rem × 1.75rem` (28px) — below the 40×40px minimum for interactive targets.

| Before | After |
| --- | --- |
| Visible button `width/height: 1.75rem` | Keep visual size; extend hit area with `::before` pseudo-element to at least `2.5rem × 2.5rem` (40px), positioned centered on the icon |
| No press feedback | Add `transform: scale(0.96)` on `:active` with `transition: transform 0.15s cubic-bezier(0.2, 0, 0, 1)` |

**Files:** `src/styles/blocks.css`

---

### 1.3 Enlarge sidebar link hit areas

Sidebar links use `padding: 0.4375rem` (~7px) vertically. Text is readable but the tap/click target is tight, especially on mobile.

| Before | After |
| --- | --- |
| `.sidebar__link` vertical padding `0.4375rem` / `0.375rem` (content sidebar) | Increase to at least `0.625rem` (10px) or use a `::before` pseudo-element to guarantee 40px row height without changing visual density too much |
| `.sidebar__back` has no expanded hit area | Same pseudo-element pattern if padding alone is insufficient |

**Files:** `src/styles/components.css`

---

### 1.4 Tokenize hard-coded copy button colors

`.code-snippet__copy` and its tooltip use raw hex values (`#b8b8b8`, `#fafafa`, `#d0d0d0`, etc.) instead of design tokens. These will not adapt to a dark theme and drift from the rest of the palette.

| Before | After |
| --- | --- |
| `border: 1px solid #b8b8b8` | `border: 1px solid var(--color-border-subtle)` |
| `background: linear-gradient(180deg, #fafafa …)` | `--color-surface-raised` / `--color-surface-muted` gradient or flat token fill |
| Tooltip `#f5f5f5` background | `var(--color-surface-raised)` + token border/shadow |
| `--copied` state greens (`#7a9a7a`, `#2d5a2d`) | Add `--color-success` / `--color-success-text` tokens |

**Files:** `src/styles/tokens.css`, `src/styles/blocks.css`

---

### 1.5 Re-enable `text-wrap: balance` in production prose

The prototype (`css/prose.css`) has `text-wrap: balance` on `.prose`, but the Astro source has it commented out. Headings inside prose can produce awkward line breaks on mid-width viewports.

| Before | After |
| --- | --- |
| `/* text-wrap: balance; */` in `src/styles/prose.css` | Uncomment; also apply to page-level headings: `.article-header__title`, `.landing-hero__title`, `.topic-section__hero` |

**Files:** `src/styles/prose.css`, `src/styles/components.css`

---

## Priority 2 — Polish that compounds

Small details across repeated patterns (lists, nav, code blocks) that add up to a more refined feel.

### 2.1 Add `text-wrap: pretty` to body copy

Long-form paragraphs benefit from orphan control. Headings get `balance`; body text gets `pretty`.

| Before | After |
| --- | --- |
| No text wrapping strategy on paragraphs | `text-wrap: pretty` on `.prose p`, `.article-header__lede`, `.topic-list__desc`, `.article-list__desc` |

**Files:** `src/styles/prose.css`, `src/styles/components.css`

---

### 2.2 Scale-on-press for tactile buttons

Interactive controls lack `:active` feedback. The site has no motion library, so CSS transitions are the right tool.

| Before | After |
| --- | --- |
| `.code-snippet__copy` — no active state | `transform: scale(0.96)` on `:active` |
| `.cmdkit-astro-close` — hover only | Same `scale(0.96)` on `:active` |
| List rows (topic/article/cmdkit items) — hover color only | Optional subtle `scale(0.995)` on the row or skip — links shouldn't scale; buttons should |

Use `transition-property: transform` only. Never go below `scale(0.95)`.

**Files:** `src/styles/blocks.css`, `src/styles/command-menu.css`

---

### 2.3 Animate the copy icon on success

The copied state only changes border/text color. Icon swaps should cross-fade with opacity + scale + blur per the icon animation pattern.

| Before | After |
| --- | --- |
| Single copy icon; `--copied` class toggles colors | Keep both icons in DOM (copy + checkmark); cross-fade with `opacity`, `scale(0.25 → 1)`, `blur(4px → 0)` and `cubic-bezier(0.2, 0, 0, 1)` |
| No exit animation on revert | Same transition handles exit when `--copied` is removed after 2s |

**Files:** `src/lib/code-snippet.mjs`, `src/styles/blocks.css`, `src/components/CodeCopy.astro`

---

### 2.4 Concentric border radius on nested surfaces

When a rounded child sits inside a rounded parent, outer radius should equal inner radius + padding.

| Before | After |
| --- | --- |
| `pre.astro-code` `border-radius: 0.75rem` + copy button `0.25rem` inset ~16px | Either increase pre radius to `1rem` and button to `0.375rem`, or flatten button corners (`0`) since inset exceeds outer curve |
| `cmdkit-astro-dialog` `0.375rem` + input `0.25rem` with minimal padding | Dialog `0.5rem`, input `0.25rem` with `0.25rem` dialog padding — or input `border-radius: 0` flush to dialog top |
| Inline `code` `0.5rem` inside no parent radius | Fine as-is (no nesting conflict) |

**Files:** `src/styles/prose.css`, `src/styles/blocks.css`, `src/styles/command-menu.css`

---

### 2.5 Replace hard list borders with layered shadows (selective)

The site uses `1px solid` dividers everywhere (topic list, article list, cmdkit items, tables). For elevated surfaces, layered shadows feel more natural and adapt to any background.

| Before | After |
| --- | --- |
| `.topic-list__link` / `.article-list__link` — `border-top` + `border-bottom` with hover on bottom only | Consider `box-shadow: 0 1px 0 var(--color-border)` for dividers; keep strong bottom accent on hover |
| `.cmdkit-astro-dialog` — `border` + single shadow | Drop border; use `box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)` (match code block pattern) |
| `.comparison-table` / `.prose table` — full border grid | Keep borders for data tables (readability > aesthetics); apply shadow treatment to card-like containers only |

**Files:** `src/styles/components.css`, `src/styles/command-menu.css`, `src/styles/prose.css`

---

### 2.6 Global `prefers-reduced-motion` for CSS transitions

Lenis already respects reduced motion, but CSS hover/focus transitions still run at full speed.

| Before | After |
| --- | --- |
| No global reduced-motion override | `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }` in `reset.css`, or scoped to interactive elements only |

**Files:** `src/styles/reset.css`

---

### 2.7 Wire scroll spy to Lenis scroll events

`SidebarScrollSpy` listens to `window` scroll. With Lenis active, scroll position updates may lag or miss frames compared to native scroll.

| Before | After |
| --- | --- |
| `window.addEventListener("scroll", …)` only | Export Lenis instance (or dispatch a custom `lenis:scroll` event from `LenisSmoothScroll`); scroll spy subscribes to both, or use `lenis.on("scroll", update)` |
| TOC anchor clicks rely on native `#hash` jump | Use `lenis.scrollTo(target, { offset: -navHeight })` for sidebar TOC links |

**Files:** `src/components/LenisSmoothScroll.astro`, `src/components/SidebarScrollSpy.astro`, `src/components/ArticleSidebar.astro`

---

## Priority 3 — Foundation and future-proofing

Invest when adding dark mode, images, or page transitions.

### 3.1 Dark mode token layer

`CommandMenu` already defines a dark theme object, but site CSS has no `@media (prefers-color-scheme: dark)` or `[data-theme="dark"]` token overrides.

| Before | After |
| --- | --- |
| Single OKLCH light palette in `:root` | Duplicate tokens under `@media (prefers-color-scheme: dark)` or `[data-theme="dark"]` |
| Hard-coded rgba shadows (`rgba(0,0,0,0.06)`) | Shadow tokens that invert for dark surfaces |
| Copy button skeuomorphic light gradient | Token-based flat or subtle gradient per theme |

**Files:** `src/styles/tokens.css`, all component CSS

---

### 3.2 Prose image styles

No `<img>` styles exist yet. When markdown images are added, they need consistent depth.

| Before | After |
| --- | --- |
| No `.prose img` rules | `border-radius: 0.375rem`; `outline: 1px solid rgba(0, 0, 0, 0.1)` (light) / `rgba(255, 255, 255, 0.1)` (dark) — pure black/white, never tinted neutrals |
| No figure/caption styles | Add `.prose figure`, `figcaption` with muted caption color |

**Files:** `src/styles/prose.css`

---

### 3.3 Tabular numbers for dynamic values

No numeric content animates today, but index labels and future counters should not cause layout shift.

| Before | After |
| --- | --- |
| Default proportional figures everywhere | `font-variant-numeric: tabular-nums` on `.topic-section__index`, any badge/counter, cmdkit result counts if added |

**Files:** `src/styles/components.css`, `src/styles/command-menu.css`

---

### 3.4 Easing and duration tokens

Transition timings vary (`0.12s`, `0.15s`, `0.25s`) with mixed `ease-out`. Centralizing makes future animation work consistent.

| Before | After |
| --- | --- |
| Inline durations per component | `--duration-fast: 0.12s`, `--duration-normal: 0.2s`, `--ease-out: cubic-bezier(0.2, 0, 0, 1)` in `tokens.css` |
| Mixed easing keywords | Replace `ease-out` with the shared cubic-bezier for interactive state changes |

**Files:** `src/styles/tokens.css`, component CSS (gradual adoption)

---

### 3.5 Page enter animations (when View Transitions land)

The codebase already listens for `astro:page-load` in client scripts. When Astro View Transitions are enabled, add staggered enters — but skip on first load.

| Before | After |
| --- | --- |
| Instant page swaps | Split article header, sidebar, and prose into semantic chunks; stagger `opacity` + `translateY(8px)` with ~100ms delay between chunks |
| Animations on first paint | Only animate on client navigations (`astro:after-swap`), not initial SSR render |
| Exit animations | Subtle fixed `translateY(-4px)` + fade — softer than enter |

**Files:** New `src/styles/transitions.css`, page layout templates

---

### 3.6 Command palette overlay

The overlay has `backdrop-filter: none` and no scrim. Opening Cmd+K does not dim the page behind it.

| Before | After |
| --- | --- |
| `.cmdkit-astro-overlay { backdrop-filter: none !important; }` | Light scrim: `background: color-mix(in oklch, var(--color-bg) 92%, transparent)` or subtle `backdrop-filter: blur(4px)` if performance allows |
| Lenis scroll continues under open palette | Call `lenis.stop()` when palette opens, `lenis.start()` on close; add `data-lenis-prevent` on the dialog list |

**Files:** `src/styles/command-menu.css`, `src/components/LenisSmoothScroll.astro`, `src/components/CommandMenu.astro`

---

## Implementation order

Recommended sequence if tackling incrementally:

1. **P1.1** — Command palette focus (accessibility)
2. **P1.2 + P1.3** — Hit areas (copy button, sidebar)
3. **P1.5 + P2.1** — Text wrapping (quick typography win)
4. **P1.4** — Tokenize copy button colors
5. **P2.2 + P2.3** — Press feedback and copy icon animation
6. **P2.7** — Lenis + scroll spy integration
7. **P2.6** — Reduced motion CSS
8. **P2.4 + P2.5** — Radius and shadow refinement
9. **P3.x** — Dark mode, images, transitions as those features ship

---

## Review checklist

Use this when reviewing new UI work:

- [ ] Nested rounded elements use concentric border radius
- [ ] Icons are optically centered, not just geometrically
- [ ] Elevated surfaces use layered transparent shadows instead of hard borders where appropriate
- [ ] Enter animations are split and staggered; exits are subtler
- [ ] Dynamic numbers use `tabular-nums`
- [ ] Font smoothing is applied at the root (already done)
- [ ] Headings use `text-wrap: balance`; body uses `text-wrap: pretty`
- [ ] Images have subtle pure-black/white outlines
- [ ] Buttons use `scale(0.96)` on press
- [ ] No enter animations on first page load
- [ ] No `transition: all` — only specific properties
- [ ] `will-change` only on `transform`, `opacity`, or `filter`, and only when stutter is observed
- [ ] Interactive elements have at least 40×40px hit area
- [ ] `prefers-reduced-motion` respected for both JS and CSS
- [ ] Colors use tokens, not raw hex, unless intentionally outside the system
