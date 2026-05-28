# Pattern Grill Me: Interview to Pick a Pattern

Conduct a focused Q&A with the user to recommend a design pattern (or a small combination) for a **new** feature. The deliverable is a markdown handoff file — or a code scaffold — that a coding agent can implement without re-asking the user.

## When to use this sub-skill

The user has a feature in mind but hasn't written it yet, or has only started. Typical openers:

- "I need to build X, what pattern should I use?"
- "I'm adding a payment flow / notification system / undo feature — how should I structure it?"
- "Help me pick an architecture for this."

If the user has *existing* code and wants a refactor recommendation, use **analyze** instead.

## Protocol

Work through these stages in order. **Don't ask every question** — only the ones whose answer you can't infer from what the user has already said or from surrounding code they've shared. Skip aggressively.

### Stage 1 — Inspect what's already there

If the user has shared code, files, or mentioned an existing codebase, do this **before** asking questions:

1. Read the surrounding code. Look for: framework (React/Vue/Svelte/vanilla), state management (Redux/Zustand/Context/none), file structure conventions, existing patterns already in use (e.g., if there's already a `services/` folder, lean toward Service Layer; if there's a Redux store, lean toward Reducer + Middleware).
2. Infer constraints. The codebase's existing patterns are constraints — recommending a wildly different pattern means asking the user to fight their own conventions.
3. Note this inference in your first response: "I see you're using React with Context for state — I'll keep that in mind."

### Stage 2 — Establish the feature shape

Ask **only the questions whose answer isn't already clear**. Ask them one or two at a time, not as a wall.

The core questions:

1. **What does the feature do, in one sentence?** (Establishes scope; often answered by the opening message.)
2. **What triggers it?** User action, timer, server event, state change, lifecycle?
3. **Who needs to react to it?** One thing, many things, or a chain of things?
4. **Does it have distinct states or modes?** (idle/loading/error, draft/published, etc.)
5. **Is there variation in *how* it does its job?** (multiple algorithms, providers, strategies?)
6. **Is undo, history, or replay needed?**
7. **Does it cross boundaries?** (browser ↔ server, component ↔ component, module ↔ module?)
8. **What's the existing convention for similar features in this codebase?**

### Stage 3 — Map answers to candidate patterns

Use this mental map. **Don't read it aloud to the user** — use it to form your recommendation.

| Signal from user                                                         | Candidate pattern(s)                            |
| ------------------------------------------------------------------------ | ----------------------------------------------- |
| "Many things should react when X happens"                                | Observer, Pub/Sub                               |
| "Logic depends on current mode/phase, and modes have different rules"    | State (state machine), Strategy                 |
| "Several algorithms do the same job differently, pick at runtime"        | Strategy                                        |
| "Each request goes through several processing steps"                     | Middleware, Chain of Responsibility             |
| "Undo / redo / history / time-travel"                                    | Command, Memento, Reducer                       |
| "Multiple components need access to the same data without prop drilling" | Provider (Context)                              |
| "Wrapping a third-party SDK or legacy API"                               | Adapter, Facade                                 |
| "Many objects, one of them, app-wide"                                    | Singleton (or Module — usually simpler)         |
| "Building up a complex config/object step by step"                       | Builder                                         |
| "Tree of similar things (folders, comments, nav items)"                  | Composite                                       |
| "Augment behavior without modifying the original"                        | Decorator, Proxy                                |
| "Coordinating several siblings that shouldn't know each other"           | Mediator                                        |
| "Data layer with CRUD over different storage backends"                   | Repository                                      |
| "Business logic that spans models, called from controllers/routes"       | Service Layer                                   |
| "Add cross-cutting behavior (auth, logging, caching) to requests"        | Middleware, Decorator, Proxy                    |

Combinations are common and often correct:
- Pub/Sub + Command (event bus with serializable events)
- Provider + Reducer (React Context with `useReducer`)
- Strategy + Factory (pick a strategy via a factory function)
- Facade over Adapter + Repository (clean app-facing API over messy externals)

### Stage 4 — Recommend and justify

Present **one primary recommendation** and **at most one alternative**. For each:

1. Name the pattern(s).
2. State *why this fits* their specific feature in one or two sentences. Reference their words, not generic descriptions.
3. State the trade-off — what they'll pay for this choice.
4. Show a minimal skeleton (10–30 lines) in their stack, not abstract pseudocode.

If the simplest answer is "you don't need a pattern, just write a function", say that. Over-patterning is a real failure mode.

### Stage 5 — Produce the handoff

Write a markdown file to disk that a coding agent can use to implement the feature. Default filename: `pattern-recommendation-<feature-slug>.md`. Use this structure:

```markdown
# Pattern Recommendation: <feature name>

## Feature summary
<one paragraph, derived from the interview>

## Context
- Stack: <framework, language, state mgmt>
- Existing conventions: <what's already in the codebase>
- Constraints: <anything the user called out — perf, bundle size, team familiarity>

## Recommended pattern: <Pattern name>
<one paragraph: what it is, why it fits this feature>

### Trade-offs
- Pros: ...
- Cons: ...
- When to abandon this choice: ...

## Implementation sketch
<code block — 20–60 lines, runnable or near-runnable, in the user's stack>

### File layout
<proposed file tree for this feature>

### Wiring points
- Where the pattern attaches to existing code (specific files / functions if known)
- Public API the rest of the app will use

## Alternative considered: <Pattern name>
<one paragraph; why it was the runner-up and the specific condition under which it would be preferred>

## Open questions for the implementer
- <anything genuinely undecidable without writing code, e.g. "is debouncing needed at the event source or the handler">
```

Save to the working directory and link the file in your final chat reply with a one-line summary. Do not paste the entire file content back into chat — the user can open it.

## Worked example (for your reference)

**User:** "I'm building a checkout flow that supports Stripe, PayPal, and Apple Pay. Each has totally different SDK APIs but the rest of the app shouldn't care which one is used."

**Stage 1 inference:** The phrase "different APIs but the rest of the app shouldn't care" maps to *Adapter*. The phrase "supports Stripe, PayPal, and Apple Pay" — interchangeable providers — maps to *Strategy*.

**Stage 2 question (only one needed):** "Does the user pick the provider, or is it auto-selected (e.g., Apple Pay on iOS only)?" — because the answer determines whether you need a factory.

**Stage 4 recommendation:** Strategy + Adapter. Each payment provider gets an Adapter that conforms to a shared `PaymentProvider` interface; the checkout uses Strategy to pick one at runtime. A Factory function maps platform/user choice → concrete adapter.

**Stage 5 output:** Write `pattern-recommendation-checkout-payments.md` with the interface, three adapter stubs, the factory, and a wiring example showing how the checkout component calls `provider.charge(amount)` without knowing which SDK is underneath.

## What to avoid

- Don't ask all 8 core questions if 2 will do.
- Don't recommend three patterns "in case any of them fits" — pick.
- Don't recommend a pattern the user's codebase doesn't already support (e.g., suggesting RxJS Observables in a vanilla DOM app with no Rx anywhere).
- Don't skip the trade-off section. Every recommendation costs something.
- Don't end the conversation without producing the markdown file.
