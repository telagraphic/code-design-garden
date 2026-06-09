---
title: "Image to Background (Zoom)"
description: "Image to Background (Zoom)."
slug: "image-to-background"
previewVideo: "image-to-background.mp4"
order: 49.913
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["image", "background", "zoom"]
sourceUrl: "https://www.osmo.supply/resource/image-to-background-zoom"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/Flip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<section data-bg-zoom-init="" class="background-zoom">
  <div class="background-zoom__title">
    <h1 class="background-zoom__h">Image to Background<span class="background-zoom__h1-span"> (Zoom)</span></h1>
  </div>
  <div data-bg-zoom-start="" class="background-zoom__start">
    <div data-bg-zoom-content="" class="background-zoom__content">
      <p class="background-zoom__pod">PØDRICK</p>
      <div class="background-zoom__play">
      </div>
      <div data-bg-zoom-dark="" class="background-zoom__dark"></div>
    </div>
  </div>
  <div data-bg-zoom-end="" class="background-zoom__end"></div>
  <div class="background-zoom__text">
    <h2 class="background-zoom__h">This is the after phase of the <br><span class="background-zoom__h1-span">(Zoom)</span></h2>
    <h2 class="background-zoom__h is--margin-top">more...</h2>
    <h2 class="background-zoom__h is--margin-top">and more!</h2>
  </div>
</section>
<section class="background-zoom-after">
  <p class="background-zoom-after__pod">PØDRICK</p>
  <h2 class="background-zoom__h">And we reached the end!</h2>
</section>
```
### CSS
```text
.background-zoom {
  color: #f4f4f4;
  background-color: #353d35;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  padding-top: calc(50dvh - 15em);
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  overflow: clip;
}
.background-zoom__h {
  text-align: center;
  letter-spacing: -.04em;
  max-width: 7em;
  margin-top: 0;
  margin-bottom: -.375em;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: 7.5em;
  font-weight: 400;
  line-height: .95;
}
.background-zoom__h.is--margin-top {
  margin-top: 33dvh;
}
.background-zoom__h1-span {
  color: #aba994;
}
.background-zoom__start {
  aspect-ratio: 1;
  border-radius: 16em;
  width: 16em;
  position: relative;
}
.background-zoom__content {
  border-radius: inherit;
  will-change: width, height, transform;
  background-color: #aba994;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  overflow: hidden;
}
.background-zoom__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}
.background-zoom__pod {
  color: #ff4800;
  text-align: center;
  letter-spacing: -.02em;
  width: 100%;
  font-size: 1.25em;
  font-weight: 900;
  line-height: 1;
  position: absolute;
  top: 1.25em;
}
.background-zoom__play {
  width: 4em;
  height: 4em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.background-zoom__play-svg {
  width: 100%;
}
.background-zoom__dark {
  opacity: 0;
  background-color: #0d0f0d;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.background-zoom__end {
  width: 100vw;
  height: 100dvh;
}
.background-zoom__text {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  align-items: center;
  width: 100%;
  padding-bottom: calc(50dvh - 12em);
  display: flex;
  position: relative;
}
.background-zoom-after {
  color: #353d35;
  font-size: var(--size-font);
  background-color: #f4f4f4;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100dvh;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  position: relative;
}
.background-zoom-after__pod {
  color: #ff4800;
  text-align: center;
  letter-spacing: -.02em;
  width: 100%;
  font-size: 1.25em;
  font-weight: 900;
  line-height: 1;
  position: absolute;
  bottom: 1.25em;
}
@media screen and (max-width: 767px) {
  .background-zoom__h {
    font-size: 3.75em;
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger, Flip);
function initBackgroundZoom() {
  const containers = document.querySelectorAll("[data-bg-zoom-init]");
  if (!containers.length) return;
  let masterTimeline;
  const getScrollRange = ({ trigger, start, endTrigger, end }) => {
    const st = ScrollTrigger.create({ trigger, start, endTrigger, end });
    const range = Math.max(1, st.end - st.start);
    st.kill();
    return range;
  };
  const bgZoomTimeline = () => {
    if (masterTimeline) masterTimeline.kill();
    masterTimeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: containers[0].querySelector("[data-bg-zoom-start]") || containers[0],
        start: "clamp(top bottom)", // Change to "center center" to start from center of [data-bg-zoom-start]
        endTrigger: containers[containers.length - 1],
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });
    containers.forEach((container) => {
      const startEl = container.querySelector("[data-bg-zoom-start]");
      const endEl = container.querySelector("[data-bg-zoom-end]");
      const contentEl = container.querySelector("[data-bg-zoom-content]");
      const darkEl = container.querySelector("[data-bg-zoom-dark]");
      const imgEl = container.querySelector("[data-bg-zoom-img]");
      if (!startEl || !endEl || !contentEl) return;
      const startRadius = getComputedStyle(startEl).borderRadius;
      const endRadius = getComputedStyle(endEl).borderRadius;
      const hasRadius = startRadius !== "0px" || endRadius !== "0px";
      contentEl.style.overflow = hasRadius ? "hidden" : "";
      if (hasRadius) gsap.set(contentEl, { borderRadius: startRadius });
      Flip.fit(contentEl, startEl, { scale: false });
      // Part 1 - Move from Start to End position
      const zoomScrollRange = getScrollRange({
        trigger: startEl,
        start: "clamp(top bottom)", // Change to "center center" to start from center of [data-bg-zoom-start]
        endTrigger: endEl,
        end: "center center"
      });
      // Part 2 - End position to out of view
      const afterScrollRange = getScrollRange({
        trigger: endEl,
        start: "center center",
        endTrigger: container,
        end: "bottom top"
      });
      // Master Timeline
      masterTimeline.add(
        Flip.fit(contentEl, endEl, {
          duration: zoomScrollRange,
          ease: "none",
          scale: false,
        })
      );
      // Border Radius  
      if (hasRadius) {
        masterTimeline.to(contentEl, { 
            borderRadius: endRadius, 
            duration: zoomScrollRange 
        }, "<");
      }
      // Content Y Position  
      masterTimeline.to(contentEl, {
        y: \`+=${afterScrollRange}\`,
        duration: afterScrollRange
      });
       // Dark Overlay
      if (darkEl) {
        gsap.set(darkEl, { opacity: 0 });
        masterTimeline.to(darkEl, { 
          opacity: 0.75, 
          duration: afterScrollRange * 0.25,
        }, "<");
      }
      // Image scale
      if (imgEl) {
        gsap.set(imgEl, { scale: 1, transformOrigin: "50% 50%" });
        masterTimeline.to(imgEl, { 
          scale: 1.25, 
          yPercent: -10,
          duration: afterScrollRange 
        }, "<");
      }
    });
    ScrollTrigger.refresh();
  };
  bgZoomTimeline();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(bgZoomTimeline, 100);
  });
}
// Initialize Image to Background (Zoom)
document.addEventListener('DOMContentLoaded', function() {
  initBackgroundZoom();
});
```
### Implementation
This script uses GSAP together with the Flip and ScrollTrigger plugins to create a smooth scroll-based zoom effect. Flip handles the layout transition between the start and end elements, while ScrollTrigger links the animation progress directly to scroll position so everything stays in sync.
#### Container
Use `[data-bg-zoom-init]` to define a single background zoom section that participates in the scroll-driven zoom sequence.
#### Start
Use `[data-bg-zoom-start]` as the initial visual state that the content element matches before the zoom animation begins.  
#### End
Use `[data-bg-zoom-end]` as the final visual state that the content element transitions into during the zoom phase.  
#### Content
Use `[data-bg-zoom-content]` as the element that morphs in size and position from the start state to the end state using Flip.  
#### Dark overlay
Use `[data-bg-zoom-dark]` to fade in a dark overlay after the zoom has completed while the section scrolls out of view.  
#### Image
Use `[data-bg-zoom-img]` to scale and slightly translate the image during the after phase once the zoom is finished.  
#### Scroll start behavior
In the GSAP Timeline use start: `"clamp(top bottom)"` to begin the zoom as soon as the start element enters the viewport, or change it to start: `"center center"` to delay the zoom until the start element is centered *(make sure to change it at both timelines)*.