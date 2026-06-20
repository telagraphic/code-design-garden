---
domain: code
section: css
chapter: cascade
title: "Cascade"
sectionTitle: "CSS Cascade"
order: 1
description: "CSS Cascade"
chapterLabel: "CSS Cascade"
---




# the cascade

Describes **how CSS decides the final rule to apply** when multiple rules target the same element and property.

It answers: **“Which rule wins overall?”**  
It takes **importance**, **origin**, **specificity**, and **order of appearance** into account — in that order.


One value per property per element to determine the visual styles is what the cascade does.


**Cascade Logic Order**


| Factor       | Priority Level | Example                          |
| ------------ | -------------- | -------------------------------- |
| `!important` | Highest        | `color: red !important;`         |
| Origin       | High           | Author > User > Browser defaults |
| Layers       | Between        | @layer base, layout, utils       |
| Specificity  | Medium         | `#id` > `.class` > `element`     |
| Order        | Lowest         | Last rule in file wins           |


## style computation

https://moderncss.dev/how-custom-property-values-are-computed/

When the browser parses CSS, its goal is to calculate one value per property per element in the DOM.

Something you learn early on about CSS is that you can change a property’s value multiple times from multiple rules that may select the same element.

- _Inherited_ values come from the nearest ancestor that has assigned a value, if the property is [allowed to inherit](https://web.dev/learn/css/inheritance/#which-properties-are-inheritable) (ex. `color`, font properties, `text-align`)
- _Initial_ values are used when no inherited value exists or is allowed and are the values provided by the specification for the property


https://www.matuzo.at/blog/2023/100daysof-day82/


## specificity

Tells **how strong a selector is** — based on how precisely it targets elements.
It answers: **“Which selector is more specific?”**

https://specificity.keegan.st/

**"I**nline **I**D **C**lass **E**lement" IICE mnenomic

| Selector Type                  | Specificity                                       | Notes                                  |
| ------------------------------ | ------------------------------------------------- | -------------------------------------- |
| Inline styles                  | `a = 1`                                           | e.g. `style="..."`                     |
| ID selector                    | `b += 1`                                          | e.g. `#header`                         |
| Class, attribute, pseudo-class | `c += 1`                                          | e.g. `.box`, `[type="text"]`, `:hover` |
| Element, pseudo-element        | `d += 1`                                          | e.g. `div`, `h1`, `::after`            |
| `!important`                   | 🔥 Not counted in specificity — but overrides all |                                        |

| Selector                | Specificity (a,b,c,d) | Total Score |
| ----------------------- | --------------------- | ----------- |
| `div`                   | (0,0,0,1)             | 1           |
| `.menu`                 | (0,0,1,0)             | 10          |
| `#main`                 | (0,1,0,0)             | 100         |
| `section#main .menu h2` | (0,1,1,1)             | 111         |
| `style="color: red"`    | (1,0,0,0)             | 1000        |

## container queries

container queries are component level
media queries are page/screen level

- https://www.youtube.com/watch?v=2rlWBZ17Wes
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
- https://css-tricks.com/css-container-queries/
- [container units](https://www.youtube.com/watch?v=ZSaAHb5dRwQ)
- [container layouts](https://www.youtube.com/watch?v=8x8lxX5IGHY&t=232s)
- [containers talk](https://www.youtube.com/watch?v=-Fw8GSksUIo)
- https://ishadeed.com/article/css-container-query-guide/
- [container queries](https://www.youtube.com/watch?v=DHj7JhH8ins), [link](https://www.youtube.com/watch?v=TxtvkKe20Rs)[link](https://www.youtube.com/watch?v=1CYx7Y_qYKA)


set a range
```css
@media (600px < width < 800px)
```


alternate to min-width:
```css
@media (600px < width)
```


## grid


- https://www.youtube.com/watch?v=VN6l8lit2no
- https://www.youtube.com/watch?v=zW9AQiCTg14
- [subgrid](https://www.youtube.com/watch?v=hkdc_qBgXDc)
- [subgrid and container queries](https://www.youtube.com/watch?v=Zddz_R1RnfM)
- [named grid lines](https://www.youtube.com/watch?v=ciuZJE74wBA)
	- clamp with calc for overlapping elements
- grid-column-start/end https://www.youtube.com/watch?v=Vb9-8uuonAY
- https://www.youtube.com/watch?v=xI9G0Zh5DVA
- https://www.youtube.com/watch?v=v0o1kV-qfVI
- https://www.youtube.com/watch?v=duH4DLq5yoo
- https://www.youtube.com/watch?v=EiNiSFIPIQE&pp=ygUPY3NzIGdyaWQgaG93IHRv
- https://www.youtube.com/shorts/9LdiQ8iX6WQ
- https://www.youtube.com/watch?v=JHregeIsjPQ&pp=ygUPY3NzIGdyaWQgaG93IHRv0gcJCX4JAYcqIYzv
- https://www.youtube.com/watch?v=UQSzWG0aGOA&list=PLqcl38GHd4J8T99id-ZJeQHo38rct3h1U
- [sub-grid](https://www.youtube.com/watch?v=lLnFtK1LNu4)
- https://ishadeed.com/article/css-grid-area/





## layers

- https://12daysofweb.dev/2022/cascade-layers/
- https://css-tricks.com/css-cascade-layers/
- https://brm.us/cascade-layers
- https://developer.chrome.com/blog/cascade-layers/ 
- https://css-tricks.com/css-cascade-layers/


```css
@layer reset, base, properties, layout, components, utilities
```



## layouts

- [10 one line layouts](https://www.youtube.com/watch?v=qm0IfG1GyZU 
- https://ishadeed.com/article/css-logical-properties/
- [every-layout](https://every-layout.dev/)
- [lobotomized owl selector](https://gomakethings.com/modern-layouts-with-css/)



## typography


- utopia.fyi for fluid type and space scales
- https://www.youtube.com/watch?v=9w-BwzcuxYM



## animations

- https://www.youtube.com/watch?v=4oSZzAOpbOw
- https://tympanus.net/codrops/2024/01/17/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/




## every-layout

- [exception based styling](https://every-layout.dev/rudiments/axioms/)
- natural responsiveness

`rem` for block element, `em` for inline elements. `em` will based on the parent `rem` for fluid sizing.

- fluid typography

```
calc(1rem + .5vh) 
```

- logical properties instead of physical properties
- intrinsic (browser algorithms) versus extrinsic (author defined style rules)
- single quantum layout existing in different states versus multiple layouts per each state (mobile, tablet, desktop)
- prefer container based breakpoints over viewport breakpoints



## css components

https://moderncss.dev/modern-css-for-dynamic-component-based-architecture/


- resets
- nesting

Use `:is()` to **flatten nested selector logic** and reduce repetition:

```css
.main-nav a.active,
.main-nav button.active,
.footer-nav a.active,
.footer-nav button.active,
.sidebar-nav a.active,
.sidebar-nav button.active {
  color: white;
  background-color: navy;
}
```
```css
:is(.main-nav, .footer-nav, .sidebar-nav) :is(a, button).active {
  color: white;
  background-color: navy;
}
```


- layers
- theming
	- custom properties
	- [color scheme](https://www.htmhell.dev/adventcalendar/2022/19/)
	- [accent color](https://www.smashingmagazine.com/2021/09/simplifying-form-styles-accent-color/)
- layout
	- grid with: `repeat( auto-fit, minmax(min(100%, var(--layout-grid-min)), 1fr))`
	- flexbox with: `{ flex: 1 1 var(--flex-grid-min);}
- container queries
- style queries
- notes
	- @media (width > 720px)
	- hsl for colors
	- primitives --green-400
	- semantic --section-columns: var(--green-400)