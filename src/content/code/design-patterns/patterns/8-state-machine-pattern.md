---
domain: code
section: design-patterns
chapter: patterns
title: "State Machine Pattern"
order: 8
description: "Model UI and application behaviour as named states with explicit transitions — making impossible states impossible."
chapterLabel: "Patterns"
---

# State Machine Pattern

> Define every state your system can be in, declare which events move you between them, and let the machine enforce that nothing else can happen.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Behavioral |
| Participants | States (named, exhaustive), Events (triggers), Transitions (state + event → next state), Actions (side effects on entry/exit/transition), Context (data that travels alongside state) |
| Pairs well with | Observer (notify subscribers on transition), Module (machine factory with private state map), Command (transitions as recorded commands) |
| Don't pair with | Boolean flag soup — if `isLoading && !isError && hasData` drives your UI, replace the flags with states, don't layer a machine on top |
| Use cases | Fetch lifecycle (idle/loading/success/error), form wizard, modal flow, media player, auth session, drag-and-drop |
| Maintenance cost | Low when states are exhaustive and transitions are explicit; high when guards become nested if-chains inside `send` |

## Basic Code

A fetch lifecycle machine: four states, five transitions. The machine throws if you try to `SUCCESS` from `idle` — the transition does not exist.

```javascript
function createMachine({ initial, states }) {
  let current = initial;
  return {
    getState() { return current; },
    send(event) {
      const next = states[current]?.on?.[event];
      if (!next) throw new Error(`invalid: ${event} from ${current}`);
      current = next;
      return current;
    },
    matches(state) { return current === state; },
  };
}

const fetchMachine = createMachine({
  initial: "idle",
  states: {
    idle:    { on: { FETCH:   "loading" } },
    loading: { on: { SUCCESS: "success", ERROR: "error" } },
    success: { on: { RESET:   "idle" } },
    error:   { on: { RETRY:   "loading", RESET: "idle" } },
  },
});

fetchMachine.send("FETCH");    // "loading"
fetchMachine.send("SUCCESS");  // "success"
fetchMachine.send("RESET");    // "idle"

try { fetchMachine.send("SUCCESS"); } catch (e) { console.log(e.message); }
// invalid: SUCCESS from idle
```

## How it works

A state machine is a **closed system**: every possible state is named, and every valid transition is declared. Anything not listed is forbidden.

```
         FETCH
  idle ─────────► loading
                  │     │
           SUCCESS│     │ERROR
                  ▼     ▼
               success  error
                  │     │  │
            RESET│     │  │RETRY
                  │  RESET │
                  ▼     ▼  ▼
                    idle ◄──
```

**Why this matters:** With boolean flags you can represent invalid states — `isLoading: true, isError: true` is meaningless but nothing prevents it. A state machine with `loading` and `error` as separate states makes that combination structurally impossible.

**Context:** State alone isn't enough for most UI — you also need the fetched data, error message, or form values. Extend the machine with a `context` object that travels alongside state. Transitions can return an updated context; actions read it.

**Actions on transitions:** More complete machines fire side effects when entering a state (`entry`), leaving a state (`exit`), or on a specific transition. Keep actions pure when possible — they should describe *what* should happen, not reach into external state directly.

## In Practice

### When to use

- UI has more than two or three conditions that interact — `isLoading`, `isError`, `isEmpty`, `hasData` are four booleans representing up to 16 combinations, most of them invalid
- You need to guarantee that certain operations cannot happen in certain states (no `SUBMIT` while already `submitting`)
- Debugging requires knowing what state the app was in when a bug occurred — a state machine makes that auditable

### Anti-patterns

```javascript
// Anti-pattern: boolean intersection state
const [isLoading, setLoading] = useState(false);
const [isError,   setError]   = useState(false);
const [data,      setData]    = useState(null);

// What does isLoading=true AND isError=true mean? Nothing valid.
// What does isLoading=false AND data=null AND isError=false mean? Unclear.
```

Replace the three booleans with one `status` string: `"idle" | "loading" | "success" | "error"`. That is the simplest form of a state machine — even without a `createMachine` helper.

```javascript
// Anti-pattern: guard-heavy send()
send(event) {
  if (current === "loading" && event === "SUCCESS" && someExternalFlag) { … }
  if (current === "loading" && event === "SUCCESS" && !someExternalFlag) { … }
  // …
}
```

Guards should live in the transition definition, not accumulate inside a generic `send`. When guards outgrow the transition table, consider splitting states (`loadingWithFlag` / `loadingWithoutFlag`) before adding conditional logic to `send`.

> **Rule of thumb:** If you can draw a diagram with boxes (states) and labelled arrows (events), you have a state machine. If the diagram has more than ~8 states, split into multiple machines. If you only have two states and no guards, a plain boolean is fine.

## Code Examples

### Basic — Fetch Lifecycle with Context

The machine carries context (data and error) alongside state. Each transition updates state; the `data` and `error` values are part of the snapshot the UI reads.

```javascript
function createMachine({ initial, context: initialContext, states }) {
  let current = initial;
  let context = { ...initialContext };

  return {
    getSnapshot() { return { state: current, context: { ...context } }; },
    matches(state) { return current === state; },
    send(event, payload) {
      const transition = states[current]?.on?.[event];
      if (!transition) throw new Error(`invalid: ${event} from ${current}`);

      const { target, assign } = typeof transition === "string"
        ? { target: transition, assign: null }
        : transition;

      if (assign) context = { ...context, ...assign(context, payload) };
      current = target;
      return { state: current, context: { ...context } };
    },
  };
}

const fetchMachine = createMachine({
  initial: "idle",
  context: { data: null, error: null },
  states: {
    idle: {
      on: { FETCH: "loading" },
    },
    loading: {
      on: {
        SUCCESS: {
          target: "success",
          assign: (ctx, payload) => ({ data: payload, error: null }),
        },
        ERROR: {
          target: "error",
          assign: (ctx, payload) => ({ error: payload, data: null }),
        },
      },
    },
    success: { on: { RESET: "idle" } },
    error:   { on: { RETRY: "loading", RESET: "idle" } },
  },
});

// --- Simulate a fetch
fetchMachine.send("FETCH");
console.log(fetchMachine.getSnapshot());
// { state: 'loading', context: { data: null, error: null } }

fetchMachine.send("SUCCESS", { user: "Ada", id: 1 });
console.log(fetchMachine.getSnapshot());
// { state: 'success', context: { data: { user: 'Ada', id: 1 }, error: null } }

fetchMachine.send("RESET");
console.log(fetchMachine.getSnapshot());
// { state: 'idle', context: { data: null, error: null } }

// Error path
fetchMachine.send("FETCH");
fetchMachine.send("ERROR", "network timeout");
console.log(fetchMachine.getSnapshot());
// { state: 'error', context: { data: null, error: 'network timeout' } }
```

**What to notice:**

- The UI calls `getSnapshot()` — it never reads raw state variables
- `assign` is a pure function that returns new context; no mutation
- `RETRY` from `error` transitions back to `loading` without resetting context — the previous error stays until `SUCCESS` clears it

### Medium — Form Wizard

A three-step wizard. `BACK` is only valid from steps 2 and 3; `SUBMIT` is only valid from step 3. No `SUBMIT` from step 1 is possible by construction.

```javascript
function createMachine({ initial, states }) {
  let current = initial;
  return {
    getState()   { return current; },
    matches(s)   { return current === s; },
    can(event)   { return Boolean(states[current]?.on?.[event]); },
    send(event) {
      const next = states[current]?.on?.[event];
      if (!next) throw new Error(`invalid: ${event} from ${current}`);
      current = next;
      return current;
    },
  };
}

const wizard = createMachine({
  initial: "step1",
  states: {
    step1:     { on: { NEXT: "step2" } },
    step2:     { on: { NEXT: "step3", BACK: "step1" } },
    step3:     { on: { BACK: "step2", SUBMIT: "submitting" } },
    submitting:{ on: { SUCCESS: "done", ERROR: "step3" } },
    done:      { on: {} },
  },
});

// Progress forward
wizard.send("NEXT"); // step2
wizard.send("NEXT"); // step3

console.log(wizard.can("SUBMIT")); // true  — valid from step3
console.log(wizard.can("BACK"));   // true
console.log(wizard.can("NEXT"));   // false — no NEXT from step3

wizard.send("SUBMIT");             // submitting
wizard.send("SUCCESS");            // done

// Try an impossible action
try { wizard.send("BACK"); } catch (e) { console.log(e.message); }
// invalid: BACK from done
```

**What to notice:**

- `can(event)` lets the UI disable buttons without duplicating state logic — the machine is the single source of truth for what is allowed
- `submitting` is a real state — the submit button is disabled, not just visually hidden
- `ERROR` from `submitting` returns to `step3` so the user can fix and resubmit

## Trade-offs

| Pro | Con |
| --- | --- |
| Invalid combinations are structurally impossible — no `isLoading && isError` | Verbose for simple two-state problems that a plain boolean handles fine |
| State is auditable — `getSnapshot()` gives a full picture for debugging and logging | Transition tables grow quickly for complex branching; hierarchical states (XState) help but add complexity |
| `can(event)` drives UI affordances (disabled buttons, hidden steps) from one source of truth | Developers unfamiliar with state machines find the vocabulary (states, events, guards, actions) steep at first |

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Observer | Subscribe to state transitions to drive UI, analytics, or side effects without polling `getState`. |
| Strategy | Behavior per state can be modelled as a strategy — each state object holds the methods valid in that state. |
| Command | Each `send(event)` call can be recorded as a command for undo/replay of the transition history. |
| Mediator | A state machine can act as a Mediator when state transitions broadcast events to multiple dependents. |

## Further Reading

- [XState — JavaScript state machines and statecharts](https://xstate.js.org/docs/)
- [State machines in JavaScript — David Khourshid (CSS Tricks)](https://css-tricks.com/robust-react-user-interfaces-with-finite-state-machines/)
- [Statecharts — a visual formalism for complex systems](https://statecharts.dev/)

## Self-check questions

1. You have `isLoading`, `isError`, and `isSuccess` booleans in a component. How many logically valid states do they represent — and how would you model those as a state machine?
2. What does `can(event)` enable in the UI that would otherwise require duplicated conditional logic?
3. Your machine has ten states and thirty transitions. What is the first refactoring to consider, and what pattern supports it?
