---
title: "Pixelate Image Render Effect"
description: "Pixelate Image Render Effect."
slug: "pixelate-image-render-effect"
previewVideo: "pixelate-image-render-effect.mp4"
order: 49.865
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["pixelate", "image", "render", "effect"]
sourceUrl: "https://www.osmo.supply/resource/pixelate-image-render-effect"
---
## Setup
### HTML
```text
<div data-pixelate-render="" data-pixelate-render-trigger="inview" class="pixelated-render-image">
  <div class="pixelated-render-image__before"></div>
</div>
```
### CSS
```text
.pixelated-render-image {
  justify-content: center;
  align-items: center;
  width: 55vw;
  display: flex;
  position: relative;
  overflow: hidden;
}
.pixelated-render-image__before {
  padding-top: 75%;
}
.pixelated-render-image__before.is--portrait {
  padding-top: 133.333%;
}
.pixelated-render-image__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
}
```
### Javascript
```javascript
function initPixelateImageRenderEffect() {
  let renderDuration = 150;  // Duration per step (in ms)
  let renderSteps = 12;       // Number of steps from chunky to sharp
  let renderColumns = 12;    // Starting number of columns at the most pixelated stage
  document.querySelectorAll('[data-pixelate-render]').forEach(setupPixelate);
  function setupPixelate(root) {
    const img = root.querySelector('[data-pixelate-render-img]');
    if (!img) return;
    const trigger = (root.getAttribute('data-pixelate-render-trigger') || 'load').toLowerCase();
    // Per-element overrides
    const durAttr = parseInt(root.getAttribute('data-pixelate-render-duration'), 10);
    const stepsAttr = parseInt(root.getAttribute('data-pixelate-render-steps'), 10);
    const colsAttr = parseInt(root.getAttribute('data-pixelate-render-columns'), 10);
    const fitMode = (root.getAttribute('data-pixelate-render-fit') || 'cover').toLowerCase();
    const elRenderDuration = Number.isFinite(durAttr) ? Math.max(16, durAttr) : renderDuration;
    const elRenderSteps = Number.isFinite(stepsAttr) ? Math.max(1, stepsAttr) : renderSteps;
    const elRenderColumns = Number.isFinite(colsAttr) ? Math.max(1, colsAttr) : renderColumns;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('data-pixelate-canvas', '');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    root.style.position ||= 'relative';
    root.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: true });
    ctx.imageSmoothingEnabled = false;
    const back = document.createElement('canvas');
    const tiny = document.createElement('canvas');
    const bctx = back.getContext('2d', { alpha: true });
    const tctx = tiny.getContext('2d', { alpha: true });
    let naturalW = 0, naturalH = 0;
    let playing = false, stageIndex = 0, stageStart = 0;
    let backDirty = true, resizeTimeout = 0;
    let steps = [elRenderColumns];
    function fitCanvas() {
      const r = root.getBoundingClientRect();
      const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        back.width = w; back.height = h;
        backDirty = true;
      }
      regenerateSteps();
    }
    function regenerateSteps() {
      const cw = Math.max(1, canvas.width);
      const startCols = Math.min(elRenderColumns, cw);
      const total = Math.max(1, elRenderSteps);
      const use = Math.max(1, Math.floor(total * 0.9)); // hard-coded 80%
      const a = [];
      const ratio = Math.pow(cw / startCols, 1 / total);
      for (let i = 0; i < use; i++) {
        a.push(Math.max(1, Math.round(startCols * Math.pow(ratio, i))));
      }
      for (let i = 1; i < a.length; i++) if (a[i] <= a[i - 1]) a[i] = a[i - 1] + 1;
      steps = a.length ? a : [startCols];
    }
    function drawImageToBack() {
      if (!backDirty || !naturalW || !naturalH) return;
      const cw = back.width, ch = back.height;
      let dw = cw, dh = ch, dx = 0, dy = 0;
      if (fitMode !== 'stretch') {
        const s = fitMode === 'cover' ? Math.max(cw / naturalW, ch / naturalH) : Math.min(cw / naturalW, ch / naturalH);
        dw = Math.max(1, Math.round(naturalW * s));
        dh = Math.max(1, Math.round(naturalH * s));
        dx = ((cw - dw) >> 1);
        dy = ((ch - dh) >> 1);
      }
      bctx.clearRect(0, 0, cw, ch);
      bctx.imageSmoothingEnabled = true;
      bctx.drawImage(img, dx, dy, dw, dh);
      backDirty = false;
    }
    function pixelate(columns) {
      const cw = canvas.width, ch = canvas.height;
      const cols = Math.max(1, Math.floor(columns));
      const rows = Math.max(1, Math.round(cols * (ch / cw)));
      if (tiny.width !== cols || tiny.height !== rows) { tiny.width = cols; tiny.height = rows; }
      tctx.imageSmoothingEnabled = false;
      tctx.clearRect(0, 0, cols, rows);
      tctx.drawImage(back, 0, 0, cw, ch, 0, 0, cols, rows);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(tiny, 0, 0, cols, rows, 0, 0, cw, ch);
    }
    function draw(stepCols) {
      if (!canvas.width || !canvas.height) return;
      drawImageToBack();
      pixelate(stepCols);
    }
    function animate(t) {
      if (!playing) return;
      if (!stageStart) stageStart = t;
      if (t - stageStart >= elRenderDuration) { stageIndex++; stageStart = t; }
      draw(steps[Math.min(stageIndex, steps.length - 1)]);
      if (stageIndex >= steps.length - 1) {
        canvas.style.opacity = '0';
        playing = false;
        window.removeEventListener('resize', onWindowResize);
        setTimeout(() => { canvas.remove(); }, 250);
        return;
      }
      requestAnimationFrame(animate);
    }
    function prime() {
      fitCanvas();
      const run = () => {
        naturalW = img.naturalWidth; naturalH = img.naturalHeight;
        if (!naturalW || !naturalH) return;
        stageIndex = 0;
        canvas.style.opacity = '1';
        backDirty = true;
        draw(steps[0]);
      };
      if (img.complete && img.naturalWidth) run(); else img.addEventListener('load', run, { once: true });
    }
    function start() {
      if (playing) return;
      fitCanvas();
      const run = () => {
        naturalW = img.naturalWidth; naturalH = img.naturalHeight;
        if (!naturalW || !naturalH) return;
        stageIndex = 0; stageStart = 0; canvas.style.opacity = '1';
        backDirty = true;
        playing = true;
        requestAnimationFrame(animate);
      };
      if (img.complete && img.naturalWidth) run(); else img.addEventListener('load', run, { once: true });
    }
    function onResize() {
      fitCanvas();
      if (!playing) draw(steps[Math.min(stageIndex, steps.length - 1)] || steps[0]);
    }
    function onWindowResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onResize, 250);
    }
    if (trigger === 'load') {
      prime();
      start();
    } else if (trigger === 'inview') {
      prime();
      const io = new IntersectionObserver(es => {
        for (const e of es) if (e.isIntersecting) { start(); io.disconnect(); break; }
      }, { rootMargin: '0px 0px -25% 0px', threshold: 0.25 });
      io.observe(root);
      window.addEventListener('resize', onWindowResize);
    } else if (trigger === 'hover') {
      prime();
      root.addEventListener('mouseenter', start, { once: true });
      window.addEventListener('resize', onWindowResize);
    } else if (trigger === 'click') {
      prime();
      root.addEventListener('click', start, { once: true });
      window.addEventListener('resize', onWindowResize);
    }
  }
}
// Initialize Pixelate Image Render Effect
document.addEventListener('DOMContentLoaded', () => {
  initPixelateImageRenderEffect();
});
```
### Implementation
#### Container
Wrap each image you want to pixelate in a container with `[data-pixelate-render]`. This element controls when the effect runs based on the trigger.
#### Image
Place a single image inside the container with `[data-pixelate-render-img]`. The script draws the fitted image into an offscreen buffer and renders a pixelated overlay canvas on top.
#### Trigger
Control when the animation runs with `[data-pixelate-render-trigger]`. Accepted values:
- `load` starts immediately once the image has loaded
- `inview` starts the first time the element is sufficiently in the viewport
- `hover` starts on first mouseenter
- `click` starts on first click
### Optional overrides
#### Duration
This controls the amount of time each animation step takes, measured in milliseconds, and is set with the attribute `[data-pixelate-render-duration="150"]`. A lower duration makes the transition snappier, while a higher duration creates a smoother, more gradual effect.
#### Steps
This defines how many pixelation stages exist between the starting chunky look and the sharp final image, set using `[data-pixelate-render-steps="12"]`.
#### Columns
This sets how many pixel columns the image starts with at its most pixelated stage, using the attribute `[data-pixelate-render-columns="12"]`. Rows are automatically calculated to maintain square pixels.
#### Fit
This determines how the image is scaled into the pixelation canvas before processing, and is set with `[data-pixelate-render-fit]`.
- `cover` fill the box, crop if needed
- `contain` fully visible, may letterbox
- `stretch` ignore aspect ratio
### HTML
```text
<div 
  data-pixelate-render 
  data-pixelate-render-trigger="inview"
  data-pixelate-render-duration="120"
  data-pixelate-render-steps="10"
  data-pixelate-render-columns="16"
  data-pixelate-render-fit="cover">
</div>
```
#### Viewport behavior
- `inview` uses IntersectionObserver with threshold: 0.25 which means about 25 percent of the element must be visible before the animation starts.
- `rootMargin` '0px 0px -25% 0px' shrinks the bottom detection zone by 25 percent of the viewport height, which delays the trigger slightly until the element is a bit more on screen.