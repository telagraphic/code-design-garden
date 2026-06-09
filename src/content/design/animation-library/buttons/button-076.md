---
title: "Button 076"
description: "Button 076."
slug: "buttons/button-076"
previewVideo: "button-076.mp4"
order: 49.953
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "076"]
sourceUrl: "https://www.osmo.supply/button-pack/button-076"
---
## Setup
### HTML
```text
<a data-button-076="" href="#" class="button-076">
  <span class="button-076__hover">
    <span class="button-076__bg is--hover"></span>
    <span class="button-076__inner">
      <span class="button-076__text">Button</span>
    </span>
  </span>
  <span aria-hidden="true" class="button-076__default">
    <span class="button-076__bg is--default"></span>
    <span class="button-076__inner">
      <span class="button-076__text">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-076-color: #131313;
  --button-076-color-background: #fff;
  --button-076-hover-color: #fff;
  --button-076-hover-color-background: #404052;
  --button-076-color-focus: #131313;
  --button-076-border-radius: 2.5em;
  --button-076-padding: 0.75em 1em;
  --button-076-gap: 0.125em;
  --button-076-focus-inset: -0.125em;
  --button-076-hover-scale: 1.065 1.095;
  --button-076-click-scale: 0.955 0.925;
  --button-076-ease-hover: cubic-bezier(0.4, 0.15, 0, 1);
  --button-076-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-076-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-076 {
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
  transition: scale 0.45s var(--button-076-ease-hover), transform 0.15s var(--button-076-ease-click);
}
.button-076::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-076-focus-inset);
  border-radius: var(--button-076-border-radius);
  transition: box-shadow 0.3s var(--button-076-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-076:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-076-color-focus);
}
.button-076:active {
  scale: var(--button-076-click-scale);
}
.button-076__hover {
  width: 100%;
  height: 100%;
  color: var(--button-076-hover-color);
  z-index: 1;
  grid-area: 1 / 1;
  display: grid;
  clip-path: polygon(50% 100%, 50% 0%, 100% 0%, 100% 0%, 50% 0%, 50% 100%, 0% 100%, 0 100%);
  transition: clip-path 0.55s var(--button-076-ease-hover);
}
.button-076__bg {
  border-radius: var(--button-076-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-076__bg.is--hover {
  background-color: var(--button-076-hover-color-background);
}
.button-076__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-076-padding);
  grid-column-gap: var(--button-076-gap);
  grid-row-gap: var(--button-076-gap);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-076__default {
  width: 100%;
  height: 100%;
  color: var(--button-076-color);
  grid-area: 1 / 1;
  display: grid;
}
.button-076__bg.is--default {
  background-color: var(--button-076-color-background);
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}
.button-076__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-076:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-076 {
    scale: var(--button-076-hover-scale);
  }
  .button-076:is(:hover, :focus-visible) .button-076__hover,
  [data-hover]:is(:hover, :focus-visible) .button-076 .button-076__hover {
    clip-path: polygon(50% 0%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 100%, 0% 100%, 0 0%);
    transition-delay: 0.05s;
  }
}
```
### CSS
```text
:root {
  --button-076-color: #131313;
  --button-076-color-background: #fff;
  --button-076-hover-color: #fff;
  --button-076-hover-color-background: #404052;
  --button-076-color-focus: #131313;
  --button-076-border-radius: 2.5em;
  --button-076-padding: 0.75em 1em;
  --button-076-gap: 0.125em;
  --button-076-focus-inset: -0.125em;
  --button-076-hover-scale: 1.065 1.095;
  --button-076-click-scale: 0.955 0.925;
  --button-076-ease-hover: cubic-bezier(0.4, 0.15, 0, 1);
  --button-076-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-076-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-076 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.45s var(--button-076-ease-hover), transform 0.15s var(--button-076-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-076:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-076 {
    scale: var(--button-076-hover-scale);
  }
  .button-076:is(:hover, :focus-visible) .button-076__hover,
  [data-hover]:is(:hover, :focus-visible) .button-076 .button-076__hover {
    clip-path: polygon(50% 0%, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 100%, 0% 100%, 0 0%);
    transition-delay: 0.05s;
  }
}
.button-076:active {
  scale: var(--button-076-click-scale);
}
.button-076:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-076-color-focus);
}
.button-076::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-076-focus-inset);
  border-radius: var(--button-076-border-radius);
  transition: box-shadow 0.3s var(--button-076-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-076__hover {
  clip-path: polygon(50% 100%, 50% 0%, 100% 0%, 100% 0%, 50% 0%, 50% 100%, 0% 100%, 0 100%);
  transition: clip-path 0.55s var(--button-076-ease-hover);
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-076[data-theme='secondary'] {
  --button-076-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-076-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.