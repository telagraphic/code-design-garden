---
title: "Scroll Progress Number"
description: "Scroll Progress Number."
slug: "scroll-progress-number"
previewVideo: "scroll-progress-number.mp4"
order: 49.854
published: true
categories: ["scroll"]
triggers: ["scroll", "load"]
libraries: ["gsap"]
keywords: ["scroll", "progress", "number"]
sourceUrl: "https://www.osmo.supply/resource/scroll-progress-number"
---
## Setup
### Scripts
```javascript
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```
### HTML
```html
<p data-progress-nr="" class="progress-nr">00</p>
```
### CSS
```css
.progress-nr {
  margin: 0px;
  font-size: 5em;
  font-weight: 500;
  line-height: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger);
function initScrollProgressNumber() {  
  const progressCounter = document.querySelector('[data-progress-nr]');
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    onUpdate: (self) => {
      const progress = Math.round(self.progress * 100); // Calculate progress as a percentage
      progressCounter.textContent = progress.toString().padStart(2, '0'); // Update counter
    },
  });
}
// Initialize Scroll Progress Number
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressNumber();
});
```