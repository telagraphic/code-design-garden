---
title: "Button 002"
description: "Button 002."
slug: "buttons/button-002"
previewVideo: "button-002.mp4"
order: 49.986
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "002"]
sourceUrl: "https://www.osmo.supply/button-pack/button-002"
---
## Setup
### HTML
```text
<a data-button-002="" href="#" class="button-002">
  <span class="button-002__inner">
    <span data-text="Button" class="button-002__hover"></span>
    <span class="button-002__default">
      <span class="button-002__default-bg"></span>
      <span class="button-002__default-text">Button</span>
    </span>
  </span>
  <span class="button-002__bg"></span>
</a>
```
### CSS
```text
:root {
  --button-002-color: #fff;
  --button-002-color-background: #8963eb;
  --button-002-hover-color: #fff;
  --button-002-hover-color-background: #8963eb;
  --button-002-back-color-background: #fff;
  --button-002-color-focus: #000;
  --button-002-border-radius: 2.5em;
  --button-002-padding-outer: 0.125em;
  --button-002-padding-inner: 0.625em 0.8625em;
  --button-002-focus-inset: -0.125em;
  --button-002-click-scale: 0.955 0.925;
  --button-002-ease-hover: cubic-bezier(0.675, 0.15, 0.1, 1);
  --button-002-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-002-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-002 {
  font-variation-settings: "wght" 620;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  transition: scale 0.15s var(--button-002-ease-click);
}
.button-002:active {
  scale: var(--button-002-click-scale);
}
.button-002__inner {
  pointer-events: none;
  backface-visibility: hidden;
  perspective: 10em;
  padding: var(--button-002-padding-outer);
  border-radius: var(--button-002-border-radius);
  z-index: 1;
  clip-path: inset(0 round var(--button-002-border-radius));
  grid-area: 1 / 1;
  display: grid;
}
.button-002__hover {
  backface-visibility: hidden;
  transform-style: preserve-3d;
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  padding: 0;
  display: flex;
  translate: 0 calc(65% + var(--button-002-padding-outer)) 0;
  rotate: 1 0 0 -85deg;
  scale: 0.525;
  transition: translate 0.4s var(--button-002-ease-hover), rotate 0.4s var(--button-002-ease-hover), scale 0.4s var(--button-002-ease-hover);
}
.button-002__hover::after {
  content: attr(data-text);
  display: block;
  color: var(--button-002-hover-color);
  grid-area: 1 / 1;
  background-color: var(--button-002-hover-color-background);
  border-radius: calc(var(--button-002-border-radius) - var(--button-002-padding-outer));
  padding: var(--button-002-padding-inner);
}
.button-002__default {
  backface-visibility: hidden;
  color: var(--button-002-color);
  transform-style: preserve-3d;
  grid-area: 1 / 1;
  display: grid;
  transition: translate 0.45s var(--button-002-ease-hover), rotate 0.475s var(--button-002-ease-hover), scale 0.35s var(--button-002-ease-hover);
}
.button-002__default-bg {
  background-color: var(--button-002-color-background);
  border-radius: calc(var(--button-002-border-radius) - var(--button-002-padding-outer));
  grid-area: 1 / 1;
  padding: 0;
}
.button-002__default-text {
  padding: var(--button-002-padding-inner);
  grid-area: 1 / 1;
}
.button-002__bg {
  background-color: var(--button-002-back-color-background);
  border-radius: var(--button-002-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
}
.button-002__bg::after {
  content: "";
  display: block;
  position: absolute;
  inset: var(--button-002-focus-inset);
  border-radius: var(--button-002-border-radius);
  transition: box-shadow 0.3s var(--button-002-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-002:is(:focus-visible) .button-002__bg::after {
  box-shadow: 0 0 0 0.125em var(--button-002-color-focus);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-002:is(:hover, :focus-visible) .button-002__hover,
  [data-hover]:is(:hover, :focus-visible) .button-002 .button-002__hover {
    translate: 0 0 0;
    rotate: 1 0 0 0deg;
    scale: 1;
    transition: translate 0.45s 0.05s var(--button-002-ease-hover), rotate 0.475s 0.05s var(--button-002-ease-hover), scale 0.35s 0.05s var(--button-002-ease-hover);
  }
  .button-002:is(:hover, :focus-visible) .button-002__default,
  [data-hover]:is(:hover, :focus-visible) .button-002 .button-002__default {
    translate: 0 calc(-65% - var(--button-002-padding-outer)) 0;
    rotate: 1 0 0 85deg;
    scale: 0.525;
    transition: translate 0.4s 0.05s var(--button-002-ease-hover), rotate 0.4s 0.05s var(--button-002-ease-hover), scale 0.4s 0.05s var(--button-002-ease-hover);
  }
}
```
### CSS
```text
:root {
  --button-002-color: #fff;
  --button-002-color-background: #8963eb;
  --button-002-hover-color: #fff;
  --button-002-hover-color-background: #8963eb;
  --button-002-back-color-background: #fff;
  --button-002-color-focus: #000;
  --button-002-border-radius: 2.5em;
  --button-002-padding-outer: 0.125em;
  --button-002-padding-inner: 0.625em 0.8625em;
  --button-002-focus-inset: -0.125em;
  --button-002-click-scale: 0.955 0.925;
  --button-002-ease-hover: cubic-bezier(0.675, 0.15, 0.1, 1);
  --button-002-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-002-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-002 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-002-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-002:is(:hover, :focus-visible) .button-002__hover,
  [data-hover]:is(:hover, :focus-visible) .button-002 .button-002__hover {
    translate: 0 0 0;
    rotate: 1 0 0 0deg;
    scale: 1;
    transition: translate 0.45s 0.05s var(--button-002-ease-hover), rotate 0.475s 0.05s var(--button-002-ease-hover), scale 0.35s 0.05s var(--button-002-ease-hover);
  }
  .button-002:is(:hover, :focus-visible) .button-002__default,
  [data-hover]:is(:hover, :focus-visible) .button-002 .button-002__default {
    translate: 0 calc(-65% - var(--button-002-padding-outer)) 0;
    rotate: 1 0 0 85deg;
    scale: 0.525;
    transition: translate 0.4s 0.05s var(--button-002-ease-hover), rotate 0.4s 0.05s var(--button-002-ease-hover), scale 0.4s 0.05s var(--button-002-ease-hover);
  }
}
.button-002:is(:focus-visible) .button-002__bg::after {
  box-shadow: 0 0 0 0.125em var(--button-002-color-focus);
}
.button-002:active {
  scale: var(--button-002-click-scale);
}
.button-002__hover {
  translate: 0 calc(65% + var(--button-002-padding-outer)) 0;
  rotate: 1 0 0 -85deg;
  scale: 0.525;
  transition: translate 0.4s var(--button-002-ease-hover), rotate 0.4s var(--button-002-ease-hover), scale 0.4s var(--button-002-ease-hover);
  transform-style: preserve-3d;
}
.button-002__hover::after {
  content: attr(data-text);
  display: block;
  color: var(--button-002-hover-color);
  grid-area: 1 / 1;
  background-color: var(--button-002-hover-color-background);
  border-radius: calc(var(--button-002-border-radius) - var(--button-002-padding-outer));
  padding: var(--button-002-padding-inner);
}
.button-002__default {
  transition: translate 0.45s var(--button-002-ease-hover), rotate 0.475s var(--button-002-ease-hover), scale 0.35s var(--button-002-ease-hover);
}
.button-002__bg::after {
  content: "";
  display: block;
  position: absolute;
  inset: var(--button-002-focus-inset);
  border-radius: var(--button-002-border-radius);
  transition: box-shadow 0.3s var(--button-002-ease-focus);
  pointer-events: none;
  z-index: 1;
}
```
### Implementation
#### Padding Outer
Use `--button-002-padding-outer` to control the outer inset around the button face, but keep it as one single value because it is used in border-radius calculations.
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-002[data-theme='secondary'] {
  --button-002-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-002-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.