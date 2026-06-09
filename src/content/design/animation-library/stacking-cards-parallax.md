---
title: "Stacking Cards Parallax"
description: "Stacking Cards Parallax."
slug: "stacking-cards-parallax"
previewVideo: "stacking-cards-parallax.mp4"
order: 49.844
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["stacking", "cards", "parallax"]
sourceUrl: "https://www.osmo.supply/resource/stacking-cards-parallax"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<div class="stacking-cards__collection">
  <div class="stacking-cards__list">
    <div data-stacking-cards-item="" class="stacking-cards__item is--green">
      <h1 class="stacking-cards__item-h"><span class="stacking-card__heading-faded">emerald</span><br>new beginnings</h1>
      <div class="stacking-cards__item-top">
        <span class="stacking-card__top-span">Gemstones</span>
        <span class="stacking-card__top-span">01 / 05</span>
      </div>
    </div>
    <div data-stacking-cards-item="" class="stacking-cards__item is--purple">
      <h1 class="stacking-cards__item-h"><span class="stacking-card__heading-faded">amethyst</span><br>supports good health</h1>
      <div class="stacking-cards__item-top">
        <span class="stacking-card__top-span">Gemstones</span>
        <span class="stacking-card__top-span">02 / 05</span>
      </div>
    </div>
    <div data-stacking-cards-item="" class="stacking-cards__item is--blue">
      <h1 class="stacking-cards__item-h"><span class="stacking-card__heading-faded">sapphire</span><br>wisdom &amp; learning</h1>
      <div class="stacking-cards__item-top">
        <span class="stacking-card__top-span">Gemstones</span>
        <span class="stacking-card__top-span">03 / 05</span>
      </div>
    </div>
    <div data-stacking-cards-item="" class="stacking-cards__item is--brown">
      <h1 class="stacking-cards__item-h"><span class="stacking-card__heading-faded">topaz</span><br>re-motivating</h1>
      <div class="stacking-cards__item-top">
        <span class="stacking-card__top-span">Gemstones</span>
        <span class="stacking-card__top-span">04 / 05</span>
      </div>
    </div>
    <div data-stacking-cards-item="" class="stacking-cards__item is--red">
      <h1 class="stacking-cards__item-h"><span class="stacking-card__heading-faded">rose quartz</span><br>peace and love</h1>
      <div class="stacking-cards__item-top">
        <span class="stacking-card__top-span">Gemstones</span>
        <span class="stacking-card__top-span">05 / 05</span>
      </div>
    </div>
  </div>
</div>
```
### CSS
```text
.stacking-cards__collection {
  width: 100%;
}
.stacking-cards__list {
  flex-flow: column;
  display: flex;
}
.stacking-cards__item {
  color: #fff;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  margin-top: -1em;
  padding-top: 5em;
  padding-bottom: 5em;
  display: flex;
  position: relative;
}
.stacking-cards__item.is--green {
  background-color: #1a261e;
}
.stacking-cards__item.is--purple {
  background-color: #544a58;
}
.stacking-cards__item.is--blue {
  background-color: #1a232e;
}
.stacking-cards__item.is--brown {
  background-color: #62594c;
}
.stacking-cards__item.is--red {
  background-color: #1f1715;
}
.stacking-cards__item-h {
  text-align: center;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0;
  font-family: PP Neue Corp Tight, Arial, sans-serif;
  font-size: 10vw;
  font-weight: 700;
  line-height: .8;
}
.stacking-card__heading-faded {
  opacity: .5;
}
.stacking-cards__item-img {
  aspect-ratio: 1;
  border-radius: .75em;
  width: 30vw;
  margin-top: -1vw;
}
.stacking-cards__item-top {
  justify-content: space-between;
  align-items: center;
  display: flex;
  position: absolute;
  top: 2.5em;
  left: 2.5em;
  right: 2.5em;
}
.stacking-card__top-span {
  font-size: 1em;
  font-weight: 500;
}
```
### Javascript
```javascript
gsap.registerPlugin(ScrollTrigger);
function initStackingCardsParallax(){
  const cards = document.querySelectorAll("[data-stacking-cards-item]");
  if (cards.length < 2) return;
  cards.forEach((card, i) => {
    // Skip over the first section
    if (i === 0) return;
    // When current section is in view, target the PREVIOUS one
    const previousCard = cards[i - 1]
    if (!previousCard) return;
    // Find any element inside the previous card
    const previousCardImage = previousCard.querySelector("[data-stacking-cards-img]")
    let tl = gsap.timeline({
      defaults:{
        ease:"none",
        duration: 1
      },
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "top top",
        scrub: true,
        invalidateOnRefresh: true
      }
    })
    tl.fromTo(previousCard,{ yPercent: 0 },{ yPercent: 50})
      .fromTo(previousCardImage,{ rotate: 0, yPercent:0 },{ rotate: -5, yPercent: -25 }, "<")
  });
}
// Initialize Stacking Cards Parallax
document.addEventListener("DOMContentLoaded", () =>{
  initStackingCardsParallax();
});
```
### Implementation
#### Cards
The only element(s) required to make this setup work, are the cards you want to 'stack'. Give each card the `[data-stacking-cards-item]` attribute.
#### Parallax distance
If you want to change how dramatic the parallax effect is, you can change the `yPercent` value in the timeline:
### Javascript
```javascript
// We currently move the card down by 50% of its own height
tl.fromTo(previousCard,{ yPercent: 0 },{ yPercent: 50});
```
#### Animate content in the cards
You can of course only have the cards 'stack' with the parallax effect. But, you can also animate any element inside the card. In our example, we tagged the image inside with `[data-stacking-cards-img]` so that we can add a tween to the timeline, and animate it.
If you want to add more (or different) items, simply give them an attribute of `[data-stacking-cards-X]`. With X being variable, give this a logical name. So if it's a heading you want to animate, it would become `[data-stacking-cards-heading]`. Then, make sure to create a variable for it in the function underneath our current image:
### Javascript
```javascript
// Find any element inside the previous card
const previousCardImage = previousCard.querySelector("[data-stacking-cards-img]");
const previousCardHeading = previousCard.querySelector("[data-stacking-cards-heading]");
```
Then, add any tween to the timeline to animate it:
### Javascript
```javascript
tl.fromTo(previousCard,{ yPercent: 0 },{ yPercent: 50})
  .fromTo(previousCardImage,{ rotate: 0, yPercent:0 },{ rotate: -5, yPercent: -25 }, "<")
  .fromTo(previousCardHeading,{ autoAlpha: 1 },{ autoAlpha: 0 }, "<");
  // Add more tweens as you wish
```
#### Some quick ideas
It was too much to show in a single demo, but some ideas that you can play with:
- Fade out the previous card while it's having the parallax content
- Fade out only an inner container, so the card remains, but the content fades out
- While the parallax on the card is happening, try scaling it down as well.