---
domain: code
section: design-patterns
chapter: challenges
title: "Adapter Pattern Challenge"
order: 11
description: "Centralise interface translation in an adapter so clients keep a stable target API while legacy or third-party adaptees stay unchanged."
chapterLabel: "Challenges"
---

# Adapter Pattern — Code Challenges

---

## Challenge 1 — The Scattered Field Map

### The Code

UI modules call a legacy profile API directly. Each one maps snake_case fields to the shape the UI needs.

```javascript
const legacyApi = {
  fetchProfile(userId) {
    console.log(`[legacy] GET /profiles/${userId}`);
    return {
      user_name: "Grace Hopper",
      email_addr: "grace@example.com",
      member_since: 1952,
    };
  },
};

function renderProfileHeader(userId) {
  const raw = legacyApi.fetchProfile(userId);
  const name = raw.user_name;
  const email = raw.email_addr;
  return `<header><h1>${name}</h1><p>${email}</p></header>`;
}

function sendWelcomeEmail(userId) {
  const raw = legacyApi.fetchProfile(userId);
  const name = raw.user_name;
  console.log(`[mail] Welcome, ${name}! → ${raw.email_addr}`);
}

console.log(renderProfileHeader(42));
sendWelcomeEmail(42);
```

The legacy team renames `email_addr` to `email_address`. You grep for `email_addr` across the codebase and hope you found every call site.

### What's Wrong

Run this and ask: what happens when a third consumer — settings page, avatar upload, analytics — also needs `{ name, email }`?

You copy the same two-line field map again. UI code imports `legacyApi` and knows about foreign field names. Tests for `renderProfileHeader` are coupled to the legacy response shape.

Three problems:

1. **Translation duplicated at every call site** — `user_name` / `email_addr` mapping repeated
2. **Client coupled to adaptee** — UI modules import the legacy API directly
3. **No stable target interface** — there is no shared `getUser(id)` contract for new code to depend on

### Your Task

Refactor so that:

- A `createUserService(adaptee)` adapter exposes `getUser(id)` returning `{ name, email }`
- `renderProfileHeader` and `sendWelcomeEmail` accept a `users` service — they never import `legacyApi` or snake_case fields
- Field mapping lives in exactly one place — the adapter
- Swapping the legacy API means changing the adapter's internals only

Target interface:

```javascript
const users = createUserService(legacyApi);

function renderProfileHeader(userId, users) {
  const { name, email } = users.getUser(userId);
  return `<header><h1>${name}</h1><p>${email}</p></header>`;
}

console.log(renderProfileHeader(42, users));
// [legacy] GET /profiles/42
// <header><h1>Grace Hopper</h1><p>grace@example.com</p></header>
```

---

### Hints

<details>
<summary>#1 — One translator, many clients</summary>

The adapter is the **only** module that calls `fetchProfile` and knows about `user_name`. Every consumer depends on the **target** interface:

```javascript
users.getUser(id) → { name, email }
```

Move the two mapping lines out of each function into `createUserService`.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createUserService(adaptee) {
  return {
    getUser(id) {
      const raw = adaptee.fetchProfile(id);
      return {
        name: raw.user_name,
        email: raw.email_addr,
      };
    },
  };
}

function renderProfileHeader(userId, users) {
  const { name, email } = users.getUser(userId);
  return `<header><h1>${name}</h1><p>${email}</p></header>`;
}

function sendWelcomeEmail(userId, users) {
  const { name, email } = users.getUser(userId);
  console.log(`[mail] Welcome, ${name}! → ${email}`);
}
```

Inject `users` at the call site — tests pass a fake adaptee behind the same adapter.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createUserService(adaptee):
  return {
    getUser(id):
      raw = adaptee.fetchProfile(id)
      return {
        name:  raw.user_name
        email: raw.email_addr
      }
  }

users = createUserService(legacyApi)

renderProfileHeader(userId, users):
  { name, email } = users.getUser(userId)   ← no legacyApi import
  return HTML string

sendWelcomeEmail(userId, users):
  { name, email } = users.getUser(userId)
  log welcome message
```

When `email_addr` renames, edit one adapter — not every consumer.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
const legacyApi = {
  fetchProfile(userId) {
    console.log(`[legacy] GET /profiles/${userId}`);
    return {
      user_name: "Grace Hopper",
      email_addr: "grace@example.com",
      member_since: 1952,
    };
  },
};

function createUserService(adaptee) {
  return {
    getUser(id) {
      const raw = adaptee.fetchProfile(id);
      return {
        name: raw.user_name,
        email: raw.email_addr,
      };
    },
  };
}

function renderProfileHeader(userId, users) {
  const { name, email } = users.getUser(userId);
  return `<header><h1>${name}</h1><p>${email}</p></header>`;
}

function sendWelcomeEmail(userId, users) {
  const { name, email } = users.getUser(userId);
  console.log(`[mail] Welcome, ${name}! → ${email}`);
}

// --- Verify ---
const users = createUserService(legacyApi);

console.log(renderProfileHeader(42, users));
// [legacy] GET /profiles/42
// <header><h1>Grace Hopper</h1><p>grace@example.com</p></header>

sendWelcomeEmail(42, users);
// [legacy] GET /profiles/42
// [mail] Welcome, Grace Hopper! → grace@example.com

// Test double — no legacy API needed:
const fakeAdaptee = {
  fetchProfile(id) {
    return { user_name: "Test User", email_addr: "test@example.com" };
  },
};
const testUsers = createUserService(fakeAdaptee);
console.log(renderProfileHeader(1, testUsers));
// <header><h1>Test User</h1><p>test@example.com</p></header>
```

**What changed:**

- Field mapping consolidated in `createUserService` — consumers use `{ name, email }` only
- UI functions accept injected `users` — no direct legacy imports
- Tests stub the adaptee; the adapter still exercises the mapping

**Concepts at work:** The adapter implements the **target** interface (`getUser`) against an **adaptee** (`fetchProfile` + snake_case). This is an **object adapter** — a wrapper that translates shape. Contrast with **Decorator**: if the wrapper added logging while keeping `fetchProfile`, that would be same-interface wrapping.

</details>

---

## Challenge 2 — The Stringly Storage

### The Code

A preferences module reads and writes theme settings. It talks to `localStorage` directly and repeats JSON serialization at every call site.

```javascript
function loadTheme() {
  const raw = localStorage.getItem("theme");
  if (raw === null) return "light";
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function saveTheme(theme) {
  localStorage.setItem("theme", JSON.stringify(theme));
}

function loadSidebarCollapsed() {
  const raw = localStorage.getItem("sidebarCollapsed");
  if (raw === null) return false;
  return JSON.parse(raw);
}

function saveSidebarCollapsed(value) {
  localStorage.setItem("sidebarCollapsed", JSON.stringify(value));
}

saveTheme("dark");
console.log(loadTheme()); // dark

saveSidebarCollapsed(true);
console.log(loadSidebarCollapsed()); // true
```

Unit tests cannot run without mocking `localStorage`. Adding a third preference copies the parse/stringify boilerplate again.

### What's Wrong

Run this and ask: what happens when tests need an in-memory backend — or production moves to IndexedDB?

Every preference function knows about `localStorage`, string serialization, and null handling. The **target** interface your app wants (`get` / `set` with objects) is mixed with the **adaptee** interface (`getItem` / `setItem` with strings).

Three problems:

1. **Impedance mismatch** — browser storage is stringly; app code wants typed values
2. **Duplicated serialization** — `JSON.parse` / `JSON.stringify` copied per key
3. **Hard to swap backends** — every function hardcodes `localStorage`

### Your Task

Refactor so that:

- Define a target store interface: `get(key)`, `set(key, value)`, `remove(key)`, `has(key)` returning objects (not strings)
- `createMemoryStore()` implements the target for tests
- `createLocalStorageAdapter(storage)` adapts `localStorage` to the target — serialization lives here only
- `createPreferences(store)` accepts any store matching the target — `loadTheme` / `saveTheme` use `store.get` / `store.set`

Target interface:

```javascript
function createPreferences(store) {
  return {
    loadTheme() { return store.get("theme") ?? "light"; },
    saveTheme(theme) { store.set("theme", theme); },
    loadSidebarCollapsed() { return store.get("sidebarCollapsed") ?? false; },
    saveSidebarCollapsed(value) { store.set("sidebarCollapsed", value); },
  };
}

const testPrefs = createPreferences(createMemoryStore());
testPrefs.saveTheme("dark");
console.log(testPrefs.loadTheme()); // dark

const prodPrefs = createPreferences(createLocalStorageAdapter());
prodPrefs.saveTheme("dark");
console.log(prodPrefs.loadTheme()); // dark
```

---

### Hints

<details>
<summary>#1 — Adapter vs changing every consumer</summary>

Consumers want `store.get("theme")` → `"dark"`. The adaptee gives `localStorage.getItem("theme")` → `'\"dark\"'`.

The adapter converts between those shapes once. `createPreferences` never calls `localStorage` or `JSON.parse`.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createMemoryStore() {
  const data = new Map();
  return {
    get(key) { return data.get(key) ?? null; },
    set(key, value) { data.set(key, value); },
    remove(key) { data.delete(key); },
    has(key) { return data.has(key); },
  };
}

function createLocalStorageAdapter(storage = localStorage) {
  return {
    get(key) {
      const raw = storage.getItem(key);
      if (raw === null) return null;
      try { return JSON.parse(raw); }
      catch { return raw; }
    },
    set(key, value) { storage.setItem(key, JSON.stringify(value)); },
    remove(key) { storage.removeItem(key); },
    has(key) { return storage.getItem(key) !== null; },
  };
}

function createPreferences(store) {
  return {
    loadTheme() { return store.get("theme") ?? "light"; },
    saveTheme(theme) { store.set("theme", theme); },
    // …
  };
}
```

Tests inject `createMemoryStore()`; production injects `createLocalStorageAdapter()`.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
createMemoryStore():
  private Map
  get(key) → value or null
  set(key, value) → store in Map

createLocalStorageAdapter(storage):
  get(key):
    raw = storage.getItem(key)
    if null → return null
    try JSON.parse(raw) else return raw string
  set(key, value):
    storage.setItem(key, JSON.stringify(value))

createPreferences(store):
  loadTheme(): return store.get("theme") ?? "light"
  saveTheme(theme): store.set("theme", theme)
  loadSidebarCollapsed(): return store.get("sidebarCollapsed") ?? false
  saveSidebarCollapsed(v): store.set("sidebarCollapsed", v)

// Tests:
prefs = createPreferences(createMemoryStore())

// Production:
prefs = createPreferences(createLocalStorageAdapter())
```

The adapter is the only place that knows strings live in `localStorage`.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createMemoryStore() {
  const data = new Map();
  return {
    get(key) { return data.get(key) ?? null; },
    set(key, value) { data.set(key, value); },
    remove(key) { data.delete(key); },
    has(key) { return data.has(key); },
  };
}

function createLocalStorageAdapter(storage = localStorage) {
  return {
    get(key) {
      const raw = storage.getItem(key);
      if (raw === null) return null;
      try { return JSON.parse(raw); }
      catch { return raw; }
    },
    set(key, value) {
      storage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
      storage.removeItem(key);
    },
    has(key) {
      return storage.getItem(key) !== null;
    },
  };
}

function createPreferences(store) {
  return {
    loadTheme() {
      return store.get("theme") ?? "light";
    },
    saveTheme(theme) {
      store.set("theme", theme);
    },
    loadSidebarCollapsed() {
      return store.get("sidebarCollapsed") ?? false;
    },
    saveSidebarCollapsed(value) {
      store.set("sidebarCollapsed", value);
    },
  };
}

// --- Verify: in-memory (tests) ---
const testPrefs = createPreferences(createMemoryStore());
testPrefs.saveTheme("dark");
testPrefs.saveSidebarCollapsed(true);
console.log(testPrefs.loadTheme());           // dark
console.log(testPrefs.loadSidebarCollapsed()); // true

// --- Verify: localStorage adapter (production) ---
const prodPrefs = createPreferences(createLocalStorageAdapter());
prodPrefs.saveTheme("dark");
console.log(prodPrefs.loadTheme()); // dark
console.log(localStorage.getItem("theme")); // "dark" (JSON string)

// Clear for REPL hygiene
createLocalStorageAdapter().remove("theme");
createLocalStorageAdapter().remove("sidebarCollapsed");
```

**What changed:**

- JSON serialization moved into `createLocalStorageAdapter` — one place
- `createPreferences` depends on the target `{ get, set }` interface — backend injected at bootstrap
- Tests use `createMemoryStore()` without touching `localStorage`

**Concepts at work:** The **target** interface is object in / object out. The **adaptee** (`localStorage`) is string in / string out. The adapter bridges **impedance mismatch**. This also enables **dependency injection** — same preferences logic, different backend. Contrast with **Proxy**: a caching proxy would keep the same `get`/`set` signature and add cache behaviour; here the signature change (objects vs strings) signals **Adapter**.

</details>

---

## When Not to Use the Adapter Pattern

An adapter earns its place when two interfaces must work together without changing either side. Skip it when:

- **There is no mismatch.** If the library already exposes `getUser(id)` with the shape you need, import it directly — no adapter layer.
- **You need to add logging or retry on the same method names.** That is a **Decorator** or **Proxy**, not an Adapter — the interface did not change.
- **The adapter becomes a junk drawer.** Discount rules, validation, and retry logic in the adapter mean domain code landed in the wrong place — translate only.
- **You control both sides.** If you own the legacy API and all consumers, migrate the API once instead of maintaining an adapter forever.

The rule of thumb: if the wrapper exists because inner names or shapes differ from what callers expect, it is an Adapter. If it keeps the same signature and adds behaviour, look elsewhere.

---

## What to Take Away

Before moving on, answer these from memory:

1. In Challenge 1, what breaks if `email_addr` renames and mapping lives at three call sites?
2. In Challenge 2, why does serialization belong in the adapter rather than in `createPreferences`?
3. An adapter adds retry and logging around `fetchProfile` while still exposing `getUser`. Is it still an Adapter — or has it become a Decorator?
4. What is the difference between Adapter and Facade — when would you use both?

---

*← [Adapter Pattern](/code/design-patterns/patterns/11-adapter-pattern)*
