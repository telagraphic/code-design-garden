---
domain: code
section: design-patterns
chapter: patterns
title: "Module Pattern"
order: 1
description: "Encapsulate related code behind a public API while hiding private state."
chapterLabel: "Patterns"
---

# Module Pattern

> A closure or file boundary that keeps private variables and helpers hidden while exposing only the operations callers need.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Structural |
| Participants | Private state, private helpers, public API (exports or returned object) |
| Pairs well with | Observer (notify on change), Facade (one entry over many modules) |
| Don't pair with | Singleton-by-default for every file — use only when one instance is required |
| Use cases | Coordinate shared mutable state behind one API; split a god file into domain-owned units; hide validation and storage from callers |
| Maintenance cost | Low when boundaries match domain language; high when modules become junk drawers |

## Basic Code

A factory returns an object whose methods close over private `count`. Callers get `increment` and `get` — not direct access to the variable — which is the encapsulation contract in eight lines.

```javascript
function createCounter() {
  let count = 0;
  return {
    increment() { count += 1; return count; },
    get() { return count; },
  };
}

const counter = createCounter();
counter.increment();
counter.get(); // 1 — count is not accessible from outside
```

## How it works

The Module pattern has three roles: **private state** (variables only inner functions see), **private functions** (helpers callers never touch), and a **public API** (the object or named exports the rest of the app uses).

```
┌─────────────────────────────────────┐
│  Module boundary (file or IIFE)     │
│  ┌─────────────┐  ┌──────────────┐  │
│  │ private     │  │ private      │  │
│  │ state       │──│ helpers      │  │
│  └──────┬──────┘  └──────────────┘  │
│         │ only inner code can touch │
│         ▼                           │
│  ┌─────────────────────────────┐    │
│  │ public API (return / export)│──────► callers
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Classic (IIFE / factory):** An immediately invoked function expression runs once. Variables declared with `const` / `let` inside the function are private. The IIFE `return`s an object with methods that close over that state. Each call to a factory function creates a **new** module instance with its own private heap.

**ES modules:** The bundler or runtime enforces the boundary. Bindings without `export` are private to the file. Named and default exports form the public API. Unlike an IIFE, the module body evaluates once per module graph node; importers share that single module instance.

**Lifecycle:** Create the module once (IIFE runs, or `import` loads the file). Callers invoke public methods; those methods read and write private state. Teardown — clearing listeners, aborting fetches — belongs on the public API (`destroy()`, `reset()`) if callers need it; otherwise private state dies when the page unloads.

**Paradigms involved:** Encapsulation (hide representation), information hiding (callers depend on behavior, not data shape), and single ownership (one module owns one concern’s mutable heap).

## Metaphor

**Bank teller window.** Customers never enter the vault — they hand requests to a teller who follows bank rules (validate, record, dispense). The vault’s layout, cash stacks, and internal ledgers stay private; the teller window is the public API. `deposit()` and `withdraw()` are the teller’s allowed operations; reaching around the glass to grab bills from the vault is what exporting raw `balance` would allow.

**Restaurant kitchen.** Patrons read the menu and place orders; they do not walk into the prep line or adjust the recipe book. The kitchen owns ingredients and timing; the dining room only sees dishes that pass the pass-through window. A Module is that pass-through: one bounded kitchen per concern (`cart.js`, `auth.js`), not one giant kitchen where every waiter edits every pot.

## Functionality

- Large scripts accumulate shared mutable state — counters, caches, DOM nodes, config flags — that every function can read and write without coordination.
- The Module pattern groups that state with the functions that operate on it, then publishes a narrow public surface. Callers use `increment()` or `getTotal()`; they never touch the raw `count` variable.
- In modern JavaScript this appears as ES modules (`export` / `import`), pre-ES6 IIFE modules, and factory functions that return a public API object — same encapsulation goal, different syntax.

## In Practice

### When to use

- Multiple functions in one file read and write the same mutable bindings.
- Callers must not bypass validation, formatting, or invariants when touching shared data.
- You are carving a god file into units that each own one domain (auth, cart, analytics).

### Use cases

| Scenario | Signal |
| -------- | ------ |
| Several functions share mutable state that must not leak globally or into unrelated files | A file declares ten `let` bindings at the top and twenty functions below that all read and write them freely |
| Stable public API (`cart.add`, `cart.total`) while validation and storage stay hidden | Tests reach into closure variables or mock globals because there is no injectable boundary |
| Splitting a monolith into units that each own one concern (auth, cart, analytics) | Two features mutate the same object because it lives on `window` or a shared `utils` bag |

```javascript
// Smell: shared mutable state at file scope, no boundary
let items = [];
function addItem(id) { items.push(id); }
function getItems() { return items; } // callers can mutate the array directly

// Fix: module owns state; only methods expose access
function createCart() {
  const items = [];
  return {
    add(id) { items.push(id); },
    list() { return [...items]; }, // copy or freeze if callers must not mutate
  };
}
```

### Anti-patterns

| Situation | Instead |
| --------- | ------- |
| Handful of pure functions with no shared state | Plain named exports — no factory or IIFE |
| Single app-wide instance, nothing meaningful to hide | Module-level `let` with one accessor — **Singleton** when lazy init matters |
| Distant parts of the app need to react to changes | **Observer** or **Pub/Sub** — Module solves encapsulation, not broadcast |

```javascript
// Anti-pattern: factory wrapping stateless helpers
function createMath() {
  return {
    add(a, b) { return a + b; },
    sub(a, b) { return a - b; },
  };
}

// Prefer: export functions directly when nothing is private or shared
export function add(a, b) { return a + b; }
export function sub(a, b) { return a - b; }
```

> **Rule of thumb:** If nothing is private and nothing is shared, export functions directly. If something must stay hidden or coordinated, use a Module.

## Applications

### Browser

**ES modules (`import` / `export`)** The language gives each file its own scope; only exported bindings cross the boundary. Importers see the public API — the same encapsulation contract as a hand-rolled factory, enforced by the module loader instead of closures.

**`#private` class fields** Instance state and methods marked `#` are unreachable outside the class body. Same intent as a Module — hide implementation — with class syntax instead of a returned object or file scope.

**Web Components (shadow DOM)** The custom element exposes attributes and methods; markup and styles inside the shadow root stay internal. UI encapsulation parallels code Modules: a narrow public surface, opaque internals.

**Service Workers** The worker runs in a separate global scope from the page. `postMessage` and event handlers form the public API; fetch caches and routing logic stay inside the worker script — a process-level Module boundary.

### UI

**Domain service files (`auth.js`, `cartService.ts`)** Each file owns one concern and exports a small API (`login`, `logout` or `cart.add`, `cart.checkout`). Feature components import the service; they do not reach into raw session tokens or cart arrays.

**Headless hooks and stores** React hooks and Zustand slices bundle private state with actions behind `useCart()` or `useStore(selector)`. Components subscribe to the public hook surface; reducer logic and draft state stay inside the module.

**Design-system token modules** Raw color scales and spacing math live in private files; components import semantic tokens (`--color-surface`, `--space-md`) only. The token module hides the full palette from consumers.

## Trade-offs

| Pro | Con |
| --- | --- |
| Callers cannot set `cart.items` to an invalid shape when only `addItem()` mutates the array | `cart.add(id)` instead of `items.push(...)` adds a hop when stepping through the debugger |
| Test the public API; private helpers stay implementation details unless exported deliberately | Private variables are still mutable — the pattern does not fix concurrency or time-travel debugging |
| One file owns cart rules; `grep "from './cart'"` lists every consumer | Five-line utilities wrapped in factories create noise without hiding anything meaningful |

**Known Issues / Pitfalls**

- **Exporting everything “for tests”** — Re-exporting private helpers defeats the pattern; test through the public API or add dedicated test hooks.
- **God modules** — One `app.js` that owns auth, cart, and routing is a Module in name only; split by domain.
- **Confusing Module with Singleton** — A module-level `let instance` is one shared instance; that is separate from whether state is private.

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Revealing Module | Builds the public API object explicitly at the end of an IIFE; same encapsulation, more visible surface construction. |
| Singleton | One instance app-wide; often implemented inside a Module that refuses to create a second instance. |
| Facade | Simplifies a complex subsystem for clients; a Module may be a Facade when it wraps several internal modules behind one API. |
| Observer | Notifies listeners when state changes; pairs well when Module state must drive UI updates. |

## Code Examples

### Basic

A factory function returns a public API object. `balance` and `validateAmount` stay inside the closure; only `deposit`, `withdraw`, and `getBalance` are visible.

```javascript
function createAccount(initialBalance = 0) {
  let balance = initialBalance;

  function validateAmount(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new RangeError("amount must be a positive number");
    }
  }

  return {
    deposit(amount) {
      validateAmount(amount);
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      validateAmount(amount);
      if (amount > balance) throw new RangeError("insufficient funds");
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}

const checking = createAccount(100);
checking.deposit(50);
checking.withdraw(30);
console.log(checking.getBalance()); // 120
// checking.balance — undefined (private)
```

**What to notice:**

- `balance` is not on the returned object; callers cannot bypass `validateAmount`.
- Each `createAccount()` call gets its own `balance` — no shared global.

### Medium

A shopping-cart module exposes a small API. UI and checkout code import only `cart`; they never touch the internal `items` map.

```javascript
// cart.js — module boundary
const items = new Map(); // productId -> quantity

function lineTotal(productId, unitPrice) {
  return (items.get(productId) ?? 0) * unitPrice;
}

export const cart = {
  add(productId, qty = 1) {
    if (!productId || qty < 1) throw new RangeError("invalid add");
    items.set(productId, (items.get(productId) ?? 0) + qty);
  },
  remove(productId) {
    items.delete(productId);
  },
  quantity(productId) {
    return items.get(productId) ?? 0;
  },
  subtotal(catalog) {
    let total = 0;
    for (const [id, qty] of items) {
      const product = catalog.get(id);
      if (!product) throw new Error(`unknown product: ${id}`);
      total += qty * product.price;
    }
    return total;
  },
  clear() {
    items.clear();
  },
};

// checkout.js — consumer
import { cart } from "./cart.js";

const catalog = new Map([
  ["sku-1", { name: "Mug", price: 12 }],
  ["sku-2", { name: "Hat", price: 24 }],
]);

cart.add("sku-1", 2);
cart.add("sku-2", 1);
console.log(cart.subtotal(catalog)); // 48
```

**What to notice:**

- `items` is not exported; consumers cannot desynchronize quantity from business rules.
- `subtotal` takes `catalog` as an argument — the cart does not hard-code product data (easier to test).

### Advanced

**Module + Observer:** A settings module owns private state and notifies subscribers when theme or locale changes. UI modules subscribe; they do not read raw settings objects.

```javascript
function createSettingsStore(initial = { theme: "light", locale: "en" }) {
  let state = { ...initial };
  const listeners = new Set();

  function notify() {
    for (const listener of listeners) {
      listener(state);
    }
  }

  return {
    getSnapshot() {
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setTheme(theme) {
      if (theme !== "light" && theme !== "dark") {
        throw new RangeError("theme must be light or dark");
      }
      if (state.theme === theme) return;
      state = { ...state, theme };
      notify();
    },
    setLocale(locale) {
      if (!/^[a-z]{2}$/i.test(locale)) {
        throw new RangeError("locale must be a two-letter code");
      }
      if (state.locale === locale) return;
      state = { ...state, locale };
      notify();
    },
  };
}

const settings = createSettingsStore();

function mountThemeToggle(button) {
  function render() {
    const { theme } = settings.getSnapshot();
    button.textContent = theme === "light" ? "Dark mode" : "Light mode";
    document.documentElement.dataset.theme = theme;
  }
  button.addEventListener("click", () => {
    const next = settings.getSnapshot().theme === "light" ? "dark" : "light";
    settings.setTheme(next);
  });
  return settings.subscribe(render);
}
```

**What to notice:**

- Encapsulation (Module) and broadcast (Observer) are separate: `state` and `listeners` stay private; `subscribe` is the only way in.
- `getSnapshot` returns the current object reference; consumers treat it as read-only during render (same discipline as `useSyncExternalStore`).

## Further Reading

- [JavaScript Modules — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Module pattern — patterns.dev](https://www.patterns.dev/vanilla/module-pattern)
- [Revealing Module Pattern — Learning JS Design Patterns (Addy Osmani)](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)

## Self-check questions

Test your understanding:

1. Why does `createAccount()` return methods instead of exporting `balance` directly — what bug class does that prevent?
2. When would you choose a factory Module (new instance per call) over a single ES module with module-level state?
3. Your Module exposes `subscribe` but never calls `unsubscribe` in docs — what breaks in a long-lived SPA?
