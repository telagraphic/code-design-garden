---
title: "GSAP Code Architecture"
description: "Refactoring spaghetti code with patterns and components"
pubDate: 2026-07-03
published: true
---

 

In the [last post](/blog/2-gsap-resources), I listed resources for GSAP motion effects.
Once you start using these libraries in real sites and codebases, things can start to get complicated with lifecycle hooks, duplicating event listeners, managing tween and triggers, lifecycle management for page changes, and long messy code for those scroll based landing pages.

You can copy-paste the code and ask AI to make it work, but why not learn some medium level programming concepts like design patterns, component based design and how they fit in an evolving front end codebase?


Updating your "mental-ware" on code structure is useful for thinking in more abstract component based design for building composable code. There's been lots of chatter about architecture and high level design as an important skill in the AI age.

# The Design of Code

This walkthrough uses a bunch of text animations that document the GSAP SplitText and ScrollTrigger API's via the classic landing page scroll based animation flow. It also incorporate GSAP effects from **made with gsap** and **osmo.supply** libraries.


<figure class="prose-video" data-prose-video data-hls="https://vz-8dc492cd-3d0.b-cdn.net/7be0ce82-d4c3-4649-85df-b9f74ef126da/playlist.m3u8">
  <video muted loop playsinline autoplay controls preload="metadata" aria-label="Scrolling page demo"></video>
  <figcaption>Scrolling page demo</figcaption>
</figure>

We can think of the 12 column grid based page as a flow of film frames. Each page section is a frame that can we can think of as it's own file. This fits naturally with how a designer will create design in Figma.

When working, I work section by section and then each detail of each section and how each element should look and animate. We can apply this to our spaghetti code.


# The Code


**Scrollable Code block**

Each section has:

- selectors and dom references
- gsap timeline, scrolltrigger, splittext code with settings and animation properties/values
- some has library code for a cool gsap effect


Long code like this can suffer from:

- inconsistent naming conventions
- each section has it's structure
- no clear description of what the animation does in detail
- tedious search/find and update process for fine-tuning animations between IDE and browser

We can ask AI to clean up the code, but if we don't know what it could look like, we might get something better but not great. Good enough more than likely. Don't settle, be better.

Instead of just prompting away the problems and generate more slop and a weak codebase, we can start with some mental models and best practices to improve the code and our development process. It's also more enjoyable to know what the hell is going on and see the big picture when fitting the smaller parts together.


# Next Steps


We can improve this spaghetti and avoid AI slop by:

1. using patterns and organization
2. avoid performance issues
3. component based plug and play code


In the [next post](/blog/4-gsap-architecture-part-1), we'll get right to the core of the problem by implementing design patterns.
