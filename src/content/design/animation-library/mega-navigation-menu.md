---
title: "Mega Navigation Menu"
description: "Full-width navigation with animated mega menu panels."
slug: "mega-navigation-menu"
previewVideo: "mega-navigation-menu.mp4"
order: 100
published: true
categories: ["navigation"]
triggers: ["hover", "click"]
libraries: ["gsap"]
keywords: ["nav", "menu", "mega"]
sourceUrl: "https://www.osmo.supply/resource/mega-navigation-directional-hover"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
```
### HTML
```text
<nav data-menu-open="false" data-menu-wrap="" class="mega-nav">
  <div class="mega-nav__bar">
    <div class="mega-nav__container">
      <div class="mega-nav__bar-start">
        <a data-menu-logo="" href="#" class="mega-nav__bar-logo w-inline-block">
        </a>
        <div data-nav-list="" data-mobile-nav="" class="mega-nav__bar-inner">
          <ul class="mega-nav__bar-list">
            <li data-nav-list-item="">
              <button data-dropdown-toggle="products" aria-expanded="false" aria-haspopup="true" class="mega-nav__bar-link is--dropdown">
                <span class="mega-nav__bar-link-label">Products</span>
              </button>
              </li>
            <li data-nav-list-item="">
              <button data-dropdown-toggle="solutions" aria-expanded="false" aria-haspopup="true" class="mega-nav__bar-link is--dropdown">
                <span class="mega-nav__bar-link-label">Solutions</span>
              </button>
              </li>
            <li data-nav-list-item="">
              <button data-dropdown-toggle="company" aria-expanded="false" aria-haspopup="true" class="mega-nav__bar-link is--dropdown">
                <span class="mega-nav__bar-link-label">Company</span>
              </button>
              </li>
            <li data-nav-list-item="">
              <a href="#" class="mega-nav__bar-link w-inline-block"><span class="mega-nav__bar-link-label">Pricing</span></a>
            </li>
          </ul>
          <ul data-nav-list-item="" class="mega-nav__bar-list is--actions">
            <li class="mega-nav__bar-action">
              <a href="#" class="mega-nav__bar-cta is--secondary w-inline-block"><span class="mega-nav__bar-link-label">Log in</span></a>
            </li>
            <li class="mega-nav__bar-action">
              <a href="#" class="mega-nav__bar-cta w-inline-block">
                <span class="mega-nav__bar-link-label">Get Started</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="mega-nav__bar-end">
          <button data-burger-toggle="" aria-label="toggle menu" aria-expanded="false" class="mega-nav__burger">
            <span data-burger-line="top" class="mega-nav__burger-line"></span>
            <span data-burger-line="mid" class="mega-nav__burger-line"></span>
            <span data-burger-line="bot" class="mega-nav__burger-line"></span>
          </button>
        </div>
        <div data-mobile-back="" class="mega-nav__back">
          <button aria-label="back to menu" class="mega-nav__bar-link is--back">
            <span class="mega-nav__bar-link-label">Back</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div data-dropdown-wrapper="" class="mega-nav__dropdown-wrapper">
    <div data-dropdown-container="" class="mega-nav__dropdown-container">
      <div data-dropdown-bg="" class="mega-nav__dropdown-bg"></div>
      <div data-panel-state="" data-nav-content="products" role="region" aria-label="products menu" class="mega-nav__dropdown-panel">
        <div class="mega-nav__dropdown-inner">
          <div data-menu-fade="" class="mega-nav__panel-col"><span data-menu-fade="" class="mega-nav__panel-label">Platform</span>
            <ul class="mega-nav__panel-list">
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Overview</span><span class="mega-nav__panel-link-desc">See the full platform</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Analytics</span><span class="mega-nav__panel-link-desc">Track and measure</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Integrations</span><span class="mega-nav__panel-link-desc">Connect your tools</span></a>
              </li>
            </ul>
          </div>
          <div data-menu-fade="" class="mega-nav__panel-col"><span data-menu-fade="" class="mega-nav__panel-label">Features</span>
            <ul class="mega-nav__panel-list">
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Automation</span><span class="mega-nav__panel-link-desc">Streamline workflows</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Reporting</span><span class="mega-nav__panel-link-desc">Generate insights</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">AI</span><span class="mega-nav__panel-link-desc">Build custom integrations</span></a>
              </li>
            </ul>
          </div>
          <div data-menu-fade="" class="mega-nav__panel-col is--colored"><span data-menu-fade="" class="mega-nav__panel-label">Infrastructure</span>
            <ul class="mega-nav__panel-list">
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Cloud</span><span class="mega-nav__panel-link-desc">Managed hosting</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Security</span><span class="mega-nav__panel-link-desc">Enterprise grade</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div data-panel-state="" data-nav-content="solutions" role="region" aria-label="products menu" class="mega-nav__dropdown-panel">
        <div class="mega-nav__dropdown-inner">
          <div data-menu-fade="" class="mega-nav__panel-col"><span data-menu-fade="" class="mega-nav__panel-label">By use case</span>
            <ul class="mega-nav__panel-list">
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">SaaS</span><span class="mega-nav__panel-link-desc">Sell online at scale</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">E-commerce</span><span class="mega-nav__panel-link-desc">Subscription businesses</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Marketplaces</span><span class="mega-nav__panel-link-desc">Multi-vendor platforms</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Platforms</span><span class="mega-nav__panel-link-desc">Built on top of Osmo</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Creator economy</span><span class="mega-nav__panel-link-desc">Monetize your audience</span></a>
              </li>
            </ul>
          </div>
          <div data-menu-fade="" class="mega-nav__panel-col"><span data-menu-fade="" class="mega-nav__panel-label">By industries</span>
            <ul class="mega-nav__panel-list">
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Healthcare</span><span class="mega-nav__panel-link-desc">HIPAA compliant</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Finance</span><span class="mega-nav__panel-link-desc">Secure services</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Education</span><span class="mega-nav__panel-link-desc">Learning tools</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Retail</span><span class="mega-nav__panel-link-desc">Omnichannel commerce</span></a>
              </li>
            </ul>
          </div>
          <div data-menu-fade="" class="mega-nav__panel-col"><span data-menu-fade="" class="mega-nav__panel-label">By size</span>
            <ul class="mega-nav__panel-list">
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Startups</span><span class="mega-nav__panel-link-desc">Launch faster</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Enterprise</span><span class="mega-nav__panel-link-desc">Scale with confidence</span></a>
              </li>
            </ul>
          </div>
          <div class="mega-nav__panel-col is--colored"><span data-menu-fade="" class="mega-nav__panel-label">Quick links</span>
            <ul class="mega-nav__panel-list">
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Customer stories</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Partners</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Professional services</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Migrations</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Compare plans</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div data-panel-state="" data-nav-content="company" role="region" aria-label="products menu" class="mega-nav__dropdown-panel">
        <div class="mega-nav__dropdown-inner">
          <div data-menu-fade="" class="mega-nav__panel-col"><span data-menu-fade="" class="mega-nav__panel-label">company</span>
            <ul class="mega-nav__panel-list">
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">About us</span><span class="mega-nav__panel-link-desc">Our mission and team</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Careers</span><span class="mega-nav__panel-link-desc">Join the team</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Blog</span><span class="mega-nav__panel-link-desc">News and updates</span></a>
              </li>
            </ul>
          </div>
          <div data-menu-fade="" class="mega-nav__panel-col"><span data-menu-fade="" class="mega-nav__panel-label">quick links</span>
            <ul class="mega-nav__panel-list">
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Documentation</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Help center</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Contact</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Status</span></a>
              </li>
              <li data-menu-fade="">
                <a href="#" class="mega-nav__panel-link w-inline-block"><span class="mega-nav__panel-link-text">Legal</span></a>
              </li>
            </ul>
          </div>
          <div data-menu-fade="" class="mega-nav__panel-col is--colored has--card">
            <div class="mega-nav__card">
              <div class="mega-nav__card-visual"></div>
              <div class="mega-nav__card-content">
                <div class="mega-nav__card-text">
                  <span class="mega-nav__panel-link-text">Sign up for the &#x27;26 conf</span>
                  <span class="mega-nav__panel-link-desc">Tickets on sale now</span>
                </div>
                <a href="#" class="mega-nav__card-cta w-inline-block">
                  <span class="mega-nav__card-cta-label">Learn more</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-menu-backdrop="" class="mega-nav__backdrop"></div>
</nav>
```
### CSS
```text
[data-menu-wrap] {
  --nav-height: 4em;
}
.mega-nav {
  z-index: 100;
  position: fixed;
  top: 1.25em;
  left: 1.25em;
  right: 1.25em;
}
.mega-nav__bar {
  z-index: 3;
  background-color: #fff;
  border-bottom: 1px solid #0000001a;
  border-radius: .25em;
  width: 100%;
  max-width: 80em;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.mega-nav__container {
  height: var(--nav-height);
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.5em;
  display: flex;
}
.mega-nav__bar-start {
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  display: flex;
  position: relative;
}
.mega-nav__bar-logo {
  flex: none;
  width: 5.75em;
  margin-right: 3em;
  display: flex;
}
.mega-nav__bar-list {
  grid-column-gap: .75em;
  grid-row-gap: .75em;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  display: flex;
}
.mega-nav__bar-list.is--actions {
  margin-left: auto;
}
.mega-nav__bar-link {
  color: #201d1d;
  background-color: #0000;
  border-radius: .25em;
  justify-content: flex-start;
  align-items: center;
  padding: .375em .625em;
  text-decoration: none;
  display: flex;
}
.mega-nav__bar-link-label {
  font-size: .9375em;
  font-weight: 500;
  line-height: 1.2;
}
.mega-nav__bar-link-icon {
  width: 1.25em;
}
.mega-nav__bar-end {
  grid-column-gap: .75em;
  grid-row-gap: .75em;
  justify-content: flex-end;
  align-items: center;
  display: none;
}
.mega-nav__bar-cta {
  color: #f2f2f2;
  background-color: #6840ff;
  border-radius: .25em;
  justify-content: center;
  align-items: center;
  padding: .375em .625em;
  text-decoration: none;
  display: flex;
}
.mega-nav__bar-cta.is--secondary {
  color: #6840ff;
  background-color: #0000;
  border: 1px solid #6840ff;
}
.mega-nav__bar-inner {
  grid-column-gap: .75em;
  grid-row-gap: .75em;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  display: flex;
}
.mega-nav__bar-inner.is--actions {
  margin-left: auto;
}
.mega-nav__burger {
  grid-column-gap: .2em;
  grid-row-gap: .2em;
  background-color: #e4e0f5;
  border-radius: .25em;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  padding: 0;
  display: flex;
}
.mega-nav__burger-line {
  z-index: 1;
  background-color: #6840ff;
  border-radius: .125em;
  flex: none;
  width: 1.25em;
  height: .125em;
  padding: 0;
  display: block;
  position: relative;
}
.mega-nav__back {
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: -.625em;
}
.mega-nav__backdrop {
  z-index: 0;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  background-color: #00000040;
  position: fixed;
  inset: 0%;
}
.mega-nav__dropdown-wrapper {
  z-index: 2;
  pointer-events: none;
  width: 100%;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: calc(100% - .25em);
  left: 0;
  right: 0;
}
.mega-nav__dropdown-container {
  position: relative;
  overflow: hidden;
}
.mega-nav__dropdown-bg {
  will-change: transform;
  background-color: #fff;
  border-bottom-right-radius: .25em;
  border-bottom-left-radius: .25em;
  position: absolute;
  inset: 0;
}
.mega-nav__dropdown-panel {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  position: absolute;
  inset: 0 0 auto;
  overflow: hidden;
}
.mega-nav__dropdown-inner {
  display: flex;
}
.mega-nav__panel-col {
  grid-column-gap: 1.25em;
  grid-row-gap: 1.25em;
  border-right: 1px solid #0000001a;
  flex-flow: column;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2.5em 1.5em;
  display: flex;
}
.mega-nav__panel-col:last-of-type {
  border: none;
}
.mega-nav__panel-col.is--colored {
  background-color: #f7f5ff;
}
.mega-nav__panel-col.is--colored.has--card {
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}
.mega-nav__panel-label {
  text-transform: uppercase;
  padding-left: 1em;
  font-family: Haffer Mono, Arial, sans-serif;
  font-size: .75em;
  line-height: 1;
}
.mega-nav__panel-list {
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  flex-flow: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
.mega-nav__panel-link {
  color: #201d1d;
  border-radius: .25em;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: .625em .75em;
  text-decoration: none;
  display: flex;
}
.mega-nav__panel-link-text {
  font-weight: 500;
}
.mega-nav__panel-link-desc {
  opacity: .6;
  font-size: .875em;
  font-weight: 400;
}
.mega-nav__card {
  background-color: #fff;
  border-radius: .5em;
  flex-flow: column;
  width: 100%;
  display: flex;
  overflow: hidden;
}
.mega-nav__card-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.mega-nav__card-visual {
  width: 100%;
  height: 16.25em;
  position: relative;
}
.mega-nav__card-content {
  grid-column-gap: 1.25em;
  grid-row-gap: 1.25em;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1.5em;
  display: flex;
}
.mega-nav__card-text {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}
.mega-nav__card-cta {
  color: #f2f2f2;
  background-color: #6840ff;
  border-radius: .25em;
  justify-content: center;
  align-items: center;
  padding: .375em .625em;
  text-decoration: none;
  display: flex;
}
.mega-nav__card-cta.is--secondary {
  color: #6840ff;
  background-color: #0000;
  border: 1px solid #6840ff;
}
.mega-nav__card-cta-label {
  font-size: .9375em;
  font-weight: 500;
  line-height: 1.2;
}
.mega-nav__card-cta-icon {
  width: 1.25em;
}
@media screen and (max-width: 991px) {
  .mega-nav {
    top: 0;
    left: 0;
    right: 0;
  }
  .mega-nav__bar-start {
    justify-content: space-between;
    align-items: center;
  }
  .mega-nav__bar-list {
    grid-column-gap: 0em;
    grid-row-gap: 0em;
    flex-flow: column;
    justify-content: flex-start;
    align-items: stretch;
    width: 100%;
  }
  .mega-nav__bar-list.is--actions {
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    flex-flow: row;
    justify-content: space-between;
    align-items: stretch;
  }
  .mega-nav__bar-link {
    border-bottom: 1px solid #0000001a;
    border-radius: 0;
    width: 100%;
    padding: .75em 0;
    font-size: 1.25em;
  }
  .mega-nav__bar-link.is--dropdown {
    justify-content: space-between;
    align-items: center;
  }
  .mega-nav__bar-link.is--back {
    border-bottom-style: none;
    font-size: 1em;
  }
  .mega-nav__bar-link-label {
    font-size: 1.25em;
  }
  .mega-nav__bar-link-icon {
    width: 1.5em;
  }
  .mega-nav__bar-link-icon.is--dropdown {
    transform: rotate(-90deg);
  }
  .mega-nav__bar-end {
    display: flex;
  }
  .mega-nav__bar-cta {
    padding: 1em .75em 1em 1em;
  }
  .mega-nav__bar-inner {
    opacity: 0;
    bottom: 0%;
    left: 0%;
    right: 0%;
    top: var(--nav-height);
    visibility: hidden;
    background-color: #fff;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    padding: 2em 1.5em;
    position: fixed;
    overflow: auto;
  }
  .mega-nav__backdrop {
    display: none;
  }
  .mega-nav__dropdown-wrapper {
    z-index: 4;
    bottom: 0;
    top: var(--nav-height);
    position: fixed;
  }
  .mega-nav__dropdown-container {
    height: 100%;
    overflow: auto;
  }
  .mega-nav__dropdown-bg {
    display: none;
  }
  .mega-nav__dropdown-panel {
    background-color: #fff;
    bottom: 0;
    overflow: auto;
  }
  .mega-nav__dropdown-inner {
    flex-flow: column;
  }
  .mega-nav__panel-col {
    border-bottom: 1px solid #0000001a;
    border-right-style: none;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
  }
  .mega-nav__panel-label {
    width: 100%;
  }
  .mega-nav__bar-action {
    flex: 1;
  }
  .mega-nav__card-cta-icon.is--dropdown {
    transform: rotate(-90deg);
  }
}
@media screen and (max-width: 479px) {
  .mega-nav__bar-link-label {
    font-size: 1em;
  }
  .mega-nav__bar-link-icon {
    width: 1.375em;
  }
  .mega-nav__panel-col.is--colored.has--card {
    padding: 0;
  }
  .mega-nav__card {
    border-bottom: 1px solid #0000001a;
    border-radius: 0;
  }
  .mega-nav__card-content {
    padding: 1em 1em 1.5em;
  }
  .mega-nav__card-cta-label {
    font-size: 1em;
  }
  .mega-nav__card-cta-icon {
    width: 1.375em;
  }
}
```
### Javascript
```javascript
function initMegaNavDirectionalHover() {
  const DUR = {
    bgMorph: 0.4,
    contentIn: 0.3,
    contentOut: 0.2,
    stagger: 0.25,
    backdropIn: 0.3,
    backdropOut: 0.2,
    openScale: 0.35,
    closeScale: 0.25,
  };
  const HOVER_ENTER = 120;
  const HOVER_LEAVE = 150;
  // DOM references
  const menuWrap = document.querySelector("[data-menu-wrap]");
  const navList = document.querySelector("[data-nav-list]");
  const dropWrapper = document.querySelector("[data-dropdown-wrapper]");
  const dropContainer = document.querySelector("[data-dropdown-container]");
  const dropBg = document.querySelector("[data-dropdown-bg]");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const toggles = [...document.querySelectorAll("[data-dropdown-toggle]")];
  const panels = [...document.querySelectorAll("[data-nav-content]")];
  const burger = document.querySelector("[data-burger-toggle]");
  const backBtn = document.querySelector("[data-mobile-back]");
  const logo = document.querySelector("[data-menu-logo]");
  const [lineTop, lineMid, lineBot] = ["top", "mid", "bot"].map(
    (id) => document.querySelector(\`[data-burger-line='${id}']\`)
  );
  // State
  const state = {
    isOpen: false,
    activePanel: null,
    activePanelIndex: -1,
    isMobile: window.innerWidth <= 991,
    mobileMenuOpen: false,
    mobilePanelActive: null,
    hoverTimer: null,
    leaveTimer: null,
    tl: null,
    mobileTl: null,
    mobilePanelTl: null,
  };
  // Helpers
  const getPanel = (name) => document.querySelector(\`[data-nav-content="${name}"]\`);
  const getToggle = (name) => document.querySelector(\`[data-dropdown-toggle="${name}"]\`);
  const getFade = (el) => el.querySelectorAll("[data-menu-fade]");
  const getNavItems = () => navList.querySelectorAll("[data-nav-list-item]");
  const getIndex = (name) => toggles.indexOf(getToggle(name));
  const stagger = (n) => (n <= 1 ? 0 : { amount: DUR.stagger });
  function clearTimers() {
    clearTimeout(state.hoverTimer);
    clearTimeout(state.leaveTimer);
    state.hoverTimer = state.leaveTimer = null;
  }
  function killTl(key) {
    if (state[key]) { state[key].kill(); state[key] = null; }
  }
  function killDropdown() {
    killTl("tl");
    gsap.killTweensOf(dropContainer);
    gsap.killTweensOf(backdrop);
    panels.forEach((p) => { gsap.killTweensOf(p); gsap.killTweensOf(getFade(p)); });
  }
  function killMobile() {
    killTl("mobileTl");
    gsap.killTweensOf([navList, lineTop, lineMid, lineBot]);
  }
  function killMobilePanel() {
    killTl("mobilePanelTl");
    gsap.killTweensOf(getNavItems());
    gsap.killTweensOf([backBtn, logo]);
    panels.forEach((p) => { gsap.killTweensOf(p); gsap.killTweensOf(getFade(p)); });
  }
  function resetToggles() {
    toggles.forEach((t) => t.setAttribute("aria-expanded", "false"));
  }
  function resetDesktop() {
    panels.forEach((p) => {
      gsap.set(p, { visibility: "hidden", opacity: 0, pointerEvents: "none", xPercent: 0 });
      gsap.set(getFade(p), { autoAlpha: 0, x: 0, y: 0 });
    });
    gsap.set(dropContainer, { height: 0 });
    gsap.set(backdrop, { autoAlpha: 0 });
    menuWrap.setAttribute("data-menu-open", "false");
    resetToggles();
  }
  function setupMobile() {
    panels.forEach((p) => {
      gsap.set(p, { autoAlpha: 0, xPercent: 0, visibility: "visible", pointerEvents: "none" });
      gsap.set(getFade(p), { xPercent: 20, autoAlpha: 0 });
    });
    gsap.set(getNavItems(), { xPercent: 0, y: 0, autoAlpha: 1 });
    gsap.set(navList, { autoAlpha: 0, x: 0 });
    gsap.set(backBtn, { autoAlpha: 0 });
    gsap.set(logo, { autoAlpha: 1 });
    gsap.set(dropContainer, { clearProps: "height" });
    gsap.set(backdrop, { autoAlpha: 0 });
  }
  function measurePanel(name) {
    const el = getPanel(name);
    if (!el) return 0;
    const s = el.style;
    const prev = [s.visibility, s.opacity, s.pointerEvents];
    Object.assign(s, { visibility: "visible", opacity: "0", pointerEvents: "none" });
    const h = el.getBoundingClientRect().height;
    [s.visibility, s.opacity, s.pointerEvents] = prev;
    return h;
  }
  // DESKTOP — open dropdown (first open)
  function openDropdown(panelName) {
    if (state.isOpen && state.activePanel === panelName) return;
    if (state.isOpen) return switchPanel(state.activePanel, panelName);
    const height = measurePanel(panelName);
    if (!height) return;
    killDropdown();
    resetDesktop();
    const el = getPanel(panelName);
    const fade = getFade(el);
    const toggle = getToggle(panelName);
    state.isOpen = true;
    state.activePanel = panelName;
    state.activePanelIndex = getIndex(panelName);
    menuWrap.setAttribute("data-menu-open", "true");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    gsap.set(dropContainer, { height: 0 });
    const tl = gsap.timeline();
    state.tl = tl;
    tl.to(backdrop, { autoAlpha: 1, duration: DUR.backdropIn, ease: "power2.out" }, 0);
    tl.to(dropContainer, { height, duration: DUR.openScale, ease: "power3.out" }, 0);
    tl.set(el, { visibility: "visible", opacity: 1, pointerEvents: "auto" }, 0.05);
    if (fade.length) {
      tl.fromTo(fade,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: DUR.contentIn, stagger: stagger(fade.length), ease: "power3.out" },
        0.1
      );
    }
  }
  // DESKTOP — close dropdown
  function closeDropdown() {
    if (!state.isOpen) return;
    const el = getPanel(state.activePanel);
    const fade = el ? getFade(el) : [];
    killDropdown();
    const tl = gsap.timeline({
      onComplete() {
        state.isOpen = false;
        state.activePanel = null;
        state.activePanelIndex = -1;
        state.tl = null;
        resetDesktop();
      },
    });
    state.tl = tl;
    if (fade.length) tl.to(fade, { autoAlpha: 0, y: -4, duration: DUR.contentOut * 0.7, ease: "power2.in" }, 0);
    tl.to(dropContainer, { height: 0, duration: DUR.closeScale, ease: "power2.in" }, 0.05);
    tl.to(backdrop, { autoAlpha: 0, duration: DUR.backdropOut, ease: "power2.out" }, 0);
    if (el) tl.set(el, { visibility: "hidden", opacity: 0, pointerEvents: "none" });
  }
  // DESKTOP — switch panel (directional)
  function switchPanel(fromName, toName) {
    const dir = getIndex(toName) > getIndex(fromName) ? 1 : -1;
    const fromEl = getPanel(fromName), toEl = getPanel(toName);
    if (!fromEl || !toEl) return;
    const fromFade = getFade(fromEl), toFade = getFade(toEl);
    const toHeight = measurePanel(toName);
    if (!toHeight) return;
    killDropdown();
    // Reset all panels, then restore fromEl as visible
    panels.forEach((p) => {
      gsap.set(p, { visibility: "hidden", opacity: 0, pointerEvents: "none", xPercent: 0 });
      gsap.set(getFade(p), { autoAlpha: 0, x: 0, y: 0 });
    });
    gsap.set(fromEl, { visibility: "visible", opacity: 1, pointerEvents: "auto", x: 0 });
    if (fromFade.length) gsap.set(fromFade, { autoAlpha: 1, x: 0, y: 0 });
    gsap.set(backdrop, { autoAlpha: 1 });
    const toToggle = getToggle(toName);
    state.activePanel = toName;
    state.activePanelIndex = getIndex(toName);
    resetToggles();
    if (toToggle) toToggle.setAttribute("aria-expanded", "true");
    const xOut = dir * -30, xIn = dir * 30;
    const tl = gsap.timeline();
    state.tl = tl;
    if (fromFade.length) tl.to(fromFade, { autoAlpha: 0, x: xOut, duration: DUR.contentOut, ease: "power2.in" }, 0);
    tl.set(fromEl, { visibility: "hidden", opacity: 0, pointerEvents: "none", xPercent: 0 }, DUR.contentOut);
    if (fromFade.length) tl.set(fromFade, { x: 0 }, DUR.contentOut);
    tl.to(dropContainer, { height: toHeight, duration: DUR.bgMorph, ease: "power3.out" }, 0.05);
    tl.set(toEl, { visibility: "visible", opacity: 1, pointerEvents: "auto", xPercent: 0 }, DUR.contentOut * 0.5);
    if (toFade.length) {
      tl.fromTo(toFade,
        { autoAlpha: 0, x: xIn },
        { autoAlpha: 1, x: 0, duration: DUR.contentIn, stagger: stagger(toFade.length), ease: "power3.out" },
        DUR.contentOut * 0.6
      );
    }
  }
  // DESKTOP — hover intent
  function handleToggleEnter(e) {
    if (state.isMobile) return;
    const name = e.currentTarget.getAttribute("data-dropdown-toggle");
    if (!name) return;
    clearTimeout(state.leaveTimer); state.leaveTimer = null;
    clearTimeout(state.hoverTimer);
    state.hoverTimer = setTimeout(() => openDropdown(name), state.isOpen ? 0 : HOVER_ENTER);
  }
  function handleToggleLeave() {
    if (state.isMobile) return;
    clearTimeout(state.hoverTimer); state.hoverTimer = null;
    state.leaveTimer = setTimeout(closeDropdown, HOVER_LEAVE);
  }
  function handleWrapperEnter() {
    if (state.isMobile) return;
    clearTimeout(state.leaveTimer); state.leaveTimer = null;
  }
  function handleWrapperLeave() {
    if (state.isMobile) return;
    state.leaveTimer = setTimeout(closeDropdown, HOVER_LEAVE);
  }
  // DESKTOP — close behaviors
  function handleEscape(e) {
    if (e.key !== "Escape") return;
    if (state.isMobile) {
      state.mobilePanelActive ? closeMobilePanel() : state.mobileMenuOpen && closeMobileMenu();
      return;
    }
    if (state.isOpen) {
      const t = getToggle(state.activePanel);
      closeDropdown();
      if (t) t.focus();
    }
  }
  function handleDocClick(e) {
    if (state.isMobile || !state.isOpen) return;
    if (!e.target.closest("[data-menu-wrap]")) closeDropdown();
  }
  // DESKTOP — keyboard navigation
  function focusFirstLink(panelName) {
    setTimeout(() => {
      const el = getPanel(panelName);
      if (!el) return;
      const link = el.querySelector("a");
      if (!link) return;
      gsap.set(link, { visibility: "visible" });
      link.focus();
    }, 80);
  }
  function handleKeydownOnToggle(e) {
    if (state.isMobile) return;
    const name = e.currentTarget.getAttribute("data-dropdown-toggle");
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (state.isOpen && state.activePanel === name) closeDropdown();
      else { openDropdown(name); focusFirstLink(name); }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!state.isOpen || state.activePanel !== name) openDropdown(name);
      focusFirstLink(name);
    }
    if (e.key === "Tab" && !e.shiftKey && state.isOpen && state.activePanel === name) {
      e.preventDefault();
      const link = getPanel(name)?.querySelector("a");
      if (link) link.focus();
    }
  }
  function handleKeydownInPanel(e) {
    if (state.isMobile || !state.isOpen) return;
    const el = getPanel(state.activePanel);
    if (!el) return;
    const links = [...el.querySelectorAll("a")];
    const idx = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[(idx + 1) % links.length].focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx <= 0) { const t = getToggle(state.activePanel); if (t) t.focus(); }
      else links[idx - 1].focus();
    }
    if (e.key === "Tab" && !e.shiftKey && idx === links.length - 1) {
      e.preventDefault();
      const curIdx = toggles.indexOf(getToggle(state.activePanel));
      const next = curIdx < toggles.length - 1 ? toggles[curIdx + 1] : null;
      closeDropdown();
      if (next) next.focus();
    }
    if (e.key === "Tab" && e.shiftKey && idx === 0) {
      e.preventDefault();
      const t = getToggle(state.activePanel);
      if (t) t.focus();
    }
  }
  // MOBILE — burger animation
  function animateBurger(toX) {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    if (toX) {
      tl.to(lineTop, { y: "0.3125em", duration: 0.15 }, 0);
      tl.to(lineBot, { y: "-0.3125em", duration: 0.15 }, 0);
      tl.to(lineMid, { autoAlpha: 0, duration: 0.1 }, 0.1);
      tl.to(lineTop, { rotation: 45, duration: 0.2 }, 0.15);
      tl.to(lineBot, { rotation: -45, duration: 0.2 }, 0.15);
    } else {
      tl.to(lineTop, { rotation: 0, duration: 0.2 }, 0);
      tl.to(lineBot, { rotation: 0, duration: 0.2 }, 0);
      tl.to(lineTop, { y: 0, duration: 0.15 }, 0.15);
      tl.to(lineBot, { y: 0, duration: 0.15 }, 0.15);
      tl.to(lineMid, { autoAlpha: 1, duration: 0.1 }, 0.15);
    }
    return tl;
  }
  // MOBILE — open/close menu
  function openMobileMenu() {
    killMobile();
    state.mobileMenuOpen = true;
    menuWrap.setAttribute("data-menu-open", "true");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    const items = getNavItems();
    const tl = gsap.timeline();
    state.mobileTl = tl;
    tl.add(animateBurger(true), 0);
    tl.to(navList, { autoAlpha: 1, duration: 0.3, ease: "power2.out" }, 0);
    if (items.length) {
      tl.fromTo(items,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power3.out" },
        0.15
      );
    }
  }
  function closeMobileMenu() {
    const hadPanel = state.mobilePanelActive;
    const panelEl = hadPanel ? getPanel(hadPanel) : null;
    killMobile();
    killMobilePanel();
    menuWrap.setAttribute("data-menu-open", "false");
    state.mobileMenuOpen = false;
    state.mobilePanelActive = null;
    burger.setAttribute("aria-expanded", "false");
    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = "";
        state.mobileTl = null;
        setupMobile();
      },
    });
    state.mobileTl = tl;
    tl.add(animateBurger(false), 0);
    // If a panel was open, fade it out with the close — no snap reset
    if (hadPanel && panelEl) {
      tl.to(panelEl, { autoAlpha: 0, duration: 0.3, ease: "power2.inOut" }, 0.05);
      tl.to(backBtn, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0.05);
    }
    // Fade out the nav list container
    tl.to(navList, { autoAlpha: 0, duration: 0.3, ease: "power2.inOut" }, 0.05);
  }
  // MOBILE — slide-over panels 
  function openMobilePanel(panelName) {
    const el = getPanel(panelName);
    if (!el) return;
    killMobilePanel();
    state.mobilePanelActive = panelName;
    const navItems = getNavItems();
    const panelFade = getFade(el);
    const tl = gsap.timeline();
    state.mobilePanelTl = tl;
    // Fade out each nav item to the left
    if (navItems.length) {
      tl.to(navItems, {
        xPercent: -10, autoAlpha: 0,
        duration: 0.35, stagger: 0.03, ease: "power2.in",
      }, 0);
    }
    // Logo → back button swap
    tl.to(logo, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0);
    tl.to(backBtn, { autoAlpha: 1, duration: 0.25, ease: "power2.inOut" }, 0.15);
    // Show panel container, then fade in its items from the right
    tl.set(el, { autoAlpha: 1, xPercent: 0, pointerEvents: "auto" }, 0.2);
    if (panelFade.length) {
      tl.fromTo(panelFade,
        { xPercent: 8, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 0.3, stagger: stagger(panelFade.length), ease: "power3.out" },
        0.25
      );
    }
  }
  function closeMobilePanel() {
    if (!state.mobilePanelActive) return;
    const el = getPanel(state.mobilePanelActive);
    if (!el) return;
    killMobilePanel();
    const navItems = getNavItems();
    const panelFade = getFade(el);
    const tl = gsap.timeline({
      onComplete() { state.mobilePanelActive = null; state.mobilePanelTl = null; },
    });
    state.mobilePanelTl = tl;
    // Fade out panel items to the right
    if (panelFade.length) {
      tl.to(el, {
        xPercent: 20, autoAlpha: 0,
        duration: 0.3, stagger: 0.02, ease: "power2.in",
      }, 0);
    }
    // Hide panel
    tl.set(el, { autoAlpha: 0, pointerEvents: "none" }, 0.25);
    // Back → logo swap
    tl.to(backBtn, { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 0);
    tl.to(logo, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }, 0.15);
    // Fade nav items back in from center
    if (navItems.length) {
      tl.fromTo(navItems,
        { xPercent: -20, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 0.35, stagger: 0.03, ease: "power3.out" },
        0.25
      );
    }
  }
  function handleToggleClick(e) {
    if (!state.isMobile || !state.mobileMenuOpen) return;
    const name = e.currentTarget.getAttribute("data-dropdown-toggle");
    if (name) { e.preventDefault(); openMobilePanel(name); }
  }
  // RESIZE
  let resizeTimer = null;
  let lastWidth = window.innerWidth;
  function handleResize() {
    const w = window.innerWidth;
    if (w === lastWidth) return;
    lastWidth = w;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const was = state.isMobile;
      state.isMobile = window.innerWidth <= 991;
      if (was && !state.isMobile) {
        killMobile(); killMobilePanel();
        gsap.set(navList, { clearProps: "all" });
        gsap.set(getNavItems(), { clearProps: "all" });
        gsap.set(backBtn, { autoAlpha: 0 });
        gsap.set(logo, { clearProps: "all" });
        gsap.set([lineTop, lineMid, lineBot], { rotation: 0, y: 0, autoAlpha: 1 });
        burger.setAttribute("aria-expanded", "false");
        state.mobileMenuOpen = false;
        state.mobilePanelActive = null;
        document.body.style.overflow = "";
        resetDesktop();
      }
      if (!was && state.isMobile) {
        killDropdown();
        state.isOpen = false; state.activePanel = null; state.activePanelIndex = -1;
        clearTimers();
        menuWrap.setAttribute("data-menu-open", "false");
        resetToggles();
        setupMobile();
      }
    }, 150);
  }
  // EVENT BINDING
  toggles.forEach((btn) => {
    btn.addEventListener("mouseenter", handleToggleEnter);
    btn.addEventListener("mouseleave", handleToggleLeave);
    btn.addEventListener("keydown", handleKeydownOnToggle);
    btn.addEventListener("click", handleToggleClick);
  });
  dropWrapper.addEventListener("mouseenter", handleWrapperEnter);
  dropWrapper.addEventListener("mouseleave", handleWrapperLeave);
  panels.forEach((p) => p.addEventListener("keydown", handleKeydownInPanel));
  backdrop.addEventListener("click", closeDropdown);
  document.addEventListener("keydown", handleEscape);
  document.addEventListener("click", handleDocClick);
  burger.addEventListener("click", () => state.mobileMenuOpen ? closeMobileMenu() : openMobileMenu());
  backBtn.addEventListener("click", closeMobilePanel);
  window.addEventListener("resize", handleResize);
  // INIT
  state.isMobile ? setupMobile() : resetDesktop();
}
// Initialize Mega Navigation (Directional Hover)
document.addEventListener('DOMContentLoaded', function() {
  initMegaNavDirectionalHover();
});
```
### CSS
```text
[data-menu-wrap] {
  --nav-height: 4em;
}
.mega-nav__panel-col:last-of-type {
  border: none;
}
/* Allow easier content editing when panel state is 'active' inside of the designer*/
.wf-design-mode [data-nav-content][data-panel-state="active"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  position: relative;
}
.wf-design-mode [data-menu-open]:has( [data-nav-content][data-panel-state="active"]) [data-dropdown-bg] {
  opacity: 1;
  inset: 0;
}
.wf-design-mode [data-mobile-nav="active"] {
  opacity: 1;
  visibility: visible;
}
```
### Implementation
The script `initMegaNavDirectionalHover()` controls a morphing dropdown on desktop (hover intent, directional panel switching) and a slide-over panel system on mobile (≤991px).
#### Wrapper
The root `<nav>` element carries `[data-menu-wrap]` and `[data-menu-open="false"]`, which the script toggles to `"true"` whenever the dropdown or mobile menu is active.
#### Logo
The `[data-menu-logo]` element swaps out for the back button when a mobile panel opens, fading to `autoAlpha: 0`.
#### Back
A button with `[data-mobile-back]` appears in place of the logo when a mobile slide-over panel is active, and triggers `closeMobilePanel` on click.
#### Nav List
The `[data-nav-list]` container holds all nav items, and the script fades it as a single block when opening or closing the mobile menu.
#### Nav Item
Every direct child inside `[data-nav-list]` that should stagger on mobile needs `[data-nav-list-item]`, this includes dropdown toggles, regular links, and the actions block.
#### Dropdown toggles
Each `[data-dropdown-toggle="name"]` button opens the matching panel on hover (desktop) or click (mobile), where the `name` value must match a corresponding `[data-nav-content]` panel. The script derives the directional animation from the toggle's DOM position.
#### Burger button
The `[data-burger-toggle]` button toggles the mobile menu, and contains three `<span>` elements marked with `[data-burger-line="top"]`, `[data-burger-line="mid"]`, and `[data-burger-line="bot"]` that animate into an X inside of the `animateBurger()` method.
#### Dropdown wrapper
The dropdown area consists of three nested layers: `[data-dropdown-wrapper]` handles hover intent on desktop, `[data-dropdown-container]` clips the content via `overflow: hidden` and animates `height`, and `[data-dropdown-bg]` sits as an absolute fill providing the background color.
#### Content panels
Each `[data-nav-content="name"]` panel is matched to its dropdown toggle by value; The script measures the panel's height on the fly to morph the container, and cross-fades content directionally based on which toggle the user came from.
#### Fade targets
Any element inside a panel marked with `[data-menu-fade]` will stagger in and out individually.
#### Backdrop
The \[`data-menu-backdrop]` overlay sits behind the nav and fades in when a dropdown is open on desktop.
#### Durations
Most timing lives in the `DUR` object and the two hover constants at the top of the script. The mobile animations have their own hardcoded durations within each function.
### Javascript
```javascript
const DUR = {
  bgMorph: 0.4, // container height morph between panels
  contentIn: 0.3, // fade items appearing
  contentOut: 0.2, // fade items disappearing
  stagger: 0.25, // total stagger spread across all fade items
  backdropIn: 0.3, // backdrop fade in
  backdropOut: 0.2, // backdrop fade out
  openScale: 0.35, // initial container open from 0
  closeScale: 0.25, // container close to 0
};
const HOVER_ENTER = 120;  // ms delay before opening on hover
const HOVER_LEAVE = 150;  // ms before closing after mouse leaves
```
#### Webflow Designer
To make panel content editable inside the Webflow designer without running the script, add the custom CSS provided further up the page. Setting `[data-panel-state="active"]` on a `[data-nav-content]` element will force it visible, and setting `[data-mobile-nav="active"]` on the `[data-nav-list]` element will reveal the mobile nav list.
These are designer-only helpers, the attribute values have no effect on the published site.