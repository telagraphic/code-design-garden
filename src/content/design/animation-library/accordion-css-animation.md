---
title: "Accordion CSS Animation"
description: "Accordion CSS Animation."
slug: "accordion-css-animation"
previewVideo: "accordion-css-animation.mp4"
order: 49.998
published: true
categories: ["layout"]
triggers: ["hover"]
libraries: ["css-only"]
keywords: ["accordion", "css", "animation"]
sourceUrl: "https://www.osmo.supply/resource/accordion-css-animation"
---
## Setup
### HTML
```text
<div data-accordion-close-siblings="true" data-accordion-css-init="" class="accordion-css">
  <ul class="accordion-css__list">
    <li data-accordion-status="not-active" class="accordion-css__item">
      <div data-hover="" data-accordion-toggle="" class="accordion-css__item-top">
        <h3 class="accordion-css__item-h3">This is just a simple CSS Accordion</h3>
        <div class="accordion-css__item-icon">
          <svg class="accordion-css__item-icon-svg" xmlns="http://www.w3.org/2000/svg" width="100%" viewbox="0 0 36 36" fill="none"><path d="M28.5 22.5L18 12L7.5 22.5" stroke="currentColor" stroke-width="3" stroke-miterlimit="10"></path></svg>
        </div>
      </div>
      <div class="accordion-css__item-bottom">
        <div class="accordion-css__item-bottom-wrap">
          <div class="accordion-css__item-bottom-content">
            <p class="accordion-css__item-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
      </div>
    </li>
    <li data-accordion-status="not-active" class="accordion-css__item">
      <div data-hover="" data-accordion-toggle="" class="accordion-css__item-top">
        <h3 class="accordion-css__item-h3">Choose to close the siblings: true/false</h3>
        <div class="accordion-css__item-icon">
          <svg class="accordion-css__item-icon-svg" xmlns="http://www.w3.org/2000/svg" width="100%" viewbox="0 0 36 36" fill="none"><path d="M28.5 22.5L18 12L7.5 22.5" stroke="currentColor" stroke-width="3" stroke-miterlimit="10"></path></svg>
        </div>
      </div>
      <div class="accordion-css__item-bottom">
        <div class="accordion-css__item-bottom-wrap">
          <div class="accordion-css__item-bottom-content">
            <p class="accordion-css__item-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
      </div>
    </li>
    <li data-accordion-status="not-active" class="accordion-css__item">
      <div data-hover="" data-accordion-toggle="" class="accordion-css__item-top">
        <h3 class="accordion-css__item-h3">Super easy, try it for yourself!</h3>
        <div class="accordion-css__item-icon">
          <svg class="accordion-css__item-icon-svg" xmlns="http://www.w3.org/2000/svg" width="100%" viewbox="0 0 36 36" fill="none"><path d="M28.5 22.5L18 12L7.5 22.5" stroke="currentColor" stroke-width="3" stroke-miterlimit="10"></path></svg>
        </div>
      </div>
      <div class="accordion-css__item-bottom">
        <div class="accordion-css__item-bottom-wrap">
          <div class="accordion-css__item-bottom-content">
            <p class="accordion-css__item-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
```
### CSS
```text
.accordion-css {
  max-width: 29em;
  position: relative;
}

.accordion-css__list {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  flex-flow: column;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  display: flex;
  position: static;
}

.accordion-css__item {
  background-color: #efeeec;
  border-radius: .5em;
  list-style: none;
}

.accordion-css__item-top {
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1em 1em 1.5em;
  display: flex;
}

.accordion-css__item-bottom {
  transition: grid-template-rows 0.6s cubic-bezier(0.625, 0.05, 0, 1);
  grid-template-rows: 0fr;
  display: grid;
  position: relative;
  overflow: hidden;
}

[data-accordion-status="active"] .accordion-css__item-bottom {
  grid-template-rows: 1fr;
}

.accordion-css__item-bottom-wrap {
  flex-flow: column;
  height: 100000%;
  display: flex;
  position: relative;
  overflow: hidden;
}

.accordion-css__item-bottom-content {
  padding-bottom: 1.5em;
  padding-left: 1.5em;
  padding-right: 1.5em;
}

.accordion-css__item-h3 {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.125em;
  font-weight: 500;
  line-height: 1.3;
}

.accordion-css__item-icon {
  transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
  background-color: #d4cee5;
  border-radius: 50%;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  display: flex;
  transform: rotate(180deg);
}

[data-accordion-status="active"] .accordion-css__item-icon {
  transform: rotate(0.001deg);
}

.accordion-css__item-icon-svg {
  width: 1em;
}

.accordion-css__item-p {
  color: #2c2c2c;
  margin-bottom: 0;
  font-size: .875em;
  line-height: 1.5;
}
```
### Javascript
```javascript
function initAccordionCSS() {
  document.querySelectorAll('[data-accordion-css-init]').forEach((accordion) => {
    const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';

    accordion.addEventListener('click', (event) => {
      const toggle = event.target.closest('[data-accordion-toggle]');
      if (!toggle) return;

      const singleAccordion = toggle.closest('[data-accordion-status]');
      if (!singleAccordion) return;

      const isActive = singleAccordion.getAttribute('data-accordion-status') === 'active';
      singleAccordion.setAttribute('data-accordion-status', isActive ? 'not-active' : 'active');

      if (closeSiblings && !isActive) {
        accordion.querySelectorAll('[data-accordion-status="active"]').forEach((sibling) => {
          if (sibling !== singleAccordion) sibling.setAttribute('data-accordion-status', 'not-active');
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAccordionCSS();
});
```
### Implementation
#### Close siblings [true/false]
You can set `[data-accordion-close-siblings="false"]` to prevent the accordion from closing sibling items when toggling an item.
