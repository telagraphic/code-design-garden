---
title: "Button 039"
description: "Button 039."
slug: "buttons/button-039"
previewVideo: "button-039.mp4"
order: 49.969
published: true
categories: ["button", "media"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["button", "039"]
sourceUrl: "https://www.osmo.supply/button-pack/button-039"
---
## Setup
### HTML
```text
<a data-button-039="" href="#" class="button-039">
  <span class="button-039__bg">
  </span>
  <span class="button-039__inner">
    <span class="button-039__icon-outer">
    </span>
    <span class="button-039__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-039-color: #ffe224;
  --button-039-color-background: #131313;
  --button-039-color-focus: #000;
  --button-039-padding: 0.75em 0.75em 0.75em 0.5em;
  --button-039-focus-border-radius: 0.5em;
  --button-039-focus-inset: -0.0625em;
}
.button-039 {
  -webkit-user-select: none;
  user-select: none;
  color: var(--button-039-color);
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.button-039::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-039-focus-inset);
  border-radius: var(--button-039-focus-border-radius);
  pointer-events: none;
  z-index: 1;
}
.button-039:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-039-color-focus);
}
.button-039:active {
  scale: 0.975;
  rotate: 0deg;
}
.button-039__bg {
  width: 100%;
  height: 100%;
  color: var(--button-039-color-background);
  grid-area: 1 / 1;
  position: relative;
  overflow: clip;
}
.button-039__bg-svg {
  width: 300%;
  max-width: none;
  height: 100%;
  position: absolute;
  inset: 0% auto auto 0%;
}
.button-039__inner {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  width: 100%;
  height: 100%;
  padding: var(--button-039-padding);
  z-index: 1;
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-039__icon-outer {
  aspect-ratio: 1;
  width: 1.25em;
  position: relative;
  overflow: clip;
}
.button-039__icon {
  width: auto;
  max-width: none;
  height: 100%;
  position: absolute;
  inset: 0% auto auto 0%;
}
@keyframes button-039-sprite {
  to {
    translate: -100%;
  }
}
@keyframes button-039-wiggle {
  from {
    rotate: 2deg;
  }
  to {
    rotate: -2deg;
  }
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-039:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-039 {
    scale: 1.035;
    rotate: -1deg;
  }
  .button-039:active {
    scale: 1;
  }
  .button-039:is(:hover, :focus-visible) .button-039__bg-svg,
  [data-hover]:is(:hover, :focus-visible) .button-039 .button-039__bg-svg {
    animation: button-039-sprite 0.45s steps(3, end) infinite;
  }
  .button-039:is(:hover, :focus-visible) .button-039__icon,
  [data-hover]:is(:hover, :focus-visible) .button-039 .button-039__icon {
    animation: button-039-sprite 0.45s steps(4, end) infinite;
  }
  .button-039:is(:hover, :focus-visible) .button-039__text,
  [data-hover]:is(:hover, :focus-visible) .button-039 .button-039__text {
    animation: button-039-wiggle 0.3s steps(2, end) infinite;
  }
}
```
### CSS
```text
:root {
  --button-039-color: #ffe224;
  --button-039-color-background: #131313;
  --button-039-color-focus: #000;
  --button-039-padding: 0.75em 0.75em 0.75em 0.5em;
  --button-039-focus-border-radius: 0.5em;
  --button-039-focus-inset: -0.0625em;
}
.button-039 {
  -webkit-tap-highlight-color: transparent;
}
.button-039:active {
  scale: 0.975;
  rotate: 0deg;
}
.button-039:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-039-color-focus);
}
.button-039::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-039-focus-inset);
  border-radius: var(--button-039-focus-border-radius);
  pointer-events: none;
  z-index: 1;
}
@keyframes button-039-sprite {
  to {
    translate: -100%;
  }
}
@keyframes button-039-wiggle {
  from {
    rotate: 2deg;
  }
  to {
    rotate: -2deg;
  }
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-039:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-039 {
    scale: 1.035;
    rotate: -1deg;
  }
  .button-039:is(:hover, :focus-visible) .button-039__bg-svg,
  [data-hover]:is(:hover, :focus-visible) .button-039 .button-039__bg-svg {
    animation: button-039-sprite 0.45s steps(3, end) infinite;
  }
  .button-039:is(:hover, :focus-visible) .button-039__text,
  [data-hover]:is(:hover, :focus-visible) .button-039 .button-039__text {
    animation: button-039-wiggle 0.3s steps(2, end) infinite;
  }
  .button-039:is(:hover, :focus-visible) .button-039__icon,
  [data-hover]:is(:hover, :focus-visible) .button-039 .button-039__icon {
    animation: button-039-sprite 0.45s steps(4, end) infinite;
  }
  .button-039:active {
    scale: 1;
  }
}
```
### Implementation
#### Sprite Steps
Use `steps(3, end)` in `button-039-sprite 0.45s steps(3, end) infinite` to match the number of equally sized frames in your horizontal sprite, so a 3-frame sprite uses `steps(3, end)` and a 4-frame sprite uses `steps(4, end)`.
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-039[data-theme='secondary'] {
  --button-039-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-039-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.