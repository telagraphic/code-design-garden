---
title: "Sticky Title Scroll Effect"
description: "Large title stays pinned while content scrolls beneath it."
slug: "sticky-title-scroll-effect"
previewVideo: "sticky-title-scroll-effect.mp4"
order: 101
published: true
categories: ["text", "scroll"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["sticky", "title", "typography"]
sourceUrl: "https://www.osmo.supply/resource/sticky-title-scroll-effect"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
```
### HTML
```text
<section data-sticky-title="wrap" class="sticky-title-wrapper">
  <div class="sticky-title-container">
    <div class="sticky-title-inner">
      <h2 data-sticky-title="heading" class="sticky-title-el">Use this effect to really emphasize your message</h2>
      <h2 data-sticky-title="heading" class="sticky-title-el is--stacked">You can layer multiple headings on each other</h2>
      <h2 data-sticky-title="heading" class="sticky-title-el is--stacked">Add as many as you want, but I like the balance of 3</h2>
    </div>
  </div>
</section>
```
### CSS
```text
.sticky-title-wrapper {
  background-image: linear-gradient(#000, #777);
  width: 100%;
  height: 350vh;
  position: relative;
}
.sticky-title-container {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-left: 1.5em;
  padding-right: 1.5em;
  display: flex;
  position: sticky;
  top: 0;
}
.sticky-title-inner {
  text-align: center;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 60em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  position: relative;
}
.sticky-title-el {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 5em;
  font-weight: 500;
  line-height: 1;
}
.sticky-title-el.is--stacked {
  visibility: hidden;
  position: absolute;
}
@media screen and (max-width: 767px) {
  .sticky-title-el {
    font-size: 3.5em;
  }
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger, SplitText)
function initStickyTitleScroll() {
  const wraps = document.querySelectorAll('[data-sticky-title="wrap"]');
  wraps.forEach(wrap => {
    const headings = Array.from(wrap.querySelectorAll('[data-sticky-title="heading"]'));
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top 40%",
        end: "bottom bottom",
        scrub: true,
      }
    });
    const revealDuration = 0.7,
          fadeOutDuration = 0.7,
          overlapOffset = 0.15;
    headings.forEach((heading, index) => {
      // Save original heading content for screen readers
      heading.setAttribute("aria-label", heading.textContent);
      const split = new SplitText(heading, { type: "words,chars" });
      // Hide all the separate words from screenreader
      split.words.forEach(word => word.setAttribute("aria-hidden", "true"));
      // Reset visibility on the 'stacked' headings
      gsap.set(heading, { visibility: "visible" });
      const headingTl = gsap.timeline();
      headingTl.from(split.chars, {
        autoAlpha: 0,
        stagger: { amount: revealDuration, from: "start" },
        duration: revealDuration
      });
      // Animate fade-out for every heading except the last one.
      if (index < headings.length - 1) {
        headingTl.to(split.chars, {
          autoAlpha: 0,
          stagger: { amount: fadeOutDuration, from: "end" },
          duration: fadeOutDuration
        });
      }
      // Overlap the start of fade-in of the new heading a little bit
      if (index === 0) {
        masterTl.add(headingTl);
      } else {
        masterTl.add(headingTl, \`-=${overlapOffset}\`);
      }
    });
  });
}
// Initialize Sticky Title Scroll Effect
document.addEventListener("DOMContentLoaded", () => {
  initStickyTitleScroll();
});
```
### Documentation
This creates a smooth, scroll-based text animation where multiple stacked headings are revealed sequentially. The headings animate in and out using GSAP’s ScrollTrigger and SplitText, emphasizing your content as users scroll.  
#### HTML Structure & Requirements
- **Wrapper Element:**
	- Use an element with the attribute `data-sticky-title="wrap"`.
	- Set its height to define the scrolling area (for example, `height: 300vh`; or any value you decide based on the number of headings).
- **Sticky Container:**
	- Inside the wrapper, include a sticky container (e.g., <div class="sticky-title-container">).
	- **Important:** Ensure that no parent element has overflow: hidden, as this is crucial for the sticky behavior to work properly.
- **Headings:**
	- Add your headings with the attribute `data-sticky-title="heading"`.
	- In CSS, the headings meant to stack are hidden (for example, using classes like `.is--stacked` which set `visibility: hidden` and `position: absolute`).
	- This structure allows you to have as many headings as you want; just make sure you update the height of the wrapper accordingly.
#### How It Works
1. **Dynamic Setup:**
	- The resource scans for all wrappers and their respective headings on the page.
2. **SplitText & ARIA:**
	- Each heading is split into words and characters using GSAP’s SplitText, while the full text is preserved in an `aria-label` for accessibility.
	- The individual words are hidden from screen readers via `aria-hidden="true"`.
3. **Animation Timeline:**
	- A master timeline (per wrapper) handles the sequential animation.
	- Each heading fades in first (revealing the characters in sequence) and, if it’s not the final heading, fades out (with characters disappearing in reverse order) before the next heading starts its reveal.
	- A slight overlap can be implemented between fade-out and the next fade-in for a more dynamic transition.
#### Useful Tip
For an extra smooth scroll effect, consider integrating [Lenis](https://www.osmo.supply/resource/lenis-smooth-scroll-setup) for smooth scrolling.
Osmo