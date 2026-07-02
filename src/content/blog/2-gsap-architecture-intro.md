---
title: "GSAP Code Architecture"
description: "Refactoring spaghetti code with patterns and components"
pubDate: 2026-07-02
published: true
---


<figure class="prose-image">
  <img src="https://code-design-garden.b-cdn.net/gsap-logo.avif" alt="Alt text" loading="lazy" decoding="async" />
</figure>



GSAP has been the OG go-to tool for [awwwards](https://www.awwwards.com/) masters and next level web animations.
The concepts of timelines, tweens, and scroll triggers are simple to understand but require meeting both visual imagination and coding expertise to make it happen.

Some really cool sites by creative developer-designers has opened the door of the GSAP wizards. It's never been easier to go from G-Crappy to G-Savvy. Below is a list of these libraries and collections that do cost some good money and serve different purposes. 

## Osmo


[osmo.supply](https://www.osmo.supply/) is a growing "vault" of over 150 GSAP powered animations focused on navigations, menus, galleries, text and UI effects. They have a dope button collection and provide Webflow code copy for easier workflow. They also have a terrific Barba.js page transitions course to setup your code with super smooth page animations that address many of the edge cases you will encounter.

All around, this is the best all around resource for taking your designs to the next level and the variety of components and not just super-dope motion elements.



<figure class="prose-video" data-prose-video data-hls="https://vz-8dc492cd-3d0.b-cdn.net/4c514d75-c060-4c2b-b1a1-4e6d23b035dc/playlist.m3u8">
  <video muted loop playsinline autoplay controls preload="metadata" aria-label="OSMO Overview"></video>
</figure>


## Made With GSAP

[Made With GSAP](https://madewithgsap.com/effects) has over 100 modern clean motion effects. If you need some really great creative text and image effects, this is a great resource. Each effect has a tutorial walk through which explains the code and how it works. It's a great way to learn how GSAP methods are used.


<figure class="prose-video" data-prose-video data-hls="https://vz-8dc492cd-3d0.b-cdn.net/e275c54a-a792-4ca3-9234-0eba46eaf150/playlist.m3u8">
  <video muted loop playsinline autoplay controls preload="metadata" aria-label="OSMO Overview"></video>
</figure>


## Codegrid

One of the longest running youtube channels and OG's of reverse-engineering top **AWWWARD** winning motion effects. Codegrid has an
extensive youtube library of effects for anything and everything with GSAP.

Becoming a member get's you a monthly full website template along with working code repos for all the demos on the youtube page.

This is a great beginner resource to get started.


<figure class="prose-video" data-prose-video data-hls="https://vz-8dc492cd-3d0.b-cdn.net/f4820451-3727-4ed4-9f1c-3eca9289985d/playlist.m3u8">
  <video muted loop playsinline autoplay controls preload="metadata" aria-label="OSMO Overview"></video>
</figure>



## Annnimate


[Annnimate](https://annnimate.com/) provides a component based library for motion effects for commercial projects. 
I haven't used the service but there pitch is great: component ready code that allows a developer to quickly integrate in your porject saving you tons of time reverse engineering and make it plug-and-play.

They have a [great blog](https://lab.good-fella.com/blog) with tons of great articles on the practical uses for SplitText, ScrollTrigger and there [learning page](https://annnimate.com/learn) is a go-to for becoming G-Savvy. 





<figure class="prose-video" data-prose-video data-hls="https://vz-8dc492cd-3d0.b-cdn.net/0ffb5d48-f33f-4af0-bce4-db19425878bf/playlist.m3u8">
  <video muted loop playsinline autoplay controls preload="metadata" aria-label="OSMO Overview"></video>
</figure>


I've been a user of these resources and learning the approach to the code is super insightful.

Once you start using these libraries in real sites and codebases, things can start to get complicated with lifecycle hooks, duplicating event listeners, managing tween and triggers, lifecycle management for page changes, and long messy code for those scroll based landing pages.

You can copy-paste the code and ask AI to make it work, but why not learn some medium level programming concepts like design patterns, component based design and how they fit in an evolving front end codebase?

# G-Crappy to G-Savvy


Updating your "mental-ware" on code structure is useful for thinking in more abstract component based design for building composable code. There's been lots of chatter about architecture and high level design as an important skill. 


# The Design of Code

This walkthrough uses a bunch of text animations that document the GSAP SplitText and ScrollTrigger API's via the classic landing page scroll based animation flow. It also incorporate GSAP effects from **made with gsap** and **osmo.supply** libraries.


<figure class="prose-video" data-prose-video data-hls="https://vz-8dc492cd-3d0.b-cdn.net/98ebbe95-f277-46bb-aad7-3e62d93e8dd3/playlist.m3u8">
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


In the next post, we'll get right to the core of the problem by implementing design patterns.
