---
title: "Button 001"
description: "Layered circle button with hover depth animation."
slug: "buttons/button-001"
previewVideo: "button-001.mp4"
order: 94
published: true
categories: ["button"]
triggers: ["hover"]
libraries: ["css-only"]
keywords: ["button", "hover", "circles"]
sourceUrl: "https://www.osmo.supply/button-pack/button-001"
---
## Setup
### HTML
```text
<a class="button-001" data-button-001="" href="#">
  <span class="button-001__wrap">
    <span class="button-001__inner">
      <span class="button-001__inner-circle">
        <span class="button-001__text">Button</span>
      </span>
      <span class="button-001__mid-circle">
        <span aria-hidden="true" class="button-001__text">Button</span>
      </span>
      <span class="button-001__outer-circle">
        <span aria-hidden="true" class="button-001__text">Button</span>
      </span>
      <span class="button-001__text-size">
        <span aria-hidden="true" class="button-001__text">Button</span>
      </span>
    </span>
  </span>
  <span class="button-001__bg"></span>
</a>
```
### CSS
```text
:root {
  --button-001-color: #201d1d;
  --button-001-color-background: #fff;
  --button-001-color-focus: #fff;
  --button-001-border-radius: 2.5em;
  --button-001-padding: 0.75em 1em;
  --button-001-focus-inset: -0.125em;
  --button-001-overflow: clip;
  --button-001-underline: none;
  --button-001-click-scale: 0.955 0.925;
  --button-001-ease-hover: linear(0, 0.0006, 0.0006, 0.0007, 0.0009, 0.001, 0.0011, 0.0013, 0.0015, 0.0017, 0.002, 0.0022, 0.0026, 0.003, 0.0034, 0.0039, 0.0045, 0.0052, 0.0059, 0.0068, 0.0078, 0.009, 0.0103, 0.0118, 0.0136, 0.0156, 0.0179, 0.0206, 0.0237, 0.0272, 0.0313, 0.0359, 0.0412, 0.0474, 0.0544, 0.0625, 0.0718, 0.0825, 0.0947, 0.1088, 0.125, 0.1436, 0.1649, 0.1895, 0.2176, 0.25, 0.2872, 0.3299, 0.3789, 0.4353, 0.5, 0.5647, 0.6211, 0.6701, 0.7128, 0.75, 0.7824, 0.8105, 0.8351, 0.8564, 0.875, 0.8912, 0.9053, 0.9175, 0.9282, 0.9375, 0.9456, 0.9526, 0.9588, 0.9641, 0.9688, 0.9728, 0.9763, 0.9794, 0.9821, 0.9844, 0.9864, 0.9882, 0.9897, 0.991, 0.9922, 0.9932, 0.9941, 0.9948, 0.9955, 0.9961, 0.9966, 0.997, 0.9974, 0.9978, 0.998, 0.9983, 0.9985, 0.9987, 0.9989, 0.999, 0.9991, 0.9993, 0.9994, 0.9994, 1);
  --button-001-ease-hover-out: cubic-bezier(0.4, 0.15, 0.3, 1);
  --button-001-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-001-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-001 {
  white-space: nowrap;
  color: var(--button-001-color);
  -webkit-user-select: none;
  user-select: none;
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-001-ease-click);
}
.button-001:active {
  scale: var(--button-001-click-scale);
}
.button-001__wrap {
  pointer-events: none;
  border-radius: var(--button-001-border-radius);
  padding: var(--button-001-padding);
  overflow: var(--button-001-overflow);
  z-index: 1;
  grid-area: 1 / 1;
}
.button-001__inner {
  place-items: center;
  display: grid;
  position: relative;
}
.button-001__inner-circle {
  aspect-ratio: 1;
  border-radius: 50%;
  grid-area: 1 / 1;
  place-content: center;
  width: 33.3333%;
  height: auto;
  display: grid;
  position: absolute;
  overflow: clip;
}
.button-001__mid-circle {
  aspect-ratio: 1;
  border-radius: 50%;
  grid-area: 1 / 1;
  place-content: center;
  width: 66.6667%;
  height: auto;
  display: grid;
  position: absolute;
  overflow: clip;
  -webkit-mask: radial-gradient(circle, #0000 33.3333%, #000 0);
  mask: radial-gradient(circle, #0000 33.3333%, #000 0);
}
.button-001__outer-circle {
  aspect-ratio: 1;
  grid-area: 1 / 1;
  place-content: center;
  width: 100%;
  display: grid;
  position: absolute;
  -webkit-mask: radial-gradient(circle, #0000 46.5%, #000 0);
  mask: radial-gradient(circle, #0000 46.5%, #000 0);
}
.button-001__inner-circle,
.button-001__mid-circle,
.button-001__outer-circle {
  transition: rotate 0.675s var(--button-001-ease-hover-out);
}
.button-001__text {
  text-underline-offset: 0.25em;
  -webkit-text-decoration: var(--button-001-underline);
  text-decoration: var(--button-001-underline);
  text-decoration-thickness: 2px;
}
.button-001__text-size {
  opacity: 0;
  grid-area: 1 / 1;
  place-content: center;
  display: grid;
}
.button-001__bg {
  background-color: var(--button-001-color-background);
  border-radius: var(--button-001-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
}
.button-001__bg::after {
  content: "";
  display: block;
  position: absolute;
  inset: var(--button-001-focus-inset);
  border-radius: var(--button-001-border-radius);
  transition: box-shadow 0.3s var(--button-001-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-001:is(:focus-visible) .button-001__bg::after {
  box-shadow: 0 0 0 0.125em var(--button-001-color-focus);
}
@media (hover: none) and (pointer: coarse) {
  .button-001 {
    --button-001-click-scale: 1.045 1.075;
  }
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-001:is(:hover, :focus-visible) .button-001__inner-circle,
  [data-hover]:is(:hover, :focus-visible) .button-001 .button-001__inner-circle {
    rotate: 360deg;
    transition: rotate 0.635s 0.05s var(--button-001-ease-hover);
  }
  .button-001:is(:hover, :focus-visible) .button-001__mid-circle,
  [data-hover]:is(:hover, :focus-visible) .button-001 .button-001__mid-circle {
    rotate: -360deg;
    transition: rotate 0.7s 0.05s var(--button-001-ease-hover);
  }
  .button-001:is(:hover, :focus-visible) .button-001__outer-circle,
  [data-hover]:is(:hover, :focus-visible) .button-001 .button-001__outer-circle {
    rotate: 360deg;
    transition: rotate 0.765s 0.05s var(--button-001-ease-hover);
  }
}
```
### CSS
```text
:root {
  --button-001-color: #201d1d;
  --button-001-color-background: #fff;
  --button-001-color-focus: #fff;
  --button-001-border-radius: 2.5em;
  --button-001-padding: 0.75em 1em;
  --button-001-focus-inset: -0.125em;
  --button-001-overflow: clip;
  --button-001-underline: none;
  --button-001-click-scale: 0.955 0.925;
  --button-001-ease-hover: linear(0, 0.0006, 0.0006, 0.0007, 0.0009, 0.001, 0.0011, 0.0013, 0.0015, 0.0017, 0.002, 0.0022, 0.0026, 0.003, 0.0034, 0.0039, 0.0045, 0.0052, 0.0059, 0.0068, 0.0078, 0.009, 0.0103, 0.0118, 0.0136, 0.0156, 0.0179, 0.0206, 0.0237, 0.0272, 0.0313, 0.0359, 0.0412, 0.0474, 0.0544, 0.0625, 0.0718, 0.0825, 0.0947, 0.1088, 0.125, 0.1436, 0.1649, 0.1895, 0.2176, 0.25, 0.2872, 0.3299, 0.3789, 0.4353, 0.5, 0.5647, 0.6211, 0.6701, 0.7128, 0.75, 0.7824, 0.8105, 0.8351, 0.8564, 0.875, 0.8912, 0.9053, 0.9175, 0.9282, 0.9375, 0.9456, 0.9526, 0.9588, 0.9641, 0.9688, 0.9728, 0.9763, 0.9794, 0.9821, 0.9844, 0.9864, 0.9882, 0.9897, 0.991, 0.9922, 0.9932, 0.9941, 0.9948, 0.9955, 0.9961, 0.9966, 0.997, 0.9974, 0.9978, 0.998, 0.9983, 0.9985, 0.9987, 0.9989, 0.999, 0.9991, 0.9993, 0.9994, 0.9994, 1);
  --button-001-ease-hover-out: cubic-bezier(0.4, 0.15, 0.3, 1);
  --button-001-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-001-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-001 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-001-ease-click);
}
@media (hover: none) and (pointer: coarse) {
  .button-001 {
    --button-001-click-scale: 1.045 1.075;
  }
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-001:is(:hover, :focus-visible) .button-001__inner-circle,
  [data-hover]:is(:hover, :focus-visible) .button-001 .button-001__inner-circle {
    rotate: 360deg;
    transition: rotate 0.635s 0.05s var(--button-001-ease-hover);
  }
  .button-001:is(:hover, :focus-visible) .button-001__mid-circle,
  [data-hover]:is(:hover, :focus-visible) .button-001 .button-001__mid-circle {
    rotate: -360deg;
    transition: rotate 0.7s 0.05s var(--button-001-ease-hover);
  }
  .button-001:is(:hover, :focus-visible) .button-001__outer-circle,
  [data-hover]:is(:hover, :focus-visible) .button-001 .button-001__outer-circle {
    rotate: 360deg;
    transition: rotate 0.765s 0.05s var(--button-001-ease-hover);
  }
}
.button-001:is(:focus-visible) .button-001__bg::after {
  box-shadow: 0 0 0 0.125em var(--button-001-color-focus);
}
.button-001:active {
  scale: var(--button-001-click-scale);
}
.button-001__inner-circle,
.button-001__mid-circle,
.button-001__outer-circle {
  transition: rotate 0.675s var(--button-001-ease-hover-out);
}
.button-001__bg::after {
  content: "";
  display: block;
  position: absolute;
  inset: var(--button-001-focus-inset);
  border-radius: var(--button-001-border-radius);
  transition: box-shadow 0.3s var(--button-001-ease-focus);
  pointer-events: none;
  z-index: 1;
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-001[data-theme='secondary'] {
  --button-001-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-001-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.