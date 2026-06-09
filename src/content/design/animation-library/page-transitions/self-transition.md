---
title: "Self Transition"
description: "Self Transition."
slug: "page-transitions/self-transition"
previewVideo: "self-transition.mp4"
order: 49.872
published: true
categories: ["page-transition"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["self", "transition"]
sourceUrl: "https://www.osmo.supply/page-transition-course/self-transition"
---
What happens when someone clicks a link to the page they're already on? By default, the page just reloads. But you can intercept this and run a custom animation instead. In this lesson we'll cover how to handle self transitions.
### Lesson Notes
#### The default behavior
When you're on `/about` and click a link to `/about`, the browser does a full page reload. Barba doesn't intercept it by default.
#### Enabling self transitions
Add a transition with `self` as the 'magic' name to intercept same-page navigation:
```javascript
barba.init({
  debug: true, // Set to 'false' in production
  timeout: 7000,
  preventRunning: true,
  transitions: [
    {
      name: "self",
      sync: true,
      async leave(data) {
        // Your leave animation
      },
      async enter(data) {
        // Your enter animation
      }
    },
    {
      name: "default",
      // ...
    }
  ]
});
```