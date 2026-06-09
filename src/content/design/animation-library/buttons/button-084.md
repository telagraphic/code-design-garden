---
title: "Button 084"
description: "Button 084."
slug: "buttons/button-084"
previewVideo: "button-084.mp4"
order: 49.949
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "084"]
sourceUrl: "https://www.osmo.supply/button-pack/button-084"
---
## Setup
### HTML
```text
<a data-button-084="" href="#" class="button-084">
  <span class="button-084__container">
    <span aria-hidden="true" class="button-084__hover">
      <span class="button-084__bg is--hover"></span>
      <span class="button-084__inner">
        <span class="button-084__text">Button</span>
      </span>
    </span>
    <span class="button-084__default">
      <span class="button-084__bg is--default"></span>
      <span class="button-084__inner">
        <span class="button-084__text">Button</span>
      </span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-084-color: #131313;
  --button-084-color-background: #fff;
  --button-084-hover-color: #fff;
  --button-084-hover-color-background: #3e392d;
  --button-084-color-focus: #131313;
  --button-084-border-radius: 0.25em;
  --button-084-clip-border-radius: 0.25em;
  --button-084-padding: 0.75em;
  --button-084-gap: 0.125em;
  --button-084-focus-inset: -0.125em;
  --button-084-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-084-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-084 {
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
}
.button-084::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-084-focus-inset);
  border-radius: var(--button-084-border-radius);
  transition: box-shadow 0.3s var(--button-084-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-084:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-084-color-focus);
}
.button-084__container {
  border-radius: var(--button-084-clip-border-radius);
  width: 100%;
  height: 100%;
  display: grid;
  overflow: clip;
}
.button-084__hover {
  width: 100%;
  height: 100%;
  color: var(--button-084-hover-color);
  z-index: 1;
  grid-area: 1 / 1;
  display: grid;
  translate: 0 101% 0;
  transition: translate 0.45s var(--button-084-ease-hover);
}
.button-084__bg {
  border-radius: var(--button-084-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-084__bg.is--hover {
  background-color: var(--button-084-hover-color-background);
}
.button-084__bg.is--default {
  background-color: var(--button-084-color-background);
}
.button-084__inner {
  grid-column-gap: var(--button-084-gap);
  grid-row-gap: var(--button-084-gap);
  width: 100%;
  height: 100%;
  padding: var(--button-084-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-084__default {
  width: 100%;
  height: 100%;
  color: var(--button-084-color);
  grid-area: 1 / 1;
  display: grid;
  transform-origin: 50% 95%;
  transition: scale 0.35s var(--button-084-ease-hover);
}
.button-084__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-084:is(:hover, :focus-visible) .button-084__hover,
  [data-hover]:is(:hover, :focus-visible) .button-084 .button-084__hover {
    translate: 0 0 0;
    transition-delay: 0.05s;
  }
  .button-084:is(:hover, :focus-visible) .button-084__default,
  [data-hover]:is(:hover, :focus-visible) .button-084 .button-084__default {
    scale: 0.9;
    transition-delay: 0.05s;
  }
}
```
### CSS
```text
:root {
  --button-084-color: #131313;
  --button-084-color-background: #fff;
  --button-084-hover-color: #fff;
  --button-084-hover-color-background: #3e392d;
  --button-084-color-focus: #131313;
  --button-084-border-radius: 0.25em;
  --button-084-clip-border-radius: 0.25em;
  --button-084-padding: 0.75em;
  --button-084-gap: 0.125em;
  --button-084-focus-inset: -0.125em;
  --button-084-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-084-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-084 {
  -webkit-tap-highlight-color: transparent;
}
.button-084:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-084-color-focus);
}
.button-084::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-084-focus-inset);
  border-radius: var(--button-084-border-radius);
  transition: box-shadow 0.3s var(--button-084-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-084__hover {
  translate: 0 101% 0;
  transition: translate 0.45s var(--button-084-ease-hover);
}
.button-084__default {
  transform-origin: 50% 95%;
  transition: scale 0.35s var(--button-084-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-084:is(:hover, :focus-visible) .button-084__hover,
  [data-hover]:is(:hover, :focus-visible) .button-084 .button-084__hover {
    translate: 0 0 0;
    transition-delay: 0.05s;
  }
  .button-084:is(:hover, :focus-visible) .button-084__default,
  [data-hover]:is(:hover, :focus-visible) .button-084 .button-084__default {
    scale: 0.9;
    transition-delay: 0.05s;
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
.button-084[data-theme='secondary'] {
  --button-084-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-084-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.