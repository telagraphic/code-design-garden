# Reference: Design Patterns Table

A lookup table of common design patterns for JavaScript/TypeScript web applications. Use this when the user wants a quick comparison, a cheatsheet, or to identify a pattern by description without committing to a full study page.

## How to use this reference

- For a quick answer ("what's the Observer pattern?"), pull the row and present its **function** and **metaphor** columns first, then **common uses** if context helps.
- When the user is comparing two patterns, show both rows side by side and call out what differs in **type** and **function**.
- If the user asks "what pattern is this?", scan the **common uses** column for matches against their description before committing to a name.
- Don't dump the whole table unless the user explicitly asks for the full list — pick the relevant rows.

## Pattern table

| Name              | Type       | Function                                                                                  | Metaphor                                                       | Common uses in modern web apps                                                                 |
| ----------------- | ---------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Singleton         | Creational | Ensure a class has only one instance and provide a global access point.                   | The one printer the whole office shares.                       | Logger, app-wide config store, single DB connection pool, browser `window`/`document`.        |
| Factory Method    | Creational | Define an interface for creating an object; let subclasses decide which class to instantiate. | A coffee machine that gives you espresso or latte by the same button. | `React.createElement`, icon component factories, toast/notification builders.                  |
| Abstract Factory  | Creational | Produce families of related objects without specifying concrete classes.                   | A furniture catalog: pick "modern" once, get matching chair + table + lamp. | Theme systems (light/dark families), UI kits, cross-platform component sets.                   |
| Builder           | Creational | Construct complex objects step-by-step, separating construction from representation.       | Subway sandwich line — add bread, fillings, sauces in order.   | Query builders (Knex, Prisma), test data fixtures, form-state builders, URL builders.          |
| Prototype         | Creational | Create new objects by cloning an existing object (the prototype).                          | Photocopying a form you'll fill out differently.               | JS prototypal inheritance itself, `structuredClone`, Redux state copies.                        |
| Module            | Structural | Encapsulate related code behind a public interface, hiding private state.                  | A vending machine — buttons outside, mechanism hidden.         | ES modules, IIFE patterns, npm packages, service files in apps.                                |
| Adapter           | Structural | Convert one interface into another the client expects.                                     | A travel plug adapter.                                         | Wrapping a legacy API for a new client, normalizing third-party SDKs (Stripe, Twilio).         |
| Decorator         | Structural | Attach additional responsibilities to an object dynamically.                               | Stacking toppings on a pizza.                                  | HOCs in React, TS `@decorator` syntax, Express middleware chains, logging wrappers.            |
| Facade            | Structural | Provide a simplified interface to a complex subsystem.                                     | Hotel concierge — one phone call, many services arranged.      | API client libraries, `fetch` wrappers, "service" classes that hide multiple modules.          |
| Proxy             | Structural | Provide a placeholder/surrogate that controls access to another object.                    | A bouncer at a club deciding who gets in.                      | `Proxy` global, lazy-loaded images, virtual DOM, auth/rate-limit middleware, ORM lazy loading. |
| Composite         | Structural | Compose objects into tree structures and treat individual + composite uniformly.           | A folder that can contain files OR more folders.               | DOM tree, React component trees, file explorers, menu/nav structures.                          |
| Bridge            | Structural | Decouple an abstraction from its implementation so both can vary independently.            | A TV remote works across many TV brands.                       | Cross-platform rendering (React DOM vs React Native), storage backends behind one API.         |
| Flyweight         | Structural | Share fine-grained objects to support large quantities efficiently.                        | A library lending the same book to many readers.               | Icon sprite sheets, glyph caching, virtualized lists, React `memo`.                            |
| Observer          | Behavioral | Define a one-to-many dependency; when one object changes, dependents are notified.         | Newsletter subscribers — publisher sends, all subscribers get it. | DOM events, `EventTarget`, RxJS, MobX reactivity, framework reactive state.                    |
| Pub/Sub           | Behavioral | Decouple publishers and subscribers via a broker channel (no direct reference).            | Radio station + listeners — neither knows the other personally. | Event buses, WebSockets, Redux middleware, browser `BroadcastChannel`, postMessage.            |
| Strategy          | Behavioral | Define a family of algorithms, encapsulate each, make them interchangeable at runtime.     | Choosing GPS routing: fastest, shortest, scenic — same trip, different rule. | Sort comparators, payment processors, validation rule sets, auth providers.                    |
| Command           | Behavioral | Encapsulate a request as an object; parameterize, queue, log, and undo.                    | A restaurant order ticket — written down, queued, fillable.    | Undo/redo (editors), Redux actions, job queues, CLI command dispatchers.                       |
| State             | Behavioral | Alter an object's behavior when its internal state changes — it appears to change class.   | A traffic light — same intersection, different rules per color. | XState/state machines, form wizards, video player UI, connection lifecycle (idle/loading/error). |
| Iterator          | Behavioral | Provide sequential access to elements without exposing the underlying representation.      | A TV remote's channel-up button — next, next, next.            | `for...of`, generators, async iterators, pagination cursors, stream APIs.                      |
| Mediator          | Behavioral | Define an object that encapsulates how a set of objects interact.                          | Air traffic control tower — planes don't talk to each other directly. | Form orchestration, chat rooms, Redux store as mediator, parent components coordinating children. |
| Chain of Responsibility | Behavioral | Pass a request along a chain of handlers; each decides to handle or forward.            | Customer support escalation — tier 1, then tier 2, then tier 3. | Express/Koa middleware, event bubbling, validation pipelines, request interceptors.            |
| Template Method   | Behavioral | Define the skeleton of an algorithm; let subclasses override specific steps.               | A recipe with steps you can customize (which spice, which oil). | Lifecycle hooks (`componentDidMount`), test fixtures (`beforeEach`/`afterEach`), abstract base classes. |
| Visitor           | Behavioral | Separate an algorithm from the object structure it operates on.                            | A tax auditor visiting different business types with different rules. | AST traversal (Babel, ESLint), serializers, type-checkers.                                     |
| Memento           | Behavioral | Capture and restore an object's internal state without violating encapsulation.            | A save game slot.                                              | Undo stacks, time-travel debugging (Redux DevTools), draft autosave.                           |
| Module Revealing  | Structural | A Module variant that explicitly returns the public surface of an IIFE/closure.             | A safe with a labeled keypad — you only see the buttons that work. | Pre-ES6 libraries, jQuery plugins, encapsulated utilities in legacy code.                      |
| Middleware        | Behavioral | Compose request/response processing as a chain of functions, each with `next()`.            | An assembly line where each station can stamp or reject.       | Express/Koa/Connect, Redux middleware, Next.js middleware, fetch interceptors.                 |
| Hook              | Behavioral | Inject custom logic at well-defined extension points in a host's lifecycle.                | A coat hook on a wall — the wall doesn't care what you hang.   | React Hooks, WordPress hooks, Git hooks, lifecycle callbacks.                                  |
| Render Props      | Structural | Share code between components using a prop whose value is a function returning UI.         | A vending machine that lets you pick the cup it pours into.    | Headless component libraries (Downshift, Radix), data-fetching components.                     |
| Provider          | Structural | Make a value available to a subtree of components without prop drilling.                   | Building intercom — broadcasts to all floors that tune in.     | React Context, Vue provide/inject, Angular DI, theme/auth/i18n providers.                      |
| Reducer (Flux)    | Behavioral | Compute next state as a pure function of `(currentState, action)`.                         | A scoreboard operator: only the official rulebook updates it.  | Redux, `useReducer`, Zustand variants, NgRx, Pinia actions.                                    |
| Repository        | Structural | Mediate between the domain and data-mapping layers using a collection-like interface.       | A librarian — you ask for a book, they handle the shelves.     | Data-access layers in Node backends, Prisma/TypeORM wrappers, IndexedDB abstractions.          |
| Service Layer     | Structural | Define an application's boundary with operations available to clients.                     | A bank teller window — one place for many account operations.  | API service classes, business-logic modules between controllers and repositories.              |
| MVVM              | Structural | Separate UI (View), state/logic (ViewModel), and data (Model) with two-way binding.        | A car dashboard — gauges (view) bind to engine sensors (model) via the dash computer (viewmodel). | Vue components, Knockout, Angular, SwiftUI-style patterns ported to web.                       |

## Anti-patterns worth naming

When the user describes their code and it matches one of these, name it before suggesting a fix:

- **God Object / God Component** — one class or component knows too much and does too much. Often refactored into Facade + several focused modules.
- **Spaghetti Code** — control flow jumps unpredictably; usually missing a State, Strategy, or Middleware pattern.
- **Lava Flow** — dead or fossilized code paths kept "just in case". No pattern fixes this; deletion does.
- **Callback Hell** — nested async callbacks. Fix with Promises/`async-await`, or Observer/iterator patterns.
- **Magic Strings/Numbers** — unnamed constants scattered through code. Fix with a Module of named constants or an enum.
- **Prop Drilling** — passing props through many intermediate components. Fix with Provider (Context) or state Mediator.
- **Singleton Abuse** — using a Singleton as a global variable in disguise. Often replaced with Dependency Injection or a Provider.
- **Inheritance Chains** — deep `extends` hierarchies. Usually replaced with Composition (Strategy, Decorator).

## Quick recommendation flow

If the user gives a one-line description and wants a fast suggestion:

1. **Is the problem about *creating* objects?** → Creational (Factory, Builder, Singleton).
2. **Is the problem about *structuring* or *connecting* parts?** → Structural (Adapter, Facade, Composite, Provider).
3. **Is the problem about *behavior over time* or *communication*?** → Behavioral (Observer, Strategy, State, Middleware).

If the user wants depth, route to **create** (full study page) or **analyze** (in-context recommendation against their code).
