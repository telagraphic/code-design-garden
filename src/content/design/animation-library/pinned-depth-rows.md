---
title: "Pinned depth rows"
description: "In this effect, we pin the stage while rows of images take turns approaching from depth. Each band settles in the centre of the frame, then exits past the ca…"
slug: "pinned-depth-rows"
previewVideo: "pinned-depth-rows.mp4"
order: 84
published: true
categories: ["scroll", "layout"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["pinned", "depth", "rows", "3d", "scroll", "letters", "stagger", "timeline"]
sourceUrl: "https://madewithgsap.com/effects/tutorial084"
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
<section class="mwg_effect084">
    <p class="scroll">Scroll</p>
    <div class="pin-height">
        <div class="container">
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
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect084 .scroll {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.mwg_effect084 .pin-height {
    height: 500vh;
}
.mwg_effect084 .container {
    height: 100vh;
    perspective: 120vw;
}
.mwg_effect084 .group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3vw;
    width: 100%;
    position: absolute;
    top: 0;
    transform-style: preserve-3d;
}
.mwg_effect084 .media {
    width: 16vw;
    height: auto;
    display: block;
    transform-style: preserve-3d;
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect084')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const medias = root.querySelectorAll('.media')

const divs = []
const perRow = 5
for (let i = 0; i < medias.length; i++) {
    if (i % perRow === 0) divs.push([])
    divs[divs.length - 1].push(medias[i])
}

divs.forEach((group) => {
    const wrap = document.createElement('div')
    wrap.className = 'group'
    group.forEach((el) => wrap.appendChild(el))
    container.appendChild(wrap)
})

const groups = root.querySelectorAll('.group')

const master = gsap.timeline({
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        scrub: true
    }
})

groups.forEach((group, i) => {
    const tl = gsap.timeline()
    const groupMedias = group.querySelectorAll('.media')

    tl.fromTo(group, {
        zIndex: groups.length - i,
        z: -0.8 * window.innerWidth,
        yPercent: -100
    }, {
        z: 0,
        yPercent: -50,
        y: '50vh',
        duration: 0.5,
        ease: 'power3.inOut'
    })
    tl.from(groupMedias, {
        yPercent: -200,
        stagger: {
            each: 0.03,
            from: 'center'
        },
        duration: 0.35,
        ease: 'power3.inOut'
    }, '<')

    tl.to(group, {
        z: 0.8 * window.innerWidth,
        yPercent: 0,
        y: '100vh',
        duration: 0.5,
        ease: 'power3.inOut'
    })
    tl.to(groupMedias, {
        yPercent: 200,
        stagger: {
            each: 0.03,
            from: 'center'
        },
        duration: 0.35,
        ease: 'power3.inOut'
    }, '<')

    master.add(tl, i * (1 / groups.length))
})
```

## Pinned depth rows #084

In this effect, we pin the stage while rows of images take turns approaching from depth. Each band settles in the centre of the frame, then exits past the camera — and the tiles inside every row fan in with a light stagger from the centre outward. Let's begin!

## HTML Structure

The section holds a tall wrapper for scrub length and a flat list of `.media` siblings — the script will rebucket them into row wrappers later:

```html
<section class="mwg_effect084">
    <div class="pin-height">
        <div class="container">
            <img class="media" src="./assets/medias/01.png" alt="">
            <img class="media" src="./assets/medias/02.png" alt="">
            <img class="media" src="./assets/medias/03.png" alt="">
        </div>
    </div>
</section>
```

## Some CSS

The tall wrapper stretches how far we scroll. The container stays one viewport high with a wide perspective so depth reads as real space:

```
.mwg_effect084 .pin-height {
    height: 500vh;
}
.mwg_effect084 .container {
    height: 100vh;
    perspective: 120vw;
}
```

Each generated row is a centred flex band, absolutely parked at the top edge with preserved 3D transforms so children can stack in depth:

```
.mwg_effect084 .group {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 0;
    transform-style: preserve-3d;
}
```

The tiles inherit the same transform style so the row can carry them through the same depth field:

```
.mwg_effect084 .media {
    display: block;
    transform-style: preserve-3d;
}
```

## Chunking into row wrappers

We bind the scene elements, then slice the flat list into fixed-size chunks — each chunk will become one horizontal band:

```javascript
const root = document.querySelector('.mwg_effect084')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const medias = root.querySelectorAll('.media')

const divs = []
const perRow = 5
for (let i = 0; i < medias.length; i++) {
    if (i % perRow === 0) divs.push([])
    divs[divs.length - 1].push(medias[i])
}
```

For every chunk, we build a `.group` wrapper, move the matching nodes inside it, and append it back into the column:

```javascript
divs.forEach((group) => {
    const wrap = document.createElement('div')
    wrap.className = 'group'
    group.forEach((el) => wrap.appendChild(el))
    container.appendChild(wrap)
})

const groups = root.querySelectorAll('.group')
```

## Approach, settle, then exit

We open one master timeline that pins the container for the full scroll journey:

```javascript
const master = gsap.timeline({
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        scrub: true
    }
})
```

For each row, we pull the whole band out of deep space toward the middle of the screen:

```javascript
groups.forEach((group, i) => {
    const tl = gsap.timeline()
    const groupMedias = group.querySelectorAll('.media')

    tl.fromTo(group, {
        zIndex: groups.length - i,
        z: -0.8 * window.innerWidth,
        yPercent: -100
    }, {
        z: 0,
        yPercent: -50,
        y: '50vh',
        duration: 0.5,
        ease: 'power3.inOut'
    })
```

At the same time, the tiles inside the row fan in from above with a light centre-out stagger so the band does not read as a stiff slab:

```javascript
tl.from(groupMedias, {
    yPercent: -200,
    stagger: {
        each: 0.03,
        from: 'center'
    },
    duration: 0.35,
    ease: 'power3.inOut'
}, '<')
```

We mirror the idea on the way out — the row pushes forward in depth while the tiles peel away downward with the same stagger:

```javascript
tl.to(group, {
    z: 0.8 * window.innerWidth,
    yPercent: 0,
    y: '100vh',
    duration: 0.5,
    ease: 'power3.inOut'
})
tl.to(groupMedias, {
    yPercent: 200,
    stagger: {
        each: 0.03,
        from: 'center'
    },
    duration: 0.35,
    ease: 'power3.inOut'
}, '<')
```

We drop each child onto the master with an even spread so the rows take turns instead of colliding on the same beat:

```javascript
master.add(tl, i * (1 / groups.length))
})
```

## Go further

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
