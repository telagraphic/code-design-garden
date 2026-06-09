---
title: "Orbit Tiles Infinite Loop"
description: "Orbit Tiles Infinite Loop."
slug: "orbit-tiles-infinite-loop"
previewVideo: "orbit-tiles-infinite-loop.mp4"
order: 49.892
published: true
categories: ["loader", "filter", "media"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["orbit", "tiles", "infinite", "loop"]
sourceUrl: "https://www.osmo.supply/resource/orbit-tiles-infinite-loop"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomEase.min.js"></script>
```
### HTML
```text
<div data-orbit-tiles-init="" class="orbit-tiles">
  <div data-orbit-tiles-collection="" class="orbit-tiles__collection">
    <div data-orbit-tiles-list="" class="orbit-tiles__list">
      <div data-orbit-tiles-item="" class="orbit-tiles__item">
        <div class="demo-card"></div>
      </div>
      <div data-orbit-tiles-item="" class="orbit-tiles__item">
        <div class="demo-card"></div>
      </div>
      <div data-orbit-tiles-item="" class="orbit-tiles__item">
        <div class="demo-card"></div>
      </div>
      <div data-orbit-tiles-item="" class="orbit-tiles__item">
        <div class="demo-card"></div>
      </div>
      <div data-orbit-tiles-item="" class="orbit-tiles__item">
        <div class="demo-card"></div>
      </div>
    </div>
  </div>
</div>
```
### CSS
```text
.orbit-tiles {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100dvh;
  display: flex;
  position: relative;
  overflow: clip;
}
.orbit-tiles__collection {
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
}
.orbit-tiles__list {
  place-items: center;
  display: grid;
}
.orbit-tiles__item {
  will-change: transform, opacity, filter;
  grid-area: 1 / 1;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: max-content;
  display: flex;
}
.demo-card {
  aspect-ratio: 4 / 3;
  border-radius: 0.65em;
  width: clamp(16em, 25vw, 32em);
  position: relative;
}
.cover-image {
  object-fit: cover;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
```
### Javascript
```javascript
gsap.registerPlugin(CustomEase, ScrollTrigger);
CustomEase.create("osmo", "M0,0 C0.625,0.05 0,1 1,1");
function initOrbitTiles() {
  document.querySelectorAll("[data-orbit-tiles-init]").forEach((container) => {
    const list = container.querySelector("[data-orbit-tiles-list]");
    const tiles = container.querySelectorAll("[data-orbit-tiles-item]");
    const tileCount = tiles.length;
    if (tileCount < 2) return;
    const radiusXMultiplier = 1;
    const radiusYMultiplier = 0;
    const blurMultiplier = 0.04;
    const minScale = 0.2;
    const minOpacity = 1;
    const minDarkness = 0.3;
    const moveDuration = 2.5;
    const pauseDuration = 0;
    const staggerAmount = moveDuration * 0.03;
    const linearRotateDuration = 24;
    const tileStates = Array.from(tiles, () => ({ progress: 0 }));
    let isActive = false;
    let stepTimeline;
    let delayedCall;
    let activeTileIndex = -1;
    function getActiveIndex() {
      return tileStates.reduce((closest, state, index) => {
        const current = Math.min(((index - state.progress) % tileCount + tileCount) % tileCount, tileCount - (((index - state.progress) % tileCount + tileCount) % tileCount));
        const previous = Math.min(((closest - tileStates[closest].progress) % tileCount + tileCount) % tileCount, tileCount - (((closest - tileStates[closest].progress) % tileCount + tileCount) % tileCount));
        return current < previous ? index : closest;
      }, 0);
    }
    function updateTileStatus() {
      const currentActiveIndex = getActiveIndex();
      if (currentActiveIndex === activeTileIndex) return;
      activeTileIndex = currentActiveIndex;
      tiles.forEach((tile, index) => {
        tile.setAttribute(
          "data-orbit-tiles-item-status",
          index === activeTileIndex ? "active" : "not-active"
        );
      });
    }
    function renderOrbit() {
      const tileWidth = tiles[0].offsetWidth;
      const radiusX = tileWidth * radiusXMultiplier;
      const radiusY = tileWidth * radiusYMultiplier;
      const maxBlur = tileWidth * blurMultiplier;
      updateTileStatus();
      tiles.forEach((tile, index) => {
        const angle = ((index - tileStates[index].progress) / tileCount) * Math.PI * 2;
        const depth = (Math.cos(angle) + 1) / 2;
        const adjustedDepth = Math.pow(depth, 1.3);
        const scale = gsap.utils.interpolate(minScale, 1, adjustedDepth);
        const opacity = gsap.utils.interpolate(minOpacity, 1, adjustedDepth);
        const blur = gsap.utils.interpolate(maxBlur, 0, adjustedDepth);
        const brightness = gsap.utils.interpolate(minDarkness, 1, adjustedDepth);
        gsap.set(tile, {
          x: Math.sin(angle) * radiusX,
          y: Math.cos(angle) * radiusY,
          scale,
          opacity,
          filter: \`blur(${blur}px) brightness(${brightness})\`,
          zIndex: Math.round(adjustedDepth * 1000)
        });
      });
    }
    const rotations = !list || linearRotateDuration === 0 ? [] : [
      gsap.to(list, {
        rotate: 360,
        duration: linearRotateDuration,
        ease: "none",
        repeat: -1,
        paused: true
      }),
      gsap.to(tiles, {
        rotate: -360,
        duration: linearRotateDuration,
        ease: "none",
        repeat: -1,
        paused: true
      })
    ];
    function goToNextTile() {
      if (!isActive) return;
      const activeIndex = getActiveIndex();
      const orderedStates = tileStates.map((state, index) => ({state, offset: (index - activeIndex + tileCount) % tileCount})).sort((a, b) => a.offset - b.offset);
      stepTimeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (isActive) delayedCall = gsap.delayedCall(pauseDuration, goToNextTile);
        }
      });
      orderedStates.forEach(({ state }, index) => {
        stepTimeline.to(state, {
          progress: state.progress + 1,
          duration: moveDuration,
          ease: "osmo",
          onUpdate: renderOrbit
        }, index * staggerAmount);
      });
      stepTimeline.play();
    }
    function pauseOrbit() {
      isActive = false;
      if (stepTimeline) stepTimeline.pause();
      if (delayedCall) delayedCall.pause();
      rotations.forEach((rotation) => rotation.pause());
    }
    function playOrbit() {
      isActive = true;
      rotations.forEach((rotation) => rotation.play());
      if (stepTimeline && stepTimeline.progress() < 1) {
        stepTimeline.play();
      } else {
        goToNextTile();
      }
    }
    renderOrbit();
    if (pauseDuration > 0) {
      new ResizeObserver(renderOrbit).observe(container);
    }
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => self.isActive ? playOrbit() : pauseOrbit()
    });
  });
}
// Inititalize Orbit Tiles Infinite Loop
document.addEventListener("DOMContentLoaded", () => {
  initOrbitTiles();
});
```
### CSS
```text
/* Optional to show tiles in a row in the Webflow Designer */
:is(.wf-design-mode, .wf-editor) [data-orbit-tiles-list] {
  display: flex;
}
```
### Implementation
#### Container
Use `[data-orbit-tiles-init]` on the outer wrapper to initialize the Orbit Tiles animation for everything inside this container.
#### Collection
Use `[data-orbit-tiles-collection]` as the visual wrapper that holds the orbit area and keeps the animated list centered.
#### List
Use `[data-orbit-tiles-list]` on the parent that contains all orbit tiles and receives the optional continuous rotation animation.
#### Item
Use `[data-orbit-tiles-item]` on each individual tile that should move, scale, blur, darken, and rotate inside the orbit.
#### Status
The script will update `[data-orbit-tiles-item-status="active"]` and `[data-orbit-tiles-item-status="inactive"]`, this can be used to style the currently centered tile differently from the other tiles.
#### Tweaking the Animation
Use these values in JavaScript to tweak the infinite loop animation:
### Javascript
```javascript
const radiusXMultiplier = 1; // Horizontal orbit size.
const radiusYMultiplier = 0; // Vertical orbit curve, 0 is flat.
const blurMultiplier = 0.04; // Blur strength in the back.
const minScale = 0.2; // Minimum scale in the back, 1 is no scaling.
const minOpacity = 1; // Minimum opacity in the back, 1 is fully visible.
const minDarkness = 0.3; // Minimum brightness in the back, 0 is black, 1 is no change.
const moveDuration = 2.5; // Time between active tiles.
const pauseDuration = 0; // Pause on active tile.
const staggerAmount = moveDuration * 0.03; // Delay between tiles.
const linearRotateDuration = 24; // Continuous rotation speed, 0 disables.
```