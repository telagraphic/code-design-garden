---
title: "GSAP Code Architecture"
description: "Refactoring spaghetti code with patterns and components"
pubDate: 2026-07-03
published: true
---

 

In the [last post](/blog/2-gsap-resources), I listed resources for GSAP motion effects.
Once you start using these libraries in real sites and codebases, things can start to get complicated with lifecycle hooks, duplicating event listeners, managing tween and triggers, lifecycle management for page changes, and long messy code for those scroll based landing pages.

You can copy-paste the code and ask AI to make it work, but why not learn some medium level programming concepts like design patterns, component based design and how they fit in an evolving front end codebase? Updating your "mental-ware" on code structure is useful for thinking in more abstract design for building composable code.

## The Design of Code

This walkthrough uses a bunch of text animations that document the GSAP `SplitText` and `ScrollTrigger` API's via the classic landing page scroll based animation flow. It also incorporate GSAP effects from [made with gsap](https://madewithgsap.com/) and [osmo.supply](https://www.osmo.supply/) libraries.

> Caveat: I won't be showing how the animation code was written because some it includes library code that was paid for and it would be unfair to share it. These series of posts cover higher level architecture instead of the actual GSAP code itself.

<figure class="prose-video" data-prose-video data-hls="https://vz-8dc492cd-3d0.b-cdn.net/7be0ce82-d4c3-4649-85df-b9f74ef126da/playlist.m3u8">
  <video muted loop playsinline autoplay controls preload="metadata" aria-label="Scrolling page demo"></video>
  <figcaption>Scrolling page demo</figcaption>
</figure>


We can think of the 8 column grid based page as a flow of film frames. Each page section is a frame that can we can think of as it's own file. This fits naturally with how a designer will create designs in Figma/Paper.

<figure class="prose-video" data-prose-video data-hls="https://vz-8dc492cd-3d0.b-cdn.net/c596bbb6-2944-42a4-8d0a-a05d01720b8f/playlist.m3u8">
  <video muted loop playsinline autoplay controls preload="metadata" aria-label="Scrolling page demo"></video>
  <figcaption>Grid lines</figcaption>
</figure>


Starting to write the code out with no patterns or design was half intentional and half expedient. I wanted to go through the thinking process of seeing where patterns emerge, how to build an API and keep a list of questions for a grilling session with AI on each of my ideas.

Each `page-section__content` contains the text markup that will be animated. We use the `data-section` field to target each frame.

```html
  <body class="page">
    <header class="page-header">
      // Opening frame section
    </header>

    <main class="page-main">
      <section class="page-section" data-section="1">
        <div class="page-section__content">
          <h1 class="page-section__title">Split Text</h1>
          <!-- Section one content goes here -->
        </div>
      </section>

      <section class="page-section" data-section="2">
        <div class="page-section__content">
          <!-- Section two content goes here -->
        </div>
      </section>

      <section class="page-section" data-section="3">
        <div class="page-section__content">
          <!-- Section three content goes here -->
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <p class="page-footer__tag type-caption">Thank you for scrolling</p>
      <div class="page-footer__title">
        <h1>SCROLL END</h1>
      </div>
      <p class="page-footer__hint type-caption">
        Thank you for scrolling
      </p>
    </footer>
    <script type="module" src="./js/script.js"></script>
  </body>

```


## The Code

**link to the code on github**


Each section has:

- Selectors and DOM references
- gsap `Timeline`, `Tween`, `SplitText` code driven by `ScrollTrigger` settings and animation properties/values
- Some sections has library code for a cool GSAP effect


Long code like this can suffer from:

- Inconsistent naming conventions
- Each section has it's own structure
- No clear description of what the animation does in detail
- Tedious search/find and update process for fine-tuning animations between IDE and browser

We can ask AI to clean up the code, but if we don't know what it could look like, we might get something better but not great. Good enough more than likely. Instead of just prompting away the problems and generating more slop and a weak codebase, we can start with some mental models and best practices to improve the code and our development process.


## Next Steps

We can improve this spaghetti and avoid AI slop by:

1. Implementing **design patterns**
2. Implementing GSAP components

In the [next post](/blog/4-gsap-architecture-part-1), we'll get right to the core of the problem by implementing design patterns.
