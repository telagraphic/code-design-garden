---
title: "Button 023"
description: "Button 023."
slug: "buttons/button-023"
previewVideo: "button-023.mp4"
order: 49.977
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "023"]
sourceUrl: "https://www.osmo.supply/button-pack/button-023"
---
## Setup
### HTML
```text
<a data-button-023="" href="#" class="button-023">
  <span class="button-023__bg">
    <span style="--index: 0;" class="button-023__bg-inner is--first"></span>
    <span style="--index: 1;" class="button-023__bg-inner is--second"></span>
  </span>
  <span class="button-023__inner">
    <span class="button-023__text is--first">Button</span>
    <span aria-hidden="true" class="button-023__text is--second">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-023-color: #121212;
  --button-023-color-background: #fff;
  --button-023-hover-color: #fff;
  --button-023-between-color-background: #ff5100;
  --button-023-hover-color-background: #121212;
  --button-023-color-focus: #121212;
  --button-023-focus-inset: -0.125em;
  --button-023-padding: 0.75em 1em;
  --button-023-border-radius: 2.5em;
  --button-023-click-scale: 0.955 0.925;
  --button-023-hover-scale: 1.065 1.095;
  --button-023-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-023-ease-hover: linear(0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%, 1.0011 81.26%, 1);
  --button-023-ease-smooth: cubic-bezier(0.32, 0.72, 0, 1);
  --button-023-ease-soft-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --button-023-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-023 {
  color: var(--button-023-color);
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
  transition: scale 0.15s var(--button-023-ease-click);
}
.button-023::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-023-focus-inset);
  border-radius: var(--button-023-border-radius);
  transition: box-shadow 0.3s var(--button-023-ease-focus), scale 0.45s var(--button-023-ease-smooth);
  pointer-events: none;
  z-index: 1;
}
.button-023:active {
  scale: var(--button-023-click-scale);
}
.button-023:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-023-color-focus);
  scale: var(--button-023-hover-scale);
}
.button-023__bg {
  pointer-events: none;
  background-color: var(--button-023-color-background);
  border-radius: var(--button-023-border-radius);
  grid-area: 1 / 1;
  place-items: center;
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  transition: scale 0.45s var(--button-023-ease-smooth);
}
.button-023__bg-inner {
  grid-area: 1 / 1;
  width: 120%;
  height: 100%;
  padding: 0;
  transform-origin: 100% 0;
  translate: 0 100% 0;
  rotate: -12deg;
  transition: translate 0.6s var(--button-023-ease-smooth), rotate 0.5s var(--button-023-ease-smooth);
  transition-delay: calc(var(--index) * -1 * 0.042s);
}
.button-023__bg-inner.is--first {
  background-color: var(--button-023-between-color-background);
}
.button-023__bg-inner.is--second {
  background-color: var(--button-023-hover-color-background);
  z-index: 1;
}
.button-023__inner {
  pointer-events: none;
  z-index: 1;
  border-radius: var(--button-023-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  display: grid;
  overflow: clip;
}
.button-023__text {
  width: 100%;
  height: 100%;
  padding: var(--button-023-padding);
  grid-area: 1 / 1;
}
.button-023__text.is--first {
  transform-origin: 0 0;
  transition: translate 0.75s var(--button-023-ease-hover), rotate 0.5s var(--button-023-ease-smooth);
}
.button-023__text.is--second {
  color: var(--button-023-hover-color);
  translate: 5% 100% 0;
  rotate: 1 1 0.75 -45deg;
  transform-origin: top right;
  transition: translate 0.75s var(--button-023-ease-hover), rotate 0.5s var(--button-023-ease-smooth);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-023:is(:hover, :focus-visible) .button-023__bg,
  [data-hover]:is(:hover, :focus-visible) .button-023 .button-023__bg {
    scale: var(--button-023-hover-scale);
  }
  .button-023:is(:hover, :focus-visible) .button-023__bg-inner,
  [data-hover]:is(:hover, :focus-visible) .button-023 .button-023__bg-inner {
    translate: 0 0 0;
    rotate: 0deg;
    transition-delay: calc(var(--index) * 0.068s + 0.05s);
  }
  .button-023:is(:hover, :focus-visible) .button-023__text.is--first,
  [data-hover]:is(:hover, :focus-visible) .button-023 .button-023__text.is--first {
    rotate: 1 1 0.45 -60deg;
    translate: -5% -100% 0;
    transition-delay: 0.075s;
  }
  .button-023:is(:hover, :focus-visible) .button-023__text.is--second,
  [data-hover]:is(:hover, :focus-visible) .button-023 .button-023__text.is--second {
    rotate: 1 1 0.45 0deg;
    translate: 0 0 0;
    transition-delay: 0.165s;
  }
}
```
### CSS
```text
:root {
  --button-023-color: #121212;
  --button-023-color-background: #fff;
  --button-023-hover-color: #fff;
  --button-023-between-color-background: #ff5100;
  --button-023-hover-color-background: #121212;
  --button-023-color-focus: #121212;
  --button-023-focus-inset: -0.125em;
  --button-023-padding: 0.75em 1em;
  --button-023-border-radius: 2.5em;
  --button-023-click-scale: 0.955 0.925;
  --button-023-hover-scale: 1.065 1.095;
  --button-023-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-023-ease-hover: linear(0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%, 1.0011 81.26%, 1);
  --button-023-ease-smooth: cubic-bezier(0.32, 0.72, 0, 1);
  --button-023-ease-soft-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --button-023-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-023 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-023-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-023:is(:hover, :focus-visible) .button-023__bg,
  [data-hover]:is(:hover, :focus-visible) .button-023 .button-023__bg {
    scale: var(--button-023-hover-scale);
  }
  .button-023:is(:hover, :focus-visible) .button-023__bg-inner,
  [data-hover]:is(:hover, :focus-visible) .button-023 .button-023__bg-inner {
    translate: 0 0 0;
    rotate: 0deg;
    transition-delay: calc(var(--index) * 0.068s + 0.05s);
  }
  .button-023:is(:hover, :focus-visible) .button-023__text.is--first,
  [data-hover]:is(:hover, :focus-visible) .button-023 .button-023__text.is--first {
    rotate: 1 1 0.45 -60deg;
    translate: -5% -100% 0;
    transition-delay: 0.075s;
  }
  .button-023:is(:hover, :focus-visible) .button-023__text.is--second,
  [data-hover]:is(:hover, :focus-visible) .button-023 .button-023__text.is--second {
    rotate: 1 1 0.45 0deg;
    translate: 0 0 0;
    transition-delay: 0.165s;
  }
}
.button-023:active {
  scale: var(--button-023-click-scale);
}
.button-023:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-023-color-focus);
  scale: var(--button-023-hover-scale);
}
.button-023::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-023-focus-inset);
  border-radius: var(--button-023-border-radius);
  transition: box-shadow 0.3s var(--button-023-ease-focus), scale 0.45s var(--button-023-ease-smooth);
  pointer-events: none;
  z-index: 1;
}
.button-023__bg {
  transition: scale 0.45s var(--button-023-ease-smooth);
}
.button-023__bg-inner {
  transform-origin: 100% 0;
  translate: 0 100% 0;
  rotate: -12deg;
  transition: translate 0.6s var(--button-023-ease-smooth), rotate 0.5s var(--button-023-ease-smooth);
  transition-delay: calc(var(--index) * -1 * 0.042s);
}
.button-023__text.is--first {
  transform-origin: 0 0;
  transition: translate 0.75s var(--button-023-ease-hover), rotate 0.5s var(--button-023-ease-smooth);
}
.button-023__text.is--second {
  translate: 5% 100% 0;
  rotate: 1 1 0.75 -45deg;
  transform-origin: top right;
  transition: translate 0.75s var(--button-023-ease-hover), rotate 0.5s var(--button-023-ease-smooth);
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-023[data-theme='secondary'] {
  --button-023-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-023-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.