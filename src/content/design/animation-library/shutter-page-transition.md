---
title: "Shutter Page Transition"
description: "Panel shutter wipe between pages with GSAP."
slug: "shutter-page-transition"
previewVideo: "shutter-page-transition.mp4"
order: 98
published: true
categories: ["page-transition"]
triggers: ["click", "load"]
libraries: ["gsap"]
keywords: ["barba", "shutter", "transition"]
sourceUrl: "https://www.osmo.supply/resource/shutter-page-transition"
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
    <div data-transition-shutter class="transition__shutter"></div>
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
  flex-flow: column;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
.transition__shutter {
  background-color: #c5c1b1;
  width: 100%;
  height: 100%;
}
```
### Javascript
```javascript
// -----------------------------------------
// PAGE TRANSITIONS
// -----------------------------------------
const shutterAmountConfig = {
  desktop: 10,
  tablet: 10,
  mobileLandscape: 10,
  mobile: 10
};
const transitionDuration = 0.5;
const shutterStaggerAmount = 0.3;
function runPageOnceAnimation(next) {
  const tl = gsap.timeline();
  tl.call(() => {
    resetPage(next);
  }, null, 0);
  return tl;
}
function runPageLeaveAnimation(current, next) {
  generateShutters(); // Run shutters Helper
  const transitionPanel = document.querySelector("[data-transition-panel]");
  const allShutters = transitionPanel.querySelectorAll("[data-transition-shutter]");
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
  tl.set(transitionPanel, {
    opacity: 1,
    pointerEvents: "none"
  }, 0);
  tl.set(allShutters, {
    scaleY: 1.02,
    yPercent: 50,
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  }, 0);
  tl.to(allShutters, {
    duration: transitionDuration,
    ease: "power3.in",
    yPercent: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    yPercent: 0,
    stagger: {
      amount: shutterStaggerAmount,
      from: "end"
    }
  }, 0);
  tl.fromTo(current,{
    y: "0vh"
  },{
    y: "-15vh",
    ease: "power3.in",
    duration: transitionDuration * 1.5
  }, 0);
  return tl;
}
function runPageEnterAnimation(next) {
  const transitionPanel = document.querySelector("[data-transition-panel]");
  const allShutters = transitionPanel.querySelectorAll("[data-transition-shutter]");
  const tl = gsap.timeline();
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady")
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }
  const totalCoverDuration = transitionDuration + shutterStaggerAmount;
  tl.add("startEnter", totalCoverDuration);
  tl.set(next, {
    autoAlpha: 1
  }, "startEnter");
  tl.to(allShutters, {
    duration: transitionDuration * 1.5,
    ease: "expo.out", 
    clipPath: "polygon(0% 0%, 100% 0%, 100% -2%, 0% -2%)",
    yPercent: -50,
    stagger: {
      amount: shutterStaggerAmount,
      from: "end"
    },
    overwrite: "auto",
  }, "startEnter");
  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");
  tl.from(next, {
    ease: "expo.out",
    y: "20vh",
    duration: totalCoverDuration,
  }, "startEnter");
  return new Promise(resolve => {
    tl.call(resolve, null, "pageReady");
  });
}
// Helper: Generate the Shutters
function generateShutters() {
  const panel = document.querySelector("[data-transition-panel]");
  if (!panel) return;
  const width = window.innerWidth;
  const isLandscape = window.innerWidth > window.innerHeight;
  let shutterAmount = shutterAmountConfig.desktop;
  if (width <= 479) {
    shutterAmount = shutterAmountConfig.mobile;
  } else if (width <= 767) {
    shutterAmount = isLandscape ? shutterAmountConfig.mobileLandscape : shutterAmountConfig.mobile;
  } else if (width <= 991) {
    shutterAmount = shutterAmountConfig.tablet;
  }
  const shutters = panel.querySelectorAll("[data-transition-shutter]");
  if (shutters.length === shutterAmount) return;
  const template = shutters[0];
  if (!template) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < shutterAmount; i++) {
    frag.appendChild(template.cloneNode(true));
  }
  panel.replaceChildren(frag);
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
This transition covers the page using layered shutters that animate in reverse order. Once the screen is fully covered, the new page loads underneath, and the shutters move away in the opposite direction. It is simple, fast, and creates a clean visual break without complex motion.
### Customization
#### Variables
### Javascript
```javascript
const shutterAmountConfig = {
  desktop: 10,
  tablet: 10,
  mobileLandscape: 10,
  mobile: 10
};
const transitionDuration = 0.5;
const shutterStaggerAmount = 0.3;
```
#### Shutter Layers Amount
The `shutterAmountConfig` controls how many shutter layers are used across the screen.
- `desktop` → 992px and up
- `tablet` → 768px to 991px
- `mobileLandscape` → 480px to 767px (landscape)
- `mobile` → 0px to 767px (portrait, and all under 480px)
#### Transition Duration
The `transitionDuration` controls how long each shutter layer takes to animate.
#### Shutter Stagger Amount
The `shutterStaggerAmount` controls how spread out the animation is across all shutter layers.