---
title: "Sticky Section Tabs (CSS Only)"
description: "Sticky Section Tabs (CSS Only)."
slug: "sticky-section-tabs"
previewVideo: "sticky-section-tabs.mp4"
order: 49.842
published: true
categories: ["navigation"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["sticky", "section", "tabs", "css", "only"]
sourceUrl: "https://www.osmo.supply/resource/sticky-section-tabs-css"
---
<div class="demo-group">
  <div class="demo-nav">
    <div class="container">
      <div class="demo-nav__content">
        <ul class="demo-nav__ul">
          <li class="demo-nav__li">Home</li>
          <li class="demo-nav__li">Work</li>
          <li class="demo-nav__li">About</li>
          <li class="demo-nav__li">Contact</li>
        </ul>
      </div>
    </div>
  </div>
  <section class="demo-header">
    <div class="container">
      <h1 class="demo-section__title">Sticky Section Tabs</h1>
    </div>
  </section>
  <!-- Sticky Tab Sections - Start -->
  <div class="sticky-tab-group">
    <div class="sticky-tab-group__nav-bg"></div>
    <section class="sticky-tab">
      <div class="sticky-tab__sticky">
        <div class="sticky-tab__inner">
          <div class="container">
            <div class="sticky-tab__content">
              <h2 class="sticky-tab__title">Step 1: Concept</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="sticky-tab__placeholder-content">
        </div>
      </div>
    </section>
    <section class="sticky-tab">
      <div class="sticky-tab__sticky">
        <div class="sticky-tab__inner">
          <div class="container">
            <div class="sticky-tab__content">
              <h2 class="sticky-tab__title">Step 2: Design</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="sticky-tab__placeholder-content">
        </div>
      </div>
    </section>
    <section class="sticky-tab">
      <div class="sticky-tab__sticky">
        <div class="sticky-tab__inner">
          <div class="container">
            <div class="sticky-tab__content">
              <h2 class="sticky-tab__title">Step 3: Development</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="sticky-tab__placeholder-content">
        </div>
      </div>
    </section>
    <section class="sticky-tab">
      <div class="sticky-tab__sticky">
        <div class="sticky-tab__inner">
          <div class="container">
            <div class="sticky-tab__content">
              <h2 class="sticky-tab__title">Step 4: Party 🎉</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="sticky-tab__placeholder-content">
        </div>
      </div>
    </section>
  </div>
  <!-- Sticky Tab Sections - End -->
  <section class="demo-section">
    <div class="container">
      <h2 class="demo-section__title">More content</h2>
    </div>
  </section>
  <footer class="demo-footer">
    <div class="container">
      <h2 class="demo-footer__title">Footer</h2>
    </div>
  </footer>
</div>
```text
CSS
```
:root {
  --nav-height: 6em;
.container {
  max-width: 90em;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2em;
  padding-right: 2em;
/* Demo Nav */
.demo-nav {
  z-index: 20;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
.demo-nav__content {
  height: var(--nav-height);
  justify-content: space-between;
  align-items: center;
  display: flex;
.demo-nav__logo-svg {
  width: 7em;
.demo-nav__ul {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  display: flex;
.demo-nav__li {
  font-size: 1.25em;
  line-height: 1;
  list-style: none;
/* Demo Header */
.demo-header {
  background-color: #000;
  padding-top: 25vh;
  padding-bottom: 10vh;
/* Sticky Tabs */
.sticky-tab-group {
  overflow: clip;
.sticky-tab-group__nav-bg {
  z-index: 2;
  height: var(--nav-height);
  background-color: #000;
  border-bottom: 1px solid #ffffff26;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
.sticky-tab {
  background-color: #131313;
  position: relative;
  overflow: clip;
.sticky-tab__sticky {
  z-index: 1;
  top: calc(var(--nav-height) - 1px);
  flex-flow: column;
  margin-top: -1px;
  display: flex;
  position: sticky;
  box-shadow: 0 .25em .5em 0 #00000040;
.sticky-tab__inner {
  background-color: #000;
  border-top: 1px solid #ffffff26;
  border-bottom: 1px solid #ffffff26;
  justify-content: space-between;
  align-items: center;
  padding-top: 2em;
  padding-bottom: 2em;
.sticky-tab__content {
  justify-content: space-between;
  align-items: center;
  display: flex;
.sticky-tab__title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 2.25em;
  font-weight: 500;
  line-height: 1;
.sticky-tab__placeholder-content {
  justify-content: center;
  align-items: center;
  height: 66vh;
  display: flex;
.sticky-tab__before-bg {
  height: calc(var(--nav-height) + 2px);
  background-color: #000;
  width: 100%;
  position: absolute;
  bottom: 100%;
/* Demo Section */
.demo-section {
  padding-top: 45vh;
  padding-bottom: 45vh;
.demo-section__title {
  max-width: 6em;
  font-size: 7em;
  font-weight: 500;
  line-height: 1;
/* Demo Footer */
.demo-footer {
  border-top: 1px solid #ffffff26;
  padding-top: 2em;
  padding-bottom: 2em;
.demo-footer__title {
  max-width: 6em;
  font-size: 2.25em;
  font-weight: 500;
  line-height: 1;
/* Osmo Icon */
.osmo-icon-svg {
  width: 8em;
/* Media Queries */
@media screen and (max-width: 767px) {
  .sticky-tab__title {
    font-size: 2em;
  .demo-section__title {
    font-size: 4em;
  .demo-nav__ul {
    display: none;
  .demo-footer__title {
    font-size: 4em;
@media screen and (max-width: 479px) {
  .container {
    padding-left: 1em;
    padding-right: 1em;
```text
Javascript
### Implementation
#### Nav Height Variable
In the demo, we set the navigation height to `6em`. Make sure to change this to the size of your navigation bar. Since this value is used repeatedly to calculate offsets, we defined it as a variable for convenience: `--nav-height: 6em;`. If you set the variable to `0`, the navigation will stick to the top, which is useful in cases where you don’t have a fixed navigation bar.
#### Demo Sections \*optional
The resource includes a demo navigation, section, header, and footer, which are provided for demonstration purposes only. The only mandatory elements for the resource are the `.sticky-tab-group` and its child elements. You can customize the content inside the `.container` div of each `.sticky-tab` to suit your needs.