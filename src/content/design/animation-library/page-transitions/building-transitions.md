---
title: "How to Approach Building Transitions"
description: "How to Approach Building Transitions."
slug: "page-transitions/building-transitions"
previewVideo: "building-transitions.mp4"
order: 49.887
published: true
categories: ["page-transition"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["how", "approach", "building", "transitions"]
sourceUrl: "https://www.osmo.supply/page-transition-course/basic-fade"
---
Before we start building more transitions, let's talk about how to think about them. What does the user see? What's leaving, what's entering, what's in between? We'll cover the two main approaches, overlay transitions and container transitions, and give you a framework for planning your own.
### Lesson Notes
#### The three parts
Every transition has three parts:
1. **What's leaving**: the old page
2. **What's entering**: the new page
3. **What's in between**: the moment that connects them (could be nothing, an overlay, a wipe, a pause)
When planning a transition, ask yourself: what do I want the user to see?
#### The checklist
1. **Decide what's persistent vs what's in between**: overlays and wipes live outside the Barba container, they don't get swapped
2. **Block interaction during the transition**: prevent clicks and scrolling while things are animating
3. **Build leave and enter as separate timelines**: use `startEnter` to control when 'enter' begins
4. **Pick your `pageReady` moment**: when should the page feel "live" again? Don't wait for every detail animation, just the core stuff.
#### Watch out for overwrite issues
If you're animating the same element in both leave and enter (like an overlay), remember that these are separate timelines running simultaneously. GSAP's default overwrite behavior applies; If both timelines target the same property at the same time, you'll get conflicts. Use [GSAP's overwrite modes](https://gsap.com/resources/conflict/#gsaps-3-overwrite-modes) if needed.
#### Key takeaway
Start simple, get it working, then add polish. It's easier to add complexity to something that works than to debug something elaborate that doesn't. Remember, you're working with GSAP here, all in timelines.