---
domain: code
section: design-patterns
chapter: challenges
title: "Module Pattern Challenge"
order: 1
description: "Refactor exposed global state into an encapsulated module with a clean public API."
chapterLabel: "Challenges"
---

# Module Pattern — Code Challenges


---

## Challenge 1 — The Leaky Counter

### The Code

Paste this into your REPL and call a few functions.

```javascript
let count = 0;
let step = 1;

function increment() { count += step; }
function decrement() { count -= step; }
function setStep(n) { step = n; }
function reset() { count = 0; }
function getCount() { return count; }
```

### What's Wrong

Run these lines and observe:

```javascript
increment();
increment();
console.log(getCount()); // 2 — works fine

// But nothing prevents this:
count = 9999;
step = -500;
console.log(getCount()); // 9999 — invariants broken

// And there's no way to run two independent counters.
```

Three problems in one:

1. `count` and `step` sit in the outer scope — any code that can see them can overwrite them
2. `setStep(0)` or `setStep("fast")` silently corrupts the counter; no validation exists
3. There is no way to create a second counter without duplicating every variable by hand

### Your Task

Refactor this so that:

- `count` and `step` are private — not accessible from outside
- `setStep(n)` throws a `RangeError` if `n` is not a positive integer
- Each call to your factory creates an **independent** counter instance

Target interface:

```javascript
const a = createCounter();
const b = createCounter({ step: 5 });

a.increment();
a.increment();
console.log(a.getCount()); // 2
console.log(b.getCount()); // 0 — independent

b.increment();
console.log(b.getCount()); // 5

a.setStep(10);
a.increment();
console.log(a.getCount()); // 12
```

---

### Hints

<details>
<summary>#1 — What structure to reach for</summary>

The core move is **wrapping the state inside a function scope** instead of leaving it floating at the top level. A function's local variables cannot be read or written from outside it.

Write a factory function (`createCounter`) that:
1. Declares `count` and `step` as local variables inside it
2. Returns an **object** whose methods close over those variables

The returned object is your public API. Callers get the methods — they can never touch the raw variables directly.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createCounter(options) {
  // private state — lives only inside this function
  let count = ___
  let _step = ___

  return {
    increment()  { ... },
    decrement()  { ... },
    setStep(n)   { /* validate n, then assign */ },
    reset()      { ... },
    getCount()   { ... },
  };
}
```

For `setStep`, ask: what makes a valid step? What should you throw if the value is bad?

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```javascript
function createCounter({ step = 1 } = {}) {
  let count = 0
  let _step = step     // private, different name avoids shadowing the param

  function validateStep(n):
    if n is not a positive integer → throw RangeError("step must be a positive integer")

  validateStep(_step)  // catch a bad initial step too

  return {
    increment()   → count += _step
    decrement()   → count -= _step
    setStep(n)    → validateStep(n), then _step = n
    reset()       → count = 0
    getCount()    → return count
  }
}
```

The key: `count` and `_step` are **not properties on the returned object**. They live only inside the function scope — callers can't reach them.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createCounter({ step = 1 } = {}) {
  let count = 0;
  let _step = step;

  function validateStep(n) {
    if (!Number.isInteger(n) || n < 1) {
      throw new RangeError(`step must be a positive integer, got: ${n}`);
    }
  }

  validateStep(_step);

  return {
    increment() { count += _step; },
    decrement() { count -= _step; },
    setStep(n) {
      validateStep(n);
      _step = n;
    },
    reset() { count = 0; },
    getCount() { return count; },
  };
}

// --- Verify ---
const a = createCounter();
const b = createCounter({ step: 5 });

a.increment();
a.increment();
console.log(a.getCount()); // 2
console.log(b.getCount()); // 0

b.increment();
console.log(b.getCount()); // 5

a.setStep(10);
a.increment();
console.log(a.getCount()); // 12

// Validation fires:
try { a.setStep(0); } catch (e) { console.log(e.message); }
// "step must be a positive integer, got: 0"

// Direct mutation is gone:
console.log(a.count);  // undefined
console.log(a._step);  // undefined
```

**What changed:**

- `count` and `_step` are local to `createCounter` — they never appear on the returned object
- `validateStep` is also private — an internal detail callers don't see
- Every `createCounter()` call produces its own independent closure with its own state

**Concepts at work:** The mechanism is a **closure** — inner functions retain access to variables in the outer scope even after that scope has returned. This is what makes encapsulation possible without a class. The factory pattern (returning a new object per call) gives you independent instances, each with their own private heap.

</details>

---

## Challenge 2 — The Broken Cart

### The Code

This cart works at first glance, but it has a structural flaw. Paste it in and poke at it.

```javascript
let items = [];
let discount = 0;

function addItem(name, price) {
  items.push({ name, price });
}

function removeItem(name) {
  items = items.filter(item => item.name !== name);
}

function applyDiscount(percent) {
  discount = percent;
}

function getTotal() {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal * (1 - discount / 100);
}

function getItems() {
  return items;
}
```

### What's Wrong

Run this sequence:

```javascript
addItem("Coffee", 4.50);
addItem("Muffin", 3.00);

// getItems() hands back the real array — callers can mutate it directly:
const ref = getItems();
ref.push({ name: "Freebie", price: -9999 });
console.log(getTotal()); // total is now wrong — we didn't call addItem

// No validation on discount:
applyDiscount(150);  // 150% off — total goes negative, no error
applyDiscount(-10);  // negative discount — also silently accepted
```

Two distinct problems here:

1. **Live reference leak** — `getItems()` returns the actual internal array. Anything holding that reference can silently corrupt cart state
2. **No input validation** — `applyDiscount` and `addItem` accept any value without checking

### Your Task

Refactor this as a module factory (`createCart`):

- `items` and `discount` are private
- `getItems()` returns a **copy** of the array, not the live reference
- `applyDiscount(pct)` throws a `RangeError` if `pct` is not a number between 0 and 100
- `addItem(name, price)` throws a `RangeError` if `price` is not a positive number
- Each `createCart()` call is an independent cart

Target interface:

```javascript
const cart = createCart();

cart.addItem("Coffee", 4.50);
cart.addItem("Muffin", 3.00);
console.log(cart.getTotal()); // 7.5

cart.applyDiscount(10);
console.log(cart.getTotal()); // 6.75

// Snapshot doesn't affect internal state:
const snapshot = cart.getItems();
snapshot.push({ name: "Freebie", price: -9999 });
console.log(cart.getTotal()); // still 6.75

// Validation:
try { cart.applyDiscount(150); } catch(e) { console.log(e.message); }
try { cart.addItem("Bad", -1); }  catch(e) { console.log(e.message); }
```

---

### Hints

<details>
<summary>#1 — Two problems, two fixes</summary>

**Problem 1 — Encapsulation:** Same move as Challenge 1. Declare `items` and `discount` inside a factory function, return an object whose methods close over them. Callers only get the methods.

**Problem 2 — Live reference:** `getItems()` currently returns the internal array directly. Return a copy instead — `[...items]` creates a new array with the same contents. External mutations to that copy won't reach the private array.

The validation guards are just a check-and-throw at the top of `addItem` and `applyDiscount` before any state is touched.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createCart() {
  const items = [];   // const: the array isn't replaced, only mutated
  let discount = 0;

  return {
    addItem(name, price)    { /* validate price, then items.push(...) */ },
    removeItem(name)        { /* remove matching item in-place */ },
    applyDiscount(pct)      { /* validate 0–100, then discount = pct */ },
    getTotal()              { /* reduce + apply discount */ },
    getItems()              { /* return [...items] */ },
  };
}
```

`items` is `const` because you never reassign the array reference — you push into it and splice from it. `discount` is `let` because you reassign its value.

For `removeItem`: you can't do `items = items.filter(...)` with `const`. What array method mutates in place?

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createCart() {
  const items = []
  let discount = 0

  return {
    addItem(name, price):
      if price is not a positive number → throw RangeError
      items.push({ name, price })

    removeItem(name):
      find index of item with matching name
      if found → items.splice(index, 1)

    applyDiscount(pct):
      if pct < 0 or pct > 100 → throw RangeError
      discount = pct

    getTotal():
      subtotal = items.reduce((sum, item) => sum + item.price, 0)
      return subtotal * (1 - discount / 100)

    getItems():
      return [...items]   ← spread creates a new array, not a reference
  }
}
```

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createCart() {
  const items = [];
  let discount = 0;

  return {
    addItem(name, price) {
      if (typeof price !== 'number' || price <= 0) {
        throw new RangeError(`price must be a positive number, got: ${price}`);
      }
      items.push({ name, price });
    },

    removeItem(name) {
      const index = items.findIndex(item => item.name === name);
      if (index !== -1) items.splice(index, 1);
    },

    applyDiscount(pct) {
      if (typeof pct !== 'number' || pct < 0 || pct > 100) {
        throw new RangeError(`discount must be 0–100, got: ${pct}`);
      }
      discount = pct;
    },

    getTotal() {
      const subtotal = items.reduce((sum, item) => sum + item.price, 0);
      return subtotal * (1 - discount / 100);
    },

    getItems() {
      return [...items];
    },
  };
}

// --- Verify ---
const cart = createCart();

cart.addItem("Coffee", 4.50);
cart.addItem("Muffin", 3.00);
console.log(cart.getTotal()); // 7.5

cart.applyDiscount(10);
console.log(cart.getTotal()); // 6.75

const snapshot = cart.getItems();
snapshot.push({ name: "Freebie", price: -9999 });
console.log(cart.getTotal()); // 6.75 — unaffected

cart.removeItem("Coffee");
console.log(cart.getTotal()); // 2.7

try { cart.applyDiscount(150); } catch(e) { console.log(e.message); }
// "discount must be 0–100, got: 150"

try { cart.addItem("Bad", -1); } catch(e) { console.log(e.message); }
// "price must be a positive number, got: -1"
```

**What changed:**

- `items` is `const` — the reference is stable, only contents change via push/splice
- `getItems()` spreads into a new array — external mutations can't reach private state
- Both guards throw before touching state, so the cart stays consistent on bad input

**Concepts at work:** Returning `[...items]` is a **defensive copy** — a direct application of **information hiding**. Callers get a snapshot of the data, not a live reference to the internal structure. Combined with the validation guards, this establishes a **trust boundary**: everything outside the factory depends on the public API contract, not on implementation details that could change.

</details>

---

## When Not to Use the Module Pattern

Not every file needs a factory. Reach for something simpler when:

- **Nothing is private.** A group of pure utility functions with no shared state should be plain named exports — wrapping them in a factory adds a call-site hop with no benefit.
- **One shared instance is fine.** If the whole app can safely share a single state (a config object, a feature-flag map), a module-level `let` with accessor functions is enough. You don't need a factory that's only ever called once.
- **You need inheritance or shared behaviour.** When multiple types share methods and you're already reaching for `extends`, a class expresses that more clearly than a factory returning a plain object.
- **The "module" owns nothing.** If a function doesn't close over any state, it isn't using the pattern — it's just a function. Don't dress it up.

The rule of thumb: if you can delete the factory wrapper and nothing breaks, you probably should.

---

## What to Take Away

Before moving on, make sure you can answer these from memory:

1. Why does putting state inside a function prevent outside access? What is the mechanism called?
2. What's the difference between module-level `let items = []` and declaring `items` inside a factory function?
3. Why does `getItems()` return `[...items]` instead of `items` — and what bug does that prevent?
4. In Challenge 2, why is `items` declared with `const` even though items are added and removed from it?

---

*← [Module Pattern](/code/design-patterns/patterns/1-module-pattern)*
