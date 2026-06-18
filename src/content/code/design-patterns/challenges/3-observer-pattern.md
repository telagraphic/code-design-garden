---
domain: code
section: design-patterns
chapter: challenges
title: "Observer Pattern Challenge"
order: 2
description: "Replace hardcoded dependents with a subscribe/notify contract, and enforce the full listener lifecycle."
chapterLabel: "Challenges"
---

# Observer Pattern — Code Challenges


---

## Challenge 1 — The Manual Notifier

### The Code

A cart module tracks a count and notifies things that care about it. Paste it in and run a few calls.

```javascript
let cartCount = 0;

function addToCart(sku) {
  cartCount += 1;
  updateHeaderBadge(cartCount);
  updateSidebarCount(cartCount);
  syncToLocalStorage(cartCount);
  trackAnalyticsEvent("add_to_cart", sku);
}

function removeFromCart(sku) {
  cartCount -= 1;
  updateHeaderBadge(cartCount);
  updateSidebarCount(cartCount);
  syncToLocalStorage(cartCount);
  trackAnalyticsEvent("remove_from_cart", sku);
}

// Stub these so the REPL doesn't throw
function updateHeaderBadge(n) { console.log("badge:", n); }
function updateSidebarCount(n) { console.log("sidebar:", n); }
function syncToLocalStorage(n) { console.log("storage:", n); }
function trackAnalyticsEvent(event, sku) { console.log("track:", event, sku); }
```

### What's Wrong

The code works, but try adding a fifth reaction — say, a toast notification when count reaches 5. You have to edit **both** `addToCart` and `removeFromCart`. Now imagine ten reactions across three files.

Three problems:

1. Every new reaction requires editing the state owner — it violates the open/closed principle
2. `addToCart` and `removeFromCart` duplicate the full notification list — they'll drift out of sync
3. The cart module now imports or knows about every consumer; removing analytics means touching cart logic

### Your Task

Refactor this into a Subject-based design:

- `cartCount` and the `observers` registry are private
- `subscribe(fn)` registers a listener and returns an **unsubscribe function**
- `addToCart` and `removeFromCart` update state and call `notify` — they don't name their consumers
- Each observer only handles its own reaction

Target interface:

```javascript
const cart = createCartStore();

cart.subscribe((count) => console.log("badge:", count));
cart.subscribe((count) => console.log("sidebar:", count));
cart.subscribe((count) => console.log("storage:", count));

cart.addToCart("sku-1");  // badge: 1  sidebar: 1  storage: 1
cart.addToCart("sku-2");  // badge: 2  sidebar: 2  storage: 2

// Adding a new reaction later needs no changes to createCartStore:
cart.subscribe((count) => {
  if (count >= 2) console.log("toast: cart is getting full");
});
```

---

### Hints

<details>
<summary>#1 — What the structure needs to change</summary>

The state owner (`cartCount`) and the notification list need to be separated. Right now the function body is the notification list — every consumer is hardcoded inside it.

The fix: the function body should only do two things — update the count, and call a single `notify`. Consumers sign up for notifications themselves via `subscribe`. The state owner never names them.

This is the **inversion of control** move: instead of the state owner calling `updateHeaderBadge`, the badge registers itself and waits to be called.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createCartStore() {
  let count = 0;
  const observers = new Set();

  function notify() {
    // push current count to every observer
  }

  return {
    subscribe(fn) {
      // add fn to observers
      // return a function that removes it
    },
    addToCart(sku) {
      // update count
      // call notify
    },
    removeFromCart(sku) {
      // update count
      // call notify
    },
    getCount() { return count; },
  };
}
```

Using a `Set` instead of an array means the same function reference can only be registered once — no accidental duplicates.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createCartStore() {
  let count = 0
  const observers = new Set()

  function notify():
    for each observer in observers → observer(count)

  return {
    subscribe(fn):
      observers.add(fn)
      return () => observers.delete(fn)   ← unsubscribe is a closure over fn

    addToCart(sku):
      count += 1
      notify()

    removeFromCart(sku):
      count = Math.max(0, count - 1)     ← guard against negative
      notify()

    getCount():
      return count
  }
}
```

The unsubscribe function closes over `fn` — it knows exactly which entry to remove from the Set without needing an ID.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createCartStore() {
  let count = 0;
  const observers = new Set();

  function notify() {
    for (const observer of observers) observer(count);
  }

  return {
    subscribe(fn) {
      observers.add(fn);
      return () => observers.delete(fn);
    },
    addToCart(sku) {
      count += 1;
      notify();
    },
    removeFromCart(sku) {
      count = Math.max(0, count - 1);
      notify();
    },
    getCount() { return count; },
  };
}

// --- Verify ---
const cart = createCartStore();

const unsubBadge = cart.subscribe((n) => console.log("badge:", n));
cart.subscribe((n) => console.log("sidebar:", n));
cart.subscribe((n) => console.log("storage:", n));

cart.addToCart("sku-1");    // badge: 1  sidebar: 1  storage: 1
cart.addToCart("sku-2");    // badge: 2  sidebar: 2  storage: 2

// New reaction — no changes to createCartStore needed:
cart.subscribe((n) => {
  if (n >= 2) console.log("toast: cart is getting full");
});

cart.addToCart("sku-3");    // badge: 3  sidebar: 3  storage: 3  toast: cart is getting full

// Unsubscribe badge:
unsubBadge();
cart.addToCart("sku-4");    // sidebar: 4  storage: 4  toast: cart is getting full
```

**What changed:**

- `addToCart` and `removeFromCart` call one `notify` — they no longer name any consumer
- New reactions are added by calling `subscribe`, not by editing the store
- Each `subscribe` returns a teardown function — callers own their own cleanup

**Concepts at work:** This is **inversion of control** — the Subject decides *when* observers run, but not *who they are* or *what they do*. The one-to-many graph means adding a fifth observer costs one `subscribe` call, not two edits to the state owner. The `Set` ensures the same callback can't accumulate duplicate registrations accidentally.

</details>

---

## Challenge 2 — The Leaky Bus

### The Code

A stripped-down event emitter. It works as long as you never need to stop listening.

```javascript
const listeners = [];

function subscribe(fn) {
  listeners.push(fn);
}

function notify(data) {
  listeners.forEach(fn => fn(data));
}

// Usage
subscribe((data) => console.log("component A:", data));
subscribe((data) => console.log("component B:", data));

notify("hello");    // component A: hello  component B: hello
notify("world");    // component A: world  component B: world
```

### What's Wrong

Run this extended sequence and watch the listener count:

```javascript
function mountWidget() {
  subscribe((data) => console.log("widget:", data));
}

mountWidget(); // adds 1 listener
mountWidget(); // adds another — now at 3 total
mountWidget(); // now 4

notify("tick"); // widget logs three times — three copies mounted

console.log(listeners.length); // 5 — grows with every mount, never shrinks
```

Two problems:

1. **No teardown path** — `subscribe` returns nothing, so callers have no way to remove their listener. In a SPA where components mount and unmount repeatedly, every mount leaks a listener
2. **Array allows duplicates** — the same function reference can be pushed multiple times; calling it twice per notify is usually a bug

### Your Task

Refactor the emitter so that:

- `subscribe(fn)` returns an **unsubscribe function** that removes exactly that listener
- The internal store uses a `Set` so the same reference cannot be registered twice
- Calling the returned unsubscribe is the only removal mechanism — no `unsubscribe(fn)` method on the public API

Target interface:

```javascript
const bus = createEventBus();

const off = bus.subscribe((data) => console.log("listener:", data));

bus.notify("first");    // listener: first
bus.notify("second");   // listener: second

off(); // unsubscribe

bus.notify("third");    // (no output — listener is gone)
```

---

### Hints

<details>
<summary>#1 — What needs to change</summary>

Two mechanical changes:

1. Replace `const listeners = []` with `const listeners = new Set()` — a Set rejects duplicate references automatically and deletes in O(1)
2. Make `subscribe` return a function instead of `undefined` — that function is the only thing a caller needs to clean up

There is no `unsubscribe` method on the public API. The teardown function is the entire cleanup contract — callers hold it like a token and call it when they're done.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createEventBus() {
  const listeners = new Set();

  return {
    subscribe(fn) {
      listeners.add(fn);
      return ___; // what should the return value be?
    },
    notify(data) {
      // iterate and call each listener
    },
  };
}
```

For the return value: it needs to remove `fn` from the Set. Write a function that does exactly that and nothing else.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createEventBus() {
  const listeners = new Set()

  return {
    subscribe(fn):
      listeners.add(fn)
      return () => listeners.delete(fn)   ← captures fn in a closure

    notify(data):
      for each fn in listeners → fn(data)
  }
}
```

The unsubscribe closure captures `fn` by reference — it will always delete the right entry even if other listeners have been added or removed since subscribe was called.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createEventBus() {
  const listeners = new Set();

  return {
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    notify(data) {
      for (const fn of listeners) fn(data);
    },
  };
}

// --- Verify ---
const bus = createEventBus();

const offA = bus.subscribe((d) => console.log("A:", d));
const offB = bus.subscribe((d) => console.log("B:", d));

bus.notify("first");    // A: first  B: first
bus.notify("second");   // A: second  B: second

offA();
bus.notify("third");    // B: third  (A is gone)

offB();
bus.notify("fourth");   // (no output)

// Set deduplication:
const handler = (d) => console.log("once:", d);
const off1 = bus.subscribe(handler);
const off2 = bus.subscribe(handler); // same reference — Set ignores it
bus.notify("hi");       // once: hi  (only one call, not two)
off1();
```

**What changed:**

- `listeners` is now a `Set` — duplicate references are silently rejected, and `.delete` is O(1) and safe to call even if the entry is already gone
- `subscribe` returns a teardown closure — callers hold the token and call it on unmount or cleanup
- The emitter has no `unsubscribe` method; the closure is the entire contract

**Concepts at work:** The return-a-function teardown pattern is the **lifecycle contract** of the Observer pattern — every `subscribe` call is a resource allocation that must be paired with a cleanup. This is the same shape as `addEventListener`/`removeEventListener`, React's `useEffect` cleanup, and Svelte's `onDestroy`. The `Set` enforces **idempotent registration** — subscribing the same handler twice behaves as if you did it once, which prevents the double-fire bugs that arrays allow.

</details>

---

## When Not to Use the Observer Pattern

The Observer pattern adds a subscription registry and a notification loop. That overhead isn't always justified:

- **Single listener, nearby call site.** If one parent notifies one child that lives in the same function, pass a callback directly. A subscription registry for two things is ceremony without benefit.
- **Two modules that should just call each other.** If module A always reacts to module B and they're peers, a direct import and function call is clearer than a Subject both modules have to reference.
- **Everything on one global bus.** A single `eventBus.subscribe("any-event", fn)` that handles every app event has no ownership, no typing, and hard-to-trace notification chains. Use a Pub/Sub with named channels — or colocate state with a Module that exposes a narrow `subscribe`.
- **You only need the current value, not future updates.** If callers read state once at call time and don't need to react to changes, a plain getter is enough. Subscribe when reaction is the requirement.

The rule of thumb: if you find yourself editing the state owner every time a new consumer appears, that's the signal to reach for Observer. If only one consumer exists and it's obvious where it lives, pass the function.

---

## What to Take Away

Before moving on, answer these from memory:

1. What is the return value of `subscribe` and why does it need to be a function rather than an ID?
2. Why does `notify` iterate over a `Set` snapshot rather than potentially an `Array` — what problem does that solve?
3. In Challenge 1, what specifically becomes easier when you add a fifth reaction after the refactor? What would have been required before?
4. What happens in a SPA if a component mounts, subscribes, then unmounts — but never calls the teardown function?

---

*← [Observer Pattern](/code/design-patterns/patterns/3-observer-pattern)*
