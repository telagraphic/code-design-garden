---
title: "Toggle (CSS Only Trick)"
description: "Toggle (CSS Only Trick)."
slug: "toggle-css-only-trick"
previewVideo: "toggle-css-only-trick.mp4"
order: 49.834
published: true
categories: ["cursor", "text", "layout"]
triggers: ["mouse-move"]
libraries: ["css-only"]
keywords: ["toggle", "css", "only", "trick"]
sourceUrl: "https://www.osmo.supply/resource/toggle-css-only"
---
<section class="section-resource">
  <div class="btn-toggle">
    <div class="btn-toggle__toggle">
      <div class="btn-toggle__toggle-dot"></div>
    </div><p class="btn-toggle__p">I'm a toggle</p>
    <input type="checkbox" class="btn-toggle__checkbox">
  </div>
</section>
```text
CSS
```
.section-resource {
  background-color: #e4d8d5;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 4em;
  display: flex;
  transition: background-color 0.4s cubic-bezier(0.35, 1, 0.6, 1);
.btn-toggle {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  cursor: pointer;
  align-items: center;
  display: flex;
  position: relative;
.btn-toggle__toggle {
  background-color: #ff4c24;
  border-radius: 2em;
  flex-shrink: 0;
  width: 2em;
  height: 1.25em;
  display: flex;
.btn-toggle__toggle-dot {
  background-color: #fff;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  margin-top: .125em;
  margin-left: .125em;
  transition: all 0.4s cubic-bezier(0.35, 1.5, 0.6, 1);
  transform: translateX(0em) rotate(0.001deg);
.btn-toggle__p {
  margin-bottom: 0;
  font-size: 1.25em;
  line-height: 1;
  position: relative;
  transition: color 0.4s cubic-bezier(0.35, 1, 0.6, 1);
.btn-toggle__checkbox {
  opacity: 0;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
@media screen and (max-width: 767px) {
  .section-resource {
    font-size: 7vw;
/* Animations based on :checked */
.section-resource:has(input[type="checkbox"]:checked) {
  background: #301139;
.btn-toggle:has(input[type="checkbox"]:checked) .btn-toggle__toggle-dot {
  transform: translateX(0.75em) rotate(0.001deg);
.btn-toggle:has(input[type="checkbox"]:checked) .btn-toggle__p {
  color: #EFEEEC;
```text
Javascript
CSS
```
/* Background Color */
.section-resource {
  transition: background-color 0.4s cubic-bezier(0.35, 1, 0.6, 1);
.section-resource:has(input[type="checkbox"]:checked) {
  background: #301139;
/* Toggle Dot */
.btn-toggle__toggle-dot {
  transition: all 0.4s cubic-bezier(0.35, 1.5, 0.6, 1);
  transform: translateX(0em) rotate(0.001deg);
.btn-toggle:has(input[type="checkbox"]:checked) .btn-toggle__toggle-dot {
  transform: translateX(0.75em) rotate(0.001deg);
/* Toggle Text */
.btn-toggle__p {
  transition: color 0.4s cubic-bezier(0.35, 1, 0.6, 1);
.btn-toggle:has(input[type="checkbox"]:checked) .btn-toggle__p {
  color: #EFEEEC;
```text
### Implementation
In this example we animate the Toggle Dot, Background and Text color. But you can go as crazy as you want. Only possible because of the `:has()` CSS selector.