---
title: "Curved Wipe Page Transition"
description: "Curved Wipe Page Transition."
slug: "curved-wipe-page-transition"
previewVideo: "curved-wipe-page-transition.mp4"
order: 49.935
published: true
categories: ["page-transition", "media"]
triggers: ["scroll", "load"]
libraries: ["gsap"]
keywords: ["curved", "wipe", "page", "transition"]
sourceUrl: "https://www.osmo.supply/resource/curved-wipe-page-transition"
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
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomEase.min.js"></script>
```
Barba.js Boilerplate 1/2: HTML Setup
### Barba.js HTML attributes
Learn more about how to setup the Barba.js HTML attributes in Lesson 2.2 of the Osmo Page Transition Course.
ExpandCollapse
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
Barba.js Boilerplate 2/2: JavaScript Setup
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
    <div data-transition-panel-top class="transition__panel-top">
      <div class="transition__panel-circle"></div>
    </div>
    <div data-transition-panel-bottom class="transition__panel-bottom">
      <div class="transition__panel-circle"></div>
    </div>
  </div>
  <div data-transition-logo class="transition__logo">
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
  color: #201d1d;
  background-color: currentColor;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 100%;
  left: 0;
}
.transition__panel-top {
  transform-origin: bottom;
  flex-flow: column;
  align-items: center;
  width: 100%;
  height: 0%;
  display: flex;
  position: absolute;
  bottom: calc(100% - 1px);
  left: 0;
  overflow: hidden;
}
.transition__panel-bottom {
  transform-origin: top;
  flex-flow: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 0%;
  display: flex;
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  overflow: hidden;
}
.transition__panel-circle {
  aspect-ratio: auto;
  background-color: currentColor;
  border-radius: 50%;
  width: 125%;
  height: 500%;
  position: absolute;
}
.transition__logo {
  color: #f4f4f4;
  opacity: 0;
  width: 11em;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);
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
  const transitionPanel = transitionWrap.querySelector("[data-transition-panel]");
  const transitionPanelTop = transitionWrap.querySelector("[data-transition-panel-top]");
  const transitionPanelBottom = transitionWrap.querySelector("[data-transition-panel-bottom]");
  const transitionLogo = transitionWrap.querySelector("[data-transition-logo]");
  const transitionLogoPath = transitionWrap.querySelectorAll("path");
  const tl = gsap.timeline({
    onComplete: () => { current.remove() }
  });
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    return tl.set(current, { autoAlpha: 0 });
  }
  tl.set(transitionPanel, {
    autoAlpha: 1
  }, 0);
  tl.set(transitionPanelTop, {
    scaleY: 0,
    height: "15vw"
  }, 0);
  tl.set(transitionPanelBottom, {
    scaleY: 1,
    height: "20vw"
  }, 0);
  tl.set(transitionLogo, {
    autoAlpha: 1
  });
  tl.set(transitionLogoPath, {
    yPercent: 105
  });
  tl.set(next,{
    autoAlpha: 0
  }, 0);
  tl.fromTo(transitionPanel,{
    yPercent: 0
  },{
    yPercent: -100,
    duration: 1,
  }, 0);
  tl.fromTo(transitionPanelTop,{
    scaleY: 0
  },{
    scaleY: 1,
    duration: 1,
  }, "<");
  tl.fromTo(transitionLogoPath, {
    yPercent: 105
  },{
    yPercent: 0,
    duration: 0.8,
    ease: "expo.out",
    stagger: {
      amount: 0.06
    }
  }, "<+=0.4");
  tl.fromTo(current,{
    y: "0vh"
  },{
    y: "-15dvh",
    duration: 1,
  }, 0);
}
function runPageEnterAnimation(next){
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionPanel = transitionWrap.querySelector("[data-transition-panel]");
  const transitionPanelTop = transitionWrap.querySelector("[data-transition-panel-top]");
  const transitionPanelBottom = transitionWrap.querySelector("[data-transition-panel-bottom]");
  const transitionLogo = transitionWrap.querySelector("[data-transition-logo]");
  const transitionLogoPath = transitionWrap.querySelectorAll("path");
  const tl = gsap.timeline();
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady")
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }  
  tl.add("startEnter", 1.35);
  tl.set(next, {
    autoAlpha: 1,
  }, "startEnter");
  tl.fromTo(transitionPanel, {
    yPercent: -100,
  },{
    yPercent: -200,
    duration: 1,
    overwrite: "auto",
    immediateRender: false
  }, "startEnter");
  tl.fromTo(transitionPanelBottom,{
    scaleY: 1
  },{
    scaleY: 0,
    duration: 1,
  }, "<");
  tl.set(transitionPanel, {
    autoAlpha: 0
  }, ">");
  tl.to(transitionLogoPath, {
    yPercent: -130,
    duration: 1.2,
    ease: "expo.inOut",
    stagger: {
      amount: -0.06
    }
  }, "startEnter-=0.4");
  tl.from(next, {
    y: "25dvh",
    duration: 1,
  }, "startEnter");
  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");
  return new Promise(resolve => {
    tl.call(resolve, null, "pageReady");
  });
}
```
### CSS
### Template Setup
**Navigation:** Inside container
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
This curved wipe transition moves from bottom to top, covering the screen before continuing upward to reveal the new page underneath. At the same time, the rounded top and bottom elements scale on the Y axis to create a smooth rounded effect.
Replace the `<svg>` with your own logo and make sure each letter is a single `<path>` and ordered correctly inside the `<svg>` visually from left to right.
The panel uses `yPercent` to move through three states. It starts at `0`, below the viewport, animates to `-100` to cover the screen, holds while the label fades in, then continues to `-200` above the viewport to reveal the new page. The startEnter label at 1.35 seconds controls when the reveal begins, giving the label time to be read.