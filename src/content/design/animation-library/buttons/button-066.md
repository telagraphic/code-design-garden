---
title: "Button 066"
description: "Button 066."
slug: "buttons/button-066"
previewVideo: "button-066.mp4"
order: 49.956
published: true
categories: ["button", "filter", "text"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "066"]
sourceUrl: "https://www.osmo.supply/button-pack/button-066"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
```
### HTML
```text
<a data-button-066="" href="#" class="button-066">
  <span class="button-066__bg"></span>
  <span class="button-066__inner">
    <span data-button-066-text="" class="button-066__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-066-color: #131313;
  --button-066-color-background: #fff;
  --button-066-color-focus: #000;
  --button-066-padding: 0.75em 1em;
  --button-066-border-radius: 2.5em;
  --button-066-focus-inset: -0.125em;
  --button-066-index-offset: 1;
  --button-066-hover-scale: 1.065 1.095;
  --button-066-click-scale: 0.955, 0.925;
  --button-066-stagger: 0.024s;
  --button-066-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-066-ease-hover: cubic-bezier(0.625, 0.05, 0, 1);
  --button-066-ease-natural: cubic-bezier(0.32, 0.12, 0.2, 1);
  --button-066-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-066 {
  -webkit-user-select: none;
  user-select: none;
  color: var(--button-066-color);
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.button-066::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-066-focus-inset);
  border-radius: var(--button-066-border-radius);
  transition: box-shadow 0.3s var(--button-066-ease-focus), scale 0.45s var(--button-066-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-066:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-066-color-focus);
  scale: var(--button-066-hover-scale);
}
.button-066:active .button-066__bg {
  transform: scale(var(--button-066-click-scale));
}
.button-066__bg {
  background-color: var(--button-066-color-background);
  border-radius: var(--button-066-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: scale 0.45s var(--button-066-ease-hover), transform 0.15s var(--button-066-ease-click);
}
.button-066__inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  width: 100%;
  height: 100%;
  padding: var(--button-066-padding);
  z-index: 1;
  grid-area: 1 / 1;
  justify-content: center;
  align-items: stretch;
  display: flex;
}
.button-066__text {
  clip-path: inset(0% 0% -15%);
}
.button-066__split-char {
  text-shadow: 0 calc(var(--button-066-char-direction) * 1.1em) currentColor;
  transition: translate 0.3s var(--button-066-ease-hover), text-shadow 0.1s 0.15s ease;
}
.button-066__icon-outer {
  clip-path: inset(0% 0% -15%);
  flex: none;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-066__icon {
  flex: none;
  width: .75em;
  height: .75em;
  filter: drop-shadow(0 calc(var(--button-066-char-direction) * 1.1em) 0 currentColor);
  transition: translate 0.3s var(--button-066-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-066:is(:hover, :focus-visible) .button-066__bg,
  [data-hover]:is(:hover, :focus-visible) .button-066 .button-066__bg {
    scale: var(--button-066-hover-scale);
  }
  .button-066:is(:hover, :focus-visible) .button-066__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-066 .button-066__split-char {
    translate: 0 calc(var(--button-066-char-direction) * -1.1em) 0;
    transition: translate 0.5s calc((var(--char) - var(--button-066-index-offset)) * var(--button-066-stagger)) var(--button-066-ease-hover), text-shadow 0.175s calc((var(--char) - var(--button-066-index-offset)) * var(--button-066-stagger) + 0.25s) ease;
  }
  .button-066:is(:hover, :focus-visible) .button-066__icon,
  [data-hover]:is(:hover, :focus-visible) .button-066 .button-066__icon {
    translate: 0 calc(var(--button-066-char-direction) * -1.1em) 0;
    transition: translate 0.5s calc((var(--index) - var(--button-066-index-offset)) * var(--button-066-stagger)) var(--button-066-ease-hover);
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(SplitText);
function initButton066() {
  const buttons = document.querySelectorAll('[data-button-066]');
  if (buttons.length === 0) return;
  buttons.forEach((element) => {
    const text = element.querySelector('[data-button-066-text]');
    const icon = element.querySelector('[data-button-066-icon]');
    if (!text) return;
    const splitText = new SplitText(text, {
      type: 'chars',
      tag: 'span',
      charsClass: 'button-066__split-char',
      propIndex: true,
    });
    gsap.set(splitText.chars, { display: 'inline-block' });
    const charCount = splitText.chars?.length ?? 0;
    const iconIsBeforeText = !!icon && !!(icon.compareDocumentPosition(text) & Node.DOCUMENT_POSITION_FOLLOWING);
    const getDirection = (globalIndex) => (globalIndex % 2 === 0 ? -1 : 1);
    if (icon) {
      const iconGlobalIndex = iconIsBeforeText ? 0 : charCount;
      icon.style.setProperty('--button-066-char-direction', getDirection(iconGlobalIndex));
      const index = iconIsBeforeText ? 0 : charCount + 1;
      icon.style.setProperty('--index', index);
      element.style.setProperty('--button-066-index-offset', '0');
    }
    const charStartIndex = iconIsBeforeText ? 1 : 0;
    splitText.chars.forEach((charEl, i) => {
      const globalIndex = charStartIndex + i;
      charEl.style.setProperty('--button-066-char-direction', getDirection(globalIndex));
    });
  });
}
// Initialize Button 066
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton066();
  });
});
```
### CSS
```text
:root {
  --button-066-color: #131313;
  --button-066-color-background: #fff;
  --button-066-color-focus: #000;
  --button-066-padding: 0.75em 1em;
  --button-066-border-radius: 2.5em;
  --button-066-focus-inset: -0.125em;
  --button-066-index-offset: 1;
  --button-066-hover-scale: 1.065 1.095;
  --button-066-click-scale: 0.955, 0.925;
  --button-066-stagger: 0.024s;
  --button-066-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-066-ease-hover: cubic-bezier(0.625, 0.05, 0, 1);
  --button-066-ease-natural: cubic-bezier(0.32, 0.12, 0.2, 1);
  --button-066-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-066 {
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-066:is(:hover, :focus-visible) .button-066__bg,
  [data-hover]:is(:hover, :focus-visible) .button-066 .button-066__bg {
    scale: var(--button-066-hover-scale);
  }
  .button-066:is(:hover, :focus-visible) .button-066__split-char,
  [data-hover]:is(:hover, :focus-visible) .button-066 .button-066__split-char {
    translate: 0 calc(var(--button-066-char-direction) * -1.1em) 0;
    transition: translate 0.5s calc((var(--char) - var(--button-066-index-offset)) * var(--button-066-stagger)) var(--button-066-ease-hover), text-shadow 0.175s calc((var(--char) - var(--button-066-index-offset)) * var(--button-066-stagger) + 0.25s) ease;
  }
  .button-066:is(:hover, :focus-visible) .button-066__icon,
  [data-hover]:is(:hover, :focus-visible) .button-066 .button-066__icon {
    translate: 0 calc(var(--button-066-char-direction) * -1.1em) 0;
    transition: translate 0.5s calc((var(--index) - var(--button-066-index-offset)) * var(--button-066-stagger)) var(--button-066-ease-hover);
  }
}
.button-066:active .button-066__bg {
  transform: scale(var(--button-066-click-scale));
}
.button-066:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-066-color-focus);
  scale: var(--button-066-hover-scale);
}
.button-066::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-066-focus-inset);
  border-radius: var(--button-066-border-radius);
  transition: box-shadow 0.3s var(--button-066-ease-focus), scale 0.45s var(--button-066-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-066__bg {
  transition: scale 0.45s var(--button-066-ease-hover), transform 0.15s var(--button-066-ease-click);
}
.button-066__split-char {
  text-shadow: 0 calc(var(--button-066-char-direction) * 1.1em) currentColor;
  transition: translate 0.3s var(--button-066-ease-hover), text-shadow 0.1s 0.15s ease;
}
.button-066__icon {
  filter: drop-shadow(0 calc(var(--button-066-char-direction) * 1.1em) 0 currentColor);
  transition: translate 0.3s var(--button-066-ease-hover);
}
```
### Implementation
#### Clip Path
Use `clip-path: inset(0% 0% -15%)` on `.button-066__text` to adjust the visible mask when different line heights or font families cause parts of letters to shine through, where the `-15%` expands the mask further to the bottom, and make sure to use the same `clip-path` value on `.button-066__icon-outer` when using an icon.
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-066[data-theme='secondary'] {
  --button-066-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-066-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.