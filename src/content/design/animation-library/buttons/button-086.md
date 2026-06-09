---
title: "Button 086"
description: "Button 086."
slug: "buttons/button-086"
previewVideo: "button-086.mp4"
order: 49.948
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "086"]
sourceUrl: "https://www.osmo.supply/button-pack/button-086"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomEase.min.js"></script>
```
### HTML
```text
<a data-button-086="" href="#" class="button-086">
  <span class="button-086__bg"></span>
  <span data-button-042-inner="" class="button-086__inner">
    <span data-button-086-text="" class="button-086__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-086-color: #131313;
  --button-086-color-background: #fff;
  --button-086-color-focus: #fff;
  --button-086-padding: 0.75em 1em;
  --button-086-border-radius: 2.5em;
  --button-086-focus-inset: -0.125em;
  --button-086-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-086 {
  color: var(--button-086-color);
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
.button-086::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-086-focus-inset);
  border-radius: var(--button-086-border-radius);
  transition: box-shadow 0.3s var(--button-086-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-086:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-086-color-focus);
}
.button-086__bg {
  border-radius: var(--button-086-border-radius);
  background-color: var(--button-086-color-background);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-086__inner {
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding: var(--button-086-padding);
  z-index: 1;
  border-radius: var(--button-086-border-radius);
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: clip;
}
.button-086__text {
  display: grid;
}
.button-086__layer {
  grid-area: 1 / 1;
}
.button-086__split-char {
  background-color: var(--button-086-color-background);
}
```
### Javascript
```javascript
gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create('button-086-ease', '0.32, 0.72, 0, 1');
function initButton086() {
  const buttons = document.querySelectorAll('[data-button-086]');
  if (buttons.length === 0) return;
  let mm = gsap.matchMedia();
  buttons.forEach((element) => {
    const text = element.querySelector('[data-button-086-text]');
    if (!text) return;
    const hoverRoot = element.closest('[data-hover]') || element;
    const original = text.textContent.trim();
    text.textContent = '';
    const totalLayers = 6;
    const layers = Array.from({ length: totalLayers }, (_, i) => {
      const layer = document.createElement('span');
      layer.className = 'button-086__layer';
      layer.textContent = original;
      if (i !== totalLayers - 1) {
        layer.setAttribute('aria-hidden', 'true');
      }
      text.appendChild(layer);
      return layer;
    });
    const splits = layers.map((layer) =>
      new SplitText(layer, {
        type: 'chars',
        tag: 'span',
        charsClass: 'button-086__split-char',
      })
    );
    const charsByLayer = splits.map((s) => s.chars);
    const allChars = charsByLayer.flat();
    gsap.set(allChars, { display: 'inline-block', willChange: 'transform' });
    gsap.set(charsByLayer[0], { y: '2em' });
    gsap.set(charsByLayer[1], { y: '2em' });
    gsap.set(charsByLayer[2], { y: '2em' });
    const onEnter = () => {
      gsap.killTweensOf(allChars);
      gsap.to(charsByLayer[0], { y: '0em', duration: 0.65, ease: 'button-086-ease', stagger: { each: 0.024, from: 'random' }, delay: 0.05 });
      gsap.to(charsByLayer[1], { y: '0em', duration: 0.65, ease: 'button-086-ease', stagger: { each: 0.024, from: 'random' }, delay: 0.15 });
      gsap.to(charsByLayer[2], { y: '0em', duration: 0.65, ease: 'button-086-ease', stagger: { each: 0.024, from: 'random' }, delay: 0.25 });
      gsap.to(charsByLayer[3], { y: '-2em', duration: 0.65, ease: 'button-086-ease', stagger: { each: 0.024, from: 'random' }, delay: 0.25 });
      gsap.to(charsByLayer[4], { y: '-2em', duration: 0.65, ease: 'button-086-ease', stagger: { each: 0.024, from: 'random' }, delay: 0.15 });
      gsap.to(charsByLayer[5], { y: '-2em', duration: 0.65, ease: 'button-086-ease', stagger: { each: 0.024, from: 'random' }, delay: 0.05 });
    };
    const onLeave = () => {
      gsap.killTweensOf(allChars);
      gsap.to(charsByLayer[0], { y: '2em', duration: 0.55, ease: 'button-086-ease', stagger: { each: 0.018, from: 'random' }, delay: 0.15 });
      gsap.to(charsByLayer[1], { y: '2em', duration: 0.55, ease: 'button-086-ease', stagger: { each: 0.018, from: 'random' }, delay: 0.075 });
      gsap.to(charsByLayer[2], { y: '2em', duration: 0.55, ease: 'button-086-ease', stagger: { each: 0.018, from: 'random' }, delay: 0 });
      gsap.to(charsByLayer[3], { y: '0em', duration: 0.55, ease: 'button-086-ease', stagger: { each: 0.021, from: 'random' }, delay: 0 });
      gsap.to(charsByLayer[4], { y: '0em', duration: 0.55, ease: 'button-086-ease', stagger: { each: 0.021, from: 'random' }, delay: 0.075 });
      gsap.to(charsByLayer[5], { y: '0em', duration: 0.55, ease: 'button-086-ease', stagger: { each: 0.021, from: 'random' }, delay: 0.15 });
    };
    const onFocusIn = () => {
      if (hoverRoot.matches(':focus-visible')) onEnter();
    };
    const onFocusOut = () => {
      onLeave();
    };
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      hoverRoot.addEventListener('pointerenter', onEnter);
      hoverRoot.addEventListener('pointerleave', onLeave);
      hoverRoot.addEventListener('focusin', onFocusIn);
      hoverRoot.addEventListener('focusout', onFocusOut);
      return () => {
        hoverRoot.removeEventListener('pointerenter', onEnter);
        hoverRoot.removeEventListener('pointerleave', onLeave);
        hoverRoot.removeEventListener('focusin', onFocusIn);
        hoverRoot.removeEventListener('focusout', onFocusOut);
      };
    });
  });
}
// Initialize Button 087
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton086();
  });
});
```
### CSS
```text
:root {
  --button-086-color: #131313;
  --button-086-color-background: #fff;
  --button-086-color-focus: #fff;
  --button-086-padding: 0.75em 1em;
  --button-086-border-radius: 2.5em;
  --button-086-focus-inset: -0.125em;
  --button-086-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-086 {
  -webkit-tap-highlight-color: transparent;
}
.button-086:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-086-color-focus);
}
.button-086::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-086-focus-inset);
  border-radius: var(--button-086-border-radius);
  transition: box-shadow 0.3s var(--button-086-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-086__layer {
  grid-area: 1 / 1;
}
.button-086__split-char {
  background-color: var(--button-086-color-background);
}
```
### Implementation
#### Background Color
Use `--button-086-color-background` to match the background color behind your link when using this effect on a link element, so the layered character animation blends seamlessly into the surrounding background.
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-086[data-theme='secondary'] {
  --button-086-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-086-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.