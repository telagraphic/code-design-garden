---
title: "Dark Light Mode With Cookie"
description: "Dark Light Mode With Cookie."
slug: "dark-light-mode-with-cookie"
previewVideo: "dark-light-mode-with-cookie.mp4"
order: 49.931
published: true
categories: ["button", "cursor"]
triggers: ["mouse-move"]
libraries: ["css-only"]
keywords: ["dark", "light", "mode", "cookie"]
sourceUrl: "https://www.osmo.supply/resource/dark-light-mode-with-cookie"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
```
### HTML
```text
<button data-theme-toggle="" class="btn-darklight">
  <div class="btn-darklight__icon">
    <div class="btn-darklight__icon-box">
    </div>
    <div class="btn-darklight__icon-box is--absolute">
    </div>
  </div>
  <div class="btn-darklight__word">
    <p class="btn-darklight__word-p">Light</p>
    <p class="btn-darklight__word-p is--absolute">Dark</p>
  </div>
  <p class="btn-darklight__word-p">mode</p>
</button>
```
### CSS
```text
.btn-darklight {
  color: #131313;
  cursor: pointer;
  background-color: #efeeec;
  border: 0 solid transparent;
  border-radius: .25em;
  outline: 0 transparent;
  justify-content: center;
  align-items: center;
  padding: 0 1.125em 0 .75em;
  display: flex;
  position: relative;
  overflow: hidden;
}
.btn-darklight__icon {
  width: 1.25em;
  height: 100%;
  margin-right: .25em;
  position: relative;
}
.btn-darklight__word {
  padding-right: .25em;
  position: relative;
}
.btn-darklight__word-p {
  margin-top: .05em;
  margin-bottom: 0;
  line-height: 1.2;
  position: relative;
}
.btn-darklight__word-p.is--absolute {
  opacity: 0;
  letter-spacing: .025em;
  position: absolute;
  top: 0;
}
.btn-darklight__icon-box {
  height: 100%;
  padding-top: .66em;
  padding-bottom: .66em;
  display: flex;
  position: relative;
}
.btn-darklight__icon-box.is--absolute {
  position: absolute;
}
/* Background */
[data-theme-status] {
  transition: background-color 0.4s cubic-bezier(0.35, 1, 0.6, 1);
}
[data-theme-status="dark"] {
  background-color: #070915 !important;
}
/* Button Word */
[data-theme-status="dark"] .btn-darklight .btn-darklight__word .btn-darklight__word-p,
[data-theme-status="light"] .btn-darklight .btn-darklight__word .btn-darklight__word-p.is--absolute{
  opacity: 0;
}
[data-theme-status="light"] .btn-darklight .btn-darklight__word .btn-darklight__word-p,
[data-theme-status="dark"] .btn-darklight .btn-darklight__word .btn-darklight__word-p.is--absolute {
  opacity: 1;
}
/* Button Icon */
.btn-darklight .btn-darklight__icon-box{
  transition: transform 0.8s cubic-bezier(0.35, 1.5, 0.6, 1);
  transform: translateY(0%) rotate(-90deg);
}
[data-theme-status="dark"] .btn-darklight .btn-darklight__icon-box{
  transform: translateY(-100%) rotate(0.001deg);
}
```
### Javascript
```javascript
function initCookieDarkLight() {
  // Function to toggle theme
  function initThemeCheck() {
    // Get the element that has [data-dash-theme] attribute
    const dashThemeElement = document.querySelector('[data-theme-status]');
    if (!dashThemeElement) return;
    // Toggle between light/dark
    const currentTheme = dashThemeElement.getAttribute('data-theme-status');
    const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
    dashThemeElement.setAttribute('data-theme-status', newTheme);
    Cookies.set('theme', newTheme, { expires: 365 });
  }
  // Keydown to toggle theme when Shift + T is pressed
  document.addEventListener('keydown', function(e) {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea' || e.target.isContentEditable) {
      return; // Do nothing if typing into a field
    }
    if (e.shiftKey && e.keyCode === 84) { // Shift+T
      e.preventDefault();
      initThemeCheck();
    }
  });
  // For all elements with [data-theme-toggle], add click handler
  document.querySelectorAll('[data-theme-toggle]').forEach(function(button) {
    button.addEventListener('click', initThemeCheck);
  });
  // If theme cookie is 'dark', set theme to dark
  if (Cookies.get('theme') === 'dark') {
    const themeElement = document.querySelector('[data-theme-status]');
    if (themeElement) {
      themeElement.setAttribute('data-theme-status', 'dark');
    }
  }
}
// Initialize Cookie Dark/Light Theme
document.addEventListener('DOMContentLoaded', function() {
  initCookieDarkLight();
});
```
### Javascript
```text
/* Background */
[data-theme-status] {
  transition: background-color 0.4s cubic-bezier(0.35, 1, 0.6, 1);
}
[data-theme-status="dark"] {
  background-color: #070915 !important;
}
/* Button Word */
[data-theme-status="dark"] .btn-darklight .btn-darklight__word .btn-darklight__word-p,
[data-theme-status="light"] .btn-darklight .btn-darklight__word .btn-darklight__word-p.is--absolute{
  opacity: 0;
}
[data-theme-status="light"] .btn-darklight .btn-darklight__word .btn-darklight__word-p,
[data-theme-status="dark"] .btn-darklight .btn-darklight__word .btn-darklight__word-p.is--absolute {
  opacity: 1;
}
/* Button Icon */
.btn-darklight .btn-darklight__icon-box{
  transition: transform 0.8s cubic-bezier(0.35, 1.5, 0.6, 1);
  transform: translateY(0%) rotate(-90deg);
}
[data-theme-status="dark"] .btn-darklight .btn-darklight__icon-box{
  transform: translateY(-100%) rotate(0.001deg);
}
```
### Implementation
#### Attributes
- Add `[data-theme-status="light"]` to the `<body>`, used to style the elements on the page.
- Use `[data-theme-toggle]` to toggle between theme (light & dark).
#### Example Structure
For both Webflow and Code
### HTML
```text
<body data-theme-status="light">
  <button data-theme-toggle>Change theme</button>
</body>
```
#### Animating
### CSS
```text
[data-theme-status="dark"] {
  background-color: var(--color-dark);
  color: var(--color-light);
}
```
#### Cookie
We store the user’s theme preference in a cookie, ensuring the chosen theme remains consistent across page loads and future visits. In fact, you can store any type of preference this way—such as filter settings, grid or list views, font sizes, and more.
#### More information
Read more about the Cookie library: [JS-Cookie Documentation](https://github.com/js-cookie/js-cookie)
### Variant: Using localStorage
An alternative way to save a user's preference that does not require a 3rd party library like JS-Cookie, is using the [localStorage API.](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) This will also persist and save even if the website or window is closed. To utilise this, you of course don't need the CDN link, and then you need to replace 2 things in the JS.
In your theme toggle function:
### Javascript
```javascript
// Replace:
Cookies.set('theme', newTheme, { expires: 365 });
// With:
localStorage.setItem('theme', newTheme);
```
In your theme initialization, replace:
### Javascript
```javascript
// Replace: 
if (Cookies.get('theme') === 'dark') {
// With:
if (localStorage.getItem('theme') === 'dark') {
```