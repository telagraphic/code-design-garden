---
title: "Button 004"
description: "Button 004."
slug: "buttons/button-004"
previewVideo: "button-004.mp4"
order: 49.985
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "004"]
sourceUrl: "https://www.osmo.supply/button-pack/button-004"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
```
### HTML
```text
<a data-button-004="" href="#" class="button-004">
  <span class="button-004__inner">
    <span data-button-004-text="" class="button-004__text is--default">Button</span>
    <span aria-hidden="true" data-button-004-text="" class="button-004__text is--hover">Button</span>
  </span>
  <span class="button-004__bg"></span>
</a>
```
### CSS
```text
:root {
  --button-004-color: #1b372e;
  --button-004-color-background: #d9ee79;
  --button-004-color-focus: #fff;
  --button-004-border-radius: 2.5em;
  --button-004-padding: 0.75em 1em;
  --button-004-translate-y: 1.25em;
  --button-004-focus-inset: -0.125em;
  --button-004-click-scale: 0.955 0.925;
  --button-004-ease-hover: cubic-bezier(0.675, 0.15, 0.1, 1);
  --button-004-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-004-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-004 {
  color: var(--button-004-color);
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
  transition: scale 0.15s var(--button-004-ease-click);
}
.button-004::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-004-focus-inset);
  border-radius: var(--button-004-border-radius);
  transition: box-shadow 0.3s var(--button-004-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-004:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-004-color-focus);
}
.button-004:active {
  scale: var(--button-004-click-scale);
}
.button-004__inner {
  pointer-events: none;
  border-radius: var(--button-004-border-radius);
  z-index: 1;
  padding: var(--button-004-padding);
  grid-area: 1 / 1;
  display: grid;
}
.button-004__text {
  perspective: 10em;
  transform-style: preserve-3d;
  grid-area: 1 / 1;
}
.button-004__text .button-004__split-char {
  --base-delay: 0.05s;
  --max-extra: 2.9s;
  --t: calc(var(--index) / max(var(--max-index), 1));
  --curve: sin(calc(var(--t) * 1.5deg));
  --delay: calc(var(--base-delay) + (var(--curve) * var(--max-extra)));
  --rot-t: calc(var(--index) / max(var(--max-index), 1));
  --rot-curve: sin(calc(var(--rot-t) * 30deg));
  --rot-sign: clamp(-1, var(--signed-index), 1);
  --rot-max: 36deg;
  display: inline-block;
}
.button-004__text.is--default .button-004__split-char {
  transition: transform 0.325s var(--button-004-ease-hover), translate 0.425s var(--button-004-ease-hover), rotate 0.45s var(--button-004-ease-hover), opacity 0.15s ease-out;
}
.button-004__text.is--hover .button-004__split-char {
  transition: transform 0.35s var(--button-004-ease-hover), translate 0.35s var(--button-004-ease-hover), rotate 0.35s var(--button-004-ease-hover), opacity 0.15s 0.1s ease-out;
  rotate: 1 0 0 -72deg;
  transform: rotateZ(calc(var(--rot-sign) * var(--rot-curve) * var(--rot-max) * -1)) scale(0.65);
  translate: calc(var(--signed-index) * 0.125em) calc(var(--button-004-translate-y) * 1) 0;
  opacity: 0;
}
.button-004__bg {
  background-color: var(--button-004-color-background);
  border-radius: var(--button-004-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-004__text .button-004__split-char {
    will-change: transform, translate, rotate, opacity;
  }
  .button-004:is(:hover, :focus-visible) .button-004__text.is--default .button-004__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-004 .button-004__text.is--default .button-004__split-char {
    translate: calc(var(--signed-index) * 0.125em) calc(var(--button-004-translate-y) * -1) 0;
    rotate: 1 0 0 72deg;
    transform: rotateZ(calc(var(--rot-sign) * var(--rot-curve) * var(--rot-max) * -1)) scale(0.65);
    opacity: 0;
    transition: transform 0.35s var(--delay) var(--button-004-ease-hover), translate 0.35s var(--delay) var(--button-004-ease-hover), rotate 0.35s var(--delay) var(--button-004-ease-hover), opacity 0.15s calc(var(--delay) + 0.1s) ease-out;
  }
  .button-004:is(:hover, :focus-visible) .button-004__text.is--hover .button-004__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-004 .button-004__text.is--hover .button-004__split-char {
    translate: 0 0 0;
    rotate: 1 0 0 0deg;
    transform: rotateZ(0deg) scale(1);
    opacity: 1;
    transition: transform 0.325s calc(var(--delay) + 0.05s) var(--button-004-ease-hover), translate 0.425s calc(var(--delay) + 0.05s) var(--button-004-ease-hover), rotate 0.45s calc(var(--delay) + 0.05s) var(--button-004-ease-hover), opacity 0.15s calc(var(--delay) + 0.075s) ease-out;
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(SplitText);
function initButton004() {
  const buttons = document.querySelectorAll('[data-button-004]');
  if (buttons.length === 0) return;
  buttons.forEach((element) => {
    const textElements = element.querySelectorAll('[data-button-004-text]');
    if (textElements.length === 0) return;
    textElements.forEach((textElement) => {
      const splitText = new SplitText(textElement, {
        type: 'chars',
        tag: 'span',
        charsClass: 'button-004__split-char',
      });
      const chars = splitText.chars;
      const count = chars.length;
      const center = (count - 1) / 2;
      const maxIndex = Math.floor(center);
      textElement.style.setProperty('--max-index', maxIndex);
      chars.forEach((char, index) => {
        const distance = Math.floor(Math.abs(index - center));
        let signedIndex = 0;
        if (index < center) {
          signedIndex = distance;
        } else if (index > center) {
          signedIndex = -distance;
        }
        char.style.setProperty('--index', distance);
        char.style.setProperty('--signed-index', signedIndex);
      });
    });
  });
}
// Inialize Button 004
document.addEventListener('DOMContentLoaded', () => {
  initButton004();
});
```
### CSS
```text
:root {
  --button-004-color: #1b372e;
  --button-004-color-background: #d9ee79;
  --button-004-color-focus: #fff;
  --button-004-border-radius: 2.5em;
  --button-004-padding: 0.75em 1em;
  --button-004-translate-y: 1.25em;
  --button-004-focus-inset: -0.125em;
  --button-004-click-scale: 0.955 0.925;
  --button-004-ease-hover: cubic-bezier(0.675, 0.15, 0.1, 1);
  --button-004-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-004-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-004 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-004-ease-click);
}
.button-004:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-004-color-focus);
}
.button-004:active {
  scale: var(--button-004-click-scale);
}
.button-004::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-004-focus-inset);
  border-radius: var(--button-004-border-radius);
  transition: box-shadow 0.3s var(--button-004-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-004__text .button-004__split-char {
  --base-delay: 0.05s;
  --max-extra: 2.9s;
  --t: calc(var(--index) / max(var(--max-index), 1));
  --curve: sin(calc(var(--t) * 1.5deg));
  --delay: calc(var(--base-delay) + (var(--curve) * var(--max-extra)));
  --rot-t: calc(var(--index) / max(var(--max-index), 1));
  --rot-curve: sin(calc(var(--rot-t) * 30deg));
  --rot-sign: clamp(-1, var(--signed-index), 1);
  --rot-max: 36deg;
  display: inline-block;
}
.button-004__text.is--default .button-004__split-char {
  transition: transform 0.325s var(--button-004-ease-hover), translate 0.425s var(--button-004-ease-hover), rotate 0.45s var(--button-004-ease-hover), opacity 0.15s ease-out;
}
.button-004__text.is--hover .button-004__split-char {
  transition: transform 0.35s var(--button-004-ease-hover), translate 0.35s var(--button-004-ease-hover), rotate 0.35s var(--button-004-ease-hover), opacity 0.15s 0.1s ease-out;
  rotate: 1 0 0 -72deg;
  transform: rotateZ(calc(var(--rot-sign) * var(--rot-curve) * var(--rot-max) * -1)) scale(0.65);
  translate: calc(var(--signed-index) * 0.125em) calc(var(--button-004-translate-y) * 1) 0;
  opacity: 0;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-004:is(:hover, :focus-visible) .button-004__text.is--default .button-004__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-004 .button-004__text.is--default .button-004__split-char {
    translate: calc(var(--signed-index) * 0.125em) calc(var(--button-004-translate-y) * -1) 0;
    rotate: 1 0 0 72deg;
    transform: rotateZ(calc(var(--rot-sign) * var(--rot-curve) * var(--rot-max) * -1)) scale(0.65);
    opacity: 0;
    transition: transform 0.35s var(--delay) var(--button-004-ease-hover), translate 0.35s var(--delay) var(--button-004-ease-hover), rotate 0.35s var(--delay) var(--button-004-ease-hover), opacity 0.15s calc(var(--delay) + 0.1s) ease-out;
  }
  .button-004:is(:hover, :focus-visible) .button-004__text.is--hover .button-004__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-004 .button-004__text.is--hover .button-004__split-char {
    translate: 0 0 0;
    rotate: 1 0 0 0deg;
    transform: rotateZ(0deg) scale(1);
    opacity: 1;
    transition: transform 0.325s calc(var(--delay) + 0.05s) var(--button-004-ease-hover), translate 0.425s calc(var(--delay) + 0.05s) var(--button-004-ease-hover), rotate 0.45s calc(var(--delay) + 0.05s) var(--button-004-ease-hover), opacity 0.15s calc(var(--delay) + 0.075s) ease-out;
  }
  .button-004__text .button-004__split-char {
    will-change: transform, translate, rotate, opacity;
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
.button-004[data-theme='secondary'] {
  --button-004-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-004-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.