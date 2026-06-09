---
title: "Button 064"
description: "Button 064."
slug: "buttons/button-064"
previewVideo: "button-064.mp4"
order: 49.957
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "064"]
sourceUrl: "https://www.osmo.supply/button-pack/button-064"
---
## Setup
### HTML
```text
<a data-button-064="" href="#" class="button-064">
  <span class="button-064__default">
    <span class="button-064__bg is--default"></span>
    <span class="button-064__inner">
      <span class="button-064__text">Button</span>
    </span>
  </span>
  <span aria-hidden="true" class="button-064__hover">
    <span class="button-064__bg is--hover"></span>
    <span class="button-064__inner">
      <span class="button-064__text">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-064-color: #131313;
  --button-064-color-background: #fff;
  --button-064-hover-color: #fff;
  --button-064-hover-color-background: #373863;
  --button-064-gap: 0.25em;
  --button-064-icon-size: 0.75em;
  --button-064-color-focus: #000;
  --button-064-padding: 0.75em 1em 0.75em 0.625em;
  --button-064-border-radius: 2.5em;
  --button-064-focus-inset: -0.125em;
  --button-064-click-scale: 0.955 0.925;
  --button-064-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-064-ease-hover: cubic-bezier(0.7, 0, 0.2, 1);
  --button-064-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-064 {
  -webkit-user-select: none;
  user-select: none;
  background-color: #0000;
  outline-style: none;
  place-items: center;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-064-ease-click);
}
.button-064::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-064-focus-inset);
  border-radius: var(--button-064-border-radius);
  transition: box-shadow 0.3s var(--button-064-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-064:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-064-color-focus);
}
.button-064:active {
  scale: var(--button-064-click-scale);
}
.button-064__default {
  width: 100%;
  height: 100%;
  color: var(--button-064-color);
  border-radius: var(--button-064-border-radius);
  grid-area: 1 / 1;
  display: grid;
  overflow: clip;
}
.button-064__bg {
  border-radius: var(--button-064-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
}
.button-064__bg.is--default {
  background-color: var(--button-064-color-background);
}
.button-064__inner {
  grid-column-gap: var(--button-064-gap);
  grid-row-gap: var(--button-064-gap);
  width: 100%;
  height: 100%;
  padding: var(--button-064-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-064__default .button-064__inner {
  translate: 0 0 0;
  transition: translate 0.4s var(--button-064-ease-hover);
}
.button-064__icon {
  width: var(--button-064-icon-size);
  height: var(--button-064-icon-size);
  flex: none;
}
.button-064__hover {
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  color: var(--button-064-hover-color);
  grid-area: 1 / 1;
  display: grid;
  clip-path: inset(0 0 0 100% round 0.5em 0 0 0.5em);
  transition: clip-path 0.4s var(--button-064-ease-hover);
}
.button-064__hover .button-064__inner {
  translate: calc(var(--button-064-icon-size) + var(--button-064-gap)) 0 0;
  transition: translate 0.4s var(--button-064-ease-hover);
}
.button-064__bg.is--hover {
  background-color: var(--button-064-hover-color-background);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-064:is(:hover, :focus-visible) .button-064__default .button-064__inner,
  [data-hover]:is(:hover, :focus-visible) .button-064 .button-064__default .button-064__inner {
    translate: calc((var(--button-064-icon-size) + var(--button-064-gap) - 0.375em) * -1) 0 0;
    transition: translate 0.5s 0.05s var(--button-064-ease-hover);
  }
  .button-064:is(:hover, :focus-visible) .button-064__hover,
  [data-hover]:is(:hover, :focus-visible) .button-064 .button-064__hover {
    clip-path: inset(0 0 0 0 round 0.5em 0 0 0.5em);
    transition: clip-path 0.5s 0.05s var(--button-064-ease-hover);
  }
  .button-064:is(:hover, :focus-visible) .button-064__hover .button-064__inner,
  [data-hover]:is(:hover, :focus-visible) .button-064 .button-064__hover .button-064__inner {
    translate: 0.375em 0 0;
    transition: translate 0.5s 0.05s var(--button-064-ease-hover);
  }
}
```
### CSS
```text
:root {
  --button-064-color: #131313;
  --button-064-color-background: #fff;
  --button-064-hover-color: #fff;
  --button-064-hover-color-background: #373863;
  --button-064-gap: 0.25em;
  --button-064-icon-size: 0.75em;
  --button-064-color-focus: #000;
  --button-064-padding: 0.75em 1em 0.75em 0.625em;
  --button-064-border-radius: 2.5em;
  --button-064-focus-inset: -0.125em;
  --button-064-click-scale: 0.955 0.925;
  --button-064-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-064-ease-hover: cubic-bezier(0.7, 0, 0.2, 1);
  --button-064-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-064 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-064-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-064:is(:hover, :focus-visible) .button-064__default .button-064__inner,
  [data-hover]:is(:hover, :focus-visible) .button-064 .button-064__default .button-064__inner {
    translate: calc((var(--button-064-icon-size) + var(--button-064-gap) - 0.375em) * -1) 0 0;
    transition: translate 0.5s 0.05s var(--button-064-ease-hover);
  }
  .button-064:is(:hover, :focus-visible) .button-064__hover,
  [data-hover]:is(:hover, :focus-visible) .button-064 .button-064__hover {
    clip-path: inset(0 0 0 0 round 0.5em 0 0 0.5em);
    transition: clip-path 0.5s 0.05s var(--button-064-ease-hover);
  }
  .button-064:is(:hover, :focus-visible) .button-064__hover .button-064__inner,
  [data-hover]:is(:hover, :focus-visible) .button-064 .button-064__hover .button-064__inner {
    translate: 0.375em 0 0;
    transition: translate 0.5s 0.05s var(--button-064-ease-hover);
  }
}
.button-064:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-064-color-focus);
}
.button-064:active {
  scale: var(--button-064-click-scale);
}
.button-064::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-064-focus-inset);
  border-radius: var(--button-064-border-radius);
  transition: box-shadow 0.3s var(--button-064-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-064__default .button-064__inner {
  translate: 0 0 0;
  transition: translate 0.4s var(--button-064-ease-hover);
}
.button-064__hover {
  clip-path: inset(0 0 0 100% round 0.5em 0 0 0.5em);
  transition: clip-path 0.4s var(--button-064-ease-hover);
}
.button-064__hover .button-064__inner {
  translate: calc(var(--button-064-icon-size) + var(--button-064-gap)) 0 0;
  transition: translate 0.4s var(--button-064-ease-hover);
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-064[data-theme='secondary'] {
  --button-064-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-064-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.