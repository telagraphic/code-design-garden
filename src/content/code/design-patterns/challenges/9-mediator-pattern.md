---
domain: code
section: design-patterns
chapter: challenges
title: "Mediator Pattern Challenge"
order: 9
description: "Route peer events through a central mediator so colleagues stop importing each other and new participants plug in without editing existing modules."
chapterLabel: "Challenges"
---

# Mediator Pattern — Code Challenges

---

## Challenge 1 — The Tangled Cart

### The Code

Adding an item to the cart updates inventory, the order summary, and a badge — all from inside `cart.add`.

```javascript
const inventory = {
  stock: { "mug-1": 10, "hat-2": 3 },
  decrement(sku) {
    this.stock[sku] -= 1;
    console.log(`[inventory] ${sku} → ${this.stock[sku]} left`);
    return this.stock[sku];
  },
};

const summary = {
  total: 0,
  warnings: [],
  updateTotal(amount) {
    this.total = amount;
    console.log(`[summary] total: $${amount}`);
  },
  addWarning(msg) {
    this.warnings.push(msg);
    console.log(`[summary] warning: ${msg}`);
  },
};

const badge = {
  count: 0,
  setCount(n) {
    this.count = n;
    console.log(`[badge] ${n} items`);
  },
};

const cart = {
  items: [],
  add(item) {
    this.items.push(item);
    const qtyLeft = inventory.decrement(item.sku);
    if (qtyLeft < 5) summary.addWarning(`${item.sku} low (${qtyLeft})`);
    summary.updateTotal(this.total());
    badge.setCount(this.items.length);
  },
  total() {
    return this.items.reduce((s, i) => s + i.price, 0);
  },
};

cart.add({ sku: "mug-1", name: "Mug", price: 12 });
cart.add({ sku: "hat-2", name: "Hat", price: 24 });
```

### What's Wrong

Run this and ask: what happens when product adds a loyalty-points module that also reacts to `add` — or analytics that tracks every cart change?

You open `cart.add` and wire in another import. The cart module knows inventory thresholds, summary formatting, and badge rules. Tests for `cart.add` must stub three collaborators.

Three problems:

1. **Colleagues call each other directly** — cart imports inventory, summary, and badge
2. **Every new reaction edits cart** — the cart becomes an accidental coupling hub
3. **Cart owns others' rules** — low-stock threshold (`< 5`) lives in cart, not inventory

### Your Task

Refactor so that:

- A `createShoppingMediator()` owns a `routes` table mapping events to target colleagues
- Colleagues register with the mediator and implement `onNotify(event, payload)`
- `createCart(mediator)` only emits `ITEM_ADDED` and `TOTAL_CHANGED` via `mediator.notify` — no imports of inventory or summary
- `createInventory` decrements stock and emits `STOCK_LOW` back through the mediator when qty `< 5`
- `createSummary` listens for `TOTAL_CHANGED` and `STOCK_LOW` only

Target interface:

```javascript
const mediator = createShoppingMediator();
const cart      = createCart(mediator);
const inventory = createInventory(mediator);
const summary   = createSummary(mediator);

cart.add({ sku: "mug-1", name: "Mug", price: 12 });
// [inventory] mug-1 → 9 left
// [summary] total: $12

cart.add({ sku: "hat-2", name: "Hat", price: 24 });
// [inventory] hat-2 → 2 left
// [summary] warning: hat-2 low
// [summary] total: $36
```

---

### Hints

<details>
<summary>#1 — Cart emits; others listen</summary>

The cart should not know that inventory exists. After `items.push(item)`, call:

`mediator.notify("cart", "ITEM_ADDED", item)`

and

`mediator.notify("cart", "TOTAL_CHANGED", { total: cart.total() })`

Inventory registers for `ITEM_ADDED` in its `onNotify`. Summary registers for `TOTAL_CHANGED` and `STOCK_LOW`. The cart never imports them.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createShoppingMediator() {
  const routes = {
    ITEM_ADDED:    ["inventory"],
    TOTAL_CHANGED: ["summary"],
    STOCK_LOW:     ["summary"],
  };
  const colleagues = new Map();

  return {
    register(name, colleague) { colleagues.set(name, colleague); },
    notify(from, event, payload) {
      for (const name of routes[event] ?? []) {
        colleagues.get(name)?.onNotify(event, payload);
      }
    },
  };
}

function createCart(mediator) {
  const items = [];
  const cart = {
    add(item) {
      items.push(item);
      mediator.notify("cart", "ITEM_ADDED", item);
      mediator.notify("cart", "TOTAL_CHANGED", { total: cart.total() });
    },
    total() { return items.reduce((s, i) => s + i.price, 0); },
    onNotify() {},
  };
  mediator.register("cart", cart);
  return cart;
}
```

Move low-stock detection into `createInventory` — inventory owns stock rules.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
mediator routes:
  ITEM_ADDED    → [inventory]
  TOTAL_CHANGED → [summary]
  STOCK_LOW     → [summary]

cart.add(item):
  push item
  notify("cart", "ITEM_ADDED", item)
  notify("cart", "TOTAL_CHANGED", { total })

inventory.onNotify("ITEM_ADDED", item):
  decrement stock[item.sku]
  if stock below 5 → notify("inventory", "STOCK_LOW", { sku, qty })

summary.onNotify(event, payload):
  if TOTAL_CHANGED → update total display
  if STOCK_LOW → add warning
```

Adding analytics later: extend `routes.ITEM_ADDED` to include `"analytics"` — cart unchanged.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createShoppingMediator() {
  const routes = {
    ITEM_ADDED:    ["inventory"],
    TOTAL_CHANGED: ["summary"],
    STOCK_LOW:     ["summary"],
  };
  const colleagues = new Map();

  return {
    register(name, colleague) {
      colleagues.set(name, colleague);
    },
    notify(from, event, payload) {
      const targets = routes[event];
      if (!targets) throw new RangeError(`unknown event: ${event}`);
      for (const name of targets) {
        colleagues.get(name)?.onNotify(event, payload);
      }
    },
  };
}

function createCart(mediator) {
  const items = [];
  const cart = {
    add(item) {
      items.push(item);
      mediator.notify("cart", "ITEM_ADDED", item);
      mediator.notify("cart", "TOTAL_CHANGED", { total: cart.total() });
    },
    total() { return items.reduce((s, i) => s + i.price, 0); },
    onNotify() {},
  };
  mediator.register("cart", cart);
  return cart;
}

function createInventory(mediator) {
  const stock = { "mug-1": 10, "hat-2": 3 };
  const inventory = {
    onNotify(event, item) {
      if (event !== "ITEM_ADDED") return;
      stock[item.sku] -= 1;
      console.log(`[inventory] ${item.sku} → ${stock[item.sku]} left`);
      if (stock[item.sku] < 5) {
        mediator.notify("inventory", "STOCK_LOW", { sku: item.sku, qty: stock[item.sku] });
      }
    },
  };
  mediator.register("inventory", inventory);
  return inventory;
}

function createSummary(mediator) {
  let total = 0;
  const warnings = [];
  const summary = {
    onNotify(event, payload) {
      if (event === "TOTAL_CHANGED") {
        total = payload.total;
        console.log(`[summary] total: $${total}`);
      }
      if (event === "STOCK_LOW") {
        warnings.push(`${payload.sku} low (${payload.qty})`);
        console.log(`[summary] warning: ${payload.sku} low`);
      }
    },
    getSnapshot() { return { total, warnings }; },
  };
  mediator.register("summary", summary);
  return summary;
}

const mediator = createShoppingMediator();
const cart      = createCart(mediator);
const inventory = createInventory(mediator);
const summary   = createSummary(mediator);

cart.add({ sku: "mug-1", name: "Mug", price: 12 });
cart.add({ sku: "hat-2", name: "Hat", price: 24 });

console.log(summary.getSnapshot());
// { total: 36, warnings: ['hat-2 low (2)'] }
```

**What changed:**

- Cart emits events; inventory and summary react via `onNotify` — no cross-imports
- Low-stock logic moved to inventory; routing table lives in the mediator
- Adding a colleague means one `register` call and a routes entry — not editing `cart.add`

**Concepts at work:** The **Mediator** owns **routing rules** (`routes` table). **Colleagues** are **registrants** that emit and receive named events. Domain logic stays in colleagues; the mediator only forwards. Contrast with **Orchestrator**: there is no fixed validate → charge sequence — peers react to each other's events.

</details>

---

## Challenge 2 — The Direct Dropdowns

### The Code

Country, state, and city fields import each other. Changing country resets dependents by calling their methods directly.

```javascript
function createCountryField(stateField, cityField) {
  let value = "";
  return {
    set(next) {
      value = next;
      stateField.reset(next);
      cityField.reset();
    },
    get() { return value; },
  };
}

function createStateField(cityField) {
  let value = "";
  const options = { US: ["CA", "NY"], CA: ["ON", "BC"] };
  return {
    set(next) {
      value = next;
      cityField.reset();
    },
    reset(country) {
      value = "";
      console.log(`[state] reset for ${country}`);
    },
    optionsFor(country) { return options[country] ?? []; },
    get() { return value; },
  };
}

function createCityField() {
  let value = "";
  return {
    reset() {
      value = "";
      console.log(`[city] reset`);
    },
    get() { return value; },
  };
}

const city    = createCityField();
const state   = createStateField(city);
const country = createCountryField(state, city);

state.set("NY");
country.set("US");
// [state] reset for US
// [city] reset
```

Adding a postal-code field means threading another reference through every constructor.

### What's Wrong

Each field constructor takes dependencies on fields it must notify. The dependency graph mirrors the UI hierarchy — country knows state and city; state knows city. Circular imports become likely as the form grows.

Three problems:

1. **Constructor coupling** — `createCountryField(state, city)` wires the graph at creation time
2. **Reset logic scattered** — country calls `stateField.reset`; state calls `cityField.reset`
3. **No plug-in seam** — a fourth field cannot subscribe to `COUNTRY_CHANGED` without editing country

### Your Task

Refactor so that:

- A `createFormMediator()` exposes `register(name, colleague)` and `notify(from, event, payload)`
- Each field registers itself and calls `mediator.notify` on change — never calls another field directly
- State listens for `COUNTRY_CHANGED` and resets; city listens for `COUNTRY_CHANGED` and `STATE_CHANGED`
- Adding a field means one new colleague — country and state stay unchanged

Target interface:

```javascript
const mediator = createFormMediator();
const country = createCountryField(mediator);
const state   = createStateField(mediator);
const city    = createCityField(mediator);

state.set("NY");
country.set("US");
// [state] reset for US
// [city] reset

console.log(state.optionsFor("US")); // ['CA', 'NY']
```

---

### Hints

<details>
<summary>#1 — Mediator replaces constructor wiring</summary>

Fields no longer receive sibling references. Each factory takes only `mediator`:

`createCountryField(mediator)`, `createStateField(mediator)`, `createCityField(mediator)`.

When country changes, call `mediator.notify("country", "COUNTRY_CHANGED", { country: value })`. State and city react in `onNotify` — country never calls `state.reset()`.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createFormMediator() {
  const colleagues = new Map();
  return {
    register(name, colleague) { colleagues.set(name, colleague); },
    notify(from, event, payload) {
      for (const [name, colleague] of colleagues) {
        if (name === from) continue;
        colleague.onNotify(event, payload);
      }
    },
  };
}

function createCountryField(mediator) {
  let value = "";
  const field = {
    set(next) {
      value = next;
      mediator.notify("country", "COUNTRY_CHANGED", { country: value });
    },
    onNotify() {},
    get() { return value; },
  };
  mediator.register("country", field);
  return field;
}
```

State's `onNotify` handles `COUNTRY_CHANGED`; city's handles both `COUNTRY_CHANGED` and `STATE_CHANGED`.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
mediator = createFormMediator()

country.set(value):
  store value
  notify("country", "COUNTRY_CHANGED", { country: value })

state.onNotify("COUNTRY_CHANGED", payload):
  clear state value
  log reset for payload.country

state.set(value):
  store value
  notify("state", "STATE_CHANGED", { state: value })

city.onNotify(event):
  if COUNTRY_CHANGED or STATE_CHANGED → clear city value, log reset

// No field imports another field
// Postal code field: register + onNotify for STATE_CHANGED only
```

The mediator broadcasts to all *other* colleagues — each decides whether to react to the event.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createFormMediator() {
  const colleagues = new Map();

  return {
    register(name, colleague) {
      colleagues.set(name, colleague);
    },
    notify(from, event, payload) {
      for (const [name, colleague] of colleagues) {
        if (name === from) continue;
        colleague.onNotify(event, payload);
      }
    },
  };
}

function createCountryField(mediator) {
  let value = "";
  const field = {
    set(next) {
      value = next;
      mediator.notify("country", "COUNTRY_CHANGED", { country: value });
    },
    onNotify() {},
    get() { return value; },
  };
  mediator.register("country", field);
  return field;
}

function createStateField(mediator) {
  let value = "";
  const options = { US: ["CA", "NY"], CA: ["ON", "BC"] };
  const field = {
    set(next) {
      value = next;
      mediator.notify("state", "STATE_CHANGED", { state: value });
    },
    onNotify(event, payload) {
      if (event === "COUNTRY_CHANGED") {
        value = "";
        console.log(`[state] reset for ${payload.country}`);
      }
    },
    optionsFor(country) { return options[country] ?? []; },
    get() { return value; },
  };
  mediator.register("state", field);
  return field;
}

function createCityField(mediator) {
  let value = "";
  const field = {
    onNotify(event) {
      if (event === "COUNTRY_CHANGED" || event === "STATE_CHANGED") {
        value = "";
        console.log(`[city] reset`);
      }
    },
    get() { return value; },
  };
  mediator.register("city", field);
  return field;
}

const mediator = createFormMediator();
const country = createCountryField(mediator);
const state   = createStateField(mediator);
const city    = createCityField(mediator);

state.set("NY");
console.log(city.get()); // ''

country.set("US");
// [state] reset for US
// [city] reset

console.log(state.optionsFor("US")); // ['CA', 'NY']
```

**What changed:**

- Fields take only `mediator` — no sibling references in constructors
- Reset logic lives in each colleague's `onNotify`; country only emits events
- A new dependent field registers once and filters events it cares about

**Concepts at work:** This is **broadcast routing** — every colleague except the sender hears the event and filters locally. Contrast with Challenge 1's **targeted routes** table. Both are Mediator shapes; choose targeted routes when not everyone should hear every event. Contrast with **Observer**: observers subscribe to one subject; here peers communicate through a shared hub without knowing subscribers.

</details>

---

## When Not to Use the Mediator Pattern

A mediator earns its place when peers must react to each other without direct imports. Skip it when:

- **The flow is a fixed sequence.** Checkout validate → charge → receipt is an **Orchestrator** — steps run in order, not by peer events.
- **One source broadcasts and many listen passively.** A store emitting `change` to UI components is **Observer** — no routing rules between peers.
- **Only two modules interact.** A direct call or injected callback may be simpler than a mediator hub.
- **The mediator absorbs domain logic.** If `notify` implements inventory math and pricing, move logic back to colleagues — the mediator should route, not compute.

The rule of thumb: if peers need to react to each other's events without knowing who else exists, route through a Mediator. If you write "first A, then B, then C" in order, use an Orchestrator.

---

## What to Take Away

Before moving on, answer these from memory:

1. In Challenge 1, why does low-stock detection belong in `createInventory` rather than `createCart`?
2. What is the difference between Challenge 1's `routes` table and Challenge 2's broadcast-to-all-other-colleagues approach?
3. When would you choose a Mediator over an Orchestrator for a checkout flow — and when would Orchestrator win?
4. Your mediator's `notify` handler has grown to 200 lines of business logic. What do you refactor first?

---

*← [Mediator Pattern](/code/design-patterns/patterns/9-mediator-pattern)*
