---
domain: code
section: design-patterns
chapter: notes
title: "Design Patterns — Teaching Notes"
order: 99
description: "Internal curriculum planning notes — pattern list and teaching guidelines."
chapterLabel: "Notes"
---

# Top 10 Classic Patterns


1. Module
2. Factory
3. Observer
4. Singleton
5. Strategy
6. Decorator


7. Mediator
8. Command
9. Adapter
10. Proxy


# Top Front End Patterns

1. Registry
2. Orchestrator
3. State Machine
4. ???



## Teach Guidelines


Review these patterns and provide any other front end design patterns that could be applicable or are very common.

Overall, I need to create a code challenge walk through for each pattern.

1. First introduce the pattern and show it with basic but implementable code.
2. Next identify 2 code challenges that will solve a problem that implements the design pattern.
3. Create the less in content/code/design-patterns/challenges/*-pattern.md
4. The code challenge should set up a problem with example code and either provide refactoring to a design or explain why the code is bad and how to address with a pattern
5. Offer a hints to teach the pattern step by step, walk me through some ideas on how we could write some hints or psuedo code out the pattern
6. The hints should be obscured or a drop down accordion to prevent scanning ahead when reading
7. Once we are over the hill with hints and have a good idea of imlementing the pattern, then we can actually write out the code
8. We don't have a built in code editor, but I will be following along in a REPL for javascript to write actual working code