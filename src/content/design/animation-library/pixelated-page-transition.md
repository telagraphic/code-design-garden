---
title: "Pixelated Page Transition"
description: "Pixelated Page Transition."
slug: "pixelated-page-transition"
previewVideo: "pixelated-page-transition.mp4"
order: 49.864
published: true
categories: ["page-transition"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["pixelated", "page", "transition"]
sourceUrl: "https://www.osmo.supply/resource/pixelated-page-transition"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
```
### HTML
```text
<div class="transition">
  <div class="transition-block"></div>
</div>
```
### CSS
```text
.transition {
  z-index: 100;
  background-color: #ff4c24;
  flex-flow: wrap;
  grid-template-columns: repeat(8, 1fr);
  place-content: center;
  place-items: center;
  width: 100%;
  min-height: 100vh;
  display: none;
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
}
.transition-block {
  aspect-ratio: 1;
  background-color: #ff4c24;
  width: 100%;
}
@media screen and (max-width: 767px) {
  .transition {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media screen and (max-width: 479px) {
  .transition {
    grid-template-columns: repeat(4, 1fr);
  }
}
```
### Javascript
```javascript
function adjustGrid() {
  return new Promise((resolve) => {
    const transition = document.querySelector('.transition');
    // Get computed style of the grid and extract the number of columns
    const computedStyle = window.getComputedStyle(transition);
    const gridTemplateColumns = computedStyle.getPropertyValue('grid-template-columns');
    const columns = gridTemplateColumns.split(' ').length; // Count the number of columns
    const blockSize = window.innerWidth / columns;
    const rowsNeeded = Math.ceil(window.innerHeight / blockSize);
    // Update grid styles
    transition.style.gridTemplateRows = \`repeat(${rowsNeeded}, ${blockSize}px)\`;
    // Calculate the total number of blocks needed
    const totalBlocks = columns * rowsNeeded;
    // Clear existing blocks
    transition.innerHTML = '';
    // Generate blocks dynamically
    for (let i = 0; i < totalBlocks; i++) {
      const block = document.createElement('div');
      block.classList.add('transition-block');
      transition.appendChild(block);
    }
    // Resolve the Promise after grid creation is complete
    resolve();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  adjustGrid().then(() => {
    let pageLoadTimeline = gsap.timeline({
      onStart: () => {
        gsap.set(".transition", { background: "transparent" });
      },
      onComplete: () => {
        gsap.set(".transition", { display: "none" });
      },
      defaults: {
        ease: "linear"
      }
    });
    // Play the timeline only after the grid is ready
    pageLoadTimeline.to(".transition-block", {
      opacity: 0,
      duration: 0.1,
      stagger: { amount: 0.75, from: "random" },
    }, 0.5);
  });
  // Pre-process all valid links
  const validLinks = Array.from(document.querySelectorAll("a")).filter(link => {
    const href = link.getAttribute("href") || "";
    const hostname = new URL(link.href, window.location.origin).hostname;
    return (
      hostname === window.location.hostname && // Same domain
      !href.startsWith("#") &&                 // Not an anchor link
      link.getAttribute("target") !== "_blank" && // Not opening in a new tab
      !link.hasAttribute("data-transition-prevent") // No 'data-transition-prevent' attribute
    );
  });
  // Add event listeners to pre-processed valid links
  validLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const destination = link.href;
      // Show loading grid with animation
      gsap.set(".transition", { display: "grid" });
      gsap.fromTo(
        ".transition-block",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.001,
          ease: "linear",
          stagger: { amount: 0.5, from: "random" },
          onComplete: () => {
            window.location.href = destination;
          }
        }
      );
    });
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      window.location.reload();
    }
  });
  window.addEventListener('resize', adjustGrid);
});
```
### HTML
```text
<style>
/* Place this CSS in your <head> code in the page settings */
/* Show grid on page load (it's set to display none in Webflow) */
.transition{ display: grid; }
/* Hide grid in the editor */
.w-editor .transition{ display: none; }
</style>
```
### Implementation
#### Container
Use `.transition` as the main wrapper that holds all pixel blocks. It should be fixed, cover the entire viewport, and start hidden (`display: none`).
#### Block
Each `.transition-block` represents a single pixel in the transition grid. The script creates and removes these blocks dynamically based on the viewport size.
#### Grid Generation
The number of columns is detected from your CSS `grid-template-columns` value on `.transition`.
The script then calculates how many rows are required to fill the viewport and populates it with the correct number of `.transition-block` elements.
#### Adjusting Columns
To control pixel density, change the column count in CSS:
### CSS
```text
.transition {
  grid-template-columns: repeat(8, 1fr);
}
```
#### Animation
When a valid link is clicked, GSAP sets `.transition` to `display: grid` and fades in the `.transition-block` elements with a random stagger.
Once the blocks are fully visible, the new page is loaded. On page load, the grid fades back out with another random stagger for a smooth entry.
#### Valid Links
The transition only applies to internal links that:
- belong to the same domain
- do not open in a new tab
- do not start with `#`
- do not include `[data-transition-prevent]`
Add `[data-transition-prevent]` to any link that should skip the animation.
#### Tips
Keep your grid color high-contrast with the page background for the strongest visual effect.
For performance on mobile, reduce the total number of columns and rows.