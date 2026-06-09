---
title: "Cursor with Marquee Effect"
description: "Cursor with Marquee Effect."
slug: "cursor-marquee-effect"
previewVideo: "cursor-marquee-effect.mp4"
order: 49.936
published: true
categories: ["cursor", "image-carousel", "layout"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["cursor", "marquee", "effect"]
sourceUrl: "https://www.osmo.supply/resource/cursor-with-marquee-effect"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
```
### HTML
```text
<div data-cursor-marquee-status="" class="cursor-marquee">
  <div class="cursor-marquee__card">
    <span data-cursor-marquee-text-target="" class="cursor-marquee__text-span">Hello world</span>
    <span data-cursor-marquee-text-target="" class="cursor-marquee__text-span is--duplicate">Hello world</span>
  </div>
</div>
```
### CSS
```text
.cursor-marquee {
  z-index: 100;
  pointer-events: none;
  justify-content: center;
  align-items: center;
  display: flex;
  position: fixed;
  transform: translate(-50%, -50%);
}
.cursor-marquee__card {
  color: #000;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(.75, 0, .25, 1);
  transform: translateY(0%) rotate(0.001deg);
  clip-path: inset(calc(50% - 0.25em) round 50em);
  will-change: clip-path;
  opacity: 0;
}
[data-cursor-marquee-status="active"] .cursor-marquee__card {
  clip-path: inset(0 round 50em);
  transform: translateY(-25%) rotate(0.001deg);
}
/* Show cursor dot when script loaded */
[data-cursor-marquee-status="not-active"] .cursor-marquee__card,
[data-cursor-marquee-status="active"] .cursor-marquee__card{
  opacity: 1;
}
/* CSS Keyframe Animation */
@keyframes translateXCursor { 
  to {
    transform: translateX(-100%);
  }
}
.cursor-marquee__text-span {
  white-space: nowrap;
  transform-origin: 0;
  padding: .5em;
  font-size: 1.5em;
  line-height: 1;
  display: block;
  position: relative;
}
.cursor-marquee__text-span {
  animation: translateXCursor 10s linear infinite paused;
  transition: opacity 0.15s ease-in-out 0.25s;
  opacity: 0;
}
[data-cursor-marquee-status="active"] .cursor-marquee__text-span {
  transition: opacity 0.15s ease-in-out 0s;
  opacity: 1;
}
.cursor-marquee__text-span.is--duplicate {
  position: absolute;
  left: 100%;
}
```
### Javascript
```javascript
function initCursorMarqueeEffect() {
  const hoverOutDelay = 0.4;
  const followDuration = 0.4;
  const speedMultiplier = 5;
  const cursor = document.querySelector('[data-cursor-marquee-status]');
  if (!cursor) return;
  const targets = cursor.querySelectorAll('[data-cursor-marquee-text-target]');
  const xTo = gsap.quickTo(cursor, 'x', { duration: followDuration, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: followDuration, ease: 'power3' });
  let pauseTimeout = null;
  let activeEl = null;
  let lastX = 0;
  let lastY = 0;
  function playFor(el) {
    if (!el) return;
    if (pauseTimeout) clearTimeout(pauseTimeout);
    const text = el.getAttribute('data-cursor-marquee-text') || '';
    const sec = (text.length || 1) / speedMultiplier;
    targets.forEach(t => {
      t.textContent = text;
      t.style.animationPlayState = 'running';
      t.style.animationDuration = sec + 's';
    });
    cursor.setAttribute('data-cursor-marquee-status', 'active');
    activeEl = el;
  }
  function pauseLater() {
    cursor.setAttribute('data-cursor-marquee-status', 'not-active');
    if (pauseTimeout) clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      targets.forEach(t => {
        t.style.animationPlayState = 'paused';
      });
    }, hoverOutDelay * 1000);
    activeEl = null;
  }
  function checkTarget() {
    const el = document.elementFromPoint(lastX, lastY);
    const hit = el && el.closest('[data-cursor-marquee-text]');
    if (hit !== activeEl) {
      if (activeEl) pauseLater();
      if (hit) playFor(hit);
    }
  }
  window.addEventListener('pointermove', e => {
    lastX = e.clientX;
    lastY = e.clientY;
    xTo(lastX);
    yTo(lastY);
    checkTarget();
  }, { passive: true });
  window.addEventListener('scroll', () => {
    xTo(lastX);
    yTo(lastY);
    checkTarget();
  }, { passive: true });
  setTimeout(() => {
    cursor.setAttribute('data-cursor-marquee-status', 'not-active');
  }, 500);
}
// Initialize Cursor with Marquee Effect
document.addEventListener('DOMContentLoaded', function() {
  initCursorMarqueeEffect();
});
```
### CSS
```text
.cursor-marquee__card {
  transition: all 0.4s cubic-bezier(.75, 0, .25, 1);
  transform: translateY(0%) rotate(0.001deg);
  clip-path: inset(calc(50% - 0.25em) round 50em);
  will-change: clip-path;
  opacity: 0;
}
[data-cursor-marquee-status="active"] .cursor-marquee__card {
  clip-path: inset(0 round 50em);
  transform: translateY(-25%) rotate(0.001deg);
}
/* Show cursor dot when script loaded */
[data-cursor-marquee-status="not-active"] .cursor-marquee__card,
[data-cursor-marquee-status="active"] .cursor-marquee__card{
  opacity: 1;
}
/* CSS Keyframe Animation */
@keyframes translateXCursor { 
  to {
    transform: translateX(-100%);
  }
}
.cursor-marquee__text-span {
  animation: translateXCursor 10s linear infinite paused;
  transition: opacity 0.15s ease-in-out 0.25s;
  opacity: 0;
}
[data-cursor-marquee-status="active"] .cursor-marquee__text-span {
  transition: opacity 0.15s ease-in-out 0s;
  opacity: 1;
}
```
### Implementation
#### Cursor & status
Use `[data-cursor-marquee-status]` as the cursor element that follows the mouse. It switches between "active" when hovering and "not-active" when idle.
#### Hover elements
Mark any element with `[data-cursor-marquee-text="Your text"]` to provide the string that will be injected into the cursor on hover.
### HTML
```text
<a data-cursor-marquee-text="Hello, we are Osmo">Hover me</a>
```
#### Hover targets
Elements inside the cursor with attribute `[data-cursor-marquee-text-target]` will receive the hovered text and have their animation state and duration updated inline.  
#### Pausing animation when not hovering
When leaving a trigger, the script sets `[data-cursor-marquee-status="not-active"]` immediately and waits for the hover-out delay before applying `animation-play-state: paused` to `[data-cursor-marquee-text-target]`.  
#### Variables
- `hoverOutDelay` → delay in seconds before pausing the marquee after leaving a trigger.
- `followDuration` → duration in seconds of how smoothly the cursor follows the pointer.
- `speedMultiplier` → controls marquee speed; higher values divide the duration, making it faster.