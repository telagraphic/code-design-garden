---
title: "Button 029"
description: "Button 029."
slug: "buttons/button-029"
previewVideo: "button-029.mp4"
order: 49.973
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "029"]
sourceUrl: "https://www.osmo.supply/button-pack/button-029"
---
## Setup
### HTML
```text
<a data-button-029="" href="#" class="button-029">
  <span class="button-029__inner">
    <span class="button-029__default">
      <span class="button-029__default-bg"></span>
      <span class="button-029__default-inner">
        <span class="button-029__text">Button</span>
      </span>
    </span>
    <span aria-hidden="true" class="button-029__hover">
      <span class="button-029__hover-bg"></span>
      <span class="button-029__hover-inner">
        <span class="button-029__text">Button</span>
      </span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-029-color: #fff;
  --button-029-color-background: #2d336b;
  --button-029-hover-color: #2d336b;
  --button-029-hover-color-background: #fff;
  --button-029-color-focus: #000;
  --button-029-padding: 0.75em 1em;
  --button-029-border-radius: 2.5em;
  --button-029-focus-inset: -0.125em;
  --button-029-click-scale: 0.955 0.925;
  --button-029-clip-path: inset(0 100% 0 0 round 0 0.75em 0.75em 0);
  --button-029-clip-path-hover: inset(0 0 0 0 round 0);
  --button-029-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-029-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-029-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-029 {
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
  transition: scale 0.15s var(--button-029-ease-click);
}
.button-029::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-029-focus-inset);
  border-radius: var(--button-029-border-radius);
  transition: box-shadow 0.3s var(--button-029-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-029:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-029-color-focus);
}
.button-029:active {
  scale: var(--button-029-click-scale);
}
.button-029__inner {
  grid-area: 1 / 1;
  place-items: center;
  width: 100%;
  height: 100%;
  display: grid;
}
.button-029__default {
  width: 100%;
  height: 100%;
  color: var(--button-029-color);
  grid-area: 1 / 1;
  display: grid;
}
.button-029__default-bg {
  background-color: var(--button-029-color-background);
  border-radius: var(--button-029-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-029__default-inner,
.button-029__hover-inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  width: 100%;
  height: 100%;
  padding: var(--button-029-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-029__hover {
  color: var(--button-029-hover-color);
  grid-area: 1 / 1;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  display: grid;
  clip-path: var(--button-029-clip-path);
  transition: clip-path 0.5s var(--button-029-ease-hover);
}
.button-029__hover-bg {
  border-radius: var(--button-029-border-radius);
  background-color: var(--button-029-hover-color-background);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-029__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-029:is(:hover, :focus-visible) .button-029__hover,
  [data-hover]:is(:hover, :focus-visible) .button-029 .button-029__hover {
    clip-path: var(--button-029-clip-path-hover);
    transition: clip-path 0.55s 0.05s var(--button-029-ease-hover);
  }
}
```
### CSS
```text
:root {
  --button-029-color: #fff;
  --button-029-color-background: #2d336b;
  --button-029-hover-color: #2d336b;
  --button-029-hover-color-background: #fff;
  --button-029-color-focus: #000;
  --button-029-padding: 0.75em 1em;
  --button-029-border-radius: 2.5em;
  --button-029-focus-inset: -0.125em;
  --button-029-click-scale: 0.955 0.925;
  --button-029-clip-path: inset(0 100% 0 0 round 0 0.75em 0.75em 0);
  --button-029-clip-path-hover: inset(0 0 0 0 round 0);
  --button-029-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-029-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-029-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-029 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-029-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-029:is(:hover, :focus-visible) .button-029__hover,
  [data-hover]:is(:hover, :focus-visible) .button-029 .button-029__hover {
    clip-path: var(--button-029-clip-path-hover);
    transition: clip-path 0.55s 0.05s var(--button-029-ease-hover);
  }
}
.button-029:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-029-color-focus);
}
.button-029:active {
  scale: var(--button-029-click-scale);
}
.button-029::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-029-focus-inset);
  border-radius: var(--button-029-border-radius);
  transition: box-shadow 0.3s var(--button-029-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-029__hover {
  clip-path: var(--button-029-clip-path);
  transition: clip-path 0.5s var(--button-029-ease-hover);
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-029[data-theme='secondary'] {
  --button-029-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-029-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.