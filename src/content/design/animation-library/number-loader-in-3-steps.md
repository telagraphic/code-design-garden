---
title: "Number Loader in 3 Steps"
description: "Number Loader in 3 Steps."
slug: "number-loader-in-3-steps"
previewVideo: "number-loader-in-3-steps.mp4"
order: 49.894
published: true
categories: ["loader", "text", "media"]
triggers: ["mouse-move"]
libraries: ["gsap"]
keywords: ["number", "loader", "steps"]
sourceUrl: "https://www.osmo.supply/resource/number-loader-in-3-steps"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
```
### HTML
```text
<div class="loading-container">
   <div class="loading-screen">
   <div class="loading__progress">
      <div class="loading__progress-inner"></div>
   </div>
   <div class="loading__numbers">
      <div class="loading__number-group is--first">
         <div class="loading__number-wrap"><span class="loading__number">1</span></div>
      </div>
      <div class="loading__number-group is--second">
         <div class="loading__number-wrap"><span class="loading__number">1</span><span class="loading__number">2</span><span class="loading__number">3</span><span class="loading__number">4</span><span class="loading__number">5</span><span class="loading__number">6</span><span class="loading__number">7</span><span class="loading__number">8</span><span class="loading__number">9</span><span class="loading__number">0</span></div>
      </div>
      <div class="loading__number-group is--third">
         <div class="loading__number-wrap"><span class="loading__number">1</span><span class="loading__number">2</span><span class="loading__number">3</span><span class="loading__number">4</span><span class="loading__number">5</span><span class="loading__number">6</span><span class="loading__number">7</span><span class="loading__number">8</span><span class="loading__number">9</span><span class="loading__number">0</span></div>
      </div>
      <div class="loading__percentage-wrap"><span class="loading__percentage">%</span></div>
   </div>
   </div>
</div>
```
### CSS
```text
.loading-screen {
  pointer-events: auto;
  background-color: #E2E1DF;
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
}
.loading-container {
  z-index: 200;
  pointer-events: none;
  background-color: #E2E1DF;
  position: fixed;
  inset: 0;
  overflow: hidden;
}
.loading__progress {
  width: 1em;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.loading__progress-inner {
  transform-origin: bottom;
  background-color: #ff4c24;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.loading__numbers {
  flex-flow: row;
  align-items: flex-start;
  font-size: calc(10vw + 10vh);
  display: flex;
  position: absolute;
  bottom: .1em;
  left: .23em;
}
.loading__number-group {
  flex-flow: column;
  height: 1em;
  display: flex;
  position: relative;
  overflow: hidden;
}
.loading__number-wrap {
  will-change: transform;
  flex-flow: column;
  display: flex;
  position: relative;
}
.loading__number {
  text-transform: uppercase;
  font-family: PP Neue Corp Tight, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
  position: relative;
}
.loading__percentage-wrap {
  flex-flow: column;
  justify-content: flex-start;
  margin-top: .375em;
  font-size: .3em;
  display: flex;
  overflow: hidden;
}
.loading__percentage {
  text-transform: uppercase;
  will-change: transform;
  font-family: PP Neue Corp Tight, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
  position: relative;
}
```
### Javascript
```javascript
function initLoaderThreeSteps() { 
  var tl = gsap.timeline();
  gsap.defaults({
    ease: "Expo.easeInOut",
    duration: 1.2
  });
  /* Loading numbers */
  var randomNumbers1 = gsap.utils.random([2, 3, 4]);
  var randomNumbers2 = gsap.utils.random([5, 6]);
  var randomNumbers3 = gsap.utils.random([1, 5]);
  var randomNumbers4 = gsap.utils.random([7, 8, 9]);
  /* Loading Timeline */
  tl.set(".loading-screen", {
     display: "block",
  });
  tl.set(".loading__progress-inner", {
     scaleY: 0
  });
  tl.set(".loading__number-group.is--first .loading__number-wrap, .loading__percentage", {
     yPercent: 100
  });
  tl.set(".loading__number-group.is--second .loading__number-wrap, .loading__number-group.is--third .loading__number-wrap", {
     yPercent: 10
  });
  tl.to(".loading__progress-inner", {
     scaleY: (randomNumbers1 + "" + randomNumbers3) / 100,
  });
  tl.to(".loading__percentage", {
     yPercent: 0
  }, "<");
  tl.to(".loading__number-group.is--second .loading__number-wrap", {
     yPercent: (randomNumbers1 - 1) * -10,
  },"<");
  tl.to(".loading__number-group.is--third .loading__number-wrap", {
     yPercent: (randomNumbers3 - 1) * -10,
  }, "<");
  tl.to(".loading__progress-inner", {
     scaleY: (randomNumbers2 + "" + randomNumbers4) / 100,
  });
  tl.to(".loading__number-group.is--second .loading__number-wrap", {
     yPercent: (randomNumbers2 - 1) * -10,
  }, "<");
  tl.to(".loading__number-group.is--third .loading__number-wrap", {
     yPercent: (randomNumbers4 - 1) * -10,
  }, "<");
  tl.to(".loading__progress-inner", {
     scaleY: 1,
  });
  tl.to(".loading__number-group.is--second .loading__number-wrap", {
     yPercent: -90,
  }, "<");
  tl.to(".loading__number-group.is--third .loading__number-wrap", {
     yPercent: -90,
  }, "<");
  tl.to(".loading__number-group.is--first .loading__number-wrap", {
     yPercent: 0,
  }, "<");
}
/* Initialize Number Loader in 3 Steps */
document.addEventListener("DOMContentLoaded", () => {
  initLoaderThreeSteps();
});
```
### Javascript
```text
/* --- Show the Loader in Webflow Designer --- */
:is(.wf-design-mode, .wf-editor) .loading-screen {
  display: block;
}
```