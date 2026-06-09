---
title: "Horizontal Scrolling Sections"
description: "Horizontal Scrolling Sections."
slug: "horizontal-scrolling-sections"
previewVideo: "horizontal-scrolling-sections.mp4"
order: 49.915
published: true
categories: ["scroll", "media"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["horizontal", "scrolling", "sections"]
sourceUrl: "https://www.osmo.supply/resource/horizontal-scrolling-sections"
---
## Setup
### Scripts
```javascript
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```
### HTML
```html
<section class="horizontal__wrap" data-horizontal-scroll-wrap data-horizontal-scroll-disable="mobileLandscape">
  <div data-horizontal-scroll-panel class="horizontal__panel">
    <div class="horizontal__panel-inner">
      <div class="demo-card">
        <div class="demo-card__bg">
        </div>
        <div class="demo-card__inner">
          <h2 class="demo-header__h1">Dolomites</h2>
        </div>
      </div>
    </div>
  </div>
  <div data-horizontal-scroll-panel class="horizontal__panel">
    <div class="horizontal__panel-inner">
      <div class="demo-card">
        <div class="demo-card__bg">
        </div>
        <div class="demo-card__inner">
          <h2 class="demo-header__h1">Patagonia</h2>
        </div>
      </div>
    </div>
  </div>
  <div data-horizontal-scroll-panel class="horizontal__panel">
    <div class="horizontal__panel-inner">
      <div class="demo-card">
        <div class="demo-card__bg">
        </div>
        <div class="demo-card__inner">
          <h2 class="demo-header__h1">Yosemite Park</h2>
        </div>
      </div>
    </div>
  </div>
  <div data-horizontal-scroll-panel class="horizontal__panel">
    <div class="horizontal__panel-inner">
      <div class="demo-card">
        <div class="demo-card__bg">
        </div>
        <div class="demo-card__inner">
          <h2 class="demo-header__h1">Pyrenees</h2>
        </div>
      </div>
    </div>
  </div>
</section>
```
### CSS
```css
.demo-header__h1 {
  letter-spacing: -.04em;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 4em;
  font-weight: 500;
  line-height: .95;
}
.horizontal__wrap {
  flex-flow: row;
  min-height: 100dvh;
  display: flex;
  overflow: hidden;
}
.horizontal__panel {
  flex: none;
  width: 100%;
}
.horizontal__panel-inner {
  width: 100%;
  height: 100%;
  padding: 1.25em;
}
.demo-card {
  border-radius: 1.25em;
  flex-flow: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 3em;
  display: flex;
  position: relative;
  overflow: hidden;
}
.demo-card__bg {
  z-index: 0;
  position: absolute;
  inset: 0%;
}
.demo-card__inner {
  z-index: 1;
  position: relative;
}
.demo-card__bg-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 767px) {
  .demo-header__h1 {
    font-size: 2.5em;
  }
  .horizontal__wrap {
    flex-flow: column;
  }
  .horizontal__panel {
    height: 30em;
  }
  .demo-card {
    padding: 1.25em;
  }
}
```
### Javascript
```javascript
function initHorizontalScrolling() {
  const mm = gsap.matchMedia();
  mm.add(
    {
      isMobile: "(max-width:479px)",
      isMobileLandscape: "(max-width:767px)",
      isTablet: "(max-width:991px)",
      isDesktop: "(min-width:992px)"
    },
    (context) => {
      const { isMobile, isMobileLandscape, isTablet } = context.conditions;
      const ctx = gsap.context(() => {
        const wrappers = document.querySelectorAll("[data-horizontal-scroll-wrap]");
        if (!wrappers.length) return;
        wrappers.forEach((wrap) => {
          // optional disable logic per breakpoint
          const disable = wrap.getAttribute("data-horizontal-scroll-disable");
          if (
            (disable === "mobile" && isMobile) ||
            (disable === "mobileLandscape" && isMobileLandscape) ||
            (disable === "tablet" && isTablet)
          ) {
            return; // skip this wrapper on specified breakpoint
          }
          const panels = gsap.utils.toArray("[data-horizontal-scroll-panel]", wrap);
          if (panels.length < 2) return;
          gsap.to(panels, {
            x: () => -(wrap.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: () => "+=" + (wrap.scrollWidth - window.innerWidth),
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });
      return () => ctx.revert(); // cleanup
    }
  );
}
// Initialize Horizontal Scrolling Sections
document.addEventListener("DOMContentLoaded", () => {
  initHorizontalScrolling();
});
```
### Implementation
#### Wrapper
Use `[data-horizontal-scroll-wrap]` on the section that contains all horizontally scrolling panels. This wrapper defines the scrollable area and is pinned while the panels move sideways during scroll. By default, the animation uses the wrapper’s full scroll width to determine how far the panels should translate.
#### Panels
Use `[data-horizontal-scroll-panel]` on each child element that should move horizontally. Each panel is translated on the X-axis as the user scrolls. You can add as many panels as you like; each will automatically be included in the scroll distance calculation. The function will only run if you have at least 2 panels inside a wrapper.
#### Responsive Disable
To disable the horizontal scroll behavior on specific breakpoints, add `[data-horizontal-scroll-disable]` with one of the following values:
- `"mobile"` → disables below 480px
- `"mobileLandscape"` → disables below 768px
- `"tablet"` → disables below 992px
When the wrapper is disabled on that breakpoint, it simply behaves like a normal section.
#### CSS Structure
Each panel can be flexible in its width, there's no requirement for them to be all perfectly `100vw` wide. Just make sure your wrapper has a horizontal flexbox layout, and your panels are set to `flex: none`. This ensures they don't collapse horizontally.
#### ScrollTrigger Animations inside the Wrapper
Since the page isn’t actually scrolling horizontally (the wrapper itself is pinned while its panels are translated), any scroll-based animation **inside** a horizontally scrolling section needs to reference the **same ScrollTrigger instance**.
GSAP provides a clean solution for this via **container animations**. By linking your nested ScrollTriggers to the horizontal scroll’s container animation, they’ll sync perfectly to the simulated horizontal progress rather than the page’s vertical scroll. Read more in the official [GSAP docs](https://gsap.com/blog/3-8/#containeranimation). Here's an example:
### Javascript
```javascript
// main horizontal tween
const horizontalTween = gsap.to(panels, {
  x: () => -(wrap.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: wrap,
    start: "top top",
    end: () => "+=" + (wrap.scrollWidth - window.innerWidth),
    scrub: true,
    pin: true,
    invalidateOnRefresh: true
  }
});
// nested scroll animation
gsap.to("[data-inner-element]", {
  x: -100,
  ease: "none",
  scrollTrigger: {
    containerAnimation: horizontalTween, // tie to horizontal progress
    trigger: "[data-inner-element]",
    start: "left right",
    end: "right left",
    scrub: true
  }
});
```