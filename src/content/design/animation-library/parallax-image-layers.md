---
title: "Parallax Image Layers"
description: "Parallax Image Layers."
slug: "parallax-image-layers"
previewVideo: "parallax-image-layers.mp4"
order: 49.866
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["parallax", "image", "layers"]
sourceUrl: "https://www.osmo.supply/resource/parallax-image-layers"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<div class="parallax">
  <section class="parallax__header">
    <div class="parallax__visuals">
      <div class="parallax__black-line-overflow"></div>
      <div data-parallax-layers class="parallax__layers">
        <div data-parallax-layer="3" class="parallax__layer-title">
          <h2 class="parallax__title">Parallax</h2>
        </div>
      </div>
      <div class="parallax__fade"></div>
    </div>
  </section>
  <section class="parallax__content">
  </section>
</div>
```
### CSS
```text
.parallax {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.parallax__content {
  padding: 10em 1em;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  display: flex;
  position: relative;
}
.parallax__layers {
  object-fit: cover;
  width: 100%;
  max-width: none;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.parallax__title {
  pointer-events: auto;
  text-align: center;
  text-transform: none;
  margin-top: 0;
  margin-bottom: .1em;
  margin-right: .075em;
  font-size: 10em;
  font-weight: 700;
  line-height: 1;
  position: relative;
}
.parallax__black-line-overflow {
  z-index: 20;
  background-color: #000;
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: -1px;
  left: 0;
}
.parallax__layer-img {
  pointer-events: none;
  object-fit: cover;
  width: 100%;
  max-width: none;
  height: 117.5%;
  position: absolute;
  top: -17.5%;
  left: 0;
}
.parallax__fade {
  z-index: 30;
  object-fit: cover;
  background-image: linear-gradient(#0000, #000);
  width: 100%;
  max-width: none;
  height: 20%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.parallax__header {
  z-index: 2;
  padding: 10em 1em;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  display: flex;
  position: relative;
}
.parallax__visuals {
  object-fit: cover;
  width: 100%;
  max-width: none;
  height: 120%;
  position: absolute;
  top: 0;
  left: 0;
}
.parallax__layer-title {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100svh;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger);
function initParallaxLayers() {  
  document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0
      }
    });
    const layers = [
      { layer: "1", yPercent: 70 },
      { layer: "2", yPercent: 55 },
      { layer: "3", yPercent: 40 },
      { layer: "4", yPercent: 10 }
    ];
    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(\`[data-parallax-layer="${layerObj.layer}"]\`),
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        idx === 0 ? undefined : "<"
      );
    });
  });
}
// Initialize Parallax Layers
document.addEventListener('DOMContentLoaded', () => {
  initParallaxLayers();
});
```
### Implementation
#### Wrapper
Use `[data-parallax-layers]` to define the main container that holds all parallax elements. This element controls the scroll interaction and registers all layers within it.
#### Layer
Each `[data-parallax-layer]` defines an individual visual element that reacts to scroll position. Lower values move faster, while higher values move slower, simulating perspective depth.
#### Layer Speed
The scroll speed of each layer is determined by its numeric value:` [data-parallax-layer="1"]` moves the fastest, and higher numbers move more subtly.
You can fine-tune the speed per layer in the script if desired.
#### Image Layers
The effect works best with images that have visible depth, like landscapes, architecture, or wide shots. Cut your image into separate PNG layers (foreground, midground, background) to clearly define each depth plane.
Use a tool like Photoshop to export these as transparent PNGs for clean separation.
#### Tips
Use no more than four or five layers to keep performance optimal. Mix images and text layers for a more dynamic 3D look.
For an even smoother experience, pair it with the [Lenis Setup](https://www.osmo.supply/resource/lenis-smooth-scroll-setup) for scroll smoothness.