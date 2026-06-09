---
title: "Button 098"
description: "Button 098."
slug: "buttons/button-098"
previewVideo: "button-098.mp4"
order: 49.944
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "098"]
sourceUrl: "https://www.osmo.supply/button-pack/button-098"
---
## Setup
### HTML
```text
<a data-button-076="" href="#" class="button-098">
  <span aria-hidden="true" class="button-098__hover">
    <span class="button-098__bg is--hover"></span>
    <span class="button-098__inner">
      <span class="button-098__text">Button</span>
    </span>
  </span>
  <span class="button-098__between">
    <span class="button-098__bg is--between"></span>
  </span>
  <span class="button-098__default">
    <span class="button-098__bg is--default"></span>
    <span class="button-098__inner">
      <span class="button-098__text">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-098-color: #fff;
  --button-098-color-background: #08181b;
  --button-098-between-color-background: #fff;
  --button-098-hover-color: #131313;
  --button-098-hover-color-background: #d1fd88;
  --button-098-color-focus: #fff;
  --button-098-border-radius: 2.5em;
  --button-098-padding: 0.75em 1em;
  --button-098-gap: 0.125em;
  --button-098-delay: 0.05s;
  --button-098-focus-inset: -0.125em;
  --button-098-hover-scale: 1.065 1.095;
  --button-098-click-scale: 0.955 0.925;
  --button-098-ease-hover: cubic-bezier(0.4, 0.15, 0, 1);
  --button-098-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-098-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-098 {
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
  transition: scale 0.45s var(--button-098-ease-hover), transform 0.15s var(--button-098-ease-click);
}
.button-098::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-098-focus-inset);
  border-radius: var(--button-098-border-radius);
  transition: box-shadow 0.3s var(--button-098-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-098:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-098-color-focus);
}
.button-098:active {
  scale: var(--button-098-click-scale);
}
.button-098__hover {
  color: var(--button-098-hover-color);
  z-index: 2;
  grid-area: 1 / 1;
  place-self: center;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  display: grid;
  clip-path: polygon(0 -1%, 100% -1%, 100% 0%, 0 -40%);
  transition: clip-path 0.55s var(--button-098-ease-hover);
}
.button-098__bg {
  border-radius: var(--button-098-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-098__bg.is--hover {
  background-color: var(--button-098-hover-color-background);
}
.button-098__bg.is--between {
  background-color: var(--button-098-between-color-background);
}
.button-098__bg.is--default {
  background-color: var(--button-098-color-background);
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}
.button-098__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-098-padding);
  grid-column-gap: var(--button-098-gap);
  grid-row-gap: var(--button-098-gap);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-098__between {
  z-index: 1;
  grid-area: 1 / 1;
  place-self: center;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  display: grid;
  clip-path: polygon(0 -1%, 100% -1%, 100% 0%, 0 -40%);
  transition: clip-path 0.55s var(--button-098-delay) var(--button-098-ease-hover);
}
.button-098__default {
  width: 100%;
  height: 100%;
  color: var(--button-098-color);
  grid-area: 1 / 1;
  display: grid;
}
.button-098__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-098:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-098 {
    scale: var(--button-098-hover-scale);
  }
  .button-098:is(:hover, :focus-visible) .button-098__between,
  [data-hover]:is(:hover, :focus-visible) .button-098 .button-098__between {
    clip-path: polygon(0 0, 100% 0%, 100% 140%, 0 100%);
    transition-delay: var(--button-098-delay);
  }
  .button-098:is(:hover, :focus-visible) .button-098__hover,
  [data-hover]:is(:hover, :focus-visible) .button-098 .button-098__hover {
    clip-path: polygon(0 0, 100% 0%, 100% 140%, 0 100%);
    transition-delay: calc(var(--button-098-delay) * 2);
  }
}
```
### CSS
```text
:root {
  --button-098-color: #fff;
  --button-098-color-background: #08181b;
  --button-098-between-color-background: #fff;
  --button-098-hover-color: #131313;
  --button-098-hover-color-background: #d1fd88;
  --button-098-color-focus: #fff;
  --button-098-border-radius: 2.5em;
  --button-098-padding: 0.75em 1em;
  --button-098-gap: 0.125em;
  --button-098-delay: 0.05s;
  --button-098-focus-inset: -0.125em;
  --button-098-hover-scale: 1.065 1.095;
  --button-098-click-scale: 0.955 0.925;
  --button-098-ease-hover: cubic-bezier(0.4, 0.15, 0, 1);
  --button-098-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-098-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-098 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.45s var(--button-098-ease-hover), transform 0.15s var(--button-098-ease-click);
}
.button-098:active {
  scale: var(--button-098-click-scale);
}
.button-098:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-098-color-focus);
}
.button-098::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-098-focus-inset);
  border-radius: var(--button-098-border-radius);
  transition: box-shadow 0.3s var(--button-098-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-098__between {
  clip-path: polygon(0 -1%, 100% -1%, 100% 0%, 0 -40%);
  transition: clip-path 0.55s var(--button-098-delay) var(--button-098-ease-hover);
}
.button-098__hover {
  clip-path: polygon(0 -1%, 100% -1%, 100% 0%, 0 -40%);
  transition: clip-path 0.55s var(--button-098-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-098:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-098 {
    scale: var(--button-098-hover-scale);
  }
  .button-098:is(:hover, :focus-visible) .button-098__between,
  [data-hover]:is(:hover, :focus-visible) .button-098 .button-098__between {
    clip-path: polygon(0 0, 100% 0%, 100% 140%, 0 100%);
    transition-delay: var(--button-098-delay);
  }
  .button-098:is(:hover, :focus-visible) .button-098__hover,
  [data-hover]:is(:hover, :focus-visible) .button-098 .button-098__hover {
    clip-path: polygon(0 0, 100% 0%, 100% 140%, 0 100%);
    transition-delay: calc(var(--button-098-delay) * 2);
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
.button-098[data-theme='secondary'] {
  --button-098-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-098-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.