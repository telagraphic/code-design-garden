---
title: "Magnetic Image Reveal"
description: "In this effect, images appear one by one as you scroll, each in a random position. A soft force pulls them toward the center of the screen, where they settle…"
slug: "magnetic-image-reveal"
previewVideo: "magnetic-image-reveal.mp4"
order: 96
published: true
categories: ["scroll", "text"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["magnetic", "image", "reveal", "scroll", "pinned", "random", "rotate", "physics"]
sourceUrl: "https://madewithgsap.com/effects/tutorial096"
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
<section class="mwg_effect096">
    <p class="scroll">Scroll</p>
    <div class="pin-height">
        <div class="container">
            <div class="medias">
                <div class="media">
                    <img src="./assets/medias/1.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/2.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/3.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/4.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/5.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/6.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/7.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/8.png" alt="">
                </div>
            </div>
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect096 .pin-height {
    height: 300vh;
}
.mwg_effect096 .container {
    height: 100vh;
    overflow: hidden;
}
.mwg_effect096 .media {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
}
.mwg_effect096 .media img {
    width: 14vw;
    height: auto;
    display: block;
}
.mwg_effect096 .media img.landscape {
    width: auto;
    height: 14vw;
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect096')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const mediaElements = root.querySelectorAll('.media')

const vw = window.innerWidth
const vh = window.innerHeight
const centerX = vw / 2
const centerY = vh / 2
const forceStrength = 0.0004

const { Engine, World, Bodies, Runner, Body } = Matter
const engine = Engine.create({ gravity: { x: 0, y: 0 } })

const mediaItems = [...mediaElements].map(el => {
    const img = el.querySelector('img')
    if (img.naturalWidth > img.naturalHeight) img.classList.add('landscape')

    const w = el.clientWidth
    const h = el.clientHeight
    const body = Bodies.rectangle(
        centerX + (Math.random() - 0.5) * 0.6 * vw,
        centerY + (Math.random() - 0.5) * 0.4 * vh,
        w, h,
        { frictionAir: 0.03 }
    )
    el.style.visibility = 'hidden'
    return { el, body, w, h }
})

const manageMediasVisibility = (progress) => {
    mediaItems.forEach((item, i) => {
        const threshold = mediaItems.length > 1 ? (i + 1) / mediaItems.length : 0
        const inWorld = engine.world.bodies.includes(item.body)

        if (progress >= threshold && !inWorld) {
            Body.setAngle(item.body, 0)
            World.add(engine.world, item.body)
            gsap.from(item.el.querySelector('img'), {
                scale: 0.7,
                duration: 0.2,
                ease: 'back.out(3.5)'
            })
            item.el.style.visibility = 'visible'
        } else if (progress < threshold && inWorld) {
            World.remove(engine.world, item.body)
            item.el.style.visibility = 'hidden'
            Body.setPosition(item.body, {
                x: centerX + (Math.random() - 0.5) * 0.6 * vw,
                y: centerY + (Math.random() - 0.5) * 0.4 * vh,
            })
        }
    })
}

const runner = Runner.create()
Runner.run(runner, engine)

ScrollTrigger.create({
    trigger: pinHeight,
    start: 'top top',
    end: 'bottom bottom',
    pin: container,
    scrub: true,
    onUpdate: (self) => manageMediasVisibility(self.progress)
})

function tick() {
    mediaItems.forEach(({ el, body, w, h }) => {
        if (!engine.world.bodies.includes(body)) return

        Body.applyForce(body, body.position, {
            x: (centerX - body.position.x) * forceStrength,
            y: (centerY - body.position.y) * forceStrength
        })

        el.style.transform = \`translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)\`
    })
}

ScrollTrigger.create({
    trigger: root,
    onEnter: () => { gsap.ticker.add(tick) },
    onLeave: () => { gsap.ticker.remove(tick) },
    onEnterBack: () => { gsap.ticker.add(tick) },
    onLeaveBack: () => { gsap.ticker.remove(tick) },
})
```

## Magnetic Image Reveal #096

In this effect, images appear one by one as you scroll, each in a random position. A soft force pulls them toward the center of the screen, where they settle once the sequence is complete. Let’s build it!

## HTML Structure

We stack a scroll hint, a tall pin wrapper, and a viewport-sized container that holds every image tile. Each photograph lives inside its own cell so the runtime can hide, reveal, and move tiles independently while the pin keeps the stage fixed on screen:

```html
<section class="mwg_effect096">
    <p class="scroll">Scroll</p>
    <div class="pin-height">
        <div class="container">
            <div class="medias">
                <div class="media">
                    <img src="./assets/medias/1.png" alt="">
                </div>
                <div class="media">
                    <img src="./assets/medias/2.png" alt="">
                </div>
                …
            </div>
        </div>
    </div>
</section>
```

## Some CSS

The pin wrapper earns several viewport heights so we actually scroll through the effect instead of skipping past it in one tick:

```
.mwg_effect096 .pin-height {
    height: 300vh;
}
.mwg_effect096 .container {
    height: 100vh;
    overflow: hidden;
}
```

Every tile is absolutely positioned and hidden until the script promotes it. Images pick up a landscape class when they are wider than they are tall so both orientations share the same footprint:

```
.mwg_effect096 .media {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
}
.mwg_effect096 .media img {
    width: 14vw;
    height: auto;
    display: block;
}
.mwg_effect096 .media img.landscape {
    width: auto;
    height: 14vw;
}
```

## Physics engine

We bind the scene elements and create a zero-gravity Matter.js engine. Without gravity the bodies will only move when we apply a force ourselves later:

```javascript
const root = document.querySelector('.mwg_effect096')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const mediaElements = root.querySelectorAll('.media')

const vw = window.innerWidth
const vh = window.innerHeight
const centerX = vw / 2
const centerY = vh / 2

const { Engine, World, Bodies, Body } = Matter
const engine = Engine.create({ gravity: { x: 0, y: 0 } })
```

## Creating the bodies

We map every tile to a physics rectangle parked near the centre with a small random scatter. A landscape check ensures images fill the cell cleanly regardless of orientation:

```javascript
const mediaItems = [...mediaElements].map(el => {
    const img = el.querySelector('img')
    if (img.naturalWidth > img.naturalHeight) img.classList.add('landscape')

    const w = el.clientWidth
    const h = el.clientHeight
    const body = Bodies.rectangle(
        centerX + (Math.random() - 0.5) * 0.6 * vw,
        centerY + (Math.random() - 0.5) * 0.4 * vh,
        w, h,
        { frictionAir: 0.03 }
    )
    el.style.visibility = 'hidden'
    return { el, body, w, h }
})
```

## Revealing on scroll

We split scroll progress into equal steps so each image joins the simulation in order, pops in with a quick scale entrance, and leaves again if we rewind:

```javascript
const manageMediasVisibility = (progress) => {
    mediaItems.forEach((item, i) => {
        const threshold = mediaItems.length > 1 ? (i + 1) / mediaItems.length : 0
        const inWorld = engine.world.bodies.includes(item.body)

        if (progress >= threshold && !inWorld) {
            Body.setAngle(item.body, 0)
            World.add(engine.world, item.body)
            gsap.from(item.el.querySelector('img'), {
                scale: 0.7,
                duration: 0.2,
                ease: 'back.out(3.5)'
            })
            item.el.style.visibility = 'visible'
        } else if (progress < threshold && inWorld) {
            World.remove(engine.world, item.body)
            item.el.style.visibility = 'hidden'
            Body.setPosition(item.body, {
                x: centerX + (Math.random() - 0.5) * 0.6 * vw,
                y: centerY + (Math.random() - 0.5) * 0.4 * vh,
            })
        }
    })
}
```

## Pinning the container

We pin the container for the length of the tall wrapper. Scroll progress feeds the visibility function so the parade is scrubbed to our scroll position:

```javascript
ScrollTrigger.create({
    trigger: pinHeight,
    start: 'top top',
    end: 'bottom bottom',
    pin: container,
    scrub: true,
    onUpdate: (self) => manageMediasVisibility(self.progress)
})
```

## Centre pull & render

We start the physics runner and nudge each active body toward the viewport centre on every frame so the flock clusters instead of drifting apart. The DOM tile follows its body with a translate and rotation:

```javascript
const forceStrength = 0.0004
const { Runner } = Matter
const runner = Runner.create()
Runner.run(runner, engine)

function tick() {
    mediaItems.forEach(({ el, body, w, h }) => {
        if (!engine.world.bodies.includes(body)) return

        Body.applyForce(body, body.position, {
            x: (centerX - body.position.x) * forceStrength,
            y: (centerY - body.position.y) * forceStrength
        })

        el.style.transform = \`translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)\`
    })
}
```

A second ScrollTrigger adds and removes the ticker so work stops once we scroll past the section:

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

Here, it’s mainly the values assigned to the Matter.js properties that define the overall feel. This lets us play with gravity, bounciness, and the speed at which inertia propagates. Plenty to experiment with!
