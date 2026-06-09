---
title: "Cursor Insert Image Effect"
description: "In this effect, an image is revealed between two letters at the point where the cursor hovers the text line. The image expands from nothing while the surroun…"
slug: "cursor-insert-image-effect"
previewVideo: "cursor-insert-image-effect.mp4"
order: 86
published: true
categories: ["cursor", "scroll", "text"]
triggers: ["scroll", "hover", "mouse-move"]
libraries: ["gsap"]
keywords: ["cursor", "insert", "image", "scroll", "letters", "timeline", "hover"]
sourceUrl: "https://madewithgsap.com/effects/tutorial086"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```

### HTML
```text
<section class="mwg_effect086">
    <p>Teenage Engineering</p>
    <ul>
        <li>
            <p class="text">TP–7 aluminum</p>
            <img class="media" src="./assets/medias/1.png" alt="">
        </li>
        <li>
            <p class="text">TX–6 black</p>
            <img class="media" src="./assets/medias/2.png" alt="">
        </li>
        <li>
            <p class="text">OB–4 orange</p>
            <img class="media" src="./assets/medias/3.png" alt="">
        </li>
    </ul>
</section>
```

### Javascript
```text
html:has(.mwg_effect086),
body:has(.mwg_effect086) {
    overflow: hidden;
}
.mwg_effect086 {
    display: grid;
    height: 100dvh;
    place-items: center;
}
.mwg_effect086 > p {
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translate(-50%, 0);
}
.mwg_effect086 ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 8vw;
    line-height: 1.52;
}
.mwg_effect086 li {
    position: relative;
}
.mwg_effect086 .text {
    width: max-content;
}
.mwg_effect086 .letter {
    display: inline-block;
}
.mwg_effect086 .media {
    position: absolute;
    width: 17vw;
    aspect-ratio: 1.47;
    top: 0;
    left: 0;
    object-fit: cover;
    pointer-events: none;
    clip-path: inset(0% 50% round 1vw);
}
```

## Cursor Insert Image Effect #086

In this effect, an image is revealed between two letters at the point where the cursor hovers the text line. The image expands from nothing while the surrounding letters slide apart to make space. When the cursor leaves, everything reverses. Let's build it!

## HTML Structure

We start with a simple list. Each row pairs a text label with its matching image. The label and the picture sit as siblings inside the same `<li>`, so the script can easily reach the image from any letter:

```html
<section class="mwg_effect086">
    <p>Teenage Engineering</p>
    <ul>
        <li>
            <p class="text">Product name one</p>
            <img class="media" src="./assets/medias/1.png" alt="">
        </li>
        <li>
            <p class="text">Product name two</p>
            <img class="media" src="./assets/medias/2.png" alt="">
        </li>
    </ul>
</section>
```

## Some CSS

We lock the page scroll while the component is visible and centre everything in a full-height grid:

```
html:has(.mwg_effect086),
body:has(.mwg_effect086) {
    overflow: hidden;
}
.mwg_effect086 {
    display: grid;
    height: 100vh;
    place-items: center;
}
.mwg_effect086 ul {
    display: flex;
    flex-direction: column;
    align-items: center;
}
```

Each row is positioned relatively so the image can anchor itself later. The text never wraps, and every future letter span becomes an `inline-block` so we can apply horizontal transforms:

```
.mwg_effect086 li {
    position: relative;
}
.mwg_effect086 .text {
    width: max-content;
}
.mwg_effect086 .letter {
    display: inline-block;
}
```

The image sits absolutely over the text with no pointer capture. It starts fully clipped horizontally — `inset(0% 50%)` means both sides are pushed to the centre, so nothing is visible yet:

```
.mwg_effect086 .media {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    clip-path: inset(0% 50% round 1vw);
}
```

## Wrapping each letter

We wait for all fonts to be fully loaded before measuring anything — this keeps glyph widths honest. Then we grab every `.text` paragraph:

```javascript
document.fonts.ready.then(() => {
    const root = document.querySelector('.mwg_effect086')
    const texts = root.querySelectorAll('.text')
    // ...
})
```

A small utility replaces the plain string of each paragraph with one `<span class="letter">` per character. Spaces become non-breaking so the line keeps its rhythm once we start nudging letters apart:

```javascript
function wrapLettersInSpan(element) {
    const textStr = element.textContent
    element.innerHTML = textStr
        .split('')
        .map(char => char === ' '
            ? '<span class="letter">&nbsp;</span>'
            : '<span class="letter">' + char + '</span>')
        .join('')
}
```

After wrapping, we bind a `mouseleave` listener on each text line and a `mouseenter` on every single letter:

```javascript
texts.forEach(text => {
    wrapLettersInSpan(text)
    text.addEventListener('mouseleave', handleMouseLeave)
})

const letters = root.querySelectorAll('.letter')
letters.forEach(letter => {
    letter.addEventListener('mouseenter', handleLetterMouseEnter)
})
```

## Detecting the split point

When the pointer enters a letter, we first check whether the line is already active. If so — and the line was fading out — we simply resume the existing timeline and return early:

```javascript
function handleLetterMouseEnter(e) {
    const letter = e.currentTarget
    const parent = letter.closest('.text')

    if (parent.classList.contains('hovered')) {
        if (parent.classList.contains('outro')) {
            parent.classList.remove('outro')
            if (parent.tl) parent.tl.play()
        }
        return
    }

    parent.classList.add('hovered')
    // ...
}
```

Next we figure out exactly where the gap should open. We compare the cursor's horizontal position against the midpoint of the hovered glyph. If the cursor sits past the middle, the split falls after this letter; otherwise it falls before. That gives us two groups — left and right:

```javascript
const siblings = Array.from(parent.querySelectorAll('.letter'))
const index = siblings.indexOf(letter)

const rect = letter.getBoundingClientRect()
const isPastMidpoint = e.clientX > rect.left + rect.width / 2
const splitIndex = isPastMidpoint ? index : index - 1

const leftLetters = siblings.slice(0, splitIndex + 1)
const rightLetters = siblings.slice(splitIndex + 1)
```

## Animating the gap

We locate the sibling `.media` image and measure how far the seam sits from the left edge of the text. This tells GSAP where to position the image horizontally:

```javascript
const media = parent.parentElement.querySelector('.media')
const lastLeftLetter = leftLetters[leftLetters.length - 1]
const leftDistance = lastLeftLetter
    ? lastLeftLetter.getBoundingClientRect().right - parent.getBoundingClientRect().left
    : 0
```

We then build a single timeline with three parallel tweens. The image starts at the seam, centred with `xPercent: -50`, and its clip-path opens to full width. At the same time, the left group slides left and the right group slides right:

```javascript
const tl = gsap.timeline({
    onReverseComplete: () => {
        parent.classList.remove('hovered')
        parent.classList.remove('outro')
    }
})

parent.tl = tl

tl.fromTo(media, {
    x: leftDistance,
    xPercent: -50
}, {
    clipPath: 'inset(0% 0% round 1vw)',
    duration: 0.4,
    ease: 'expo.inOut'
}, 0)
if (leftLetters.length) tl.to(leftLetters, {
    x: -0.086 * window.innerWidth,
    duration: 0.4,
    ease: 'expo.inOut'
}, 0)
if (rightLetters.length) tl.to(rightLetters, {
    x: 0.086 * window.innerWidth,
    duration: 0.4,
    ease: 'expo.inOut'
}, 0)
```

All three tweens start at position `0` in the timeline, so they run in parallel. The multiplier `0.086` controls how far apart the letters push — feel free to tweak it for a wider or tighter corridor.

## Reversing on leave

When the cursor leaves the line, we tag it with an `outro` class and reverse the stored timeline. The `onReverseComplete` callback we set earlier cleans up both flags, so the line is ready for the next hover:

```javascript
function handleMouseLeave(e) {
    const text = e.currentTarget
    if (!text.classList.contains('outro')) {
        text.classList.add('outro')
        if (text.tl) {
            text.tl.reverse()
        }
    }
}
```

## Go further

Here, we could change the opening ease of the sentences to add a slight bounce effect, for example on hover. I’d recommend using the same ease for both the word spacing and the image appearance.
