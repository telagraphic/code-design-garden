---
title: "Button 056"
description: "Button 056."
slug: "buttons/button-056"
previewVideo: "button-056.mp4"
order: 49.961
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "056"]
sourceUrl: "https://www.osmo.supply/button-pack/button-056"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
```
### HTML
```text
<a data-button-056="" href="#" class="button-056">
  <span class="button-056__bg-wrap">
    <span class="button-056__bg"></span>
    <span class="button-056__bg-hover"></span>
  </span>
  <span class="button-056__inner">
    <span class="button-056__text-outer">
      <span data-button-056-text="" class="button-056__text">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-056-color: #131313;
  --button-056-color-background: #fff;
  --button-056-hover-color: #fff;
  --button-056-hover-color-background: #ef8a61;
  --button-056-color-focus: #000;
  --button-056-padding: 0.75em 1em;
  --button-056-border-radius: 2.5em;
  --button-056-focus-inset: -0.125em;
  --button-056-hover-scale: 1.065 1.095;
  --button-056-click-scale: 0.955, 0.925;
  --button-056-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-056-ease-hover: cubic-bezier(0.34, 1.44, 0.64, 1);
  --button-056-ease-power-out: cubic-bezier(0.23, 1, 0.32, 1);
  --button-056-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-056 {
  -webkit-user-select: none;
  user-select: none;
  color: var(--button-056-color);
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.button-056::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-056-focus-inset);
  border-radius: var(--button-056-border-radius);
  transition: box-shadow 0.3s var(--button-056-ease-focus), scale 0.4s var(--button-056-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-056:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-056-color-focus);
  scale: var(--button-056-hover-scale);
  transition: box-shadow 0.3s var(--button-056-ease-focus), scale 0.425s 0.05s var(--button-056-ease-hover);
}
.button-056__bg-wrap {
  pointer-events: none;
  border-radius: var(--button-056-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  display: grid;
  overflow: clip;
  transition: scale 0.4s var(--button-056-ease-hover), transform 0.15s var(--button-056-ease-click);
}
.button-056:active .button-056__bg-wrap {
  transform: scale(var(--button-056-click-scale));
}
.button-056__bg {
  background-color: var(--button-056-color-background);
  border-radius: var(--button-056-border-radius);
  grid-area: 1 / 1;
  place-self: center;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
  padding: 0;
}
.button-056__bg-hover {
  z-index: 1;
  background-color: var(--button-056-hover-color-background);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  translate: 0 101% 0;
  transition: translate 0.45s var(--button-056-ease-power-out);
}
.button-056__inner {
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding: var(--button-056-padding);
  z-index: 1;
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-056__text-outer {
  clip-path: inset(-10% 0);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-056:is(:hover, :focus-visible) .button-056__bg-wrap,
  [data-hover]:is(:hover, :focus-visible) .button-056 .button-056__bg-wrap {
    scale: var(--button-056-hover-scale);
    transition: scale 0.425s 0.05s var(--button-056-ease-hover), transform 0.15s var(--button-056-ease-click);
  }
  .button-056:is(:hover, :focus-visible) .button-056__bg-hover,
  [data-hover]:is(:hover, :focus-visible) .button-056 .button-056__bg-hover {
    translate: 0 0 0;
    transition-delay: 0.05s;
  }
  .button-056__split-word {
    text-shadow: 0px 1.3em var(--button-056-hover-color);
    transition: translate 0.45s calc((var(--word) - 1) * 0.042s) var(--button-056-ease-power-out);
  }
  .button-056:is(:hover, :focus-visible) .button-056__split-word,
  [data-hover]:is(:hover, :focus-visible) .button-056 .button-056__split-word {
    translate: 0 -1.3em 0;
    transition: translate 0.45s calc((var(--word) - 1) * 0.042s + 0.05s) var(--button-056-ease-power-out);
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(SplitText);
function initButton056() {
  const buttons = document.querySelectorAll('[data-button-056]');
  if (buttons.length === 0) return;
  buttons.forEach((element) => {
    const textElements = element.querySelectorAll('[data-button-056-text]');
    if (textElements.length === 0) return;
    textElements.forEach((textElement) => {
      const splitText = new SplitText(textElement, {
        type: 'words',
        tag: 'span',
        wordsClass: 'button-056__split-word',
        propIndex: true,
      });
      gsap.set(splitText.words, { display: 'inline-block' });
    });
  });
}
// Initialize Button 056
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(() => {
    initButton056();
  });
});
```
### CSS
```text
:root {
  --button-056-color: #131313;
  --button-056-color-background: #fff;
  --button-056-hover-color: #fff;
  --button-056-hover-color-background: #ef8a61;
  --button-056-color-focus: #000;
  --button-056-padding: 0.75em 1em;
  --button-056-border-radius: 2.5em;
  --button-056-focus-inset: -0.125em;
  --button-056-hover-scale: 1.065 1.095;
  --button-056-click-scale: 0.955, 0.925;
  --button-056-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-056-ease-hover: cubic-bezier(0.34, 1.44, 0.64, 1);
  --button-056-ease-power-out: cubic-bezier(0.23, 1, 0.32, 1);
  --button-056-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-056 {
  -webkit-tap-highlight-color: transparent;
}
.button-056:active .button-056__bg-wrap {
  transform: scale(var(--button-056-click-scale));
}
.button-056:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-056-color-focus);
  scale: var(--button-056-hover-scale);
  transition: box-shadow 0.3s var(--button-056-ease-focus), scale 0.425s 0.05s var(--button-056-ease-hover);
}
.button-056::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-056-focus-inset);
  border-radius: var(--button-056-border-radius);
  transition: box-shadow 0.3s var(--button-056-ease-focus), scale 0.4s var(--button-056-ease-hover);
  pointer-events: none;
  z-index: 1;
}
.button-056__bg-wrap {
  transition: scale 0.4s var(--button-056-ease-hover), transform 0.15s var(--button-056-ease-click);
}
.button-056__bg-hover {
  translate: 0 101% 0;
  transition: translate 0.45s var(--button-056-ease-power-out);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-056:is(:hover, :focus-visible) .button-056__bg-wrap,
  [data-hover]:is(:hover, :focus-visible) .button-056 .button-056__bg-wrap {
    scale: var(--button-056-hover-scale);
    transition: scale 0.425s 0.05s var(--button-056-ease-hover), transform 0.15s var(--button-056-ease-click);
  }
  .button-056:is(:hover, :focus-visible) .button-056__bg-hover,
  [data-hover]:is(:hover, :focus-visible) .button-056 .button-056__bg-hover {
    translate: 0 0 0;
    transition-delay: 0.05s;
  }
  .button-056__split-word {
    text-shadow: 0px 1.3em var(--button-056-hover-color);
    transition: translate 0.45s calc((var(--word) - 1) * 0.042s) var(--button-056-ease-power-out);
  }
  .button-056:is(:hover, :focus-visible) .button-056__split-word,
  [data-hover]:is(:hover, :focus-visible) .button-056 .button-056__split-word {
    translate: 0 -1.3em 0;
    transition: translate 0.45s calc((var(--word) - 1) * 0.042s + 0.05s) var(--button-056-ease-power-out);
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
.button-056[data-theme='secondary'] {
  --button-056-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-056-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.