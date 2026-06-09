---
title: "Sticky Steps 1"
description: "Sticky Steps 1."
slug: "sticky-steps 1"
previewVideo: "sticky-steps 1.mp4"
order: 49.84
published: true
categories: ["loader", "media"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["sticky", "steps"]
sourceUrl: "https://www.osmo.supply/resource/sticky-steps-basic"
---
## Setup
### HTML
```text
<section class="sticky-steps">
  <div class="sticky-steps__container">
    <div data-sticky-steps-init class="sticky-steps__collection">
      <div class="sticky-steps__list">
        <div data-sticky-steps-item data-sticky-steps-item-status="active" class="sticky-steps__item">
          <div data-sticky-steps-anchor class="sticky-steps__text">
            <span class="sticky-steps__eyebrow">Feature A</span>
            <h2 class="sticky-steps__h2">Sticky Steps</h2>
            <p class="sticky-steps__p">In CSS, position: sticky is a hybrid positioning method that combines the behaviors of relative and fixed positioning.</p>
          </div>
          <div class="sticky-steps__media">
            <div class="sticky-steps__sticky">
              <div class="sticky-steps__visual">
              </div>
            </div>
          </div>
        </div>
        <div data-sticky-steps-item data-sticky-steps-item-status="after" class="sticky-steps__item">
          <div data-sticky-steps-anchor class="sticky-steps__text">
            <span class="sticky-steps__eyebrow">Feature B</span>
            <h2 class="sticky-steps__h2">Hybrid positioning</h2>
            <p class="sticky-steps__p">In CSS, position: sticky is a hybrid positioning method that combines the behaviors of relative and fixed positioning.</p>
          </div>
          <div class="sticky-steps__media">
            <div class="sticky-steps__sticky">
              <div class="sticky-steps__visual">
              </div>
            </div>
          </div>
        </div>
        <div data-sticky-steps-item data-sticky-steps-item-status="after"  class="sticky-steps__item">
          <div data-sticky-steps-anchor class="sticky-steps__text">
            <span class="sticky-steps__eyebrow">Feature C</span>
            <h2 class="sticky-steps__h2">CSS Position</h2>
            <p class="sticky-steps__p">In CSS, position: sticky is a hybrid positioning method that combines the behaviors of relative and fixed positioning.</p>
          </div>
          <div class="sticky-steps__media">
            <div class="sticky-steps__sticky">
              <div class="sticky-steps__visual">
              </div>
            </div>
          </div>
        </div>
        <div data-sticky-steps-item data-sticky-steps-item-status="after"class="sticky-steps__item">
          <div data-sticky-steps-anchor class="sticky-steps__text">
            <span class="sticky-steps__eyebrow">Feature D</span>
            <h2 class="sticky-steps__h2">The last step</h2>
            <p class="sticky-steps__p">In CSS, position: sticky is a hybrid positioning method that combines the behaviors of relative and fixed positioning.</p>
          </div>
          <div class="sticky-steps__media">
            <div class="sticky-steps__sticky">
              <div class="sticky-steps__visual">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```
### CSS
```text
.sticky-steps {
  min-height: 100dvh;
  position: relative;
  overflow: clip;
}
.sticky-steps__container {
  max-width: 74em;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5em;
  padding-right: 1.5em;
}
.sticky-steps__collection {
  min-height: 100dvh;
  display: flex;
  position: relative;
}
.sticky-steps__list {
  grid-column-gap: 30dvh;
  grid-row-gap: 30dvh;
  flex-flow: column;
  flex: 1;
  padding-top: calc(50dvh - 7.5em);
  padding-bottom: calc(50dvh - 7.5em);
  display: flex;
}
.sticky-steps__text {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  width: 50%;
  padding-right: 6em;
  display: flex;
}
.sticky-steps__eyebrow {
  opacity: .5;
  text-transform: uppercase;
  font-size: 1.3125em;
  font-weight: 700;
}
.sticky-steps__h2 {
  letter-spacing: -.04em;
  margin-top: 0;
  margin-bottom: 0;
  font-size: min(5.5em, 15vw);
  font-weight: 500;
  line-height: .9;
}
.sticky-steps__p {
  opacity: .6;
  margin-bottom: 0;
  font-size: min(1.4375em, 5vw);
  line-height: 1.4;
}
.sticky-steps__media {
  width: 50%;
  height: 100%;
  padding-left: 3em;
  position: absolute;
  top: 0;
  right: 0;
}
.sticky-steps__sticky {
  align-items: center;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  position: sticky;
  top: 0;
}
.sticky-steps__visual {
  aspect-ratio: 3 / 4;
  border-radius: 500em;
  width: 100%;
  position: relative;
}
.sticky-steps__cover-image {
  object-fit: cover;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
@media screen and (min-width: 992px) {
  [data-sticky-steps-item-status] .sticky-steps__visual {
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }
  [data-sticky-steps-item-status="before"] .sticky-steps__visual,
  [data-sticky-steps-item-status="active"] .sticky-steps__visual {
    opacity: 1;
    visibility: visible;
  }
  [data-sticky-steps-item-status] .sticky-steps__text {
    transition: opacity 0.5s ease-in-out;
    opacity: 0.25;
  }
  [data-sticky-steps-item-status="active"] .sticky-steps__text {
    opacity: 1;
  }
}
@media screen and (max-width: 991px) {
  .sticky-steps__list {
    grid-column-gap: 7.5em;
    grid-row-gap: 7.5em;
    padding-top: 10em;
    padding-bottom: 10em;
  }
  .sticky-steps__text {
    width: 100%;
    padding-bottom: 5em;
    padding-right: 0;
  }
  .sticky-steps__sticky {
    min-height: auto;
    position: relative;
    top: auto;
  }
  .sticky-steps__media {
    width: 100%;
    height: auto;
    padding-left: 0;
    position: relative;
    top: auto;
    right: auto;
  }
}
@media screen and (max-width: 767px) {
  .sticky-steps__text {
    grid-column-gap: 1.5em;
    grid-row-gap: 1.5em;
  }
}
```
### Javascript
```javascript
function initStickyStepsBasic() {
  const containers = document.querySelectorAll("[data-sticky-steps-init]");
  if (!containers.length) return;
  containers.forEach((container) => {
    const items = [...container.querySelectorAll("[data-sticky-steps-item]")];
    if (!items.length) return;
    function updateSteps() {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      items.forEach((item, index) => {
        const anchor = item.querySelector("[data-sticky-steps-anchor]");
        if (!anchor) return;
        const rect = anchor.getBoundingClientRect();
        const anchorCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - anchorCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      items.forEach((item, index) => {
        let status = "active";
        if (index < closestIndex) status = "before";
        if (index > closestIndex) status = "after";
        item.setAttribute("data-sticky-steps-item-status", status);
      });
    }
    window.addEventListener("scroll", updateSteps);
    window.addEventListener("resize", updateSteps);
    requestAnimationFrame(updateSteps);
  });
}
// Initialize Sticky Steps (Basic)
document.addEventListener('DOMContentLoaded', function () {
  initStickyStepsBasic();
});
```
### CSS
```text
@media screen and (min-width: 992px) {
  [data-sticky-steps-item-status] .sticky-steps__visual {
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }
  [data-sticky-steps-item-status="before"] .sticky-steps__visual,
  [data-sticky-steps-item-status="active"] .sticky-steps__visual {
    opacity: 1;
    visibility: visible;
  }
  [data-sticky-steps-item-status] .sticky-steps__text {
    transition: opacity 0.5s ease-in-out;
    opacity: 0.25;
  }
  [data-sticky-steps-item-status="active"] .sticky-steps__text {
    opacity: 1;
  }
}
```
### Implementation
#### Container
Use `[data-sticky-steps-init]` on the main wrapper that contains the full sticky steps section, so the script only checks and updates items inside that specific area.
#### Item + Status
Use `[data-sticky-steps-item]` together with `[data-sticky-steps-item-status="before/active/after"]` on the same element, because that single step wrapper is the element the script updates and the one you style with CSS.
When scrolling on at load, `before` is added for every item that comes before the current active step, `active` for the item whose anchor is closest to the center of the viewport, and `after` for every item that comes after it.
#### Anchor
Use a child element with `[data-sticky-steps-anchor]` inside every `[data-sticky-steps-item]`, and make sure this anchor is the NOT sticky part of the step because the script uses it for position calculations.
#### Structure
Use one `[data-sticky-steps-anchor]` inside each `[data-sticky-steps-item]` so every step has its own measurement point, keeping the scroll logic tied neatly to the matching item.
### HTML
```text
<section data-sticky-steps-init>
  <div data-sticky-steps-item data-sticky-steps-item-status="before">
    <div data-sticky-steps-anchor></div>
    <div><!-- Sticky Element --></div>
  </div>
  <div data-sticky-steps-item data-sticky-steps-item-status="active">
    <div data-sticky-steps-anchor></div>
    <div><!-- Sticky Element --></div>
  </div>
  <div data-sticky-steps-item data-sticky-steps-item-status="after">
    <div data-sticky-steps-anchor></div>
    <div><!-- Sticky Element --></div>
  </div>
</section>
```
#### Animation
Use the status states as styling hooks, starting simple with opacity changes between before, active, and after, or going much further by animating scale, blur, position, rotation, filters, or any other CSS property you want to make the steps feel more animated.
#### GSAP Scrolltrigger Version
If you are already using GSAP ScrollTrigger, you can easily hook it into the setup by triggering the step updates, making the states update in a more efficient way.
### Javascript
```javascript
function initStickyStepsBasic() {
  const containers = document.querySelectorAll("[data-sticky-steps-init]");
  if (!containers.length) return;
  containers.forEach((container) => {
    const items = [...container.querySelectorAll("[data-sticky-steps-item]")];
    if (!items.length) return;
    function setActiveStep(activeIndex) {
      items.forEach((item, index) => {
        let status = "active";
        if (index < activeIndex) status = "before";
        if (index > activeIndex) status = "after";
        item.setAttribute("data-sticky-steps-item-status", status);
      });
    }
    items.forEach((item, index) => {
      const anchor = item.querySelector("[data-sticky-steps-anchor]");
      if (!anchor) return;
      ScrollTrigger.create({
        trigger: anchor,
        start: "center center",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index)
      });
    });
    setActiveStep(0);
  });
}
// Initialize Sticky Steps (Basic)
document.addEventListener('DOMContentLoaded', function () {
  initStickyStepsBasic();
});
```