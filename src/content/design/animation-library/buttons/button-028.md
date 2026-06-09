---
title: "Button 028"
description: "Button 028."
slug: "buttons/button-028"
previewVideo: "button-028.mp4"
order: 49.974
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "028"]
sourceUrl: "https://www.osmo.supply/button-pack/button-028"
---
## Setup
### HTML
```text
<a data-button-028="" href="#" class="button-028">
  <span class="button-028__bg"></span>
  <span class="button-028__inner">
    <span class="button-028__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-028-color: #fff;
  --button-028-color-background: #9f837c;
  --button-028-color-focus: #000;
  --button-028-border-radius: 2.5em;
  --button-028-padding: 0.75em 1em;
  --button-028-focus-inset: -0.125em;
  --button-028-hover-scale: 1.065 1.095;
  --button-028-click-scale: 0.955 0.925;
  --button-028-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-028-ease-hover: linear(0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%, 1.0011 81.26%, 1);
  --button-028-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-028 {
  color: var(--button-028-color);
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
  transition: scale 0.15s var(--button-028-ease-click);
}
.button-028::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-028-focus-inset);
  border-radius: var(--button-028-border-radius);
  transition: box-shadow 0.2s var(--button-028-ease-focus), scale 0.65s var(--button-028-ease-hover);
  scale: 1 1;
  pointer-events: none;
  z-index: 1;
}
.button-028:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-028-color-focus);
  scale: var(--button-028-hover-scale);
}
.button-028:active {
  scale: var(--button-028-click-scale);
}
.button-028__bg {
  background-color: var(--button-028-color-background);
  border-radius: var(--button-028-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: scale 0.75s var(--button-028-ease-hover);
}
.button-028__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-028-padding);
  z-index: 1;
  grid-area: 1 / 1;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
}
.button-028__icon {
  pointer-events: none;
  flex: none;
  width: 1em;
  height: 1em;
  position: absolute;
  translate: -65%;
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) rotate(60deg) scale(0.5);
  transition: opacity 0.15s ease-out, transform 0.75s var(--button-028-ease-hover);
}
.button-028__text {
  transition: transform 0.75s var(--button-028-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-028:is(:hover, :focus-visible) .button-028__bg,
  [data-hover]:is(:hover, :focus-visible) .button-028 .button-028__bg {
    scale: var(--button-028-hover-scale);
    transition-delay: 0.05s;
  }
  .button-028:is(:hover, :focus-visible) .button-028__icon,
  [data-hover]:is(:hover, :focus-visible) .button-028 .button-028__icon {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
    transition-delay: 0.05s;
  }
  .button-028:is(:hover, :focus-visible) .button-028__text,
  [data-hover]:is(:hover, :focus-visible) .button-028 .button-028__text {
    transform: translate3d(0.375em, 0, 0);
    transition-delay: 0.05s;
  }
}
@media (hover: none) and (pointer: coarse), (prefers-reduced-motion: reduce) {
  .button-028__icon {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
  }
  .button-028__text {
    transform: translate3d(0.375em, 0, 0);
  }
}
```
### CSS
```text
:root {
  --button-028-color: #fff;
  --button-028-color-background: #9f837c;
  --button-028-color-focus: #000;
  --button-028-border-radius: 2.5em;
  --button-028-padding: 0.75em 1em;
  --button-028-focus-inset: -0.125em;
  --button-028-hover-scale: 1.065 1.095;
  --button-028-click-scale: 0.955 0.925;
  --button-028-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-028-ease-hover: linear(0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%, 1.0011 81.26%, 1);
  --button-028-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-028 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-028-ease-click);
}
.button-028::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-028-focus-inset);
  border-radius: var(--button-028-border-radius);
  transition: box-shadow 0.2s var(--button-028-ease-focus), scale 0.65s var(--button-028-ease-hover);
  scale: 1 1;
  pointer-events: none;
  z-index: 1;
}
.button-028:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-028-color-focus);
  scale: var(--button-028-hover-scale);
}
.button-028:active {
  scale: var(--button-028-click-scale);
}
.button-028__bg {
  transition: scale 0.75s var(--button-028-ease-hover);
}
.button-028__icon {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) rotate(60deg) scale(0.5);
  transition: opacity 0.15s ease-out, transform 0.75s var(--button-028-ease-hover);
}
.button-028__text {
  transition: transform 0.75s var(--button-028-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-028:is(:hover, :focus-visible) .button-028__bg,
  [data-hover]:is(:hover, :focus-visible) .button-028 .button-028__bg {
    scale: var(--button-028-hover-scale);
    transition-delay: 0.05s;
  }
  .button-028:is(:hover, :focus-visible) .button-028__icon,
  [data-hover]:is(:hover, :focus-visible) .button-028 .button-028__icon {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
    transition-delay: 0.05s;
  }
  .button-028:is(:hover, :focus-visible) .button-028__text,
  [data-hover]:is(:hover, :focus-visible) .button-028 .button-028__text {
    transform: translate3d(0.375em, 0, 0);
    transition-delay: 0.05s;
  }
}
@media (hover: none) and (pointer: coarse), (prefers-reduced-motion: reduce) {
  .button-028__icon {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
  }
  .button-028__text {
    transform: translate3d(0.375em, 0, 0);
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
.button-028[data-theme='secondary'] {
  --button-028-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-028-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.