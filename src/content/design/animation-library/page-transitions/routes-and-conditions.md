---
title: "Custom Routes & Conditions"
description: "Custom Routes & Conditions."
slug: "page-transitions/routes-and-conditions"
previewVideo: "routes-and-conditions.mp4"
order: 49.873
published: true
categories: ["page-transition"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["custom", "routes", "conditions"]
sourceUrl: "https://www.osmo.supply/page-transition-course/custom-routes-conditions"
---
Up until now we've had one transition for everything. But what if you want different animations for different pages? In this lesson we'll cover namespaces, the 'from' and 'to' options, and how to set up multiple transitions.
### Lesson Notes
#### Links
- [Barba Transitions Documentation](https://barba.js.org/docs/advanced/transitions/)
#### Namespaces
Every Barba container can have a namespace: A name that identifies what type of page it is. Common namespaces might be: `home`, `about`, `work`, `case`, `contact`, `blog`, `post`. This is how Barba knows which page you're coming from and going to. You can use namespaces to target specific transitions.
```text
<div data-barba="container" data-barba-namespace="home">
```
#### Why custom routes?
Not every page change has to look the same. You might want a specific transition when going from your work overview to a case study, but a simple fade everywhere else.
#### Multiple transitions
You can define multiple transitions in the array. Barba checks them in order and uses the first match.
```javascript
barba.init({
  transitions: [
    {
      name: 'work-to-case',
      sync: true,
      from: { namespace: ['work'] },
      to: { namespace: ['case'] },
      leave(data) { /* custom leave */ },
      enter(data) { /* custom enter */ }
    },
    {
      name: 'default',
      sync: true,
      leave(data) { /* default leave */ },
      enter(data) { /* default enter */ }
    }
  ]
});
```
#### The rule: specific first, default last
Barba uses the first transition that matches. So put your specific routes at the top and your catch-all default at the bottom.
#### Matching by namespace
- `from: { namespace: ['work'] }` matches when leaving the work page
- `to: { namespace: ['case'] }` matches when entering a case page
- Combine both for a specific route: work → case
#### Custom conditions
For more complex logic, you can use a `custom` function that returns true or false:
```javascript
{
  name: 'custom-transition',
  sync: true,
  custom: ({ current, next, trigger }) => {
    return trigger.classList.contains('featured-link');
  },
  // ...
}
```
This is useful for edge cases, but `from` / `to` namespaces cover most situations.
#### Debugging
If the wrong transition runs, check:
- Namespace missing or misspelled on the page
- Rule order (is a more general rule matching first?)
- Custom condition returning true unexpectedly
#### Key takeaway
Always have a default fallback transition at the end. Specific routes first, catch-all last.