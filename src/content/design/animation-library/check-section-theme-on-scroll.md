---
title: "Check Section Theme on Scroll"
description: "Check Section Theme on Scroll."
slug: "check-section-theme-on-scroll"
previewVideo: "check-section-theme-on-scroll.mp4"
order: 49.941
published: true
categories: ["navigation", "scroll"]
triggers: ["scroll", "load"]
libraries: ["gsap"]
keywords: ["check", "section", "theme", "scroll"]
sourceUrl: "https://www.osmo.supply/resource/check-section-theme-on-scroll"
---
function initCheckSectionThemeScroll() {
  // Get detection offset, in this case the navbar
  const navBarHeight = document.querySelector("[data-nav-bar-height]")
  const themeObserverOffset = navBarHeight ? navBarHeight.offsetHeight / 2 : 0;
  function checkThemeSection() {
    const themeSections = document.querySelectorAll("[data-theme-section]");
    themeSections.forEach(function(themeSection) {
      const rect = themeSection.getBoundingClientRect();
      const themeSectionTop = rect.top;
      const themeSectionBottom = rect.bottom;
      // If the offset is between the top & bottom of the current section
      if (themeSectionTop <= themeObserverOffset && themeSectionBottom >= themeObserverOffset) {
        // Check [data-theme-section]
        const themeSectionActive = themeSection.getAttribute("data-theme-section");
        document.querySelectorAll("[data-theme-nav]").forEach(function(elem) {
          if (elem.getAttribute("data-theme-nav") !== themeSectionActive) {
            elem.setAttribute("data-theme-nav", themeSectionActive);
        });
        // Check [data-bg-section]
        const bgSectionActive = themeSection.getAttribute("data-bg-section");
        document.querySelectorAll("[data-bg-nav]").forEach(function(elem) {
          if (elem.getAttribute("data-bg-nav") !== bgSectionActive) {
            elem.setAttribute("data-bg-nav", bgSectionActive);
        });
    });
  function startThemeCheck() {
    document.addEventListener("scroll", checkThemeSection);
  // Initial check and start listening for scroll
  checkThemeSection();
  startThemeCheck();
// Initialize Check Section Theme on Scroll
document.addEventListener('DOMContentLoaded', () => {
  initCheckSectionThemeScroll();
});
```text
CSS
### Implementation
#### Attributes
- Add `[data-theme-nav="light"]` to the `<body>`, used to check the theme of the <section>
- Add `[data-bg-nav="light"]` to the `<body>`, used to check the background of the <section>
- Add `[data-theme-section]` to all of the `<section>` elements that need to be synced with the nav theme
- Add `[data-bg-section]` to all of the `<section>` elements that need to be synced with the nav background
#### Example structure
For both Webflow and Code
```
<body data-theme-nav="light" data-bg-nav="light">
  <nav></nav>
  <section class="section-header" data-theme-section="dark" data-bg-section="blue"></section>
  <section class="section-work" data-theme-section="dark" data-bg-section="orange"></section>
  <section class="section-about" data-theme-section="light" data-bg-section="yellow"></section>
  <section class="section-contact" data-theme-section="light" data-bg-section="light"></section>
</body>
```text
#### Animating
Use CSS to animate objects (or in this case the nav) based on the changing attributes
```
/* Nav Theme */
[data-theme-nav="light"] .nav__inner {
  color: #131313;
[data-theme-nav="dark"] .nav__inner {
  color: #EFEEEC;
/* Nav Background */
[data-bg-nav="pink"] .nav__inner {
  background-color: #562041;
[data-bg-nav="black"] .nav__inner {
  background-color: #1F1F1F;
[data-bg-nav="lightblue"] .nav__inner {
  background-color: #204b63;
[data-bg-nav="darkgreen"] .nav__inner {
  background-color: #C9FC7D;
```text