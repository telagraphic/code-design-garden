---
title: "Variable Font Weight Hover"
description: "Variable Font Weight Hover."
slug: "variable-font-weight-hover"
previewVideo: "variable-font-weight-hover.mp4"
order: 49.831
published: true
categories: ["utility"]
triggers: ["hover"]
libraries: ["vanilla-js"]
keywords: ["variable", "font", "weight", "hover"]
sourceUrl: "https://www.osmo.supply/resource/variable-font-weight-hover"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/SplitText.min.js"></script>
```
### HTML
```text
<h1 data-font-weight-hover data-radius="400" data-min="200" data-max="1000" class="font-weight__heading">
  Looooook at this!<br>It&#x27;s so smooth.
</h1>
```
### CSS
```text
.font-weight__heading {
  font-variation-settings: "wght" 540;
  letter-spacing: -.02em;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Haffer VF, Arial, sans-serif;
  font-size: clamp(2em, 6vw, 8em);
  line-height: 1;
}
```
### Javascript
```javascript
function initVariableFontWeightHover() {
  // Return on touchscreens or when user prefers reduced motion
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isTouch || reduceMotion) return;
  const targets = document.querySelectorAll("[data-font-weight-hover]");
  if (!targets.length) return;
  const rangeDefault = 500;
  const mouse = { x: 0, y: 0 };
  let hasPointer = false;
  let isActive = false;
  const chars = [];
  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
  function numAttr(el, key, fallback) {
    const v = parseFloat(el.dataset[key]);
    return Number.isFinite(v) ? v : fallback;
  }
  function readFontWeight(el) {
    const fw = getComputedStyle(el).fontWeight;
    const parsed = parseFloat(fw);
    if (Number.isFinite(parsed)) return parsed;
    if (fw === "bold") return 700;
    return 400; // "normal" fallback
  }
  function weightFromDistance(dist, minw, maxw, range) {
    if (dist >= range) return minw;
    const t = 1 - dist / range;
    return minw + (maxw - minw) * t;
  }
  function calculatePositions() {
    for (let i = 0; i < chars.length; i++) {
      const r = chars[i].el.getBoundingClientRect();
      chars[i].cx = r.left + r.width / 2 + window.scrollX;
      chars[i].cy = r.top + r.height / 2 + window.scrollY;
    }
  }
  function splitChars(el) {
    if (el.dataset.fontWeightHoverInit === "true") return null;
    el.dataset.fontWeightHoverInit = "true";
    el.fontWeightHoverSplit =
      el.fontWeightHoverSplit ||
      new SplitText(el, { type: "chars,words", charsClass: "char" });
    return el.fontWeightHoverSplit.chars || [];
  }
  function activate() {
    if (isActive) return;
    isActive = true;
    // Apply variable-font wiring without changing the visible weight
    for (let i = 0; i < chars.length; i++) {
      const d = chars[i];
      d.el.style.setProperty("--wght", d.startw);
      d.el.style.fontVariationSettings = "'wght' var(--wght)";
    }
    calculatePositions();
  }
  targets.forEach((el) => {
    const minw = numAttr(el, "min", 300);
    const maxw = numAttr(el, "max", 900);
    const range = numAttr(el, "range", rangeDefault);
    const split = splitChars(el);
    if (!split) return;
    split.forEach((ch) => {
      const startw = readFontWeight(ch);
      chars.push({
        el: ch,
        cx: 0,
        cy: 0,
        startw,
        minw,
        maxw,
        range,
        setw: gsap.quickTo(ch, "--wght", {
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        }),
      });
    });
  });
  window.addEventListener(
    "pointermove",
    (e) => {
      hasPointer = true;
      mouse.x = e.pageX;
      mouse.y = e.pageY;
      if (!isActive) activate();
    },
    { passive: true }
  );
  window.addEventListener("resize", () => isActive && calculatePositions(), { passive: true });
  window.addEventListener("scroll", () => isActive && calculatePositions(), { passive: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => isActive && calculatePositions()).catch(() => {});
  }
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => isActive && calculatePositions());
    targets.forEach((el) => ro.observe(el));
  }
  gsap.ticker.add(() => {
    if (!hasPointer || !isActive) return;
    for (let i = 0; i < chars.length; i++) {
      const d = chars[i];
      const dist = Math.hypot(mouse.x - d.cx, mouse.y - d.cy);
      const w = weightFromDistance(dist, d.minw, d.maxw, d.range);
      d.setw(clamp(w, d.minw, d.maxw));
    }
  });
}
// Init Variable Font Weight Hover
document.addEventListener("DOMContentLoaded", () => {
  initVariableFontWeightHover();
});
```
### Implementation
This script creates a 'variable font weight hover' effect by splitting text into characters and smoothly adjusting each character’s variable weight based on how close the pointer is to it. For the effect to work, the font used on the target element needs to be a variable font that supports the `wght` axis.
#### Target
Use `[data-font-weight-hover]` to mark a text element as interactive so its characters respond to pointer distance by changing variable font weight.
### HTML
```text
<h2 data-font-weight-hover data-min="300" data-max="900" data-range="500">
  Variable font heading
</h2>
```
#### Variable font requirement
Use a variable font that supports the `wght` axis so changes to `font-variation-settings: 'wght'`... can visually interpolate the font weight per character.
#### Minimum font-weight
Use `[data-min="300"]` (default 300) to define the lowest variable font weight a character can animate down to when the pointer is outside the influence range.  
#### Maximum font-weight
Use `[data-max="900"]` (default 900) to define the highest variable font weight a character can animate up to when the pointer is closest to its center.  
#### Influence range
Use `[data-range="500"]` (default 500px) to define the maximum distance from each character’s center where the pointer still affects the weight animation. A higher number means your letters will be affected even if the mouse is further away. A lower number means the mouse will have to be closer to the text before it animates.  
#### Starting weight from CSS
Use the element’s existing CSS `font-weight` as the starting point so characters keep their original styling until the user moves the pointer for the first time.
#### Touchscreens
The script detects touchscreens (like a mobile device) to disable the effect. The text stays at the CSS-defined font weight.  
#### Accessibility
The script also checks if the user prefers reduced motion, to disable the hover animation and preserve the CSS-defined font-weight, ensuring the interaction does not create unnecessary motion for users who opt out.