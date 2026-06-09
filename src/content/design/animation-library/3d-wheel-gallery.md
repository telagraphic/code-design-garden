---
title: "3D wheel gallery"
description: "In this effect, we arrange images in a 3D ring that spins on its own. Moving the pointer tilts the whole rig, and scrolling the wheel speeds up the rotation.…"
slug: "3d-wheel-gallery"
previewVideo: "3d-wheel-gallery.mp4"
order: 91
published: true
categories: ["scroll", "image-carousel", "media"]
triggers: ["scroll", "mouse-move"]
libraries: ["gsap"]
keywords: ["wheel", "gallery", "3d", "depth", "flip", "scroll", "orbital", "sphere"]
sourceUrl: "https://madewithgsap.com/effects/tutorial091"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```

### HTML
```text
<section class="mwg_effect091">
    <div class="container">
        <div class="auto-rotation">
            <div class="wheel-rotation">
                <div class="media">
                    <img src="./assets/medias/01.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/02.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/03.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/04.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/05.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/06.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/07.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/08.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/09.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/10.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/11.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/12.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/13.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/14.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/15.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/16.png" alt="">
                </div>
            </div>
        </div>
    </div>
</section>
```

### Javascript
```text
html:has(.mwg_effect091), 
body:has(.mwg_effect091) {
    overflow: hidden;
}
.mwg_effect091 {
    height: 100dvh;
    perspective: 400vw;
    overflow: hidden;
}
.mwg_effect091 .container {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}
.mwg_effect091 .auto-rotation {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}
.mwg_effect091 .wheel-rotation {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    transform-style: preserve-3d;
}
.mwg_effect091 .media {
    position: absolute;
    width: 65vw;
    height: 19vw;
    backface-visibility: hidden;
}
.mwg_effect091 .media img,
.mwg_effect091 .media video {
    width: auto;
    height: 100%;
    display: block;
}
```

## 3D wheel gallery #091

In this effect, we arrange images in a 3D ring that spins on its own. Moving the pointer tilts the whole rig, and scrolling the wheel speeds up the rotation. Let’s build it!

## HTML Structure

We nest three wrappers so each layer can spin or lean on its own axis. Every image sits inside a `.media` tile that we will later push onto a cylinder:

```html
<section class="mwg_effect091">
    <div class="container">
        <div class="auto-rotation">
            <div class="wheel-rotation">
                <div class="media">
                    <img src="./assets/medias/01.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/02.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/03.png" alt="">
                </div>
                …
            </div>
        </div>
    </div>
</section>
```

## Some CSS

We lock page scroll and give the section a deep perspective so the ring reads in 3D:

```
html:has(.mwg_effect091), 
body:has(.mwg_effect091) {
    overflow: hidden;
}
.mwg_effect091 {
    height: 100dvh;
    perspective: 400vw;
    overflow: hidden;
}
```

Every wrapper preserves 3D children so rotations stack correctly:

```
.mwg_effect091 .container,
.mwg_effect091 .auto-rotation,
.mwg_effect091 .wheel-rotation {
    transform-style: preserve-3d;
}
.mwg_effect091 .wheel-rotation {
    display: grid;
    place-items: center;
}
```

Each tile is absolutely centred with hidden back faces so the rear half of the ring does not bleed through:

```
.mwg_effect091 .media {
    position: absolute;
    backface-visibility: hidden;
}
```

## Building the ring

We bind the scene and split the tile count in half — the first batch forms the front arc, the second mirrors the same spacing on the far side:

```javascript
const root = document.querySelector('.mwg_effect091')
const container = root.querySelector('.container')
const autoRotationEl = root.querySelector('.auto-rotation')
const wheelRotationEl = root.querySelector('.wheel-rotation')
const medias = root.querySelectorAll('.media')

const mediasLength = medias.length
const half = Math.floor(mediasLength / 2)
```

Each panel receives its own slice of the circle. Panels on the rear hemisphere get an extra half turn:

```javascript
medias.forEach((media, index) => {
    const angle = 360 / half * (index % half)
    const isBack = index >= half

    gsap.set(media, {
        rotationY: angle + (isBack ? 180 : 0),
        rotation: isBack ? 180 : 0
    })
```

We flip the bitmap on back faces so the artwork still reads upright when it faces us again:

```javascript
if (isBack) {
        gsap.set(media.querySelector('img, video'), { 
            scaleX: -1,
            scaleY: -1
        })
    }
})
```

## Auto rotation

We let the outer wrapper drift forever around the vertical axis with a linear pace. A long duration keeps the orbit calm, and `repeat: -1` lets it run as long as the page stays open:

```javascript
gsap.to(autoRotationEl, {
    rotationY: 360,
    duration: 12,
    repeat: -1,
    ease: 'none'
})
```

## Tilting with the pointer

We clamp pointer coordinates to the viewport and wire three `quickTo` setters — one for each tilt axis. Each eases independently so the motion never snaps:

```javascript
const W = document.body.clientWidth
const H = window.innerHeight
const clampX = gsap.utils.clamp(0, W)
const clampY = gsap.utils.clamp(0, H)

const rotZ = gsap.quickTo(container, "rotation", {duration: 0.5, ease: 'power2'})
const rotX = gsap.quickTo(container, "rotationX", {duration: 0.5, ease: 'power2'})
const rotY = gsap.quickTo(wheelRotationEl, "rotationY", {duration: 0.5, ease: 'power2'})
```

We remap pointer position into small tilt budgets and feed them through the smoothed setters. The same helper drives both mouse and touch:

```javascript
function applyMove(clientX, clientY) {
    const x = clampX(clientX)
    const y = clampY(clientY)
    rotZ(gsap.utils.mapRange(0, W, -15, 15, x))
    rotX(gsap.utils.mapRange(0, H, 25, -25, y))
}

function handleMouseMove(e) {
    applyMove(e.clientX, e.clientY)
}
root.addEventListener('mousemove', handleMouseMove)

function handleTouchMove(e) {
    if (!e.touches || !e.touches[0]) return
    applyMove(e.touches[0].clientX, e.touches[0].clientY)
}
root.addEventListener('touchstart', handleTouchMove, { passive: true })
root.addEventListener('touchmove', handleTouchMove, { passive: true })
```

## Accelerating on wheel

Scrolling the wheel accumulates a separate offset on the inner wheel layer. We can nudge the parade without stopping the automatic drift:

```javascript
let dtSpeed = 0

function handleWheel(e) {
    dtSpeed += e.deltaY / 10
    rotY(dtSpeed)
}
root.addEventListener("wheel", handleWheel)
```

## Go further

Here, we could increase the number of image pairs to make the wheel denser. It could also be interesting not to enforce a fixed aspect ratio for each image, resulting in a completely different look. Plenty to experiment with!
