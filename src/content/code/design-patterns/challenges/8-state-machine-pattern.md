---
domain: code
section: design-patterns
chapter: challenges
title: "State Machine Pattern Challenge"
order: 8
description: "Replace overlapping boolean flags and ad-hoc transition logic with explicit states and events so invalid combinations become impossible."
chapterLabel: "Challenges"
---

# State Machine Pattern — Code Challenges

---

## Challenge 1 — The Boolean Fetch

### The Code

A data loader tracks fetch status with three independent flags. The UI tries to infer what to show from their combination.

```javascript
function createFetchController() {
  let isLoading = false;
  let isError = false;
  let data = null;

  return {
    getView() {
      if (isLoading) return "spinner";
      if (isError) return "error";
      if (data) return "data";
      return "idle";
    },
    startFetch() {
      isLoading = true;
      isError = false;
      data = null;
    },
    succeed(payload) {
      isLoading = false;
      data = payload;
    },
    fail(message) {
      isLoading = false;
      isError = true;
      data = null;
    },
    reset() {
      isLoading = false;
      isError = false;
      data = null;
    },
  };
}

const fetch = createFetchController();

fetch.startFetch();
console.log(fetch.getView()); // spinner

fetch.succeed({ user: "Ada" });
console.log(fetch.getView()); // data

// Bug waiting to happen — forgotten setter path or out-of-order calls:
fetch.startFetch();
fetch.fail("timeout");
fetch.succeed({ user: "Grace" }); // success after error — isError still true?
console.log(fetch.getView()); // spinner? data? error? depends on setter order
```

Three booleans represent up to eight combinations — most of them meaningless (`isLoading && isError`, success data with `isError: true` if `fail` then `succeed` run without `reset`).

### What's Wrong

Run this and ask: what happens when someone calls `succeed` without `startFetch` — or `fail` then `succeed` without `reset`?

The controller exposes imperative setters that tweak flags independently. There is no single source of truth for "what state are we in?" Invalid combinations are possible when setters are skipped or called out of order.

Three problems:

1. **Boolean intersection state** — `isLoading`, `isError`, and `data` can contradict each other
2. **Transitions are implicit** — nothing declares that `SUCCESS` is only valid from `loading`
3. **UI duplicates transition rules** — `getView()` re-implements priority logic that will drift from button handlers

### Your Task

Refactor so that:

- A `createMachine({ initial, states })` helper owns current state and validates transitions in `send(event)`
- Fetch lifecycle uses states: `idle`, `loading`, `success`, `error` with events `FETCH`, `SUCCESS`, `ERROR`, `RESET`, `RETRY`
- Invalid events throw (e.g. `SUCCESS` from `idle`)
- Replace flag setters with `send` — expose `getState()`, `matches(state)`, and `send(event)`

Target interface:

```javascript
const fetchMachine = createMachine({
  initial: "idle",
  states: {
    idle:    { on: { FETCH: "loading" } },
    loading: { on: { SUCCESS: "success", ERROR: "error" } },
    success: { on: { RESET: "idle" } },
    error:   { on: { RETRY: "loading", RESET: "idle" } },
  },
});

fetchMachine.send("FETCH");    // loading
fetchMachine.send("SUCCESS");  // success
fetchMachine.send("RESET");    // idle

try { fetchMachine.send("SUCCESS"); } catch (e) { /* invalid from idle */ }
```

---

### Hints

<details>
<summary>#1 — One state variable, not three flags</summary>

Instead of three booleans, keep one string: `"idle"`, `"loading"`, `"success"`, or `"error"`. Each event moves from the current state to the next **only if** the transition is listed in the table.

`startFetch()` becomes `send("FETCH")`. `succeed()` becomes `send("SUCCESS")`. The machine rejects calls that do not match the current state.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createMachine({ initial, states }) {
  let current = initial;

  return {
    getState() { return current; },
    matches(state) { return current === state; },
    send(event) {
      const next = states[current]?.on?.[event];
      if (!next) throw new Error(`invalid: ${event} from ${current}`);
      current = next;
      return current;
    },
  };
}

const fetchMachine = createMachine({
  initial: "idle",
  states: {
    idle:    { on: { FETCH: "loading" } },
    loading: { on: { SUCCESS: "success", ERROR: "error" } },
    success: { on: { RESET: "idle" } },
    error:   { on: { RETRY: "loading", RESET: "idle" } },
  },
});
```

Draw the diagram: boxes for states, arrows labelled with events. If an arrow is not in the table, `send` throws.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
function createMachine({ initial, states }):
  current = initial
  return {
    getState(): return current
    matches(state): return current === state
    send(event):
      next = states[current].on[event]
      if next is undefined → throw Error("invalid: event from current")
      current = next
      return current
  }

fetchMachine.send("FETCH")     → loading
fetchMachine.send("SUCCESS")   → success
fetchMachine.send("RESET")     → idle
fetchMachine.send("FETCH")     → loading
fetchMachine.send("ERROR")     → error
fetchMachine.send("RETRY")     → loading
fetchMachine.send("SUCCESS")   → success
```

Map old methods: `startFetch` → `FETCH`, `succeed` → `SUCCESS`, `fail` → `ERROR`, `reset` → `RESET`, add `RETRY` from error back to loading.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createMachine({ initial, states }) {
  let current = initial;

  return {
    getState() { return current; },
    matches(state) { return current === state; },
    send(event) {
      const next = states[current]?.on?.[event];
      if (!next) throw new Error(`invalid: ${event} from ${current}`);
      current = next;
      return current;
    },
  };
}

const fetchMachine = createMachine({
  initial: "idle",
  states: {
    idle:    { on: { FETCH: "loading" } },
    loading: { on: { SUCCESS: "success", ERROR: "error" } },
    success: { on: { RESET: "idle" } },
    error:   { on: { RETRY: "loading", RESET: "idle" } },
  },
});

// --- Verify: happy path ---
console.log(fetchMachine.getState()); // idle

fetchMachine.send("FETCH");
console.log(fetchMachine.getState()); // loading

fetchMachine.send("SUCCESS");
console.log(fetchMachine.matches("success")); // true

fetchMachine.send("RESET");
console.log(fetchMachine.getState()); // idle

// --- Verify: error + retry ---
fetchMachine.send("FETCH");
fetchMachine.send("ERROR");
console.log(fetchMachine.getState()); // error

fetchMachine.send("RETRY");
console.log(fetchMachine.getState()); // loading

fetchMachine.send("SUCCESS");
fetchMachine.send("RESET");

// --- Verify: invalid transition ---
try {
  fetchMachine.send("SUCCESS");
} catch (e) {
  console.log(e.message); // invalid: SUCCESS from idle
}
```

**What changed:**

- Three booleans became one `current` state string with an explicit transition table
- Invalid event sequences throw instead of leaving flags in contradictory combinations
- UI reads `getState()` or `matches()` — no priority logic like `if (isLoading) … else if (isError) …`

**Concepts at work:** States are **exhaustive and mutually exclusive** — you are in exactly one at a time. Events trigger **transitions** only when listed under the current state's `on` map. This is the simplest **finite state machine**; context (`data`, `error` payload) can be added with `assign` on transitions.

</details>

---

## Challenge 2 — The Wizard With Leaks

### The Code

A three-step form wizard tracks progress with a step number and flags. Submit is guarded in one place — but other invalid moves slip through.

```javascript
function createWizard() {
  let step = 1;
  let isSubmitting = false;
  let isDone = false;

  return {
    getStep() { return step; },
    isSubmitting() { return isSubmitting; },
    isDone() { return isDone; },
    next() {
      if (step < 3) step += 1;
    },
    back() {
      if (step > 1) step -= 1;
    },
    submit() {
      if (step !== 3) throw new Error("complete all steps first");
      isSubmitting = true;
    },
    succeed() {
      isSubmitting = false;
      isDone = true;
    },
    fail() {
      isSubmitting = false;
    },
  };
}

const wizard = createWizard();

wizard.next();
wizard.next();
console.log(wizard.getStep()); // 3

wizard.submit();
console.log(wizard.isSubmitting()); // true

wizard.succeed();
console.log(wizard.isDone()); // true

// Leaks — nothing stops these:
wizard.next();   // step becomes 4 — invalid
wizard.submit(); // submit again from "done"
wizard.back();   // back from done?
```

The UI must remember to disable buttons with `step !== 3`, `isSubmitting`, and `isDone` — rules duplicated in every handler.

### What's Wrong

`step`, `isSubmitting`, and `isDone` overlap like boolean soup. `next()` silently no-ops at step 3 instead of rejecting invalid moves. After `isDone`, nothing blocks further `submit` or `back`.

Three problems:

1. **Invalid states are representable** — step 4, done + submitting, done + step 2
2. **Transition rules live in guards scattered across methods** — not one table
3. **UI cannot ask "can I submit?"** without re-implementing the same conditions

### Your Task

Refactor so that:

- Replace step number + flags with named states: `step1`, `step2`, `step3`, `submitting`, `done`
- Events: `NEXT`, `BACK`, `SUBMIT`, `SUCCESS`, `ERROR`
- Extend `createMachine` with `can(event)` — returns whether the transition exists from the current state
- `send(event)` throws on invalid transitions — no silent no-ops
- `ERROR` from `submitting` returns to `step3` so the user can fix and resubmit

Target interface:

```javascript
const wizard = createMachine({
  initial: "step1",
  states: {
    step1:      { on: { NEXT: "step2" } },
    step2:      { on: { NEXT: "step3", BACK: "step1" } },
    step3:      { on: { BACK: "step2", SUBMIT: "submitting" } },
    submitting: { on: { SUCCESS: "done", ERROR: "step3" } },
    done:       { on: {} },
  },
});

wizard.send("NEXT"); // step2
wizard.can("SUBMIT"); // false
wizard.send("NEXT"); // step3
wizard.can("SUBMIT"); // true
wizard.send("SUBMIT");
wizard.send("SUCCESS");
wizard.can("BACK"); // false — done is terminal
```

---

### Hints

<details>
<summary>#1 — Name states, not numbers</summary>

`step === 3 && isSubmitting` becomes a single state `"submitting"`. `isDone` becomes `"done"`. Each state lists only the events that are legal from there — `SUBMIT` appears only under `step3`, not under `step1`.

You cannot be on step 4 because `"step4"` is not in the table.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
function createMachine({ initial, states }) {
  let current = initial;

  return {
    getState() { return current; },
    matches(state) { return current === state; },
    can(event) { return Boolean(states[current]?.on?.[event]); },
    send(event) {
      const next = states[current]?.on?.[event];
      if (!next) throw new Error(`invalid: ${event} from ${current}`);
      current = next;
      return current;
    },
  };
}
```

Use `can("SUBMIT")` to disable the submit button in the UI — one source of truth, no duplicated `step === 3` checks.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
wizard.send("NEXT")   from step1 → step2
wizard.send("NEXT")   from step2 → step3
wizard.can("SUBMIT")  → true
wizard.can("NEXT")    → false   ← no NEXT from step3

wizard.send("SUBMIT") → submitting
wizard.send("SUCCESS") → done

wizard.can("BACK")    → false   ← done has empty on: {}

try wizard.send("SUBMIT") from done → throws invalid

// Error path:
from step3 → SUBMIT → submitting → ERROR → step3
user fixes form → SUBMIT again
```

`submitting` is a real state — disable all navigation while the request is in flight.

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createMachine({ initial, states }) {
  let current = initial;

  return {
    getState() { return current; },
    matches(state) { return current === state; },
    can(event) { return Boolean(states[current]?.on?.[event]); },
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
    step1:      { on: { NEXT: "step2" } },
    step2:      { on: { NEXT: "step3", BACK: "step1" } },
    step3:      { on: { BACK: "step2", SUBMIT: "submitting" } },
    submitting: { on: { SUCCESS: "done", ERROR: "step3" } },
    done:       { on: {} },
  },
});

// --- Verify: forward path ---
console.log(wizard.getState()); // step1

wizard.send("NEXT");
console.log(wizard.getState()); // step2
console.log(wizard.can("SUBMIT")); // false

wizard.send("NEXT");
console.log(wizard.getState()); // step3
console.log(wizard.can("SUBMIT")); // true
console.log(wizard.can("NEXT"));   // false

wizard.send("SUBMIT");
console.log(wizard.matches("submitting")); // true
console.log(wizard.can("BACK")); // false — locked while submitting

wizard.send("SUCCESS");
console.log(wizard.getState()); // done

// --- Verify: invalid from done ---
try {
  wizard.send("BACK");
} catch (e) {
  console.log(e.message); // invalid: BACK from done
}

// --- Verify: error recovery ---
const wizard2 = createMachine({
  initial: "step1",
  states: {
    step1:      { on: { NEXT: "step2" } },
    step2:      { on: { NEXT: "step3", BACK: "step1" } },
    step3:      { on: { BACK: "step2", SUBMIT: "submitting" } },
    submitting: { on: { SUCCESS: "done", ERROR: "step3" } },
    done:       { on: {} },
  },
});

wizard2.send("NEXT");
wizard2.send("NEXT");
wizard2.send("SUBMIT");
wizard2.send("ERROR");
console.log(wizard2.getState()); // step3 — user can fix and resubmit
console.log(wizard2.can("SUBMIT")); // true
```

**What changed:**

- Step number and flags became named states with an explicit transition graph
- `can(event)` drives UI affordances without duplicating `step === 3` logic
- Invalid moves throw; `submitting` and `done` are first-class states, not boolean overlays

**Concepts at work:** `can()` exposes **allowed events** from the current state — the machine is the single source of truth for button disabled states. **Terminal states** (`done` with empty `on`) forbid all events by construction. Contrast with **Orchestrator**: a wizard could be driven by sequential function calls, but when **invalid combinations** are the problem, model states explicitly.

</details>

---

## When Not to Use the State Machine Pattern

A state machine earns its place when states interact and invalid combinations cause bugs. Skip it when:

- **There are only two states with no guards.** `isOpen` / `isClosed` for a toggle rarely needs a transition table — a boolean is enough.
- **You are layering a machine on top of flag soup without removing the flags.** Replace booleans with one state variable; do not maintain both.
- **The flow is a one-way pipeline.** Validate → charge → receipt is an **Orchestrator** — steps run in order without a closed event graph.
- **Peers react to each other's events.** Chat or dashboard widgets broadcasting updates suit **Mediator** or **Observer**, not a central state chart.

The rule of thumb: if you can draw states and labelled arrows, use a machine. If the diagram exceeds ~8 states, split into multiple machines or reach for a library like XState.

---

## What to Take Away

Before moving on, answer these from memory:

1. In Challenge 1, how many meaningful fetch states exist — and how many combinations did three booleans allow?
2. What does `can(event)` give the UI that `getStep() === 3` does not?
3. Why is `submitting` a separate state instead of `isSubmitting === true` while `step === 3`?
4. What is the difference between a state machine and an Orchestrator — which fits a fetch lifecycle, and which fits a checkout pipeline?

---

*← [State Machine Pattern](/code/design-patterns/patterns/8-state-machine-pattern)*
