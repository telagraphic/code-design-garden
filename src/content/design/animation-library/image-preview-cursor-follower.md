---
title: "Image Preview Cursor Follower"
description: "Image Preview Cursor Follower."
slug: "image-preview-cursor-follower"
previewVideo: "image-preview-cursor-follower.mp4"
order: 49.914
published: true
categories: ["cursor"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["image", "preview", "cursor", "follower"]
sourceUrl: "https://www.osmo.supply/resource/image-preview-cursor-follower"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
```
### HTML
```text
<div data-follower-wrap="" class="preview-container">
  <div class="preview-item__row tabelt--hide">
    <div class="preview-item__col is--large"><span class="preview-container__label">Name</span></div>
    <div class="preview-item__col is--small"><span class="preview-container__label">Location</span></div>
    <div class="preview-item__col is--small"><span class="preview-container__label">Year</span></div>
    <div class="preview-item__col is--medium"><span class="preview-container__label">Services</span></div>
  </div>
  <div data-follower-collection="" class="preview-collection">
    <div class="preview-list">
      <div data-follower-item="" class="preview-item">
        <a href="#" class="preview-item__inner w-inline-block">
          <div class="preview-item__row">
            <div class="preview-item__col is--large">
              <h2 class="preview-item__heading">Prism</h2>
            </div>
            <div class="preview-item__col is--small tablet--hide">
              <p class="preview-item__text">Belgium</p>
            </div>
            <div class="preview-item__col is--small">
              <p class="preview-item__text">2025</p>
            </div>
            <div class="preview-item__col is--medium">
              <p class="preview-item__text">Development</p>
            </div>
          </div>
          <div data-follower-visual="" class="preview-item__visual">
          </div>
        </a>
      </div>
      <div data-follower-item="" class="preview-item">
        <a href="#" class="preview-item__inner w-inline-block">
          <div class="preview-item__row">
            <div class="preview-item__col is--large">
              <h2 class="preview-item__heading">Oracle</h2>
            </div>
            <div class="preview-item__col is--small tablet--hide">
              <p class="preview-item__text">Australia</p>
            </div>
            <div class="preview-item__col is--small">
              <p class="preview-item__text">2025</p>
            </div>
            <div class="preview-item__col is--medium">
              <p class="preview-item__text">Design, Development</p>
            </div>
          </div>
          <div data-follower-visual="" class="preview-item__visual">
          </div>
        </a>
      </div>
      <div data-follower-item="" class="preview-item">
        <a href="#" class="preview-item__inner w-inline-block">
          <div class="preview-item__row">
            <div class="preview-item__col is--large">
              <h2 class="preview-item__heading">Mosaic</h2>
            </div>
            <div class="preview-item__col is--small tablet--hide">
              <p class="preview-item__text">Spain</p>
            </div>
            <div class="preview-item__col is--small">
              <p class="preview-item__text">2024</p>
            </div>
            <div class="preview-item__col is--medium">
              <p class="preview-item__text">Development</p>
            </div>
          </div>
          <div data-follower-visual="" class="preview-item__visual">
          </div>
        </a>
      </div>
      <div data-follower-item="" class="preview-item">
        <a href="#" class="preview-item__inner w-inline-block">
          <div class="preview-item__row">
            <div class="preview-item__col is--large">
              <h2 class="preview-item__heading">Zenith</h2>
            </div>
            <div class="preview-item__col is--small tablet--hide">
              <p class="preview-item__text">Japan</p>
            </div>
            <div class="preview-item__col is--small">
              <p class="preview-item__text">2024</p>
            </div>
            <div class="preview-item__col is--medium">
              <p class="preview-item__text">Strategy, Design</p>
            </div>
          </div>
          <div data-follower-visual="" class="preview-item__visual">
          </div>
        </a>
      </div>
    </div>
  </div>
  <div data-follower-cursor="" class="preview-follower">
    <div data-follower-cursor-inner="" class="preview-follower__inner">
      <div class="preview-follower__label">
        <div class="preview-follower__label-span">View case</div>
      </div>
    </div>
  </div>
</div>
```
### CSS
```text
.preview-container {
  width: 100%;
  max-width: 76em;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2em;
  padding-right: 2em;
}
.preview-collection {
  width: 100%;
  margin-top: .5em;
}
.preview-item__row {
  flex-flow: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  display: flex;
}
.preview-item__col {
  flex: 1;
}
.preview-item__col.is--large {
  max-width: 45%;
}
.preview-item__col.is--medium {
  max-width: 25%;
}
.preview-item__col.is--small {
  max-width: 15%;
}
.preview-container__label {
  color: #0a0a0a80;
  text-transform: uppercase;
  font-size: .75em;
}
.preview-list {
  flex-flow: column;
  width: 100%;
  display: flex;
  position: relative;
}
.preview-item {
  width: 100%;
  transition: opacity .2s;
}
.preview-item__heading {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 3.5em;
  font-weight: 400;
  line-height: 1;
}
.preview-item__text {
  margin-bottom: 0;
  font-size: 1.25em;
  font-weight: 400;
  line-height: 1.2;
}
.preview-item__visual {
  aspect-ratio: 1 / 1.25;
  width: 20em;
  display: none;
  position: absolute;
  overflow: hidden;
}
.preview-follower [data-follower-visual]{
  display: block;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.preview-item__inner {
  border-top: 1px solid #00000040;
  width: 100%;
  padding-top: 2.5em;
  padding-bottom: 2.5em;
}
.preview-item__visual-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.preview-follower {
  z-index: 100;
  aspect-ratio: 1 / 1.25;
  pointer-events: none;
  border-radius: .75em;
  justify-content: center;
  align-items: center;
  width: 20em;
  display: flex;
  position: fixed;
  inset: 0% auto auto 0%;
  overflow: hidden;
}
.preview-follower__label {
  z-index: 2;
  position: absolute;
  opacity: 0;
  transform: translate(0px, 100%);
  transition: opacity 0.1s ease, transform 0.6s cubic-bezier(0.65, 0.1, 0, 1);
}
.preview-follower__label-span {
  background-color: #fff;
  border-radius: .25em;
  padding: .75em 1.25em;
  font-size: 1em;
}
.preview-follower__inner {
  z-index: 2;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.1s ease, transform 0.6s cubic-bezier(0.65, 0.1, 0, 1);
}
@media screen and (min-width: 992px){
  .preview-item:last-of-type{
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
}
@media (hover: hover) and (min-width: 992px){
  body:has( [data-follower-collection]:hover) .preview-follower__inner{
    opacity: 1;
    transform: scale(1);    
  }
  body:has( [data-follower-collection]:hover) .preview-follower__label{
    opacity: 1;
    transform: translate(0px, 0%);
  }
  body:has( .preview-item:hover) .preview-item:not(:hover){
    opacity: 0.5;
  }
}
@media screen and (max-width: 991px) {
  .preview-item__row {
    grid-row-gap: .5em;
  }
  .preview-item__row.tabelt--hide {
    display: none;
  }
  .preview-item__col.is--large {
    flex: none;
    order: -1;
    width: 100%;
    max-width: none;
  }
  .preview-item__col.is--medium {
    order: -1;
    max-width: 80%;
  }
  .preview-item__col.is--small {
    text-align: right;
    max-width: 20%;
  }
  .preview-item__col.is--small.tablet--hide {
    display: none;
  }
  .preview-list {
    grid-column-gap: 1em;
    grid-row-gap: 4em;
    flex-flow: wrap;
  }
  .preview-item {
    width: calc(50% - .5em);
  }
  .preview-item__heading {
    font-size: 2em;
  }
  .preview-item__visual {
    border-radius: .75em;
    order: -1;
    width: 100%;
    margin-bottom: 1em;
    display: block;
    position: relative;
  }
  .preview-item__inner {
    border: 1px #000;
    flex-flow: column;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
  }
  .preview-follower {
    display: none;
  }
}
@media screen and (max-width: 767px) {
  .preview-container {
    padding-left: 1em;
    padding-right: 1em;
  }
  .preview-list {
    grid-row-gap: 3em;
  }
  .preview-item {
    width: 100%;
  }
}
```
### Javascript
```javascript
function initPreviewFollower() {
  // Find every follower wrap
  const wrappers = document.querySelectorAll('[data-follower-wrap]');
  wrappers.forEach(wrap => {
    const collection = wrap.querySelector('[data-follower-collection]');
    const items = wrap.querySelectorAll('[data-follower-item]');
    const follower = wrap.querySelector('[data-follower-cursor]');
    const followerInner = wrap.querySelector('[data-follower-cursor-inner]');
    let prevIndex = null;
    let firstEntry = true;
    const offset = 100; // The animation distance in %
    const duration = 0.5; // The animation duration of all visual transforms
    const ease = 'power2.inOut';
    // Initialize follower position
    gsap.set(follower, { xPercent: -50, yPercent: -50 });
    // Quick setters for x/y
    const xTo = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' });
    // Move all followers on mousemove
    window.addEventListener('mousemove', e => {
      xTo(e.clientX);
      yTo(e.clientY);
    });
    // Enter/leave per item within this wrap
    items.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        const forward = prevIndex === null || index > prevIndex;
        prevIndex = index;
        // animate out existing visuals
        follower.querySelectorAll('[data-follower-visual]').forEach(el => {
          gsap.killTweensOf(el);
          gsap.to(el, {
            yPercent: forward ? -offset : offset,
            duration,
            ease,
            overwrite: 'auto',
            onComplete: () => el.remove()
          });
        });
        // clone & insert new visual
        const visual = item.querySelector('[data-follower-visual]');
        if (!visual) return;
        const clone = visual.cloneNode(true);
        followerInner.appendChild(clone);
        // animate it in (unless it's the very first entry)
        if (!firstEntry) {
          gsap.fromTo(clone,
            { yPercent: forward ? offset : -offset },
            { yPercent: 0, duration, ease, overwrite: 'auto' }
          );
        } else {
          firstEntry = false;
        }
      });
      item.addEventListener('mouseleave', () => {
        const el = follower.querySelector('[data-follower-visual]');
        if (!el) return;
        gsap.killTweensOf(el);
        gsap.to(el, {
          yPercent: -offset,
          duration,
          ease,
          overwrite: 'auto',
          onComplete: () => el.remove()
        });
      });
    });
    // If pointer leaves the collection, clear any visuals
    collection.addEventListener('mouseleave', () => {
      follower.querySelectorAll('[data-follower-visual]').forEach(el => {
        gsap.killTweensOf(el);
        gsap.delayedCall(duration, () => el.remove());
      });
      firstEntry = true;
      prevIndex = null;
    });
  });
}
// Initialize Image Preview Cursor Follower
document.addEventListener("DOMContentLoaded", () =>{
  initPreviewFollower();
})
```
### CSS
```text
.preview-follower__inner,
.preview-follower__label{
  transition: opacity 0.1s ease, transform 0.6s cubic-bezier(0.65, 0.1, 0, 1);
}
/* html:not(.wf-design-mode) */ .preview-follower__inner{
  opacity: 0;
  transform: scale(0);
}
/* html:not(.wf-design-mode) */ .preview-follower__label{
  opacity: 0;
  transform: translate(0px, 100%);
}
.preview-follower [data-follower-visual]{
  display: block;
  width: 100%;
  height: 100%;
  z-index: 0;
}
@media screen and (min-width: 992px){
  .preview-item:last-of-type{
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
}
@media (hover: hover) and (min-width: 992px){
  body:has( [data-follower-collection]:hover) .preview-follower__inner{
    opacity: 1;
    transform: scale(1);    
  }
  body:has( [data-follower-collection]:hover) .preview-follower__label{
    opacity: 1;
    transform: translate(0px, 0%);
  }
  body:has( .preview-item:hover) .preview-item:not(:hover){
      opacity: 0.5;
  }
}
```
### Implementation
#### Wrap
The `data-follower-wrap` attribute goes on an element that contains both the `data-follower-collection` and the `data-follower-cursor`. This allows you to have multiple wrap elements on a page, each with unique items and/or 'followers' inside.
#### Container
Inside each data-follower-wrap, mark the parent of all items with `data-follower-collection`. The script listens for `mouseleave` on this container to know when to clear the cursor visuals.
#### Items
Every element you want to trigger a cursor-overlay on must have the `data-follower-item` attribute. The script:
1. Listens for `mouseenter` on each item
2. Clones its inner visual into the cursor
3. Animates in/out based on the item’s index order
#### Visuals
Within each `data-follower-item`, your visual (image, video, etc.) must have `data-follower-visual`. This is what gets cloned and animated into the cursor.
- On **mouseenter**, the script:
	1. Kills any existing tweens → animates old visuals out
	2. Clones the new `data-follower-visual` → appends it to `data-follower-cursor-inner`
	3. Animates it in (direction based on hover order)
- On **mouseleave** (of either the item or the entire collection), it animates the visual out and removes it.
#### Cursor
Provide the two elements that form your custom cursor inside of the `data-follower-wrap`:
### HTML
```text
<div data-follower-cursor>
  <div data-follower-cursor-inner>
    <!-- cloned visuals will be appended here -->
  </div>
</div>
```
- **`data-follower-cursor`** is the outer element that follows the pointer.
- **`data-follower-cursor-inner`** is the container where cloned visuals get injected.
### Customizing the animation
In our example we do a fairly basic transform on the y-axis, inside of an `overflow: hidden` div to create a 'masking' effect. You can customize the GSAP animations in the `mouseenter` and `mouseleave` listeners however you want, to get the exact effect that you're after!