---
title: "Button 045"
description: "Button 045."
slug: "buttons/button-045"
previewVideo: "button-045.mp4"
order: 49.964
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "045"]
sourceUrl: "https://www.osmo.supply/button-pack/button-045"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
```
### HTML
```text
<a data-button-045="" href="#" class="button-045">
  <span data-button-045-inner="" class="button-045__inner">
    <span class="button-045__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-045-color: #fff;
  --button-045-color-background: #ffaa32;
  --button-045-color-focus: #000;
  --button-045-padding: 0.75em 1em;
  --button-045-border-radius: 2.5em;
  --button-045-focus-inset: -0.125em;
  --button-045-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-045 {
  color: var(--button-045-color);
  -webkit-user-select: none;
  user-select: none;
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.button-045::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-045-focus-inset);
  border-radius: var(--button-045-border-radius);
  transition: box-shadow 0.3s var(--button-045-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-045:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-045-color-focus);
}
.button-045__inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding: var(--button-045-padding);
  background-color: var(--button-045-color-background);
  border-radius: var(--button-045-border-radius);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-045__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
```
### Javascript
```javascript
function initButton045() {
  const buttons = document.querySelectorAll('[data-button-045]');
  if (buttons.length === 0) return;
  let mm = gsap.matchMedia();
  buttons.forEach((element) => {
    const hoverRoot = element.closest('[data-hover]') || element;
    const inner = element.querySelector('[data-button-045-inner]') || element;
    let locked = false;
    function runPulse(click = false) {
      if (locked) return;
      locked = true;
      setTimeout(() => {
        locked = false;
      }, click ? 100 : 350);
      const el = inner;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      const stretch = 0.75 * fs;
      const sx = (w + stretch) / w;
      const sy = (h - stretch * 0.33) / h;
      if (el._pulseTl && el._pulseTl.kill) el._pulseTl.kill();
      const tl = gsap.timeline();
      el._pulseTl = tl;
      el._pulseTl = gsap
        .timeline()
        .to(el, {
          scaleX: click ? sy : sx,
          scaleY: click ? sx * 1.3 : sy,
          duration: 0.1,
          ease: 'power1.out',
        })
        .to(element, {
          scale: click ? 0.8 : 1,
          duration: 0.1,
          ease: 'power1.out',
        }, '<')
        .to(el, {
          scaleX: 1,
          scaleY: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        })
        .to(element, {
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        }, '<');
    }
    const onFocusIn = () => {
      if (hoverRoot.matches(':focus-visible')) runPulse(false);
    };
    hoverRoot.addEventListener('pointerdown', () => runPulse(true));
    hoverRoot.addEventListener('focusin', onFocusIn);
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      hoverRoot.addEventListener('mouseenter', () => runPulse(false));
    });
  });
}
// Initialize Button 045
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton045();
  });
});
```
### CSS
```text
:root {
  --button-045-color: #fff;
  --button-045-color-background: #ffaa32;
  --button-045-color-focus: #000;
  --button-045-padding: 0.75em 1em;
  --button-045-border-radius: 2.5em;
  --button-045-focus-inset: -0.125em;
  --button-045-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-045 {
  -webkit-tap-highlight-color: transparent;
}
.button-045:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-045-color-focus);
}
.button-045::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-045-focus-inset);
  border-radius: var(--button-045-border-radius);
  transition: box-shadow 0.3s var(--button-045-ease-focus);
  pointer-events: none;
  z-index: 1;
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-045[data-theme='secondary'] {
  --button-045-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-045-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.