---
title: "Button 071"
description: "Button 071."
slug: "buttons/button-071"
previewVideo: "button-071.mp4"
order: 49.954
published: true
categories: ["button", "text", "media"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["gsap"]
keywords: ["button", "071"]
sourceUrl: "https://www.osmo.supply/button-pack/button-071"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
```
### HTML
```text
<a data-button-071="" data-button-071-stagger-from="center" href="#" class="button-071">
  <span class="button-071__bg"></span>
  <span class="button-071__inner">
    <span data-button-071-text="" class="button-071__text is--default">Button</span>
    <span data-button-071-text="" aria-hidden="true" class="button-071__text is--hover">Button</span>
  </span>
</a>
```
### CSS
```text
:root {
  --button-071-color: #131313;
  --button-071-color-background: #fff;
  --button-071-color-focus: #000;
  --button-071-height: 2.5em;
  --button-071-border-radius: 2.5em;
  --button-071-focus-inset: -0.125em;
  --button-071-click-scale: 0.955 0.925;
  --button-071-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-071-ease-hover: cubic-bezier(0.35, 1.5, 0.6, 1);
  --button-071-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-071 {
  color: var(--button-071-color);
  -webkit-user-select: none;
  user-select: none;
  height: var(--button-071-height);
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  --button-071-speed: 0.35s;
  --button-071-stagger: 0.014s;
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-071-ease-click);
}
.button-071::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-071-focus-inset);
  border-radius: var(--button-071-border-radius);
  transition: box-shadow 0.2s var(--button-071-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-071:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-071-color-focus);
}
.button-071:active {
  scale: var(--button-071-click-scale);
}
.button-071__bg {
  background-color: var(--button-071-color-background);
  border-radius: var(--button-071-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-071__inner {
  z-index: 1;
  border-radius: var(--button-071-border-radius);
  grid-area: 1 / 1;
  padding-left: 1em;
  padding-right: 1em;
  display: grid;
  overflow: clip;
}
.button-071__text {
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
}
.button-071__text.is--default .button-071__split-char,
.button-071__text.is--hover .button-071__split-char {
  height: 100%;
}
.button-071__text.is--hover .button-071__split-char {
  transform: translate3d(0, -100%, 0);
}
.wf-editor-mode .button-071__text,
.wf-design-mode .button-071__text {
  display: flex;
  align-items: center;
}
@keyframes button-071-translate {
  0% {
    translate: 0 0 0;
  }
  100% {
    translate: 0 100% 0;
  }
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-071__text.is--default .button-071__split-char.is--animating,
  .button-071__text.is--hover .button-071__split-char.is--animating {
    animation-name: button-071-translate;
    animation-play-state: running;
    animation-iteration-count: infinite;
    animation-duration: var(--button-071-speed);
    animation-timing-function: var(--button-071-ease-hover);
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(SplitText);
function initButton071() {
  const buttons = document.querySelectorAll('[data-button-071]');
  const parseTimeToMs = (value) => {
    if (!value) return 0;
    const v = String(value).trim();
    if (v.endsWith('ms')) return parseFloat(v);
    if (v.endsWith('s')) return parseFloat(v) * 1000;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n * 1000 : 0;
  };
  const getStaggerIndex = (i, count, from) => {
    if (from === 'right') return count - 1 - i;
    if (from === 'center') {
      const center = (count - 1) / 2;
      return Math.abs(i - center);
    }
    return i;
  };
  if (buttons.length === 0) return;
  buttons.forEach((element) => {
    const hoverRoot = element.closest('[data-hover]') || element;
    const textElements = element.querySelectorAll('[data-button-071-text]');
    if (textElements.length === 0) return;
    const styles = getComputedStyle(element);
    const speedMs = parseTimeToMs(styles.getPropertyValue('--button-071-speed'));
    const staggerMs = parseTimeToMs(styles.getPropertyValue('--button-071-stagger'));
    const staggerFrom = (element.getAttribute('data-button-071-stagger-from') || 'left').toLowerCase();
    const groups = [];
    const allChars = [];
    textElements.forEach((textEl) => {
      const split = new SplitText(textEl, {
        type: 'chars',
        tag: 'span',
        charsClass: 'button-071__split-char',
      });
      groups.push(split.chars);
      allChars.push(...split.chars);
    });
    gsap.set(allChars, { display: 'inline-flex', alignItems: 'center' });
    let timers = [];
    const clearTimers = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const reset = () => {
      allChars.forEach((c) => c.classList.remove('is--animating'));
      void hoverRoot.offsetWidth;
    };
    const play = () => {
      groups.forEach((chars) => {
        const count = chars.length;
        chars.forEach((char, i) => {
          const sIndex = getStaggerIndex(i, count, staggerFrom);
          const startAt = sIndex * staggerMs;
          const endAt = startAt + speedMs;
          timers.push(
            setTimeout(() => {
              char.classList.add('is--animating');
            }, startAt),
          );
          timers.push(
            setTimeout(() => {
              char.classList.remove('is--animating');
            }, endAt),
          );
        });
      });
    };
    const onEnter = () => {
      clearTimers();
      reset();
      play();
    };
    const onFocusIn = () => {
      if (hoverRoot.matches(':focus-visible')) {
        clearTimers();
        reset();
        play();
      }
    };
    hoverRoot.addEventListener('pointerenter', onEnter);
    hoverRoot.addEventListener('focusin', onFocusIn);
  });
}
// Initialize Button 071
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton071();
  });
});
```
### CSS
```text
:root {
  --button-071-color: #131313;
  --button-071-color-background: #fff;
  --button-071-color-focus: #000;
  --button-071-height: 2.5em;
  --button-071-border-radius: 2.5em;
  --button-071-focus-inset: -0.125em;
  --button-071-click-scale: 0.955 0.925;
  --button-071-ease-click: cubic-bezier(0.4, 0, 0.2, 1);
  --button-071-ease-hover: cubic-bezier(0.35, 1.5, 0.6, 1);
  --button-071-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-071 {
  --button-071-speed: 0.35s;
  --button-071-stagger: 0.014s;
  -webkit-tap-highlight-color: transparent;
  transition: scale 0.15s var(--button-071-ease-click);
}
.button-071:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-071-color-focus);
}
.button-071:active {
  scale: var(--button-071-click-scale);
}
.button-071::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-071-focus-inset);
  border-radius: var(--button-071-border-radius);
  transition: box-shadow 0.2s var(--button-071-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-071__text.is--default .button-071__split-char,
.button-071__text.is--hover .button-071__split-char {
  height: 100%;
}
.button-071__text.is--hover .button-071__split-char {
  transform: translate3d(0, -100%, 0);
}
.wf-editor-mode .button-071__text,
.wf-design-mode .button-071__text {
  display: flex;
  align-items: center;
}
@keyframes button-071-translate {
  0% {
    translate: 0 0 0;
  }
  100% {
    translate: 0 100% 0;
  }
}
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .button-071__text.is--default .button-071__split-char.is--animating,
  .button-071__text.is--hover .button-071__split-char.is--animating {
    animation-name: button-071-translate;
    animation-play-state: running;
    animation-iteration-count: infinite;
    animation-duration: var(--button-071-speed);
    animation-timing-function: var(--button-071-ease-hover);
  }
}
```
### Implementation
#### Stagger
Use `data-button-071-stagger-from` to define where the character animation starts, with supported values `left`, `center`, and `right`.
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-071[data-theme='secondary'] {
  --button-071-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-071-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.