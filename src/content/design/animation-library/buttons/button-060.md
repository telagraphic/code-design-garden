---
title: "Button 060"
description: "Button 060."
slug: "buttons/button-060"
previewVideo: "button-060.mp4"
order: 49.958
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "060"]
sourceUrl: "https://www.osmo.supply/button-pack/button-060"
---
## Setup
### HTML
```text
<a data-button-060="" href="#" class="button-060">
  <span class="button-060__bg"></span>
  <span class="button-060__inner">
    <span class="button-060__line"></span>
    <span class="button-060__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-060-color: #131313;
  --button-060-color-background: #fff;
  --button-060-color-focus: #000;
  --button-060-border-radius: 2.5em;
  --button-060-padding: 0.75em 1em;
  --button-060-focus-inset: -0.125em;
  --button-060-hover-scale: 1.06 1.095;
  --button-060-click-scale: 0.955 0.925;
  --button-060-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-060-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-060-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-060 {
  color: var(--button-060-color);
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
  transition: scale 0.15s var(--button-060-ease-click);
}
.button-060::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-060-focus-inset);
  border-radius: var(--button-060-border-radius);
  transition: box-shadow 0.2s var(--button-060-ease-focus), scale 0.45s var(--button-060-ease-hover);
  scale: 1 1;
  pointer-events: none;
  z-index: 1;
}
.button-060:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-060-color-focus);
  scale: var(--button-060-hover-scale);
}
.button-060:active {
  scale: var(--button-060-click-scale);
}
.button-060__bg {
  background-color: var(--button-060-color-background);
  border-radius: var(--button-060-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: scale 0.45s var(--button-060-ease-hover);
}
.button-060__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-060-padding);
  z-index: 1;
  grid-area: 1 / 1;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
}
.button-060__line {
  pointer-events: none;
  background-color: currentColor;
  flex: none;
  width: .625em;
  height: .125em;
  padding: 0;
  position: absolute;
  transform-origin: left center;
  translate: -0.5em;
  scale: 0 1;
  transition: scale 0.45s var(--button-060-ease-hover);
}
.button-060__text {
  transition: transform 0.45s var(--button-060-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-060:is(:hover, :focus-visible) .button-060__bg,
  [data-hover]:is(:hover, :focus-visible) .button-060 .button-060__bg {
    scale: var(--button-060-hover-scale);
    transition-delay: 0.05s;
  }
  .button-060:is(:hover, :focus-visible) .button-060__line,
  [data-hover]:is(:hover, :focus-visible) .button-060 .button-060__line {
    scale: 1 1;
    transition-delay: 0.05s;
  }
  .button-060:is(:hover, :focus-visible) .button-060__text,
  [data-hover]:is(:hover, :focus-visible) .button-060 .button-060__text {
    transform: translate3d(0.375em, 0, 0);
    transition-delay: 0.05s;
  }
}
```
### CSS
```text
:root {
  --button-060-color: #131313;
  --button-060-color-background: #fff;
  --button-060-color-focus: #000;
  --button-060-border-radius: 2.5em;
  --button-060-padding: 0.75em 1em;
  --button-060-focus-inset: -0.125em;
  --button-060-hover-scale: 1.06 1.095;
  --button-060-click-scale: 0.955 0.925;
  --button-060-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-060-ease-hover: cubic-bezier(0.32, 0.72, 0, 1);
  --button-060-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-060 {
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-060-ease-click);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-060:is(:hover, :focus-visible) .button-060__bg,
  [data-hover]:is(:hover, :focus-visible) .button-060 .button-060__bg {
    scale: var(--button-060-hover-scale);
    transition-delay: 0.05s;
  }
  .button-060:is(:hover, :focus-visible) .button-060__line,
  [data-hover]:is(:hover, :focus-visible) .button-060 .button-060__line {
    scale: 1 1;
    transition-delay: 0.05s;
  }
  .button-060:is(:hover, :focus-visible) .button-060__text,
  [data-hover]:is(:hover, :focus-visible) .button-060 .button-060__text {
    transform: translate3d(0.375em, 0, 0);
    transition-delay: 0.05s;
  }
  .button-060:is(:hover, :focus-visible) .button-060__text,
  [data-hover]:is(:hover, :focus-visible) .button-060 .button-060__text {
    transform: translate3d(0.375em, 0, 0);
    transition-delay: 0.05s;
  }
}
.button-060:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-060-color-focus);
  scale: var(--button-060-hover-scale);
}
.button-060:active {
  scale: var(--button-060-click-scale);
}
.button-060::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-060-focus-inset);
  border-radius: var(--button-060-border-radius);
  transition: box-shadow 0.2s var(--button-060-ease-focus), scale 0.45s var(--button-060-ease-hover);
  scale: 1 1;
  pointer-events: none;
  z-index: 1;
}
.button-060__bg {
  transition: scale 0.45s var(--button-060-ease-hover);
}
.button-060__line {
  transform-origin: left center;
  translate: -0.5em;
  scale: 0 1;
  transition: scale 0.45s var(--button-060-ease-hover);
}
.button-060__text {
  transition: transform 0.45s var(--button-060-ease-hover);
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-060[data-theme='secondary'] {
  --button-060-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-060-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.