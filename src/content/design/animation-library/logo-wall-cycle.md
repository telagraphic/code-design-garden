---
title: "Logo Wall Cycle"
description: "Logo Wall Cycle."
slug: "logo-wall-cycle"
previewVideo: "logo-wall-cycle.mp4"
order: 49.906
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["logo", "wall", "cycle"]
sourceUrl: "https://www.osmo.supply/resource/logo-wall-cycle"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<div data-logo-wall-shuffle="false" data-logo-wall-cycle-init="" class="logo-wall">
  <div class="logo-wall__collection">
    <div data-logo-wall-list="" class="logo-wall__list">
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
      <div data-logo-wall-item="" class="logo-wall__item">
        <div data-logo-wall-target-parent="" class="logo-wall__logo">
          <div class="logo-wall__logo-before"></div>
          <div data-logo-wall-target="" class="logo-wall__logo-target">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
### CSS
```text
.logo-wall {
  display: flex;
  justify-content: center;
  width: 100%;
}
.logo-wall__collection {
  width: 100%;
}
.logo-wall__list {
  display: flex;
  flex-flow: wrap;
}
.logo-wall__item {
  width: 25%;
  position: relative;
}
[data-logo-wall-list] [data-logo-wall-item]:nth-child(n+9) {
  display: none;
}
.logo-wall__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.logo-wall__logo-before {
  padding-top: 66.66%;
}
.logo-wall__logo-target {
  justify-content: center;
  align-items: center;
  width: 66.66%;
  height: 40%;
  display: flex;
  position: absolute;
}
.logo-wall__logo-img {
  width: 100%;
  height: 100%;
  max-height: 100%;
}
@media screen and (max-width: 991px) {
  .logo-wall__item {
    width: 33.333%;
  }
  [data-logo-wall-list] [data-logo-wall-item]:nth-child(n+7) {
    display: none;
  }
}
```
### Javascript
```javascript
function initLogoWallCycle() {
  const loopDelay = 1.5;   // Loop Duration
  const duration  = 0.9;   // Animation Duration
  document.querySelectorAll('[data-logo-wall-cycle-init]').forEach(root => {
    const list   = root.querySelector('[data-logo-wall-list]');
    const items  = Array.from(list.querySelectorAll('[data-logo-wall-item]'));
    const shuffleFront = root.getAttribute('data-logo-wall-shuffle') !== 'false';
    const originalTargets = items
      .map(item => item.querySelector('[data-logo-wall-target]'))
      .filter(Boolean);
    let visibleItems   = [];
    let visibleCount   = 0;
    let pool           = [];
    let pattern        = [];
    let patternIndex   = 0;
    let tl;
    function isVisible(el) {
      return window.getComputedStyle(el).display !== 'none';
    }
    function shuffleArray(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    function setup() {
      if (tl) {
        tl.kill();
      }
      visibleItems = items.filter(isVisible);
      visibleCount = visibleItems.length;
      pattern = shuffleArray(
        Array.from({ length: visibleCount }, (_, i) => i)
      );
      patternIndex = 0;
      // remove all injected targets
      items.forEach(item => {
        item.querySelectorAll('[data-logo-wall-target]').forEach(old => old.remove());
      });
      pool = originalTargets.map(n => n.cloneNode(true));
      let front, rest;
      if (shuffleFront) {
        const shuffledAll = shuffleArray(pool);
        front = shuffledAll.slice(0, visibleCount);
        rest  = shuffleArray(shuffledAll.slice(visibleCount));
      } else {
        front = pool.slice(0, visibleCount);
        rest  = shuffleArray(pool.slice(visibleCount));
      }
      pool = front.concat(rest);
      for (let i = 0; i < visibleCount; i++) {
        const parent =
          visibleItems[i].querySelector('[data-logo-wall-target-parent]') ||
          visibleItems[i];
        parent.appendChild(pool.shift());
      }
      tl = gsap.timeline({ repeat: -1, repeatDelay: loopDelay });
      tl.call(swapNext);
      tl.play();
    }
    function swapNext() {
      const nowCount = items.filter(isVisible).length;
      if (nowCount !== visibleCount) {
        setup();
        return;
      }
      if (!pool.length) return;
      const idx = pattern[patternIndex % visibleCount];
      patternIndex++;
      const container = visibleItems[idx];
      const parent =
        container.querySelector('[data-logo-wall-target-parent]') ||
        container.querySelector('*:has(> [data-logo-wall-target])') ||
        container;
      const existing = parent.querySelectorAll('[data-logo-wall-target]');
      if (existing.length > 1) return;
      const current  = parent.querySelector('[data-logo-wall-target]');
      const incoming = pool.shift();
      gsap.set(incoming, { yPercent: 50, autoAlpha: 0 });
      parent.appendChild(incoming);
      if (current) {
        gsap.to(current, {
          yPercent: -50,
          autoAlpha: 0,
          duration,
          ease: "expo.inOut",
          onComplete: () => {
            current.remove();
            pool.push(current);
          }
        });
      }
      gsap.to(incoming, {
        yPercent: 0,
        autoAlpha: 1,
        duration,
        delay: 0.1,
        ease: "expo.inOut"
      });
    }
    setup();
    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onEnter:     () => tl.play(),
      onLeave:     () => tl.pause(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.pause()
    });
    document.addEventListener('visibilitychange', () =>
      document.hidden ? tl.pause() : tl.play()
    );
  });
}
// Initialize Logo Wall Cycle
document.addEventListener('DOMContentLoaded', () => {
  initLogoWallCycle();
});
```
### CSS
```text
[data-logo-wall-list] [data-logo-wall-item]:nth-child(n+9) {
  display: none;
}
@media screen and (max-width: 991px) {
  [data-logo-wall-list] [data-logo-wall-item]:nth-child(n+7) {
    display: none;
  }
}
```
### Implementation
#### Container
Add the `[data-logo-wall-cycle-init]` attribute to the outermost wrapper (the “logo wall container”). This will initialize a single logo wall animation instance.
You can configure shuffling behavior with the optional \[data-logo-wall-shuffle\] attribute. When this is enabled the first visible logo's will be shuffeled too.
#### List
Apply `[data-logo-wall-list]` to the element that wraps all logo items.
#### Item
Each logo entry requires `[data-logo-wall-item]`. This acts as a placeholder for rotating logos.
We use CSS to hide the extra logos, this can be different on every viewport. The script will look for `display: none;` to decide what logos are not included.
### Javascript
```text
/* Desktop: Show only first 8 */
[data-logo-wall-list] > [data-logo-wall-item]:nth-child(n+9) {
  display: none;
}
/* Tablet/mobile: Show only first 6 */
@media (max-width: 768px) {
  [data-logo-wall-list] > [data-logo-wall-item]:nth-child(n+7) {
    display: none;
  }
}
```
#### Target & Target Parent
Inside each item, add a `[data-logo-wall-target]` element. This is the element that gets animated in/out during swaps.
You can wrap this in a parent element marked with `[data-logo-wall-target-parent]` if you want more control over placement. When the this attribute is not added the next logo will be placed in the `[data-logo-wall-item]` element.
#### Customizing the Animation
This example uses a slide-and-fade animation to cycle logos in and out. You can easily replace it with any animation style that better suits your project.