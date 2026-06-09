---
title: "Barba Lifecycle Deep-Dive"
description: "Barba Lifecycle Deep-Dive."
slug: "page-transitions/barba-lifecycle"
previewVideo: "barba-lifecycle.mp4"
order: 49.889
published: true
categories: ["page-transition"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["barba", "lifecycle", "deep", "dive"]
sourceUrl: "https://www.osmo.supply/page-transition-course/barba-lifecycle-deep-dive"
---
Now that we've got something working, let's understand what's actually happening under the hood. We'll go through the full Barba lifecycle, talk about sync mode and why we use it, and explain the difference between hooks and transitions. This is the foundation for everything else in the course.
### Lesson Notes
#### Links
- [Barba Hooks Documentation](https://barba.js.org/docs/advanced/hooks/)
- [Barba Transitions Documentation](https://barba.js.org/docs/advanced/transitions/)
#### The mental model
When you click a link, Barba gives you 'moments': the old page leaving, the new page entering. Your job is to decide what happens at each moment. Or well, our boilerplate is going to do that thinking for you, later on.
#### Why we use sync mode
Throughout this course, we use sync mode. This means both pages exist at the same time during a transition.
Why? It gives us the most flexibility. You can build:
- **Overlay transitions**: a wipe or cover hides the swap, you never see both pages
- **Crossfade transitions**: both pages visible, one fades out while the other fades in
- **Any combination**: old page slides away while new page is already entering
Without sync mode, leave has to fully complete before enter starts. That limits what you can create.
#### Hooks vs Transitions
- **Hooks** are for logic: setup, cleanup, updating the DOM
- **Transitions** are for animation: `leave()`, `enter()`, `once()`
#### Global vs Transition hooks
Hooks can be global (run on every transition) or live inside a specific transition. Global hooks run every time; transition hooks only run for that specific transition.
#### The hooks we use
- `beforeEnter` new container exists but isn't visible yet.
- `enter` transition is running.
- `afterLeave` old page is gone.
- `afterEnter` transition complete, page is live.
#### Key Takeaway
Sync mode gives you both containers at the same time. This is the most flexible setup for building any type of transition you want.