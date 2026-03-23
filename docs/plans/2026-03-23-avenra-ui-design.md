# Avenra UI Product And Architecture Design

## Product Intent

Avenra UI is intended to become a publicly released React npm UI component library with the product completeness of Element UI / Element Plus class libraries, but built for the React ecosystem rather than Vue.

It should grow as a three-layer product:

1. Design system core
   - tokens
   - themes
   - semantic styling contract
   - accessibility baseline
   - icon system

2. React component platform
   - primitives
   - navigation
   - overlay
   - feedback
   - forms
   - data display
   - high-frequency business widgets

3. Developer experience surface
   - public docs site
   - Storybook
   - installation and migration guides
   - examples
   - release notes
   - stable and experimental component policy

## Product Positioning

### Target Users

- product teams building React applications that need a consistent UI foundation
- engineering teams that want publishable, typed, themeable components instead of ad hoc internal UI code
- teams using Next.js, Vite, and modern React who expect predictable controlled APIs and clear styling hooks

### Market Position

Avenra UI should compete as a React-first product in the same strategic tier as complete UI libraries, not as a utility wrapper around a few primitives. The comparison point is not just component count, but whether a team can standardize a product surface on the library and keep shipping for years.

### What "Better Than Element-Class Libraries" Means Here

Avenra UI should exceed common pain points around:

- React-native API design instead of framework-ported mental models
- more predictable theming and style overrides
- better documentation for real product usage, not only demos
- stronger stable versus experimental boundaries
- modern React and Next.js support as a first-class concern

## Product Principles

1. React first.
   Component APIs should match React expectations around controlled state, composition, render flow, and SSR boundaries.

2. Platform quality over patch growth.
   New components are valuable only when package exports, docs, tests, theming, and accessibility move with them.

3. Stable styling contract.
   Consumers should be able to theme and override components through intentional CSS variables, data attributes, and documented selectors rather than brittle overrides.

4. Accessibility at design time.
   Keyboard behavior, focus order, ARIA semantics, reduced-motion support, and color contrast should be part of component definition, not cleanup work after shipping.

5. Documentation is part of the product.
   A component is not complete if it lacks usage guidance, anti-pattern guidance, accessibility notes, and theming instructions.

6. Heavy components are planned, not accidental.
   The architecture for overlays, form state, selection logic, portals, layering, and tokens should prepare for complex widgets like Table, DatePicker, Upload, and Tree.

7. Default visuals must be production-usable.
   The library should ship with a coherent brand and interaction quality that teams can adopt immediately, while still supporting customization.

## Non-Goals For The Current Phase

- building a Vue version or multi-framework adapter
- chasing maximum component count before public library fundamentals are stable
- shipping enterprise-heavy widgets before the package and release pipeline are trustworthy
- hiding incomplete areas behind marketing language

## Current Reality Check

The repository already has a meaningful first wave of components and a usable docs structure, but it is still below public-library readiness.

The main gaps visible today are:

- `@avenra/ui` is still a private source package rather than a publishable package
- the package build only emits declarations instead of complete distributable outputs
- root verification is not fully green and stable
- docs and Storybook quality gates are not yet first-class release blockers
- package exports, docs coverage, and in-progress components are not fully synchronized

The correct strategy is not "add more components first". The correct strategy is "finish the public-library foundation, then scale component breadth on top of that foundation".

## Architecture Direction

### Monorepo Roles

- `apps/docs`
  Public documentation site, installation guides, component reference, theming docs, and positioning pages.

- `apps/storybook`
  Isolated component preview, visual sanity surface, and story-driven variant coverage.

- `packages/ui`
  Public React component package and style entry points.

- `packages/tokens`
  Raw and semantic token definitions exposed as TypeScript and CSS variable contracts.

- `packages/themes`
  Theme presets and theme composition layer built on top of tokens.

- `packages/icons`
  Shared icon exports and icon authoring rules.

- `packages/utils`
  Shared hooks, helpers, and low-level utilities that should not leak app-specific assumptions.

### Package Design Requirements

Public packages should eventually expose:

- stable `exports`
- `dist` outputs
- typed public APIs
- CSS entry points
- documented compatibility and peer dependency boundaries

For `@avenra/ui` specifically, the minimum publishable contract should include:

- `@avenra/ui`
- `@avenra/ui/styles.css`
- stable component exports only
- no requirement for consumers to import from `src/`

### Styling Model

The styling system should use a layered contract:

1. raw tokens
2. semantic tokens
3. component tokens

This structure is critical if Avenra UI is going to exceed common pain points around theming and override complexity.

### State Model

For React components, the default expectation should be:

- controlled APIs for complex components
- optional uncontrolled convenience only where it is safe
- explicit events and naming consistency across the library

Examples:

- `open` / `defaultOpen` / `onOpenChange`
- `value` / `defaultValue` / `onValueChange`
- `currentPage` / `onPageChange`

## Component Product Matrix

### Layer 0: Foundation

- Button
- IconButton
- Input
- Textarea
- Checkbox
- Radio
- Switch
- Select
- Badge
- Card
- Alert
- Avatar
- Skeleton
- Progress
- Stack
- Inline

### Layer 1: Structure And Overlay

- Dialog
- Drawer
- Popover
- Tooltip
- DropdownMenu
- Tabs
- Breadcrumb
- EmptyState
- Toast
- Pagination

### Layer 2: High-Frequency Product Components

- Form
- FormField
- Combobox
- Autocomplete
- Command
- Calendar
- DatePicker
- Upload
- Steps
- Table
- TagInput

### Layer 3: Heavy Platform Components

- Tree
- TreeSelect
- Cascader
- DataGrid
- Virtualized list and table primitives

## Documentation Design

Each component page should consistently answer:

- when to use it
- when not to use it
- basic example
- controlled example
- states and variants
- accessibility behavior
- theming hooks
- API reference
- common mistakes

The docs site should also contain dedicated sections for:

- installation
- styling and CSS imports
- Next.js and Vite usage
- SSR notes
- tokens and themes
- migration guides
- release policy
- stable versus experimental component policy

## Quality Bar

Public release readiness requires all of the following:

- root `build`, `test`, and `typecheck` are stable and repeatable
- Storybook build succeeds
- docs build succeeds
- `@avenra/ui` package can be installed and used without importing from source internals
- components have behavior tests and accessibility expectations where relevant
- release notes and versioning rules exist
- CI enforces the same commands contributors use locally

## Release Strategy

### Phase 1: Public Beta Foundation

Goal:
make the repository trustworthy as a public npm beta release

Scope:

- publishable package outputs
- stable verification commands
- Storybook and docs as reliable public surfaces
- README and installation flow aligned with actual package usage
- stable versus experimental component list

### Phase 2: Core Surface Maturity

Goal:
make Layer 0 and Layer 1 feel coherent and professional

### Phase 3: Differentiating Product Components

Goal:
prove that Avenra UI is not only a primitive library

Priority components:

- Form
- Combobox / Command
- Calendar / DatePicker
- Table
- Upload

### Phase 4: Platform Expansion

Goal:
move into heavier components and deeper workflow support without losing consistency

## Success Criteria

Avenra UI should be considered on track only when all of the following are true:

- a new external user can install the package and render components without source-path imports
- public docs match the actual public exports
- the root verification pipeline is green
- Storybook and docs are both valid public surfaces
- stable components are clearly identified
- roadmap work is progressing from foundation quality to platform depth, not from patch to patch

## Immediate Design Decision

The next major milestone is not "add the next random component". The next major milestone is:

make Avenra UI a publicly releasable React package foundation, then expand into the heavier product surface from a stable base.
