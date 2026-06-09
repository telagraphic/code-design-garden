---
title: "Tightening word lines"
description: "In this effect, we spread the words of a paragraph wide apart and, as we scroll, each line tightens back to its natural width one row at a time. The motion i…"
slug: "tightening-word-lines"
previewVideo: "tightening-word-lines.mp4"
order: 97
published: true
categories: ["scroll", "text", "layout"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["tightening", "word", "lines", "typography", "scroll", "letters", "split-text"]
sourceUrl: "https://madewithgsap.com/effects/tutorial097"
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
<section class="mwg_effect097">
    <p class="scroll">Scroll</p>
    <div class="container">
        <div class="header">
            <p>A Journey Through Space</p>
            <p>A silent expansion</p>
        </div>
        <div class="content">
            <p class="title">1 — An Ever-Expanding Cosmos</p>
            <p>The universe is constantly expanding, stretching the fabric of space in all directions with a quiet, relentless motion. Galaxies drift apart over immense distances, carried by this cosmic flow that began with the Big Bang. What once existed as an incredibly dense and hot point has unfolded into a vast and ever-growing expanse.</p>
            <p class="title">2 — Light as a Measure of Distance</p>
            <p>Scientists observe this expansion through the redshift of light, a subtle sign that everything is moving away from everything else. Despite its scale, this phenomenon feels almost abstract, unfolding far beyond human perception. Yet it shapes the very structure of reality, influencing how galaxies form, evolve, and eventually fade.</p>
            <p class="title">3 — The Uncertain Future of Space</p>
            <p>As space continues to expand, questions remain about its ultimate fate, whether it will stretch forever into darkness or transform in ways we have yet to understand.</p>
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect097 {
    padding: calc(100vh - 80px) var(--grid-margin) 100vh;
}
.mwg_effect097 .content p {
    width: 60%;
    margin: 0 auto;
    font-size: max(18px, 3vw);
}
.mwg_effect097 p.title {
    margin: 80px auto 20px;
}
.mwg_effect097 .line {
    width: max-content;
}
.mwg_effect097 .word {
    will-change: transform;
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect097')
const container = root.querySelector('.container')
const paragraphs = container.querySelectorAll('.content p')

paragraphs.forEach((paragraph) => {
    SplitText.create(paragraph, {
        type: "lines, words",
        linesClass: 'line',
        wordsClass: 'word'
    })
})

const lines = root.querySelectorAll('.line')
const containerWidth = container.clientWidth
const containerRect = container.getBoundingClientRect()

lines.forEach(line => {
    const words = Array.from(line.querySelectorAll('.word'))

    const totalWordsWidth = words.reduce((acc, word) => acc + word.getBoundingClientRect().width, 0)
    const gaps = words.length - 1
    const freeSpace = Math.max(containerWidth - totalWordsWidth, 0)
    const gapSize = gaps > 0 ? freeSpace / gaps : 0

    let targetLeft = 0

    words.forEach((word, index) => {
        const rect = word.getBoundingClientRect()
        const currentLeft = rect.left - containerRect.left
        const deltaX = targetLeft - currentLeft

        gsap.set(word, { x: deltaX })

        targetLeft += rect.width + (index < words.length - 1 ? gapSize : 0)
    })

    gsap.to(words, {
        x: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: line,
            start: 'top bottom',
            end: 'top 60%',
            scrub: 0.2
        }
    })
})
```

## Tightening word lines #097

In this effect, we spread the words of a paragraph wide apart and, as we scroll, each line tightens back to its natural width one row at a time. The motion is scrubbed to scroll progress so the copy feels like it’s reforming into focus. Let’s build it!

## HTML Structure

We wrap a scroll hint, a header row, and a content column of titled paragraphs. Every block of body copy stays a plain `<p>` so the split can turn it into lines and words without disturbing the hierarchy:

```html
<section class="mwg_effect097">
    <p class="scroll">Scroll</p>
    <div class="container">
        <div class="header">
            <p>A Journey Through Space</p>
            <p>A silent expansion</p>
        </div>
        <div class="content">
            <p class="title">1 — An Ever-Expanding Cosmos</p>
            <p>The universe is constantly expanding…</p>
            <p class="title">2 — Light as a Measure of Distance</p>
            <p>Scientists observe this expansion…</p>
            …
        </div>
    </div>
</section>
```

## Some CSS

We give the section tall vertical padding so there is room to scroll through every paragraph. Body copy sits in a centred column with a fluid size:

```
.mwg_effect097 {
    padding: calc(100vh - 80px) var(--grid-margin) 100vh;
}
.mwg_effect097 .content p {
    width: 60%;
    margin: 0 auto;
    font-size: max(18px, 3vw);
}
.mwg_effect097 p.title {
    margin: 80px auto 20px;
}
```

Each split line keeps an intrinsic width and every word is ready for transform:

```
.mwg_effect097 .line {
    width: max-content;
}
.mwg_effect097 .word {
    will-change: transform;
}
```

## Splitting the text

We walk every paragraph inside the content column and split it into lines and words with `SplitText`. Each line becomes its own wrapper so we can animate one row at a time:

```javascript
const root = document.querySelector('.mwg_effect097')
const container = root.querySelector('.container')
const paragraphs = container.querySelectorAll('.content p')

paragraphs.forEach((paragraph) => {
    SplitText.create(paragraph, {
        type: "lines, words",
        linesClass: 'line',
        wordsClass: 'word'
    })
})

const lines = root.querySelectorAll('.line')
```

## Measuring free space

For each line we sum the natural width of every word, subtract from the container width, and divide the leftover evenly between each gap:

```javascript
const containerWidth = container.clientWidth
const containerRect = container.getBoundingClientRect()

lines.forEach(line => {
    const words = Array.from(line.querySelectorAll('.word'))

    const totalWordsWidth = words.reduce((acc, word) => acc + word.getBoundingClientRect().width, 0)
    const gaps = words.length - 1
    const freeSpace = Math.max(containerWidth - totalWordsWidth, 0)
    const gapSize = gaps > 0 ? freeSpace / gaps : 0
    // parking and scrubbing run next
})
```

## Parking the words

We walk each word and offset it horizontally so the line starts fully justified across the container width. `targetLeft` accumulates as we go:

```javascript
let targetLeft = 0

words.forEach((word, index) => {
    const rect = word.getBoundingClientRect()
    const currentLeft = rect.left - containerRect.left
    const deltaX = targetLeft - currentLeft

    gsap.set(word, { x: deltaX })

    targetLeft += rect.width + (index < words.length - 1 ? gapSize : 0)
})
```

## Scrubbing to natural width

A scrubbed tween pulls every word back to `x: 0` as that line crosses the viewport, which reads as the sentence tightening back into focus:

```javascript
gsap.to(words, {
    x: 0,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: line,
        start: 'top bottom',
        end: 'top 60%',
        scrub: 0.2
    }
})
```

## Go further

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
