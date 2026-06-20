---
domain: code
section: design-patterns
chapter: patterns
title: "Proxy Pattern"
order: 12
description: "Stand in for another object with the same interface — control access through lazy loading, caching, validation, or remote delegation without changing callers."
chapterLabel: "Patterns"
---

# Proxy Pattern

> Callers invoke `image.load()` as always. The Proxy decides whether to fetch now, return cache, or block the call — the interface stays identical; access rules live in the stand-in.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Structural |
| Participants | Subject (shared interface), Real subject (expensive or remote object), Proxy (stand-in that controls access), Client (uses subject through proxy) |
| Pairs well with | Module (proxy factory with private cache), Decorator (same wrapper shape; Proxy controls access, Decorator adds features), Factory (create proxy around real subject) |
| Don't pair with | Adapter — Adapter changes the interface; Proxy preserves it and governs when or how the real subject runs |
| Use cases | Lazy initialization, memoization/caching, access control, logging/auditing gates, remote object stand-ins, validation on property set |
| Maintenance cost | Low when the proxy adds one concern (cache OR lazy load); high when one proxy handles cache, auth, retry, and metrics — split into composed proxies or decorators |

## Basic Code

An image proxy delays loading until `render()` is called. Callers hold the same `{ render() }` interface whether the bytes are loaded or not.

```javascript
function createImageProxy(src) {
  let real = null;

  function loadReal() {
    if (!real) {
      console.log(`[load] ${src}`);
      real = { src, render() { return `<img src="${src}">`; } };
    }
    return real;
  }

  return {
    render() {
      return loadReal().render();
    },
  };
}

const img = createImageProxy("/photos/hero.webp");
console.log("created — not loaded yet");

console.log(img.render());
// [load] /photos/hero.webp
// <img src="/photos/hero.webp">
```

The client never calls a separate `load()` — the proxy loads on first access.

## How it works

The Proxy pattern provides a **surrogate** with the same interface as the real subject. Clients treat proxy and subject interchangeably; the proxy intercepts operations.

```
  Client
    │
    │  render()
    ▼
  ┌─────────────┐     first access      ┌──────────────┐
  │    Proxy    │ ───────────────────►  │ Real subject │
  │  (lazy)     │ ◄───────────────────  │  (image)     │
  └─────────────┘     delegate          └──────────────┘
```

**Virtual proxy (lazy):** Defer expensive work — load image, open DB connection, parse large file — until the operation is actually needed.

**Protection proxy:** Block or allow calls based on permissions — `delete()` throws if the user lacks role; read-only views wrap mutable stores.

**Caching proxy:** Return a memoized result when inputs match; delegate to the real subject on cache miss.

**Remote proxy:** Local object whose methods forward to a network service — same method names, different process.

**Proxy vs Decorator:** Same wrapper shape, different intent. Decorator **adds** responsibility (log every call). Proxy **controls** access to the subject (load on demand, cache, guard). A caching decorator and a caching proxy look alike — name the intent: are you adding a feature stack or standing in for the real object?

**Proxy vs Adapter:** Proxy keeps the interface identical. Adapter changes method names or return shapes so incompatible APIs align.

**JavaScript `Proxy`:** The language built-in `new Proxy(target, handler)` implements interception via traps (`get`, `set`, `apply`). Classic Proxy pattern uses explicit wrapper objects for readable tests; `new Proxy` suits meta-programming and reactive systems.

## In Practice

### When to use

- Creating the real subject is expensive and often unnecessary (lazy load)
- Repeated identical calls should hit cache, not network or disk
- Sensitive operations need a gate (permissions, rate limits) without polluting the real subject
- A remote service should look like a local object to the rest of the app

### Anti-patterns

```javascript
// Anti-pattern: proxy that changes the public API
function createUserProxy(user) {
  return {
    getName() { return user.name; },
    lazyLoadFullProfile() { return fetch(`/users/${user.id}`); }, // new method — not a Proxy
  };
}
```

A Proxy must satisfy the Subject interface. Extra methods force callers to know they hold a proxy — use Adapter if the interface intentionally differs.

```javascript
// Anti-pattern: one proxy for every concern
function createApiProxy(real) {
  const cache = new Map();
  return {
    async get(path) {
      if (!getToken()) throw new Error("unauthorized");      // protection
      if (cache.has(path)) return cache.get(path);            // cache
      console.log("GET", path);                               // logging
      for (let i = 0; i < 3; i++) {                           // retry
        try {
          const data = await real.get(path);
          cache.set(path, data);
          return data;
        } catch (e) { if (i === 2) throw e; }
      }
    },
  };
}
```

When one stand-in owns auth, cache, logging, and retry, debugging and testing become painful. Split concerns: protection proxy wraps caching proxy wraps real client — or use Decorator for additive layers and Proxy for lazy/access control only.

> **Rule of thumb:** If callers should not know *when* or *whether* the real object runs yet — lazy load, cache, permission check — use a Proxy. If callers need a *different* method name or shape, use an Adapter.

## Code Examples

### Basic — Lazy Load Proxy

A heavy report object parses CSV on construction. The proxy delays parsing until `rows()` is first called.

```javascript
function createReport(csv) {
  console.log("[report] parsing…");
  const rows = csv.trim().split("\n").map(line => line.split(","));
  return {
    rows() { return rows; },
    count() { return rows.length; },
  };
}

function createReportProxy(csv) {
  let real = null;

  function getReal() {
    if (!real) real = createReport(csv);
    return real;
  }

  return {
    rows()  { return getReal().rows(); },
    count() { return getReal().count(); },
  };
}

const csv = "name,score\nAda,98\nGrace,99\n";

console.log("proxy created");
const report = createReportProxy(csv);
console.log("count requested");
console.log(report.count());
// [report] parsing…
// 2

console.log(report.rows());
// no second parse — real already loaded
```

**What to notice:**

- `"proxy created"` logs before any parsing — expensive work waits for first use
- `rows()` and `count()` share one lazy `getReal()` — parse runs once
- The proxy exposes the same methods as `createReport` — drop-in replacement

### Medium — Caching API Proxy

A data client fetches user records. A caching proxy stores results by id and delegates to the real client on miss.

```javascript
function createUserClient() {
  return {
    async fetchById(id) {
      console.log(`[network] fetch user ${id}`);
      await new Promise(r => setTimeout(r, 10)); // simulate latency
      return { id, name: `User ${id}` };
    },
  };
}

function createCachingUserProxy(real, { ttlMs = 60_000 } = {}) {
  const cache = new Map();

  return {
    async fetchById(id) {
      const hit = cache.get(id);
      if (hit && Date.now() - hit.at < ttlMs) {
        console.log(`[cache] hit user ${id}`);
        return hit.data;
      }
      const data = await real.fetchById(id);
      cache.set(id, { data, at: Date.now() });
      return data;
    },
    invalidate(id) {
      cache.delete(id);
    },
  };
}

const client = createCachingUserProxy(createUserClient());

await client.fetchById(1);
// [network] fetch user 1

await client.fetchById(1);
// [cache] hit user 1

await client.fetchById(2);
// [network] fetch user 2

client.invalidate(1);
await client.fetchById(1);
// [network] fetch user 1
```

**What to notice:**

- Callers use `fetchById` — same as the real client; cache is transparent
- `invalidate` is optional proxy API for cache management — core Subject methods unchanged
- TTL prevents stale data without pushing cache logic into every consumer

### Advanced — Read-only Settings with `new Proxy`

A settings object rejects writes to read-only keys. JavaScript's built-in `Proxy` intercepts `set` without hand-writing every property.

```javascript
function createReadOnlySettings(initial, lockedKeys = []) {
  const data = { ...initial };
  const locked = new Set(lockedKeys);

  return new Proxy(data, {
    get(target, key) {
      return target[key];
    },
    set(target, key, value) {
      if (locked.has(key)) {
        throw new TypeError(`cannot set read-only key: ${String(key)}`);
      }
      target[key] = value;
      return true;
    },
  });
}

const settings = createReadOnlySettings(
  { theme: "light", apiUrl: "https://api.example.com" },
  ["apiUrl"],
);

settings.theme = "dark";
console.log(settings.theme); // dark

try {
  settings.apiUrl = "https://evil.test";
} catch (e) {
  console.log(e.message); // cannot set read-only key: apiUrl
}
```

**What to notice:**

- Property access looks normal — `settings.theme` — interception is invisible
- Protection logic lives in the `set` trap, not scattered across setters
- Built-in `Proxy` fits access control; explicit wrapper objects fit lazy load and async cache in tests

## Trade-offs

| Pro | Con |
| --- | --- |
| Expensive subjects load only when needed — faster startup and lower memory | Indirection hides whether work is cached, remote, or real — harder to profile without logging |
| Cache and permission gates reuse the subject interface — no caller changes | Stale cache, missed invalidation, and TTL bugs live in the proxy layer |
| Real subject stays focused on core behaviour — cross-cutting access rules move out | Overlaps with Decorator structurally — teams may disagree on naming and file placement |
| Remote proxies unify network behind familiar method calls | Async remote proxies need clear error semantics; sync-looking API over network misleads callers |

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Decorator | Same interface, adds behaviour (logging, retry); Proxy controls access to the subject. |
| Adapter | Changes interface so incompatible types work; Proxy keeps the same interface. |
| Facade | Simplifies a subsystem; Proxy represents one subject, not many. |
| Module | Real subject and proxy often exported from separate modules; client imports proxy at bootstrap. |
| Flyweight | Shares intrinsic state across many objects; Proxy stands in for one heavy instance. |

## Further Reading

- [Proxy — Refactoring.Guru](https://refactoring.guru/design-patterns/proxy)
- [Proxy pattern — patterns.dev](https://www.patterns.dev/vanilla/proxy-pattern)
- [Proxy — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## Self-check questions

1. A wrapper renames `fetchProfile` to `getUser`. Is that a Proxy or an Adapter — and what is the deciding factor?
2. Your caching wrapper and logging wrapper both use the same `(inner) => wrapped` shape. How do you decide which is a Proxy and which is a Decorator?
3. When would you prefer an explicit lazy-load proxy object over `new Proxy(target, handler)` in production code?
