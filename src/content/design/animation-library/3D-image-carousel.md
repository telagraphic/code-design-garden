---
title: "3D Image Carousel"
description: "Perspective carousel of images with drag and snap."
slug: "3D-image-carousel"
previewVideo: "3D-image-carousel.mp4"
order: 93
published: true
categories: ["image-carousel"]
triggers: ["drag", "scroll"]
libraries: ["gsap"]
keywords: ["carousel", "3d", "gallery"]
sourceUrl: "https://www.osmo.supply/resource/3d-image-carousel"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Observer.min.js"></script>
```
### HTML
```text
<div class="img-carousel__wrap">
  <div data-3d-carousel-wrap="" class="img-carousel__list">
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
    <div data-3d-carousel-panel="" class="img-carousel__panel">
      <div data-3d-carousel-content="" class="img-carousel__item"></div>
    </div>
  </div>
</div>
```
### CSS
```text
.img-carousel__wrap {
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
}
.img-carousel__list {
  z-index: 1;
  perspective: 90vw;
  perspective-origin: 50%;
  transform-style: preserve-3d;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 50vw;
  margin-left: auto;
  margin-right: auto;
  font-size: 1vw;
  display: flex;
  position: relative;
}
.img-carousel__panel {
  z-index: 0;
  flex-direction: column;
  flex: none;
  justify-content: space-between;
  align-items: stretch;
  width: 13em;
  height: 39em;
  display: flex;
  position: absolute;
}
.img-carousel__panel:nth-of-type(even){
  justify-content: center;
}
.img-carousel__item {
  aspect-ratio: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.img-carousel__img {
  object-fit: cover;
  width: 100%;
  max-width: none;
  height: 100%;
  position: absolute;
  inset: 0%;
}
```
### Javascript
```javascript
gsap.registerPlugin(Draggable, InertiaPlugin, Observer, ScrollTrigger);
function init3dImageCarousel() {
  let radius;
  let draggableInstance;
  let observerInstance;
  let spin;
  let intro;
  let lastWidth = window.innerWidth;
  const wrap = document.querySelector('[data-3d-carousel-wrap]');
  if (!wrap) return;
  // Define the radius of your cylinder here
  const calcRadius = () => {
    radius = window.innerWidth * 0.5;
  }
  // Destroy function to reset everything on resize
  const destroy = () => {
    draggableInstance && draggableInstance.kill();
    observerInstance && observerInstance.kill();
    spin && spin.kill();
    intro && intro.kill();
    ScrollTrigger.getAll().forEach(st => st.kill());
    const panels = wrap.querySelectorAll('[data-3d-carousel-panel]');
    gsap.set(panels, { clearProps: 'transform' });
  };
  // Create function that sets the spin, drag, and rotation
  const create = () => {
    calcRadius();
    const panels = wrap.querySelectorAll('[data-3d-carousel-panel]');
    const content = wrap.querySelectorAll('[data-3d-carousel-content]');
    const proxy = document.createElement('div');
    const wrapProgress = gsap.utils.wrap(0, 1);
    const dragDistance = window.innerWidth * 3; // Control the snapiness on drag
    let startProg;
    // Position panels in 3D space
    panels.forEach(p =>
      p.style.transformOrigin = \`50% 50% ${-radius}px\`
    );
    // Infinite rotation of all panels
    spin = gsap.fromTo(
      panels,
      { rotationY: i => (i * 360) / panels.length },
      { rotationY: '-=360', duration: 30, ease: 'none', repeat: -1 }
    );
    // cheeky workaround to create some 'buffer' when scrolling back up
    spin.progress(1000)
    draggableInstance = Draggable.create(proxy, {
      trigger: wrap,
      type: 'x',
      inertia: true,
      allowNativeTouchScrolling: true,
      onPress() {
        // Subtle feedback on touch/mousedown of the wrap
        gsap.to(content, { 
          clipPath: 'inset(5%)',
          duration: 0.3,
          ease: 'power4.out',
          overwrite: 'auto'
        });
        // Stop automatic spinning to prepare for drag
        gsap.killTweensOf(spin);
        spin.timeScale(0);
        startProg = spin.progress();
      },
      onDrag() {
        const p = startProg + (this.startX - this.x) / dragDistance;
        spin.progress(wrapProgress(p));
      },
      onThrowUpdate() {
        const p = startProg + (this.startX - this.x) / dragDistance;
        spin.progress(wrapProgress(p));
      },
      onRelease() {
        if (!this.tween || !this.tween.isActive()) {
          gsap.to(spin, { timeScale: 1, duration: 0.1 });
        }
        gsap.to(content, {
          clipPath: 'inset(0%)',
          duration: 0.5,
          ease: 'power4.out',
          overwrite: 'auto'
        });
      },
      onThrowComplete() {
        gsap.to(spin, { timeScale: 1, duration: 0.1 });
      }
    })[0];
    // Scroll-into-view animation
    intro = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top 80%',
        end: 'bottom top',
        scrub: false,
        toggleActions: 'play resume play play'
      },
      defaults: { ease: 'expo.inOut' }
    });
    intro
      .fromTo(spin, { timeScale: 15 }, { timeScale: 1, duration: 2 })
      .fromTo(wrap, { scale: 0.5, rotation: 12 }, { scale: 1, rotation: 5, duration: 1.2 }, '<')
      .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, stagger: { amount: 0.8, from: 'random' } }, '<');
    // While-scrolling feedback
    observerInstance = Observer.create({
      target: window,
      type: 'wheel,scroll,touch',
      onChangeY: self => {
        // Control how much scroll speed affects the rotation on scroll
        let v = gsap.utils.clamp(-60, 60, self.velocityY * 0.005); 
        spin.timeScale(v);
        const resting = v < 0 ? -1 : 1;
        gsap.fromTo(
          { value: v },
          { value: v },
          {
            value: resting,
            duration: 1.2,
            onUpdate() {
              spin.timeScale(this.targets()[0].value);
            }
          }
        );
      }
    });
  };
  // First create on function call
  create();
  // Debounce function to use on resize events
  const debounce = (fn, ms) => {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  };
  // Whenever window resizes, first destroy, then re-init it all
  window.addEventListener('resize', debounce(() => {
    const newWidth = window.innerWidth;
    if (newWidth !== lastWidth) {
      lastWidth = newWidth;
      destroy();
      create();
      ScrollTrigger.refresh();
    }
  }, 200));
}
// Initialize 3D Image Carousel
document.addEventListener("DOMContentLoaded", () =>{
  init3dImageCarousel();
})
```
### CSS
```text
.wf-design-mode .img-carousel__panel{
  position: relative; 
}
.wf-design-mode .img-carousel__list{
  overflow: auto;
  justify-content: flex-start;
}
.img-carousel__panel:nth-of-type(even){
  justify-content: center;
}
```
### Implementation
#### Required HTML Structure & Attributes
### HTML
```text
<div data-3d-carousel-wrap> 
  <div data-3d-carousel-panel> 
    <div data-3d-carousel-content>
      <!-- your content (image, video, etc) -->
    </div>
  </div>
  <!-- repeat panels -->  
</div>
```
- **`data-3d-carousel-wrap`**: identifies the main 3D carousel wrapper.
- **`data-3d-carousel-panel`**: each 'slide' in the 3D circle. This can be styled however you like!
- **`data-3d-carousel-content`**: inner container used for press/animation effects. Put your images etc inside of this. If you leave this out, the carousel will still work, it's optional.
#### Carousel panels
We've used our panels to align some image containers inside. But technically, these panels can be almost anything. Feel free to experiment and try out different types of content and designs!
#### Carousel perspective
The CSS `perspective` property is used to define the, well, perspective. Default value is `90vw`, it's best to change this to understand and see how this affects the look of your carousel.
#### Carousel size
The carousel size is not defined with CSS, but in a JS function to be fully dynamic. On default, the radius is defined as half of the window width, but you can change this to whatever you want.
### Javascript
```javascript
const calcRadius = () => {
  radius = window.innerWidth * 0.5;
}
```
#### Drag sensitivity
Defines how 'sensitive' the carousel responds to your drag gestures. A smaller number equals a very sensitive drag, a higher number will make it 'slow' or hard to drag. We also base this off of the window width:
### Javascript
```javascript
const dragDistance = window.innerWidth * 3; // Control the snapiness on drag
```
#### Intro animation
We've used a standard GSAP Timeline to create an 'intro' animation for when the carousel scrolls into view. A nice trick is that you can 'timeScale' the `spin` animation, to really create a dynamic entrance effect. Since this is a normal GSAP timeline, you can change this however you want.
#### Scroll behaviour and speed
We've also used [GSAP Observer](https://gsap.com/docs/v3/Plugins/Observer/) to speed up the `spin` animation as you're scrolling past the wrapper. You can either completely remove the observerInstance part if you don't want this, or tweak the speed factor in the below variable by changing the `0.005` part. Lower is slower, higher number makes it more sensitive.
### Javascript
```javascript
// Control how much scroll speed affects the rotation on scroll
let v = gsap.utils.clamp(-60, 60, self.velocityY * 0.005);
```
#### Content editing in Webflow
The 2 bits in our 'custom CSS' part (Step 3) of this resource make sure that your panels sit side-by-side inside the Webflow designer, and the wrapper has `overflow: auto`, so you can scroll the carousel horizontally as it's flat. Our tip to make this easily editable for you client would be to make a component out of the wrapper, so that you can hook all the images up to component props. Technically, it would be possible to make this CMS-powered as well, but because our specific example has even and uneven panels, it's a bit more tricky.
#### Credits
[This CodePen here](https://codepen.io/GreenSock/pen/RwLepdQ) from the official GSAP account was used as a base for the 3D rotational + drag functionalities. We've adapted it slightly and added the scroll behaviour, intro animation, and made it responsive.