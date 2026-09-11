---
title: "GSAP Code Architecture - Part 3"
description: "Fitting the peices together"
pubDate: 2026-07-08
published: true
---


It's time to bring all the pieces together. The `Orchestrator` pattern originates from backend micro services architecture. It basically acts as the central conductor for all the factories to create the master timeline that reduces coupling and complexity as the codebase grows.
We can think of it as [nested timelines](https://annnimate.com/learn/timeline/nested-timelines) in GSAP.

We can easily add/remove sections and it acts as the entry point for starting up the landing page animations. `initAnimations` is the orchestrator and the other methods allow us to control it for page changes or other events we might need at a global level without having to worry about each section.




```js

import { ScrollTrigger } from "./shared/gsap.js";
import { destroyLenis, initLenis } from "./lenis.js";
import { createHeader } from "./timeline/section-header.js";
import { createSectionOne } from "./timeline/section-1.js";
import { createSectionTwo } from "./timeline/section-2.js";
import { createSectionThree } from "./timeline/section-3.js";
import { createSectionFour } from "./timeline/section-4.js";
import { createSectionFive } from "./timeline/section-5.js";
import { createSectionSix } from "./timeline/section-6.js";
import { createSectionSeven } from "./timeline/section-7.js";
import { createSectionEight } from "./timeline/section-8.js";
import { createSectionFooter } from "./timeline/section-footer.js";

const modules = [];

export function initAnimations() {
  modules.push(
    createHeader(),
    createSectionOne(),
    createSectionTwo(),
    createSectionThree(),
    createSectionFour(),
    createSectionFive(),
    createSectionSix(),
    createSectionSeven(),
    createSectionEight(),
    createSectionFooter(),
  );

  modules.forEach((module) => module.create());
  ScrollTrigger.refresh();
}

export function destroyAllModules() {
  modules.forEach((module) => module.destroy());
  modules.length = 0;
}

export function destroyPage() {
  destroyAllModules();
  destroyLenis();
}

document.fonts.ready.then(() => {
  initAnimations();
  initLenis();
  ScrollTrigger.refresh();
});

```


We use an array to sequence our "timeline" and create the animations within the `document.fonts.ready.then` event callback. This is key for text heavy animations that need to wait for the fonts to load to prevent annoying layout shifts and ensure our markup is ready for the animation code to work properly.

We also initialize `Lenis` for smooth scrolling and call `ScrollTrigger.refresh` as a best practice to calculate scroll positions. Typically this would be called on viewport resizes or if new content is added to the page to ensure the values reflect new dimension changes.

The `destroyAllModules` and `destroyPage` would be hook methods we can call when navigating to another page. If and when we navigate back to this landing page, we call `initAnimations` in a create method for this page. 


## All Together

```bash
L0  script.js
     │
L1   ├── lenis.js
     └── timeline/section-*.js
              │
L2            ├── effects/text-effect-*.js      
                       │
L3                     └── effects/motionPresets.js   
                       └── easings.js /utils.js
                              │
L4   shared/registry.js ──────┘  
L4   shared/gsap.js ─────────────┘  (CDN: gsap, ScrollTrigger, SplitText, CustomEase)
```

We load GSAP and dependencies in the `shared/gsap.js` and `script.js` is our central entry point for this page based animation. `lenis.js` set's up the smooth scrolling and our `effects/` directory contains the motion effects from external libraries ( see gsap resources post and gsap component refactoring). `timeline/section-*.js` maps to each HTML section with it's respective animation code.


## Plug & Play Composability

This code works for our simple landing page example, but we would need to add page lifecycle methods to then call the animation methods. This could be integrated into an MPA, SPA or modified to fit into framework.

React has the `useGSAP` hook for example. `useGSAP` handles most of the animation cleanup by wrapping `gsap.context()` around the code and calling `gsap.revert()` to prevent double firing issues. 

Making some minor changes by modifying the `document.fonts.ready.then` callback to fit into the React lifecycle:


```js
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { initAnimations, destroyPage } from "../animations/script";
import { initLenis } from "../animations/lenis";
import { ScrollTrigger } from "../animations/shared/gsap";

export default function HomePage() {
  const page = useRef(null);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useGSAP(
    () => {
      if (!fontsReady) return;

      initAnimations();
      initLenis();
      ScrollTrigger.refresh();

      return () => destroyPage();
    },
    { scope: page, dependencies: [fontsReady] },
  );

  return (
    <main ref={page}>
      {/* existing markup: data-section, class names unchanged */}
    </main>
  );
}
```

And the project structure would be:

```js
src/
├── pages/
│   └── HomePage.jsx              ← useGSAP adapter only
│
└── animations/                   ← current js/ folder, moved as-is
    ├── script.js                 
    ├── lenis.js
    ├── easings.js
    ├── utils.js
    ├── shared/
    │   ├── gsap.js               
    │   └── registry.js
    ├── timeline/
    │   ├── section-header.js
    │   ├── section-*.js
    |   ├── ... 
    └── effects/
        ├── motionPresets.js
        ├── ...

```


