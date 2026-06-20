---
domain: code
section: design-patterns
chapter: challenges
title: "Proxy Pattern Challenge"
order: 12
description: "Introduce a stand-in with the same interface as the real subject to control lazy loading, caching, or access — without changing callers."
chapterLabel: "Challenges"
---

# Proxy Pattern — Code Challenges

---

## Challenge 1 — The Eager Report

### The Code

A dashboard creates a report object at startup. Parsing a large CSV runs immediately — even when the user never opens the report tab.

```javascript
function createReport(csv) {
  console.log("[report] parsing…");
  const rows = csv.trim().split("\n").map(line => line.split(","));
  return {
    rows() { return rows; },
    count() { return rows.length; },
  };
}

const csv = "name,score\nAda,98\nGrace,99\nAlan,97\n";

console.log("[app] booting");
const report = createReport(csv);
console.log("[app] dashboard ready");

// User never calls report.rows() — parse was wasted
console.log("[app] user viewed summary only");
```

On slow devices, startup blocks on parse. Tests that import the dashboard module pay the parse cost even when assertions never touch `rows()`.

### What's Wrong

Run this and ask: what happens when ten heavy reports register at boot — but the user only opens one?

`createReport` runs at construction time. There is no way to defer parsing until first access without changing every caller to call `load()` first — which would change the public API.

Three problems:

1. **Expensive work runs eagerly** — parse happens at boot, not on demand
2. **No drop-in deferral** — delaying parse would require a new method or flag visible to callers
3. **Real subject and client lifecycle are tied** — importers cannot hold a lightweight stand-in

### Your Task

Refactor so that:

- `createReport(csv)` stays the **real subject** — parsing still happens inside it
- `createReportProxy(csv)` exposes the same interface: `rows()` and `count()`
- Parsing runs on **first** call to either method — not at proxy creation
- Second calls reuse the already-loaded real subject (parse once)

Target interface:

```javascript
console.log("[app] booting");
const report = createReportProxy(csv);
console.log("[app] dashboard ready");
// no "[report] parsing…" yet

console.log(report.count());
// [report] parsing…
// 3

console.log(report.rows().length);
// 3 — no second parse
```

---

### Hints

<details>
<summary>#1 — Same interface, delayed real subject</summary>

The proxy holds `let real = null`. A private `getReal()` creates the real report on first use:

```javascript
function getReal() {
  if (!real) real = createReport(csv);
  return real;
}
```

`rows()` and `count()` delegate to `getReal().rows()` and `getReal().count()`. Callers still call `report.count()` — they never call `load()`.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
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
```

This is a **virtual proxy** — it controls *when* the real subject is created. The interface matches `createReport` exactly.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createReportProxy(csv):
  real = null

  function getReal():
    if real is null:
      real = createReport(csv)    ← expensive work here only
    return real

  return {
    rows():  return getReal().rows()
    count(): return getReal().count()
  }

// Boot:
report = createReportProxy(csv)   ← cheap
// Later:
report.count()                    ← triggers parse once
report.rows()                     ← reuses same real
```

Contrast with **Adapter**: the proxy does not rename methods or change return shapes — it only defers creation.

</details>

---

### Solution

<details>
<summary>View solution</summary>

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

const csv = "name,score\nAda,98\nGrace,99\nAlan,97\n";

console.log("[app] booting");
const report = createReportProxy(csv);
console.log("[app] dashboard ready");
// no "[report] parsing…"

console.log("[app] user opened report tab");
console.log(report.count());
// [report] parsing…
// 3

console.log(report.rows()[0]);
// ['name', 'score'] — no second "[report] parsing…"
```

**What changed:**

- Boot no longer parses CSV — the proxy is a lightweight stand-in
- First `count()` or `rows()` triggers `createReport` once
- Public API unchanged — drop-in replacement for `createReport`

**Concepts at work:** The **Proxy** and **real subject** share the same interface (`rows`, `count`). The proxy controls **access** to creation of the real object — a **virtual proxy**. Contrast with **Decorator**: a logging wrapper would add behaviour on every call, not defer instantiation.

</details>

---

## Challenge 2 — The Repeat Fetcher

### The Code

A profile page and a settings page both fetch the same user by id. Each call hits the network — cache logic is copy-pasted between them.

```javascript
function createUserClient() {
  return {
    async fetchById(id) {
      console.log(`[network] fetch user ${id}`);
      await new Promise(r => setTimeout(r, 10));
      return { id, name: `User ${id}` };
    },
  };
}

const client = createUserClient();

async function loadProfilePage(userId) {
  const user = await client.fetchById(userId);
  console.log(`[profile] ${user.name}`);
}

async function loadSettingsPage(userId) {
  const user = await client.fetchById(userId);
  console.log(`[settings] ${user.name}`);
}

await loadProfilePage(1);
await loadSettingsPage(1);
// [network] fetch user 1
// [profile] User 1
// [network] fetch user 1   ← duplicate
// [settings] User 1
```

Adding cache-aside logic to each page duplicates TTL, invalidation, and logging. The real client should stay focused on fetching — not caching policy at every call site.

### What's Wrong

Run this and ask: what happens when a third widget — nav bar, analytics, chat header — also calls `fetchById(1)` on mount?

Three network calls for the same id. Scatter `if (cache.has(id))` into each consumer and watch TTL bugs multiply.

Three problems:

1. **No transparent cache** — every consumer hits the network independently
2. **Cache belongs at the access boundary** — not duplicated in UI modules
3. **Real client interface is correct** — callers should keep calling `fetchById`; a stand-in should intercept

### Your Task

Refactor so that:

- `createUserClient()` remains the **real subject**
- `createCachingUserProxy(real, { ttlMs })` wraps the client with the **same** `fetchById(id)` method
- Cache hits log `[cache] hit user {id}` and skip the network
- Optional `invalidate(id)` clears one cache entry
- `loadProfilePage` and `loadSettingsPage` accept the proxied client — second fetch for same id is a cache hit

Target interface:

```javascript
const client = createCachingUserProxy(createUserClient(), { ttlMs: 60_000 });

await loadProfilePage(1, client);
await loadSettingsPage(1, client);
// [network] fetch user 1
// [profile] User 1
// [cache] hit user 1
// [settings] User 1
```

---

### Hints

<details>
<summary>#1 — Proxy, not Adapter</summary>

Keep the method name `fetchById` — do not rename to `getUser` or wrap return shapes. The proxy **controls access** (cache before network); it does not **translate** the interface. That distinction marks Proxy vs Adapter.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
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
```

Inject the proxy at bootstrap: `const client = createCachingUserProxy(createUserClient())`.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createCachingUserProxy(real, { ttlMs }):
  cache = new Map()

  async fetchById(id):
    hit = cache.get(id)
    if hit exists and not expired:
      log cache hit
      return hit.data
    data = await real.fetchById(id)
    cache.set(id, { data, at: now })
    return data

  invalidate(id):
    cache.delete(id)

loadProfilePage(userId, client):
  user = await client.fetchById(userId)   ← same call as before
  render profile

loadSettingsPage(userId, client):
  user = await client.fetchById(userId)   ← cache hit on second page
  render settings
```

TTL lives in one place. Invalidation clears stale entries before refetch.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createUserClient() {
  return {
    async fetchById(id) {
      console.log(`[network] fetch user ${id}`);
      await new Promise(r => setTimeout(r, 10));
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

async function loadProfilePage(userId, client) {
  const user = await client.fetchById(userId);
  console.log(`[profile] ${user.name}`);
}

async function loadSettingsPage(userId, client) {
  const user = await client.fetchById(userId);
  console.log(`[settings] ${user.name}`);
}

const client = createCachingUserProxy(createUserClient(), { ttlMs: 60_000 });

await loadProfilePage(1, client);
await loadSettingsPage(1, client);
// [network] fetch user 1
// [profile] User 1
// [cache] hit user 1
// [settings] User 1

await client.fetchById(2);
// [network] fetch user 2

client.invalidate(1);
await client.fetchById(1);
// [network] fetch user 1
```

**What changed:**

- Cache policy moved into one proxy — pages keep calling `fetchById`
- Real client unchanged — still logs network fetches on miss only
- `invalidate` supports explicit cache bust without editing consumers

**Concepts at work:** A **caching proxy** intercepts calls with the same interface as the real subject. Callers cannot tell proxy from real without observing logs — that transparency is intentional. Contrast with **Decorator** if you stacked logging *and* cache as additive layers; here one proxy owns cache **access control**. Contrast with **Adapter** if you had renamed `fetchById` to `getUser`.

</details>

---

## When Not to Use the Proxy Pattern

A proxy earns its place when callers should not know when or whether the real subject runs. Skip it when:

- **You need a different method name or return shape.** Renaming `fetchProfile` to `getUser` is an **Adapter**, not a Proxy.
- **You are adding logging or retry on the same interface as an optional stack.** That is often **Decorator** — especially when multiple layers compose.
- **One proxy owns cache, auth, retry, and metrics.** Split into focused proxies or decorators — a god proxy is hard to test.
- **The object is cheap and always needed.** Lazy-loading a two-field config object adds indirection with no benefit.

The rule of thumb: same interface, control access (lazy, cache, guard) → Proxy. Different interface → Adapter. Same interface, add behaviour layers → Decorator.

---

## What to Take Away

Before moving on, answer these from memory:

1. In Challenge 1, why must the proxy expose `rows()` and `count()` rather than adding a separate `load()` method?
2. In Challenge 2, why is `createCachingUserProxy` a Proxy and not an Adapter?
3. Your proxy adds logging inside `fetchById` before the cache check. Has the primary intent changed — Proxy, Decorator, or both?
4. When would you use JavaScript's `new Proxy()` instead of an explicit wrapper object like `createReportProxy`?

---

*← [Proxy Pattern](/code/design-patterns/patterns/12-proxy-pattern)*
