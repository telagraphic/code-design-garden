---
title: "Scroll Progress Bar"
description: "Scroll Progress Bar."
slug: "scroll-progress-bar"
previewVideo: "scroll-progress-bar.mp4"
order: 49.855
published: true
categories: ["cursor", "scroll"]
triggers: ["scroll", "hover", "click", "load"]
libraries: ["gsap"]
keywords: ["scroll", "progress", "bar"]
sourceUrl: "https://www.osmo.supply/resource/scroll-progress-bar"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<!-- Optional if you want to have the 'click to scroll to' functionality-->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js"></script>
```
### HTML
```text
<div class="progress-bar-wrap">
  <div class="progress-bar"></div>
</div>
```
### CSS
```text
.progress-bar-wrap {
  z-index: 10;
  cursor: pointer;
  width: 100%;
  height: 1.5rem;
  transition: background-color .2s;
  position: fixed;
  inset: 0% 0% auto;
}
.progress-bar-wrap:hover {
  background-color: #0000000d;
}
.progress-bar {
  transform-origin: 0%;
  transform-style: preserve-3d;
  background-color: #ff4c24;
  width: 100%;
  height: 100%;
  transform: scale3d(0, 1, 1);
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
function initScrollProgressBar() {  
  const progressBar = document.querySelector('.progress-bar');
  const progressBarWrap = document.querySelector('.progress-bar-wrap');
  // Animate the progress bar as you scroll
  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none', // no ease, we control smoothness with the 'scrub' property
    scrollTrigger: {
      trigger: document.body, // Track the entire page
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5, // control the amount of time it takes for the bar to catch up with scroll position
    },
  });
  // Click listener to scroll to a specific position, feel free to remove if you dont want it!
  progressBarWrap.addEventListener('click', (event) => {
    const clickX = event.clientX;
    const progress = clickX / progressBarWrap.offsetWidth;
    const scrollPosition = progress * (document.body.scrollHeight - window.innerHeight);
    gsap.to(window, {
      scrollTo: scrollPosition,
      duration: 0.725,
      ease: 'power3.out',
    });
  });  
}
// Initialize Scroll Progress Bar
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
});
```
### Implementation
#### Click-to-scroll option
For demo purposes, we've added a click listener on the `progress-bar-wrap`. This is of course optional, so if you don't want this feature, feel free to remove the entire click event listener and remove the GSAP ScrollToPlugin.