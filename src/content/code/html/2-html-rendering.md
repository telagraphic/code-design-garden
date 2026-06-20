---
domain: code
section: html
chapter: overview
title: "HTML Rendering"
sectionTitle: "Rendering"
order: 1
description: "HTML Rendering"
chapterLabel: "HTML Rendering"
---



## **Ways HTML gets to the browser**

  

### **Big idea**

  

The video maps the spectrum of app architectures by one core question: **when and where is HTML produced and delivered?** Everything else (JS size, navigation feel, SEO, infra complexity) falls out of that. It walks from classic MPA and classic SPA to modern hybrids that mix server-rendered HTML with client interactivity and smarter navigation.

---

## **Patterns at a glance**

|**Pattern**|**What ships first**|**Where HTML is produced**|**What the browser does next**|**Navigation feel**|**Typical use / notes**|
|---|---|---|---|---|---|
|Classic MPA (Multi-Page App)|Full HTML for the page|Server (static file or request-time template/function)|Renders immediately; no JS required|Link click → full round trip; nothing changes until server responds|Simple, SEO-friendly, but hard to keep UI elements persistent across pages|
|Classic SPA (Client-Side Rendering)|Minimal skeleton HTML + <script>|Client JS (after downloading/parsing)|Downloads bundles, runs router, fetches JSON, builds HTML|First load can be slow; subsequent in-app navigation can feel instant (if code/data already loaded)|Great for persistent UI (e.g., mini player). Easy to over-fetch & over-bundle|
|“Full SSR” SPA (SSR + Hydration)|Full HTML (rendered with the same React/etc. code on server)|Server at first, then same code runs in client to “hydrate”|Browser still downloads/executes client bundles; binds events|First paint is fast; interactivity waits for hydration|Solves blank first paint; introduces “double data” (same content in HTML and in JS) and hydration delay|
|Isomorphic SSR (server/client behave differently; Suspense/streaming/server-components)|HTML chunks streamed; parts under suspense can show loading immediately|Server renders progressively; client can show placeholders without blocking|Server streams HTML for just-changed regions; client swaps loading for real HTML|Click → immediate visual feedback (loading), then streamed HTML fills in|Combines SPA immediacy with HTML-first delivery; infra usually needs edge/orchestrator|
|MPA-influenced Split Execution (Islands)|Full static HTML (from CDN) with small boot script|Static HTML from CDN; **dynamic “islands”** fetch their own server-rendered HTML|Tiny client script finds islands and fetches/slots server HTML for them|First paint is instant from CDN; islands populate after|Keeps infra simple (static hosting + a thin HTML endpoint per island); great for selective dynamism|
|Partial Pre-Rendering (PPR) / Edge streaming|“Static shell” immediately; dynamic bits streamed later|Edge worker decides: serve cached HTML immediately, stream dynamic parts from server|Client sees shell fast; dynamic regions fill as server streams|Fast shell + progressive completion|Powerful but infra heavy (edge worker + server runtime coordination)|


---

## **How each approach behaves (initial load vs navigation)**

  

### **Classic MPA**

- **Initial load:** request /page → server returns full HTML → browser paints.
    
- **Navigation:** click → full request/response again; nothing on screen changes until response returns.
    

  

### **Classic SPA (CSR)**

- **Initial load:** request /page → server returns near-empty HTML with <script> → browser downloads JS → parses/runs → router loads route code → fetches JSON → builds HTML.
    
- **Navigation:** client router changes UI immediately (if code present), then fetches JSON; can feel instant.
    

  

### **SSR + Hydration (“Full SSR” SPA)**

- **Initial load:** server runs the same UI code to produce HTML **and** embeds data → browser paints fast → downloads JS → hydrates (binds events). Until hydration finishes, clicks on buttons may do nothing (some frameworks queue events).
    
- **Navigation:** often fetches **JSON data** for the next view (not full HTML) and swaps client state; can be immediate or blocked depending on framework.
    

  

### **Isomorphic SSR (Suspense/streaming/server components)**

- **Initial load:** similar to SSR but can stream parts; server-only components mean less JS shipped.
    
- **Navigation:** click shows **loading immediately** (client suspense boundary), while server renders just the changed region and **streams HTML** to replace the placeholder.
    

  

### **Split Execution (Islands)**

- **Initial load:** **entire page HTML** is static and cacheable on a CDN; a tiny boot script finds dynamic “islands” and requests **HTML fragments** for each from a server endpoint; fragments are inserted (no JSON→client render step required).
    
- **Navigation:** if using standard links, you still get fast static responses from CDN; dynamic regions refetch their fragment as needed.
    

---

## **Strengths and weaknesses by pattern**

  

### **Classic MPA**

- **Strengths:** HTML-first, great SEO, minimal JS, simple caching, predictable performance.
    
- **Weaknesses:** Full reload for navigation; can’t easily keep persistent UI (e.g., video mini-player).
    

  

### **Classic SPA (CSR)**

- **Strengths:** Rich client interactions, instantaneous client-side routing, persistent UI across “pages”.
    
- **Weaknesses:** Heavy first load (many JS/JSON requests), blank HTML until JS runs, SEO extra work, easy to create waterfall “XHR storms”.
    

  

### **SSR + Hydration (“Full SSR” SPA)**

- **Strengths:** Fast first paint (real HTML), better SEO; subsequent navigations can fetch only JSON.
    
- **Weaknesses:** **Hydration gap** (UI present but inert until JS loads); **double data** (content appears in HTML and again inside JS bundle); navigation may block until data JSON returns (e.g., older Next.js pages router).
    

  

### **Isomorphic SSR (Suspense/streaming/server components)**

- **Strengths:** Immediate feedback on navigation (placeholders), server streams real **HTML** for changed regions; server-only components reduce client JS; avoids shipping big “every state” bundles.
    
- **Weaknesses:** Requires server/edge orchestration; HTML can’t be one static file for every route; more complex mental model and infra.
    

  

### **Split Execution (Islands)**

- **Strengths:** **Static first** (CDN-fast first paint), only dynamic regions fetch server-rendered **HTML fragments**; simple hosting (static CDN + thin HTML endpoints); avoids JSON→client render for islands.
    
- **Weaknesses:** Islands can only start fetching after the static page and boot script load (no parallel server render kicked off by the edge); cross-island coordination requires care.
    

  

### **Partial Pre-Rendering / Edge streaming**

- **Strengths:** Best of both: cached static shell + streamed dynamic; very fast perceived performance.
    
- **Weaknesses:** Infra heavy (edge worker that knows how to split/route static vs dynamic); vendor/platform features often required.
    

---

## **Key terms and what they mean**

- **MPA (Multi-Page App):** Server returns a complete HTML page per URL; every navigation hits the server.
    
- **SPA (Single-Page App):** Server returns one skeleton HTML; client JS renders all views and handles routing.
    
- **CSR (Client-Side Rendering):** HTML is produced in the browser from JS/JSON.
    
- **SSR (Server-Side Rendering):** Server runs UI code to produce HTML; client later hydrates to become interactive.
    
- **Hydration:** Client JS re-executes components to bind events to server-rendered HTML. Until then, UI may be inert.
    
- **Double data problem:** Same content sent twice—once as HTML, again inside client JS (so hydration can re-render/attach).
    
- **Isomorphic:** Same codebase has **server-only** and **client-only** behaviors; not everything runs identically on both sides.
    
- **Suspense boundary:** A wrapper that lets UI show a fallback immediately while data/HTML for a region arrives; pairs well with streaming.
    
- **Streaming HTML:** Server sends HTML **chunks** as they’re ready so the client can progressively fill placeholders.
    
- **Server Components (React):** Components that run only on the server; their output is HTML (or a protocol) so the client doesn’t need their JS.
    
- **Islands architecture:** Mostly static HTML page with **targeted dynamic regions** (“islands”) that fetch and inject server-rendered HTML.
    
- **Edge worker:** Logic running close to users that can serve cached static parts while orchestrating dynamic rendering elsewhere.
    
- **Partial Pre-Rendering (PPR):** Pre-compute/cache the static shell; stream remaining dynamic parts at request time.
    
- **CDN:** Network that serves cached static assets (HTML, CSS, JS) from locations near users.
    
- **JSON vs HTML over the wire:** JSON requires client code to turn data into DOM; HTML fragments can be dropped in directly.
    

---

## **Cross-cutting tradeoffs called out in the video**

- **First paint vs interactivity:** SSR wins first paint; hydration delays interactivity (event handlers aren’t bound yet).
    
- **Persistent UI across pages:** Easy in SPA (no real page load), hard in MPA (page teardown). Hybrids inherit SPA’s strength here.
    
- **Network waterfalls:** CSR often triggers many parallel XHR/fetches and extra JS chunk loads; HTML-first approaches cut this down.
    
- **SEO:** HTML-first (MPA/SSR/streaming/islands) is naturally crawler-friendly; pure CSR needs workarounds.
    
- **Bundle weight:** CSR tends to ship “every possible state” logic to the client; server-components/HTML-over-the-wire keep heavy rendering on the server.
    
- **Caching & hosting simplicity:** Static HTML from CDNs is trivial to cache (MPA, islands, static shells). Streaming/isomorphic flows can require edge orchestration.
    
- **Infra complexity:** Edge streaming/PPR and isomorphic SSR need coordinated server/edge runtimes; islands keep infra simpler (static + small HTML endpoints).
    
- **User-perceived responsiveness:** SPA-style navigation gives immediate UI change; modern SSR with Suspense/streaming or islands achieves similar “instant feedback” while keeping HTML-first delivery.
    

---

## **Quick chooser (when to reach for what)**

- **Content sites, docs, marketing:** Classic MPA or islands. HTML-first, CDN-fast; sprinkle islands for auth/cart/personalization.
    
- **App-like experiences with persistent chrome (players, dashboards):** Isomorphic SSR or SSR + hydration; add Suspense/streaming for snappy nav.
    
- **Heavily interactive SPA that grew slow:** Move data-heavy regions to server components or islands; stream HTML to reduce JSON/JS churn.
    
- **You want the speed of static + selective dynamic without fancy edge infra:** Islands/split execution.
    

---

## **One-screen summaries by pattern**

  

### **Classic MPA**

- **How HTML is delivered:** Server returns full HTML per request (static file or template/function).
    
- **Pros:** Simple, SEO-ready, minimal JS, great CDN caching.
    
- **Cons:** Full page reloads, no persistent elements, perceived latency on every navigation.
    

  

### **Classic SPA (CSR)**

- **How HTML is delivered:** Skeleton HTML; all real HTML built client-side after JS + JSON fetches.
    
- **Pros:** Instant in-app route changes; persistent UI; rich client control.
    
- **Cons:** Slow first load; many network calls; SEO/metadata pitfalls; can be very JS-heavy.
    

  

### **SSR + Hydration (“Full SSR” SPA)**

- **How HTML is delivered:** Server renders full HTML; client re-executes to attach handlers.
    
- **Pros:** Fast first paint; HTML includes data; better sharing/SEO.
    
- **Cons:** Hydration gap; double-sent content; some frameworks block nav until data JSON returns.
    

  

### **Isomorphic SSR (Suspense/streaming/server components)**

- **How HTML is delivered:** Server streams **HTML** for just-changed regions; client shows placeholders immediately.
    
- **Pros:** SPA-like immediacy plus HTML-first; less client JS when using server-only components.
    
- **Cons:** Needs streaming-capable infra/edge; more moving parts.
    

  

### **MPA-influenced Split Execution (Islands)**

- **How HTML is delivered:** Static page from CDN; a tiny script fetches **server-rendered HTML fragments** for dynamic islands and injects them.
    
- **Pros:** Fast static first paint; minimal client logic; simpler infra than edge streaming; avoids JSON→DOM work for islands.
    
- **Cons:** Island fetches begin after static load; coordinating many islands needs discipline.
    

  

### **Partial Pre-Rendering / Edge streaming**

- **How HTML is delivered:** Edge serves cached static shell; server streams the rest.
    
- **Pros:** Best perceived performance; good for highly dynamic pages.
    
- **Cons:** Requires edge worker + server runtime coordination; platform-specific features.
    

---

Big idea

The video maps the spectrum of app architectures by one core question: when and where is HTML produced and delivered? Everything else (JS size, navigation feel, SEO, infra complexity) falls out of that. It walks from classic MPA and classic SPA to modern hybrids that mix server-rendered HTML with client interactivity and smarter navigation.

⸻

Patterns at a glance

Pattern	What ships first	Where HTML is produced	What the browser does next	Navigation feel	Typical use / notes
Classic MPA (Multi-Page App)	Full HTML for the page	Server (static file or request-time template/function)	Renders immediately; no JS required	Link click → full round trip; nothing changes until server responds	Simple, SEO-friendly, but hard to keep UI elements persistent across pages
Classic SPA (Client-Side Rendering)	Minimal skeleton HTML + <script>	Client JS (after downloading/parsing)	Downloads bundles, runs router, fetches JSON, builds HTML	First load can be slow; subsequent in-app navigation can feel instant (if code/data already loaded)	Great for persistent UI (e.g., mini player). Easy to over-fetch & over-bundle
“Full SSR” SPA (SSR + Hydration)	Full HTML (rendered with the same React/etc. code on server)	Server at first, then same code runs in client to “hydrate”	Browser still downloads/executes client bundles; binds events	First paint is fast; interactivity waits for hydration	Solves blank first paint; introduces “double data” (same content in HTML and in JS) and hydration delay
Isomorphic SSR (server/client behave differently; Suspense/streaming/server-components)	HTML chunks streamed; parts under suspense can show loading immediately	Server renders progressively; client can show placeholders without blocking	Server streams HTML for just-changed regions; client swaps loading for real HTML	Click → immediate visual feedback (loading), then streamed HTML fills in	Combines SPA immediacy with HTML-first delivery; infra usually needs edge/orchestrator
MPA-influenced Split Execution (Islands)	Full static HTML (from CDN) with small boot script	Static HTML from CDN; dynamic “islands” fetch their own server-rendered HTML	Tiny client script finds islands and fetches/slots server HTML for them	First paint is instant from CDN; islands populate after	Keeps infra simple (static hosting + a thin HTML endpoint per island); great for selective dynamism
Partial Pre-Rendering (PPR) / Edge streaming	“Static shell” immediately; dynamic bits streamed later	Edge worker decides: serve cached HTML immediately, stream dynamic parts from server	Client sees shell fast; dynamic regions fill as server streams	Fast shell + progressive completion	Powerful but infra heavy (edge worker + server runtime coordination)


⸻

How each approach behaves (initial load vs navigation)

Classic MPA

- Initial load: request /page → server returns full HTML → browser paints.
- Navigation: click → full request/response again; nothing on screen changes until response returns.

Classic SPA (CSR)

- Initial load: request /page → server returns near-empty HTML with <script> → browser downloads JS → parses/runs → router loads route code → fetches JSON → builds HTML.
- Navigation: client router changes UI immediately (if code present), then fetches JSON; can feel instant.

SSR + Hydration (“Full SSR” SPA)

- Initial load: server runs the same UI code to produce HTML and embeds data → browser paints fast → downloads JS → hydrates (binds events). Until hydration finishes, clicks on buttons may do nothing (some frameworks queue events).
- Navigation: often fetches JSON data for the next view (not full HTML) and swaps client state; can be immediate or blocked depending on framework.

Isomorphic SSR (Suspense/streaming/server components)

- Initial load: similar to SSR but can stream parts; server-only components mean less JS shipped.
- Navigation: click shows loading immediately (client suspense boundary), while server renders just the changed region and streams HTML to replace the placeholder.

Split Execution (Islands)

- Initial load: entire page HTML is static and cacheable on a CDN; a tiny boot script finds dynamic “islands” and requests HTML fragments for each from a server endpoint; fragments are inserted (no JSON→client render step required).
- Navigation: if using standard links, you still get fast static responses from CDN; dynamic regions refetch their fragment as needed.

⸻

Strengths and weaknesses by pattern

Classic MPA

- Strengths: HTML-first, great SEO, minimal JS, simple caching, predictable performance.
- Weaknesses: Full reload for navigation; can’t easily keep persistent UI (e.g., video mini-player).

Classic SPA (CSR)

- Strengths: Rich client interactions, instantaneous client-side routing, persistent UI across “pages”.
- Weaknesses: Heavy first load (many JS/JSON requests), blank HTML until JS runs, SEO extra work, easy to create waterfall “XHR storms”.

SSR + Hydration (“Full SSR” SPA)

- Strengths: Fast first paint (real HTML), better SEO; subsequent navigations can fetch only JSON.
- Weaknesses: Hydration gap (UI present but inert until JS loads); double data (content appears in HTML and again inside JS bundle); navigation may block until data JSON returns (e.g., older Next.js pages router).

Isomorphic SSR (Suspense/streaming/server components)

- Strengths: Immediate feedback on navigation (placeholders), server streams real HTML for changed regions; server-only components reduce client JS; avoids shipping big “every state” bundles.
- Weaknesses: Requires server/edge orchestration; HTML can’t be one static file for every route; more complex mental model and infra.

Split Execution (Islands)

- Strengths: Static first (CDN-fast first paint), only dynamic regions fetch server-rendered HTML fragments; simple hosting (static CDN + thin HTML endpoints); avoids JSON→client render for islands.
- Weaknesses: Islands can only start fetching after the static page and boot script load (no parallel server render kicked off by the edge); cross-island coordination requires care.

Partial Pre-Rendering / Edge streaming

- Strengths: Best of both: cached static shell + streamed dynamic; very fast perceived performance.
- Weaknesses: Infra heavy (edge worker that knows how to split/route static vs dynamic); vendor/platform features often required.

⸻

Key terms and what they mean

- MPA (Multi-Page App): Server returns a complete HTML page per URL; every navigation hits the server.
- SPA (Single-Page App): Server returns one skeleton HTML; client JS renders all views and handles routing.
- CSR (Client-Side Rendering): HTML is produced in the browser from JS/JSON.
- SSR (Server-Side Rendering): Server runs UI code to produce HTML; client later hydrates to become interactive.
- Hydration: Client JS re-executes components to bind events to server-rendered HTML. Until then, UI may be inert.
- Double data problem: Same content sent twice—once as HTML, again inside client JS (so hydration can re-render/attach).
- Isomorphic: Same codebase has server-only and client-only behaviors; not everything runs identically on both sides.
- Suspense boundary: A wrapper that lets UI show a fallback immediately while data/HTML for a region arrives; pairs well with streaming.
- Streaming HTML: Server sends HTML chunks as they’re ready so the client can progressively fill placeholders.
- Server Components (React): Components that run only on the server; their output is HTML (or a protocol) so the client doesn’t need their JS.
- Islands architecture: Mostly static HTML page with targeted dynamic regions (“islands”) that fetch and inject server-rendered HTML.
- Edge worker: Logic running close to users that can serve cached static parts while orchestrating dynamic rendering elsewhere.
- Partial Pre-Rendering (PPR): Pre-compute/cache the static shell; stream remaining dynamic parts at request time.
- CDN: Network that serves cached static assets (HTML, CSS, JS) from locations near users.
- JSON vs HTML over the wire: JSON requires client code to turn data into DOM; HTML fragments can be dropped in directly.

⸻

Cross-cutting tradeoffs called out in the video

- First paint vs interactivity: SSR wins first paint; hydration delays interactivity (event handlers aren’t bound yet).
- Persistent UI across pages: Easy in SPA (no real page load), hard in MPA (page teardown). Hybrids inherit SPA’s strength here.
- Network waterfalls: CSR often triggers many parallel XHR/fetches and extra JS chunk loads; HTML-first approaches cut this down.
- SEO: HTML-first (MPA/SSR/streaming/islands) is naturally crawler-friendly; pure CSR needs workarounds.
- Bundle weight: CSR tends to ship “every possible state” logic to the client; server-components/HTML-over-the-wire keep heavy rendering on the server.
- Caching & hosting simplicity: Static HTML from CDNs is trivial to cache (MPA, islands, static shells). Streaming/isomorphic flows can require edge orchestration.
- Infra complexity: Edge streaming/PPR and isomorphic SSR need coordinated server/edge runtimes; islands keep infra simpler (static + small HTML endpoints).
- User-perceived responsiveness: SPA-style navigation gives immediate UI change; modern SSR with Suspense/streaming or islands achieves similar “instant feedback” while keeping HTML-first delivery.

⸻

Quick chooser (when to reach for what)

- Content sites, docs, marketing: Classic MPA or islands. HTML-first, CDN-fast; sprinkle islands for auth/cart/personalization.
- App-like experiences with persistent chrome (players, dashboards): Isomorphic SSR or SSR + hydration; add Suspense/streaming for snappy nav.
- Heavily interactive SPA that grew slow: Move data-heavy regions to server components or islands; stream HTML to reduce JSON/JS churn.
- You want the speed of static + selective dynamic without fancy edge infra: Islands/split execution.

⸻

One-screen summaries by pattern

Classic MPA

- How HTML is delivered: Server returns full HTML per request (static file or template/function).
- Pros: Simple, SEO-ready, minimal JS, great CDN caching.
- Cons: Full page reloads, no persistent elements, perceived latency on every navigation.

Classic SPA (CSR)

- How HTML is delivered: Skeleton HTML; all real HTML built client-side after JS + JSON fetches.
- Pros: Instant in-app route changes; persistent UI; rich client control.
- Cons: Slow first load; many network calls; SEO/metadata pitfalls; can be very JS-heavy.

SSR + Hydration (“Full SSR” SPA)

- How HTML is delivered: Server renders full HTML; client re-executes to attach handlers.
- Pros: Fast first paint; HTML includes data; better sharing/SEO.
- Cons: Hydration gap; double-sent content; some frameworks block nav until data JSON returns.

Isomorphic SSR (Suspense/streaming/server components)

- How HTML is delivered: Server streams HTML for just-changed regions; client shows placeholders immediately.
- Pros: SPA-like immediacy plus HTML-first; less client JS when using server-only components.
- Cons: Needs streaming-capable infra/edge; more moving parts.

MPA-influenced Split Execution (Islands)

- How HTML is delivered: Static page from CDN; a tiny script fetches server-rendered HTML fragments for dynamic islands and injects them.
- Pros: Fast static first paint; minimal client logic; simpler infra than edge streaming; avoids JSON→DOM work for islands.
- Cons: Island fetches begin after static load; coordinating many islands needs discipline.

Partial Pre-Rendering / Edge streaming

- How HTML is delivered: Edge serves cached static shell; server streams the rest.
- Pros: Best perceived performance; good for highly dynamic pages.
- Cons: Requires edge worker + server runtime coordination; platform-specific features.

⸻

If you want, I can turn this into:

- a printable one-pager,
- and a CSV/Markdown table you can drop into docs (including columns for “HTML source,” “data transport,” “hydration needed,” “edge required,” etc.).