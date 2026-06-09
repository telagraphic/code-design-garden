---
title: "Auto Image Cycle (Slideshow)"
description: "Auto Image Cycle (Slideshow)."
slug: "auto-image-cycle-auto"
previewVideo: "auto-image-cycle-auto.mp4"
order: 49.996
published: true
categories: ["loader"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["auto", "image", "cycle", "slideshow"]
sourceUrl: "https://www.osmo.supply/resource/auto-image-cycle-slideshow"
---
<div class="image-cycle-collection">
  <div class="image-cycle-collection__before"></div>
  <div class="image-cycle-collection__list" data-image-cycle="2.5">
    <div class="image-cycle-collection__img" data-image-cycle-item="" class="image-cycle-collection__item">
    </div>
    <div class="image-cycle-collection__img" data-image-cycle-item="" class="image-cycle-collection__item">
    </div>
    <div class="image-cycle-collection__img" data-image-cycle-item="" class="image-cycle-collection__item">
    </div>
    <div class="image-cycle-collection__img" data-image-cycle-item="" class="image-cycle-collection__item">
    </div>
    <div class="image-cycle-collection__img" data-image-cycle-item="" class="image-cycle-collection__item">
    </div>
  </div>
</div>
```text
CSS
```
.image-cycle-collection {
  width: min(95vw, 60em);
  position: relative;
.image-cycle-collection__before {
  padding-top: 66.666%;
.image-cycle-collection__list {
  z-index: 0;
  border-radius: 2em;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
.image-cycle-collection__item {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
[data-image-cycle-item="active"] {
  transition: opacity 0.4s ease 0s, visibility 0s ease 0s;
  opacity: 1;
  visibility: visible;
  z-index: 3;
[data-image-cycle-item="previous"] {
  transition: opacity 0.4s ease 0.4s, visibility 0s ease 0.4s;
  opacity: 0;
  visibility: visible;
  z-index: 2;
[data-image-cycle-item="not-active"] {
  opacity: 0;
  visibility: hidden;
  z-index: 1;
.image-cycle-collection__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
@media screen and (max-width: 767px) {
  .image-cycle-collection__list {
    border-radius: 1em;
```text
Javascript
```
function initImageCycle() {
  document.querySelectorAll("[data-image-cycle]").forEach(cycleElement => {
    const items = cycleElement.querySelectorAll("[data-image-cycle-item]");
    if (items.length < 2) return;
    let currentIndex = 0;
    let intervalId;
    // Get optional custom duration (in seconds), fallback to 2000ms
    const attrValue = cycleElement.getAttribute("data-image-cycle");
    const duration = attrValue && !isNaN(attrValue) ? parseFloat(attrValue) * 1000 : 2000;
    const isTwoItems = items.length === 2;
    // Initial state
    items.forEach((item, i) => {
      item.setAttribute("data-image-cycle-item", i === 0 ? "active" : "not-active");
    });
    function cycleImages() {
      const prevIndex = currentIndex;
      currentIndex = (currentIndex + 1) % items.length;
      items[prevIndex].setAttribute("data-image-cycle-item", "previous");
      if (!isTwoItems) {
        setTimeout(() => {
          items[prevIndex].setAttribute("data-image-cycle-item", "not-active");
        }, duration);
      items[currentIndex].setAttribute("data-image-cycle-item", "active");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !intervalId) {
        intervalId = setInterval(cycleImages, duration);
      } else {
        clearInterval(intervalId);
        intervalId = null;
    }, { threshold: 0 });
    observer.observe(cycleElement);
  });
// Initialize Image Cycle
document.addEventListener('DOMContentLoaded', function() {
  initImageCycle();
});
```text
CSS
```
[data-image-cycle-item="active"] {
  transition: opacity 0.4s ease 0s, visibility 0s ease 0s;
  opacity: 1;
  visibility: visible;
  z-index: 3;
[data-image-cycle-item="previous"] {
  transition: opacity 0.4s ease 0.4s, visibility 0s ease 0.4s;
  opacity: 0;
  visibility: visible;
  z-index: 2;
[data-image-cycle-item="not-active"] {
  opacity: 0;
  visibility: hidden;
  z-index: 1;
```text
### Impementation
#### Image Cycle Group
The script will search inside the `[data-image-cycle]` group for elements with the `[data-image-cycle-item]` attribute. This acts as the container for the cycle group. You can optionally pass a number value (in seconds) to control the cycle speed:
```
<!-- Defaults to 2000ms -->
<div data-image-cycle>...</div>
<!-- Custom interval: 3 seconds -->
<div data-image-cycle="3">...</div>
```text
#### Image Cycle Item
The children will get different states based on their order in the group. These can be used to animate them. Example: `[data-image-cycle-item="active"]`
- active: The slide that is visible will get this attribute
- previous: The slide that is fading-out will get this attribute to have a solid fade effect.
- not-active: All other slides that are not visible.