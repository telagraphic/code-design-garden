---
title: "Button 077"
description: "Button 077."
slug: "buttons/button-077"
previewVideo: "button-077.mp4"
order: 49.952
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "077"]
sourceUrl: "https://www.osmo.supply/button-pack/button-077"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/DrawSVGPlugin.min.js"></script>
```
### HTML
```text
<a data-button-077="" href="#" class="button-077">
  <span class="button-077__bg"></span>
  <span class="button-077__inner">
    <span data-button-077-text="" class="button-077__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-077-color: #121212;
  --button-077-color-background: #fff;
  --button-077-color-focus: #000;
  --button-077-border-radius: 2.5em;
  --button-077-padding: 0.75em 0.75em 0.75em 1em;
  --button-077-gap: 0.375em;
  --button-077-focus-inset: -0.125em;
  --button-077-click-scale: 0.955 0.925;
  --button-077-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-077-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-077 {
  color: var(--button-077-color);
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
  transition: scale 0.15s var(--button-077-ease-click);
}
.button-077::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-077-focus-inset);
  border-radius: var(--button-077-border-radius);
  transition: box-shadow 0.3s var(--button-077-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-077:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-077-color-focus);
}
.button-077:active {
  scale: var(--button-077-click-scale);
}
.button-077__bg {
  background-color: var(--button-077-color-background);
  border-radius: var(--button-077-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-077__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-077-padding);
  grid-column-gap: var(--button-077-gap);
  grid-row-gap: var(--button-077-gap);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-077__icon {
  width: .875em;
  height: .875em;
}
```
### Javascript
```javascript
gsap.registerPlugin(DrawSVGPlugin);
function initButton077() {
  const buttons = document.querySelectorAll('[data-button-077]');
  if (!buttons.length) return;
  const mm = gsap.matchMedia();
  mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    buttons.forEach((button) => {
      const text = button.querySelector('[data-button-077-text]');
      const icon = button.querySelector('[data-button-077-icon]');
      if (!icon || !text) return;
      const paths = icon.querySelectorAll('path');
      if (paths.length < 2) return;
      const linePath = paths[0];
      const tipPath = paths[1];
      const hoverRoot = button.closest('[data-hover]') || button;
      gsap.set(linePath, { drawSVG: '0% 100%' });
      gsap.set(tipPath, { drawSVG: '0% 100%' });
      let tl;
      const playSequence = () => {
        if (tl && tl.isActive()) return;
        tl?.kill();
        tl = gsap.timeline({ overwrite: true });
        tl.addLabel('empty')
          .to(linePath, {
            drawSVG: '100% 100%',
            duration: 0.25,
            ease: 'circ.out',
          }, 'empty')
          .to(tipPath, {
            drawSVG: '50% 50%',
            duration: 0.25,
            ease: 'circ.out',
          }, 'empty+=0.125')
          .set(linePath, {
            drawSVG: '0% 0%',
          }, 'empty+=0.25')
          .addLabel('fill')
          .to(linePath, {
            drawSVG: '0% 100%',
            duration: 0.3,
            ease: 'circ.inOut',
          }, 'fill')
          .to(tipPath, {
            drawSVG: '0% 100%',
            duration: 0.3,
            ease: 'circ.inOut',
          }, 'fill+=0.15');
        tl.to(text, {
          x: '0.375em',
          duration: 0.2,
          ease: 'circ.out',
        }, 'empty').to(text, {
          x: '0em',
          duration: 0.25,
          ease: 'circ.inOut',
        }, 'empty+=0.2');
      };
      const onEnter = () => playSequence();
      const onFocusIn = () => {
        if (hoverRoot.matches(':focus-visible')) playSequence();
      };
      hoverRoot.addEventListener('pointerenter', onEnter);
      hoverRoot.addEventListener('focusin', onFocusIn);
      cleanups.push(() => {
        hoverRoot.removeEventListener('pointerenter', onEnter);
        hoverRoot.removeEventListener('focusin', onFocusIn);
        tl?.kill();
        gsap.set([linePath, tipPath], { clearProps: 'drawSVG' });
      });
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  });
}
// Initialize Button 077
document.addEventListener('DOMContentLoaded', () => {
  initButton077();
});
```
### CSS
```text
:root {
  --button-077-color: #121212;
  --button-077-color-background: #fff;
  --button-077-color-focus: #000;
  --button-077-border-radius: 2.5em;
  --button-077-padding: 0.75em 0.75em 0.75em 1em;
  --button-077-gap: 0.375em;
  --button-077-focus-inset: -0.125em;
  --button-077-click-scale: 0.955 0.925;
  --button-077-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-077-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-077 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-077-ease-click);
}
.button-077:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-077-color-focus);
}
.button-077:active {
  scale: var(--button-077-click-scale);
}
.button-077::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-077-focus-inset);
  border-radius: var(--button-077-border-radius);
  transition: box-shadow 0.3s var(--button-077-ease-focus);
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
.button-077[data-theme='secondary'] {
  --button-077-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-077-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.