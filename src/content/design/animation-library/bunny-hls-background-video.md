---
title: "Bunny HLS Background Video"
description: "Bunny HLS Background Video."
slug: "bunny-hls-background-video"
previewVideo: "bunny-hls-background-video.mp4"
order: 49.99
published: true
categories: ["media"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["bunny", "hls", "background", "video"]
sourceUrl: "https://www.osmo.supply/resource/bunny-hls-background-video"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/hls.js@1.6.11"></script>
```
### HTML
```text
<section class="demo-section">
  <div class="bunny-bg" data-bunny-background-init="" data-player-activated="false" data-player-src="https://vz-6ed806ff-5e5.b-cdn.net/b6a663de-07c1-4c37-8bb6-0e79fef7fb3c/playlist.m3u8" data-player-status="idle" data-player-lazy="false" data-player-autoplay="true">
    <div data-player-control="playpause" class="bunny-bg__playpause">
      <div class="bunny-bg__btn">
      </div>
    </div>
    <div class="bunny-bg__loading">
    </div>
  </div>
  <div class="demo-section__fade-left"></div>
  <div class="demo-section__title">
    <h1 class="demo-section__title-h1">Background<br>Bunny HLS Player</h1>
  </div>
</section>
```
### CSS
```text
.bunny-bg {
  pointer-events: none;
  color: #fff;
  isolation: isolate;
  border-radius: 1em;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transform: translateX(0);
}
.bunny-bg__video {
  object-fit: cover;
  width: 100%;
  height: 100%;
  padding-bottom: 0;
  padding-right: 0;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
/* Animation */
[data-bunny-background-init] :is(.bunny-bg__placeholder, .bunny-bg__loading) {
  transition: opacity 0.3s linear, visibility 0.3s linear;
}
/* Placeholder */
.bunny-bg__placeholder {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}
[data-bunny-background-init][data-player-status="playing"] .bunny-bg__placeholder,
[data-bunny-background-init][data-player-status="paused"] .bunny-bg__placeholder,
[data-bunny-background-init][data-player-activated="true"][data-player-status="ready"] .bunny-bg__placeholder {
  opacity: 0;
  visibility: hidden;
}
/* Loading */
.bunny-bg__loading {
  opacity: 0;
  visibility: hidden;
  background-color: #00000054;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
}
.bunny-bg__loading-svg {
  width: 6em;
}
[data-bunny-background-init][data-player-status="loading"] .bunny-bg__loading {
  opacity: 1;
  visibility: visible;
}
/* Play/Pause */
.bunny-bg__playpause {
  pointer-events: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  bottom: 4vw;
  right: 4vw;
}
.bunny-bg__btn {
  -webkit-backdrop-filter: blur(1em);
  backdrop-filter: blur(1em);
  cursor: pointer;
  background-color: #6464644d;
  border: 1px solid #ffffff1a;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 3em;
  height: 3em;
  padding: .8125em;
  display: flex;
  position: relative;
}
.bunny-bg__pause-svg {
  display: none;
}
[data-bunny-background-init][data-player-status="playing"] .bunny-bg__play-svg,
[data-bunny-background-init][data-player-status="loading"] .bunny-bg__play-svg {
  display: none;
}
[data-bunny-background-init][data-player-status="playing"] .bunny-bg__pause-svg,
[data-bunny-background-init][data-player-status="loading"] .bunny-bg__pause-svg{
  display: block;
}
/* Demo Section */
.demo-section {
  color: #efeeec;
  background-color: #000;
  flex-flow: column;
  justify-content: flex-end;
  align-items: flex-start;
  min-height: 100svh;
  padding: 4vw;
  display: flex;
  position: relative;
  overflow: hidden;
}
.demo-section__title {
  position: relative;
}
.demo-section__title-h1 {
  max-width: 9em;
  font-size: 8vw;
  font-weight: 500;
  line-height: 1;
}
.demo-section__fade-left {
  pointer-events: none;
  background-image: linear-gradient(45deg, #000, #0000 50%);
  width: 90vw;
  height: 90vw;
  position: absolute;
  bottom: 0;
  left: 0;
}
@media screen and (max-width: 991px) {
  .bunny-bg__playpause {
    bottom: 1em;
    right: 1em;
  }
  .demo-section {
    padding-bottom: 25vw;
  }
  .demo-section__title-h1 {
    font-size: 15vw;
  }
}
```
### Javascript
```javascript
function initBunnyPlayerBackground() {
  document.querySelectorAll('[data-bunny-background-init]').forEach(function(player) {
    var src = player.getAttribute('data-player-src');
    if (!src) return;
    var video = player.querySelector('video');
    if (!video) return;
    try { video.pause(); } catch(_) {}
    try { video.removeAttribute('src'); video.load(); } catch(_) {}
    // Attribute helpers
    function setStatus(s) {
      if (player.getAttribute('data-player-status') !== s) {
        player.setAttribute('data-player-status', s);
      }
    }
    function setActivated(v) { player.setAttribute('data-player-activated', v ? 'true' : 'false'); }
    if (!player.hasAttribute('data-player-activated')) setActivated(false);
    // Flags
    var lazyMode   = player.getAttribute('data-player-lazy'); // "true" | "false" (no meta)
    var isLazyTrue = lazyMode === 'true';
    var autoplay   = player.getAttribute('data-player-autoplay') === 'true';
    var initialMuted = player.getAttribute('data-player-muted') === 'true';
    // Used to suppress 'ready' flicker when user just pressed play in lazy modes
    var pendingPlay = false;
    // Autoplay forces muted + loop; IO will drive play/pause
    if (autoplay) { video.muted = true; video.loop = true; }
    else { video.muted = initialMuted; }
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.playsInline = true;
    if (typeof video.disableRemotePlayback !== 'undefined') video.disableRemotePlayback = true;
    if (autoplay) video.autoplay = false;
    var isSafariNative = !!video.canPlayType('application/vnd.apple.mpegurl');
    var canUseHlsJs    = !!(window.Hls && Hls.isSupported()) && !isSafariNative;
    // Attach media only once (for actual playback)
    var isAttached = false;
    var userInteracted = false;
    var lastPauseBy = ''; // 'io' | 'manual' | ''
    function attachMediaOnce() {
      if (isAttached) return;
      isAttached = true;
      if (player._hls) { try { player._hls.destroy(); } catch(_) {} player._hls = null; }
      if (isSafariNative) {
        video.preload = isLazyTrue ? 'none' : 'auto';
        video.src = src;
        video.addEventListener('loadedmetadata', function() {
          readyIfIdle(player, pendingPlay);
        }, { once: true });
      } else if (canUseHlsJs) {
        var hls = new Hls({ maxBufferLength: 10 });
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function() { hls.loadSource(src); });
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          readyIfIdle(player, pendingPlay);
        });
        player._hls = hls;
      } else {
        video.src = src;
      }
    }
    // Initialize based on lazy mode
    if (isLazyTrue) {
      video.preload = 'none';
    } else {
      attachMediaOnce();
    }
    // Toggle play/pause
    function togglePlay() {
      userInteracted = true;
      if (video.paused || video.ended) {
        if (isLazyTrue && !isAttached) attachMediaOnce();
        pendingPlay = true;
        lastPauseBy = '';
        setStatus('loading');
        safePlay(video);
      } else {
        lastPauseBy = 'manual';
        video.pause();
      }
    }
    // Toggle mute
    function toggleMute() {
      video.muted = !video.muted;
      player.setAttribute('data-player-muted', video.muted ? 'true' : 'false');
    }
    // Controls (delegated)
    player.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-player-control]');
      if (!btn || !player.contains(btn)) return;
      var type = btn.getAttribute('data-player-control');
      if (type === 'play' || type === 'pause' || type === 'playpause') togglePlay();
      else if (type === 'mute') toggleMute();
    });
    // Media event wiring
    video.addEventListener('play', function() { setActivated(true); setStatus('playing'); });
    video.addEventListener('playing', function() { pendingPlay = false; setStatus('playing'); });
    video.addEventListener('pause', function() { pendingPlay = false; setStatus('paused'); });
    video.addEventListener('waiting', function() { setStatus('loading'); });
    video.addEventListener('canplay', function() { readyIfIdle(player, pendingPlay); });
    video.addEventListener('ended', function() { pendingPlay = false; setStatus('paused'); setActivated(false); });
    // In-view auto play/pause (only when autoplay is true)
    if (autoplay) {
      if (player._io) { try { player._io.disconnect(); } catch(_) {} }
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          var inView = entry.isIntersecting && entry.intersectionRatio > 0;
          if (inView) {
            if (isLazyTrue && !isAttached) attachMediaOnce();
            if ((lastPauseBy === 'io') || (video.paused && lastPauseBy !== 'manual')) {
              setStatus('loading');
              if (video.paused) togglePlay();
              lastPauseBy = '';
            }
          } else {
            if (!video.paused && !video.ended) {
              lastPauseBy = 'io';
              video.pause();
            }
          }
        });
      }, { threshold: 0.1 });
      io.observe(player);
      player._io = io;
    }
  });
  // Helper: Ready status guard
  function readyIfIdle(player, pendingPlay) {
    if (!pendingPlay &&
        player.getAttribute('data-player-activated') !== 'true' &&
        player.getAttribute('data-player-status') === 'idle') {
      player.setAttribute('data-player-status', 'ready');
    }
  }
  // Helper: safe programmatic play
  function safePlay(video) {
    var p = video.play();
    if (p && typeof p.then === 'function') p.catch(function(){});
  }
}
// Initialize Bunny HTML HLS Player (Background)
document.addEventListener('DOMContentLoaded', function() {
  initBunnyPlayerBackground();
});
```
### Javascript
```text
/* Animation */
[data-bunny-background-init] :is(.bunny-bg__placeholder, .bunny-bg__loading) {
  transition: opacity 0.3s linear, visibility 0.3s linear;
}
/* Placeholder */
[data-bunny-background-init][data-player-status="playing"] .bunny-bg__placeholder,
[data-bunny-background-init][data-player-status="paused"] .bunny-bg__placeholder,
[data-bunny-background-init][data-player-activated="true"][data-player-status="ready"] .bunny-bg__placeholder {
  opacity: 0;
  visibility: hidden;
}
/* Play/Pause */
[data-bunny-background-init][data-player-status="playing"] .bunny-bg__play-svg,
[data-bunny-background-init][data-player-status="loading"] .bunny-bg__play-svg {
  display: none;
}
[data-bunny-background-init][data-player-status="playing"] .bunny-bg__pause-svg,
[data-bunny-background-init][data-player-status="loading"] .bunny-bg__pause-svg{
  display: block;
}
/* Loading */
[data-bunny-background-init][data-player-status="loading"] .bunny-bg__loading {
  opacity: 1;
  visibility: visible;
}
```
### Implementation
#### Hosting videos on Bunny
For hosting `.m3u8` HLS files we use [Bunny.net](https://bunny.net/?ref=sopkrejhiv). It provides a straightforward interface for uploading and managing videos, automatically generating the HLS streams needed by this player.
#### About HLS (.m3u8)
This player is built exclusively for HTTP Live Streaming (HLS) sources, which use a.m3u8 playlist file. An.m3u8 playlist describes a sequence of small media chunks (usually.ts or.mp4 segments) and can include multiple quality levels for adaptive streaming. Playback is handled through [hls.j](https://github.com/video-dev/hls.js) on most browsers, or through Safari’s native HLS support on macOS and iOS. Because of this design, the player will not work with regular MP4 files or any format other than.m3u8.
#### Container
The player is always wrapped in a container marked with `[data-bunny-player-init]`. Inside this wrapper, the `[data-player-src]` attribute points to an HLS `.m3u8` source. This container becomes the root for all other attributes and UI.
#### Status
The `[data-player-status]` attribute reflects the live playback state of the video. This value is never set manually, it updates automatically as the player changes state. You can style your UI based on these statuses to show or hide placeholders, loaders, and controls.
- idle → The player has been initialized but no media is attached or ready yet. This is the starting state, often where you show a poster or placeholder image.
- ready → Metadata or manifest information has been loaded, so the video is prepared to start instantly. At this stage, you can show a “ready to play” UI but playback hasn’t started yet.
- loading → The video is buffering, either while starting playback or resuming from a stall. This is the moment to display a loading indicator or spinner.
- playing → Playback is running actively. Overlays like placeholders should be hidden.
- paused → Playback has been stopped by the user or has reached the end. The placeholder can reappear.
In addition, the attribute `[data-player-activated=“true|false”]` tracks whether the video has ever started once. It switches to true after the first play and resets back to false when the video ends. This lets you hide placeholders only after first play, then bring them back when playback finishes.
#### Play / Pause
Elements with `[data-player-control=“play”]` or `[data-player-control=“pause”]` control playback explicitly. A play button always attempts to start playback, while a pause button always stops it.  
#### PlayPause Toggle
An element with `[data-player-control=“playpause”]` acts as a toggle. When the video is paused, clicking it will start playback; when the video is playing, clicking it will pause. This is the simplest control if you want just one button.  
#### Mute
An element with `[data-player-control=“mute”]` toggles the mute state. The status attribute `[data-player-muted=“true|false”]` is updated automatically to reflect the current mute state, so you can style your mute/unmute icon accordingly.  
#### Lazy Loading
Loading behavior is controlled with `[data-player-lazy]`:
- When set to `true`, the player defers all loading until the user presses play. Nothing is fetched before interaction.
- When set to `false`, the player loads the stream eagerly on initialization.
#### Autoplay
Enable autoplay by setting the attribute `[data-player-autoplay=“true”]`. Videos that autoplay are muted by default to comply with browser policies. When autoplay is enabled the player will loop the video.