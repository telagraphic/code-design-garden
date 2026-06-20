---
domain: code
section: design-patterns
chapter: challenges
title: "Registry Pattern Challenge"
order: 6
description: "Replace hardcoded lookup tables and branching dispatch with a register/resolve registry so producers and consumers decouple across module boundaries."
chapterLabel: "Challenges"
---

# Registry Pattern — Code Challenges

---

## Challenge 1 — The Central Icon Dump

### The Code

Icons live in one exported object. Every component that renders an icon imports the whole map — and adding an icon means editing this file.

```javascript
const icons = {
  "chevron-down": `<svg viewBox="0 0 16 16"><path d="M4 6l4 4 4-4"/></svg>`,
  "close":        `<svg viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg>`,
  "check":        `<svg viewBox="0 0 16 16"><path d="M3 8l4 4 6-7"/></svg>`,
};

function renderIcon(name) {
  const svg = icons[name];
  if (!svg) return `<span class="icon icon--missing">?</span>`;
  return `<span class="icon">${svg}</span>`;
}

console.log(renderIcon("check"));
// <span class="icon"><svg …>…</svg></span>

console.log(renderIcon("star"));
// <span class="icon icon--missing">?</span>
```

A design-system package wants to register `"star"` without forking this file. A second team owns `"menu"` icons. Neither can plug in — the object is closed.

### What's Wrong

Run this and ask: what happens when `"star"` and `"menu"` come from external packages loaded at bootstrap?

You edit the central `icons` object again. Every importer still pulls the full map even if they only need `"close"`. Typos in `renderIcon("chevrn-down")` silently render `?` instead of failing in one place.

Three problems:

1. **Closed lookup table** — no `register`; external modules cannot add icons without editing core
2. **Silent misses** — unknown keys return a fallback instead of throwing where registration is validated
3. **Consumer knows the map** — `renderIcon` reads `icons[name]` directly instead of resolving through a registry API

### Your Task

Refactor so that:

- A `createRegistry()` factory returns `{ register, resolve, has, keys }` with a duplicate-key guard and a `RangeError` on missing keys
- Icons register at bootstrap — core icons plus a simulated `"star"` from an external module
- `renderIcon(name)` calls `icons.resolve(name)` — it never touches the map directly
- Unknown names throw at resolve time, not silently at render time

Target interface:

```javascript
const icons = createRegistry();

// bootstrap — core
icons.register("chevron-down", `<svg>…</svg>`);
icons.register("close", `<svg>…</svg>`);
icons.register("check", `<svg>…</svg>`);

// bootstrap — external package (simulated)
icons.register("star", `<svg viewBox="0 0 16 16"><path d="M8 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3-4 1z"/></svg>`);

function renderIcon(name) {
  return `<span class="icon">${icons.resolve(name)}</span>`;
}

console.log(renderIcon("star")); // works — no edit to renderIcon
```

---

### Hints

<details>
<summary>#1 — Registry vs plain object</summary>

The plain object is a **lookup table** — all entries are known at definition time and nothing can add later. A Registry exposes **registration** as an action: producers call `register(key, value)` at bootstrap; consumers call `resolve(key)` at runtime.

The map stays private inside `createRegistry`. Outside code never reads `map.get` directly — only `register` and `resolve`. That is what lets a second module add `"star"` without touching `renderIcon`.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createRegistry() {
  const map = new Map();

  return {
    register(key, value) {
      if (map.has(key)) throw new Error(`already registered: ${key}`);
      map.set(key, value);
    },
    resolve(key) {
      const value = map.get(key);
      if (value === undefined) throw new RangeError(`not registered: ${key}`);
      return value;
    },
    has(key) { return map.has(key); },
    keys() { return [...map.keys()]; },
  };
}

function renderIcon(name) {
  return `<span class="icon">${icons.resolve(name)}</span>`;
}
```

Move the three SVG strings into `register` calls. Simulate the external package with a fourth `register("star", …)` in a separate comment block — same API, different "module."

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createRegistry():
  map = new Map()
  return {
    register(key, value):
      if map already has key → throw Error("already registered")
      map.set(key, value)

    resolve(key):
      value = map.get(key)
      if value is undefined → throw RangeError("not registered")
      return value

    has(key): return map.has(key)
    keys(): return list of map keys
  }

icons = createRegistry()
icons.register("chevron-down", svgString)
icons.register("close", svgString)
icons.register("check", svgString)
icons.register("star", svgString)   ← external module, same API

function renderIcon(name):
  return span wrapping icons.resolve(name)   ← no fallback "?"
```

Remove the silent `?` fallback — let `resolve` throw so typos fail loudly during development.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createRegistry() {
  const map = new Map();
  return {
    register(key, value) {
      if (map.has(key)) throw new Error(`already registered: ${key}`);
      map.set(key, value);
    },
    resolve(key) {
      const value = map.get(key);
      if (value === undefined) throw new RangeError(`not registered: ${key}`);
      return value;
    },
    has(key) { return map.has(key); },
    keys() { return [...map.keys()]; },
  };
}

const icons = createRegistry();

// --- bootstrap: core icons
icons.register("chevron-down", `<svg viewBox="0 0 16 16"><path d="M4 6l4 4 4-4"/></svg>`);
icons.register("close",        `<svg viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg>`);
icons.register("check",        `<svg viewBox="0 0 16 16"><path d="M3 8l4 4 6-7"/></svg>`);

// --- bootstrap: external design-system package (simulated)
icons.register("star", `<svg viewBox="0 0 16 16"><path d="M8 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3-4 1z"/></svg>`);

function renderIcon(name) {
  return `<span class="icon">${icons.resolve(name)}</span>`;
}

// --- Verify ---
console.log(renderIcon("check"));
// <span class="icon"><svg …>…</svg></span>

console.log(renderIcon("star"));
// <span class="icon"><svg …>…</svg></span>

console.log(icons.keys());
// [ 'chevron-down', 'close', 'check', 'star' ]

try {
  renderIcon("chevrn-down");
} catch (e) {
  console.log(e.message); // not registered: chevrn-down
}

try {
  icons.register("close", "<svg>duplicate</svg>");
} catch (e) {
  console.log(e.message); // already registered: close
}
```

**What changed:**

- The closed `icons` object became a registry with `register` / `resolve` — external modules add keys at bootstrap
- `renderIcon` delegates lookup to `resolve`; it no longer implements fallback logic
- Duplicate and missing keys fail in one place with explicit errors

**Concepts at work:** Producers **register** values by key at bootstrap; consumers **resolve** by name at runtime — neither imports the other. The private `Map` behind `createRegistry` is the **registry**; `register` and `resolve` are the narrow public API (often wrapped in a **Module**). The duplicate guard matters for **dynamic registration** when load order is not guaranteed.

</details>

---

## Challenge 2 — The Handler Switchboard

### The Code

One function dispatches UI actions. Every new toolbar button adds another branch.

```javascript
function dispatch(action, payload) {
  if (action === "save") {
    console.log(`[save] persisted ${payload.id}`);
  } else if (action === "export") {
    console.log(`[export] csv for ${payload.id}`);
  } else if (action === "delete") {
    console.log(`[delete] removed ${payload.id}`);
  } else {
    console.warn(`unknown action: ${action}`);
  }
}

dispatch("save",   { id: "doc-1" });
dispatch("export", { id: "doc-1" });
dispatch("archive", { id: "doc-1" }); // unknown — only warns
```

A plugin team wants to register `"archive"` without editing `dispatch`. The core file grows with every feature flag and plugin action.

### What's Wrong

The dispatch function is a coupling hub — it knows every action name and handler inline. Adding `"duplicate"` or `"share"` means opening this file. Unknown actions only `console.warn`, so typos in action strings fail quietly in production.

Three problems:

1. **Central switch grows without bound** — every handler is another `else if` in one function
2. **Plugins cannot register** — there is no `register(action, handler)` seam for third-party code
3. **Weak contract** — handlers are anonymous branches, not values validated at registration time

### Your Task

Refactor so that:

- A `createActionRegistry()` returns `{ register, dispatch, has, keys }`
- Each handler is a function `(payload) => void` registered by name
- `register` throws if the action is already registered; `dispatch` throws `RangeError` for unknown actions
- Core actions (`save`, `export`, `delete`) register at bootstrap; simulate a plugin registering `"archive"` in a separate block
- `dispatch` only resolves and calls — no action-specific branching inside it

Target interface:

```javascript
const actions = createActionRegistry();

actions.register("save",   (p) => console.log(`[save] persisted ${p.id}`));
actions.register("export", (p) => console.log(`[export] csv for ${p.id}`));
actions.register("delete",  (p) => console.log(`[delete] removed ${p.id}`));

// plugin module at bootstrap
actions.register("archive", (p) => console.log(`[archive] cold storage ${p.id}`));

actions.dispatch("archive", { id: "doc-1" });
// [archive] cold storage doc-1
```

---

### Hints

<details>
<summary>#1 — Handlers as registered values</summary>

Each `else if` branch is really a **named handler** — the action string is the key, the function is the value. Pull each branch body into a function and `register` it under the action name.

`dispatch` becomes: look up handler by name, call it with payload. It should not contain `"save"`, `"export"`, or any action string — only generic lookup logic.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createActionRegistry() {
  const handlers = new Map();

  return {
    register(action, handler) {
      if (typeof handler !== "function") throw new TypeError("handler must be a function");
      if (handlers.has(action)) throw new Error(`already registered: ${action}`);
      handlers.set(action, handler);
    },
    dispatch(action, payload) {
      const handler = handlers.get(action);
      if (!handler) throw new RangeError(`not registered: ${action}`);
      handler(payload);
    },
    has(action) { return handlers.has(action); },
    keys() { return [...handlers.keys()]; },
  };
}
```

Validate `handler` is a function at registration — fail early like the plugin registry in the pattern doc.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createActionRegistry():
  handlers = new Map()
  return {
    register(action, handler):
      if handler is not a function → throw TypeError
      if handlers has action → throw Error("already registered")
      handlers.set(action, handler)

    dispatch(action, payload):
      handler = handlers.get(action)
      if no handler → throw RangeError("not registered")
      handler(payload)    ← no switch, no if chain

    has(action): return handlers.has(action)
    keys(): return list of action names
  }

// bootstrap — core
actions.register("save", handlerFn)
actions.register("export", handlerFn)
actions.register("delete", handlerFn)

// bootstrap — plugin
actions.register("archive", handlerFn)

actions.dispatch("archive", { id: "doc-1" })
```

The plugin team ships one `register` call — `dispatch` and core handlers stay untouched.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createActionRegistry() {
  const handlers = new Map();

  return {
    register(action, handler) {
      if (typeof handler !== "function") {
        throw new TypeError(`handler for "${action}" must be a function`);
      }
      if (handlers.has(action)) throw new Error(`already registered: ${action}`);
      handlers.set(action, handler);
    },
    dispatch(action, payload) {
      const handler = handlers.get(action);
      if (!handler) throw new RangeError(`not registered: ${action}`);
      handler(payload);
    },
    has(action) { return handlers.has(action); },
    keys() { return [...handlers.keys()]; },
  };
}

const actions = createActionRegistry();

// --- bootstrap: core toolbar
actions.register("save",   (p) => console.log(`[save] persisted ${p.id}`));
actions.register("export", (p) => console.log(`[export] csv for ${p.id}`));
actions.register("delete",  (p) => console.log(`[delete] removed ${p.id}`));

// --- bootstrap: archive plugin (simulated external module)
actions.register("archive", (p) => console.log(`[archive] cold storage ${p.id}`));

// --- Verify ---
actions.dispatch("save",   { id: "doc-1" });
// [save] persisted doc-1

actions.dispatch("export", { id: "doc-1" });
// [export] csv for doc-1

actions.dispatch("archive", { id: "doc-1" });
// [archive] cold storage doc-1

console.log(actions.keys());
// [ 'save', 'export', 'delete', 'archive' ]

try {
  actions.dispatch("share", { id: "doc-1" });
} catch (e) {
  console.log(e.message); // not registered: share
}

try {
  actions.register("save", () => {});
} catch (e) {
  console.log(e.message); // already registered: save
}
```

**What changed:**

- `dispatch` has no action-specific branches — only resolve-and-call
- Plugins register handlers at bootstrap; the core dispatch function never changes
- Unknown and duplicate actions throw instead of warning or overwriting silently

**Concepts at work:** Handlers are **registrants**; the toolbar and API layer are **resolvers** that call `dispatch(action, payload)`. The registry enforces a **value contract** — every entry is a `(payload) => void` function. This is the same shape as a plugin registry's `install` contract, but with a simpler handler surface. Pair with **Factory** when dispatch must construct different handler types; reserve registries for pluggable **named** values, not hidden infrastructure dependencies (**Service Locator** anti-pattern).

</details>

---

## When Not to Use the Registry Pattern

A registry earns its place when producers and consumers must not import each other and keys are stable enough to name. Skip it when:

- **There is only one value and it will never be extended.** A single `fetchJson` function does not need a registry with one entry — call the function directly.
- **The consumer always knows the implementation.** If every call site imports `sendEmail` explicitly, a registry adds indirection without decoupling benefit — use direct imports or **dependency injection** instead.
- **You are wiring app infrastructure.** Resolving `db`, `mailer`, or `logger` from a global registry hides dependencies (**Service Locator**). Inject those as arguments; registries suit icons, plugins, and named handlers.
- **Keys are not stable.** If action names change every sprint and nothing registers dynamically, a plain module export or **Factory** may be simpler.

The rule of thumb: if external or late-loaded code must plug in by name without editing core files, that is a registry. If the same lookup table is edited in one place forever, a module export may be enough — until the second producer appears.

---

## What to Take Away

Before moving on, answer these from memory:

1. In Challenge 1, what is the difference between a closed `icons` object and a registry with `register` / `resolve`?
2. Why does Challenge 2 validate that handlers are functions at `register` time rather than at `dispatch` time?
3. When does a registry become a service locator — and why is resolving `mailer` from a global registry a problem?
4. What is the relationship between Registry and Factory — when would you use both together?

---

*← [Registry Pattern](/code/design-patterns/patterns/6-registry-pattern)*
