---
title: "Button 069"
description: "Button 069."
slug: "buttons/button-069"
previewVideo: "button-069.mp4"
order: 49.955
published: true
categories: ["button", "filter", "text"]
triggers: ["hover", "click", "mouse-move"]
libraries: ["vanilla-js"]
keywords: ["button", "069"]
sourceUrl: "https://www.osmo.supply/button-pack/button-069"
---
## Setup
### HTML
```text
<a data-button-069="" href="#" class="button-069">
  <span class="button-069__bg"></span>
  <span data-button-069-text="" class="button-069__text">Button</span>
</a>
```
### CSS
```text
:root {
  --button-069-color: #131313;
  --button-069-color-background: #fff;
  --button-069-color-focus: #fff;
  --button-069-padding: 0.75em 1em;
  --button-069-border-radius: 2.5em;
  --button-069-focus-inset: -0.125em;
  --button-069-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-069 {
  -webkit-user-select: none;
  user-select: none;
  color: var(--button-069-color);
  background-color: #0000;
  outline-style: none;
  padding: 0;
  line-height: 1;
  text-decoration: none;
  display: inline-grid;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.button-069::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-069-focus-inset);
  border-radius: var(--button-069-border-radius);
  transition: box-shadow 0.3s var(--button-069-ease-focus);
  pointer-events: none;
  z-index: 1;
}
.button-069:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-069-color-focus);
}
.button-069__bg {
  background-color: var(--button-069-color-background);
  border-radius: var(--button-069-border-radius);
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  padding: 0;
}
.button-069__text {
  width: 100%;
  height: 100%;
  padding: var(--button-069-padding);
  font-kerning: none;
  grid-area: 1 / 1;
}
```
### Javascript
```javascript
function initButton069() {
  const buttons = document.querySelectorAll('[data-button-069]');
  if (!buttons.length) return;
  const rotateRight = (s) => (s && s.length > 1 ? s.slice(-1) + s.slice(0, -1) : s);
  function tokenize(text) {
    const parts = text.match(/\S+|\s+/g) || [];
    return parts.map((p) => {
      if (/^\s+$/.test(p)) return { type: 'raw', raw: p };
      const m = p.match(/^([\p{L}'’]+)(.*)$/u);
      if (!m) return { type: 'raw', raw: p };
      return { type: 'word', letters: m[1], trailing: m[2] || '' };
    });
  }
  const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (!mq.matches) return;
  buttons.forEach((element) => {
    const hoverRoot = element.closest('[data-hover]') || element;
    const textEl = element.querySelector('[data-button-069-text]') ?? element;
    const speed = Number(element.getAttribute('data-button-069-speed')) || 46;
    let timer = null;
    let original = '';
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
      if (original) textEl.textContent = original;
    };
    const start = () => {
      stop();
      original = textEl.textContent;
      const tokens = tokenize(original);
      const wordTokens = tokens.filter((t) => t.type === 'word');
      if (!wordTokens.length) return;
      const maxLen = wordTokens.reduce((m, t) => Math.max(m, t.letters.length), 0);
      let tick = 0;
      timer = setInterval(() => {
        for (const t of wordTokens) t.letters = rotateRight(t.letters);
        textEl.textContent = tokens.map((t) => (t.type === 'word' ? t.letters + t.trailing : t.raw)).join('');
        if (++tick >= maxLen) stop();
      }, speed);
    };
    const onEnter = () => start();
    const onLeave = () => {
      if (hoverRoot.matches(':focus-visible')) return;
      stop();
    };
    const onFocusIn = () => {
      if (hoverRoot.matches(':focus-visible')) start();
    };
    const onFocusOut = () => {
      if (hoverRoot.matches(':hover')) return;
      stop();
    };
    hoverRoot.addEventListener('pointerenter', onEnter);
    hoverRoot.addEventListener('pointerleave', onLeave);
    hoverRoot.addEventListener('focusin', onFocusIn);
    hoverRoot.addEventListener('focusout', onFocusOut);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(function () {
    initButton069();
  });
});
```
### CSS
```text
:root {
  --button-069-color: #131313;
  --button-069-color-background: #fff;
  --button-069-color-focus: #fff;
  --button-069-padding: 0.75em 1em;
  --button-069-border-radius: 2.5em;
  --button-069-focus-inset: -0.125em;
  --button-069-ease-focus: cubic-bezier(0.32, 0.72, 0, 1);
}
.button-069 {
  -webkit-tap-highlight-color: transparent;
}
.button-069:is(:focus-visible)::after {
  box-shadow: 0 0 0 0.125em var(--button-069-color-focus);
}
.button-069::after {
  content: '';
  display: block;
  position: absolute;
  inset: var(--button-069-focus-inset);
  border-radius: var(--button-069-border-radius);
  transition: box-shadow 0.3s var(--button-069-ease-focus);
  pointer-events: none;
  z-index: 1;
}
```
### Implementation
#### Speed
Use `data-button-069-speed` to control the interval speed of the text shuffle animation in milliseconds, where lower values like `24` create a faster animation and higher values like `80` create a slower animation.
#### CSS Variables
Use the `:root` selector to define global button variables like colors, spacing, border radius, easing, or animation settings.
#### Button Variants (Scoped Variables)
Use custom properties directly on a button element or a parent wrapper to override styles or animation settings for specific button instances without affecting other buttons.
### CSS
```text
.button-069[data-theme='secondary'] {
  --button-069-background: #6840FF;
}
```
#### Hover Parent
Use `[data-hover]` on a parent element when the button hover animation should be triggered from that parent instead of only from the button itself.
#### Accessibility
Buttons include built-in keyboard focus states using `:focus-visible` to maintain accessibility for keyboard navigation, so make sure `--button-069-color-focus` always has enough contrast against the surrounding background.
#### Reduced Motion
Buttons automatically respect the user's `prefers-reduced-motion` setting and reduce or disable motion-heavy effects where needed.
#### Video Walkthrough
Check out [this video tutorial](https://www.osmo.supply/resource/button-pack-walkthrough) in which Ilja explains how the buttons are structured, how to customize them, and how he creates multiple variants in Webflow using a component.