---
title: "Button 079"
description: "Button 079."
slug: "buttons/button-079"
previewVideo: "button-079.mp4"
order: 49.951
published: true
categories: ["button", "text", "media"]
triggers: ["scroll", "hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "079"]
sourceUrl: "https://www.osmo.supply/button-pack/button-079"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<a data-button-079="" data-button-079-height-increase="8" data-button-079-width-increase="16" href="#" class="button-079">
  <span class="button-079__bg-animation">
    <span class="button-079__bg-shine-wrap">
      <span class="button-079__bg-shine is--first"></span>
      <span class="button-079__bg-shine is--second"></span>
    </span>
  </span>
  <span class="button-079__bg"></span>
  <span class="button-079__inner">
    <span class="button-079__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-079-color: #131313;
  --button-079-color-background: #ffce16;
  --button-079-shine-color: #fff;
  --button-079-color-focus: #fff;
  --button-079-border-radius: 2.5em;
  --button-079-padding: 0.75em 1em;
  --button-079-focus-inset: -0.125em;
  --button-079-ease-hover: linear(0, 0.255, 0.4449, 0.6079, 0.7355, 0.8513, 0.9525, 1.0413, 1.1195, 1.1881, 1.2484, 1.3011, 1.3468, 1.3862, 1.4198, 1.4479, 1.4709, 1.4892, 1.503, 1.5126, 1.5182, 1.52, 1.5189, 1.5156, 1.5101, 1.5025, 1.4929, 1.4817, 1.469, 1.4552, 1.4406, 1.4254, 1.4099, 1.3943, 1.3787, 1.3633, 1.3481, 1.3333, 1.3188, 1.3048, 1.2912, 1.278, 1.2653, 1.253, 1.2412, 1.2298, 1.2188, 1.2083, 1.1981, 1.1883, 1.1789, 1.1698, 1.1611, 1.1528, 1.1447, 1.137, 1.1296, 1.1225, 1.1156, 1.1091, 1.1028, 1.0967, 1.0909, 1.0854, 1.0801, 1.075, 1.0701, 1.0654, 1.061, 1.0567, 1.0526, 1.0488, 1.0451, 1.0415, 1.0382, 1.035, 1.032, 1.0292, 1.0265, 1.0239, 1.0215, 1.0193, 1.0172, 1.0152, 1.0134, 1.0117, 1.0101, 1.0086, 1.0073, 1.0061, 1.005, 1.004, 1.0032, 1.0024, 1.0079, 1.0012, 1.0008, 1.0004, 1.0002, 1, 1);
  --button-079-ease-animation: cubic-bezier(0.6, 0.05, 0, 0.85);
  --button-079-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-079 {
  color: var(--button-079-color);
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
.button-079::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-079-focus-inset);
  border-radius: var(--button-079-border-radius);
  transition: box-shadow 0.3s var(--button-079-ease-focus), scale 0.45s var(--button-079-ease-hover), rotate 0.45s var(--button-079-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-079:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-079-color-focus);
  scale: var(--button-079-scale-x) var(--button-079-scale-y);
  rotate: 2deg;
  transition: box-shadow 0.3s var(--button-079-ease-focus), scale 0.55s 0.05s var(--button-079-ease-hover), rotate 0.55s 0.05s var(--button-079-ease-hover);
}
.button-079:active .button-079__bg,
.button-079:active .button-079__bg-animation {
  scale: calc(2 - var(--button-079-scale-x)) calc(2 - var(--button-079-scale-y));
}
.button-079__bg-animation {
  border-radius: var(--button-079-border-radius);
  z-index: 2;
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: clip;
  transition: scale 0.45s var(--button-079-ease-hover), rotate 0.45s var(--button-079-ease-hover);
}
.button-079__bg-shine-wrap {
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: grid;
  animation: button-079-shine 1.5s var(--button-079-ease-animation) infinite, button-079-pause-between-iterations 3s var(--button-079-ease-animation) infinite;
  animation-play-state: paused;
}
.button-079__bg-shine {
  background-color: var(--button-079-shine-color);
  grid-area: 1 / 1;
  place-self: center;
  width: 150%;
  height: 50%;
  padding: 0;
}
.button-079__bg-shine.is--first {
  place-self: flex-end center;
  height: 65%;
}
.button-079__bg-shine.is--second {
  place-self: flex-start center;
  height: 25%;
}
.button-079__bg {
  background-color: var(--button-079-color-background);
  border-radius: var(--button-079-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: scale 0.45s var(--button-079-ease-hover), rotate 0.45s var(--button-079-ease-hover);
}
.button-079__inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  width: 100%;
  height: 100%;
  padding: var(--button-079-padding);
  z-index: 1;
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
  transition: scale 0.45s var(--button-079-ease-hover), rotate 0.45s var(--button-079-ease-hover);
}
.button-079:active .button-079__inner {
  scale: 0.975;
  rotate: -2deg;
}
.button-079__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
@keyframes button-079-shine {
  from {
    translate: -15% -135%;
    rotate: -14deg;
  }
  to {
    translate: 15% 135%;
    rotate: -14deg;
  }
}
@keyframes button-079-pause-between-iterations {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50.1% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-079:is(:hover, :focus-visible) .button-079__inner,
  [data-hover]:is(:hover, :focus-visible) .button-079 .button-079__inner {
    transition: scale 0.55s 0.05s var(--button-079-ease-hover), rotate 0.55s 0.05s var(--button-079-ease-hover);
    scale: 1.025;
    rotate: 2deg;
  }
  .button-079:is(:hover, :focus-visible) .button-079__bg,
  .button-079:is(:hover, :focus-visible) .button-079__bg-animation,
  [data-hover]:is(:hover, :focus-visible) .button-079 .button-079__bg,
  [data-hover]:is(:hover, :focus-visible) .button-079 .button-079__bg-animation {
    scale: var(--button-079-scale-x) var(--button-079-scale-y);
    rotate: 2deg;
    transition: scale 0.55s 0.05s var(--button-079-ease-hover), rotate 0.55s 0.05s var(--button-079-ease-hover);
  }
}
@media (hover: hover) and (pointer: fine) {
  .button-079:active .button-079__bg,
  .button-079:active .button-079__bg-animation {
    scale: 1 1;
    rotate: -2deg;
  }
}
@media (prefers-reduced-motion: no-preference) {
  .button-079.is--inview .button-079__bg-shine-wrap {
    animation-play-state: running;
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger);
function initButton079() {
  const buttons = document.querySelectorAll('[data-button-079]');
  const INVIEW_CLASS = 'is--inview';
  if (buttons.length === 0) return;
  buttons.forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => element.classList.add(INVIEW_CLASS),
      onEnterBack: () => element.classList.add(INVIEW_CLASS),
      onLeave: () => element.classList.remove(INVIEW_CLASS),
      onLeaveBack: () => element.classList.remove(INVIEW_CLASS),
    });
    const widthIncrease = Number(element.getAttribute('data-button-079-width-increase')) || 16;
    const heightIncrease = Number(element.getAttribute('data-button-079-height-increase')) || 8;
    if (!widthIncrease || !heightIncrease) return;
    const setScale = (x, y) => {
      element.style.setProperty('--button-079-scale-x', x);
      element.style.setProperty('--button-079-scale-y', y);
    };
    const updateScale = () => {
      const currentWidth = element.offsetWidth;
      const currentHeight = element.offsetHeight;
      const scaleX = (currentWidth + widthIncrease) / currentWidth;
      const scaleY = (currentHeight + heightIncrease) / currentHeight;
      setScale(scaleX, scaleY);
    };
    updateScale();
  });
}
// Initialize Button 079
document.addEventListener('DOMContentLoaded', () => {
  initButton079();
});
```
### CSS
```text
:root {
  --button-079-color: #131313;
  --button-079-color-background: #ffce16;
  --button-079-shine-color: #fff;
  --button-079-color-focus: #fff;
  --button-079-border-radius: 2.5em;
  --button-079-padding: 0.75em 1em;
  --button-079-focus-inset: -0.125em;
  --button-079-ease-hover: linear(0, 0.255, 0.4449, 0.6079, 0.7355, 0.8513, 0.9525, 1.0413, 1.1195, 1.1881, 1.2484, 1.3011, 1.3468, 1.3862, 1.4198, 1.4479, 1.4709, 1.4892, 1.503, 1.5126, 1.5182, 1.52, 1.5189, 1.5156, 1.5101, 1.5025, 1.4929, 1.4817, 1.469, 1.4552, 1.4406, 1.4254, 1.4099, 1.3943, 1.3787, 1.3633, 1.3481, 1.3333, 1.3188, 1.3048, 1.2912, 1.278, 1.2653, 1.253, 1.2412, 1.2298, 1.2188, 1.2083, 1.1981, 1.1883, 1.1789, 1.1698, 1.1611, 1.1528, 1.1447, 1.137, 1.1296, 1.1225, 1.1156, 1.1091, 1.1028, 1.0967, 1.0909, 1.0854, 1.0801, 1.075, 1.0701, 1.0654, 1.061, 1.0567, 1.0526, 1.0488, 1.0451, 1.0415, 1.0382, 1.035, 1.032, 1.0292, 1.0265, 1.0239, 1.0215, 1.0193, 1.0172, 1.0152, 1.0134, 1.0117, 1.0101, 1.0086, 1.0073, 1.0061, 1.005, 1.004, 1.0032, 1.0024, 1.0079, 1.0012, 1.0008, 1.0004, 1.0002, 1, 1);
  --button-079-ease-animation: cubic-bezier(0.6, 0.05, 0, 0.85);
  --button-079-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-079 {
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-079:is(:hover, :focus-visible) .button-079__inner,
  [data-hover]:is(:hover, :focus-visible) .button-079 .button-079__inner {
    transition: scale 0.55s 0.05s var(--button-079-ease-hover), rotate 0.55s 0.05s var(--button-079-ease-hover);
    scale: 1.025;
    rotate: 2deg;
  }
  .button-079:is(:hover, :focus-visible) .button-079__bg,
  .button-079:is(:hover, :focus-visible) .button-079__bg-animation,
  [data-hover]:is(:hover, :focus-visible) .button-079 .button-079__bg,
  [data-hover]:is(:hover, :focus-visible) .button-079 .button-079__bg-animation {
    scale: var(--button-079-scale-x) var(--button-079-scale-y);
    rotate: 2deg;
    transition: scale 0.55s 0.05s var(--button-079-ease-hover), rotate 0.55s 0.05s var(--button-079-ease-hover);
  }
}
.button-079:active .button-079__bg,
.button-079:active .button-079__bg-animation {
  scale: calc(2 - var(--button-079-scale-x)) calc(2 - var(--button-079-scale-y));
}
@media (hover: hover) and (pointer: fine) {
  .button-079:active .button-079__bg,
  .button-079:active .button-079__bg-animation {
    scale: 1 1;
    rotate: -2deg;
  }
}
.button-079:active .button-079__inner {
  scale: 0.975;
  rotate: -2deg;
}
.button-079:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-079-color-focus);
  scale: var(--button-079-scale-x) var(--button-079-scale-y);
  rotate: 2deg;
  transition: box-shadow 0.3s var(--button-079-ease-focus), scale 0.55s 0.05s var(--button-079-ease-hover), rotate 0.55s 0.05s var(--button-079-ease-hover);
}
.button-079::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-079-focus-inset);
  border-radius: var(--button-079-border-radius);
  transition: box-shadow 0.3s var(--button-079-ease-focus), scale 0.45s var(--button-079-ease-hover), rotate 0.45s var(--button-079-ease-hover);
  pointer-events: none;
  z-index: 1;
}
@media (prefers-reduced-motion: no-preference) {
  .button-079.is--inview .button-079__bg-shine-wrap {
    animation-play-state: running;
  }
}
.button-079__inner {
  transition: scale 0.45s var(--button-079-ease-hover), rotate 0.45s var(--button-079-ease-hover);
}
.button-079__bg,
.button-079__bg-animation {
  transition: scale 0.45s var(--button-079-ease-hover), rotate 0.45s var(--button-079-ease-hover);
}
.button-079__bg-shine-wrap {
  animation: button-079-shine 1.5s var(--button-079-ease-animation) infinite, button-079-pause-between-iterations 3s var(--button-079-ease-animation) infinite;
  animation-play-state: paused;
}
@keyframes button-079-shine {
  from {
    translate: -15% -135%;
    rotate: -14deg;
  }
  to {
    translate: 15% 135%;
    rotate: -14deg;
  }
}
@keyframes button-079-pause-between-iterations {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50.1% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
```
### Implementation
#### Width Increase
Use `data-button-079-width-increase` to define how many pixels the button background expands horizontally on hover.
#### Height Increase
Use `data-button-079-height-increase` to define how many pixels the button background expands vertically on hover.
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-079[data-theme='secondary'] {
  --button-079-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-079-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.