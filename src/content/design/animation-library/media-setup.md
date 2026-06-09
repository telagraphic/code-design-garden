---
title: "Media Setup"
description: "Media Setup."
slug: "media-setup"
previewVideo: "media-setup.mp4"
order: 49.9
published: true
categories: ["text", "media"]
triggers: ["hover", "click", "mouse-move", "autoplay"]
libraries: ["vanilla-js"]
keywords: ["media", "setup"]
sourceUrl: "https://www.osmo.supply/resource/media-setup-autoplay-hover-click"
---
## Setup
### HTML
```text
<div class="media">
  <div data-aspect-ratio class="aspect-ratio"></div>
  <div data-media-mode="autoplay" data-media-init data-media-status="not-active" class="cover-media">
    <div class="cover-placeholder">
      <p aria-hidden="true" data-nosnippet class="cover-placeholder__p">No media found</p>
    </div>
  </div>
</div>
```
### CSS
```text
.media {
  border-radius: 0.5em;
  width: 100%;
  position: relative;
}
.aspect-ratio {
  padding-top: 133.333%;
}
.cover-media {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.cover-image {
  object-fit: cover;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.cover-video {
  object-fit: cover;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.cover-placeholder {
  text-align: center;
  border-radius: inherit;
  background-color: rgba(128, 128, 128, 0.15);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  container-type: inline-size;
}
.cover-placeholder__p {
  margin-bottom: 0;
  font-size: 5cqw;
}
```
### Javascript
```javascript
function initMediaSetup() {
  const mediaElements = document.querySelectorAll("[data-media-init]");
  if (!mediaElements.length) return;
  const pauseDelay = 200;
  const viewportOffset = 0.1;
  const isHoverDevice = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  initMediaSetup._cleanup?.forEach(fn => fn());
  const cleanupFns = [];
  const rootMarginValue = viewportOffset * 100;
  mediaElements.forEach(mediaEl => {
    const video = mediaEl.querySelector("[data-media-video-src]");
    if (!video) return;
    const mode = mediaEl.dataset.mediaMode || "autoplay";
    const touchMode = mediaEl.dataset.mediaTouchMode;
    const resetAttr = mediaEl.dataset.mediaReset;
    const pausedStatusAttr = mediaEl.dataset.mediaOnPause;
    const toggleElements = [...mediaEl.querySelectorAll("[data-media-toggle]")];
    const activeMode = !isHoverDevice ? (touchMode || (mode === "hover" ? "autoplay" : mode)) : mode;
    const shouldResetOnPause = resetAttr === "true" ? true : resetAttr === "false" ? false : activeMode === "hover";
    const pausedStatus = pausedStatusAttr === "paused" ? "paused" : "not-active";
    const clickTargets = toggleElements.length ? toggleElements : [mediaEl];
    const shouldUseClickToggle = activeMode === "click" || (activeMode === "autoplay" && toggleElements.length);
    let isInView = false;
    let isHovering = false;
    let hasLoaded = false;
    let userPaused = false;
    let userActivated = false;
    let isActivated = false;
    let shouldBePlaying = false;
    let pauseTimer = null;
    const setStatus = status => {
      mediaEl.dataset.mediaStatus = status;
    };
    const clearPauseTimer = () => {
      clearTimeout(pauseTimer);
    };
    const addCleanup = fn => {
      cleanupFns.push(fn);
    };
    const on = (target, event, handler) => {
      target.addEventListener(event, handler);
      addCleanup(() => target.removeEventListener(event, handler));
    };
    const playAttempt = () => {
      video.play().then(() => {
        if (shouldBePlaying) setStatus("playing");
      }).catch(() => {});
    };
    const loadVideo = () => {
      if (hasLoaded) return;
      const src = video.dataset.mediaVideoSrc;
      if (!src) return;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.src = src;
      video.load();
      hasLoaded = true;
    };
    const shouldResume = () => {
      if (!isInView || document.hidden) return false;
      if (activeMode === "autoplay") return !userPaused;
      if (activeMode === "click") return userActivated && !userPaused;
      return isHovering;
    };
    const playVideo = () => {
      if (!isInView || document.hidden) return;
      shouldBePlaying = true;
      clearPauseTimer();
      loadVideo();
      setStatus(video.readyState < 3 ? "loading" : "playing");
      playAttempt();
    };
    const pauseVideo = (delay = 0, reset = false) => {
      shouldBePlaying = false;
      clearPauseTimer();
      pauseTimer = setTimeout(() => {
        video.pause();
        if (reset) video.currentTime = 0;
      }, delay);
    };
    const handleHoverIn = () => {
      if (!isInView || document.hidden) return;
      isHovering = true;
      clearPauseTimer();
      if (!video.paused) {
        shouldBePlaying = true;
        setStatus("playing");
        return;
      }
      playVideo();
    };
    const handleHoverOut = () => {
      if (!isInView) return;
      isHovering = false;
      setStatus(pausedStatus);
      pauseVideo(pauseDelay, shouldResetOnPause);
    };
    const handleClick = () => {
      if (!isInView || document.hidden) return;
      clearPauseTimer();
      if (video.paused) {
        userActivated = true;
        userPaused = false;
        playVideo();
      } else {
        userActivated = true;
        userPaused = true;
        setStatus(pausedStatus);
        pauseVideo(pauseDelay, shouldResetOnPause);
      }
    };
    const handleViewport = entries => {
      entries.forEach(entry => {
        if (entry.target !== mediaEl) return;
        if (!isActivated && entry.isIntersecting) {
          isActivated = true;
          if (shouldUseClickToggle) {
            clickTargets.forEach(toggleEl => on(toggleEl, "click", handleClick));
          }
          if (activeMode === "hover") {
            on(mediaEl, "mouseenter", handleHoverIn);
            on(mediaEl, "mouseleave", handleHoverOut);
          }
        }
        isInView = entry.isIntersecting;
        if (isInView) {
          if (shouldResume()) playVideo();
        } else {
          isHovering = false;
          if (!video.paused || shouldBePlaying) {
            setStatus("paused");
            pauseVideo(0, false);
          }
        }
      });
    };
    const handlePageVisibilityChange = () => {
      if (document.hidden) {
        if (!video.paused || shouldBePlaying) {
          setStatus("paused");
          pauseVideo(0, false);
        }
        return;
      }
      if (shouldResume()) playVideo();
    };
    mediaEl.dataset.mediaStatus = "not-active";
    const observer = new IntersectionObserver(handleViewport, {
      rootMargin: \`${rootMarginValue}% 0px ${rootMarginValue}% 0px\`,
      threshold: 0
    });
    observer.observe(mediaEl);
    on(video, "playing", () => {if (shouldBePlaying) setStatus("playing");});
    on(video, "waiting", () => {if (shouldBePlaying) setStatus("loading");});
    on(video, "canplay", () => {if (shouldBePlaying && isInView && !document.hidden) playAttempt();});
    on(video, "loadeddata", () => {if (shouldBePlaying && isInView && !document.hidden) playAttempt();});
    on(video, "ended", () => {if (!shouldBePlaying || !isInView || document.hidden) return; video.currentTime = 0; playAttempt();});
    on(document, "visibilitychange", handlePageVisibilityChange);
    addCleanup(() => observer.disconnect());
    addCleanup(() => {
      clearPauseTimer();
      shouldBePlaying = false;
      video.pause();
    });
  });
  initMediaSetup._cleanup = cleanupFns;
}
// Initialize Cover Media Setup (Autoplay, Click, Hover)
document.addEventListener("DOMContentLoaded", function() {
  initMediaSetup();
});
```
### CSS
```text
[data-media-init] [data-media-placeholder] {
  transition: opacity 0.2s ease, visibility 0.2s ease;
}
[data-media-init][data-media-status="playing"] [data-media-placeholder],
[data-media-init][data-media-status="paused"] [data-media-placeholder] {
  visibility: hidden;
  opacity: 0;
}
```
### Implementation
#### Media Element
Use `[data-media-init]` on the media wrapper to initialize the script and let it control the video, placeholder state, interaction mode, and viewport behavior.
### HTML
```text
<div class="cover-media" data-media-init data-media-mode="hover" data-media-status="not-active">
</div>
```
#### Mode
Use `[data-media-mode=“autoplay”]`, `[data-media-mode=“hover”]`, or `[data-media-mode=“click”]` to define how the video starts playing.
#### Touch Mode
Optionally you can use `[data-media-touch-mode=“autoplay”]` or `[data-media-touch-mode=“click”]` to override how videos behave on touch devices, with the default behaviour mapping desktop modes automatically where autoplay stays autoplay, click stays click, and hover falls back to autoplay.
#### Reset/restart video on hover or click
Optionally you can use `[data-media-reset=“true/false”]` to control whether the video returns to the start after pausing, with hover mode defaulting to true and autoplay or click mode defaulting to false when no value is added.
#### Pause behaviour
Optionally you can use `[data-media-on-pause=“not-active/paused”]` to control what happens when playback stops due to hover out or user interaction.
#### Toggle Play/Pause
Optionally you can use `[data-media-toggle]` on one or more nested elements to make those elements control play and pause, instead of using the full media wrapper as the click target.
#### Video Source
Use `[data-media-video-src]` on the video element to store the MP4 source, which gets added only when the script needs to load and play the video. To host and store videos we use [Bunny.net](https://bunny.net/?ref=sopkrejhiv).
#### Status
Use `[data-media-status]` on the media wrapper to reflect the current video state as `not-active`, `loading`, `playing`, or `paused`, so you can fully control the placeholder and UI with CSS.
#### Placeholder
Use `[data-media-placeholder]` on a sibling image element to create a placeholder that can be shown or hidden with CSS based on the current `[data-media-status]`.
#### Viewport Offset
Adjust the value of `const viewportOffset = 0.1;` in the JavaScript to control how early or late the viewport detection triggers for the media elements, where positive values start playback before the element fully enters the viewport and negative values delay playback until the element is further inside the viewport.
#### Cleanup
Optionally you can use `destroyCoverMediaSetup()` function to manually remove all observers, event listeners, and timers when leaving a page in a SPA like BarbaJS.
### Javascript
```javascript
function initCoverMediaSetup() {
  // Main Script
}
// Add-on: Optional Cleanup Function
function destroyCoverMediaSetup() {
  if (!initCoverMediaSetup._cleanup) return;
  initCoverMediaSetup._cleanup.forEach(fn => fn());
  initCoverMediaSetup._cleanup = [];
}
```
Example how to clean up the script with BarbaJS
### Javascript
```javascript
barba.hooks.leave(() => {
  destroyCoverMediaSetup();
});
```
#### Aspect Ratio CSS
Optionally you can use these CSS values to hook up different aspect ratios to the `[data-aspect-ratio]` element.
### CSS
```javascript
[data-aspect-ratio="5:4 Landscape"] {padding-top: 80%;}
[data-aspect-ratio="4:3 Landscape"] {padding-top: 75%;}
[data-aspect-ratio="3:2 Landscape"] {padding-top: 66.66%;}
[data-aspect-ratio="16:9 Landscape"] {padding-top: 56.25%;}
[data-aspect-ratio="1:1 Square"] {padding-top: 100%;}
[data-aspect-ratio="4:5 Portrait"] {padding-top: 125%;}
[data-aspect-ratio="3:4 Portrait"] {padding-top: 133.33%;}
[data-aspect-ratio="2:3 Portrait"] {padding-top: 150%;}
[data-aspect-ratio="9:16 Portrait"] {padding-top: 177.77%;}
```