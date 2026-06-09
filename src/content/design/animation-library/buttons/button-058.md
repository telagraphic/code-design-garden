---
title: "Button 058"
description: "Button 058."
slug: "buttons/button-058"
previewVideo: "button-058.mp4"
order: 49.96
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "058"]
sourceUrl: "https://www.osmo.supply/button-pack/button-058"
---
## Setup
### HTML
```text
<a data-button-058="" href="#" class="button-058">
  <span class="button-058__default">
    <span class="button-058__text">Button</span>
  </span>
  <span aria-hidden="true" class="button-058__hover">
    <span class="button-058__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-058-color: #131313;
  --button-058-color-background: #fff;
  --button-058-hover-color: #fff;
  --button-058-hover-color-background: #88a8ff;
  --button-058-color-focus: #000;
  --button-058-border-radius: 0.25em;
  --button-058-hover-border-radius: 1.25em;
  --button-058-padding: 0.75em;
  --button-058-focus-inset: -0.125em;
  --button-058-click-scale: 0.955 0.925;
  --button-058-ease-hover: linear(0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%, 1.0011 81.26%, 1);
  --button-058-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-058-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-058 {
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
  transition: scale 0.15s var(--button-058-ease-click);
}
.button-058::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-058-focus-inset);
  border-radius: var(--button-058-border-radius);
  transition: box-shadow 0.3s var(--button-058-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-058:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-058-color-focus);
}
.button-058:active {
  scale: var(--button-058-click-scale);
}
.button-058__default {
  pointer-events: none;
  width: 100%;
  height: 100%;
  color: var(--button-058-color);
  background-color: var(--button-058-color-background);
  padding: var(--button-058-padding);
  border-radius: var(--button-058-border-radius);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
  transition: scale 0.65s var(--button-058-ease-hover), border-radius 0.65s var(--button-058-ease-hover);
}
.button-058__hover {
  pointer-events: none;
  background-color: var(--button-058-hover-color-background);
  width: 100%;
  height: 100%;
  color: var(--button-058-hover-color);
  padding: var(--button-058-padding);
  border-radius: var(--button-058-border-radius);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
  opacity: 0;
  scale: 1.05;
  transition: scale 1.05s var(--button-058-ease-hover), border-radius 0.65s var(--button-058-ease-hover), opacity 0.1s ease-out;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-058::after {
    border-radius: var(--button-058-hover-border-radius);
  }
  .button-058:is(:hover, :focus-visible) .button-058__default,
  [data-hover]:is(:hover, :focus-visible) .button-058 .button-058__default {
    scale: 0.8;
    border-radius: var(--button-058-hover-border-radius);
    transition-delay: 0.05s;
  }
  .button-058:is(:hover, :focus-visible) .button-058__hover,
  [data-hover]:is(:hover, :focus-visible) .button-058 .button-058__hover {
    opacity: 1;
    scale: 1;
    border-radius: var(--button-058-hover-border-radius);
    transition-delay: 0.05s;
  }
}
```
### CSS
```text
:root {
  --button-058-color: #131313;
  --button-058-color-background: #fff;
  --button-058-hover-color: #fff;
  --button-058-hover-color-background: #88a8ff;
  --button-058-color-focus: #000;
  --button-058-border-radius: 0.25em;
  --button-058-hover-border-radius: 1.25em;
  --button-058-padding: 0.75em;
  --button-058-focus-inset: -0.125em;
  --button-058-click-scale: 0.955 0.925;
  --button-058-ease-hover: linear(0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%, 1.0011 81.26%, 1);
  --button-058-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-058-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-058 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-058-ease-click);
}
.button-058:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-058-color-focus);
}
.button-058:active {
  scale: var(--button-058-click-scale);
}
.button-058::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-058-focus-inset);
  border-radius: var(--button-058-border-radius);
  transition: box-shadow 0.3s var(--button-058-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-058__hover {
  opacity: 0;
  scale: 1.05;
  transition: scale 1.05s var(--button-058-ease-hover), border-radius 0.65s var(--button-058-ease-hover), opacity 0.1s ease-out;
}
.button-058__default {
  transition: scale 0.65s var(--button-058-ease-hover), border-radius 0.65s var(--button-058-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-058:is(:hover, :focus-visible) .button-058__hover,
  [data-hover]:is(:hover, :focus-visible) .button-058 .button-058__hover {
    opacity: 1;
    scale: 1;
    border-radius: var(--button-058-hover-border-radius);
    transition-delay: 0.05s;
  }
  .button-058:is(:hover, :focus-visible) .button-058__default,
  [data-hover]:is(:hover, :focus-visible) .button-058 .button-058__default {
    scale: 0.8;
    border-radius: var(--button-058-hover-border-radius);
    transition-delay: 0.05s;
  }
  .button-058::after {
    border-radius: var(--button-058-hover-border-radius);
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
.button-058[data-theme='secondary'] {
  --button-058-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-058-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.