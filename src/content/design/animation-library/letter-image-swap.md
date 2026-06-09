---
title: "Letter Image Swap"
description: "In this fun little effect, hovering over a letter reveals an image in its place. The surrounding letters slide apart to make space, then ease back together w…"
slug: "letter-image-swap"
previewVideo: "letter-image-swap.mp4"
order: 93
published: true
categories: ["text", "layout"]
triggers: ["hover", "mouse-move"]
libraries: ["gsap"]
keywords: ["letter", "image", "swap", "3d", "depth", "random", "reveal", "letters"]
sourceUrl: "https://madewithgsap.com/effects/tutorial093"
---

## Setup

<!-- code-tabs -->

### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```

### HTML
```text
<section class="mwg_effect093">
    <p class="word">Celebrations</p>
    <div class="medias">
        <img class="media" src="./assets/medias/1.png" alt="">
        <img class="media" src="./assets/medias/2.png" alt="">
        <img class="media" src="./assets/medias/3.png" alt="">
        <img class="media" src="./assets/medias/4.png" alt="">
        <img class="media" src="./assets/medias/5.png" alt="">
        <img class="media" src="./assets/medias/6.png" alt="">
        <img class="media" src="./assets/medias/7.png" alt="">
        <img class="media" src="./assets/medias/8.png" alt="">
    </div>
</section>
```

### Javascript
```text
html:has(.mwg_effect093), 
body:has(.mwg_effect093) {
    overflow: hidden;
}
.mwg_effect093 {
    height: 100dvh;
    display: grid;
    place-items: center;
}
.mwg_effect093 .word {
    display: flex;
    font-size: 10vw;
}
.mwg_effect093 .letter {
    position: relative;
}
.mwg_effect093 .letter:has(.created-media) {
    color: transparent;
}
.mwg_effect093 .medias {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}
.mwg_effect093 .media {
    width: 1px;
    height: 1px;
    visibility: hidden;
    position: absolute;
}
.mwg_effect093 .created-media {
    position: absolute;
    width: 9vw;
    height: auto;
    top: 50%;
    left: 50%;
    border-radius: 1vw;
}
```

## Letter Image Swap #093

In this fun little effect, hovering over a letter reveals an image in its place. The surrounding letters slide apart to make space, then ease back together with a soft wobble when the image disappears. Let’s see how it works!

## HTML Structure

We place a single word that will be split into letters, plus a hidden stack of photographs the script pulls from on demand. Keeping the sources offstage lets the browser preload them while the visible line stays typographic:

```html
<section class="mwg_effect093">
    <p class="word">Celebrations</p>
    <div class="medias">
        <img class="media" src="./assets/medias/1.png" alt="">
        <img class="media" src="./assets/medias/2.png" alt="">
        <img class="media" src="./assets/medias/3.png" alt="">
        …
    </div>
</section>
```

## Some CSS

The word becomes a horizontal flex row so each letter can slide independently when an image appears:

```
.mwg_effect093 .word {
    display: flex;
}
```

Every glyph keeps a relative anchor for the photograph. When a picture is active, the letter ink turns transparent:

```
.mwg_effect093 .letter {
    position: relative;
}
.mwg_effect093 .letter:has(.created-media) {
    color: transparent;
}
```

The preload stack stays invisible. The injected image is absolutely positioned and centred inside the glyph:

```
.mwg_effect093 .media {
    width: 1px;
    height: 1px;
    visibility: hidden;
    position: absolute;
}
.mwg_effect093 .created-media {
    position: absolute;
    width: 9vw;
    top: 50%;
    left: 50%;
}
```

## Letter wrapping

We replace the word string with one `<span class="letter">` per character. Spaces become non-breaking spans so the rhythm stays intact. We also bind a `mouseenter` on every letter:

```javascript
const word = root.querySelector('.word')
wrapLettersInSpan(word)

const letters = [...word.querySelectorAll('.letter')]

letters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
        if (letter.children.length === 0) createMedia(letter)
    })
})

function wrapLettersInSpan(element) {
    element.innerHTML = element.textContent
        .split('')
        .map(char => char === ' ' ? '<span>&nbsp;</span>' : \`<span class="letter">${char}</span>\`)
        .join(' ');
}
```

## Image URLs

We collect every hidden source into an array and reserve a running index so each hover cycles through the stack. We also measure the virtual width of a spawned image:

```javascript
const mediaSrcs = Array.from(root.querySelectorAll('.medias .media'), el => el.src)
let mediaIndex = 0
const mediaWidth = 0.095 * window.innerWidth
const overflows = new Array(letters.length).fill(0)
```

## Hover reveal

We inject the next photograph directly inside the hovered letter, centre it on the glyph, and pop it in with a short back ease plus a little random rotation so the reveal feels lively:

```javascript
function createMedia(letter) {
    const img = document.createElement('img')
    img.src = mediaSrcs[mediaIndex]
    img.classList.add('created-media')
    letter.appendChild(img)

    gsap.set(img, {
        yPercent: -50,
        xPercent: -50,
    })
    gsap.from(img, {
        rotation: (Math.random() - 0.5) * 20,
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out(2)'
    })

    mediaIndex = (mediaIndex + 1) % mediaSrcs.length
    // word spread runs next
}
```

## Word spread

We measure how far the picture sticks out past the letter box, store that overflow per index, and rebalance every glyph so the extra width pushes the rest of the word aside. When the timer ends we drop the image, clear the overflow, slide the letters home, and give the parent glyph a tiny wobble:

```javascript
function applyLetterOffsets() {
    if (letters.length === 0) return

    let sumLeft = 0
    const targets = overflows.map((ov, i) => {
        const sumRight = overflows.slice(i + 1).reduce((a, v) => a + v, 0)
        const x = sumLeft - sumRight
        sumLeft += ov
        return x
    })

    gsap.to(letters, {
        x: i => targets[i],
        duration: 0.3,
        ease: 'back.out(3)',
        overwrite: 'auto'
    })
}

// inside createMedia, after appending the image:
const index = letters.indexOf(letter)
const overflowX = Math.max(0, (mediaWidth - letter.getBoundingClientRect().width) / 2)
overflows[index] = Math.max(overflows[index], overflowX)
applyLetterOffsets()

gsap.delayedCall(1.2, () => {
    const parent = img.parentElement
    const idx = letters.indexOf(parent)
    if (idx !== -1) overflows[idx] = 0

    img.remove()
    applyLetterOffsets()

    gsap.from(parent, {
        rotation: (Math.random() - 0.5) * 20,
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out(2)'
    })
})
```

## Go further

Here, we can play with the animation ease to achieve a more solid and serious feel — for example, by removing the bounce effect when the letters move.
