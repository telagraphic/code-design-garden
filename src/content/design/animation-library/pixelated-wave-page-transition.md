---
title: "Pixelated Wave Page Transition"
description: "Pixelated Wave Page Transition."
slug: "pixelated-wave-page-transition"
previewVideo: "pixelated-wave-page-transition.mp4"
order: 49.862
published: true
categories: ["page-transition", "media"]
triggers: ["scroll", "load"]
libraries: ["gsap"]
keywords: ["pixelated", "wave", "page", "transition"]
sourceUrl: "https://www.osmo.supply/resource/pixelated-wave-page-transition"
---
## Setup
This resource is part of the Page Transition Course
### Learn about Barba.js
We recorded a full course to guide you through the world of Barba.js. On top of that, we built a boilerplate that this resource is based on. In the course, we’ll teach you exactly how it all works.
### Scripts
```text
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.17/dist/lenis.css">
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/@barba/core@2.10.3/dist/barba.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/CustomEase.min.js"></script>
```
### Barba.js HTML attributes
### HTML
```text
<body data-barba="wrapper">
  <main data-barba="container">
    <section></section>
    <section></section>
    <section></section>
  </main>
</body>
```
### Barba.js JavaScript Setup
Learn more about how to use and addapt the Barba.js JavaScript setup in Lesson 3.1 of the Osmo Page Transition Course.
ExpandCollapse
### Javascript
```javascript
// -----------------------------------------
// OSMO PAGE TRANSITION BOILERPLATE
// -----------------------------------------
gsap.registerPlugin(CustomEase);
history.scrollRestoration = "manual";
let lenis = null;
let nextPage = document;
let onceFunctionsInitialized = false;
const hasLenis = typeof window.Lenis !== "undefined";
const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
const rmMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
let reducedMotion = rmMQ.matches;
rmMQ.addEventListener?.("change", e => (reducedMotion = e.matches));
rmMQ.addListener?.(e => (reducedMotion = e.matches)); 
const has = (s) => !!nextPage.querySelector(s);
let staggerDefault = 0.05;
let durationDefault = 0.6;
CustomEase.create("osmo", "0.625, 0.05, 0, 1");
gsap.defaults({ ease: "osmo", duration: durationDefault });
// -----------------------------------------
// FUNCTION REGISTRY
// -----------------------------------------
function initOnceFunctions() {
  initLenis();
  if (onceFunctionsInitialized) return;
  onceFunctionsInitialized = true;
  // Runs once on first load
  // if (has('[data-something]')) initSomething();
}
function initBeforeEnterFunctions(next) {
  nextPage = next || document;
  // Runs before the enter animation
  // if (has('[data-something]')) initSomething();
}
function initAfterEnterFunctions(next) {
  nextPage = next || document;
  // Runs after enter animation completes
  // if (has('[data-something]')) initSomething();
  if(hasLenis){
    lenis.resize();
  }
  if (hasScrollTrigger) {
    ScrollTrigger.refresh();
  }
}
// -----------------------------------------
// PAGE TRANSITIONS
// -----------------------------------------
function runPageOnceAnimation(next) {
  const tl = gsap.timeline();
  tl.call(() => {
    resetPage(next)
  }, null, 0);
  return tl;
}
function runPageLeaveAnimation(current, next) {
  const tl = gsap.timeline({
    onComplete: () => { current.remove() }
  });
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    return tl.set(current, { autoAlpha: 0 });
  }
  tl.to(current, { autoAlpha: 0, duration: 0.4 });
  return tl;
}
function runPageEnterAnimation(next){
  const tl = gsap.timeline();
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady")
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }
  tl.add("startEnter", 0.6);
  tl.fromTo(next, {
    autoAlpha: 0,
  },{
    autoAlpha: 1,
  }, "startEnter");
  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");
  return new Promise(resolve => {
    tl.call(resolve, null, "pageReady");
  });
}
// -----------------------------------------
// BARBA HOOKS + INIT
// -----------------------------------------
barba.hooks.beforeEnter(data => {
  // Position new container on top
  gsap.set(data.next.container, {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  });
  if (lenis && typeof lenis.stop === "function") {
    lenis.stop();
  }
  initBeforeEnterFunctions(data.next.container);
  applyThemeFrom(data.next.container);
});
barba.hooks.afterLeave(() => {
  if(hasScrollTrigger){
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
});
barba.hooks.enter(data => {
  initBarbaNavUpdate(data);
})
barba.hooks.afterEnter(data => {
  // Run page functions
  initAfterEnterFunctions(data.next.container);
  // Settle
  if(hasLenis){
    lenis.resize();
    lenis.start();    
  }
  if(hasScrollTrigger){
    ScrollTrigger.refresh(); 
  }
});
barba.init({
  debug: true, // Set to 'false' in production
  timeout: 7000,
  preventRunning: true,
  transitions: [
    {
      name: "default",
      sync: true,
      // First load
      async once(data) {
        initOnceFunctions();
        return runPageOnceAnimation(data.next.container);
      },
      // Current page leaves
      async leave(data) {
        return runPageLeaveAnimation(data.current.container, data.next.container);
      },
      // New page enters
      async enter(data) {
        return runPageEnterAnimation(data.next.container);
      }
    }
  ],
});
// -----------------------------------------
// GENERIC + HELPERS
// -----------------------------------------
const themeConfig = {
  light: {
    nav: "dark",
    transition: "light"
  },
  dark: {
    nav: "light",
    transition: "dark"
  }
};
function applyThemeFrom(container) {
  const pageTheme = container?.dataset?.pageTheme || "light";
  const config = themeConfig[pageTheme] || themeConfig.light;
  document.body.dataset.pageTheme = pageTheme;
  const transitionEl = document.querySelector('[data-theme-transition]');
  if (transitionEl) {
    transitionEl.dataset.themeTransition = config.transition;
  }
  const nav = document.querySelector('[data-theme-nav]');
  if (nav) {
    nav.dataset.themeNav = config.nav;
  }
}
function initLenis() {
  if (lenis) return; // already created
  if (!hasLenis) return;
  lenis = new Lenis({
    lerp: 0.165,
    wheelMultiplier: 1.25,
  });
  if (hasScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
  }
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
function resetPage(container){
  window.scrollTo(0, 0);
  gsap.set(container, { clearProps: "position,top,left,right" });
  if(hasLenis){
    lenis.resize();
    lenis.start();    
  }
}
function debounceOnWidthChange(fn, ms) {
  let last = innerWidth,
    timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (innerWidth !== last) {
        last = innerWidth;
        fn.apply(this, args);
      }
    }, ms);
  };
}
function initBarbaNavUpdate(data) {
  var tpl = document.createElement('template');
  tpl.innerHTML = data.next.html.trim();
  var nextNodes = tpl.content.querySelectorAll('[data-barba-update]');
  var currentNodes = document.querySelectorAll('nav [data-barba-update]');
  currentNodes.forEach(function (curr, index) {
    var next = nextNodes[index];
    if (!next) return;
    // Aria-current sync
    var newStatus = next.getAttribute('aria-current');
    if (newStatus !== null) {
      curr.setAttribute('aria-current', newStatus);
    } else {
      curr.removeAttribute('aria-current');
    }
    // Class list sync
    var newClassList = next.getAttribute('class') || '';
    curr.setAttribute('class', newClassList);
  });
}
// -----------------------------------------
// YOUR FUNCTIONS GO BELOW HERE
// -----------------------------------------
```
### HTML
```text
<div data-transition-wrap class="transition">
  <div data-transition-panel class="transition__panel">
    <div data-transition-col class="transition__col">
      <div data-transition-pixel class="transition__pixel"></div>
    </div>
  </div>
</div>
```
### CSS
```text
.transition {
  z-index: 100;
  pointer-events: none;
  position: fixed;
  inset: 0;
  overflow: clip;
}
.transition__panel {
  opacity: 0;
  flex-flow: row;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
.transition__col {
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  display: flex;
}
.transition__pixel {
  aspect-ratio: 1;
  background-color: #7948e9;
  width: 100%;
}
```
### Javascript
```javascript
// -----------------------------------------
// PAGE TRANSITIONS
// -----------------------------------------
const pixelHorizontalAmount = 12;
const transitionDuration = 1;
const pixelFadeDuration = 0.2;
const pixelOverlap = 0.3;
function runPageOnceAnimation(next) {
  const tl = gsap.timeline();
  tl.call(() => {
    resetPage(next)
  }, null, 0);
  return tl;
}
function runPageLeaveAnimation(current, next) {
  const tl = gsap.timeline();
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    tl.set(current, { autoAlpha: 0 });
    tl.call(() => current.remove(), null, 0);
    return tl;
  }
  // Run PixelGrid Helper
  const isPortrait = window.innerHeight > window.innerWidth;
  pixelGrid(isPortrait);
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionPanel = transitionWrap.querySelector("[data-transition-panel]");
  const lines = Array.from(transitionPanel.querySelectorAll("[data-transition-col]"));
  const allPixels = transitionPanel.querySelectorAll("[data-transition-pixel]");
  const overlap = Math.max(0, Math.min(1, pixelOverlap));
  const clipFrom = isPortrait ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
  const clipTo = isPortrait ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  const clipStart = Math.min(pixelFadeDuration, transitionDuration * 0.5);
  const clipDuration = Math.max(0.001, transitionDuration - 2 * clipStart);
  const stepDur = clipDuration / Math.max(1, pixelHorizontalAmount);
  const transitionEndDelay = transitionDuration / Math.max(1, pixelHorizontalAmount);
  gsap.set(allPixels, { opacity: 0, willChange: "opacity" });
  gsap.set(transitionPanel, { opacity: 1, willChange: "opacity" });
  gsap.set(next, {
    autoAlpha: 1,
    clipPath: clipFrom,
    webkitClipPath: clipFrom,
    willChange: "clip-path",
    force3D: true,
    maxHeight: "100dvh"
  });
  lines.forEach((line, i) => {
    const pixels = Array.from(line.querySelectorAll("[data-transition-pixel]"));
    if (!pixels.length) return;
    const revealTime = clipStart + i * stepDur;
    const fillStart = Math.max(0, revealTime - pixelFadeDuration);
    const fadeStart = Math.min(transitionDuration, revealTime + stepDur);
    const fadeEnd = Math.min(transitionDuration, fadeStart + pixelFadeDuration);
    const perPixelMin = pixelFadeDuration / pixels.length;
    const perPixelDur = perPixelMin * (1 - overlap) + pixelFadeDuration * overlap;
    const spread = Math.max(0, pixelFadeDuration - perPixelDur);
    // Animate Pixels In
    tl.to(pixels, {
      opacity: 1,
      duration: Math.max(0.001, perPixelDur),
      ease: "none",
      stagger: { 
        amount: spread, 
        from: "random" 
      }
    }, fillStart);
    // Animate Pixels Out
    tl.to(pixels, {
      opacity: 0,
      duration: Math.max(0.001, perPixelDur),
      ease: "none",
      stagger: { 
        amount: spread, 
        from: "random" 
      }
    }, fadeStart);
  });
  // Animate Clip Path
  tl.to(next, {
    clipPath: clipTo,
    webkitClipPath: clipTo,
    ease: \`steps(${pixelHorizontalAmount}, start)\`,
    duration: clipDuration
  }, clipStart);
  tl.set(next, { clearProps: "clipPath,webkitClipPath,willChange,force3D,maxHeight" }, clipStart + clipDuration);
  tl.call(() => {
    current.remove();
  }, null, transitionDuration + transitionEndDelay);
  tl.set(allPixels, { clearProps: "willChange" }, transitionDuration + transitionEndDelay);
  tl.set(transitionPanel, { clearProps: "willChange" }, transitionDuration + transitionEndDelay);
  return tl;
}
function runPageEnterAnimation(next) {
  const tl = gsap.timeline();
  const transitionEndDelay = transitionDuration / Math.max(1, pixelHorizontalAmount);
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady")
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }
  tl.add("pageReady", transitionDuration + transitionEndDelay);
  tl.call(resetPage, [next], "pageReady");
  return new Promise((resolve) => {
    tl.call(resolve, null, "pageReady");
  });
}
// Helper: Create the PixelGrid
function pixelGrid(isPortrait) {
  const panel = document.querySelector("[data-transition-panel]");
  if (!panel) return;
  const rect = panel.getBoundingClientRect();
  panel.style.flexDirection = isPortrait ? "column" : "row";
  const lineSizePx = isPortrait ? rect.height / pixelHorizontalAmount : rect.width / pixelHorizontalAmount;
  const crossAmount = Math.ceil((isPortrait ? rect.width : rect.height) / lineSizePx);
  let lines = panel.querySelectorAll("[data-transition-col]");
  const lineTemplate = lines[0];
  const pixelTemplate = lineTemplate.querySelector("[data-transition-pixel]");
  if (lines.length !== pixelHorizontalAmount) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < pixelHorizontalAmount; i++) {
      frag.appendChild(lineTemplate.cloneNode(false));
    }
    panel.replaceChildren(frag);
    lines = panel.querySelectorAll("[data-transition-col]");
  }
  lines.forEach((line) => {
    line.style.flexDirection = isPortrait ? "row" : "column";
    line.style.flex = "1 1 auto";
    line.style.justifyContent = "center";
    const diff = crossAmount - line.childElementCount;
    if (diff > 0) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < diff; i++) {
        frag.appendChild(pixelTemplate.cloneNode(true));
      }
      line.appendChild(frag);
    } else if (diff < 0) {
      for (let i = diff; i < 0; i++) {
        line.lastElementChild.remove();
      }
    }
  });
}
```
### CSS
### Template Setup
**Navigation:** Inside or outside container
**Transition div:** Yes, outside the container
### HTML
```text
<body data-barba="wrapper">
  <div data-transition-wrap>...</div>
  <main data-barba="container">
    <nav>...</nav>  
    <!-- page content here -->
  </main>
</body>
```
#### How to use
Copy the full code block from this page, and replace the `// PAGE TRANSITIONS` section in your boilerplate. This includes the transition functions and any helpers they need.
#### Transition explained
This page transition uses a pixel grid overlay plus a `step()` clip-path reveal. Everything happens in the `leave` phase, so the next page is already in place behind the scenes while the transition does its thing.
First, a grid of columns and pixels is created based on the viewport size with help of the `pixelGrid()` Helper Funtion. The next page is then revealed with a clip-path that moves in discrete “steps”, matching the number of grid columns. While that stepped reveal moves forward, each column’s pixels quickly fade in, then fade back out, giving that shimmering pixel wipe feeling.
#### Portrait behavior
On portrait screens the grid rebuilds itself to match the vertical layout. Columns become horizontal rows, and the stepped clip reveal moves from top to bottom instead of left to right.
### Customization
#### Timing Variables
### Javascript
```javascript
const pixelHorizontalAmount = 12;
const transitionDuration = 1;
const pixelFadeDuration = 0.2;
const pixelOverlap = 0.3;
```
**Pixels Horizontal Amount**  
Controls how many columns the transition is divided into. Higher values give smaller pixels and a more detailed effect, lower values feel chunkier and more retro.
**Transition Duration**  
Total length of the leave animation, including the pixel flicker and the clip-path reveal.
**Pixel Fade Duration**  
How fast pixels fade in and out per column. Smaller values feel snappier and more glitchy, larger values feel softer and more dreamy.
**Pixel Overlap**  
Controls how much the pixel fades overlap within a column. Lower values make pixels more sequential, higher values makes them fade more together for a denser flash.
#### Stagger
Play around with: random, start, end, center & edges. More information about [GSAP Staggers](https://gsap.com/resources/getting-started/Staggers/).
### Javascript
```javascript
// Animate Pixels In
tl.to(pixels, {
  opacity: 1,
  duration: Math.max(0.001, perPixelDur),
  ease: "none",
  stagger: { 
    amount: spread, 
    from: "random" // Try different staggers options here
  }
}, fillStart);
// Animate Pixels Out
tl.to(pixels, {
  opacity: 0,
  duration: Math.max(0.001, perPixelDur),
  ease: "none",
  stagger: { 
    amount: spread,
    from: "random" // Try different staggers options here
  }
}, fadeStart);
```
#### Rainbow Effect
You can optionally give the pixels a rainbow gradient instead of a solid color. Each pixel gets a hue based on its position, creating a smooth diagonal spectrum that reveals itself naturally during the transition.
Add the snippet at the end of `pixelGrid(isPortrait)`, just before the last `}`. You can tweak the look by adjusting the HSL saturation and lightness values to make it softer or more vibrant.
### Javascript
```javascript
// Addition: Rainbow Colored Pixels
const cols = Array.from(panel.querySelectorAll("[data-transition-col]"));
if (!cols.length) return;
const isColRow = isPortrait;
const primaryCount = cols.length;
const secondaryCount = cols[0].querySelectorAll("[data-transition-pixel]").length;
const total = primaryCount * secondaryCount;
let index = 0;
for (let y = 0; y < (isColRow ? primaryCount : secondaryCount); y++) {
  for (let x = 0; x < (isColRow ? secondaryCount : primaryCount); x++) {
    const col = isColRow ? cols[y] : cols[x];
    const px = col.querySelectorAll("[data-transition-pixel]")[isColRow ? x : y];
    if (!px) continue;
    const t = total <= 1 ? 0 : index / (total - 1);
    const hue = Math.round(t * 360);
    px.style.backgroundColor = \`hsl(${hue} 90% 60%)\`;
    index++;
  }
}
```