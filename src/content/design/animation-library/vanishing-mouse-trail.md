---
title: "Vanishing mouse trail"
description: "In this effect, we spawn images under the cursor as it moves. Each new tile pops in with a little elastic movement, then older ones get pulled into the cente…"
slug: "vanishing-mouse-trail"
previewVideo: "vanishing-mouse-trail.mp4"
order: 92
published: true
categories: ["cursor", "scroll", "text"]
triggers: ["scroll", "hover", "mouse-move"]
libraries: ["gsap"]
keywords: ["vanishing", "mouse", "trail", "3d", "depth", "scroll", "random", "hover"]
sourceUrl: "https://madewithgsap.com/effects/tutorial092"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```

### HTML
```text
<section class="mwg_effect092">
    <div class="container">
        <div class="header">
            <span>Trailing images</span> <span>fading into the void</span>
        </div>
    </div>
    <div class="medias">
        <img src="./assets/medias/01.png" alt="">
        <img src="./assets/medias/02.png" alt="">
        <img src="./assets/medias/03.png" alt="">
        <img src="./assets/medias/04.png" alt="">
        <img src="./assets/medias/05.png" alt="">
        <img src="./assets/medias/06.png" alt="">
        <img src="./assets/medias/07.png" alt="">
        <img src="./assets/medias/08.png" alt="">
        <img src="./assets/medias/09.png" alt="">
        <img src="./assets/medias/10.png" alt="">
        <img src="./assets/medias/11.png" alt="">
        <img src="./assets/medias/12.png" alt="">
    </div>
</section>
```

### Javascript
```text
html:has(.mwg_effect092), 
body:has(.mwg_effect092) {
    overflow: hidden;
}
.mwg_effect092 {
    height: 100dvh;
    overflow: hidden;
    position: relative;
    perspective: 600vw;
}
.mwg_effect092 .container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.mwg_effect092 .header {
    width: 100%;
    padding: var(--grid-margin);
    position: absolute;
    left: 0;
    text-align: center;
    font-size: min(65px, 6vw);
}
.mwg_effect092 .header span:last-child {
    color: #999;
}
.mwg_effect092 > img {
    width: 15vw;
    height: 15vw;
    position: absolute;
    object-fit: cover;
    box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.2);
    z-index: 5;
}
.mwg_effect092 .medias img {
    width: 1px;
    height: 1px;
    top: 0;
    left: 0;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
}
```

## Vanishing mouse trail #092

In this effect, we spawn images under the cursor as it moves. Each new tile pops in with a little elastic movement, then older ones get pulled into the center of the scene until they vanish. Let’s build it!

## HTML Structure

We keep a hidden stack of source images and an empty stage where spawned tiles will land. Editorial copy can sit in a container above the trail — the photographs that animate are injected at runtime from the hidden list:

```html
<section class="mwg_effect092">
    <div class="container">
        <div class="header">
            <span>Trailing images</span>
            <span>fading into the void</span>
        </div>
    </div>
    <div class="medias">
        <img src="./assets/medias/01.png" alt="">
        <img src="./assets/medias/02.png" alt="">
        <img src="./assets/medias/03.png" alt="">
        …
    </div>
</section>
```

## Some CSS

We lock page scroll and give the section a deep perspective so tiles can travel far along the Z axis:

```
html:has(.mwg_effect092), 
body:has(.mwg_effect092) {
    overflow: hidden;
}
.mwg_effect092 {
    height: 100dvh;
    overflow: hidden;
    position: relative;
    perspective: 600vw;
}
```

The preload stack stays invisible. Every spawned image is absolutely positioned so it can sit in true depth above the stage:

```
.mwg_effect092 .medias img {
    width: 1px;
    height: 1px;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
}
.mwg_effect092 > img {
    position: absolute;
    object-fit: cover;
}
```

## Preparing the sources

We collect every hidden source into an array so the trail can cycle through them without waiting on the network. A quick touch check also sets how often spawns should fire on mobile versus desktop:

```javascript
const root = document.querySelector('.mwg_effect092')
const srcs = Array.from(root.querySelectorAll('.medias img'), el => el.src)

let isTouch = false
gsap.matchMedia().add("(hover: none)", () => {isTouch = true})

const spawnDist = window.innerWidth / (isTouch ? 6 : 12)
```

## Spawning a new image

When the horizontal travel budget is exceeded, we drop a new image centred on the cursor with a slight random twist. A short elastic scale makes the pop feel physical before the tile joins the active stack:

```javascript
let distance = 0
let lastX = 0
let firstMove = true
let mediaIndex = 0
const activeImages = []
const rectTop = () => root.getBoundingClientRect().top

function createMedia(x, y) {
    const img = document.createElement('img')
    img.src = srcs[mediaIndex]
    root.appendChild(img)

    gsap.fromTo(img, {
        x, y, z: 0,
        xPercent: -50,
        yPercent: -50,
        rotation: (Math.random() - 0.5) * 14,
        scale: 1.3
    }, {
        scale: 1,
        ease: 'elastic.out(2, 0.6)',
        duration: 0.6
    })

    const zTo = gsap.quickTo(img, 'z', { duration: 1.2, ease: 'power2' })
    activeImages.push({ img, recessionInput: 0, zTo, fadedOut: false })

    mediaIndex = (mediaIndex + 1) % srcs.length
}
```

## Tracking pointer movement

We clamp pointer coordinates to the viewport and accumulate horizontal distance since the last spawn. On each move we also feed speed into the recession logic (next chapter):

```javascript
const W = window.innerWidth
const H = window.innerHeight
const clampX = gsap.utils.clamp(0, W)
const clampY = gsap.utils.clamp(0, H)

function applyMove(clientX, clientY) {
    const x = clampX(clientX)
    const y = clampY(clientY)

    if (firstMove) {
        firstMove = false
        lastX = x
        return
    }

    const delta = Math.abs(x - lastX)
    distance += delta
    lastX = x

    // recession runs here

    if (distance > spawnDist) {
        distance = 0
        createMedia(x, y - rectTop())
    }
}
```

## Sucking into depth

We turn horizontal speed into suction. Every move adds to a recession score on each live tile, maps it through an ease-in curve, and pushes the image deeper along Z with a smoothed setter:

```javascript
const easeIn = gsap.parseEase('power2.in')
const maxZ = window.innerWidth * 10

// inside applyMove, after measuring delta:
const inputDelta = delta * window.innerWidth * 0.06

activeImages.forEach(entry => {
    entry.recessionInput += inputDelta
    const progress = Math.min(entry.recessionInput / (window.innerWidth * 45), 1)
    entry.zTo(-easeIn(progress) * maxZ)
```

When a tile nears the far limit it fades out and leaves the DOM so the stack never grows without control:

```javascript
if (progress >= 0.98 && !entry.fadedOut) {
        entry.fadedOut = true
        gsap.to(entry.img, {
            autoAlpha: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                entry.img.remove()
                activeImages.splice(activeImages.indexOf(entry), 1)
            }
        })
    }
})
```

## Listening to input

We wire the same `applyMove` helper to both mouse and touch so the trail feels identical on every device:

```javascript
function handleMouseMove(e) {
    applyMove(e.clientX, e.clientY)
}
function handleTouchMove(e) {
    if (!e.touches || !e.touches[0]) return
    applyMove(e.touches[0].clientX, e.touches[0].clientY)
}

root.addEventListener('mousemove', handleMouseMove)
root.addEventListener('touchstart', handleTouchMove, { passive: true })
root.addEventListener('touchmove', handleTouchMove, { passive: true })
```

## Go further

Tighten or loosen the spawn distance when you want denser or sparser trails, and scale the recession multipliers if the suction should feel gentler or more violent. Raising the far limit stretches how long tiles linger in depth before they disappear. If you embed this on a longer page, remember to restore normal overflow on the document once the block leaves the viewport.
