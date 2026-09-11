---
title: "Claude Code, Paper and Astro Blog"
description: "Exploring the prompt to design to code AI process workflow"
pubDate: 2026-07-01
published: true
---


Working in a print shop really sharpened my eye for mis-aligned typography through the subtleties of kerning, spacing, sizing and font-pairings. I'm always checking posters, signs and designs for these imbalances. I really developed that sense for balance and visual harmony with text.

But I always struggled with composition and layout. Not a trained artist, I never really got grid layout, visual relationship or proportion. 
I would see tons of great designs and many bad layouts at the print shop. I could identify the good and great designs, but not verbalize the principles at play or how to really recreate it for my own projects.

 and the [Obys course on grids](https://des.obys.agency/grids/), which I highly recommend. [@olianishyn](https://x.com/olianishyn), the founder of [obys.agency](https://obys.agency) is an excellent teacher and the idea of using grids for layouts to create compositions made it all click in an intuitive and simply way. 
 

## Design Process

My standard design process was putting together a low fidelity mockup/layout in Figma and "code-designing" the rest of it in the IDE/Browser. This left me in a lurch of making too many design decisions in the browser while trying to code the layout. The context switching between design and code was counter-productive. No formal grid layout, no solid use of design tokens and a loose sense of style and aesthetic led to a slow and time consuming process. I would often get stuck in the [middle of "going up the hill" chart](https://basecamp.com/hill-charts).


The problem was no real design at all. This is obvious in hindsight, but the crutch of using a CSS framework or figuring it out once I had some CSS layout avoided the real task of using the right tool for a design.


After taking several [Awwwards](https://www.awwwards.com/academy/courses/design) courses, I systematized a common design process:

|                  |                                                                                                                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Moodboard(s)** | Screenshots of inspiration for design elements (layout, color, typography, style), using two or mood boards can open up the possibilities for the look/feel                                                                       |
| **Explorations** | Page layouts in Figma and design decisions should have many iterations, playing with fonts/colors and spacing is a process that develops the eye. This is the mockup phase with actual design elements and not just black and white boxes. |
| **Compositions** | Final "rough draft" of an exploration that integrates all the pieces into a page design, this can have variations and should be high fidelity with some strong level of craft and polish                                                                                     |
| **Final Design** | The final page design after the editing process, time to build it                                                                                                                                                                 |



Each of these sections would be a **page** in a Figma file. They reflect the design process for crafting a web page (or any graphic design). The **Mockup** step fits into the **Exploration** step. I noticed that experienced designers either skip this step or lean more heavily in higher fidelity versions. This makes sense to me and the AI design process gets us closer to production ready designs, compressing the traditional process.

## Trying Paper


I learned about [Paper](https://paper.design/) from [Dive Club](https://www.youtube.com/watch?v=Iq87tYS6zjY) and was impressed by Phil Haney's interview and level headed talk about design and AI. There was genuine excitement about AI in design and it was not a vibe-designing shortcut talk. Seeing AI generate layout variations on the canvas caught my eye.

I decided to give the AI hype a shot and signed up for Paper and downloaded the desktop app to get the full experience. I read the docs, watched some youtube videos and found "[A Guide to Claude Code and Paper for Designers](https://x.com/felixleezd/status/2039731306612060186)" by Felix Lee to get me started.


## AI Design Process

The whole design process is changing with AI and the results are good.
The feedback loop between each step I outlined above is much faster using Claude Code with Paper.

I really like the design for [Not A Number](https://www.nan.fyi/) and his [svg.guide](https://www.svg.guide/) course design. And then I found [jakub.kr](https://jakub.kr/) and read all the posts about UI and Interfaces.

I used the the paper snapshot to grab the homepages for each website. Added some additional screenshots from two other websites, and created an art-board with the initial design prompt copied from my Obsidian project file.

The process goes like this:

1. **Paper** snapshot for moodboarding and exploration
2. Iterate via **Claude** and **Paper** for variations
3. **Paper** to **Cursor** to code the final composition
4. **Cursor** to fine tune the details and edge cases

### The first prompt

```text
I need to build a fresh and modern design layout
for a "code-design-guide" website which will
be a site for my notes,
learnings, and how to guides for coding,
designing, ai skills and prompts, and tools that I built.
This means the site is composed of 4 sections that 
should span the full height and width of the current browser:

1. code
2. design
3. ai
4. tools

I have provided a paper file that contains 
design and layout inspiration to create 
some design prototypes.
I've also included a component and tokens 
for the design components that will be used and the
color schema which is a monotone black-white theme.

Please create 2 design ideas that closely 
follow the provided inspiration and 
content filler for your processing.

Are you able to use the fonts 
I've included in this repository? 
If so, please use them or find a suitable close alternative.
```


<figure class="prose-image">
  <img src="https://code-design-garden.b-cdn.net/paper-blog-1.avif" alt="12-column grid with vertical sections" width="1440" height="900" loading="lazy" decoding="async" />
  <figcaption>Paper file setup for the design prompt process</figcaption>
</figure>


### The second prompt


```text
I have added artboard "Content Page" and "Landing Page".
The landing page is where you visit after 
you click on link from the home page — 
see artboard "Prototype 1 — Variant 2".

Prototype a design for both "Content Page" 
and "Landing Page"
that fits with our Prototypes that we 
just created today.

The "Landing Page" should use the same 
content but follow the styles
of the "Prototype 1 — Variant 2" when 
listing out the table of contents.


Use #F9F9F9 for the page background.
Use "Editorial New" for all top level 
headers or h1's to emphasize the chapter section.
Use Basier Circle for the body copy 
and side navigation.
Use Maple Mono for any syntax higlighting 
code blocks in the code block or inlined 
syntax highlighting in the body copy itself.

Please create components for the:

- side navigation
- code blocks
- tables
- checklists
- body links

```


<figure class="prose-image">
  <img src="https://code-design-garden.b-cdn.net/paper-blog-2.avif" alt="12-column grid with vertical sections" width="1440" height="900" loading="lazy" decoding="async" />
  <figcaption>Paper designer layout and style variations</figcaption>
</figure>

I went with the last column design and used a nice serif font.

## Design to Code

Once I got a solid design after two prompts, I used the **Paper MCP** with **Cursor** to build the skeleton pages. The first pass created lots of slop code. It looked the part, but I couldn't unsee the slop code. I was missing:

- design tokens for spacing, typography, colors
- css layers, component and utility classes
- file organization

The AI "prompt to design to code to working site" taught me that detailed prompts do require domain knowledge and explicit instructions to steer the AI.

I was familiar with skills, but this was one of those cowboy projects to see "what happens". This taught me the value of:

- applying skills for code quality and best practices
- seeing how AI has it's own idea of what you ask it without a plan in place
- what kind of plans AI generates
- the reality of "vibe-ish" coding: it works but is it maintainable?




<figure class="prose-image">
  <img src="https://code-design-garden.b-cdn.net/paper-blog-3.avif" alt="12-column grid with vertical sections" width="1440" height="900" loading="lazy" decoding="async" />
  <figcaption>Final blog design</figcaption>
</figure>

I spent a couple of hours each day for a week tweaking the design, refactoring the code to use components and adding features like `cmd+k` for search, adding `barba.js` and page transitions, and migrating a giant library of learning material from my obsidian vault.

I was not building a **React.js** app or using **Tailwind.css** which Paper is built natively on. I was using Astro and vanilla JS and no CSS framework.

## Enter AI Hero

Then I watched [Matt Pococks short clip](https://www.youtube.com/watch?v=v4F1gFy-hqg&t=4s) from this [full presentation](https://www.youtube.com/watch?v=-QFHIoCo-Ko&t=1433s). It was the best talk about AI I had seen that finally made AI development click. His `/grill-me` and now `/grill-with-docs` made so much sense and tapped into the full power of AI. That alone changed my AI coding approach. It's akin to realizing you are only using 5% of your brain when you could be using 50%.

I find AI can be a great pairing partner to teach you, but I hadn't discovered the patterns to optimize that.

After cleaning up the codebase, I went through the `/grill-me` process for adding a blog post feature. This is my new standard for starting projects and adding features. The back and forth question process was miles ahead of just asking cursor for a plan. It got that mental flow going that is not present with just "prompting and hoping".

The blog post plan generated by the `/grill-me` skill covered more edge cases, went further in-depth with code implementation details and provided a much richer requirements spec. And when I implemented it, I only had to make minor design tweaks. 

## Crafting A Prompt Process

Similar to the design process table above, I've listed out a **design to code** process:

|                         |                                                                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Design**              | The standard design process now with agents, prompts and manual design before going to code                                                               |
| **Tokens**              | A design audit for tokens (primitives, semantic, components)                                                                                              |
| **Components & Styles** | A component inventory using a BEM scheme derived from the layer names in Paper/Figma. <br>Utility classes and other helper classes that might be needed   |
| **Naming**              | A consistent naming scheme for pages, sections, components for design and code consistency                                                                |
| **Audit & Document**    | A final review of the design to code plan to identify missed spots and document the design system in another artboard/page or markdown file               |
| **Plan**                | A phase based plan broken into issues that is generated from a `/to-plan` or `/grill-me` skill to ensure the code to design process is captured correctly |

Creating skills that encode these practices streamlines the overall process and can be tailored to your personal style and work patterns. I often review the [design.md](https://github.com/google-labs-code/design.md) spec to update my process. Yes, you can ask AI to create this artifact for you, but I wanted to go through the process to see how it works.

I've watched [Ridd use Conductor](https://www.youtube.com/watch?v=zmxn4a2g0Ww) with Claude and Paper to generate designs and copy to code. It's next level. Code debt is real and with the reality of token budgets and costs, why not optimize this process by taking the time to ensure code quality? Or will AI get so good it will just "figure it out"? It only takes a thoughtful skill file to clean up slop and produce cleaner code.

Setting up your skills for a front end project should be optimized for the context window and **progressive disclosure**. You don't want to be unnecessarily burning tokens by including skill files that don't apply to the prompt at hand. Crafting well structured agent skill files gives the agent the responsibility for using it when needed. This is where the human judgement can make the difference per project and codebase.

## The BRIEF Framework

I recently just learned about the BRIEF framework, which is a much better structured approach for a design project. Taken straight from Google AI:

| step             | description                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **B**ackground   | Define the context (e.g., "We are building an expense-tracking web app for freelancers.")                                        |
| **R**ole         | Tell the AI its persona (e.g., "Act as an expert UX/UI designer.")                                                               |
| **I**nstructions | Exactly what to generate on the canvas (e.g., "Generate a responsive 3-column dashboard layout.")                                |
| **E**xpectations | Define constraints (e.g., "Use the 'flex' layout, follow our existing design system, and prioritize accessibility.")             |
| **F**ormat       | Specify how the AI should handle the output (e.g., "Generate 3 variations as editable frames side-by-side on the Paper canvas.") |


Good prompts take into account how LLM's work under the hood and providing a more structured prompt requires redirecting your efforts from doing the work to defining the work. It's a mind shift that takes time.


## Take-aways


- Solid design process before going to code
- Use a design prompt framework (BRIEF or other) for layout and style variations
- Use design.md and custom skills to ensure best code practices for maintainable code
- Plan and define the work with `/grill-me`, break into phases with issues for queue based workflows
- Using AI as a back and forth Q&A generates richer plans and feature requirements
- Use AI to refine existing skills and create new ones for repeated processes



And some helpful links worth checking out:

- [r/paperdesign](https://www.reddit.com/r/paperdesign/)
- [paper youtube channel](https://www.youtube.com/@paperdesign)
- [BRIEF prompt article](https://medium.com/glennonai/building-your-first-ai-agent-a-brief-explainer-443bd4db8c7e)
- [Matt Pocock Skills](https://github.com/mattpocock/skills)



