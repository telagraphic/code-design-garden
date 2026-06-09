---
title: "Button 042"
description: "Button 042."
slug: "buttons/button-042"
previewVideo: "button-042.mp4"
order: 49.967
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "042"]
sourceUrl: "https://www.osmo.supply/button-pack/button-042"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
```
### HTML
```text
<a data-button-042="" data-button-042-strength="30" data-button-042-strength-inner="15" href="#" class="button-042">
  <span class="button-042__bg"></span>
  <span data-button-042-inner="" class="button-042__inner">
    <span class="button-042__text-outer">
      <span class="button-042__text">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-042-color: #191F40;
  --button-042-color-background: #DEEEFF;
  --button-042-color-focus: #000;
  --button-042-padding: 0.75em 1em;
  --button-042-border-radius: 2.5em;
  --button-042-focus-inset: -0.125em;
  --button-042-hover-scale: 1.065 1.095;
  --button-042-click-scale: 0.955, 0.925;
  --button-042-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-042-ease-hover: cubic-bezier(0.34, 2.27, 0.64, 1);
  --button-042-ease-power-out: cubic-bezier(0.23, 1, 0.32, 1);
  --button-042-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-042 {
  -webkit-user-select: none;
  user-select: none;
  color: var(--button-042-color);
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.button-042::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-042-focus-inset);
  border-radius: var(--button-042-border-radius);
  transition: box-shadow 0.3s var(--button-042-ease-focus), scale 0.4s var(--button-042-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-042:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-042-color-focus);
  scale: var(--button-042-hover-scale);
  transition: box-shadow 0.3s var(--button-042-ease-focus), scale 0.425s 0.05s var(--button-042-ease-hover);
}
.button-042__bg {
  pointer-events: none;
  border-radius: var(--button-042-border-radius);
  background-color: var(--button-042-color-background);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: scale 0.4s var(--button-042-ease-hover), transform 0.15s var(--button-042-ease-click);
}
.button-042:active .button-042__bg {
  transform: scale(var(--button-042-click-scale));
}
.button-042__inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding: var(--button-042-padding);
  z-index: 1;
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-042__text-outer {
  clip-path: inset(-10% 0);
}
.button-042__text {
  will-change: transform;
  display: inline-block;
  white-space: nowrap;
  translate: 0 0 0;
  text-shadow: 0px 1.3em currentColor;
  transition: translate 0.45s var(--button-042-ease-power-out);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-042:is(:hover, :focus-visible) .button-042__bg,
  [data-hover]:is(:hover, :focus-visible) .button-042 .button-042__bg {
    scale: var(--button-042-hover-scale);
    transition: scale 0.425s 0.05s var(--button-042-ease-hover), transform 0.15s var(--button-042-ease-click);
  }
  .button-042:is(:hover, :focus-visible) .button-042__text,
  [data-hover]:is(:hover, :focus-visible) .button-042 .button-042__text {
    translate: 0 -1.3em 0;
    transition: translate 0.45s 0.05s var(--button-042-ease-power-out);
  }
}
```
### Javascript
```javascript
function initButton042() {
  const buttons = document.querySelectorAll('[data-button-042]');
  if (buttons.length === 0) return;
  let mm = gsap.matchMedia();
  buttons.forEach((element) => {
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const resetEl = (el, immediate) => {
        if (!el) return;
        gsap.killTweensOf(el);
        (immediate ? gsap.set : gsap.to)(el, {
          x: '0em',
          y: '0em',
          rotate: '0deg',
          clearProps: 'all',
          ...(!immediate && { ease: 'elastic.out(1, 0.3)', duration: 1.6 }),
        });
      };
      const resetOnEnter = (e) => {
        const m = e.currentTarget;
        resetEl(m, true);
        resetEl(m.querySelector('[data-button-042-inner]'), true);
      };
      const moveMagnet = (e) => {
        const m = e.currentTarget;
        const b = m.getBoundingClientRect();
        const strength = parseFloat(m.getAttribute('data-button-042-strength')) || 25;
        const inner = m.querySelector('[data-button-042-inner]');
        const innerStrength = parseFloat(m.getAttribute('data-button-042-strength-inner')) || strength;
        const w = b.width || 1;
        const h = b.height || 1;
        const offsetX = ((e.clientX - b.left) / w - 0.5) * (strength / 16);
        const offsetY = ((e.clientY - b.top) / h - 0.5) * (strength / 16);
        gsap.to(m, {
          x: offsetX + 'em',
          y: offsetY + 'em',
          rotate: '0.001deg',
          ease: 'power4.out',
          duration: 1.6,
        });
        if (inner) {
          const innerOffsetX = ((e.clientX - b.left) / w - 0.5) * (innerStrength / 16);
          const innerOffsetY = ((e.clientY - b.top) / h - 0.5) * (innerStrength / 16);
          gsap.to(inner, {
            x: innerOffsetX + 'em',
            y: innerOffsetY + 'em',
            rotate: '0.001deg',
            ease: 'power4.out',
            duration: 2,
          });
        }
      };
      const resetMagnet = (e) => {
        const m = e.currentTarget;
        const inner = m.querySelector('[data-button-042-inner]');
        gsap.to(m, {
          x: '0em',
          y: '0em',
          ease: 'elastic.out(1, 0.3)',
          duration: 1.6,
          clearProps: 'all',
        });
        if (inner) {
          gsap.to(inner, {
            x: '0em',
            y: '0em',
            ease: 'elastic.out(1, 0.3)',
            duration: 2,
            clearProps: 'all',
          });
        }
      };
      element.addEventListener('pointerenter', resetOnEnter);
      element.addEventListener('pointermove', moveMagnet);
      element.addEventListener('pointerleave', resetMagnet);
      return () => {
        element.removeEventListener('pointerenter', resetOnEnter);
        element.removeEventListener('pointermove', moveMagnet);
        element.removeEventListener('pointerleave', resetMagnet);
      };
    });
  });
}
// Initialize Button 042
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton042();
  });
});
```
### CSS
```text
:root {
  --button-042-color: #191F40;
  --button-042-color-background: #DEEEFF;
  --button-042-color-focus: #000;
  --button-042-padding: 0.75em 1em;
  --button-042-border-radius: 2.5em;
  --button-042-focus-inset: -0.125em;
  --button-042-hover-scale: 1.065 1.095;
  --button-042-click-scale: 0.955, 0.925;
  --button-042-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-042-ease-hover: cubic-bezier(0.34, 2.27, 0.64, 1);
  --button-042-ease-power-out: cubic-bezier(0.23, 1, 0.32, 1);
  --button-042-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-042 {
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-042:is(:hover, :focus-visible) .button-042__bg,
  [data-hover]:is(:hover, :focus-visible) .button-042 .button-042__bg {
    scale: var(--button-042-hover-scale);
    transition: scale 0.425s 0.05s var(--button-042-ease-hover), transform 0.15s var(--button-042-ease-click);
  }
  .button-042:is(:hover, :focus-visible) .button-042__text,
  [data-hover]:is(:hover, :focus-visible) .button-042 .button-042__text {
    translate: 0 -1.3em 0;
    transition: translate 0.45s 0.05s var(--button-042-ease-power-out);
  }
}
.button-042:active .button-042__bg {
  transform: scale(var(--button-042-click-scale));
}
.button-042:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-042-color-focus);
  scale: var(--button-042-hover-scale);
  transition: box-shadow 0.3s var(--button-042-ease-focus), scale 0.425s 0.05s var(--button-042-ease-hover);
}
.button-042::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-042-focus-inset);
  border-radius: var(--button-042-border-radius);
  transition: box-shadow 0.3s var(--button-042-ease-focus), scale 0.4s var(--button-042-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-042__bg {
  transition: scale 0.4s var(--button-042-ease-hover), transform 0.15s var(--button-042-ease-click);
}
.button-042__text {
  will-change: transform;
  display: inline-block;
  white-space: nowrap;
  translate: 0 0 0;
  text-shadow: 0px 1.3em currentColor;
  transition: translate 0.45s var(--button-042-ease-power-out);
}
```
### Implementation
#### Strength
Use `data-button-042-strength` to control how strongly the full button follows the pointer during the magnetic hover animation.
#### Inner
Use `data-button-042-inner` to mark an optional inner element that can move separately from the full button during the magnetic hover animation.
#### Inner Strength
Use `data-button-042-strength-inner` to control how strongly the inner element follows the pointer, which only applies when `data-button-042-inner` is set on an inner element.
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-042[data-theme='secondary'] {
  --button-042-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-042-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.