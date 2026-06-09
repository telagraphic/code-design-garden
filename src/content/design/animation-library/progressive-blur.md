---
title: "Progressive Blur"
description: "Progressive Blur."
slug: "progressive-blur"
previewVideo: "progressive-blur.mp4"
order: 49.861
published: true
categories: ["filter", "navigation", "media"]
triggers: ["mouse-move"]
libraries: ["css-only"]
keywords: ["progressive", "blur"]
sourceUrl: "https://www.osmo.supply/resource/progressive-blur"
---
## Setup
### HTML
```text
<div class="progressive-blur">
  <div class="progressive-blur__layer is--1"></div>
  <div class="progressive-blur__layer is--2"></div>
  <div class="progressive-blur__layer is--3"></div>
  <div class="progressive-blur__layer is--4"></div>
  <div class="progressive-blur__layer is--5"></div>
</div>
```
### CSS
```text
.progressive-blur {
  z-index: 40;
  pointer-events: none;
  isolation: isolate;
  contain: paint;
  width: 100%;
  height: 15em;
  transform-style: preserve-3d;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  transform: translateZ(0);
}
.progressive-blur__layer {
  width: 100%;
  height: 100%;
  position: absolute;
}
.progressive-blur__layer.is--1 {
  -webkit-backdrop-filter: blur(.09375em);
  backdrop-filter: blur(.09375em);
  -webkit-mask: linear-gradient(#0000 50%, #000 62.5% 75%, #0000 87.5%);
  mask: linear-gradient(#0000 50%, #000 62.5% 75%, #0000 87.5%);
}
.progressive-blur__layer.is--2 {
  -webkit-backdrop-filter: blur(.1875em);
  backdrop-filter: blur(.1875em);
  -webkit-mask: linear-gradient(#0000 62.5%, #000 75% 87.5%, #0000 100%);
  mask: linear-gradient(#0000 62.5%, #000 75% 87.5%, #0000 100%);
}
.progressive-blur__layer.is--3 {
  -webkit-backdrop-filter: blur(.375em);
  backdrop-filter: blur(.375em);
  -webkit-mask: linear-gradient(#0000 75%, #000 87.5% 100%);
  mask: linear-gradient(#0000 75%, #000 87.5% 100%);
}
.progressive-blur__layer.is--4 {
  -webkit-backdrop-filter: blur(.75em);
  backdrop-filter: blur(.75em);
  -webkit-mask: linear-gradient(#0000 82%, #000 92% 100%);
  mask: linear-gradient(#0000 82%, #000 92% 100%);
}
.progressive-blur__layer.is--5 {
  -webkit-backdrop-filter: blur(1.5em);
  backdrop-filter: blur(1.5em);
  -webkit-mask: linear-gradient(#0000 88%, #000 100%);
  mask: linear-gradient(#0000 88%, #000 100%);
}
```
### CSS
### Implementation
#### About the effect
Use the `.progressive-blur` element with its child layers as a background for a navigation bar or a team card.
This modern visual effect uses a recently introduced Figma technique to create a progressive blur. It consists of five blurred layers, each masked with a gradient and offset on the Y axis, creating a smooth effect that brings focus to the element above.