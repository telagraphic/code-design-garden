---
domain: code
section: design-patterns
chapter: challenges
title: "Command Pattern Challenge"
order: 10
description: "Encapsulate actions as apply/revert command objects with an invoker history stack so undo, redo, and shared toolbar shortcuts become possible."
chapterLabel: "Challenges"
---

# Command Pattern — Code Challenges

---

## Challenge 1 — The One-Level Undo

### The Code

A tiny text editor remembers one previous value for undo. Every insert overwrites that snapshot.

```javascript
function createEditor(initial = "hello") {
  let text = initial;
  let previousText = initial;

  return {
    getText() { return text; },
    insert(at, chunk) {
      previousText = text;
      text = text.slice(0, at) + chunk + text.slice(at);
      console.log(`[insert] "${chunk}" at ${at}`);
    },
    undo() {
      text = previousText;
      console.log(`[undo] → "${text}"`);
    },
  };
}

const editor = createEditor();

editor.insert(5, " world");
console.log(editor.getText()); // hello world

editor.insert(11, "!");
console.log(editor.getText()); // hello world!

editor.undo();
console.log(editor.getText()); // hello world  ← only one level

editor.undo();
console.log(editor.getText()); // hello world  ← stuck — cannot reach "hello"
```

Two inserts, one `previousText` slot. Redo is impossible. Concurrent edits would corrupt the single snapshot.

### What's Wrong

Run this and ask: what happens after three inserts and two undos?

`previousText` only remembers the value before the **last** insert. There is no stack, no redo, and no record of *what* changed — only a full-text snapshot that loses granularity.

Three problems:

1. **Single snapshot undo** — cannot stack multiple reversible actions
2. **No redo path** — once undone, the second insert is lost forever
3. **Mutation without a command object** — toolbar, keyboard, and API cannot share one action shape or audit log

### Your Task

Refactor so that:

- A character buffer (array or string wrapper) is the **receiver**
- `createInsertCommand(buffer, at, text)` returns `{ apply, revert }`
- `createHistory()` is the **invoker** with `execute`, `undo`, `redo`, `canUndo`, `canRedo`
- Each insert is a command pushed onto the undo stack; new `execute` clears redo
- The editor exposes `insert(at, chunk)` by building and executing a command — not mutating directly

Target interface:

```javascript
const buffer = "hello".split("");
const history = createHistory();

history.execute(createInsertCommand(buffer, 5, " world"));
history.execute(createInsertCommand(buffer, 11, "!"));
console.log(buffer.join("")); // hello world!

history.undo();
console.log(buffer.join("")); // hello world

history.undo();
console.log(buffer.join("")); // hello

history.redo();
console.log(buffer.join("")); // hello world
```

---

### Hints

<details>
<summary>#1 — Each edit is an object, not a snapshot</summary>

Instead of saving `previousText`, capture **what happened**: insert `" world"` at index `5`. `apply()` performs the splice; `revert()` removes the same length at the same index.

The invoker pushes each command object onto a stack. `undo()` pops, calls `revert()`, pushes to redo stack.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

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
    undo() { /* pop, revert, push to redo */ },
    redo() { /* pop redo, apply, push to undo */ },
    canUndo() { return undoStack.length > 0; },
    canRedo() { return redoStack.length > 0; },
  };
}
```

Commands know the receiver and parameters; the history knows only `apply` / `revert`.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
createInsertCommand(buffer, at, text):
  apply:  insert text chars at index at in buffer
  revert: remove text.length chars starting at at

createHistory():
  undoStack = []
  redoStack = []

  execute(command):
    command.apply()
    push command onto undoStack
    clear redoStack

  undo():
    command = pop undoStack
    if none → return
    command.revert()
    push command onto redoStack

  redo():
    command = pop redoStack
    command.apply()
    push command onto undoStack
```

Wire `editor.insert(at, chunk)` as `history.execute(createInsertCommand(buffer, at, chunk))`.

</details>

---

### Solution

<details>
<summary>View solution</summary>

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

function createEditor(initial = "hello") {
  const buffer = initial.split("");
  const history = createHistory();

  return {
    getText() { return buffer.join(""); },
    insert(at, chunk) {
      history.execute(createInsertCommand(buffer, at, chunk));
    },
    undo() { history.undo(); },
    redo() { history.redo(); },
    canUndo() { return history.canUndo(); },
    canRedo() { return history.canRedo(); },
  };
}

const editor = createEditor();

editor.insert(5, " world");
console.log(editor.getText()); // hello world

editor.insert(11, "!");
console.log(editor.getText()); // hello world!

editor.undo();
console.log(editor.getText()); // hello world

editor.undo();
console.log(editor.getText()); // hello

editor.redo();
console.log(editor.getText()); // hello world

console.log(editor.canUndo()); // true
console.log(editor.canRedo()); // false
```

**What changed:**

- One global snapshot became a stack of command objects with symmetric `apply` / `revert`
- Redo works because reverted commands live on the redo stack until a new `execute`
- The invoker never inspects buffer contents — only calls command methods

**Concepts at work:** Each command is a **request object** capturing receiver + parameters. `createHistory` is the **Invoker**; the buffer is the **Receiver**. This replaces the anti-pattern of a single `previousText` variable with granular, stackable undo units.

</details>

---

## Challenge 2 — The Duplicated Toolbar

### The Code

A document editor exposes insert and delete through separate toolbar handlers. Each handler mutates the doc directly — no shared undo, no audit trail.

```javascript
function createDocument(initial = "Design") {
  let text = initial;
  return {
    getText() { return text; },
    insert(at, chunk) { text = text.slice(0, at) + chunk + text.slice(at); },
    delete(at, length) { text = text.slice(0, at) + text.slice(at + length); },
  };
}

const doc = createDocument();

// Toolbar button handlers — duplicated patterns, no undo
document.querySelector("#append-patterns").addEventListener("click", () => {
  doc.insert(doc.getText().length, " Patterns");
  console.log(`[toolbar] append Patterns → ${doc.getText()}`);
});

document.querySelector("#append-bang").addEventListener("click", () => {
  doc.insert(doc.getText().length, "!");
  console.log(`[toolbar] append ! → ${doc.getText()}`);
});

document.querySelector("#strip-design").addEventListener("click", () => {
  doc.delete(0, 7); // removes "Design "
  console.log(`[toolbar] strip prefix → ${doc.getText()}`);
});

// Simulated clicks in REPL:
doc.insert(doc.getText().length, " Patterns");
doc.insert(doc.getText().length, "!");
doc.delete(0, 7);
console.log(doc.getText()); // Patterns!
```

Keyboard shortcuts would copy the same three blocks. Undo would require rewiring every handler.

### What's Wrong

Handlers know *how* to mutate the document and embed ad-hoc logging. There is no command object to push onto a history stack, no `label` for audit, and no single entry point for toolbar + shortcut + API.

Three problems:

1. **Duplicated mutation paths** — each handler calls `doc.insert` / `doc.delete` with its own parameters
2. **No undo/redo seam** — nothing records what ran
3. **Commands conflated with one-off calls** — append and delete are procedures, not reusable values

### Your Task

Refactor so that:

- `createInsertCommand(doc, at, chunk)` and `createDeleteCommand(doc, at, length)` return `{ label, apply, revert }`
- `createDeleteCommand` captures `removed` text at creation time for `revert`
- `createCommandInvoker()` exposes `run`, `undo`, `redo`, and `getLog`
- Toolbar actions become one-liners: `invoker.run(createInsertCommand(...))` — same objects usable from keyboard shortcuts

Target interface:

```javascript
const invoker = createCommandInvoker();

invoker.run(createInsertCommand(doc, doc.getText().length, " Patterns"));
invoker.run(createInsertCommand(doc, doc.getText().length, "!"));
console.log(doc.getText()); // Design Patterns!

invoker.undo();
console.log(doc.getText()); // Design Patterns

invoker.run(createDeleteCommand(doc, 0, 7));
console.log(doc.getText()); // Patterns

console.log(invoker.getLog());
// [ 'Insert " Patterns"', 'Insert "!"', 'Delete "Design "' ]
```

---

### Hints

<details>
<summary>#1 — Factory functions build command objects</summary>

Pull each toolbar action into a factory that **closes over** the parameters at click time:

`createInsertCommand(doc, doc.getText().length, " Patterns")`

returns an object the invoker can run now or stack for undo. Handlers shrink to `invoker.run(...)`.

</details>

<details>
<summary>#2 — Sketch the shape</summary>

```javascript
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

function createCommandInvoker() {
  const undoStack = [];
  const redoStack = [];
  return {
    run(command) { /* apply, push, clear redo, log label */ },
    undo() { /* … */ },
    redo() { /* … */ },
    getLog() { return undoStack.map(c => c.label); },
  };
}
```

Capture `removed` when the command is **created** — not inside `revert` — so undo restores the exact deleted text even if the doc changed later.

</details>

<details>
<summary>#3 — Pseudocode walkthrough</summary>

```
createInsertCommand(doc, at, chunk):
  label = 'Insert "{chunk}"'
  apply:  doc.insert(at, chunk)
  revert: doc.delete(at, chunk.length)

createDeleteCommand(doc, at, length):
  removed = doc text slice from at for length chars   ← capture now
  label = 'Delete "{removed}"'
  apply:  doc.delete(at, length)
  revert: doc.insert(at, removed)

invoker.run(command):
  command.apply()
  push onto undoStack
  clear redoStack
  log command.label

// Toolbar:
invoker.run(createInsertCommand(doc, doc.length, " Patterns"))
invoker.run(createInsertCommand(doc, doc.length, "!"))

// Keyboard shortcut reuses same command factories — no duplicated doc.insert calls
```

</details>

---

### Solution

<details>
<summary>View solution</summary>

```javascript
function createDocument(initial = "Design") {
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

function createCommandInvoker() {
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

const doc = createDocument();
const invoker = createCommandInvoker();

// Toolbar handlers become one-liners
function onAppendPatterns() {
  invoker.run(createInsertCommand(doc, doc.getText().length, " Patterns"));
}
function onAppendBang() {
  invoker.run(createInsertCommand(doc, doc.getText().length, "!"));
}
function onStripDesign() {
  invoker.run(createDeleteCommand(doc, 0, 7));
}

// --- Verify ---
onAppendPatterns();
onAppendBang();
console.log(doc.getText()); // Design Patterns!

invoker.undo();
console.log(doc.getText()); // Design Patterns

onStripDesign();
console.log(doc.getText()); // Patterns

console.log(invoker.getLog());
// [ 'Insert " Patterns"', 'Insert "!"', 'Delete "Design "' ]

invoker.undo();
console.log(doc.getText()); // Design Patterns
```

**What changed:**

- Toolbar handlers delegate to `invoker.run(command)` — keyboard shortcuts reuse the same factories
- Insert and delete are command objects with `label`, `apply`, and `revert`
- `getLog()` provides an audit trail from command labels

**Concepts at work:** The **Invoker** centralises history; **command factories** encapsulate each user action. `label` supports logging without exposing the receiver. Contrast with **Strategy**: these objects are discrete executed actions with undo — not swappable algorithms selected once.

</details>

---

## When Not to Use the Command Pattern

A command earns its place when actions need history, undo, or a shared invocation path. Skip it when:

- **There is no undo and no log.** A one-off `doc.insert` with no redo/audit requirement is a direct method call — not a command.
- **The object is really a Strategy.** Named sort comparators with no `apply`/`revert` lifecycle are **Strategy**, not Command — do not rename for pattern consistency.
- **The operation is not reversible and never will be.** Sending email or charging a card may use a queue — but without undo, a simple job record may suffice.
- **Every command shares 90% code.** Extract a shared helper; commands should be small factories, not copy-pasted blocks.

The rule of thumb: if the user might press Undo, or multiple invokers (toolbar, shortcut, API) must run the same action, model it as a Command.

---

## What to Take Away

Before moving on, answer these from memory:

1. In Challenge 1, why does a command stack beat a single `previousText` variable?
2. In Challenge 2, why must `createDeleteCommand` capture `removed` at creation time?
3. What is the difference between Command and Strategy — when would a sort comparator *not* be a command?
4. How does the Invoker relate to the Receiver — what does the invoker know about document internals?

---

*← [Command Pattern](/code/design-patterns/patterns/10-command-pattern)*
