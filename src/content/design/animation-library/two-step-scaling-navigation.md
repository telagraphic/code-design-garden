---
title: "Two-step Scaling Navigation"
description: "Two-step Scaling Navigation."
slug: "two-step-scaling-navigation"
previewVideo: "two-step-scaling-navigation.mp4"
order: 49.833
published: true
categories: ["navigation"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["two", "step", "scaling", "navigation"]
sourceUrl: "https://www.osmo.supply/resource/two-step-scaling-navigation"
---
## Setup
### HTML
```text
<nav data-twostep-nav data-nav-status="not-active" class="twostep-nav">
  <div data-nav-toggle="close" class="twostep-nav__bg"></div>
  <div class="twostep-nav__wrap">
    <div class="twostep-nav__width">
      <div class="twostep-nav__bar">
        <div class="twostep-nav__back">
          <div class="twostep-nav__back-bg"></div>
        </div>
        <div class="twostep-nav__top">
          <a href="#" class="twostep-nav__logo w-inline-block">
          </a>
          <button data-nav-toggle="toggle" class="twostep-nav__toggle">
            <div class="twostep-nav__toggle-bar"></div>
            <div class="twostep-nav__toggle-bar"></div>
          </button>
          <div class="twostep-nav__top-line"></div>
        </div>
        <div class="twostep-nav__bottom">
          <div class="twostep-nav__bottom-overflow">
            <div class="twostep-nav__bottom-inner">
              <div class="twostep-nav__bottom-row">
                <div class="twostep-nav__bottom-col">
                  <div class="twostep-nav__info">
                    <ul class="twostep-nav__ul">
                      <li class="twostep-nav__li">
                        <a href="#" class="twostep-nav__link w-inline-block"><span class="twostep-nav__link-span">Home</span></a>
                      </li>
                      <li class="twostep-nav__li">
                        <a href="#" class="twostep-nav__link w-inline-block"><span class="twostep-nav__link-span">Portfolio</span></a>
                      </li>
                      <li class="twostep-nav__li">
                        <a href="#" class="twostep-nav__link w-inline-block"><span class="twostep-nav__link-span">About us</span></a>
                      </li>
                      <li class="twostep-nav__li">
                        <a href="#" class="twostep-nav__link w-inline-block"><span class="twostep-nav__link-span">Services</span></a>
                      </li>
                    </ul>
                    <ul class="twostep-nav__ul is--small">
                      <li class="twostep-nav__li">
                        <a href="#" class="twostep-nav__link w-inline-block"><span class="twostep-nav__link-eyebrow">Instagram</span></a>
                      </li>
                      <li class="twostep-nav__li">
                        <a href="#" class="twostep-nav__link w-inline-block"><span class="twostep-nav__link-eyebrow">LinkedIn</span></a>
                      </li>
                      <li class="twostep-nav__li">
                        <a href="#" class="twostep-nav__link w-inline-block"><span class="twostep-nav__link-eyebrow">Twitter/X</span></a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="twostep-nav__bottom-col is--visual">
                  <div class="twostep-nav__visual">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
```
### CSS
```text
.twostep-nav {
  z-index: 100;
  pointer-events: none;
  position: fixed;
  inset: 0;
}
.twostep-nav__bg {
  z-index: 0;
  opacity: 0;
  pointer-events: auto;
  visibility: hidden;
  background-color: #0000004d;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0% auto auto 0%;
}
.twostep-nav__wrap {
  justify-content: center;
  align-items: stretch;
  width: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
.twostep-nav__width {
  flex-flow: column;
  flex: none;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 48em;
  padding-top: 1.25em;
  padding-left: 1.25em;
  padding-right: 1.25em;
  display: flex;
}
.twostep-nav__bar {
  pointer-events: auto;
  color: #201d1d;
  width: 100%;
  max-width: 25em;
  position: relative;
}
.twostep-nav__back {
  z-index: 0;
  position: absolute;
  inset: 0%;
}
.twostep-nav__top {
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4em;
  padding: 1.25em;
  display: flex;
  position: relative;
}
.twostep-nav__bottom {
  grid-template-rows: 0fr;
  width: 100%;
  display: grid;
  position: relative;
  overflow: hidden;
}
.twostep-nav__logo {
  justify-content: flex-start;
  align-items: center;
  width: 6em;
  height: 100%;
  display: flex;
}
.twostep-nav__logo-svg {
  height: 100%;
}
.twostep-nav__back-bg {
  background-color: #f2f2f2;
  border-radius: .5em;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
}
.twostep-nav__toggle {
  pointer-events: auto;
  cursor: pointer;
  background-color: #0000;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  padding: 0;
  display: flex;
  position: relative;
}
.twostep-nav__toggle-bar {
  background-color: #131313;
  width: 1.875em;
  height: .125em;
  position: absolute;
}
.twostep-nav__bottom-overflow {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
}
.twostep-nav__bottom-inner {
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 1.5em;
  display: flex;
  position: relative;
}
.twostep-nav__bottom-row {
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  display: flex;
}
.twostep-nav__bottom-col {
  flex: 1;
  min-height: 100%;
  display: flex;
}
.twostep-nav__ul {
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  display: flex;
}
.twostep-nav__ul.is--small {
  grid-column-gap: 1em;
  grid-row-gap: .25em;
  flex-flow: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.twostep-nav__link {
  color: inherit;
  width: 100%;
  padding-top: .375em;
  padding-bottom: .375em;
  text-decoration: none;
  position: relative;
}
.twostep-nav__link-span {
  letter-spacing: -.04em;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: 2.125em;
  font-weight: 400;
  line-height: 1;
}
.twostep-nav__visual {
  aspect-ratio: 1;
  border-radius: .375em;
  width: 100%;
  overflow: hidden;
}
.twostep-nav__visual-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.twostep-nav__info {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  display: flex;
}
.twostep-nav__link-eyebrow {
  opacity: .7;
  letter-spacing: -.02em;
  font-family: Haffer XH, Arial, sans-serif;
  font-size: 1em;
  font-weight: 400;
  line-height: 1;
}
.twostep-nav__top-line {
  z-index: 2;
  background-color: #0000001a;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: .5em;
  right: .5em;
}
@media screen and (max-width: 767px) {
  .twostep-nav__bottom-col.is--visual {
    display: none;
  }
  .twostep-nav__top-line {
    bottom: -.5em;
    left: 1em;
    right: 1em;
  }
}
[data-twostep-nav]{
  --cubic-default: cubic-bezier(0.625, 0.05, 0, 1);
  --animation-ease: 0.2s ease;
  --duration-default: 0.5s;
  --duration-default-long: 0.75s; 
  --duration-default-half: 0.25s; 
  --animation-default: var(--duration-default) var(--cubic-default);
  --animation-default-long: var(--duration-default-long) var(--cubic-default);
  --animation-default-half: var(--duration-default-half) var(--cubic-default);
}
/* Menu button */
.twostep-nav__toggle-bar{
  transition: transform var(--animation-default);
  transform: translateY(-0.25em) rotate(0.001deg);  
}
.twostep-nav__toggle:hover .twostep-nav__toggle-bar {
  transform: translateY(0.25em) rotate(0.001deg);
}
.twostep-nav__toggle .twostep-nav__toggle-bar:nth-child(2) {
  transform: translateY(0.15em) rotate(0.001deg);
}
.twostep-nav__toggle:hover .twostep-nav__toggle-bar:nth-child(2) {
  transform: translateY(-0.15em) rotate(0.001deg);
}
[data-nav-status="active"] .twostep-nav__toggle .twostep-nav__toggle-bar {
  transform: translateY(0em) rotate(45deg);
}
[data-nav-status="active"] .twostep-nav__toggle .twostep-nav__toggle-bar:nth-child(2) {
  transform: translateY(0em) rotate(-45deg);
}
/* Page dark overlay */
.twostep-nav__bg {
  transition: opacity var(--animation-default), visibility var(--animation-default);
}
[data-nav-status="active"] .twostep-nav__bg {
  opacity: 1;
  visibility: visible;
}
/* Inner bar grow */
.twostep-nav__bar {
  transition: max-width var(--animation-default-long) 0.2s;
}
[data-nav-status="active"] .twostep-nav__bar {
  transition: max-width var(--animation-default) 0s;
  max-width: 100%;
}
/* Thin line in nav bar */
.twostep-nav__top-line {
  transition: all var(--animation-default) 0s;
  opacity: 0;
}
[data-nav-status="active"] .twostep-nav__top-line {
  transition: all var(--animation-default) 0.1s;
  opacity: 1;
}
@media screen and (max-width: 767px) {
  .twostep-nav__top-line {
    inset: auto 1em -0.5em;
  }
  [data-nav-status="active"] .twostep-nav__top-line {
    transition: all var(--animation-default) 0.2s;
    inset: auto 0em -0.5em;
  }
}
/* Nav bar background */
.twostep-nav__bar__bg,
[data-nav-status="active"] .twostep-nav__back-bg{
  transition: background-color var(--animation-ease);
}
.twostep-nav__back{
  transition: all var(--animation-default);
  inset: 0em;
}
[data-nav-status="active"]  .twostep-nav__back {
  inset: -0.25em;
}
@media screen and (max-width: 767px) {
  [data-nav-status="active"]  .twostep-nav__back {
    inset: -1.25em;
  }  
}
/* Nav bottom */
.twostep-nav__bottom {
  transition: grid-template-rows var(--animation-default) 0s;
}
[data-nav-status="active"] .twostep-nav__bottom {
  transition: grid-template-rows var(--animation-default-long) 0.25s;
  grid-template-rows: 1fr;
}
@media screen and (max-width: 767px) {
  .twostep-nav__bottom {
    transition: grid-template-rows var(--animation-default) 0s, transform var(--animation-default) 0s;
    transform: translateY(-0.625em);
  }
  [data-nav-status="active"] .twostep-nav__bottom {
    transition: grid-template-rows var(--animation-default-long) 0.25s, transform var(--animation-default) 0.25s;
    transform: translateY(0em);
  }
}
/* Nav columns reveal */
.twostep-nav__bottom-row > * {
  transition: all var(--animation-default) 0s;
  transform: translateY(2em);
  opacity: 0;
}
.twostep-nav__bottom-row > *:nth-child(2) {
 transition-delay: 0.075s;
}
[data-nav-status="active"] .twostep-nav__bottom-row > * {
  transition: all var(--animation-default-long) 0.5s;
  transform: translateY(0em);
  opacity: 1;
}
[data-nav-status="active"] .twostep-nav__bottom-row > *:nth-child(2) {
  transition-delay: 0.575s;
}
```
### Javascript
```javascript
function initTwostepScalingNavigation() {
  const navElement = document.querySelector("[data-twostep-nav]")
  const navStatusEl = document.querySelector("[data-nav-status]");
  if (!navElement || !navStatusEl) return;
  const setNavStatus = (status) => {
    navStatusEl.setAttribute("data-nav-status", status);
  };
  const isActive = () => navStatusEl.getAttribute("data-nav-status") === "active";
  const openNav = () => {
    setNavStatus("active");
    // If you use Lenis, you could pause the scroll here:
    // Lenis.stop?.();
  };
  const closeNav = () => {
    setNavStatus("not-active");
    // If you use Lenis, you could resume scroll here:
    // Lenis.start?.();
  };
  const toggleNav = () => (isActive() ? closeNav() : openNav());
  // Toggle buttons
  document.querySelectorAll('[data-nav-toggle="toggle"]').forEach((btn) => {
    btn.addEventListener("click", toggleNav);
  });
  // Close buttons
  document.querySelectorAll('[data-nav-toggle="close"]').forEach((btn) => {
    btn.addEventListener("click", closeNav);
  });
  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isActive()) closeNav();
  });
}
// Initialize Two-step Scaling Navigation
document.addEventListener("DOMContentLoaded", () => {
  initTwostepScalingNavigation();
});
```
### CSS
```text
[data-twostep-nav]{
  --cubic-default: cubic-bezier(0.625, 0.05, 0, 1);
  --animation-ease: 0.2s ease;
  --duration-default: 0.5s;
  --duration-default-long: 0.75s; 
  --duration-default-half: 0.25s; 
  --animation-default: var(--duration-default) var(--cubic-default);
  --animation-default-long: var(--duration-default-long) var(--cubic-default);
  --animation-default-half: var(--duration-default-half) var(--cubic-default);
}
/* Menu button */
.twostep-nav__toggle-bar{
  transition: transform var(--animation-default);
  transform: translateY(-0.25em) rotate(0.001deg);  
}
.twostep-nav__toggle:hover .twostep-nav__toggle-bar {
  transform: translateY(0.25em) rotate(0.001deg);
}
.twostep-nav__toggle .twostep-nav__toggle-bar:nth-child(2) {
  transform: translateY(0.15em) rotate(0.001deg);
}
.twostep-nav__toggle:hover .twostep-nav__toggle-bar:nth-child(2) {
  transform: translateY(-0.15em) rotate(0.001deg);
}
[data-nav-status="active"] .twostep-nav__toggle .twostep-nav__toggle-bar {
  transform: translateY(0em) rotate(45deg);
}
[data-nav-status="active"] .twostep-nav__toggle .twostep-nav__toggle-bar:nth-child(2) {
  transform: translateY(0em) rotate(-45deg);
}
/* Page dark overlay */
.twostep-nav__bg {
  transition: opacity var(--animation-default), visibility var(--animation-default);
}
[data-nav-status="active"] .twostep-nav__bg {
  opacity: 1;
  visibility: visible;
}
/* Inner bar grow */
.twostep-nav__bar {
  transition: max-width var(--animation-default-long) 0.2s;
}
[data-nav-status="active"] .twostep-nav__bar {
  transition: max-width var(--animation-default) 0s;
  max-width: 100%;
}
/* Thin line in nav bar */
.twostep-nav__top-line {
  transition: all var(--animation-default) 0s;
  opacity: 0;
}
[data-nav-status="active"] .twostep-nav__top-line {
  transition: all var(--animation-default) 0.1s;
  opacity: 1;
}
@media screen and (max-width: 767px) {
  .twostep-nav__top-line {
    inset: auto 1em -0.5em;
  }
  [data-nav-status="active"] .twostep-nav__top-line {
    transition: all var(--animation-default) 0.2s;
    inset: auto 0em -0.5em;
  }
}
/* Nav bar background */
.twostep-nav__bar__bg,
[data-nav-status="active"] .twostep-nav__back-bg{
  transition: background-color var(--animation-ease);
}
.twostep-nav__back{
  transition: all var(--animation-default);
  inset: 0em;
}
[data-nav-status="active"]  .twostep-nav__back {
  inset: -0.25em;
}
@media screen and (max-width: 767px) {
  [data-nav-status="active"]  .twostep-nav__back {
    inset: -1.25em;
  }  
}
/* Nav bottom */
.twostep-nav__bottom {
  transition: grid-template-rows var(--animation-default) 0s;
}
[data-nav-status="active"] .twostep-nav__bottom {
  transition: grid-template-rows var(--animation-default-long) 0.25s;
  grid-template-rows: 1fr;
}
@media screen and (max-width: 767px) {
  .twostep-nav__bottom {
    transition: grid-template-rows var(--animation-default) 0s, transform var(--animation-default) 0s;
    transform: translateY(-0.625em);
  }
  [data-nav-status="active"] .twostep-nav__bottom {
    transition: grid-template-rows var(--animation-default-long) 0.25s, transform var(--animation-default) 0.25s;
    transform: translateY(0em);
  }
}
/* Nav columns reveal */
.twostep-nav__bottom-row > * {
  transition: all var(--animation-default) 0s;
  transform: translateY(2em);
  opacity: 0;
}
.twostep-nav__bottom-row > *:nth-child(2) {
 transition-delay: 0.075s;
}
[data-nav-status="active"] .twostep-nav__bottom-row > * {
  transition: all var(--animation-default-long) 0.5s;
  transform: translateY(0em);
  opacity: 1;
}
[data-nav-status="active"] .twostep-nav__bottom-row > *:nth-child(2) {
  transition-delay: 0.575s;
}
```
### Implementation
#### Container
Wrap the whole component in a single navigation root using `[data-twostep-nav]`, which acts as the scope for the two-step scaling behavior and also defines the animation variables that drive the timing and easing.
#### Status
State is controlled by `[data-nav-status]`, which flips between `active` and `not-active` so the CSS can trigger the overlay, bar expansion, and the bottom section reveal.
#### Toggle
Any element with `[data-nav-toggle="toggle"]` will open or close the navigation by switching the status attribute, making it easy to add multiple open buttons without changing the script.
#### Close
Elements marked with `[data-nav-toggle="close"]` always force the navigation back to the non-active state, which is ideal for things like the dark overlay, a close icon, or any “back” interaction inside the menu.
#### Escape
When the navigation is open, pressing Escape will set the status back to `non-active` via the same logic, so keyboard users have a consistent way to dismiss the menu without needing to hunt for a close button.
#### Overlay
The dark background layer over the page while the nav is `active`, doubles as a click target by adding `[data-nav-toggle="close"]` to it.
#### Bar size
The small and large sizes of the nav bar are handled by animating max-width on `.twostep-nav__bar`, where the closed state is capped (for example `max-width: 25em`) and the open state expands to fill the container when `[data-nav-status="active"]` is present.
The overall width limit comes from `.twostep-nav__width` (for example `max-width: 48em`). So changing this unit, will change the size to which the bar expands when the nav is opened.
#### Bottom Reveal
The menu content reveal is driven by `.twostep-nav__bottom` and `.twostep-nav__bottom-row`, using `grid-template-rows` and `translate` and `opacity` transitions so the bottom area opens first and the inner items rise into place right after.
#### Animation Variables
Most motion is controlled via the variables set on `[data-twostep-nav]`, which keeps the system cohesive and makes global tuning straightforward by changing durations and easing in one place.
#### Timing Tweaks
A few moments are intentionally hardcoded as small delays for choreography, like the inner bar grow starting at 0.2s, the bottom opening at 0.25s, and the second column reveal using 0.075s and 0.575s, which are knobs to play with when you want the sequence to feel snappier or more dramatic without changing the whole system.
Ilja van Eck