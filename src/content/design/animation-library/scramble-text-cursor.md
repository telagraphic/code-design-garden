---
title: "Scramble Text Cursor"
description: "Scramble Text Cursor."
slug: "scramble-text-cursor"
previewVideo: "scramble-text-cursor.mp4"
order: 49.856
published: true
categories: ["cursor", "text", "media"]
triggers: ["hover", "mouse-move"]
libraries: ["gsap"]
keywords: ["scramble", "text", "cursor"]
sourceUrl: "https://www.osmo.supply/resource/scramble-text-cursor"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrambleTextPlugin.min.js"></script>
```
### HTML
```text
<div data-cursor="" class="cursor">
  <div class="cursor-scramble">
    <span data-cursor-text-target="" class="cursor-scramble__text">Cursor Text</span>
  </div>
</div>
```
### CSS
```text
.cursor {
  z-index: 25;
  pointer-events: none;
  padding-top: 1em;
  padding-left: .5em;
  padding-right: 1em;
  position: fixed;
  top: 0;
  left: 0;
}
.cursor-scramble {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  opacity: 0;
  color: #fff;
  background-color: #000;
  border-radius: .25em;
  justify-content: center;
  align-items: center;
  height: 2em;
  padding-left: .75em;
  padding-right: .75em;
  display: flex;
  position: relative;
}
.cursor-scramble__text {
  letter-spacing: -.01em;
  white-space: nowrap;
  font-size: .875em;
  font-weight: 500;
}
.cursor-scramble__chevron {
  color: #a1ff62;
  width: .375em;
}
@media (hover: hover) and (pointer: fine) {
  [data-cursor] .cursor-scramble {
    transition: transform 0.4s cubic-bezier(0.625, 0.05, 0, 1), opacity 0.2s ease 0.1s;
    transform: translateX(0%) scale(1) rotate(0.001deg);
  }
  [data-cursor="active"] .cursor-scramble {
    transition: transform 0.4s cubic-bezier(0.625, 0.05, 0, 1), opacity 0.2s ease 0s;
    opacity: 1; 
    transform: translateX(0%) scale(1) rotate(0.001deg);
  }
  [data-cursor="active-edge"] .cursor-scramble {
    transition: transform 0.4s cubic-bezier(0.625, 0.05, 0, 1), opacity 0.2s ease 0s;
    opacity: 1; 
    transform: translateX(-100%) scale(1) rotate(0.001deg);
  }
}
@media (hover: none) and (pointer: coarse) {
  .cursor {
    display: none;
  }
}
```
### Javascript
```javascript
function initScrambleTextCursor() {
  const cursor = document.querySelector("[data-cursor]");
  const cursorTextTarget = document.querySelector("[data-cursor-text-target]");
  if (!cursor || !cursorTextTarget || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  let mouseX = 0;
  let mouseY = 0;
  let hasMouseMoved = false;
  let activeHoverItem = null;
  const scrambleCharacters = "XYZxy#&@0$€£";
  const xTo = gsap.quickTo(cursor, "x", {duration: 0.4, ease: "power3.out"});
  const yTo = gsap.quickTo(cursor, "y", {duration: 0.4, ease: "power3.out"});
  function updateCursor() {
    const hoverItem = document.elementFromPoint(mouseX, mouseY)?.closest("[data-cursor-hover]");
    const rect = cursor.getBoundingClientRect();
    const isHovering = !!hoverItem;
    const isEdge = rect.right >= window.innerWidth;
    const text = hoverItem?.getAttribute("data-cursor-text") || "";
    cursor.setAttribute("data-cursor", isHovering ? (isEdge ? "active-edge" : "active") : "");
    if (hoverItem !== activeHoverItem) {
      gsap.to(cursorTextTarget, {
        duration: 0.6,
        overwrite: "auto",
        scrambleText: {
          text: text,
          chars: scrambleCharacters,
          speed: 1.2
        }
      });
      activeHoverItem = hoverItem;
    }
  }
  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    hasMouseMoved = true;
    xTo(mouseX);
    yTo(mouseY);
    requestAnimationFrame(updateCursor);
  });
  window.addEventListener("scroll", () => {
    if (!hasMouseMoved) return;
    requestAnimationFrame(updateCursor);
  }, { passive: true });
}
// Initialize Scramble Text Cursor 
document.addEventListener("DOMContentLoaded", () => {
  initScrambleTextCursor();
});
```
### CSS
```text
@media (hover: hover) and (pointer: fine) {
  [data-cursor] .cursor-scramble {
    transition: transform 0.4s cubic-bezier(0.625, 0.05, 0, 1), opacity 0.2s ease 0.1s;
    transform: translateX(0%) scale(1) rotate(0.001deg);
  }
  [data-cursor="active"] .cursor-scramble {
    transition: transform 0.4s cubic-bezier(0.625, 0.05, 0, 1), opacity 0.2s ease 0s;
    opacity: 1; 
    transform: translateX(0%) scale(1) rotate(0.001deg);
  }
  [data-cursor="active-edge"] .cursor-scramble {
    transition: transform 0.4s cubic-bezier(0.625, 0.05, 0, 1), opacity 0.2s ease 0s;
    opacity: 1; 
    transform: translateX(-100%) scale(1) rotate(0.001deg);
  }
}
@media (hover: none) and (pointer: coarse) {
  .cursor {
    display: none;
  }
}
```
### Implementation
#### Cursor
Use `[data-cursor]` on the custom cursor element that follows the mouse and switches state when hovering matching items.
#### Text Target
Use `[data-cursor-text-target]` on the text element inside the cursor that should update with the current hover label.
#### Hover
Use `[data-cursor-hover]` on any element that should activate the custom cursor when the mouse is over it.
#### Hover Text
In combination with `[data-cursor-hover]` you can use `[data-cursor-text]` to define the text that gets injected into the cursor while that item is active.
Example:
### HTML
```text
<a data-cursor-hover data-cursor-text="Open project"></a>
<a data-cursor-hover data-cursor-text="View details"></a>
```
#### Edge Behaviour
The padding on the `[data-cursor]` element will control when the cursor flips between `active` and `active-edge`, allowing you to define how close to the right edge the switch should happen.
The script automatically adds `[data-cursor="active"]` when the cursor is over a matching item and switches to `[data-cursor="active-edge"]` when the cursor reaches the defined edge threshold.