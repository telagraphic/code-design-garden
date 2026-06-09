---
title: "Page Name Transition"
description: "Page Name Transition."
slug: "page-transitions/page-name-transition"
previewVideo: "page-name-transition.mp4"
order: 49.875
published: true
categories: ["page-transition"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["page", "name", "transition"]
sourceUrl: "https://www.osmo.supply/page-transition-course/page-name-transition"
---
What if your transition could be contextual? In this lesson we'll pull the page name from a custom attribute and display it in an overlay during the transition. Barba gives you info about where you're going, let's use it.
### Lesson notes
#### Links
- [Barba Data Object Documentation](https://barba.js.org/docs/advanced/hooks/#data-argument)
- [Cyphr project by Ilja](https://www.cyphr.studio/)
#### What we're building
During the transition, an overlay appears with the name of the page you're navigating to. The text animates in, holds, then animates out as the new page reveals.
#### Using data attributes for display text
Don't use `namespace` for display text. Namespace is an identifier, not always human readable. Instead, use a custom attribute like `data-page-name` on your container.
```text
<div data-barba="container" data-barba-namespace="case" data-page-name="Our Work">
```
#### The flow
1. Leave starts: overlay moves in
2. Read `data-page-name` from `next` container
3. Set the text content of your label element
4. Animate the label in
5. Enter starts: animate label out, overlay moves out
6. New page revealed
#### Getting the page name
```javascript
const pageName = next.getAttribute("data-page-name") || "Welcome";
label.textContent = pageName;
```
#### Fallback handling
Always set a fallback. If the attribute is missing, your transition shouldn't break. Use an empty string, the site name, or a generic word like "Loading".
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
    window.scrollTo(0, 0);
  }, null, 0);
  return tl;
}
function runPageLeaveAnimation(current, next) {
  const wrapper = document.querySelector("[data-transition-wrap]")
  const bg = wrapper.querySelector("[data-transition-bg]")
  const label = wrapper.querySelector("[data-transition-label]")
  const nextPageName = next.getAttribute("data-page-name") || 'hello there!';
  label.textContent = nextPageName;
  const tl = gsap.timeline({
    onComplete: () => { current.remove() }
  });
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    return tl.set(current, { autoAlpha: 0 });
  }
  tl.set(next,{
    autoAlpha: 0
  }, 0)
  tl.set(wrapper,{
    autoAlpha: 1,
    pointerEvents: "auto"
  }, 0)
  tl.fromTo(bg,{
    yPercent: 100
  },{
    yPercent: 0,
    duration: 0.8
  }, 0)
  tl.to(current,{
    y: "-15vh",
    duration: 0.8
  }, 0)
  tl.fromTo(label,{
    autoAlpha: 0
  }, {
    autoAlpha: 1
  }, "<+=0.3")
  return tl;
}
function runPageEnterAnimation(next){
  const wrapper = document.querySelector("[data-transition-wrap]")
  const bg = wrapper.querySelector("[data-transition-bg]")
  const label = wrapper.querySelector("[data-transition-label]")
  const tl = gsap.timeline();
  if (reducedMotion) {
    // Immediate swap behavior if user prefers reduced motion
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady")
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }
  tl.add("startEnter", 1.3);
  tl.set(next,{
    autoAlpha: 1
  }, "startEnter")
  tl.to(bg,{
    yPercent: -100,
    duration: 0.8
  }, "startEnter")
  tl.from(next,{
    y: "15vh",
    duration: 0.8
  }, "startEnter")
  tl.to(label,{
    autoAlpha: 0
  }, "startEnter")
  tl.set(wrapper,{
    autoAlpha: 0,
    pointerEvents: "none"
  })
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
        console.log(data)
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