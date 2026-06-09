---
title: "Button with Bubble Arrow"
description: "Button with Bubble Arrow."
slug: "button-with-bubble-arrow"
previewVideo: "button-with-bubble-arrow.mp4"
order: 49.989
published: true
categories: ["button", "text", "layout"]
triggers: ["hover"]
libraries: ["css-only"]
keywords: ["button", "bubble", "arrow"]
sourceUrl: "https://www.osmo.supply/resource/button-with-bubble-arrow"
---
## Setup
### HTML
```text
<div class="btn-group">
  <a href="#" class="btn-bubble-arrow w-inline-block">
    <div class="btn-bubble-arrow__arrow">
    </div>
    <div class="btn-bubble-arrow__content">
      <span class="btn-bubble-arrow__content-text">Button Bubble</span>
    </div>
    <div class="btn-bubble-arrow__arrow is--duplicate">
    </div>
  </a>
</div>
```
### CSS
```text
.btn-group {
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  justify-content: center;
  font-size: 2em;
  display: flex;
}
.btn-bubble-arrow {
  border-radius: 10em;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  text-decoration: none;
  display: flex;
  position: relative;
}
.btn-bubble-arrow__arrow {
  color: #131313;
  background-color: #ff4c2f;
  border-radius: 10em;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  width: 3.75em;
  height: 3.75em;
  display: flex;
  position: relative;
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform: scale(0) rotate(0.001deg);
  transform-origin: left;
}
.btn-bubble-arrow__arrow.is--duplicate {
  z-index: 2;
  background-color: #efeeec;
  position: absolute;
  right: 0;
}
.btn-bubble-arrow__arrow-svg {
  width: 40%;
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform: rotate(0.001deg);
}
.btn-bubble-arrow__arrow.is--duplicate {
  position: absolute;
  z-index: 2;
  right: 0;
  transform: scale(1) rotate(0.001deg);
  transform-origin: right;
}
.btn-bubble-arrow__content {
  color: #efeeec;
  background-color: #0006;
  border-radius: 10em;
  justify-content: center;
  align-items: center;
  height: 3.75em;
  padding-left: 2em;
  padding-right: 2em;
  display: flex;
  position: relative;
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform: translateX(-3.75em) rotate(0.001deg);
}
.btn-bubble-arrow__content-text {
  line-height: 1;
}
/* Hover */
.btn-bubble-arrow:hover .btn-bubble-arrow__content {
  transform: translateX(0em) rotate(0.001deg);
}
.btn-bubble-arrow:hover .btn-bubble-arrow__arrow-svg {
  transform: rotate(-45deg);
}
.btn-bubble-arrow:hover .btn-bubble-arrow__arrow {
  transform: scale(1) rotate(0.001deg);
}
.btn-bubble-arrow:hover .btn-bubble-arrow__arrow.is--duplicate {
  transform: scale(0) rotate(0.001deg);
}
```
### CSS
```text
.btn-bubble-arrow__content {
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform: translateX(-3.75em) rotate(0.001deg);
}
.btn-bubble-arrow__arrow {
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform: scale(0) rotate(0.001deg);
  transform-origin: left;
}
.btn-bubble-arrow__arrow-svg {
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform: rotate(0.001deg);
}
.btn-bubble-arrow__arrow.is--duplicate {
  position: absolute;
  z-index: 2;
  right: 0;
  transform: scale(1) rotate(0.001deg);
  transform-origin: right;
}
/* Hover */
.btn-bubble-arrow:hover .btn-bubble-arrow__content {
  transform: translateX(0em) rotate(0.001deg);
}
.btn-bubble-arrow:hover .btn-bubble-arrow__arrow-svg {
  transform: rotate(-45deg);
}
.btn-bubble-arrow:hover .btn-bubble-arrow__arrow {
  transform: scale(1) rotate(0.001deg);
}
.btn-bubble-arrow:hover .btn-bubble-arrow__arrow.is--duplicate {
  transform: scale(0) rotate(0.001deg);
}
```
### Implementation
When the `.btn-bubble-content` element is removed the animation will still work for the arrow.