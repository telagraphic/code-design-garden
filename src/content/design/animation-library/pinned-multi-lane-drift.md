---
title: "Pinned multi-lane drift"
description: "In this effect, we pin the viewport while a crowd of images drifts left to right as we scroll. They ride four depth bands with different easing speeds, and e…"
slug: "pinned-multi-lane-drift"
previewVideo: "pinned-multi-lane-drift.mp4"
order: 83
published: true
categories: ["scroll"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["pinned", "multi", "lane", "drift", "3d", "depth", "scroll", "random"]
sourceUrl: "https://madewithgsap.com/effects/tutorial083"
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
<section class="mwg_effect083">
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
            <img class="media" src="./assets/medias/15.png" alt="">
            <img class="media" src="./assets/medias/16.png" alt="">
            <img class="media" src="./assets/medias/17.png" alt="">
            <img class="media" src="./assets/medias/18.png" alt="">
            <img class="media" src="./assets/medias/19.png" alt="">
            <img class="media" src="./assets/medias/20.png" alt="">
            <img class="media" src="./assets/medias/21.png" alt="">
            <img class="media" src="./assets/medias/22.png" alt="">
            <img class="media" src="./assets/medias/23.png" alt="">
            <img class="media" src="./assets/medias/24.png" alt="">
            <img class="media" src="./assets/medias/25.png" alt="">
            <img class="media" src="./assets/medias/26.png" alt="">
            <img class="media" src="./assets/medias/27.png" alt="">
            <img class="media" src="./assets/medias/28.png" alt="">
            <img class="media" src="./assets/medias/29.png" alt="">
            <img class="media" src="./assets/medias/30.png" alt="">
            <img class="media" src="./assets/medias/31.png" alt="">
            <img class="media" src="./assets/medias/32.png" alt="">
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect083 .scroll {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.mwg_effect083 .pin-height {
    height: 400vh;
}
.mwg_effect083 .container {
    height: 100vh;
}
.mwg_effect083 .media {
    position: absolute;
    top: 0;
    left: 0;
    width: 20vw;
    aspect-ratio: 1;
    display: block;
    object-fit: contain;
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect083')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const medias = root.querySelectorAll('.media')

const easings = ['ease-1', 'ease-2', 'ease-3', 'ease-4']

medias.forEach((media, index) => {
    const easingClass = easings[index % easings.length]
    media.classList.add(easingClass)
    const zIndex = parseInt(easingClass.split('-')[1])

    const randomY = Math.random()
    gsap.set(media, {
        y: randomY * window.innerHeight,
        yPercent: -randomY * 100,
        zIndex: zIndex
    })
})

gsap.fromTo(root.querySelectorAll('.ease-1'), {
    x: window.innerWidth,
    xPercent: 10
}, {
    x: 0,
    xPercent: -110,
    stagger: 0.04,
    ease: 'power1.inOut',
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        scrub: true
    }
})
gsap.fromTo(root.querySelectorAll('.ease-2'), {
    x: window.innerWidth,
    xPercent: 10
}, {
    x: 0,
    xPercent: -110,
    stagger: 0.04,
    ease: 'power2.inOut',
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
})
gsap.fromTo(root.querySelectorAll('.ease-3'), {
    x: window.innerWidth,
    xPercent: 10
}, {
    x: 0,
    xPercent: -110,
    stagger: 0.04,
    ease: 'power3.inOut',
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
})
gsap.fromTo(root.querySelectorAll('.ease-4'), {
    x: window.innerWidth,
    xPercent: 10
}, {
    x: 0,
    xPercent: -110,
    stagger: 0.04,
    ease: 'power4.inOut',
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
})
```

## Pinned multi-lane drift #083

In this effect, we pin the viewport while a crowd of images drifts left to right as we scroll. They ride four depth bands with different easing speeds, and each tile lands at a random vertical position so the parade feels loose instead of perfectly aligned. Let's begin!

## HTML Structure

The section holds a tall wrapper for scrub length and a single container where every `.media` image stacks in DOM order — the script will sort them into parallel lanes later:

```html
<section class="mwg_effect083">
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

The tall wrapper stretches how far we scroll. The container stays one viewport high while the stage is pinned:

```
.mwg_effect083 .pin-height {
    height: 400vh;
}
.mwg_effect083 .container {
    height: 100vh;
}
```

Every tile anchors to the same corner so they share one stack. A square aspect ratio keeps their footprint predictable while JavaScript pushes them along the horizontal axis:

```
.mwg_effect083 .media {
    position: absolute;
    top: 0;
    left: 0;
    aspect-ratio: 1;
    display: block;
}
```

## Depth bands & easing classes

We bind the scene elements and define four easing class names — every fourth image will share the same lane:

```javascript
const root = document.querySelector('.mwg_effect083')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const medias = root.querySelectorAll('.media')

const easings = ['ease-1', 'ease-2', 'ease-3', 'ease-4']
```

We walk the node list, assign a class per band, read its trailing number for `zIndex`, then park each tile at a random height. The matching `yPercent` offset keeps the scatter bounded inside the viewport:

```javascript
medias.forEach((media, index) => {
    const easingClass = easings[index % easings.length]
    media.classList.add(easingClass)
    const zIndex = parseInt(easingClass.split('-')[1])

    const randomY = Math.random()
    gsap.set(media, {
        y: randomY * window.innerHeight,
        yPercent: -randomY * 100,
        zIndex: zIndex
    })
})
```

## Horizontal passes

We fire four parallel scrubbed moves — one per easing class. Each lane starts off the right edge and travels far enough left to read like a continuous ticker. A light `stagger` inside every group keeps the tiles from marching in perfect lockstep:

```javascript
gsap.fromTo(root.querySelectorAll('.ease-1'), {
    x: window.innerWidth,
    xPercent: 10
}, {
    x: 0,
    xPercent: -110,
    stagger: 0.04,
    ease: 'power1.inOut',
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        scrub: true
    }
})
```

The first lane owns the pin — the other three reuse the same scroll window and horizontal values, but swap in `power2`, `power3`, and `power4` eases so each depth band drifts at a slightly different speed:

```javascript
gsap.fromTo(root.querySelectorAll('.ease-2'), {
    x: window.innerWidth,
    xPercent: 10
}, {
    x: 0,
    xPercent: -110,
    stagger: 0.04,
    ease: 'power2.inOut',
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
})
// ease-3 and ease-4 follow the same pattern
```

Because every lane scrubs against the same tall wrapper, the whole parade stays locked to scroll progress — close bands feel faster, far bands lag behind, and the random vertical scatter keeps the stack from feeling too rigid.

## Go further

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
