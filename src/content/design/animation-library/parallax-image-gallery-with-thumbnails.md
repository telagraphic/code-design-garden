---
title: "Parallax Image Gallery with Thumbnails"
description: "Parallax Image Gallery with Thumbnails."
slug: "parallax-image-gallery-with-thumbnails"
previewVideo: "parallax-image-gallery-with-thumbnails.mp4"
order: 49.867
published: true
categories: ["cursor", "image-carousel", "layout"]
triggers: ["hover", "drag", "mouse-move"]
libraries: ["gsap"]
keywords: ["parallax", "image", "gallery", "thumbnails"]
sourceUrl: "https://www.osmo.supply/resource/parallax-image-gallery-with-thumbnails"
---
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/Observer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/CustomEase.min.js"></script>
```text
HTML
```
<div data-slideshow="wrap" class="img-slider">
  <div class="img-slider__list">
    <div data-slideshow="slide" class="img-slide is--current"></div>
    <div data-slideshow="slide" class="img-slide"></div>
    <div data-slideshow="slide" class="img-slide"></div>
    <div data-slideshow="slide" class="img-slide"></div>
  </div>
  <div class="img-slider__nav">
    <div data-slideshow="thumb" class="img-slider__thumb is--current"></div>
    <div data-slideshow="thumb" class="img-slider__thumb"></div>
    <div data-slideshow="thumb" class="img-slider__thumb"></div>
    <div data-slideshow="thumb" class="img-slider__thumb"></div>
  </div>
</div>
```text
CSS
```
.img-slider {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  border-radius: .5em;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
.img-slider__list {
  grid-template-rows: 100%;
  grid-template-columns: 100%;
  place-items: center;
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
.img-slide {
  opacity: 0;
  pointer-events: none;
  will-change: transform, opacity;
  grid-area: 1 / 1 / -1 / -1;
  place-items: center;
  width: 100%;
  height: 100%;
  display: grid;
  position: relative;
  overflow: hidden;
.img-slide.is--current {
  opacity: 1;
  pointer-events: auto;
.img-slide__inner {
  object-fit: cover;
  will-change: transform;
  width: 100%;
  height: 100%;
  position: absolute;
.img-slider__nav {
  z-index: 2;
  grid-column-gap: .5rem;
  grid-row-gap: .5rem;
  pointer-events: none;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  max-width: 95vw;
  display: flex;
  position: absolute;
  bottom: 2rem;
.img-slider__thumb {
  aspect-ratio: 1.5;
  pointer-events: auto;
  cursor: pointer;
  border: 1px solid #fff3;
  border-radius: .3125rem;
  width: 7rem;
  transition: border-color .2s;
  position: relative;
  overflow: hidden;
.img-slider__thumb:hover {
  border-color: #fff6;
.img-slider__thumb.is--current {
  border-color: #fff;
.slider-thumb__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
@media screen and (max-width: 991px) {
  .img-slider__list {
    width: 100%;
  .img-slider__thumb {
    flex: none;
@media screen and (max-width: 767px) {
  .img-slider__nav {
    flex-flow: wrap;
  .img-slider__thumb {
    border-radius: .25rem;
    width: 5rem;
@media screen and (max-width: 479px) {
  .img-slider__thumb {
    width: 4.5rem;
```text
Javascript
```
gsap.registerPlugin(Observer,CustomEase)
CustomEase.create("slideshow-wipe", "0.6, 0.08, 0.02, 0.99");
function initSlideShow(el) {
  // Save all elements in an object for easy reference
  const ui = {
    el,
    slides: Array.from(el.querySelectorAll('[data-slideshow="slide"]')),
    inner: Array.from(el.querySelectorAll('[data-slideshow="parallax"]')),
    thumbs: Array.from(el.querySelectorAll('[data-slideshow="thumb"]'))
  let current = 0;
  const length = ui.slides.length;
  let animating = false;
  let observer;
  let animationDuration = 0.9 // Define the duration of your 'slide' here
  ui.slides.forEach((slide, index) => {
    slide.setAttribute('data-index', index);
  });
  ui.thumbs.forEach((thumb, index) => {
    thumb.setAttribute('data-index', index);
  });
  ui.slides[current].classList.add('is--current');
  ui.thumbs[current].classList.add('is--current');
  function navigate(direction, targetIndex = null) {
    if (animating) return;
    animating = true;
    observer.disable();
    const previous = current;
    current =
      targetIndex !== null && targetIndex !== undefined
        ? targetIndex
        : direction === 1
          ? current < length - 1
            ? current + 1
            : 0
          : current > 0
            ? current - 1
            : length - 1;
    const currentSlide = ui.slides[previous];
    const currentInner = ui.inner[previous];
    const upcomingSlide = ui.slides[current];
    const upcomingInner = ui.inner[current];
    gsap.timeline({
      defaults: {
        duration: animationDuration,
        ease: 'slideshow-wipe'
      onStart: function() {
        upcomingSlide.classList.add('is--current');
        ui.thumbs[previous].classList.remove('is--current');
        ui.thumbs[current].classList.add('is--current');
      onComplete: function() {
        currentSlide.classList.remove('is--current');
        animating = false;
        // Re-enable observer after a short delay
        setTimeout(() => observer.enable(), animationDuration);
      .to(currentSlide, { xPercent: -direction * 100 },0)
      .to(currentInner, { xPercent: direction * 50 }, 0)
      .fromTo(upcomingSlide, { xPercent: direction * 100 }, { xPercent: 0 }, 0)
      .fromTo(upcomingInner, { xPercent: -direction * 50 }, { xPercent: 0 }, 0);
  function onClick(event) {
    const targetIndex = parseInt(event.currentTarget.getAttribute('data-index'), 10);
    if (targetIndex === current || animating) return;
    const direction = targetIndex > current ? 1 : -1;
    navigate(direction, targetIndex);
  ui.thumbs.forEach(thumb => {
    thumb.addEventListener('click', onClick);
  });
  observer = Observer.create({
    target: el,
    type: 'wheel,touch,pointer',
    // Drag events to go left/right
    onLeft: () => { if (!animating) navigate(1); },
    onRight: () => {if (!animating) navigate(-1); },
    // For wheel events, check horizontal movement
    onWheel: (event) => {
      if (animating) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        if (event.deltaX > 50) {
          navigate(1);
        } else if (event.deltaX < -50) {
          navigate(-1);
    wheelSpeed: -1,
    tolerance: 10
  });
  // Cleanup function if you need it
  return {
    destroy: function() {
      if (observer) observer.kill();
      ui.thumbs.forEach(thumb => {
        thumb.removeEventListener('click', onClick);
      });
function initParallaxImageGalleryThumbnails() {
  let wrappers = document.querySelectorAll('[data-slideshow="wrap"]');
  wrappers.forEach(wrap => initSlideShow(wrap));
// Initialize Parallax Image Gallery with Thumbnails
document.addEventListener('DOMContentLoaded', () => {
  initParallaxImageGalleryThumbnails();
});
```text
CSS
### Implementation
#### Container
Use `[data-slideshow="wrap"]` as the root container for each parallax slider instance. This element holds both the slides and the thumbnails, and is the target for GSAP’s Observer plugin to capture wheel, touch, and drag navigation.  
#### Slide
Use `[data-slideshow="slide"]` for each individual slide. The active slide automatically receives the is--current class, while the outgoing slide has it removed at animation completion.  
#### Parallax
Use `[data-slideshow="parallax"]` inside each slide to create the inner layer that moves at half the speed of the main slide during transitions, producing the parallax effect.Thumbnail
Use `[data-slideshow="thumb"]` for clickable thumbnails that directly navigate to their associated slide. The active thumbnail also gets the `.is--current` class.  
#### Index
The script automatically sets `[data-index]` on slides and thumbnails, linking each thumbnail to its corresponding slide and determining animation direction.  
#### State
The `.is--current` class is applied to both the active slide and the active thumbnail to indicate the current position in the slideshow.  
#### Animation
Transitions are powered by GSAP timelines using a custom ease (slideshow-wipe). Slides animate horizontally (xPercent), while their parallax elements move in the opposite direction at 50% speed.  
#### Duration
Change the animationDuration variable in the script (default 0.9 seconds) to adjust the speed of all transitions.  
#### Easing
Modify the CustomEase.create("slideshow-wipe", "0.6, 0.08, 0.02, 0.99") definition to customize the easing curve of the transitions.  
#### Navigation
Navigate by:
- Clicking a `[data-slideshow="thumb"]`
- Dragging left/right
- Using horizontal mouse wheel input (only when |deltaX| > |deltaY|)
#### Observer
GSAP’s Observer plugin listens for wheel, touch, and pointer events on \[data-slideshow="wrap"\]. It disables itself while an animation runs and re-enables after animationDuration to prevent spam clicks or swipes.
#### Multiple Instances
Place multiple `[data-slideshow="wrap"]` containers on the page. The initParallaxImageGalleryThumbnails() function automatically initializes each one on DOMContentLoaded.  
#### Webflow CMS Integration
For CMS use in Webflow:
- Create two Collection Lists: one for `[data-slideshow="slide"]`, one for `[data-slideshow="thumb"]`.
- Apply the attributes `[data-slideshow="slide"]`, `[data-slideshow="thumb"]`, and `[data-slideshow="parallax"]` directly to CMS list items.
- Ensure both lists have the same item count and identical ordering to keep them in sync.