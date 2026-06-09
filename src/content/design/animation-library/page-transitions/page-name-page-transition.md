---
title: "Page Name Transition (Wipe)"
description: "Page Name Transition (Wipe)."
slug: "page-transitions/page-name-page-transition"
previewVideo: "page-name-page-transition.mp4"
order: 49.876
published: true
categories: ["page-transition"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["page", "name", "transition", "wipe"]
sourceUrl: "https://www.osmo.supply/resource/page-name-transition-wipe"
---
## Setup
This resource is part of the Page Transition Course
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
Barba.js Boilerplate 2/2: JavaScript Setup
Expand Collapse
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
    <span data-transition-label class="transition__label">
      <span>[ </span>
      <span data-transition-label-text>Welcome</span>
      <span> ]</span>
    </span>
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
  background-color: #30463e;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 100%;
  left: 0;
}
.transition__label {
  color: #cbe88a;
  text-transform: uppercase;
  font-family: Haffer Mono, Arial, sans-serif;
  font-size: 2.5em;
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
  const transitionLabel = transitionWrap.querySelector("[data-transition-label]");
  const transitionLabelText = transitionWrap.querySelector("[data-transition-label-text]");
  const nextPageName = next.getAttribute("data-page-name")
  transitionLabelText.innerText = nextPageName || "Hi there";
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
  tl.set(next,{
    autoAlpha: 0
  }, 0);
  tl.fromTo(transitionPanel,{
    yPercent: 0
  },{
    yPercent: -100,
    duration: 0.8,
  }, 0);
  tl.fromTo(transitionLabel, {
    autoAlpha: 0
  },{
    autoAlpha: 1
  }, "<+=0.2");
  tl.fromTo(current,{
    y: "0vh"
  },{
    y: "-15vh",
    duration: 0.8,
  }, 0);
}
function runPageEnterAnimation(next){
  const transitionWrap = document.querySelector("[data-transition-wrap]");
  const transitionPanel = transitionWrap.querySelector("[data-transition-panel]");
  const transitionLabel = transitionWrap.querySelector("[data-transition-label]");
  const transitionLabelText = transitionWrap.querySelector("[data-transition-label-text]");
  const tl = gsap.timeline();
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady")
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }  
  tl.add("startEnter", 1.25);
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
  tl.set(transitionPanel, {
    autoAlpha: 0
  }, ">");
  tl.fromTo(transitionLabel, {
    autoAlpha: 1
  },{
    autoAlpha: 0,
    duration: 0.4,
    overwrite: "auto",
    immediateRender: false
  }, "startEnter+=0.1");
  tl.from(next, {
    y: "15vh",
    duration: 1,
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
#### Page name attribute
Add an attribute `data-page-name="name here"` on every Barba container on your website.
#### How to use
Copy the full code block from this page, and replace the `// PAGE TRANSITIONS` section in your boilerplate. This includes the transition functions and any helpers they need.
#### Transition explained
This is a page name wipe. A panel slides up to cover the screen, displays the name of the page you're navigating to, then continues upward to reveal the new page underneath.
The transition reads `data-page-name` from the incoming container and sets it as the label text, with a fallback of "Hi there" if the attribute is missing. The current page shifts up slightly as the panel covers it, creating a sense of depth.
The panel uses `yPercent` to move through three states: starts at `0` (below viewport), animates to `-100` (covering the screen), holds while the label fades in, then continues to `-200` (above viewport) to reveal the new page. The `startEnter` label at 1.25 seconds controls when the reveal begins, giving the label time to be read.
The new page fades in and rises from below (`y: 15vh`) as the panel exits, creating a smooth handoff. Panel visibility is reset at the end so it's ready for the next transition.