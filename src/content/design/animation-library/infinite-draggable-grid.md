---
title: "Infinite Draggable Grid"
description: "Draggable infinite grid of tiles with momentum."
slug: "infinite-draggable-grid"
previewVideo: "infinite-draggable-grid.mp4"
order: 95
published: true
categories: ["layout", "image-carousel"]
triggers: ["drag"]
libraries: ["gsap"]
keywords: ["grid", "infinite", "draggable"]
sourceUrl: "https://www.osmo.supply/resource/infinite-draggable-grid-basic"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/Observer.min.js"></script>
```
### HTML
```text
<section data-infinite-grid-status="loading" data-infinite-grid-init="" class="infinite-grid">
  <div data-infinite-grid-collection="" class="infinite-grid__collection">
    <div data-infinite-grid-list="" class="infinite-grid__list">
      <div data-infinite-grid-item="" class="infinite-grid__item">
        <div class="infinite-grid__card"></div>
      </div>
      <div data-infinite-grid-item="" class="infinite-grid__item">
        <div class="infinite-grid__card is--landscape"></div>
      </div>
      <div data-infinite-grid-item="" class="infinite-grid__item">
        <div class="infinite-grid__card"></div>
      </div>
    </div>
  </div>
</section>
```
### CSS
```text
.infinite-grid {
  touch-action: none;
  width: 100%;
  height: 100svh;
  position: relative;
  overflow: clip;
  cursor: grab;
  transition: opacity 0.5s ease;
  opacity: 1;
}
.infinite-grid[data-infinite-grid-status="loading"] {
  opacity: 0;
}
.infinite-grid[data-infinite-grid-status="dragging"] {
  cursor: grabbing;
}
.infinite-grid__collection {
  will-change: transform;
  width: 100%;
  height: 100%;
  position: absolute;
}
.infinite-grid__list {
  grid-template-columns: repeat(var(--grid-columns), auto);
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
}
.infinite-grid__item {
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  width: 13em;
  padding: 1.75em;
  font-size: clamp(1.5em, 2vw, 3em);
  display: flex;
}
.infinite-grid__card {
  -webkit-user-select: none;
  user-select: none;
  border-radius: .125em;
  width: 80%;
  height: 100%;
  position: relative;
}
.infinite-grid__card.is--landscape {
  width: 100%;
  height: 75%;
}
.infinite-grid__card-img {
  pointer-events: none;
  object-fit: cover;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  position: absolute;
}
```
### Javascript
```javascript
gsap.registerPlugin(Observer);
function initInfiniteDraggableGrid() {
  const wrappers = document.querySelectorAll('[data-infinite-grid-init]');
  const wheelSpeed = 0.75; // wheel/trackpad speed
  const dragSpeed = 1.25;  // drag speed
  wrappers.forEach((wrapper) => {
    const collection = wrapper.querySelector('[data-infinite-grid-collection]');
    const sourceList = wrapper.querySelector('[data-infinite-grid-list]');
    const originalItems = Array.from(sourceList.querySelectorAll('[data-infinite-grid-item]'));
    if (!collection || !sourceList || !originalItems.length) return;
    let observer;
    let resizeTimer;
    let scrollTimeout;
    let hasMouseLeaveListener = false;
    let tileWidth = 0;
    let tileHeight = 0;
    let currentX = 0;
    let currentY = 0;
    let xTo;
    let yTo;
    function setStatus(status) {
      wrapper.setAttribute('data-infinite-grid-status', status);
    }
    function buildGrid() {
      if (observer) observer.kill();
      setStatus('loading');
      collection.innerHTML = '';
      const measureItem = originalItems[0].cloneNode(true);
      measureItem.style.position = 'absolute';
      measureItem.style.visibility = 'hidden';
      measureItem.style.pointerEvents = 'none';
      wrapper.appendChild(measureItem);
      const itemRect = measureItem.getBoundingClientRect();
      const itemWidth = itemRect.width;
      const itemHeight = itemRect.height;
      measureItem.remove();
      if (!itemWidth || !itemHeight) return;
      const columns = Math.max(1, Math.ceil(wrapper.clientWidth / itemWidth) + 1);
      const rows = Math.max(1, Math.ceil(wrapper.clientHeight / itemHeight) + 1);
      const requiredItems = columns * rows;
      const wantedItems = Math.max(requiredItems, originalItems.length);
      const itemsPerList = Math.ceil(wantedItems / columns) * columns;
      const fragment = document.createDocumentFragment();
      for (let listIndex = 0; listIndex < 4; listIndex++) {
        const list = sourceList.cloneNode(false);
        list.style.setProperty('--grid-columns', columns);
        if (listIndex > 0) {
          list.setAttribute('aria-hidden', 'true');
        }
        for (let itemIndex = 0; itemIndex < itemsPerList; itemIndex++) {
          const item = originalItems[itemIndex % originalItems.length].cloneNode(true);
          if (listIndex > 0) {item.setAttribute('aria-hidden', 'true');}
          list.appendChild(item);
        }
        fragment.appendChild(list);
      }
      collection.appendChild(fragment);
      requestAnimationFrame(setGrid);
    }
    function setGrid() {
      const lists = Array.from(collection.querySelectorAll('[data-infinite-grid-list]'));
      const firstList = lists[0];
      if (!firstList) return;
      const firstItem = firstList.querySelector('[data-infinite-grid-item]');
      if (!firstItem) return;
      const listRect = firstList.getBoundingClientRect();
      const itemRect = firstItem.getBoundingClientRect();
      tileWidth = listRect.width;
      tileHeight = listRect.height;
      const itemHeight = itemRect.height;
      gsap.set(lists[0], {xPercent: 0, yPercent: 0});
      gsap.set(lists[1], {xPercent: 100, yPercent: 0});
      gsap.set(lists[2], {xPercent: 0, yPercent: 100});
      gsap.set(lists[3], {xPercent: 100, yPercent: 100});
      const wrapX = gsap.utils.wrap(-tileWidth, 0);
      const wrapY = gsap.utils.wrap(-tileHeight, 0);
      currentX = wrapX((wrapper.clientWidth - tileWidth) * 0.5);
      currentY = wrapY((wrapper.clientHeight - itemHeight) * 0.5);
      xTo = gsap.quickTo(collection, 'x', {
        duration: 1.2,
        ease: 'expo.out',
        modifiers: {
          x: gsap.utils.unitize(wrapX)
        }
      });
      yTo = gsap.quickTo(collection, 'y', {
        duration: 1.2,
        ease: 'expo.out',
        modifiers: {
          y: gsap.utils.unitize(wrapY)
        }
      });
      gsap.set(collection, {
        x: currentX,
        y: currentY
      });
      requestAnimationFrame(() => {
        setStatus('idle');
      });
      observer = Observer.create({
        target: wrapper,
        type: 'wheel,touch,pointer',
        preventDefault: true,
        dragMinimum: 3,
        onPress() { setStatus('dragging'); },
        onRelease() { setStatus('idle'); },
        onStop() { setStatus('idle'); },
        onChangeX(self) { handleMovement(self, 'x'); },
        onChangeY(self) { handleMovement(self, 'y'); }
      });
      if (!hasMouseLeaveListener) {
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        hasMouseLeaveListener = true;
      }
    }
    function handleMouseLeave() {
      setStatus('idle');
      if (observer) {
        observer.disable();
        observer.enable();
      }
    }
    function handleMovement(self, axis) {
      const isWheel = self.event.type === 'wheel';
      if (isWheel) {
        setStatus('scrolling');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setStatus('idle');
        }, 200);
      }
      const multiplier = isWheel ? wheelSpeed : dragSpeed;
      const delta = gsap.utils.clamp(-80, 80, self[\`delta${axis.toUpperCase()}\`] * multiplier);
      if (axis === 'x') {
        currentX += isWheel ? -delta : delta;
        xTo(currentX);
      } else {
        currentY += isWheel ? -delta : delta;
        yTo(currentY);
      }
    }
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildGrid();
      }, 200);
    });
    buildGrid();
  });
}
// Inititalize Infinite Draggable Grid (Basic)
document.addEventListener("DOMContentLoaded", () => {
  initInfiniteDraggableGrid();
});
```
### CSS
```text
.infinite-grid[data-infinite-grid-status] {
  cursor: grab;
  transition: opacity 0.5s ease;
  opacity: 1;
}
.infinite-grid[data-infinite-grid-status="loading"] {
  opacity: 0;
}
.infinite-grid[data-infinite-grid-status="dragging"] {
  cursor: grabbing;
}
:is(.wf-design-mode, .wf-editor) .infinite-grid[data-infinite-grid-status] {
  opacity: 1;
}
/* Optional grid styling for the Webflow Designer */
:is(.wf-design-mode, .wf-editor) .infinite-grid .infinite-grid__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
```
### Implementation
#### Container
Use `[data-infinite-grid-init]` on the main wrapper to initialize the draggable infinite grid.
#### Collection
Use `[data-infinite-grid-collection]` on the element that holds the duplicated grid lists and receives the GSAP transform movement.
#### List
Use `[data-infinite-grid-list]` on the original list of items, which the script clones into four repeated grid sections.
#### Item
Use `[data-infinite-grid-item]` on each card item that should be duplicated inside the infinite grid.
#### Status
Use `[data-infinite-grid-status]` on the container element to style the grid based on the current state, including loading, idle, dragging, and scrolling, allowing content inside the grid to visually respond to user interaction.
#### Drag/Scroll Speed (Smoothness)
In the JavaScript you can edit two variables. Change `wheelSpeed` to control the wheel and trackpad movement intensity, and `dragSpeed` to adjust the drag interaction speed of the infinite grid.
### Javascript
```javascript
const wheelSpeed = 0.75; // wheel/trackpad speed
const dragSpeed = 1.25;  // drag speed
```