---
title: "3D Title Flip"
description: "In this effect, we'll browse several pieces of text. As the user scrolls, the texts rotate along a depth radius and move in different directions to create a …"
slug: "3d-title-flip"
previewVideo: "3d-title-flip.mp4"
order: 102
published: true
categories: ["scroll", "text", "layout"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["title", "flip", "3d", "depth", "typography", "scroll", "pinned", "letters"]
sourceUrl: "https://madewithgsap.com/effects/tutorial102"
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
<section class="mwg_effect102">
    <div class="pin-height">
        <div class="container">
            <p><span>7 Cinematic Classics</span></p>
            <p><span>Lost In Translation</span></p>
            <p><span>Moonrise Kingdom</span></p>
            <p><span>The Phantom Menace</span></p>
            <p><span>The Godfather</span></p>
            <p><span>A Clockwork Orange</span></p>
            <p><span>Jurassic Park</span></p>
            <p><span>Reservoir Dogs</span></p>
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect102 .pin-height {
    height: 600vh;
}
.mwg_effect102 .container {
    height: 100vh;
    perspective: 300vw;
}
.mwg_effect102 .container p {
    position: absolute;
    top: 50%;
    left: 50%;
    white-space: nowrap;
    transform: translate3d(-50%, -50%, -8vw);
    transform-style: preserve-3d;
}
.mwg_effect102 .container p span {
    transform: translate3d(0, 0, 8vw);
    display: block;
    backface-visibility: hidden;
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect102')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const paragraphs = root.querySelectorAll('p')

const master = gsap.timeline({
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        scrub: true
    }
})

const transitions = paragraphs.length - 1
const step = transitions > 0 ? 1 / transitions : 1
const ease = 'expo.inOut'

gsap.set(paragraphs, {
    rotateX: -90
})
gsap.set(paragraphs[0], {
    rotateX: 0
})

for (let i = 0; i < paragraphs.length - 1; i++) {
    const pos = i * step

    let angle = 20
    if (i % 2 === 0) {
        angle = -angle
    }

    master.to(paragraphs[i], {
        rotateX: 90,
        duration: step,
        ease
    }, pos)
    master.to(paragraphs[i].querySelector('span'), {
        rotateZ: angle,
        duration: step,
        ease
    }, pos)
    master.to(paragraphs[i].querySelector('span'), {
        autoAlpha: 0,
        duration: 0.2 * step,
        delay: 0.5 * step,
        ease
    }, pos)

    master.fromTo(paragraphs[i + 1], {
        rotateX: -90,
    }, {
        rotateX: 0,
        ease,
        duration: step
    }, pos)
    master.from(paragraphs[i + 1].querySelector('span'), {
        rotateZ: angle,
        ease,
        duration: step
    }, pos)
    master.from(paragraphs[i + 1].querySelector('span'), {
        autoAlpha: 0,
        duration: 0.2 * step,
        delay: 0.3 * step,
        ease
    }, pos)
}
```

## 3D Title Flip #102

In this effect, we'll browse several pieces of text. As the user scrolls, the texts rotate along a depth radius and move in different directions to create a 3D effect. Let's take a look at how it works!

## HTML Structure

Our DOM is built around a tall wrapper and a viewport-sized container. Every title lives in its own paragraph, with the copy tucked inside a `<span>` so the word can twist on its own axis while the paragraph handles the fold:

```html
<section class="mwg_effect102">
    <div class="pin-height">
        <div class="container">
            <p><span>7 Cinematic Classics</span></p>
            <p><span>Lost In Translation</span></p>
            <p><span>Moonrise Kingdom</span></p>
            …
        </div>
    </div>
</section>
```

## Some CSS

We stretch the pin wrapper so we actually scroll through the effect instead of skipping past it in one tick:

```
.mwg_effect102 .pin-height {
    height: 600vh;
}
```

The container fills the viewport and carries a wide perspective value so the flip reads clearly in depth:

```
.mwg_effect102 .container {
    height: 100vh;
    perspective: 300vw;
}
```

Every title is absolutely centred on stage. We nudge the paragraph slightly back in Z space and keep `transform-style: preserve-3d` so its child can move on its own plane:

```
.mwg_effect102 .container p {
    position: absolute;
    top: 50%;
    left: 50%;
    white-space: nowrap;
    transform: translate3d(-50%, -50%, -8vw);
    transform-style: preserve-3d;
}
```

The span sits in front of its parent. `backface-visibility: hidden` keeps the reverse side invisible while the line flips:

```
.mwg_effect102 .container p span {
    transform: translate3d(0, 0, 8vw);
    display: block;
    backface-visibility: hidden;
}
```

## Pin & master timeline

Next we start with JavaScript. We grab the section root, the tall wrapper, the live container, and every title paragraph:

```javascript
const root = document.querySelector('.mwg_effect102')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')
const paragraphs = root.querySelectorAll('p')
```

We build a master timeline whose scrubbed trigger spans the full height of the wrapper and pins the container in place:

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

We count one fewer transition than titles, because the first line is already visible when we land on the effect. We split the remaining scroll distance into equal steps and pick a shared ease for the whole sequence:

```javascript
const transitions = paragraphs.length - 1
const step = transitions > 0 ? 1 / transitions : 1
const ease = 'expo.inOut'
```

## Initial state

We fold every title backward along the X axis so they wait off-screen in depth:

```javascript
gsap.set(paragraphs, {
    rotateX: -90
})
```

We then bring the first paragraph back to face the camera. That way, we already see a title as soon as we arrive on the effect — no need to scroll first:

```javascript
gsap.set(paragraphs[0], {
    rotateX: 0
})
```

Because that first line is handled here, we do not add an entrance animation for it in the master timeline. The timeline only covers the handoffs between titles.

## Flip transitions

Next we start to build each handoff. For every pair of titles we place the outgoing and incoming tweens at the same position on the master timeline so they overlap:

```javascript
for (let i = 0; i < paragraphs.length - 1; i++) {
    const pos = i * step
```

When `pos` equals `0`, we are at the very start of the timeline — but we are not replaying the first title’s entrance. We jump straight into the first flip, from the line that is already on screen to the next one:

The twist angle alternates sign on even steps, which keeps the motion from feeling repetitive:

```javascript
let angle = 20
if (i % 2 === 0) {
    angle = -angle
}
```

The current title folds forward along the X axis:

```javascript
master.to(paragraphs[i], {
    rotateX: 90,
    duration: step,
    ease
}, pos)
```

At the same time, its inner span spins on the Z axis:

```javascript
master.to(paragraphs[i].querySelector('span'), {
    rotateZ: angle,
    duration: step,
    ease
}, pos)
```

When a title approaches the horizontal, edge-on view, the letters get crushed and hard to read. It simply does not look very nice. We fade the outgoing word out before it reaches that point. The delay lets the flip lead and the fade follow:

```javascript
master.to(paragraphs[i].querySelector('span'), {
    autoAlpha: 0,
    duration: 0.2 * step,
    delay: 0.5 * step,
    ease
}, pos)
```

The next title unfolds from the same folded position:

```javascript
master.fromTo(paragraphs[i + 1], {
    rotateX: -90,
}, {
    rotateX: 0,
    ease,
    duration: step
}, pos)
```

Its span picks up the same twist as the line it replaces:

```javascript
master.from(paragraphs[i + 1].querySelector('span'), {
    rotateZ: angle,
    ease,
    duration: step
}, pos)
```

We use the same trick on the incoming side: the span stays hidden a little longer so we never flash the word while it is still lying flat:

```javascript
master.from(paragraphs[i + 1].querySelector('span'), {
        autoAlpha: 0,
        duration: 0.2 * step,
        delay: 0.3 * step,
        ease
    }, pos)
}
```

## Go further

Here we can push the perspective value or the Z offsets on the paragraph and its span to make the flip feel deeper or flatter. Changing the alternating angle or its easing would also reshape how dramatic each transition feels.

Keep in mind that this effect works with any number of titles: add or remove paragraphs and the timeline steps adjust automatically.
