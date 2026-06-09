---
title: "Button 025"
description: "Button 025."
slug: "buttons/button-025"
previewVideo: "button-025.mp4"
order: 49.976
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "025"]
sourceUrl: "https://www.osmo.supply/button-pack/button-025"
---
## Setup
### HTML
```text
<a data-button-025="" href="#" class="button-025">
  <span class="button-025__inner">
    <span class="button-025__default">
      <span class="button-025__default-bg"></span>
      <span class="button-025__default-inner">
        <span class="button-025__default-text">Button</span>
      </span>
    </span>
    <span aria-hidden="true" class="button-025__hover">
      <span class="button-025__hover-bg"></span>
      <span class="button-025__hover-inner">
        <span class="button-025__hover-text">Button</span>
      </span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-025-color: #fff;
  --button-025-color-background: #ff5100;
  --button-025-hover-color: #fff;
  --button-025-hover-color-background: #131313;
  --button-025-hover-border-radius: 2.5em;
  --button-025-color-focus: #000;
  --button-025-padding: 0.75em 1em;
  --button-025-border: 0;
  --button-025-border-radius: 2.5em;
  --button-025-focus-inset: -0.125em;
  --button-025-click-scale: 0.955 0.925;
  --button-025-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-025-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-025-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-025 {
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
  transition: scale 0.15s var(--button-025-ease-click);
}
.button-025::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-025-focus-inset);
  border-radius: var(--button-025-border-radius);
  transition: box-shadow 0.3s var(--button-025-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-025:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-025-color-focus);
}
.button-025:active {
  scale: var(--button-025-click-scale);
}
.button-025__inner {
  pointer-events: none;
  border-radius: var(--button-025-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  display: grid;
  overflow: clip;
}
.button-025__default {
  width: 100%;
  height: 100%;
  color: var(--button-025-color);
  grid-area: 1 / 1;
  display: grid;
}
.button-025__default-bg {
  background-color: var(--button-025-color-background);
  border: var(--button-025-border);
  border-radius: var(--button-025-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-025__default-inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  width: 100%;
  height: 100%;
  padding: var(--button-025-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
  transition: translate 0.45s var(--button-025-ease-hover), scale 0.45s var(--button-025-ease-hover);
}
.button-025__hover {
  z-index: 1;
  width: 100%;
  height: 100%;
  color: var(--button-025-hover-color);
  grid-area: 1 / 1;
  display: grid;
  translate: calc((100% + 1px) * -1) 0 0;
  transition: translate 0.45s var(--button-025-ease-hover);
}
.button-025__hover-bg {
  background-color: var(--button-025-hover-color-background);
  border-radius: var(--button-025-hover-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-025__hover-inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  width: 100%;
  height: 100%;
  padding: var(--button-025-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
  translate: -1em 0 0;
  transition: translate 0.45s var(--button-025-ease-hover);
}
.button-025__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-025:is(:hover, :focus-visible) .button-025__default-inner,
  [data-hover]:is(:hover, :focus-visible) .button-025 .button-025__default-inner {
    translate: 1em 0 0;
    scale: 0.85;
    transition: translate 0.95s var(--button-025-ease-hover), scale 0.95s var(--button-025-ease-hover);
  }
  .button-025:is(:hover, :focus-visible) .button-025__hover,
  [data-hover]:is(:hover, :focus-visible) .button-025 .button-025__hover {
    translate: 0 0 0;
    transition-delay: 0.05s;
  }
  .button-025:is(:hover, :focus-visible) .button-025__hover-inner,
  [data-hover]:is(:hover, :focus-visible) .button-025 .button-025__hover-inner {
    translate: 0 0 0;
    transition-delay: 0.065s;
  }
}
```
### CSS
```text
:root {
  --button-025-color: #fff;
  --button-025-color-background: #ff5100;
  --button-025-hover-color: #fff;
  --button-025-hover-color-background: #131313;
  --button-025-hover-border-radius: 2.5em;
  --button-025-color-focus: #000;
  --button-025-padding: 0.75em 1em;
  --button-025-border: 0;
  --button-025-border-radius: 2.5em;
  --button-025-focus-inset: -0.125em;
  --button-025-click-scale: 0.955 0.925;
  --button-025-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-025-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-025-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-025 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-025-ease-click);
}
.button-025:active {
  scale: var(--button-025-click-scale);
}
.button-025:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-025-color-focus);
}
.button-025::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-025-focus-inset);
  border-radius: var(--button-025-border-radius);
  transition: box-shadow 0.3s var(--button-025-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-025__hover {
  translate: calc((100% + 1px) * -1) 0 0;
  transition: translate 0.45s var(--button-025-ease-hover);
}
.button-025__hover-inner {
  translate: -1em 0 0;
  transition: translate 0.45s var(--button-025-ease-hover);
}
.button-025__default-inner {
  transition: translate 0.45s var(--button-025-ease-hover), scale 0.45s var(--button-025-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-025:is(:hover, :focus-visible) .button-025__default-inner,
  [data-hover]:is(:hover, :focus-visible) .button-025 .button-025__default-inner {
    translate: 1em 0 0;
    scale: 0.85;
    transition: translate 0.95s var(--button-025-ease-hover), scale 0.95s var(--button-025-ease-hover);
  }
  .button-025:is(:hover, :focus-visible) .button-025__hover,
  [data-hover]:is(:hover, :focus-visible) .button-025 .button-025__hover {
    translate: 0 0 0;
    transition-delay: 0.05s;
  }
  .button-025:is(:hover, :focus-visible) .button-025__hover-inner,
  [data-hover]:is(:hover, :focus-visible) .button-025 .button-025__hover-inner {
    translate: 0 0 0;
    transition-delay: 0.065s;
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
.button-025[data-theme='secondary'] {
  --button-025-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-025-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.