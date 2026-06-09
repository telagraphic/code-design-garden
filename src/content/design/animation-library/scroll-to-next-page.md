---
title: "Scroll To Next Page"
description: "Scroll To Next Page."
slug: "scroll-to-next-page"
previewVideo: "scroll-to-next-page.mp4"
order: 49.853
published: true
categories: ["scroll", "text", "media"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["scroll", "next", "page"]
sourceUrl: "https://www.osmo.supply/resource/scroll-to-next-page"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<section data-scroll-next-wrap data-scroll-start="top top" data-scroll-end="bottom bottom" class="scroll-next">
  <a data-scroll-next-link href="#" class="scroll-next__inner">
    <div class="scroll-next__bg">
      <div data-scroll-next-overlay class="scroll-next__bg-overlay"></div>
    </div>
    <div class="scroll-next__center">
      <span class="scroll-next__sub">Next Case:</span>
      <h2 class="scroll-next__h">Gravix</h2>
    </div>
    <div class="scroll-next__progres">
    </div>
  </a>
</section>
```
### CSS
```text
.scroll-next {
  min-height: 200vh;
  position: relative;
}
.scroll-next__inner {
  width: 100%;
  height: 100dvh;
  color: inherit;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  display: flex;
  position: sticky;
  top: 0;
}
.scroll-next__bg {
  z-index: 0;
  position: absolute;
  inset: 0%;
  overflow: hidden;
}
.scroll-next__bg-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.scroll-next__bg-overlay {
  z-index: 2;
  opacity: .25;
  background-color: #000;
  position: absolute;
  inset: 0%;
}
.scroll-next__center {
  z-index: 2;
  grid-column-gap: 0em;
  grid-row-gap: 0em;
  color: #fff;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1em;
  display: flex;
  position: relative;
}
.scroll-next__sub {
  opacity: .6;
  letter-spacing: -.05em;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  line-height: 1;
}
.scroll-next__h {
  letter-spacing: -.06em;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: 6.25em;
  font-weight: 400;
  line-height: 1;
}
.scroll-next__progres {
  z-index: 1;
  color: #fff;
  width: 30em;
  position: absolute;
}
.scroll-next__progres-svg {
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  transform: rotate(-90deg);
  overflow: visible !important;
}
```
### Javascript
```javascript
function initScrollToNextPage() {
  const wrap = document.querySelector("[data-scroll-next-wrap]");
  if (!wrap) return;
  const link = wrap.querySelector("[data-scroll-next-link]");
  const path = wrap.querySelector("[data-scroll-next-path]");
  const bg = wrap.querySelector("[data-scroll-next-bg]");
  const overlay = wrap.querySelector("[data-scroll-next-overlay]");
  if (!link || !path) return;
  // ScrollTrigger defaults
  const start = wrap.getAttribute("data-scroll-start") || "top top";
  const end = wrap.getAttribute("data-scroll-end") || "bottom bottom";
  // Prep SVG path for line draw animation
  const pathLength = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });
  const tl = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: wrap,
      start,
      end,
      scrub: true,
    },
  });
  tl.to(path, {
    strokeDashoffset: 0,
    onComplete: () => {
      link.click();
    }
  });
  // Optional bg scale
  if (bg) {
    tl.to(bg, { scale: 1.2 }, 0);
  }
 // Optional dark overlay animation
  if (overlay) {
    tl.to(overlay, { opacity: 0.5 }, 0);
  }
}
// Initialize Scroll to Next Page
document.addEventListener("DOMContentLoaded", () => {
  initScrollToNextPage();
});
```
### CSS
### Implementation
#### Wrap
Place `[data-scroll-next-wrap]` on the section that controls the full scroll distance of the interaction. This element needs enough height for the animation to play through properly; in our example, it’s set to `200vh,` which gives the user some distance to scroll and understand the interaction before the next page is triggered.
#### Sticky
Inside `[data-scroll-next-wrap]`, include one element with `position: sticky` and `top: 0` so the content stays pinned in the viewport while the parent section keeps scrolling. In our example, this sticky element is `.scroll-next__inner` with a height of `100dvh`.
#### Link
Add `[data-scroll-next-link]` to the link that should be clicked once the scroll animation completes. In our example, the sticky element is also the link, but this is not required, the link just needs to live somewhere inside `[data-scroll-next-wrap]`.
#### Scroll Start
Add `[data-scroll-start]` on `[data-scroll-next-wrap]` to control when the ScrollTrigger starts. This accepts any valid GSAP ScrollTrigger start value, and if you do not set it, the script uses `"top top"`.
#### Scroll End
Add `[data-scroll-end]` on `[data-scroll-next-wrap]` to control when the ScrollTrigger ends. This accepts any valid GSAP ScrollTrigger end value, and if you do not set it, the script uses `"bottom bottom"`.
#### Path
Add `[data-scroll-next-path]` to any SVG shape whose stroke can be revealed, since the script animates its stroke-dashoffset from hidden to fully drawn. In our example, this is a circle, but the same idea also works with other SVG paths, lines, or shapes as long as they use a visible stroke.
#### Progress SVG
In our example, the progress graphic uses two circles stacked on top of each other. The first circle stays visible as the faded 'base' ring, while the second circle uses `[data-scroll-next-path]` and gets drawn by the GSAP timeline.
#### Background
Add `[data-scroll-next-bg]` to an image if you want it to scale up slightly during the scroll. In our example, this creates a subtle zoom effect behind the content.
#### Overlay
Add `[data-scroll-next-overlay]` to a layer above the image if you want its opacity to animate during the scroll. In our example, the overlay helps keep the text readable while the image scales.
#### Tips
- This setup works best when the wrap is taller than the viewport and the main visual layer inside it is sticky. In our example, the wrap uses `200vh`, which gives the animation enough room to play. For the smoothest feel, we recommend pairing this with a [Lenis smooth scroll setup](https://www.osmo.supply/resource/lenis-smooth-scroll-setup).
- This interaction is also a really nice match for Barba.js. Because the script ends by triggering a real link, it can hand off naturally into a page transition instead of feeling like a hard page load.
- If you swap the circular SVG for another shape, make sure the element with `[data-scroll-next-path]` has a stroke that can actually be revealed. The effect depends on animating the path length, so filled-only shapes will not work.