---
domain: code
section: design-patterns
chapter: patterns
title: "Mediator Pattern"
order: 9
description: "A central coordinator routes messages between peers so colleagues never reference each other directly."
chapterLabel: "Patterns"
---

# Mediator Pattern

> A hub sits between peers. Colleagues send messages to the Mediator; the Mediator decides who hears what — no colleague imports another.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Behavioral |
| Participants | Mediator (message router), Colleagues (peers that register and respond) |
| Pairs well with | Module (each colleague is an encapsulated module), Observer (colleagues subscribe via the mediator), Command (actions dispatched as named commands) |
| Don't pair with | Orchestrator — Orchestrator sequences a directed workflow; Mediator routes peer events without owning order |
| Use cases | Dependent form fields, chat rooms, shopping cart + inventory + summary UI, modal/dialog coordination, cross-widget dashboards |
| Maintenance cost | Low when the mediator only routes and colleagues own their logic; high when routing rules sprawl or the mediator absorbs domain work |

## Basic Code

A chat room Mediator registers users and routes messages. Users call `send` on the room — they never call each other.

```javascript
function createChatRoom() {
  const members = new Map();

  return {
    join(name, onMessage) {
      members.set(name, onMessage);
    },
    send(from, text) {
      for (const [name, onMessage] of members) {
        if (name !== from) onMessage({ from, text });
      }
    },
  };
}

const room = createChatRoom();
room.join("Ada",   (msg) => console.log(`Ada heard: ${msg.from}: ${msg.text}`));
room.join("Grace", (msg) => console.log(`Grace heard: ${msg.from}: ${msg.text}`));

room.send("Ada", "Hello everyone");
// Grace heard: Ada: Hello everyone
```

Each user only knows the room's API (`join`, `send`). The room decides who receives each message.

## How it works

The Mediator pattern has two rules: **colleagues talk only to the Mediator; the Mediator owns all routing.**

```
       ┌─────────────────────────────────┐
       │           Mediator            │
       │  register(name, handler)      │
       │  notify(event, payload)       │
       └─────────────────────────────────┘
          ▲      ▲      ▲      │
          │      │      │      │
     send │ send │ send │ onNotify
          │      │      │      ▼
      [Cart] [Inventory] [Summary] [UI badge]
     colleague colleague colleague colleague
```

**Routing vs broadcasting:** A naive broadcast sends every event to every colleague. A Mediator applies **routing rules** — `ITEM_ADDED` goes to inventory and summary, but not to the toast module unless stock is low. The mediator encodes who cares about what.

**Colleagues stay dumb about each other:** A cart colleague emits `ITEM_ADDED`; it does not import inventory to decrement stock. Inventory registers interest in that event with the mediator. Adding a new colleague (analytics, loyalty points) means one registration — existing colleagues stay untouched.

**Mediator vs Observer:** Observer is many-to-one notification — subscribers react but do not negotiate. A Mediator adds **targeted delivery** and can transform or filter messages before forwarding. The mediator is the only object that knows the full graph of who listens to what.

## In Practice

### When to use

- Several UI or domain modules must react to each other's changes and the coupling web is growing
- You need to add or remove a participant without editing the others
- Routing rules (who hears which event) should live in one place, not scattered across imports

### Anti-patterns

```javascript
// Anti-pattern: colleagues calling each other directly
const cart = {
  add(item) {
    this.items.push(item);
    inventory.decrement(item.sku);      // cart knows inventory
    summary.updateTotal(this.total());  // cart knows summary
    badge.setCount(this.items.length);  // cart knows badge
  },
};
```

Every new reaction to "item added" means editing `cart.add`. The cart module imports three others and becomes the coupling hub by accident — the opposite of what a Mediator provides.

```javascript
// Anti-pattern: Mediator as god object
function createMediator() {
  return {
    notify(event, payload) {
      if (event === "ITEM_ADDED") {
        // inventory logic inlined here
        stock[payload.sku] -= 1;
        if (stock[payload.sku] < 5) showLowStockBanner(payload.sku);
        // cart total logic inlined here
        total += payload.price;
        // ... 80 more lines
      }
    },
  };
}
```

When the Mediator contains domain rules, it becomes harder to test than the direct-coupling version. Colleagues should own their behaviour; the Mediator should route events and maybe apply simple filters — not implement business logic.

> **Rule of thumb:** If you find yourself writing "first do A, then pass its result to B, then pass both to C," and these are separate modules — that is an Orchestrator. If peers need to react to each other's events without knowing who else exists, route through a Mediator.

## Code Examples

### Basic — Chat Room

Users join a room and send messages. The room forwards to every other member — colleagues never hold references to each other.

```javascript
function createChatRoom() {
  const members = new Map();

  return {
    join(name, onMessage) {
      if (members.has(name)) throw new Error(`already joined: ${name}`);
      members.set(name, onMessage);
    },
    leave(name) {
      members.delete(name);
    },
    send(from, text) {
      if (!members.has(from)) throw new RangeError(`not in room: ${from}`);
      for (const [name, onMessage] of members) {
        if (name !== from) onMessage({ from, text });
      }
    },
    list() { return [...members.keys()]; },
  };
}

const room = createChatRoom();

room.join("Ada",   (msg) => console.log(`[Ada]   ${msg.from}: ${msg.text}`));
room.join("Grace", (msg) => console.log(`[Grace] ${msg.from}: ${msg.text}`));
room.join("Alan",  (msg) => console.log(`[Alan]  ${msg.from}: ${msg.text}`));

room.send("Ada", "Ship it");
// [Grace] Ada: Ship it
// [Alan]  Ada: Ship it

room.leave("Grace");
room.send("Alan", "Tests pass");
// [Ada] Alan: Tests pass   — Grace hears nothing

console.log(room.list()); // ['Ada', 'Alan']
```

**What to notice:**

- `Ada`, `Grace`, and `Alan` only call `room.join` and `room.send` — no cross-imports
- Adding a fourth user is one `join` call; existing users are unchanged
- `leave` is handled by the Mediator updating its registry — colleagues do not unsubscribe from each other

### Basic — Dependent Form Fields

Country, state, and city fields register with a form Mediator. Changing country clears state and city through routed events — fields never import each other.

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
    onNotify() { /* country is the source — it does not reset itself */ },
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
city.get(); // '' initially

country.set("US");
// [state] reset for US
// [city] reset

console.log(state.optionsFor("US")); // ['CA', 'NY']
```

**What to notice:**

- Each field calls `mediator.notify` when it changes — it does not call `state.reset()` directly
- Reset logic lives inside each colleague's `onNotify` — the Mediator only forwards
- Adding a "postal code" field means one new colleague registering for `STATE_CHANGED` — country and state stay unchanged

### Medium — Shopping UI Coordinator

Cart, inventory, and summary colleagues communicate through a Mediator with named events. Routing rules decide who hears what — not every colleague receives every message.

```javascript
function createShoppingMediator() {
  const routes = {
    ITEM_ADDED:    ["inventory", "summary"],
    ITEM_REMOVED:  ["summary"],
    STOCK_LOW:     ["summary"],
    TOTAL_CHANGED: ["summary"],
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
    remove(sku) {
      items.splice(items.findIndex(i => i.sku === sku), 1);
      mediator.notify("cart", "ITEM_REMOVED", { sku });
      mediator.notify("cart", "TOTAL_CHANGED", { total: cart.total() });
    },
    total() { return items.reduce((s, i) => s + i.price, 0); },
    onNotify() { /* cart does not listen */ },
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
// [inventory] mug-1 → 9 left
// [summary] total: $12

cart.add({ sku: "hat-2", name: "Hat", price: 24 });
// [inventory] hat-2 → 2 left
// [summary] warning: hat-2 low
// [summary] total: $36

console.log(summary.getSnapshot());
// { total: 36, warnings: ['hat-2 low (2)'] }
```

**What to notice:**

- The `routes` table is the single place that defines who hears which event — add analytics by extending the table, not editing cart
- Cart never imports inventory or summary; it only emits named events
- Inventory can emit `STOCK_LOW` back through the mediator — peers can initiate downstream notifications without direct calls

## Trade-offs

| Pro | Con |
| --- | --- |
| Colleagues decouple — add or remove a participant without editing the others | The Mediator becomes a central dependency; its routing table must stay accurate as events grow |
| Routing rules live in one place instead of scattered imports | Over-broadcasting (every event to everyone) erases the benefit — targeted routes require upfront design |
| Each colleague is testable in isolation by stubbing `onNotify` | A Mediator that absorbs domain logic becomes a god object harder to maintain than direct coupling |
| Event names document the collaboration contract between peers | Debugging requires tracing event flow through the hub — stack traces are less direct than function calls |

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Orchestrator | Drives a directed sequence via direct calls; Mediator routes peer events without owning step order. |
| Observer | Broadcasts to all subscribers; Mediator adds targeted routing and can filter or transform messages. |
| State Machine | Can act as a Mediator when transitions fan out events to multiple UI pieces. |
| Command | Colleague actions can be encapsulated as commands the Mediator dispatches, enabling undo or replay. |
| Module | Each colleague belongs behind a module boundary; the Mediator exposes only `register` and `notify`. |

## Further Reading

- [Mediator — Refactoring.Guru](https://refactoring.guru/design-patterns/mediator)
- [Mediator pattern — patterns.dev](https://www.patterns.dev/vanilla/mediator-pattern)
- [Orchestration vs Choreography — Martin Fowler](https://martinfowler.com/articles/201701-event-driven.html)

## Self-check questions

1. Three modules import each other in a triangle (`A → B → C → A`). How would a Mediator break that cycle — and what would each module call instead of its peers?
2. Your Mediator's `notify` handler has grown to 200 lines of inventory, pricing, and UI logic. Where should that logic move, and what should remain in the Mediator?
3. A real-time chat app needs message delivery, typing indicators, and read receipts. Would you choose a Mediator or an Orchestrator — and what is the deciding factor?
