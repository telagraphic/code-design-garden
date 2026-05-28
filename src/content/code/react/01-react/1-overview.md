---
domain: code
section: react
chapter: overview
title: "Overview"
sectionTitle: "React"
order: 1001
description: "Hooks, rendering, and the mental model for React."
chapterLabel: "Overview"
---
# Overview

The high level concepts of react


- **`view = function(state)`** — A component is a function that returns UI from its current inputs; when state or props change, React calls it again to produce the next view.
- **`useState`** — Add local state that survives re-renders and triggers a new render when you update it (forms, toggles, counters).
- **`useEffect`** — After paint, synchronize with something outside React (fetch, subscriptions, timers, `localStorage`) and clean up when deps change or the component unmounts.
- **`useRef`** — Hold a mutable value or DOM node across renders without re-rendering when `.current` changes (timers, previous values, imperative focus).
- **`useContext`** — Read a value from the nearest Provider above you when many components need the same ambient data (theme, locale, current user) without prop drilling.
- **`useReducer`** — Manage state that updates together or depends on other fields via a reducer and `dispatch` actions (multi-step forms, complex widgets).
- **`useSyncExternalStore`** — Subscribe to data that lives outside React (global store, `matchMedia`, `navigator.onLine`) and re-render when its snapshot changes.
- **`useLayoutEffect`** — Run layout reads or DOM tweaks synchronously after commit but before paint when a visible flicker would otherwise occur (measure, scroll, focus).
- **`useEffectEvent`** — Expose a stable function to effects/subscriptions that always runs the latest logic without putting those reactive values in the effect dependency array.
- **`useMemo` / `useCallback`** — Reuse a computed value or function reference between renders when deps are unchanged (expensive filters, stable props for `memo` children).
- **`useDeferredValue`** — Keep showing a slightly stale copy of a fast-changing value so urgent UI (typing) stays smooth while expensive UI catches up.
- **`useTransition`** — Mark specific state updates or async work as non-urgent so tabs, navigation, and heavy renders do not block immediate interactions (`isPending`).
- **`useOptimistic`** — Show optimistic UI during an async mutation (like, send message, move card) and reconcile or roll back when the server responds.
- **`React.Suspense`** — Wrap slow or async UI with a `fallback` so the rest of the page can render while a region loads (lazy routes, nested skeletons).
- **Server Components** — Run data-fetching and static UI on the server; use `"use client"` only for interactive islands (state, events, browser APIs).
- **`customHooks`** — Extract reusable stateful logic into a named function when the same hook combination appears in multiple components.


## Hooks

> "Hooks are functions, but it’s helpful to think of them as unconditional declarations about your component’s needs. You use React features at the top of your component similar to how you import modules at the top of your file." - React docs




## Props and State

1. To get data down the tree, use props.
2. To get data back up the tree, use callbacks.
3. For side effects outside of react:
    1. If triggered by an event, put the logic in the event handler.
    2. If synchronizing with an outside system, use useEffect
    3. If you need to preserve a value and it's not related to the view/re-render, then use useRef



## Side Effects

> **Rule 0**
When a component renders, it should do so without running into any side effects



> **Rule 1**
If a side effect is triggered by an event, put that side effect in an event handler



> **Rule 2**
If a side effect is synchronizing your component with some outside system, put that side effect inside useEffect

> **Rule 3**
If a side effect is synchronizing your component with some outside system and that side effect needs to run *before* the browser paints the screen, put that side effect inside useLayoutEffect


> **Rule 4**
If a side effect is subscribing to an external store, use the useSyncExternalStore hook





