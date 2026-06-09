---
title: "Looping Words with Selector"
description: "Looping Words with Selector."
slug: "looping-words-slector"
previewVideo: "looping-words-slector.mp4"
order: 49.904
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["looping", "words", "selector", "slector"]
sourceUrl: "https://www.osmo.supply/resource/looping-words-with-selector"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
```
### HTML
```text
<div class="looping-words">
  <div class="looping-words__containers">
    <ul data-looping-words-list="" class="looping-words__list">
      <li class="looping-words__list">
        <p class="looping-words__p">GSAP</p>
      </li>
      <li class="looping-words__list">
        <p class="looping-words__p">Looping</p>
      </li>
      <li class="looping-words__list">
        <p class="looping-words__p">Words</p>
      </li>
      <li class="looping-words__list">
        <p class="looping-words__p">Selector</p>
      </li>
      <li class="looping-words__list">
        <p class="looping-words__p">Made with</p>
      </li>
    </ul>
  </div>
  <div class="looping-words__fade"></div>
  <div data-looping-words-selector="" class="looping-words__selector">
    <div class="looping-words__edge"></div>
    <div class="looping-words__edge is--2"></div>
    <div class="looping-words__edge is--3"></div>
    <div class="looping-words__edge is--4"></div>
  </div>
</div>
```
### CSS
```text
.looping-words {
  height: 2.7em;
  padding-left: .1em;
  padding-right: .1em;
  font-family: PP Neue Corp Tight, Arial, sans-serif;
  font-size: 10em;
  font-weight: 700;
  line-height: .9;
  position: relative;
}
.looping-words__list {
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  flex-flow: column;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  display: flex;
  position: relative;
}
.looping-words__fade {
  pointer-events: none;
  background-image: linear-gradient(rgb(230, 226, 247) 5%, rgba(230, 226, 247, 0) 40%, rgba(230, 226, 247, 0) 60%, rgb(230, 226, 247) 95%);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.looping-words__edge {
  border-top: .035em solid #2600ff;
  border-left: .035em solid #2600ff;
  width: .125em;
  height: .125em;
  position: absolute;
  top: 0;
  left: 0;
}
.looping-words__edge.is--2 {
  left: auto;
  right: 0;
  transform: rotate(90deg);
}
.looping-words__edge.is--3 {
  inset: auto 0 0 auto;
  transform: rotate(180deg);
}
.looping-words__edge.is--4 {
  top: auto;
  bottom: 0;
  transform: rotate(270deg);
}
.looping-words__selector {
  pointer-events: none;
  width: 100%;
  height: .9em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.looping-words__containers {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.looping-words__p {
  margin-bottom: 0;
}
```
### Javascript
```javascript
function initLoopingWordsWithSelector() {  
  const wordList = document.querySelector('[data-looping-words-list]');
  const words = Array.from(wordList.children);
  const totalWords = words.length;
  const wordHeight = 100 / totalWords; // Offset as a percentage
  const edgeElement = document.querySelector('[data-looping-words-selector]');
  let currentIndex = 0;
  function updateEdgeWidth() {
    const centerIndex = (currentIndex + 1) % totalWords;
    const centerWord = words[centerIndex];
    const centerWordWidth = centerWord.getBoundingClientRect().width;
    const listWidth = wordList.getBoundingClientRect().width;
    const percentageWidth = (centerWordWidth / listWidth) * 100;
    gsap.to(edgeElement, {
      width: \`${percentageWidth}%\`,
      duration: 0.5,
      ease: 'Expo.easeOut',
    });
  }
  function moveWords() {
    currentIndex++;
    gsap.to(wordList, {
      yPercent: -wordHeight * currentIndex,
      duration: 1.2,
      ease: 'elastic.out(1, 0.85)',
      onStart: updateEdgeWidth,
      onComplete: function() {
        if (currentIndex >= totalWords - 3) {
          wordList.appendChild(wordList.children[0]);
          currentIndex--;
          gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
          words.push(words.shift());
        }
      }
    });
  }
  updateEdgeWidth();
  gsap.timeline({ repeat: -1, delay: 1 })
    .call(moveWords)
    .to({}, { duration: 2 })
    .repeat(-1);
}
// Initialize Looping Words with Selector
document.addEventListener('DOMContentLoaded', () => {
  initLoopingWordsWithSelector();
});
```
### Customization Options
#### Easing
For this example we use the Elastic effect of GSAP, but it's also possible to customize this with the Bounce or Expo easing.
#### Duration
In the Javascript adjust GSAP of `wordList duration: = 1.2;` to make the animation faster.
It's also possible to change the duration of the selector `edgeElement duration = 0.5`