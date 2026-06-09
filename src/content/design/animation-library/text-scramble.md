---
title: "Text Scramble (Load, Scroll, Hover)"
description: "Text Scramble (Load, Scroll, Hover)."
slug: "text-scramble"
previewVideo: "text-scramble.mp4"
order: 49.836
published: true
categories: ["button", "scroll", "text"]
triggers: ["scroll", "hover", "load"]
libraries: ["gsap"]
keywords: ["text", "scramble", "load", "scroll", "hover"]
sourceUrl: "https://www.osmo.supply/resource/text-scramble-load-scroll-hover"
---
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrambleTextPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```text
HTML
```
<div class="demo-group">
  <div class="scramble-section">
    <h1 data-scramble="load" class="scramble-heading">This heading will reveal with a basic scrambling effect<br>on page load</h1>
  </div>
  <div class="scramble-section u--bg-light">
    <h2 data-scramble="scroll" class="scramble-heading">this is an example of a heading that is triggered by a scrolltrigger</h2>
  </div>
  <div class="scramble-section">
    <h2 data-scramble-alt="" data-scramble="scroll" class="scramble-heading">You can even control the characters that are used during scramble</h2>
  </div>
  <div class="scramble-section u--bg-light">
    <h2 class="scramble-heading">and here&#x27;s how to work with scramble text on hover:</h2>
    <a data-scramble-hover="link" href="#" class="scramble-button w-inline-block">
      <p data-scramble-text="this text can be custom too" data-scramble-hover="target" class="scramble-button-text">How to scramble on hover</p>
    </a>
  </div>
</div>
```text
CSS
```
.scramble-section {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
.scramble-section.u--bg-light {
  background-color: #efeeec;
.scramble-heading {
  text-align: center;
  letter-spacing: -.03em;
  text-transform: uppercase;
  max-width: 12em;
  margin: 0 auto;
  font-family: RM Mono, Arial, sans-serif;
  font-size: 3em;
  font-weight: 400;
  line-height: .9;
.scramble-button {
  color: #131313;
  text-transform: uppercase;
  border: 1px dotted #000;
  border-radius: .3125em;
  padding: .5em 1em;
  font-family: RM Mono, Arial, sans-serif;
  font-size: 1em;
  font-weight: 400;
  text-decoration: none;
.scramble-button-text {
  margin: 0;
```text
Javascript
```
gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText)
// Function to reveal stuff on load
function initScrambleOnLoad(){
  let targets = document.querySelectorAll('[data-scramble="load"]')
  targets.forEach((target) => {
      // split into seperate words + letters 
    let split = new SplitText(target, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char"
    });
    gsap.to(split.words, {
      duration: 1.2,
      stagger: 0.01,
      scrambleText: {
        text: "{original}",
        chars: 'upperCase', // experiment with different scramble characters here
        speed: 0.85,
      // Once animation is done, revert the split to reduce DOM size
      onComplete: () => split.revert()
    });
  });
// Function to reveal stuff on scroll
function initScrambleOnScroll(){
  let targets = document.querySelectorAll('[data-scramble="scroll"]')
  targets.forEach((target) => {
      // Used this attribute to showcase a different character scramble, can be replaced with many scenarios
    let isAlternative = target.hasAttribute("data-scramble-alt")
    let split = new SplitText(target, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char"
    });
    gsap.to(split.words, {
      duration: 1.4,
      stagger: 0.015,
      scrambleText: {
        text: "{original}", 
        chars: isAlternative ? '▯|' : 'upperCase',  // experiment with different scramble characters here
        speed: 0.95,
      scrollTrigger: {
        trigger: target,
        start: "top bottom",
        once: true
      // Once animation is done, revert the split to reduce DOM size
      onComplete: () => split.revert()
    });
  });
function initScrambleOnHover(){
  let targets = document.querySelectorAll('[data-scramble-hover="link"]')
  targets.forEach((target) => {
    let textEl = target.querySelector('[data-scramble-hover="target"]')
    let originalText = textEl.textContent // save original text
    let customHoverText = textEl.getAttribute("data-scramble-text") // if this attribute is present, take a custom hover text
    let split = new SplitText(textEl, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char"
    });
    target.addEventListener("mouseenter", () => {
      gsap.to(textEl, {
        duration: 1,
        scrambleText: {
          text: customHoverText ? customHoverText : originalText,
          chars: "◊▯∆|"
      });
    });
    target.addEventListener("mouseleave", () => {
      gsap.to(textEl, {
        duration: 0.6,
        scrambleText: {
          text: originalText,
          speed: 2,
          chars: "◊▯∆"
      });
    });
  });
// Initialize Scramble Functions
document.addEventListener("DOMContentLoaded", () => {
  initScrambleOnLoad();
  initScrambleOnScroll();
  initScrambleOnHover();
});
```text
CSS
### Introduction
From my experience, first splitting the text into separate letters results in a nicer scramble effect than directly applying the scrambleText effect onto an element. This is a matter of preference though, and I definitely recommend playing around with it to find what you like best. To reduce the DOM size with all these separate characters, the script 'reverts' the splitting after the animation is done.
### Application
The code above searches for any `data-scramble="load"` and `data-scramble="scroll"` elements on the page to reveal them, well, on load or scroll. As you'll see, adding the plugin is rather simple, and just goes in a regular GSAP tween. Definitely check out the [GSAP Docs of the ScrambleTextPlugin](https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/?&_rid=192790) to see all of the available options.