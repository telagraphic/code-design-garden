---
title: "Audio Player (with Howler.js)"
description: "Audio Player (with Howler.js)."
slug: "audio-player"
previewVideo: "audio-player.mp4"
order: 49.997
published: true
categories: ["button", "loader", "media"]
triggers: ["hover", "mouse-move"]
libraries: ["css-only"]
keywords: ["audio", "player", "howler"]
sourceUrl: "https://www.osmo.supply/resource/audio-player-howler"
---
<script src="https://cdn.jsdelivr.net/npm/howler@2.2.4/dist/howler.min.js"></script>
```text
HTML
```
<div data-howler="" data-howler-src="https://osmo.b-cdn.net/resource-media/taka.mp3" data-howler-status="not-playing" class="howler-player">
  <div class="howler-player__top">
    <div class="howler-player__cover">
    </div>
    <div class="howler-player__title">
      <h2 class="howler-player__title-h2">Osmo Weekly #003</h2>
      <p class="howler-player__title-p">The Osmo Podcast</p>
    </div>
    <button data-howler-control="toggle-play" aria-label="Play Audio" aria-pressed="false" role="button" class="howler-player__btn">
      <div class="howler-player__btn-play">
        <span class="howler-player__btn-span">Play</span>
      </div>
      <div class="howler-player__btn-pause">
        <span class="howler-player__btn-span">Pause</span>
      </div>
    </button>
  </div>
  <div class="howler-player__bottom">
    <span data-howler-info="progress" aria-live="polite" class="howler-player__time">0:00</span>
    <div data-hover="" data-howler-control="timeline" role="progressbar" aria-label="Audio Progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" class="howler-player__timeline">
      <div class="howler-player__timeline-back"></div>
      <div data-howler-control="progress" class="howler-player__timeline-progress"></div>
    </div>
    <span data-howler-info="duration" aria-hidden="true" class="howler-player__time">0:00</span>
  </div>
</div>
```text
CSS
```
.howler-player {
  grid-column-gap: 1.5em;
  grid-row-gap: 1.5em;
  background-color: #efeeec;
  border-radius: 1.5em;
  flex-flow: column;
  flex-grow: 1;
  max-width: 28em;
  padding: 1.75em;
  display: flex;
  position: relative;
.howler-player__top {
  grid-column-gap: 1.25em;
  grid-row-gap: 1.25em;
  align-items: center;
  display: flex;
.howler-player__bottom {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  align-items: center;
  display: flex;
.howler-player__btn {
  outline-offset: 0px;
  pointer-events: auto;
  font: inherit;
  color: inherit;
  border: 0 solid #0000;
  border-radius: 50%;
  outline: 0 #0000;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 2.75em;
  height: 2.75em;
  display: flex;
  position: relative;
.howler-player__btn-play {
  color: #efeeec;
  background-color: #f04b23;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20% 25%;
  position: absolute;
.howler-player__btn-pause {
  color: #efeeec;
  background-color: #131313;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 25%;
  padding-right: 25%;
  display: flex;
  position: absolute;
[data-howler-status="not-playing"] .howler-player__btn-play,
[data-howler-status="playing"] .howler-player__btn-pause{
  display: flex;
[data-howler-status="playing"] .howler-player__btn-play,
[data-howler-status="not-playing"] .howler-player__btn-pause{
  display: none;
.howler-player__btn-span {
  opacity: 0;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  position: absolute;
.howler-player__time {
  opacity: .75;
  text-align: center;
  width: 3em;
  display: block;
.howler-player__timeline {
  cursor: pointer;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
  height: 1em;
  display: flex;
  position: relative;
.howler-player__timeline-progress {
  background-color: #f04b23;
  border-radius: 1em;
  width: 0%;
  height: .25em;
  transition: width .1s linear;
  position: relative;
.howler-player__timeline-back {
  background-color: #d0cfcd;
  border-radius: 1em;
  width: 100%;
  height: .25em;
  position: absolute;
.howler-player__cover {
  border-radius: .5em;
  flex-shrink: 0;
  width: 3.25em;
  height: 3.25em;
  position: relative;
  overflow: hidden;
.howler-player__cover-img {
  width: 100%;
  height: 100%;
.howler-player__title {
  grid-column-gap: .125em;
  grid-row-gap: .125em;
  flex-flow: column;
  flex-grow: 1;
  justify-content: center;
  display: flex;
.howler-player__title-h2 {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.375em;
  font-weight: 500;
  line-height: 1.2;
.howler-player__title-p {
  opacity: .5;
  margin-bottom: 0;
  line-height: 1.2;
```text
Javascript
```
function initHowlerJSAudioPlayer() {
  const howlerElements = document.querySelectorAll('[data-howler]');
  const soundInstances = {};
  howlerElements.forEach((element, index) => {
    const uniqueId = \`howler-${index}\`;
    element.id = uniqueId;
    element.setAttribute('data-howler-status', 'not-playing');
    const audioSrc = element.getAttribute('data-howler-src');
    const durationElement = element.querySelector('[data-howler-info="duration"]');
    const progressTextElement = element.querySelector('[data-howler-info="progress"]');
    const timelineContainer = element.querySelector('[data-howler-control="timeline"]');
    const timelineBar = element.querySelector('[data-howler-control="progress"]');
    const toggleButton = element.querySelector('[data-howler-control="toggle-play"]');
    const sound = new Howl({
      src: [audioSrc],
      html5: true,
      onload: () => {
        if (durationElement) durationElement.textContent = formatTime(sound.duration());
        const audioNode = sound._sounds?.[0]?._node;
        if (audioNode) {
          audioNode.addEventListener('pause', () => {
            if (sound.playing()) {
              sound.pause();
          });
          audioNode.addEventListener('play', () => {
            if (!sound.playing()) {
              sound.play();
          });
      onplay: () => {
        pauseAllExcept(uniqueId);
        element.setAttribute('data-howler-status', 'playing');
        requestAnimationFrame(updateProgress);
      onpause: () => element.setAttribute('data-howler-status', 'not-playing'),
      onstop: () => element.setAttribute('data-howler-status', 'not-playing'),
      onend: resetUI,
    });
    soundInstances[uniqueId] = sound;
    function updateProgress() {
      if (!sound.playing()) return;
      updateUI();
      requestAnimationFrame(updateProgress);
    function updateUI() {
      const currentTime = sound.seek() || 0;
      const duration = sound.duration() || 1;
      if (progressTextElement) progressTextElement.textContent = formatTime(currentTime);
      if (timelineBar) timelineBar.style.width = \`${(currentTime / duration) * 100}%\`;
      timelineContainer?.setAttribute('aria-valuenow', Math.round((currentTime / duration) * 100));
    function resetUI() {
      if (timelineBar) timelineBar.style.width = '100%';
      element.setAttribute('data-howler-status', 'not-playing');
    function seekToPosition(event) {
      const rect = timelineContainer.getBoundingClientRect();
      const percentage = (event.clientX - rect.left) / rect.width;
      sound.seek(sound.duration() * percentage);
      if (!sound.playing()) {
        pauseAllExcept(uniqueId);
        sound.play();
        element.setAttribute('data-howler-status', 'playing');
      updateUI();
    function togglePlay() {
      const isPlaying = sound.playing();
      sound.playing() ? sound.pause() : (pauseAllExcept(uniqueId), sound.play());
      toggleButton?.setAttribute('aria-pressed', !isPlaying);
    function pauseAllExcept(id) {
      Object.keys(soundInstances).forEach(otherId => {
        if (otherId !== id && soundInstances[otherId].playing()) {
          soundInstances[otherId].pause();
          document.getElementById(otherId)?.setAttribute('data-howler-status', 'not-playing');
      });
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return \`${minutes}:${secs.toString().padStart(2, '0')}\`;
    toggleButton?.addEventListener('click', togglePlay);
    timelineContainer?.addEventListener('click', seekToPosition);
    sound.on('seek', updateUI);
    sound.on('play', updateUI);
  });
  return soundInstances;
// Initialize Audio Player (HowlerJS)
document.addEventListener('DOMContentLoaded', function() {
  initHowlerJSAudioPlayer();
});
```text
CSS
```
[data-howler-status="not-playing"] .howler-player__btn-play,
[data-howler-status="playing"] .howler-player__btn-pause{
  display: flex;
[data-howler-status="playing"] .howler-player__btn-play,
[data-howler-status="not-playing"] .howler-player__btn-pause{
  display: none;
```text
### Implementation
#### Audio Source
To load an audio file, add the file path to the attribute `[data-howler-src="audio/file.mp3"]`.
#### Play/Pause
Elements with the attributes `[data-howler-control="toggle-play"] ` allow the user to play or pause the audio. This action updates the `[data-howler-status="not-playing"]` attribute from "not-playing" to "playing", allowing UI elements to reflect playback status. We use this information to show/hide the play and pause icon.
#### Timeline
The \[data-howler-control="timeline"\] element will target the \[data-howler-control="progress"\] element inside to show the progression of the audio. Clicking anywhere on the timeline bar seeks the audio to that position.
#### Information
There are two types of information available to be displayed, the duration and the progress.
- The attribute `[data-howler-info="duration"]` displays the total duration of the audio file.
- The attribute `[data-howler-info="progress"]` dynamically updates to show the elapsed time.
#### Multiple Audio Players
We prepared the script to have multiple audio players at the same page. The script will create an unique ID for all \[data-howler\] elements. When one of the other players is played the one that is playing will pause.
#### More information
Read more about the Audio Library: [Howler.js Documentation](https://howlerjs.com/)