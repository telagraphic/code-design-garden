---
domain: code
section: design-patterns
chapter: patterns
title: "Factory Pattern"
order: 2
description: "Centralize object creation behind a function or method so callers depend on an interface, not concrete constructors."
chapterLabel: "Patterns"
---

# Factory Pattern

> Move `new` and constructor branching into one place that returns the right implementation for a given input.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Creational |
| Participants | Factory (creator), Product (interface), Concrete products |
| Pairs well with | Strategy (factory returns algorithm), Singleton (cached instance), Module (private registry) |
| Don't pair with | Builder for the same object — pick one construction style per type |
| Use cases | Branch on runtime input (type, env, tier) to pick an implementation; swap concrete classes without editing every caller; centralize non-trivial setup (OAuth, retries, validation) |
| Maintenance cost | Low with a small registry; high when the factory becomes a dumping ground for every `new` in the app |

## Basic Code

A registry map keyed by type string returns the right product. Callers pass `"console"` or `"silent"` — they never import concrete logger classes — and unknown keys throw in one place.

```javascript
function createLogger(type) {
  const loggers = {
    console: { log(msg) { console.log(`[app] ${msg}`); } },
    silent: { log() {} },
  };
  const logger = loggers[type];
  if (!logger) throw new RangeError(`unknown logger: ${type}`);
  return logger;
}

const logger = createLogger(process.env.NODE_ENV === "test" ? "silent" : "console");
logger.log("ready");
```

## How it works

The Factory pattern has four roles in textbook form; in JS they often collapse into two:

| Role (GoF) | Typical JS shape |
| ----------------- | ----------------------------------------------------- |
| Product | Shared interface: methods every variant implements |
| Concrete product | Object literal, class instance, or closure returned |
| Creator | Module or function that owns the creation API |
| Concrete creator | Branch or registry entry that picks the implementation |

```
        caller
          │
          │ createNotifier("email")
          ▼
    ┌─────────────┐
    │   Factory   │──── reads config / type / env
    └──────┬──────┘
           │ returns object matching Product contract
           ▼
    ┌─────────────┐     ┌─────────────┐
    │  Email      │     │  SMS        │  … concrete products
    │  product    │     │  product    │
    └─────────────┘     └─────────────┘
```

**Lifecycle:** The factory runs when you need an instance — per request, per mount, or once at bootstrap. It returns a product reference; callers invoke product methods. They do not re-run the factory unless they need a new instance. For expensive products (DB clients), the factory may cache or return a **Singleton** — that is separate from “who chooses the class.”

**Factory Method vs Simple Factory:** “Simple Factory” is one function with a switch or map (common in JS). Factory Method spreads creation across subclasses that override `createProduct()`. Frontend code almost always starts with the simple form; subclass-based Factory Method appears when frameworks force inheritance (rare in modern React).

**Paradigms involved:** Dependency inversion (callers depend on product interface, not concrete class), open/closed principle (extend via registry entries, not call-site edits), and centralized construction (one module owns all `new` branching).

## Metaphor

**Coffee shop counter.** You say “large oat latte” — you do not walk behind the bar, grind beans, or pick which machine runs. The barista reads your order (the key), picks the recipe and equipment (concrete product), and hands you a cup that matches what any customer expects from that menu item (shared interface: same cup shape, same `charge()` / `send()` contract). Adding cold brew means updating the menu board in one place, not retraining every customer to ask a different barista by name.

**Vending machine.** You press `B4`; the machine selects the coil, drops the snack, and returns the product. You never touch the internal routing — same as `createNotifier("email")` where the caller names the slot and the factory handles which implementation drops out.

## Functionality

- Call sites that scatter `new EmailNotifier()`, `new SmsNotifier()`, and `new PushNotifier()` must change everywhere when you add a channel or swap an implementation.
- A factory accepts a key or configuration object and returns a product that satisfies a shared contract (`send`, `render`, `connect`). The caller asks for “a notifier,” not a specific class.
- In JavaScript this is usually a factory function or a registry map, not an abstract class hierarchy — the goal matches Gang of Four **Factory Method**, with creation logic in one module and consumers depending on the product shape.

## In Practice

### When to use

- The same `switch (type)` or `if (provider === …)` block appears in more than one file.
- Adding a variant means editing import sites instead of one registry.
- Construction wires dependencies, validates config, or reads environment before returning the product.

### Use cases

| Scenario | Signal |
| -------- | ------ |
| Runtime input picks the implementation (type string, feature flag, env, user tier) | Same `switch (type)` or `if (provider === …)` copied in three files |
| Concrete class or object literal should be swappable without editing every caller | Adding a variant touches ten import sites instead of one registry |
| Construction is non-trivial: validate config, wire deps, or choose among peers | Tests mock `global.fetch` because UI code hard-codes `new StripeClient()` |

```javascript
// Smell: creation logic duplicated at each call site
function sendReceipt(order, channel) {
  if (channel === "email") {
    return new EmailNotifier(process.env.KEY).send(order);
  }
  if (channel === "sms") {
    return new SmsNotifier(process.env.KEY).send(order);
  }
}

// Fix: one factory owns the branch
import { createNotifier } from "./createNotifier.js";
function sendReceipt(order, prefs) {
  const notifier = createNotifier(prefs.channel, { apiKey: process.env.KEY });
  return notifier.send(order);
}
```

### Anti-patterns

| Situation | Instead |
| --------- | ------- |
| One implementation forever, no second variant on the roadmap | `new User()` or a plain object — no factory |
| Multi-step assembly with many optional parts on one product | **Builder** — factory picks *which* product; builder assembles *one* product |
| Must create matching families together (dark button + dark input) | **Abstract Factory** — not a single-object factory function |

```javascript
// Anti-pattern: factory for a type that never branches
function createUser() {
  return new User(); // always User — export `new User()` or `function createUser(data) { return { ... } }`
}

// Prefer when there's no "which kind"
export function createUser(data) {
  return { id: crypto.randomUUID(), ...data };
}
```

> **Rule of thumb:** If callers never branch on “which kind,” a factory adds indirection with no payoff. If the branch exists in more than one file, centralize it.

## Applications

### Browser

**`document.createElement(tagName)`** The DOM exposes a single entry point: pass a tag name, receive an `HTMLElement` whose behavior depends on the name. Callers do not invoke separate constructors per element type — the platform factory encapsulates that branching.

**`new URL(input, base)`** Parsing and normalization live inside the constructor; callers avoid hand-assembling protocol, host, and path segments. Invalid input throws in one place instead of every call site validating strings.

**`Intl.DateTimeFormat` / `Intl.NumberFormat`** Locale-aware formatters are constructed from options objects. The engine picks the correct formatting pipeline from `locale` and `options` — the same “key in, configured product out” shape as an application factory.

**`CustomEvent(type, { detail })`** Events are manufactured through a constructor API with a fixed shape (`type`, `bubbles`, `detail`) instead of ad-hoc plain objects that might omit required fields.

### UI

**Toast / notification helpers** The UI calls `toast.success("Saved")` or `toast.error("Failed")`; the library routes variant names to one internal renderer. Users see different styles; app code never imports separate toast component classes per severity.

**Data-fetch clients** `createApiClient({ baseUrl, getToken })` returns an object whose methods share wired config. Feature modules import `api.getUser()` — not `new FetchClient(baseUrl, getToken)` repeated in each file.

**Icon and chart registries** `getIcon("chevron-down")` resolves a name to the correct SVG or component from a map. Design systems add icons in one registry; screens keep a stable `getIcon(name)` call.

## Trade-offs

| Pro | Con |
| --- | --- |
| Add `slack` to the notifier registry once — no hunt through components for `new` expressions | “Go to definition” on `createPayment()` may not reveal which class ran without reading the factory body |
| Pass `createNotifier: () => fake` in tests instead of patching constructors globally | A factory with forty branches becomes a god function; split by domain or use registration maps |
| OAuth setup, retry policy, and base URL live inside the factory, not in UI code | One function returning unrelated types under the same name breaks typing and caller mental models |

**Known Issues / Pitfalls**

- **Leaking concrete types** — Returning `new StripePayment()` while callers import Stripe types defeats encapsulation; return a narrow interface (`charge`, `refund`).
- **Constructing inside render** — `createStore()` in a React component body creates a new instance every render; factory once at module scope or in `useMemo` with stable deps.
- **Confusing Factory with Builder** — Factories pick *which* product; builders assemble *one* product step by step. Both in one 200-line function is hard to read.

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Abstract Factory | Creates *families* of related products (full UI kit for “dark” vs “light”), not one object at a time. |
| Builder | Step-by-step assembly when the product has many optional parts (query builders, test fixtures). |
| Prototype | Clone an existing object instead of running factory logic (`structuredClone`, state spreads). |
| Strategy | Interchangeable algorithms; factories often *select* which strategy instance to return. |
| Module | Factory functions frequently live inside a module that keeps registries and private caches private. |

## Code Examples

### Basic

A factory function picks the concrete logger from a type string. Callers depend on `{ log(message) }`, not on class names.

```javascript
function createLogger(type) {
  const loggers = {
    console: {
      log(message) {
        console.log(`[app] ${message}`);
      },
    },
    silent: {
      log() {
        // no-op for tests or SSR
      },
    },
  };

  const logger = loggers[type];
  if (!logger) throw new RangeError(`unknown logger type: ${type}`);
  return logger;
}

const logger = createLogger(
  process.env.NODE_ENV === "test" ? "silent" : "console",
);
logger.log("server started");
```

**What to notice:**

- Callers never write `new ConsoleLogger()` — they request a capability by key.
- New variants add one registry entry, not edits across the codebase.

### Medium

A notification factory is imported by checkout and account flows. Those modules call `notifier.send()` without knowing which channel implementation was constructed.

```javascript
// notifications/createNotifier.js
function createEmailNotifier({ apiKey }) {
  return {
    channel: "email",
    async send({ to, subject, body }) {
      const res = await fetch("https://api.example.com/email", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, body }),
      });
      if (!res.ok) throw new Error(`email failed: ${res.status}`);
    },
  };
}

function createSmsNotifier({ apiKey }) {
  return {
    channel: "sms",
    async send({ to, body }) {
      const res = await fetch("https://api.example.com/sms", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ to, body }),
      });
      if (!res.ok) throw new Error(`sms failed: ${res.status}`);
    },
  };
}

export function createNotifier(type, config) {
  switch (type) {
    case "email":
      return createEmailNotifier(config);
    case "sms":
      return createSmsNotifier(config);
    default:
      throw new RangeError(`unknown notifier: ${type}`);
  }
}

// checkout/sendReceipt.js — consumer
import { createNotifier } from "./notifications/createNotifier.js";

export async function sendReceipt(order, userPrefs) {
  const notifier = createNotifier(userPrefs.channel, {
    apiKey: process.env.NOTIFY_API_KEY,
  });
  await notifier.send({
    to: order.email,
    subject: `Receipt #${order.id}`,
    body: `Total: ${order.total}`,
  });
}
```

**What to notice:**

- `sendReceipt` passes `userPrefs.channel` — the factory owns the mapping from channel name to implementation.
- Each product exposes the same `send` shape; only the email variant uses `subject`.

### Advanced

**Factory + Strategy:** A payment factory returns the correct processor for `card`, `paypal`, or `invoice`. Each processor is a Strategy with the same `charge(amount)` method. Checkout stays one line: `const processor = createPaymentProcessor(method); await processor.charge(total)`.

```javascript
const processors = {
  card: {
    name: "card",
    async charge(amount, { token }) {
      const res = await fetch("/api/pay/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, token }),
      });
      if (!res.ok) throw new Error("card charge failed");
      return res.json();
    },
  },
  paypal: {
    name: "paypal",
    async charge(amount, { orderId }) {
      const res = await fetch("/api/pay/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, orderId }),
      });
      if (!res.ok) throw new Error("paypal charge failed");
      return res.json();
    },
  },
  invoice: {
    name: "invoice",
    async charge(amount, { accountId }) {
      return { status: "pending", amount, accountId };
    },
  },
};

export function createPaymentProcessor(method) {
  const processor = processors[method];
  if (!processor) throw new RangeError(`unsupported payment method: ${method}`);
  return processor;
}

export async function checkout(cart, payment) {
  const total = cart.subtotal();
  const processor = createPaymentProcessor(payment.method);
  const result = await processor.charge(total, payment.details);
  if (result.status === "pending") {
    await cart.markPendingInvoice(result);
  } else {
    await cart.markPaid(result);
  }
  return result;
}
```

**What to notice:**

- The factory selects *which* strategy object exists; strategies do not know about each other.
- Adding `apple_pay` means one registry entry plus checkout UI — `checkout()` stays unchanged.

## Further Reading

- [Factory Method — Refactoring.Guru](https://refactoring.guru/design-patterns/factory-method)
- [Factory pattern — patterns.dev](https://www.patterns.dev/vanilla/factory-pattern)
- [React.createElement — React docs](https://react.dev/reference/react/createElement)

## Self-check questions

Test your understanding:

1. Why should `sendReceipt` call `createNotifier(type)` instead of `new EmailNotifier()` when you only support email today?
2. When does a growing `switch` in one factory function signal that you need Abstract Factory or separate factories per domain?
3. You put `createStore()` inside a React component and state resets every render — is that a Factory bug, a Singleton bug, or a lifecycle bug?
