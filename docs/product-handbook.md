# Avenra UI Product Handbook

This document is the single-file product handbook for Avenra UI.

Its purpose is to collect the must-have product documentation in one place so the project can be understood, evaluated, and extended without relying on scattered notes.

It is not a replacement for component-level docs or tests. It is the top-level product document.

---

## 1. Product Definition

Avenra UI is a React-first component library and design-system workspace aimed at the top tier of product-grade UI libraries.

The goal is not to assemble a loose set of demo widgets. The goal is to build a public package that teams can adopt as a durable interface foundation for real products.

### Product target

Avenra UI is trying to become:

- a serious public React UI package
- a design-system platform with clear support governance
- a library whose docs, APIs, and component groups evolve together
- a product that can grow from foundation primitives into heavier product surfaces without losing coherence

---

## 2. Why Avenra UI Exists

Avenra UI is not trying to win by transplanting another ecosystem's mental model into React.

It is trying to win on a different combination of strengths:

- React-first APIs
- explicit stable versus experimental support governance
- design-system depth that can expand without rewriting the package shape
- docs that explain adoption boundaries honestly
- expansion driven by high-frequency product interfaces before random component-count inflation

---

## 3. Current Product Position

Avenra UI is in the foundation-building phase of a serious public library.

### What is true today

- the repository has a real `@avenra/ui` package boundary
- a documented first wave of foundation components exists
- docs and Storybook both exist as product-facing support surfaces
- tokens and themes already exist as the styling foundation
- stable and experimental surfaces are explicitly documented

### What is not being claimed yet

- full Element-class breadth across every enterprise pattern
- a finished public theming platform with every override surface documented
- mature data-heavy components across the whole enterprise matrix
- final API guarantees for every exported component

The goal is not to overstate maturity. The goal is to make the current support contract explicit while continuing to expand the product deliberately.

---

## 3.1 Success Criteria

Avenra UI should not judge success by component count alone.

Success means:

- teams can adopt the stable surface and ship real product screens
- docs, previews, tests, and exports describe the same product truth
- component groups feel coherent instead of isolated
- the product expands in ways that compound value rather than create a larger but blurrier matrix

---

## 4. Product Principles

### 4.1 React first

Avenra UI should feel native to modern React usage.

That means:

- controlled and uncontrolled patterns should be intentional
- composition should be preferred over rigid framework-style APIs
- field and overlay interactions should respect real React application environments

### 4.2 Support clarity over vague breadth

Exported does not automatically mean equally stable.

The library should distinguish clearly between:

- stable
- experimental / in-progress

### 4.3 Component groups over isolated wins

The library should optimize around coherent groups:

- form and field primitives
- selection and search
- overlay and feedback
- date entry
- data display

### 4.4 Documentation is part of the product

Docs are not a trailing artifact.

They should explain:

- what a component does
- when it should be used
- when a nearby component is the better choice
- what support level the component currently has

### 4.5 Design-system depth before surface inflation

Tokens, themes, state semantics, and group consistency should improve alongside component breadth.

### 4.6 Honest maturity signals

It is better to present:

- a credible support contract
- a clear product direction
- real documentation

than to imply a complete matrix that does not yet exist.

---

## 4.1 Competitive Stance

Avenra UI is not trying to outcompete mature React libraries by claiming the broadest matrix today.

It is trying to become competitive by being stronger in the places where long-lived product teams feel pain:

- React-native API decisions
- support governance clarity
- coherent component-group expansion
- explicit adoption guidance
- stronger alignment between docs, previews, tests, and exports

---

## 5. Support Policy

### Stable

A component is stable when it is part of the current formal support contract.

That generally implies:

- the component has a documented public role
- docs and examples are expected to reflect current usage accurately
- the API is not expected to change casually
- the component is suitable as a production baseline for adopters using the current stable surface

### Experimental / in-progress

A component is experimental / in-progress when it is already useful and public, but the contract is still tightening.

That generally implies:

- the component is exported and documented
- the component is part of the visible product direction
- the API, behavior, or support expectations may still move more aggressively than stable components

### Promotion criteria

A component should move toward stable only when the following are credible:

- the usage boundary is clear
- the docs explain when and why to use it
- the public API is coherent
- examples and previews reflect intended usage
- tests cover the important interaction contract
- the component fits cleanly into the wider product system

---

## 6. Adoption Guidance

There are currently two practical ways to adopt Avenra UI.

### 6.1 Stable-surface adoption

Use the current stable surface as the formal support contract for production interfaces.

Recommended for:

- teams that want lower change risk
- teams introducing Avenra UI into an existing codebase
- teams that need a predictable component baseline first

### 6.2 Foundation-plus-evaluation adoption

Adopt the stable surface in production, while evaluating selected experimental components behind controlled internal usage.

Recommended for:

- teams building close to the current expansion direction
- teams willing to absorb some API movement in exchange for earlier access to higher-value components

### 6.3 Good adoption patterns

- build production pages on the stable surface first
- use documented field and overlay contracts consistently
- evaluate experimental components in scoped flows before broad rollout
- keep wrapper layers thin if the team expects to absorb fast-moving improvements

### 6.4 Bad adoption patterns

- treating every exported component as equally final
- depending on undocumented behavior from experimental components
- skipping the stable / experimental split when planning production rollout
- assuming the current matrix already covers every enterprise-heavy pattern

---

## 7. Adoption Checklist

Use this checklist before broad adoption.

### Support fit

- Are the components you need currently in the stable surface?
- If not, is your team comfortable depending on experimental components?
- Do you understand the difference between exported and formally stable?

### Product-surface fit

- Does the current surface cover your immediate high-frequency screens?
- Are you mainly using foundational product interfaces instead of requiring a full heavy enterprise matrix today?

### Design-system fit

- Do tokens and themes align with your customization expectations?
- Are you comfortable starting from the current documented theming boundary?

### Engineering fit

- Can your team absorb an actively improving product surface?
- Do you value explicit support governance and docs alignment over a larger but blurrier matrix?

---

## 8. Component Landscape

### Actions and navigation

- `Button`
- `IconButton`
- `Breadcrumb`
- `Tabs`
- `Pagination`
- `DropdownMenu`

### Forms and field shells

- `Form`
- `FormField`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Radio`
- `Switch`

### Search and selection

- `Combobox`
- `Autocomplete`
- `Command`
- `FilterBar`
- `TagInput`
- `MultiSelect`

### Date input

- `DatePicker`
- `DateRangePicker`

### Data display

- `Table`
- `DataGrid`

### Overlay surfaces

- `Dialog`
- `Drawer`
- `Popover`
- `Tooltip`

### Feedback and status

- `Alert`
- `Toast`
- `Progress`
- `EmptyState`
- `Skeleton`
- `Badge`

### Layout and display

- `Card`
- `Inline`
- `Stack`
- `Avatar`

---

## 9. Current Support Snapshot

### Stable

The current stable support surface is:

- `Alert`
- `Avatar`
- `Badge`
- `Breadcrumb`
- `Button`
- `Card`
- `Checkbox`
- `Dialog`
- `EmptyState`
- `IconButton`
- `Inline`
- `Input`
- `Popover`
- `Progress`
- `Radio`
- `Select`
- `Stack`
- `Switch`
- `Table`
- `Tabs`
- `Textarea`
- `Tooltip`

### Experimental / in-progress

The current experimental surface is:

- `Autocomplete`
- `Cascader`
- `Combobox`
- `Command`
- `DataGrid`
- `DatePicker`
- `DateRangePicker`
- `Drawer`
- `DropdownMenu`
- `FilterBar`
- `Form`
- `FormField`
- `MultiSelect`
- `Pagination`
- `Skeleton`
- `TagInput`
- `Tree`
- `Toast`
- `Upload`

This snapshot exists so a reader can understand the current support contract in one place without cross-reading multiple files first.

---

## 10. Current Higher-Value Expansion Wave

Beyond the first foundation surface, Avenra UI now also includes these higher-value product lines:

- `TagInput`
- `MultiSelect`
- `DatePicker`
- `DateRangePicker`
- `FilterBar`
- `Table`
- `DataGrid`
- `Upload`
- `Tree`
- `Cascader`

These lines matter because they push the product beyond primitives and into real workflow-building territory.

---

## 11. Form Experience Contract

The current form contract is built around three layers:

1. `Form`
2. `FormField`
3. the concrete field control

### Form

`Form` keeps the native `<form>` element and preserves browser form semantics.

### FormField

`FormField` is the shared field shell responsible for:

- visible field label
- hint text
- error text
- required semantics
- invalid state
- disabled semantics
- shared accessibility ids and descriptions

### Concrete field controls

Text and selection fields can own the shell directly or inherit it from `FormField`:

- `Input`
- `Select`
- `Textarea`
- `Combobox`
- `Autocomplete`
- `DatePicker`
- `DateRangePicker`
- `MultiSelect`
- `TagInput`

Choice controls keep their own visible label and should use `FormField layout="control"` when shared hint or error messaging is needed:

- `Checkbox`
- `Radio`
- `Switch`

---

## 12. Selection Component Guidance

### Select

Use `Select` when:

- the option set is small
- labels are stable
- native browser select behavior is acceptable
- the user does not need search

### Combobox

Use `Combobox` when:

- the user needs a single selected value
- the list should be searchable
- the interaction still belongs to a field-shaped form control

### Autocomplete

Use `Autocomplete` when:

- query text should progressively reveal suggestions
- results should not appear until enough signal exists
- the user is typing toward a suggestion rather than browsing a complete list

### MultiSelect

Use `MultiSelect` when:

- the user needs multiple chosen values
- the selection space is structured
- search and chip-like selected values both matter

### TagInput

Use `TagInput` when:

- values are multi-item
- tokenized entry is useful
- the user may add values quickly through input-style interaction

### Checkbox / Radio / Switch

- `Checkbox` = independent yes/no items inside a set
- `Radio` = one of several visible options
- `Switch` = immediate setting toggle

---

## 13. Date Input Guidance

Date input is a product-critical surface.

### Current state

The public date-entry direction includes:

- `DatePicker`
- `DateRangePicker`

### Product direction

Date input should behave like part of the Avenra form system, not like a disconnected widget.

The line should grow carefully:

1. stable single-date entry
2. credible range selection
3. richer date and scheduling interactions after the base is stable

---

## 14. Product Patterns

Avenra UI is trying to support real product patterns, not isolated widget demos.

### Forms with one clear field contract

- labels, hints, and errors are consistent
- text, selection, date, and choice fields feel like one system

### Search and selection flows

- users search through structured options
- single-value and multi-value selection are clearly separated
- tokenized and suggestion-based entry are available when appropriate
- grouped page-level filters can be expressed as one coherent workflow instead of scattered standalone controls

### Overlay-assisted workflows

- dialogs handle blocking confirmations
- drawers handle wider contextual tasks
- popovers and menus handle lighter contextual actions
- toasts and alerts communicate outcomes clearly

### Date-driven workflows

- single-date entry is part of normal forms
- range-based selection can grow from the same product language

### Data-display growth

- `Table` and `DataGrid` should grow as real product surfaces
- loading, empty, and feedback states should align with the rest of the system

---

## 15. Current Product Direction

### Completed foundation lines

The repository has already established meaningful lines such as:

- foundation component wave
- docs adoption entrypoints
- stable surface governance
- form experience hardening
- selection consistency polish
- overlay and feedback polish
- documentation reliability hardening
- high-frequency input expansion through `TagInput`, `MultiSelect`, `DatePicker`, and `DateRangePicker`
- grouped filtering workflows through `FilterBar`
- stronger workflow and structure surfaces through `Upload`, `Tree`, and `Cascader`
- stronger data-display capability through `Table` and `DataGrid`

### Current expansion philosophy

Avenra UI is prioritizing:

1. high-frequency product interfaces
2. clear support governance
3. documentation that keeps pace with the package
4. coherent component groups instead of isolated one-off wins

### What the product is deliberately not optimizing for

- the biggest possible component list in the shortest time
- ambiguous maturity signals
- heavy enterprise claims before the product can support them credibly
- disconnected one-off widget wins

### Near-term direction

- deepen high-value input surfaces
- continue making current groups feel product-grade
- grow toward stronger data-display depth
- expand only when the current line has real docs, tests, and support clarity

### Practical roadmap shape

#### Now

- strengthen high-frequency input and workflow groups
- keep support governance and docs aligned with the real surface
- improve coherence before broad matrix inflation

#### Next

- deepen the new `DataGrid` surface beyond the current baseline
- continue strengthening workflow and structure surfaces such as `Upload`, `Tree`, and `Cascader`
- deepen date and selection surfaces where they improve real product use

#### Later

- move further into heavier enterprise patterns only when the system can support them credibly

---

## 16. What This Handbook Is For

This handbook is the must-have product document for Avenra UI.

If someone wants to understand:

- what the product is
- what it supports
- how to adopt it
- how components are grouped
- how support levels work
- where the product is headed

this file should be the first place they can read.

---

## 17. Current Product Areas

The current Avenra UI surface now spans these product areas:

- foundation actions and navigation
- form and field primitives
- search and selection
- date input
- overlay and feedback
- data display
- workflow surfaces such as upload
- structural selection surfaces such as tree and cascader

This matters because the product is no longer only a primitive foundation set. It is already expanding into the kind of surface area that real application teams expect from a serious UI platform.

---

## 18. Current Reality

The current Avenra UI reality is:

- the stable surface is real and usable
- the experimental surface is real and intentionally governed
- the product already extends beyond the earliest primitive wave
- higher-value workflow and data-display entry points are already present
- the matrix is still expanding, but it is expanding from a meaningfully stronger base than a typical early-stage component package

That is the current product truth this documentation should continue to express.

---

## 19. Who The Product Is For

Avenra UI is currently best suited to:

- React product teams that want a coherent UI foundation
- teams that value support-governance clarity
- teams that prefer a product system over a grab bag of unrelated widgets
- teams willing to adopt a library that is already useful while still actively expanding

It is not yet the right default fit for teams that require:

- a completely mature enterprise matrix today
- zero movement outside the stable contract
- full breadth parity with the broadest long-established UI suites

---

## 20. Quality Bar For New Lines

Avenra UI should not treat a new line as meaningful product progress until the following are in place:

- a coherent public API
- documentation that explains intended usage
- previews that reflect the real product shape
- tests that cover important interaction behavior
- styling that fits the current system
- a clear support-level expression

This quality bar exists to prevent matrix inflation without product credibility.

---

## 21. What Makes The Product Different

The current differentiation is not “the largest matrix today.”

The current differentiation is:

- explicit support governance
- group-level product coherence
- React-first usage boundaries
- documentation that tries to explain real adoption decisions
- a quality bar that expects new lines to land as product work, not as isolated demos

This is the current bet: coherence and honesty can become a real competitive advantage.

---

## 22. What Comes Next

The next meaningful gains should come from:

- deeper data-display capability
- stronger workflow-oriented components
- continued reinforcement of support governance and product documentation

The product should expand in ways that increase usefulness without reducing clarity.
