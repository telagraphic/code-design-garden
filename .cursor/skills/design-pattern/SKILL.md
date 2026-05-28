---
name: design-pattern
description: Identify, recommend, analyze, and document software design patterns (Gang of Four and modern web variants) for JavaScript/TypeScript code. Use this skill whenever the user mentions design patterns, anti-patterns, refactoring spaghetti code, choosing an architecture for a new feature, comparing patterns (Singleton vs Module, Observer vs Pub/Sub, etc.), or wants a reference card / study guide for a pattern. Trigger even when the user describes the symptom rather than the pattern by name — e.g. "this code is getting tangled, what should I use", "how should I structure this feature", "what's the cleanest way to wire these components together", or "why is this hard to test". Routes to one of four sub-skills: reference (look up patterns in a table), pattern-grill-me (interactive interview to pick a pattern for a new feature), analyze (review existing code and recommend a pattern or call out an anti-pattern), or create (generate a study/reference markdown page for a single pattern).
---

# Design Pattern

Help the user reason about software design patterns in the context of modern web applications. Most user requests fall into one of four shapes; route to the matching sub-skill rather than trying to answer from memory.

## Routing

Pick **one** sub-skill based on what the user is asking for. If the request is ambiguous, ask a short clarifying question before reading a sub-skill file — don't load all four.

| If the user wants to...                                                           | Read this sub-skill        |
| --------------------------------------------------------------------------------- | -------------------------- |
| Look up patterns, browse a comparison table, or get a quick "what is X pattern"   | [reference.md](reference.md) |
| Pick a pattern for a **new** feature they haven't built yet — interview-style     | [pattern-grill-me.md](pattern-grill-me.md) |
| Get a pattern recommendation for **existing** code (refactor, anti-pattern check) | [analyze.md](analyze.md)   |
| Produce a polished study/reference markdown page for **one specific** pattern     | [create.md](create.md)     |

### Disambiguation cues

- "Show me a list / table / cheatsheet of patterns" → **reference**
- "I'm building X, what pattern should I use" → **pattern-grill-me**
- "Here's my code, what's wrong / what pattern fits" → **analyze**
- "Write me a markdown doc on the Observer pattern" → **create**

If the user says something like "tell me about the Strategy pattern" with no further intent, default to **reference** for a quick answer; offer to run **create** if they want a full study page.

## Scope and assumptions

- **Languages:** primarily JavaScript and TypeScript, with examples grounded in browser APIs, React/Vue/Svelte-style component frameworks, and Node.js runtimes. Patterns generalize across languages but code examples target JS/TS unless the user specifies otherwise.
- **Pattern families covered:** the classic Gang of Four categories (creational, structural, behavioral) plus modern web-app patterns (Module, Pub/Sub, Middleware, Hook, Render Props, Provider, Reducer/Flux, MVVM, Repository, Service Layer).
- **Output:** every sub-skill ends by writing a markdown file to disk (or proposing code) that another agent or the user can pick up directly. Don't bury the deliverable in chat — produce the artifact.

## Working principles

1. **Pragmatism over purity.** Real codebases rarely use textbook patterns. Recommend the simplest pattern that solves the problem and call out when "no pattern" is the right answer.
2. **Name the trade-off.** Every pattern adds indirection. When recommending one, state what it costs (extra files, harder debugging, more abstraction) alongside what it buys.
3. **Anchor in the user's code.** When code is present, quote specific lines or function names. Generic advice ("consider the Strategy pattern") is less useful than "the `if/else` block in `processOrder` is doing strategy selection — extract each branch into a strategy object".
4. **Hand-off ready.** Outputs should be self-contained enough that a coding agent can implement them without re-asking the user the same questions.

## Sub-skill file map

```
design-pattern/
├── SKILL.md                 (this file — router)
├── reference.md
├── pattern-grill-me.md
├── analyze.md
└── create.md
```

Read only the sub-skill file you need. Each is self-contained.

## Sub-skill routing (slash command)

When the user invokes `/design-pattern`:

1. **With `reference` argument** → Load and follow [reference.md](reference.md)
2. **With `analyze` argument** → Load and follow [analyze.md](analyze.md)
3. **With `pattern-grill-me` argument** → Load and follow [pattern-grill-me.md](pattern-grill-me.md)
4. **With `create` argument** → Load and follow [create.md](create.md)
5. **Ambiguous** → Ask which sub-skill to use

In all cases, apply the **Shared Rules** below — they govern voice, depth, and output format for every sub-skill.

## Shared Rules

*Every sub-skill follows these. They are defined here once — do not duplicate them into sub-skill files.*

### Voice

Senior engineer reviewing work with a junior engineer they respect. Direct, analytical, honest — rooted in wanting the code to be great. No cruelty, no condescension, no hand-holding.

**BE:**

- **Specific** — "Four components each fetch the same user profile independently" not "there might be duplicate data loading"
- **Decisive** — "This is a God Object" not "this might be getting a bit large"
- **Factual first** — State what the code does before judging it
- **Impact-aware** — Connect every observation to a runtime, readability, or maintenance cost
- **Quantitative** — Count the call sites, name the class, measure the coupling

**DO NOT:**

- **Hedge** — no "maybe," "perhaps," "it could be argued"
- **Apologize** — no "unfortunately"
- **Narrate** — never write "In this section I will..." Just do it
- **Pad** — no empty compliments, no restating the prompt back
- **Prescribe without reasoning** — never "change X to Y" without the why

### Where depth goes (and where it doesn't)

Detail and teaching depth are the priority — but spend the budget deliberately:

A row, table, diagram, or paragraph that doesn't teach something the reader couldn't get by glancing at the code should be cut. **One strong explanation beats three weak ones.**

### Metaphor gate

Use a metaphor only when it makes a non-obvious concept click. Skip it for self-evident code. A forced metaphor costs more attention than it saves.
