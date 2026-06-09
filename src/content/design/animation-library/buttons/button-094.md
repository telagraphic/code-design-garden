---
title: "Button 094"
description: "Button 094."
slug: "buttons/button-094"
previewVideo: "button-094.mp4"
order: 49.946
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "094"]
sourceUrl: "https://www.osmo.supply/button-pack/button-094"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/Physics2DPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomEase.min.js"></script>
```
### HTML
```text
<a data-button-094="" href="#" class="button-094">
  <span class="button-094__bg"></span>
  <span class="button-094__inner">
    <span data-button-094-text-out="" class="button-094__text">Button</span>
    <span aria-hidden="true" data-button-094-text-in="" class="button-094__text">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-094-color: #fff;
  --button-094-color-background: #FF6868;
  --button-094-color-focus: #fff;
  --button-094-overflow: clip;
  --button-094-focus-inset: -0.125em;
  --button-094-padding: 0.75em 1em;
  --button-094-border-radius: 2.5em;
  --button-094-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-094 {
  color: var(--button-094-color);
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
.button-094::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-094-focus-inset);
  border-radius: var(--button-094-border-radius);
  transition: box-shadow 0.3s var(--button-094-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-094:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-094-color-focus);
}
.button-094__bg {
  background-color: var(--button-094-color-background);
  border-radius: var(--button-094-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-094__inner {
  width: 100%;
  height: 100%;
  padding: var(--button-094-padding);
  border-radius: var(--butotn-094-border-radius);
  overflow: var(--button-094-overflow);
  grid-area: 1 / 1;
  display: grid;
}
.button-094__text {
  grid-area: 1 / 1;
}
```
### Javascript
```javascript
gsap.registerPlugin(SplitText, Physics2DPlugin, CustomEase);
CustomEase.create('button-094-ease', 'M0,0 C0.32,0.52 0.17,1 1,1');
function initButton094() {
  const buttons = document.querySelectorAll('[data-button-094]');
  if (buttons.length === 0) return;
  const mm = gsap.matchMedia();
  mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    buttons.forEach((element) => {
      const textOut = element.querySelector('[data-button-094-text-out]');
      const textIn = element.querySelector('[data-button-094-text-in]');
      if (!textOut || !textIn) return;
      const hoverRoot = element.closest('[data-hover]') || element;
      const textSplitOut = new SplitText(textOut, {
        type: 'chars',
        tag: 'span',
        charsClass: 'button-094__split-char',
      });
      const textSplitIn = new SplitText(textIn, {
        type: 'chars',
        tag: 'span',
        charsClass: 'button-094__split-char',
        aria: 'none',
      });
      gsap.set(textIn, { display: 'block' });
      gsap.set(textOut, { display: 'block' });
      gsap.set(textSplitOut.chars, {
        display: 'inline-block',
        willChange: 'transform',
      });
      gsap.set(textSplitIn.chars, {
        display: 'inline-block',
        willChange: 'transform',
        rotation: 'random(-75, 75)',
        opacity: 0,
        y: '-2em',
      });
      let tl;
      const playSequence = () => {
        if (!textSplitOut.chars?.length || !textSplitIn.chars?.length) return;
        if (tl?.isActive()) return;
        tl?.kill();
        tl = gsap.timeline({ overwrite: true });
        tl.to(
          textSplitOut.chars,
          {
            duration: 0.5,
            physics2D: {
              angle: 90,
              gravity: 650,
            },
            rotation: 'random(-75, 75)',
            ease: 'none',
            stagger: {
              amount: 0.08,
              from: 'random',
            },
          },
          'start',
        )
          .to(
            textSplitOut.chars,
            {
              opacity: 0,
              duration: 0.1,
              ease: 'power2.out',
            },
            '>-=0.2',
          )
          .to(
            textSplitIn.chars,
            {
              opacity: 1,
              duration: 0.1,
              ease: 'power2.out',
              stagger: {
                amount: 0.08,
                from: 'left',
              },
            },
            'start+=0.25',
          )
          .to(
            textSplitIn.chars,
            {
              y: '0em',
              rotation: 0,
              duration: 0.525,
              ease: 'button-094-ease',
              stagger: {
                amount: 0.08,
                from: 'left',
              },
            },
            '<',
          )
          .add(() => {
            gsap.set(textSplitOut.chars, {
              clearProps: 'transform,opacity',
            });
            gsap.set(textSplitIn.chars, {
              rotation: 'random(-75, 75)',
              opacity: 0,
              y: '-2em',
            });
          });
      };
      const onEnter = () => playSequence();
      const onFocusIn = () => {
        if (hoverRoot.matches(':focus-visible')) playSequence();
      };
      hoverRoot.addEventListener('pointerenter', onEnter);
      hoverRoot.addEventListener('focusin', onFocusIn);
      cleanups.push(() => {
        hoverRoot.removeEventListener('pointerenter', onEnter);
        hoverRoot.removeEventListener('focusin', onFocusIn);
        tl?.kill();
        tl = null;
        gsap.killTweensOf(textSplitOut.chars);
        gsap.killTweensOf(textSplitIn.chars);
        textSplitOut.revert?.();
        textSplitIn.revert?.();
        gsap.set(textIn, { display: 'none' });
        gsap.set(textOut, { display: '' });
      });
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  });
}
// Initialize Button 094
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton094();
  });
});
```
### CSS
```text
:root {
  --button-094-color: #fff;
  --button-094-color-background: #FF6868;
  --button-094-color-focus: #fff;
  --button-094-overflow: clip;
  --button-094-focus-inset: -0.125em;
  --button-094-padding: 0.75em 1em;
  --button-094-border-radius: 2.5em;
  --button-094-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-094 {
  -webkit-tap-highlight-color: transparent;
}
.button-094:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-094-color-focus);
}
.button-094::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-094-focus-inset);
  border-radius: var(--button-094-border-radius);
  transition: box-shadow 0.3s var(--button-094-ease-focus);
  pointer-events: none;
  z-index: 1;
}
```
### Implementation
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-094[data-theme='secondary'] {
  --button-094-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-094-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.