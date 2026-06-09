---
title: "Footer Parallax"
description: "Footer Parallax."
slug: "footer-parallax"
previewVideo: "footer-parallax.mp4"
order: 49.918
published: true
categories: ["utility"]
triggers: ["scroll"]
libraries: ["gsap"]
keywords: ["footer", "parallax"]
sourceUrl: "https://www.osmo.supply/resource/footer-parallax-effect"
---
## Setup
### Scripts
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```
# Step 1: Add HTML
### HTML
```html
<main class="demo-main">
  <section class="demo-header">
    <div class="demo-header__nav-row">
      <div class="demo-header__logo">
      </div>
      <p data-underline-link="" class="demo-header__nav-a">Navigation</p>
    </div>
    <div class="demo-header__title-row">
      <h1 class="demo-header__h1">The footer marks the end of the scroll, but not the end of the story.</h1>
    </div>
    <div class="demo-header__info-row">
      <div class="demo-header__col">
        <p class="demo-eyebrow">( Concept )</p>
      </div>
      <div class="demo-header__col">
        <p class="demo-p">Parallax adds a sense of depth and motion that feels natural to the human eye. By shifting elements at different speeds, we create a layered world that reacts to scroll. It’s subtle, but powerful — turning static sections into dynamic experiences.</p>
        <p data-underline-link="" class="demo-eyebrow">Scroll down ↓</p>
      </div>
      <div class="demo-header__col">
      </div>
    </div>
  </section>
  <div data-footer-parallax="" class="footer-wrap">
    <footer data-footer-parallax-inner="" class="demo-footer">
      <div class="demo-footer__links-row">
        <div class="demo-footer__col">
          <p class="demo-eyebrow">( Pages )</p>
          <div class="demo-footer__links">
            <a data-underline-link="" href="#" class="demo-footer__a">Home</a>
            <a data-underline-link="" href="#" class="demo-footer__a">Resources</a>
            <a data-underline-link="" href="#" class="demo-footer__a">About</a>
            <a data-underline-link="" href="#" class="demo-footer__a">Platform</a>
            <a data-underline-link="" href="#" class="demo-footer__a">Login</a>
          </div>
        </div>
        <div class="demo-footer__col">
          <p class="demo-eyebrow">( Socials )</p>
          <div class="demo-footer__links">
            <a data-underline-link="" href="#" class="demo-footer__a">LinkedIn</a>
            <a data-underline-link="" href="#" class="demo-footer__a">Instagram</a>
            <a data-underline-link="" href="#" class="demo-footer__a">X/Twitter</a>
          </div>
        </div>
        <div class="demo-footer__col">
          <p class="demo-eyebrow">( Contact )</p>
          <div class="demo-footer__links">
            <a data-underline-link="" href="#" class="demo-footer__a">hello@osmo.supply</a>
            <a data-underline-link="" href="#" class="demo-footer__a">+31 6 12 34 56 78</a>
          </div>
        </div>
      </div>
      <div class="demo-footer__logo-row">
        <p class="demo-eyebrow">Not your typical platform</p>
      </div>
    </footer>
    <div data-footer-parallax-dark="" class="footer-wrap__dark"></div>
  </div>
</main>
```
# Step 2: Add CSS
### CSS
```css
.demo-main {
  overflow: clip;
}
.demo-eyebrow {
  opacity: .5;
  margin-bottom: 0;
  font-size: 1.3125em;
  font-weight: 600;
}
.demo-p {
  max-width: 19em;
  margin-bottom: 0;
  font-size: 1.3125em;
  font-weight: 600;
}
.demo-header {
  grid-column-gap: 7.5em;
  grid-row-gap: 7.5em;
  letter-spacing: -.02em;
  border-bottom: 1px solid #201d1d26;
  flex-flow: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100svh;
  padding: 2.5em;
  font-weight: 600;
  display: flex;
  position: relative;
}
.demo-header__nav-row {
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
}
.demo-header__title-row {
  grid-column-gap: 2.5em;
  grid-row-gap: 2.5em;
  padding-left: calc(33.3333% + .833333em);
  display: flex;
}
.demo-header__info-row {
  grid-column-gap: 2.5em;
  grid-row-gap: 2.5em;
  display: flex;
}
.demo-header__col {
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  flex-flow: column;
  justify-content: space-between;
  width: calc(33.3333% - 1.66667em);
  display: flex;
}
.demo-header__h1 {
  letter-spacing: -.03em;
  max-width: 11em;
  font-size: 4em;
  font-weight: 600;
  line-height: .95;
}
.demo-header__img {
  aspect-ratio: 3 / 2;
  object-fit: cover;
  width: 100%;
}
.demo-header__logo {
  width: 15em;
}
.demo-header__nav-a {
  margin-bottom: 0;
  font-size: 1.3125em;
  font-weight: 600;
}
.footer-wrap {
  position: relative;
  overflow: hidden;
}
.demo-footer {
  grid-column-gap: 7.5em;
  grid-row-gap: 7.5em;
  letter-spacing: -.02em;
  flex-flow: column;
  justify-content: space-between;
  min-height: 100svh;
  padding: 2.5em;
  font-weight: 600;
  display: flex;
  position: relative;
}
.demo-footer__links-row {
  grid-column-gap: 2.5em;
  grid-row-gap: 2.5em;
  display: flex;
}
.demo-footer__logo-row {
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  flex-flow: column;
  display: flex;
}
.demo-footer__col {
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  flex-flow: column;
  width: calc(33.3333% - 1.66667em);
  display: flex;
}
.demo-footer__links {
  grid-column-gap: .25em;
  grid-row-gap: .25em;
  flex-flow: column;
  align-items: flex-start;
  display: flex;
}
.demo-footer__a {
  color: inherit;
  font-size: 2.75em;
  line-height: 1;
  text-decoration: none;
}
.footer-wrap__dark {
  opacity: 0;
  pointer-events: none;
  background-color: #201d1d;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
@media screen and (max-width: 991px) {
  .demo-header__title-row {
    padding-left: 0;
  }
  .demo-header__info-row {
    flex-flow: column;
  }
  .demo-header__col {
    width: 100%;
  }
  .demo-header__logo {
    width: 50vw;
  }
  .demo-footer__links-row {
    flex-flow: column;
  }
  .demo-footer__logo-row {
    grid-column-gap: 1.5em;
    grid-row-gap: 1.5em;
  }
  .demo-footer__col {
    width: 100%;
  }
}
@media screen and (max-width: 767px) {
  .demo-eyebrow {
    font-size: 1em;
  }
  .demo-p {
    max-width: 100%;
    font-size: 1.25em;
  }
  .demo-header {
    grid-column-gap: 5em;
    grid-row-gap: 5em;
    padding-left: 1em;
    padding-right: 1em;
  }
  .demo-footer {
    padding-left: 1em;
    padding-right: 1em;
  }
  .demo-eyebrow {
    font-size: 1em;
  }
  .demo-footer__col {
    grid-column-gap: 1em;
    grid-row-gap: 1em;
  }
  .demo-footer__a {
    font-size: 1.75em;
  }
  .demo-header__info-row {
    grid-column-gap: 1em;
    grid-row-gap: 1em;
  }
  .demo-header__h1 {
    font-size: 3em;
  }
  .demo-header__nav-a {
    max-width: 100%;
    font-size: 1em;
  }
}
/* ------------------------- Scaling System by Osmo [https://osmo.supply/] -------------------------  */
/* Desktop */
:root {
  --size-unit: 16; /* body font-size in design - no px */
  --size-container-ideal: 1440; /* screen-size in design - no px */
  --size-container-min: 992px;
  --size-container-max: 1920px;
  --size-container: clamp(var(--size-container-min), 100vw, var(--size-container-max));
  --size-font: calc(var(--size-container) / (var(--size-container-ideal) / var(--size-unit)));
}
/* Tablet */
@media screen and (max-width: 991px) {
  :root {
    --size-container-ideal: 834; /* screen-size in design - no px */
    --size-container-min: 768px;
    --size-container-max: 991px;
  }
}
/* Mobile Landscape */
@media screen and (max-width: 767px) {
  :root {
    --size-container-ideal: 390; /* screen-size in design - no px */
    --size-container-min: 480px;
    --size-container-max: 767px;
  }
}
/* Mobile Portrait */
@media screen and (max-width: 479px) {
  :root {
    --size-container-ideal: 390; /* screen-size in design - no px */
    --size-container-min: 320px;
    --size-container-max: 479px;
  }
}
/* ------------------------- Underline Link [https://osmo.supply/] -------------------------  */
[data-underline-link] {
  text-decoration: none;
  position: relative;
}
[data-underline-link]::before {
  content: "";
  position: absolute;
  bottom: -0.0625em;
  left: 0;
  width: 100%;
  height: 0.1em;
  background-color: currentColor;
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform-origin: right;
  transform: scaleX(0) rotate(0.001deg);
}
@media (hover: hover) and (pointer: fine) {
  [data-hover]:hover [data-underline-link]::before,
  [data-underline-link]:hover::before {
    transform-origin: left;
    transform: scaleX(1) rotate(0.001deg);
  }  
}
```
# Step 3: Add Javascript
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger);
function initFooterParallax(){
  document.querySelectorAll('[data-footer-parallax]').forEach(el => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'clamp(top bottom)',
        end: 'clamp(top top)',
        scrub: true
      }
    });
    const inner = el.querySelector('[data-footer-parallax-inner]');
    const dark  = el.querySelector('[data-footer-parallax-dark]');
    if (inner) {
      tl.from(inner, {
        yPercent: -25,
        ease: 'linear'
      });
    }
    if (dark) {
      tl.from(dark, {
        opacity: 0.5,
        ease: 'linear'
      }, '<');
    }
  });
}
// Initialize Footer with Parallax Effect
document.addEventListener('DOMContentLoaded', () => {
  initFooterParallax();
});
```
# Font Scaling
### Javascript
```css
/* Note: Both of the sets of CSS are not needed for the parallax effect */
/* ------------------------- Scaling System by Osmo [https://osmo.supply/] -------------------------  */
/* Desktop */
:root {
  --size-unit: 16; /* body font-size in design - no px */
  --size-container-ideal: 1440; /* screen-size in design - no px */
  --size-container-min: 992px;
  --size-container-max: 1920px;
  --size-container: clamp(var(--size-container-min), 100vw, var(--size-container-max));
  --size-font: calc(var(--size-container) / (var(--size-container-ideal) / var(--size-unit)));
}
/* Tablet */
@media screen and (max-width: 991px) {
  :root {
    --size-container-ideal: 834; /* screen-size in design - no px */
    --size-container-min: 768px;
    --size-container-max: 991px;
  }
}
/* Mobile Landscape */
@media screen and (max-width: 767px) {
  :root {
    --size-container-ideal: 390; /* screen-size in design - no px */
    --size-container-min: 480px;
    --size-container-max: 767px;
  }
}
/* Mobile Portrait */
@media screen and (max-width: 479px) {
  :root {
    --size-container-ideal: 390; /* screen-size in design - no px */
    --size-container-min: 320px;
    --size-container-max: 479px;
  }
}
/* ------------------------- Underline Link [https://osmo.supply/] -------------------------  */
[data-underline-link] {
  text-decoration: none;
  position: relative;
}
[data-underline-link]::before {
  content: "";
  position: absolute;
  bottom: -0.0625em;
  left: 0;
  width: 100%;
  height: 0.1em;
  background-color: currentColor;
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform-origin: right;
  transform: scaleX(0) rotate(0.001deg);
}
@media (hover: hover) and (pointer: fine) {
  [data-hover]:hover [data-underline-link]::before,
  [data-underline-link]:hover::before {
    transform-origin: left;
    transform: scaleX(1) rotate(0.001deg);
  }  
}
```
# Implementation
#### Footer Wrapper
Use `[data-footer-parallax]` to define the section where the scroll is tracked.  
#### Footer Inner
Use `[data-footer-parallax-inner]` to move the footer element vertically on scroll.
### HTML
```html
<div data-footer-parallax class="footer__wrap">
  <footer data-footer-parallax-inner class="footer">
    <!-- Your footer elements in here -->
  </footer>
  <div data-footer-parallax-dark class="footer__dark"></div>
</div>
```
#### Dark
Use `[data-footer-parallax-dark]` to fade in a darker layer as the footer scrolls into view.