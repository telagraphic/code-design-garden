---
title: "Button 013"
description: "Button 013."
slug: "buttons/button-013"
previewVideo: "button-013.mp4"
order: 49.981
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "013"]
sourceUrl: "https://www.osmo.supply/button-pack/button-013"
---
## Setup
### HTML
```text
<a data-button-013="" href="#" class="button-013">
  <span class="button-013__bg"></span>
  <span class="button-013__bg-hover"></span>
  <span class="button-013__text">Button</span>
</a>
```
### CSS
```text
:root {
  --button-013-color: #121212;
  --button-013-color-background: #fff;
  --button-013-hover-color: #fff;
  --button-013-hover-color-background: #31BAC2;
  --button-013-color-focus: #121212;
  --button-013-border-radius: 2.5em;
  --button-013-padding: 0.75em 1em;
  --button-013-focus-inset: -0.125em;
  --button-013-click-scale: 0.955 0.925;
  --button-013-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-013-ease-hover: cubic-bezier(0.19, 0.69, 0.33, 1.33);
  --button-013-ease-hover-soft-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --button-013-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-013 {
  color: var(--button-013-color);
  -webkit-user-select: none;
  user-select: none;
  background-color: #0000;
  outline-style: none;
  place-content: center;
  place-items: center;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s var(--button-013-ease-hover-soft-out), scale 0.15s var(--button-013-ease-click);
}
.button-013::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-013-focus-inset);
  border-radius: var(--button-013-border-radius);
  transition: box-shadow 0.3s var(--button-013-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-013:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-013-color-focus);
}
.button-013:active {
  scale: var(--button-013-click-scale);
}
.button-013__bg {
  background-color: var(--button-013-color-background);
  border-radius: var(--button-013-border-radius);
  grid-area: 1 / 1;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
  padding: 0;
}
.button-013__bg-hover {
  background-color: var(--button-013-hover-color-background);
  border-radius: var(--button-013-border-radius);
  z-index: 1;
  will-change: transform, clip-path;
  grid-area: 1 / 1;
  width: calc(100% + .25em);
  height: calc(100% + .25em);
  padding: 0;
  clip-path: inset(1em 1em 1em 1em round var(--button-013-border-radius));
  opacity: 0;
  transition: clip-path 0.4s var(--button-013-ease-hover), opacity 0.15s var(--button-013-ease-hover-soft-out);
}
.button-013__text {
  width: 100%;
  height: 100%;
  padding: var(--button-013-padding);
  z-index: 2;
  grid-area: 1 / 1;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-013:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-013 {
    color: var(--button-013-hover-color);
    transition: color 0.15s 0.05s var(--button-013-ease-hover-soft-out), scale 0.15s var(--button-013-ease-click);
  }
  .button-013:is(:hover, :focus-visible) .button-013__bg-hover,
  [data-hover]:is(:hover, :focus-visible) .button-013 .button-013__bg-hover {
    clip-path: inset(0.125em 0.125em 0.125em 0.125em round var(--button-013-border-radius));
    opacity: 1;
    transition: clip-path 0.4s 0.05s var(--button-013-ease-hover), opacity 0.15s 0.05s var(--button-013-ease-hover-soft-out);
  }
}
```
### CSS
```text
:root {
  --button-013-color: #121212;
  --button-013-color-background: #fff;
  --button-013-hover-color: #fff;
  --button-013-hover-color-background: #31BAC2;
  --button-013-color-focus: #121212;
  --button-013-border-radius: 2.5em;
  --button-013-padding: 0.75em 1em;
  --button-013-focus-inset: -0.125em;
  --button-013-click-scale: 0.955 0.925;
  --button-013-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-013-ease-hover: cubic-bezier(0.19, 0.69, 0.33, 1.33);
  --button-013-ease-hover-soft-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --button-013-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-013 {
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s var(--button-013-ease-hover-soft-out), scale 0.15s var(--button-013-ease-click);
}
.button-013:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-013-color-focus);
}
.button-013:active {
  scale: var(--button-013-click-scale);
}
.button-013::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-013-focus-inset);
  border-radius: var(--button-013-border-radius);
  transition: box-shadow 0.3s var(--button-013-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-013__bg-hover {
  clip-path: inset(1em 1em 1em 1em round var(--button-013-border-radius));
  opacity: 0;
  transition: clip-path 0.4s var(--button-013-ease-hover), opacity 0.15s var(--button-013-ease-hover-soft-out);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-013:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-013 {
    color: var(--button-013-hover-color);
    transition: color 0.15s 0.05s var(--button-013-ease-hover-soft-out), scale 0.15s var(--button-013-ease-click);
  }
  .button-013:is(:hover, :focus-visible) .button-013__bg-hover,
  [data-hover]:is(:hover, :focus-visible) .button-013 .button-013__bg-hover {
    clip-path: inset(0.125em 0.125em 0.125em 0.125em round var(--button-013-border-radius));
    opacity: 1;
    transition: clip-path 0.4s 0.05s var(--button-013-ease-hover), opacity 0.15s 0.05s var(--button-013-ease-hover-soft-out);
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
.button-013[data-theme='secondary'] {
  --button-013-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-013-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.