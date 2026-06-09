---
title: "Button 009"
description: "Button 009."
slug: "buttons/button-009"
previewVideo: "button-009.mp4"
order: 49.983
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "009"]
sourceUrl: "https://www.osmo.supply/button-pack/button-009"
---
## Setup
### HTML
```text
<a data-button-009="" href="#" class="button-009">
  <span class="button-009__inner">
    <span class="button-009__text">Button</span>
  </span>
  <span class="button-009__bg"></span>
</a>
```
### CSS
```text
:root {
  --button-009-color: #121212;
  --button-009-color-background: #fff;
  --button-009-color-focus: #000;
  --button-009-border-radius: 2.5em;
  --button-009-icon-size: 0.875em;
  --button-009-padding-top: 0.75em;
  --button-009-padding-right: 0.75em;
  --button-009-padding-bottom: 0.75em;
  --button-009-padding-left: 1em;
  --button-009-gap: 0.375em;
  --button-009-overflow: clip;
  --button-009-focus-inset: -0.125em;
  --button-009-click-scale: 0.955 0.925;
  --button-009-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-009-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-009-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-009 {
  color: var(--button-009-color);
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
  transition: scale 0.15s var(--button-009-ease-click);
}
.button-009::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-009-focus-inset);
  border-radius: var(--button-009-border-radius);
  transition: box-shadow 0.3s var(--button-009-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-009:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-009-color-focus);
}
.button-009:active {
  scale: var(--button-009-click-scale);
}
.button-009__inner {
  pointer-events: none;
  grid-column-gap: var(--button-009-gap);
  grid-row-gap: var(--button-009-gap);
  padding-top: var(--button-009-padding-top);
  padding-right: var(--button-009-padding-right);
  padding-bottom: var(--button-009-padding-bottom);
  padding-left: var(--button-009-padding-left);
  z-index: 1;
  border-radius: var(--button-009-border-radius);
  overflow: var(--button-009-overflow);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
}
.button-009__icon {
  width: var(--button-009-icon-size);
  height: var(--button-009-icon-size);
  flex: none;
  transition: translate 0.5s var(--button-009-ease-hover), opacity 0.15s ease-out;
}
.button-009__icon.is--left {
  left: var(--button-009-padding-right);
  position: absolute;
  opacity: 0;
  translate: -1.5em 0 0;
}
.button-009__text {
  flex: none;
  transition: translate 0.5s var(--button-009-ease-hover);
}
.button-009__bg {
  background-color: var(--button-009-color-background);
  border-radius: var(--button-009-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-009:is(:hover, :focus-visible) .button-009__text,
  [data-hover]:is(:hover, :focus-visible) .button-009 .button-009__text {
    translate: calc(var(--button-009-icon-size) + var(--button-009-gap) + var(--button-009-padding-right) - var(--button-009-padding-left)) 0 0;
    transition: translate 0.5s 0.075s var(--button-009-ease-hover);
  }
  .button-009:is(:hover, :focus-visible) .button-009__icon.is--left,
  [data-hover]:is(:hover, :focus-visible) .button-009 .button-009__icon.is--left {
    translate: 0 0 0;
    opacity: 1;
    transition: translate 0.5s 0.075s var(--button-009-ease-hover), opacity 0.15s 0.075s ease-out;
  }
  .button-009:is(:hover, :focus-visible) .button-009__icon.is--right,
  [data-hover]:is(:hover, :focus-visible) .button-009 .button-009__icon.is--right {
    translate: 1.5em 0 0;
    opacity: 0;
    transition: translate 0.5s 0.05s var(--button-009-ease-hover), opacity 0.15s 0.075s ease-out;
  }
}
```
### CSS
```text
:root {
  --button-009-color: #121212;
  --button-009-color-background: #fff;
  --button-009-color-focus: #000;
  --button-009-border-radius: 2.5em;
  --button-009-icon-size: 0.875em;
  --button-009-padding-top: 0.75em;
  --button-009-padding-right: 0.75em;
  --button-009-padding-bottom: 0.75em;
  --button-009-padding-left: 1em;
  --button-009-gap: 0.375em;
  --button-009-overflow: clip;
  --button-009-focus-inset: -0.125em;
  --button-009-click-scale: 0.955 0.925;
  --button-009-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-009-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-009-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-009 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-009-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-009:is(:hover, :focus-visible) .button-009__text,
  [data-hover]:is(:hover, :focus-visible) .button-009 .button-009__text {
    translate: calc(var(--button-009-icon-size) + var(--button-009-gap) + var(--button-009-padding-right) - var(--button-009-padding-left)) 0 0;
    transition: translate 0.5s 0.075s var(--button-009-ease-hover);
  }
  .button-009:is(:hover, :focus-visible) .button-009__icon.is--left,
  [data-hover]:is(:hover, :focus-visible) .button-009 .button-009__icon.is--left {
    translate: 0 0 0;
    opacity: 1;
    transition: translate 0.5s 0.075s var(--button-009-ease-hover), opacity 0.15s 0.075s ease-out;
  }
  .button-009:is(:hover, :focus-visible) .button-009__icon.is--right,
  [data-hover]:is(:hover, :focus-visible) .button-009 .button-009__icon.is--right {
    translate: 1.5em 0 0;
    opacity: 0;
    transition: translate 0.5s 0.05s var(--button-009-ease-hover), opacity 0.15s 0.075s ease-out;
  }
}
.button-009:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-009-color-focus);
}
.button-009:active {
  scale: var(--button-009-click-scale);
}
.button-009::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-009-focus-inset);
  border-radius: var(--button-009-border-radius);
  transition: box-shadow 0.3s var(--button-009-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-009__text {
  transition: translate 0.5s var(--button-009-ease-hover);
}
.button-009__icon {
  transition: translate 0.5s var(--button-009-ease-hover), opacity 0.15s ease-out;
}
.button-009__icon.is--left {
  opacity: 0;
  translate: -1.5em 0 0;
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-009[data-theme='secondary'] {
  --button-009-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-009-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.