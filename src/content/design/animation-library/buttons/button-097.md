---
title: "Button 097"
description: "Button 097."
slug: "buttons/button-097"
previewVideo: "button-097.mp4"
order: 49.945
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "097"]
sourceUrl: "https://www.osmo.supply/button-pack/button-097"
---
## Setup
### HTML
```text
<a data-button-097="" href="#" class="button-097">
  <span class="button-097__hover">
    <span class="button-097__bg is--hover"></span>
    <span class="button-097__inner">
      <span class="button-097__text">Button</span>
    </span>
  </span>
  <span aria-hidden="true" class="button-097__default">
    <span class="button-097__bg is--default"></span>
    <span class="button-097__inner">
      <span class="button-097__text">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-097-color: #131313;
  --button-097-color-background: #fff;
  --button-097-hover-color: #fff;
  --button-097-hover-color-background: #131313;
  --button-097-color-focus: #131313;
  --button-097-border-radius: 1.5em;
  --button-097-dot-border-radius: 0.25em;
  --button-097-padding-right: 0.75em;
  --button-097-padding-left: 1em;
  --button-097-gap: 0.375em;
  --button-097-dot-size: 0.5em;
  --button-097-focus-inset: -0.125em;
  --button-097-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-097-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-097 {
  -webkit-user-select: none;
  user-select: none;
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  --button-097-padding: 0.75em calc(var(--button-097-padding-right) + var(--button-097-gap) + var(--button-097-dot-size)) 0.75em var(--button-097-padding-left);
  --button-097-offset: calc((var(--button-097-padding-right) + var(--button-097-gap) + var(--button-097-dot-size) - var(--button-097-padding-left)) / 2);
  -webkit-tap-highlight-color: transparent;
}
.button-097::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-097-focus-inset);
  border-radius: var(--button-097-border-radius);
  transition: box-shadow 0.3s var(--button-097-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-097:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-097-color-focus);
}
.button-097__hover {
  color: var(--button-097-hover-color);
  z-index: 1;
  will-change: clip-path;
  grid-area: 1 / 1;
  place-self: center;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  display: grid;
  clip-path: inset(calc(50% - var(--button-097-dot-size) * 0.5) var(--button-097-padding-right) calc(50% - var(--button-097-dot-size) * 0.5) calc(100% - (var(--button-097-dot-size) + var(--button-097-padding-right))) round var(--button-097-dot-border-radius));
  transition: clip-path 0.55s var(--button-097-ease-hover);
}
.button-097__bg {
  border-radius: var(--button-097-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-097__bg.is--hover {
  background-color: var(--button-097-hover-color-background);
}
.button-097__bg.is--default {
  background-color: var(--button-097-color-background);
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}
.button-097__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-097-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-097__text {
  will-change: transform;
  transition: translate 0.55s var(--button-097-ease-hover);
}
.button-097__default {
  width: 100%;
  height: 100%;
  color: var(--button-097-color);
  grid-area: 1 / 1;
  display: grid;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-097:is(:hover, :focus-visible) .button-097__hover,
  [data-hover]:is(:hover, :focus-visible) .button-097 .button-097__hover {
    clip-path: inset(0% 0% 0% 0% round var(--button-097-border-radius));
    transition-delay: 0.05s;
  }
  .button-097:is(:hover, :focus-visible) .button-097__text,
  [data-hover]:is(:hover, :focus-visible) .button-097 .button-097__text {
    translate: var(--button-097-offset) 0 0;
    transition-delay: 0.05s;
  }
}
```
### CSS
```text
:root {
  --button-097-color: #131313;
  --button-097-color-background: #fff;
  --button-097-hover-color: #fff;
  --button-097-hover-color-background: #131313;
  --button-097-color-focus: #131313;
  --button-097-border-radius: 1.5em;
  --button-097-dot-border-radius: 0.25em;
  --button-097-padding-right: 0.75em;
  --button-097-padding-left: 1em;
  --button-097-gap: 0.375em;
  --button-097-dot-size: 0.5em;
  --button-097-focus-inset: -0.125em;
  --button-097-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-097-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-097 {
  --button-097-padding: 0.75em calc(var(--button-097-padding-right) + var(--button-097-gap) + var(--button-097-dot-size)) 0.75em var(--button-097-padding-left);
  --button-097-offset: calc((var(--button-097-padding-right) + var(--button-097-gap) + var(--button-097-dot-size) - var(--button-097-padding-left)) / 2);
  -webkit-tap-highlight-color: transparent;
}
.button-097:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-097-color-focus);
}
.button-097::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-097-focus-inset);
  border-radius: var(--button-097-border-radius);
  transition: box-shadow 0.3s var(--button-097-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-097__text {
  will-change: transform;
  transition: translate 0.55s var(--button-097-ease-hover);
}
.button-097__hover {
  clip-path: inset(calc(50% - var(--button-097-dot-size) * 0.5) var(--button-097-padding-right) calc(50% - var(--button-097-dot-size) * 0.5) calc(100% - (var(--button-097-dot-size) + var(--button-097-padding-right))) round var(--button-097-dot-border-radius));
  transition: clip-path 0.55s var(--button-097-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-097:is(:hover, :focus-visible) .button-097__hover,
  [data-hover]:is(:hover, :focus-visible) .button-097 .button-097__hover {
    clip-path: inset(0% 0% 0% 0% round var(--button-097-border-radius));
    transition-delay: 0.05s;
  }
  .button-097:is(:hover, :focus-visible) .button-097__text,
  [data-hover]:is(:hover, :focus-visible) .button-097 .button-097__text {
    translate: var(--button-097-offset) 0 0;
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
.button-097[data-theme='secondary'] {
  --button-097-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-097-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.