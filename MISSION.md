# Mission: JavaScript Design Patterns Curriculum

## Why

Building a public curriculum site (code design garden) that teaches front-end design patterns through code challenges. The goal is to understand each pattern well enough to write challenges that reveal *why* the pattern matters, not just how to implement it.

## Success looks like

- A code challenge for each pattern that starts with visibly broken code and leads to a working implementation
- Hints that teach step-by-step without giving away the answer
- Challenges completable by following along in a JS REPL
- Content published to the Astro site at `/code/design-patterns/challenges/`

## Constraints

- No built-in code editor — learners use an external REPL (jsfiddle, browser DevTools, Node)
- Challenges are written in Markdown with raw HTML `<details>`/`<summary>` for accordions
- One pattern per session — refine format before scaling to all patterns

## Out of scope

- TypeScript-specific patterns (keep challenges in vanilla JS)
- Framework-specific implementations (React, Vue) for now
- Patterns beyond the list in `src/content/code/design-patterns/DESIGN_PATTERNS.md`
