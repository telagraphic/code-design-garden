---
title: "Pixelated Scroll Transition"
description: "Pixelated Scroll Transition."
slug: "pixelated-scroll-transition"
previewVideo: "pixelated-scroll-transition.mp4"
order: 49.863
published: true
categories: ["scroll", "text", "media"]
triggers: ["scroll", "mouse-move"]
libraries: ["gsap"]
keywords: ["pixelated", "scroll", "transition"]
sourceUrl: "https://www.osmo.supply/resource/pixelated-scroll-transition"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<section class="pixelated-scroll__section">
  <div class="pixelated-scroll__bg">
  </div>
  <div class="pixelated-scroll__content">
    <h1 class="pixelated-scroll__h">Pixelated<br />Scroll<br />Transition</h1>
  </div>
  <div data-rows="6" data-pixelated-scroll-transition="" data-columns="16" data-columns-tablet="10" data-columns-mobile="6" class="pixelated-scroll-transition"></div>
</section>
```
### CSS
```text
.pixelated-scroll__section {
  color: #f2f2f2;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  display: flex;
  position: relative;
  overflow: hidden;
}
.pixelated-scroll__bg {
  z-index: 0;
  background-color: #000;
  position: absolute;
  inset: 0%;
}
.pixelated-scroll__bg-img {
  opacity: .8;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.pixelated-scroll__content {
  z-index: 1;
  position: relative;
}
.pixelated-scroll__h {
  text-align: center;
  letter-spacing: -.04em;
  max-width: 8em;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: 6em;
  font-weight: 400;
  line-height: .95;
}
.pixelated-scroll-transition {
  z-index: 10;
  pointer-events: none;
  color: #cecece;
  position: absolute;
  inset: auto 0% 0%;
}
[data-pixelated-scroll-panel] {
  display: flex;
  flex-direction: row;
  width: 100%;
}
[data-pixelated-scroll-column] {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  flex: 1 1 0%;
  min-width: 0;
}
[data-pixelated-scroll-pixel] {
  aspect-ratio: 1;
  width: 100%;
  background-color: currentColor;
  backface-visibility: hidden;
  will-change: opacity;
}
[data-pixelated-scroll-transition][data-mode="reveal"] {
  inset: 0% 0% auto;
}
[data-pixelated-scroll-transition][data-pixel-ratio="2.5/1"] [data-pixelated-scroll-pixel] {
  aspect-ratio: 2.5/1;
}
```
### Javascript
```javascript
function initPixelatedScrollTransition() {
  // Defaults — edit these to change fallbacks if no data-attribute is added
  const defaultColumns = 12;
  const defaultRows = 6;
  const defaultMode = "cover";
  const defaultScrollStart = { cover: "bottom bottom", reveal: "top bottom" };
  const defaultScrollEnd = { cover: "bottom top", reveal: "top center" };
  const defaultScrub = 0.3;
  const defaultPixelDuration = 0.1;
  const defaultStaggerAmount = 1.5;
  // Class names applied to generated elements
  const panelClass = "pixelated-scroll-transition__panel";
  const columnClass = "pixelated-scroll-transition__col";
  const pixelClass = "pixelated-scroll-transition__pixel";
  // Breakpoints
  const breakpoints = {
    mobile: "(max-width: 478px)",
    landscape: "(max-width: 767px)",
    tablet: "(max-width: 991px)",
  };
  const instances = [];
  let mm = null;
  function getColumns(wrapper) {
    const base = parseInt(wrapper.dataset.columns, 10) || defaultColumns;
    if (window.matchMedia(breakpoints.mobile).matches) {
      return parseInt(wrapper.dataset.columnsMobile, 10) || Math.max(4, Math.round(base * 0.4));
    }
    if (window.matchMedia(breakpoints.landscape).matches) {
      return parseInt(wrapper.dataset.columnsLandscape, 10) || Math.max(6, Math.round(base * 0.6));
    }
    if (window.matchMedia(breakpoints.tablet).matches) {
      return parseInt(wrapper.dataset.columnsTablet, 10) || Math.max(8, Math.round(base * 0.75));
    }
    return base;
  }
  function getMode(wrapper) {
    return wrapper.dataset.mode === "reveal" ? "reveal" : defaultMode;
  }
  function getRows(wrapper) {
    const base = parseInt(wrapper.dataset.rows, 10) || defaultRows;
    if (window.matchMedia(breakpoints.mobile).matches) {
      return parseInt(wrapper.dataset.rowsMobile, 10) || base;
    }
    if (window.matchMedia(breakpoints.landscape).matches) {
      return parseInt(wrapper.dataset.rowsLandscape, 10) || base;
    }
    if (window.matchMedia(breakpoints.tablet).matches) {
      return parseInt(wrapper.dataset.rowsTablet, 10) || base;
    }
    return base;
  }
  function getScrollStart(wrapper, mode) {
    return wrapper.dataset.scrollStart || defaultScrollStart[mode];
  }
  function getScrollEnd(wrapper, mode) {
    return wrapper.dataset.scrollEnd || defaultScrollEnd[mode];
  }
  function createCol() {
    const col = document.createElement("div");
    col.classList.add(columnClass);
    col.setAttribute("data-pixelated-scroll-column", "");
    return col;
  }
  function createPixel() {
    const pixel = document.createElement("div");
    pixel.classList.add(pixelClass);
    pixel.setAttribute("data-pixelated-scroll-pixel", "");
    return pixel;
  }
  function buildGrid(wrapper, cols, rows) {
    const panel = document.createElement("div");
    panel.classList.add(panelClass);
    panel.setAttribute("data-pixelated-scroll-panel", "");
    const fragment = document.createDocumentFragment();
    for (let c = 0; c < cols; c++) {
      const col = createCol();
      for (let r = 0; r < rows; r++) {
        col.appendChild(createPixel());
      }
      fragment.appendChild(col);
    }
    panel.appendChild(fragment);
    wrapper.appendChild(panel);
    return { panel };
  }
  function collectCells(panel, cols, rows, mode) {
    const columns = panel.querySelectorAll("[data-pixelated-scroll-column]");
    const cellData = [];
    for (let r = 0; r < rows; r++) {
      columns.forEach((col, c) => {
        const pixel = col.children[r];
        if (!pixel) return;
        const dist = rows - 1 - r;
        const priority = dist * 50 + Math.random() * 300 + Math.sin(c * 0.3) * 30;
        cellData.push({ element: pixel, priority });
      });
    }
    cellData.sort((a, b) => a.priority - b.priority);
    return cellData.map((d) => d.element);
  }
  function createAnimation(wrapper, cells, section, mode) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: getScrollStart(wrapper, mode),
        end: getScrollEnd(wrapper, mode),
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      },
    });
    const fromAlpha = mode === "cover" ? 0 : 1;
    const toAlpha = mode === "cover" ? 1 : 0;
    gsap.set(cells, { autoAlpha: fromAlpha });
    tl.to(cells, {
      autoAlpha: toAlpha,
      duration: defaultPixelDuration,
      stagger: { amount: defaultStaggerAmount, from: "start" },
      ease: "none",
    });
    return tl;
  }
  function setupInstance(wrapper) {
    const section = wrapper.closest("section") || wrapper.parentElement;
    const cols = getColumns(wrapper);
    const rows = getRows(wrapper);
    const mode = getMode(wrapper);
    const { panel } = buildGrid(wrapper, cols, rows);
    const cells = collectCells(panel, cols, rows, mode);
    const tl = createAnimation(wrapper, cells, section, mode);
    return { wrapper, tl };
  }
  function destroyInstance(instance) {
    if (instance.tl) {
      instance.tl.scrollTrigger?.kill();
      instance.tl.kill();
    }
    const panel = instance.wrapper.querySelector("[data-pixelated-scroll-panel]");
    if (panel) panel.remove();
  }
  function buildAll() {
    const wrappers = document.querySelectorAll("[data-pixelated-scroll-transition]");
    wrappers.forEach((wrapper) => {
      instances.push(setupInstance(wrapper));
    });
    ScrollTrigger.refresh();
  }
  function destroyAll() {
    instances.forEach(destroyInstance);
    instances.length = 0;
  }
  const wrappers = document.querySelectorAll("[data-pixelated-scroll-transition]");
  if (!wrappers.length) return;
  mm = gsap.matchMedia();
  mm.add(
    {
      isDesktop: "(min-width: 992px)",
      isTablet: "(min-width: 768px) and (max-width: 991px)",
      isLandscape: "(min-width: 479px) and (max-width: 767px)",
      isMobile: "(max-width: 478px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      if (context.conditions.reduceMotion) return;
      buildAll();
      return () => {
        destroyAll();
      };
    }
  );
}
// Initialize Pixelated Scroll Transition
document.addEventListener("DOMContentLoaded", () => {
  initPixelatedScrollTransition();
});
```
### CSS
```text
[data-pixelated-scroll-panel] {
  display: flex;
  flex-direction: row;
  width: 100%;
}
[data-pixelated-scroll-column] {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  flex: 1 1 0%;
  min-width: 0;
}
[data-pixelated-scroll-pixel] {
  aspect-ratio: 1;
  width: 100%;
  background-color: currentColor;
  backface-visibility: hidden;
  will-change: opacity;
}
[data-pixelated-scroll-transition][data-mode="reveal"] {
  inset: 0% 0% auto;
}
[data-pixelated-scroll-transition][data-pixel-ratio="2.5/1"] [data-pixelated-scroll-pixel] {
  aspect-ratio: 2.5/1;
}
```
### Implementation
The component generates a grid of square pixel elements inside a wrapper. As the user scrolls, pixels fade in (cover mode) or fade out (reveal mode) in a randomised bottom-to-top pattern.
#### Wrapper element
The component only needs a single `div` on your page. This is the wrapper, the script generates the entire pixel grid inside it. Add the `data-pixelated-scroll-transition` attribute to this div. All configuration (columns, rows, mode, scroll positions) is set as data attributes on this same element.
Place the wrapper inside a section with `position: relative` and `overflow: hidden`. No need to add children elements inside it, the grid is built automatically.
#### Pixel colour
The pixel background uses `currentColor`. Set the CSS `color` property on the wrapper to control the pixel colour. This should match the background of the adjacent section for a seamless transition.
#### Columns
Set the number of columns with `data-columns`. More columns means smaller, denser pixels. Fewer columns means larger, chunkier blocks. The default is 12 columns if the attribute is omitted.
#### Responsive columns
Override the column count at specific breakpoints. If a responsive override is not set, the component calculates a sensible fallback from the base column count.
### Javascript
```text
data-columns="16"
data-columns-tablet="12"
data-columns-landscape="10"
data-columns-mobile="8"
```
#### Rows
Set the number of rows with `data-rows`. The default is 6 rows if the attribute is omitted.
#### Responsive rows
Override the row count at specific breakpoints. If a responsive override is not set, the base row count is used.
### Javascript
```text
data-rows="8"
data-rows-tablet="6"
data-rows-landscape="5"
data-rows-mobile="4"
```
#### Mode: cover and reveal
The data-mode attribute controls the animation direction.
- `data-mode="cover"` (default) The grid sits at the bottom of the section. Pixels start invisible and fade in from bottom to top as the user scrolls, covering the section content.
- `data-mode="reveal"` The grid sits at the top of the section. Pixels start fully visible and fade out from bottom to top, revealing the section content as the user scrolls in.
#### Custom scroll positions
Decide when the animation starts and ends within the scroll range using `data-scroll-start` and `data-scroll-end`. These accept any valid GSAP ScrollTrigger position string.
### Javascript
```text
data-scroll-start="top center"
data-scroll-end="center top"
```
The defaults depend on mode. Cover mode starts at `bottom bottom` and ends at `bottom top`. Reveal mode starts at `top bottom` and ends at `top center`.
#### Pixel aspect-ratio
Pixels are square by default (`aspect-ratio: 1`). Override the aspect ratio with the `data-pixel-ratio` attribute on the wrapper. The matching CSS uses an attribute selector on the wrapper.
### CSS
```text
[data-pixelated-scroll-transition][data-pixel-ratio="2.5/1"] [data-pixelated-scroll-pixel] {
  aspect-ratio: 2.5 / 1;
}
```
When using a non-square aspect ratio, set `data-rows` explicitly since the default row count assumes square pixels.
#### Accessibility
The component uses `gsap.matchMedia()` to detect `prefers-reduced-motion: reduce`. When the user has reduced motion enabled, no grid is generated and no animation runs.
#### Cleanup
The component rebuilds automatically on breakpoint changes via `gsap.matchMedia()`. For single-page applications or dynamic page transitions, you can call `initPixelatedScrollTransition()` again after new content is loaded. Each call creates a fresh matchMedia context.
#### Performance note
Each instance generates `columns × rows` DOM elements. A 16-column, 8-row grid produces 128 pixel divs. Multiple instances on the same page multiply this further. The animation itself is lightweight, but the DOM cost of the grid is real.
Keep column and row counts reasonable. Reduce columns on smaller breakpoints with the responsive attributes.