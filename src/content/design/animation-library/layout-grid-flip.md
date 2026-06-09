---
title: "Implementation"
description: "Implementation."
slug: "layout-grid-flip"
previewVideo: "layout-grid-flip.mp4"
order: 49.91
published: true
categories: ["button", "layout"]
triggers: ["load"]
libraries: ["gsap"]
keywords: ["implementation", "layout", "grid", "flip"]
sourceUrl: "https://www.osmo.supply/resource/layout-grid-flip"
---
#### Container
Use `[data-layout-group]` on the wrapper that contains the toggle buttons and the grid, so the script scopes event listeners and Flip animations to a single instance.  
#### Status
Use `[data-layout-status="large" | "small"]` on the same group wrapper to declare the current layout mode, which the script reads and switches before animating. In CSS we're also checking this status to determine the layout.  
#### Buttons
Use `[data-layout-button="large"]` and `[data-layout-button="small"]` on your toggle buttons so the script knows which target layout to activate and animate to. Notice how the attribute value on these buttons matches the value on our container status exactly.  
#### Grid
Use `[data-layout-grid]` on the element that contains the collection and list, allowing the script to query items for Flip state recording within this grid only.  
#### Collection (height lock)
Use `[data-layout-grid-collection]` on the parent that visually wraps the list, because the script locks and tweens this element’s height during Flip to prevent container collapse.  
#### List
Use `[data-layout-grid-list]` on the direct wrapper of items to manage wrapping and gaps, while the height tween happens on the collection above it.  
#### Card / Item
Use `[data-layout-grid-item]` on each card so the script records these elements in `Flip.getState()` and animates their position/size changes between layouts.
#### Amount of columns
Use `[data-layout-status="large"]` and `[data-layout-status="small"]` to define how many columns your layout should display. Inside your CSS, these states control two custom properties: `--columns` and `--column-gap`. These are then used in a width calculation for each card. You can easily adjust these variables per breakpoint to make your layout responsive. For example, reducing columns and gaps on smaller screens:
```css
[data-layout-status="large"] {
  --columns: 3;
  --column-gap: 1.5em;
}
[data-layout-status="small"] {
  --columns: 5;
  --column-gap: 1em;
}
@media screen and (max-width: 767px) {
  [data-layout-status="large"] {
    --columns: 1;
    --column-gap: 0;
  }
  [data-layout-status="small"] {
    --columns: 2;
    --column-gap: 1em;
  }
}
```
#### Title (optional micro-motion)
Use `[data-layout-grid-item-title]` on the heading inside a card to enable CSS-driven size tweaks between modes without interfering with Flip. You're free to add as many tweaks with this same logic as you see fit. Just be careful with CSS changes that affect the height of your card and its contents, as this can throw off the calculations happening in Flip.