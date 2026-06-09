---
title: "Scroll Word Mask"
description: "In this effect, a sentence scrolls through the center of the screen, revealing only four words at a time. The words appear and disappear as you scroll, creat…"
slug: "scroll-word-mask"
previewVideo: "scroll-word-mask.mp4"
order: 85
published: true
categories: ["scroll", "text"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["scroll", "word", "mask", "3d", "depth", "typography", "pinned", "letters"]
sourceUrl: "https://madewithgsap.com/effects/tutorial085"
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
<section class="mwg_effect085">
    <div class="pin-height">
        <div class="container">
            <p class="sentence">¿Qué sería de mí sin amigos? Si saltan de un puente, yo los sigo. Los amo aunque nunca les escribo.</p>
            <div class="footer">
                <p>
                    <span>CA7RIEL & PACO AMOROSO</span>
                    <span>El día del amigo</span>
                </p>
                <img class="papota" src="./assets/medias/papota.png" alt="">
            </div>
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect085 {
    font-size: max(30px, 6vw);
}
.mwg_effect085 .pin-height {
    height: 500vh;
}
.mwg_effect085 .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
}
.mwg_effect085 .footer {
    position: absolute;
    white-space: initial;
    bottom: 25px;
    left: 25px;
}
.mwg_effect085 .footer p {
    font: 500 normal 11px / 1.4 'PPNeueMontrealMono';
    text-transform: uppercase;
    margin: 0 0 8px;
}
.mwg_effect085 .footer p span {
    display: block;
}
.mwg_effect085 .footer p span:last-child {
    color: #999;
}
.mwg_effect085 .footer img {
    width: 150px;
    aspect-ratio: 1;
    display: block;
    object-fit: cover;
    border-radius: 4px;
}
.mwg_effect085 .sentence {
    white-space: nowrap;
    padding: 0 50vw;
    z-index: 1;
    position: relative;
}
.mwg_effect085 .word {
    transition: 0.1s opacity;
}
.mwg_effect085 .word:not(.on) {
    opacity: 0;
}
```

### Javascript
```text
const root = document.querySelector('.mwg_effect085')
const sentence = root.querySelector('.sentence')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')

wrapWordsInSpan(sentence)

const words = root.querySelectorAll('.word')
for (let i = 0; i < 4 && i < words.length; i++) words[i].classList.add('on')

ScrollTrigger.create({
    trigger: pinHeight,
    start: 'top top',
    end: 'bottom bottom',
    pin: container
})

centerSentence()

Array.from(words).slice(4).forEach((word, index) => {
    ScrollTrigger.create({
        trigger: root,
        start: 'top top-=' + ((pinHeight.clientHeight - window.innerHeight) / (words.length - 4)) * index,
        onEnter: () => {
            words[index + 4].classList.add('on')
            words[index].classList.remove('on')
            centerSentence()
        },
        onLeaveBack: () => {
            words[index + 4].classList.remove('on')
            words[index].classList.add('on')
            centerSentence()
        }
    })
})

function centerSentence() {
    const firstWord = root.querySelector('.word.on')
    const lastWord = firstWord.nextElementSibling.nextElementSibling.nextElementSibling
    const widthWords = lastWord.getBoundingClientRect().right - firstWord.getBoundingClientRect().left
    const distBeginSentence = firstWord.getBoundingClientRect().left - sentence.getBoundingClientRect().left

    gsap.to(sentence, {
        x: window.innerWidth/2 - distBeginSentence - widthWords / 2,
        duration:0.15,
        ease:'power1.inOut'
    })
}

function wrapWordsInSpan(element) {
    const text = element.textContent
    element.innerHTML = text
        .split(' ')
        .map(word => \`<span class="word">${word}</span>\`)
        .join(' ')
}
```

## Scroll Word Mask #085

In this effect, a sentence scrolls through the center of the screen, revealing only four words at a time. The words appear and disappear as you scroll, creating a continuous transition. Let's begin!

## HTML Structure

The section holds a tall wrapper for scrub length, one sentence paragraph, and a footer block for credits:

```html
<section class="mwg_effect085">
    <div class="pin-height">
        <div class="container">
            <p class="sentence">Your line of copy goes here.</p>
            <div class="footer">
                <p>
                    <span>Artist name</span>
                    <span>Track title</span>
                </p>
                <img class="papota" src="./assets/medias/papota.png" alt="">
            </div>
        </div>
    </div>
</section>
```

## Some CSS

The tall wrapper stretches how far we scroll. The container is a flex column that keeps the sentence vertically centred:

```
.mwg_effect085 .pin-height {
    height: 500vh;
}
.mwg_effect085 .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
}
```

The line never wraps and carries generous horizontal padding so we have room to slide it when the visible words change:

```
.mwg_effect085 .sentence {
    white-space: nowrap;
    padding: 0 50vw;
    z-index: 1;
    position: relative;
}
```

Each word fades in or out with a short opacity transition — anything outside the active quartet stays fully transparent:

```
.mwg_effect085 .word {
    transition: 0.1s opacity;
}
.mwg_effect085 .word:not(.on) {
    opacity: 0;
}
```

## Next we wrap each word

We bind the scene elements, split the sentence on spaces, and rebuild it so every token sits inside its own `.word` span:

```javascript
const root = document.querySelector('.mwg_effect085')
const sentence = root.querySelector('.sentence')
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')

wrapWordsInSpan(sentence)
```

The helper reads the plain text and injects one span per word:

```javascript
function wrapWordsInSpan(element) {
    const text = element.textContent
    element.innerHTML = text
        .split(' ')
        .map(word => \`<span class="word">${word}</span>\`)
        .join(' ')
}
```

Right after wrapping, we mark the first four spans as active so the opening quartet is already visible:

```javascript
const words = root.querySelectorAll('.word')
for (let i = 0; i < 4 && i < words.length; i++) {
    words[i].classList.add('on')
}
```

## Next we pin and step the window

We pin the container for the full height of the tall wrapper, then run an initial centre pass:

```javascript
ScrollTrigger.create({
    trigger: pinHeight,
    start: 'top top',
    end: 'bottom bottom',
    pin: container
})

centerSentence()
```

We measure where the active quartet sits inside the padded line and tween the whole paragraph sideways so those four words land near the middle of the screen:

```javascript
function centerSentence() {
    const firstWord = root.querySelector('.word.on')
    const lastWord = firstWord.nextElementSibling.nextElementSibling.nextElementSibling
    const widthWords = lastWord.getBoundingClientRect().right - firstWord.getBoundingClientRect().left
    const distBeginSentence = firstWord.getBoundingClientRect().left - sentence.getBoundingClientRect().left

    gsap.to(sentence, {
        x: window.innerWidth / 2 - distBeginSentence - widthWords / 2,
        duration: 0.15,
        ease: 'power1.inOut'
    })
}
```

For every remaining word, we add a lightweight ScrollTrigger. When we cross its threshold, the newest word lights up, the oldest drops out, and we centre again:

```javascript
Array.from(words).slice(4).forEach((word, index) => {
    ScrollTrigger.create({
        trigger: root,
        start: 'top top-=' + ((pinHeight.clientHeight - window.innerHeight) / (words.length - 4)) * index,
        onEnter: () => {
            words[index + 4].classList.add('on')
            words[index].classList.remove('on')
            centerSentence()
        },
        onLeaveBack: () => {
            words[index + 4].classList.remove('on')
            words[index].classList.add('on')
            centerSentence()
        }
    })
})
```

## Go further

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
