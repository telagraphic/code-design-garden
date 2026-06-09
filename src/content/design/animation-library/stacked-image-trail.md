---
title: "Stacking Image Trail"
description: "Stacking Image Trail."
slug: "stacked-image-trail"
previewVideo: "stacked-image-trail.mp4"
order: 49.845
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["stacking", "image", "trail", "stacked"]
sourceUrl: "https://www.osmo.supply/resource/stacking-image-trail"
---
## Setup
### HTML
```text
<div data-stacked-trail-area="" class="stacked-image-trail">
  <div class="stacked-image-trail__collection">
    <div class="stacked-image-trail__list">
      <div data-stacked-trail-item="" class="stacked-image-trail__item">
        <div class="stacked-image-trail__card"></div>
      </div>
      <div data-stacked-trail-item="" class="stacked-image-trail__item">
        <div class="stacked-image-trail__card"></div>
      </div>
      <div data-stacked-trail-item="" class="stacked-image-trail__item">
        <div class="stacked-image-trail__card"></div>
      </div>
      <div data-stacked-trail-item="" class="stacked-image-trail__item">
        <div class="stacked-image-trail__card"></div>
      </div>
      <div data-stacked-trail-item="" class="stacked-image-trail__item">
        <div class="stacked-image-trail__card"></div>
      </div>
    </div>
  </div>
</div>
```
### CSS
```text
.stacked-image-trail {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
}
.stacked-image-trail__collection {
  pointer-events: none;
  width: 100%;
  height: 100%;
}
.stacked-image-trail__list {
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
}
.stacked-image-trail__item {
  z-index: 10;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  position: absolute;
  top: 50%;
  left: 50%;
}
[data-stacked-trail-item] {
  transform: translate(-50%, -50%) rotate(0.001deg) scale(0.5);
  transition: transform 0.8s cubic-bezier(0.87, 0, 0.13, 1), clip-path 0.8s cubic-bezier(0.87, 0, 0.13, 1);
  clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
}
[data-stacked-trail-area="hover"] [data-stacked-trail-item] {
  transform: translate(-50%, -50%) rotate(0.001deg) scale(1);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}
.stacked-image-trail__card {
  aspect-ratio: 3 / 4;
  width: 15vw;
  position: relative;
}
.stacked-image-trail__card-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
```
### Javascript
```javascript
function initStackedImageTrail() {
  var areas = Array.from(document.querySelectorAll("[data-stacked-trail-area]"));
  if (!areas.length) return;
  var leadEase = 0.25;
  var trailEase = 0.16;
  var pathFollow = 1;
  var instances = [];
  areas.forEach(function (area) {
    var cards = Array.from(area.querySelectorAll("[data-stacked-trail-item]"));
    if (!cards.length) return;
    var mouseX = 50;
    var mouseY = 50;
    var lastClientX = null;
    var lastClientY = null;
    var isHovering = false;
    var states = cards.map(function (card, index) {
      card.style.zIndex = cards.length - index;
      return {
        el: card,
        x: 50,
        y: 50
      };
    });
    function getPercentFromClient(clientX, clientY) {
      var rect = area.getBoundingClientRect();
      var x = ((clientX - rect.left) / rect.width) * 100;
      var y = ((clientY - rect.top) / rect.height) * 100;
      if (x < 0) x = 0;
      if (x > 100) x = 100;
      if (y < 0) y = 0;
      if (y > 100) y = 100;
      return { x: x, y: y };
    }
    function updateFromPointer() {
      if (lastClientX === null || lastClientY === null) return;
      var rect = area.getBoundingClientRect();
      var inside =
        lastClientX >= rect.left &&
        lastClientX <= rect.right &&
        lastClientY >= rect.top &&
        lastClientY <= rect.bottom;
      if (inside && !isHovering) {
        isHovering = true;
        area.setAttribute("data-stacked-trail-area", "hover");
      } else if (!inside && isHovering) {
        isHovering = false;
        area.setAttribute("data-stacked-trail-area", "");
      }
      if (!inside) return;
      var pos = getPercentFromClient(lastClientX, lastClientY);
      mouseX = pos.x;
      mouseY = pos.y;
    }
    function handleDocumentMouseMove(evt) {
      lastClientX = evt.clientX;
      lastClientY = evt.clientY;
      updateFromPointer();
    }
    function handleScroll() {
      updateFromPointer();
    }
    document.addEventListener("mousemove", handleDocumentMouseMove);
    window.addEventListener("scroll", handleScroll);
    if (area.matches(":hover")) {
      isHovering = true;
      area.setAttribute("data-stacked-trail-area", "hover");
    }
    function step() {
      states.forEach(function (state, index) {
        var targetX;
        var targetY;
        if (index === 0) {
          targetX = mouseX;
          targetY = mouseY;
        } else {
          var prev = states[index - 1];
          var followX = prev.x;
          var followY = prev.y;
          targetX = followX * pathFollow + mouseX * (1 - pathFollow);
          targetY = followY * pathFollow + mouseY * (1 - pathFollow);
        }
        var ease = index === 0 ? leadEase : trailEase;
        state.x += (targetX - state.x) * ease;
        state.y += (targetY - state.y) * ease;
        state.el.style.left = state.x + "%";
        state.el.style.top = state.y + "%";
      });
    }
    instances.push({
      step: step
    });
  });
  if (!instances.length) return;
  function animate() {
    instances.forEach(function (instance) {
      instance.step();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
// Initialize Stacked Image Trail
document.addEventListener("DOMContentLoaded", function () {
  initStackedImageTrail();
});
```
### CSS
```text
[data-stacked-trail-item] {
  transform: translate(-50%, -50%) rotate(0.001deg) scale(0.5);
  transition: transform 0.8s cubic-bezier(0.87, 0, 0.13, 1), clip-path 0.8s cubic-bezier(0.87, 0, 0.13, 1);
  clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
}
[data-stacked-trail-area="hover"] [data-stacked-trail-item] {
  transform: translate(-50%, -50%) rotate(0.001deg) scale(1);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}
/* Optional: Stack in Webflow Designer */
:is(.wf-design-mode, .wf-editor) [data-stacked-trail-item] {
  transform: translate(-50%, -50%) rotate(0.001deg) scale(1);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}
:is(.wf-design-mode, .wf-editor) [data-stacked-trail-item]:nth-child(5) {
  transform: translate(0%, -30%) rotate(0.001deg) scale(1);
  z-index: 1;
}
:is(.wf-design-mode, .wf-editor) [data-stacked-trail-item]:nth-child(4) {
  transform: translate(-25%, -40%) rotate(0.001deg) scale(1);
  z-index: 2;
}
:is(.wf-design-mode, .wf-editor) [data-stacked-trail-item]:nth-child(3) {
  z-index: 3;
}
:is(.wf-design-mode, .wf-editor) [data-stacked-trail-item]:nth-child(2) {
  transform: translate(-75%, -60%) rotate(0.001deg) scale(1);
  z-index: 4;
}
:is(.wf-design-mode, .wf-editor) [data-stacked-trail-item]:nth-child(1) {
  transform: translate(-100%, -70%) rotate(0.001deg) scale(1);
  z-index: 5;
}
```
### Implementation
#### Area
Use `[data-stacked-trail-area]` to define an independent interactive region where the stacked trail effect activates and tracks cursor movement only inside this specific area.
### HTML
```text
<div data-stacked-trail-area>
  <div data-stacked-trail-item></div>
  <div data-stacked-trail-item></div>
  <div data-stacked-trail-item></div>
</div>
```
#### Item
Use `[data-stacked-trail-item]` to register each element in the stack that should follow the cursor, giving every item its own stored x and y position while easing toward its target in sequence.
#### Customize
### Javascript
```javascript
var leadEase = 0.25;
var trailEase = 0.16;
var pathFollow = 1;
```
Use var `leadEase = 0.25;` to control how responsively the first item reacts to cursor movement, acting as the leading point of the animation.
Use var `trailEase = 0.16;` to adjust how smoothly the rest of the items drift behind the leader, giving the stack its trailing softness.
Use var `pathFollow = 1;` to set how closely items follow the exact path of the one above them, blending between direct cursor following and chained motion.
#### Hover State
Use `[data-stacked-trail-area="hover"]` to trigger CSS-driven scale or visual effects, as the script automatically toggles this attribute when the cursor enters or leaves the area.