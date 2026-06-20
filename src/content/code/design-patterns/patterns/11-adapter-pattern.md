---
domain: code
section: design-patterns
chapter: patterns
title: "Adapter Pattern"
order: 11
description: "Translate one interface into another so existing code can work with a library or API it was not written for — without changing either side."
chapterLabel: "Patterns"
---

# Adapter Pattern

> Something expects `getUser(id)`; the library exposes `fetchProfile(userId)`. The Adapter sits between them and translates — neither side learns the other's shape.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Structural |
| Participants | Target (interface the client expects), Adaptee (existing incompatible API), Adapter (translator between them) |
| Pairs well with | Module (adapter as a thin boundary module), Factory (return the right adapter for each provider), Facade (simplify many adapters behind one entry) |
| Don't pair with | Decorator — Decorator keeps the same interface and adds behavior; Adapter changes the interface so callers do not |
| Use cases | Third-party SDK integration, legacy API migration, normalizing REST vs GraphQL responses, callback-to-Promise bridges, storage backend swap |
| Maintenance cost | Low when the adapter is a pure field map or thin delegate; high when the adaptee's semantics differ enough to need branching logic in the adapter |

## Basic Code

The app expects `{ name, email }`. A legacy endpoint returns `{ user_name, email_addr }`. An adapter maps between them.

```javascript
const legacyApi = {
  fetchProfile(userId) {
    return { user_name: "Ada", email_addr: "ada@example.com", member_since: 2019 };
  },
};

function createUserAdapter(adaptee) {
  return {
    getUser(id) {
      const raw = adaptee.fetchProfile(id);
      return { name: raw.user_name, email: raw.email_addr };
    },
  };
}

const users = createUserAdapter(legacyApi);
console.log(users.getUser(1));
// { name: 'Ada', email: 'ada@example.com' }
```

Callers use `getUser` — they never import `fetchProfile` or know about snake_case fields.

## How it works

The Adapter pattern solves **interface mismatch**. The client and the adaptee were not designed together; the adapter is the only place that knows both shapes.

```
  Client                    Adapter                    Adaptee
  ──────                    ───────                    ───────
  getUser(id)  ──►  fetchProfile(id)  ──►  legacy API
       ▲              map fields back
       └──────────────────────────────────
              { name, email }
```

**Object adapter vs class adapter:** In JavaScript, an object adapter (wrapper object with methods that delegate) is most common. A function adapter `(adaptee) => target` works when the target is a single function or factory.

**Adapter vs Facade:** A Facade simplifies a *subsystem* the client already uses — fewer methods, one entry point. An Adapter makes an *incompatible* API look like something the client already expects. You might Facade three adapters; each adapter still translates one foreign interface.

**Adapter vs Decorator:** Both wrap something, but intent differs. Decorator: same interface, extra behavior (logging on `fetch`). Adapter: different interface on the outside (`getUser` wraps `fetchProfile`). If callers must change imports or method names, it is an Adapter.

## In Practice

### When to use

- A third-party library or legacy service uses different method names, field names, or return shapes than your app
- You want to swap backends (localStorage, IndexedDB, REST) without rewriting every consumer
- You are migrating APIs gradually — new code uses the target interface; old APIs hide behind adapters until retirement

### Anti-patterns

```javascript
// Anti-pattern: map at every call site
async function renderProfile(userId) {
  const raw = await legacyApi.fetchProfile(userId);
  const name = raw.user_name;
  const email = raw.email_addr;
  // ... same mapping copied in renderSettings, sendEmail, etc.
}

async function sendWelcome(userId) {
  const raw = await legacyApi.fetchProfile(userId);
  const name = raw.user_name; // duplicated again
  // ...
}
```

Field mapping scattered across the app breaks when the legacy API adds a field or renames one. One adapter owns the translation; call sites stay on `{ name, email }`.

```javascript
// Anti-pattern: adapter with business logic
function createUserAdapter(adaptee) {
  return {
    getUser(id) {
      const raw = adaptee.fetchProfile(id);
      if (raw.member_since < 2020) applyLegacyDiscount(raw); // domain rule
      return { name: raw.user_name, email: raw.email_addr };
    },
  };
}
```

Adapters translate shape and wire calls — they should not own pricing rules or validation policy. Business logic belongs in domain modules that consume the target interface.

> **Rule of thumb:** If the wrapper keeps the same call signature and adds logging, retry, or caching — that is a Decorator. If the wrapper exists because the inner API uses different names or shapes — that is an Adapter.

## Code Examples

### Basic — Legacy API Field Map

A user service expects a clean interface. The adapter wraps a legacy REST client and normalizes the response.

```javascript
const legacyClient = {
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
      return { name: raw.user_name, email: raw.email_addr };
    },
    getDisplayName(id) {
      return this.getUser(id).name;
    },
  };
}

const users = createUserService(legacyClient);

console.log(users.getUser(42));
// [legacy] GET /profiles/42
// { name: 'Grace Hopper', email: 'grace@example.com' }

console.log(users.getDisplayName(42));
// [legacy] GET /profiles/42
// Grace Hopper
```

**What to notice:**

- `legacyClient` is never imported by UI code — only the adapter touches snake_case fields
- Swapping to a modern API means replacing the adapter's internals; `getUser` stays stable
- The adapter is a thin map — no discount logic, no side effects beyond delegation

### Medium — Storage Adapter

The app expects a synchronous key-value store. The browser offers `localStorage` with string values only. The adapter implements the target interface and handles JSON serialization.

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

// App code — depends on target interface only
function createPreferences(store) {
  return {
    loadTheme() { return store.get("theme") ?? "light"; },
    saveTheme(theme) { store.set("theme", theme); },
  };
}

const memoryPrefs = createPreferences(createMemoryStore());
memoryPrefs.saveTheme("dark");
console.log(memoryPrefs.loadTheme()); // dark

// Swap backend — app code unchanged
const lsPrefs = createPreferences(createLocalStorageAdapter());
lsPrefs.saveTheme("dark");
console.log(lsPrefs.loadTheme()); // dark
```

**What to notice:**

- `createPreferences` accepts any store matching `get` / `set` — tests use memory, production uses localStorage
- Serialization lives in the adapter, not in every `set` call across the app
- The adaptee (`localStorage`) stores strings; the target interface exposes objects — classic impedance mismatch

## Trade-offs

| Pro | Con |
| --- | --- |
| Client code stays stable when third-party or legacy APIs change | Extra indirection — one more module to trace when debugging |
| Multiple backends share one target interface — swap at bootstrap | Adapter can become a junk drawer for logic that should live in domain code |
| Migration can run old and new APIs in parallel behind different adapters | Semantic gaps (pagination, error shapes) require non-trivial translation, not just field rename |
| Tests use in-memory adaptees without touching real network or storage | Two interfaces to maintain — target contract and adaptee reality can drift |

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Decorator | Keeps the same interface and adds behavior; Adapter changes the interface so incompatible types work together. |
| Proxy | Same interface as the subject; controls access (lazy load, cache). Adapter changes the interface shape. |
| Facade | Simplifies a complex subsystem; Adapter translates between two existing interfaces. |
| Bridge | Separates abstraction from implementation at design time; Adapter fixes mismatch after the fact. |
| Module | The adapter often lives at a module boundary — the only file that imports the foreign API. |

## Further Reading

- [Adapter — Refactoring.Guru](https://refactoring.guru/design-patterns/adapter)
- [Adapter pattern — patterns.dev](https://www.patterns.dev/vanilla/adapter-pattern)
- [Adapter pattern — SourceMaking](https://sourcemaking.com/design_patterns/adapter)

## Self-check questions

1. Your HTTP client returns `{ data: { items: [...] } }` but components expect `{ items: [...] }`. Is a one-line unwrap at each call site an Adapter — or something else?
2. When would you use an Adapter instead of editing the third-party library's source or forking it?
3. An adapter adds retry and logging around `fetchProfile`. Has it become a Decorator, an Adapter, or both — and where should those concerns move?
