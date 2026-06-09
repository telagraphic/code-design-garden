---
title: "Cursor Coordinates"
description: "Cursor Coordinates."
slug: "cursor-coordinates"
previewVideo: "cursor-coordinates.mp4"
order: 49.937
published: true
categories: ["cursor", "text"]
triggers: ["load", "mouse-move"]
libraries: ["vanilla-js"]
keywords: ["cursor", "coordinates"]
sourceUrl: "https://www.osmo.supply/resource/cursor-coordinates"
---
## Setup
# Step 1: Add HTML
### HTML
```html
<div class="coordinates__inner" data-coordinates-wrap>
  <p class="coordinates__p">X:<span data-coordinates-x>0</span>px</p>
  <p class="coordinates__p">Y:<span data-coordinates-y>0</span>px</p>
</div>
```
# Step 2: Add CSS
### CSS
```css
.coordinates__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.coordinates__p {
  font-family: "Haffer Mono", monospace;
  font-size: 1em;
  line-height: 1.25;
  text-transform: uppercase;
}
```
# Step 3: Add Javascript
### Javascript
```javascript
function initCursorCoordinates() {
  const xEl = document.querySelector('[data-coordinates-x]');
  const yEl = document.querySelector('[data-coordinates-y]');
  if (!xEl || !yEl) return;
  document.addEventListener('mousemove', (event) => {
    xEl.textContent = Math.round(event.pageX);
    yEl.textContent = Math.round(event.pageY);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initCursorCoordinates();
});
```
### Implementation
#### Display coordinates
The function looks for two elements on the page:
- One with the attribute `[data-coordinates-x]`
- One with the attribute `[data-coordinates-y]`
As you move your cursor across the page, the current X and Y positions will be displayed as text inside those elements.
#### Quick tip
For best visual alignment, use a monospace typeface so all characters have equal width.
#### Coordinates follow cursor
If you check the website we listed as ' [original source](https://orage.studio/) ' here in the Vault, you see they make these coordinates stick to your actual mouse position, to really sell the effect. This can be easily achieved by combining this resource with the [Basic Custom Cursor](https://www.osmo.supply/resource/basic-custom-cursor)!