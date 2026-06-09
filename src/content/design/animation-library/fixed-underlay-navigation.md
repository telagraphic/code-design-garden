---
title: "Fixed Underlay Navigation"
description: "Fixed Underlay Navigation."
slug: "fixed-underlay-navigation"
previewVideo: "fixed-underlay-navigation.mp4"
order: 49.919
published: true
categories: ["button", "navigation", "text"]
triggers: ["load"]
libraries: ["gsap"]
keywords: ["fixed", "underlay", "navigation"]
sourceUrl: "https://www.osmo.supply/resource/fixed-underlay-navigation"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomEase.min.js"></script>
```
### HTML
```text
<div class="underlay-nav">
  <header class="underlay-nav__header">
    <div class="underlay-nav__bar">
      <div class="underlay-nav__container">
        <a href="#" class="underlay-nav__logo">
        </a>
        <button data-underlay-nav-toggle aria-expanded="false" aria-label="open menu" class="underlay-nav__toggle">
          <span class="underlay-nav__toggle-text">
            <span class="underlay-nav__toggle-label">Menu</span>
            <span class="underlay-nav__toggle-label">Close</span>
          </span>
          <span class="underlay-nav__toggle-icon">
            <span class="underlay-nav__toggle-bar"></span>
            <span class="underlay-nav__toggle-bar"></span>
          </span>
        </button>
      </div>
    </div>
  </header>
  <nav data-underlay-nav-menu class="underlay-nav__menu">
    <div class="underlay-nav__inner">
      <ul class="underlay-nav__list">
        <li data-reveal-l>
          <a href="index.html" aria-current="page" class="underlay-nav__link-large w--current"><span class="underlay-nav__link-label">Home</span></a>
        </li>
        <li data-reveal-l>
          <a href="#" class="underlay-nav__link-large"><span class="underlay-nav__link-label">Projects</span></a>
        </li>
        <li data-reveal-l>
          <a href="#" class="underlay-nav__link-large"><span class="underlay-nav__link-label">About</span></a>
        </li>
        <li data-reveal-l>
          <a href="#" class="underlay-nav__link-large"><span class="underlay-nav__link-label">Services</span></a>
        </li>
        <li data-reveal-l>
          <a href="#" class="underlay-nav__link-large"><span class="underlay-nav__link-label">News</span></a>
        </li>
        <li data-reveal-l>
          <a href="#" class="underlay-nav__link-large"><span class="underlay-nav__link-label">Contact</span></a>
        </li>
      </ul>
      <div class="underlay-nav__bottom">
        <div class="underlay-nav__bottom-col">
          <div data-reveal-s>
            <span class="underlay-nav__link-small is--faded">Socials</span>
          </div>
          <ul class="underlay-nav__list is--small">
            <li data-reveal-s>
              <a href="#" class="underlay-nav__link-small">Instagram</a>
            </li>
            <li data-reveal-s>
              <a href="#" class="underlay-nav__link-small">LinkedIn</a>
            </li>
            <li data-reveal-s>
              <a href="#" class="underlay-nav__link-small">X/Twitter</a>
            </li>
          </ul>
        </div>
        <div class="underlay-nav__bottom-col">
          <div data-reveal-s>
            <span class="underlay-nav__link-small is--faded">Quick Links</span>
          </div>
          <ul class="underlay-nav__list is--small">
            <li data-reveal-s>
              <a href="#" class="underlay-nav__link-small">Privacy Policy ↗</a>
            </li>
            <li data-reveal-s>
              <a href="#" class="underlay-nav__link-small">Terms & Conditions ↗</a>
            </li>
          </ul>
        </div>
        <div class="underlay-nav__bottom-border"></div>
      </div>
    </div>
  </nav>
  <div data-underlay-nav-overlay="" class="underlay-nav__overlay">
    <div class="underlay-nav__dark"></div>
    <div class="underlay-nav__borders">
      <div class="underlay-nav__border-row">
        <div class="underlay-nav__border"></div>
        <div class="underlay-nav__corner"></div>
      </div>
      <div class="underlay-nav__border-row">
        <div class="underlay-nav__corner is--bottom"></div>
        <div class="underlay-nav__border"></div>
      </div>
    </div>
  </div>
</div>
```
### CSS
```text
:root {
  --menu-width: 30em;
}
a {
  color: inherit;
  text-decoration: none;
}
.underlay-nav__header {
  z-index: 100;
  color: #fff;
  position: fixed;
  inset: 0% 0% auto;
}
.underlay-nav__bar {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.underlay-nav__container {
  justify-content: space-between;
  align-items: center;
  padding: 2.5em;
  display: flex;
}
.underlay-nav__logo {
  mix-blend-mode: multiply;
  justify-content: center;
  align-items: center;
  width: 6.875em;
  display: flex;
}
.underlay-nav__logo-svg {
  width: 100%;
}
.underlay-nav__toggle {
  grid-column-gap: .75em;
  grid-row-gap: .75em;
  outline-offset: 0px;
  background-color: #0000;
  border: 1px #000;
  outline: 3px #555;
  justify-content: center;
  align-items: center;
  margin: -1em;
  padding: 1em;
  display: flex;
}
.underlay-nav__toggle-text {
  flex-flow: column;
  flex: none;
  justify-content: flex-start;
  align-items: flex-end;
  height: 1.5em;
  display: flex;
  overflow: hidden;
}
.underlay-nav__toggle-label {
  font-size: 1.25em;
}
.underlay-nav__toggle-icon {
  grid-column-gap: .375em;
  grid-row-gap: .375em;
  flex-flow: column;
  flex: none;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  margin-bottom: -.3em;
  display: flex;
}
.underlay-nav__toggle-bar {
  background-color: currentColor;
  flex: none;
  width: 100%;
  height: .125em;
  padding: 0;
}
.underlay-nav__menu {
  z-index: 1;
  width: var(--menu-width);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
}
.underlay-nav__overlay {
  z-index: 100;
  pointer-events: none;
  cursor: pointer;
  visibility: hidden;
  position: fixed;
  inset: 0% -1px 0% 0%;
  overflow: clip;
}
.underlay-nav__inner {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  height: 100%;
  padding: 7.5em 2em 2em;
  display: flex;
  overflow: auto;
}
.underlay-nav__list {
  flex-flow: column;
  width: 100%;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
.underlay-nav__list.is--small {
  grid-column-gap: .75em;
  grid-row-gap: .75em;
}
.underlay-nav__link-large {
  border-radius: .25em;
  width: 100%;
  padding: .75em 1em;
}
.underlay-nav__link-large.w--current {
  color: #ededed;
  background-color: #f85931;
}
.underlay-nav__link-label {
  letter-spacing: -.04em;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: 3.25em;
  line-height: .9;
}
.underlay-nav__bottom {
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding-top: 1.5em;
  display: flex;
  position: relative;
}
.underlay-nav__bottom-col {
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  flex-flow: column;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}
.underlay-nav__link-small {
  font-size: 1em;
  line-height: 1.1;
}
.underlay-nav__link-small.is--faded {
  opacity: .5;
}
.underlay-nav__corner {
  transform-origin: 100% 0;
  color: #fff;
  background-image: radial-gradient(circle farthest-side at 0 100%, #fff0 99%, #fff);
  width: 2em;
  height: 2em;
}
.underlay-nav__corner.is--bottom {
  transform-origin: 100% 100%;
  background-image: radial-gradient(circle farthest-side at 0 0, #fff0 99%, #fff);
}
.underlay-nav__dark {
  opacity: 0;
  background-color: #0000004d;
  position: absolute;
  inset: 0%;
}
.underlay-nav__bottom-border {
  opacity: .15;
  transform-origin: 0%;
  background-color: currentColor;
  width: 100%;
  height: 1px;
  position: absolute;
  inset: 0% 0% auto;
}
.underlay-nav__borders {
  flex-flow: column;
  justify-content: space-between;
  align-items: stretch;
  display: flex;
  position: absolute;
  inset: 0;
}
.underlay-nav__border {
  background-color: #fff;
  width: 100%;
  height: 1em;
}
.underlay-nav__border-row {
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-end;
  display: flex;
}
@media screen and (max-width: 767px) {
  :root {
    --menu-width: 80vw;
  }
  .section-resource__h1 {
    font-size: 3em;
  }
  .underlay-nav__container {
    padding: 1.25em;
  }
  .underlay-nav__logo {
    width: 5em;
  }
  .underlay-nav__toggle-text {
    height: 1.25em;
  }
  .underlay-nav__toggle-label {
    font-size: 1em;
  }
  .underlay-nav__inner {
    padding: 5em 1.25em 1.25em;
  }
  .underlay-nav__link-label {
    font-size: 2em;
  }
  .underlay-nav__bottom {
    grid-column-gap: 2em;
    grid-row-gap: 2em;
    flex-flow: column;
    padding-left: 1em;
    padding-right: 1em;
  }
}
```
### Javascript
```javascript
function initFixedUnderlayNavigation() {
  CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1")
  const toggleBtn = document.querySelector("[data-underlay-nav-toggle]");
  const toggleLabels = document.querySelectorAll(".underlay-nav__toggle-label");
  const toggleBars = document.querySelectorAll(".underlay-nav__toggle-bar");
  const menuEl = document.querySelector("[data-underlay-nav-menu]");
  const largeItems = document.querySelectorAll("[data-reveal-l]");
  const smallItems = document.querySelectorAll("[data-reveal-s]");
  const menuBorder = document.querySelector(".underlay-nav__bottom-border")
  const mainEl = document.querySelector("[data-main]");
  const overlayEl = document.querySelector("[data-underlay-nav-overlay]");
  const darkEl = document.querySelector(".underlay-nav__dark");
  const corners = document.querySelectorAll(".underlay-nav__corner")
  const overlayBorders = document.querySelectorAll(".underlay-nav__border-row")
  if (!toggleBtn || !menuEl || !mainEl || !overlayEl) return;
  const closedColor = getComputedStyle(toggleBtn).color;
  const openColor = getComputedStyle(menuEl).color;
  let isOpen = false;
  let tl;
  let enterEndTime = 0;
  const getMenuOffset = () => -menuEl.offsetWidth;
  gsap.set(overlayEl, { visibility: "hidden", pointerEvents: "none" });
  gsap.set(darkEl, { autoAlpha: 0 });
  gsap.set(mainEl, { x: 0 });
  gsap.set(toggleLabels, { yPercent: 0 });
  gsap.set(toggleBars, { y: 0, rotation: 0 });
  gsap.set(menuBorder, { scaleX: 0 });
  gsap.set(overlayBorders[0], { yPercent: -100 })
  gsap.set(overlayBorders[1], { yPercent: 100 })
  gsap.set(corners, { scale: 0 })
  function buildTimeline() {
    tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "energy",
        easeReverse: "power2.inOut"
      }
    });
    tl.set(overlayEl, { visibility: "visible", pointerEvents: "auto" }, 0);
    tl.to([mainEl, overlayEl], {
      x: getMenuOffset,
      duration: 0.7,
    }, 0)
    .to(darkEl, {
      autoAlpha: 1,
      duration: 0.5,
    }, 0)
    .to(corners, {
      scale: 1,
      duration: 0.5,
    }, 0)
    .to(overlayBorders, {
      yPercent: 0,
      duration: 0.5,
    }, 0)
    .to(toggleLabels, {
      yPercent: -100,
      duration: 0.4,
    }, 0)
    .to(toggleBtn, {
      color: openColor,
      duration: 0.4,
    }, 0)
    .to(toggleBars[0], {
      y: "0.25em",
      rotation: 45,
      duration: 0.35,
      ease: "back.out(1.4)",
      easeReverse: "power3.out",
    }, 0.05)
    .to(toggleBars[1], {
      y: "-0.25em",
      rotation: -45,
      duration: 0.35,
      ease: "back.out(1.4)",
      easeReverse: "power3.out",
    }, 0.05)
    .fromTo(largeItems,
      { autoAlpha: 0, xPercent: 25 },
      {
        autoAlpha: 1,
        xPercent: 0,
        duration: 0.7,
        stagger: 0.05,
      },
      0
    )
    .fromTo(smallItems,
      { autoAlpha: 0, yPercent: 100 },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out"
      },
      0.3
    )
    .to(menuBorder, {
      scaleX: 1,
      duration: 0.5,
    }, "<")
    enterEndTime = tl.duration();
    tl.addPause();
    tl.to([largeItems, smallItems], {
      autoAlpha: 0,
      duration: 0.3,
    }, "<")
    .to([mainEl, overlayEl], {
      x: 0,
      duration: 0.6,
    }, "<")
    .to(darkEl, {
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.inOut",
    }, "<")
    .to(corners, {
      scale: 0,
      duration: 0.5,
    }, "<")
    .to(overlayBorders[0], {
      yPercent: -100,
      duration: 0.5,
    }, "<")
    .to(overlayBorders[1], {
      yPercent: 100,
      duration: 0.5,
    }, "<")
    .to(toggleBtn, {
      color: closedColor,
      duration: 0.25,
    }, "<+=0.1")
    .to(toggleLabels, {
      yPercent: 0,
      duration: 0.25,
      ease: "power3.in",
    }, "<")
    .to(toggleBars, {
      y: 0,
      rotation: 0,
      duration: 0.25,
      ease: "power3.in",
    }, "<")
    .set(overlayEl, {
      visibility: "hidden",
      pointerEvents: "none"
    });
  }
  function toggle() {
    isOpen = !isOpen;
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.setAttribute("aria-label", isOpen ? "close menu" : "open menu");
    document.body.setAttribute("data-menu-status", isOpen ? "open" : "");
    if (isOpen) {
      tl.invalidate();
      if (tl.time() >= enterEndTime) tl.timeScale(1).restart();
      else tl.timeScale(1).play();
    } else {
      if (tl.time() < enterEndTime) tl.timeScale(1).reverse();
      else tl.timeScale(1).play();
    }
  }
  buildTimeline();
  toggleBtn.addEventListener("click", toggle);
  overlayEl.addEventListener("click", () => {
    if (isOpen) toggle();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      toggle();
      toggleBtn.focus();
    }
  });
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (isOpen) {
        gsap.set([mainEl, overlayEl], {
          x: getMenuOffset()
        });
      } else {
        tl.invalidate();
      }
    }, 150);
  });
}
// Initialize Fixed Underlay Navigation
document.addEventListener("DOMContentLoaded", () => {
  initFixedUnderlayNavigation();
});
```
### CSS
```text
a {
  color: inherit;
  text-decoration: none;
}
:root {
  --menu-width: 30em;
}  
@media screen and (max-width: 767px) {
  :root {
    --menu-width: 80vw;
  }    
}
.wf-design-mode :where([data-menu-status="open"]) {
  .main-overlay {
    visibility: visible;
    pointer-events: auto;
  }
  .main-overlay__dark {
    opacity: 1;
  }
  .underlay-nav__toggle {
    color: #312e2e;
  }
  [data-main],
  [data-underlay-nav-overlay] {
    transform: translateX(calc(var(--menu-width) * -1));
    visibility: visible;
  }
}
```
### Implementation
#### Underlay Principle
The navigation menu `[data-underlay-nav-menu]` is fixed to the right side of the viewport at `z-index: 1`, sitting behind the page content at all times. For this to work, all of your page content (except the navigation) should live inside a single main wrapper with the `[data-main]` attribute, set to `position: relative` and `z-index: 2`. This creates the layered structure where the main content covers the menu by default, and clicking the toggle slides it to the left to reveal the menu underneath.
#### Menu Width
The `--menu-width` custom property on `:root` controls both the width of the menu panel and how far `[data-main]` translates, set to `30em` on desktop and `80vw` on mobile through a media query.
#### Toggle
The `[data-underlay-nav-toggle]` button drives the menu state and automatically updates `aria-expanded` and `aria-label` on each click, while `body[data-menu-status]` is set to `"open"` or empty for any additional CSS hooks you may need. The menu can also be closed by clicking the overlay or pressing Escape.
#### Overlay
The `[data-underlay-nav-overlay]` element is positioned fixed on top of `[data-main]` and translates along with it, handling the click-to-close interaction, the dark dimming layer (`.underlay-nav__dark`), and the decorative border and corner elements that frame the menu edge.
#### Reveal Attributes
Elements marked with `[data-reveal-l]` stagger in as the large navigation links, while `[data-reveal-s]` elements stagger in as the smaller secondary links at the bottom of the menu. Adding or removing these attributes on any element controls whether it participates in the stagger choreography. You can of course add as many tweens and targets to the timeline to fit your needs, like how we also animate `menuBorder` element in our open.
#### Animation
The animation technique is derived from the [GSAP 3.15 announcement video](https://www.youtube.com/watch?v=Wfzy0pvKiic), which introduced the `easeReverse` property. This allows each tween to use a different easing curve when playing in reverse, so a single timeline can drive both the open and close animations with distinct motion characteristics for each direction.
The script uses that technique with a single timeline split by `addPause()` into an enter half and an exit half, where the toggle function uses four branches to determine whether to play, reverse, or restart depending on the current playhead position. This allows mid-animation interruptions to feel responsive without snapping.
#### Customization
The timeline durations, staggers, and easings can all be adjusted inside `buildTimeline()`. The `CustomEase` `"energy"` controls the primary motion character, and individual `easeReverse` values on each tween control how interruptions feel.
Everything before `addPause()` is the opening animation. If the menu is closed while the opening is still playing, the timeline reverses using the `easeReverse` values, which should feel more snappy and responsive.
Once the opening animation has fully completed and the pause is reached, closing the menu plays the separate exit half of the timeline. In this resource, the close animation is fairly similar to a reversal of the open, but you could get creative and build something completely unique here. The [GSAP 3.15 announcement video](https://www.youtube.com/watch?v=Wfzy0pvKiic) shows a few examples of completely different close animations compared to their opens.
#### Webflow Designer Preview
The custom CSS for Webflow uses the `.wf-design-mode` selector to reveal the menu and make it easy to edit directly in the Webflow Designer. Set `data-menu-status` to `"open"` on the `body` element to toggle this preview. Because the selector is scoped to `.wf-design-mode` it will only take effect inside the Designer and will not break the menu if the site is accidentally published with the attribute still active.