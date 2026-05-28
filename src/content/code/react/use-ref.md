---
domain: code
section: react
chapter: overview
title: "useRef"
order: 10025
description: >-
  A hook that returns a mutable ref object whose .current property is initialized
  to the passed argument. The ref object persists for the full lifetime of the
  component — changes to it do not trigger a re-render.
chapterLabel: "Overview"
---
## Basic Usage

Call useRef at the top level of your component to declare a ref. You can then assign it to a DOM node or store any mutable value you want to persist across renders without causing them.

```js
import { useRef } from 'react'

function TextInput() {
  const inputRef = useRef(null)

  function handleFocus() {
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleFocus}>Focus</button>
    </div>
  )
}
```

## useRef vs useState

Both store values between renders, but they behave very differently. Use this table to decide which hook fits your situation.

| Property | useRef | useState |
| --- | --- | --- |
| Triggers re-render | No | Yes |
| Mutable directly | Yes | No (use setter) |
| Persists across renders | Yes | Yes |
| Best for | DOM refs, timers, prev values | UI-driven state |

## Common Patterns

These are the most frequent real-world uses for useRef. Each avoids unnecessary re-renders by keeping the value outside of React's state system.

<ul class="checklist">
  <li class="checklist__item">
    <span class="checklist__box checklist__box--checked" aria-hidden="true">
      <svg class="checklist__box-icon" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4L3.5 6.5L9 1" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <div class="checklist__content">
      <p class="checklist__title">DOM element access</p>
      <p class="checklist__desc">Attach to a JSX element with the ref prop to read or manipulate it directly.</p>
    </div>
  </li>
  <li class="checklist__item">
    <span class="checklist__box checklist__box--checked" aria-hidden="true">
      <svg class="checklist__box-icon" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4L3.5 6.5L9 1" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <div class="checklist__content">
      <p class="checklist__title">Storing timer IDs</p>
      <p class="checklist__desc">Hold a setTimeout or setInterval ID to cancel it on cleanup without re-rendering.</p>
    </div>
  </li>
  <li class="checklist__item">
    <span class="checklist__box" aria-hidden="true"></span>
    <div class="checklist__content">
      <p class="checklist__title">Tracking previous values</p>
      <p class="checklist__desc">Snapshot the previous render's value inside a useEffect for diffing.</p>
    </div>
  </li>
  <li class="checklist__item">
    <span class="checklist__box" aria-hidden="true"></span>
    <div class="checklist__content">
      <p class="checklist__title">Persisting across renders without state</p>
      <p class="checklist__desc">Any value that needs to live between renders but shouldn't trigger UI updates.</p>
    </div>
  </li>
</ul>

## Further Reading

<ul class="reading-list">
  <li class="reading-list__item">
    <span class="reading-list__arrow" aria-hidden="true">→</span>
    <a href="/code/react/use-effect" class="reading-list__link">useEffect — side effects, subscriptions, and cleanup</a>
  </li>
  <li class="reading-list__item">
    <span class="reading-list__arrow" aria-hidden="true">→</span>
    <a href="/code/react/use-state" class="reading-list__link">useState — local component state management</a>
  </li>
</ul>
