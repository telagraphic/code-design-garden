---
title: "Skeleton Loader Text"
description: "Skeleton Loader Text."
slug: "skeleton-loader-text"
previewVideo: "skeleton-loader-text.mp4"
order: 49.849
published: true
categories: ["loader", "text", "layout"]
triggers: ["scroll", "load"]
libraries: ["gsap"]
keywords: ["skeleton", "loader", "text"]
sourceUrl: "https://www.osmo.supply/resource/skeleton-loader-text"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
```
### HTML
```text
<div class="demo-group">
  <div class="ghost-section">
    <h1 data-load-skeleton="dark" class="ghost-heading">This heading will reveal with an effect called a ‘skeleton loader’.</h1>
  </div>
  <div class="ghost-section is--light">
    <h1 data-load-skeleton="light" class="ghost-heading">→ Fully attribute based<br>→ Set different themes<br>→ Control skeleton styling<br></h1>
  </div>
  <div class="ghost-section">
    <h1 data-load-skeleton="dark" class="ghost-heading is--small">The idea and concept of Skeleton Loading was introduced in 2013 by Luke Wroblewski. It describes the concept of a blank screen where dynamic content is replaced by styled blocks (skeleton) and is replaced with real content once it&#x27;s finished loading.</h1>
  </div>
</div>
```
### CSS
```text
.ghost-section {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
}
.ghost-section.is--light {
  color: #121422;
  background-color: #cdf7ff;
}
.ghost-heading {
  letter-spacing: -.03em;
  text-transform: uppercase;
  max-width: 15em;
  margin-top: 0;
  margin-bottom: 0;
  font-family: RM Mono, Arial, sans-serif;
  font-size: 4em;
  font-weight: 400;
  line-height: 1;
}
.ghost-heading.is--small {
  max-width: 25em;
  font-size: 2.5em;
  line-height: 1.1;
}
/* Define color themes here */
[data-load-skeleton="dark"]{
  --color-skeleton-base: #2E3643;
  --color-skeleton-pulse: #53636F; 
}
[data-load-skeleton="light"]{
  --color-skeleton-base: #B1D5DE;
  --color-skeleton-pulse: #8CA8B2; 
}
/* Hide actual text line so that its not visible underneath the placeholder div */
[data-load-skeleton] .single-line{
  visibility: hidden;
}
/* Style your placeholder/skeleton div over here */
.skeleton-overlay{
  position: absolute;
  top: 50%;
  transform: translate(0px, -50%);
  left: 0px;
  width: 100%;
  height: 80%;
  border-radius: 0.25rem;
  z-index: 1;
  background-color: var(--color-skeleton-base);
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger, SplitText)
// Cleanup function to remove previous SplitText instances, overlays, and ScrollTriggers
function cleanup() {
  // Remove SplitText instances and overlays from each skeleton target
  document.querySelectorAll('[data-load-skeleton]').forEach(target => {
    // Clean up SplitText instance if it exists
    if (target.splitInstance) {
      target.splitInstance.revert();
      delete target.splitInstance;
    }
    // Remove any existing overlays
    target.querySelectorAll('.skeleton-overlay').forEach(overlay => overlay.remove());
  });
  // Kill ScrollTriggers associated with our skeleton overlays
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars && trigger.vars.trigger && trigger.vars.trigger.closest('[data-load-skeleton]')) {
      trigger.kill();
    }
  });
}
function initSplit() {
  let skeletonLoadTargets = document.querySelectorAll('[data-load-skeleton]');
  // For each skeleton load target
  skeletonLoadTargets.forEach(target => {
    let splitInstance = new SplitText(target, {
      type: "lines",
      linesClass: "single-line",
    });
    // Save instance for cleanup later
    target.splitInstance = splitInstance;
    // Save text as aria label for screen readers
    target.setAttribute("aria-label", target.textContent);
    // For each line:
    splitInstance.lines.forEach(line => {
      // Hide it from screen readers
      line.setAttribute("aria-hidden", "true");
      // Add a div around each line
      let wrapper = document.createElement('div');
      wrapper.classList.add('single-line-wrap');
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
  });
}
function initSkeletonLoader() {
  const instances = document.querySelectorAll('[data-load-skeleton]');
  instances.forEach(instance => {
    const overlays = [];
    const lineWrappers = instance.querySelectorAll('.single-line-wrap');
    // Create an overlay element in each line wrapper, and store in the array for later use
    lineWrappers.forEach(wrapper => {
      const overlay = document.createElement('div');
      overlay.classList.add('skeleton-overlay');
      wrapper.style.position = 'relative';
      wrapper.appendChild(overlay);
      overlays.push(overlay);
    });
    // Create a timeline for each overlay
    overlays.forEach((overlay, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: overlay,
          start: "top 90%",
          once: true
        },
        defaults: {
          duration: 0.5, // duration for fade-out
          ease: "power2.inOut" // ease for fade-out
        }
      });
      // Use GSAP's getProperty method to read the CSS variable for pulse color
      const pulseColor = gsap.getProperty(instance, "--color-skeleton-pulse");
      // Find the text element to fade-in at the end (the line itself)
      const textEl = overlay.previousElementSibling;
      tl.to(overlay, {
        backgroundColor: pulseColor,
        duration: 0.3,
        ease: "power1.inOut",
        repeat: 2,
        yoyo: true,
        delay: i * 0.05
      })
      .to(overlay, {
        opacity: 0,
        onComplete: () => overlay.remove()
      })
      .to(textEl, {
        autoAlpha: 1
      }, "<");
    });
  });
}
// Function to init splitting, skeleton, and cleanup
function initTextEffects() {
  cleanup();
  initSplit();
  initSkeletonLoader();
}
let prevWidth = window.innerWidth;
// Debounce function to limit the rate of function calls
const onResize = debounce(() => {
  const currentWidth = window.innerWidth;
  if (currentWidth !== prevWidth) {
    prevWidth = currentWidth;
    initTextEffects();
  }
}, 250);
window.addEventListener('resize', onResize);
// Initialize split text, skeleton loader, and cleanup on load
document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(initTextEffects);
});
```
### CSS
```text
[data-load-skeleton="dark"]{
  --color-skeleton-base: #2E3643;
  --color-skeleton-pulse: #53636F; 
}
[data-load-skeleton="light"]{
  --color-skeleton-base: #B1D5DE;
  --color-skeleton-pulse: #8CA8B2; 
}
/* Hide actual text line so that its not visible underneath the placeholder div */
[data-load-skeleton] .single-line{
  visibility: hidden;
}
/* Style your placeholder/skeleton div over here */
.skeleton-overlay{
  position: absolute;
  top: 50%;
  transform: translate(0px, -50%);
  left: 0px;
  width: 100%;
  height: 80%;
  border-radius: 0.25rem;
  z-index: 1;
  background-color: var(--color-skeleton-base);
}
```
### Implementation
The main thing here is adding a `data-load-skeleton` attribute on a text element. Then, add an attribute value of your choice. This will define the color theme of your skeleton/overlay div blocks. For example, we've got `data-load-skeleton="dark"`. Then in CSS, make sure to define 2 variables for each theme you might want to have on the site. Here's an example:
### CSS
```text
[data-load-skeleton="dark"]{
  --color-skeleton-base: #2E3643;
  --color-skeleton-pulse: #53636F; 
}
```
The usage of GSAPs [`getProperty()`](https://gsap.com/docs/v3/GSAP/gsap.getProperty\(\)/) method makes sure that the GSAP tween to animate the color of our skeletons can pull the color from CSS, so no need to define that in JS too! The only values you might want to play around with is the duration, repetitions and easing of those skeletons. All of that is defined in the GSAP timeline inside of the `initSkeletonLoader()` function. Have fun experimenting!
### Best practices
We've included a bunch of best practices for this one. The main thing is our `cleanup()` function. This one is called on resize of the window, to make sure ScrollTriggers are killed, overlays are removed, and the text split is undone. This resize listener is also *debounced*, meaning that there's a delay of 250ms (you can change this) between any resize event and the execution of our function. This just makes sure that when a user is resizing, our functions are not called in super frequently. When the resize is over, we just re-do all the skeleton loaders to account for any wrapping of text blocks etc.