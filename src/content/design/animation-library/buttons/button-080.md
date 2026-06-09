---
title: "Button 080"
description: "Button 080."
slug: "buttons/button-080"
previewVideo: "button-080.mp4"
order: 49.95
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "080"]
sourceUrl: "https://www.osmo.supply/button-pack/button-080"
---
## Setup
### HTML
```text
<a data-button-080="" href="#" class="button-080">
  <span class="button-080__default">Button</span>
  <span class="button-080__hover">Button</span>
</a>
```
### CSS
```text
:root {
  --button-080-color: #131313;
  --button-080-color-background: #fff;
  --button-080-hover-color: #131313;
  --button-080-hover-color-background: #7de191;
  --button-080-color-focus-inner: #000;
  --button-080-color-focus-outer: #fff;
  --button-080-padding: 0.75em 1em;
  --button-080-border-radius: 2.5em;
  --button-080-ease-hover: linear(0, 0.0699, 0.1404, 0.2108, 0.2802, 0.3481, 0.414, 0.4774, 0.538, 0.5956, 0.65, 0.7009, 0.7484, 0.7923, 0.8327, 0.8696, 0.9031, 0.9332, 0.9602, 0.984, 1.005, 1.0232, 1.0387, 1.0519, 1.0628, 1.0717, 1.0787, 1.0839, 1.0876, 1.0899, 1.091, 1.091, 1.09, 1.0883, 1.0858, 1.0828, 1.0793, 1.0754, 1.0713, 1.0669, 1.0625, 1.0579, 1.0533, 1.0488, 1.0444, 1.04, 1.0358, 1.0318, 1.028, 1.0244, 1.021, 1.0178, 1.0148, 1.0121, 1.0096, 1.0073, 1.0053, 1.0034, 1.0018, 1.0003, 0.9991, 0.998, 0.997, 0.9963, 0.9956, 0.9951, 0.9947, 0.9944, 0.9942, 0.9941, 0.9941, 0.9941, 0.9942, 0.9944, 0.9945, 0.9948, 0.995, 0.9953, 0.9955, 0.9958, 0.9961, 0.9964, 0.9967, 0.997, 0.9973, 0.9975, 0.9978, 0.9981, 0.9983, 0.9985, 0.9987, 0.9989, 0.9991, 0.9993, 0.9995, 0.9996, 0.9997, 0.9998, 0.9999, 1, 1);
  --button-080-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-080 {
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
.button-080__default {
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding: var(--button-080-padding);
  color: var(--button-080-color);
  background-color: var(--button-080-color-background);
  border-radius: var(--button-080-border-radius);
  grid-area: 1 / 1;
  transform: scale(1) translate3d(0, 0, 0) rotate(0deg);
  transition: transform 0.45s var(--button-080-ease-hover), box-shadow 0.2s var(--button-080-ease-focus);
}
.button-080__hover {
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding: var(--button-080-padding);
  background-color: var(--button-080-hover-color-background);
  color: var(--button-080-hover-color);
  border-radius: var(--button-080-border-radius);
  grid-area: 1 / 1;
  transform: translate3d(25%, -75%, 0) rotate(18deg);
  opacity: 0;
  transition: transform 0.5s var(--button-080-ease-hover), box-shadow 0.2s var(--button-080-ease-focus), opacity 0.075s 0.035s ease-out;
}
.button-080:is(:focus-visible) .button-080__default,
.button-080:is(:focus-visible) .button-080__hover {
  box-shadow: 0 0 0 0.125em var(--button-080-color-focus-inner), 0 0 0 0.25em var(--button-080-color-focus-outer);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-080:is(:hover, :focus-visible) .button-080__default,
  [data-hover]:is(:hover, :focus-visible) .button-080 .button-080__default {
    transform: scale(0.95) translate3d(0, -10%, 0) rotate(4deg);
    transition-delay: 0.05s;
  }
  .button-080:is(:hover, :focus-visible) .button-080__hover,
  [data-hover]:is(:hover, :focus-visible) .button-080 .button-080__hover {
    transform: translate3d(5%, 5%, 0) rotate(-5deg);
    opacity: 1;
    transition: transform 0.55s 0.05s var(--button-080-ease-hover), box-shadow 0.2s var(--button-080-ease-focus), opacity 0.05s 0.05s ease-out;
  }
}
```
### CSS
```text
:root {
  --button-080-color: #131313;
  --button-080-color-background: #fff;
  --button-080-hover-color: #131313;
  --button-080-hover-color-background: #7de191;
  --button-080-color-focus-inner: #000;
  --button-080-color-focus-outer: #fff;
  --button-080-padding: 0.75em 1em;
  --button-080-border-radius: 2.5em;
  --button-080-ease-hover: linear(0, 0.0699, 0.1404, 0.2108, 0.2802, 0.3481, 0.414, 0.4774, 0.538, 0.5956, 0.65, 0.7009, 0.7484, 0.7923, 0.8327, 0.8696, 0.9031, 0.9332, 0.9602, 0.984, 1.005, 1.0232, 1.0387, 1.0519, 1.0628, 1.0717, 1.0787, 1.0839, 1.0876, 1.0899, 1.091, 1.091, 1.09, 1.0883, 1.0858, 1.0828, 1.0793, 1.0754, 1.0713, 1.0669, 1.0625, 1.0579, 1.0533, 1.0488, 1.0444, 1.04, 1.0358, 1.0318, 1.028, 1.0244, 1.021, 1.0178, 1.0148, 1.0121, 1.0096, 1.0073, 1.0053, 1.0034, 1.0018, 1.0003, 0.9991, 0.998, 0.997, 0.9963, 0.9956, 0.9951, 0.9947, 0.9944, 0.9942, 0.9941, 0.9941, 0.9941, 0.9942, 0.9944, 0.9945, 0.9948, 0.995, 0.9953, 0.9955, 0.9958, 0.9961, 0.9964, 0.9967, 0.997, 0.9973, 0.9975, 0.9978, 0.9981, 0.9983, 0.9985, 0.9987, 0.9989, 0.9991, 0.9993, 0.9995, 0.9996, 0.9997, 0.9998, 0.9999, 1, 1);
  --button-080-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-080 {
  -webkit-tap-highlight-color: transparent;
}
.button-080:is(:focus-visible) .button-080__default,
.button-080:is(:focus-visible) .button-080__hover {
  box-shadow: 0 0 0 0.125em var(--button-080-color-focus-inner), 0 0 0 0.25em var(--button-080-color-focus-outer);
}
.button-080__default {
  transform: scale(1) translate3d(0, 0, 0) rotate(0deg);
  transition: transform 0.45s var(--button-080-ease-hover), box-shadow 0.2s var(--button-080-ease-focus);
}
.button-080__hover {
  transform: translate3d(25%, -75%, 0) rotate(18deg);
  opacity: 0;
  transition: transform 0.5s var(--button-080-ease-hover), box-shadow 0.2s var(--button-080-ease-focus), opacity 0.075s 0.035s ease-out;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-080:is(:hover, :focus-visible) .button-080__default,
  [data-hover]:is(:hover, :focus-visible) .button-080 .button-080__default {
    transform: scale(0.95) translate3d(0, -10%, 0) rotate(4deg);
    transition-delay: 0.05s;
  }
  .button-080:is(:hover, :focus-visible) .button-080__hover,
  [data-hover]:is(:hover, :focus-visible) .button-080 .button-080__hover {
    transform: translate3d(5%, 5%, 0) rotate(-5deg);
    opacity: 1;
    transition: transform 0.55s 0.05s var(--button-080-ease-hover), box-shadow 0.2s var(--button-080-ease-focus), opacity 0.05s 0.05s ease-out;
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
.button-080[data-theme='secondary'] {
  --button-080-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-080-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.