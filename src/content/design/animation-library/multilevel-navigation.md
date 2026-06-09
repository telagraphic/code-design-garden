---
title: "Multilevel Navigation"
description: "Multilevel Navigation."
slug: "multilevel-navigation"
previewVideo: "multilevel-navigation.mp4"
order: 49.895
published: true
categories: ["navigation"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["multilevel", "navigation"]
sourceUrl: "https://www.osmo.supply/resource/multilevel-navigation"
---
## Setup
### HTML
```text
<nav data-menu-status="closed" class="nav">
  <div class="nav-container">
    <div class="nav-bg"></div>
    <div class="nav-inner">
      <a href="#" class="nav-logo">
      </a>
      <div class="nav-center">
        <ul class="nav-center__list">
          <li>
            <button data-dropdown-toggle="" class="nav-link">
              <span class="nav-link__label">Products</span>
            </button>
            <div class="nav-dropdown">
              <div class="nav-dropdown__overflow">
                <div class="nav-dropdown__overflow-inner">
                  <div class="nav-container">
                    <ul class="nav-dropdown__content">
                      <li class="nav-dropdown__content-li">
                        <a href="#" class="nav-dropdown__link">
                          <div class="nav-dropdown__link-bg">
                            <div class="nav-dropdown__img-overlay"></div>
                          </div>
                          <div class="nav-dropdown__link-inner">
                            <span class="nav-dropdown__link-label">Olaf</span>
                            <div class="nav-dropdown__link-bubble">
                            </div>
                          </div>
                        </a>
                      </li>
                      <li class="nav-dropdown__content-li">
                        <a href="#" class="nav-dropdown__link ">
                          <div class="nav-dropdown__link-bg">
                            <div class="nav-dropdown__img-overlay"></div>
                          </div>
                          <div class="nav-dropdown__link-inner">
                            <span class="nav-dropdown__link-label">Stijn</span>
                            <div class="nav-dropdown__link-bubble">
                            </div>
                          </div>
                        </a>
                      </li>
                      <li class="nav-dropdown__content-li">
                        <a href="#" class="nav-dropdown__link">
                          <div class="nav-dropdown__link-bg">
                            <div class="nav-dropdown__img-overlay"></div>
                          </div>
                          <div class="nav-dropdown__link-inner">
                            <span class="nav-dropdown__link-label">Kees</span>
                            <div class="nav-dropdown__link-bubble">
                            </div>
                          </div>
                        </a>
                      </li>
                      <li class="nav-dropdown__content-li">
                        <a href="#" class="nav-dropdown__link">
                          <div class="nav-dropdown__link-bg">
                            <div class="nav-dropdown__img-overlay"></div>
                          </div>
                          <div class="nav-dropdown__link-inner">
                            <span class="nav-dropdown__link-label">Nelis</span>
                            <div class="nav-dropdown__link-bubble">
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <button data-dropdown-toggle="" class="nav-link">
              <span class="nav-link__label">Services</span>
            </button>
            <div class="nav-dropdown">
              <div class="nav-dropdown__overflow">
                <div class="nav-dropdown__overflow-inner">
                  <div class="nav-container">
                    <ul class="nav-dropdown__content">
                      <li class="nav-dropdown__content-li">
                        <a href="#" class="nav-dropdown__link is--static">
                          <div class="nav-dropdown__link-inner">
                            <span class="nav-dropdown__link-label">Custom Pieces</span>
                            <div class="nav-dropdown__link-bubble">
                            </div>
                          </div>
                        </a>
                      </li>
                      <li class="nav-dropdown__content-li">
                        <a href="#" class="nav-dropdown__link is--static">
                          <div class="nav-dropdown__link-inner">
                            <span class="nav-dropdown__link-label">Renovation</span>
                            <div class="nav-dropdown__link-bubble">
                            </div>
                          </div>
                        </a>
                      </li>
                      <li class="nav-dropdown__content-li">
                        <a href="#" class="nav-dropdown__link is--static">
                          <div class="nav-dropdown__link-inner">
                            <span class="nav-dropdown__link-label">Wholesale</span>
                            <div class="nav-dropdown__link-bubble">
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="#" class="nav-link"><span class="nav-link__label">About</span></a>
          </li>
          <li>
            <a href="#" class="nav-link"><span class="nav-link__label">News</span></a>
          </li>
        </ul>
      </div>
      <div class="nav-end">
        <a href="#" class="nav-button md--hide">
          <span>Contact Us</span>
        </a>
        <a href="#" class="nav-button is--primary">
          <span>Enquire Now</span>
        </a>
        <button data-menu-button="" aria-label="toggle menu" class="menu-button">
          <div class="menu-button__line"></div>
          <div class="menu-button__line"></div>
        </button>
      </div>
    </div>
  </div>
  <div class="page-bg"></div>
</nav>
```
### CSS
```text
:root{
  --nav-bg-height: calc(20em + calc(2em + 3em + 2.5em + 3em));
  --cubic-default: cubic-bezier(0.525, 0, 0, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.450s;
  --color-dark: #2b1d15;
}
a{
  color: inherit;
  text-decoration: none;
}
a:focus-visible, button:focus-visible{
  outline: 1px solid var(--color-dark);
}
.nav {
  z-index: 100;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: color var(--duration-fast) var(--cubic-default);
}
.nav-inner {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 2em;
  display: flex;
  position: relative;
}
.nav-container {
  z-index: 1;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 3em;
  padding-right: 3em;
  position: relative;
}
.resource-bg {
  color: #fff;
  flex-flow: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 100svh;
  padding-bottom: 2em;
  padding-left: 2.5em;
  display: flex;
  position: relative;
}
.resource-bg__img {
  z-index: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
}
.resource-bg__heading {
  z-index: 1;
  margin-top: 0;
  margin-bottom: 0;
  font-size: clamp(100px, 15vw, 200px);
  font-weight: 500;
  line-height: 1;
  position: relative;
}
.nav-logo {
  width: 6.75em;
}
.nav-end {
  grid-column-gap: .75em;
  grid-row-gap: .75em;
  justify-content: flex-end;
  align-items: stretch;
  display: flex;
}
.nav-button {
  border: 1px solid;
  border-radius: .25em;
  justify-content: center;
  align-items: center;
  height: 3em;
  padding-left: 1em;
  padding-right: 1em;
  font-size: 1em;
  line-height: 1.4;
  display: flex;
  transition: all var(--duration-fast) var(--cubic-default);
}
.nav-button.is--primary {
  color: #2b1d15;
  background-color: #fff;
  border-color: #fff;
}
.nav-center__list {
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  display: flex;
}
.nav-link {
  grid-column-gap: .375em;
  grid-row-gap: .375em;
  background-color: #0000;
  border-radius: .25em;
  justify-content: center;
  align-items: center;
  padding: .75em 1.25em;
  display: flex;
}
.nav-link__label {
  font-size: 1.25em;
  line-height: 1;
  position: relative;
}
.nav-link__dropdown-icon {
  width: .875em;
}
.nav-dropdown {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  width: 100%;
  padding-top: 2.5em;
  padding-bottom: 3em;
  position: fixed;
  left: 0;
  right: 0;
  transition: all var(--duration-fast) ease, transform var(--duration-normal) var(--cubic-default);
}
.nav-dropdown.visible {
  opacity: 100;
  pointer-events: auto;
  visibility: visible;
}
.nav-bg {
  background-color: #fff;
  border-bottom-right-radius: .75em;
  border-bottom-left-radius: .75em;
  width: 100%;
  height: 0;
  position: absolute;
  inset: 0% 0% auto;
  transition: height var(--duration-normal) var(--cubic-default); 
}
.nav-dropdown__content {
  grid-column-gap: 1.25em;
  grid-row-gap: 1.25em;
  width: 100%;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  display: flex;
}
.nav-dropdown__content-li {
  flex: 1;
}
.nav-dropdown__link {
  color: #fff;
  background-color: #ebe7e4;
  border-radius: .25em;
  flex-flow: column;
  flex: 1;
  justify-content: flex-end;
  align-items: stretch;
  height: 20em;
  padding: 1.5em;
  display: flex;
  position: relative;
  overflow: hidden;
}
.nav-dropdown__link.is--static {
  color: #2b1d15;
  transition: background-color .2s cubic-bezier(.625, .05, 0, 1);
}
.nav-dropdown__link-inner {
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  display: flex;
  position: relative;
}
.nav-dropdown__link-label {
  font-size: 1.75em;
  transition: transform .2s cubic-bezier(.625, .05, 0, 1);
}
.nav-dropdown__link-bubble {
  color: #fff;
  background-color: #2b1d15;
  border-radius: 100em;
  justify-content: center;
  align-items: center;
  width: 1.5em;
  height: 1.5em;
  padding: .25em;
  transition: transform .2s cubic-bezier(.625, .05, 0, 1);
  display: flex;
}
.icon {
  width: 100%;
  height: 100%;
}
.nav-dropdown__link-bg {
  position: absolute;
  inset: 0%;
}
.nav-dropdown__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform .35s cubic-bezier(.625, .05, 0, 1);
}
.nav-dropdown__img-overlay {
  z-index: 1;
  opacity: .25;
  background-image: linear-gradient(#0000, #0000 50%, #000);
  transition: opacity .2s cubic-bezier(.625, .05, 0, 1);
  position: absolute;
  inset: 0%;
}
.page-bg {
  z-index: 0;
  opacity: 0;
  pointer-events: none;
  background-color: #0000004d;
  width: 100%;
  height: 100vh;
  position: absolute;
  inset: 0% 0% auto;
  transition: opacity var(--duration-fast) var(--cubic-default);
}
.menu-button {
  grid-column-gap: .25em;
  grid-row-gap: .25em;
  background-color: currentColor;
  border-radius: .25em;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 3em;
  height: 3em;
  padding: .75em;
  display: none;
}
.menu-button.is--primary {
  color: #2b1d15;
  background-color: #fff;
  border-color: #fff;
}
.menu-button__line {
  background-color: #2b1d15;
  width: 100%;
  height: 1px;
}
/* ———— SHOW DROPDOWN ———— */
.nav-dropdown{ 
 transition: all var(--duration-fast) ease, transform var(--duration-normal) var(--cubic-default);
}
[data-dropdown-toggle]:hover + .nav-dropdown,
[data-dropdown-toggle]:focus-visible + .nav-dropdown,
.nav-dropdown:hover,
.nav-dropdown:focus-within{
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
/* ———— STYLING WHEN DROPDOWN IS OPEN ———— */
:is(
  body:has([data-dropdown-toggle]:hover),
  body:has([data-dropdown-toggle]:focus-visible),
  body:has([data-dropdown-toggle]:focus-within),
  body:has(.nav-dropdown:hover),
  body:has(.nav-dropdown:focus-within)
){
  .nav-bg{
    height: var(--nav-bg-height);
  }
  .page-bg{
    opacity: 1;
  }
  .nav{
    color: var(--color-dark);
  }
  .nav-button{
    border-color: var(--color-dark);
    color: var(--color-dark);
  }
  .nav-button.is--primary{
    background-color: var(--color-dark);
    border-color: var(--color-dark);
    color: #FFF;
  }
}
/* ———— DROPDOWN TOGGLE ———— */
.nav-link__dropdown-icon{ 
  transition: transform var(--duration-normal) var(--cubic-default);
}
[data-dropdown-toggle]{
  transition: background-color var(--duration-fast) var(--cubic-default);
}
/* ———— DESKTOP HOVER AND FOCUS ———— */
@media screen and (min-width: 768px){
  [data-dropdown-toggle]:hover .nav-link__dropdown-icon,
  [data-dropdown-toggle]:focus .nav-link__dropdown-icon,
  [data-dropdown-toggle]:focus-within .nav-link__dropdown-icon,
  [data-dropdown-toggle]:has(+ .nav-dropdown:hover) .nav-link__dropdown-icon,
  [data-dropdown-toggle]:has(+ .nav-dropdown:focus-within) .nav-link__dropdown-icon{
    transform: rotate(180deg);
  }
  [data-dropdown-toggle]:hover,
  [data-dropdown-toggle]:focus,
  [data-dropdown-toggle]:focus-within,
  [data-dropdown-toggle]:has(+ .nav-dropdown:hover),
  [data-dropdown-toggle]:has(+ .nav-dropdown:focus-within){
    background-color: #EBE7E4;
  }
}
/ *————  DROPDOWN CONTENT LIST ITEMS ———— */
.nav-dropdown__content-li{
 transition: all var(--duration-normal) var(--cubic-default);
 transition-delay: 0.18s;
 opacity:0;
 transform: translate(4em, 0px);
}
.nav-dropdown__content-li:nth-child(2){ transition-delay:0.24s; }
.nav-dropdown__content-li:nth-child(3){ transition-delay:0.3s; }
.nav-dropdown__content-li:nth-child(4){ transition-delay:0.36s; }
.nav-dropdown__content-li:nth-child(5){ transition-delay:0.44s; }
body:has([data-dropdown-toggle]:hover) [data-dropdown-toggle]:hover + .nav-dropdown .nav-dropdown__content-li,
body:has([data-dropdown-toggle]:focus-visible) .nav-dropdown__content-li,
body:has([data-dropdown-toggle]:focus-within) .nav-dropdown__content-li,
body:has(.nav-dropdown:hover) .nav-dropdown__content-li,
body:has(.nav-dropdown:focus-within) .nav-dropdown__content-li{
  opacity: 1;
  transform: translate(0em, 0px);
}
/* ————  DROPDOWN LINKS + IMAGES ———— */
.nav-dropdown__link:hover .nav-dropdown__img-overlay,
.nav-dropdown__link:focus-visible .nav-dropdown__img-overlay{
  opacity: 0;
}
.nav-dropdown__link:hover .nav-dropdown__img,
.nav-dropdown__link:focus-visible .nav-dropdown__img{
  transform: scale(1.1);
}
/* ———— DROPDOWN LINKS ———— */
.nav-dropdown__link.is--static:hover,
.nav-dropdown__link.is--static:focus-visible{
  background: #D7D1CD;
}
/* ———— NAV LINKS ———— */
a.nav-link .nav-link__label::after{
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transition: transform var(--duration-normal) var(--cubic-default);
  transform: scale(0, 1);
  transform-origin: right center;
}
a.nav-link:hover .nav-link__label::after,
a.nav-link:focus-visible .nav-link__label::after{
  transform: scale(1, 1);
  transform-origin: left center;
}
@media screen and (max-width: 991px) {
  .nav-inner {
    padding-top: 1.25em;
  }
  .nav-container {
    padding-left: 1.25em;
    padding-right: 1.25em;
  }
  .nav-button.md--hide {
    display: none;
  }
  .nav-link {
    padding-left: 1em;
    padding-right: 1em;
  }
  .nav-link__label {
    font-size: 1em;
  }
  .md--hide, .menu-button.md--hide {
    display: none;
  }
}
@media screen and (max-width: 767px) {
  .nav-logo {
    z-index: 1;
    position: relative;
  }
  .nav-end {
    z-index: 2;
    position: relative;
  }
  .nav-center {
    z-index: 0;
    opacity: 0;
    visibility: hidden;
    height: 100dvh;
    position: absolute;
    top: 0;
    left: -1.25em;
    right: -1.25em;
    transform: translate(0, 1em);
  }
  .nav-center__list {
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
    height: 100%;
    padding-top: 8em;
    overflow: hidden scroll;
  }
  .nav-link {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1em 1.25em;
  }
  .nav-link__label {
    font-size: 2em;
  }
  .nav-dropdown {
    opacity: 100;
    pointer-events: auto;
    visibility: visible;
    padding-top: 0;
    padding-bottom: 0;
    position: relative;
    inset: auto;
  }
  .nav-bg {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    height: 0;
  }
  .nav-dropdown__overflow {
    grid-template-rows: 0fr;
    width: 100%;
    display: grid;
    position: relative;
    overflow: hidden;
  }
  .nav-dropdown__overflow-inner {
    flex-flow: column;
    width: 100%;
    height: 1000000%;
    display: flex;
    position: relative;
    overflow: hidden;
  }
  .nav-dropdown__content {
    grid-gap: .75em;
    grid-template-columns: repeat(2, 1fr);
    padding-top: 1em;
    padding-bottom: 1em;
    display: grid;
  }
  .nav-dropdown__link {
    aspect-ratio: 1;
    height: auto;
    padding: 1em;
  }
  .nav-dropdown__link-label {
    font-size: 1.25em;
  }
  .sm--hide {
    display: none;
  }
  .menu-button {
    display: flex;
  }
  :root{
    --nav-bg-height: 100dvh;
  }
  .nav-dropdown__overflow{
    transition: grid-template-rows var(--duration-normal) var(--cubic-default);
  }
  .nav-center{
    transition: all var(--duration-normal) var(--cubic-default), opacity var(--duration-fast) var(--cubic-default);
  }
  .menu-button__line{
    transition: all var(--duration-normal) var(--cubic-default);
  }
   /* ———— STYLES WHEN MENU IS OPEN ———— */ 
  :is(
    [data-menu-status="open"]
  ){
    color: var(--color-dark);
    .menu-button__line:nth-of-type(1){
      transform: translate(0px, 0.125em) rotate(135deg);
      background-color: #FFF;
    }
    .menu-button__line:nth-of-type(2){
      transform: translate(0px, -0.175em) rotate(-135deg);
      background-color: #FFF;
    }  
    .nav-bg{
      height: var(--nav-bg-height);
    }
    .page-bg{
      opacity: 1;
    }
    .nav-button.is--primary{
      background-color: var(--color-dark);
      border-color: var(--color-dark);
      color: #FFF;
    }
    .nav-center{
      opacity: 1;
      visibility: visible;
      transform: translate(0px, 0em);
      transition-delay: 0.1s;
    }
  }
  [data-dropdown-toggle="open"] + .nav-dropdown .nav-dropdown__overflow{
    grid-template-rows: 1fr;
  }
  [data-dropdown-toggle="open"] + .nav-dropdown .nav-dropdown__content-li{
    opacity: 1;
    transform: translate(0em, 0px);
  }
  [data-dropdown-toggle="open"] .nav-link__dropdown-icon{
    transform: rotate(180deg);
  }
}
@media screen and (max-width: 479px) {
  .resource-bg__heading {
    font-size: clamp(40px, 15vw, 200px);
  }
  .nav-logo {
    width: 5em;
  }
  .nav-end {
    grid-column-gap: .5em;
    grid-row-gap: .5em;
  }
  .nav-button.is--primary {
    height: 2.5em;
    padding-left: .75em;
    padding-right: .75em;
  }
  .nav-dropdown__link {
    padding: .75em;
  }
  .nav-dropdown__link-label {
    font-size: 1em;
  }
  .nav-dropdown__link-bubble {
    width: 1.25em;
    height: 1.25em;
    padding: .375em;
  }
  .xs--hide {
    display: none;
  }
  .menu-button {
    width: 2.5em;
    height: 2.5em;
  }
}
```
### Javascript
```javascript
function initNavigation() {
  if (!initNavigation._hasResizeListener) {
    initNavigation._hasResizeListener = true;
    window.addEventListener('resize', debounce(initNavigation, 200));
  }
  const isMobile = window.innerWidth < 768;
  if (isMobile && initNavigation._lastMode !== 'mobile') {
    initMobileMenu();
    initNavigation._lastMode = 'mobile';
  } else if (!isMobile && initNavigation._lastMode !== 'desktop') {
    initDesktopDropdowns();
    initNavigation._lastMode = 'desktop';
  }
}
function debounce(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
function initMobileMenu() {
  const btn = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-menu-status]');
  if (!btn || !nav) return;
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mobile-navigation');
  nav.setAttribute('id', 'mobile-navigation');
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');
  if (!btn._mobileClick) {
    btn._mobileClick = true;
    btn.addEventListener('click', () => {
      const open = nav.dataset.menuStatus === 'open';
      nav.dataset.menuStatus = open ? 'closed' : 'open';
      btn.setAttribute('aria-expanded', !open);
      // Close all dropdowns when closing the menu
      if (open) {
        Array.from(document.querySelectorAll('[data-dropdown-toggle]')).forEach(toggle => {
          toggle.dataset.dropdownToggle = 'closed';
          toggle.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }
  Array.from(document.querySelectorAll('[data-dropdown-toggle]')).forEach((toggle, i) => {
    const dd = toggle.nextElementSibling;
    if (!dd || !dd.classList.contains('nav-dropdown')) return;
    if (toggle._mobileDropdownInit) return;
    toggle._mobileDropdownInit = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-controls', \`dropdown-${i}\`);
    dd.setAttribute('id', \`dropdown-${i}\`);
    dd.setAttribute('role', 'menu');
    dd.querySelectorAll('.nav-dropdown__link')
      .forEach(link => link.setAttribute('role', 'menuitem'));
    toggle.addEventListener('click', () => {
      const open = toggle.dataset.dropdownToggle === 'open';
      Array.from(document.querySelectorAll('[data-dropdown-toggle]'))
        .forEach(other => {
          if (other !== toggle) {
            other.dataset.dropdownToggle = 'closed';
            other.setAttribute('aria-expanded', 'false');
            if (other === document.activeElement) other.blur();
          }
        });
      toggle.dataset.dropdownToggle = open ? 'closed' : 'open';
      toggle.setAttribute('aria-expanded', !open);
      if (open && toggle === document.activeElement) toggle.blur();
    });
  });
}
function initDesktopDropdowns() {
  const toggles = Array.from(document.querySelectorAll('[data-dropdown-toggle]'));
  const links = Array.from(document.querySelectorAll('.nav-link:not([data-dropdown-toggle])'));
  toggles.forEach((toggle, i) => {
    const dd = toggle.nextElementSibling;
    if (!dd || !dd.classList.contains('nav-dropdown') || toggle._desktopInit) return;
    toggle._desktopInit = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-controls', \`desktop-dropdown-${i}\`);
    dd.setAttribute('id', \`desktop-dropdown-${i}\`);
    dd.setAttribute('role', 'menu');
    dd.setAttribute('aria-hidden', 'true');
    dd.querySelectorAll('.nav-dropdown__link')
      .forEach(link => link.setAttribute('role', 'menuitem'));
    toggle.addEventListener('click', e => {
      e.preventDefault();
      toggles.forEach(other => {
        if (other !== toggle) {
          other.dataset.dropdownToggle = 'closed';
          other.setAttribute('aria-expanded', 'false');
          const otherDropdown = other.nextElementSibling;
          if (otherDropdown) otherDropdown.setAttribute('aria-hidden', 'true');
        }
      });
      const open = toggle.dataset.dropdownToggle !== 'open';
      toggle.dataset.dropdownToggle = 'open';
      toggle.setAttribute('aria-expanded', 'true');
      dd.setAttribute('aria-hidden', 'false');
      if (open) {
        const first = dd.querySelector('.nav-dropdown__link');
        if (first) first.focus();
      }
    });
    toggle.addEventListener('mouseenter', () => {
      const anyOpen = toggles.some(x => x.dataset.dropdownToggle === 'open');
      toggles.forEach(other => {
        if (other !== toggle) {
          other.dataset.dropdownToggle = 'closed';
          other.setAttribute('aria-expanded', 'false');
          const otherDropdown = other.nextElementSibling;
          if (otherDropdown) otherDropdown.setAttribute('aria-hidden', 'true');
        }
      });
      if (anyOpen) {
        setTimeout(() => {
          toggle.dataset.dropdownToggle = 'open';
          toggle.setAttribute('aria-expanded', 'true');
          dd.setAttribute('aria-hidden', 'false');
        }, 20);
      } else {
        toggle.dataset.dropdownToggle = 'open';
        toggle.setAttribute('aria-expanded', 'true');
        dd.setAttribute('aria-hidden', 'false');
      }
    });
    dd.addEventListener('mouseleave', () => {
      toggle.dataset.dropdownToggle = 'closed';
      toggle.setAttribute('aria-expanded', 'false');
      dd.setAttribute('aria-hidden', 'true');
    });
    toggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      } else if (e.key === 'Escape') {
        toggle.dataset.dropdownToggle = 'closed';
        toggle.setAttribute('aria-expanded', 'false');
        dd.setAttribute('aria-hidden', 'true');
        toggle.focus();
      }
    });
    dd.addEventListener('keydown', e => {
      const items = Array.from(dd.querySelectorAll('.nav-dropdown__link'));
      const idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(idx + 1) % items.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        toggle.dataset.dropdownToggle = 'closed';
        toggle.setAttribute('aria-expanded', 'false');
        dd.setAttribute('aria-hidden', 'true');
        toggle.focus();
      } else if (e.key === 'Tab' && !dd.contains(e.relatedTarget)) {
        toggle.dataset.dropdownToggle = 'closed';
        toggle.setAttribute('aria-expanded', 'false');
        dd.setAttribute('aria-hidden', 'true');
      }
    });
  });
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      toggles.forEach(toggle => {
        toggle.dataset.dropdownToggle = 'closed';
        toggle.setAttribute('aria-expanded', 'false');
        const dd = toggle.nextElementSibling;
        if (dd) dd.setAttribute('aria-hidden', 'true');
      });
    });
  });
  document.addEventListener('click', e => {
    const inside = toggles.some(toggle => {
      const dd = toggle.nextElementSibling;
      return toggle.contains(e.target) || (dd && dd.contains(e.target));
    });
    if (!inside) {
      toggles.forEach(toggle => {
        toggle.dataset.dropdownToggle = 'closed';
        toggle.setAttribute('aria-expanded', 'false');
        const dd = toggle.nextElementSibling;
        if (dd) dd.setAttribute('aria-hidden', 'true');
      });
    }
  });
}
// Initialize Multilevel Navigation
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});
```
### CSS
```text
:root {
  --nav-bg-height: calc(20em + calc(2em + 3em + 2.5em + 3em));
  --cubic-default: cubic-bezier(0.525, 0, 0, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.450s;
  --color-dark: #2b1d15;
}
a {
  color: inherit;
  text-decoration: none;
}
a:focus-visible,
button:focus-visible {
  outline: 1px solid var(--color-dark);
}
.nav-bg {
  transition: height var(--duration-normal) var(--cubic-default);
}
.page-bg {
  transition: opacity var(--duration-fast) var(--cubic-default);
}
.nav {
  transition: color var(--duration-fast) var(--cubic-default);
}
.nav-button {
  transition: all var(--duration-fast) var(--cubic-default);
}
/* ———— SHOW DROPDOWN ———— */
.nav-dropdown {
  transition: all var(--duration-fast) ease, transform var(--duration-normal) var(--cubic-default);
}
[data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):hover+.nav-dropdown,
[data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):focus-visible+.nav-dropdown,
[data-dropdown-toggle]:not([data-dropdown-toggle="closed"])+.nav-dropdown:hover,
[data-dropdown-toggle]:not([data-dropdown-toggle="closed"])+.nav-dropdown:focus-within,
.wf-design-mode [data-dropdown-toggle="open"]+.nav-dropdown{
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
/*———— STYLING WHEN DROPDOWN IS OPEN ———— */
:is(body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):hover),
  body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):focus-visible),
  body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):focus-within),
  body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"])+.nav-dropdown:hover),
  body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"])+.nav-dropdown:focus-within)),
  .wf-design-mode body:has([data-dropdown-toggle="open"]){
  .nav-bg {
    height: var(--nav-bg-height);
  }
  .page-bg {
    opacity: 1;
  }
  .nav {
    color: var(--color-dark);
  }
  .nav-button {
    border-color: var(--color-dark);
    color: var(--color-dark);
  }
  .nav-button.is--primary {
    background-color: var(--color-dark);
    border-color: var(--color-dark);
    color: #FFF;
  }
}
/*———— DROPDOWN TOGGLE ———— */
.nav-link__dropdown-icon {
  transition: transform var(--duration-normal) var(--cubic-default);
}
[data-dropdown-toggle] {
  transition: background-color var(--duration-fast) var(--cubic-default);
}
/*———— DESKTOP HOVER AND FOCUS ———— */
@media screen and (min-width: 768px) {
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):hover .nav-link__dropdown-icon,
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):focus .nav-link__dropdown-icon,
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):focus-within .nav-link__dropdown-icon,
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):has(+ .nav-dropdown:hover) .nav-link__dropdown-icon,
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):has(+ .nav-dropdown:focus-within) .nav-link__dropdown-icon {
    transform: rotate(180deg);
  }
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):hover,
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):focus,
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):focus-within,
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):has(+ .nav-dropdown:hover),
  [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):has(+ .nav-dropdown:focus-within),
  .wf-design-mode body:has([data-dropdown-toggle"open"])+.nav-dropdown{
    background-color: #EBE7E4;
  }
}
/*————  DROPDOWN CONTENT LIST ITEMS ———— */
.nav-dropdown__content-li {
  transition: all var(--duration-normal) var(--cubic-default);
  transition-delay: 0.18s;
  opacity: 0;
  transform: translate(4em, 0px);
}
.nav-dropdown__content-li:nth-child(2) {
  transition-delay: 0.24s;
}
.nav-dropdown__content-li:nth-child(3) {
  transition-delay: 0.3s;
}
.nav-dropdown__content-li:nth-child(4) {
  transition-delay: 0.36s;
}
.nav-dropdown__content-li:nth-child(5) {
  transition-delay: 0.44s;
}
body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):hover) [data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):hover+.nav-dropdown .nav-dropdown__content-li,
body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):focus-visible) .nav-dropdown__content-li,
body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"]):focus-within) .nav-dropdown__content-li,
body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"])+.nav-dropdown:hover) .nav-dropdown__content-li,
body:has([data-dropdown-toggle]:not([data-dropdown-toggle="closed"])+.nav-dropdown:focus-within) .nav-dropdown__content-li,
.wf-design-mode [data-dropdown-toggle="open"]+.nav-dropdown .nav-dropdown__content-li{
  opacity: 1;
  transform: translate(0em, 0px);
}
/*————  DROPDOWN LINKS + IMAGES ———— */
.nav-dropdown__link:hover .nav-dropdown__img-overlay,
.nav-dropdown__link:focus-visible .nav-dropdown__img-overlay {
  opacity: 0;
}
.nav-dropdown__link:hover .nav-dropdown__img,
.nav-dropdown__link:focus-visible .nav-dropdown__img {
  transform: scale(1.1);
}
/*———— DROPDOWN LINKS ———— */
.nav-dropdown__link.is--static:hover,
.nav-dropdown__link.is--static:focus-visible {
  background: #D7D1CD;
}
/* ———— NAV LINKS ———— */
a.nav-link .nav-link__label::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transition: transform var(--duration-normal) var(--cubic-default);
  transform: scale(0, 1);
  transform-origin: right center;
}
a.nav-link:hover .nav-link__label::after,
a.nav-link:focus-visible .nav-link__label::after {
  transform: scale(1, 1);
  transform-origin: left center;
}
/* ———— MOBILE STATE WITH BURGER MENU ———— */
@media screen and (max-width: 767px) {
  :root {
    --nav-bg-height: 100dvh;
  }
  .nav-dropdown__overflow {
    transition: grid-template-rows var(--duration-normal) var(--cubic-default);
  }
  .nav-center {
    transition: all var(--duration-normal) var(--cubic-default), opacity var(--duration-fast) var(--cubic-default);
  }
  .menu-button__line {
    transition: all var(--duration-normal) var(--cubic-default);
  }
  /* ———— STYLES WHEN MENU IS OPEN ———— */
  :is([data-menu-status="open"]) {
    color: var(--color-dark);
    .menu-button__line:nth-of-type(1) {
      transform: translate(0px, 0.125em) rotate(135deg);
      background-color: #FFF;
    }
    .menu-button__line:nth-of-type(2) {
      transform: translate(0px, -0.175em) rotate(-135deg);
      background-color: #FFF;
    }
    .nav-bg {
      height: var(--nav-bg-height);
    }
    .page-bg {
      opacity: 1;
    }
    .nav-button.is--primary {
      background-color: var(--color-dark);
      border-color: var(--color-dark);
      color: #FFF;
    }
    .nav-center {
      opacity: 1;
      visibility: visible;
      transform: translate(0px, 0em);
      transition-delay: 0.1s;
    }
  }
  [data-dropdown-toggle="open"]+.nav-dropdown .nav-dropdown__overflow {
    grid-template-rows: 1fr;
  }
  [data-dropdown-toggle="open"]+.nav-dropdown .nav-dropdown__content-li {
    opacity: 1;
    transform: translate(0em, 0px);
  }
  [data-dropdown-toggle="open"] .nav-link__dropdown-icon {
    transform: rotate(180deg);
  }
}
```
### Documentation
This created with the aim of providing you with a thorough starting point for all your custom navigation bars. All of the animations are handled by CSS transition, so you're free to tweak any easing and duration as you want.
#### Responsiveness
To keep things organized, the elements that form the center nav links on desktop, are the same elements used for the mobile menu. So there's some pretty significant style changes happening on smaller breakpoints. In our example, we switch to a burger menu on screens smaller than 768px wide. You are free to change this to whatever breakpoint you want. Just make sure to:
- Update the CSS for the breakpoints accordingly
- Update the CSS media queries that decide between desktop/mobile animations
- Update the JS function for the dropdown toggles to match your new breakpoint
#### Edit dropdown content in Webflow
To make editing the dropdown contents in Webflow specifically a bit easier, you can set the `[data-dropdown-toggle="open"]` status on any dropdown toggle. Simply remove the `"open"` value again to continue editing the rest of the site.
Ilja van Eck