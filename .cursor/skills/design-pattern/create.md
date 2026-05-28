# Create: Design Pattern Study Page

Generate a complete, well-structured markdown reference page for a **single** design pattern. The page is meant for studying, onboarding teammates, or pinning in a team wiki — so it has to be thorough but readable.

## When to use this sub-skill

The user wants a stand-alone document about a specific pattern. Typical openers:

- "Write me a study page on the Observer pattern."
- "Create a reference doc for Strategy."
- "I'm learning Decorator — give me a deep-dive page."

If the user wants a quick lookup, use **reference** instead. If they want a pattern *for their code*, use **analyze** or **pattern-grill-me**.

## Inputs you need from the user

If not already specified, confirm before generating:

1. **Which pattern.** Name it explicitly.
2. **Target audience / depth.** Beginner-friendly walkthrough vs. principal-engineer deep-dive. Default to mid-level if unspecified.
3. **Stack flavor.** Vanilla JS (default), TypeScript, or framework-specific (React, Vue, Node). Vanilla JS for the basic example is usually right; framework idioms can appear in the advanced example.

Don't ask all three at once unless none is clear — usually one quick question is enough, or sensible defaults work.

## Output structure (use this template exactly)

Save to a markdown file named `<pattern-name-kebab-case>.md` (e.g., `observer.md`, `strategy.md`). Use this structure:

```markdown
# <Pattern Name>

> <One-sentence elevator definition — what the pattern is, in plain English>

## Type
<Creational | Structural | Behavioral>

## Intent
<2–3 sentences. What problem does it solve? What's the core idea?>

## When to use it

Use this pattern when:
- <Specific scenario 1 — concrete, not abstract>
- <Specific scenario 2>
- <Specific scenario 3>

Common smells that signal this pattern would help:
- <code-level symptom 1>
- <code-level symptom 2>

## When NOT to use it

Avoid this pattern when:
- <Scenario where it adds cost without benefit>
- <Scenario where a simpler alternative wins>
- <Scenario where a different pattern fits better — name that pattern>

A useful rule of thumb: <one-line heuristic for "is it worth it?">

## How it works

<2–4 short paragraphs explaining the mechanism. Cover:
- The participants/roles (e.g., "Subject and Observers", "Context and Strategies")
- How they connect / who knows about whom
- What the lifecycle looks like (creation, interaction, teardown)
Use a small ASCII diagram if it clarifies — only if it does.>

## Browser APIs and framework features that use this pattern

- <API or feature 1> — <one-line explanation of how>
- <API or feature 2> — <one-line explanation of how>
- <API or feature 3> — <one-line explanation of how>

## Modern web app interface patterns that implement this

- <UI pattern 1> — <one-line explanation>
- <UI pattern 2> — <one-line explanation>

## Trade-offs

**Pros**
- <benefit 1 — concrete, e.g. "Testable in isolation: each strategy is a pure function">
- <benefit 2>
- <benefit 3>

**Cons**
- <cost 1 — concrete, e.g. "Adds N files for a feature that could have been one if/else">
- <cost 2>

**Known issues / pitfalls**
- <pitfall 1 — what people get wrong, e.g. "Forgetting to unsubscribe leads to memory leaks">
- <pitfall 2>

## Related patterns

- **<Related pattern>** — <one line on how it relates or differs>
- **<Related pattern>** — <one line on how it relates or differs>

## Code examples

### Basic — bare-minimum vanilla JS

<paragraph: what this example demonstrates>

```javascript
// <comments explaining the participants>
// <minimal, runnable, no framework, no external deps>
// <typically 15–30 lines>

**What to notice:**
- <one teaching point about the basic example>
- <one teaching point about the basic example>

### Medium — used by other components or app code

<paragraph: a realistic single-file use case, perhaps in a small app>

```javascript
// <still vanilla JS or light framework — show the pattern being CONSUMED by other code>
// <30–60 lines>
// <demonstrate the public API the pattern exposes>

**What to notice:**
- <one teaching point — typically about the public surface or extensibility>
- <one teaching point>

### Advanced — paired with other patterns to build a feature or workflow

<paragraph: a small but complete feature combining this pattern with 1–2 others; name the combined patterns>

```javascript
// <60–120 lines, framework-idiomatic if useful>
// <show this pattern composed with another — e.g., Strategy + Factory, Observer + Command>
// <demonstrate a real workflow end-to-end>

**What to notice:**
- <one teaching point about the combination>
- <one teaching point about the workflow>

## Quick reference card

| Aspect             | Detail                                       |
| ------------------ | -------------------------------------------- |
| Category           | <Creational/Structural/Behavioral>           |
| Participants       | <e.g., Subject, Observer>                    |
| Pairs well with    | <other patterns>                             |
| Don't pair with    | <patterns that conflict or duplicate intent> |
| Time to implement  | <hours/days for a real feature>              |
| Maintenance cost   | <low/medium/high — and why>                  |

## Further reading

- <one or two genuinely useful references; skip if you'd be padding>

## Self-check questions

Test your understanding:
1. <question that probes the "why" — not just the "what">
2. <question that probes when to choose this vs an alternative>
3. <question that probes a common pitfall>
```

## Authoring rules

1. **Code must be real.** All three code examples should be syntactically valid and conceptually runnable. No `// imagine the rest`. The basic example especially should fit in a REPL.
2. **The three examples must escalate.** Basic = "I understand the mechanism". Medium = "I see how to use it". Advanced = "I see how it composes". If the medium and advanced examples look similar in complexity, the medium one is too complex or the advanced one is too thin.
3. **Pros and cons must be specific.** "Easier to maintain" is not a pro. "Each algorithm becomes a pure function you can unit-test without instantiating the parent class" is.
4. **Name real APIs and features.** "Browser APIs that use this" should cite actual things: `EventTarget`, `Proxy`, `IntersectionObserver`, `addEventListener`, not "various event systems".
5. **Keep the "When NOT to use it" section honest.** Every pattern has scenarios where it's overkill. List them.
6. **The self-check questions matter.** They turn the doc into a study aid, not just a description. Make them genuinely think-provoking.

## Worked example — what a finished Observer page should look like

A finished `observer.md` should:

- Open with: "*A one-to-many subscription mechanism: a Subject notifies registered Observers whenever its state changes.*"
- Cite `EventTarget`, `addEventListener`, `MutationObserver`, `IntersectionObserver`, `ResizeObserver` in the browser APIs section.
- Cite RxJS, MobX, Vue's reactivity system, React state hooks in the framework features section.
- Basic example: a `Subject` class with `subscribe`/`notify`/`unsubscribe` and two anonymous observer functions printing a value.
- Medium example: a small reactive store driving a tiny vanilla DOM UI — `store.subscribe(render)` + a couple of buttons that call `store.set(...)`.
- Advanced example: Observer + Command — events are first-class objects pushed into a history stack so the UI supports undo/redo.
- Pitfalls section that names: forgotten unsubscriptions (memory leaks), notification loops (A → B → A), and ordering dependencies between observers.

## What to avoid

- Don't write filler prose. Every sentence should teach or scope.
- Don't copy textbook examples verbatim. Re-author for clarity in modern JS.
- Don't use class-heavy examples when a closure or factory function would be idiomatic JS.
- Don't skip the "When NOT to use it" section to make the pattern sound appealing. The trade-offs are the value of the page.
- Don't end without writing the file. The deliverable is `<pattern-name>.md` on disk.
