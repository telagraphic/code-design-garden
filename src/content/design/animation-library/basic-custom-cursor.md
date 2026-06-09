---
title: "Basic Custom Cursor"
description: "Basic Custom Cursor."
slug: "basic-custom-cursor"
previewVideo: "basic-custom-cursor.mp4"
order: 49.995
published: true
categories: ["button", "cursor"]
triggers: ["hover", "load", "mouse-move"]
libraries: ["gsap"]
keywords: ["basic", "custom", "cursor"]
sourceUrl: "https://www.osmo.supply/resource/basic-custom-cursor"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
```
### HTML
```text
<div class="cursor"></div>
```
### CSS
```text
.cursor {
  z-index: 100;
  background-color: #ff4c24;
  border: 1px solid #ff4c24;
  border-radius: 100em;
  width: 1em;
  height: 1em;
  transition: background-color .375s cubic-bezier(.625, .05, 0, 1), height .375s cubic-bezier(.625, .05, 0, 1), width .375s cubic-bezier(.625, .05, 0, 1);
  position: fixed;
  inset: 0% auto auto 0%;
  pointer-events: none;
}
body:has( a:hover) .cursor,
body:has( button:hover) .cursor,
body:has( [data-cursor]:hover) .cursor{
  width: 3em;
  height: 3em;
  background-color: rgba(255, 76, 36, 0.3);
}
@media (hover: none) and (pointer: coarse) {
  .cursor {
    display: none;
  }
}
```
### Javascript
```javascript
function initBasicCustomCursor() {  
  gsap.set(".cursor", {xPercent:-50, yPercent: -50});
  let xTo = gsap.quickTo(".cursor", "x", {duration: 0.6, ease: "power3"});
  let yTo = gsap.quickTo(".cursor", "y", {duration: 0.6, ease: "power3"});
  window.addEventListener("mousemove", e => {
    xTo(e.clientX);
    yTo(e.clientY);
  });
}
// Initialize Basic Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
  initBasicCustomCursor();
});
```
### Javascript
```text
body:has( a:hover) .cursor,
body:has( button:hover) .cursor,
body:has( [data-cursor]:hover) .cursor{
  width: 3em;
  height: 3em;
  background-color: rgba(255, 76, 36, 0.3);
}
@media (hover: none) and (pointer: coarse) {
  .cursor {
    display: none;
  }
}
```
### Implementation
A lightweight custom cursor built with GSAP. It follows the mouse smoothly and scales up when hovering interactive elements like links or buttons.
#### HTML Setup
Add a div somewhere on your page, give it a class of `.cursor` and make sure it has `position: fixed` and has `top` and `left` set to 0. Also make sure the cursor has `pointer-events: none` so it doesn’t block interactions.
#### Hover targets
The hover state is automatically triggered by any link block or button.
You can also manually trigger it by adding a `[data-cursor]` attribute to any element. It's perfect for custom interactive components or images that should respond to hover.
#### Cursor smoothness
The smooth movement is powered by GSAP’s `.quickTo()` method, which interpolates the cursor’s `x` and `y` positions each frame.
You can adjust the `duration` and `ease` inside the script to tweak how “snappy” or “buttery” the cursor feels.