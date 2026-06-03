---
domain: code
section: design-patterns
chapter: patterns
title: "Observer Pattern"
order: 3
description: "A one-to-many subscription: a Subject notifies registered Observers whenever its state changes."
chapterLabel: "Patterns"
---

# Observer Pattern

> A one-to-many subscription mechanism: a Subject notifies registered Observers whenever its state changes.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Behavioral |
| Participants | Subject (publisher), Observer (subscriber), optional unsubscribe handle |
| Pairs well with | Module (private listener set), Command (events as first-class objects), Pub/Sub (decoupled channels) |
| Don't pair with | Direct parent→child callback props for every leaf when one store already owns the state |
| Use cases | Keep many UI surfaces in sync with one source of truth; run side effects (analytics, persistence) on state change; let distant modules react without importing the state owner |
| Maintenance cost | Low with explicit unsubscribe; high when listeners leak or notification order becomes implicit |

## Basic Code

The smallest useful shape: a Subject keeps a `Set` of callbacks, `subscribe` registers an Observer and returns teardown, and `notify` pushes a value to every registered listener. No classes, no framework — the same contract as `addEventListener` in six lines.

```javascript
function createSubject() {
  const observers = new Set();
  return {
    subscribe(fn) {
      observers.add(fn);
      return () => observers.delete(fn);
    },
    notify(value) {
      for (const fn of observers) fn(value);
    },
  };
}

const subject = createSubject();
subject.subscribe((v) => console.log("A:", v));
subject.subscribe((v) => console.log("B:", v));
subject.notify(42); // A: 42  B: 42
```

## How it works

The Observer pattern has two core roles: **Subject** (maintains state and a list of subscribers) and **Observer** (callable that runs when the Subject notifies). The Subject knows the Observers; Observers typically know only the Subject’s public API (`subscribe`, `getSnapshot`, `set`).

```
     ┌──────────────┐
     │   Subject    │
     │  state       │
     │  observers[] │
     └──────┬───────┘
            │ notify(state)
     ┌──────┼──────┬──────────┐
     ▼      ▼      ▼          ▼
   Obs A  Obs B  Obs C    Obs D
```

**Push vs pull:** Classic Observer pushes the new value into each callback. Some implementations (React 18 `useSyncExternalStore`) expose `getSnapshot()` and notify “something changed” so Observers pull the latest value during render — same subscription graph, different read timing.

**Lifecycle:** Observers register at mount or setup (`subscribe`). The Subject notifies on every state transition. Observers unregister on teardown — return value of `subscribe`, `removeEventListener`, or effect cleanup. Skipping teardown leaves closures holding DOM nodes and causes memory leaks in SPAs.

**Coupling:** The Subject depends on Observer *shape* (a function or interface), not concrete classes. Observers depend on the Subject’s API, not on each other — that one-way graph is what keeps features from importing each other in a web.

**Paradigms involved:** Event-driven architecture (emit → react), reactive data flow (state propagates to dependents), and inversion of control (the Subject drives when Observers run, not the other way around).

## Metaphor

**Newsletter mailing list.** The publisher writes one edition when news breaks; every subscriber on the list receives the same update without the publisher addressing each person by name. `subscribe` is signing up; `unsubscribe` is opting out; `notify` is hitting send. The publisher does not need to know whether you read on your phone or desktop — only that you registered interest.

**Weather alert service.** The forecast office updates a storm warning once; apps, radio stations, and highway signs that registered for alerts all react on their own schedule. None of those outlets polls the others — they all listen to the same source. That one-to-many broadcast is the Observer graph: one Subject state change, many independent Observers updating UI, cache, or logs.

## Functionality

- One piece of state changes and several unrelated parts of the app must react — header badge, sidebar count, localStorage sync — without the owner of that state knowing every consumer by name.
- The Subject holds the value and a registry of Observers; Observers register interest and receive pushes when state updates. Producers do not call `updateHeader()` and `updateSidebar()` directly.
- In JavaScript this shows up as `addEventListener`, reactive stores, and framework re-render: the platform or library is the Subject; your components and callbacks are Observers.

## In Practice

### When to use

- Multiple consumers need the same state update and you are manually calling each one from the mutation site.
- Side effects (persist, track, broadcast) are copy-pasted after every `setState` or store write.
- Features in different files must stay in sync but should not import each other in a chain.

### Use cases

| Scenario | Signal |
| -------- | ------ |
| Many UI surfaces must stay in sync with one source of truth (cart count, auth session, theme) | Each component fetches or copies state independently; counts drift after one action |
| Non-UI side effects should run on state change (analytics, persistence, WebSocket broadcast) | `setState` calls are followed by copy-pasted `localStorage.setItem` and `track()` in five files |
| Third-party or distant modules need updates without importing the state owner | God component passes six callback props through intermediate wrappers that never use them |

```javascript
// Smell: parent manually notifies every dependent
let cartCount = 0;
function addToCart() {
  cartCount += 1;
  updateHeaderBadge(cartCount);
  updateSidebarLabel(cartCount);
  syncCartToServer(cartCount);
}

// Fix: one subject; observers own their reactions
const cart = createCartStore();
cart.subscribe((count) => { document.querySelector("#badge").textContent = count; });
cart.subscribe((count) => localStorage.setItem("cartCount", String(count)));
cart.addItem("sku-1");
```

### Anti-patterns

| Situation | Instead |
| --------- | ------- |
| Single parent passes one callback to one child | Prop or inline handler — no subscription registry |
| Observers only exist to glue two modules that should share one function call | Import the module and call its API directly |
| Every message in the app goes through one global bus with no typing or ownership | **Pub/Sub** with named channels — or colocate state with **Module** + narrow `subscribe` |

```javascript
// Anti-pattern: Observer for a single parent → single child link
const events = createSubject();
events.subscribe(() => child.render());
function Parent() {
  return <Child onClick={() => events.notify()} />;
}

// Prefer: pass the handler
function Parent() {
  return <Child onClick={handleClick} />;
}
```

> **Rule of thumb:** If only one listener exists and it lives one call site away, pass a callback. If listeners multiply or live in other files, centralize state and subscribe.

## Applications

### Browser

**EventTarget and `addEventListener`** DOM nodes and many platform objects maintain a listener registry. `dispatchEvent` notifies every registered handler for that type — the node is the Subject, listener functions are Observers, and `removeEventListener` is unsubscribe.

**MutationObserver** The browser watches a DOM subtree and invokes your callback when nodes or attributes change. You register once; the engine pushes change records into your Observer function instead of polling the tree on a timer.

**IntersectionObserver and ResizeObserver** Layout and visibility changes trigger callbacks for observed elements. Each observer instance holds a set of targets; when geometry or intersection ratio crosses a threshold, the runtime notifies your handler with batched entries.

**RxJS `Observable` and framework reactivity** An Observable or reactive proxy is the Subject: subscribers receive emissions over time. Vue’s reactivity tracks dependencies during render and re-runs components when tracked fields mutate; React `useState` schedules re-renders for components that read state during the last render — framework-managed Observer graphs.

### UI

**Live dashboards and notification badges** The user sees counts and status chips update without refreshing. A store or query cache is the Subject; each widget subscribes and re-renders when server-pushed or polled data changes.

**Global theme and accessibility settings** Toggling dark mode or font size updates document class, chart colors, and embedded iframes. A settings module notifies subscribers; UI islands do not read `localStorage` directly on every mount.

**Collaborative or multi-pane layouts** Editing a field in one pane updates previews, validation summaries, and undo stacks elsewhere. Shared document state notifies all panes; panes do not call each other’s update methods.

## Trade-offs

| Pro | Con |
| --- | --- |
| Add a new reaction (analytics, badge, sync) by subscribing — no edits to the state owner | Notification order is undefined unless you enforce it; Observer B may run before Observer A and break assumptions |
| State owner stays unaware of concrete consumers — fewer import cycles across features | Forgotten `unsubscribe` keeps dead DOM and closures alive in long-lived SPAs |
| Same model as DOM events — `subscribe` / `notify` maps directly to platform mental models | Observer chains that mutate shared state during notify create loops (A → B → A) that are hard to trace |

**Known Issues / Pitfalls**

- **Forgotten unsubscriptions** — Mount without cleanup leaks listeners; always return teardown from `subscribe`, effects, or `AbortSignal`.
- **Notification loops** — Observer A writes state that retriggers Observer B which writes back; guard with equality checks or batch updates.
- **Stale closures** — Callbacks capture old state if they close over variables instead of reading `getSnapshot()` at notify time.

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Pub/Sub | Adds a message broker between publishers and subscribers; Observers often know the Subject directly. |
| Mediator | Central object coordinates many colleagues; Observer is many-to-one notification, not negotiation. |
| Module | Encapsulates private `listeners` set inside a module boundary; Observer describes the notify contract. |
| Command | Encapsulates actions as objects; Observer + Command stores commands in history for undo/redo. |

## Code Examples

### Basic

A minimal Subject with `subscribe`, `notify`, and unsubscribe via the return value. Two anonymous observers print the same pushed value.

```javascript
function createSubject(initial = 0) {
  let value = initial;
  const observers = new Set();

  return {
    get() {
      return value;
    },
    set(next) {
      if (Object.is(value, next)) return;
      value = next;
      for (const observer of observers) {
        observer(value);
      }
    },
    subscribe(observer) {
      observers.add(observer);
      observer(value); // sync initial read
      return () => observers.delete(observer);
    },
  };
}

const temperature = createSubject(20);
const offA = temperature.subscribe((c) => console.log("sensor A:", c));
const offB = temperature.subscribe((c) => console.log("sensor B:", c));

temperature.set(25);
offA();
temperature.set(30); // only sensor B logs
```

**What to notice:**

- `Object.is` prevents notify storms when the value did not change.
- `subscribe` returns `off` — the lifecycle hook callers must run on teardown.

### Medium

A reactive store drives a tiny vanilla DOM UI. Components call `store.subscribe(render)`; buttons call `store.set` — consumers never import each other.

```javascript
function createStore(initial) {
  let state = { ...initial };
  const listeners = new Set();

  return {
    getSnapshot() {
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set(partial) {
      state = { ...state, ...partial };
      for (const listener of listeners) listener();
    },
  };
}

const store = createStore({ count: 0, label: "Clicks" });

const countEl = document.querySelector("#count");
const labelEl = document.querySelector("#label");

function render() {
  const { count, label } = store.getSnapshot();
  countEl.textContent = String(count);
  labelEl.textContent = label;
}

store.subscribe(render);

document.querySelector("#inc").addEventListener("click", () => {
  store.set({ count: store.getSnapshot().count + 1 });
});

document.querySelector("#rename").addEventListener("click", () => {
  store.set({ label: "Total clicks" });
});
```

**What to notice:**

- `getSnapshot` + notify-with-no-args matches pull-at-notify-time (same discipline as `useSyncExternalStore`).
- One store, two DOM regions — add a third by subscribing, not by editing `set`.

### Advanced

**Observer + Command:** State changes are Command objects pushed into a history stack. Subscribers re-render from `getSnapshot()`; undo/redo replays commands instead of mutating ad hoc.

```javascript
function createDocumentStore(initialText = "") {
  let text = initialText;
  const listeners = new Set();
  const undoStack = [];
  const redoStack = [];

  function notify() {
    for (const listener of listeners) listener();
  }

  function execute(command) {
    command.apply();
    undoStack.push(command);
    redoStack.length = 0;
    notify();
  }

  return {
    getSnapshot() {
      return { text, canUndo: undoStack.length > 0, canRedo: redoStack.length > 0 };
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    insert(at, chunk) {
      execute({
        apply() {
          text = text.slice(0, at) + chunk + text.slice(at);
        },
        revert() {
          text = text.slice(0, at) + text.slice(at + chunk.length);
        },
      });
    },
    undo() {
      const command = undoStack.pop();
      if (!command) return;
      command.revert();
      redoStack.push(command);
      notify();
    },
    redo() {
      const command = redoStack.pop();
      if (!command) return;
      command.apply();
      undoStack.push(command);
      notify();
    },
  };
}

const doc = createDocumentStore("hello");
const editor = document.querySelector("#editor");
const undoBtn = document.querySelector("#undo");

function render() {
  const { text, canUndo, canRedo } = doc.getSnapshot();
  editor.value = text;
  undoBtn.disabled = !canUndo;
  document.querySelector("#redo").disabled = !canRedo;
}

doc.subscribe(render);

document.querySelector("#append").addEventListener("click", () => {
  const { text } = doc.getSnapshot();
  doc.insert(text.length, "!");
});

undoBtn.addEventListener("click", () => doc.undo());
document.querySelector("#redo").addEventListener("click", () => doc.redo());
```

**What to notice:**

- Observers react to *any* history change — insert, undo, redo — through one `notify` path.
- Commands encapsulate `apply` / `revert`; the store is Subject, UI and buttons are Observers.

## Further Reading

- [Observer — Refactoring.Guru](https://refactoring.guru/design-patterns/observer)
- [Observer pattern — patterns.dev](https://www.patterns.dev/vanilla/observer-pattern)
- [useSyncExternalStore — React docs](https://react.dev/reference/react/useSyncExternalStore)

## Self-check questions

Test your understanding:

1. Why return an unsubscribe function from `subscribe` instead of requiring Observers to pass an ID and call `unsubscribe(id)`?
2. Observer A’s callback calls `subject.set()` — what symptom appears in the UI, and what guard stops the loop?
3. When would you choose Pub/Sub over a Subject that every consumer imports directly?
