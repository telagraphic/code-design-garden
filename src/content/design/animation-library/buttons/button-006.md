---
title: "Button 006"
description: "Button 006."
slug: "buttons/button-006"
previewVideo: "button-006.mp4"
order: 49.984
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "006"]
sourceUrl: "https://www.osmo.supply/button-pack/button-006"
---
## Setup
### HTML
```text
<a data-button-006="" href="#" class="button-006">
  <span class="button-006__hover">
    <span class="button-006__text">Button</span>
    <span class="button-006__bg is--hover"></span>
  </span>
  <span class="button-006__default">
    <span aria-hidden="true" class="button-006__text">Button</span>
    <span class="button-006__bg is--default"></span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-006-color: #131313;
  --button-006-color-background: #fff;
  --button-006-hover-color: #fff;
  --button-006-hover-color-background: #ff5100;
  --button-006-color-focus: #000;
  --button-006-border-radius: 2.5em;
  --button-006-padding: 0.75em 1em;
  --button-006-focus-inset: -0.125em;
  --button-006-click-scale: 0.955 0.925;
  --button-006-default-text-scale: 1.2;
  --button-006-hover-text-scale: 0.85;
  --button-006-ease-hover: cubic-bezier(0.675, 0.15, 0.1, 1);
  --button-006-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-006-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-006 {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  transition: scale 0.15s var(--button-006-ease-click);
}
.button-006::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-006-focus-inset);
  border-radius: var(--button-006-border-radius);
  transition: box-shadow 0.3s var(--button-006-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-006:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-006-color-focus);
}
.button-006:active {
  scale: var(--button-006-click-scale);
}
.button-006__hover {
  pointer-events: none;
  color: var(--button-006-hover-color);
  z-index: 2;
  grid-area: 1 / 1;
  display: grid;
  clip-path: polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%);
  transition: clip-path 0.375s var(--button-006-ease-hover);
}
.button-006__hover .button-006__text {
  scale: var(--button-006-hover-text-scale);
  opacity: 0;
  transition: scale 0.35s var(--button-006-ease-hover), opacity 0.15s 0.05s ease-out;
}
.button-006__default {
  pointer-events: none;
  color: var(--button-006-color);
  grid-area: 1 / 1;
  display: grid;
}
.button-006__default .button-006__text {
  scale: 1;
  transition: scale 0.35s var(--button-006-ease-hover);
}
.button-006__text {
  padding: var(--button-006-padding);
  z-index: 1;
  grid-area: 1 / 1;
}
.button-006__bg {
  border-radius: var(--button-006-border-radius);
  grid-area: 1 / 1;
  place-self: center;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
  padding: 0;
}
.button-006__bg.is--hover {
  background-color: var(--button-006-hover-color-background);
}
.button-006__bg.is--default {
  background-color: var(--button-006-color-background);
  width: calc(100% - 2px);
  height: calc(100% - 2px);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-006:is(:hover, :focus-visible) .button-006__hover,
  [data-hover]:is(:hover, :focus-visible) .button-006 .button-006__hover {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: clip-path 0.425s 0.05s var(--button-006-ease-hover);
  }
  .button-006:is(:hover, :focus-visible) .button-006__hover .button-006__text,
  [data-hover]:is(:hover, :focus-visible) .button-006 .button-006__hover .button-006__text {
    scale: 1;
    opacity: 1;
    transition: scale 0.35s 0.1s var(--button-006-ease-hover), opacity 0.15s 0.15s ease-out;
  }
  .button-006:is(:hover, :focus-visible) .button-006__default .button-006__text,
  [data-hover]:is(:hover, :focus-visible) .button-006 .button-006__default .button-006__text {
    scale: var(--button-006-default-text-scale);
    transition: scale 0.35s 0.05s var(--button-006-ease-hover);
  }
}
```
### CSS
```text
:root {
  --button-006-color: #131313;
  --button-006-color-background: #fff;
  --button-006-hover-color: #fff;
  --button-006-hover-color-background: #ff5100;
  --button-006-color-focus: #000;
  --button-006-border-radius: 2.5em;
  --button-006-padding: 0.75em 1em;
  --button-006-focus-inset: -0.125em;
  --button-006-click-scale: 0.955 0.925;
  --button-006-default-text-scale: 1.2;
  --button-006-hover-text-scale: 0.85;
  --button-006-ease-hover: cubic-bezier(0.675, 0.15, 0.1, 1);
  --button-006-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-006-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-006 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-006-ease-click);
}
.button-006:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-006-color-focus);
}
.button-006:active {
  scale: var(--button-006-click-scale);
}
.button-006::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-006-focus-inset);
  border-radius: var(--button-006-border-radius);
  transition: box-shadow 0.3s var(--button-006-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-006__hover {
  clip-path: polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%);
  transition: clip-path 0.375s var(--button-006-ease-hover);
}
.button-006__hover .button-006__text {
  scale: var(--button-006-hover-text-scale);
  opacity: 0;
  transition: scale 0.35s var(--button-006-ease-hover), opacity 0.15s 0.05s ease-out;
}
.button-006__default .button-006__text {
  scale: 1;
  transition: scale 0.35s var(--button-006-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-006:is(:hover, :focus-visible) .button-006__default .button-006__text,
  [data-hover]:is(:hover, :focus-visible) .button-006 .button-006__default .button-006__text {
    scale: var(--button-006-default-text-scale);
    transition: scale 0.35s 0.05s var(--button-006-ease-hover);
  }
  .button-006:is(:hover, :focus-visible) .button-006__hover,
  [data-hover]:is(:hover, :focus-visible) .button-006 .button-006__hover {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: clip-path 0.425s 0.05s var(--button-006-ease-hover);
  }
  .button-006:is(:hover, :focus-visible) .button-006__hover .button-006__text,
  [data-hover]:is(:hover, :focus-visible) .button-006 .button-006__hover .button-006__text {
    scale: 1;
    opacity: 1;
    transition: scale 0.35s 0.1s var(--button-006-ease-hover), opacity 0.15s 0.15s ease-out;
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
.button-006[data-theme='secondary'] {
  --button-006-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-006-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.