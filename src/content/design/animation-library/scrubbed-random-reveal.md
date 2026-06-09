---
title: "Scrubbed random reveal"
description: "In this effect, we build a paragraph line by line as we scroll. On each line, letters appear in a random order until the full text reads normally. Let’s buil…"
slug: "scrubbed-random-reveal"
previewVideo: "scrubbed-random-reveal.mp4"
order: 90
published: true
categories: ["scroll", "text", "layout"]
triggers: ["scroll", "load"]
libraries: ["gsap"]
keywords: ["scrubbed", "random", "reveal", "3d", "depth", "scroll", "pinned", "letters"]
sourceUrl: "https://madewithgsap.com/effects/tutorial090"
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
<section class="mwg_effect090">
    <p class="scroll">Scroll</p>

    <div class="pin-height">
        <div class="container">
            <div class="header">
                <p class="left">About Hokusai</p>
                <div class="right">
                    <p>The Great Wave off Kanagawa <br/>1830–1831 <br/>Woodblock Print</p>
                    <img src="./assets/medias/1.png" alt="">
                </div>
            </div>
            <p class="paragraph">Hokusai (1760→1849) was a Japanese artist renowned for his mastery of ukiyo-e and his innovative approach to composition and perspective. He is best known for his series Thirty-six Views of Mount Fuji, which captures movement and natural power with striking clarity and elegance.</p>
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect090 .scroll {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.mwg_effect090 .pin-height {
    height: 500vh;
}
.mwg_effect090 .header {
    position: absolute;
    display: flex;
    justify-content: space-between;
    top: var(--grid-margin);
    left: var(--grid-margin);
    right: var(--grid-margin);
    font-size: 1.2vw;
}
.mwg_effect090 .header .right {
    display: flex;
    gap: 1em;
    text-align: right;
    align-items: center;
    line-height: 1.4;
}
.mwg_effect090 .header img {
    border-radius: 0.2em;
    height: 4.6vw;
    width: auto;
    display: block;
    object-fit: cover;
}
.mwg_effect090 .container {
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 var(--grid-margin);
    overflow: hidden;
}
.mwg_effect090 .paragraph {
    width: 74%;
    font: 500 normal 3.9vw/0.9 'LayGrotesk';
    letter-spacing: -0.03em;
}
.mwg_effect090 .char {
    /* visibility: hidden; */
}

@media (max-width: 900px) {
    .mwg_effect090 .header {display: block;}
    .mwg_effect090 .header .left {font-size: 16px}
    .mwg_effect090 .header .right {
        font-size: 13px;
        margin: 15px 0 0;
    }
    .mwg_effect090 .header .right p{
        order: 2;
        text-align: left;
    }
    .mwg_effect090 .header img {
        height: 58px;
        order: 1;
    }
    .mwg_effect090 .paragraph {
        font-size: 30px;
    }
}
@media (max-width: 500px) {
    .mwg_effect090 .paragraph {
        width: 100%;
    }
}
```

### Javascript
```text
document.fonts.ready.then(() => {
    init()
})

function init() {

    gsap.registerPlugin(SplitText) 

    window.addEventListener('resize', () => {
        ScrollTrigger.refresh()
    })
    
    const pinHeight = document.querySelector('.mwg_effect090 .pin-height')
    const container = document.querySelector('.mwg_effect090 .container')
    const paragraph = document.querySelector(".mwg_effect090 .paragraph")
    
    let split = SplitText.create(paragraph, { 
        type: "lines, words, chars",
        charsClass: "char"
    });

    split.chars.forEach(char => {
        char.style.display = "none"
    })

    ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container
    })

    split.lines.forEach(line => {
        const letters = line.querySelectorAll('.char');

        gsap.to(letters, {
            display: "inline",
            stagger: {
                each: 0.2,
                from: "random"
            },
            ease: 'none',
            scrollTrigger: {
                trigger: '.mwg_effect090',
                start: 'top -10%',
                end: 'bottom bottom',
                scrub: true
            }
        })
    })
}
```

## Scrubbed random reveal #090

In this effect, we build a paragraph line by line as we scroll. On each line, letters appear in a random order until the full text reads normally. Let’s build it!

## HTML Structure

We wrap a tall scroll driver around a pinned column. A small header sits above a single `.paragraph` node — SplitText will explode it into lines, words, and characters for us:

```html
<section class="mwg_effect090">
    <div class="pin-height">
        <div class="container">
            <div class="header">
                <p class="left">About Hokusai</p>
                <div class="right">
                    <p>The Great Wave off Kanagawa</p>
                    <img src="./assets/medias/1.png" alt="">
                </div>
            </div>
            <p class="paragraph">Your long paragraph copy goes here.</p>
        </div>
    </div>
</section>
```

## Some CSS

We set a tall wrapper so the visitor has enough scroll runway while the scene stays pinned:

```
.mwg_effect090 .pin-height {
    height: 500vh;
}
```

The container fills the viewport, centres the content, and hides overflow so stray letters never paint outside the frame:

```
.mwg_effect090 .container {
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 var(--grid-margin);
    overflow: hidden;
}
```

The paragraph keeps a fixed width so line breaks stay stable once the text is split:

```
.mwg_effect090 .paragraph {
    width: 74%;
}
```

## Splitting the paragraph

We wait for fonts to load so measured boxes stay honest, register SplitText, and bind the scene elements:

```javascript
document.fonts.ready.then(() => {
    init()
})

function init() {
    gsap.registerPlugin(SplitText)

    window.addEventListener('resize', () => {
        ScrollTrigger.refresh()
    })

    const pinHeight = document.querySelector('.mwg_effect090 .pin-height')
    const container = document.querySelector('.mwg_effect090 .container')
    const paragraph = document.querySelector(".mwg_effect090 .paragraph")
```

We rebuild the paragraph into nested lines, words, and characters with `SplitText.create()`:

```javascript
let split = SplitText.create(paragraph, {
    type: "lines, words, chars",
    charsClass: "char"
});
```

## Hiding every character

Every character starts hidden with `display: none`. The layout still reserves space while nothing reads yet:

```javascript
split.chars.forEach(char => {
    char.style.display = "none"
})
```

## Pinning the scene

We pin the container for the full height of the tall wrapper so the visitor keeps scrubbing through the same viewport:

```javascript
ScrollTrigger.create({
    trigger: pinHeight,
    start: 'top top',
    end: 'bottom bottom',
    pin: container
})
```

## Random reveal per line

For each line we tween its characters back to `display: inline` with a scrubbed timeline. The stagger uses `from: "random"` so letters pop in shuffled order on every line:

```javascript
split.lines.forEach(line => {
        const letters = line.querySelectorAll('.char');

        gsap.to(letters, {
            display: "inline",
            stagger: {
                each: 0.2,
                from: "random"
            },
            ease: 'none',
            scrollTrigger: {
                trigger: '.mwg_effect090',
                start: 'top -10%',
                end: 'bottom bottom',
                scrub: true
            }
        })
    })
}
```

All lines share the same scroll range, so the whole paragraph knits together progressively as we scrub down the page.

## Go further

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
