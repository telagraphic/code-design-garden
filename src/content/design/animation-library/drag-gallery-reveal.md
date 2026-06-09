---
title: "Drag gallery reveal"
description: "In this effect, we drag a horizontal gallery of images. When an item enters the viewport it scales up and slides into place; when it leaves, it hides again. …"
slug: "drag-gallery-reveal"
previewVideo: "drag-gallery-reveal.mp4"
order: 88
published: true
categories: ["cursor", "scroll", "image-carousel"]
triggers: ["scroll", "hover", "drag", "mouse-move"]
libraries: ["gsap"]
keywords: ["drag", "gallery", "reveal", "3d", "depth", "scroll", "hover", "image"]
sourceUrl: "https://madewithgsap.com/effects/tutorial088"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```

### HTML
```text
<section class="mwg_effect088">
    <div class="container">
        <div class="media-parent">
            <img class="media" src="./assets/medias/01.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/02.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/03.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/04.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/05.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/06.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/07.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/08.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/09.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/10.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/11.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/12.png" alt="">
        </div>
    </div>
</section>
```

### Javascript
```text
html:has(.mwg_effect088), 
body:has(.mwg_effect088) {
    overflow: hidden;
}
.mwg_effect088 {
    height: 100dvh;
    display: grid;
    align-items: center;
    overflow: hidden;
}
.mwg_effect088 .container {
    display: flex;
    gap: 2vw;
    padding: 0 var(--grid-margin);
    width: max-content;
    white-space: nowrap;
    cursor: grab;
}
.mwg_effect088 .media-parent {
    width: 22vw;
    transform-style: preserve-3d;
}
.mwg_effect088 .media {
    width: 100%;
    aspect-ratio: 1;
    display: block;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
    transform-style: preserve-3d;
}

@media (max-width: 768px) {
    .mwg_effect088 .container {
        gap: 15px;
    }
    .mwg_effect088 .media-parent {
        width: 35vw;
    }
}
```

## Drag gallery reveal #088

In this effect, we drag a horizontal gallery of images. When an item enters the viewport it scales up and slides into place; when it leaves, it hides again. The strip eases smoothly behind the pointer. Let's build it!

## HTML Structure

We keep one horizontal track inside the section. Each tile is a `.media-parent` wrapper around a single image — that way we can hide the bitmap offscreen while keeping a predictable width for hit testing later:

```html
<section class="mwg_effect088">
    <div class="container">
        <div class="media-parent">
            <img class="media" src="./assets/medias/01.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/02.png" alt="">
        </div>
        <div class="media-parent">
            <img class="media" src="./assets/medias/03.png" alt="">
        </div>
    </div>
</section>
```

## Some CSS

We lock page scroll while the gallery is active and centre the section in a full-height grid:

```
html:has(.mwg_effect088), 
body:has(.mwg_effect088) {
    overflow: hidden;
}
.mwg_effect088 {
    height: 100dvh;
    display: grid;
    align-items: center;
    overflow: hidden;
}
```

The track is a flex row sized to its children, with a grab cursor so the affordance reads instantly:

```
.mwg_effect088 .container {
    display: flex;
    gap: 2vw;
    padding: 0 var(--grid-margin);
    width: max-content;
    white-space: nowrap;
    cursor: grab;
}
```

Each wrapper fixes the tile width in viewport units. The image fills that box, blocks selection, and opts out of native dragging so our horizontal pull stays clean:

```
.mwg_effect088 .media-parent {
    width: 22vw;
    transform-style: preserve-3d;
}
.mwg_effect088 .media {
    width: 100%;
    aspect-ratio: 1;
    display: block;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
    transform-style: preserve-3d;
}
```

## Measuring every item

We bind the gallery and build a data object for every wrapper — its image, static offset, and width. We also keep a `Set` to remember which parents are already visible:

```javascript
const root = document.querySelector('.mwg_effect088')
const container = root.querySelector('.container')
const viewportWidth = document.body.clientWidth
const inViewport = new Set()
let total = 0
let oldX = 0

const mediasData = Array.from(root.querySelectorAll('.media-parent')).map(parent => ({
    parent,
    media: parent.querySelector('.media'),
    offsetLeft: parent.offsetLeft,
    width: parent.offsetWidth
}))
```

Anything that starts outside the viewport gets its image hidden right away so the row does not flash before the first drag:

```javascript
mediasData.forEach(({ parent, media, offsetLeft, width }) => {
    if (offsetLeft < viewportWidth && offsetLeft + width > 0) {
        inViewport.add(parent)
    } else {
        gsap.set(media, { autoAlpha: 0})
    }
})
```

## Smoothing the drag

We use `gsap.quickTo()` to ease the container horizontally on every update. Its `onUpdate` callback re-runs our viewport check while the strip is still moving:

```javascript
const xTo = gsap.quickTo(container, "x", {
    duration: 0.5, 
    ease: 'power4',
    onUpdate: () => {
        checkViewport()
    }
})
```

## Waking tiles in the viewport

On each update we compare the container's new `x` with the previous frame to learn drag direction, then reproject every wrapper against the viewport edges:

```javascript
function checkViewport() {
    const currentX = gsap.getProperty(container, "x")
    const delta = currentX - oldX
    if (delta === 0) return
    oldX = currentX

    mediasData.forEach(({ parent, media, offsetLeft, width }) => {
        const left = offsetLeft + currentX
        const isInView = left < viewportWidth && left + width > 0
        // ...
    })
}
```

When a wrapper newly enters the window, we play a short grow-and-slide intro keyed off drag direction. When it leaves, we remove it from the set and hide the image again:

```javascript
if (isInView && !inViewport.has(parent)) {
    inViewport.add(parent)

    const direction = Math.sign(delta)
    const xFrom = direction * (-100 / (1 + delta / 500))

    gsap.fromTo(media, {
        x: xFrom * 4,
        scale: 0.6,
        autoAlpha: 1
    }, {
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
    })
} else if (!isInView && inViewport.has(parent)) {
    inViewport.delete(parent)
    gsap.set(media, { autoAlpha: 0 })
}
```

## Dragging the gallery

We detect touch devices with `matchMedia` so we can apply a slightly stronger multiplier on mobile. Then we wire GSAP Observer to accumulate pointer movement, clamp the total offset, and feed it to `xTo`:

```javascript
let isTouch = false
gsap.matchMedia().add("(hover: none)", () => {isTouch = true})

const gsapObs = Observer.create({
    target: container,
    type: "touch,pointer",
    onDrag: (self) => {
        total += isTouch ? (self.deltaX * 1.5) : (self.deltaX * 1.4)
        total = gsap.utils.clamp(document.body.clientWidth - container.clientWidth, 0, total)
        xTo(total)
    }
})
```

## Go further

In addition to having an image grow as it enters the viewport, we could have initialized it with a slight rotation. We could also play with the reveal ease for a bouncier feel.
