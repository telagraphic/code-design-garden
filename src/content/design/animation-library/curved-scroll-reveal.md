---
title: "Curved scroll reveal"
description: "In this effect, we reveal a paragraph line by line and letter by letter along stacked curved SVG paths as we scroll. Each arc straightens while its character…"
slug: "curved-scroll-reveal"
previewVideo: "curved-scroll-reveal.mp4"
order: 98
published: true
categories: ["filter", "scroll", "text"]
triggers: ["scroll", "load", "mouse-move"]
libraries: ["gsap"]
keywords: ["curved", "scroll", "reveal", "pinned", "letters", "split-text", "timeline", "rotate"]
sourceUrl: "https://madewithgsap.com/effects/tutorial098"
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
<section class="mwg_effect098">
    <p class="scroll">Scroll</p>
    <div class="pin-height">
        <div class="container">
            <p class="placeholder">I look unprofessional, but I don't care because I know that when I'm gonna play it's gonna work</p>
            <div class="paths" aria-hidden="true">
                <svg viewBox="0 0 845 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 74.5322C135.056 25.4113 278.148 0 422.938 0C567.414 0 710.2 25.3004 845 74.2129"/>
                    <text xml:space="preserve" text-anchor="middle" font-size="60">
                        <textPath startOffset="50%"></textPath>
                    </text>
                </svg>
            </div>
            <div class="footer">
                <p>
                    <span>Lewis Ofman</span>
                    <span>Watch me</span>
                </p>
                <img class="papota" src="./assets/medias/lewis.png" alt="">
            </div>
        </div>
    </div>
</section>
```

### CSS
```text
.mwg_effect098 .pin-height {
    height: 500vh;
}
.mwg_effect098 .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    padding: 50vh 0 0;
    overflow: hidden;
}
.mwg_effect098 .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none;
}
.mwg_effect098 .paths {
    width: 70vw;
    height: 70vw;
    text-align: center;
}
.mwg_effect098 .circle {
    aspect-ratio: 1;
    transform: rotate(20deg);
}
.mwg_effect098 .circle + .circle {
    margin-top: -93%;
}
.mwg_effect098 svg {
    width: 100%;
    height: auto;
    overflow: visible;
}
.mwg_effect098 textPath {
    fill: currentColor;
}
```

### Javascript
```text
document.fonts.ready.then(() => {
    const root = document.querySelector('.mwg_effect098')
    const pinHeight = root.querySelector('.pin-height')
    const container = root.querySelector('.container')
    const placeholderEl = root.querySelector('.placeholder')
    const pathsContainer = root.querySelector('.paths')

    const fullText = placeholderEl.textContent.trim()
    const svgTemplate = pathsContainer.querySelector('svg')
    pathsContainer.removeChild(svgTemplate)

    let svgIndex = 0

    function scaleForIndex(index) {
        return Math.max(0.1, 1 - 0.1 * (index - 1))
    }

    function getArcCenter(path) {
        const len = path.getTotalLength()
        const [{ x: ax, y: ay }, { x: bx, y: by }, { x: cx, y: cy }] = [0, len / 2, len].map((t) =>
            path.getPointAtLength(t)
        )
        const a2 = ax * ax + ay * ay
        const b2 = bx * bx + by * by
        const c2 = cx * cx + cy * cy
        const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
        return {
            x: (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d,
            y: (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d,
        }
    }

    function applyArcTransformOrigin(circle, path, scale) {
        const svg = circle.querySelector('svg')
        const vb = svg.viewBox.baseVal
        const center = getArcCenter(path)
        const cxNorm = (center.x - vb.x) / vb.width
        const cyNorm = (center.y - vb.y) / vb.width
        const cxPct = (1 - scale) * 50 + cxNorm * scale * 100
        const cyPct = cyNorm * scale * 100
        circle.style.transformOrigin = \`${cxPct}% ${cyPct}%\`
    }

    function createArc() {
        svgIndex += 1
        const svg = svgTemplate.cloneNode(true)
        const path = svg.querySelector('path')
        const pathId = \`path${svgIndex}\`
        path.id = pathId

        const textPath = svg.querySelector('textPath')
        textPath.setAttribute('href', \`#${pathId}\`)
        textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', \`#${pathId}\`)

        const scale = scaleForIndex(svgIndex)
        svg.querySelector('text').setAttribute('font-size', String(Math.round(65 / scale)))

        const circle = document.createElement('div')
        circle.className = 'circle'
        circle.appendChild(svg)
        pathsContainer.appendChild(circle)

        applyArcTransformOrigin(circle, path, scale)

        return { path, textPath }
    }

    function measureTextLength(textPath, content) {
        textPath.textContent = content
        let length = 0
        if (typeof textPath.getComputedTextLength === 'function') {
            length = textPath.getComputedTextLength()
        }
        if (!length) {
            try {
                const bbox = textPath.getBBox()
                length = bbox ? bbox.width : 0
            } catch (e) {
                length = 0
            }
        }
        return length
    }

    function splitTextAcrossSvgs(text) {
        const words = text.split(/\s+/).filter(Boolean)
        let wordIndex = 0

        while (wordIndex < words.length) {
            const { path, textPath } = createArc()
            const pathLength = path.getTotalLength() * 0.98

            let current = ''
            let lastGood = ''

            while (wordIndex < words.length) {
                const nextWord = words[wordIndex]
                const candidate = current ? current + ' ' + nextWord : nextWord
                const textLength = measureTextLength(textPath, candidate)

                if (textLength <= pathLength) {
                    current = candidate
                    lastGood = candidate
                    wordIndex += 1
                } else {
                    if (!current) {
                        let fit = ''
                        let charIdx = 0
                        while (charIdx < nextWord.length) {
                            const tryFit = fit + nextWord[charIdx]
                            if (measureTextLength(textPath, tryFit) <= pathLength) {
                                fit = tryFit
                                charIdx += 1
                            } else break
                        }
                        if (fit) {
                            current = fit
                            const remaining = nextWord.slice(fit.length)
                            if (remaining) words[wordIndex] = remaining
                            else wordIndex += 1
                        }
                    }
                    break
                }
            }

            textPath.textContent = current || lastGood
        }
    }
    splitTextAcrossSvgs(fullText)

    const master = gsap.timeline({
        scrollTrigger: {
            trigger: pinHeight,
            start: 'top top',
            end: 'bottom bottom',
            pin: container,
            scrub: 1
        }
    })

    const circles = root.querySelectorAll('.circle')
    const texts = []

    circles.forEach(circle => {
        const textPath = circle.querySelector('textPath')
        texts.push(textPath.textContent)
        textPath.textContent = ''
    })

    circles.forEach((circle, i) => {
        const textPath = circle.querySelector('textPath')
        const text = texts[i]

        master.add(gsap.to(circle, {
            rotate: 0,
            ease: 'power2.inOut',
            duration: 2,
            onUpdate() {
                const count = Math.floor(this.progress() * text.length)
                textPath.textContent = text.substring(0, count)
            }
        }), i * (1 / circles.length))
    })
})
```

## Curved scroll reveal #098

In this effect, we reveal a paragraph line by line and letter by letter along stacked curved SVG paths as we scroll. Each arc straightens while its characters type in, building a flowing ribbon of text. Let’s build it!

## HTML Structure

We wrap a scroll hint, a tall pin wrapper, and a viewport-sized container. A placeholder paragraph stores the raw text for measurement while an SVG template defines the arc and an empty `<textPath>` that will carry each line:

```html
<section class="mwg_effect098">
    <p class="scroll">Scroll</p>
    <div class="pin-height">
        <div class="container">
            <p class="placeholder">Your full paragraph lives here.</p>
            <div class="paths" aria-hidden="true">
                <svg viewBox="0 0 845 80" fill="none">
                    <path d="M0 74.5C135 25.4 278 0 423 0c145 0 288 25.3 422 74.2"/>
                    <text>
                        <textPath startOffset="50%"></textPath>
                    </text>
                </svg>
            </div>
            <div class="footer">…</div>
        </div>
    </div>
</section>
```

Here is the path we will use in this effect. It represents a segment of a circle. The letters will move along this curve.

![](https://madewithgsap.com/effects/098/assets/medias/tuto.png)

## Some CSS

The pin wrapper stretches the scroll distance while the container centres the arc field and clips overflow. The placeholder stays invisible so only the SVG lines appear:

```
.mwg_effect098 .pin-height {
    height: 500vh;
}
.mwg_effect098 .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    overflow: hidden;
}
.mwg_effect098 .placeholder {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
}
```

Each cloned arc sits inside a square cell that starts slightly rotated and overlaps the previous row so the curves read as one continuous ribbon:

```
.mwg_effect098 .paths {
    width: 70vw;
    height: 70vw;
}
.mwg_effect098 .circle {
    aspect-ratio: 1;
    transform: rotate(20deg);
}
.mwg_effect098 .circle + .circle {
    margin-top: -93%;
}
.mwg_effect098 svg {
    width: 100%;
    height: auto;
    overflow: visible;
}
```

## Waiting for fonts

We wait for the webfont to load before measuring anything — otherwise the text lengths would be wrong. We grab the placeholder copy, keep the SVG template, and remove it from the DOM:

```javascript
document.fonts.ready.then(() => {
    const root = document.querySelector('.mwg_effect098')
    const pathsContainer = root.querySelector('.paths')
    const fullText = root.querySelector('.placeholder').textContent.trim()

    const svgTemplate = pathsContainer.querySelector('svg')
    pathsContainer.removeChild(svgTemplate)

    let svgIndex = 0
    // arc cloning runs next
})
```

## Cloning arcs

For each line of text we clone the SVG template, assign a unique path ID, and shrink the font size proportionally so later rows look smaller. Each clone lands in its own `.circle` wrapper:

```javascript
function createArc() {
    svgIndex += 1
    const svg = svgTemplate.cloneNode(true)
    const path = svg.querySelector('path')
    const pathId = \`path${svgIndex}\`
    path.id = pathId

    const textPath = svg.querySelector('textPath')
    textPath.setAttribute('href', \`#${pathId}\`)

    const scale = Math.max(0.1, 1 - 0.1 * (svgIndex - 1))
    svg.querySelector('text').setAttribute('font-size', String(Math.round(65 / scale)))

    const circle = document.createElement('div')
    circle.className = 'circle'
    circle.appendChild(svg)
    pathsContainer.appendChild(circle)

    return { path, textPath }
}
```

A small helper measures how wide a string renders along the `textPath`:

```javascript
function measureTextLength(textPath, content) {
    textPath.textContent = content
    return textPath.getComputedTextLength?.() || textPath.getBBox().width
}
```

## Fitting words on paths

We split the full text into words and greedily fill each arc until the measured width exceeds the path length. When a line is full, we create a new arc and continue:

```javascript
const words = fullText.split(/\s+/).filter(Boolean)
let wordIndex = 0

while (wordIndex < words.length) {
    const { path, textPath } = createArc()
    const pathLength = path.getTotalLength() * 0.98
    let current = ''

    while (wordIndex < words.length) {
        const candidate = current ? current + ' ' + words[wordIndex] : words[wordIndex]
        if (measureTextLength(textPath, candidate) <= pathLength) {
            current = candidate
            wordIndex += 1
        } else break
    }
    textPath.textContent = current
}
```

## Pinning the scene

We pin the container for the tall wrapper and create a master timeline scrubbed to scroll progress. We also collect each arc’s text and clear it so the typewriter can reveal it later:

```javascript
const pinHeight = root.querySelector('.pin-height')
const container = root.querySelector('.container')

const master = gsap.timeline({
    scrollTrigger: {
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        scrub: 1
    }
})

const circles = root.querySelectorAll('.circle')
const texts = []

circles.forEach(circle => {
    const textPath = circle.querySelector('textPath')
    texts.push(textPath.textContent)
    textPath.textContent = ''
})
```

## Typing along the curves

For each arc we add a tween that rotates the circle upright while an `onUpdate` callback counts how many characters should be visible — which reads as the line typing itself along the curve:

```javascript
circles.forEach((circle, i) => {
    const textPath = circle.querySelector('textPath')
    const text = texts[i]

    master.add(gsap.to(circle, {
        rotate: 0,
        ease: 'power2.inOut',
        duration: 2,
        onUpdate() {
            const count = Math.floor(this.progress() * text.length)
            textPath.textContent = text.substring(0, count)
        }
    }), i * (1 / circles.length))
})
```

## Go further

In this example, I used the Lenis smooth scroll to further enhance the fluidity and sliding effect. If you’d like to implement it as well, visit our [Go Further](https://madewithgsap.com/go-further) page to learn how to easily add it.
