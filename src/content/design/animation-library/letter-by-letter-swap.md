---
title: "Letter-by-Letter Swap"
description: "In this effect, text changes on scroll through an in-place transition, where each paragraph is replaced letter by letter — fading out the current one while r…"
slug: "letter-by-letter-swap"
previewVideo: "letter-by-letter-swap.mp4"
order: 81
published: true
categories: ["scroll", "text", "layout"]
triggers: ["scroll", "load"]
libraries: ["gsap"]
keywords: ["letter", "swap", "3d", "depth", "scroll", "pinned", "letters", "split-text"]
sourceUrl: "https://madewithgsap.com/effects/tutorial081"
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
<section class="mwg_effect081">
    <div class="pin-height">
        <div class="container">
            <div class="top">
                <p>About tokyo</p>
                <img class="media" src="./assets/medias/1.png" alt="">
            </div>
            <p class="paragraph">Tokyo emerged as a global metropolis by blending tradition with rapid modernization, shaping a city that constantly reinvents itself. From its earliest transformations, it embraced innovation while preserving cultural roots.</p>
            <p class="paragraph">The city is defined by precision, density, and rhythm, where everyday life moves with remarkable efficiency. Infrastructure, design, and technology are seamlessly integrated into the urban experience.</p>
            <p class="paragraph">Despite its scale and intensity, Tokyo remains deeply human, built around neighborhoods that feel intimate and distinct. This balance between complexity and care is what gives the city its unique character.</p>
            <div class="all-paragraphs" aria-hidden="true"></div>
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect081 .pin-height {
    height: 600vh;
}
.mwg_effect081 .container {
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 var(--grid-margin);
    overflow: hidden;
}
.mwg_effect081 .top {
    position: absolute;
    top: 0;
    left: 0;
    padding: var(--grid-margin);
    width: 100%;
    color: var(--mwg2-grey);
    display: flex;
    justify-content: space-between;
}
.mwg_effect081 .top img {
    width: max(180px, 12vw);
    aspect-ratio: 1;
    border-radius: 1.4vw;
}
.mwg_effect081 .paragraph {
    width: 68vw;
    font: 500 normal 3.5vw/1 'LayGrotesk';
    letter-spacing: -0.03em;
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
}
.mwg_effect081 .all-paragraphs {
    font: 500 normal 3.5vw/1 'LayGrotesk';
}
.mwg_effect081 .all-paragraphs-line {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
}
.mwg_effect081 .all-paragraphs-line .line:not(:first-child) .char {
    display: none;
}
.mwg_effect081 .all-paragraphs-line .line:nth-child(1) { order: 8; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(2) { order: 7; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(3) { order: 6; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(4) { order: 5; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(5) { order: 4; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(6) { order: 3; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(7) { order: 2; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(8) { order: 1; }
```

### Javascript
```text
function initEffect() {
    document.fonts.ready.then(() => {
        init()
    })
}

function init() {

    const root = document.querySelector('.mwg_effect081')
    const pinHeight = root.querySelector('.pin-height')
    const container = root.querySelector('.container')
    const paragraphs = root.querySelectorAll('.paragraph')
    const allParagraphsContainer = root.querySelector('.all-paragraphs')

    let maxCharsPerLine = 0
    let maxLinesPerParagraph = 0
    const linesPerParagraph = []

    paragraphs.forEach(paragraph => {
        const split = SplitText.create(paragraph, {
            type: 'lines, chars',
            linesClass: 'line',
            charsClass: 'char'
        })
        split.chars.forEach(char => char.removeAttribute('style'))
        split.lines.forEach(line => line.removeAttribute('style'))

        linesPerParagraph.push(split.lines)

        if (split.lines.length > maxLinesPerParagraph) {
            maxLinesPerParagraph = split.lines.length
        }
        split.lines.forEach(line => {
            const charCount = line.querySelectorAll('.char').length
            if (charCount > maxCharsPerLine) maxCharsPerLine = charCount
        })
    })

    for (let lineIndex = 0; lineIndex < maxLinesPerParagraph; lineIndex++) {
        const groupDiv = document.createElement('div')
        groupDiv.className = 'all-paragraphs-line'

        linesPerParagraph.forEach(paragraphLines => {
            const sourceLine = paragraphLines[lineIndex]
            if (sourceLine) {
                const clonedLine = sourceLine.cloneNode(true)
                groupDiv.appendChild(clonedLine)
            } else {
                const placeholder = document.createElement('div')
                placeholder.className = 'line'
                groupDiv.appendChild(placeholder)
            }
        })

        allParagraphsContainer.appendChild(groupDiv)
    }

    const groups = Array.from(allParagraphsContainer.querySelectorAll('.all-paragraphs-line'))
    const linesMatrix = groups.map(g => Array.from(g.querySelectorAll('.line')))
    const charsMatrix = linesMatrix.map(lines => lines.map(line => Array.from(line.querySelectorAll('.char'))))
    const paragraphCount = linesMatrix[0].length

    const easeFn = gsap.parseEase('power3.inOut')

    ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        scrub: true,
        onUpdate: self => {
            const p = Math.min(1, Math.max(0, self.progress))

            const paraProgress = p * (paragraphCount - 1)
            const fromIndex = Math.max(0, Math.floor(paraProgress))
            const toIndex = Math.min(paragraphCount - 1, fromIndex + 1)
            const intraEased = easeFn(paraProgress - fromIndex)
            const charIndex = Math.min(maxCharsPerLine, Math.max(0, Math.round(intraEased * maxCharsPerLine)))
            const fadeWindow = 3
            const toCharIndex = Math.min(
                maxCharsPerLine,
                Math.max(0, charIndex - fadeWindow + 1)
            )

            groups.forEach((_, gi) => {
                const fromChars = charsMatrix[gi][fromIndex]
                const toChars = charsMatrix[gi][toIndex]

                if (fromIndex === toIndex) {
                    if (fromChars) fromChars.forEach(c => gsap.set(c, { display: 'inline', opacity: 1 }))
                } else {
                    if (intraEased >= 0.999) {
                        if (fromChars) fromChars.forEach(c => gsap.set(c, { display: 'none', opacity: 0 }))
                        if (toChars) toChars.forEach(c => gsap.set(c, { display: 'inline', opacity: 1 }))
                        return
                    }

                    if (fromChars) {
                        fromChars.forEach((c, i) => {
                            const d = charIndex - i
                            if (i >= charIndex) {
                                gsap.set(c, { display: 'inline', opacity: 1 })
                            } else if (d > 0 && d <= fadeWindow) {
                                const opacity = 1 - (d / fadeWindow)
                                gsap.set(c, { display: 'inline', opacity })
                            } else {
                                gsap.set(c, { display: 'none', opacity: 0 })
                            }
                        })
                    }

                    if (toChars) toChars.forEach((c, i) => gsap.set(c, { display: i < toCharIndex ? 'inline' : 'none', opacity: i < toCharIndex ? 1 : 0 }))
                }
            })
        }
    })
}
```

## Letter-by-Letter Swap #081

In this effect, text changes on scroll through an in-place transition, where each paragraph is replaced letter by letter — fading out the current one while revealing the next.

## HTML Structure

The structure holds a tall wrapper for scrub length, a viewport-sized container, and every paragraph we want to crossfade. An empty `.all-paragraphs` container waits at the end — we'll inject one flex row per logical line into it via JavaScript:

```html
<section class="mwg_effect081">
    <div class="pin-height">
        <div class="container">
            <div class="top">
                <p>About tokyo</p>
                <img class="media" src="./assets/medias/1.png" alt="">
            </div>
            <p class="paragraph">First paragraph of body copy.</p>
            <p class="paragraph">Second paragraph of body copy.</p>
            <p class="paragraph">Third paragraph of body copy.</p>
            <div class="all-paragraphs" aria-hidden="true"></div>
        </div>
    </div>
</section>
```

## Some CSS

The tall wrapper stretches the scroll distance. The container stays one viewport high, centres vertically, and clips overflow:

```
.mwg_effect081 .pin-height {
    height: 600vh;
}
.mwg_effect081 .container {
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 var(--grid-margin);
    overflow: hidden;
}
```

Source paragraphs sit absolutely at the origin but stay invisible — only the injected mirror in `.all-paragraphs` drives what the eye reads:

```
.mwg_effect081 .paragraph {
    width: 68vw;
    font: 500 normal 3.5vw/1 'LayGrotesk';
    letter-spacing: -0.03em;
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
}
.mwg_effect081 .all-paragraphs {
    font: 500 normal 3.5vw/1 'LayGrotesk';
}
```

Each synthetic row is a horizontal flex strip. Sibling lines from different paragraphs sit side by side. Flex `order` flips which column reads left-to-right, and a rule hides duplicate characters outside the first column:

```
.mwg_effect081 .all-paragraphs-line {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
}
.mwg_effect081 .all-paragraphs-line .line:not(:first-child) .char {
    display: none;
}
.mwg_effect081 .all-paragraphs-line .line:nth-child(1) { order: 8; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(2) { order: 7; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(3) { order: 6; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(4) { order: 5; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(5) { order: 4; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(6) { order: 3; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(7) { order: 2; }
.mwg_effect081 .all-paragraphs-line .line:nth-child(8) { order: 1; }
```

## Split, interleave & matrices

We wait for fonts to load, then bind the scene elements inside an `init()` function:

```javascript
function initEffect() {
    document.fonts.ready.then(() => {
        init()
    })
}

function init() {
    const root = document.querySelector('.mwg_effect081')
    const pinHeight = root.querySelector('.pin-height')
    const container = root.querySelector('.container')
    const paragraphs = root.querySelectorAll('.paragraph')
    const allParagraphsContainer = root.querySelector('.all-paragraphs')
    // ...
}
```

We split every source paragraph into lines and characters with SplitText, stripping inline split styles so our own CSS rules win. We also track the widest line and the tallest paragraph:

```javascript
let maxCharsPerLine = 0
let maxLinesPerParagraph = 0
const linesPerParagraph = []

paragraphs.forEach(paragraph => {
    const split = SplitText.create(paragraph, {
        type: 'lines, chars',
        linesClass: 'line',
        charsClass: 'char'
    })
    split.chars.forEach(char => char.removeAttribute('style'))
    split.lines.forEach(line => line.removeAttribute('style'))

    linesPerParagraph.push(split.lines)

    if (split.lines.length > maxLinesPerParagraph) {
        maxLinesPerParagraph = split.lines.length
    }
    split.lines.forEach(line => {
        const charCount = line.querySelectorAll('.char').length
        if (charCount > maxCharsPerLine) maxCharsPerLine = charCount
    })
})
```

For each logical line index across all paragraphs, we build one flex row and clone the matching line from every paragraph. Short paragraphs get an empty placeholder so the matrix stays rectangular:

```javascript
for (let lineIndex = 0; lineIndex < maxLinesPerParagraph; lineIndex++) {
    const groupDiv = document.createElement('div')
    groupDiv.className = 'all-paragraphs-line'

    linesPerParagraph.forEach(paragraphLines => {
        const sourceLine = paragraphLines[lineIndex]
        if (sourceLine) {
            const clonedLine = sourceLine.cloneNode(true)
            groupDiv.appendChild(clonedLine)
        } else {
            const placeholder = document.createElement('div')
            placeholder.className = 'line'
            groupDiv.appendChild(placeholder)
        }
    })

    allParagraphsContainer.appendChild(groupDiv)
}
```

Once the DOM is built, we cache row groups and two lookup matrices — one for lines, one for characters — so the scrub handler can address any paragraph column by index:

```javascript
const groups = Array.from(allParagraphsContainer.querySelectorAll('.all-paragraphs-line'))
const linesMatrix = groups.map(g => Array.from(g.querySelectorAll('.line')))
const charsMatrix = linesMatrix.map(lines =>
    lines.map(line => Array.from(line.querySelectorAll('.char')))
)
const paragraphCount = linesMatrix[0].length
```

## Scrub crossfade logic

We parse a custom ease for the intra-paragraph ramp, then pin the container and drive everything from scroll progress. The handler runs on every scrub tick:

```javascript
const easeFn = gsap.parseEase('power3.inOut')

ScrollTrigger.create({
    trigger: pinHeight,
    start: 'top top',
    end: 'bottom bottom',
    pin: container,
    scrub: true,
    onUpdate: self => {
        const p = Math.min(1, Math.max(0, self.progress))
        // ...
    }
})
```

We map overall progress to a paragraph pair and a character break index. The eased fractional progress between paragraphs sets how far the letter-by-letter dissolve has travelled:

```javascript
const paraProgress = p * (paragraphCount - 1)
const fromIndex = Math.max(0, Math.floor(paraProgress))
const toIndex = Math.min(paragraphCount - 1, fromIndex + 1)
const intraEased = easeFn(paraProgress - fromIndex)
const charIndex = Math.min(
    maxCharsPerLine,
    Math.max(0, Math.round(intraEased * maxCharsPerLine))
)
const fadeWindow = 3
const toCharIndex = Math.min(
    maxCharsPerLine,
    Math.max(0, charIndex - fadeWindow + 1)
)
```

For each synthetic row, we only touch the outgoing and incoming paragraph columns. Letters to the left of the break fade out over a short window; the incoming column waits until that window finishes before revealing:

```javascript
groups.forEach((_, gi) => {
    const fromChars = charsMatrix[gi][fromIndex]
    const toChars = charsMatrix[gi][toIndex]

    if (fromIndex === toIndex) {
        if (fromChars) fromChars.forEach(c => gsap.set(c, { display: 'inline', opacity: 1 }))
    } else {
        if (intraEased >= 0.999) {
            if (fromChars) fromChars.forEach(c => gsap.set(c, { display: 'none', opacity: 0 }))
            if (toChars) toChars.forEach(c => gsap.set(c, { display: 'inline', opacity: 1 }))
            return
        }

        if (fromChars) {
            fromChars.forEach((c, i) => {
                const d = charIndex - i
                if (i >= charIndex) {
                    gsap.set(c, { display: 'inline', opacity: 1 })
                } else if (d > 0 && d <= fadeWindow) {
                    const opacity = 1 - (d / fadeWindow)
                    gsap.set(c, { display: 'inline', opacity })
                } else {
                    gsap.set(c, { display: 'none', opacity: 0 })
                }
            })
        }

        if (toChars) {
            toChars.forEach((c, i) =>
                gsap.set(c, {
                    display: i < toCharIndex ? 'inline' : 'none',
                    opacity: i < toCharIndex ? 1 : 0
                })
            )
        }
    }
})
```

Because every row shares the same progress math, line-by-line and letter-by-letter crossfades stay locked together for the whole pinned passage.

## Go further

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
