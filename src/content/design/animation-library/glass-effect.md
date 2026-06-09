---
title: "Glass Effect"
description: "Glass Effect."
slug: "glass-effect"
previewVideo: "glass-effect.mp4"
order: 49.917
published: true
categories: ["filter", "navigation", "scroll"]
triggers: ["scroll", "mouse-move"]
libraries: ["css-only"]
keywords: ["glass", "effect"]
sourceUrl: "https://www.osmo.supply/resource/glass-effect-background"
---
## Setup
### HTML
```text
<div class="demo-element">
  <div class="glass-effect">
    <div class="glass-effect__fill"></div>
    <div class="glass-effect__fill-burn"></div>
    <div class="glass-effect__highlight-soft"></div>
    <div class="glass-effect__highlight-strong"></div>
    <div class="glass-effect__edge-light"></div>
    <div class="glass-effect__edge-dark"></div>
    <div class="glass-effect__inner-glow"></div>
  </div>
</div>
```
### CSS
```text
.glass-effect {
  -webkit-backdrop-filter: saturate(120%) blur(.75em);
  backdrop-filter: saturate(120%) blur(.75em);
  pointer-events: none;
  isolation: isolate;
  color: #201d1d;
  border-radius: inherit;
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.glass-effect__fill {
  opacity: 1;
  border-radius: inherit;
  background-color: #d4d4d426;
  position: absolute;
  inset: 0;
}
.glass-effect__fill-burn {
  opacity: .05;
  mix-blend-mode: color-burn;
  border-radius: inherit;
  background-color: currentColor;
  position: absolute;
  inset: 0;
}
.glass-effect__highlight-soft {
  mix-blend-mode: overlay;
  border-radius: inherit;
  position: absolute;
  inset: 0;
  box-shadow: inset -.28125em -.28125em .09375em -.328125em #ffffff80;
}
.glass-effect__highlight-strong {
  border-radius: inherit;
  position: absolute;
  inset: 0;
  box-shadow: inset .28125em .28125em .09375em -.328125em #fffc;
}
.glass-effect__edge-light {
  border-radius: inherit;
  mix-blend-mode: plus-lighter;
  position: absolute;
  inset: 0;
  box-shadow: inset .1875em .28125em .09375em -.1875em #b3b3b380;
}
.glass-effect__edge-dark {
  mix-blend-mode: overlay;
  border-radius: inherit;
  position: absolute;
  inset: 0;
  box-shadow: inset -.1875em -.28125em .09375em -.1875em #b3b3b34d;
}
.glass-effect__inner-glow {
  mix-blend-mode: darken;
  border-radius: inherit;
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 1.75em #f2f2f24d;
}
.demo-element {
  border-radius: 50em;
  width: 15em;
  height: 3.5em;
  position: relative;
}
```
### CSS
### Implementation
#### Glass Effect
Use `.glass-effect ` as the main visual layer that covers the parent, holds all glass layers, and applies the blur, saturation, isolation, and overflow needed for the effect.
#### Scroll-Based Text color
If you want to use the glass effect with a navigation element that needs to switch between dark and light on scroll (how we do it in the live preview), you can use the [Check Section Theme on Scroll](https://www.osmo.supply/resource/check-section-theme-on-scroll) resource to switch the text color from light to dark and vice versa.
### CSS
```text
.nav-bar__a {
  transition: color 0.2s ease;
  color: white;
}
[data-theme-nav="light"] .nav-bar__a:not(.is--btn) {
  color: black;
}
```