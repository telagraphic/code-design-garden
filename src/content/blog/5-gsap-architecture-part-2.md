---
title: "GSAP Code Architecture - Part 2"
description: "GSAP registry for performance"
pubDate: 2026-07-07
published: true
---


Right now, we currently have one large monofile that has been refactored to use the configuration and storyboard pattern. We will break each section into it's own file.
For each of these files, we can use the `Factory` pattern to create our section animations. We'll add these factories to a master `Orchestrator` in the main entry point file later.

## Function Factories

The [factory](https://refactoring.guru/design-patterns/factory-method) pattern is for creating new objects that is very similar to a class with state and methods. It's important to note we aren't using TypeScript or Object Oriented Programming strictness due to Javascript's more functional nature. 

We can use the GSAP concepts of `Tweens`, `Timelines`, `Effects` and so on as the types of methods we'll need for our GSAP objects. Methods for `creating`, `reverting` and `destroying` the animations will be useful to call in our top level `Orchestrator` script. This "animation factory" is not a strict implementation of an interface but it provides us with a unified set of functions that our code will use across the animation code for each section.

We are turning the spaghetti bowl into a more formal structure: a lasagna tray with layers separated into squares.



| name              | function                                                                       |
| ----------------- | ------------------------------------------------------------------------------ |
| `createTweens`    | tween animations mostly driven by `scrollTrigger`                              |
| `createTimelines` | where timeline only code for specific sections such as the `header` & `footer` |
| `createEffect`    | complex GSAP motion effects from other libraries                               |
|                   |                                                                                |


Each factory can call each method or just one, it depends on the animation being implemented. Most of the time each section will be one type.


```js

// Factory module 
export function createSection() {

  const section = document.querySelector(
    SECTION_CONFIG.SELECTORS.SECTION,
  );

  function createTweens() {
    // custom animation code goes here
  }

  function createTimelines() {
   // custom animation code goes here 
  } 

  function createEffect() {
    // custom animation code goes here 
  }

  return {
    id: "section-x",
    type: "tween",
    create() {
      createTweens();
      createTimelines();
      createEffect();
    },
    destroy() {
      // missing code
    },
    revert() {
      // missing code
    },
  };
}
```

But what does `destroy` and `revert` do?

Frameworks do a lot of the tedious work of cleaning up animations, maintaining state consistency, and many other things that we should be aware of but is abstracted away for developer experience and productivity.

In Luis Bizarro [awwwards course](https://www.awwwards.com/academy/course/building-an-immersive-creative-website-from-scratch-without-frameworks) he builds a **no framework gsap SPA** with only javascript. 

One of the things I recalled from it was managing GSAP animations: ensuring they are created on page load, updated on window/media events and destroyed on page navigation. It's tedious code by hand but you learn just how complicated everything can be. When building by scratch we face many potential bugs as the page animations grow.

## Performance

**React** has hooks for syncing state and lifecycle events. **Barba.js** has "lifecycle events" for each step of page navigation to customize our animation code. Our custom GSAP code is missing these features. We aren't trying to recreate those libraries, but we do need to ensure our GSAP code is performant in our MPA or SPA.

After several in depth AI chats about code organization and GSAP performance, I landed on a creating a `Registry` module. Our current spaghetti approach can lead to:

| Symptom                                         | Likely cause                                       |
| ----------------------------------------------- | -------------------------------------------------- |
| Scroll feels heavier after resize               | Duplicate scrub ScrollTriggers per section         |
| Animation "fights itself" (jumps, double speed) | Two tweens driving same targets                    |
| `ScrollTrigger.refresh()` gets slower over time | More instances to recalculate                      |
| Footer plays/reverses erratically               | Duplicate `ScrollTrigger.create` callbacks         |
| `ScrollTrigger.getAll().length` grows           | Orphaned instances from re-init or `onSplit`       |
| Memory climb on long sessions (SPA)             | Listeners + closures holding detached DOM          |
| Mobile worse than desktop                       | More resizes → more `onSplit` → faster duplication |
| `SplitText` not getting reset                   | Not calling `revert` on `SplitText`                |

In numbers this amounts to:

| Section      | Approx. tweens / triggers                 |
| ------------ | ----------------------------------------- |
| Hero         | 1 master `Timeline` + 4 nested            |
| Section 1    | 1 char `Tween` + 1 lines scrub            |
| Section 2    | 2 per group × 3 groups = 6                |
| Section 3    | 1 per line × ~15 lines                    |
| Section 4    | 1 per track × ~20 tracks                  |
| Sections 5–7 | ~10–30 combined                           |
| Section 8    | 1 per phrase × rebuild risk               |
| Footer       | 1 timeline + 1 standalone `ScrollTrigger` |

This is about **60–80 GSAP objects** at steady state. One unguarded **re-init** or **resize** loop without kill can **double** that. Scroll-scrubbed triggers run work on every scroll event — duplication is multiplicative on the main thread.

When you write:

```js
gsap.to(target, {
  x: 0,
  scrollTrigger: { trigger: section, scrub: 1 },
});
```

GSAP creates **two** linked objects:

```text
Tween  ──attached──►  ScrollTrigger
  │                        │
  │                        ├── scroll listener (updates on scroll)
  │                        ├── pin spacer DOM (if pin: true)
  │                        └── refresh calculations
  └── runs on ticker while active
```

Killing only the tween or only the ScrollTrigger leaves the other half alive. The registry's `killTween()` does both:

```js
tween.scrollTrigger?.kill();
tween.kill();
```

GSAP keeps tweens, timelines, and ScrollTriggers alive in internal lists until they are **killed** or **complete** (and `once: true` triggers still leave instances until killed). Creating an animation without storing a reference does not mean it is short lived — it means **your code cannot find it to clean it up**.

## GSAP Registry

Instead of referencing these GSAP objects per file, we can create a global `Registry` module/service that `sets` and `gets` using a `Map` for storing references to the GSAP objects. It's related to the Service Locator pattern but in our case it's perfect for tracking animation references. With references to our animations, we can be sure to avoid **orphaned** animations that can cause all the issues listed above.

We want a single source of access that can be injected into each factory. We don't want to have to manually add and remove animations in each factory since we would be repeating ourselves and just adding more code overall. Read more about this pattern [here](https://medium.com/@unclexo/the-registry-pattern-simplifying-access-to-commonly-used-objects-93e2857abab7).

```js
/**
 * Registry for managing GSAP timelines, tweens, scroll triggers and split text instances
 *
 */

export function createRegistry() {
  /** Animation state */
  const Timelines = new Map();
  const Tweens = new Map();
  const Triggers = new Map();
  const Splits = new Map();

  /** Methods */
  function addTimeline(key, timeline) {
    Timelines.set(key, timeline);
  }

  function addTween(key, timeline) {
    Tweens.set(key, timeline);
  }

  function addTrigger(key, timeline) {
    Triggers.set(key, timeline);
  }

  function addSplit(key, timeline) {
    Splits.set(key, timeline);
  }

  function killTween(tween) {
    tween?.scrollTrigger?.kill();
    tween?.kill();
  }

  /**
   * Kills tween and timeline instances and clears cached for resize events
   */
  function resetAnimations() {
    for (const tween of Tweens.values()) {
      this.killTween(tween);
    }

    for (const timeline of Timelines.values()) {
      timeline?.scrollTrigger?.kill();
      timeline.kill();
    }

    Tweens.clear();
    Timelines.clear();
  }

  /**
   * Reverts (undoes split text wrapping) and clears cached split text instances for resize events
   */

  function resetSplits() {
    for (const split of Splits.values()) {
      split.revert?.();
    }
    Splits.clear();
  }


  /**
   * Kills ScrollTrigger listeners and clears the cache
   */
  function resetTriggers() {
    for (const trigger of Triggers.values()) {
      trigger.kill();
    }
    Triggers.clear();
  }

  /**
   * Kills all gsap instances and clears registry caches
   */

  function destroy() {
    this.resetAnimations();
    this.resetSplits();
    this.resetTriggers();
  }

  return {
    addTimeline: addTimeline,
    addTween: addTween,
    addTrigger: addTrigger,
    addSplit: addSplit,
    resetAnimations: resetAnimations,
    resetSplits: resetSplits,
    resetTriggers: resetTriggers,
    killTween: killTween,
    destroy: destroy,
  };
}
```


This pattern also follows the convention of **Open-Close Principle** which states: code becomes open for extension but closed for modification. Each new section is the **open** concept to extend our animation code. The `Registry` is the **closed** concept where we can re-use existing functionality for the new code with no need for additional changes. Unless we need to account for new animation types like `Flip` or `Draggable` in the future.



**Code diagram here**

```
L0  script.js
     │
L1   ├── lenis.js
     └── timeline/section-*.js
              │
              └── effects/text-effect-*.js         (section-8)
                       │
L4   shared/registry.js ──────┘  (leaf)
L4   shared/gsap.js ─────────────┘  (CDN: gsap, ScrollTrigger, SplitText, CustomEase)
```



We can use this in any file that has GSAP code. We use `addTween`, `addSplit` with a **key-value** for storing a reference. We call `resetAnimations` to kill any tweens or timelines that could be running as a defensive measure.


```js

...

export function createSectionTwo() {
  const registry = createRegistry();

  const sectionTwo = document.querySelector(
    SECTION_TWO_CONFIG.SELECTORS.SECTION,
  );

  const sectionTwoGroups = Array.from(
    sectionTwo.querySelectorAll(SECTION_TWO_CONFIG.SELECTORS.GROUPS),
  );

  function createTweens() {
    registry.resetAnimations();

    sectionTwoGroups.forEach((group, index) => {
      const header = group.querySelector(SECTION_TWO_CONFIG.SELECTORS.HEADER);
      const paragraph = group.querySelector(
        SECTION_TWO_CONFIG.SELECTORS.PARAGRAPH,
      );

      const headerTween = gsap.to(header, {
        onStart: () => {
          removePrehideClasses(header, paragraph);
        },
        opacity: 1,
        scrollTrigger: {
          trigger: group,
          start: "top center",
          end: "center center",
          once: true,
        },
      });

      registry.addTween(`header-${index}`, headerTween);

      const paragraphSplit = new SplitText(paragraph, {
        type: SECTION_TWO_CONFIG.PARAGRAPH.SPLIT_TEXT.type,
        mask: SECTION_TWO_CONFIG.PARAGRAPH.SPLIT_TEXT.mask,
        autoSplit: true,
        revert: true,
      });

      registry.addSplit(`paragraph-${index}`, paragraphSplit);

      gsap.set(paragraphSplit.lines, SECTION_TWO_CONFIG.PARAGRAPH.TIMELINE.FROM);

      const linesTween = gsap.to(paragraphSplit.lines, {
        ...SECTION_TWO_CONFIG.PARAGRAPH.TIMELINE.TO,
        scrollTrigger: {
          trigger: group,
          start: "top center-=120",
          once: true,
        },
      });

      registry.addTween(`lines-${index}`, linesTween);
    });
  }

  return {
    id: "section-two",
    type: "scrollTrigger",
    registry,
    create() {
      createTweens();
    },
    destroy() {
      registry.destroy();
    },
    revert() {
      registry.resetSplits();
    },
  };
}
```

The `destroy` and `revert` methods will be called in the entry point script that implements an `orchestrator` pattern in the next post where we put all the pieces together.