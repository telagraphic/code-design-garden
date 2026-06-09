---
title: "Button 020"
description: "Button 020."
slug: "buttons/button-020"
previewVideo: "button-020.mp4"
order: 49.978
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "020"]
sourceUrl: "https://www.osmo.supply/button-pack/button-020"
---
## Setup
### HTML
```text
<a data-button-020="" href="#" class="button-020">
  <span class="button-020__inner">
    <span class="button-020__default">
      <span class="button-020__default-bg"></span>
      <span class="button-020__default-text">Button</span>
    </span>
    <span aria-hidden="true" class="button-020__hover">
      <span class="button-020__hover-bg"></span>
      <span class="button-020__hover-text">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-020-color: #121212;
  --button-020-color-background: #fff;
  --button-020-hover-color: #fff;
  --button-020-hover-color-background: #121212;
  --button-020-color-focus: #121212;
  --button-020-padding: 0.75em 1em;
  --button-020-border: 0;
  --button-020-border-radius: 2.5em;
  --button-020-focus-inset: -0.125em;
  --button-020-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-020-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-020 {
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
.button-020::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-020-focus-inset);
  border-radius: var(--button-020-border-radius);
  transition: box-shadow 0.3s var(--button-020-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-020:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-020-color-focus);
}
.button-020__inner {
  pointer-events: none;
  border-radius: var(--button-020-border-radius);
  display: grid;
  overflow: clip;
}
.button-020__default {
  width: 100%;
  height: 100%;
  color: var(--button-020-color);
  grid-area: 1 / 1;
  display: grid;
}
.button-020__default-bg {
  background-color: var(--button-020-color-background);
  border-radius: var(--button-020-border-radius);
  border: var(--button-020-border);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-020__default-text {
  width: 100%;
  height: 100%;
  padding: var(--button-020-padding);
  grid-area: 1 / 1;
  transition: translate 0.45s var(--button-020-ease-hover), scale 0.45s var(--button-020-ease-hover);
}
.button-020__hover {
  width: 100%;
  height: 100%;
  color: var(--button-020-hover-color);
  grid-area: 1 / 1;
  display: grid;
  translate: 0 calc(100% + 1px) 0;
  transition: translate 0.45s var(--button-020-ease-hover);
}
.button-020__hover-bg {
  background-color: var(--button-020-hover-color-background);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-020__hover-text {
  width: 100%;
  height: 100%;
  padding: var(--button-020-padding);
  grid-area: 1 / 1;
  translate: 0 25% 0;
  transition: translate 0.45s var(--button-020-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-020:is(:hover, :focus-visible) .button-020__default-text,
  [data-hover]:is(:hover, :focus-visible) .button-020 .button-020__default-text {
    translate: 0 -25% 0;
    scale: 0.85;
    transition: translate 0.95s var(--button-020-ease-hover), scale 0.95s var(--button-020-ease-hover);
  }
  .button-020:is(:hover, :focus-visible) .button-020__hover,
  [data-hover]:is(:hover, :focus-visible) .button-020 .button-020__hover {
    translate: 0 0 0;
    transition-delay: 0.05s;
  }
  .button-020:is(:hover, :focus-visible) .button-020__hover-text,
  [data-hover]:is(:hover, :focus-visible) .button-020 .button-020__hover-text {
    translate: 0 0 0;
    transition-delay: 0.065s;
  }
}
```
### CSS
```text
:root {
  --button-020-color: #121212;
  --button-020-color-background: #fff;
  --button-020-hover-color: #fff;
  --button-020-hover-color-background: #121212;
  --button-020-color-focus: #121212;
  --button-020-padding: 0.75em 1em;
  --button-020-border: 0;
  --button-020-border-radius: 2.5em;
  --button-020-focus-inset: -0.125em;
  --button-020-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-020-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-020 {
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-020:is(:hover, :focus-visible) .button-020__default-text,
  [data-hover]:is(:hover, :focus-visible) .button-020 .button-020__default-text {
    translate: 0 -25% 0;
    scale: 0.85;
    transition: translate 0.95s var(--button-020-ease-hover), scale 0.95s var(--button-020-ease-hover);
  }
  .button-020:is(:hover, :focus-visible) .button-020__hover,
  [data-hover]:is(:hover, :focus-visible) .button-020 .button-020__hover {
    translate: 0 0 0;
    transition-delay: 0.05s;
  }
  .button-020:is(:hover, :focus-visible) .button-020__hover-text,
  [data-hover]:is(:hover, :focus-visible) .button-020 .button-020__hover-text {
    translate: 0 0 0;
    transition-delay: 0.065s;
  }
}
.button-020:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-020-color-focus);
}
.button-020::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-020-focus-inset);
  border-radius: var(--button-020-border-radius);
  transition: box-shadow 0.3s var(--button-020-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-020__hover {
  translate: 0 calc(100% + 1px) 0;
  transition: translate 0.45s var(--button-020-ease-hover);
}
.button-020__hover-text {
  translate: 0 25% 0;
  transition: translate 0.45s var(--button-020-ease-hover);
}
.button-020__default-text {
  transition: translate 0.45s var(--button-020-ease-hover), scale 0.45s var(--button-020-ease-hover);
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-020[data-theme='secondary'] {
  --button-020-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-020-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.