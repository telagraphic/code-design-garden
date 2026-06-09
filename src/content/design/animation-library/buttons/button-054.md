---
title: "Button 054"
description: "Button 054."
slug: "buttons/button-054"
previewVideo: "button-054.mp4"
order: 49.962
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "054"]
sourceUrl: "https://www.osmo.supply/button-pack/button-054"
---
## Setup
### HTML
```text
<a data-button-054="" href="#" class="button-054">
  <span class="button-054__default">
    <span class="button-054__text">Button</span>
    <span class="button-054__bg is--default"></span>
  </span>
  <span aria-hidden="true" class="button-054__hover">
    <span class="button-054__hover-inner">
      <span class="button-054__text">Button</span>
      <span class="button-054__bg is--hover"></span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-054-color: #131313;
  --button-054-color-background: #fff;
  --button-054-hover-color: #fff;
  --button-054-hover-color-background: #F67DEF;
  --button-054-color-focus: #000;
  --button-054-border-radius: 2.5em;
  --button-054-padding: 0.75em 1em;
  --button-054-focus-inset: -0.125em;
  --button-054-click-scale: 0.955 0.925;
  --button-054-ease-hover: cubic-bezier(0.675, 0.15, 0.1, 1);
  --button-054-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-054-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-054 {
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
  transition: scale 0.15s var(--button-054-ease-click);
}
.button-054::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-054-focus-inset);
  border-radius: var(--button-054-border-radius);
  transition: box-shadow 0.3s var(--button-054-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-054:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-054-color-focus);
}
.button-054:active {
  scale: var(--button-054-click-scale);
}
.button-054__default {
  pointer-events: none;
  width: 100%;
  height: 100%;
  color: var(--button-054-color);
  grid-area: 1 / 1;
  display: grid;
}
.button-054__text {
  width: 100%;
  height: 100%;
  padding: var(--button-054-padding);
  z-index: 1;
  grid-area: 1 / 1;
}
.button-054__bg {
  border-radius: var(--button-054-border-radius);
  grid-area: 1 / 1;
  place-self: center;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
  padding: 0;
}
.button-054__bg.is--default {
  background-color: var(--button-054-color-background);
  width: calc(100% - 2px);
  height: calc(100% - 2px);
}
.button-054__bg.is--hover {
  background-color: var(--button-054-hover-color-background);
}
.button-054__hover {
  pointer-events: none;
  width: 100%;
  height: 100%;
  color: var(--button-054-hover-color);
  z-index: 2;
  grid-area: 1 / 1;
  place-self: center;
  display: grid;
  clip-path: inset(calc(50% - 0.0625em) 0% calc(50% - 0.0625em) 0%);
  transition: clip-path 0.35s var(--button-054-ease-hover);
}
.button-054__hover-inner {
  width: 100%;
  height: 100%;
  display: grid;
  clip-path: inset(0% 100% 0% 0%);
  transition: clip-path 0.25s 0.25s var(--button-054-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-054:is(:hover, :focus-visible) .button-054__hover,
  [data-hover]:is(:hover, :focus-visible) .button-054 .button-054__hover {
    clip-path: inset(0% 0% 0% 0%);
    transition: clip-path 0.4s 0.2s var(--button-054-ease-hover);
  }
  .button-054:is(:hover, :focus-visible) .button-054__hover-inner,
  [data-hover]:is(:hover, :focus-visible) .button-054 .button-054__hover-inner {
    clip-path: inset(0% 0% 0% 0%);
    transition: clip-path 0.25s 0.05s var(--button-054-ease-hover);
  }
}
```
### CSS
```text
:root {
  --button-054-color: #131313;
  --button-054-color-background: #fff;
  --button-054-hover-color: #fff;
  --button-054-hover-color-background: #F67DEF;
  --button-054-color-focus: #000;
  --button-054-border-radius: 2.5em;
  --button-054-padding: 0.75em 1em;
  --button-054-focus-inset: -0.125em;
  --button-054-click-scale: 0.955 0.925;
  --button-054-ease-hover: cubic-bezier(0.675, 0.15, 0.1, 1);
  --button-054-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-054-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-054 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-054-ease-click);
}
.button-054:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-054-color-focus);
}
.button-054:active {
  scale: var(--button-054-click-scale);
}
.button-054::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-054-focus-inset);
  border-radius: var(--button-054-border-radius);
  transition: box-shadow 0.3s var(--button-054-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-054__hover-inner {
  clip-path: inset(0% 100% 0% 0%);
  transition: clip-path 0.25s 0.25s var(--button-054-ease-hover);
}
.button-054__hover {
  clip-path: inset(calc(50% - 0.0625em) 0% calc(50% - 0.0625em) 0%);
  transition: clip-path 0.35s var(--button-054-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-054:is(:hover, :focus-visible) .button-054__hover-inner,
  [data-hover]:is(:hover, :focus-visible) .button-054 .button-054__hover-inner {
    clip-path: inset(0% 0% 0% 0%);
    transition: clip-path 0.25s 0.05s var(--button-054-ease-hover);
  }
  .button-054:is(:hover, :focus-visible) .button-054__hover,
  [data-hover]:is(:hover, :focus-visible) .button-054 .button-054__hover {
    clip-path: inset(0% 0% 0% 0%);
    transition: clip-path 0.4s 0.2s var(--button-054-ease-hover);
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
.button-054[data-theme='secondary'] {
  --button-054-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-054-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.