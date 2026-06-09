---
title: "Orbital Image Scroll"
description: "In this effect, images move through the viewport on scroll while a centered headline remains fixed. Each card follows a curved path above or below the center…"
slug: "orbital-image-scroll"
previewVideo: "orbital-image-scroll.mp4"
order: 94
published: true
categories: ["scroll", "text"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["orbital", "image", "scroll", "3d", "depth", "pinned", "random", "letters"]
sourceUrl: "https://madewithgsap.com/effects/tutorial094"
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
<section class="mwg_effect094">
    <div class="container">
        <p>Images drifting <span>around the center</span></p>
        <div class="cards">
            <img class="card" src="./assets/medias/01.png" alt="">
            <img class="card" src="./assets/medias/02.png" alt="">
            <img class="card" src="./assets/medias/03.png" alt="">
            <img class="card" src="./assets/medias/04.png" alt="">
            <img class="card" src="./assets/medias/05.png" alt="">
            <img class="card" src="./assets/medias/06.png" alt="">
            <img class="card" src="./assets/medias/07.png" alt="">
            <img class="card" src="./assets/medias/08.png" alt="">
            <img class="card" src="./assets/medias/09.png" alt="">
            <img class="card" src="./assets/medias/10.png" alt="">
            <img class="card" src="./assets/medias/11.png" alt="">
            <img class="card" src="./assets/medias/12.png" alt="">
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect094 {
    overflow: hidden;
    position: relative;
}
.mwg_effect094 .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100%;
}
.mwg_effect094 .container p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 5vh;
}
.mwg_effect094 .container p span {
    color: #999;
}
.mwg_effect094 .cards {
    display: flex;
    width: max-content;
    white-space: nowrap;
    gap: 1vw;
    will-change: transform;
    padding: 0 105vw;
    align-items: center;
}
.mwg_effect094 .card {
    position: relative;
    width: 12vw;
    height: auto;
    border-radius: 0.5vw;
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect094')
const container = root.querySelector('.container')
const cardsContainer = root.querySelector('.cards')
const cards = root.querySelectorAll('.card')
const distance = cardsContainer.clientWidth - window.innerWidth
const isPortrait = window.innerWidth < window.innerHeight

const scrollTween = gsap.to(cardsContainer, {
    x: - distance,
    ease: 'none',
    scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: true,
        start: 'top top',
        end: '+=' + distance
    }
})

cards.forEach((card, i) => {
    const sign = i % 2 === 0 ? 1 : -1
    const rotation = (Math.random() - 0.5) * 6
    const amplitude = isPortrait ? 0.38 : 0.48

    gsap.fromTo(card, {
        rotation: rotation
    }, {
        rotation: -rotation,
        y: () => sign * -amplitude * window.innerHeight,
        yPercent: () => sign * 50,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'right 10%',
            scrub: true,
        }
    })
    gsap.to(card, {
        scale: 1.4,
        yoyo: true,
        repeat: 1,
        ease: 'back.inOut(3)',
        scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'right 10%',
            scrub: true,
        }
    })
})
```

## Orbital Image Scroll #094

In this effect, images move through the viewport on scroll while a centered headline remains fixed. Each card follows a curved path above or below the center line, flowing around the text like it’s in orbit. Let’s dive in!

## HTML Structure

We wrap a pinned column, a headline locked in the middle, and a single horizontal row of images that will travel behind that copy. Keeping every photograph as a direct child of the flex track means the scroll distance stays tied to how wide the strip actually is:

```html
<section class="mwg_effect094">
    <div class="container">
        <p>Images drifting <span>around the center</span></p>
        <div class="cards">
            <img class="card" src="./assets/medias/01.png" alt="">
            <img class="card" src="./assets/medias/02.png" alt="">
            <img class="card" src="./assets/medias/03.png" alt="">
            …
        </div>
    </div>
</section>
```

## Some CSS

We hide horizontal overflow on the root so the moving row never shows a scrollbar. The column fills the viewport and centres the track vertically so the pin always has a stable stage:

```
.mwg_effect094 {
    overflow: hidden;
    position: relative;
}
.mwg_effect094 .container {
    height: 100vh;
    width: 100%;
}
```

The headline sits absolutely at the middle of the frame so it stays readable while cards pass behind it:

```
.mwg_effect094 .container p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
```

The track is a flex row sized to its content. Generous horizontal padding lets the strip start offscreen to the right and travel left across the full window:

```
.mwg_effect094 .cards {
    display: flex;
    width: max-content;
    white-space: nowrap;
    will-change: transform;
    padding: 0 105vw;
    align-items: center;
}
.mwg_effect094 .card {
    position: relative;
}
```

## Scrubbing the strip

We bind the scene elements and measure how much wider the row is than the viewport. That value becomes our scroll distance:

```javascript
const root = document.querySelector('.mwg_effect094')
const container = root.querySelector('.container')
const cardsContainer = root.querySelector('.cards')
const cards = root.querySelectorAll('.card')

const distance = cardsContainer.clientWidth - window.innerWidth
```

We tween the row horizontally while pinning the container. `ease: 'none'` keeps the scrub one-to-one with scroll — no easing on the main commute:

```javascript
const scrollTween = gsap.to(cardsContainer, {
    x: - distance,
    ease: 'none',
    scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: true,
        start: 'top top',
        end: '+=' + distance
    }
})
```

We store this tween in `scrollTween` — every card trigger will listen to it through `containerAnimation` instead of the page scroll.

## Vertical arcs

We give every card its own scrubbed timeline that listens along the horizontal tween. Alternating tiles swing above or below the centre line with a vertical arc and a little random tilt. Portrait layouts use a slightly tighter amplitude so the loop still clears the headline on tall screens:

```javascript
const isPortrait = window.innerWidth < window.innerHeight

cards.forEach((card, i) => {
    const sign = i % 2 === 0 ? 1 : -1
    const rotation = (Math.random() - 0.5) * 6
    const amplitude = isPortrait ? 0.38 : 0.48

    gsap.fromTo(card, {
        rotation: rotation
    }, {
        rotation: -rotation,
        y: () => sign * -amplitude * window.innerHeight,
        yPercent: () => sign * 50,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'right 10%',
            scrub: true,
        }
    })
    // scale at the center runs next
})
```

## Scale at the center

As each card crosses the middle band, we swell it slightly so the dodge around the headline reads clearly. The same ScrollTrigger window keeps the scale in sync with the vertical arc:

```javascript
gsap.to(card, {
    scale: 1.4,
    yoyo: true,
    repeat: 1,
    ease: 'back.inOut(3)',
    scrollTrigger: {
        trigger: card,
        containerAnimation: scrollTween,
        start: 'left 90%',
        end: 'right 10%',
        scrub: true,
    }
})
```

## Go further

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
