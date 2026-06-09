---
title: "Highlight Marker Text Reveal"
description: "Highlight Marker Text Reveal."
slug: "highlight-marker-text-reveal"
previewVideo: "highlight-marker-text-reveal.mp4"
order: 49.916
published: true
categories: ["text"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["highlight", "marker", "text", "reveal"]
sourceUrl: "https://www.osmo.supply/resource/highlight-marker-text-reveal"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/SplitText.min.js"></script>
```
### HTML
```text
<h1 data-highlight-marker-reveal data-marker-direction="right" data-marker-theme="pink" class="highlight-title">Here's a text reveal that looks like a highlight marker</h1>
```
### CSS
```text
.highlight-title {
  text-align: center;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Haffer, Arial, sans-serif;
  font-size: 6vw;
  font-weight: 900;
  line-height: 0.9;
}
[data-highlight-marker-reveal]{
  visibility: hidden;
}
[data-highlight-marker-reveal] .highlight-marker-line{
  width: auto;
  display: inline-block !important;
  margin: -0.055em 0px;
}
.highlight-marker-bar{
  position: absolute;
  inset: -0.055em 0px;
  z-index: 1;
  pointer-events: none;
}
```
### Javascript
```javascript
function initHighlightMarkerTextReveal() {
  const defaults = {
    direction: "right",
    theme: "pink",
    scrollStart: "top 90%",
    staggerStart: "start",
    stagger: 100,
    barDuration: 0.6,
    barEase: "power3.inOut",
  };
  const colorMap = {
    pink: "#C700EF",
    white: "#FFFFFF",
  };
  const directionMap = {
    right: { prop: "scaleX", origin: "right center" },
    left: { prop: "scaleX", origin: "left center" },
    up: { prop: "scaleY", origin: "center top" },
    down: { prop: "scaleY", origin: "center bottom" },
  };
  function resolveColor(value) {
    if (colorMap[value]) return colorMap[value];
    if (value.startsWith("--")) {
      return getComputedStyle(document.body).getPropertyValue(value).trim() || value;
    }
    return value;
  }
  function createBar(color, origin) {
    const bar = document.createElement("div");
    bar.className = "highlight-marker-bar";
    Object.assign(bar.style, {
      backgroundColor: color,
      transformOrigin: origin,
    });
    return bar;
  }
  function cleanupElement(el) {
    if (!el._highlightMarkerReveal) return;
    el._highlightMarkerReveal.timeline?.kill();
    el._highlightMarkerReveal.scrollTrigger?.kill();
    el._highlightMarkerReveal.split?.revert();
    el.querySelectorAll(".highlight-marker-bar").forEach((bar) => bar.remove());
    delete el._highlightMarkerReveal;
  }
  let reduceMotion = false;
  gsap.matchMedia().add(
    { reduce: "(prefers-reduced-motion: reduce)" },
    (context) => {
      reduceMotion = context.conditions.reduce;
    }
  );
  // Reduced motion: no animation at all
  if (reduceMotion) {
    document.querySelectorAll("[data-highlight-marker-reveal]").forEach((el) => {
      gsap.set(el, { autoAlpha: 1 });
    });
    return;
  }
  // Cleanup previous instances
  document.querySelectorAll("[data-highlight-marker-reveal]").forEach(cleanupElement);
  const elements = document.querySelectorAll("[data-highlight-marker-reveal]");
  if (!elements.length) return;
  elements.forEach((el) => {
    const direction = el.getAttribute("data-marker-direction") || defaults.direction;
    const theme = el.getAttribute("data-marker-theme") || defaults.theme;
    const scrollStart = el.getAttribute("data-marker-scroll-start") || defaults.scrollStart;
    const staggerStart = el.getAttribute("data-marker-stagger-start") || defaults.staggerStart;
    const staggerOffset = (parseFloat(el.getAttribute("data-marker-stagger")) || defaults.stagger) / 1000;
    const color = resolveColor(theme);
    const dirConfig = directionMap[direction] || directionMap.right;
    el._highlightMarkerReveal = {};
    const split = SplitText.create(el, {
      type: "lines",
      linesClass: "highlight-marker-line",
      autoSplit: true,
      onSplit(self) {
        const instance = el._highlightMarkerReveal;
        // Teardown previous build
        instance.timeline?.kill();
        instance.scrollTrigger?.kill();
        el.querySelectorAll(".highlight-marker-bar").forEach((bar) => bar.remove());
        // Build bars and timeline
        const lines = self.lines;
        const tl = gsap.timeline({ paused: true });
        lines.forEach((line, i) => {
          gsap.set(line, { position: "relative", overflow: "hidden" });
          const bar = createBar(color, dirConfig.origin);
          line.appendChild(bar);
          const staggerIndex = staggerStart === "end" ? lines.length - 1 - i : i;
          tl.to(bar, {
            [dirConfig.prop]: 0,
            duration: defaults.barDuration,
            ease: defaults.barEase,
          }, staggerIndex * staggerOffset);
        });
        // Reveal parent — bars are covering the text
        gsap.set(el, { autoAlpha: 1 });
        // ScrollTrigger
        const st = ScrollTrigger.create({
          trigger: el,
          start: scrollStart,
          once: true,
          onEnter: () => tl.play(),
        });
        instance.timeline = tl;
        instance.scrollTrigger = st;
      },
    });
    el._highlightMarkerReveal.split = split;
  });
}
// Initialize Highlight Marker Text Reveal
document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initHighlightMarkerTextReveal();
  });
});
```
### CSS
```text
[data-highlight-marker-reveal]{
  visibility: hidden;
}
.wf-design-mode [data-highlight-marker-reveal]{
  visibility: visible;  
}
[data-highlight-marker-reveal] .highlight-marker-line{
  width: auto;
  display: inline-block !important;
  margin: -0.055em 0px;
}
.highlight-marker-bar{
  position: absolute;
  inset: -0.055em 0px;
  z-index: 1;
  pointer-events: none;
}
```
### Implementation
#### Targets
Add \[data-highlight-marker-reveal\] to any text element to activate the highlight marker reveal. Each line of text will be covered by a colored bar that scales away on scroll, revealing the content beneath. The script uses GSAP SplitText to split the text into lines, so no manual line wrapping is needed.  
#### Direction
Control which way the bar moves away with `[data-marker-direction]` (default `right`). Accepted values are `left`, `right`, `up`, and `down`, the bar anchors to the named edge and scales toward it, revealing text from the opposite side.  
#### Theme
The bar color is set through `[data-marker-theme]` (default `pink`), which accepts a named color key, a CSS custom property, or any raw color value. Named keys resolve through a color map defined in the JavaScript. You can add as many options in here as you want.
### Javascript
```javascript
const colorMap = {  
  pink: "#C700EF", 
  white: "#FFFFFF",
};
```
To read a CSS variable from the body, pass the variable name including the dashes:
### HTML
```text
<h2 data-highlight-marker-reveal data-marker-theme="--brand-accent">Heading</h2>
```
Any value that isn't a named key or CSS variable is used as-is, so `#ff6600`, `rgb(255, 102, 0)`, or any valid CSS color works directly.
#### Scroll Start
The scroll trigger fires by default when the element reaches 90% of the viewport. Override this per element with `[data-marker-scroll-start]`, which accepts any valid ScrollTrigger start value.  
#### Stagger
Lines animate in sequence with a default offset of 100ms between each line. Adjust this per element with \[data-marker-stagger\] in milliseconds. A value of 500 for example will make each bar stagger with 0.5s of delay.  
#### Stagger Start
By default, lines reveal from top to bottom. You can flip the order, and make the sequence move bottom-to-top by adding `[data-marker-stagger-start="end"]` to the target.  
#### Bar Height and Spacing
The visible height of the bars and the spacing between them is controlled entirely through CSS. Three properties work together: the `line-height` on the text element, and the `inset` and `margin` values on the line and bar.
### CSS
```text
[data-highlight-marker-reveal] .highlight-marker-line {
  margin: -0.055em 0px;
}
.highlight-marker-bar {
  inset: -0.055em 0px;
}
```
The negative margin on `.highlight-marker-line` pulls lines closer together, while the negative top/bottom inset on `.highlight-marker-bar` extends the bar beyond the line box. Together with the element's `line-height`, these three values determine whether bars overlap, touch seamlessly, or have visible gaps between them. Increase the negative values to create taller bars that bleed into adjacent lines, or reduce them to leave breathing room between each highlighted row.
#### Defaults
All attributes are optional. When omitted, values fall back to a defaults object defined at the top of the script. Adjust these to change the baseline behavior across all instances at once.
### Javascript
```javascript
const defaults = {
  direction: "right",
  theme: "pink",
  scrollStart: "top 90%",
  staggerStart: "start",
  stagger: 100,
  barDuration: 0.6,
  barEase: "power3.inOut",
};
```
The `barDuration` and `barEase` are only configurable through this object and don't have corresponding attributes, they're meant to stay consistent across the page.
Ilja van Eck