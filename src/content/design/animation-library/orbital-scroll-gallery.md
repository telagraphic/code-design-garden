---
title: "Orbital Scroll Gallery"
description: "One of our favorite effects: a collection of images is distributed along an orbit around the center of the viewport. The images rotate slowly in an infinite …"
slug: "orbital-scroll-gallery"
previewVideo: "orbital-scroll-gallery.mp4"
order: 100
published: true
categories: ["scroll", "image-carousel", "text"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["orbital", "scroll", "gallery", "3d", "depth", "random", "letters", "rotate"]
sourceUrl: "https://madewithgsap.com/effects/tutorial100"
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
<section class="mwg_effect100">
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
    <p>
        <span>Showcase</span>
        <span>12</span>
    </p>
</section>
```

### Javascript
```text
html:has(.mwg_effect100), 
body:has(.mwg_effect100) {
    overflow: hidden;
}
.mwg_effect100 {
    height: 100vh;
}
.mwg_effect100 .media {
    position: absolute;
    top: calc(50% - 4vw);
    left: calc(50% - 4vw);
    width: 8vw;
    height: 8vw;
    object-fit: contain;
    will-change: transform;
    border-radius: 1.4vw;
}
.mwg_effect100 p {
    position: absolute;
    font-size: max(30px, 4vw);
    line-height: 0.9;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: var(--grid-margin);
}
.mwg_effect100 p span:last-child {
    color: var(--mwg2-grey);
}
```

## Orbital Scroll Gallery #100

One of our favorite effects: a collection of images is distributed along an orbit around the center of the viewport. The images rotate slowly in an infinite loop. The motion is linked to scroll and its intensity — each image is pushed further or closer depending on the scroll, then smoothly returns to its original position. Let’s dive in!

## HTML Structure

We list every image as a direct child alongside a short caption locked in the middle. Keeping the tiles flat lets the ticker reposition them with transforms alone:

```html
<section class="mwg_effect100">
    <img class="media" src="./assets/medias/01.png" alt="">
    <img class="media" src="./assets/medias/02.png" alt="">
    <img class="media" src="./assets/medias/03.png" alt="">
    …
    <p>
        <span>Showcase</span>
        <span>12</span>
    </p>
</section>
```

## Some CSS

We lock page overflow so the wheel never scrolls the document. The section fills the viewport:

```
html:has(.mwg_effect100), 
body:has(.mwg_effect100) {
    overflow: hidden;
}
.mwg_effect100 {
    height: 100vh;
}
```

Every tile is absolutely centred with a square footprint and a hint to optimise transforms. The caption sits in the middle of the stage:

```
.mwg_effect100 .media {
    position: absolute;
    top: calc(50% - 4vw);
    left: calc(50% - 4vw);
    width: 8vw;
    height: 8vw;
    object-fit: contain;
    will-change: transform;
}
.mwg_effect100 p {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: var(--grid-margin);
}
```

## Base angles

We bind the scene and space every tile evenly around a full circle. `baseAngles` gives each image a fixed offset so they never overlap:

```javascript
const root = document.querySelector('.mwg_effect100')
const medias = root.querySelectorAll('.media')

let w = window.innerWidth
let h = window.innerHeight
const count = medias.length
let incr = 0

const baseAngles = Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2)
```

## Tick & ellipse

On each frame we advance a shared increment, then sine and cosine map each tile’s angle to horizontal and vertical offsets. The divisors shape the orbit into an ellipse that fits the viewport:

```javascript
function tick(time) {
    medias.forEach((el, i) => {
        const angle = (time + incr) / 3 + baseAngles[i]
        gsap.set(el, {
            x: Math.sin(angle) * w / 2.4,
            y: Math.cos(angle) * h / 2.7,
        })
    })
}
```

## Random bias

We prepare a smoothed state for acceleration and scatter radius, and give each tile a random quotient so the burst fans out unevenly — like a real explosion:

```javascript
const state = { acceleration: 0, rayon: 0 }
const setAcceleration = gsap.quickTo(state, "acceleration", { duration: 0.3, ease: "power1" })
const setRayon = gsap.quickTo(state, "rayon", { duration: 0.6, ease: "power1" })

const quotients = []
medias.forEach(() => {
    quotients.push((Math.random() - 0.5) / 2)
})
```

## Wheel & touch scatter

We listen for wheel and touch movement, map the delta into a brief acceleration boost and a scatter radius. A short timeout clears the impulse when input stops so the tiles drift apart during the gesture and glide back into their regular orbit:

```javascript
let isWheeling

function handleWheel(e) {
    const delta = e.deltaY
    setAcceleration(delta / 800)
    setRayon(delta / 40)

    window.clearTimeout(isWheeling)
    isWheeling = setTimeout(() => {
        setAcceleration(0)
        setRayon(0)
    }, 120)
}
root.addEventListener('wheel', handleWheel)
```

Touch input feeds the same state through an `Observer`, with stronger divisors so the gesture feels proportional on a small screen:

```javascript
Observer.create({
    target: root,
    type: "touch",
    onChange: (e) => {
        const delta = e.deltaY
        setAcceleration(delta / 200)
        setRayon(delta / 10)

        window.clearTimeout(isWheeling)
        isWheeling = setTimeout(() => {
            setAcceleration(0)
            setRayon(0)
        }, 120)
    },
})
```

## Starting the ticker

A ScrollTrigger adds and removes the ticker so work only runs while the section is on screen:

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

Here, we can play with the amplitude of the deformation. We can increase its intensity by scrolling more slowly for an even stronger effect. It could also be interesting to adjust the maximum rotation angle of the items.
