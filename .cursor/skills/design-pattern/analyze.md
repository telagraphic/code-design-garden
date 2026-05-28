# Analyze: Review Code and Recommend a Pattern

Review code the user has shared (or pointed at) and produce a detailed handoff document that names the pattern or anti-pattern in play and proposes a concrete refactor. The deliverable is a markdown file another agent can implement against.

## When to use this sub-skill

The user already has code and wants an architectural read on it. Typical openers:

- "What pattern is this using?" / "Is this an anti-pattern?"
- "This file is a mess — how should I clean it up?"
- "Can you suggest a better way to structure this?"
- "Review my code and tell me what's wrong with it design-wise."

If the user is starting from scratch with no code, use **pattern-grill-me** instead.

## Protocol

### Stage 1 — Read the code, all of it

Before saying anything about patterns:

1. **Read every file the user pointed at**, plus obvious neighbors (imports, the module's tests if present, the parent component or caller). Patterns are about relationships between things; one file in isolation often hides them.
2. **Build a mental map**: what calls what, what holds state, where side effects happen, where the boundaries are.
3. **Note the smells without judging yet**: long functions, duplicated branches, deep conditionals, hidden globals, mixed concerns. Smells are evidence, not conclusions.

If the code is too long to read in one pass, ask the user which entry point or function to focus on rather than skimming.

### Stage 2 — Identify what's there

Categorize what you find as one of these:

**A. A clear pattern, well-applied.** Name it. Confirm it's appropriate. The user may just want validation; give it honestly.

**B. A clear pattern, badly applied.** Name the pattern, then name the misuse: Singleton-as-global, prop-drilling-via-context, leaky-abstraction adapter, etc. Recommend either fixing the misuse or replacing the pattern.

**C. An anti-pattern.** Name it from this list and explain *which lines* triggered the diagnosis:

- **God Object / God Component** — one unit owns too many responsibilities. Cue: 500+ line file, 10+ unrelated methods, imports from every layer.
- **Spaghetti control flow** — nested conditionals, early-returns scattered, no clear state machine. Cue: 4+ levels of indentation, repeated `if (state === 'X')` checks across functions.
- **Callback hell / Promise hell** — nested `.then` chains, error handling duplicated. Cue: more than 2 nested callbacks, manual promise composition where `async/await` would do.
- **Magic strings/numbers** — unnamed literals controlling logic. Cue: `if (type === 'A')` with no enum or const.
- **Prop drilling** — props passed through 3+ components that don't use them. Cue: components that receive a prop just to pass it down.
- **Singleton-as-global** — a Singleton that's really a hidden mutable global. Cue: imported everywhere, mutated from anywhere, no clear ownership.
- **Tight coupling between siblings** — components or modules that import each other directly when they shouldn't know about each other. Cue: peer files with circular imports or mutual references.
- **Mixed concerns** — UI, data fetching, business logic, and persistence in one function. Cue: a single function that calls `fetch`, mutates DOM, and writes to localStorage.
- **Inheritance abuse** — deep `extends` chains where composition would be simpler. Cue: 3+ levels of class inheritance, methods overridden just to call `super()` + a tweak.
- **Copy-paste polymorphism** — three nearly-identical functions differing in one constant. Cue: `handleSubmitA`, `handleSubmitB`, `handleSubmitC` that diff by one field name.

**D. No pattern, but none needed.** Sometimes plain procedural code is correct. Say so. Don't invent problems to solve.

### Stage 3 — Recommend a pattern

For categories B and C, propose a refactor target. The recommendation must:

1. **Name a specific pattern** from the reference table (see `reference/REFERENCE.md` if you need to refresh on the catalog).
2. **Map the existing code to the new pattern explicitly** — "the `if/else` block in `handleEvent` lines 42–78 becomes three Strategy implementations". Don't say "consider Strategy"; show the mapping.
3. **State the trade-off**. Refactors cost time and risk; if the existing code works, the user needs to know what they're trading for what.
4. **Give a migration order** — what to change first, what depends on it, what can be done last. Big-bang refactors fail; staged ones don't.

If multiple patterns could apply, pick the one that requires the smallest change to reach a meaningful improvement. Reserve the second-best as an "if you have more appetite, go further" suggestion.

### Stage 4 — Write the handoff document

Save a markdown file to disk. Default filename: `analysis-<file-or-feature-slug>.md`. Use this structure:

```markdown
# Code Analysis: <file or feature name>

## What I read
- Files: <list of files reviewed>
- Entry points: <main functions/components>
- Lines of code (approx): <number>

## Current state

### What it does
<one paragraph describing the code's purpose in plain language>

### Pattern(s) in use
<one of:
- "A: Using the <Pattern> pattern correctly."
- "B: Using the <Pattern> pattern, but with these issues: ..."
- "C: No clear pattern — currently exhibits the <Anti-pattern> anti-pattern."
- "D: Procedural code, no pattern needed.">

### Evidence
<specific line references / function names that justify the diagnosis>
- `<file>:<line>` — <what's happening here>
- `<file>:<line>` — <what's happening here>

## Recommendation

### Target pattern: <Pattern name>
<one paragraph: what the pattern is and why it fits this code>

### Mapping: current → target
| Current code                       | Becomes                                |
| ---------------------------------- | -------------------------------------- |
| `<existing thing>`                 | `<new thing in pattern terms>`         |
| ...                                | ...                                    |

### Trade-offs
- What this buys: <testability, extensibility, clarity, performance — be specific>
- What this costs: <files added, indirection, learning curve for the team>
- When not to do this: <e.g., if the feature is being deprecated next quarter, skip it>

## Migration plan
1. <first concrete step — usually a non-breaking extraction or rename>
2. <second step>
3. <subsequent steps, each independently shippable if possible>

## Code sketch
<a focused before/after snippet showing the most important transformation, 20–60 lines>

## Open questions
- <things the analyzer can't decide without running the code or asking the team>
```

Save it and link the file path in your reply. Summarize the verdict (one of A/B/C/D and the recommended pattern) in 2–3 lines of chat — don't paste the file.

## Quoting and citing code

When you reference the user's code in the analysis document, quote short excerpts (a few lines) with the file and line numbers. Don't paste long blocks — point at them. The agent implementing the refactor will read the actual file.

## Worked example (for your reference)

**User shares:** a 400-line `OrderProcessor` React component that fetches data, validates input, calculates pricing, calls a payment API, sends an email confirmation, updates local state, and renders the entire checkout UI.

**Stage 2 diagnosis:** Category **C** — **God Component** with **mixed concerns**.

**Stage 3 recommendation:** Multi-pattern refactor.
1. Extract a **Service Layer** (`OrderService`) for the business logic (validation, pricing, payment, email).
2. Extract a **Repository** (`OrderRepository`) for the data fetching and persistence.
3. Use a **Reducer** (`useReducer`) for the local checkout state machine (idle → validating → paying → confirming → done | error).
4. The component becomes presentation-only, calling `service.submitOrder(...)` and dispatching to the reducer.

**Migration order:** (1) extract pricing-calculation as a pure function first — zero risk; (2) move validation next; (3) extract the service; (4) introduce the reducer; (5) extract the repository last. Each step ships independently.

**Stage 4:** Write `analysis-order-processor.md` with line references, the mapping table, and a sketch showing the slimmed-down component.

## What to avoid

- **Don't diagnose without reading.** "This looks like a God Component" without quoting lines is just vibes.
- **Don't recommend a pattern just because it's elegant.** If the code works and isn't changing, the right answer is sometimes "leave it alone."
- **Don't propose a big-bang rewrite.** Always provide a staged migration. Big-bang refactors get abandoned.
- **Don't pile on.** Pick the one or two most impactful changes; trust the user to ask for more.
- **Don't skip the trade-offs section.** Telling someone what their refactor will *cost* is what makes the analysis trustworthy.
