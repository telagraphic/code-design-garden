---
title: "Setup: External Scripts"
description: "Setup: External Scripts."
slug: "crisp-loading-animation"
previewVideo: "crisp-loading-animation.mp4"
order: 49.938
published: true
categories: ["loader", "layout"]
triggers: ["drag"]
libraries: ["gsap"]
keywords: ["setup", "external", "scripts", "crisp", "loading", "animation"]
sourceUrl: "https://www.osmo.supply/resource/crisp-loading-animation"
---
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js"></script>
```text
# Step 1: Add HTML
```
<section data-slideshow="wrap" class="crisp-header is--loading is--hidden">
  <div class="crisp-header__slider">
    <div class="crisp-header__slider-list">
      <div data-slideshow="slide" class="crisp-header__slider-slide is--current"></div>
      <div data-slideshow="slide" class="crisp-header__slider-slide"></div>
      <div data-slideshow="slide" class="crisp-header__slider-slide"></div>
      <div data-slideshow="slide" class="crisp-header__slider-slide"></div>
      <div data-slideshow="slide" class="crisp-header__slider-slide"></div>
    </div>
  </div>
  <div class="crisp-loader">
    <div class="crisp-loader__wrap">
      <div class="crisp-loader__groups">
        <div class="crisp-loader__group is--duplicate">
          <div class="crisp-loader__single">
            <div class="crisp-loader__media"></div>
          </div>
          <div class="crisp-loader__single">
            <div class="crisp-loader__media"></div>
          </div>
          <div class="crisp-loader__single">
            <div class="crisp-loader__media"></div>
          </div>
          <div class="crisp-loader__single">
            <div class="crisp-loader__media"></div>
          </div>
          <div class="crisp-loader__single">
            <div class="crisp-loader__media"></div>
          </div>
        </div>
        <div class="crisp-loader__group is--relative">
          <div class="crisp-loader__single">
            <div class="crisp-loader__media"></div>
          </div>
          <div class="crisp-loader__single">
            <div class="crisp-loader__media"></div>
          </div>
          <div class="crisp-loader__single">
            <div class="crisp-loader__media is--scaling is--radius"></div>
          </div>
          <div class="crisp-loader__single">
            <div class="crisp-loader__media"></div>
          </div>
          <div class="crisp-loader__single">
            <div class="crisp-loader__media"></div>
          </div>
        </div>
      </div>
      <div class="crisp-loader__fade"></div>
      <div class="crisp-loader__fade is--duplicate"></div>
    </div>
  </div>
  <div class="crisp-header__content">
    <div class="crisp-header__top">
      <a href="#" target="_blank" class="osmo-logo">
      </a>
      <div class="crisp-header__hamburger">
        <div class="crisp-header__hamburger-bar"></div>
        <div class="crisp-header__hamburger-bar"></div>
        <div class="crisp-header__hamburger-bar"></div>
      </div>
    </div>
    <div class="crisp-header__center">
      <h1 class="crisp-header__h1">We just love pixels</h1>
    </div>
    <div class="crisp-header__bottom">
      <div class="crisp-header__slider-nav">
        <div data-slideshow="thumb" class="crisp-header__slider-nav-btn is--current"></div>
        <div data-slideshow="thumb" class="crisp-header__slider-nav-btn"></div>
        <div data-slideshow="thumb" class="crisp-header__slider-nav-btn"></div>
        <div data-slideshow="thumb" class="crisp-header__slider-nav-btn"></div>
        <div data-slideshow="thumb" class="crisp-header__slider-nav-btn"></div>
      </div>
      <p class="crisp-header__p">Crisp Loading Animation</p>
    </div>
  </div>
</section>
```text
# Step 2: Add CSS
```
/* Disable Scroll on Loading */
main:has(.crisp-header.is--loading) {
  height: 100dvh;
/* Loader */
.crisp-loader {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1vw;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
.crisp-loader__wrap {
  font-size: var(--size-font);
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
.crisp-loader__groups {
  position: relative;
  overflow: hidden;
.crisp-loader__group {
  border-radius: .5em;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
.crisp-loader__single {
  padding-left: 1em;
  padding-right: 1em;
  position: relative;
.crisp-loader__media {
  border-radius: .5em;
  justify-content: center;
  align-items: center;
  width: 10em;
  height: 10em;
  display: flex;
  position: relative;
.crisp-loader__media.is--scaling {
  will-change: transform;
  border-radius: 0;
  transition-property: border-radius;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(1, 0, 0, 1);
  display: flex;
.crisp-loader__cover-img {
  object-fit: cover;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  position: absolute;
.crisp-loader__media.is--scaling.is--radius {
  border-radius: .5em;
.crisp-loader__group.is--relative {
  position: relative;
  left: 100%;
.crisp-loader__group.is--duplicate {
  position: absolute;
.crisp-loader__cover-img.is--scale-down {
  will-change: transform;
.crisp-loader__fade {
  pointer-events: none;
  background-image: linear-gradient(90deg, #eaeaea 20%, #0000);
  width: 5em;
  height: calc(100% + 2px);
  position: absolute;
  top: -1px;
  left: -1px;
.crisp-loader__fade.is--duplicate {
  left: auto;
  right: -1px;
  transform: scaleX(-1);
/* Header */
.crisp-header {
  background-color: #eaeaea;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  overflow: hidden;
/* Loading: Hidden */
.crisp-header.is--loading.is--hidden {
  display: none;
/* Loading: is Loading */
.crisp-header.is--loading .crisp-header__slider {
  display: none;
.crisp-header.is--loading .crisp-loader {
  display: flex;
/* Loading: Loading Done */
.crisp-loader {
  display: none;
.crisp-header__content {
  color: #f4f4f4;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100dvh;
  padding: 2.5em;
  display: flex;
  position: relative;
.crisp-header__top {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  display: flex;
.crisp-header__center {
  width: 100%;
  padding: 1.5em;
  position: absolute;
  left: 0;
.crisp-header__bottom {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  align-items: center;
  margin-top: auto;
  display: flex;
.osmo-logo {
  color: unset;
  width: 8em;
  text-decoration: none;
  display: flex;
.osmo-logo__svg {
  display: block;
.crisp-header__hamburger {
  grid-column-gap: .375em;
  grid-row-gap: .375em;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  display: flex;
.crisp-header__hamburger-bar {
  background-color: currentColor;
  width: 1.875em;
  height: .125em;
.crisp-header__slider-list {
  grid-template-rows: 100%;
  grid-template-columns: 100%;
  place-items: center;
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
.crisp-header__slider-nav {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  padding: 1em;
  display: flex;
  position: relative;
  overflow: hidden;
.crisp-header__slider-nav-btn {
  cursor: pointer;
  border: 1px solid #0000;
  border-radius: .25em;
  width: 3.5em;
  height: 3.5em;
  position: relative;
  transition: border-color 0.75s cubic-bezier(0.625, 0.05, 0, 1);
.crisp-header__slider-nav-btn img {
  transform: scale(1) rotate(0.001deg);
  transition: transform 0.75s cubic-bezier(0.625, 0.05, 0, 1);
.crisp-header__slider-nav:has(.crisp-header__slider-nav-btn:hover) img {
  transform: scale(0.825) rotate(0.001deg);
.crisp-header__slider-nav:has(.crisp-header__slider-nav-btn:hover) .crisp-header__slider-nav-btn:hover img {
  transform: scale(1) rotate(0.001deg);
.crisp-header__slider-nav-btn.is--current {
  border-color: #f4f4f4;
.crisp-header__p {
  text-align: center;
  font-size: 1.125em;
.crisp-header__slider {
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  border-radius: .5em;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
.crisp-header__slider-slide {
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
.crisp-header__slider-slide.is--current {
  opacity: 1;
  pointer-events: auto;
.crisp-header__slider-slide-inner {
  object-fit: cover;
  will-change: transform;
  width: 100%;
  height: 100%;
  position: absolute;
.crisp-header__a {
  color: inherit;
  text-decoration: none;
.crisp-header__h1 {
  text-align: center;
  letter-spacing: -.04em;
  margin-top: 0;
  margin-bottom: .125em;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: calc(5vw + 5dvh);
  font-weight: 400;
  line-height: .95;
.crisp-header__h1 > * {
  margin: -0.1em -0.05em;
  padding: 0.1em 0.05em;
```text
```
gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create("slideshow-wipe", "0.625, 0.05, 0, 1");
// Loading Animation
function initCrispLoadingAnimation() {
  const container = document.querySelector(".crisp-header");
  const heading = container.querySelectorAll(".crisp-header__h1");
  const revealImages = container.querySelectorAll(".crisp-loader__group > *");
  const isScaleUp = container.querySelectorAll(".crisp-loader__media");
  const isScaleDown = container.querySelectorAll(".crisp-loader__media .is--scale-down");
  const isRadius = container.querySelectorAll(".crisp-loader__media.is--scaling.is--radius");
  const smallElements = container.querySelectorAll(".crisp-header__top, .crisp-header__p");
  const sliderNav = container.querySelectorAll(".crisp-header__slider-nav > *");
  /* GSAP Timeline */
  const tl = gsap.timeline({
    defaults: {
      ease: "expo.inOut",
    onStart: () => {
      container.classList.remove('is--hidden');
  });
  /* GSAP SplitText */
  let split;
  if (heading.length) {
    split = new SplitText(heading, {
      type: "words",
      mask: "words"
    });
    gsap.set(split.words, {
      yPercent: 110,
    });
  /* Start of Timeline */
  if (revealImages.length) {
    tl.fromTo(revealImages, {
      xPercent: 500
    }, {
      xPercent: -500,
      duration: 2.5,
      stagger: 0.05
    });
  if (isScaleDown.length) {
    tl.to(isScaleDown, {
      scale: 0.5,
      duration: 2,
      stagger: {
        each: 0.05,
        from: "edges",
        ease: "none"
      onComplete: () => {
        if (isRadius) {
          isRadius.forEach(el => el.classList.remove('is--radius'));
    }, "-=0.1");
  if (isScaleUp.length) {
    tl.fromTo(isScaleUp, {
      width: "10em",
      height: "10em"
    }, {
      width: "100vw",
      height: "100dvh",
      duration: 2
    }, "< 0.5");
  if (sliderNav.length) {
    tl.from(sliderNav, {
      yPercent: 150,
      stagger: 0.05,
      ease: "expo.out",
      duration: 1
    }, "-=0.9");
  if (split && split.words.length) {
    tl.to(split.words, {
      yPercent: 0,
      stagger: 0.075,
      ease: "expo.out",
      duration: 1
    }, "< 0.1");
  if (smallElements.length) {
    tl.from(smallElements, {
      opacity: 0,
      ease: "power1.inOut",
      duration: 0.2
    }, "< 0.15");
  tl.call(function () {
    container.classList.remove('is--loading');
  }, null, "+=0.45");
// Initialize Crisp Loading Animation
document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(() => {
    initCrispLoadingAnimation();
  });
});
// Slideshow
function initSlideShow(el) {
  const ui = {
    el,
    slides: Array.from(el.querySelectorAll('[data-slideshow="slide"]')),
    inner: Array.from(el.querySelectorAll('[data-slideshow="parallax"]')),
    thumbs: Array.from(el.querySelectorAll('[data-slideshow="thumb"]'))
  let current = 0;
  const length = ui.slides.length;
  let animating = false;
  const animationDuration = 1.5;
  ui.slides.forEach((slide, index) => slide.setAttribute('data-index', index));
  ui.thumbs.forEach((thumb, index) => thumb.setAttribute('data-index', index));
  ui.slides[current].classList.add('is--current');
  ui.thumbs[current].classList.add('is--current');
  function navigate(direction, targetIndex = null) {
    if (animating) return;
    animating = true;
    const previous = current;
    current =
      targetIndex !== null && targetIndex !== undefined
        ? targetIndex
        : direction === 1
          ? (current < length - 1 ? current + 1 : 0)
          : (current > 0 ? current - 1 : length - 1);
    const currentSlide = ui.slides[previous];
    const currentInner = ui.inner[previous];
    const upcomingSlide = ui.slides[current];
    const upcomingInner = ui.inner[current];
    gsap.timeline({
      defaults: { duration: animationDuration, ease: 'slideshow-wipe' },
      onStart() {
        upcomingSlide.classList.add('is--current');
        ui.thumbs[previous].classList.remove('is--current');
        ui.thumbs[current].classList.add('is--current');
      onComplete() {
        currentSlide.classList.remove('is--current');
        animating = false;
      .to(currentSlide, { xPercent: -direction * 100 }, 0)
      .to(currentInner, { xPercent: direction * 75 }, 0)
      .fromTo(upcomingSlide, { xPercent: direction * 100 }, { xPercent: 0 }, 0)
      .fromTo(upcomingInner, { xPercent: -direction * 75 }, { xPercent: 0 }, 0);
  ui.thumbs.forEach(thumb => {
    thumb.addEventListener('click', event => {
      const targetIndex = parseInt(event.currentTarget.getAttribute('data-index'), 10);
      if (targetIndex === current || animating) return;
      const direction = targetIndex > current ? 1 : -1;
      navigate(direction, targetIndex);
    });
  });
// Initialize Slideshow
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-slideshow="wrap"]').forEach(wrap => initSlideShow(wrap));
});
```text
# Step 3: Add custom CSS
```
/* Disable Scroll on Loading */
main:has(.crisp-header.is--loading) {
  height: 100dvh;
/* Loading: Hidden */
.crisp-header.is--loading.is--hidden {
  display: none;
/* Loading: is Loading */
.crisp-header.is--loading .crisp-header__slider {
  display: none;
.crisp-header.is--loading .crisp-loader {
  display: flex;
/* Loading: Loading Done */
.crisp-loader {
  display: none;
/* Webflow Editor */
:is(.wf-design-mode, .wf-editor) .crisp-header.is--loading.is--hidden,
:is(.wf-design-mode, .wf-editor) .crisp-header.is--loading.is--hidden .crisp-header__slider{
  display: flex;
:is(.wf-design-mode, .wf-editor) .crisp-header.is--loading.is--hidden .crisp-loader {
  display: none;
/* SplitText H1 */
.crisp-header__h1 > * {
  margin: -0.1em -0.05em;
  padding: 0.1em 0.05em;
/* CSS Animations */
.crisp-header__slider-nav-btn {
  transition: border-color 0.75s cubic-bezier(0.625, 0.05, 0, 1);
.crisp-header__slider-nav-btn img {
  transform: scale(1) rotate(0.001deg);
  transition: transform 0.75s cubic-bezier(0.625, 0.05, 0, 1);
.crisp-header__slider-nav:has(.crisp-header__slider-nav-btn:hover) img {
  transform: scale(0.825) rotate(0.001deg);
.crisp-header__slider-nav:has(.crisp-header__slider-nav-btn:hover) .crisp-header__slider-nav-btn:hover img {
  transform: scale(1) rotate(0.001deg);
```text
### Implementation
#### Loading Animation
For the loading animation we use a GSAP timeline with different kinds of easings, directional movement and class toggles. We use classes `.is--hidden` and `.is--loading` so the header only becomes visible on load.
To split the Heading `H1` into words we use [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/).
### Slideshow
Note: The slideshow is an optional part of the resource and is an adapted version of the [Parallax Image Gallery with Thumbnails](https://www.osmo.supply/resource/parallax-image-gallery-with-thumbnails) resource.
#### Slideshow wrapper
Use `[data-slideshow=“wrap”]` on the main container to initialize a slideshow instance.
#### Slide
Use `[data-slideshow=“slide”]` on each slide element so the script can track them in order, animate them horizontally with GSAP and toggle the.is--current class when a slide becomes active.  
#### Parallax inner
Use `[data-slideshow=“parallax”]` inside each slide to create the inner layer that moves at a reduced xPercent, giving the parallax offset relative to the outer slide during each transition.  
#### Thumbnail
Use `[data-slideshow=“thumb”]` on clickable elements that should act as slide thumbnails so the script can assign matching `[data-index]` values, listen for click events and navigate to the corresponding slide while updating the `.is--current` state.