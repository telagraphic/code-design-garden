---
title: "Step 1: Add HTML"
description: "Step 1: Add HTML."
slug: "download-button"
previewVideo: "download-button.mp4"
order: 49.927
published: true
categories: ["button", "cursor", "layout"]
triggers: ["hover", "mouse-move"]
libraries: ["vanilla-js"]
keywords: ["step", "add", "html", "download", "button"]
sourceUrl: "https://www.osmo.supply/resource/download-button"
---
<button data-download-src="https://vz-6ed806ff-5e5.b-cdn.net/9e75ac7b-ca03-4b9e-a472-0898d863593d/playlist.m3u8" data-download-name="osmo-logo.jpg" class="download-btn">
  <span data-download-icon-wrap="" class="download-btn__icon-hold">
  </span>
  <span data-download-label="" class="download-btn__label">Download</span>
</button>
```text
# Step 2: Add CSS
```
.download-btn {
  grid-column-gap: .625em;
  grid-row-gap: .625em;
  color: #f2f2f2;
  background-color: #0065e1;
  border-radius: .5em;
  justify-content: center;
  align-items: center;
  padding: .75em 1.5em .75em 1em;
  display: flex;
.download-btn__label {
  font-size: 1.5em;
  font-weight: 500;
  line-height: 1.2;
.download-btn__icon-hold {
  background-color: #fff3;
  border-radius: 100em;
  flex: none;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  padding: 0;
  display: flex;
.download-btn__icon {
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;
  display: flex;
  overflow: visible !important;
.download-btn__icon.is--success {
  position: absolute;
/* Transition settings */
[data-download-src]{
  transition: 0.25s background-color ease;
[data-download-arrow], [data-download-base]{
  transition: 0.5s transform cubic-bezier(0.625, 0.05, 0, 1);
[data-download-icon-wrap]{
  clip-path: inset(0em round 100em);
  transition: 0.5s clip-path cubic-bezier(0.625, 0.05, 0, 1);
[data-download-success] path{
  transition: 0.4s stroke-dashoffset cubic-bezier(0.625, 0.05, 0, 1);
[data-download-base]{
  transform-origin: center center;
/* When status is 'downloading' */
[data-download-src][data-download-state="downloading"]{
  pointer-events: none;
body:has([data-download-src][data-download-state="downloading"]){
  cursor: waiting;
/* When status is 'ready' or 'fallback' */
[data-download-src][data-download-state="ready"] [data-download-icon-wrap]{
  transition-delay: 0.15s;
  clip-path: inset(0.35em round 100em);
[data-download-src][data-download-state="ready"] [data-download-arrow]{
  transform: translate(0px, 200%);
[data-download-src][data-download-state="ready"] [data-download-base]{
  transition-delay: 0.1s;
  transform: scale(0, 1);
[data-download-src][data-download-state="ready"] [data-download-success] path{
  transition-delay: 0.25s;
  stroke-dashoffset: 0;
/* Hover state */
@media (hover: hover) and (pointer: fine){
  [data-download-src]:hover{
    background-color: #0a75f8;
  [data-download-src][data-download-state="idle"]:hover [data-download-arrow]{
    transform: translate(0px, -30%);
  [data-download-src][data-download-state="idle"]:hover [data-download-base]{
    transform: scale(1.2, 1);
/* Focus state */
[data-download-src]:focus{
  background-color: #0a75f8;
[data-download-src][data-download-state="idle"]:focus [data-download-arrow]{
  transform: translate(0px, -30%);
[data-download-src][data-download-state="idle"]:focus [data-download-base]{
  transform: scale(1.2, 1);
```text
# Step 3: Add Javascript
```
function initDownloadButtons() {
  const selector = '[data-download-src]';
  const attrSrc = 'data-download-src';
  const attrName = 'data-download-name';
  const setState = (el, state) => {
    el.dataset.downloadState = state; // "idle" | "downloading" | "ready" | "fallback"
  const triggerDownload = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    if (filename) a.download = filename;
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  document.querySelectorAll(selector).forEach(el => {
    setState(el, 'idle');
    // Optional label inside the button
    const labelEl = el.querySelector('[data-download-label]');
    if (labelEl && !labelEl.dataset.downloadOriginalLabel) {
      labelEl.dataset.downloadOriginalLabel = labelEl.textContent;
    const showSuccessAndReset = () => {
      if (labelEl) {
        const successText = labelEl.getAttribute('data-download-success');
        if (successText) {
          labelEl.textContent = successText;
      // clear any previous timer on this button
      if (el._downloadResetTimeout) {
        clearTimeout(el._downloadResetTimeout);
      el._downloadResetTimeout = setTimeout(() => {
        setState(el, 'idle');
        if (labelEl) {
          const original = labelEl.dataset.downloadOriginalLabel;
          if (original != null) {
            labelEl.textContent = original;
      }, 3000);
    el.addEventListener('click', async (e) => {
      e.preventDefault();
      // prevent double-click spam while we’re fetching
      if (el.dataset.downloadState === 'downloading') return;
      const src = el.getAttribute(attrSrc);
      if (!src) return;
      const customName = el.getAttribute(attrName);
      // derive filename from URL if no explicit name
      const urlObj = new URL(src, window.location.href);
      const urlFilePart = urlObj.pathname.split('/').pop() || 'download';
      const fileName = customName || urlFilePart;
      // remove focus from the button we clicked
      el.blur();
      try {
        setState(el, 'downloading');
        const res = await fetch(src, { mode: 'cors', credentials: 'omit' });
        if (!res.ok) throw new Error('bad status');
        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        setState(el, 'ready');
        triggerDownload(objectUrl, fileName);
        showSuccessAndReset();
        // cleanup a bit later
        setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000);
      } catch (err) {
        // CORS / network / whatever → fallback to plain link
        setState(el, 'fallback');
        triggerDownload(src, fileName);
        showSuccessAndReset();
    });
  });
document.addEventListener("DOMContentLoaded", function () {
  initDownloadButtons();
```text
# Step 3: Add custom CSS
```
/* Transition settings */
[data-download-src]{
  transition: 0.25s background-color ease;
[data-download-arrow], [data-download-base]{
  transition: 0.5s transform cubic-bezier(0.625, 0.05, 0, 1);
[data-download-icon-wrap]{
  clip-path: inset(0em round 100em);
  transition: 0.5s clip-path cubic-bezier(0.625, 0.05, 0, 1);
[data-download-success] path{
  transition: 0.4s stroke-dashoffset cubic-bezier(0.625, 0.05, 0, 1);
[data-download-base]{
  transform-origin: center center;
/* When status is 'downloading' */
[data-download-src][data-download-state="downloading"]{
  pointer-events: none;
body:has([data-download-src][data-download-state="downloading"]){
  cursor: waiting;
/* When status is 'ready' or 'fallback' */
[data-download-src][data-download-state="ready"] [data-download-icon-wrap]{
  transition-delay: 0.15s;
  clip-path: inset(0.35em round 100em);
[data-download-src][data-download-state="ready"] [data-download-arrow]{
  transform: translate(0px, 200%);
[data-download-src][data-download-state="ready"] [data-download-base]{
  transition-delay: 0.1s;
  transform: scale(0, 1);
[data-download-src][data-download-state="ready"] [data-download-success] path{
  transition-delay: 0.25s;
  stroke-dashoffset: 0;
/* Hover state */
@media (hover: hover) and (pointer: fine){
  [data-download-src]:hover{
    background-color: #0a75f8;
  [data-download-src][data-download-state="idle"]:hover [data-download-arrow]{
    transform: translate(0px, -30%);
  [data-download-src][data-download-state="idle"]:hover [data-download-base]{
    transform: scale(1.2, 1);
/* Focus state */
[data-download-src]:focus{
  background-color: #0a75f8;
[data-download-src][data-download-state="idle"]:focus [data-download-arrow]{
  transform: translate(0px, -30%);
[data-download-src][data-download-state="idle"]:focus [data-download-base]{
  transform: scale(1.2, 1);
```text
### Implementation
#### Download Source
Use `[data-download-src]` to define the URL that will be fetched and downloaded, triggering the full download logic whenever the user clicks the button. The element with this attribute is also the one we listen for clicks on.
#### Download Name
Use `[data-download-name]` to *optionally* define a custom filename for the downloaded file, replacing the auto-detected filename extracted from the URL.
```
<button
  data-download-src="https://example.com/file.pdf"
  data-download-name="custom-name.pdf"
  class="download-btn">
</button>
```text
#### Download State
Use `[data-download-state]` to reflect and animate the button’s current stage, switching automatically between `"idle"`, `"downloading"`, `"ready"`, and `"fallback"` according to script progress.
#### Download Label
Use `[data-download-label]` to define a text element inside the button that dynamically changes between the default label and an success state.
#### Success Text
Use `[data-download-success]` on the label to optionally define a short confirmation message that temporarily replaces the default label after a successful download.
#### Hosting Files
We recommend hosting your downloadable assets on [Bunny CDN](https://bunny.net/?ref=sopkrejhiv), as files served from their network deliver fast response times with minimal cost. For Webflow users, you can also host your files directly in the Webflow Asset Manager, then copy the file URL and use it inside `[data-download-src]` for a fully native setup.
#### CORS Notes
When fetching files from external hosts, some servers block cross-origin requests, which causes the script’s fetch to fail. in this case the button automatically switches to `"fallback"` and downloads the file directly via the original **\[data-download-src\]** URL. If you run into this issue, make sure the file extension you are serving is included in your host’s CORS-allowed extension list.