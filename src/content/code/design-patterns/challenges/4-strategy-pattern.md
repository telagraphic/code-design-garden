---
domain: code
section: design-patterns
chapter: challenges
title: "Strategy Pattern Challenge"
order: 4
description: "Extract interchangeable algorithms from a branching context so each variant is injectable, testable, and swappable at runtime."
chapterLabel: "Challenges"
---

# Strategy Pattern — Code Challenges

---

## Challenge 1 — The Inline Sorter

### The Code

A product list can be sorted several ways. One function handles all of them.

```javascript
const products = [
  { name: "Keyboard", price: 79, rating: 4.2 },
  { name: "Monitor",  price: 349, rating: 4.7 },
  { name: "Mouse",    price: 29, rating: 4.5 },
  { name: "Webcam",   price: 89, rating: 3.9 },
];

function sortProducts(products, method) {
  if (method === "price-asc") {
    return [...products].sort((a, b) => a.price - b.price);
  } else if (method === "price-desc") {
    return [...products].sort((a, b) => b.price - a.price);
  } else if (method === "name") {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  } else if (method === "rating") {
    return [...products].sort((a, b) => b.rating - a.rating);
  }
  return products;
}

console.log(sortProducts(products, "price-asc").map(p => p.name));
// [ 'Mouse', 'Keyboard', 'Webcam', 'Monitor' ]
```

### What's Wrong

Run this and ask: what happens when product adds a "newest" sort or a "relevance" sort for search results?

You open `sortProducts` and add another `else if`. Then you test it by calling `sortProducts` with every method string. Then a second page that also sorts products copy-pastes the same function — or imports this one and you can never change its signature.

Three problems:

1. **The Context owns all algorithms** — `sortProducts` both decides which sort runs *and* implements every sort; the function grows with every new method
2. **Methods are stringly typed** — `"price-asc"` is an opaque string; a typo silently returns unsorted results with no error
3. **Untestable in isolation** — to test the price comparator you must call the whole routing function; you can't hand it a fake comparator for experiment

### Your Task

Refactor so that:

- Each sort is a **strategy** — a plain comparator function `(a, b) => number`
- `sortProducts(products, strategy)` takes a strategy directly — no string, no branch
- A strategies object or map holds the named sorts; callers pick from it
- Unknown strategies are caught at selection time, not silently at sort time

Target interface:

```javascript
const strategies = {
  priceAsc:  (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  name:      (a, b) => a.name.localeCompare(b.name),
  rating:    (a, b) => b.rating - a.rating,
};

// sortProducts only knows how to sort — not which strategy to pick
console.log(sortProducts(products, strategies.priceAsc).map(p => p.name));
// [ 'Mouse', 'Keyboard', 'Webcam', 'Monitor' ]

// Adding "newest" is one new entry in strategies — sortProducts stays unchanged
```

---

### Hints

<details>
<summary>#1 — What to pull out of the function</summary>

The comparator functions inside each `if` branch are the strategies — they are the part that changes. The act of calling `[...products].sort(comparator)` is the Context behaviour that stays the same every time.

Once you see that, the refactor is: pull each comparator out of the branch and give it a name. The function becomes one line: `[...products].sort(strategy)`. The caller decides which comparator to pass.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
// Strategies live outside the context — each is just a comparator
const strategies = {
  priceAsc:  (a, b) => ___,
  priceDesc: (a, b) => ___,
  name:      (a, b) => ___,
  rating:    (a, b) => ___,
};

// Context: receives a strategy, executes it — no branching
function sortProducts(products, strategy) {
  return [...products].sort(strategy);
}
```

The caller selects: `sortProducts(products, strategies.rating)`. No string, no `if`. To add `newest`, add one key to `strategies`.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
const strategies = {
  priceAsc:  comparator that sorts by price ascending
  priceDesc: comparator that sorts by price descending
  name:      comparator that sorts by name alphabetically
  rating:    comparator that sorts by rating descending
}

function sortProducts(products, strategy):
  return [...products].sort(strategy)   ← spread avoids mutating the original

// Selection:
const sorted = sortProducts(products, strategies.priceAsc)

// If you want a guard for invalid strategies:
function getStrategy(key):
  if strategies[key] doesn't exist → throw RangeError("unknown sort: {key}")
  return strategies[key]
```

The guard lives in a `getStrategy` helper — not inside `sortProducts`. The context stays unaware of which strategies exist.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
const products = [
  { name: "Keyboard", price: 79, rating: 4.2 },
  { name: "Monitor",  price: 349, rating: 4.7 },
  { name: "Mouse",    price: 29, rating: 4.5 },
  { name: "Webcam",   price: 89, rating: 3.9 },
];

const strategies = {
  priceAsc:  (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  name:      (a, b) => a.name.localeCompare(b.name),
  rating:    (a, b) => b.rating - a.rating,
};

function getStrategy(key) {
  const strategy = strategies[key];
  if (!strategy) throw new RangeError(`unknown sort strategy: ${key}`);
  return strategy;
}

function sortProducts(products, strategy) {
  return [...products].sort(strategy);
}

// --- Verify ---
console.log(sortProducts(products, strategies.priceAsc).map(p => p.name));
// [ 'Mouse', 'Keyboard', 'Webcam', 'Monitor' ]

console.log(sortProducts(products, strategies.rating).map(p => p.name));
// [ 'Monitor', 'Mouse', 'Keyboard', 'Webcam' ]

console.log(sortProducts(products, strategies.name).map(p => p.name));
// [ 'Keyboard', 'Monitor', 'Mouse', 'Webcam' ]

// Selection with guard:
try {
  sortProducts(products, getStrategy("newest"));
} catch (e) {
  console.log(e.message); // unknown sort strategy: newest
}

// Adding a strategy — sortProducts untouched:
strategies.pricePerRating = (a, b) => (a.price / a.rating) - (b.price / b.rating);
console.log(sortProducts(products, strategies.pricePerRating).map(p => p.name));
```

**What changed:**

- `sortProducts` has no `if` statements — it applies whatever comparator it receives
- Each comparator is a named, independently testable value
- Adding a new sort is one line in `strategies`; the context never changes

**Concepts at work:** The comparator functions are **concrete strategies** — each encapsulates one algorithm behind the same interface `(a, b) => number`. `sortProducts` is the **Context** — it knows the interface but not the implementations. This is **composition over inheritance**: behavior is assembled by passing the right strategy in, not by subclassing a `Sorter` base class. The `getStrategy` guard enforces the **strategy interface contract** at selection time rather than silently returning wrong results.

</details>

---

## Challenge 2 — The Payment Brancher

### The Code

A checkout module processes payments. Every payment provider's logic lives inside one function.

```javascript
function createCheckout() {
  return {
    pay(method, amount, details) {
      if (method === "card") {
        if (!details.token) throw new Error("card token required");
        console.log(`[stripe] charging ${amount} to token ${details.token}`);
        return { status: "success", provider: "stripe", amount };
      }
      if (method === "paypal") {
        if (!details.payerId) throw new Error("payerId required");
        console.log(`[paypal] capturing ${amount} for payer ${details.payerId}`);
        return { status: "success", provider: "paypal", amount };
      }
      if (method === "bank") {
        if (!details.iban) throw new Error("IBAN required");
        console.log(`[bank] transferring ${amount} to ${details.iban}`);
        return { status: "pending", provider: "ach", amount };
      }
      throw new RangeError(`unknown method: ${method}`);
    },
  };
}

const checkout = createCheckout();
checkout.pay("card", 4999, { token: "tok_visa" });
checkout.pay("paypal", 1200, { payerId: "buyer-7" });
```

### What's Wrong

Every time a provider is added or changed — new validation rule, different status shape, extra log field — you open `pay()` and edit it. There are now three reasons to change one function. And there is no way to test card logic without also running through the PayPal and bank branches.

Three problems:

1. **Mixed provider knowledge** — the Context (`pay`) knows Stripe's token format, PayPal's `payerId`, and IBAN validation — it should know none of them
2. **No runtime swap** — a user changing from card to PayPal mid-session has no clean path; the method string is re-evaluated on every call
3. **Untestable per provider** — to unit-test PayPal timeout handling you must wire the full `createCheckout` and hit the PayPal branch

### Your Task

Refactor into a Context that holds an injected strategy and delegates:

- Each provider is a strategy object with a `charge(amount, details)` method
- `createCheckout(strategy)` stores the strategy and calls `strategy.charge` in `pay`
- `setStrategy(next)` swaps the strategy at runtime — no re-instantiation needed
- Provider validation and logging live inside each strategy, not in the Context

Target interface:

```javascript
const cardStrategy = {
  charge(amount, details) { ... }  // validates token, logs, returns receipt
};

const paypalStrategy = {
  charge(amount, details) { ... }
};

const checkout = createCheckout(cardStrategy);
checkout.pay(4999, { token: "tok_visa" });
// [stripe] charging 4999 to token tok_visa

checkout.setStrategy(paypalStrategy);
checkout.pay(1200, { payerId: "buyer-7" });
// [paypal] capturing 1200 for payer buyer-7
```

---

### Hints

<details>
<summary>#1 — Where the boundary goes</summary>

Draw a line between "I know we're taking a payment" and "I know how this provider works." Everything before that line belongs in the Context; everything after belongs in a strategy.

The Context (`createCheckout`) should only know: call `strategy.charge(amount, details)` and return the result. It should not know what `details` looks like, what to log, or what status strings each provider returns.

Each strategy becomes a small object that knows its own provider shape and wraps it behind `charge`.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
// Strategies: each knows its own provider
const cardStrategy = {
  charge(amount, details) {
    if (!details.token) throw new Error("card token required");
    console.log(`[stripe] charging ${amount} to token ${details.token}`);
    return { status: "success", provider: "stripe", amount };
  },
};

const paypalStrategy = { charge(amount, details) { /* ... */ } };
const bankStrategy   = { charge(amount, details) { /* ... */ } };

// Context: holds the active strategy and delegates
function createCheckout(initialStrategy) {
  let strategy = initialStrategy;
  return {
    pay(amount, details) {
      return strategy.charge(amount, details);
    },
    setStrategy(next) {
      strategy = next;
    },
  };
}
```

The Context `pay` method is now two lines — no knowledge of any provider.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
cardStrategy = {
  charge(amount, details):
    if no details.token → throw Error
    log "[stripe] charging amount to token"
    return { status: "success", provider: "stripe", amount }
}

paypalStrategy = {
  charge(amount, details):
    if no details.payerId → throw Error
    log "[paypal] capturing amount for payerId"
    return { status: "success", provider: "paypal", amount }
}

bankStrategy = {
  charge(amount, details):
    if no details.iban → throw Error
    log "[bank] transferring amount to iban"
    return { status: "pending", provider: "ach", amount }
}

function createCheckout(initialStrategy):
  let strategy = initialStrategy

  return {
    pay(amount, details):
      return strategy.charge(amount, details)    ← pure delegation

    setStrategy(next):
      strategy = next
  }
```

Every provider concern is isolated inside its own object. The Context has no `if` statements at all.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
const cardStrategy = {
  charge(amount, details) {
    if (!details.token) throw new Error("card token required");
    console.log(`[stripe] charging ${amount} to token ${details.token}`);
    return { status: "success", provider: "stripe", amount };
  },
};

const paypalStrategy = {
  charge(amount, details) {
    if (!details.payerId) throw new Error("payerId required");
    console.log(`[paypal] capturing ${amount} for payer ${details.payerId}`);
    return { status: "success", provider: "paypal", amount };
  },
};

const bankStrategy = {
  charge(amount, details) {
    if (!details.iban) throw new Error("IBAN required");
    console.log(`[bank] transferring ${amount} to ${details.iban}`);
    return { status: "pending", provider: "ach", amount };
  },
};

function createCheckout(initialStrategy) {
  let strategy = initialStrategy;
  return {
    pay(amount, details) {
      return strategy.charge(amount, details);
    },
    setStrategy(next) {
      strategy = next;
    },
  };
}

// --- Verify ---
const checkout = createCheckout(cardStrategy);

console.log(checkout.pay(4999, { token: "tok_visa" }));
// [stripe] charging 4999 to token tok_visa
// { status: 'success', provider: 'stripe', amount: 4999 }

checkout.setStrategy(paypalStrategy);
console.log(checkout.pay(1200, { payerId: "buyer-7" }));
// [paypal] capturing 1200 for payer buyer-7

// Validation lives in the strategy:
try {
  checkout.setStrategy(cardStrategy);
  checkout.pay(500, { payerId: "oops" }); // wrong details for card
} catch (e) {
  console.log(e.message); // card token required
}

// Test double — no provider needed:
const fakeStrategy = {
  charge(amount) {
    return { status: "success", provider: "test", amount };
  },
};
const testCheckout = createCheckout(fakeStrategy);
console.log(testCheckout.pay(100, {})); // { status: 'success', provider: 'test', amount: 100 }
```

**What changed:**

- `pay()` in the Context is two lines — one call, one return
- Each provider's validation, logging, and status shape lives in its own strategy object
- `setStrategy` swaps the active provider without rebuilding the checkout; a test double is one object literal

**Concepts at work:** The Context (`createCheckout`) depends on the **strategy interface** — `charge(amount, details)` — not on any concrete provider. Each provider object is a **concrete strategy** that encapsulates its own logic behind that shared method name. `setStrategy` demonstrates **runtime algorithm swap** — the same checkout instance changes behavior without branching. This is also **dependency injection**: the test double in the verify block works because the Context never reached for a global provider by name.

</details>

---

## When Not to Use the Strategy Pattern

Strategy earns its place when the algorithm varies and the Context stays stable. Skip it when:

- **There is only one algorithm.** If `sortProducts` will always sort by price, a strategy layer adds indirection with nothing to swap.
- **The branches differ by a single value, not logic.** Two sort directions that differ only by `-1` vs `1` are better expressed as one comparator with a `direction` argument — not two strategy objects.
- **Strategies share 90% of their code.** If card and PayPal differ only in one API endpoint, extract the shared pipeline and pass the endpoint as config. Strategy is for diverging *workflows*, not diverging constants.
- **You need to construct the strategy from a string key.** That construction belongs in a **Factory** — the Factory selects the strategy; the Context only calls it.

The rule of thumb: if a function has a `switch` or `if/else` chain where each branch implements a meaningfully different version of the same operation, those branches are strategies waiting to be extracted.

---

## What to Take Away

Before moving on, answer these from memory:

1. In Challenge 1, what does `sortProducts` need to know about the comparator it receives — and what specifically does it *not* need to know?
2. In Challenge 2, what is the exact line in the original `pay()` function that signals the Strategy pattern is needed?
3. Why does a test double (a fake strategy object) work without mocking `fetch` or any global — what property of the pattern enables that?
4. What is the difference between Strategy and Factory — when would you use both together?

---

*← [Strategy Pattern](/code/design-patterns/patterns/4-strategy-pattern)*
