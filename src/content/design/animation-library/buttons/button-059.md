---
title: "Button 059"
description: "Button 059."
slug: "buttons/button-059"
previewVideo: "button-059.mp4"
order: 49.959
published: true
categories: ["button", "filter", "text"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "059"]
sourceUrl: "https://www.osmo.supply/button-pack/button-059"
---
## Setup
### HTML
```text
<a data-button-059="" href="#" class="button-059">
  <span class="button-059__block"></span>
  <span data-button-059-element="" class="button-059__element is--default">
    <span data-button-059-text="" class="button-059__text">Button</span>
  </span>
  <span class="button-059__block"></span>
  <span data-button-059-element="" aria-hidden="true" class="button-059__element is--hover">
    <span data-button-059-text="" class="button-059__text">Button</span>
  </span>
  <span class="button-059__block"></span>
</a>
```
### CSS
```text
:root {
  --button-059-color: #131313;
  --button-059-color-background: #fff;
  --button-059-color-focus: #fff;
  --button-059-padding: 0.75em 1em;
  --button-059-border-radius: 1.3em;
  --button-059-block-border-radius: 0.125em;
  --button-059-focus-inset: -0.125em;
  --button-059-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-059-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-059 {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  color: var(--button-059-color);
  -webkit-user-select: none;
  user-select: none;
  background-color: #0000;
  outline-style: none;
  justify-content: flex-start;
  align-items: stretch;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.button-059::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-059-focus-inset);
  border-radius: var(--button-059-block-border-radius);
  transition: box-shadow 0.3s var(--button-059-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-059:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-059-color-focus);
}
.button-059__block {
  pointer-events: none;
  background-color: var(--button-059-color-background);
  border-radius: var(--button-059-block-border-radius);
  width: .375em;
  padding: 0;
}
.button-059__element {
  pointer-events: none;
  background-color: var(--button-059-color-background);
  border-radius: var(--button-059-border-radius);
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: clip;
  will-change: width;
  transition: width 0.3s var(--button-059-ease-hover), border-radius 0.3s var(--button-059-ease-hover);
}
.button-059__element.is--default {
  width: var(--button-059-width);
}
.button-059__element.is--default .button-059__text {
  transform-origin: left;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s, scale 0.2s var(--button-059-ease-hover);
}
.button-059__element.is--hover {
  border-radius: var(--button-059-block-border-radius);
  width: 0.375em;
}
.button-059__element.is--hover .button-059__text {
  opacity: 0;
  filter: blur(0.1875em);
  scale: 0.8;
  transform-origin: right;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s, scale 0.2s var(--button-059-ease-hover);
}
.button-059__text {
  white-space: nowrap;
  padding: var(--button-059-padding);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-059:is(:hover, :focus-visible) .button-059__element,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element {
    transition: width 0.5s var(--button-059-ease-hover), border-radius 0.5s var(--button-059-ease-hover);
    transition-delay: 0.05s;
  }
  .button-059:is(:hover, :focus-visible) .button-059__element.is--default,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element.is--default {
    width: 0.375em;
    border-radius: var(--button-059-block-border-radius);
  }
  .button-059:is(:hover, :focus-visible) .button-059__element.is--default .button-059__text,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element.is--default .button-059__text {
    opacity: 0;
    filter: blur(0.1875em);
    scale: 0.8;
    transition-delay: 0.05s;
  }
  .button-059:is(:hover, :focus-visible) .button-059__element.is--hover,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element.is--hover {
    width: var(--button-059-width);
    border-radius: var(--button-059-border-radius);
  }
  .button-059:is(:hover, :focus-visible) .button-059__element.is--hover .button-059__text,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element.is--hover .button-059__text {
    opacity: 1;
    filter: blur(0);
    scale: 1;
    transition-delay: 0.125s;
  }
  .button-059:is(:hover, :focus-visible) .button-059__hover,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__hover {
    opacity: 1;
    scale: 1;
    transition-delay: 0.05s;
  }
}
```
### Javascript
```javascript
function initButton059() {
  const buttons = document.querySelectorAll('[data-button-059]');
  if (buttons.length === 0) return;
  const resizeCallbacks = new Set();
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCallbacks.forEach((callback) => callback());
    }, 60);
  });
  const addResizeCallback = (callback) => {
    resizeCallbacks.add(callback);
    return () => resizeCallbacks.delete(callback);
  };
  buttons.forEach((element) => {
    const elements = element.querySelectorAll('[data-button-059-element]');
    const updateWidth = (el) => {
      const text = el.querySelector('[data-button-059-text]');
      const width = text.offsetWidth;
      el.style.setProperty('--button-059-width', \`${width}px\`);
    };
    const updateAll = () => {elements.forEach(updateWidth);};
    updateAll();
    const removeResize = addResizeCallback(updateAll);
    return () => {
      removeResize?.();
    };
  });
}
// Initialize Button 059
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton059();
  });
});
```
### CSS
```text
:root {
  --button-059-color: #131313;
  --button-059-color-background: #fff;
  --button-059-color-focus: #fff;
  --button-059-padding: 0.75em 1em;
  --button-059-border-radius: 1.3em;
  --button-059-block-border-radius: 0.125em;
  --button-059-focus-inset: -0.125em;
  --button-059-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-059-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-059 {
  -webkit-tap-highlight-color: transparent;
}
.button-059:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-059-color-focus);
}
.button-059::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-059-focus-inset);
  border-radius: var(--button-059-block-border-radius);
  transition: box-shadow 0.3s var(--button-059-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-059__element {
  will-change: width;
  transition: width 0.3s var(--button-059-ease-hover), border-radius 0.3s var(--button-059-ease-hover);
}
.button-059__element.is--default {
  width: var(--button-059-width);
}
.button-059__element.is--default .button-059__text {
  transform-origin: left;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s, scale 0.2s var(--button-059-ease-hover);
}
.button-059__element.is--hover {
  width: 0.375em;
}
.button-059__element.is--hover .button-059__text {
  opacity: 0;
  filter: blur(0.1875em);
  scale: 0.8;
  transform-origin: right;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s, scale 0.2s var(--button-059-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-059:is(:hover, :focus-visible) .button-059__element,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element {
    transition: width 0.5s var(--button-059-ease-hover), border-radius 0.5s var(--button-059-ease-hover);
    transition-delay: 0.05s;
  }
  .button-059:is(:hover, :focus-visible) .button-059__element.is--default,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element.is--default {
    width: 0.375em;
    border-radius: var(--button-059-block-border-radius);
  }
  .button-059:is(:hover, :focus-visible) .button-059__element.is--default .button-059__text,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element.is--default .button-059__text {
    opacity: 0;
    filter: blur(0.1875em);
    scale: 0.8;
    transition-delay: 0.05s;
  }
  .button-059:is(:hover, :focus-visible) .button-059__element.is--hover,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element.is--hover {
    width: var(--button-059-width);
    border-radius: var(--button-059-border-radius);
  }
  .button-059:is(:hover, :focus-visible) .button-059__element.is--hover .button-059__text,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__element.is--hover .button-059__text {
    opacity: 1;
    filter: blur(0);
    scale: 1;
    transition-delay: 0.125s;
  }
  .button-059:is(:hover, :focus-visible) .button-059__hover,
  [data-hover]:is(:hover, :focus-visible) .button-059 .button-059__hover {
    opacity: 1;
    scale: 1;
    transition-delay: 0.05s;
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
.button-059[data-theme='secondary'] {
  --button-059-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-059-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.