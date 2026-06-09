---
title: "Persistent Navigation"
description: "Persistent Navigation."
slug: "page-transitions/persistent-navigation"
previewVideo: "persistent-navigation.mp4"
order: 49.874
published: true
categories: ["page-transition", "navigation"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["persistent", "navigation"]
sourceUrl: "https://www.osmo.supply/page-transition-course/persistent-navigation"
---
Your navigation can live outside the Barba container, so it doesn't get swapped. But that creates a problem: how do you keep the active state in sync? In this lesson we'll cover how to update your nav after every transition.
### Lesson notes
#### The problem
When Barba swaps pages, your nav doesn't know the page changed. If you have an active state on your nav links (like "Home" is highlighted when you're on the homepage), that won't update automatically.
#### The solution
The boilerplate includes `initBarbaNavUpdate()`, a helper that syncs the nav state after every transition. It runs in the `enter` hook.
#### How it works
1. Barba fetches the new page HTML
2. We find all `[data-barba-update]` elements in the new page's nav
3. We find the matching elements in the persistent nav
4. We copy over the `aria-current` attribute and class list
#### Setup
Add `data-barba-update` to each nav link you want to keep in sync.
#### If your nav is inside the container
If your navigation lives inside the Barba container (maybe because you have a full-page wipe or a design that requires it), you don't need any of this. The nav gets swapped along with the page, so the active state updates automatically. You can remove the `enter` hook that calls `initBarbaNavUpdate` and remove the helper function from the boilerplate entirely.