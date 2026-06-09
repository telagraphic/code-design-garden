---
title: "Sine Wave Z Gallery"
description: "In this effect, we'll scroll through a gallery of images stacked one behind the other. The wheel advances the loop in depth while each tile shifts along a si…"
slug: "sine-wave-z-gallery"
previewVideo: "sine-wave-z-gallery.mp4"
order: 101
published: true
categories: ["loader", "filter", "scroll"]
triggers: ["scroll", "hover", "drag", "load"]
libraries: ["gsap"]
keywords: ["sine", "wave", "gallery", "3d", "depth", "scroll", "reveal", "letters"]
sourceUrl: "https://madewithgsap.com/effects/tutorial101"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```

### HTML
```text
<section class="mwg_effect101">
    <div class="container">
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
    </div>
    <div class="medias-loader">
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
        <img src="./assets/medias/13.png" alt="">
        <img src="./assets/medias/14.png" alt="">
        <img src="./assets/medias/15.png" alt="">
        <img src="./assets/medias/16.png" alt="">
        <img src="./assets/medias/17.png" alt="">
        <img src="./assets/medias/18.png" alt="">
        <img src="./assets/medias/19.png" alt="">
        <img src="./assets/medias/20.png" alt="">
    </div>
</section>
```

### CSS
```text
.mwg_effect101 {
    height: 100vh;
    perspective: 1100px;
    overflow: hidden;
}
.mwg_effect101 .container {
    width: 100%;
    height: 100%;
    transform: rotateX(-18deg);
    transform-style: preserve-3d;
}
.mwg_effect101 .media {
    position: absolute;
    top: calc(50% - 75px);
    left: calc(50% - 75px);
    transform-style: preserve-3d;
}
.mwg_effect101 .medias-loader img {
    width: 1px;
    height: 1px;
    top: 0;
    left: 0;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect101')

const mediasUrls = []
root.querySelectorAll('.medias-loader img').forEach(el => {
    mediasUrls.push(new URL(el.getAttribute('src'), document.baseURI).href)
})

const Z_SPACING = 52
const amplitude = { value: 0 }

const mediaItems = []
let scrollIncr = 0
let waveIncr = 0
let interactionTimeout

let isTouch = false
gsap.matchMedia().add("(hover: none)", () => { isTouch = true })

const medias = root.querySelectorAll('.media')
const count = medias.length
const halfDepth = count / 2
const totalSpan = count * Z_SPACING
const waveDivisor = (count * Z_SPACING) / (2 * Math.PI)
const baseY = -0.15 * window.innerHeight

medias.forEach((media, index) => {
    const raw = scrollIncr - index * Z_SPACING
    mediaItems.push({
        el: media,
        index,
        z: 0,
        intensity: 0.4,
        lastStep: Math.floor(raw / totalSpan)
    })
    media.setAttribute('src', mediasUrls[index % mediasUrls.length])
    gsap.set(media, { 
        scale: 1,
        y: baseY,
        rotationX: 18
    })
})

function urlIndexFromSrc(src) {
    const resolved = new URL(src, document.baseURI).href
    const i = mediasUrls.indexOf(resolved)
    return i >= 0 ? i : 0
}

function getFirstItem(exclude) {
    const pool = exclude ? mediaItems.filter(i => i !== exclude) : mediaItems
    return pool.length ? [...pool].sort((a, b) => b.z - a.z)[0] : exclude
}

function getLastItem(exclude) {
    const pool = exclude ? mediaItems.filter(i => i !== exclude) : mediaItems
    return pool.length ? [...pool].sort((a, b) => a.z - b.z)[0] : exclude
}

function assignNewSrc(wrappingItem, direction) {
    const len = mediasUrls.length
    if (direction > 0) {
        const last = getLastItem(wrappingItem)
        const refIndex = urlIndexFromSrc(last.el.src)
        wrappingItem.el.src = mediasUrls[(refIndex - 1 + len) % len]
    } else {
        const first = getFirstItem(wrappingItem)
        const refIndex = urlIndexFromSrc(first.el.src)
        wrappingItem.el.src = mediasUrls[(refIndex + 1) % len]
    }
}

function revealFront(item) {
    gsap.killTweensOf(item.el, 'scale')
    gsap.fromTo(item.el, {
        scale: 0.9
    }, {
        scale: 1,
        ease: 'elastic.out(2, 0.6)',
        duration: 0.5,
        overwrite: true
    })
}

function updateIntensities() {
    const sorted = [...mediaItems].sort((a, b) => b.z - a.z)
    sorted.forEach((item, rank) => {
        item.intensity = 0.08 * rank + 0.1
    })
}

function render() {
    mediaItems.forEach(item => {
        const raw = scrollIncr - item.index * Z_SPACING
        const pos = ((raw % totalSpan) + totalSpan) % totalSpan
        item.z = halfDepth * Z_SPACING - pos
        const step = Math.floor(raw / totalSpan)

        if (step !== item.lastStep) {
            const direction = step > item.lastStep ? 1 : -1
            const steps = Math.abs(step - item.lastStep)
            for (let i = 0; i < steps; i++) {
                assignNewSrc(item, direction)
            }
            item.justWrapped = true
        }
        item.lastStep = step
    })

    const front = [...mediaItems].sort((a, b) => b.z - a.z)[0]
    if (front.justWrapped) {
        revealFront(front)
    }

    mediaItems.forEach(item => {
        item.justWrapped = false
    })

    updateIntensities()
}
render()

function draw() {
    mediaItems.forEach(item => {
        const raw = scrollIncr - item.index * Z_SPACING

        gsap.set(item.el, {
            x: Math.sin(-raw / waveDivisor + waveIncr) * 200 * item.intensity * (amplitude.value / 100),
            z: item.z
        })
    })
}
draw()

const amplitudeTo = gsap.quickTo(amplitude, 'value', {
    duration: 2,
    ease: 'power4',
    onUpdate: () => {
        waveIncr += amplitude.value / 600
        draw()
    }
})

function applyScroll(deltaY) {
    scrollIncr -= deltaY / 20
    render()
    amplitudeTo(deltaY)

    window.clearTimeout(interactionTimeout)
    interactionTimeout = setTimeout(() => {
        amplitudeTo(0)
    }, 66)
}

Observer.create({
    target: root,
    type: 'wheel,touch,pointer',
    onWheel: (e) => {
        applyScroll(e.deltaY)
    },
    onDrag: (e) => {
        isTouch ? applyScroll(e.deltaY * 6) : applyScroll(e.deltaY * 2)
    }
})
```

## Sine Wave Z Gallery #101

In this effect, we'll scroll through a gallery of images stacked one behind the other. The wheel advances the loop in depth while each tile shifts along a sine curve. The stronger the scroll, the wider the wave spreads. Shall we see how it works? Let's go!

## HTML Structure

Our DOM is split in two parts. The `container` holds the visible tiles: their sources stay empty for now, since we'll assign them in JavaScript:

```html
<section class="mwg_effect101">
    <div class="container">
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        <img class="media" src="" alt=""/>
        …
    </div>
```

The `medias-loader` division lists every asset URL we need upfront. We'll read from it, but these images never appear on stage:

```html
<div class="medias-loader">
        <img src="./assets/medias/01.png" alt="">
        <img src="./assets/medias/02.png" alt="">
        <img src="./assets/medias/03.png" alt="">
        …
    </div>
</section>
```

## Some CSS

The section fills the viewport and gets a perspective value so depth reads clearly:

```
.mwg_effect101 {
    height: 100vh;
    perspective: 1100px;
    overflow: hidden;
}
```

Next we tilt the whole stack in 3D. The container keeps `transform-style: preserve-3d` so every child can move along the z-axis:

```
.mwg_effect101 .container {
    width: 100%;
    height: 100%;
    transform: rotateX(-18deg);
    transform-style: preserve-3d;
}
```

Each tile is centred so every transform shares the same origin:

```
.mwg_effect101 .media {
    position: absolute;
    top: calc(50% - 75px);
    left: calc(50% - 75px);
    transform-style: preserve-3d;
}
```

Finally, we hide the loader images so they preload without appearing on stage:

```
.mwg_effect101 .medias-loader img {
    width: 1px;
    height: 1px;
    top: 0;
    left: 0;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
}
```

A quick explanation: we could load these images directly in JavaScript to keep the DOM clean. So why not do that? Because this technique lets the browser fetch every asset upfront, even when hidden. That way, there is no delay when a tile swaps its source during the loop.

## Image URLs & setup

Next we start with JavaScript. We bind the scene and collect every URL from the loader into an array:

```javascript
const root = document.querySelector('.mwg_effect101')

const mediasUrls = []
root.querySelectorAll('.medias-loader img').forEach(el => {
    mediasUrls.push(new URL(el.getAttribute('src'), document.baseURI).href)
})
```

We declare the spacing between tiles, a shared amplitude object, and the counters that will drive depth and the sine wave:

```javascript
const Z_SPACING = 52
const amplitude = { value: 0 }

const mediaItems = []
let scrollIncr = 0
let waveIncr = 0
```

From the tile count we derive the depth range and the divisor that will shape one full sine cycle across the stack:

```javascript
const medias = root.querySelectorAll('.media')
const count = medias.length
const halfDepth = count / 2
const totalSpan = count * Z_SPACING
const waveDivisor = (count * Z_SPACING) / (2 * Math.PI)
const baseY = -0.15 * window.innerHeight
```

We build one object per visible tile. Each entry stores its element, its index in the stack, and a step counter we'll need for the infinite loop:

```javascript
medias.forEach((media, index) => {
    const raw = scrollIncr - index * Z_SPACING
    mediaItems.push({
        el: media,
        index,
        z: 0,
        intensity: 0.4,
        lastStep: Math.floor(raw / totalSpan)
    })
```

We assign an initial source with the modulo operator, then nudge each tile slightly upward so the stack feels centred in depth:

```javascript
media.setAttribute('src', mediasUrls[index % mediasUrls.length])
    gsap.set(media, { 
        scale: 1,
        y: baseY,
        rotationX: 18
    })
})
```

Paths in the loader are often relative, but `img.src` returns an absolute URL. We resolve both sides so we can find the right index when swapping images:

```javascript
function urlIndexFromSrc(src) {
    const resolved = new URL(src, document.baseURI).href
    const i = mediasUrls.indexOf(resolved)
    return i >= 0 ? i : 0
}
```

## Depth & wrapping

On each update we convert the shared scroll value into a depth position for every tile. The modulo keeps positions inside one full cycle:

```javascript
const raw = scrollIncr - item.index * Z_SPACING
const pos = ((raw % totalSpan) + totalSpan) % totalSpan
item.z = halfDepth * Z_SPACING - pos
```

We compare steps to detect when a tile has looped past the front or the back. When that happens, we swap its source and flag it for a reveal animation:

```javascript
const step = Math.floor(raw / totalSpan)

if (step !== item.lastStep) {
    const direction = step > item.lastStep ? 1 : -1
    const steps = Math.abs(step - item.lastStep)
    for (let i = 0; i < steps; i++) {
        assignNewSrc(item, direction)
    }
    item.justWrapped = true
}
item.lastStep = step
```

When a tile wraps, we pick a fresh source from the pool by looking at whichever neighbour sits at the opposite end of the stack. That keeps the sequence feeling varied without repeating the same image twice in a row:

```javascript
function assignNewSrc(wrappingItem, direction) {
    const len = mediasUrls.length
    if (direction > 0) {
        const last = getLastItem(wrappingItem)
        const refIndex = urlIndexFromSrc(last.el.src)
        wrappingItem.el.src = mediasUrls[(refIndex - 1 + len) % len]
    } else {
        const first = getFirstItem(wrappingItem)
        const refIndex = urlIndexFromSrc(first.el.src)
        wrappingItem.el.src = mediasUrls[(refIndex + 1) % len]
    }
}
```

We also rank tiles by depth and give each one an intensity value. Tiles sitting farther back get a lower weight so the sine spread stays subtle in the distance.

Here adding `0.1` ensures that even the closest tile oscillates slightly. Without this addition, the first tile would remain fixed while the others would oscillate with increasing amplitude.

```javascript
function updateIntensities() {
    const sorted = [...mediaItems].sort((a, b) => b.z - a.z)
    sorted.forEach((item, rank) => {
        item.intensity = 0.08 * rank + 0.1
    })
}
```

When the front tile just wrapped, we give it a quick elastic scale so the swap feels alive:

```javascript
function revealFront(item) {
    gsap.killTweensOf(item.el, 'scale')
    gsap.fromTo(item.el, {
        scale: 0.9
    }, {
        scale: 1,
        ease: 'elastic.out(2, 0.6)',
        duration: 0.5,
        overwrite: true
    })
}
```

At the end of `render()`, we check whether the front tile just wrapped, reset the flags, then refresh every intensity:

```javascript
const front = [...mediaItems].sort((a, b) => b.z - a.z)[0]
if (front.justWrapped) {
    revealFront(front)
}

mediaItems.forEach(item => {
    item.justWrapped = false
})

updateIntensities()
```

## Sine spread

Next we start to draw each tile. Depth comes from the value computed in `render()`. For the horizontal offset, we use the native `Math.sin()` function: it returns values between -1 and 1, which we multiply to open the wave:

```javascript
const raw = scrollIncr - item.index * Z_SPACING

x: Math.sin(-raw / waveDivisor + waveIncr) * 200 * item.intensity * (amplitude.value / 100)
```

The divisor ties one full sine cycle to the total depth of the gallery. We apply the result with `gsap.set()` alongside the z value from `render()`:

```javascript
function draw() {
    mediaItems.forEach(item => {
        const raw = scrollIncr - item.index * Z_SPACING

        gsap.set(item.el, {
            x: Math.sin(-raw / waveDivisor + waveIncr) * 200 * item.intensity * (amplitude.value / 100),
            z: item.z
        })
    })
}
```

Multiplying by `item.intensity` keeps far tiles closer to the centre line. The amplitude ratio controls how wide the wave opens while the user scrolls: when it returns to zero, the stack settles back into place.

## Scroll & amplitude

Here comes the fun! We smooth scroll input into an amplitude value with `gsap.quickTo()`. On each update we nudge the wave phase and redraw the stack:

```javascript
const amplitudeTo = gsap.quickTo(amplitude, 'value', {
    duration: 2,
    ease: 'power4',
    onUpdate: () => {
        waveIncr += amplitude.value / 600
        draw()
    }
})
```

Our `applyScroll()` handler advances depth, feeds the amplitude, then eases it back to zero when input stops:

```javascript
function applyScroll(deltaY) {
    scrollIncr -= deltaY / 20
    render()
    amplitudeTo(deltaY)

    window.clearTimeout(interactionTimeout)
    interactionTimeout = setTimeout(() => {
        amplitudeTo(0)
    }, 66)
}
```

We detect touch devices with `matchMedia` so drag can use a stronger multiplier on mobile. Then we wire GSAP `Observer` to listen for wheel and drag on the section:

```javascript
let isTouch = false
gsap.matchMedia().add("(hover: none)", () => { isTouch = true })

Observer.create({
    target: root,
    type: 'wheel,touch,pointer',
    onWheel: (e) => {
        applyScroll(e.deltaY)
    },
    onDrag: (e) => {
        isTouch ? applyScroll(e.deltaY * 6) : applyScroll(e.deltaY * 2)
    }
})
```

## Go further

Here we can play with the spacing between the tiles or the sine multiplier to make the wave feel tighter or more dramatic. Tweaking the elastic ease on the front tile would also change how sharp each swap feels when the loop resets.

Keep in mind that this effect works no matter how many images you use, there can be fewer than the available slots or more!
