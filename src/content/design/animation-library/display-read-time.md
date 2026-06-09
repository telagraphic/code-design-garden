---
title: "Display Read Time"
description: "Display Read Time."
slug: "display-read-time"
previewVideo: "display-read-time.mp4"
order: 49.928
published: true
categories: ["filter", "text", "media"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["display", "read", "time"]
sourceUrl: "https://www.osmo.supply/resource/display-read-time"
---
## Setup
### HTML
```text
<p>Time to read: <span data-read-time-target>X</span> min</p>
<article data-read-time-article>Rich text content here...</article>
```
### Javascript
```javascript
function initDisplayReadTime() {
  const wordsPerMinute = 200;
  const articles = document.querySelectorAll('[data-read-time-article]');
  articles.forEach((article, index) => {
    const matchValue = article.getAttribute('data-read-time-article');
    const text = article.textContent.trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    let targets;
    if (matchValue) {
      targets = document.querySelectorAll(\`[data-read-time-target="${matchValue}"]\`);
    } else {
      const emptyTargets = document.querySelectorAll('[data-read-time-target=""], [data-read-time-target]:not([data-read-time-target*="-"])');
      targets = emptyTargets[index] ? [emptyTargets[index]] : [];
    }
    targets.forEach((target) => {
      target.textContent = \`${minutes}\`;
    });
  });
}
// Inititalize Display Read Time
document.addEventListener("DOMContentLoaded", () => {
  initDisplayReadTime();
});
```
### CSS
### Implementation
#### Article
Use `[data-read-time-article]` on the article element that should be scanned for the total word count.
### HTML
```text
<article data-read-time-article>Rich text content here...</article>
```
#### Target
Use `[data-read-time-target]` on the element where the calculated read time should be displayed.
### HTML
```text
<p>Time to read: <span data-read-time-target>X</span> min</p>
```
#### Reading Speed
Adjust `const wordsPerMinute = 200;` inside the script to control how quickly the estimated reading time is calculated, using a lower value for slower reading content and a higher value for faster reading content.
#### Multiple Elements on the same page
Use `[data-read-time-article="article-name"]` when multiple articles exist on the same page and each one needs to connect to a specific target. Use `[data-read-time-target="article-name"]` to display the read time from the article with the same matching value.