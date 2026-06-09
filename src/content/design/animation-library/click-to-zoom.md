---
title: "Click To Zoom"
description: "Click To Zoom."
slug: "click-to-zoom"
previewVideo: "click-to-zoom.mp4"
order: 49.94
published: true
categories: ["cursor", "loader", "media"]
triggers: ["drag", "click"]
libraries: ["gsap"]
keywords: ["click", "zoom"]
sourceUrl: "https://www.osmo.supply/resource/click-to-zoom-basic"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
```
### HTML
```text
<!-- Example trigger -->
<div data-click-zoom class="click-zoom__visual">
</div>
<!-- Fixed overlay -->
<div data-click-zoom-lightbox class="click-zoom__lightbox"></div>
```
### CSS
```text
.click-zoom__visual {
  aspect-ratio: 3 / 2;
  border-radius: .75em;
  width: 100%;
  overflow: hidden;
}
.click-zoom__img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
img[data-click-zoom],
[data-click-zoom] img,
[data-click-zoom-article] img {
  cursor: zoom-in;
}
[data-click-zoom-lightbox] > img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  -webkit-user-drag: none;
  border-radius: 0.75em;
}
.click-zoom__lightbox {
  z-index: 100;
  cursor: zoom-out;
  background-color: #000000e6;
  justify-content: center;
  align-items: center;
  padding: 3em;
  display: none;
  position: fixed;
  inset: 0%;
}
```
### Javascript
```javascript
function initClickToZoomBasic() {
  const CONFIG = {
    openDuration: 0.55,
    closeDuration: 0.45,
    openEase: "power3.out",
    closeEase: "power2.inOut",
    closeOnScroll: true,
    closeOnEscape: true,
    closeOnClick: true,
  };
  const lightbox = document.querySelector("[data-click-zoom-lightbox]");
  if (!lightbox) return;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-hidden", "true");
  // Backdrop animates from transparent to the CSS-declared color.
  const backdropColor = window.getComputedStyle(lightbox).backgroundColor;
  const transparent = "rgba(0, 0, 0, 0)";
  let cloneEl = null;
  let isOpen = false;
  let isAnimating = false;
  let openScrollY = 0;
  let openSourceRectDoc = null;
  function computeFlip(src, dst) {
    return {
      scaleX: src.width / dst.width,
      scaleY: src.height / dst.height,
      tx: (src.left + src.width / 2) - (dst.left + dst.width / 2),
      ty: (src.top + src.height / 2) - (dst.top + dst.height / 2),
    };
  }
  function open(img) {
    if (isOpen || isAnimating) return;
    if (!img.complete || !img.naturalWidth) return;
    isAnimating = true;
    openScrollY = window.scrollY;
    const srcRect = img.getBoundingClientRect();
    openSourceRectDoc = {
      top: srcRect.top + window.scrollY,
      left: srcRect.left,
      width: srcRect.width,
      height: srcRect.height,
    };
    cloneEl = img.cloneNode(false);
    cloneEl.loading = "eager";
    cloneEl.removeAttribute("data-click-zoom");
    const srcComputed = window.getComputedStyle(img);
    gsap.set(lightbox, { display: "flex", backgroundColor: transparent });
    const lightboxStyle = window.getComputedStyle(lightbox);
    const padX = parseFloat(lightboxStyle.paddingLeft) + parseFloat(lightboxStyle.paddingRight);
    const padY = parseFloat(lightboxStyle.paddingTop) + parseFloat(lightboxStyle.paddingBottom);
    const aspect = srcRect.width / srcRect.height;
    const maxW = lightbox.clientWidth - padX;
    const maxH = lightbox.clientHeight - padY;
    let w = maxW;
    let h = w / aspect;
    if (h > maxH) { h = maxH; w = h * aspect; }
    gsap.set(cloneEl, {
      width: w,
      height: h,
      display: "block",
      objectFit: srcComputed.objectFit,
      objectPosition: srcComputed.objectPosition,
    });
    while (lightbox.firstChild) lightbox.removeChild(lightbox.firstChild);
    lightbox.appendChild(cloneEl);
    const dstRect = cloneEl.getBoundingClientRect();
    const flip = computeFlip(srcRect, dstRect);
    lightbox.setAttribute("aria-hidden", "false");
    document.documentElement.style.cursor = "zoom-out";
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
        isOpen = true;
        attachCloseListeners();
      },
    });
    tl.to(lightbox, {
      backgroundColor: backdropColor,
      duration: 0.3,
      ease: "none",
    }, 0);
    tl.fromTo(
      cloneEl,
      { x: flip.tx, y: flip.ty, scaleX: flip.scaleX, scaleY: flip.scaleY },
      { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: CONFIG.openDuration, ease: CONFIG.openEase },
      0
    );
  }
  function close() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;
    detachCloseListeners();
    document.documentElement.style.cursor = "";
    const dstRect = cloneEl.getBoundingClientRect();
    const startX = Number(gsap.getProperty(cloneEl, "x")) || 0;
    const startY = Number(gsap.getProperty(cloneEl, "y")) || 0;
    const startScaleX = Number(gsap.getProperty(cloneEl, "scaleX")) || 1;
    const startScaleY = Number(gsap.getProperty(cloneEl, "scaleY")) || 1;
    function currentSrcRect() {
      return {
        top: openSourceRectDoc.top - window.scrollY,
        left: openSourceRectDoc.left,
        width: openSourceRectDoc.width,
        height: openSourceRectDoc.height,
      };
    }
    let lastFlip = computeFlip(currentSrcRect(), dstRect);
    const cleanup = () => {
      gsap.set(lightbox, { display: "none", clearProps: "backgroundColor" });
      if (cloneEl && cloneEl.parentNode) cloneEl.parentNode.removeChild(cloneEl);
      cloneEl = null;
      lightbox.setAttribute("aria-hidden", "true");
      openSourceRectDoc = null;
      isOpen = false;
      isAnimating = false;
    };
    const state = { t: 0 };
    gsap.to(state, {
      t: 1,
      duration: CONFIG.closeDuration,
      ease: CONFIG.closeEase,
      onUpdate: () => {
        lastFlip = computeFlip(currentSrcRect(), dstRect);
        const t = state.t;
        gsap.set(cloneEl, {
          x: startX + (lastFlip.tx - startX) * t,
          y: startY + (lastFlip.ty - startY) * t,
          scaleX: startScaleX + (lastFlip.scaleX - startScaleX) * t,
          scaleY: startScaleY + (lastFlip.scaleY - startScaleY) * t,
        });
      },
      onComplete: cleanup,
    });
    gsap.to(lightbox, {
      backgroundColor: transparent,
      duration: 0.3,
      ease: "power2.in",
      delay: CONFIG.closeDuration * 0.4,
    });
  }
  function onDocumentClick(e) {
    // Article mode: every descendant  in a wrapper is clickable.
    const article = e.target.closest("[data-click-zoom-article]");
    if (article) {
      const img = e.target.closest("img");
      if (img && article.contains(img)) {
        e.preventDefault();
        open(img);
        return;
      }
    }
    // Explicit trigger on the  or a wrapper.
    const trigger = e.target.closest("[data-click-zoom]");
    if (!trigger) return;
    const img = trigger.tagName === "IMG" ? trigger : trigger.querySelector("img");
    if (!img) return;
    e.preventDefault();
    open(img);
  }
  function onOverlayClick() { if (CONFIG.closeOnClick) close(); }
  function onKeyDown(e) { if (CONFIG.closeOnEscape && e.key === "Escape") close(); }
  function onScroll() {
    if (!CONFIG.closeOnScroll) return;
    if (Math.abs(window.scrollY - openScrollY) < 2) return;
    close();
  }
  function attachCloseListeners() {
    lightbox.addEventListener("click", onOverlayClick);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  function detachCloseListeners() {
    lightbox.removeEventListener("click", onOverlayClick);
    document.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("scroll", onScroll);
  }
  document.addEventListener("click", onDocumentClick);
}
// Initialize Click to Zoom (Basic)
document.addEventListener('DOMContentLoaded', function() {
  initClickToZoomBasic();
});
```
### CSS
```text
img[data-click-zoom],
[data-click-zoom] img,
[data-click-zoom-article] img {
  cursor: zoom-in;
}
[data-click-zoom-lightbox] > img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  -webkit-user-drag: none;
  border-radius: 0.75em;
}
```
### Implementation
#### Lightbox
A single `<div>` with `[data-click-zoom-lightbox]` has to exist somewhere in the body. It's the empty container the zoomed image gets dropped into, and its CSS `background` sets the backdrop colour while its `padding` caps how large the zoom can grow. Make sure this has a fixed position on top of everything else.
#### Trigger
Tagging an image with `[data-click-zoom]` makes it zoomable on click, and the same attribute works on a wrapping element so the whole wrapper (caption, card, or anything else with an `` inside) becomes the clickable area.
### HTML
```text
<!-- This works: -->
<!-- But this works too: -->
<figure data-click-zoom>
  <figcaption>Caption text</figcaption>
</figure>
```
#### Article
Adding `[data-click-zoom-article]` to a wrapper turns every descendant `` into a zoomable trigger automatically. Useful (for example) in a Webflow Rich Text block, where individual images can't always carry custom attributes.
### HTML
```text
<div data-click-zoom-article>
  <p>Perfect if you have a wrapper with multiple images</p>
</div>
```
#### Closing the lightbox
Clicking the backdrop, pressing Escape, or scrolling the page all close the lightbox, and each of the three can be toggled off individually inside the `CONFIG` block of the script.