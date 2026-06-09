---
title: "Image Trail Following Cursor"
description: "Image Trail Following Cursor."
slug: "image-trail-following-cursor"
previewVideo: "image-trail-following-cursor.mp4"
order: 49.912
published: true
categories: ["cursor", "text"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["image", "trail", "following", "cursor"]
sourceUrl: "https://www.osmo.supply/resource/image-trail-following-cursor"
---
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js"></script>
```text
HTML
```
<div data-trail="wrapper" class="trail-section">
  <h1 class="trail-heading">Cursor Image Trail</h1>
  <div class="trail-wrap">
    <div class="trail-list">
      <div data-trail="item" class="trail-item"></div>
      <div data-trail="item" class="trail-item"></div>
      <div data-trail="item" class="trail-item"></div>
      <div data-trail="item" class="trail-item"></div>
      <div data-trail="item" class="trail-item"></div>
      <div data-trail="item" class="trail-item"></div>
      <div data-trail="item" class="trail-item"></div>
      <div data-trail="item" class="trail-item"></div>
      <div data-trail="item" class="trail-item"></div>
      <div data-trail="item" class="trail-item"></div>
    </div>
  </div>
</div>
```text
CSS
```
.trail-section {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
.trail-heading {
  font-size: 3em;
  font-weight: 500;
  line-height: 1;
.trail-wrap {
  z-index: 5;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
.trail-list {
  width: 100%;
  height: 100%;
  position: relative;
.trail-item {
  opacity: 0;
  border-radius: .3125em;
  width: 15em;
  height: 20em;
  position: absolute;
  overflow: hidden;
.trail-item__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
```text
Javascript
```
function initImageTrail(config = {}) {
  // config + defaults
  const options = {
    minWidth: config.minWidth ?? 992,
    moveDistance: config.moveDistance ?? 15,
    stopDuration: config.stopDuration ?? 300,
    trailLength: config.trailLength ?? 5
  const wrapper = document.querySelector('[data-trail="wrapper"]');
  if (!wrapper || window.innerWidth < options.minWidth) {
    return;
  // State management
  const state = {
    trailInterval: null,
    globalIndex: 0,
    last: { x: 0, y: 0 },
    trailImageTimestamps: new Map(),
    trailImages: Array.from(document.querySelectorAll('[data-trail="item"]')),
    isActive: false
  // Utility functions
  const MathUtils = {
    lerp: (a, b, n) => (1 - n) * a + n * b,
    distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
  function getRelativeCoordinates(e, rect) {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
  function activate(trailImage, x, y) {
    if (!trailImage) return;
    const rect = trailImage.getBoundingClientRect();
    const styles = {
      left: \`${x - rect.width / 2}px\`,
      top: \`${y - rect.height / 2}px\`,
      zIndex: state.globalIndex,
      display: 'block'
    Object.assign(trailImage.style, styles);
    state.trailImageTimestamps.set(trailImage, Date.now());
    // Here, animate how the images will appear!
    gsap.fromTo(
      trailImage,
      { autoAlpha: 0, scale: 0.8 },
        scale: 1,
        autoAlpha: 1,
        duration: 0.2,
        overwrite: true
    state.last = { x, y };
  function fadeOutTrailImage(trailImage) {
    if (!trailImage) return;
    // Here, animate how the images will disappear!
    gsap.to(trailImage, {
      opacity: 0,
      scale: 0.2,
      duration: 0.8,
      ease: "expo.out",
      onComplete: () => {
        gsap.set(trailImage, { autoAlpha: 0 });
    });
  function handleOnMove(e) {
    if (!state.isActive) return;
    const rectWrapper = wrapper.getBoundingClientRect();
    const { x: relativeX, y: relativeY } = getRelativeCoordinates(e, rectWrapper);
    const distanceFromLast = MathUtils.distance(
      relativeX, 
      relativeY, 
      state.last.x, 
      state.last.y
    if (distanceFromLast > window.innerWidth / options.moveDistance) {
      const lead = state.trailImages[state.globalIndex % state.trailImages.length];
      const tail = state.trailImages[(state.globalIndex - options.trailLength) % state.trailImages.length];
      activate(lead, relativeX, relativeY);
      fadeOutTrailImage(tail);
      state.globalIndex++;
  function cleanupTrailImages() {
    const currentTime = Date.now();
    for (const [trailImage, timestamp] of state.trailImageTimestamps.entries()) {
      if (currentTime - timestamp > options.stopDuration) {
        fadeOutTrailImage(trailImage);
        state.trailImageTimestamps.delete(trailImage);
  function startTrail() {
    if (state.isActive) return;
    state.isActive = true;
    wrapper.addEventListener("mousemove", handleOnMove);
    state.trailInterval = setInterval(cleanupTrailImages, 100);
  function stopTrail() {
    if (!state.isActive) return;
    state.isActive = false;
    wrapper.removeEventListener("mousemove", handleOnMove);
    clearInterval(state.trailInterval);
    state.trailInterval = null;
    // Clean up remaining trail images
    state.trailImages.forEach(fadeOutTrailImage);
    state.trailImageTimestamps.clear();
  // Initialize ScrollTrigger
  ScrollTrigger.create({
    trigger: wrapper,
    start: "top bottom",
    end: "bottom top",
    onEnter: startTrail,
    onEnterBack: startTrail,
    onLeave: stopTrail,
    onLeaveBack: stopTrail
  });
  // Clean up on window resize
  const handleResize = () => {
    if (window.innerWidth < options.minWidth && state.isActive) {
      stopTrail();
    } else if (window.innerWidth >= options.minWidth && !state.isActive) {
      startTrail();
  window.addEventListener('resize', handleResize);
  return () => {
    stopTrail();
    window.removeEventListener('resize', handleResize);
document.addEventListener("DOMContentLoaded", () => {
  const imageTrail = initImageTrail({
    minWidth: 992,
    moveDistance: 15,
    stopDuration: 350,
    trailLength: 8
  });
});
```text
CSS
### Application
The code will look for an element with `data-trail="wrapper" ` on it. This is most likely a specific section or element in which you want to show the trail. Make sure that inside, there's a list of images, each with a `data-trail="item"` attribute. A cool feature is that event listeners for mouse movement are only added to the wrapper once it's in view. So there's no unnecessary code being ran if the trail section is not even in view. The code offers the ability to init the trail with some config options, which are explained below!
### Customization
The trail effect can be initialized with custom options:
```
initFooterTrail({
  minWidth: 992,    // Breakpoint in pixels - below this width, the effect is disabled
  moveDistance: 15,  // Controls how fast images appear (lower = more frequent)
  stopDuration: 300, // Time in ms before images start fading when mouse stops
  trailLength: 5     // Number of images visible before they start fading out
});
```text
### Cleanup
The function returns a cleanup method that can be stored to manually remove the effect when needed:
```
const removeFooterTrail = initFooterTrail({...});
// Later, to clean up:
removeFooterTrail(); // Removes all event listeners and stops animations
```text
This is useful when you need to:
- Disable the trail effect programmatically
- Clean up before page transitions in SPAs
- Recreate the trail with different settings