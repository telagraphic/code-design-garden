---
title: "Shutter Scroll Transition"
description: "Shutter Scroll Transition."
slug: "shutter-scroll-transition"
previewVideo: "shutter-scroll-transition.mp4"
order: 49.851
published: true
categories: ["scroll", "text", "media"]
triggers: ["scroll", "mouse-move"]
libraries: ["gsap"]
keywords: ["shutter", "scroll", "transition"]
sourceUrl: "https://www.osmo.supply/resource/shutter-scroll-transition"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<section class="shutter-scroll__section">
  <div class="shutter-scroll__bg">
  </div>
  <div class="shutter-scroll__content">
    <h1 class="shutter-scroll__h">Shutter<br />Scroll<br />Transition</h1>
  </div>
  <div data-rows="16" data-shutter-scroll-transition="" data-rows-tablet="10" data-rows-mobile="6" class="shutter-scroll-transition"></div>
</section>
```
### CSS
```text
.shutter-scroll__section {
  color: #f2f2f2;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  display: flex;
  position: relative;
  overflow: hidden;
}
.shutter-scroll__bg {
  z-index: 0;
  background-color: #000;
  position: absolute;
  inset: 0%;
}
.shutter-scroll__bg-img {
  opacity: .8;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.shutter-scroll__content {
  z-index: 1;
  position: relative;
}
.shutter-scroll__h {
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
.shutter-scroll-transition {
  z-index: 10;
  pointer-events: none;
  color: #cecece;
  position: absolute;
  inset: auto 0% 0%;
}
[data-shutter-scroll-panel] {
  display: flex;
  flex-direction: column;
  width: 100%;
}
[data-shutter-scroll-row] {
  height: 3em;
  width: 100%;
  background-color: currentColor;
  backface-visibility: hidden;
  will-change: opacity;
}
[data-shutter-scroll-transition][data-shutter-height="1.5em"] [data-shutter-scroll-row] {
  height: 1.5em;
}
```
### Javascript
```javascript
function initShutterScrollTransition() {
  // Defaults — edit these to change fallbacks if no data-attribute is added
  const defaultRows = 6;
  const defaultMode = "cover";
  const defaultScrollStart = { cover: "bottom bottom", reveal: "top bottom" };
  const defaultScrollEnd = { cover: "bottom top", reveal: "top center" };
  const defaultScrub = 0.3;
  const defaultShutterDuration = 0.1;
  const defaultStaggerAmount = 0.01;
  // Class names applied to generated elements
  const panelClass = "shutter-scroll-transition__panel";
  const rowClass = "shutter-scroll-transition__row";
  // Breakpoints
  const breakpoints = {
    mobile: "(max-width: 478px)",
    landscape: "(max-width: 767px)",
    tablet: "(max-width: 991px)",
  };
  const instances = [];
  let mm = null;
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
  function createRow() {
    const row = document.createElement("div");
    row.classList.add(rowClass);
    row.setAttribute("data-shutter-scroll-row", "");
    return row;
  }
  function buildRows(wrapper, rows) {
    const panel = document.createElement("div");
    panel.classList.add(panelClass);
    panel.setAttribute("data-shutter-scroll-panel", "");
    const fragment = document.createDocumentFragment();
    for (let r = 0; r < rows; r++) {
      fragment.appendChild(createRow());
    }
    panel.appendChild(fragment);
    wrapper.appendChild(panel);
    return { panel };
  }
  function collectRows(panel) {
    return Array.from(panel.children);
  }
  function createAnimation(wrapper, rows, section, mode) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: getScrollStart(wrapper, mode),
        end: getScrollEnd(wrapper, mode),
        scrub: defaultScrub,
        invalidateOnRefresh: true,
      },
    });
    const fromScale = mode === "cover" ? 0 : 1;
    const toScale = mode === "cover" ? 1 : 0;
    const origin = mode === "cover" ? "bottom center" : "top center";
    gsap.set(rows, {
      scaleY: fromScale,
      transformOrigin: origin,
    });
    tl.to(rows, {
      scaleY: toScale,
      duration: defaultShutterDuration,
      stagger: { each: defaultStaggerAmount, from: "end" },
      ease: "none",
    });
    return tl;
  }
  function setupInstance(wrapper) {
    const section = wrapper.closest("section") || wrapper.parentElement;
    const rows = getRows(wrapper);
    const mode = getMode(wrapper);
    const { panel } = buildRows(wrapper, rows);
    const rowList = collectRows(panel);
    const tl = createAnimation(wrapper, rowList, section, mode);
    return { wrapper, tl };
  }
  function destroyInstance(instance) {
    if (instance.tl) {
      instance.tl.scrollTrigger?.kill();
      instance.tl.kill();
    }
    const panel = instance.wrapper.querySelector("[data-shutter-scroll-panel]");
    if (panel) panel.remove();
  }
  function buildAll() {
    const wrappers = document.querySelectorAll("[data-shutter-scroll-transition]");
    wrappers.forEach((wrapper) => {
      instances.push(setupInstance(wrapper));
    });
    ScrollTrigger.refresh();
  }
  function destroyAll() {
    instances.forEach(destroyInstance);
    instances.length = 0;
  }
  const wrappers = document.querySelectorAll("[data-shutter-scroll-transition]");
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
// Initialize Shutter Scroll Transition
document.addEventListener("DOMContentLoaded", () => {
  initShutterScrollTransition();
});
```
### CSS
```text
[data-shutter-scroll-panel] {
  display: flex;
  flex-direction: column;
  width: 100%;
}
[data-shutter-scroll-row] {
  height: 3em;
  width: 100%;
  background-color: currentColor;
  backface-visibility: hidden;
  will-change: opacity;
}
[data-shutter-scroll-transition][data-shutter-height="1.5em"] [data-shutter-scroll-row] {
  height: 1.5em;
}
```
### Implementation
The component generates a stack of full-width shutter rows inside a wrapper. As the user scrolls, rows scale vertically (cover mode) or collapse (reveal mode) in a bottom-to-top sequence.
#### Wrapper element
The component only needs a single div on your page. This is the wrapper, the script generates all shutter rows inside it. Add the `data-shutter-scroll-transition` attribute to this div. All configuration (rows, mode, scroll positions) is set as data attributes on this same element.
Place the wrapper inside a section with position: relative and overflow: hidden. No need to add children elements inside it, the rows are built automatically.
#### Shutter colour
The shutter background uses `currentColor`. Set the CSS `color` property on the wrapper to control the shutter colour. This should match the background of the adjacent section for a seamless transition.
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
- `data-mode="cover"` (default) Rows start collapsed at the bottom of the section and scale upward, covering the content as the user scrolls.
- `data-mode="reveal"` Rows start fully expanded and collapse toward the top, revealing the content as the user scrolls in.
#### Custom scroll positions
Decide when the animation starts and ends within the scroll range using `data-scroll-start` and `data-scroll-end`. These accept any valid GSAP ScrollTrigger position string.
### Javascript
```text
data-scroll-start="top center"
data-scroll-end="center top"
```
The defaults depend on mode. Cover mode starts at `bottom bottom` and ends at `bottom top`. Reveal mode starts at `top bottom` and ends at `top center`.
#### Shutter height
Each row has a fixed height set in CSS. Override the height using the `data-shutter-height` attribute on the wrapper. The matching CSS uses an attribute selector.
### CSS
```text
[data-shutter-scroll-transition][data-shutter-height="1.5em"] [data-shutter-scroll-row] {
  height: 1.5em;
}
```
Smaller heights increase the number of visible shutters within the same space. Larger heights create thicker bands.
#### Accessibility
The component uses `gsap.matchMedia()` to detect `prefers-reduced-motion: reduce`. When the user has reduced motion enabled, no rows are generated and no animation runs.
#### Cleanup
The component rebuilds automatically on breakpoint changes via `gsap.matchMedia()`. For single-page applications or dynamic page transitions, you can call `initShutterScrollTransition()` again after new content is loaded. Each call creates a fresh `matchMedia` context.
#### Performance note
Each instance generates one DOM element per row. Compared to the pixel version, this is significantly lighter. The animation itself is very lightweight. Keep row counts reasonable, especially when using very small shutter heights, to avoid unnecessary DOM growth.