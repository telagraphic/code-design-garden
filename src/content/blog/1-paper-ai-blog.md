---
title: "Claude Code, Paper and Astro Blog"
description: "Exploring the prompt to design to code AI process workflow"
pubDate: 2026-07-01
published: true
---




I built this blog using Paper and Claude to mock out a design from a couple websites I like and built in Astro. I wanted a basic simple blog and not a fancy portfolio site. Designing my site just didn't have the same hit as the other projects I had in the works.

Here are some patterns that I found helpful from prompt to design and design to code workflows.


## Design Process

I've taken several [Awwwards](https://www.awwwards.com/academy/courses/design) courses and the [Obys course on grids](https://des.obys.agency/grids/). I've learned so much about the design process.

Some common patterns to generate an original web design:

1. **moodboard** inspiration for design elements: layout, color, typography, style
2. **explorations** to iterate many design variations, more than you think you should
3. **compositions** for a solid rough draft page design
4. **final** page design for handoff to developer

Each of these section would be a Page in a Figma file. They reflect the design process for crafting a web page (or any graphic design).

## Trying Paper

I really liked [Not A Number](https://www.nan.fyi/) and his [svg.guide](https://www.svg.guide/) course design. And then I found [jakub.kr](https://jakub.kr/) and read all the posts about UI and Interfaces.
I learned about [Paper](https://paper.design/) from [Dive Club](https://www.youtube.com/watch?v=Iq87tYS6zjY) and was impressed by Phil Haney's interview and level headed talk about design and AI. 

This project was my introduction to AI design with Paper and Claude. It's kinda weird to start with a prompt but the results were solid enough. Does reality meet the hype? I read the paper docs, watched some youtube videos and found this post [A Guide to Claude Code and Paper for Designers](https://x.com/felixleezd/status/2039731306612060186) by Felix Lee.

I used the the paper snapshot to grab the homepages for each website.

1. Used paper's snapshot to grab the homepages for each website
2. Added some screenshots from a react guide I had vibe coded previously
3. Created an art-board with the prompt, copied from my Obsidian markdown project file

I did sign up for Paper and used the desktop app for this project to get the full experience.



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

I went with the last column design and updated the main serif font in the next step.



## Design to Code

Once I got a solid design after two prompts, I used the **Paper MCP** to build the skeleton pages. I made sure we used design tokens, css layers and component based rules before telling the 

The first pass created lots of slop code. It worked, but I noticed that making updates just seemed a bit cumbersome. I was missing:

- design tokens for spacing, typography, colors
- css layers, component and utility classes
- file organization

This AI prompt to design to code to working site taught me that detailed prompts do require domain knowledge and explicit instructions that an experienced developer can word for the AI to follow.
I know about skills, but this was on of those cowboy projects to see what happens without best practices. This taught me the value of:

- skills for code quality and best practices
- seeing how AI has it's own idea of what you ask it
- the reality of "vibe-ish" coding: it works but is it maintainable?

I was not building **React.js** app or using **Tailwind.css** which Paper is built natively on.
This means the design to code workflow is one to one, which is really cool.
Another win for the Paper to Code workflow.

But I was using Astro and vanilla JS and my own styles. I should have spent more time thinking about the design to code process.
A step I would include next time is making sure the AI can visually map the design components to the code.
A simple table of components that informs the AI would have saved a refactoring round if it was done in the first pass.


<figure class="prose-image">
  <img src="https://code-design-garden.b-cdn.net/paper-blog-3.avif" alt="12-column grid with vertical sections" width="1440" height="900" loading="lazy" decoding="async" />
  <figcaption>Final blog design</figcaption>
</figure>



## Enter AI Hero

I spent a couple of hours each day for a week tweaking the design, refactoring the code to use components and adding features like `cmd+k` for search, barba.js and page transitions, a giant library of learning material from my obsidian vault.

Then I watched [Matt Pococks short clip](https://www.youtube.com/watch?v=v4F1gFy-hqg&t=4s) from this [full presentation](https://www.youtube.com/watch?v=-QFHIoCo-Ko&t=1433s). It was the best talk about AI I have seen that finally clicked. His `/grill-me` and now `/grill-with-docs` made so much sense and tapped into the full power of AI. That alone changed my approach my AI coding.

It's akin to realizing you are only using 5% of your brain when you could be using 50%.

After cleaning up the codebase, I went through the `/grill-me` process for adding blogs. This is my new standard for starting projects and adding features. The questions and suggestions for how to handle edge cases and how the blog should work with the existing code were miles ahead of just asking cursor for a plan.

The blog post feature plan was covered more edge cases, went further in-depth with code implementation and provided a much richer requirements spec. And when I implemented it, I only had to make minor design tweaks. Adding a video and image component was a smoother process as well.

## The BRIEF Framework

I recently just learned about the BRIEF framework, which is a much better structured approach for a design project.

| step             | description                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **B**ackground   | Define the context (e.g., "We are building an expense-tracking web app for freelancers.")                                        |
| **R**ole         | Tell the AI its persona (e.g., "Act as an expert UX/UI designer.")                                                               |
| **I**nstructions | Exactly what to generate on the canvas (e.g., "Generate a responsive 3-column dashboard layout.")                                |
| **E**xpectations | Define constraints (e.g., "Use the 'flex' layout, follow our existing design system, and prioritize accessibility.")             |
| **F**ormat       | Specify how the AI should handle the output (e.g., "Generate 3 variations as editable frames side-by-side on the Paper canvas.") |


Good prompts take into account how LLM's work under the hood and providing a more structured prompt requires redirecting your efforts from doing the work to defining the work. It's a mind shift that takes time.

## The Take Aways

1. Manual research for mood boards and site inspiration
2. Use Claude Code with Paper for **faster** design explorations and layout variations
3. Use the **BRIEF** framework or some other design structure for Claude Code prompting
4. Use Paper MCP with Cursor to code the Paper design and pair with a skill to code the design with best practices instead of cleaning up after the first pass
5. Use `/grill-me` skill for feature development and starting new projects


And some helpful links worth checking out:

- [r/paperdesign](https://www.reddit.com/r/paperdesign/)
- [paper youtube channel](https://www.youtube.com/@paperdesign)
- [BRIEF prompt article](https://medium.com/glennonai/building-your-first-ai-agent-a-brief-explainer-443bd4db8c7e)
- [Matt Pocock Skills](https://github.com/mattpocock/skills)



