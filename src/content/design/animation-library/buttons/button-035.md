---
title: "Button 035"
description: "Button 035."
slug: "buttons/button-035"
previewVideo: "button-035.mp4"
order: 49.972
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "035"]
sourceUrl: "https://www.osmo.supply/button-pack/button-035"
---
## Setup
### HTML
```text
<a data-button-035="" href="#" class="button-035">
  <span class="button-035__hover">
    <span class="button-035__bg is--hover"></span>
    <span class="button-035__inner">
      <span class="button-035__text">Button</span>
    </span>
  </span>
  <span aria-hidden="true" class="button-035__default">
    <span class="button-035__bg is--default"></span>
    <span class="button-035__inner">
      <span class="button-035__text">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-035-color: #fff;
  --button-035-color-background: #ff8a4f;
  --button-035-hover-color: #ff8a4f;
  --button-035-hover-color-background: #131313;
  --button-035-color-focus: #201d1d;
  --button-035-border-radius: 2.5em;
  --button-035-padding: 0.75em 1em;
  --button-035-gap: 0.125em;
  --button-035-focus-inset: -0.125em;
  --button-035-hover-scale: 1.065 1.095;
  --button-035-click-scale: 0.955 0.925;
  --button-035-ease-hover: cubic-bezier(0.4, 0.15, 0, 1);
  --button-035-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-035-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-035 {
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
  transition: scale 0.45s var(--button-035-ease-hover), transform 0.15s var(--button-035-ease-click);
}
.button-035::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-035-focus-inset);
  border-radius: var(--button-035-border-radius);
  transition: box-shadow 0.3s var(--button-035-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-035:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-035-color-focus);
}
.button-035:active {
  scale: var(--button-035-click-scale);
}
.button-035__hover {
  width: 100%;
  height: 100%;
  color: var(--button-035-hover-color);
  z-index: 1;
  grid-area: 1 / 1;
  display: grid;
  clip-path: polygon(calc(50% + 1em) 0%, calc(50% + 1em) 0%, calc(50% - 1em) 100%, calc(50% - 1em) 100%);
  transition: clip-path 0.75s var(--button-035-ease-hover);
}
.button-035__bg {
  border-radius: var(--button-035-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-035__bg.is--hover {
  background-color: var(--button-035-hover-color-background);
}
.button-035__bg.is--default {
  background-color: var(--button-035-color-background);
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}
.button-035__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-035-padding);
  grid-column-gap: var(--button-035-gap);
  grid-row-gap: var(--button-035-gap);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-035__default {
  width: 100%;
  height: 100%;
  color: var(--button-035-color);
  grid-area: 1 / 1;
  display: grid;
}
.button-035__icon {
  flex: none;
  width: .75em;
  height: .75em;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-035:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-035 {
    scale: var(--button-035-hover-scale);
  }
  .button-035:is(:hover, :focus-visible) .button-035__hover,
  [data-hover]:is(:hover, :focus-visible) .button-035 .button-035__hover {
    clip-path: polygon(-25% 0%, 125% 0%, 125% 100%, -25% 100%);
    transition-delay: 0.05s;
  }
}
```
### CSS
```text
:root {
  --button-035-color: #fff;
  --button-035-color-background: #ff8a4f;
  --button-035-hover-color: #ff8a4f;
  --button-035-hover-color-background: #131313;
  --button-035-color-focus: #201d1d;
  --button-035-border-radius: 2.5em;
  --button-035-padding: 0.75em 1em;
  --button-035-gap: 0.125em;
  --button-035-focus-inset: -0.125em;
  --button-035-hover-scale: 1.065 1.095;
  --button-035-click-scale: 0.955 0.925;
  --button-035-ease-hover: cubic-bezier(0.4, 0.15, 0, 1);
  --button-035-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-035-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-035 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.45s var(--button-035-ease-hover), transform 0.15s var(--button-035-ease-click);
}
.button-035:active {
  scale: var(--button-035-click-scale);
}
.button-035:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-035-color-focus);
}
.button-035::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-035-focus-inset);
  border-radius: var(--button-035-border-radius);
  transition: box-shadow 0.3s var(--button-035-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-035__hover {
  clip-path: polygon(calc(50% + 1em) 0%, calc(50% + 1em) 0%, calc(50% - 1em) 100%, calc(50% - 1em) 100%);
  transition: clip-path 0.75s var(--button-035-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-035:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-035 {
    scale: var(--button-035-hover-scale);
  }
  .button-035:is(:hover, :focus-visible) .button-035__hover,
  [data-hover]:is(:hover, :focus-visible) .button-035 .button-035__hover {
    clip-path: polygon(-25% 0%, 125% 0%, 125% 100%, -25% 100%);
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
.button-035[data-theme='secondary'] {
  --button-035-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-035-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.