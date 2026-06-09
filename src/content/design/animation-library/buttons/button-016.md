---
title: "Button 016"
description: "Button 016."
slug: "buttons/button-016"
previewVideo: "button-016.mp4"
order: 49.979
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "016"]
sourceUrl: "https://www.osmo.supply/button-pack/button-016"
---
## Setup
### HTML
```text
<a data-button-016="" href="#" class="button-016">
  <span class="button-016__inner">
    <span class="button-016__text">Button</span>
  </span>
  <span class="button-016__bg"></span>
</a>
```
### CSS
```text
:root {
  --button-016-color: #121212;
  --button-016-color-background: #fff;
  --button-016-hover-color: #fff;
  --button-016-hover-color-background: #121212;
  --button-016-border: 0;
  --button-016-color-focus: #000;
  --button-016-padding: 0.75em 1em;
  --button-016-border-radius: 2.5em;
  --button-016-text-duplicate-distance: 2lh;
  --button-016-focus-inset: -0.125em;
  --button-016-ease-hover: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  --button-016-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-016 {
  -webkit-user-select: none;
  user-select: none;
  color: var(--button-016-color);
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.325s var(--button-016-ease-hover);
}
.button-016::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-016-focus-inset);
  border-radius: var(--button-016-border-radius);
  transition: box-shadow 0.3s var(--button-016-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-016:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-016-color-focus);
}
.button-016__inner {
  pointer-events: none;
  border-radius: var(--button-016-border-radius);
  border: var(--button-016-border);
  z-index: 1;
  padding: var(--button-016-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: clip;
}
.button-016__text {
  text-shadow: 0 var(--button-016-text-duplicate-distance) 0 currentColor;
  transition: translate 0.3s var(--button-016-ease-hover);
}
.button-016__bg {
  pointer-events: none;
  border-radius: var(--button-016-border-radius);
  background-color: var(--button-016-color-background);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: background-color 0.325s var(--button-016-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-016:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-016 {
    color: var(--button-016-hover-color);
  }
  .button-016:is(:hover, :focus-visible) .button-016__text,
  [data-hover]:is(:hover, :focus-visible) .button-016 .button-016__text {
    translate: 0 calc(var(--button-016-text-duplicate-distance) * -1) 0;
  }
  .button-016:is(:hover, :focus-visible) .button-016__bg,
  [data-hover]:is(:hover, :focus-visible) .button-016 .button-016__bg {
    background-color: var(--button-016-hover-color-background);
  }
}
```
### CSS
```text
:root {
  --button-016-color: #121212;
  --button-016-color-background: #fff;
  --button-016-hover-color: #fff;
  --button-016-hover-color-background: #121212;
  --button-016-border: 0;
  --button-016-color-focus: #000;
  --button-016-padding: 0.75em 1em;
  --button-016-border-radius: 2.5em;
  --button-016-text-duplicate-distance: 2lh;
  --button-016-focus-inset: -0.125em;
  --button-016-ease-hover: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  --button-016-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-016 {
  -webkit-tap-highlight-color: transparent;
  transition: color 0.325s var(--button-016-ease-hover);
}
.button-016:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-016-color-focus);
}
.button-016::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-016-focus-inset);
  border-radius: var(--button-016-border-radius);
  transition: box-shadow 0.3s var(--button-016-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-016__text {
  text-shadow: 0 var(--button-016-text-duplicate-distance) 0 currentColor;
  transition: translate 0.3s var(--button-016-ease-hover);
}
.button-016__bg {
  transition: background-color 0.325s var(--button-016-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-016:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-016 {
    color: var(--button-016-hover-color);
  }
  .button-016:is(:hover, :focus-visible) .button-016__text,
  [data-hover]:is(:hover, :focus-visible) .button-016 .button-016__text {
    translate: 0 calc(var(--button-016-text-duplicate-distance) * -1) 0;
  }
  .button-016:is(:hover, :focus-visible) .button-016__bg,
  [data-hover]:is(:hover, :focus-visible) .button-016 .button-016__bg {
    background-color: var(--button-016-hover-color-background);
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
.button-016[data-theme='secondary'] {
  --button-016-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-016-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.