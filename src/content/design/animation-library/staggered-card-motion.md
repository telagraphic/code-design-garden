---
title: "Staggered Card Motion"
description: "In this effect, cards travel across the viewport on scroll with a subtle latency effect, making the motion feel smooth and dynamic. The spacing between each …"
slug: "staggered-card-motion"
previewVideo: "staggered-card-motion.mp4"
order: 87
published: true
categories: ["scroll", "text"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["staggered", "card", "motion", "3d", "depth", "scroll", "pinned", "letters"]
sourceUrl: "https://madewithgsap.com/effects/tutorial087"
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
<section class="mwg_effect087">
    <p class="scroll">Scroll</p>
    <div class="container">
        <div class="cards">
            <div class="card">
                <div class="card-content">
                    <p class="top">A beautiful resource for crafting stunning, well-made animations. It pushes your creative limits with the power of GSAP. You’ll be building high-end animations in minutes.</p>
                    <div class="bottom">
                        <img src="./assets/medias/1.png" alt="">
                        <p>Lucas Bigot <br />Creative Developer <br />Locomotive</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="top">MWG is a total gem. It gets a big thumbs-up from the GSAP team. The effects are gorgeous, the tutorials are clear, and the code is beautifully structured.</p>
                    <div class="bottom">
                        <img src="./assets/medias/2.png" alt="">
                        <p>Cassie Evans <br />Developer Education <br />Greensock, Gsap</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="top">MWG taught me new ways to approach things and improve my animations. I wish a tool like this had existed when I was starting out.</p>
                    <div class="bottom">
                        <img src="./assets/medias/3.png" alt="">
                        <p>Henri Heymans <br />Creative Developer <br />Propagande</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect087 {
    overflow: hidden;
    position: relative;
}
.mwg_effect087 .scroll {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.mwg_effect087 .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100%;
}
.mwg_effect087 .cards {
    display: flex;
    width: max-content;
    white-space: nowrap;
    gap: 20px;
    will-change: transform;
    padding: 0 calc(100vw + 1px);
}
.mwg_effect087 .card {
    position: relative;
    width: 370px;
    aspect-ratio: 0.75;
}
.mwg_effect087 .card-content {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    will-change: transform;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    white-space: initial;
    color: #0A0A0B;
    padding: 40px;
}
.mwg_effect087 .card-content .top {
    font-size: 30px;
    letter-spacing: -0.01em;
    line-height: 1;
}
.mwg_effect087 .card-content .bottom {
    display: flex;
    gap: 15px;
    align-items: center;
}
.mwg_effect087 .card-content img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 100%;
}
.mwg_effect087 .card-content .bottom p {
    font: 500 normal 11px / 1.4 'PPNeueMontrealMono';
    text-transform: uppercase;
}
.mwg_effect087 .card:nth-child(4n - 3) .card-content {
    background: #BCEFFF;
}
.mwg_effect087 .card:nth-child(4n - 2) .card-content {
    background: #F1F1F1;
}
.mwg_effect087 .card:nth-child(4n - 1) .card-content {
    background: #C9FE6E;
}
.mwg_effect087 .card:nth-child(4n) .card-content {
    background: #323232;
    color: #F1F1F1;
}

@media (max-width: 768px) {
    .mwg_effect087 .card {
        width: 70vw;
    }
    .mwg_effect087 .card-content {
        padding: 20px;
    }
    .mwg_effect087 .card-content .top {
        font-size: 20px;
    }
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect087')
const container = root.querySelector('.container')
const cardsContainer = root.querySelector('.cards')
const cards = root.querySelectorAll('.card')

const distance = cardsContainer.clientWidth - window.innerWidth

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

let transformBetweenTwoTicks = 0
let oldTransform = 0
function tick() {
    const currentTransform = gsap.getProperty(cardsContainer, "x")
    transformBetweenTwoTicks = currentTransform - oldTransform
    oldTransform = currentTransform
}

cards.forEach(card => {
    ScrollTrigger.create({
        trigger: card,
        containerAnimation: scrollTween,
        start: 'left 100%',
        end: 'right 0%',
        onEnter: () => {
            transformCard(card.children[0])
        },
        onEnterBack: () => {
            transformCard(card.children[0])
        }
    })
})

function transformCard(el) {
    gsap.fromTo(el, {
        xPercent: -transformBetweenTwoTicks * 3,
    }, {
        xPercent: 0,
        ease: 'power3.out',
        duration: 0.7
    })
}

ScrollTrigger.create({
    trigger: root,
    onEnter: () => {gsap.ticker.add(tick)},
    onLeave: () => {gsap.ticker.remove(tick)},
    onEnterBack: () => {gsap.ticker.add(tick)},
    onLeaveBack: () => {gsap.ticker.remove(tick)},
})
```

## Staggered Card Motion #087

In this effect, cards travel across the viewport on scroll with a subtle latency effect, making the motion feel smooth and dynamic. The spacing between each card progressively tightens as you scroll. Let's build it!

## HTML Structure

We keep the markup simple. A centred `.container` will be pinned, and a single flex row holds every card. Each card wraps its quote and portrait inside `.card-content` so the outer shell stays still while the inner layer handles the entrance motion:

```html
<section class="mwg_effect087">
    <div class="container">
        <div class="cards">
            <div class="card">
                <div class="card-content">
                    <p class="top">Quote text goes here.</p>
                    <div class="bottom">
                        <img src="./assets/medias/1.png" alt="">
                        <p>Name and role</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <p class="top">Another quote.</p>
                    <div class="bottom">
                        <img src="./assets/medias/2.png" alt="">
                        <p>Name and role</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

## Some CSS

We hide horizontal overflow on the root so the moving row never shows a scrollbar:

```
.mwg_effect087 {
    overflow: hidden;
    position: relative;
}
.mwg_effect087 .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100%;
}
```

The card track is a flex row sized to its content. Generous horizontal padding lets the strip overshoot the viewport while we scrub:

```
.mwg_effect087 .cards {
    display: flex;
    width: max-content;
    white-space: nowrap;
    gap: 20px;
    will-change: transform;
    padding: 0 calc(100vw + 1px);
}
```

Each card keeps a fixed width. The inner `.card-content` layer carries `will-change: transform` because that is the element we will nudge on entry:

```
.mwg_effect087 .card {
    position: relative;
    width: 370px;
    aspect-ratio: 0.75;
}
.mwg_effect087 .card-content {
    width: 100%;
    height: 100%;
    will-change: transform;
    white-space: initial;
}
```

## Scrubbing the strip

We bind the scene elements and measure how much wider the row is than the viewport. That value becomes our scroll distance:

```javascript
const root = document.querySelector('.mwg_effect087')
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

## Tracking scroll speed

To counter-slide each card, we need to know how fast the row moved on the last frame. A lightweight `tick` function stores that delta between two consecutive reads of the row's `x` position:

```javascript
let transformBetweenTwoTicks = 0
let oldTransform = 0
function tick() {
    const currentTransform = gsap.getProperty(cardsContainer, "x")
    transformBetweenTwoTicks = currentTransform - oldTransform
    oldTransform = currentTransform
}
```

## Transforming cards on entry

For every card we attach a ScrollTrigger that listens along the scrubbed tween. When a card enters from the right — or comes back while scrolling up — we fire the same handoff on its inner wrapper:

```javascript
cards.forEach(card => {
    ScrollTrigger.create({
        trigger: card,
        containerAnimation: scrollTween,
        start: 'left 100%',
        end: 'right 0%',
        onEnter: () => {
            transformCard(card.children[0])
        },
        onEnterBack: () => {
            transformCard(card.children[0])
        }
    })
})
```

The `transformCard` helper kicks the inner layer from a horizontal offset proportional to the recent scroll speed, then eases it back to neutral. The multiplier `3` amplifies that counter-slide:

```javascript
function transformCard(el) {
    gsap.fromTo(el, {
        xPercent: -transformBetweenTwoTicks * 3,
    }, {
        xPercent: 0,
        ease: 'power3.out',
        duration: 0.7
    })
}
```

## Starting the ticker

We only run the ticker while the section is on screen — no wasted frames when the visitor scrolls past. A final ScrollTrigger adds and removes `tick` from the GSAP ticker on enter and leave:

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

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
