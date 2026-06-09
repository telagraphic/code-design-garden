---
title: "Basic Filter Setup (Multi Match)"
description: "Basic Filter Setup (Multi Match)."
slug: "basic-filter-setup-multi-match"
previewVideo: "basic-filter-setup-multi-match.mp4"
order: 49.993
published: true
categories: ["filter"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["basic", "filter", "setup", "multi", "match"]
sourceUrl: "https://www.osmo.supply/resource/basic-filter-setup-multi-match"
---
## Setup
### HTML
```text
<div data-filter-group="" role="group" class="filter-group">
  <div class="filter-buttons">
    <button data-filter-target="all" data-filter-status="active" aria-pressed="false" aria-controls="filter-list" class="filter-btn">All</button>
    <button data-filter-target="land" data-filter-status="not-active" aria-pressed="false" aria-controls="filter-list" class="filter-btn">Land</button>
    <button data-filter-target="water" data-filter-status="not-active" aria-pressed="false" aria-controls="filter-list" class="filter-btn">Water</button>
    <button data-filter-target="air" data-filter-status="not-active" aria-pressed="false" aria-controls="filter-list" class="filter-btn">Air</button>
  </div>
  <div aria-live="polite" role="list" class="filter-list">
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🦁</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="land" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Land</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Lion</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🦓</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="land" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Land</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Zebra</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🐘</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="land" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Land</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Elephant</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🐳</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="land" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Land</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Whale</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🐠</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="water" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Water</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Clownfish</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🦈</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="water" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Water</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Shark</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🐧</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="water" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Water</p>
              </div>
              <div data-filter-name-collect="land" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Land</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Penguin</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🦛</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="water" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Water</p>
              </div>
              <div data-filter-name-collect="land" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Land</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Hippo</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🦅</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="air" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Air</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Eagle</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🐸</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="land" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Land</p>
              </div>
              <div data-filter-name-collect="water" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Water</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Frog</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🐊</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="land" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Land</p>
              </div>
              <div data-filter-name-collect="water" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Water</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Crocodile</h3>
        </div>
      </div>
    </div>
    <div role="listitem" data-filter-name="" data-filter-status="active" class="filter-list__item">
      <div class="demo-card">
        <div class="demo-card__top">
          <div class="demo-card__visual">
            <div class="demo-card__visual-before"></div>
            <span class="demo-card__emoji">🦆</span>
          </div>
          <div class="demo-card__tags-collection">
            <div class="demo-card__tags-list">
              <div data-filter-name-collect="land" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Land</p>
              </div>
              <div data-filter-name-collect="water" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Water</p>
              </div>
              <div data-filter-name-collect="air" class="demo-card__tags-item">
                <p class="demo-card__tags-item-p">Air</p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-card__bottom">
          <h3 class="demo-card__h3">Duck</h3>
        </div>
      </div>
    </div>
  </div>
</div>
```
### CSS
```text
.filter-group {
  min-height: 100vh;
  padding-bottom: 10em;
}
/* Filter Buttons */
.filter-buttons {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  flex-flow: wrap;
  justify-content: flex-start;
  padding: 1em 1em 3em;
  display: flex;
}
.filter-btn {
  -webkit-appearance: none;
  appearance: none;
  background-color: #efeeec;
  border-radius: 10em;
  padding: .65em 1.25em;
  font-size: 1.5em;
  transition: color 0.6s cubic-bezier(0.625, 0.05, 0, 1), background-color 0.6s cubic-bezier(0.625, 0.05, 0, 1);
}
.filter-btn[data-filter-status="active"] {
  background-color: #131313;
  color: #EFEEEC;
}
/* Filter List */
.filter-list {
  flex-flow: wrap;
  width: 100%;
  display: flex;
}
.filter-list__item {
  width: 25%;
  padding: .75em;
}
.filter-list__item[data-filter-status="active"] {
  transition: opacity 0.6s cubic-bezier(0.625, 0.05, 0, 1), transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
  transform: scale(1) rotate(0.001deg);
  opacity: 1;
  visibility: visible;
  position: relative;
}
.filter-list__item[data-filter-status="transition-out"] {
  transition: opacity 0.45s cubic-bezier(0.625, 0.05, 0, 1), transform 0.45s cubic-bezier(0.625, 0.05, 0, 1);
  transform: scale(0.9) rotate(0.001deg);
  opacity: 0;
  visibility: visible;
}
.filter-list__item[data-filter-status="not-active"] {
  transform: scale(0.9) rotate(0.001deg);
  opacity: 0;
  visibility: hidden; 
  position: absolute;
}
/* Demo Card */
.demo-card {
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  background-color: #efeeec;
  border-radius: 1.5em;
  flex-flow: column;
  width: 100%;
  padding: 1em;
  display: flex;
}
.demo-card__top {
  position: relative;
}
.demo-card__bottom {
  justify-content: flex-start;
  align-items: center;
  padding-bottom: .25em;
  padding-left: .5em;
  padding-right: .5em;
  display: flex;
}
.demo-card__h3 {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.25em;
  font-weight: 500;
  line-height: 1;
}
.demo-card__visual {
  background-color: #e2dfdf;
  border-radius: .5em;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  position: relative;
}
.demo-card__visual-before {
  padding-top: 66%;
}
.demo-title {
  padding: 10em 1em 2em;
}
.demo-title__h2 {
  font-size: 5em;
  font-weight: 500;
  line-height: 1;
}
.demo-card__emoji {
  font-size: 4em;
}
.demo-card__tags-collection {
  width: 100%;
  padding: 1em;
  position: absolute;
  top: 0;
  left: 0;
}
.demo-card__tags-list {
  display: flex;
}
.demo-card__tags-item {
  background-color: #efeeec;
  border-radius: 3em;
  padding: .25em .75em;
}
.demo-card__tags-item-p {
  margin-bottom: 0;
  font-size: .875em;
}
@media screen and (max-width: 991px) {
  .filter-list__item {
    width: 50%;
  }
}
@media screen and (max-width: 767px) {
  .filter-list__item {
    width: 100%;
  }
}
```
### Javascript
```javascript
function initBasicFilterSetupMultiMatch() {
  const transitionDelay = 300;
  const groups = [...document.querySelectorAll('[data-filter-group]')];
  groups.forEach(group => {
    const buttons = [...group.querySelectorAll('[data-filter-target]')];
    const items = [...group.querySelectorAll('[data-filter-name]')];
    // collect names once (init only)
    items.forEach(item => {
      const cs = item.querySelectorAll('[data-filter-name-collect]');
      if (!cs.length) return;
      const seen = new Set(), out = [];
      cs.forEach(c => {
        const v = (c.getAttribute('data-filter-name-collect') || '').trim().toLowerCase();
        if (v && !seen.has(v)) { seen.add(v); out.push(v); }
      });
      if (out.length) item.setAttribute('data-filter-name', out.join(' '));
    });
    // cache tokens
    const itemTokens = new Map();
    items.forEach(el => {
      const tokens = ((el.getAttribute('data-filter-name') || '').trim().toLowerCase().split(/\s+/)).filter(Boolean);
      itemTokens.set(el, new Set(tokens));
    });
    // state helpers
    const setItemState = (el, on) => {
      const next = on ? 'active' : 'not-active';
      if (el.getAttribute('data-filter-status') !== next) {
        el.setAttribute('data-filter-status', next);
        el.setAttribute('aria-hidden', on ? 'false' : 'true');
      }
    };
    const setButtonState = (btn, on) => {
      const next = on ? 'active' : 'not-active';
      if (btn.getAttribute('data-filter-status') !== next) {
        btn.setAttribute('data-filter-status', next);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    };
    let activeTarget = null;
    const itemMatches = el => {
      if (!activeTarget || activeTarget === 'all') return true;
      return itemTokens.get(el).has(activeTarget);
    };
    const paint = rawTarget => {
      const target = (rawTarget || '').trim().toLowerCase();
      activeTarget = (!target || target === 'all') ? 'all' : target;
      items.forEach(el => {
        if (el._ft) clearTimeout(el._ft);
        const next = itemMatches(el);
        const cur = el.getAttribute('data-filter-status');
        if (cur === 'active' && transitionDelay > 0) {
          el.setAttribute('data-filter-status', 'transition-out');
          el._ft = setTimeout(() => { setItemState(el, next); el._ft = null; }, transitionDelay);
        } else if (transitionDelay > 0) {
          el._ft = setTimeout(() => { setItemState(el, next); el._ft = null; }, transitionDelay);
        } else {
          setItemState(el, next);
        }
      });
      buttons.forEach(btn => {
        const t = (btn.getAttribute('data-filter-target') || '').trim().toLowerCase();
        setButtonState(btn, (activeTarget === 'all' && t === 'all') || (t && t === activeTarget));
      });
    };
    group.addEventListener('click', e => {
      const btn = e.target.closest('[data-filter-target]');
      if (btn && group.contains(btn)) paint(btn.getAttribute('data-filter-target'));
    });
  });
}
// Initialize Basic Filter Setup (Multi Match)
document.addEventListener('DOMContentLoaded', () => {
  initBasicFilterSetupMultiMatch();
});
```
### Javascript
```text
/* Filter Button */
.filter-btn {
  transition: color 0.6s cubic-bezier(0.625, 0.05, 0, 1), background-color 0.6s cubic-bezier(0.625, 0.05, 0, 1);
}
.filter-btn[data-filter-status="active"] {
  background-color: #131313;
  color: #EFEEEC;
}
/* Filter List Item */
.filter-list__item[data-filter-status="active"] {
  transition: opacity 0.6s cubic-bezier(0.625, 0.05, 0, 1), transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
  transform: scale(1) rotate(0.001deg);
  opacity: 1;
  visibility: visible;
  position: relative;
}
.filter-list__item[data-filter-status="transition-out"] {
  transition: opacity 0.45s cubic-bezier(0.625, 0.05, 0, 1), transform 0.45s cubic-bezier(0.625, 0.05, 0, 1);
  transform: scale(0.9) rotate(0.001deg);
  opacity: 0;
  visibility: visible;
}
.filter-list__item[data-filter-status="not-active"] {
  transform: scale(0.9) rotate(0.001deg);
  opacity: 0;
  visibility: hidden; 
  position: absolute;
}
```
### Implementation
#### Filter Group
A container with the `[data-filter-group]` attribute that keeps buttons and items organised, ensuring multiple groups on the page function independently.
#### Filter Button
Buttons with the `[data-filter-target="example"]` attribute indicate which items to display, while the `[data-filter-status]` attribute tracks whether a button is active or not. Make sure to not use spaces. When a filter is made out of multiple words use: `[data-filter-target="blue-birds"]`.
#### Filter Item
Items to be filtered are identified by the `[data-filter-name="example"]` attribute, matching the target of a button, and their visibility is controlled by the `[data-filter-status]` attribute. When a filter is made out of multiple words use: `[data-filter-name="blue-birds"]`. When the item is connected to multiple buttons use a space between the names in the attribute, for example: `[data-filter-name="mammals aquatic"]`.
#### Filter Status (not-active, active, transition-out)
The `[data-filter-status]` attribute determines an item’s state:
- active: Makes the item visible.
- not-active: Hides the item.
- transition-out: Temporarily applied to items for smooth animations when transitioning from active to not-active. Items remain in this state for a specified duration (`transitionDelay` in JavaScript, in milliseconds: 300ms = 0.3s) before their final state is set.
#### Multiple keywords
You can assign multiple keywords to a single filter item by separating them with a space. For example: `[data-filter-name="mammals aquatic"]`
#### Name Collect \*Optional for Webflow users
Use children marked with `[data-filter-name-collect]` inside an item to auto-build the parent’s `[data-filter-name]` from unique tokens without duplicates.
Example item setup:
### HTML
```text
<div class="demo-card" data-filter-name="">
  <div> <!-- Webflow Collection -->
    <div> <!-- Webflow Collection List -->
      <div> <!-- Webflow Collection Item -->
        <div data-filter-name-collect="mammals"></div>
      </div>
      <div> <!-- Webflow Collection Item -->
        <div data-filter-name-collect="aquatic"></div>
      </div>
    </div>
  </div>
</div>
<!-- becomes: data-filter-name="mammals aquatic" -->
```
#### All button
A special button with `[data-filter-target="all"]` will display all items in the group when clicked, regardless of their data-filter-name. This button also uses `[data-filter-status]` to indicate if it is active or not.
### Other Filter Setups
- [Basic Filter Setup](https://www.osmo.supply/resource/basic-filter-setup)
- [Multi Filter Setup (Multi Match)](https://www.osmo.supply/resource/multi-filter-setup-multi-match)