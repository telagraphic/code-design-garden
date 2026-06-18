---
domain: code
section: design-patterns
chapter: patterns
title: "Orchestrator Pattern"
order: 7
description: "A single function coordinates a sequence of independent steps in order — each step does its own work; the Orchestrator owns the flow."
chapterLabel: "Patterns"
---

# Orchestrator Pattern

> One function owns the workflow. It calls each step in sequence, passes results forward, and decides what happens next — steps do not know about each other.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Behavioral |
| Participants | Orchestrator (flow controller), Steps (independent services or functions), Context (data passed between steps) |
| Pairs well with | Module (each step is an encapsulated module), Observer (notify on workflow events), Factory (build steps from config) |
| Don't pair with | Mediator — Mediator decouples peer-to-peer events; Orchestrator sequences a directed workflow |
| Use cases | Checkout flow, multi-step form submission, onboarding sequence, data import pipeline, auth handshake |
| Maintenance cost | Low when steps are pure functions with no side effects on each other; high when steps share mutable state or the Orchestrator does domain work itself |

## Basic Code

A checkout Orchestrator calls validate → charge → fulfil → notify in order. Each step is an independent function; the Orchestrator owns what happens between them.

```javascript
async function runCheckout({ cart, payment, user }) {
  const validated = await validateCart(cart);
  const charge    = await chargePayment(payment, validated.total);
  const order     = await createOrder({ user, cart: validated, charge });
  await sendReceipt(user.email, order);
  return order;
}
```

Each step (`validateCart`, `chargePayment`, `createOrder`, `sendReceipt`) lives in its own module. None of them imports any other. The Orchestrator is the only place that knows the sequence.

## How it works

The Orchestrator pattern has two rules: **the Orchestrator knows every step; no step knows any other step.**

```
  ┌──────────────────────────────────┐
  │         Orchestrator             │
  │                                  │
  │  1. validateCart(cart)           │
  │       ↓ validated                │
  │  2. chargePayment(payment, total)│
  │       ↓ charge                   │
  │  3. createOrder(...)             │
  │       ↓ order                    │
  │  4. sendReceipt(email, order)    │
  └──────────────────────────────────┘
        │        │        │       │
   [validate] [charge] [order] [notify]
      (module) (module) (module) (module)
```

**Sequential vs parallel:** Most Orchestrators run steps sequentially because each step depends on the previous result. When steps are independent (e.g., "send receipt" and "update analytics" both need `order` but not each other), `Promise.all` parallelises them without changing the Orchestrator's ownership of the flow.

**Error handling lives in the Orchestrator:** If `chargePayment` fails, the Orchestrator decides whether to retry, rollback `validateCart`, or surface the error. Steps throw; the Orchestrator catches and responds.

**Context object:** Passing a shared context object (rather than chaining return values) suits long pipelines where every step needs a growing bag of results. Either pattern works — the key is that context flows forward, never backwards.

## In Practice

### When to use

- Several independent modules must collaborate on one task and their sequence matters
- You need to test the workflow (step ordering, error handling) separately from the step implementations
- A new step must be inserted into an existing flow without touching the other steps

### Anti-patterns

```javascript
// Anti-pattern: Orchestrator that does domain work itself
async function runCheckout({ cart, payment, user }) {
  // Orchestrator validating cart — that's validateCart's job
  if (!cart.items.length) throw new Error("empty cart");
  const total = cart.items.reduce((s, i) => s + i.price, 0);

  // Orchestrator building Stripe request — that's chargePayment's job
  const charge = await stripe.paymentIntents.create({ amount: total, ... });

  // ... and so on
}
```

When the Orchestrator absorbs domain logic from its steps, it becomes a god function. Steps should encapsulate their own rules; the Orchestrator calls them and routes their results.

```javascript
// Anti-pattern: steps importing each other
async function chargePayment(payment, total) {
  const validated = await validateCart(...); // step reaching into another step's job
  // …
}
```

If steps import each other, the Orchestrator's role is redundant — you've just moved the coupling into the steps. Each step should be callable in isolation with only its own inputs.

> **Rule of thumb:** If you find yourself writing "first do A, then pass its result to B, then pass both to C," and these are separate modules — that is an Orchestrator. If the parts communicate by events rather than direct calls, consider a Mediator instead.

## Code Examples

### Basic — Linear Checkout Pipeline

Each step is a stub; the Orchestrator wires them. The flow is readable at a glance because the Orchestrator contains nothing but sequencing.

```javascript
// Steps — each in its own module in production
async function validateCart(cart) {
  if (!cart.items.length) throw new Error("cart is empty");
  const total = cart.items.reduce((sum, item) => sum + item.price, 0);
  return { ...cart, total };
}

async function chargePayment(payment, amount) {
  if (!payment.token) throw new Error("payment token required");
  console.log(`[charge] ${amount} via ${payment.token}`);
  return { chargeId: `ch_${Date.now()}`, amount, status: "succeeded" };
}

async function createOrder({ user, cart, charge }) {
  const order = { id: `ord_${Date.now()}`, userId: user.id, items: cart.items, charge };
  console.log(`[order] created ${order.id}`);
  return order;
}

async function sendReceipt(email, order) {
  console.log(`[receipt] sent to ${email} for order ${order.id}`);
}

// Orchestrator — owns the sequence, nothing else
async function runCheckout({ cart, payment, user }) {
  const validated = await validateCart(cart);
  const charge    = await chargePayment(payment, validated.total);
  const order     = await createOrder({ user, cart: validated, charge });
  await sendReceipt(user.email, order);
  return order;
}

// --- Run it
const result = await runCheckout({
  cart:    { items: [{ name: "Mug", price: 12 }, { name: "Hat", price: 24 }] },
  payment: { token: "tok_visa" },
  user:    { id: "usr-1", email: "ada@example.com" },
});

console.log(result);
// [charge] 36 via tok_visa
// [order] created ord_…
// [receipt] sent to ada@example.com for order ord_…
```

**What to notice:**

- `runCheckout` has no domain logic — only sequencing and wiring
- Each step can be unit-tested by calling it directly with stub inputs
- Adding a "loyaltyPoints" step means one new call in `runCheckout` and one new module

### Medium — Orchestrator with Branching

Real workflows branch. The Orchestrator owns the branch decision; steps stay unaware of each other's existence.

```javascript
async function processOrder({ cart, payment, user }) {
  const validated = await validateCart(cart);

  // Branch: digital vs physical items ship differently
  const fulfillment = validated.items.every(i => i.digital)
    ? await fulfillDigital(validated, user)
    : await fulfillPhysical(validated, user.address);

  const charge = await chargePayment(payment, validated.total);

  // Parallel: receipt and analytics don't depend on each other
  await Promise.all([
    sendReceipt(user.email, { charge, fulfillment }),
    trackAnalytics("order_complete", { userId: user.id, total: validated.total }),
  ]);

  return { charge, fulfillment };
}

// Stubs
async function fulfillDigital(cart, user) {
  console.log(`[digital] sending download links to ${user.email}`);
  return { type: "digital", sentAt: new Date().toISOString() };
}

async function fulfillPhysical(cart, address) {
  console.log(`[physical] dispatching to ${address}`);
  return { type: "physical", trackingId: `TRK-${Date.now()}` };
}

async function trackAnalytics(event, data) {
  console.log(`[analytics] ${event}`, data);
}

// Reuse stubs from previous example for the rest
async function validateCart(cart) {
  const total = cart.items.reduce((s, i) => s + i.price, 0);
  return { ...cart, total };
}
async function chargePayment(payment, amount) {
  return { chargeId: `ch_${Date.now()}`, amount };
}
async function sendReceipt(email, data) {
  console.log(`[receipt] → ${email}`);
}

// --- Run
await processOrder({
  cart:    { items: [{ name: "eBook", price: 15, digital: true }] },
  payment: { token: "tok_visa" },
  user:    { id: "usr-2", email: "grace@example.com" },
});
```

**What to notice:**

- The branch (`digital` vs `physical`) belongs in the Orchestrator — it is a flow decision, not domain logic
- `Promise.all` parallelises independent steps without changing who owns the flow
- Neither `fulfillDigital` nor `trackAnalytics` imports the other

## Trade-offs

| Pro | Con |
| --- | --- |
| The workflow is readable in one place — adding or reordering a step requires one edit | The Orchestrator is coupled to every step by name; it cannot be extended without editing it |
| Steps are independently testable — call them with stubs, no full pipeline required | Long sequential chains are brittle if a middle step's return shape changes |
| Error handling and branching logic are centralised, not scattered across steps | Parallel async steps with shared state require careful coordination to avoid races |

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Mediator | Decouples peer-to-peer communication via events; Orchestrator drives a directed sequence via direct calls. |
| Facade | Simplifies a complex subsystem; an Orchestrator may be a Facade when the pipeline is the subsystem being hidden. |
| Command | Steps can be Commands if the workflow needs undo/redo or a transaction log. |
| Pipeline / Chain of Responsibility | Each handler decides whether to pass to the next; Orchestrator always calls every step explicitly. |

## Further Reading

- [Saga pattern — microservices.io](https://microservices.io/patterns/data/saga.html)
- [Orchestration vs Choreography — Martin Fowler](https://martinfowler.com/articles/201701-event-driven.html)
- [Promise.all — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

## Self-check questions

1. A step in your Orchestrator imports a second step directly. What problem does this cause, and how would you fix it?
2. When would you reach for `Promise.all` inside an Orchestrator rather than sequential `await` — and what must be true of those steps?
3. What is the key difference between an Orchestrator and a Mediator — which one would you use for a real-time chat system, and why?
