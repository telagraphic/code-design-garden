---
title: "Weight-Shift Marquee"
description: "In this effect, a variable font sentence scrolls across the screen while its letter weight animates in sync. The weight appears to travel along with the text…"
slug: "weight-shift-marquee"
previewVideo: "weight-shift-marquee.mp4"
order: 79
published: true
categories: ["loader", "scroll", "image-carousel"]
triggers: ["scroll", "load"]
libraries: ["gsap"]
keywords: ["weight", "shift", "marquee", "3d", "depth", "scroll", "pinned", "letters"]
sourceUrl: "https://madewithgsap.com/effects/tutorial079"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/SplitText.min.js"></script>
```

### HTML
```text
<section class="mwg_effect079">
    <p class="scroll">Scroll</p>
    <div class="pin-height">
        <div class="container">
            <p class="text">In the right place, at the right time, and still you sink into the floor, it's never enough.</p>
            <div class="footer">
                <p>
                    <span>Turnstile</span>
                    <span>Never Enough</span>
                </p>
                <img class="papota" src="./assets/medias/neverenough.png" alt="">
            </div>
        </div>
    </div>
</section>
```

### Javascript
```text
@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap');

.mwg_effect079 .scroll {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.mwg_effect079 .container {
    height: 100vh;
    display: flex;
    align-items: center;
}
.mwg_effect079 .text {
    padding: 0 100vw;
    font-family: 'Google Sans Flex';
    font-size: max(60px, 12vw);
    width: max-content;
    white-space: nowrap;
    will-change: transform;
}
.mwg_effect079 .char {
    --wght: 250;
    font-variation-settings: 'wght' var(--wght);
}
.mwg_effect079 .footer {
    position: absolute;
    white-space: initial;
    bottom: 25px;
    left: 25px;
}
.mwg_effect079 .footer p {
    font: 500 normal 11px / 1.4 'PPNeueMontrealMono';
    text-transform: uppercase;
    margin: 0 0 8px;
}
.mwg_effect079 .footer p span {
    display: block;
}
.mwg_effect079 .footer p span:last-child {
    color: #999;
}
.mwg_effect079 .footer img {
    width: 150px;
    aspect-ratio: 1;
    display: block;
    object-fit: cover;
    border-radius: 4px;
}
```

## Weight-Shift Marquee #079

In this effect, a variable font sentence scrolls across the screen while its letter weight animates in sync. The weight appears to travel along with the text as it moves. Let's begin!

## HTML Structure

The structure is compact: a fixed scroll hint, a tall wrapper whose height we set in JavaScript, and one paragraph that holds the full sentence. A footer block can sit underneath for credits:

```html
<section class="mwg_effect079">
    <p class="scroll">Scroll</p>
    <div class="pin-height">
        <div class="container">
            <p class="text">In the right place, at the right time, and still you sink into the floor, it's never enough.</p>
            <div class="footer">
                <p>
                    <span>Turnstile</span>
                    <span>Never Enough</span>
                </p>
                <img class="papota" src="./assets/medias/neverenough.png" alt="">
            </div>
        </div>
    </div>
</section>
```

## Some CSS

We import a variable font that exposes a weight axis — this is what lets us animate stroke thickness per character:

```
@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap');
```

A fixed hint sits in the viewport centre until the animation takes over:

```
.mwg_effect079 .scroll {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

The container fills the screen and centres the line vertically. The sentence keeps a `max-content` width, refuses to wrap, and pads both sides with a full viewport of space so the horizontal scrub never clips early:

```
.mwg_effect079 .container {
    height: 100vh;
    display: flex;
    align-items: center;
}
.mwg_effect079 .text {
    padding: 0 100vw;
    font-family: 'Google Sans Flex';
    font-size: max(60px, 12vw);
    width: max-content;
    white-space: nowrap;
    will-change: transform;
}
```

Each split glyph inherits a custom property for weight that we will tween in JavaScript:

```
.mwg_effect079 .char {
    --wght: 250;
    font-variation-settings: 'wght' var(--wght);
}
```

## Fonts, split & pin scrub

We wait for webfonts to finish loading so measured widths stay honest. Everything runs inside a `document.fonts.ready` callback:

```javascript
document.fonts.ready.then(() => {
    const root = document.querySelector('.mwg_effect079')
    const pinHeight = root.querySelector('.pin-height')
    const container = root.querySelector('.container')
    const text = root.querySelector('.text')
    // ...
})
```

We fade the scroll hint the instant the section reaches the top of the viewport:

```javascript
gsap.to('.scroll', {
    autoAlpha: 0,
    duration: 0.2,
    scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'top top-=1',
        toggleActions: 'play none reverse none'
    }
})
```

We split the headline into one element per character with SplitText so we can target the weight axis on each glyph:

```javascript
SplitText.create(text, {
    type: 'chars',
    charsClass: 'char'
})

const chars = text.querySelectorAll('.char')
```

We measure how wide the line is versus the body, then set the tall wrapper height to that gap. This way, the scrub distance matches exactly how far the sentence needs to travel:

```javascript
gsap.set(pinHeight, {
    height: text.clientWidth - document.body.clientWidth
})
```

Now we scrub the whole paragraph horizontally while the container stays pinned. We use `document.body.clientWidth` instead of `window.innerWidth` so the scrollbar width is accounted for:

```javascript
gsap.to(text, {
    xPercent: -100,
    x: document.body.clientWidth,
    ease: 'none',
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: container
    }
})
```

## Weight wave along scroll

Alongside the horizontal slide, we open a second scrubbed timeline on the same scroll window. This keeps the weight choreography locked to the same progress as the drift:

```javascript
const master = gsap.timeline({
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
})
```

We define how long each character's weight pulse lasts and how many letters overlap at once. The `offset` value spaces the micro timelines so the wave travels along the string instead of firing all at once:

```javascript
const duration = 0.5
const letterTotal = duration * 2
const simultaneousLetters = 6
const offset = letterTotal / simultaneousLetters
```

For every character, we build a micro timeline that eases `--wght` up to a bold peak, then back down to a lighter value:

```javascript
chars.forEach((char, i) => {
    const tl = gsap.timeline()

    tl.to(char, {
        '--wght': 750,
        duration,
        ease: 'power1.inOut'
    }).to(char, {
        '--wght': 250,
        duration,
        ease: 'power1.inOut'
    })

    master.add(tl, i * offset)
})
```

Because both timelines listen to the same scrubbed range, the horizontal drift and the weight wave stay in phase for the whole passage.

## Go further

We could load a new variable font and also play with other of its attributes to maintain a gradual evolution of the variants while achieving a completely different look.

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
