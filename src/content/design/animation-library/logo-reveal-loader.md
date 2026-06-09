---
title: "Logo Reveal Loader"
description: "Logo Reveal Loader."
slug: "logo-reveal-loader"
previewVideo: "logo-reveal-loader.mp4"
order: 49.907
published: true
categories: ["loader"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["logo", "reveal", "loader"]
sourceUrl: "https://www.osmo.supply/resource/logo-reveal-loader"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
```
### HTML
```text
<div data-load-wrap class="loader">
  <div data-load-bg class="loader__bg">
    <div data-load-progress class="loader__bg-bar"></div>
  </div>
  <div data-load-container class="loader__container">
    <div class="loader__logo-wrap">
      <div class="loader__logo-item is--base">
      </div>
      <div data-load-logo class="loader__logo-item is--top">
      </div>
    </div>
    <div class="loader__text-wrap">
      <span data-load-text data-load-reset class="loader__text-el">Hold tight</span>
      <span data-load-text data-load-reset class="loader__text-el">Hi there!</span>
    </div>
  </div>
</div>
```
### CSS
```text
.loader {
  z-index: 100;
  color: #fff;
  width: 100%;
  height: 100dvh;
  position: fixed;
  inset: 0% 0% auto;
}
.loader__bg {
  background-color: #0a0a0a;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
}
.loader__container {
  z-index: 2;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}
.loader__bg-bar {
  z-index: 1;
  transform-origin: 0%;
  transform-style: preserve-3d;
  background-color: #fff;
  width: 100%;
  height: .5em;
  position: absolute;
  inset: auto 0% 0%;
  transform: scale3d(0, 1, 1);
}
.loader__logo-wrap {
  justify-content: center;
  align-items: center;
  width: 12em;
  height: 3em;
  display: flex;
  position: relative;
}
.loader__logo-item {
  width: 100%;
  position: absolute;
}
.loader__logo-item.is--base {
  opacity: .2;
}
.loader__logo-item.is--top {
  -webkit-clip-path: inset(0% 100% 0% 0%);
  clip-path: inset(0% 100% 0% 0%);
}
.loader__logo-img {
  width: 100%;
  display: block;
}
.loader__text-wrap {
  flex-flow: column;
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  bottom: 3.5em;
}
.loader__text-el {
  text-transform: uppercase;
  white-space: nowrap;
  margin-bottom: -.25em;
  padding-bottom: .25em;
  font-family: Haffer Mono, Arial, sans-serif;
  position: absolute;
}
[data-load-reset]{ opacity: 0; }
```
### Javascript
```javascript
function initLogoRevealLoader(){
  gsap.registerPlugin(CustomEase, SplitText);
  CustomEase.create("loader", "0.65, 0.01, 0.05, 0.99");
  const wrap = document.querySelector("[data-load-wrap]");
  if (!wrap) return;
  const container = wrap.querySelector("[data-load-container]");
  const bg = wrap.querySelector("[data-load-bg]");
  const progressBar = wrap.querySelector("[data-load-progress]");
  const logo = wrap.querySelector("[data-load-logo]");
  const textElements = Array.from(wrap.querySelectorAll("[data-load-text]"));
  // Reset targets that are * not * split text targets
  const resetTargets = Array.from(
    wrap.querySelectorAll('[data-load-reset]:not([data-load-text])')
  );
  // Main loader timeline
  const loadTimeline = gsap.timeline({ 
    defaults: { 
      ease: "loader",
      duration: 3
    }
  })
  .set(wrap,{ display: "block" })
  .to(progressBar, { scaleX: 1 })
  .to(logo, { clipPath:"inset(0% 0% 0% 0%)" }, "<")
  .to(container,{ autoAlpha: 0, duration: 0.5 })
  .to(progressBar,{ scaleX: 0, transformOrigin: "right center", duration: 0.5},"<")
  .add("hideContent", "<")
  .to(bg, { yPercent: -101, duration: 1 },"hideContent")
  .set(wrap,{ display: "none" });
  // If there are items to hide FOUC for, reset them at the start
  if (resetTargets.length) {
    loadTimeline.set(resetTargets, { autoAlpha: 1 }, 0);
  }
  // If there's text items, split them, and add to load timeline
  if (textElements.length >= 2) {
    const firstWord = new SplitText(textElements[0], { type: "lines,chars", mask: "lines" });
    const secondWord = new SplitText(textElements[1], { type: "lines,chars", mask: "lines" });
    // Set initial states of the text elements and letters
    gsap.set([firstWord.chars, secondWord.chars], { autoAlpha: 0, yPercent: 125 });
    gsap.set(textElements, { autoAlpha: 1 });
    // first text in
    loadTimeline.to(firstWord.chars, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.6,
      stagger: { each: 0.02 }
    }, 0);
    // first text out while second text in
    loadTimeline.to(firstWord.chars, {
      autoAlpha: 0,
      yPercent: -125,
      duration: 0.4,
      stagger: { each: 0.02 }
    }, ">+=0.4");
    loadTimeline.to(secondWord.chars, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.6,
      stagger: { each: 0.02 }
    }, "<");
    // second text out
    loadTimeline.to(secondWord.chars, {
      autoAlpha: 0,
      yPercent: -125,
      duration: 0.4,
      stagger: { each: 0.02 }
    }, "hideContent-=0.5");
  }
}
// Initialize Logo Reveal Loader
document.addEventListener("DOMContentLoaded", () => {
  initLogoRevealLoader();
});
```
### CSS
```text
.wf-design-mode .loader{ display: none; }
[data-load-reset]{ opacity: 0; }
```
### Implementation
#### Duration
The overall timeline length is dynamic. It’s simply the sum of all animations inside it. The main drivers are the `[data-load-progress]` and `[data-load-logo]` reveals, which take 3s by default. That value comes from the `defaults` object in the GSAP timeline, so if you want to adjust how long the loader runs, that’s the first place to tweak.
#### Change logo
To make this as easy as possible to implement, we use a `clip-path` to reveal the 'full opacity' version of our logo. Make sure the div that has this clip-path applied, also has an attribute of `[data-load-logo]`.
#### Change logo fill direction
By default, we make the logo fill from left-to-right. This is because of: `clip-path: inset(0% 100% 0% 0%)` on our `[data-load-logo]` div. For example, if you want your logo to fill from bottom-to-top, make sure to set it to `inset(100% 0% 0% 0%)` in CSS.
#### Progress bar
This is a simple div marked with `[data-load-progress]`. It has its transform-origin set to the left, so that if we scale it from 0 → 1 on the x-axis, it fills from left-to-tight.
#### Text elements
If you want text animations in your loader, wrap each text block in an element marked with `[data-load-text]`. The loader is designed to work with two text blocks, which it splits into characters and animates in-and-out in sequence.
Don't worry about the warning GSAP might give you about calling SplitText before fonts are loaded. We use very short text blocks, so there's no text that could wrap in an awkward way.
#### Prevent FOUC (Flash Of Unstyled Content)
When your page first loads, the browser renders HTML and CSS immediately, but your JavaScript takes a moment to kick in. If you plan to animate elements from a hidden state (like opacity: 0), they may briefly appear on screen before GSAP applies its 'from' values. That quick flicker is called a FOUC; [Flash of Unstyled Content.](https://dev.to/lyqht/what-the-fouc-is-happening-flash-of-unstyled-content-413j)
To prevent this, you can add a `[data-load-reset]` attribute to any element that shouldn’t be visible right away. In your CSS, set `[data-load-reset] { opacity: 0; }`. Then, as the very first step in your GSAP timeline, set those elements back to visible. By the time the timeline starts animating, GSAP has already applied all the correct initial states, so the flicker never happens.