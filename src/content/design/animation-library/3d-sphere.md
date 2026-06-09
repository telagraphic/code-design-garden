---
title: "3D sphere"
description: "In this effect, we distribute images on the surface of an invisible sphere and spin it with drag or wheel input. The globe rotates in screen space with a sof…"
slug: "3d-sphere"
previewVideo: "3d-sphere.mp4"
order: 99
published: true
categories: ["scroll", "layout"]
triggers: ["scroll", "hover", "drag", "mouse-move"]
libraries: ["gsap"]
keywords: ["sphere", "3d", "depth", "scroll", "drag", "hover", "image"]
sourceUrl: "https://madewithgsap.com/effects/tutorial099"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```

### HTML
```text
<section class="mwg_effect099">
    <div class="sphere-container">
        <div class="sphere">
            <img class="media" src="./assets/medias/01.png" alt="">
            <img class="media" src="./assets/medias/02.png" alt="">
            <img class="media" src="./assets/medias/03.png" alt="">
            <img class="media" src="./assets/medias/04.png" alt="">
            <img class="media" src="./assets/medias/05.png" alt="">
            <img class="media" src="./assets/medias/06.png" alt="">
            <img class="media" src="./assets/medias/07.png" alt="">
            <img class="media" src="./assets/medias/08.png" alt="">
            <img class="media" src="./assets/medias/09.png" alt="">
            <img class="media" src="./assets/medias/10.png" alt="">
            <img class="media" src="./assets/medias/11.png" alt="">
            <img class="media" src="./assets/medias/12.png" alt="">
            <img class="media" src="./assets/medias/13.png" alt="">
            <img class="media" src="./assets/medias/14.png" alt="">
            <img class="media" src="./assets/medias/15.png" alt="">
        </div>
    </div>
</section>
```

### Javascript
```text
html:has(.mwg_effect099), 
body:has(.mwg_effect099) {
    overscroll-behavior-x: none;
    overflow: hidden;
}
.mwg_effect099 {
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.mwg_effect099 .sphere-container {
    perspective-origin: center center;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mwg_effect099 .media {
    position: absolute;
    width: 10vw;
    height: 10vw;
    object-fit: cover;
    transform-style: preserve-3d;
    left: 50%;
    top: 50%;
    margin-left: -5vw;
    margin-top: -5vw;
    border-radius: 0.4vw;
    user-select: none;
    -webkit-user-drag: none;
}
```

## 3D sphere #099

In this effect, we distribute images on the surface of an invisible sphere and spin it with drag or wheel input. The globe rotates in screen space with a soft follow, so every tile keeps facing the camera. Let’s get started!

## HTML Structure

We place a perspective wrapper and a single sphere node that contains every image. Each photograph is a direct child so the script can park it in 3D without extra markup:

```html
<section class="mwg_effect099">
    <div class="sphere-container">
        <div class="sphere">
            <img class="media" src="./assets/medias/01.png" alt="">
            <img class="media" src="./assets/medias/02.png" alt="">
            <img class="media" src="./assets/medias/03.png" alt="">
            …
        </div>
    </div>
</section>
```

## Some CSS

We lock page overflow so drag and wheel never fight the body scroll. The section fills the viewport and centres the stage:

```
html:has(.mwg_effect099), 
body:has(.mwg_effect099) {
    overflow: hidden;
}
.mwg_effect099 {
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
```

The container supplies perspective. Every tile is absolutely centred with a square footprint, preserves 3D transforms, and blocks native dragging:

```
.mwg_effect099 .sphere-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mwg_effect099 .media {
    position: absolute;
    width: 10vw;
    height: 10vw;
    object-fit: cover;
    transform-style: preserve-3d;
    left: 50%;
    top: 50%;
    margin-left: -5vw;
    margin-top: -5vw;
    user-select: none;
    -webkit-user-drag: none;
}
```

## Fibonacci distribution

We distribute every tile along a Fibonacci spiral on the unit sphere. The golden angle spaces points evenly so no region of the globe is over-crowded:

```javascript
const root = document.querySelector('.mwg_effect099')
const medias = root.querySelectorAll('.media')
const totalMedias = medias.length
const goldenAngle = Math.PI * (3 - Math.sqrt(5))
const radius = 0.2 * window.innerWidth

const positions = []
medias.forEach((media, index) => {
    const y = 1 - (2 * index) / (totalMedias - 1 || 1)
    const phi = Math.acos(y) - Math.PI / 2
    const theta = (index * goldenAngle) % (2 * Math.PI)
    positions.push({
        x: Math.cos(phi) * Math.cos(theta),
        y: Math.sin(phi),
        z: Math.cos(phi) * Math.sin(theta)
    })
})
```

## Rendering the globe

We keep a 3×3 orientation matrix `m` that starts as identity. A render function multiplies each normalised position by the matrix, scales by the radius, and writes a `translate3d`:

```javascript
const m = [1, 0, 0, 0, 1, 0, 0, 0, 1]

function updateMedias() {
    medias.forEach((media, i) => {
        const p = positions[i]
        const x = m[0] * p.x + m[1] * p.y + m[2] * p.z
        const y = m[3] * p.x + m[4] * p.y + m[5] * p.z
        const z = m[6] * p.x + m[7] * p.y + m[8] * p.z
        media.style.transform = \`translate3d(${x * radius}px, ${-y * radius}px, ${z * radius}px)\`
    })
}
updateMedias()
```

## Rotation matrix

On each frame we convert the smoothed angle deltas into a small rotation matrix `R` and premultiply it into `m`. This keeps the rotation in screen space so tiles always face the camera:

```javascript
const mTmp = [0, 0, 0, 0, 0, 0, 0, 0, 0]
const R = [0, 0, 0, 0, 0, 0, 0, 0, 0]

function premultiply3x3(left) {
    for (let i = 0; i < 3; i++) {
        const a = left[i * 3], b = left[i * 3 + 1], c = left[i * 3 + 2]
        for (let j = 0; j < 3; j++) {
            mTmp[i * 3 + j] = a * m[j] + b * m[3 + j] + c * m[6 + j]
        }
    }
    for (let k = 0; k < 9; k++) m[k] = mTmp[k]
}
```

## Smooth follow

We use `gsap.quickTo` to ease the raw input values. Each update triggers the rotation math and render pass so the spin feels weighted:

```javascript
const smooth = { x: 0, y: 0 }
let prevX = 0, prevY = 0

const quickY = gsap.quickTo(smooth, 'y', { duration: 1, ease: 'power2', onUpdate: updateMedias })
const quickX = gsap.quickTo(smooth, 'x', { duration: 1, ease: 'power2', onUpdate: updateMedias })
```

Inside `updateMedias` we read the delta since the last frame, build the rotation matrix, and re-render every tile.

## Drag & wheel input

An `Observer` listens for wheel, touch, and pointer events. We accumulate the deltas and feed them into the quick setters. Finally we enable `preserve-3d` and perspective on the sphere container:

```javascript
let incrY = 0, incrX = 0
Observer.create({
    target: root,
    type: "wheel,touch,pointer",
    onWheel: (e) => {
        incrY -= e.deltaY / 10
        incrX -= e.deltaX / 10
        quickY(incrX)
        quickX(incrY)
    },
    onDrag: (e) => {
        incrY += e.deltaY / 4
        incrX += e.deltaX / 4
        quickY(incrX)
        quickX(incrY)
    },
})

gsap.set(root.querySelector('.sphere'), { transformStyle: 'preserve-3d' })
gsap.set(root.querySelector('.sphere-container'), { perspective: '50vw' })
```

## Go further

Here, we can mainly play with the size of the items, their number, and the sphere’s radius. This will make the layout feel more or less condensed.
