---
title: "Button 027"
description: "Button 027."
slug: "buttons/button-027"
previewVideo: "button-027.mp4"
order: 49.975
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "027"]
sourceUrl: "https://www.osmo.supply/button-pack/button-027"
---
## Setup
### HTML
```text
<a data-button-027="" href="#" class="button-027">
  <span class="button-027__inner">
    <span class="button-027__default">
      <span class="button-027__default-bg"></span>
      <span class="button-027__default-inner">
        <span class="button-027__text">Button</span>
      </span>
    </span>
    <span aria-hidden="true" class="button-027__hover">
      <span class="button-027__hover-bg"></span>
      <span class="button-027__hover-inner">
        <span class="button-027__text">Button</span>
      </span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-027-color: #131313;
  --button-027-color-background: #f4f4f4;
  --button-027-border: 0;
  --button-027-hover-color: #f4f4f4;
  --button-027-hover-color-background: #6f8b9a;
  --button-027-hover-border: 0;
  --button-027-color-focus: #131313;
  --button-027-padding: 0.75em 1em;
  --button-027-border-radius: 2.5em;
  --button-027-focus-inset: -0.125em;
  --button-027-click-scale: 0.955 0.925;
  --button-027-focus-scale: 1.15;
  --button-027-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-027-ease-hover: linear(0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%, 1.0011 81.26%, 1);
  --button-027-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-027 {
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
  transition: scale 0.15s var(--button-027-ease-click);
}
.button-027::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-027-focus-inset);
  border-radius: var(--button-027-border-radius);
  transition: box-shadow 0.2s var(--button-027-ease-focus), scale 0.75s var(--button-027-ease-hover);
  scale: var(--button-027-focus-scale);
  pointer-events: none;
  z-index: 1;
}
.button-027:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-027-color-focus);
  scale: 1 1;
}
.button-027:active {
  scale: var(--button-027-click-scale);
}
.button-027__inner {
  pointer-events: none;
  perspective: 35em;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  grid-area: 1 / 1;
  place-items: center;
  display: grid;
}
.button-027__default {
  width: 100%;
  height: 100%;
  color: var(--button-027-color);
  grid-area: 1 / 1;
  display: grid;
  transition: translate 0.75s var(--button-027-ease-hover), rotate 0.85s var(--button-027-ease-hover), opacity 0.15s ease-out;
}
.button-027__default-bg {
  background-color: var(--button-027-color-background);
  border-radius: var(--button-027-border-radius);
  border: var(--button-027-border);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-027__default-inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  width: 100%;
  height: 100%;
  padding: var(--button-027-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-027__hover {
  width: 100%;
  height: 100%;
  color: var(--button-027-hover-color);
  grid-area: 1 / 1;
  display: grid;
  transition: translate 0.85s var(--button-027-ease-hover), rotate 0.75s var(--button-027-ease-hover), opacity 0.15s ease-out;
  opacity: 0;
  translate: 0 2em -8em;
  rotate: 1 0 0 -90deg;
}
.button-027__hover-bg {
  border-radius: var(--button-027-border-radius);
  background-color: var(--button-027-hover-color-background);
  border: var(--button-027-hover-border);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-027__hover-inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  width: 100%;
  height: 100%;
  padding: var(--button-027-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-027__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-027:is(:hover, :focus-visible) .button-027__default,
  [data-hover]:is(:hover, :focus-visible) .button-027 .button-027__default {
    translate: 0 -2em -8em;
    rotate: 1 0 0 90deg;
    opacity: 0;
    transition-delay: 0.05s;
  }
  .button-027:is(:hover, :focus-visible) .button-027__hover,
  [data-hover]:is(:hover, :focus-visible) .button-027 .button-027__hover {
    transition: translate 0.75s 0.05s var(--button-027-ease-hover), rotate 0.85s 0.05s var(--button-027-ease-hover), opacity 0.075s 0.05s ease-in;
    rotate: 1 0 0 0deg;
    translate: 0 0 0;
    opacity: 1;
  }
}
```
### CSS
```text
:root {
  --button-027-color: #131313;
  --button-027-color-background: #f4f4f4;
  --button-027-border: 0;
  --button-027-hover-color: #f4f4f4;
  --button-027-hover-color-background: #6f8b9a;
  --button-027-hover-border: 0;
  --button-027-color-focus: #131313;
  --button-027-padding: 0.75em 1em;
  --button-027-border-radius: 2.5em;
  --button-027-focus-inset: -0.125em;
  --button-027-click-scale: 0.955 0.925;
  --button-027-focus-scale: 1.15;
  --button-027-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-027-ease-hover: linear(0, 0.5737 7.6%, 0.8382 11.87%, 0.9463 14.19%, 1.0292 16.54%, 1.0886 18.97%, 1.1258 21.53%, 1.137 22.97%, 1.1424 24.48%, 1.1423 26.1%, 1.1366 27.86%, 1.1165 31.01%, 1.0507 38.62%, 1.0219 42.57%, 0.9995 46.99%, 0.9872 51.63%, 0.9842 58.77%, 1.0011 81.26%, 1);
  --button-027-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-027 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-027-ease-click);
}
.button-027:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-027-color-focus);
  scale: 1 1;
}
.button-027:active {
  scale: var(--button-027-click-scale);
}
.button-027::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-027-focus-inset);
  border-radius: var(--button-027-border-radius);
  transition: box-shadow 0.2s var(--button-027-ease-focus), scale 0.75s var(--button-027-ease-hover);
  scale: var(--button-027-focus-scale);
  pointer-events: none;
  z-index: 1;
}
.button-027__default {
  transition: translate 0.75s var(--button-027-ease-hover), rotate 0.85s var(--button-027-ease-hover), opacity 0.15s ease-out;
}
.button-027__hover {
  transition: translate 0.85s var(--button-027-ease-hover), rotate 0.75s var(--button-027-ease-hover), opacity 0.15s ease-out;
  opacity: 0;
  translate: 0 2em -8em;
  rotate: 1 0 0 -90deg;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-027:is(:hover, :focus-visible) .button-027__default,
  [data-hover]:is(:hover, :focus-visible) .button-027 .button-027__default {
    translate: 0 -2em -8em;
    rotate: 1 0 0 90deg;
    opacity: 0;
    transition-delay: 0.05s;
  }
  .button-027:is(:hover, :focus-visible) .button-027__hover,
  [data-hover]:is(:hover, :focus-visible) .button-027 .button-027__hover {
    transition: translate 0.75s 0.05s var(--button-027-ease-hover), rotate 0.85s 0.05s var(--button-027-ease-hover), opacity 0.075s 0.05s ease-in;
    rotate: 1 0 0 0deg;
    translate: 0 0 0;
    opacity: 1;
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
.button-027[data-theme='secondary'] {
  --button-027-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-027-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.