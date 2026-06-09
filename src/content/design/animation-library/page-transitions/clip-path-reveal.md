---
title: "Clip-path Reveal"
description: "Clip-path Reveal."
slug: "page-transitions/clip-path-reveal"
previewVideo: "clip-path-reveal.mp4"
order: 49.886
published: true
categories: ["page-transition"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["clip", "path", "reveal"]
sourceUrl: "https://www.osmo.supply/page-transition-course/clip-path-reveal"
---
This one's more advanced. We'll create a circular clip-path reveal that expands from wherever the user clicked. To pull this off we need to wrap the container in a temporary div, which means we're introducing helper functions.
### Lesson notes
#### What we're building
A circular clip-path reveal that expands from wherever the user clicked. The new page is wrapped in a clipped div, and the circle grows outward until the full page is visible.
#### Why we need to wrap the container
We want to apply a clip-path to the new page, but we need a fixed, viewport-sized element to clip. So we create a wrapper div, make it full viewport, put the new container inside, and animate the clip-path on the wrapper.
#### Helper functions
If you create it, you clean it up. We use two helpers:
```javascript
function wrapElement(el) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('clip-reveal-wrapper');
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
  return wrapper;
}
function unwrapElement(el) {
  const wrapper = el.parentNode;
  wrapper.parentNode.insertBefore(el, wrapper);
  wrapper.remove();
}
```
#### Getting click coordinates
Barba gives us `data.event`, which has `clientX` and `clientY`, the cursor position relative to the viewport.
#### Calculating the radius
The circle needs to expand until it covers the entire viewport. We calculate the distance to the furthest corner:
```javascript
const x = event.clientX;
const y = event.clientY;
const maxDistance = Math.max(
  Math.hypot(x, y),
  Math.hypot(window.innerWidth - x, y),
  Math.hypot(x, window.innerHeight - y),
  Math.hypot(window.innerWidth - x, window.innerHeight - y)
);
```
#### The flow
1. Leave: capture click coordinates, calculate radius
2. Wrap `next` in a clipped div
3. Set `clip-path: circle(0px at Xpx Ypx)`
4. Animate to `circle(${maxDistance}px at Xpx Ypx)`
5. Old page visible behind, gets removed when done
6. Enter: unwrap the container, pageReady, done
### Lesson code
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
function runPageLeaveAnimation(current, next, event) {
  const x = event.clientX;
  const y = event.clientY;
  const maxDistance = Math.max(
    Math.hypot(x, y),
    Math.hypot(window.innerWidth - x, y),
    Math.hypot(x, window.innerHeight - y),
    Math.hypot(window.innerWidth - x, window.innerHeight - y)
  );  
  const wrapper = wrapElement(next);
  gsap.set(wrapper, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: 999,
    clipPath: \`circle(0px at ${x}px ${y}px)\`
  });
  const tl = gsap.timeline({
    onComplete: () => { current.remove() }
  });
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    return tl.set(current, { autoAlpha: 0 });
  }
  tl.to(wrapper, {
    clipPath: \`circle(${maxDistance}px at ${x}px ${y}px)\`,
    duration: 0.8,
  });
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
  tl.add("startEnter", 0.85);
  tl.call(() => {
    unwrapElement(next);
  }, null, "startEnter");
  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");
  return new Promise(resolve => {
    tl.call(resolve, null, "pageReady");
  });
}
function wrapElement(el) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('clip-reveal-wrapper');
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
  return wrapper;
}
function unwrapElement(el) {
  const wrapper = el.parentNode;
  wrapper.parentNode.insertBefore(el, wrapper);
  wrapper.remove();
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
  if(hasLenis){
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
        return runPageLeaveAnimation(data.current.container, data.next.container, data.event);
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