---
title: "Button 038"
description: "Button 038."
slug: "buttons/button-038"
previewVideo: "button-038.mp4"
order: 49.97
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["vanilla-js"]
keywords: ["button", "038"]
sourceUrl: "https://www.osmo.supply/button-pack/button-038"
---
## Setup
### HTML
```text
<a data-button-038="" data-button-038-height-hover="-5" data-button-038-width-hover="-10" href="#" class="button-038">
  <span class="button-038__bg"></span>
  <span class="button-038__inner">
    <span data-button-038-text="" class="button-038__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-038-color: #131313;
  --button-038-color-background: #fff;
  --button-038-color-focus: #000;
  --button-038-padding: 0.75em 1em;
  --button-038-border-radius: 2.5em;
  --button-038-focus-inset: -0.125em;
  --button-038-stagger: 0.015s;
  --button-038-ease-hover: cubic-bezier(0.625, 0.05, 0, 1);
  --button-038-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-038 {
  color: var(--button-038-color);
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
.button-038::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-038-focus-inset);
  border-radius: var(--button-038-border-radius);
  transition: box-shadow 0.3s var(--button-038-ease-focus), scale 0.45s var(--button-038-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-038:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-038-color-focus);
  scale: var(--button-038-scale-x) var(--button-038-scale-y);
  transition: box-shadow 0.3s var(--button-038-ease-focus), scale 0.55s 0.05s var(--button-038-ease-hover);
}
.button-038__bg {
  background-color: var(--button-038-color-background);
  border-radius: var(--button-038-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: scale 0.45s var(--button-038-ease-hover);
}
.button-038__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-038-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-038__text {
  clip-path: inset(-10% 0%);
}
.button-038__text span {
  will-change: transform;
  display: inline-block;
  white-space: nowrap;
  translate: 0 0 0;
  text-shadow: 0px 1.3em currentColor;
  transition: translate 0.6s calc(var(--index) * var(--button-038-stagger)) var(--button-038-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-038:is(:hover, :focus-visible) .button-038__bg,
  [data-hover]:is(:hover, :focus-visible) .button-038 .button-038__bg {
    scale: var(--button-038-scale-x) var(--button-038-scale-y);
    transition: scale 0.55s 0.05s var(--button-038-ease-hover);
  }
  .button-038:is(:hover, :focus-visible) .button-038__text span,
  [data-hover]:is(:hover, :focus-visible) .button-038 .button-038__text span {
    translate: 0 -1.3em 0;
    transition: translate 0.6s calc(var(--index) * var(--button-038-stagger) + 0.05s) var(--button-038-ease-hover);
  }
}
```
### Javascript
```javascript
function initButton038() {
  const buttons = document.querySelectorAll('[data-button-038]');
  if (buttons.length === 0) return;
  buttons.forEach((element) => {
    const textElement = element.querySelector('[data-button-038-text]');
    const widthHover = Number(element.getAttribute('data-button-038-width-hover')) || 0;
    const heightHover = Number(element.getAttribute('data-button-038-height-hover')) || 0;
    if (!textElement) return;
    const setScale = (x, y) => {
      element.style.setProperty('--button-038-scale-x', x);
      element.style.setProperty('--button-038-scale-y', y);
    };
    const updateScale = () => {
      const currentWidth = element.offsetWidth;
      const currentHeight = element.offsetHeight;
      const scaleX = (currentWidth + widthHover) / currentWidth;
      const scaleY = (currentHeight + heightHover) / currentHeight;
      setScale(scaleX, scaleY);
    };
    updateScale();
    const text = textElement.textContent;
    textElement.innerHTML = '';
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.setProperty('--index', index);
      if (char === ' ') {
        span.style.whiteSpace = 'pre';
      }
      textElement.appendChild(span);
    });
  });
}
// Initialize Button 038
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton038();
  });
});
```
### CSS
```text
:root {
  --button-038-color: #131313;
  --button-038-color-background: #fff;
  --button-038-color-focus: #000;
  --button-038-padding: 0.75em 1em;
  --button-038-border-radius: 2.5em;
  --button-038-focus-inset: -0.125em;
  --button-038-stagger: 0.015s;
  --button-038-ease-hover: cubic-bezier(0.625, 0.05, 0, 1);
  --button-038-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-038 {
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-038:is(:hover, :focus-visible) .button-038__bg,
  [data-hover]:is(:hover, :focus-visible) .button-038 .button-038__bg {
    scale: var(--button-038-scale-x) var(--button-038-scale-y);
    transition: scale 0.55s 0.05s var(--button-038-ease-hover);
  }
  .button-038:is(:hover, :focus-visible) .button-038__text span,
  [data-hover]:is(:hover, :focus-visible) .button-038 .button-038__text span {
    translate: 0 -1.3em 0;
    transition: translate 0.6s calc(var(--index) * var(--button-038-stagger) + 0.05s) var(--button-038-ease-hover);
  }
}
.button-038:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-038-color-focus);
  scale: var(--button-038-scale-x) var(--button-038-scale-y);
  transition: box-shadow 0.3s var(--button-038-ease-focus), scale 0.55s 0.05s var(--button-038-ease-hover);
}
.button-038::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-038-focus-inset);
  border-radius: var(--button-038-border-radius);
  transition: box-shadow 0.3s var(--button-038-ease-focus), scale 0.45s var(--button-038-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-038__bg {
  transition: scale 0.45s var(--button-038-ease-hover);
}
.button-038__text span {
  will-change: transform;
  display: inline-block;
  white-space: nowrap;
  translate: 0 0 0;
  text-shadow: 0px 1.3em currentColor;
  transition: translate 0.6s calc(var(--index) * var(--button-038-stagger)) var(--button-038-ease-hover);
}
```
### Implementation
#### Width Increase
Use `data-button-038-width-increase` to define how many pixels the button background expands horizontally on hover.
#### Height Increase
Use `data-button-038-height-increase` to define how many pixels the button background expands vertically on hover.
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-038[data-theme='secondary'] {
  --button-038-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-038-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.