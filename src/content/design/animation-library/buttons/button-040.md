---
title: "Button 040"
description: "Button 040."
slug: "buttons/button-040"
previewVideo: "button-040.mp4"
order: 49.968
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["css-only"]
keywords: ["button", "040"]
sourceUrl: "https://www.osmo.supply/button-pack/button-040"
---
## Setup
### HTML
```text
<a data-button-040="" href="#" class="button-040">
  <span class="button-040__icon-wrap">
  </span>
  <span class="button-040__text-wrap">
    <span class="button-040__text">Button</span>
  </span>
  <span class="button-040__icon-wrap is--duplicate">
  </span>
</a>
```
### CSS
```text
:root {
  --button-040-color: #131313;
  --button-040-color-background: #efeeec;
  --button-040-color-arrow: #efeeec;
  --button-040-color-arrow-background: #202623;
  --button-040-color-focus: #fff;
  --button-040-height: 2.5em;
  --button-040-padding-x: 1em;
  --button-040-border-radius: 2.5em;
  --button-040-gap: 0em;
  --button-040-focus-inset: -0.125em;
  --button-040-ease-hover: cubic-bezier(0.625, 0.05, 0, 1);
  --button-040-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-040 {
  color: var(--button-040-color);
  -webkit-user-select: none;
  user-select: none;
  height: var(--button-040-height);
  grid-column-gap: var(--button-040-gap);
  grid-row-gap: var(--button-040-gap);
  background-color: #0000;
  outline-style: none;
  justify-content: center;
  align-items: center;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  position: relative;
  --button-040-translate-x: calc((var(--button-040-height) + var(--button-040-gap, 0em)) * -1);
  -webkit-tap-highlight-color: transparent;
}
.button-040::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-040-focus-inset);
  border-radius: var(--button-040-border-radius);
  transition: box-shadow 0.3s var(--button-040-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-040:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-040-color-focus);
}
.button-040__icon-wrap {
  aspect-ratio: 1;
  background-color: var(--button-040-color-arrow-background);
  border-radius: var(--button-040-border-radius);
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
  will-change: transform;
  transform-origin: left center;
  scale: 0;
  transition: scale 0.6s var(--button-040-ease-hover);
}
.button-040__icon-wrap.is--duplicate {
  z-index: 1;
  position: absolute;
  right: 0;
  transform-origin: right center;
  scale: 1;
}
.button-040__icon {
  width: 1em;
  height: 1em;
  color: var(--button-040-color-arrow);
  transition: rotate 0.6s var(--button-040-ease-hover);
  rotate: 45deg;
}
.button-040__icon-wrap.is--duplicate .button-040__icon {
  rotate: 0deg;
}
.button-040__text-wrap {
  height: 100%;
  padding: 0 var(--button-040-padding-x);
  background-color: var(--button-040-color-background);
  border-radius: var(--button-040-border-radius);
  justify-content: center;
  align-items: center;
  display: flex;
  translate: var(--button-040-translate-x) 0 0;
  transition: translate 0.6s var(--button-040-ease-hover);
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-040:is(:hover, :focus-visible) .button-040__icon-wrap,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__icon-wrap {
    scale: 1;
    transition: scale 0.735s 0.05s var(--button-040-ease-hover);
  }
  .button-040:is(:hover, :focus-visible) .button-040__icon-wrap.is--duplicate,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__icon-wrap.is--duplicate {
    scale: 0;
    transition: scale 0.735s 0.05s var(--button-040-ease-hover);
  }
  .button-040:is(:hover, :focus-visible) .button-040__icon-wrap.is--duplicate .button-040__icon,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__icon-wrap.is--duplicate .button-040__icon {
    rotate: 45deg;
  }
  .button-040:is(:hover, :focus-visible) .button-040__icon,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__icon {
    rotate: 0deg;
    transition: rotate 0.735s 0.05s var(--button-040-ease-hover);
  }
  .button-040:is(:hover, :focus-visible) .button-040__text-wrap,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__text-wrap {
    translate: 0 0 0;
    transition: translate 0.735s 0.05s var(--button-040-ease-hover);
  }
}
```
### CSS
```text
:root {
  --button-040-color: #131313;
  --button-040-color-background: #efeeec;
  --button-040-color-arrow: #efeeec;
  --button-040-color-arrow-background: #202623;
  --button-040-color-focus: #fff;
  --button-040-height: 2.5em;
  --button-040-padding-x: 1em;
  --button-040-border-radius: 2.5em;
  --button-040-gap: 0em;
  --button-040-focus-inset: -0.125em;
  --button-040-ease-hover: cubic-bezier(0.625, 0.05, 0, 1);
  --button-040-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-040 {
  --button-040-translate-x: calc((var(--button-040-height) + var(--button-040-gap, 0em)) * -1);
  -webkit-tap-highlight-color: transparent;
}
.button-040:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-040-color-focus);
}
.button-040::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-040-focus-inset);
  border-radius: var(--button-040-border-radius);
  transition: box-shadow 0.3s var(--button-040-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-040__text-wrap {
  translate: var(--button-040-translate-x) 0 0;
  transition: translate 0.6s var(--button-040-ease-hover);
}
.button-040__icon-wrap {
  will-change: transform;
  transform-origin: left center;
  scale: 0;
  transition: scale 0.6s var(--button-040-ease-hover);
}
.button-040__icon-wrap.is--duplicate {
  transform-origin: right center;
  scale: 1;
}
.button-040__icon {
  transition: rotate 0.6s var(--button-040-ease-hover);
  rotate: 45deg;
}
.button-040__icon-wrap.is--duplicate .button-040__icon {
  rotate: 0deg;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-040:is(:hover, :focus-visible) .button-040__text-wrap,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__text-wrap {
    translate: 0 0 0;
    transition: translate 0.735s 0.05s var(--button-040-ease-hover);
  }
  .button-040:is(:hover, :focus-visible) .button-040__icon-wrap,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__icon-wrap {
    scale: 1;
    transition: scale 0.735s 0.05s var(--button-040-ease-hover);
  }
  .button-040:is(:hover, :focus-visible) .button-040__icon-wrap.is--duplicate,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__icon-wrap.is--duplicate {
    scale: 0;
    transition: scale 0.735s 0.05s var(--button-040-ease-hover);
  }
  .button-040:is(:hover, :focus-visible) .button-040__icon-wrap.is--duplicate .button-040__icon,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__icon-wrap.is--duplicate .button-040__icon {
    rotate: 45deg;
  }
  .button-040:is(:hover, :focus-visible) .button-040__icon,
  [data-hover]:is(:hover, :focus-visible) .button-040 .button-040__icon {
    rotate: 0deg;
    transition: rotate 0.735s 0.05s var(--button-040-ease-hover);
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
.button-040[data-theme='secondary'] {
  --button-040-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-040-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.