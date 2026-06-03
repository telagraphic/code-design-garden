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

## Overview

| Aspect             | Detail                                         |
| ------------------ | -----------------------------------------------|
| Category           | <Creational/Structural/Behavioral>             |
| Participants       | <e.g., Subject, Observer>                      |
| Pairs well with    | <other patterns>                               |
| Don't pair with    | <patterns that conflict or duplicate intent>   |
| Use cases          | <Concrete situations where the pattern pays off>|
| Maintenance cost   | <low/medium/high — and why>                    |

## Basic Code
<explain the basic vanilla code with a short but detailed description>
<show in basic js vanilla code an implementation of the patern>


## How It Works

<2–4 short paragraphs explaining the mechanism. Cover:
- The participants/roles (e.g., "Subject and Observers", "Context and Strategies")
- How they connect / who knows about whom
- What the lifecycle looks like (creation, interaction, teardown)
- What coding paradigms or concepts are implemented in the pattern
Use a small ASCII diagram if it clarifies — only if it does.>

## Metaphor

<Use a metaphor or metaphors if applicable to describe the functionality of the design pattern in  a differnt context to make is easier to understand or show how it works using a comparison>



## In Practice

### When to use
<2–3 bullet points. When to use? How to know when to use it?>


### Use cases

| Scenario | Signal |
| -------- | ------ |
| <Concrete situation where the pattern pays off> | <Code smell or symptom in the codebase — optional if scenario is enough> |
| <Scenario 2> | <Signal 2> |
| <Scenario 3> | |

```javascript
// 10–25 lines: one example that matches a row above (smell → fix, or minimal “after” shape)
```

### Anti-patterns

| Situation | Instead |
| --------- | ------- |
| <When the pattern adds cost without benefit> | <Simpler approach> |
| <When a plain function/module/export is enough> | <What to use — no pattern name required> |
| <When another pattern fits better> | **<Pattern name>** — <one phrase why> |

```javascript
// 10–25 lines: code showing the anti-pattern or the preferred alternative
```

> **Rule of thumb:** <one-line heuristic for “is it worth it?”>


## Applications

### Browser

**<API or feature 1>** <Sentence one: what the API does in platform terms. Sentence two: map it to this pattern — e.g. which participant is the Subject, what triggers notify.>

**<API or feature 2>** <1–2 sentences on mechanism and pattern mapping.>

**<API or feature 3>** <1–2 sentences on mechanism and pattern mapping.>

### UI

**<UI pattern 1>** <Sentence one: what the user sees or what the app does. Sentence two: how that maps to the pattern in code or data flow.>

**<UI pattern 2>** <1–2 sentences on behavior and pattern mapping.>

## Trade-offs

| Pro | Con |
| --- | --- |
| <Concrete benefit — e.g. each strategy is a pure function you can unit-test without the parent> | <Concrete cost — e.g. adds N files where one if/else would do> |
| <Benefit 2> | <Cost 2> |
| <Benefit 3> | |

**Known Issues / Pitfalls**
- <pitfall 1 — what people get wrong, e.g. "Forgetting to unsubscribe leads to memory leaks">
- <pitfall 2>

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| <Related pattern> | <one line on how it relates or differs> |
| <Related pattern> | <one line on how it relates or differs> |

## Code Examples

### Basic

<paragraph: what this example demonstrates>

```javascript
// <comments explaining the participants>
// <minimal, runnable, no framework, no external deps>
// <typically 15–30 lines>

**What to notice:**
- <one teaching point about the basic example>
- <one teaching point about the basic example>

### Medium

<paragraph: a realistic single-file use case, perhaps in a small app>

```javascript
// <still vanilla JS or light framework — show the pattern being CONSUMED by other code>
// <30–60 lines>
// <demonstrate the public API the pattern exposes>

**What to notice:**
- <one teaching point — typically about the public surface or extensibility>
- <one teaching point>

### Advanced

 <paired with other patterns to build a feature or workflow>

<paragraph: a small but complete feature combining this pattern with 1–2 others; name the combined patterns>

```javascript
// <60–120 lines, framework-idiomatic if useful>
// <show this pattern composed with another — e.g., Strategy + Factory, Observer + Command>
// <demonstrate a real workflow end-to-end>

**What to notice:**
- <one teaching point about the combination>
- <one teaching point about the workflow>

## Further Reading

- <one or two genuinely useful references; skip if you'd be padding>

```

## Authoring rules

1. **Code must be real.** All three code examples should be syntactically valid and conceptually runnable. No `// imagine the rest`. The basic example especially should fit in a REPL.
2. **The three examples must escalate.** Basic = "I understand the mechanism". Medium = "I see how to use it". Advanced = "I see how it composes". If the medium and advanced examples look similar in complexity, the medium one is too complex or the advanced one is too thin.
3. **Trade-offs table cells must be specific.** "Easier to maintain" is not a pro. "Each algorithm becomes a pure function you can unit-test without instantiating the parent class" is. Pair related pro/con on the same row when it helps comparison; leave **Con** empty only when there is no fair counterpart.
4. **API and UI entries are paragraphs, not lists.** Cite real names (`EventTarget`, `Proxy`, `IntersectionObserver`) — never "various event systems." Each entry: **bold name** + 1–2 specific sentences on implementation, not a one-line gloss.
5. **In Practice must be honest and tight.** Use cases need real scenarios plus signals; anti-patterns need a concrete **Instead** per row — no filler, no cheerleading for the pattern.
6. **The self-check questions matter.** They turn the doc into a study aid, not just a description. Make them genuinely think-provoking.

## Worked example — what a finished Observer page should look like

A finished `observer.md` should:

- Open with: "*A one-to-many subscription mechanism: a Subject notifies registered Observers whenever its state changes.*"
- Browser APIs section: paragraph per entry — e.g. **EventTarget** / **addEventListener** (listener registry + dispatch), **MutationObserver** (callback when DOM subtree changes), plus **IntersectionObserver** and **ResizeObserver** with the same bold-lead, 1–2 sentence depth.
- Same paragraph style for framework features — e.g. **RxJS** `Observable`, **Vue** reactivity, **React** `useState` + child re-render as observer-like updates.
- Basic example: a `Subject` class with `subscribe`/`notify`/`unsubscribe` and two anonymous observer functions printing a value.
- Medium example: a small reactive store driving a tiny vanilla DOM UI — `store.subscribe(render)` + a couple of buttons that call `store.set(...)`.
- Advanced example: Observer + Command — events are first-class objects pushed into a history stack so the UI supports undo/redo.
- **In Practice:** use cases table (e.g. “many listeners need the same state change” + signal “callbacks wired by hand in every component”); anti-patterns table with **Instead** (e.g. “one-off callback” → “pass a function prop / single listener”).
- Pitfalls section that names: forgotten unsubscriptions (memory leaks), notification loops (A → B → A), and ordering dependencies between observers.

## What to avoid

- Don't write filler prose. Every sentence should teach or scope.
- Don't copy textbook examples verbatim. Re-author for clarity in modern JS.
- Don't use class-heavy examples when a closure or factory function would be idiomatic JS.
- Don't skip **Anti-patterns** or soften the **Instead** column to make the pattern sound appealing.
- Don't split **In Practice** into extra subsections (e.g. separate “smells” or “when to use” headers) — use cases and anti-patterns tables only.
- Don't bullet **Browser APIs** or **Modern web app interface patterns** — use bold-led paragraphs only.
- Don't end without writing the file. The deliverable is `<pattern-name>.md` on disk.
