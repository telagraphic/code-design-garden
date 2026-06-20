---
domain: code
section: design-patterns
chapter: patterns
title: "Command Pattern"
order: 10
description: "Encapsulate a request as an object so you can queue it, log it, undo it, or replay it — without the caller knowing how it runs."
chapterLabel: "Patterns"
---

# Command Pattern

> Turn an action into a value. The Invoker runs commands; each command knows how to execute and optionally how to undo — the caller only passes the object.

## Overview

| Aspect | Detail |
| ------------------ | -------------------------------------------- |
| Category | Behavioral |
| Participants | Command (execute/apply + optional revert), Invoker (runs and records commands), Receiver (the object being acted on) |
| Pairs well with | Module (command factory with private receiver), Observer (notify after execute/undo), Memento (snapshot state for complex undo) |
| Don't pair with | Strategy — both wrap behaviour in objects, but Strategy swaps algorithms; Command records and replays discrete requests |
| Use cases | Undo/redo stacks, toolbar and keyboard shortcuts, transaction logs, job queues, macro/batch actions, deferred execution |
| Maintenance cost | Low when commands are small and symmetric (`apply` / `revert`); high when undo is asymmetric or commands share mutable receiver state |

## Basic Code

A text buffer receives insert commands. Each command captures what to insert and where; `revert` removes the same chunk.

```javascript
function createInsertCommand(buffer, at, text) {
  return {
    apply()   { buffer.splice(at, 0, ...text.split("")); },
    revert()  { buffer.splice(at, text.length); },
  };
}

const buffer = "hello".split("");
const cmd = createInsertCommand(buffer, 5, " world");

cmd.apply();
console.log(buffer.join("")); // hello world

cmd.revert();
console.log(buffer.join("")); // hello
```

The caller holds a command object — not a raw `buffer.splice` call. That object can be pushed onto a history stack, replayed, or queued.

## How it works

The Command pattern separates **who invokes** an action from **what the action does** and **how to reverse it**.

```
  UI / scheduler                Invoker                    Receiver
  ─────────────                 ───────                    ────────
  "Insert !"  ──►  execute(cmd) ──► cmd.apply()  ──►  buffer mutated
  "Undo"      ──►  undo()       ──► cmd.revert() ──►  buffer restored
                         │
                         ▼
                   [ undoStack ]
                   [ redoStack ]
```

**Execute vs apply:** Classic GoF uses `execute()` on the command. In JavaScript, `apply()` / `revert()` pairs read clearly alongside array methods and match the undo stack in this curriculum's Observer example. Either naming works — the contract is: run the action, and optionally run the inverse.

**Invoker owns history:** The Invoker (`execute`, `undo`, `redo`) pushes commands onto stacks and clears redo on new work. Commands stay dumb about stacks — they only know their receiver and parameters.

**Command vs Strategy:** A Strategy is selected and swapped at runtime — "which algorithm runs?" A Command is a discrete action with a timestamp in history — "what happened, and can I take it back?" You can hold a Strategy inside a Command, but the patterns solve different problems.

## In Practice

### When to use

- Users need undo/redo, or you need an audit log of what changed
- The same action is triggered from a button, a keyboard shortcut, and a remote API — one command object, many invokers
- Work must be queued, retried, or replayed later (offline sync, background jobs)

### Anti-patterns

```javascript
// Anti-pattern: undo by remembering previous state globally
let previousText = "";

function insertText(text) {
  previousText = editor.value;
  editor.value += text;
}

function undo() {
  editor.value = previousText; // only one level; concurrent edits break this
}
```

A single `previousText` variable cannot stack multiple undos, cannot redo, and loses granularity when several fields change. Commands capture **each** mutation as a reversible unit.

```javascript
// Anti-pattern: command that is really a Strategy
const commands = {
  sortByPrice: (a, b) => a.price - b.price,
  sortByName:  (a, b) => a.name.localeCompare(b.name),
};
```

If there is no execute/revert, no queue, and no invoker — only algorithm swap — that is **Strategy**, not Command. Do not rename comparators "commands" for pattern consistency; use Command when the action is a request with a lifecycle.

> **Rule of thumb:** If the user might press Undo, or you need a log of "what ran," model it as a Command. If the caller picks one of several algorithms and runs it once with no history, that is Strategy.

## Code Examples

### Basic — Insert Command with History

An Invoker executes commands and maintains undo/redo stacks. Commands know only their receiver and parameters.

```javascript
function createInsertCommand(buffer, at, text) {
  return {
    apply()  { buffer.splice(at, 0, ...text.split("")); },
    revert() { buffer.splice(at, text.length); },
  };
}

function createHistory() {
  const undoStack = [];
  const redoStack = [];

  return {
    execute(command) {
      command.apply();
      undoStack.push(command);
      redoStack.length = 0;
    },
    undo() {
      const command = undoStack.pop();
      if (!command) return;
      command.revert();
      redoStack.push(command);
    },
    redo() {
      const command = redoStack.pop();
      if (!command) return;
      command.apply();
      undoStack.push(command);
    },
    canUndo() { return undoStack.length > 0; },
    canRedo() { return redoStack.length > 0; },
  };
}

const buffer = "hello".split("");
const history = createHistory();

history.execute(createInsertCommand(buffer, 5, " world"));
console.log(buffer.join("")); // hello world

history.execute(createInsertCommand(buffer, 11, "!"));
console.log(buffer.join("")); // hello world!

history.undo();
console.log(buffer.join("")); // hello world

history.redo();
console.log(buffer.join("")); // hello world!

history.undo();
history.undo();
console.log(buffer.join("")); // hello
```

**What to notice:**

- `createHistory` never inspects buffer contents — it only calls `apply` and `revert`
- Each insert is its own command object with captured `at` and `text` — undo is precise, not a global snapshot
- New `execute` clears `redoStack` — standard undo/redo semantics

### Medium — Toolbar with Named Commands

A document store exposes actions as commands. Toolbar buttons and keyboard shortcuts invoke the same command objects through one Invoker — no duplicated edit logic.

```javascript
function createDocument(initial = "") {
  let text = initial;
  return {
    getText() { return text; },
    insert(at, chunk) { text = text.slice(0, at) + chunk + text.slice(at); },
    delete(at, length) { text = text.slice(0, at) + text.slice(at + length); },
  };
}

function createInsertCommand(doc, at, chunk) {
  return {
    label: `Insert "${chunk}"`,
    apply()  { doc.insert(at, chunk); },
    revert() { doc.delete(at, chunk.length); },
  };
}

function createDeleteCommand(doc, at, length) {
  const removed = doc.getText().slice(at, at + length);
  return {
    label: `Delete "${removed}"`,
    apply()  { doc.delete(at, length); },
    revert() { doc.insert(at, removed); },
  };
}

function createCommandInvoker(doc) {
  const undoStack = [];
  const redoStack = [];

  return {
    run(command) {
      command.apply();
      undoStack.push(command);
      redoStack.length = 0;
      console.log(`[run] ${command.label}`);
    },
    undo() {
      const command = undoStack.pop();
      if (!command) return;
      command.revert();
      redoStack.push(command);
      console.log(`[undo] ${command.label}`);
    },
    redo() {
      const command = redoStack.pop();
      if (!command) return;
      command.apply();
      undoStack.push(command);
      console.log(`[redo] ${command.label}`);
    },
    getLog() {
      return undoStack.map(c => c.label);
    },
  };
}

const doc = createDocument("Design");
const invoker = createCommandInvoker(doc);

// Toolbar "Bold" might wrap selection — here, append pattern
invoker.run(createInsertCommand(doc, doc.getText().length, " Patterns"));
invoker.run(createInsertCommand(doc, doc.getText().length, "!"));

console.log(doc.getText()); // Design Patterns!

invoker.undo();
console.log(doc.getText()); // Design Patterns

invoker.run(createDeleteCommand(doc, 0, 7)); // remove "Design "
console.log(doc.getText()); // Patterns

console.log(invoker.getLog());
// [ 'Insert " Patterns"', 'Insert "!"', 'Delete "Design "' ]
```

**What to notice:**

- `createInsertCommand` and `createDeleteCommand` capture parameters at creation time — undo deletes the exact chunk that was inserted
- Toolbar, menu, and shortcut handlers all call `invoker.run(someCommand)` — one code path
- `label` supports audit logs and debugging without exposing receiver internals

## Trade-offs

| Pro | Con |
| --- | --- |
| Undo/redo, queues, and audit logs fall out of the same object shape | Every reversible action needs a symmetric `revert` — some operations (send email, charge card) are not undoable |
| One command object invoked from toolbar, shortcut, and API — no duplicated edit logic | Command proliferation — many small factory functions if every action is its own type |
| Invoker and receiver decouple — test commands without UI | Capturing state at command creation time can stale if the receiver changes before `apply` |
| History stacks compose into macro commands (batch several commands as one undo unit) | Deep undo stacks consume memory; pruning and coalescing (merge adjacent inserts) add complexity |

## Related Patterns

| Pattern | How it relates or differs |
| ------- | ------------------------- |
| Strategy | Encapsulates an algorithm for swap at runtime; Command encapsulates a request with optional history and undo. |
| Observer | Invoker notifies observers after execute/undo; Observer + Command is the standard undoable store shape. |
| Memento | Saves receiver snapshots when `revert` is too expensive to compute; Command stores the action, Memento stores the state. |
| Orchestrator | Sequences steps in order; each step can be a Command if the pipeline needs a transaction log or rollback. |
| Mediator | Routes events between peers; colleague actions can be modelled as commands the Mediator dispatches. |

## Further Reading

- [Command — Refactoring.Guru](https://refactoring.guru/design-patterns/command)
- [Command pattern — patterns.dev](https://www.patterns.dev/vanilla/command-pattern)
- [Command pattern — SourceMaking](https://sourcemaking.com/design_patterns/command)

## Self-check questions

1. Why does `createDeleteCommand` capture `removed` at command creation time rather than reading it inside `revert()`?
2. What breaks if you use a single global `previousValue` variable for undo instead of a command stack?
3. Your payment module has `charge()` and `refund()` but no undo. Is that a Command pattern — or something else?