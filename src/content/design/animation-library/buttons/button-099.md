---
title: "Button 099"
description: "Button 099."
slug: "buttons/button-099"
previewVideo: "button-099.mp4"
order: 49.943
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "099"]
sourceUrl: "https://www.osmo.supply/button-pack/button-099"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
```
### HTML
```text
<a data-button-099="" href="#" class="button-099">
  <span class="button-099__bg"></span>
  <span class="button-099__inner">
    <span aria-hidden="true" data-button-099-text="" class="button-099__text is--default">Button</span>
    <span aria-hidden="true" class="button-099__text is--hover">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-099-color: #131313;
  --button-099-color-background: #fff;
  --button-099-color-focus: #000;
  --button-099-border-radius: 2.5em;
  --button-099-padding: 0.75em 1em;
  --button-099-overflow: clip;
  --button-099-focus-inset: -0.125em;
  --button-099-hover-scale: 1.065 1.095;
  --button-099-click-scale: 0.955 0.925;
  --button-099-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-099-ease-hover: cubic-bezier(0.19, 1, 0.22, 1);
  --button-099-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-099 {
  color: var(--button-099-color);
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
  transition: scale 0.15s var(--button-099-ease-click);
}
.button-099::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-099-focus-inset);
  border-radius: var(--button-099-border-radius);
  transition: box-shadow 0.2s var(--button-099-ease-focus), scale 0.65s var(--button-099-ease-hover);
  scale: 1 1;
  pointer-events: none;
  z-index: 1;
}
.button-099:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-099-color-focus);
  scale: var(--button-099-hover-scale);
}
.button-099:active {
  scale: var(--button-099-click-scale);
}
.button-099__bg {
  background-color: var(--button-099-color-background);
  border-radius: var(--button-099-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: scale 0.75s var(--button-099-ease-hover);
}
.button-099__inner {
  pointer-events: none;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: var(--button-099-padding);
  overflow: var(--button-099-overflow);
  grid-area: 1 / 1;
  display: grid;
}
.button-099__text {
  grid-area: 1 / 1;
}
.button-099__split-char {
  transition: translate 0.6s var(--button-099-ease-hover), transform 0.25s ease-out, opacity 0.15s ease-out;
}
.button-099__text.is--hover .button-099__split-char {
  translate: 1.5em 0 0;
  transform: skew(-28deg, 0deg);
  opacity: 0;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-099:is(:hover, :focus-visible) .button-099__bg,
  [data-hover]:is(:hover, :focus-visible) .button-099 .button-099__bg {
    scale: var(--button-099-hover-scale);
    transition-delay: 0.05s;
  }
  .button-099:is(:hover, :focus-visible) .button-099__text.is--default .button-099__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-099 .button-099__text.is--default .button-099__split-char {
    translate: -1.5em 0 0;
    transform: skew(-28deg, 0deg);
    opacity: 0;
    transition-delay: calc((var(--char) - 1) * 0.022s + 0.05s);
  }
  .button-099:is(:hover, :focus-visible) .button-099__text.is--hover .button-099__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-099 .button-099__text.is--hover .button-099__split-char {
    translate: 0 0 0;
    transform: skew(0deg, 0deg);
    opacity: 1;
    transition: translate 0.6s calc((var(--char) - 1) * 0.022s + 0.075s) var(--button-099-ease-hover), transform 0.25s calc((var(--char) - 1) * 0.022s + 0.075s) ease-out, opacity 0.15s calc((var(--char) - 1) * 0.022s + 0.075s) ease-out;
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(SplitText);
function initButton099() {
  const buttons = document.querySelectorAll('[data-button-099]');
  if (buttons.length === 0) return;
  buttons.forEach((element) => {
    const text = element.querySelector('[data-button-099-text]');
    const accessibleText = text.textContent.trim();
    const splitText = new SplitText(element, {
      type: 'chars',
      tag: 'span',
      charsClass: 'button-099__split-char',
      propIndex: true,
      aria: 'none',
    });
    element.setAttribute('aria-label', accessibleText);
    gsap.set(splitText.chars, { display: 'inline-block' });
  });
}
// Initialize Button 099
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(() => {
    initButton099();
  });
});
```
### CSS
```text
:root {
  --button-099-color: #131313;
  --button-099-color-background: #fff;
  --button-099-color-focus: #000;
  --button-099-border-radius: 2.5em;
  --button-099-padding: 0.75em 1em;
  --button-099-overflow: clip;
  --button-099-focus-inset: -0.125em;
  --button-099-hover-scale: 1.065 1.095;
  --button-099-click-scale: 0.955 0.925;
  --button-099-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-099-ease-hover: cubic-bezier(0.19, 1, 0.22, 1);
  --button-099-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-099 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-099-ease-click);
}
.button-099:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-099-color-focus);
  scale: var(--button-099-hover-scale);
}
.button-099:active {
  scale: var(--button-099-click-scale);
}
.button-099::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-099-focus-inset);
  border-radius: var(--button-099-border-radius);
  transition: box-shadow 0.2s var(--button-099-ease-focus), scale 0.65s var(--button-099-ease-hover);
  scale: 1 1;
  pointer-events: none;
  z-index: 1;
}
.button-099__bg {
  transition: scale 0.75s var(--button-099-ease-hover);
}
.button-099__split-char {
  transition: translate 0.6s var(--button-099-ease-hover), transform 0.25s ease-out, opacity 0.15s ease-out;
}
.button-099__text.is--hover .button-099__split-char {
  translate: 1.5em 0 0;
  transform: skew(-28deg, 0deg);
  opacity: 0;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-099:is(:hover, :focus-visible) .button-099__bg,
  [data-hover]:is(:hover, :focus-visible) .button-099 .button-099__bg {
    scale: var(--button-099-hover-scale);
    transition-delay: 0.05s;
  }
  .button-099:is(:hover, :focus-visible) .button-099__text.is--default .button-099__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-099 .button-099__text.is--default .button-099__split-char {
    translate: -1.5em 0 0;
    transform: skew(-28deg, 0deg);
    opacity: 0;
    transition-delay: calc((var(--char) - 1) * 0.022s + 0.05s);
  }
  .button-099:is(:hover, :focus-visible) .button-099__text.is--hover .button-099__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-099 .button-099__text.is--hover .button-099__split-char {
    translate: 0 0 0;
    transform: skew(0deg, 0deg);
    opacity: 1;
    transition: translate 0.6s calc((var(--char) - 1) * 0.022s + 0.075s) var(--button-099-ease-hover), transform 0.25s calc((var(--char) - 1) * 0.022s + 0.075s) ease-out, opacity 0.15s calc((var(--char) - 1) * 0.022s + 0.075s) ease-out;
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
.button-099[data-theme='secondary'] {
  --button-099-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-099-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.