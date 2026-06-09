---
title: "Button 011"
description: "Button 011."
slug: "buttons/button-011"
previewVideo: "button-011.mp4"
order: 49.982
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "011"]
sourceUrl: "https://www.osmo.supply/button-pack/button-011"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
```
### HTML
```text
<a data-button-011="" href="#" class="button-011">
  <span class="button-011__bg"></span>
  <span class="button-011__inner">
    <span data-button-011-text="" class="button-011__text">Button</span>
    <span class="button-011__icon">
      <span class="button-011__icon-element"></span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-011-color: #121212;
  --button-011-color-background: #fff;
  --button-011-color-focus: #000;
  --button-011-border-radius: 2.5em;
  --button-011-padding-top: 0.75em;
  --button-011-padding-right: 1em;
  --button-011-padding-bottom: 0.75em;
  --button-011-padding-left: 1.5em;
  --button-011-icon-size: 0.325em;
  --button-011-icon-padding-left: 0.6875em;
  --button-011-icon-border-radius: 0.0675em;
  --button-011-icon-rotate: 45deg;
  --button-011-focus-inset: -0.125em;
  --button-011-click-scale: 0.955 0.925;
  --button-011-ease-hover-snappy: linear(0, 0.0084, 0.0311, 0.0651, 0.1077, 0.1564, 0.2094, 0.2649, 0.3215, 0.3782, 0.434, 0.4881, 0.5401, 0.5894, 0.6359, 0.6793, 0.7194, 0.7564, 0.7901, 0.8208, 0.8484, 0.8731, 0.8951, 0.9146, 0.9316, 0.9465, 0.9594, 0.9704, 0.9798, 0.9877, 0.9943, 0.9997, 1.0041, 1.0075, 1.0102, 1.0122, 1.0136, 1.0145, 1.015, 1.0152, 1.0151, 1.0147, 1.0142, 1.0136, 1.0128, 1.012, 1.0112, 1.0103, 1.0095, 1.0086, 1.0078, 1.007, 1.0063, 1.0056, 1.0049, 1.0043, 1.0037, 1.0032, 1.0027, 1.0023, 1.0019, 1.0016, 1.0013, 1.0011, 1.0008, 1.0006, 1.0005, 1.0003, 1.0002, 1.0001, 1, 0.9999, 0.9999, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 1, 1, 1, 1, 1);
  --button-011-ease-hover-smooth: cubic-bezier(0.32, 0.72, 0, 1);
  --button-011-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-011-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-011 {
  color: var(--button-011-color);
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
  transition: scale 0.15s var(--button-011-ease-click);
}
.button-011::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-011-focus-inset);
  border-radius: var(--button-011-border-radius);
  transition: box-shadow 0.3s var(--button-011-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-011:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-011-color-focus);
}
.button-011:active {
  scale: var(--button-011-click-scale);
}
.button-011__bg {
  pointer-events: none;
  background-color: var(--button-011-color-background);
  border-radius: var(--button-011-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-011__inner {
  pointer-events: none;
  grid-area: 1 / 1;
  display: grid;
}
.button-011__text {
  padding-top: var(--button-011-padding-top);
  padding-left: var(--button-011-padding-left);
  padding-right: var(--button-011-padding-right);
  padding-bottom: var(--button-011-padding-bottom);
  grid-area: 1 / 1;
}
.button-011__split-char {
  transition: translate 0.5s var(--button-011-ease-hover-snappy);
}
.button-011__icon {
  width: 100%;
  height: 100%;
  padding-left: var(--button-011-icon-padding-left);
  z-index: 1;
  grid-area: 1 / 1;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  transition: translate 0.5s var(--button-011-ease-hover-snappy);
}
.button-011__icon-element {
  border-radius: var(--button-011-icon-border-radius);
  rotate: var(--button-011-icon-rotate);
  width: var(--button-011-icon-size);
  height: var(--button-011-icon-size);
  background-color: currentColor;
  padding: 0;
  display: block;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-011:is(:hover, :focus-visible) .button-011__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-011 .button-011__split-char {
    translate: calc(var(--button-011-padding-left) * -1 + var(--button-011-padding-right)) 0 0;
    transition: translate 0.66s calc((var(--char) - 1) * 0.016s + 0.05s) var(--button-011-ease-hover-snappy);
  }
  .button-011:is(:hover, :focus-visible) .button-011__icon,
  [data-hover]:is(:hover, :focus-visible) .button-011 .button-011__icon {
    translate: calc(100% - (var(--button-011-icon-padding-left) * 2 + var(--button-011-icon-size))) 0 0;
    transition: translate 0.66s 0.05s var(--button-011-ease-hover-snappy);
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(SplitText);
function initButton011() {
  const buttons = document.querySelectorAll('[data-button-011]');
  if (buttons.length === 0) return;
  buttons.forEach((element) => {
    const text = element.querySelector('[data-button-011-text]');
    if (!text) return;
    const splitText = new SplitText(text, {
      type: 'chars',
      tag: 'span',
      charsClass: 'button-011__split-char',
      propIndex: true,
    });
    gsap.set(splitText.chars, { display: 'inline-block' });
  });
}
// Initalize Button 011
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton011();
  });
});
```
### CSS
```text
:root {
  --button-011-color: #121212;
  --button-011-color-background: #fff;
  --button-011-color-focus: #000;
  --button-011-border-radius: 2.5em;
  --button-011-padding-top: 0.75em;
  --button-011-padding-right: 1em;
  --button-011-padding-bottom: 0.75em;
  --button-011-padding-left: 1.5em;
  --button-011-icon-size: 0.325em;
  --button-011-icon-padding-left: 0.6875em;
  --button-011-icon-border-radius: 0.0675em;
  --button-011-icon-rotate: 45deg;
  --button-011-focus-inset: -0.125em;
  --button-011-click-scale: 0.955 0.925;
  --button-011-ease-hover-snappy: linear(0, 0.0084, 0.0311, 0.0651, 0.1077, 0.1564, 0.2094, 0.2649, 0.3215, 0.3782, 0.434, 0.4881, 0.5401, 0.5894, 0.6359, 0.6793, 0.7194, 0.7564, 0.7901, 0.8208, 0.8484, 0.8731, 0.8951, 0.9146, 0.9316, 0.9465, 0.9594, 0.9704, 0.9798, 0.9877, 0.9943, 0.9997, 1.0041, 1.0075, 1.0102, 1.0122, 1.0136, 1.0145, 1.015, 1.0152, 1.0151, 1.0147, 1.0142, 1.0136, 1.0128, 1.012, 1.0112, 1.0103, 1.0095, 1.0086, 1.0078, 1.007, 1.0063, 1.0056, 1.0049, 1.0043, 1.0037, 1.0032, 1.0027, 1.0023, 1.0019, 1.0016, 1.0013, 1.0011, 1.0008, 1.0006, 1.0005, 1.0003, 1.0002, 1.0001, 1, 0.9999, 0.9999, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9998, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 0.9999, 1, 1, 1, 1, 1);
  --button-011-ease-hover-smooth: cubic-bezier(0.32, 0.72, 0, 1);
  --button-011-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-011-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-011 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-011-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-011:is(:hover, :focus-visible) .button-011__icon,
  [data-hover]:is(:hover, :focus-visible) .button-011 .button-011__icon {
    translate: calc(100% - (var(--button-011-icon-padding-left) * 2 + var(--button-011-icon-size))) 0 0;
    transition: translate 0.66s 0.05s var(--button-011-ease-hover-snappy);
  }
  .button-011:is(:hover, :focus-visible) .button-011__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-011 .button-011__split-char {
    translate: calc(var(--button-011-padding-left) * -1 + var(--button-011-padding-right)) 0 0;
    transition: translate 0.66s calc((var(--char) - 1) * 0.016s + 0.05s) var(--button-011-ease-hover-snappy);
  }
}
.button-011:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-011-color-focus);
}
.button-011:active {
  scale: var(--button-011-click-scale);
}
.button-011::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-011-focus-inset);
  border-radius: var(--button-011-border-radius);
  transition: box-shadow 0.3s var(--button-011-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-011__icon {
  transition: translate 0.5s var(--button-011-ease-hover-snappy);
}
.button-011__split-char {
  transition: translate 0.5s var(--button-011-ease-hover-snappy);
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-011[data-theme='secondary'] {
  --button-011-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-011-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.