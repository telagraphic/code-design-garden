---
title: "Cascading Slider"
description: "Cascading Slider."
slug: "cascading-slider"
previewVideo: "cascading-slider.mp4"
order: 49.942
published: true
categories: ["image-carousel"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["cascading", "slider"]
sourceUrl: "https://www.osmo.supply/resource/cascading-slider"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```
### HTML
```text
<div data-cascading-slider-wrap class="cascading-slider" aria-label="Featured content" aria-roledescription="carousel">
  <div class="cascading-slider__collection">
    <div data-cascading-viewport class="cascading-slider__list">
      <div aria-roledescription="slide" data-cascading-slide role="group" class="cascading-slider__item">
        <div class="cascading-slider__item-inner">
          <div class="cascading-slider__item-bg">
          </div>
          <div class="cascading-slider__item-content">
            <h3 class="cascading-slider__h">Annual overview</h3>
          </div>
        </div>
      </div>
      <div aria-roledescription="slide" data-cascading-slide role="group" class="cascading-slider__item">
        <div class="cascading-slider__item-inner">
          <div class="cascading-slider__item-bg">
          </div>
          <div class="cascading-slider__item-content">
            <h3 class="cascading-slider__h">Sustainability efforts</h3>
          </div>
        </div>
      </div>
      <div aria-roledescription="slide" data-cascading-slide role="group" class="cascading-slider__item">
        <div class="cascading-slider__item-inner">
          <div class="cascading-slider__item-bg">
          </div>
          <div class="cascading-slider__item-content">
            <h3 class="cascading-slider__h">Product development</h3>
          </div>
        </div>
      </div>
      <div aria-roledescription="slide" data-cascading-slide role="group" class="cascading-slider__item">
        <div class="cascading-slider__item-inner">
          <div class="cascading-slider__item-bg">
          </div>
          <div class="cascading-slider__item-content">
            <h3 class="cascading-slider__h">Infrastructure</h3>
          </div>
        </div>
      </div>
      <div aria-roledescription="slide" data-cascading-slide role="group" class="cascading-slider__item">
        <div class="cascading-slider__item-inner">
          <div class="cascading-slider__item-bg">
          </div>
          <div class="cascading-slider__item-content">
            <h3 class="cascading-slider__h">Enterprises</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <nav aria-label="slider navigation" class="cascading-slider__nav">
    <button data-cascading-slider-prev aria-label="previous slide" class="cascading-slider__button">
    </button>
    <button data-cascading-slider-next aria-label="next slide" class="cascading-slider__button">
    </button>
  </nav>
</div>
```
### CSS
```text
[data-cascading-viewport] {
  --gap: 0.5em;
}
[data-cascading-slide] {
  --clip: 0;
  --radius: 0.75em;
}
.cascading-slider {
  width: 100%;
  max-width: 90em;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.cascading-slider__collection {
  width: 100%;
}
.cascading-slider__list {
  width: 100%;
  height: 35em;
  position: relative;
  overflow: hidden;
}
.cascading-slider__item {
  color: #fff;
  cursor: pointer;
  will-change: transform, clip-path;
  clip-path: inset(0px calc(var(--clip) * 1px) round var(--radius));
  -webkit-user-select: none;
  user-select: none;
  height: 100%;
  position: absolute;
  inset: 0% auto auto 0%;
}
.cascading-slider__item[data-status="active"] {
  cursor: default;
}
.cascading-slider__item-inner {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.cascading-slider__item-bg {
  z-index: 0;
  position: absolute;
  inset: 0%;
}
.cascading-slider__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
}
.cascading-slider__item-content {
  z-index: 2;
  background-image: linear-gradient(0deg, #0009, #0000);
  padding: 2em 2em 3em 2.5em;
  position: absolute;
  inset: auto 0% 0%;
}
.cascading-slider__h {
  opacity: 0;
  letter-spacing: -.03em;
  margin-top: 0;
  margin-bottom: 0;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: 2.75em;
  font-weight: 400;
  line-height: 1;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  transform: translate(0, .25em);
  transition-delay: 0ms;
}
[data-cascading-slide][data-status="active"] .cascading-slider__h {
  transition-delay: 400ms;
  opacity: 1;
  transform: translate(0px, 0em);
}
.cascading-slider__nav {
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  margin-top: 4em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  position: relative;
}
.cascading-slider__button {
  color: #323b32;
  background-color: #d7ecd7;
  border-radius: .25em;
  justify-content: center;
  align-items: center;
  width: 3em;
  height: 3em;
  padding: .75em;
  display: flex;
}
.cascading-slider__button-arrow.is--prev {
  transform: rotate(-180deg);
}
```
### Javascript
```javascript
function initCascadingSlider() {
  const duration = 0.65;
  const ease = 'power3.inOut';
  const breakpoints = [
    { maxWidth: 479, activeWidth: 0.78, siblingWidth: 0.08 },
    { maxWidth: 767, activeWidth: 0.70, siblingWidth: 0.10 },
    { maxWidth: 991, activeWidth: 0.60, siblingWidth: 0.10 },
    { maxWidth: Infinity, activeWidth: 0.60, siblingWidth: 0.13 },
  ];
  const wrappers = document.querySelectorAll('[data-cascading-slider-wrap]');
  wrappers.forEach(setupInstance);
  function setupInstance(wrapper) {
    const viewport = wrapper.querySelector('[data-cascading-viewport]');
    const prevButton = wrapper.querySelector('[data-cascading-slider-prev]');
    const nextButton = wrapper.querySelector('[data-cascading-slider-next]');
    const slides = Array.from(viewport.querySelectorAll('[data-cascading-slide]'));
    let totalSlides = slides.length;
    if (totalSlides === 0) return;
    if (totalSlides < 9) {
      const originalSlides = slides.slice();
      while (slides.length < 9) {
        originalSlides.forEach(function(original) {
          const clone = original.cloneNode(true);
          clone.setAttribute('data-clone', '');
          viewport.appendChild(clone);
          slides.push(clone);
        });
      }
      totalSlides = slides.length;
    }
    let activeIndex = 0;
    let isAnimating = false;
    let slideWidth = 0;
    let slotCenters = {};
    let slotWidths = {};
    function readGap() {
      const raw = getComputedStyle(viewport).getPropertyValue('--gap').trim();
      if (!raw) return 0;
      const temp = document.createElement('div');
      temp.style.width = raw;
      temp.style.position = 'absolute';
      temp.style.visibility = 'hidden';
      viewport.appendChild(temp);
      const px = temp.offsetWidth;
      viewport.removeChild(temp);
      return px;
    }
    function getSettings() {
      const windowWidth = window.innerWidth;
      for (let i = 0; i < breakpoints.length; i++) {
        if (windowWidth <= breakpoints[i].maxWidth) return breakpoints[i];
      }
      return breakpoints[breakpoints.length - 1];
    }
    function getOffset(slideIndex, fromIndex) {
      if (fromIndex === undefined) fromIndex = activeIndex;
      let distance = slideIndex - fromIndex;
      const half = totalSlides / 2;
      if (distance > half) distance -= totalSlides;
      if (distance < -half) distance += totalSlides;
      return distance;
    }
    function measure() {
      const settings = getSettings();
      const viewportWidth = viewport.offsetWidth;
      const gap = readGap();
      const activeSlideWidth = viewportWidth * settings.activeWidth;
      const siblingSlideWidth = viewportWidth * settings.siblingWidth;
      const farSlideWidth = Math.max(0, (viewportWidth - activeSlideWidth - 2 * siblingSlideWidth - 4 * gap) / 2);
      slideWidth = activeSlideWidth;
      const visibleSlots = [
        { slot: -2, width: farSlideWidth },
        { slot: -1, width: siblingSlideWidth },
        { slot: 0, width: activeSlideWidth },
        { slot: 1, width: siblingSlideWidth },
        { slot: 2, width: farSlideWidth },
      ];
      let x = 0;
      visibleSlots.forEach(function(def, i) {
        slotCenters[String(def.slot)] = x + def.width / 2;
        slotWidths[String(def.slot)] = def.width;
        if (i < visibleSlots.length - 1) x += def.width + gap;
      });
      slotCenters['-3'] = slotCenters['-2'] - farSlideWidth / 2 - gap - farSlideWidth / 2;
      slotWidths['-3'] = farSlideWidth;
      slotCenters['3'] = slotCenters['2'] + farSlideWidth / 2 + gap + farSlideWidth / 2;
      slotWidths['3'] = farSlideWidth;
      slides.forEach(function(slide) {
        slide.style.width = slideWidth + 'px';
      });
    }
    function getSlideProps(offset) {
      const clamped = Math.max(-3, Math.min(3, offset));
      const slotWidth = slotWidths[String(clamped)];
      const clipAmount = Math.max(0, (slideWidth - slotWidth) / 2);
      const translateX = slotCenters[String(clamped)] - slideWidth / 2;
      return {
        x: translateX,
        '--clip': clipAmount,
        zIndex: 10 - Math.abs(clamped),
      };
    }
    function layout(animate, previousIndex) {
      slides.forEach(function(slide, index) {
        const offset = getOffset(index);
        if (offset < -3 || offset > 3) {
          if (animate && previousIndex !== undefined) {
            const previousOffset = getOffset(index, previousIndex);
            if (previousOffset >= -2 && previousOffset <= 2) {
              const exitSlot = previousOffset < 0 ? -3 : 3;
              gsap.to(slide, Object.assign({}, getSlideProps(exitSlot), {
                duration: duration,
                ease: ease,
                overwrite: true,
              }));
              return;
            }
          }
          const parkSlot = offset < 0 ? -3 : 3;
          gsap.set(slide, getSlideProps(parkSlot));
          return;
        }
        const props = getSlideProps(offset);
        slide.setAttribute('data-status', offset === 0 ? 'active' : 'inactive');
        if (animate) {
          gsap.to(slide, Object.assign({}, props, {
            duration: duration,
            ease: ease,
            overwrite: true,
          }));
        } else {
          gsap.set(slide, props);
        }
      });
    }
    function goTo(targetIndex) {
      const normalizedTarget = ((targetIndex % totalSlides) + totalSlides) % totalSlides;
      if (isAnimating || normalizedTarget === activeIndex) return;
      isAnimating = true;
      const previousIndex = activeIndex;
      const travelDirection = getOffset(normalizedTarget, previousIndex) > 0 ? 1 : -1;
      slides.forEach(function(slide, index) {
        const currentOffset = getOffset(index, previousIndex);
        const nextOffset = getOffset(index, normalizedTarget);
        const wasInRange = currentOffset >= -3 && currentOffset <= 3;
        const willBeVisible = nextOffset >= -2 && nextOffset <= 2;
        if (!wasInRange && willBeVisible) {
          const entrySlot = travelDirection > 0 ? 3 : -3;
          gsap.set(slide, getSlideProps(entrySlot));
        }
        const wasInvisible = Math.abs(currentOffset) >= 3;
        const willBeStaging = Math.abs(nextOffset) === 3;
        const crossesSides = currentOffset * nextOffset < 0;
        if (wasInvisible && willBeStaging && crossesSides) {
          gsap.set(slide, getSlideProps(nextOffset > 0 ? 3 : -3));
        }
      });
      activeIndex = normalizedTarget;
      layout(true, previousIndex);
      gsap.delayedCall(duration + 0.05, function() { isAnimating = false; });
    }
    if (prevButton) prevButton.addEventListener('click', function() { goTo(activeIndex - 1); });
    if (nextButton) nextButton.addEventListener('click', function() { goTo(activeIndex + 1); });
    slides.forEach(function(slide, index) {
      slide.addEventListener('click', function() {
        if (index !== activeIndex) goTo(index);
      });
    });
    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (event.key === 'ArrowRight') goTo(activeIndex + 1);
    });
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        measure();
        layout(false);
      }, 100);
    });
    measure();
    layout(false);
  }
}
// Initialize Cascading Slider
document.addEventListener('DOMContentLoaded', function() {
  initCascadingSlider();
});
```
### CSS
```text
[data-cascading-viewport] {
  --gap: 0.5em;
}
[data-cascading-slide] {
  --clip: 0;
  --radius: 0.75em;
}
[data-cascading-slide][data-status="active"] {
  cursor: default;
}
[data-cascading-slide] .cascading-slider__h {
  transition-delay: 0ms;
}
[data-cascading-slide][data-status="active"] .cascading-slider__h {
  transition-delay: 400ms;
  opacity: 1;
  transform: translate(0px, 0em);
}
.wf-design-mode [data-cascading-viewport] {
  display: flex;
  flex-direction: row;
  gap: 1em;
  overflow: auto;
}
.wf-design-mode [data-cascading-slide] {
  position: relative;
  width: 60%;
  flex: 0 0 auto;
}
.wf-design-mode .cascading-slider__h {
  opacity: 1;
  transform: translate(0px, 0em);
}
```
### Implementation
The cascading slider uses clip-path to reveal and hide slide content. Each slide is the full active width in the DOM, and a CSS variable controls how much is clipped from the sides. The viewport's overflow hidden handles all visibility.
#### Wrapper
Use `[data-cascading-slider-wrap]` on the outermost element that contains both the viewport and the navigation controls.
### HTML
```text
<div data-cascading-slider-wrap>
  <div data-cascading-viewport>
    ...
  </div>
  <button data-cascading-slider-prev>Prev</button>
  <button data-cascading-slider-next>Next</button>
</div>
```
#### Viewport
Use `[data-cascading-viewport]` on the direct container of all slides. This element must have position relative, overflow hidden, and a defined height. The script reads `--gap` from this element at runtime for positioning math, so set it here.
#### Slide
Use `[data-cascading-slide]` on each slide element. Every slide must be a direct child of the viewport. Slides are absolutely positioned by the script and require the following CSS to enable clip-path animation.
### CSS
```text
[data-cascading-slide] {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  --clip: 0;
  clip-path: inset(0px calc(var(--clip) * 1px) round var(--radius));
}
```
#### Slide inner
Each slide needs an inner wrapper to contain your content. This element should have overflow hidden.
### HTML
```text
<div data-cascading-slide>
  <div class="slide-inner">
    <!-- your content -->
  </div>
</div>
```
#### Slide border radius
Set `--radius` on `[data-cascading-slide]` or a parent element. The clip-path handles all rounding.
#### Navigation
Use `[data-cascading-slider-prev]` and `[data-cascading-slider-next]` on any button elements inside the wrapper. Both are optional. Users can also click any visible slide to navigate to it, and arrow keys are bound globally.
#### Active state
The script sets `[data-status="active"]` on the current slide and `[data-status="inactive"]` on all others. Use this for styling or targeting in CSS. In our live preview demo, we used it to animate the heading element for example.
#### Gap
Set `--gap` on `[data-cascading-viewport]` in CSS. The script reads this value and converts it to pixels for positioning. You're free to use media queries and change the gap per breakpoint.
#### Height
Height is controlled entirely in CSS on `[data-cascading-viewport]`. The script does not set or read height. Use media queries for responsive adjustments.
#### Breakpoints
Width ratios are configured in the script. Each breakpoint defines the active slide width and sibling width as fractions of the viewport. The far slides fill the remaining space automatically. Breakpoints are evaluated smallest to largest, first match wins. If you want to change these, it's probably a matter of trying a bunch of things until you hit a ratio that you like!
### Javascript
```javascript
const breakpoints = [
  { maxWidth: 479, activeWidth: 0.78, siblingWidth: 0.08 },
  { maxWidth: 767, activeWidth: 0.70, siblingWidth: 0.10 },
  { maxWidth: 991, activeWidth: 0.60, siblingWidth: 0.10 },
  { maxWidth: Infinity, activeWidth: 0.60, siblingWidth: 0.15 },
];
```
#### Minimum slides
The slider requires at least 9 slides in the DOM for seamless looping. If fewer are provided, the script automatically duplicates full sets of the original slides until the minimum is reached. Cloned slides receive a `[data-clone]` attribute. So to be clear, you can use this slider also if you have just 3 slides for example.
#### Animation
Duration and easing are set at the top of the script. The easing value is any valid GSAP ease string.
### Javascript
```javascript
const duration = 0.7;
const ease = 'power3.inOut';
```
#### Multiple instances
The script queries all elements with `[data-cascading-slider-wrap]` and initializes each independently. Navigation, state, and resize handling are scoped per instance.
#### Webflow CMS
When using a Collection List, apply `[data-cascading-viewport]` to the Collection List element itself. Each Collection Item gets `[data-cascading-slide]`. The Collection List Wrapper element needs no attribute, just set its width to 100%.
Webflow designer styling
#### Webflow Designer mode
Since slides are absolutely positioned, they stack and become invisible in the Webflow Designer. The `.wf-design-mode` overrides switch the viewport to a horizontal flex layout so all slides are visible and editable. These styles only apply inside the Designer and have no effect on the published site.
Ilja van Eck