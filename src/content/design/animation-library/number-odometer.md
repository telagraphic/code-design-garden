---
title: "Number Odometer"
description: "Number Odometer."
slug: "number-odometer"
previewVideo: "number-odometer.mp4"
order: 49.893
published: true
categories: ["scroll", "text", "media"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["number", "odometer"]
sourceUrl: "https://www.osmo.supply/resource/number-odometer"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<div data-odometer-group>
  <h1 data-odometer-element data-odometer-duration="2" data-odometer-start="€0" class="odometer-h1">€248.750</h1>
</div>
```
### CSS
```text
.odometer-h1 {
  margin-top: 0;
  margin-bottom: 0;
  font-family: Haffer, Arial, sans-serif;
  font-size: 8vw;
  font-weight: 600;
  line-height: 1;
}
[data-odometer-element] {
  display: inline-flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
}
[data-odometer-part="mask"], 
[data-odometer-part="static"] {
  display: inline-block;
  overflow: clip;
  padding: 0.05em;
  margin: -0.05em;
}
[data-odometer-part="roller"] {
  display: block;
  white-space: pre;
  text-align: center;
  will-change: transform;
}
[data-odometer-part="static"] {
  display: inline-block;
}
```
### Javascript
```javascript
// Resource
function initNumberOdometer() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const initFlag = 'data-odometer-initialized'
  const activeTweens = new WeakMap()
  // Configuration
  const defaults = {
    duration: 1,
    ease: 'power3.out',
    elementStagger: 0.1,
    digitStagger: 0.04,
    revealDuration: 0.5,
    revealEase: 'power2.out',
    triggerStart: 'top 80%',
    staggerOrder: 'left',
    digitCycles: 2
  }
  // Scroll-triggered groups
  document.querySelectorAll('[data-odometer-group]').forEach(group => {
    if (group.hasAttribute(initFlag)) return
    group.setAttribute(initFlag, '')
    const elements = Array.from(group.querySelectorAll('[data-odometer-element]'))
    if (!elements.length || prefersReducedMotion) return
    const staggerOrder = group.getAttribute('data-odometer-stagger-order') || defaults.staggerOrder
    const triggerStart = group.getAttribute('data-odometer-trigger-start') || defaults.triggerStart
    const elementStagger = parseFloat(group.getAttribute('data-odometer-stagger')) || defaults.elementStagger
    const elementData = elements.map(el => {
      const originalText = el.textContent.trim()
      const hasExplicitStart = el.hasAttribute('data-odometer-start')
      const startValue = parseFloat(el.getAttribute('data-odometer-start')) || 0
      const duration = parseFloat(el.getAttribute('data-odometer-duration')) || defaults.duration
      const step = getLineHeightRatio(el)
      let segments = parseSegments(originalText)
      segments = mapStartDigits(segments, startValue)
      segments = markHiddenSegments(segments, startValue)
      const grow = shouldGrow(el, hasExplicitStart, startValue, segments)
      const { rollers, revealEls } = buildRollerDOM(el, segments, step, grow)
      const fontSize = parseFloat(getComputedStyle(el).fontSize)
      const revealData = revealEls.map(revealEl => {
        const widthEm = revealEl.offsetWidth / fontSize
        gsap.set(revealEl, { width: 0, overflow: 'hidden' })
        return { el: revealEl, widthEm }
      })
      return { el, rollers, duration, step, revealData, originalText }
    })
    const ordered = applyStaggerOrder(elementData, staggerOrder)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: group,
        start: triggerStart,
        once: true
      },
      onComplete() {
        elementData.forEach(({ el, originalText, step }) => {
          cleanupElement(el, originalText)
        })
      }
    })
    ordered.forEach((data, orderIdx) => {
      const { rollers, duration, step, revealData } = data
      const offset = orderIdx * elementStagger
      revealData.forEach(({ el, widthEm }) => {
        tl.to(el, {
          width: widthEm + 'em',
          opacity: 1,
          duration: defaults.revealDuration,
          ease: defaults.revealEase
        }, offset)
      })
      rollers.forEach(({ roller, targetPos }, digitIdx) => {
        const reversedIdx = rollers.length - 1 - digitIdx
        tl.to(roller, {
          y: -targetPos * step + 'em',
          duration,
          ease: defaults.ease,
          force3D: true
        }, offset + reversedIdx * defaults.digitStagger)
      })
    })
  })
  // Programmatic update (optional add-on)
  return function updateOdometer(el, newText, options = {}) {
    const currentText = el.textContent.trim()
    if (currentText === newText) return
    const duration = options.duration || defaults.duration
    const ease = options.ease || defaults.ease
    const step = getLineHeightRatio(el)
    // Kill any running animation and clear its inline style locks
    const existing = activeTweens.get(el)
    if (existing) {
      existing.kill()
      gsap.set(el, { clearProps: 'width,overflow' })
    }
    // Measure current width before rebuilding (in em for responsive scaling)
    const fontSize = parseFloat(getComputedStyle(el).fontSize)
    const oldWidthEm = el.getBoundingClientRect().width / fontSize
    // Parse current text as start, new text as end
    const startSegments = parseSegments(currentText)
    const startDigitsStr = startSegments
      .filter(s => s.type === 'digit')
      .map(s => s.char)
      .join('')
    const startValue = parseInt(startDigitsStr, 10) || 0
    let segments = parseSegments(newText)
    segments = mapStartDigits(segments, startValue)
    segments = markHiddenSegments(segments, startValue)
    const { rollers, revealEls } = buildRollerDOM(el, segments, step, true)
    // Measure new natural width (in em)
    const newWidthEm = el.getBoundingClientRect().width / fontSize
    const widthChanged = Math.abs(oldWidthEm - newWidthEm) > 0.01
    // Lock to old width for smooth transition
    if (widthChanged) {
      gsap.set(el, { width: oldWidthEm + 'em', overflow: 'hidden' })
    }
    const tl = gsap.timeline({
      onComplete() {
        cleanupElement(el, newText)
        activeTweens.delete(el)
      }
    })
    activeTweens.set(el, tl)
    // Animate element width
    if (widthChanged) {
      tl.to(el, {
        width: newWidthEm + 'em',
        duration: defaults.revealDuration,
        ease: defaults.revealEase
      }, 0)
    }
    // Fade in hidden statics
    revealEls.forEach(revealEl => {
      if (revealEl.getAttribute('data-odometer-part') === 'static') {
        tl.to(revealEl, { opacity: 1, duration: 0.2 }, 0)
      }
    })
    // Roll digits
    rollers.forEach(({ roller, targetPos }, digitIdx) => {
      const reversedIdx = rollers.length - 1 - digitIdx
      tl.to(roller, {
        y: -targetPos * step + 'em',
        duration,
        ease,
        force3D: true
      }, reversedIdx * defaults.digitStagger)
    })
  }
  // Helpers
  function getLineHeightRatio(el) {
    const cs = getComputedStyle(el)
    const lh = cs.lineHeight
    if (lh === 'normal') return 1.2
    return parseFloat(lh) / parseFloat(cs.fontSize)
  }
  function parseSegments(text) {
    return [...text].map(char => ({
      type: /\d/.test(char) ? 'digit' : 'static',
      char
    }))
  }
  function mapStartDigits(segments, startValue) {
    const digitSlots = segments.filter(s => s.type === 'digit')
    const padded = String(Math.floor(Math.abs(startValue)))
      .padStart(digitSlots.length, '0')
      .slice(-digitSlots.length)
    let di = 0
    return segments.map(s =>
      s.type === 'digit'
        ? { ...s, startDigit: parseInt(padded[di++], 10) }
        : s
    )
  }
  function markHiddenSegments(segments, startValue) {
    const totalDigits = segments.filter(s => s.type === 'digit').length
    const absStart = Math.floor(Math.abs(startValue))
    const startDigitCount = absStart === 0 ? 1 : String(absStart).length
    const leadingZeros = Math.max(0, totalDigits - startDigitCount)
    if (leadingZeros === 0) return segments
    let digitsSeen = 0
    let firstDigitSeen = false
    let prevDigitHidden = false
    return segments.map(seg => {
      if (seg.type === 'digit') {
        firstDigitSeen = true
        const hidden = digitsSeen < leadingZeros
        prevDigitHidden = hidden
        digitsSeen++
        return { ...seg, hidden }
      }
      const hidden = firstDigitSeen && prevDigitHidden
      return { ...seg, hidden }
    })
  }
  function shouldGrow(el, hasExplicitStart, startValue, segments) {
    if (el.hasAttribute('data-odometer-grow')) {
      return el.getAttribute('data-odometer-grow') !== 'false'
    }
    if (!hasExplicitStart) return false
    const absStart = Math.floor(Math.abs(startValue))
    const startDigitCount = absStart === 0 ? 1 : String(absStart).length
    const endDigitCount = segments.filter(s => s.type === 'digit').length
    return startDigitCount < endDigitCount
  }
  function buildRollerDOM(el, segments, step, grow) {
    el.innerHTML = ''
    el.style.height = ''
    const rollers = []
    const revealEls = []
    const totalCells = 10 * defaults.digitCycles
    segments.forEach(seg => {
      if (seg.type === 'static') {
        const span = document.createElement('span')
        span.setAttribute('data-odometer-part', 'static')
        span.style.height = step + 'em'
        span.style.lineHeight = step
        span.textContent = seg.char
        el.appendChild(span)
        if (grow && seg.hidden) {
          gsap.set(span, { opacity: 0 })
          revealEls.push(span)
        }
        return
      }
      const mask = document.createElement('span')
      mask.setAttribute('data-odometer-part', 'mask')
      mask.style.height = step + 'em'
      mask.style.lineHeight = step
      const roller = document.createElement('span')
      roller.setAttribute('data-odometer-part', 'roller')
      roller.style.lineHeight = step
      const digits = []
      for (let d = 0; d < totalCells; d++) {
        digits.push(d % 10)
      }
      roller.textContent = digits.join('\n')
      mask.appendChild(roller)
      el.appendChild(mask)
      const startDigit = seg.startDigit || 0
      const isReveal = grow && seg.hidden
      gsap.set(roller, { y: isReveal ? step + 'em' : -startDigit * step + 'em' })
      const endDigit = parseInt(seg.char, 10)
      const targetPos = endDigit > startDigit ? endDigit : 10 + endDigit
      rollers.push({ roller, targetPos })
      if (isReveal) revealEls.push(mask)
    })
    return { rollers, revealEls }
  }
  function cleanupElement(el, originalText) {
    el.style.overflow = ''
    el.style.height = ''
    // Remove rollers, set final digit, clear inline bloat (but preserve width)
    const digits = [...originalText].filter(c => /\d/.test(c))
    let di = 0
    el.querySelectorAll('[data-odometer-part="mask"]').forEach(mask => {
      const roller = mask.querySelector('[data-odometer-part="roller"]')
      if (roller) roller.remove()
      mask.textContent = digits[di++] || ''
      mask.style.opacity = ''
      mask.style.overflow = ''
    })
    el.querySelectorAll('[data-odometer-part="static"]').forEach(stat => {
      stat.style.opacity = ''
    })
  }
  function recalcOnResize() {
    document.querySelectorAll('[data-odometer-element]').forEach(el => {
      // Force-complete any running programmatic animation
      const running = activeTweens.get(el)
      if (running) {
        running.progress(1)
        activeTweens.delete(el)
      }
      const hasRollers = el.querySelector('[data-odometer-part="roller"]')
      if (hasRollers) {
        // Pre-triggered: recalculate step-based inline styles
        const step = getLineHeightRatio(el)
        el.querySelectorAll('[data-odometer-part="mask"]').forEach(mask => {
          mask.style.height = step + 'em'
          mask.style.lineHeight = step
        })
        el.querySelectorAll('[data-odometer-part="roller"]').forEach(roller => {
          roller.style.lineHeight = step
        })
        el.querySelectorAll('[data-odometer-part="static"]').forEach(stat => {
          stat.style.lineHeight = step
        })
      }
      // Completed elements: width is em-based, scales automatically, don't touch
    })
    ScrollTrigger.refresh()
  }
  let resizeTimer
  let lastWidth = window.innerWidth
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      recalcOnResize()
    }, 250)
  })
  function applyStaggerOrder(items, order) {
    const arr = [...items]
    if (order === 'right') return arr.reverse()
    if (order === 'random') return shuffleArray(arr)
    return arr
  }
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }
}
// Initialize Number Odometer
document.addEventListener("DOMContentLoaded", () => {
  initNumberOdometer();
})
```
### CSS
```text
[data-odometer-element] {
  display: inline-flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
}
[data-odometer-part="mask"], 
[data-odometer-part="static"] {
  display: inline-block;
  overflow: clip;
  padding: 0.05em;
  margin: -0.05em;
}
[data-odometer-part="roller"] {
  display: block;
  white-space: pre;
  text-align: center;
  will-change: transform;
}
[data-odometer-part="static"] {
  display: inline-block;
}
```
### Implementation
This script creates a rolling odometer animation for numbers on scroll. Digits roll through a vertical strip like a mechanical counter, landing on the target value when the element enters the viewport. It works with any number format, including commas, periods, currency symbols, and percentage signs.
#### Group
Add `[data-odometer-group]` to any parent element that wraps your odometer numbers. This element acts as the scroll trigger, when it enters the viewport, all odometer elements inside it animate together with a staggered delay.
### HTML
```text
<div data-odometer-group>
  <h2 data-odometer-element>1,250</h2> 
  <h2 data-odometer-element>500</h2>
  <h2 data-odometer-element>99%</h2>
</div>
```
#### Element
Add `[data-odometer-element]` to any element that contains a number you want to animate. The text content of this element is the end value the odometer will land on. Any non-digit characters like commas, periods, currency symbols, or letters stay in place while the digits roll. This means both US format (1,000.50) and European format (1.000,50) work without any configuration.
#### Start
Use `[data-odometer-start]` to define a custom number to start counting from instead of 0. If the start value has fewer digits than the end value, the extra digit columns will automatically expand into view during the animation.
### HTML
```text
<h2 data-odometer-element data-odometer-start="900">1,250+</h2>
```
#### Duration
Use `[data-odometer-duration]` to control how long the digit roll takes in seconds. Each element can have its own duration. The default is 1 second.
#### Grow
Use `[data-odometer-grow]` to manually control whether extra digit columns animate their width when the start and end values have different digit counts. This is auto-detected when using `[data-odometer-start]`, so you typically do not need this. Set `[data-odometer-grow="false"]` to disable the width animation and show all digit positions padded with zeros from the start.
#### Stagger order
Use `[data-odometer-stagger-order]` on the group element to control the order in which elements begin animating. Accepts `left` (default), `right`, or `random`.`‍`
### HTML
```text
<div data-odometer-group data-odometer-stagger-order="right">
  <p data-odometer-element>250</p>
  <p data-odometer-element>1,500</p>
</div>
```
#### Stagger timing
Use `[data-odometer-stagger]` on the group element to set the delay in seconds between each element starting its animation. The default is 0.1 seconds.
#### Trigger position
Use `[data-odometer-trigger-start]` on the group element to define when the scroll animation triggers. Accepts any valid ScrollTrigger start value. The default is `top 80%`.`‍   `
#### Number formats
Any non-digit character is treated as a static character. It stays in place while the digits roll. Commas and periods are not hardcoded, so whatever you write in the HTML is what you get.`‍   `
### HTML
```text
<p data-odometer-element>+120</p>
<p data-odometer-element>42K</p>
<p data-odometer-element>€2,500+</p>
<p data-odometer-element>€12.499,95</p>
```
#### Configuration
At the top of the function you will find a `defaults` object. These are the global defaults that apply when no data attribute overrides them. Edit these values to match your project.`‍`
- `duration` controls how long each digit roll takes in seconds. Default is `1`.`‍`
- `ease` sets the GSAP easing for the digit roll. Default is `power3.out`.`‍`
- `elementStagger` is the delay between each element in a group. Default is `0.1`.`‍`
- `digitStagger` is the delay between each digit within an element, rolling right to left. Default is `0.04`.`‍`
- `revealDuration` controls how long the column expand animation takes when the digit count grows. Default is `0.6`.`‍`
- `revealEase` sets the easing for the column expand. Default is `power2.out`.`‍`
- `triggerStart` defines when the scroll animation triggers. Default is `top 80%`.`‍`
- `staggerOrder` sets the default stagger direction. Default is `left`.`‍`
- `digitCycles` controls how many times 0 through 9 is repeated in each roller strip. Default is `2`, which means every digit always rolls forward.
#### Accessibility
If the user has prefers-reduced-motion enabled in their operating system, the animation is skipped entirely. The numbers display their end values immediately.
#### Re-initialization
It is safe to call `initNumberOdometer()` multiple times, for example after a page transition with Barba.js. Groups that have already been initialized are skipped automatically.
#### DOM cleanup
During the animation, each digit position creates a small roller element inside the DOM. After the animation completes, the rollers are automatically removed and replaced with the final digit text. This keeps the DOM lean on pages with many odometers.
#### Programmatic updates
If you want to update a number from JavaScript instead of on scroll, for example on a button click or after filtering a list, the function supports an optional return value.
To enable this, change your initialization from this:
### Javascript
```javascript
document.addEventListener("DOMContentLoaded", () => {
  initNumberOdometer();
})
```
`‍` To this:
### Javascript
```javascript
document.addEventListener("DOMContentLoaded", () => {
  const updateOdometer = initNumberOdometer()
})
```
The returned function accepts any element as the first argument and a string as the second. The string is the new value exactly as you want it displayed, including any commas, currency symbols, or suffixes. The function reads whatever text is currently in the element as the starting point and animates to the new value.`‍   `
### Javascript
```javascript
const el = document.querySelector('.my-counter')
updateOdometer(el, '1,250')
updateOdometer(el, '€2,500+')
updateOdometer(el, '7')
```
You can optionally pass a third argument with `duration` and `ease` overrides.
### Javascript
```javascript
updateOdometer(el, '10,482', { duration: 1.5, ease: 'power3.out' })
```
The element does not need to be inside a `[data-odometer-group]`. It does need `[data-odometer-element]` for the CSS to apply. The function handles different digit counts, changing prefixes and suffixes, and smooth width transitions automatically. Calling it rapidly is safe; any running animation is interrupted cleanly before the next one starts.
The programmatic update function is already included inside `initNumberOdometer`. If you do not store the return value, it simply goes unused. No code needs to be removed.