---
title: "Grid-to-Detail with GSAP Flip"
description: "Grid-to-Detail with GSAP Flip."
slug: "page-transitions/grid-to-detail-gsap-flip"
previewVideo: "grid-to-detail-gsap-flip.mp4"
order: 49.879
published: true
categories: ["page-transition", "layout"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["grid", "detail", "gsap", "flip"]
sourceUrl: "https://www.osmo.supply/page-transition-course/grid-to-detail-with-gsap-flip"
---
The flagship example of why custom routes matter. We'll build a transition where clicking a project thumbnail on the work overview animates it seamlessly into the hero image on the case page. GSAP Flip makes it feel like one continuous element moving across the page swap.
### Lesson Notes
#### Links
- [GSAP Flip Plugin Documentation](https://gsap.com/docs/v3/Plugins/Flip/)
- [Accordion website](https://www.accordion.net.au/work)
#### What we're building
Click a project thumbnail on the work overview, and it animates seamlessly into the hero image on the detail page. The element feels like it's moving continuously across the page swap.
#### Why this needs custom routes
This transition only makes sense for a specific route: work → case. You wouldn't want this happening on every page change. That's why we set `from: { namespace: ['work'] }` and `to: { namespace: ['case'] }`.
#### What is GSAP Flip?
Flip lets you animate between two 'states' of an element. Even if its position, size, or parent changed in the DOM.
The basic flow:
1. **Capture the "before" state:** `Flip.getState(element)`
2. **Make your DOM changes**: move the element, change its size, reparent it, whatever
3. **Animate from the old state to the new**:`Flip.from(state, { duration: 1 })`
Flip figures out the difference and animates it smoothly. It really is a bit like magic honestly.
#### The two main problems
**1\. How do we identify the "same" element across pages?**
The thumbnail on the overview and the hero on the detail page are different elements in different DOMs. We match them using a data attribute like `data-flip-id="project-slug"`. Same value = same element for Flip purposes.
**2\. When is the destination ready?**
We need the next page's container to exist and have stable layout before we can Flip into it. That's why we do this inside our `enter` animation, after the new container is in the DOM.
#### The placeholder swap
On the case page, there's already a hero image in position (for when people navigate there directly). During the Flip transition, we:
1. Find that placeholder hero on the detail page
2. Remove it (or hide it)
3. Take the thumbnail from the overview and reparent it into that same position
4. Flip animates the thumbnail from its old position into the hero spot
This way the thumbnail literally becomes the hero.
#### The flow
1. User clicks a thumbnail on the work page
2. We capture the thumbnail's state with `Flip.getState()`
3. Transition starts, new page enters the DOM
4. We find the placeholder hero on the detail page (same `data-flip-id`)
5. We remove the placeholder and reparent the thumbnail into its position
6. `Flip.from()` animates from the old state to the new
#### Reverse direction
Going from case back to work, we just use our default transition. No Flip. Keeps things simple.
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
let flipState = null;
let flippedThumbnail = null;
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
function runWorkLeaveAnimation(current, next, trigger) {
  const clicked = trigger.closest("[data-case-link]");
  const thumbnail = clicked.querySelector("[data-case-thumbnail]");
  const nextHero = next.querySelector("section")
  flipState = Flip.getState(thumbnail);
  flippedThumbnail = thumbnail;
  const tl = gsap.timeline({
    onComplete: () => current.remove()
  });
  if (reducedMotion) {
    return tl.set(current, { autoAlpha: 0 });
  }
  tl.to(current,{
    autoAlpha: 0,
    duration: 0.6
  }, 0)
  tl.set(nextHero,{backgroundColor: "transparent"}, 0)
  return tl;
}
function runCaseEnterAnimation(next) {
  const nextHero = next.querySelector("section")
  const revealTargets = nextHero.querySelectorAll("[data-case-reveal]") 
  const tl = gsap.timeline();
  if (reducedMotion) {
    flippedThumbnail = null;
    flipState = null;
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady");
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }
  const placeholder = next.querySelector("[data-case-thumbnail]");
  placeholder.parentNode.insertBefore(flippedThumbnail, placeholder);
  placeholder.remove();
  tl.add("startEnter", 0.6);
  tl.add(
    Flip.from(flipState, {
      duration: 0.8,
    }), 0);
  tl.fromTo(nextHero,{
    backgroundColor: "transparent"
  },{
    backgroundColor: "#FFF",
    duration: 0.5
  }, "startEnter")
  tl.fromTo(revealTargets,{
    autoAlpha:0,
    yPercent: 25
  },{
    autoAlpha:1,
    yPercent: 0,
    stagger: 0.1
  }, "startEnter+=0.1")
  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");
  tl.call(() => {
    flippedThumbnail = null;
    flipState = null;
  });
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
  debug: false, // Set to 'false' in production
  timeout: 7000,
  preventRunning: true,
  transitions: [
    {
      name: "work-to-case",
      sync: true,
      from: { namespace: ["work"] },
      to: { namespace: ["case"] },
      custom: ({ trigger }) => trigger.hasAttribute("data-case-link"),
      async leave(data) {
        return runWorkLeaveAnimation(data.current.container, data.next.container, data.trigger);
      },
      async enter(data) {
        return runCaseEnterAnimation(data.next.container);
      }
    },    
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