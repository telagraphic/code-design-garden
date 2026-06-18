---
domain: code
section: design-patterns
chapter: challenges
title: "Factory Pattern Challenge"
order: 3
description: "Centralise branching construction logic into one factory so callers depend on a shared interface, not concrete implementations."
chapterLabel: "Challenges"
---

# Factory Pattern — Code Challenges


---

## Challenge 1 — The Duplicated Branch

### The Code

A notification system sends messages to users. Two functions each decide which notifier to build.

```javascript
function sendWelcome(user) {
  if (user.channel === "email") {
    console.log(`[email] → ${user.address}: Welcome aboard!`);
  } else if (user.channel === "sms") {
    console.log(`[sms] → ${user.address}: Welcome aboard!`);
  } else if (user.channel === "push") {
    console.log(`[push] → ${user.address}: Welcome aboard!`);
  }
}

function sendOrderUpdate(user, orderId) {
  if (user.channel === "email") {
    console.log(`[email] → ${user.address}: Order ${orderId} shipped.`);
  } else if (user.channel === "sms") {
    console.log(`[sms] → ${user.address}: Order ${orderId} shipped.`);
  } else if (user.channel === "push") {
    console.log(`[push] → ${user.address}: Order ${orderId} shipped.`);
  }
}

// Test it
const user = { channel: "email", address: "ada@example.com" };
sendWelcome(user);
sendOrderUpdate(user, "ORD-42");
```

### What's Wrong

The channel branching is identical in both functions. Run this and then ask: what happens when you add `"slack"` as a fourth channel?

You edit `sendWelcome`. You edit `sendOrderUpdate`. You search for any other function with the same switch — maybe `sendPasswordReset`, `sendPromotion`, and three more. Every one of them needs the same new branch, in the right order, with no typos.

Three problems:

1. **Duplicated branching** — the same `if/else` tree is copied across every send function; they will drift
2. **Mixed responsibilities** — send functions handle both *what* to say and *how* to deliver it
3. **No shared contract** — there is no enforced shape that every notifier must implement; a typo in one branch silently does nothing

### Your Task

Refactor so that:

- A `createNotifier(channel)` factory owns the branching logic — it is the only place that knows about channels
- Each notifier returned by the factory has a `send(address, message)` method
- `createNotifier` throws a `RangeError` for unknown channels
- `sendWelcome` and `sendOrderUpdate` call the factory and use the `send` interface — no channel branching inside them

Target interface:

```javascript
const notifier = createNotifier("email");
notifier.send("ada@example.com", "Welcome aboard!");
// [email] → ada@example.com: Welcome aboard!

const sms = createNotifier("sms");
sms.send("+447700900000", "Your order shipped.");
// [sms] → +447700900000: Your order shipped.

// Adding "slack" later only touches createNotifier:
function sendWelcome(user) {
  const notifier = createNotifier(user.channel);
  notifier.send(user.address, "Welcome aboard!");
}
```

---

### Hints

<details>
<summary>#1 — What to extract and where</summary>

The branch that decides which notifier to build is the thing to move. Right now it lives inside each send function. It belongs in one dedicated function — `createNotifier` — that takes a channel string and returns the right object.

Once the factory owns the decision, every send function shrinks to two lines: call the factory, call `send`. They never see a channel branch again.

Think of it as pulling the "vending machine" logic out of every consumer and putting it in one machine that every consumer calls.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createNotifier(channel) {
  const notifiers = {
    email: {
      send(address, message) { /* console.log the email format */ },
    },
    sms: {
      send(address, message) { /* console.log the sms format */ },
    },
    push: {
      send(address, message) { /* console.log the push format */ },
    },
  };

  const notifier = notifiers[channel];
  if (!notifier) throw new RangeError(`unknown channel: ${channel}`);
  return notifier;
}
```

Every value in the registry has the same shape: `{ send(address, message) }`. That shared shape is the **product interface** — callers depend on it, not on which concrete object was returned.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createNotifier(channel):
  registry = {
    "email": object with send(address, msg) → log "[email] → address: msg"
    "sms":   object with send(address, msg) → log "[sms] → address: msg"
    "push":  object with send(address, msg) → log "[push] → address: msg"
  }

  product = registry[channel]
  if no product → throw RangeError("unknown channel: {channel}")
  return product

function sendWelcome(user):
  notifier = createNotifier(user.channel)
  notifier.send(user.address, "Welcome aboard!")

function sendOrderUpdate(user, orderId):
  notifier = createNotifier(user.channel)
  notifier.send(user.address, "Order {orderId} shipped.")
```

To add "slack": add one entry to the registry. `sendWelcome` and `sendOrderUpdate` are untouched.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createNotifier(channel) {
  const notifiers = {
    email: {
      send(address, message) {
        console.log(`[email] → ${address}: ${message}`);
      },
    },
    sms: {
      send(address, message) {
        console.log(`[sms] → ${address}: ${message}`);
      },
    },
    push: {
      send(address, message) {
        console.log(`[push] → ${address}: ${message}`);
      },
    },
  };

  const notifier = notifiers[channel];
  if (!notifier) throw new RangeError(`unknown channel: ${channel}`);
  return notifier;
}

function sendWelcome(user) {
  const notifier = createNotifier(user.channel);
  notifier.send(user.address, "Welcome aboard!");
}

function sendOrderUpdate(user, orderId) {
  const notifier = createNotifier(user.channel);
  notifier.send(user.address, `Order ${orderId} shipped.`);
}

// --- Verify ---
const ada = { channel: "email", address: "ada@example.com" };
const grace = { channel: "sms", address: "+447700900000" };

sendWelcome(ada);            // [email] → ada@example.com: Welcome aboard!
sendWelcome(grace);          // [sms] → +447700900000: Welcome aboard!
sendOrderUpdate(ada, "ORD-42");  // [email] → ada@example.com: Order ORD-42 shipped.

// Unknown channel throws in one place:
try {
  createNotifier("fax");
} catch (e) {
  console.log(e.message);    // unknown channel: fax
}
```

**What changed:**

- The `if/else` branch lives once — inside `createNotifier`. Every send function is now two lines
- Each send function is only responsible for *what* to say — the factory decides *how* to deliver it
- Adding "slack" means one new registry entry; no send function changes

**Concepts at work:** This is the **open/closed principle** in action — `createNotifier` is open for extension (add a registry entry) but closed for modification (existing logic stays untouched). The registry is a **product interface contract**: every value must expose `send(address, message)`, and callers depend on that shape rather than on any specific implementation. This separation is called **dependency inversion** — send functions depend on the capability, not the class.

</details>

---

## Challenge 2 — The Hardcoded Store

### The Code

A session module saves and reads user state. It works in the browser — but only in the browser, only with `localStorage`, and only as long as nobody wants to swap the storage backend.

```javascript
function saveSession(data) {
  localStorage.setItem("session", JSON.stringify(data));
}

function loadSession() {
  const raw = localStorage.getItem("session");
  return raw ? JSON.parse(raw) : null;
}

function clearSession() {
  localStorage.removeItem("session");
}

// Test it (browser only)
saveSession({ userId: 1, role: "admin" });
console.log(loadSession()); // { userId: 1, role: "admin" }
clearSession();
console.log(loadSession()); // null
```

### What's Wrong

Try running this in Node — it throws immediately because `localStorage` doesn't exist. Try writing a unit test — you have to mock the global. Try switching a user to `sessionStorage` — you edit every function.

Three problems:

1. **Hardcoded backend** — `localStorage` is referenced directly in every function; there is no seam to swap it
2. **Untestable** — tests must mock a global (`localStorage`) rather than inject a fake
3. **No shared interface** — if you copy these functions for `sessionStorage`, you now have two separate, identical-looking families that have to stay in sync

### Your Task

Refactor into a `createStorage(type)` factory that:

- Accepts `"local"`, `"session"`, or `"memory"` as the type
- Returns an object with `get(key)`, `set(key, value)`, and `remove(key)` methods
- `"memory"` uses a plain `Map` — works in any REPL or Node environment
- Throws a `RangeError` for unknown types
- The session functions (`saveSession`, `loadSession`, `clearSession`) take a storage instance and use the interface — they do not know or care which backend is running

Target interface:

```javascript
// In a REPL or Node — use "memory"
const store = createStorage("memory");

store.set("session", { userId: 1, role: "admin" });
console.log(store.get("session")); // { userId: 1, role: "admin" }
store.remove("session");
console.log(store.get("session")); // null

// In a browser — swap to "local" with zero changes to session logic
const browserStore = createStorage("local");
```

---

### Hints

<details>
<summary>#1 — The two things to separate</summary>

Right now the session functions contain two decisions at once: *what key to use* and *which storage backend to use*. The factory separates them.

The factory owns the backend decision — it returns the right `{ get, set, remove }` implementation for the given type. The session functions own the key and data shape — they call `storage.get("session")` without caring what's underneath.

This is the same "vending machine" move as Challenge 1, but for object construction rather than notification: the factory picks the product, the caller uses the interface.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createStorage(type) {
  const backends = {
    memory: {
      // backed by a Map — declare it somewhere it persists across calls
      get(key)         { /* return parsed value or null */ },
      set(key, value)  { /* store value */ },
      remove(key)      { /* delete entry */ },
    },
    local: {
      get(key)         { /* JSON.parse(localStorage.getItem(key)) */ },
      set(key, value)  { /* localStorage.setItem(key, JSON.stringify(value)) */ },
      remove(key)      { /* localStorage.removeItem(key) */ },
    },
    session: {
      // same shape as local, but sessionStorage
    },
  };

  const backend = backends[type];
  if (!backend) throw new RangeError(`unknown storage type: ${type}`);
  return backend;
}
```

For `"memory"`: the `Map` needs to be in scope when `get`, `set`, and `remove` close over it. Declare it inside the `memory` block before the methods, or in the outer scope.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createStorage(type):
  backends = {
    "memory": (() => {
      const store = new Map()
      return {
        get(key)        → store.has(key) ? store.get(key) : null
        set(key, value) → store.set(key, value)
        remove(key)     → store.delete(key)
      }
    })(),                            ← IIFE so each "memory" entry gets its own Map

    "local": {
      get(key)        → JSON.parse(localStorage.getItem(key) ?? "null")
      set(key, value) → localStorage.setItem(key, JSON.stringify(value))
      remove(key)     → localStorage.removeItem(key)
    },

    "session": { same shape, sessionStorage }
  }

  backend = backends[type]
  if no backend → throw RangeError("unknown storage type: {type}")
  return backend

function saveSession(storage, data):
  storage.set("session", data)

function loadSession(storage):
  return storage.get("session")

function clearSession(storage):
  storage.remove("session")
```

The IIFE on `"memory"` creates a new `Map` per factory call, so two `createStorage("memory")` calls each get independent storage — the same isolation as Challenge 1's independent counter instances.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createStorage(type) {
  const backends = {
    memory: (() => {
      const store = new Map();
      return {
        get(key)         { return store.has(key) ? store.get(key) : null; },
        set(key, value)  { store.set(key, value); },
        remove(key)      { store.delete(key); },
      };
    })(),
    local: {
      get(key)         { return JSON.parse(localStorage.getItem(key) ?? "null"); },
      set(key, value)  { localStorage.setItem(key, JSON.stringify(value)); },
      remove(key)      { localStorage.removeItem(key); },
    },
    session: {
      get(key)         { return JSON.parse(sessionStorage.getItem(key) ?? "null"); },
      set(key, value)  { sessionStorage.setItem(key, JSON.stringify(value)); },
      remove(key)      { sessionStorage.removeItem(key); },
    },
  };

  const backend = backends[type];
  if (!backend) throw new RangeError(`unknown storage type: ${type}`);
  return backend;
}

function saveSession(storage, data)  { storage.set("session", data); }
function loadSession(storage)        { return storage.get("session"); }
function clearSession(storage)       { storage.remove("session"); }

// --- Verify (works in any REPL) ---
const store = createStorage("memory");

saveSession(store, { userId: 1, role: "admin" });
console.log(loadSession(store));  // { userId: 1, role: 'admin' }

clearSession(store);
console.log(loadSession(store));  // null

// Swap backend — session functions unchanged:
const store2 = createStorage("memory");
saveSession(store2, { userId: 2 });
console.log(loadSession(store2)); // { userId: 2 }
console.log(loadSession(store));  // null — independent instances

// Unknown type:
try {
  createStorage("cookie");
} catch (e) {
  console.log(e.message);         // unknown storage type: cookie
}
```

**What changed:**

- `localStorage` is referenced in exactly one place — inside the `"local"` backend object
- Session functions accept a `storage` argument — the backend is **injected**, not hardcoded
- Swapping to `"memory"` for tests or `"session"` for a different retention policy is a one-word change at the call site

**Concepts at work:** Accepting the storage instance as an argument instead of hardcoding the backend is **dependency injection** — the session functions declare what they need (a `{ get, set, remove }` interface) and receive it from outside, rather than reaching for a global. The factory is the **seam** that makes this possible: it owns the "which backend?" decision so that every other function only depends on the shared interface. This is what makes the code testable — pass `createStorage("memory")` in tests, `createStorage("local")` in production, same session logic either way.

</details>

---

## When Not to Use the Factory Pattern

A factory earns its place when the "which kind?" decision would otherwise be repeated. Skip it when:

- **There is only one implementation.** `function createUser(data) { return { ...data } }` is just a constructor wrapper. If there is no second variant on the roadmap, the factory adds a level of indirection that returns nothing.
- **The branch exists in one place.** If a single `if` lives in one file and only one file, moving it to a factory trades direct code for a layer of abstraction nobody asked for.
- **Products have fundamentally different interfaces.** A factory works because every product satisfies the same contract. If `"email"` needs `send(address, subject, body)` and `"push"` needs `push(deviceId, payload)`, callers will branch anyway — the factory solved construction but not usage.
- **You need multi-step assembly.** If building the product requires many optional steps (build a query, add filters, set a limit, run it), that is a **Builder**, not a Factory. Factories pick *which* product; builders assemble *one* product incrementally.

The rule of thumb: if the same `if/else` or `switch` on a type string appears in more than one file, that is the factory waiting to be extracted.

---

## What to Take Away

Before moving on, answer these from memory:

1. In Challenge 1, what specifically has to change when you add a fourth channel — and how does that differ from the original code?
2. Why does each registry value need to satisfy the same interface (`send` or `get/set/remove`)? What breaks for callers if one variant exposes different method names?
3. In Challenge 2, why is `"memory"` built with an IIFE while `"local"` is a plain object literal? What would break if `"memory"` were a plain object too?
4. What is the difference between the Factory and Builder patterns — when does one become the other?

---

*← [Factory Pattern](/code/design-patterns/patterns/2-factory-pattern)*
