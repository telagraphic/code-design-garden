---
title: "Bouncy Card Grid"
description: "As the mouse moves, a group of cards reacts across multiple dimensions, emphasizing the one closest to the cursor while the rest drift away. This creates a f…"
slug: "bouncy-card-grid"
previewVideo: "bouncy-card-grid.mp4"
order: 95
published: true
categories: ["cursor", "layout"]
triggers: ["hover", "load", "mouse-move"]
libraries: ["gsap"]
keywords: ["bouncy", "card", "grid", "3d", "depth", "random", "hover", "image"]
sourceUrl: "https://madewithgsap.com/effects/tutorial095"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```

### HTML
```text
<section class="mwg_effect095">
    <div class="container">
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
    </div>
</section>
```

### Javascript
```text
html:has(.mwg_effect095), 
body:has(.mwg_effect095) {
    overflow: hidden;
}
.mwg_effect095 {
    height: 100dvh;
    overflow: hidden;
    display: grid;
    place-items: center;
}
.mwg_effect095 .container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
.mwg_effect095 .media {
    width: 12vw;
    aspect-ratio: 1;
    transform: scale(1.1, 1.1);
    display: flex;
    justify-content: center;
    align-items: center;
}
.mwg_effect095 .media img {
    display: block;
    border-radius: 0.5vw;
}
.mwg_effect095 .media img.landscape {
    height: auto;
    width: 100%;
}
.mwg_effect095 .media img.portrait {
    width: auto;
    height: 100%;
}
```

## Bouncy Card Grid #095

As the mouse moves, a group of cards reacts across multiple dimensions, emphasizing the one closest to the cursor while the rest drift away. This creates a fun, bouncy sense of depth. Let’s see how it’s done!

## HTML Structure

We wrap one grid container and a tile for every image. Each tile nests its bitmap inside a cell so the outer shell can move while the picture keeps a sensible fit whether the file is tall or wide:

```html
<section class="mwg_effect095">
    <div class="container">
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
</section>
```

## Some CSS

We lay the photographs out as a CSS grid so every tile keeps a fixed slot in two dimensions:

```
.mwg_effect095 .container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
```

Each cell flex-centres its image and starts slightly scaled so there is room to move when the repulsion kicks in:

```
.mwg_effect095 .media {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(1.1, 1.1);
}
```

Once the file loads we pick a portrait or landscape class so the bitmap always fills the cell cleanly:

```
.mwg_effect095 .media img.landscape {
    height: auto;
    width: 100%;
}
.mwg_effect095 .media img.portrait {
    width: auto;
    height: 100%;
}
```

## Scattering the grid

We bind the scene, read how many columns the grid exposes, and give every tile a random offset so the wall feels loose before any hover happens:

```javascript
const root = document.querySelector('.mwg_effect095')
const container = root.querySelector('.container')
const medias = document.querySelectorAll('.mwg_effect095 .media')
const cols = getComputedStyle(container).gridTemplateColumns.split(' ').length

medias.forEach(media => {
    gsap.set(media, {
        xPercent: (Math.random() - 0.5) * 20,
        yPercent: (Math.random() - 0.5) * 20,
        rotation: (Math.random() - 0.5) * 30,
    })
    // image orientation runs next
})
```

## Image orientation

We register whether each file is taller or wider than it is deep and apply the matching class as soon as the image is ready:

```javascript
const img = media.querySelector('img')
const setOrientation = () => {
    const orientation = img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape'
    img.classList.add(orientation)
}
if (img.complete && img.naturalWidth) {
    setOrientation()
} else {
    img.addEventListener('load', setOrientation, { once: true })
}
```

## Finding the closest tile

On `mousemove` we measure the distance to every cell centre and promote whichever tile is nearest. When the winner changes we reset the previous active cell before calling the spread routine on the new one:

```javascript
let currentIndex = -1

container.addEventListener("mousemove", handleMouseMove)
function handleMouseMove(e) {
    let closestIndex = -1
    let closestDist = Infinity

    for (let i = 0; i < medias.length; i++) {
        const rect = medias[i].getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = dx * dx + dy * dy
        if (dist < closestDist) {
            closestDist = dist
            closestIndex = i
        }
    }

    if (closestIndex !== currentIndex && closestIndex !== -1) {
        if (currentIndex !== -1) { resetMedia(currentIndex) }
        currentIndex = closestIndex
        newMedia(currentIndex)
    }
}
```

## Leaving the grid

When the pointer leaves the container we reset the active tile and send every cell back to a fresh random pose with the same elastic ease:

```javascript
container.addEventListener("mouseleave", handleMouseLeave)
function handleMouseLeave() {
    if (currentIndex !== -1) { resetMedia(currentIndex) }
    currentIndex = -1
    medias.forEach(media => {
        gsap.to(media, {
            xPercent: (Math.random() - 0.5) * 20,
            yPercent: (Math.random() - 0.5) * 20,
            rotation: (Math.random() - 0.5) * 30,
            scale: 1.1,
            ease: 'elastic.out(1, 0.75)',
            duration: 0.8
        })
    })
}
```

## Highlighting the active tile

We convert the active index into row and column coordinates on the grid. The hovered cell grows and snaps upright while everything else will be pushed in the next step:

```javascript
function resetMedia(index) {
    gsap.to(medias[index], {
        xPercent: (Math.random() - 0.5) * 20,
        yPercent: (Math.random() - 0.5) * 20,
        rotation: (Math.random() - 0.5) * 30,
        scale: 1.1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)',
    })
}

function newMedia(activeIdx) {
    const aCol = activeIdx % cols
    const aRow = Math.floor(activeIdx / cols)

    gsap.to(medias[activeIdx], {
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        scale: 1.6,
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)',
    })
    // neighbour repulsion runs next
}
```

## Pushing the neighbours

For every other cell we measure its offset from the active tile on the board. The closer a neighbour sits in the grid, the harder it gets shoved along both axes:

```javascript
medias.forEach((media, index) => {
    if (index === activeIdx) return

    const col = index % cols
    const row = Math.floor(index / cols)
    const dx = col - aCol
    const dy = row - aRow
    const distSq = dx * dx + dy * dy
    const force = 80

    gsap.to(media, {
        xPercent: (force * dx) / distSq,
        yPercent: (force * dy) / distSq,
        ease: 'elastic.out(1, 0.75)',
        duration: 0.8
    })
})
```

## Go further

Here, we can adjust the animation ease to achieve a more solid and serious feel. We can also remove the random rotation of the items to maintain a sense of consistency in the grid as it deforms.
