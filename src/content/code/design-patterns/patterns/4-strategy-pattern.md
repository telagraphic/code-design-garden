---
domain: code
section: design-patterns
chapter: patterns
title: "Strategy Pattern"
order: 4
description: "Encapsulate interchangeable algorithms behind one interface so the caller picks behavior at runtime without branching."
chapterLabel: "Patterns"
---

# Strategy Pattern

> Define a family of interchangeable behaviors, inject the one you need at runtime, and let the caller invoke a single method without knowing the implementation.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Behavioral |
| Participants | Context (uses a strategy), Strategy (interface), Concrete strategies (algorithms) |
| Pairs well with | Factory (select and return the right strategy), Module (private strategy registry), Command (each strategy as an invokable action) |
| Don't pair with | Giant `switch` at every call site when one Context already owns the decision — colocate selection once |
| Use cases | Swap payment processors, shipping calculators, pricing rules, or validation pipelines at runtime; test each algorithm in isolation; add a new variant without editing the Context’s core flow |
| Maintenance cost | Low with 3–6 stable strategies and a clear interface; high when every strategy needs different arguments and the “interface” becomes a grab bag |

## Basic Code

The smallest useful shape: each payment method implements the same `charge` contract. The checkout Context holds whichever strategy the customer selected and delegates — no `if (method === 'paypal')` inside `pay()`.

```javascript
const creditCard = {
  charge(amount, { cardToken }) {
    return { ok: true, provider: "stripe", amount, last4: cardToken.slice(-4) };
  },
};

const paypal = {
  charge(amount, { payerId }) {
    return { ok: true, provider: "paypal", amount, payerId };
  },
};

function createCheckout(strategy) {
  return {
    pay(amount, details) {
      return strategy.charge(amount, details);
    },
    setStrategy(next) {
      strategy = next;
    },
  };
}

const checkout = createCheckout(creditCard);
checkout.pay(4999, { cardToken: "tok_visa_4242" });
checkout.setStrategy(paypal);
checkout.pay(1200, { payerId: "user-9" });
```

## How it works

The Strategy pattern has three roles: **Strategy** (shared interface — here, `charge` / `refund`), **Concrete strategy** (credit card, PayPal, bank transfer), and **Context** (checkout service that delegates to the current strategy).

```
   Customer selects method
            │
            ▼
   ┌────────────────┐
   │    Context     │  createCheckout(strategy)
   │   (Checkout)   │
   └───────┬────────┘
           │ pay(amount, details)
           │ strategy.charge(...)
           ▼
   ┌────────────────┐
   │   Strategy     │  ← interface: charge, refund
   └───────┬────────┘
     ┌─────┴─────┬─────────────┐
     ▼           ▼             ▼
 CreditCard   PayPal    BankTransfer
```

**Who knows whom:** The Context knows the Strategy interface, not every concrete implementation’s internals. Concrete strategies do not know the Context — they only implement the contract. The client (UI, API handler, test) chooses which strategy to inject, often via a Factory keyed by `paymentMethod`.

**Lifecycle:** At checkout start, the app resolves `paymentMethod` → strategy instance (or builds one from saved wallet data). The Context holds that reference for the session. `pay()` delegates once; `setStrategy` swaps behavior if the user changes method before confirming. Strategies are usually stateless objects or closures; per-transaction state lives in the `details` argument or the Context.

**Paradigms involved:** Composition over inheritance (behavior is swapped, not subclassed), dependency inversion (Context depends on `charge`, not Stripe’s SDK shape), and open/closed principle (add `applePay` by registering a new strategy, not by editing `pay()`).

## Metaphor

**Checkout lane, same “Pay now” button.** The total and receipt format stay the same; what changes is what happens when you tap Pay — card network authorization, PayPal redirect, or ACH batching. The cashier (Context) does not rewrite the checkout script per method; they run the procedure attached to the method you chose (Strategy).

**Navigation app, same “Get directions” UI.** Driving, transit, and walking are different algorithms behind one “route me” action. You pick the mode; the app delegates to the right pathfinder without duplicating the entire screen per mode.

## Functionality

- Several ways to perform the same *kind* of operation (take payment, compute shipping, format currency) differ in steps and dependencies, but the caller should call one method: `checkout.pay(total)`.
- The Context owns the workflow; strategies own the variant steps. Adding Affirm or SEPA does not grow a 400-line `if/else` in the Context.
- In JavaScript this is often plain objects or functions passed into a factory — classes are optional. The pattern is the *pluggable algorithm*, not the syntax used to define it.

## In Practice

### When to use

- A function or class contains a growing `switch (paymentMethod)` (or parallel `if` chain) that implements different flows for the same operation.
- You need to unit-test card declines, PayPal timeouts, and bank holidays without standing up the full checkout service for each case.
- Product or compliance requires enabling payment methods per region without redeploying the entire checkout module.

### Use cases

| Scenario | Signal |
| -------- | ------ |
| Multiple payment rails share one checkout flow but differ in API calls, idempotency keys, and error shapes | `processPayment` is 200+ lines with nested `if (method === …)` and copy-pasted receipt logic |
| A/B or regional config turns payment methods on/off at runtime | Feature flags branch inside business logic instead of swapping a strategy reference |
| Tests must simulate failures per provider without mocking half the app | Every test reaches into Stripe-specific branches to assert PayPal behavior |

```javascript
// Smell: checkout knows every provider’s API
async function processPayment(method, amount, details) {
  if (method === "card") {
    const intent = await stripe.paymentIntents.create({ amount, ... });
    return { id: intent.id };
  }
  if (method === "paypal") {
    const order = await paypal.orders.create({ amount, ... });
    return { id: order.id };
  }
  // …
}

// Fix: Context delegates; strategies encapsulate provider code
const checkout = createCheckout(paymentStrategies[method]);
return checkout.pay(amount, details);
```

### Anti-patterns

| Situation | Instead |
| --------- | ------- |
| Only one payment method will ever exist in production | Single module that calls Stripe — no strategy layer |
| Two branches that differ by one constant | Pass the constant as an argument or config object |
| You need to *construct* the right strategy from a string key | **Factory** returns the strategy; Context only calls `pay` |
| Strategies share 90% of code with tiny deltas | Extract shared pipeline; strategies plug hooks — or one function with options |

```javascript
// Anti-pattern: Strategy for trivial differences
const strategies = {
  usd: { format(n) { return `$${n}`; } },
  eur: { format(n) { return `€${n}`; } },
};

// Prefer: one formatter with locale
const format = (n, currency) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(n);
```

> **Rule of thumb:** If the branches are mostly the same workflow with different parameters, use configuration. If the workflow steps, side effects, or failure modes diverge, use Strategy.

## Applications

### Browser

**`Intl.NumberFormat`, `Intl.DateTimeFormat`, and `Intl.RelativeTimeFormat`** The constructor picks locale-aware formatting rules; your code calls `format(value)` without implementing digit grouping or calendar logic. The formatter instance is the Strategy; your UI code is the Context that always calls `format`.

**`CompressionStream` with `gzip` or `deflate`** The stream API accepts an algorithm name; compression runs through the same pipe interface. Swapping algorithm is strategy selection at construction time, not a branch inside `write()`.

**Fetch interceptors and auth handlers** Middleware that attaches Bearer tokens, cookie sessions, or API keys before `fetch` runs is often modeled as interchangeable “send request” strategies in client libraries — same `request(url)`, different signing or header logic per environment.

### UI

**Payment method selector** The user picks Card, PayPal, or Bank debit; the form shows method-specific fields while the primary button stays “Pay $49.99”. The selected method maps to a strategy; validation rules can be strategy-specific without forking the whole page component.

**Shipping and tax at checkout** Same cart total line; strategy per carrier (flat rate, weight-based, live API quote). Changing carrier updates calculation without duplicating the order summary layout.

**Sort and filter controls on tables** “Sort by price”, “Sort by rating”, “Sort by newest” are strategies behind one `sortRows(rows, key)` entry point — the table Context does not embed every comparator inline.

## Trade-offs

| Pro | Con |
| --- | --- |
| Each payment provider becomes a file you can test with mocked HTTP — no full checkout harness | More files and indirection for three methods that never change |
| Context `pay()` stays stable when product adds BNPL or wallets | Strategy interface drift — one method needs `billingAddress`, another needs `mandateId`; the shared contract gets vague |
| Runtime swap via `setStrategy` matches user changing payment method mid-flow | Wrong strategy injected at runtime fails at charge time, not at compile time — need validation at selection |

**Known Issues / Pitfalls**

- **Leaky Context** — Context starts calling `strategy.stripeClient` instead of `strategy.charge`; the abstraction is gone. Keep provider SDKs inside concrete strategies.
- **Fat interface** — Forcing `refund`, `capture`, and `setupFutureUsage` on every strategy when only cards support setup. Split interfaces or optional methods with explicit unsupported errors.
- **Selection scattered** — Factory at the API edge, another `switch` in the UI, a third in tests. Pick one place that maps `paymentMethod` → strategy.

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Factory | Chooses *which* strategy to instantiate; Strategy defines *how* it runs once selected. |
| State | Object changes behavior as internal state changes; Strategy is usually swapped explicitly from outside. |
| Template Method | Base class defines skeleton steps; subclasses override hooks. Strategy composes whole algorithms instead of inheritance. |
| Bridge | Separates abstraction from implementation across dimensions; Strategy focuses on one interchangeable algorithm family. |
| Command | Encapsulates a request as an object; Strategy encapsulates an algorithm. Command often supports undo; Strategy emphasizes swap at runtime. |

## Code Examples

### Basic

Two payment strategies and a Context that delegates `pay` to whichever strategy was injected.

```javascript
const creditCardStrategy = {
  charge(amountCents, { cardToken }) {
    if (!cardToken) throw new TypeError("cardToken required");
    return { status: "succeeded", provider: "stripe", amountCents };
  },
};

const paypalStrategy = {
  charge(amountCents, { payerId }) {
    if (!payerId) throw new TypeError("payerId required");
    return { status: "succeeded", provider: "paypal", amountCents };
  },
};

function createCheckout(initialStrategy) {
  let strategy = initialStrategy;
  return {
    pay(amountCents, details) {
      return strategy.charge(amountCents, details);
    },
    setStrategy(next) {
      strategy = next;
    },
  };
}

const checkout = createCheckout(creditCardStrategy);
console.log(checkout.pay(2500, { cardToken: "tok_test" }));
checkout.setStrategy(paypalStrategy);
console.log(checkout.pay(2500, { payerId: "buyer-1" }));
```

**What to notice:**

- `createCheckout` never branches on `"card"` vs `"paypal"` — only `strategy.charge`.
- `setStrategy` is the runtime swap; tests can inject a fake strategy without touching DOM or HTTP.

### Medium

A realistic checkout service: shared receipt shape, strategy-specific charge logic, and a registry the UI uses to list enabled methods.

```javascript
const strategies = {
  card: {
    id: "card",
    label: "Credit or debit card",
    charge(amountCents, { cardToken }) {
      // stripe.paymentIntents.create(...)
      return {
        status: "succeeded",
        provider: "stripe",
        amountCents,
        receiptUrl: `https://pay.example/r/stripe_${cardToken.slice(-6)}`,
      };
    },
  },
  paypal: {
    id: "paypal",
    label: "PayPal",
    charge(amountCents, { payerId }) {
      return {
        status: "succeeded",
        provider: "paypal",
        amountCents,
        receiptUrl: `https://pay.example/r/paypal_${payerId}`,
      };
    },
  },
  bank: {
    id: "bank",
    label: "Bank transfer",
    charge(amountCents, { iban }) {
      return {
        status: "pending",
        provider: "ach",
        amountCents,
        receiptUrl: `https://pay.example/r/ach_${iban.slice(-4)}`,
      };
    },
  },
};

function createCheckoutService({ enabledMethods, defaultMethod }) {
  let active = strategies[defaultMethod];
  if (!active || !enabledMethods.includes(active.id)) {
    throw new RangeError("no valid default payment method");
  }

  return {
    listMethods() {
      return enabledMethods.map((id) => ({
        id,
        label: strategies[id].label,
      }));
    },
    selectMethod(id) {
      if (!enabledMethods.includes(id)) throw new RangeError(`disabled: ${id}`);
      active = strategies[id];
    },
    async pay(amountCents, details) {
      const result = await Promise.resolve(active.charge(amountCents, details));
      return {
        ...result,
        method: active.id,
        paidAt: result.status === "succeeded" ? new Date().toISOString() : null,
      };
    },
  };
}

const checkout = createCheckoutService({
  enabledMethods: ["card", "paypal"],
  defaultMethod: "card",
});

checkout.selectMethod("paypal");
checkout.pay(9900, { payerId: "user-42" });
```

**What to notice:**

- Enabled methods are product config; strategies stay registered in one map.
- The service normalizes the receipt envelope; providers only own `charge` behavior and status.

### Advanced

**Strategy + Factory:** API receives `paymentMethod`, factory returns the strategy, Context runs shared validation and idempotency, then delegates. Simulates a small server checkout flow.

```javascript
function createPaymentStrategyRegistry({ stripe, paypal, bank }) {
  return {
    card: {
      charge(amountCents, { cardToken, idempotencyKey }) {
        return stripe.charge({ amountCents, cardToken, idempotencyKey });
      },
      refund(chargeId, amountCents) {
        return stripe.refund({ chargeId, amountCents });
      },
    },
    paypal: {
      charge(amountCents, { payerId, idempotencyKey }) {
        return paypal.capture({ amountCents, payerId, idempotencyKey });
      },
      refund(captureId) {
        return paypal.refund({ captureId });
      },
    },
    bank: {
      charge(amountCents, { iban, idempotencyKey }) {
        return bank.initiateTransfer({ amountCents, iban, idempotencyKey });
      },
      refund(transferId) {
        return bank.cancelTransfer({ transferId });
      },
    },
  };
}

function createPaymentStrategyFactory(registry, { enabledMethods }) {
  return function resolve(method) {
    if (!enabledMethods.includes(method)) {
      throw new RangeError(`payment method not enabled: ${method}`);
    }
    const strategy = registry[method];
    if (!strategy) throw new RangeError(`unknown payment method: ${method}`);
    return strategy;
  };
}

function createPaymentProcessor({ factory, auditLog }) {
  const seenKeys = new Set();

  return {
    async process({ paymentMethod, amountCents, idempotencyKey, details }) {
      if (seenKeys.has(idempotencyKey)) {
        return { status: "duplicate", idempotencyKey };
      }
      seenKeys.add(idempotencyKey);

      const strategy = factory(paymentMethod);
      auditLog.write({ event: "charge.start", paymentMethod, amountCents });

      try {
        const result = await strategy.charge(amountCents, {
          ...details,
          idempotencyKey,
        });
        auditLog.write({ event: "charge.success", paymentMethod, result });
        return { ok: true, ...result };
      } catch (error) {
        auditLog.write({ event: "charge.failure", paymentMethod, error: error.message });
        return { ok: false, error: error.message };
      }
    },
  };
}

// --- wiring (test doubles stand in for SDKs)
const registry = createPaymentStrategyRegistry({
  stripe: {
    charge: ({ amountCents, cardToken }) => ({ chargeId: "ch_1", amountCents, cardToken }),
    refund: ({ chargeId }) => ({ chargeId, status: "refunded" }),
  },
  paypal: {
    capture: ({ amountCents, payerId }) => ({ captureId: "pp_1", amountCents, payerId }),
    refund: ({ captureId }) => ({ captureId, status: "refunded" }),
  },
  bank: {
    initiateTransfer: ({ amountCents, iban }) => ({ transferId: "ach_1", amountCents, iban }),
    cancelTransfer: ({ transferId }) => ({ transferId, status: "cancelled" }),
  },
});

const factory = createPaymentStrategyFactory(registry, {
  enabledMethods: ["card", "paypal", "bank"],
});

const processor = createPaymentProcessor({
  factory,
  auditLog: { write(entry) { console.log(JSON.stringify(entry)); } },
});

await processor.process({
  paymentMethod: "card",
  amountCents: 15000,
  idempotencyKey: "order-99-attempt-1",
  details: { cardToken: "tok_visa" },
});
```

**What to notice:**

- Factory answers “which strategy for this request”; processor never switches on `paymentMethod` inside `charge`.
- Idempotency and audit belong in the Context — cross-cutting rules every strategy shares.

## Further Reading

- [Strategy — Refactoring.Guru](https://refactoring.guru/design-patterns/strategy)
- [Strategy pattern — patterns.dev](https://www.patterns.dev/vanilla/strategy-pattern)
- [Replace Conditional with Polymorphism — Refactoring.Guru](https://refactoring.guru/replace-conditional-with-polymorphism)

## Self-check questions

Test your understanding:

1. Your checkout has four payment methods and one `pay()` function. What is the first sign the Strategy pattern would help — and what is one sign it would be overkill?
2. Context starts importing `stripe` directly for logging while strategies handle `charge`. What abstraction broke, and where should Stripe-specific code live?
3. When would you use a Factory in front of your payment strategies instead of passing the strategy object from the UI?
