---
domain: code
section: design-patterns
chapter: challenges
title: "Decorator Pattern Challenge"
order: 5
description: "Layer cross-cutting behavior onto a base function by wrapping it — without editing the core or duplicating boilerplate."
chapterLabel: "Challenges"
---

# Decorator Pattern — Code Challenges

---

## Challenge 1 — The Copy-Pasted Wrapper

### The Code

Two data-loading functions each log what they're doing and record how long it takes.

```javascript
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function loadUser(id) {
  console.log(`[load] user ${id}`);
  const start = Date.now();
  await delay(20); // simulate network
  const result = { id, name: `User ${id}` };
  console.log(`[done] user ${id} — ${Date.now() - start}ms`);
  return result;
}

async function loadProduct(id) {
  console.log(`[load] product ${id}`);
  const start = Date.now();
  await delay(15); // simulate network
  const result = { id, name: `Product ${id}`, price: id * 10 };
  console.log(`[done] product ${id} — ${Date.now() - start}ms`);
  return result;
}

// Test it
loadUser(1).then(console.log);
loadProduct(42).then(console.log);
```

### What's Wrong

The logging and timing code is identical in both functions — it's been copied word for word. Adding a third loader (`loadOrder`) means copying it again. Changing the log format means updating every function.

Three problems:

1. **Duplicated boilerplate** — the `console.log` + `Date.now()` pattern is repeated verbatim; one change breaks the assumption that all loaders behave consistently
2. **Mixed concerns** — each function handles both its own domain work *and* the timing/logging cross-cut; neither concern can evolve independently
3. **Can't toggle observability** — removing logging in tests means editing every function, or adding conditional flags to each one

### Your Task

Refactor so that:

- `loadUser` and `loadProduct` contain only their core logic — no logging, no timing
- A `withLogging(fn, label)` decorator wraps any async function and adds the log + timing behavior
- The decorated functions have the same call signature as the originals

Target interface:

```javascript
async function loadUser(id) {
  await delay(20);
  return { id, name: `User ${id}` };
}

async function loadProduct(id) {
  await delay(15);
  return { id, name: `Product ${id}`, price: id * 10 };
}

const trackedLoadUser    = withLogging(loadUser, "user");
const trackedLoadProduct = withLogging(loadProduct, "product");

trackedLoadUser(1).then(console.log);
// [load] user 1
// [done] user 1 — 21ms
// { id: 1, name: 'User 1' }
```

---

### Hints

<details>
<summary>#1 — What belongs in the wrapper vs the base</summary>

The base functions should only know how to load their data. The log lines and timer are the same regardless of *what* is being loaded — they are a concern that belongs around the call, not inside it.

A decorator is a function that takes the original function as an argument and returns a new function with the same signature. The new function runs the extra behavior before and after calling the original.

Think of it as: the decorator is the `[load]` / `[done]` wrapper; the original function is the thing being wrapped.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function withLogging(fn, label) {
  return async function(...args) {    // same signature as fn
    console.log(`[load] ${label} ${args[0]}`);
    const start = Date.now();

    const result = await fn(...args); // delegate to the original

    console.log(`[done] ${label} ${args[0]} — ${Date.now() - start}ms`);
    return result;                    // same return type as fn
  };
}
```

The returned function spreads `...args` to match whatever signature `fn` has. This keeps the decorator generic — it works around `loadUser(id)`, `loadProduct(id)`, or any other single-argument loader.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function withLogging(fn, label):
  return async function(...args):
    log "[load] label args[0]"
    start = Date.now()

    result = await fn(...args)     ← delegate — same as calling the original

    log "[done] label args[0] — elapsed ms"
    return result                  ← transparent: same value as fn returns

// Strip the base functions back to core logic:
async function loadUser(id):
  await delay(20)
  return { id, name: "User id" }

async function loadProduct(id):
  await delay(15)
  return { id, name: "Product id", price: id * 10 }

// Decorate at setup time, not inside the function:
const trackedLoadUser    = withLogging(loadUser, "user")
const trackedLoadProduct = withLogging(loadProduct, "product")
```

The key property: `trackedLoadUser(1)` behaves identically to `loadUser(1)` from the caller's perspective — same return shape, same arguments, just with logging added around it.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// Base functions — core logic only
async function loadUser(id) {
  await delay(20);
  return { id, name: `User ${id}` };
}

async function loadProduct(id) {
  await delay(15);
  return { id, name: `Product ${id}`, price: id * 10 };
}

// Decorator
function withLogging(fn, label) {
  return async function (...args) {
    console.log(`[load] ${label} ${args[0]}`);
    const start = Date.now();
    const result = await fn(...args);
    console.log(`[done] ${label} ${args[0]} — ${Date.now() - start}ms`);
    return result;
  };
}

// Compose
const trackedLoadUser    = withLogging(loadUser, "user");
const trackedLoadProduct = withLogging(loadProduct, "product");

// --- Verify ---
trackedLoadUser(1).then(console.log);
// [load] user 1
// [done] user 1 — ~20ms
// { id: 1, name: 'User 1' }

trackedLoadProduct(42).then(console.log);
// [load] product 42
// [done] product 42 — ~15ms
// { id: 42, name: 'Product 42', price: 420 }

// In tests — use the unwrapped base, no logging needed:
loadUser(99).then(console.log); // { id: 99, name: 'User 99' }
```

**What changed:**

- `loadUser` and `loadProduct` are five lines each — pure domain logic
- `withLogging` can wrap any async function that takes an id; one change updates all loaders
- Tests use the base functions directly; observability is opt-in at composition time

**Concepts at work:** `withLogging` is a **higher-order function** acting as a Decorator — it takes a function and returns a new function with the same signature. The returned wrapper is **transparent**: callers cannot tell they are calling the decorated version. This is the **single responsibility principle** in action: the base function owns data loading; the decorator owns observability. The two concerns can now change independently.

</details>

---

## Challenge 2 — The Baked-In Everything

### The Code

A single function fetches data, logs it, and retries on failure. All three concerns live in one body.

```javascript
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// Simulates a flaky network call — fails the first two attempts
let attempts = 0;
async function fetchData(url) {
  attempts += 1;
  if (attempts < 3) throw new Error(`network error (attempt ${attempts})`);
  return { url, data: "payload", fetchedAt: Date.now() };
}

async function loadWithRetryAndLogging(url) {
  console.log(`[fetch] ${url}`);
  const start = Date.now();
  let lastError;

  for (let i = 0; i < 3; i++) {
    try {
      const result = await fetchData(url);
      console.log(`[ok] ${url} — ${Date.now() - start}ms`);
      return result;
    } catch (e) {
      lastError = e;
      console.warn(`[retry] attempt ${i + 1} failed: ${e.message}`);
      if (i < 2) await delay(50);
    }
  }

  throw lastError;
}

loadWithRetryAndLogging("/api/data").then(console.log);
```

### What's Wrong

The retry logic and the logging are welded together in one function. You cannot:

- Use retry without logging (for silent background syncs)
- Use logging without retry (for one-shot calls that should fail fast)
- Test retry logic by itself — you have to read through the logging code to find it
- Reorder them — retry currently wraps logging; reversing that requires a rewrite

Three problems:

1. **Tangled concerns** — logging and retry have nothing to say to each other, but they share a body and can't be untangled without a rewrite
2. **No composability** — you cannot stack "just logging" or "just retry" on other functions; the combination is hardcoded
3. **Order is implicit** — it is not obvious whether logging wraps retry or vice versa; in this code logging sees the first attempt start but retry sees the final result

### Your Task

Refactor into two independent decorators that can be stacked in any order:

- `withRetry(fn, { attempts, delayMs })` — retries `fn` on failure, transparent on success
- `withLogging(fn, label)` — logs before and after the call (reuse the decorator from Challenge 1 or write a variant)
- Compose them: `withLogging(withRetry(fetchData, { attempts: 3, delayMs: 50 }), "fetch")`
- The base `fetchData` function contains only the fetch logic

Target interface:

```javascript
const loadData = withLogging(
  withRetry(fetchData, { attempts: 3, delayMs: 50 }),
  "fetch"
);

loadData("/api/data").then(console.log);
// [load] fetch /api/data
// [done] fetch /api/data — ~100ms
// { url: '/api/data', data: 'payload', ... }
```

---

### Hints

<details>
<summary>#1 — How to read the stack</summary>

`withLogging(withRetry(fetchData, ...))` builds from the inside out:

1. `fetchData` is the core — does the actual work
2. `withRetry(fetchData, ...)` wraps it — retries on failure, transparent on success
3. `withLogging(..., "fetch")` wraps that — logs before the first call, after the final result

When `loadData("/api/data")` is called: logging starts the timer → retry loop begins → `fetchData` is called up to 3 times → retry resolves → logging records elapsed time → result returns to caller.

Each decorator only knows about its immediate inner. `withLogging` does not know retry is inside it.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function withRetry(fn, { attempts = 3, delayMs = 100 } = {}) {
  return async function (...args) {
    let lastError;
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn(...args);   // success: return immediately
      } catch (e) {
        lastError = e;
        if (i < attempts - 1) await delay(delayMs);
      }
    }
    throw lastError;                // all attempts exhausted
  };
}

function withLogging(fn, label) {
  return async function (...args) {
    console.log(`[load] ${label} ${args[0]}`);
    const start = Date.now();
    const result = await fn(...args);
    console.log(`[done] ${label} ${args[0]} — ${Date.now() - start}ms`);
    return result;
  };
}
```

Note: `withLogging` here wraps the retry-wrapped function. It fires once per call — not once per attempt. The retry loop is inside and invisible to the logger.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function withRetry(fn, { attempts, delayMs }):
  return async function(...args):
    lastError = null
    for i from 0 to attempts - 1:
      try:
        return await fn(...args)       ← success exits immediately
      catch e:
        lastError = e
        if not last attempt → await delay(delayMs)
    throw lastError                    ← only reached if all attempts fail

function withLogging(fn, label):
  return async function(...args):
    log "[load] label args[0]"
    start = now
    result = await fn(...args)         ← fn here is the retrying wrapper
    log "[done] label args[0] — elapsed"
    return result

// Compose:
const retrying   = withRetry(fetchData, { attempts: 3, delayMs: 50 })
const loadData   = withLogging(retrying, "fetch")

// Call:
loadData("/api/data")
  → withLogging fires "[load]"
  → withRetry loop starts
  → fetchData called (may fail and retry)
  → withRetry resolves
  → withLogging fires "[done]"
  → caller receives result
```

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// Base — core logic only; no logging, no retry
let attempts = 0;
async function fetchData(url) {
  attempts += 1;
  if (attempts < 3) throw new Error(`network error (attempt ${attempts})`);
  return { url, data: "payload", fetchedAt: Date.now() };
}

// Decorator 1 — retry
function withRetry(fn, { attempts: maxAttempts = 3, delayMs = 100 } = {}) {
  return async function (...args) {
    let lastError;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        return await fn(...args);
      } catch (e) {
        lastError = e;
        if (i < maxAttempts - 1) await delay(delayMs);
      }
    }
    throw lastError;
  };
}

// Decorator 2 — logging
function withLogging(fn, label) {
  return async function (...args) {
    console.log(`[load] ${label} ${args[0]}`);
    const start = Date.now();
    const result = await fn(...args);
    console.log(`[done] ${label} ${args[0]} — ${Date.now() - start}ms`);
    return result;
  };
}

// Compose: logging wraps retry wraps fetchData
const loadData = withLogging(
  withRetry(fetchData, { attempts: 3, delayMs: 50 }),
  "fetch"
);

// --- Verify ---
loadData("/api/data").then(result => {
  console.log(result);
});
// [load] fetch /api/data
// [done] fetch /api/data — ~100ms
// { url: '/api/data', data: 'payload', fetchedAt: ... }

// Try logging without retry:
attempts = 0; // reset
const loggedOnly = withLogging(fetchData, "raw");
loggedOnly("/api/test").catch(e => console.log("failed:", e.message));
// [load] raw /api/test
// (throws — no retry)

// Try retry without logging:
attempts = 0;
const retryOnly = withRetry(fetchData, { attempts: 3, delayMs: 10 });
retryOnly("/api/silent").then(r => console.log("silent success:", r.url));
// (no log output)
```

**What changed:**

- `fetchData` is three lines — no retry loop, no log calls
- `withRetry` and `withLogging` are independent — each can be used alone or composed in any order
- The composition line makes the stack explicit: logging is outermost, retry is middle, `fetchData` is core

**Concepts at work:** Each decorator is **transparent** — it accepts and returns the same function signature `(url) => Promise`. This is what makes them stackable in any order without callers knowing. The pattern enforces **single responsibility** at the decorator level: `withRetry` knows nothing about logging; `withLogging` knows nothing about retry. The composition `withLogging(withRetry(base))` is also a small application of the **open/closed principle** — adding caching or auth means wrapping again, not editing either existing decorator.

</details>

---

## When Not to Use the Decorator Pattern

Wrapping adds a layer every time it's applied. Skip it when:

- **You own the function and can edit it.** If logging belongs permanently in `loadUser` and you wrote `loadUser`, just add the log call inside. A decorator is for cross-cutting behavior you want to apply optionally or on code you can't modify.
- **You only ever need one layer.** If `withLogging` will always be applied and nothing else will ever wrap the function, the decorator adds indirection without composability benefit. Inline the concern.
- **The wrapper changes the call signature.** If your wrapper adds a required argument that the base doesn't have, it is not a valid Decorator — callers cannot treat it as a drop-in replacement. Fix the design so the extra value comes from closure or a separate config argument.
- **You need to swap algorithms, not layer behavior.** If the goal is "use this approach instead of that one," reach for **Strategy**. Decorators stack *on top of* a base; strategies *replace* it.

The rule of thumb: if you find yourself copying the same `console.log` + `try/catch` block into multiple functions, or bolting `for` retry loops onto every call site, those are decorators waiting to be extracted.

---

## What to Take Away

Before moving on, answer these from memory:

1. What single property must every decorator preserve about its wrapped function — and what breaks if it doesn't?
2. In Challenge 2, logging wraps retry. What specifically changes about the output if you reverse the order — `withRetry(withLogging(fetchData))`?
3. Why can `loadUser` be used in tests without any special setup once logging is moved to a decorator?
4. What is the difference between Decorator and Strategy — when is wrapping the right move vs injecting a replacement?

---

*← [Decorator Pattern](/code/design-patterns/patterns/5-decorator-pattern)*
