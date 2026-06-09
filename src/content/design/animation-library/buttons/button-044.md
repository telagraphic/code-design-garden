---
title: "Button 044"
description: "Button 044."
slug: "buttons/button-044"
previewVideo: "button-044.mp4"
order: 49.965
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "044"]
sourceUrl: "https://www.osmo.supply/button-pack/button-044"
---
## Setup
### HTML
```text
<a data-button-044="" href="#" class="button-044">
  <span class="button-044__bg"></span>
  <span class="button-044__inner">
    <span class="button-044__text-wrap">
      <span class="button-044__text">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-044-color: #131313;
  --button-044-color-background: #4acb7b;
  --button-044-color-focus: #fff;
  --button-044-border-radius: 2.5em;
  --button-044-focus-inset: -0.125em;
  --button-044-text-duplicate-distance: 2em;
  --button-044-hover-scale: 0.955, 0.925;
  --button-044-hover-rotate: -3deg;
  --button-044-click-scale: 1.065 1.095;
  --button-044-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-044-ease-hover: linear(0, 0.55 7.5%, 0.85 12%, 0.95 14%, 1.03 16.5%, 1.09 20%, 1.13 22%, 1.14 23%, 1.15 24.5%, 1.15 26%, 1.13 28%, 1.11 31%, 1.05 39%, 1.02 43%, 0.99 47%, 0.98 52%, 0.97 59%, 1.002 81%, 1);
  --button-044-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-044 {
  color: var(--button-044-color);
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
  transition: scale 0.15s var(--button-044-ease-click);
}
.button-044::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-044-focus-inset);
  border-radius: var(--button-044-border-radius);
  transition: transform 0.65s var(--button-044-ease-hover), box-shadow 0.3s var(--button-044-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-044:active {
  scale: var(--button-044-click-scale);
}
.button-044:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-044-color-focus);
  transform: scale(var(--button-044-hover-scale)) rotate(var(--button-044-hover-rotate));
  transition-delay: 0.05s;
}
.button-044__bg {
  background-color: var(--button-044-color-background);
  border-radius: var(--button-044-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: transform 0.65s var(--button-044-ease-hover);
}
.button-044__inner {
  border-radius: var(--button-044-border-radius);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: .75em 1em;
  display: flex;
  overflow: clip;
  transition: transform 0.65s var(--button-044-ease-hover);
}
.button-044__text-wrap {
  justify-content: center;
  align-items: center;
  display: flex;
  transition: transform 0.65s var(--button-044-ease-hover);
}
.button-044__text {
  will-change: transform;
  text-shadow: 0px var(--button-044-text-duplicate-distance) currentColor;
  transition: transform 0.65s var(--button-044-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-044:is(:hover, :focus-visible) .button-044__bg,
  .button-044:is(:hover, :focus-visible) .button-044__inner,
  [data-hover]:is(:hover, :focus-visible) .button-044 .button-044__bg,
  [data-hover]:is(:hover, :focus-visible) .button-044 .button-044__inner {
    transform: scale(var(--button-044-hover-scale)) rotate(var(--button-044-hover-rotate));
    transition-delay: 0.05s;
  }
  .button-044:is(:hover, :focus-visible) .button-044__text-wrap,
  [data-hover]:is(:hover, :focus-visible) .button-044 .button-044__text-wrap {
    transform: rotate(calc(var(--button-044-hover-rotate) * -1));
    transition-delay: 0.05s;
  }
  .button-044:is(:hover, :focus-visible) .button-044__text,
  [data-hover]:is(:hover, :focus-visible) .button-044 .button-044__text {
    transform: translate3d(0, calc(var(--button-044-text-duplicate-distance) * -1), 0);
    transition-delay: 0.05s;
  }
}
```
### CSS
```text
:root {
  --button-044-color: #131313;
  --button-044-color-background: #4acb7b;
  --button-044-color-focus: #fff;
  --button-044-border-radius: 2.5em;
  --button-044-focus-inset: -0.125em;
  --button-044-text-duplicate-distance: 2em;
  --button-044-hover-scale: 0.955, 0.925;
  --button-044-hover-rotate: -3deg;
  --button-044-click-scale: 1.065 1.095;
  --button-044-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-044-ease-hover: linear(0, 0.55 7.5%, 0.85 12%, 0.95 14%, 1.03 16.5%, 1.09 20%, 1.13 22%, 1.14 23%, 1.15 24.5%, 1.15 26%, 1.13 28%, 1.11 31%, 1.05 39%, 1.02 43%, 0.99 47%, 0.98 52%, 0.97 59%, 1.002 81%, 1);
  --button-044-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-044 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-044-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-044:is(:hover, :focus-visible) .button-044__bg,
  .button-044:is(:hover, :focus-visible) .button-044__inner,
  [data-hover]:is(:hover, :focus-visible) .button-044 .button-044__bg,
  [data-hover]:is(:hover, :focus-visible) .button-044 .button-044__inner {
    transform: scale(var(--button-044-hover-scale)) rotate(var(--button-044-hover-rotate));
    transition-delay: 0.05s;
  }
  .button-044:is(:hover, :focus-visible) .button-044__text-wrap,
  [data-hover]:is(:hover, :focus-visible) .button-044 .button-044__text-wrap {
    transform: rotate(calc(var(--button-044-hover-rotate) * -1));
    transition-delay: 0.05s;
  }
  .button-044:is(:hover, :focus-visible) .button-044__text,
  [data-hover]:is(:hover, :focus-visible) .button-044 .button-044__text {
    transform: translate3d(0, calc(var(--button-044-text-duplicate-distance) * -1), 0);
    transition-delay: 0.05s;
  }
}
.button-044:active {
  scale: var(--button-044-click-scale);
}
.button-044:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-044-color-focus);
  transform: scale(var(--button-044-hover-scale)) rotate(var(--button-044-hover-rotate));
  transition-delay: 0.05s;
}
.button-044::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-044-focus-inset);
  border-radius: var(--button-044-border-radius);
  transition: transform 0.65s var(--button-044-ease-hover), box-shadow 0.3s var(--button-044-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-044__bg,
.button-044__inner,
.button-044__text-wrap {
  transition: transform 0.65s var(--button-044-ease-hover);
}
.button-044__text {
  will-change: transform;
  text-shadow: 0px var(--button-044-text-duplicate-distance) currentColor;
  transition: transform 0.65s var(--button-044-ease-hover);
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-044[data-theme='secondary'] {
  --button-044-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-044-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.