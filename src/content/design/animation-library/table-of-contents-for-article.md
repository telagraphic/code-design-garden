---
title: "Table Of Contents For Article"
description: "Table Of Contents For Article."
slug: "table-of-contents-for-article"
previewVideo: "table-of-contents-for-article.mp4"
order: 49.837
published: true
categories: ["button", "page-transition", "navigation"]
triggers: ["scroll", "hover", "load"]
libraries: ["gsap"]
keywords: ["table", "contents", "article"]
sourceUrl: "https://www.osmo.supply/resource/table-of-contents-for-article"
---
## Setup
### Scripts
```text
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
```
### HTML
```text
<div data-toc-offset="80" data-toc-wrap data-toc-levels="h2,h3" class="toc-layout">
  <aside class="toc-sidebar">
    <p class="toc-hero__label">on this page</p>
    <nav data-toc-list class="toc-list">
      <a data-toc-link data-toc-item data-toc-status="active" href="#" class="toc-link"><span data-toc-text="">Why Motion Matters</span></a>
      <a data-toc-link data-toc-item data-toc-depth="3" href="#" class="toc-link"><span data-toc-text="">The Cost of Afterthought</span></a>
    </nav>
  </aside>
  <div data-toc-content class="toc-article w-richtext">
    <h2>Why Motion Matters</h2>
    <p>Motion is not decoration. At its best, it communicates relationships between elements, guides attention through a layout, and gives users confidence that the interface is responding to their input. A button that snaps to its pressed state feels broken. A button that eases into it feels alive.</p>
    <p>The gap between knowing this and shipping it is enormous. Most teams treat animation as a polish pass, something that happens in the last sprint before launch. By then the DOM structure is locked, the layout is fragile, and there is no time to rethink the transition model. Motion gets bolted on instead of designed in.</p>
    <h3>The Cost of Afterthought</h3>
    <p>When animation arrives late, it tends to fight the layout rather than complement it. Elements jump because their dimensions were never measured. Scroll-linked effects stutter because the rendering pipeline was not considered. Designers hand off beautiful prototypes that assume a world without reflow, repaint, or compositing limits.</p>
    <p>The fix is not more animation. The fix is earlier conversations about how things move, and a shared vocabulary between design and engineering for describing that movement.</p>
    <h2>Principles Worth Defending</h2>
    <p>After building motion systems for dozens of production sites, a few principles have survived contact with reality. None of them are about easing curves.</p>
    <h3>Motion Should Be Invisible</h3>
    <p>The best animation is the one users never consciously notice. It simply makes the interface feel right. If someone compliments your hover transition, it might be too much. If the page feels smooth and nothing draws unearned attention, you have probably nailed it.</p>
    <blockquote><em>The goal is not to impress. The goal is to remove friction between intent and outcome.</em></blockquote>
    <h3>Duration Is a Design Decision</h3>
    <p>There is a persistent myth that faster is always better. In reality, duration communicates importance. A tooltip that takes 400ms to appear feels sluggish. A full-page transition that completes in 100ms feels jarring. The right duration depends on the distance traveled, the size of the element, and the cognitive load of the change.</p>
    <p>A useful heuristic: micro-interactions (buttons, toggles, hover states) should land between 150ms and 250ms. Layout transitions (accordions, tab switches, reveals) work well between 300ms and 600ms. Page-level transitions can stretch to 800ms if they carry enough visual weight.</p>
    <h3>Easing Communicates Physics {skip}</h3>
    <p>This section is excluded from the table of contents via the text marker. The heading text above should not contain the marker.</p>
    <h3>Stagger Creates Rhythm</h3>
    <p>When multiple elements enter the viewport together, staggering their appearance by 40 to 80 milliseconds creates a sense of sequence without feeling slow. The eye reads the group as a composed entrance rather than a simultaneous pop. Too little stagger and it looks like a single flash. Too much and the last item feels forgotten.</p>
    <h2>Scroll-Driven Animation</h2>
    <p>Scroll is the dominant interaction on the web. Tying animation to scroll position lets you create experiences that feel participatory. The user is not watching a video; they are controlling the pace of the narrative. This is a fundamentally different contract than autoplay.</p>
    <h3>Scrub vs. Trigger</h3>
    <p>There are two mental models for scroll animation. Scrubbed animation maps scroll position directly to animation progress, like dragging a playhead. Triggered animation uses scroll position as a signal to start a timeline that plays independently. Most production work is triggered. Scrubbed animation looks spectacular in demos but is surprisingly hard to make feel good at all scroll speeds.</p>
    <h3>Performance Constraints</h3>
    <p>Scroll handlers fire on every frame. Anything you do inside one needs to be fast. Stick to <code>transform</code> and <code>opacity</code>. Avoid properties that trigger layout: <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, <code>margin</code>, <code>padding</code>. If you need to animate dimensions, animate <code>scale</code> and use <code>will-change: transform</code> on the target.</p>
    <p>ScrollTrigger handles most of this for you. It batches reads, defers writes, and integrates with GSAP&#x27;s rendering pipeline. But it cannot save you from animating properties that force the browser to recalculate layout.</p>
    <h2>Working With Webflow</h2>
    <p>Webflow&#x27;s native interactions cover a useful subset of motion design. For everything else, custom code is the escape hatch. The trick is knowing when to reach for it and how to structure that code so it survives the Webflow publish cycle.</p>
    <h3>When Native Interactions Break Down</h3>
    <p>Webflow interactions are timeline-based and element-scoped. They work well for hover states, scroll-triggered reveals, and simple page transitions. They struggle with dynamic content, conditional logic, inter-component communication, and anything that needs to respond to data rather than user input.</p>
    <p>If you find yourself duplicating the same interaction across dozens of elements, or building complex workarounds with invisible trigger elements, that is usually the signal to move to code.</p>
    <h3>Data Attributes as Interface</h3>
    <p>The cleanest pattern for custom code in Webflow is the data attribute interface. Instead of hard-coding selectors or class names, you tag elements with <code>data-*</code> attributes that describe their role. The script discovers these at runtime, reads configuration from attribute values, and initializes behavior automatically.</p>
    <p>This creates a clean boundary: the designer controls the DOM structure and visual design, the developer controls the behavior. Neither needs to coordinate on class names or element IDs. The data attributes become a contract between the two.</p>
    <h2>Colophon</h2>
    <p>This article was written as a test fixture for the Osmo TOC component. The opinions about motion design are real.</p>
    <h2>Further Reading</h2>
    <p>Motion design on the web sits at the intersection of several disciplines. Understanding any one of them deeply makes you better at the rest.</p>
    <ul role="list">
      <li>The GSAP documentation remains the most thorough treatment of web animation fundamentals.</li>
      <li>The Web Animations API specification describes the browser&#x27;s native animation model.</li>
      <li>Material Design&#x27;s motion guidelines offer a useful framework for thinking about duration and easing, even if you do not use Material components.</li>
    </ul>
  </div>
</div>
```
### CSS
```text
.toc-layout {
  grid-column-gap: 4em;
  grid-row-gap: 4em;
  flex-flow: row;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 60em;
  margin-left: auto;
  margin-right: auto;
  padding-left: 4em;
  padding-right: 4em;
  display: flex;
  position: relative;
}
.toc-article {
  flex: 1;
  max-width: 40em;
}
.toc-article h2 {
  letter-spacing: -.01em;
  margin-top: 2em;
  margin-bottom: .75em;
  font-size: 2em;
  font-weight: 500;
  line-height: 1.2;
}
.toc-article p {
  margin-bottom: 1.5em;
  font-size: .9375em;
  line-height: 1.5;
}
.toc-article h3 {
  margin-top: 2em;
  margin-bottom: .75em;
  font-size: 1.25em;
  font-weight: 500;
}
.toc-article blockquote {
  color: #30557a;
  border-left-width: 2px;
  border-left-color: #6961fe;
  font-size: 1.125em;
  font-weight: 400;
  line-height: 1.4;
}
.toc-article code {
  background-color: #dae3ee;
  border-radius: .25em;
  padding: .1em .4em .15em;
  font-family: Haffer Mono, Arial, sans-serif;
  font-size: .9em;
  display: inline-block;
}
.toc-article ul {
  margin-bottom: 0;
  padding-left: 2em;
}
.toc-article li {
  margin-bottom: 1em;
  font-size: .9375em;
  line-height: 1.5;
}
.toc-sidebar {
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 13.75em;
  display: flex;
  position: sticky;
  top: 2.5em;
}
.toc-list {
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  display: flex;
}
.toc-link {
  color: #8898aa;
  border-left: 1px solid #e3e8ee;
  padding: .4rem .5em .4rem 1em;
  font-size: .875em;
  text-decoration: none;
  transition: all .25s;
}
@media screen and (max-width: 767px) {
  .toc-hero {
    padding-left: 2em;
    padding-right: 2em;
  }
  .toc-layout {
    flex-flow: column;
    padding-left: 2em;
    padding-right: 2em;
  }
  .toc-sidebar {
    width: 100%;
    position: relative;
    top: 0;
  }
}
```
### Javascript
```javascript
function initTableOfContents() {
  document.querySelectorAll('[data-toc-wrap]').forEach(root => {
    const contentEl = root.querySelector('[data-toc-content]');
    const listEl = root.querySelector('[data-toc-list]');
    const templateLink = listEl?.querySelector('[data-toc-link]');
    if (!contentEl || !listEl || !templateLink) return;
    const levels = (root.getAttribute('data-toc-levels') || 'h2,h3').split(',').map(l => l.trim().toLowerCase()).filter(l => /^h[1-6]$/.test(l));
    const levelSelector = levels.join(', ');
    if (!levelSelector) return;
    const offset = parseInt(root.getAttribute('data-toc-offset')) || 50;
    const marker = '{skip}';
    const slugCounts = new Map();
    function slugify(text) {
      let slug = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      if (!slug) slug = 'section';
      const count = slugCounts.get(slug) || 0;
      slugCounts.set(slug, count + 1);
      return count === 0 ? slug : slug + '-' + (count + 1);
    }
    function stripMarker(el) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.textContent.includes(marker)) {
          node.textContent = node.textContent.replace(marker, '').trim();
        }
      }
    }
    const allHeadings = Array.from(contentEl.querySelectorAll(levelSelector));
    const headings = [];
    allHeadings.forEach(heading => {
      if (heading.hasAttribute('data-toc-ignore')) return;
      if (heading.textContent.includes(marker)) {
        stripMarker(heading);
        return;
      }
      const text = heading.textContent.trim();
      if (!text) return;
      headings.push(heading);
    });
    if (!headings.length) return;
    headings.forEach(heading => {
      if (!heading.id) {
        heading.id = slugify(heading.textContent.trim());
      }
    });
    const tocLinks = [];
    headings.forEach(heading => {
      const clone = templateLink.cloneNode(true);
      const textTarget = clone.querySelector('[data-toc-text]') || clone;
      textTarget.textContent = heading.textContent.trim();
      clone.href = '#' + heading.id;
      clone.removeAttribute('data-toc-link');
      clone.setAttribute('data-toc-item', '');
      const level = heading.tagName.charAt(1);
      clone.setAttribute('data-toc-depth', level);
      listEl.appendChild(clone);
      tocLinks.push(clone);
    });
    listEl.querySelectorAll('[data-toc-link]').forEach(el => el.remove());
    // Active state tracking via ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      function setActive(index) {
        tocLinks.forEach(link => link.setAttribute('data-toc-status', ''));
        if (tocLinks[index]) tocLinks[index].setAttribute('data-toc-status', 'active');
      }
      headings.forEach((heading, i) => {
        const nextHeading = headings[i + 1];
        ScrollTrigger.create({
          trigger: heading,
          start: 'top ' + (offset + 1) + 'px',
          endTrigger: nextHeading || contentEl,
          end: nextHeading ? 'top ' + (offset + 1) + 'px' : 'bottom top',
          onToggle: self => {
            if (self.isActive) setActive(i);
          }
        });
      });
      if (window.scrollY <= headings[0].getBoundingClientRect().top + window.scrollY - offset) {
        setActive(0);
      }
    }
    // Click handler with smooth scroll
    listEl.addEventListener('click', e => {
      const link = e.target.closest('[data-toc-item]');
      if (!link) return;
      e.preventDefault();
      e.stopPropagation();
      const id = link.getAttribute('href')?.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      if (typeof lenis !== 'undefined' && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(target, { offset: -offset });
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}
// Initialze Table of Contents For Article
document.addEventListener('DOMContentLoaded', () => {
  initTableOfContents();
});
```
### CSS
```text
[data-toc-item][data-toc-status="active"] {
  color: #635bff;
  border-color: #635bff;  
}
[data-toc-item][data-toc-depth="3"] {
  padding-left: 2.5em;
  font-size: .75em;
}
[data-toc-content] h2:first-child {
 margin-top: 0;
 padding-top: 0;
}
```
### iImplementation
#### Wrapper
Place `[data-toc-wrap]` on the element that contains both the article content and the table of contents navigation.
#### Content
The article or rich text element holding the headings is identified with `[data-toc-content]`.
#### List
The navigation container where generated links are placed is marked with `[data-toc-list]`.
#### Link Template
A single anchor element with `[data-toc-link]` inside the list serves as the visual template, cloned once per heading and then removed from the DOM.
#### Text Target
Inside the link template, a child element with `[data-toc-text]` receives the heading text, leaving icons or other elements in the template untouched.
#### Heading Levels
Set `[data-toc-levels]` (default "h2,h3") on the wrapper to control which heading levels are included in the table of contents.
#### Offset
An optional `[data-toc-offset]` (default 50) on the wrapper defines the scroll offset in pixels, useful when a sticky header is present for example.
#### Ignore Attribute
Any heading with `[data-toc-ignore]` is excluded from the generated table of contents.
#### Skip Marker
Typing `{skip}` inside a heading's text excludes it from the table of contents and strips the marker from the visible heading.
#### Depth
Each generated link receives a `[data-toc-depth]` value matching its heading level number, allowing CSS-based indentation for nested sections.
#### Active State
The currently visible section's link receives `[data-toc-status="active"]` as you scroll, tracked automatically via ScrollTrigger.