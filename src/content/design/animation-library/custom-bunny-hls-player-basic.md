---
title: "Custom Bunny HLS Player (Basic)"
description: "Custom Bunny HLS Player (Basic)."
slug: "custom-bunny-hls-player-basic"
previewVideo: "custom-bunny-hls-player-basic.mp4"
order: 49.932
published: true
categories: ["media"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["custom", "bunny", "hls", "player", "basic"]
sourceUrl: "https://www.osmo.supply/resource/custom-bunny-hls-player-basic"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/hls.js@1.6.11"></script>
```
### HTML
```text
<div class="bunny-player" data-bunny-player-init="" data-player-muted="false" data-player-activated="false" data-player-autoplay="false" data-player-hover="idle" data-player-src="https://vz-6ed806ff-5e5.b-cdn.net/b6a663de-07c1-4c37-8bb6-0e79fef7fb3c/playlist.m3u8" data-player-status="idle" data-player-update-size="false" data-player-lazy="meta">
  <div data-player-before="" class="bunny-player__before"></div>
  <div class="bunny-player__dark"></div>
  <div data-player-control="playpause" class="bunny-player__playpause">
    <div class="bunny-player__big-btn">
    </div>
  </div>
  <div class="bunny-player__loading">
  </div>
</div>
```
### CSS
```text
.bunny-player {
  pointer-events: none;
  color: #fff;
  isolation: isolate;
  border-radius: 1em;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  transform: translateX(0);
}
.bunny-player__before {
  padding-top: 62.5%;
}
/* Animation */
[data-bunny-player-init] :is(.bunny-player__placeholder, .bunny-player__dark, .bunny-player__playpause, .bunny-player__loading) {
  transition: opacity 0.3s linear, visibility 0.3s linear;
}
/* Placeholder */
.bunny-player__placeholder {
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}
[data-bunny-player-init][data-player-status="playing"] .bunny-player__placeholder,
[data-bunny-player-init][data-player-status="paused"] .bunny-player__placeholder,
[data-bunny-player-init][data-player-activated="true"][data-player-status="ready"] .bunny-player__placeholder {
  opacity: 0;
  visibility: hidden;
}
/* Dark Overlay */
.bunny-player__dark {
  opacity: .1;
  background-color: #000;
  width: 100%;
  height: 100%;
  position: absolute;
}
[data-bunny-player-init][data-player-status="paused"] .bunny-player__dark,
[data-bunny-player-init][data-player-status="playing"][data-player-hover="active"] .bunny-player__dark{
  opacity: 0.3;
}
[data-bunny-player-init][data-player-status="playing"] .bunny-player__dark {
  opacity: 0;
}
.bunny-player__video {
  width: 100%;
  height: 100%;
  padding-bottom: 0;
  padding-right: 0;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
/* Play/Pause */
.bunny-player__playpause {
  pointer-events: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
}
[data-bunny-player-init][data-player-status="playing"] .bunny-player__playpause,
[data-bunny-player-init][data-player-status="loading"] .bunny-player__playpause {
  opacity: 0;
}
[data-bunny-player-init][data-player-status="playing"][data-player-hover="active"] .bunny-player__playpause {
  opacity: 1;
}
[data-bunny-player-init][data-player-status="playing"] .bunny-player__play-svg,
[data-bunny-player-init][data-player-status="loading"] .bunny-player__play-svg {
  display: none;
}
[data-bunny-player-init][data-player-status="playing"] .bunny-player__pause-svg,
[data-bunny-player-init][data-player-status="loading"] .bunny-player__pause-svg{
  display: block;
}
.bunny-player__toggle-playpause {
  cursor: pointer;
  width: 1.5em;
  height: 1.5em;
}
.bunny-player__big-btn {
  -webkit-backdrop-filter: blur(1em);
  backdrop-filter: blur(1em);
  cursor: pointer;
  background-color: #64646433;
  border: 1px solid #ffffff1a;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 6em;
  height: 6em;
  padding: 2em;
  display: flex;
  position: relative;
}
.bunny-player__loading-svg {
  width: 6em;
}
.bunny-player__pause-svg {
  display: none;
}
@media screen and (max-width: 767px) {
  .bunny-player__big-btn {
    width: 20vw;
    height: 20vw;
    padding: 6vw;
  }
}
/* Cover Mode */
[data-bunny-player-init][data-player-update-size="cover"] {
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
[data-bunny-player-init][data-player-update-size="cover"] [data-player-before] {
  display: none;
}
[data-bunny-player-init][data-player-update-size="cover"][data-player-fullscreen="false"] .bunny-player__video {
  object-fit: cover;
}
/* Loading */
.bunny-player__loading {
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
[data-bunny-player-init][data-player-status="loading"] .bunny-player__loading {
  opacity: 1;
  visibility: visible;
}
```
### Javascript
```javascript
function initBunnyPlayerBasic() {
  document.querySelectorAll('[data-bunny-player-init]').forEach(function(player) {
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
    var updateSize = player.getAttribute('data-player-update-size'); // "true" | "cover" | null
    var lazyMode   = player.getAttribute('data-player-lazy');        // "true" | "meta" | null
    var isLazyTrue = lazyMode === 'true';
    var isLazyMeta = lazyMode === 'meta';
    var autoplay   = player.getAttribute('data-player-autoplay') === 'true';
    // Used to suppress 'ready' flicker when user just pressed play in lazy modes
    var pendingPlay = false;
    // Autoplay forces muted + loop; IO will drive play/pause
    video.muted = !!autoplay;
    if (autoplay) video.loop = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.playsInline = true;
    if (typeof video.disableRemotePlayback !== 'undefined') video.disableRemotePlayback = true;
    if (autoplay) video.autoplay = false;
    var isSafariNative = !!video.canPlayType('application/vnd.apple.mpegurl');
    var canUseHlsJs    = !!(window.Hls && Hls.isSupported()) && !isSafariNative;
    // Minimal ratio fetch when requested (and not already handled by lazy meta)
    if (updateSize === 'true' && !isLazyMeta) {
      if (isLazyTrue) {
        // Do nothing: no fetch, no <video> touch when lazy=true
      } else {
        var prev = video.preload;
        video.preload = 'metadata';
        var onMeta2 = function() {
          setBeforeRatio(player, updateSize, video.videoWidth, video.videoHeight);
          video.removeEventListener('loadedmetadata', onMeta2);
          video.preload = prev || '';
        };
        video.addEventListener('loadedmetadata', onMeta2, { once: true });
        video.src = src;
      }
    }
    //  Lazy meta fetch (duration + aspect) without attaching playback
    function fetchMetaOnce() {
      getSourceMeta(src, canUseHlsJs).then(function(meta){
        if (meta.width && meta.height) setBeforeRatio(player, updateSize, meta.width, meta.height);
        readyIfIdle(player, pendingPlay);
      });
    }
    // Attach media only once (for actual playback)
    var isAttached = false;
    var userInteracted = false;
    var lastPauseBy = ''; // 'io' | 'manual' | ''
    function attachMediaOnce() {
      if (isAttached) return;
      isAttached = true;
      if (player._hls) { try { player._hls.destroy(); } catch(_) {} player._hls = null; }
      if (isSafariNative) {
        video.preload = (isLazyTrue || isLazyMeta) ? 'auto' : video.preload;
        video.src = src;
        video.addEventListener('loadedmetadata', function() {
          readyIfIdle(player, pendingPlay);
          if (updateSize === 'true') setBeforeRatio(player, updateSize, video.videoWidth, video.videoHeight);
        }, { once: true });
      } else if (canUseHlsJs) {
        var hls = new Hls({ maxBufferLength: 10 });
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function() { hls.loadSource(src); });
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          readyIfIdle(player, pendingPlay);
          if (updateSize === 'true') {
            var lvls = hls.levels || [];
            var best = bestLevel(lvls);
            if (best && best.width && best.height) setBeforeRatio(player, updateSize, best.width, best.height);
          }
        });
        player._hls = hls;
      } else {
        // Fallback if not HLS
        video.src = src;
      }
    }
    // Initialize based on lazy mode
    if (isLazyMeta) {
      if (updateSize === 'true') fetchMetaOnce();
      video.preload = 'none';
    } else if (isLazyTrue) {
      video.preload = 'none';
    } else {
      attachMediaOnce();
    }
    // Toggle play/pause
    function togglePlay() {
      userInteracted = true;
      if (video.paused || video.ended) {
        if ((isLazyTrue || isLazyMeta) && !isAttached) attachMediaOnce();
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
    // Ensure aspect ratio updates as soon as real dimensions exist (lazy=true path included)
    var ratioSet = false;
    function maybeSetRatioOnce() {
      if (ratioSet || updateSize !== 'true') return;
      var before = player.querySelector('[data-player-before]');
      if (!before) return;
      if (video.videoWidth && video.videoHeight) {
        before.style.paddingTop = (video.videoHeight / video.videoWidth * 100) + '%';
        ratioSet = true;
      }
    }
    video.addEventListener('loadedmetadata', function(){ maybeSetRatioOnce(); });
    video.addEventListener('loadeddata',    function(){ maybeSetRatioOnce(); });
    video.addEventListener('playing',       function(){ maybeSetRatioOnce(); });
    // Hover (basic: active on enter, idle on leave)
    function setHover(state) {
      if (player.getAttribute('data-player-hover') !== state) {
        player.setAttribute('data-player-hover', state);
      }
    }
    player.addEventListener('pointerenter', function(){ setHover('active'); });
    player.addEventListener('pointerleave', function(){ setHover('idle'); });
    // In-view auto play/pause (only when autoplay is true)
    if (autoplay) {
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          var inView = entry.isIntersecting && entry.intersectionRatio > 0;
          if (inView) {
            if ((isLazyTrue || isLazyMeta) && !isAttached) attachMediaOnce();
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
  // Helper: Ratio setter
  function setBeforeRatio(player, updateSize, w, h) {
    if (updateSize !== 'true' || !w || !h) return;
    var before = player.querySelector('[data-player-before]');
    if (!before) return;
    before.style.paddingTop = (h / w * 100) + '%';
  }
  function maybeSetRatioFromVideo(player, updateSize, video) {
    if (updateSize !== 'true') return;
    var before = player.querySelector('[data-player-before]');
    if (!before) return;
    var hasPad = before.style.paddingTop && before.style.paddingTop !== '0%';
    if (!hasPad && video.videoWidth && video.videoHeight) {
      setBeforeRatio(player, updateSize, video.videoWidth, video.videoHeight);
    }
  }
  // Helper: best HLS level by resolution
  function bestLevel(levels) {
    if (!levels || !levels.length) return null;
    return levels.reduce(function(a, b) { return ((b.width||0) > (a.width||0)) ? b : a; }, levels[0]);
  }
  // Helper: safe programmatic play
  function safePlay(video) {
    var p = video.play();
    if (p && typeof p.then === 'function') p.catch(function(){});
  }
  // Helper: simple URL resolver
  function resolveUrl(base, rel) { try { return new URL(rel, base).toString(); } catch(_) { return rel; } }
  // Helper: unified meta fetch (hls.js or native fetch)
  function getSourceMeta(src, useHlsJs) {
    return new Promise(function(resolve) {
      if (useHlsJs && window.Hls && Hls.isSupported()) {
        try {
          var tmp = new Hls();
          var out = { width: 0, height: 0, duration: NaN };
          tmp.on(Hls.Events.MANIFEST_PARSED, function(e, data) {
            var lvls = (data && data.levels) || tmp.levels || [];
            var best = bestLevel(lvls);
            if (best && best.width && best.height) { out.width = best.width; out.height = best.height; }
          });
          tmp.on(Hls.Events.LEVEL_LOADED, function(e, data) {
            if (data && data.details && isFinite(data.details.totalduration)) { out.duration = data.details.totalduration; }
          });
          tmp.on(Hls.Events.ERROR, function(){ try { tmp.destroy(); } catch(_) {} resolve(out); });
          tmp.on(Hls.Events.LEVEL_LOADED, function(){ try { tmp.destroy(); } catch(_) {} resolve(out); });
          tmp.loadSource(src);
          return;
        } catch(_) { resolve({ width:0, height:0, duration:NaN }); return; }
      }
      function parseMaster(masterText) {
        var lines = masterText.split(/\r?\n/);
        var bestW = 0, bestH = 0, firstMedia = null, lastInf = null;
        for (var i=0;i<lines.length;i++) {
          var line = lines[i];
          if (line.indexOf('#EXT-X-STREAM-INF:') === 0) {
            lastInf = line;
          } else if (lastInf && line && line[0] !== '#') {
            if (!firstMedia) firstMedia = line.trim();
            var m = /RESOLUTION=(\d+)x(\d+)/.exec(lastInf);
            if (m) {
              var w = parseInt(m[1],10), h = parseInt(m[2],10);
              if (w > bestW) { bestW = w; bestH = h; }
            }
            lastInf = null;
          }
        }
        return { bestW: bestW, bestH: bestH, media: firstMedia };
      }
      function sumDuration(mediaText) {
        var dur = 0, re = /#EXTINF:([\d.]+)/g, m;
        while ((m = re.exec(mediaText))) dur += parseFloat(m[1]);
        return dur;
      }
      fetch(src, { credentials: 'omit', cache: 'no-store' }).then(function(r){
        if (!r.ok) throw new Error('master');
        return r.text();
      }).then(function(master){
        var info = parseMaster(master);
        if (!info.media) { resolve({ width: info.bestW||0, height: info.bestH||0, duration: NaN }); return; }
        var mediaUrl = resolveUrl(src, info.media);
        return fetch(mediaUrl, { credentials: 'omit', cache: 'no-store' }).then(function(r){
          if (!r.ok) throw new Error('media');
          return r.text();
        }).then(function(mediaText){
          resolve({ width: info.bestW||0, height: info.bestH||0, duration: sumDuration(mediaText) });
        });
      }).catch(function(){ resolve({ width:0, height:0, duration:NaN }); });
    });
  }
}
// Initialize Bunny HTML HLS Player (Basic)
document.addEventListener('DOMContentLoaded', function() {
  initBunnyPlayerBasic();
});
```
### Javascript
```text
/* Animation */
[data-bunny-player-init] :is(.bunny-player__placeholder, .bunny-player__dark, .bunny-player__playpause, .bunny-player__loading) {
  transition: opacity 0.3s linear, visibility 0.3s linear;
}
/* Placeholder */
[data-bunny-player-init][data-player-status="playing"] .bunny-player__placeholder,
[data-bunny-player-init][data-player-status="paused"] .bunny-player__placeholder,
[data-bunny-player-init][data-player-activated="true"][data-player-status="ready"] .bunny-player__placeholder {
  opacity: 0;
  visibility: hidden;
}
/* Dark Overlay */
[data-bunny-player-init][data-player-status="paused"] .bunny-player__dark,
[data-bunny-player-init][data-player-status="playing"][data-player-hover="active"] .bunny-player__dark{
  opacity: 0.3;
}
[data-bunny-player-init][data-player-status="playing"] .bunny-player__dark {
  opacity: 0;
}
/* Play/Pause */
[data-bunny-player-init][data-player-status="playing"] .bunny-player__playpause,
[data-bunny-player-init][data-player-status="loading"] .bunny-player__playpause {
  opacity: 0;
}
[data-bunny-player-init][data-player-status="playing"][data-player-hover="active"] .bunny-player__playpause {
  opacity: 1;
}
[data-bunny-player-init][data-player-status="playing"] .bunny-player__play-svg,
[data-bunny-player-init][data-player-status="loading"] .bunny-player__play-svg {
  display: none;
}
[data-bunny-player-init][data-player-status="playing"] .bunny-player__pause-svg,
[data-bunny-player-init][data-player-status="loading"] .bunny-player__pause-svg{
  display: block;
}
/* Loading */
[data-bunny-player-init][data-player-status="loading"] .bunny-player__loading {
  opacity: 1;
  visibility: visible;
}
/* Cover Mode */
[data-bunny-player-init][data-player-update-size="cover"] {
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
[data-bunny-player-init][data-player-update-size="cover"] [data-player-before] {
  display: none;
}
[data-bunny-player-init][data-player-update-size="cover"][data-player-fullscreen="false"] .bunny-player__video {
  object-fit: cover;
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
- playing → Playback is running actively. Controls and overlays like placeholders should be hidden.
- paused → Playback has been stopped by the user or has reached the end. Controls for resuming can be emphasized, and depending on your design, the placeholder or play button can reappear.
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
- When set to `meta`, only duration and aspect ratio are preloaded, without attaching the full stream. Playback still waits for the user to press play.
- When set to `false`, the player loads the stream eagerly on initialization.
#### Aspect Ratio
The layout of the player can be stabilized before playback begins:
- The attribute `[data-player-update-size=“true”]` calculates the video’s aspect ratio and applies inline padding-top to \[data-player-before\] to preserve layout.
- The attribute `[data-player-update-size=“cover”]` disables this calculation, leaving it up to CSS to cover the container.
#### Hover
The `[data-player-hover=“active|idle”]` attribute reflects whether the user is currently interacting with the player. When the mouse or touch is active, it switches to active, and after a few seconds of inactivity, it returns to idle. This allows you to fade controls in and out automatically depending on interaction.
Autoplay
#### Autoplay
Enable autoplay by setting the attribute `[data-player-autoplay=“true”]`. Videos that autoplay are muted by default to comply with browser policies. When autoplay is enabled the player will loop the video.