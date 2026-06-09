---
title: "Button 087"
description: "Button 087."
slug: "buttons/button-087"
previewVideo: "button-087.mp4"
order: 49.947
published: true
categories: ["button", "text", "media"]
triggers: ["scroll", "hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "087"]
sourceUrl: "https://www.osmo.supply/button-pack/button-087"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<a data-button-087="" href="#" class="button-087">
  <span class="button-087__bg"></span>
  <span class="button-087__inner">
    <span class="button-087__text is--hidden">Button</span>
    <span aria-hidden="true" class="button-087__text-wrap">
      <span class="button-087__text has--padding">Button</span>
      <span class="button-087__text has--padding">Button</span>
      <span class="button-087__text has--padding">Button</span>
      <span class="button-087__text has--padding">Button</span>
    </span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-087-color: #131313;
  --button-087-color-background: #DAC6FF;
  --button-087-color-focus: #fff;
  --button-087-border-radius: 2.5em;
  --button-087-padding: 0.75em 1em;
  --button-087-focus-inset: -0.125em;
  --button-087-ease-hover: cubic-bezier(0.78, 0.18, 0.18, 1);
  --button-087-ease-smooth: cubic-bezier(0.32, 0.72, 0, 1);
  --button-087-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-087 {
  color: var(--button-087-color);
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
.button-087::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-087-focus-inset);
  border-radius: var(--button-087-border-radius);
  transition: box-shadow 0.3s var(--button-087-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-087:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-087-color-focus);
}
.button-087__bg {
  background-color: var(--button-087-color-background);
  border-radius: var(--button-087-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-087__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-087-padding);
  z-index: 2;
  border-radius: var(--button-087-border-radius);
  grid-area: 1 / 1;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
  overflow: clip;
}
.button-087__text.is--hidden {
  opacity: 0;
}
.button-087__text.has--padding {
  padding-left: .1875em;
  padding-right: .1875em;
  translate: -100%;
}
.button-087__text-wrap {
  white-space: nowrap;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: absolute;
}
.button-087__text-wrap .button-087__text {
  animation: button-087-moving-text 2s linear infinite var(--state, paused), button-087-moving-text 1.5s infinite linear var(--state-hover, paused);
  animation-composition: add;
}
@keyframes button-087-moving-text {
  0% {
    transform: translateZ(0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-087:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-087 {
    --state-hover: running;
  }
}
@media (prefers-reduced-motion: no-preference) {
  .button-087.is--inview {
    --state: running;
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger);
function initButton087() {
  const buttons = document.querySelectorAll('[data-button-087]');
  const INVIEW_CLASS = 'is--inview';
  if (buttons.length === 0) return;
  buttons.forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => element.classList.add(INVIEW_CLASS),
      onEnterBack: () => element.classList.add(INVIEW_CLASS),
      onLeave: () => element.classList.remove(INVIEW_CLASS),
      onLeaveBack: () => element.classList.remove(INVIEW_CLASS),
    });
  });
}
// Initialize Button 087
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(() => {
    initButton087();
  });
});
```
### CSS
```text
:root {
  --button-087-color: #131313;
  --button-087-color-background: #DAC6FF;
  --button-087-color-focus: #fff;
  --button-087-border-radius: 2.5em;
  --button-087-padding: 0.75em 1em;
  --button-087-focus-inset: -0.125em;
  --button-087-ease-hover: cubic-bezier(0.78, 0.18, 0.18, 1);
  --button-087-ease-smooth: cubic-bezier(0.32, 0.72, 0, 1);
  --button-087-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-087 {
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-087:is(:hover, :focus-visible),
  [data-hover]:is(:hover, :focus-visible) .button-087 {
    --state-hover: running;
  }
}
.button-087__text-wrap .button-087__text {
  animation: button-087-moving-text 2s linear infinite var(--state, paused), button-087-moving-text 1.5s infinite linear var(--state-hover, paused);
  animation-composition: add;
}
.button-087:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-087-color-focus);
}
.button-087::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-087-focus-inset);
  border-radius: var(--button-087-border-radius);
  transition: box-shadow 0.3s var(--button-087-ease-focus);
  pointer-events: none;
  z-index: 1;
}
@media (prefers-reduced-motion: no-preference) {
  .button-087.is--inview {
    --state: running;
  }
}
@keyframes button-087-moving-text {
  0% {
    transform: translateZ(0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
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
.button-087[data-theme='secondary'] {
  --button-087-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-087-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.