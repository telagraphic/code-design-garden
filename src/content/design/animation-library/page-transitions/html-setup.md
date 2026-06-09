---
title: "HTML setup + First Simple Demo"
description: "HTML setup + First Simple Demo."
slug: "page-transitions/html-setup"
previewVideo: "html-setup.mp4"
order: 49.878
published: true
categories: ["page-transition"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["html", "setup", "first", "simple", "demo"]
sourceUrl: "https://www.osmo.supply/page-transition-course/html-setup-first-simple-demo"
---
Time to get our hands dirty! We'll add the HTML structure Barba needs, write our first init, and get a basic transition running. By the end of this lesson you'll click a link and watch the page swap without a full reload. Then we'll add a simple GSAP fade to make it actually look like a transition.
### Lesson Notes
#### Links
- [Barba.js Documentation](https://barba.js.org/docs/getstarted/intro/)
#### CDN Link
```text
<script src="https://cdn.jsdelivr.net/npm/@barba/core@2.10.3/dist/barba.umd.min.js"></script>
```
#### HTML Structure
Barba needs two things: a wrapper that stays, and a container that gets swapped. Anything outside the container persists (nav, global elements). Anything inside gets replaced on page change.
```text
<div data-barba="wrapper">
  <div data-barba="container">
    <!-- page content -->
  </div>
</div>
```
#### Minimal Barba Init
That's it. One line and Barba is running. Click a link and the page swaps without a full reload. If only it was as simple as this! This is just the beginning.
```javascript
barba.init();
```
#### Adding a simple transition
```javascript
barba.init({
  transitions: [
    {
      leave(data) {
        return gsap.to(data.current.container, { autoAlpha: 0, duration: 0.4 });
      },
      enter(data) {
        return gsap.from(data.next.container, { autoAlpha: 0, duration: 0.4 });
      }
    }
  ]
});
```
#### Why return the GSAP tween?
Returning the GSAP tween tells Barba to wait until the animation is done before continuing. Without it, Barba doesn't know how long your animation takes and things overlap chaotically.