---
domain: code
section: react
chapter: overview
title: "useMemo / useCallback"
order: 1013
chapterLabel: "Overview"
---
# useMemo / useCallback

> **Cache** a computed value or a **function reference** between renders when dependencies are unchanged — so expensive work is not repeated and **`memo`** children or effect deps are not invalidated by a “new object every render.”

- **`useMemo(factory, deps)`** — run `factory()`, **remember** the return value until a dep changes.
- **`useCallback(fn, deps)`** — remember **`fn` itself** until a dep changes. Equivalent to `useMemo(() => fn, deps)`.

Neither hook is for hiding side effects. Both are about **referential stability** and **skipping repeat work** during render.

---

## What problem they solve

On every render, your component function runs again. That means:

- **New function** expressions (`() => …`) are new references every time.
- **New object/array literals** (`{ theme }`, `[items]`) are new references every time.

React compares many things with **`Object.is`** (like `===` for primitives). If a **`memo`** child receives a new function prop every render, it **re-renders anyway**. If a **`useEffect`** lists an unstable object in deps, the effect **re-runs every render**.

```text
RENDER N                          RENDER N+1 (parent state ticked)
────────                          ────────────────────────────────
() => handleClick()   ──new ref──► () => handleClick()   ← memo child sees "prop changed"
{ items, total }      ──new ref──► { items, total }      ← context consumer re-renders
filter(list)          ──re-runs──► filter(list)          ← expensive work repeated
```

**`useMemo` / `useCallback`** answer: “If **`deps`** did not change, give me the **same** result/reference as last time.”

```text
RENDER N                    RENDER N+1 (unrelated state changed)
────────                    ───────────────────────────────────
useMemo(..., [items])       deps same → return cached filter result
useCallback(..., [id])      deps same → return same function object
```

---

## `useMemo` vs `useCallback` (same mechanism)

| Hook | Caches | Typical use |
|------|--------|-------------|
| **`useMemo`** | Any value (number, object, array, element tree) | Expensive derivation; stable **object** for context `value` |
| **`useCallback`** | A **function** | Stable handler passed to **`memo`** child or effect dep |

```jsx
const sorted = useMemo(() => sortRows(rows, sortKey), [rows, sortKey]);

const onSelect = useCallback((id) => {
  setSelectedId(id);
}, []);
```

---

## Timeline: when the cache invalidates

```text
TIME ──►
       commit 1          commit 2              commit 3
       deps [A]          deps [A]              deps [B]
         │                 │                     │
useMemo  run factory       return cache          run factory
         result = X        result = X            result = Y
```

React stores **last deps** and **last result** on the hook slot (same idea as `useEffect` deps, but for **render output**, not subscriptions).

---

## `useMemo` / `useCallback` vs other tools

| Question | Prefer **plain render** | Prefer **useMemo / useCallback** | Prefer **other** |
|----------|-------------------------|----------------------------------|------------------|
| `count * 2` or simple filter on 10 items? | **Yes** | Overkill | — |
| Filtering/sorting **thousands** of rows every keystroke? | Slow | **`useMemo`** on `[rows, query]` | Virtualize list; defer query ([useDeferredValue](/course-notes/useDeferredValue)) |
| Child wrapped in **`React.memo`** keeps re-rendering? | Fix unnecessary parent state | **`useCallback`** for handlers; **`useMemo`** for props objects | Move state down |
| Context `value={{ a, b }}` new every render? | — | **`useMemo`** for `value` | Split context ([useContext](/course-notes/useContext)) |
| User clicked Save | — | — | **Event handler** (Rule #1) |
| Keep input responsive while list catches up | — | — | **`useDeferredValue`** / **`useTransition`** |
| Avoid re-fetch on mount | — | — | Correct **`useEffect`** deps |

**Default:** measure first. The [React Compiler](https://react.dev/learn/react-compiler) (when enabled) can auto-memoize many cases; hooks remain the explicit tool until then.

---

## Pattern: expensive filtered list (dashboard, admin table)

```jsx
import { useMemo, useState } from "react";

function ProductTable({ products }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q);
      const matchesCat = category === "all" || p.category === category;
      return matchesQuery && matchesCat;
    });
  }, [products, query, category]);

  return (
    <>
      <SearchBar query={query} onQuery={setQuery} category={category} onCategory={setCategory} />
      <Table rows={visible} />
    </>
  );
}
```

Pair with **`useDeferredValue(query)`** if typing should stay instant while the table updates lag slightly (see [useDeferredValue](/course-notes/useDeferredValue)).

---

## Pattern: stable handler for `memo` row (inbox, file list)

```jsx
import { memo, useCallback, useState } from "react";

const MessageRow = memo(function MessageRow({ id, subject, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen(id)}>
      {subject}
    </button>
  );
});

function Inbox({ messages }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleOpen = useCallback((id) => {
    setSelectedId(id);
  }, []);

  return messages.map((m) => (
    <MessageRow key={m.id} id={m.id} subject={m.subject} onOpen={handleOpen} />
  ));
}
```

Without **`useCallback`**, **`handleOpen`** is a new function every render → **`MessageRow`** re-renders for every parent render even when **`messages`** did not change.

---

## Pattern: stable context `value` (theme, auth)

```jsx
import { useCallback, useMemo, useState } from "react";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
```

If **`toggle`** is passed to **`memo`** children, wrap it in **`useCallback`** with `[theme]` or define **`toggle`** inside the **`useMemo`** factory so the object’s method identity is stable when **`theme`** is unchanged.

---

## Pattern: `useCallback` for effect dependencies

```jsx
const loadPage = useCallback(
  async (page) => {
    const data = await fetchComments(postId, page);
    setComments(data);
  },
  [postId]
);

useEffect(() => {
  loadPage(1);
}, [loadPage]);
```

When **`postId`** changes, **`loadPage`** identity changes → effect re-runs. When only unrelated parent state changes, **`loadPage`** stays stable → effect does not re-fetch.

For “latest callback without re-running effect,” prefer **`useEffectEvent`** ([useEffectEvent](/course-notes/useEffectEvent)) over an empty-deps **`useCallback`**.

---

## When to reach for memo hooks (decision tree)

```text
Render feels slow or child re-renders too often?
│
├─ Profiling shows expensive pure computation?
│     └─► useMemo(factory, deps) — or defer input (useDeferredValue)
│
├─ memo child re-renders because function/object prop is new each time?
│     └─► useCallback / useMemo for that prop
│
├─ Problem is really "too much state in parent"?
│     └─► lift state down, split components, context split — not memo everywhere
│
└─ Only optimizing "just in case"?
      └─► skip hooks; fix architecture first
```

---

## Pitfalls (short)

| Pitfall | Why it hurts |
|---------|----------------|
| **`useMemo` with missing/wrong deps** | Stale filtered data; classic bug when `filter` omits `query` |
| **`useCallback` everywhere** | Noise; often **`memo`** on the child was unnecessary |
| Memoizing **cheap** work | Hook overhead > savings |
| **`useMemo(() => <Child />, [])`** to “cache JSX” | Usually wrong; extract a component or use **`memo`** on child |
| New **object** in deps while memoizing | `useMemo(..., [{ id }])` invalidates every render — stabilize deps |

---

## Where to go next

- **Keep UI responsive under heavy updates**: [useDeferredValue](/course-notes/useDeferredValue), [useTransition](/course-notes/useTransition)
- **Context + stable values**: [useContext](/course-notes/useContext)
- **Effect deps vs stable callbacks**: [useEffect](/course-notes/useEffect), [useEffectEvent](/course-notes/useEffectEvent)
- **Render phases**: [React rendering flow](/course-notes/react-rendering-flow)
- **Vanilla mental model**: [useMemo / useCallback (vanilla)](/vanilla-react/06-use-memo-callback)

Official docs: **useMemo**, **useCallback**, and **React.memo** in the React documentation.
