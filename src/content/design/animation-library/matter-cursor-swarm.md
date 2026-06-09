---
title: "Matter cursor swarm"
description: "In this effect, thumbnails chase the cursor with different air resistances — some snap tight while others trail lazily behind. A Matter.js physics world keep…"
slug: "matter-cursor-swarm"
previewVideo: "matter-cursor-swarm.mp4"
order: 80
published: true
categories: ["cursor", "scroll"]
triggers: ["scroll", "mouse-move"]
libraries: ["gsap"]
keywords: ["matter", "cursor", "swarm", "scroll", "random", "rotate", "image", "physics"]
sourceUrl: "https://madewithgsap.com/effects/tutorial080"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
```

### HTML
```text
<section class="mwg_effect080">
    <div class="container">
        <div class="medias">
            <div class="media">
                <img src="./assets/medias/1.png" alt="">
            </div>
            <!-- duplicate .media for each extra image -->
        </div>
    </div>
</section>
```

### Javascript
```text
html:has(.mwg_effect080),
body:has(.mwg_effect080) {
    overflow: hidden;
}
.mwg_effect080 .container {
    position: relative;
    height: 100dvh;
    overflow: hidden;
}
.mwg_effect080 .media {
    position: absolute;
    top: 0;
    left: 0;
}
.mwg_effect080 .media img {
    width: 9vw;
    height: auto;
    display: block;
}
.mwg_effect080 .media img.landscape {
    width: auto;
    height: 9vw;
}
```

## Matter cursor swarm #080

In this effect, thumbnails chase the cursor with different air resistances — some snap tight while others trail lazily behind. A Matter.js physics world keeps the items solid so they bump and shove each other instead of overlapping. Let's begin!

## HTML Structure

The structure is straightforward. A viewport-sized container holds a list of media shells, each wrapping one image. We'll spawn a matching physics body for each shell later:

```html
<section class="mwg_effect080">
    <div class="container">
        <div class="medias">
            <div class="media">
                <img src="./assets/medias/1.png" alt="">
            </div>
            <!-- duplicate .media for each extra image -->
        </div>
    </div>
</section>
```

## Some CSS

We lock page overflow while the effect is present so stray drags never scroll the document:

```
html:has(.mwg_effect080),
body:has(.mwg_effect080) {
    overflow: hidden;
}
```

The container fills the viewport and keeps a relative origin so absolutely positioned shells can slide freely:

```
.mwg_effect080 .container {
    position: relative;
    height: 100dvh;
    overflow: hidden;
}
```

Each thumbnail sits at the top-left corner of its shell with viewport-based sizing. A `.landscape` class swaps the axis for wide images so our physics rectangles stay proportional:

```
.mwg_effect080 .media {
    position: absolute;
    top: 0;
    left: 0;
}
.mwg_effect080 .media img {
    width: 9vw;
    height: auto;
    display: block;
}
.mwg_effect080 .media img.landscape {
    width: auto;
    height: 9vw;
}
```

## Physics stage & bodies

We bind the scene elements and cache the viewport size with clamp helpers:

```javascript
const root = document.querySelector('.mwg_effect080')
const mediaElements = root.querySelectorAll('.media')

const vw = window.innerWidth
const vh = window.innerHeight
const clampX = gsap.utils.clamp(0, vw)
const clampY = gsap.utils.clamp(0, vh)
```

We spin up a Matter.js engine with world gravity set to zero — motion will come entirely from our own cursor-driven forces:

```javascript
const { Engine, World, Bodies, Runner, Body } = Matter
const engine = Engine.create()
engine.world.gravity.x = 0
engine.world.gravity.y = 0
```

We map every media shell into a rectangle body. The key trick is the `airExtra` array — each card gets a different `frictionAir` value, which is what creates the staggered trailing behaviour:

```javascript
const airExtra = [0.1, 0.25, 0.35]

const mediaItems = [...mediaElements].map((el, i) => {
    const img = el.querySelector('img')
    if (img.naturalWidth > img.naturalHeight) {
        img.classList.add('landscape')
    }

    const w = el.clientWidth
    const h = el.clientHeight
    const body = Bodies.rectangle(
        vw / 2 + (Math.random() - 0.5) * 0.6 * vw,
        vh / 2 + (Math.random() - 0.5) * 0.4 * vh,
        w, h,
        { frictionAir: 0.05 + airExtra[i % 3] }
    )
    World.add(engine.world, body)
    return { el, body, w, h }
})
```

## Follow impulse & draw loop

We track the pointer position and use a `force.multiplier` that ramps up quickly on movement, then decays so attraction fades when the hand pauses:

```javascript
let targetX = vw / 2
let targetY = vh / 2
const force = { multiplier: 0 }

function applyMove(clientX, clientY) {
    targetX = clampX(clientX)
    targetY = clampY(clientY)
    gsap.to(force, { multiplier: 1, duration: 0.15, overwrite: true })
    gsap.to(force, { multiplier: 0, duration: 0.6, delay: 0.15 })
}
```

We listen for mouse and touch so the same path runs on desktop and mobile:

```javascript
function handleMouseMove(e) {
    applyMove(e.clientX, e.clientY)
}
function handleTouchMove(e) {
    if (!e.touches || !e.touches[0]) return
    applyMove(e.touches[0].clientX, e.touches[0].clientY)
}
root.addEventListener('mousemove', handleMouseMove)
root.addEventListener('touchstart', handleTouchMove, {passive: true})
root.addEventListener('touchmove', handleTouchMove, {passive: true})
```

We start the Matter runner so collisions keep resolving. On each frame, we apply a gentle force from every body toward the cursor target, then copy the body position and angle back to the DOM:

```javascript
const runner = Runner.create()
Runner.run(runner, engine)

function tick() {
    mediaItems.forEach(({ el, body, w, h }) => {
        Body.applyForce(body, body.position, {
            x: (targetX - body.position.x) * 0.0012 * force.multiplier,
            y: (targetY - body.position.y) * 0.0012 * force.multiplier
        })
        el.style.transform = \`translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)\`
    })
}
```

Finally, we gate the tick with a ScrollTrigger observer so the draw loop only runs while the block is visible — this keeps CPU idle when the effect is off-screen:

```javascript
ScrollTrigger.create({
    trigger: root,
    onEnter: () => { gsap.ticker.add(tick) },
    onLeave: () => { gsap.ticker.remove(tick) },
    onEnterBack: () => { gsap.ticker.add(tick) },
    onLeaveBack: () => { gsap.ticker.remove(tick) },
})
```

## Go further

Here, we could adjust the gravity of the different items for a less bouncy effect or, conversely, a more dispersed one. We could also slow down the update of the new center of gravity position to increase the trailing effect.
