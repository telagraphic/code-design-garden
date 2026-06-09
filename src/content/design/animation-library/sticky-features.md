---
title: "Sticky Features"
description: "Scroll-driven sticky panel with image and copy columns, synced with GSAP ScrollTrigger."
slug: "sticky-features"
previewVideo: "sticky-features.mp4"
order: 102
published: true
categories: ["scroll", "image-carousel", "layout"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["sticky", "features", "scrolltrigger"]
sourceUrl: "https://www.osmo.supply/resource/sticky-features"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<div data-sticky-feature-wrap="" class="sticky-features__wrap">
  <div class="sticky-features__scroll">
    <div class="sticky-features__container">
      <div class="sticky-feaures__col is--img">
        <div class="sticky-features__img-collection">
          <div class="sticky-features__img-list">
            <div data-sticky-feature-visual-wrap="" class="sticky-features__img-item">
            </div>
            <div data-sticky-feature-visual-wrap="" class="sticky-features__img-item">
            </div>
            <div data-sticky-feature-visual-wrap="" class="sticky-features__img-item">
            </div>
            <div data-sticky-feature-visual-wrap="" class="sticky-features__img-item">
            </div>
          </div>
        </div>
          <div class="sticky-features__progress-w">
          <div class="sticky-features__progress-bar" data-sticky-feature-progress></div>
        </div>
      </div>
      <div class="sticky-feaures__col">
        <div class="sticky-features__text-collection">
          <div class="sticky-features__text-list">
            <div data-sticky-feature-item="" class="sticky-features__text-item">
              <span data-sticky-feature-text="" class="sticky-features__tag">01</span>
              <h2 data-sticky-feature-text="" class="sticky-features__heading">Fresh Iced Matcha Latte</h2>
              <p data-sticky-feature-text="" class="sticky-features__p">A glass of iced matcha latte with a metal straw, sitting on a red surface against a dark background, showcasing its vibrant green color.</p>
              <p data-sticky-feature-text="" class="sticky-features__p is--link">Learn more</p>
            </div>
            <div data-sticky-feature-item="" class="sticky-features__text-item">
              <span data-sticky-feature-text="" class="sticky-features__tag">02</span>
              <h2 data-sticky-feature-text="" class="sticky-features__heading">Matcha Whisking Art</h2>
              <p data-sticky-feature-text="" class="sticky-features__p">A hand sprinkles green powder using a bamboo whisk into another hand, set against a dark fabric background, creating a dramatic visual.</p>
              <p data-sticky-feature-text="" class="sticky-features__p is--link">Learn more</p>
            </div>
            <div data-sticky-feature-item="" class="sticky-features__text-item">
              <span data-sticky-feature-text="" class="sticky-features__tag">03</span>
              <h2 data-sticky-feature-text="" class="sticky-features__heading">Steaming Orange Fizz</h2>
              <p data-sticky-feature-text="" class="sticky-features__p">A glass of orange beverage with a sugared rim and a floating leaf, emitting steam, set against a warm orange background.</p>
              <p data-sticky-feature-text="" class="sticky-features__p is--link">Learn more</p>
            </div>
            <div data-sticky-feature-item="" class="sticky-features__text-item">
              <span data-sticky-feature-text="" class="sticky-features__tag">04</span>
              <h2 data-sticky-feature-text="" class="sticky-features__heading">Home Away From Home</h2>
              <p data-sticky-feature-text="" class="sticky-features__p">Hands holding a copper cup of green matcha tea on a brown surface, adorned with simple bracelets, creating a warm and serene scene.</p>
              <p data-sticky-feature-text="" class="sticky-features__p is--link">Learn more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
### CSS
```text
.sticky-features__wrap {
  width: 100%;
  padding-left: 1.25em;
  padding-right: 1.25em;
  position: relative;
}
.sticky-features__scroll {
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
}
.sticky-features__container {
  grid-column-gap: 1.25em;
  grid-row-gap: 1.25em;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 70em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}
.sticky-feaures__col {
  flex: 1;
}
.sticky-feaures__col.is--img {
  overflow: hidden;
  border-radius: 0.75em;
}
.sticky-features__progress-w {
  position: absolute;
  left: 0em;
  right: 0em;
  bottom: 0em;
  height: 0.25em;
  background-color: rgba(255, 255, 255, 0.15);
}
.sticky-features__progress-bar {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  transform: scale3d(0, 1, 1);
  transform-origin: 0% 50%;
}
.sticky-features__img-collection {
  width: 100%;
}
.sticky-features__img-list {
  aspect-ratio: 1 / 1.3;
  width: 100%;
  position: relative;
}
.sticky-features__img-item {
  -webkit-clip-path: inset(50% round .75em);
  clip-path: inset(50% round .75em);
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
}
/* Show only 1st items on live site */
[data-sticky-feature-visual-wrap]:first-of-type{ clip-path: inset(0% round 0.75em); }
.sticky-features__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.sticky-features__text-collection {
  height: 100%;
}
.sticky-features__text-list {
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  max-height: 100%;
  display: flex;
  position: relative;
}
.sticky-features__text-item {
  grid-column-gap: 1.5em;
  grid-row-gap: 1.5em;
  visibility: hidden;
  flex-flow: column;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: 1fr;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 27.5em;
  margin-left: auto;
  display: flex;
  position: absolute;
  right: 0;
}
/* Show only 1st items on live site */
[data-sticky-feature-item]:first-of-type{ visibility: visible; }
.sticky-features__heading {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 3.75em;
  font-weight: 500;
  line-height: 1;
}
.sticky-features__p {
  color: #ffffffb3;
  margin-bottom: 0;
  font-size: 1.25em;
  line-height: 1.2;
}
.sticky-features__p.is--link {
  color: #fff;
  text-decoration: underline;
}
.sticky-features__tag {
  background-color: #ffffff1a;
  border-radius: .25em;
  margin-bottom: 1.5em;
  padding: .5em .625em;
  font-size: 1em;
  line-height: 1;
}
.resource-end {
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  display: flex;
}
@media screen and (max-width: 767px) {
  .sticky-features__scroll {
    justify-content: center;
    align-items: center;
    height: auto;
    min-height: 100svh;
    padding-top: 1.25em;
    padding-bottom: 2.5em;
  }
  .sticky-features__container {
    grid-column-gap: 2em;
    grid-row-gap: 2em;
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .sticky-features__img-list {
    aspect-ratio: 1;
  }
  .sticky-features__text-list {
    min-height: 20em;
    max-height: none;
  }
  .sticky-features__text-item {
    max-width: none;
  }
  .sticky-features__heading {
    font-size: 2.5em;
  }
  .sticky-features__p {
    font-size: 1em;
  }
  .sticky-features__tag {
    margin-bottom: 0;
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger);
function initStickyFeatures(root){
  const wraps = Array.from((root || document).querySelectorAll("[data-sticky-feature-wrap]"));
  if(!wraps.length) return;
  wraps.forEach(w => {
    const visualWraps = Array.from(w.querySelectorAll("[data-sticky-feature-visual-wrap]"));
    const items = Array.from(w.querySelectorAll("[data-sticky-feature-item]"));
    const progressBar = w.querySelector("[data-sticky-feature-progress]");
    if (visualWraps.length !== items.length) {
      console.warn("[initStickyFeatures] visualWraps and items count do not match:", {
        visualWraps: visualWraps.length,
        items: items.length,
        wrap: w
      });
    }
    const count = Math.min(visualWraps.length, items.length);
    if(count < 1) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DURATION = rm ? 0.01 : 0.75; // If user prefers reduced motion, reduce duration
    const EASE = "power4.inOut";
    const SCROLL_AMOUNT = 0.9; // % of scroll used for step transitions
    const getTexts = el => Array.from(el.querySelectorAll("[data-sticky-feature-text]"));
    if(visualWraps[0]) gsap.set(visualWraps[0], { clipPath: "inset(0% round 0.75em)" });
    gsap.set(items[0], { autoAlpha: 1 });
    let currentIndex = 0;
    // Transition Function
    function transition(fromIndex, toIndex){
      if(fromIndex === toIndex) return;
      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
      if(fromIndex < toIndex){
        tl.to(visualWraps[toIndex], { 
          clipPath: "inset(0% round 0.75em)",
          duration: DURATION,
          ease: EASE
        }, 0);
      } else {
        tl.to(visualWraps[fromIndex], { 
          clipPath: "inset(50% round 0.75em)",
          duration: DURATION,
          ease: EASE
        }, 0);
      }
      animateOut(items[fromIndex]);
      animateIn(items[toIndex]);
    }
    // Fade out text content items
    function animateOut(itemEl){
      const texts = getTexts(itemEl);
      gsap.to(texts, {
        autoAlpha: 0,
        y: -30,
        ease: "power4.out",
        duration: 0.4,
        onComplete: () => gsap.set(itemEl, { autoAlpha: 0 })
      });
    }
    // Reveal incoming text content items
    function animateIn(itemEl){
      const texts = getTexts(itemEl);
      gsap.set(itemEl, { autoAlpha: 1 });
      gsap.fromTo(texts, {
        autoAlpha: 0, 
        y: 30
      }, {
        autoAlpha: 1,
        y: 0,
        ease: "power4.out",
        duration: DURATION,
        stagger: 0.1
      });
    }
    const steps = Math.max(1, count - 1);
    ScrollTrigger.create({
      trigger: w,
      start: "center center",
      end: () => \`+=${steps * 100}%\`,
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: self => {
        const p = Math.min(self.progress, SCROLL_AMOUNT) / SCROLL_AMOUNT;
        let idx = Math.floor(p * steps + 1e-6);
        idx = Math.max(0, Math.min(steps, idx));
        gsap.to(progressBar,{
          scaleX: p,
          ease: "none"
        })
        if (idx !== currentIndex) {
          transition(currentIndex, idx);
          currentIndex = idx;
        }
      }
    });
  });
}
// Initialize Sticky Features
document.addEventListener("DOMContentLoaded", () =>{
  initStickyFeatures();
});
```
### Javascript
```text
/* Webflow Designer resets to show hidden content: */
.wf-design-mode .sticky-features__text-list{ overflow: auto; max-height: 45em; gap: 2em; justify-content:flex-start;}
.wf-design-mode .sticky-features__text-item{ position: relative; }
.wf-design-mode [data-sticky-feature-item]{ visibility: visible; }
/* Show only 1st items on live site */
[data-sticky-feature-visual-wrap]:first-of-type{ clip-path: inset(0% round 0.75em); }
[data-sticky-feature-item]:first-of-type{ visibility: visible; }
```
### Implementation
#### Container
Use `[data-sticky-feature-wrap]` to define the pinned scroll section that controls step-based transitions between visuals and text items.  
#### Visual
Use `[data-sticky-feature-visual-wrap]` to wrap each visual panel that reveals with a rounded clip-path as its corresponding step becomes active.
#### Item
Use `[data-sticky-feature-item]` to define the text block for each step, matching the order and count of the visual wraps for synchronized transitions.  
#### Text
Use `[data-sticky-feature-text]` inside each item to target child elements that fade and slide during step changes with a staggered sequence.  
#### Amount of items
You're free to add as many visuals + items to the wrap as you want. Ensure `[data-sticky-feature-visual-wrap]` and `[data-sticky-feature-item]` occur in equal numbers though.  
#### Scroll length
The total pin distance scales with the number of steps so the section ends at += (steps × 100%).  
#### Scroll progress
We use the `onUpdate` method in the ScrollTrigger to track the progress of the full section. The progress can be used in any tween you want. In our example, we animate the scaleX property on a div marked with `[data-sticky-feature-progress]`.
#### Reading band
Only the first 90% of the ScrollTrigger is used for step switching so the last step remains readable near the end of `[data-sticky-feature-wrap]`.  
#### Reduced motion
If the user prefers reduced motion, the tween durations shorten automatically while maintaining visibility logic for `[data-sticky-feature-item]` and `[data-sticky-feature-text]`.  
#### Initial state
On load, the first visual in `[data-sticky-feature-visual-wrap]` is revealed and the first item in `[data-sticky-feature-item]` is set visible, while other items remain hidden until activated.
#### Ordering
The step order is determined by DOM order, so keep `[data-sticky-feature-visual-wrap]` and `[data-sticky-feature-item]` aligned index-wise from top to bottom.