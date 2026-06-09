---
title: "Button 046"
description: "Button 046."
slug: "buttons/button-046"
previewVideo: "button-046.mp4"
order: 49.963
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "046"]
sourceUrl: "https://www.osmo.supply/button-pack/button-046"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomEase.min.js"></script>
```
### HTML
```text
<a data-button-046="" href="#" class="button-046">
  <span class="button-046__bg"></span>
  <span class="button-046__bg-circle">
    <span data-button-046-circle="" class="button-046__circle-wrap">
      <span class="button-046__circle"></span>
    </span>
  </span>
  <span class="button-046__inner">
    <span class="button-046__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-046-color: #131313;
  --button-046-color-background: #fff;
  --button-046-hover-color: #131313;
  --button-046-hover-color-background: #9fccc8;
  --button-046-color-focus: #fff;
  --button-046-padding: 0.75em 1em;
  --button-046-border-radius: 2.5em;
  --button-046-focus-inset: -0.125em;
  --button-046-hover-scale: 1.065 1.095;
  --button-046-click-scale: 0.955, 0.925;
  --button-046-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-046-ease-hover: cubic-bezier(0.34, 2.27, 0.64, 1);
  --button-046-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-046 {
  color: var(--button-046-color);
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
  transition: color 0.25s ease-out;
}
.button-046::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-046-focus-inset);
  border-radius: var(--button-046-border-radius);
  transition: box-shadow 0.3s var(--button-046-ease-focus), scale 0.4s var(--button-046-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-046:is(:hover, :focus-visible),
[data-hover]:is(:hover, :focus-visible) .button-046 {
  color: var(--button-046-hover-color);
}
.button-046:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-046-color-focus);
  scale: var(--button-046-hover-scale);
  transition: box-shadow 0.3s var(--button-046-ease-focus), scale 0.425s 0.05s var(--button-046-ease-hover);
}
.button-046__bg {
  background-color: var(--button-046-color-background);
  border-radius: var(--button-046-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: background-color 0.25s ease-out, scale 0.4s var(--button-046-ease-hover), transform 0.15s var(--button-046-ease-click);
}
.button-046:active .button-046__bg {
  transform: scale(var(--button-046-click-scale));
}
.button-046:is(:focus-visible) .button-046__bg {
  background-color: var(--button-046-hover-color-background) !important;
}
.button-046__bg-circle {
  z-index: 1;
  border-radius: var(--button-046-border-radius);
  grid-area: 1 / 1;
  place-self: center;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  position: relative;
  overflow: clip;
  transition: background-color 0.25s ease-out, scale 0.4s var(--button-046-ease-hover), transform 0.15s var(--button-046-ease-click);
}
.button-046:active .button-046__bg-circle {
  transform: scale(var(--button-046-click-scale));
}
.button-046__circle-wrap {
  transform-origin: 0 0;
  will-change: transform;
  position: absolute;
  inset: 0%;
  transform: scale(0);
}
.button-046__circle {
  aspect-ratio: 1;
  background-color: var(--button-046-hover-color-background);
  border-radius: 50%;
  width: 200%;
  display: block;
  position: absolute;
  inset: 0% auto auto 0%;
  transform: translate(-50%, -50%);
}
.button-046__inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  width: 100%;
  height: 100%;
  padding: var(--button-046-padding);
  z-index: 2;
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-046__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-046:is(:hover, :focus-visible) .button-046__bg,
  [data-hover]:is(:hover, :focus-visible) .button-046 .button-046__bg {
    scale: var(--button-046-hover-scale);
    transition: background-color 0.25s 0.05s ease-out, scale 0.425s 0.05s var(--button-046-ease-hover), transform 0.15s var(--button-046-ease-click);
    background-color: var(--button-046-color-background);
  }
  .button-046:is(:hover, :focus-visible) .button-046__bg-circle,
  [data-hover]:is(:hover, :focus-visible) .button-046 .button-046__bg-circle {
    scale: var(--button-046-hover-scale);
    transition: background-color 0.25s 0.05s ease-out, scale 0.425s 0.05s var(--button-046-ease-hover), transform 0.15s var(--button-046-ease-click);
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(CustomEase);
CustomEase.create('button-046-ease', '0.32, 0.72, 0, 1');
function initButton046() {
  const buttons = document.querySelectorAll('[data-button-046]');
  if (buttons.length === 0) return;
  let mm = gsap.matchMedia();
  buttons.forEach((button) => {
    const circle = button.querySelector('[data-button-046-circle]');
    if (!circle) return;
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const xSet = gsap.quickSetter(circle, 'xPercent');
      const ySet = gsap.quickSetter(circle, 'yPercent');
      function getXY(e) {
        const { left, top, width, height } = button.getBoundingClientRect();
        const xTransform = gsap.utils.pipe(gsap.utils.mapRange(0, width, 0, 100), gsap.utils.clamp(0, 100));
        const yTransform = gsap.utils.pipe(gsap.utils.mapRange(0, height, 0, 100), gsap.utils.clamp(0, 100));
        return {
          x: xTransform(e.clientX - left),
          y: yTransform(e.clientY - top),
        };
      }
      function onEnter(e) {
        const { x, y } = getXY(e);
        xSet(x);
        ySet(y);
        gsap.to(circle, {
          scale: 1,
          duration: 1.25,
          ease: 'button-046-ease',
          overwrite: 'auto',
        });
      }
      function onLeave(e) {
        const { x, y } = getXY(e);
        gsap.killTweensOf(circle);
        gsap.to(circle, {
          xPercent: x > 90 ? x + 25 : x < 12.5 ? x - 25 : x,
          yPercent: y > 90 ? y + 25 : y < 12.5 ? y - 25 : y,
          scale: 0,
          duration: 0.45,
          ease: 'button-046-ease',
          overwrite: 'auto',
        });
      }
      function onMove(e) {
        const { x, y } = getXY(e);
        gsap.to(circle, {
          xPercent: x,
          yPercent: y,
          duration: 0.5,
          ease: 'power1',
          overwrite: 'auto',
        });
      }
      button.addEventListener('pointerenter', onEnter);
      button.addEventListener('pointerleave', onLeave);
      button.addEventListener('pointermove', onMove);
      return () => {
        button.removeEventListener('pointerenter', onEnter);
        button.removeEventListener('pointerleave', onLeave);
        button.removeEventListener('pointermove', onMove);
      };
    });
  });
}
// Initialize Button 046
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton046();
  });
});
```
### CSS
```text
:root {
  --button-046-color: #131313;
  --button-046-color-background: #fff;
  --button-046-hover-color: #131313;
  --button-046-hover-color-background: #9fccc8;
  --button-046-color-focus: #fff;
  --button-046-padding: 0.75em 1em;
  --button-046-border-radius: 2.5em;
  --button-046-focus-inset: -0.125em;
  --button-046-hover-scale: 1.065 1.095;
  --button-046-click-scale: 0.955, 0.925;
  --button-046-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-046-ease-hover: cubic-bezier(0.34, 2.27, 0.64, 1);
  --button-046-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-046 {
  -webkit-tap-highlight-color: transparent;
  transition: color 0.25s ease-out;
}
.button-046:is(:hover, :focus-visible),
[data-hover]:is(:hover, :focus-visible) .button-046 {
  color: var(--button-046-hover-color);
}
.button-046:active .button-046__bg,
.button-046:active .button-046__bg-circle {
  transform: scale(var(--button-046-click-scale));
}
.button-046:is(:focus-visible) .button-046__bg {
  background-color: var(--button-046-hover-color-background) !important;
}
.button-046:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-046-color-focus);
  scale: var(--button-046-hover-scale);
  transition: box-shadow 0.3s var(--button-046-ease-focus), scale 0.425s 0.05s var(--button-046-ease-hover);
}
.button-046::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-046-focus-inset);
  border-radius: var(--button-046-border-radius);
  transition: box-shadow 0.3s var(--button-046-ease-focus), scale 0.4s var(--button-046-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-046__bg,
.button-046__bg-circle {
  transition: background-color 0.25s ease-out, scale 0.4s var(--button-046-ease-hover), transform 0.15s var(--button-046-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-046:is(:hover, :focus-visible) .button-046__bg,
  .button-046:is(:hover, :focus-visible) .button-046__bg-circle,
  [data-hover]:is(:hover, :focus-visible) .button-046 .button-046__bg,
  [data-hover]:is(:hover, :focus-visible) .button-046 .button-046__bg-circle {
    scale: var(--button-046-hover-scale);
    transition: background-color 0.25s 0.05s ease-out, scale 0.425s 0.05s var(--button-046-ease-hover), transform 0.15s var(--button-046-ease-click);
  }
  .button-046:is(:hover, :focus-visible) .button-046__bg,
  [data-hover]:is(:hover, :focus-visible) .button-046 .button-046__bg {
    background-color: var(--button-046-color-background);
  }
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-046[data-theme='secondary'] {
  --button-046-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-046-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.