---
domain: code
section: design-patterns
chapter: patterns
title: "Decorator Pattern"
order: 5
description: "Wrap an object to add behavior at runtime while keeping the same interface — stack layers without subclass explosion."
chapterLabel: "Patterns"
---

# Decorator Pattern

> Attach new responsibilities to an object by wrapping it in another object that shares the same interface and delegates to the inner instance.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Structural |
| Participants | Component (interface), Concrete component (base behavior), Decorator (wrapper), Concrete decorators (extra behavior) |
| Pairs well with | Module (export decorator factories), Chain of Responsibility (ordered handlers), Factory (build a configured stack) |
| Don't pair with | Deep inheritance trees for every feature combination — that is what wrapping replaces |
| Use cases | HTTP client middleware (auth, logging, retry), stream transforms, test doubles that add spies around real implementations, UI wrappers that add tooltip/error boundary behavior without editing the child |
| Maintenance cost | Low when decorators are small and order is documented; high when ten wrappers each assume they run last or mutate shared state |

## Basic Code

A base `fetchData` function returns JSON. A logging decorator wraps it: call inner, then log. Callers still invoke `fetchData(url)` — the surface does not change, the stack does.

```javascript
function fetchData(url) {
  return fetch(url).then((r) => r.json());
}

function withLogging(inner) {
  return async function fetchData(url) {
    console.log("GET", url);
    const data = await inner(url);
    console.log("OK", url, Object.keys(data).length, "keys");
    return data;
  };
}

const fetchWithLogs = withLogging(fetchData);
await fetchWithLogs("/api/user");
```

## How it works

The Decorator pattern has four roles, often collapsed in JS to **component function** + **decorator higher-order function**:

| Role | JS shape |
| ---- | -------- |
| Component | Shared interface — same function signature or method names |
| Concrete component | Base implementation (`fetchData`, `createButton`) |
| Decorator | `(inner) => wrapped` — holds reference to inner, delegates |
| Concrete decorator | `withLogging`, `withAuth`, `withRetry` |

```
  caller calls fetchData(url)
           │
           ▼
  ┌─────────────────┐
  │ withRetry       │  try/catch, backoff
  │  ┌───────────┐  │
  │  │ withAuth  │  │  attach Authorization header
  │  │ ┌───────┐ │  │
  │  │ │ base  │ │  │  fetch + json()
  │  │ └───────┘ │  │
  │  └───────────┘  │
  └─────────────────┘
```

**Who knows whom:** Each decorator knows only its **inner** component — not the whole stack. The outer decorator presents the same API as the base. Callers depend on the Component interface, not on how many wrappers were applied.

**Lifecycle:** Wrappers are usually applied at module load or app bootstrap: `const client = withRetry(withAuth(withLogging(fetchData)))`. Each call travels inward (decorators run pre-work), hits the core, then unwinds (post-work, logging, metrics). Order matters: auth before retry, retry around the actual network call.

**Paradigms involved:** Composition over inheritance (features are stacked, not subclassed), single responsibility (each decorator does one concern), and transparent interface (callers cannot tell base from decorated without inspecting types).

## Metaphor

**Coffee order add-ons.** You start with espresso (concrete component). Steamed milk wraps it into a latte; whip and caramel wrap again. The cup still fits the machine (same interface: “drinkable coffee”); each add-on runs its step then passes to what is inside. You do not create `LatteWithWhipAndCaramel extends Latte extends Espresso` for every combination.

**Gift wrapping layers.** The gift (core) is the same object; each sheet of paper adds presentation without changing what is inside. You remove layers from outside in; decorators run outside-in on the way in and inside-out on the way back for async work.

## Functionality

- You need to add cross-cutting behavior (logging, timing, caching, auth headers) to an object or function **without** editing the core implementation or subclassing for every combination.
- Each concern lives in one wrapper; you compose `withA(withB(withC(base)))` instead of `BaseWithAAndBAndC`.
- In JavaScript, decorators are often **higher-order functions** or **wrapper objects** that delegate — the language’s `@decorator` syntax is optional sugar for the same idea.

## In Practice

### When to use

- Feature combinations explode if modeled as subclasses (`LoggedAuthenticatedRetriableClient` × N).
- Behavior must be toggled per environment (logging in dev, retry in prod) by changing composition, not core code.
- You want to unit-test “retry logic” by wrapping a fake inner client, not mocking `fetch` globally.

### Use cases

| Scenario | Signal |
| -------- | ------ |
| API client needs logging, auth, and retry in different apps or tests | One `fetch` wrapper copies 80 lines of try/catch and header logic into every call site |
| Streams or pipelines transform data in stages | One 300-line function encodes parse → validate → normalize → persist |
| React component needs tooltip, error boundary, or analytics without forking the child | Copy-paste wrapper JSX around every button variant |

```javascript
// Smell: every call site repeats cross-cutting steps
async function loadUser(id) {
  const token = getToken();
  console.log("loadUser", id);
  let res;
  for (let i = 0; i < 3; i++) {
    try {
      res = await fetch(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      break;
    } catch (e) {
      if (i === 2) throw e;
    }
  }
  return res.json();
}

// Fix: compose once; call sites stay thin
const apiGet = withRetry(withAuth(withLogging(fetchJson)));
const user = await apiGet(`/api/users/${id}`);
```

### Anti-patterns

| Situation | Instead |
| --------- | ------- |
| One log line before a function you own | Call `console.log` inside that function or use a debugger |
| Wrapper changes the public API (new required args) | Fix the decorator — it must match Component interface |
| Order of six decorators is undocumented and breaks silently | Document stack order; or **Chain of Responsibility** with explicit pipeline config |
| You only need to swap algorithms, not layer behavior | **Strategy** — one object, one algorithm |

```javascript
// Anti-pattern: decorator that is not transparent
function withTenant(inner) {
  return (url, tenantId) => inner(`${url}?tenant=${tenantId}`); // new param — not a Decorator
}

// Prefer: tenant from closure or context, same (url) signature
function withTenant(inner, getTenantId) {
  return (url) => inner(`${url}?tenant=${getTenantId()}`);
}
```

> **Rule of thumb:** If the wrapper keeps the same call signature and delegates to an inner object, it is a Decorator. If callers must know about the wrapper’s extra API, it is a different abstraction.

## Applications

### Browser

**`TransformStream` in the Streams API** A transform wraps a readable/writable pair: bytes enter, the transform enqueues modified chunks. Each stage is a decorator on the stream pipeline — same pipe interface, stacked behavior (gzip, text decode, line split).

**Service workers intercepting `fetch`** The worker registers a `fetch` listener that wraps the network: cache-first, offline fallback, or header injection run before/after `event.respondWith`. The page still calls `fetch`; the worker decorates the request lifecycle.

**`Proxy` objects** `new Proxy(target, handler)` wraps an object and intercepts traps (`get`, `set`). Not identical to classic Decorator (no explicit inner class), but the same idea: transparent surface, layered interception. Use when you need meta-programming; use explicit wrappers when you need readable stack traces and tests.

### UI

**Wrapper components in React** `<Tooltip><Button /></Tooltip>` or `<ErrorBoundary><Page /></ErrorBoundary>` — the child keeps its props API; the parent adds behavior around render/commit. Function components that take `children` and render `{children}` with extra markup or context are decorators.

**Higher-order components (HOCs)** `withAuth(Dashboard)` returns a component that checks session then renders `Dashboard`. Same interface to the router (`<Dashboard />` route target), extra behavior in the wrapper. Modern code often prefers hooks, but HOCs are still decorator-shaped.

**Styled container shells** Layout chrome (padding, max-width, elevation) wraps arbitrary content without the content importing layout primitives — visual decoration with a stable child contract.

## Trade-offs

| Pro | Con |
| --- | --- |
| Add logging or auth by composing one line at bootstrap — zero edits to `fetchData` | Stack order is implicit in `withA(withB(x))` — wrong order breaks auth or double-logs |
| Each decorator is a focused module you test with a stub inner | Deep stacks make debugging harder (“which wrapper swallowed the error?”) |
| Avoids combinatorial subclasses (`ClientLoggedAuth` × `ClientAuthRetry` × …) | Many thin wrappers feel like ceremony when you only ever need one layer |

**Known Issues / Pitfalls**

- **Broken transparency** — Decorator returns different types or throws where the base resolves; callers break when they swap wrapped vs unwrapped.
- **Order sensitivity** — `withRetry(withCache(x))` caches errors; `withCache(withRetry(x))` does not. Document or encode order in a named builder.
- **Double application** — Wrapping the same client twice attaches two auth headers; use a factory that composes once and exports a singleton.

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Adapter | Changes interface so incompatible types work together; Decorator keeps the same interface. |
| Proxy | Controls access (lazy load, permissions); often same structure, intent is access control not adding features. |
| Chain of Responsibility | Passes a request along a chain until someone handles it; Decorator always delegates through every layer. |
| Composite | Tree of children treated uniformly; Decorator is a single inner object, not a collection. |
| Middleware (Express/Koa) | Pipeline of decorators on `req`/`res`; each calls `next()` to reach inner handlers. |

## Code Examples

### Basic

A base `send` function and a decorator that logs before and after delegation.

```javascript
function createMessenger() {
  return {
    send(message) {
      return { delivered: true, message, at: Date.now() };
    },
  };
}

function withTimestamp(inner) {
  return {
    send(message) {
      const stamped = `[${new Date().toISOString()}] ${message}`;
      return inner.send(stamped);
    },
  };
}

function withDeliveryLog(inner) {
  return {
    send(message) {
      console.log("sending:", message);
      const result = inner.send(message);
      console.log("result:", result.delivered);
      return result;
    },
  };
}

const base = createMessenger();
const messenger = withDeliveryLog(withTimestamp(base));

messenger.send("hello");
```

**What to notice:**

- `withDeliveryLog` and `withTimestamp` both expose `send` — same interface as base.
- Outer decorator runs first on the way in; inner `send` runs at the core.

### Medium

Composable HTTP GET client: base JSON fetch, plus auth, logging, and retry decorators. Built once, used everywhere.

```javascript
async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

function withAuth(inner, getToken) {
  return (url, options = {}) =>
    inner(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getToken()}`,
      },
    });
}

function withLogging(inner) {
  return async (url, options) => {
    const start = performance.now();
    try {
      const data = await inner(url, options);
      console.log("GET", url, Math.round(performance.now() - start), "ms");
      return data;
    } catch (error) {
      console.error("GET failed", url, error.message);
      throw error;
    }
  };
}

function withRetry(inner, { attempts = 3, delayMs = 100 } = {}) {
  return async (url, options) => {
    let lastError;
    for (let i = 0; i < attempts; i++) {
      try {
        return await inner(url, options);
      } catch (error) {
        lastError = error;
        if (i < attempts - 1) await new Promise((r) => setTimeout(r, delayMs * (i + 1)));
      }
    }
    throw lastError;
  };
}

const apiGet = withRetry(
  withLogging(withAuth(fetchJson, () => "test-token")),
  { attempts: 2 }
);

// await apiGet("/api/profile");
```

**What to notice:**

- `(url, options)` signature stays stable through the stack.
- Retry wraps the whole inner chain — logging sees each attempt if placed outside retry.

### Advanced

**Decorator + Module:** A private registry builds named client profiles (`public`, `authenticated`, `admin`) from the same decorators without duplicating composition strings.

```javascript
function createHttpClient({ fetchImpl = fetch } = {}) {
  async function fetchJson(url, options = {}) {
    const res = await fetchImpl(url, options);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  }

  function withBaseUrl(inner, baseUrl) {
    return (path, options) => inner(`${baseUrl}${path}`, options);
  }

  function withAuth(inner, getToken) {
    return (path, options = {}) =>
      inner(path, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${getToken()}`,
        },
      });
  }

  function withRateLimit(inner, { maxPerSecond }) {
    let tokens = maxPerSecond;
    let resetAt = Date.now() + 1000;
    return async (path, options) => {
      const now = Date.now();
      if (now > resetAt) {
        tokens = maxPerSecond;
        resetAt = now + 1000;
      }
      if (tokens <= 0) throw new Error("rate limit exceeded");
      tokens -= 1;
      return inner(path, options);
    };
  }

  function withMetrics(inner, onMetric) {
    return async (path, options) => {
      const start = performance.now();
      try {
        const data = await inner(path, options);
        onMetric({ path, ok: true, ms: performance.now() - start });
        return data;
      } catch (error) {
        onMetric({ path, ok: false, ms: performance.now() - start });
        throw error;
      }
    };
  }

  function compose(...decorators) {
    return (base) => decorators.reduceRight((acc, d) => d(acc), base);
  }

  const profiles = {
    public: compose(withBaseUrl(fetchJson, "https://api.example")),
    user: compose(
      withBaseUrl(fetchJson, "https://api.example"),
      (inner) => withAuth(inner, () => localStorage.getItem("token")),
      (inner) => withRateLimit(inner, { maxPerSecond: 10 })
    ),
    catalog: compose(
      withBaseUrl(fetchJson, "https://api.example"),
      (inner) => withMetrics(inner, (m) => console.log("catalog", m))
    ),
  };

  return {
    get(profile, path, options) {
      const client = profiles[profile];
      if (!client) throw new RangeError(`unknown profile: ${profile}`);
      return client(path, options);
    },
  };
}

const http = createHttpClient();
// http.get("user", "/me");
// http.get("catalog", "/products");
```

**What to notice:**

- `compose` + `reduceRight` makes stack order explicit and reusable across profiles.
- `catalog` adds metrics decorator; `user` adds auth and rate limit — same base, different stacks.

## Further Reading

- [Decorator — Refactoring.Guru](https://refactoring.guru/design-patterns/decorator)
- [Decorator pattern — patterns.dev](https://www.patterns.dev/vanilla/decorator-pattern)
- [MDN: TransformStream](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream)

## Self-check questions

Test your understanding:

1. You have `withLogging(withRetry(withAuth(base)))`. A request fails twice then succeeds. How many log lines appear if logging is the outermost decorator — and what changes if logging is innermost?
2. A wrapper adds a required second argument `tenantId` to every method. Why is that not a valid Decorator, and what is the fix?
3. When would **Adapter** be the right choice instead of **Decorator** for wrapping an HTTP client?
