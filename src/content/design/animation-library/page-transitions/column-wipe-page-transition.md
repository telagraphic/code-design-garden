---
title: "Column Wipe Page Transition"
description: "Column Wipe Page Transition."
slug: "page-transitions/column-wipe-page-transition"
previewVideo: "column-wipe-page-transition.mp4"
order: 49.884
published: true
categories: ["page-transition"]
triggers: ["scroll", "load"]
libraries: ["gsap"]
keywords: ["column", "wipe", "page", "transition"]
sourceUrl: "https://www.osmo.supply/resource/column-wipe-page-transition"
---
## Setup
### HTML
```text
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.17/dist/lenis.css">
<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/@barba/core@2.10.3/dist/barba.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/CustomEase.min.js"></script>
```
Barba.js Boilerplate 1/2: HTML Setup
Expand Collapse
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
  <div class="transition__panels">
    <div data-transition-column class="transition__panel"></div>
    <div data-transition-column class="transition__panel"></div>
    <div data-transition-column class="transition__panel"></div>
    <div data-transition-column class="transition__panel"></div>
    <div data-transition-column class="transition__panel"></div>
  </div>
  <div class="transition__lines">
    <div class="transition__line"></div>
    <div class="transition__line"></div>
    <div class="transition__line"></div>
    <div class="transition__line"></div>
    <div class="transition__line is--last"></div>
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
.transition__panels {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
.transition__panel {
  background-color: #676a6a;
  width: 100%;
  height: 100%;
  position: relative;
  top: -100%;
}
.transition__lines {
  opacity: .1;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
.transition__line {
  border-right: 1px solid #fff;
  width: 100%;
  height: 100%;
}
.transition__line.is--last {
  border-right-style: none;
}
```
### Javascript
```javascript
// -----------------------------------------
// PAGE TRANSITIONS
// -----------------------------------------
function runPageOnceAnimation(next) {
  const tl = gsap.timeline();
  tl.call(() => {
    resetPage(next);
  }, null, 0);
  return tl;
}
function runPageLeaveAnimation(current, next) {
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionColumns = transitionWrap.querySelectorAll("[data-transition-column]");
  const tl = gsap.timeline({
    onComplete: () => { current.remove() }
  });
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    return tl.set(current, { autoAlpha: 0 });
  }
  tl.set(next, {
    autoAlpha: 0,
  }, 0);
  tl.fromTo(transitionColumns, {
    yPercent: 0
  },{
    yPercent: 100,
    duration: 0.6,
    stagger: {
      each: 0.06,
      from: "end"
    },
  }, 0);
  return tl;
}
function runPageEnterAnimation(next){
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionColumns = transitionWrap.querySelectorAll("[data-transition-column]");
  const tl = gsap.timeline();
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady")
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }
  tl.add("startEnter", 1);
  tl.set(next, {
    autoAlpha: 1,
  }, "startEnter");
  tl.to(transitionColumns, {
    yPercent: 200,
    duration: 0.6,
    stagger: 0.06,
    overwrite: "auto",
  }, "startEnter");
  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");
  return new Promise(resolve => {
    tl.call(resolve, null, "pageReady");
  });
}
```
### Template Setup
**Navigation:** Inside container
**Transition div:** Yes, outside the container
#### How to use
Copy the full code block from this page, and replace the `// PAGE TRANSITIONS` section in your boilerplate. This includes the transition functions and any helpers they need.
#### Transition explained
This is a column wipe transition. Multiple vertical columns slide down in sequence to cover the screen, then continue downward to reveal the new page underneath. The staggered timing creates a wave effect across the viewport.
The columns use `yPercent` to move through three states: start at `0` (above viewport, covering the page), animate to `100` (covering the screen), then continue to `200` (below viewport) to reveal the new page. The `stagger` option with `from: "end"` makes the columns animate from right to left during leave, then left to right during enter, creating a satisfying back-and-forth rhythm.
The `startEnter` label at 1 second gives the columns time to fully cover the screen before the reveal begins. The new page is hidden with `autoAlpha: 0` during leave and made visible at `startEnter`, so the swap happens while everything is covered.