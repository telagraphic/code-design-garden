---
title: "Tilting Bouncing Button"
description: "Tilting Bouncing Button."
slug: "tilting-bouncing-button"
previewVideo: "tilting-bouncing-button.mp4"
order: 49.835
published: true
categories: ["button"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["tilting", "bouncing", "button"]
sourceUrl: "https://www.osmo.supply/resource/tilting-bouncing-button"
---
## Setup
### HTML
```text
<div class="btn-group">
  <div class="btn-group__col">
    <a href="#" class="btn-bounce">
      <div class="btn-bounce-bg"></div>
      <div class="btn-bounce-text__wrap">
        <span class="btn-bounce-text">Bouncy Button</span>
      </div>
    </a>
  </div>
  <div class="btn-group__col">
    <a href="#" class="btn-bounce is--secondary">
      <div class="btn-bounce-bg is--secondary"></div>
      <div class="btn-bounce-text__wrap">
        <span class="btn-bounce-text">Bouncy Button</span>
      </div>
    </a>
  </div>
</div>
```
### CSS
```text
:root{
  --ease-elastic: linear(0, 0.55 7.5%, 0.85 12%, 0.95 14%, 1.03 16.5%, 1.09 20%, 1.13 22%, 1.14 23%, 1.15 24.5%, 1.15 26%, 1.13 28%, 1.11 31%, 1.05 39%, 1.02 43%, 0.99 47%, 0.98 52%, 0.97 59%, 1.002 81%, 1);
}
.btn-group {
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  justify-content: center;
  align-items: flex-start;
  display: flex;
}
.btn-bounce {
  color: #113d28;
  padding-left: 2em;
  padding-right: 2em;
  font-size: 1em;
  text-decoration: none;
  position: relative;
}
.btn-bounce.is--secondary {
  color: #fff;
}
.btn-bounce-bg {
  z-index: 0;
  background-color: #55db9c;
  border-radius: 100em;
  position: absolute;
  inset: 0%;
}
.btn-bounce-bg.is--secondary {
  background-color: #55db9c26;
  border: 1px solid #55db9c40;
}
.btn-bounce-text {
  z-index: 1;
  display: block;
  position: relative;
}
.btn-bounce-text__wrap {
  padding-top: 1.25em;
  padding-bottom: 1.25em;
  overflow: hidden;
}
/* Only apply hover animations if they are actually not supported */
@media (hover:hover) and (pointer:fine){
  .btn-bounce,
  .btn-bounce-text,
  .btn-bounce-text__wrap{
    transition: transform 0.65s var(--ease-elastic);
  }
  /* Fake a duplicate text element using text shadow without blur  */
  /* We save the distance in a variable for easy use in the CSS animation */
  .btn-bounce-text{
    --text-duplicate-distance: 3em;
    text-shadow: 0px var(--text-duplicate-distance) currentColor;
  }
  /* Scale down the button and rotate it slightly */
  .btn-bounce:hover { transform: scale(0.92) rotate(-3deg); }
  /* Rotate the text wrapper in the opposite direction so it appears straight */
  .btn-bounce:hover .btn-bounce-text__wrap{ transform: rotate(3deg); }
  /* Move up the text span to reveal its text-shadow */
  .btn-bounce:hover .btn-bounce-text{ transform: translate(0px, calc(-1 * var(--text-duplicate-distance))); }
}
```
### CSS
```text
:root{
  --ease-elastic: linear(
    0,
    0.55 7.5%,
    0.85 12%,
    0.95 14%,
    1.03 16.5%,
    1.09 20%,
    1.13 22%,
    1.14 23%,
    1.15 24.5%,
    1.15 26%,
    1.13 28%,
    1.11 31%,
    1.05 39%,
    1.02 43%,
    0.99 47%,
    0.98 52%,
    0.97 59%,
    1.002 81%,
    1
  );
}
/* Only apply hover animations if they are actually not supported */
@media (hover:hover) and (pointer:fine){
  .btn-bounce,
  .btn-bounce-text,
  .btn-bounce-text__wrap{
    transition: transform 0.65s var(--ease-elastic);
  }
  /* Fake a duplicate text element using text shadow without blur  */
  /* We save the distance in a variable for easy use in the CSS animation */
  .btn-bounce-text{
    --text-duplicate-distance: 3em;
    text-shadow: 0px var(--text-duplicate-distance) currentColor;
  }
  /* Scale down the button and rotate it slightly */
  .btn-bounce:hover { transform: scale(0.92) rotate(-3deg); }
  /* Rotate the text wrapper in the opposite direction so it appears straight */
  .btn-bounce:hover .btn-bounce-text__wrap{ transform: rotate(3deg); }
  /* Move up the text span to reveal its text-shadow */
  .btn-bounce:hover .btn-bounce-text{ transform: translate(0px, calc(-1 * var(--text-duplicate-distance))); }
}
```
### Documentation
To create a CSS easing curve with a bounce effect, you can plot a bunch of points in a 'linear' curve. If you check our curve, you'll find that we move from `0` to `1` but during that path, we also move 'past' a value of `1`, creating the signature bounciness of your element, basically animating further than it has to, before animating to the final value defined in your CSS (when the curve is at `1` again).
The reason there's so many 'coordinates' in the ease, is to mimic a smooth curve. After all, a Linear Ease will draw a straight line from point to point. So if you have many coordinates, and make small incremental adjustments, it almost looks like a smooth curve. Feel free to experiment with all the values!