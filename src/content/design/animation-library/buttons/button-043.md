---
title: "Button 043"
description: "Button 043."
slug: "buttons/button-043"
previewVideo: "button-043.mp4"
order: 49.966
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "043"]
sourceUrl: "https://www.osmo.supply/button-pack/button-043"
---
## Setup
### HTML
```text
<a data-button-043="" href="#" class="button-043">
  <span class="button-043__bg">
    <span class="button-043__bg-hover"></span>
  </span>
  <span class="button-043__inner">
    <span class="button-043__mask">
      <span class="button-043__text">Button</span>
    </span>
    <span class="button-043__icon-wrap">
      <span class="button-043__icon-bg"></span>
      <span class="button-043__icon-mask">
        <span class="button-043__icon-list">
        </span>
      </span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-043-color: #fff;
  --button-043-color-background: #e94658;
  --button-043-hover-color-background: #411E34;
  --button-043-icon-color: #e94658;
  --button-043-icon-color-background: #fff;
  --button-043-color-focus: #000;
  --button-043-padding: 0.6875em 0.6875em 0.6875em 0.9375em;
  --button-043-border-radius: 0.25em;
  --button-043-icon-border-radius: 0.125em;
  --button-043-text-duplicate-distance: 1.5em;
  --button-043-focus-inset: -0.125em;
  --button-043-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-043-ease-hover: cubic-bezier(0.625, 0.05, 0, 1);
  --button-043-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-043 {
  -webkit-user-select: none;
  user-select: none;
  color: var(--button-043-color);
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.button-043::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-043-focus-inset);
  border-radius: var(--button-043-border-radius);
  transition: box-shadow 0.2s var(--button-043-ease-focus);
  scale: var(--button-043-focus-scale);
  pointer-events: none;
  z-index: 1;
}
.button-043:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-043-color-focus);
}
.button-043__bg {
  background-color: var(--button-043-color-background);
  border-radius: var(--button-043-border-radius);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: clip;
}
.button-043__bg-hover {
  background-color: var(--button-043-hover-color-background);
  width: 120%;
  height: 100%;
  padding: 0;
  position: absolute;
  bottom: 0%;
  left: -10%;
  transition: transform 0.525s var(--button-043-ease-hover);
  transform: translate3d(0, 175%, 0) rotate(15deg);
}
.button-043__inner {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  width: 100%;
  height: 100%;
  padding: var(--button-043-padding);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-043__mask {
  clip-path: inset(-10% 0);
  flex: none;
  justify-content: center;
  align-items: center;
  display: flex;
}
.button-043__text {
  transition: transform 0.525s var(--button-043-ease-hover);
  text-shadow: 0px var(--button-043-text-duplicate-distance) currentColor;
}
.button-043__icon-wrap {
  width: 1.125em;
  height: 1.125em;
  color: var(--button-043-icon-color);
  border-radius: var(--button-043-icon-border-radius);
  flex: none;
  display: grid;
  position: relative;
}
.button-043__icon-bg {
  background-color: var(--button-043-icon-color-background);
  border-radius: var(--button-043-icon-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
  transition: transform 0.525s var(--button-043-ease-hover);
}
.button-043__icon-mask {
  grid-area: 1 / 1;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: clip;
}
.button-043__icon-list {
  flex-flow: row;
  grid-area: 1 / 1;
  display: flex;
  position: absolute;
}
.button-043__icon {
  width: 1.125em;
  height: 1.125em;
  padding: .2em;
  transition: transform 0.525s var(--button-043-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-043:is(:hover, :focus-visible) .button-043__bg-hover,
  [data-hover]:is(:hover, :focus-visible) .button-043 .button-043__bg-hover {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  .button-043:is(:hover, :focus-visible) .button-043__text,
  [data-hover]:is(:hover, :focus-visible) .button-043 .button-043__text {
    transform: translate(0px, calc(-1 * var(--button-043-text-duplicate-distance)));
  }
  .button-043:is(:hover, :focus-visible) .button-043__icon-bg,
  [data-hover]:is(:hover, :focus-visible) .button-043 .button-043__icon-bg {
    transform: rotate(90deg);
  }
  .button-043:is(:hover, :focus-visible) .button-043__icon,
  [data-hover]:is(:hover, :focus-visible) .button-043 .button-043__icon {
    transform: translate3d(200%, 0, 0);
  }
}
```
### CSS
```text
:root {
  --button-043-color: #fff;
  --button-043-color-background: #e94658;
  --button-043-hover-color-background: #411E34;
  --button-043-icon-color: #e94658;
  --button-043-icon-color-background: #fff;
  --button-043-color-focus: #000;
  --button-043-padding: 0.6875em 0.6875em 0.6875em 0.9375em;
  --button-043-border-radius: 0.25em;
  --button-043-icon-border-radius: 0.125em;
  --button-043-text-duplicate-distance: 1.5em;
  --button-043-focus-inset: -0.125em;
  --button-043-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-043-ease-hover: cubic-bezier(0.625, 0.05, 0, 1);
  --button-043-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-043 {
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-043:is(:hover, :focus-visible) .button-043__bg-hover,
  [data-hover]:is(:hover, :focus-visible) .button-043 .button-043__bg-hover {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  .button-043:is(:hover, :focus-visible) .button-043__icon,
  [data-hover]:is(:hover, :focus-visible) .button-043 .button-043__icon {
    transform: translate3d(200%, 0, 0);
  }
  .button-043:is(:hover, :focus-visible) .button-043__icon-bg,
  [data-hover]:is(:hover, :focus-visible) .button-043 .button-043__icon-bg {
    transform: rotate(90deg);
  }
  .button-043:is(:hover, :focus-visible) .button-043__text,
  [data-hover]:is(:hover, :focus-visible) .button-043 .button-043__text {
    transform: translate(0px, calc(-1 * var(--button-043-text-duplicate-distance)));
  }
}
.button-043:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-043-color-focus);
}
.button-043::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-043-focus-inset);
  border-radius: var(--button-043-border-radius);
  transition: box-shadow 0.2s var(--button-043-ease-focus);
  scale: var(--button-043-focus-scale);
  pointer-events: none;
  z-index: 1;
}
.button-043__bg-hover,
.button-043__icon,
.button-043__icon-bg,
.button-043__text {
  transition: transform 0.525s var(--button-043-ease-hover);
}
.button-043__bg-hover {
  transform: translate3d(0, 175%, 0) rotate(15deg);
}
.button-043__text {
  text-shadow: 0px var(--button-043-text-duplicate-distance) currentColor;
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-043[data-theme='secondary'] {
  --button-043-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-043-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.