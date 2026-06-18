---
domain: code
section: design-patterns
chapter: patterns
title: "Registry Pattern"
order: 6
description: "A central map that associates keys with registered values so callers resolve by name without importing concrete implementations."
chapterLabel: "Patterns"
---

# Registry Pattern

> A shared lookup table where producers register values by key at bootstrap and consumers resolve them by name at runtime — without either side knowing the other exists.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Structural |
| Participants | Registry (key → value map), registrants (producers), resolvers (consumers) |
| Pairs well with | Factory (registry feeds the factory's branch), Module (private map behind a narrow API), Observer (notify on new registration) |
| Don't pair with | Service Locator as an app-wide dependency container — that hides coupling instead of removing it |
| Use cases | Icon systems, plugin registration, component lookup, named handler maps, feature flag resolvers |
| Maintenance cost | Low with a narrow `register` / `resolve` API; high when anything can overwrite anything freely |

## Basic Code

An icon registry maps string keys to SVG strings. Callers resolve by name — they never import icon files directly — and unregistered keys throw in one place.

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
  };
}

const icons = createRegistry();
icons.register("chevron-down", `<svg>…</svg>`);
icons.register("close", `<svg>…</svg>`);

icons.resolve("chevron-down"); // returns SVG string
icons.resolve("missing");      // throws RangeError
```

## How it works

The Registry pattern separates **registration time** (bootstrap, module load, plugin init) from **resolution time** (runtime render, handler dispatch). Producers and consumers are decoupled — they share only the key string and the value contract.

```
  bootstrap                     runtime
  ─────────────────────         ──────────────────────
  iconA.register("close", …)    icon = icons.resolve("close")
  iconB.register("menu", …)     icon = icons.resolve("menu")
  pluginC.register("theme", …)
           │                             │
           └────────► Registry ◄─────────┘
                       Map {
                         "close"  → SVG,
                         "menu"   → SVG,
                         "theme"  → handler,
                       }
```

**Static vs dynamic registration:** A static registry is fully populated at module load — all keys are known before any consumer runs. A dynamic registry is populated at runtime (plugins install themselves, users load extensions). Dynamic registries need the duplicate-key guard because registration order is not guaranteed.

**Value contract:** Every value stored under a key should satisfy the same interface. If `resolve("email")` returns `{ send(msg) }` and `resolve("sms")` returns `{ send(msg) }`, callers depend on `send` — not on the specific object. This is what makes a registry an enabler for the Factory pattern: the factory resolves then calls.

## In Practice

### When to use

- A consumer needs a value (handler, component, SVG) by string name at runtime and should not import it directly
- Third-party code or late-loaded modules must plug in without editing core files
- The same "which implementation?" lookup appears in more than one place

### Anti-patterns

```javascript
// Anti-pattern: flat export object with everything inlined
export const icons = {
  chevronDown: `<svg>…</svg>`,
  close: `<svg>…</svg>`,
  // 200 more entries …
};
```

This is a lookup table, not a Registry. It cannot be extended by external code, it has no registration guard, and it forces every importer to load the entire object. A Registry exposes `register` — external modules add themselves; the core file stays stable.

```javascript
// Anti-pattern: Registry as dependency container
const services = createRegistry();
services.register("db", db);
services.register("mailer", mailer);

function sendWelcome() {
  const mailer = services.resolve("mailer"); // hidden dependency
}
```

Resolving infrastructure dependencies from a global registry hides coupling and makes call sites hard to test. Inject dependencies as function arguments instead; reserve the registry for values that are genuinely named and pluggable (icons, plugins, handlers).

> **Rule of thumb:** Use a registry when producers and consumers must not import each other and the mapping between name and value is stable enough to name. Use direct imports or dependency injection when the consumer always knows exactly which value it needs.

## Code Examples

### Basic — Icon Registry

Registrations happen at app bootstrap; components resolve by name. Adding a new icon is one `register` call — no component changes.

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

// --- bootstrap (runs once at app start)
const icons = createRegistry();
icons.register("chevron-down", `<svg viewBox="0 0 16 16"><path d="M4 6l4 4 4-4"/></svg>`);
icons.register("close",        `<svg viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8"/></svg>`);
icons.register("check",        `<svg viewBox="0 0 16 16"><path d="M3 8l4 4 6-7"/></svg>`);

// --- consumer (any module, no import of icon files)
function renderIcon(name) {
  return `<span class="icon">${icons.resolve(name)}</span>`;
}

console.log(renderIcon("check"));
// <span class="icon"><svg …>…</svg></span>

try { renderIcon("star"); } catch (e) { console.log(e.message); }
// not registered: star

console.log(icons.keys()); // ['chevron-down', 'close', 'check']
```

**What to notice:**

- Components never `import` SVG files — they resolve by name
- Adding "star" is one line at bootstrap; `renderIcon` stays unchanged
- The duplicate guard prevents silent overwrites when two modules register the same key

### Medium — Plugin Registry

Plugins register themselves with a shared name and an `install` contract. The host resolves and runs them in order — it has no knowledge of what any specific plugin does.

```javascript
function createPluginRegistry() {
  const plugins = new Map();

  return {
    register(name, plugin) {
      if (typeof plugin.install !== 'function') {
        throw new TypeError(`plugin "${name}" must expose install()`);
      }
      if (plugins.has(name)) throw new Error(`plugin already registered: ${name}`);
      plugins.set(name, plugin);
    },
    installAll(context) {
      for (const [name, plugin] of plugins) {
        plugin.install(context);
        console.log(`[plugin] installed: ${name}`);
      }
    },
    has(name) { return plugins.has(name); },
  };
}

// --- plugins register themselves
const registry = createPluginRegistry();

registry.register("analytics", {
  install(ctx) { ctx.on("pageview", (url) => console.log(`[analytics] ${url}`)); },
});

registry.register("darkMode", {
  install(ctx) { ctx.on("theme", (t) => document.body.dataset.theme = t); },
});

// --- host installs all registered plugins at bootstrap
const appContext = {
  handlers: {},
  on(event, fn) { this.handlers[event] = fn; },
  emit(event, data) { this.handlers[event]?.(data); },
};

registry.installAll(appContext);

appContext.emit("pageview", "/home");  // [analytics] /home
```

**What to notice:**

- The host calls `installAll` — it never knows "analytics" or "darkMode" exist by name
- The `install` contract is validated at registration; malformed plugins fail early
- New plugins are added by calling `register`; the host and existing plugins are untouched

## Trade-offs

| Pro | Con |
| --- | --- |
| Producers and consumers decouple across module boundaries — neither imports the other | Unregistered key errors are runtime, not compile-time; typos in key strings surface late |
| Adding a new registrant (icon, plugin, handler) touches one file — the registration call | Resolution order matters in dynamic registries; plugins may depend on other plugins that haven't registered yet |
| The registry itself is testable in isolation — stub registrations without real implementations | Overuse as a global service locator hides dependencies and makes call sites misleading |

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Factory | Often wraps a registry — the factory resolves by key, then constructs and returns the product. |
| Module | The registry map and its guard logic belong behind a module boundary; consumers only get `register` and `resolve`. |
| Strategy | Strategies can be stored in a registry; the registry is the lookup mechanism, the strategy is the swappable algorithm. |
| Service Locator | Same shape, but treats infrastructure dependencies (DB, mailer) as registry values — an anti-pattern when it hides coupling between modules. |

## Further Reading

- [Service Locator vs Dependency Injection — Martin Fowler](https://martinfowler.com/articles/injection.html#UsingAServiceLocator)
- [Plugin patterns — patterns.dev](https://www.patterns.dev/)
- [Map — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

## Self-check questions

1. What is the difference between a static registry and a dynamic registry — and which guard matters more for each?
2. Why should a plugin registry validate the `install` contract at `register` time rather than at `installAll` time?
3. When does a registry become a service locator — and why is that a problem?
