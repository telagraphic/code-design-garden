---
title: "Jelly headline motion"
description: "In this effect, a headline moves through the viewport with an elastic motion. The animation responds to scroll velocity, creating a subtle jelly-like distort…"
slug: "jelly-headline-motion"
previewVideo: "jelly-headline-motion.mp4"
order: 89
published: true
categories: ["scroll", "text", "layout"]
triggers: ["scroll", "hover"]
libraries: ["gsap"]
keywords: ["jelly", "headline", "motion", "3d", "depth", "scroll", "letters", "rotate"]
sourceUrl: "https://madewithgsap.com/effects/tutorial089"
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
<section class="mwg_effect089">
    <p class="scroll">Scroll</p>
    <div class="container">
        <img class="media" src="./assets/medias/1.png" alt="">
        <p class="text">Italian Negroni</p>
        <p class="text-content">The Italian Negroni is a bold and refined cocktail that captures the essence of classic aperitivo culture. Crafted with a balanced blend of gin, sweet vermouth, and bitter liqueur, it delivers a rich interplay of herbal, citrus, and subtly sweet notes.</p>
    </div>
</section>
```

### CSS
```text
.mwg_effect089 {
    padding: 100vh 0;
}
.mwg_effect089 .scroll {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.mwg_effect089 .container {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
}
.mwg_effect089 .media {
    width: 150px;
    height: 150px;
    object-fit: cover;
    display: block;
    border-radius: 20px;
}
.mwg_effect089 .text {
    margin: 8vh 0;
    font-size: max(50px, 10vw);
    text-align: center;
}
.mwg_effect089 .letter {
    display: inline-block;
}
.mwg_effect089 .text-content {
    width: 100%;
    max-width: 440px;
    text-align: center;
    font-size: 12px;
    line-height: 1.4;
}

@media (max-width: 768px) {
    .mwg_effect089 .container {
        gap: 15px;
    }
    .mwg_effect089 .media-parent {
        width: 35vw;
    }
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect089')
const text = root.querySelector('.text')
let isTouch = false
gsap.matchMedia().add("(hover: none)", () => {isTouch = true})

wrapLettersInSpan(text)
const spans = text.querySelectorAll('.letter')

const { Engine, World, Bodies, Body, Constraint } = Matter
const engine = Engine.create()
engine.world.gravity.y = 0.5

const group = Body.nextGroup(true)
const scrollY = window.scrollY
const mid = (spans.length - 1) / 2
const letters = []

spans.forEach((span, index) => {
    const rect = span.getBoundingClientRect()
    if (rect.width === 0) return

    const cx = rect.left + rect.width / 2
    const cy = rect.top + scrollY + rect.height / 2

    const body = Bodies.rectangle(cx, cy, rect.width, rect.height, {
        frictionAir: 0.05, restitution: 0.3, density: 0.001,
        collisionFilter: { group }
    })

    const constraint = Constraint.create({
        pointA: { x: cx, y: cy }, bodyB: body,
        stiffness: 0.005, damping: 0.004, length: 0
    })

    const normDist = mid === 0 ? 0 : Math.abs(index - mid) / mid

    letters.push({
        dom: span, body, constraint,
        initialX: cx, initialY: cy,
        weight: normDist * 1,
        width: rect.width
    })

    World.add(engine.world, [body, constraint])
})

for (let i = 0; i < letters.length - 1; i++) {
    World.add(engine.world, Constraint.create({
        bodyA: letters[i].body,
        bodyB: letters[i + 1].body,
        pointA: { x: letters[i].width / 2, y: 0 },
        pointB: { x: -letters[i + 1].width / 2, y: 0 },
        stiffness: 0.6, length: 0
    }))
}

ScrollTrigger.create({
    trigger: root,
    start: 'top 150%',
    end: 'bottom -50%',
    onEnter: () => gsap.ticker.add(tick),
    onEnterBack: () => gsap.ticker.add(tick),
    onLeave: () => gsap.ticker.remove(tick),
    onLeaveBack: () => gsap.ticker.remove(tick),
    onUpdate: (self) => {
        const velocity = self.getVelocity()
        letters.forEach(l => {
            l.constraint.pointA.y = l.initialY + velocity * 0.08 * l.weight
        })
    }
})

function tick() {
    Engine.update(engine, 1000 / 60)
    letters.forEach(l => {
        Body.setAngle(l.body, l.body.angle * 0.97)
        Body.setAngularVelocity(l.body, l.body.angularVelocity * 0.95)

        const dx = l.body.position.x - l.initialX
        const dy = l.body.position.y - l.initialY
        l.dom.style.transform = \`translate(${dx}px, ${dy}px) rotate(${l.body.angle}rad)\`
    })
}

function wrapLettersInSpan(element) {
    const textStr = element.textContent;
    element.innerHTML = textStr
        .split('')
        .map(char => char === ' ' ? '<span class="letter">&nbsp;</span>' : '<span class="letter">' + char + '</span>')
        .join('');
}

function realign() {
    letters.forEach(l => {
        gsap.to(l.constraint.pointA, {
            y: l.initialY,
            duration: 0.35,
            ease: "power3.out",
            overwrite: true,
        })
    })
}
function handleTouchEnd() {
    realign()
}
if (isTouch) {
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })
}
```

## Jelly headline motion #089

In this effect, a headline moves through the viewport with an elastic motion. The animation responds to scroll velocity, creating a subtle jelly-like distortion. Let’s build it!

## HTML Structure

The section stacks an image, the animated headline, and a short paragraph. The headline stays a single `<p>` so we can replace its text with one span per character without breaking the surrounding layout:

```html
<section class="mwg_effect089">
    <div class="container">
        <img class="media" src="./assets/medias/1.png" alt="">
        <p class="text">Italian Negroni</p>
        <p class="text-content">Short supporting copy lives here.</p>
    </div>
</section>
```

## Some CSS

We add generous vertical padding so the visitor actually scrolls through the scene. The column centres its children:

```
.mwg_effect089 {
    padding: 100vh 0;
}
.mwg_effect089 .container {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
}
```

The headline gets a fluid font size and vertical margin so each letter has room to wobble. Every glyph becomes an `inline-block` so transforms apply cleanly:

```
.mwg_effect089 .text {
    margin: 8vh 0;
    font-size: max(50px, 10vw);
    text-align: center;
}
.mwg_effect089 .letter {
    display: inline-block;
}
```

The image and supporting paragraph sit above and below the headline:

```
.mwg_effect089 .media {
    width: 150px;
    height: 150px;
    object-fit: cover;
    display: block;
}
.mwg_effect089 .text-content {
    width: 100%;
    max-width: 440px;
    text-align: center;
}
```

## Wrapping each letter

We bind the root, detect touch devices, then split the headline into one `<span class="letter">` per character. Spaces become non-breaking so the line keeps its rhythm:

```javascript
const root = document.querySelector('.mwg_effect089')
const text = root.querySelector('.text')
let isTouch = false
gsap.matchMedia().add("(hover: none)", () => {isTouch = true})

wrapLettersInSpan(text)
const spans = text.querySelectorAll('.letter')

function wrapLettersInSpan(element) {
    const textStr = element.textContent;
    element.innerHTML = textStr
        .split('')
        .map(char => char === ' '
            ? '<span class="letter">&nbsp;</span>'
            : '<span class="letter">' + char + '</span>')
        .join('');
}
```

## Creating the physics world

We spin up a Matter.js engine with light gravity. For each visible span we measure its centre, create a rectangular body at that spot, and attach it to its origin with a very soft spring (`stiffness: 0.005`) so it can lag behind while still remembering home:

```javascript
const { Engine, World, Bodies, Body, Constraint } = Matter
const engine = Engine.create()
engine.world.gravity.y = 0.5

const group = Body.nextGroup(true)
const scrollY = window.scrollY
const mid = (spans.length - 1) / 2
const letters = []

spans.forEach((span, index) => {
    const rect = span.getBoundingClientRect()
    if (rect.width === 0) return

    const cx = rect.left + rect.width / 2
    const cy = rect.top + scrollY + rect.height / 2

    const body = Bodies.rectangle(cx, cy, rect.width, rect.height, {
        frictionAir: 0.05, restitution: 0.3, density: 0.001,
        collisionFilter: { group }
    })

    const constraint = Constraint.create({
        pointA: { x: cx, y: cy }, bodyB: body,
        stiffness: 0.005, damping: 0.004, length: 0
    })
```

We also compute a normalised distance from the centre of the word — letters at the edges get a higher `weight`, which will control how much they react to scroll speed:

```javascript
const normDist = mid === 0 ? 0 : Math.abs(index - mid) / mid

    letters.push({
        dom: span, body, constraint,
        initialX: cx, initialY: cy,
        weight: normDist * 1,
        width: rect.width
    })

    World.add(engine.world, [body, constraint])
})
```

## Chaining neighbours

We link each pair of adjacent letters edge-to-edge with a stiff constraint. This turns the whole word into a connected string that bends instead of scattering:

```javascript
for (let i = 0; i < letters.length - 1; i++) {
    World.add(engine.world, Constraint.create({
        bodyA: letters[i].body,
        bodyB: letters[i + 1].body,
        pointA: { x: letters[i].width / 2, y: 0 },
        pointB: { x: -letters[i + 1].width / 2, y: 0 },
        stiffness: 0.6, length: 0
    }))
}
```

## Bending on scroll

A ScrollTrigger watches the section. On each scroll update we read the velocity and shift every anchor point vertically in proportion to speed, weighted by the letter’s distance from the centre — so the middle stays calmer while the edges stretch more:

```javascript
ScrollTrigger.create({
    trigger: root,
    start: 'top 150%',
    end: 'bottom -50%',
    onEnter: () => gsap.ticker.add(tick),
    onEnterBack: () => gsap.ticker.add(tick),
    onLeave: () => gsap.ticker.remove(tick),
    onLeaveBack: () => gsap.ticker.remove(tick),
    onUpdate: (self) => {
        const velocity = self.getVelocity()
        letters.forEach(l => {
            l.constraint.pointA.y = l.initialY + velocity * 0.08 * l.weight
        })
    }
})
```

The ticker is only active while the section is on screen — no wasted frames otherwise.

## Rendering each frame

On every tick we advance the physics engine, damp rotation so letters don’t spin forever, and copy each body’s position back onto its DOM span as a translate + a small twist:

```javascript
function tick() {
    Engine.update(engine, 1000 / 60)
    letters.forEach(l => {
        Body.setAngle(l.body, l.body.angle * 0.97)
        Body.setAngularVelocity(l.body, l.body.angularVelocity * 0.95)

        const dx = l.body.position.x - l.initialX
        const dy = l.body.position.y - l.initialY
        l.dom.style.transform = \`translate(${dx}px, ${dy}px) rotate(${l.body.angle}rad)\`
    })
}
```

## Touch realignment

On touch devices the scroll momentum can leave the anchors stretched after the finger lifts. We ease them back to their initial position so the headline snaps home gently:

```javascript
function realign() {
    letters.forEach(l => {
        gsap.to(l.constraint.pointA, {
            y: l.initialY,
            duration: 0.35,
            ease: "power3.out",
            overwrite: true,
        })
    })
}
function handleTouchEnd() {
    realign()
}
if (isTouch) {
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })
}
```

## Go further

Here, it’s mainly the values assigned to the Matter.js properties that define the overall feel. This lets us play with gravity, bounciness, and the speed at which inertia propagates. Plenty to experiment with!
