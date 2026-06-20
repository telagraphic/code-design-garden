---
domain: code
section: design-patterns
chapter: challenges
title: "Orchestrator Pattern Challenge"
order: 7
description: "Extract workflow sequencing into one orchestrator function so independent steps stay decoupled, testable, and readable in order."
chapterLabel: "Challenges"
---

# Orchestrator Pattern — Code Challenges

---

## Challenge 1 — The God Checkout

### The Code

Checkout is one async function. Validation, payment, order creation, and receipt logic all live inline.

```javascript
async function checkout({ cart, payment, user }) {
  if (!cart.items.length) throw new Error("cart is empty");
  const total = cart.items.reduce((sum, item) => sum + item.price, 0);
  console.log(`[validate] total ${total}`);

  if (!payment.token) throw new Error("payment token required");
  console.log(`[charge] ${total} via ${payment.token}`);
  const charge = { chargeId: `ch_${Date.now()}`, amount: total, status: "succeeded" };

  const order = {
    id: `ord_${Date.now()}`,
    userId: user.id,
    items: cart.items,
    charge,
  };
  console.log(`[order] created ${order.id}`);

  console.log(`[receipt] sent to ${user.email} for order ${order.id}`);

  return order;
}

checkout({
  cart:    { items: [{ name: "Mug", price: 12 }, { name: "Hat", price: 24 }] },
  payment: { token: "tok_visa" },
  user:    { id: "usr-1", email: "ada@example.com" },
});
```

### What's Wrong

Run this and ask: what happens when product adds a loyalty-points step between charge and order — or wants to unit-test charge logic without running validation?

You scroll through one 30-line function. Validation rules mingle with Stripe token checks and receipt formatting. Testing `[charge]` means calling `checkout` with a full cart and user fixture.

Three problems:

1. **Orchestrator absorbs domain work** — empty-cart checks and token validation belong in steps, not in the flow function
2. **Steps are not reusable** — you cannot call `chargePayment` alone in a test or reuse it in a refund flow
3. **Flow is buried in details** — reading the sequence means parsing validation math and log strings

### Your Task

Refactor so that:

- Each phase is an independent async step: `validateCart`, `chargePayment`, `createOrder`, `sendReceipt`
- `runCheckout({ cart, payment, user })` only sequences steps and passes results forward — no domain logic inside it
- Steps do not import each other
- Adding a step later means one new line in `runCheckout`, not editing step internals

Target interface:

```javascript
async function runCheckout({ cart, payment, user }) {
  const validated = await validateCart(cart);
  const charge    = await chargePayment(payment, validated.total);
  const order     = await createOrder({ user, cart: validated, charge });
  await sendReceipt(user.email, order);
  return order;
}

// runCheckout reads as the workflow at a glance — four lines, no branching on cart items
```

---

### Hints

<details>
<summary>#1 — Separate "what runs when" from "how each step works"</summary>

Draw a line between sequencing and domain logic. Everything that answers "in what order?" belongs in `runCheckout`. Everything that answers "how do we validate a cart?" or "how do we charge?" belongs in a step function.

Cut each inline block out of `checkout` and paste it into a named function. The orchestrator becomes four `await` lines that wire return values forward.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
async function validateCart(cart) {
  if (!cart.items.length) throw new Error("cart is empty");
  const total = cart.items.reduce((sum, item) => sum + item.price, 0);
  console.log(`[validate] total ${total}`);
  return { ...cart, total };
}

async function chargePayment(payment, amount) {
  if (!payment.token) throw new Error("payment token required");
  console.log(`[charge] ${amount} via ${payment.token}`);
  return { chargeId: `ch_${Date.now()}`, amount, status: "succeeded" };
}

async function createOrder({ user, cart, charge }) { /* … */ }
async function sendReceipt(email, order) { /* … */ }

async function runCheckout({ cart, payment, user }) {
  const validated = await validateCart(cart);
  const charge    = await chargePayment(payment, validated.total);
  const order     = await createOrder({ user, cart: validated, charge });
  await sendReceipt(user.email, order);
  return order;
}
```

Each step is callable in isolation: `await chargePayment({ token: "tok_test" }, 36)`.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function validateCart(cart):
  if cart empty → throw
  compute total
  log validate
  return { ...cart, total }

function chargePayment(payment, amount):
  if no token → throw
  log charge
  return { chargeId, amount, status }

function createOrder({ user, cart, charge }):
  build order object
  log order
  return order

function sendReceipt(email, order):
  log receipt
  (no return needed)

function runCheckout({ cart, payment, user }):
  validated = await validateCart(cart)
  charge = await chargePayment(payment, validated.total)
  order = await createOrder({ user, cart: validated, charge })
  await sendReceipt(user.email, order)
  return order
```

`runCheckout` never mentions `reduce`, `token`, or `chargeId` — it only passes data between steps.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
async function validateCart(cart) {
  if (!cart.items.length) throw new Error("cart is empty");
  const total = cart.items.reduce((sum, item) => sum + item.price, 0);
  console.log(`[validate] total ${total}`);
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

async function runCheckout({ cart, payment, user }) {
  const validated = await validateCart(cart);
  const charge    = await chargePayment(payment, validated.total);
  const order     = await createOrder({ user, cart: validated, charge });
  await sendReceipt(user.email, order);
  return order;
}

// --- Verify ---
const order = await runCheckout({
  cart:    { items: [{ name: "Mug", price: 12 }, { name: "Hat", price: 24 }] },
  payment: { token: "tok_visa" },
  user:    { id: "usr-1", email: "ada@example.com" },
});
// [validate] total 36
// [charge] 36 via tok_visa
// [order] created ord_…
// [receipt] sent to ada@example.com for order ord_…

// Step tested in isolation:
await chargePayment({ token: "tok_test" }, 10);
// [charge] 10 via tok_test
```

**What changed:**

- Domain logic moved into four step functions; `runCheckout` is pure sequencing
- Each step accepts only its own inputs — no step imports another
- Tests can stub or call individual steps without running the full pipeline

**Concepts at work:** `runCheckout` is the **Orchestrator** — it knows every step and their order. Each step is an independent **module** in production. Data flows forward through return values (`validated.total` → `chargePayment`). The orchestrator owns **when**; steps own **how**.

</details>

---

## Challenge 2 — The Coupled Pipeline

### The Code

Order processing exists, but steps call each other. The entry point only kicks off `chargePayment` — the real sequence is hidden inside the steps.

```javascript
async function validateCart(cart) {
  const total = cart.items.reduce((s, i) => s + i.price, 0);
  console.log(`[validate] total ${total}`);
  return { ...cart, total };
}

async function chargePayment(payment, cart) {
  const validated = await validateCart(cart); // step reaching into another step
  if (!payment.token) throw new Error("payment token required");
  console.log(`[charge] ${validated.total} via ${payment.token}`);
  return { chargeId: `ch_${Date.now()}`, amount: validated.total };
}

async function createOrder({ user, cart, payment }) {
  const charge = await chargePayment(payment, cart); // chain continues inside step
  const order = { id: `ord_${Date.now()}`, userId: user.id, charge };
  console.log(`[order] created ${order.id}`);
  return order;
}

async function submitOrder({ cart, payment, user }) {
  return createOrder({ user, cart, payment });
}

submitOrder({
  cart:    { items: [{ name: "eBook", price: 15, digital: true }] },
  payment: { token: "tok_visa" },
  user:    { id: "usr-2", email: "grace@example.com" },
});
// [validate] total 15
// [charge] 15 via tok_visa
// [order] created ord_…
```

Product now needs digital vs physical fulfillment branching before charge — and receipt + analytics in parallel after. Because the sequence lives inside steps, you edit `chargePayment` and `createOrder` and hope nothing breaks.

### What's Wrong

`submitOrder` looks like an orchestrator but delegates everything to `createOrder`, which secretly runs validate → charge. `validateCart` runs twice if any caller passes an already-validated cart to `chargePayment`.

Three problems:

1. **Steps import each other** — `chargePayment` calls `validateCart`; the orchestrator's role is redundant
2. **Sequence is invisible** — reading `submitOrder` does not reveal validate → charge → order → notify
3. **Branching and parallelism are impossible** without further coupling — flow decisions get pushed into step internals

### Your Task

Refactor so that:

- `validateCart`, `chargePayment`, and `createOrder` each do one job and accept only the inputs they need — no step calls another step
- Replace `submitOrder` with `processOrder({ cart, payment, user })` that owns the full workflow:
  - validate → branch on digital vs physical fulfillment → charge → parallel receipt + analytics
- Flow decisions (digital vs physical, `Promise.all` for receipt/analytics) live in the orchestrator, not in steps

Target interface:

```javascript
async function processOrder({ cart, payment, user }) {
  const validated = await validateCart(cart);

  const fulfillment = validated.items.every(i => i.digital)
    ? await fulfillDigital(validated, user)
    : await fulfillPhysical(validated, user.address);

  const charge = await chargePayment(payment, validated.total);

  await Promise.all([
    sendReceipt(user.email, { charge, fulfillment }),
    trackAnalytics("order_complete", { userId: user.id, total: validated.total }),
  ]);

  return { charge, fulfillment };
}
```

---

### Hints

<details>
<summary>#1 — Strip cross-step calls out of each step</summary>

`chargePayment` should accept `(payment, amount)` — not `(payment, cart)`. It should not call `validateCart`. Whoever orchestrates the flow calls `validateCart` first and passes `validated.total` into `chargePayment`.

Same for `createOrder` — it receives `{ user, cart, charge }` built by the orchestrator, not re-run charge internally.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
async function chargePayment(payment, amount) {
  if (!payment.token) throw new Error("payment token required");
  console.log(`[charge] ${amount} via ${payment.token}`);
  return { chargeId: `ch_${Date.now()}`, amount };
}

async function fulfillDigital(cart, user) { /* … */ }
async function fulfillPhysical(cart, address) { /* … */ }
async function sendReceipt(email, data) { /* … */ }
async function trackAnalytics(event, data) { /* … */ }

async function processOrder({ cart, payment, user }) {
  const validated = await validateCart(cart);

  const fulfillment = validated.items.every(i => i.digital)
    ? await fulfillDigital(validated, user)
    : await fulfillPhysical(validated, user.address);

  const charge = await chargePayment(payment, validated.total);

  await Promise.all([
    sendReceipt(user.email, { charge, fulfillment }),
    trackAnalytics("order_complete", { userId: user.id, total: validated.total }),
  ]);

  return { charge, fulfillment };
}
```

The branch and `Promise.all` are **flow decisions** — they belong in the orchestrator.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function processOrder({ cart, payment, user }):
  validated = await validateCart(cart)

  if every item in validated.items is digital:
    fulfillment = await fulfillDigital(validated, user)
  else:
    fulfillment = await fulfillPhysical(validated, user.address)

  charge = await chargePayment(payment, validated.total)

  await parallel:
    sendReceipt(user.email, { charge, fulfillment })
    trackAnalytics("order_complete", { userId, total })

  return { charge, fulfillment }

function chargePayment(payment, amount):
  // NO call to validateCart — amount already computed
  validate token, log, return charge object
```

Read `processOrder` top to bottom — that is the entire workflow. Steps stay dumb about what runs next.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
async function validateCart(cart) {
  if (!cart.items.length) throw new Error("cart is empty");
  const total = cart.items.reduce((s, i) => s + i.price, 0);
  console.log(`[validate] total ${total}`);
  return { ...cart, total };
}

async function chargePayment(payment, amount) {
  if (!payment.token) throw new Error("payment token required");
  console.log(`[charge] ${amount} via ${payment.token}`);
  return { chargeId: `ch_${Date.now()}`, amount };
}

async function fulfillDigital(cart, user) {
  console.log(`[digital] download links → ${user.email}`);
  return { type: "digital", sentAt: new Date().toISOString() };
}

async function fulfillPhysical(cart, address) {
  console.log(`[physical] dispatch → ${address}`);
  return { type: "physical", trackingId: `TRK-${Date.now()}` };
}

async function sendReceipt(email, data) {
  console.log(`[receipt] → ${email}`, data.fulfillment.type);
}

async function trackAnalytics(event, data) {
  console.log(`[analytics] ${event}`, data);
}

async function processOrder({ cart, payment, user }) {
  const validated = await validateCart(cart);

  const fulfillment = validated.items.every(i => i.digital)
    ? await fulfillDigital(validated, user)
    : await fulfillPhysical(validated, user.address);

  const charge = await chargePayment(payment, validated.total);

  await Promise.all([
    sendReceipt(user.email, { charge, fulfillment }),
    trackAnalytics("order_complete", { userId: user.id, total: validated.total }),
  ]);

  return { charge, fulfillment };
}

// --- Verify: digital cart ---
await processOrder({
  cart:    { items: [{ name: "eBook", price: 15, digital: true }] },
  payment: { token: "tok_visa" },
  user:    { id: "usr-2", email: "grace@example.com", address: "1 Main St" },
});
// [validate] total 15
// [digital] download links → grace@example.com
// [charge] 15 via tok_visa
// [receipt] → grace@example.com digital
// [analytics] order_complete { userId: 'usr-2', total: 15 }

// --- Verify: physical cart ---
await processOrder({
  cart:    { items: [{ name: "Mug", price: 12, digital: false }] },
  payment: { token: "tok_visa" },
  user:    { id: "usr-3", email: "ada@example.com", address: "42 Oak Ave" },
});
// [validate] total 12
// [physical] dispatch → 42 Oak Ave
// [charge] 12 via tok_visa
// …
```

**What changed:**

- Steps no longer call each other — `chargePayment` takes `amount`, not `cart`
- `processOrder` exposes the full sequence including branch and parallel notify steps
- `Promise.all` runs receipt and analytics together without either step knowing about the other

**Concepts at work:** The **Orchestrator** owns **flow decisions** — digital vs physical is a routing choice, not domain logic inside `chargePayment`. Independent post-charge steps parallelise with `Promise.all` while the orchestrator still controls order (validate and fulfill before charge; notify after). Contrast with **Mediator**: peers would emit events; here the orchestrator calls steps directly in a directed pipeline.

</details>

---

## When Not to Use the Orchestrator Pattern

An orchestrator earns its place when several modules must run in a defined order for one task. Skip it when:

- **There is only one step.** A function that validates and returns does not need an orchestrator wrapper — it is already a step.
- **Parts communicate by events, not sequence.** Real-time chat, dashboards, and form fields reacting to each other suit a **Mediator** or **Observer**, not a directed pipeline.
- **Each handler decides whether to continue.** A middleware chain where any link can stop propagation is **Chain of Responsibility**, not Orchestrator — the orchestrator always calls every step it lists.
- **The "workflow" is really one algorithm with variants.** Swapping sort or payment logic at runtime is **Strategy**; sequencing validate → charge → receipt is Orchestrator.

The rule of thumb: if you write "first A, then B, then C" across separate modules — extract an orchestrator. If modules broadcast "something changed" and others react, look elsewhere.

---

## What to Take Away

Before moving on, answer these from memory:

1. In Challenge 1, which lines belong in `runCheckout` vs `validateCart` — and how do you decide?
2. In Challenge 2, why must `chargePayment` accept `amount` instead of `cart` after the refactor?
3. When would you use `Promise.all` inside an orchestrator — what must be true of the steps you parallelise?
4. What is the key difference between an Orchestrator and a Mediator — which fits a checkout pipeline, and which fits a chat room?

---

*← [Orchestrator Pattern](/code/design-patterns/patterns/7-orchestrator-pattern)*
