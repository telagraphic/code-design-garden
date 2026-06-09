---
title: "Upward Image Flow"
description: "In this effect, images appear one by one at the center of the viewport with a bounce motion, stacking on top of each other. As you scroll, they disappear wit…"
slug: "upward-image-flow"
previewVideo: "upward-image-flow.mp4"
order: 82
published: true
categories: ["scroll", "text"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["upward", "image", "flow", "3d", "depth", "scroll", "pinned", "random"]
sourceUrl: "https://madewithgsap.com/effects/tutorial082"
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
<section class="mwg_effect082">
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
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect082 {
    padding: 1px 0 0;
}
.mwg_effect082 .scroll {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.mwg_effect082 .pin-height {
    height: 400vh;
}
.mwg_effect082 .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 100vh;
}
.mwg_effect082 .media {
    position: absolute;
    width: 25vw;
    aspect-ratio: 1;
    object-fit: contain;
    opacity: 0;
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect082')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const medias = root.querySelectorAll('.media')

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

const revealTimelines = []

medias.forEach((media, index) => {
    const tlReveal = gsap.timeline({
        paused: true
    })
    tlReveal.set(media, {
        autoAlpha: 1,

    }, 'media' + index)
    tlReveal.fromTo(media, {
        scaleX: 0.9,
        scaleY: 0.9,
    }, {
        scaleX: 1,
        scaleY: 1,
        immediateRender: false,
        ease: 'elastic.out(2, 0.6)',
        duration: 0.5
    }, '<')

    revealTimelines.push(tlReveal)
})

const master = gsap.timeline({
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: container
    }
})

medias.forEach((media, i) => {
    const tl = gsap.timeline({
        onStart: () => {
            revealTimelines[i].play()
        },
        onReverseComplete: () => {
            revealTimelines[i].progress(-1).pause()
        }
    })

    const angle = (Math.random() - 0.5) * 40

    tl.to(media, {
        z: - window.innerWidth,
        rotation: angle,
        duration: 1,
        ease: 'power1.inOut'
    })
    tl.to(media, {
        x: angle * 0.01 * window.innerWidth,
        y: - 2 * window.innerHeight,
        duration: 0.6,
        ease: 'power1.in',
    }, '<+=0.4')
    master.add(tl, 0.1 *i);
})
```

## Upward Image Flow #082

In this effect, images appear one by one at the center of the viewport with a bounce motion, stacking on top of each other. As you scroll, they disappear with an upward, suction-like movement, shrinking as they leave for a smooth and original transition. Time to build it!

## HTML Structure

The section holds a fixed scroll hint, a tall wrapper for scrub length, and a single container where every `.media` image stacks in DOM order:

```html
<section class="mwg_effect082">
    <p class="scroll">Scroll</p>
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

We centre the scroll hint in the viewport so it reads before the pin takes over:

```
.mwg_effect082 .scroll {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

The tall wrapper stretches how far we scroll. The container stays one screen high, centres its children, and sets perspective so negative `z` reads as depth:

```
.mwg_effect082 .pin-height {
    height: 400vh;
}
.mwg_effect082 .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 100vh;
}
```

Every tile stacks in the same slot, starts invisible, and keeps a square aspect ratio so the movement stays consistent across breakpoints:

```
.mwg_effect082 .media {
    position: absolute;
    width: 25vw;
    aspect-ratio: 1;
    object-fit: contain;
    opacity: 0;
}
```

## Elastic reveal timelines

We bind the scene elements and fade the scroll hint as soon as the section reaches the top:

```javascript
const root = document.querySelector('.mwg_effect082')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const medias = root.querySelectorAll('.media')

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

Before the scroll choreography runs, we build one paused timeline per image that only handles the entrance — visibility on, then an elastic scale-up so the tile bounces into place:

```javascript
const revealTimelines = []

medias.forEach((media, index) => {
    const tlReveal = gsap.timeline({ paused: true })

    tlReveal.set(media, { autoAlpha: 1 }, 'media' + index)
    tlReveal.fromTo(
        media,
        { scaleX: 0.9, scaleY: 0.9 },
        {
            scaleX: 1,
            scaleY: 1,
            immediateRender: false,
            ease: 'elastic.out(2, 0.6)',
            duration: 0.5
        },
        '<'
    )

    revealTimelines.push(tlReveal)
})
```

Each exit sub-timeline will call `play()` on its matching reveal in `onStart`, and rewind it in `onReverseComplete` so scrubbing backward hides the pop as cleanly as it showed it.

## Master scrub & exit

We create a master timeline whose ScrollTrigger pins the container for the full height of the tall wrapper and scrubs with scroll:

```javascript
const master = gsap.timeline({
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: container
    }
})
```

For every image, we append a child timeline that picks a random rotation, recedes the tile along `z`, then overlaps a smooth lift upward off the top of the frame. The reveal timeline fires when the exit begins:

```javascript
medias.forEach((media, i) => {
    const tl = gsap.timeline({
        onStart: () => {
            revealTimelines[i].play()
        },
        onReverseComplete: () => {
            revealTimelines[i].progress(-1).pause()
        }
    })

    const angle = (Math.random() - 0.5) * 40

    tl.to(media, {
        z: -window.innerWidth,
        rotation: angle,
        duration: 1,
        ease: 'power1.inOut'
    })
    tl.to(
        media,
        {
            x: angle * 0.01 * window.innerWidth,
            y: -2 * window.innerHeight,
            duration: 0.6,
            ease: 'power1.in'
        },
        '<+=0.4'
    )
    // ...
})
```

We stagger where each child lands on the master so the images take turns instead of firing all at once:

```javascript
master.add(tl, 0.1 * i)
```

Because the entrance lives on its own paused timeline, the elastic pop replays cleanly whenever the scrub rewinds — while the exit stays locked to scroll progress on the master.

## Go further

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
