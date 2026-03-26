# Avenra UI

Avenra UI is a React-first component library and design-system workspace aimed at the top tier of product-grade UI libraries. The target is not a loose collection of demo widgets. The target is a public package that teams can adopt as a durable interface foundation for real products.

The working product bet is simple:

- ship a stable React package boundary before pretending to have full breadth
- make docs, support boundaries, and component quality move together
- build a system that can grow from foundation primitives into heavier product surfaces without rewriting the repo structure again

## Product intent

Avenra UI is being built to compete on the things that matter in long-lived product work:

- React-native API design
- predictable field, overlay, and feedback behavior
- stable versus experimental support governance
- a design-token and theme foundation that scales
- docs that explain real adoption boundaries instead of overclaiming maturity

This repository is therefore optimized around platform completeness, not patch-style progress.

## Why Avenra UI exists

Avenra UI is not trying to win by copying another ecosystem's mental model into React. It is trying to win on a different combination of strengths:

- React-first APIs instead of framework-transplanted interaction patterns
- a support contract that is explicit about stable versus experimental work
- design-system depth that can expand without rewriting the package shape
- documentation that explains adoption boundaries honestly instead of pretending everything is equally mature
- a product roadmap that prioritizes high-frequency interfaces before checkbox component-count inflation

Today that means Avenra UI is strongest as a serious foundation-in-progress rather than a falsely “finished” enterprise matrix.

## What success looks like

Success for Avenra UI is not “having many component names in the package.”

Success looks like this:

- a team can adopt the stable surface and ship real product screens
- the library’s docs explain where the support boundary really is
- component groups feel coherent instead of individually impressive but collectively inconsistent
- higher-value inputs, overlays, and data-display surfaces arrive as credible product lines, not rushed demos
- the library becomes known for React-native product quality rather than framework imitation

## Current product position

Avenra UI is in the foundation-building phase of a serious public library.

What is true today:

- the repository has a real `@avenra/ui` package boundary
- a documented first wave of foundation components exists
- docs and Storybook both exist as product-facing support surfaces
- tokens and themes already exist in the repo as the styling foundation
- stable and experimental surfaces are now explicitly documented
- the library has already expanded beyond the first foundation wave into higher-value inputs and workflow surfaces such as `TagInput`, `MultiSelect`, `DatePicker`, `DateRangePicker`, `Table`, `DataGrid`, `Upload`, `Tree`, and `Cascader`

What is not being claimed yet:

- full Element-class breadth across every enterprise pattern
- a finished public theming platform with every override surface documented
- mature data-heavy components such as full table / grid systems
- final API guarantees for every currently exported component

The goal is not to overstate maturity. The goal is to make the current support contract explicit while continuing to expand the product deliberately.

## Competitive stance

Avenra UI is not trying to beat mature React libraries by claiming the largest matrix today.

It is trying to become competitive by being better in the places where long-lived product teams feel pain:

- clearer support governance
- stronger component-group consistency
- more explicit adoption guidance
- React-first usage boundaries
- better alignment between exports, docs, previews, and tests

That is the current competitive stance: credibility before theater.

## Docs entry points

- Docs home: product positioning, current capability, and entry navigation
- Getting Started: current scope and recommended reading order
- Installation: package-consumer path and local workspace path
- Theming: styling layers, override direction, and current boundary notes
- Components: current documented component surface
- Product handbook: `docs/product-handbook.md`
- Stable surface governance: `docs/stable-components.md`
- Form semantics and field contract: `docs/form-experience.md`
- Selection component guidance: `docs/selection-components.md`
- Date input direction: `docs/date-inputs.md`

## Current package-consumer shape

The current docs and README point adopters to the package root as the main component entry:

```tsx
import { Button } from '@avenra/ui';
import '@avenra/ui/styles.css';

export function Example() {
  return <Button>Ship it</Button>;
}
```

This is the intended consumer-facing usage contract documented by the repo today.

The package root currently exports both:

- a **stable surface** that Avenra UI treats as the current formal support contract
- an **experimental / in-progress surface** that remains available for evaluation, but may still change

That distinction is documentation and support governance, not a claim that experimental items are hidden or removed from the package today.

## Current adoption guidance

If you are evaluating Avenra UI today, the recommended reading order is:

1. `README.md` for the current product position
2. `docs/product-handbook.md` for the complete product, adoption, and roadmap handbook
3. `docs/stable-components.md` for the support contract
4. `docs/form-experience.md` for the current field and validation model
5. `docs/selection-components.md` for choosing between the current selection primitives
6. `docs/date-inputs.md` for the current date-entry direction

That reading order reflects how the library is being built: product definition first, support boundaries second, and specialized guidance after that.

## Current form experience contract

The current form work is centered on one shared field contract across text, selection, and choice controls:

- `Form` keeps the native `<form>` element, exposes busy state on the form surface, and propagates `disabled` / `submitting`
- `FormField` is the shared shell for `label`, `hint`, `error`, `required`, `invalid`, and disabled semantics
- `Input`, `Select`, `Textarea`, `Combobox`, and `Autocomplete` can own that shell directly or inherit it from `FormField`
- `Checkbox`, `Radio`, and `Switch` keep their own visible label and should use `FormField layout="control"` when shared hint or error text is needed

That is the current product direction for form composition: one consistent accessibility and messaging contract before expanding into larger data-entry surfaces.

For a more explicit write-up of that contract, see `docs/form-experience.md`.

## Stable surface

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
- `Autocomplete`
- `Combobox`
- `Command`
- `Popover`
- `Progress`
- `Radio`
- `Select`
- `Stack`
- `Steps`
- `Switch`
- `Tabs`
- `Textarea`
- `Tooltip`

These are the components the repository currently treats as stable for external adoption.

Promotion and support expectations are collected in `docs/product-handbook.md` and summarized in `docs/stable-components.md`.

## Experimental / in-progress surface

The following components are exported today, but still governed as experimental / in-progress:

- `Cascader`
- `DataGrid`


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

These components are useful and actively documented, but their API and support expectations may still change while the stable contract is being tightened.

## Current component coverage

Together, the current documented foundation wave includes:

- `Alert`
- `Avatar`
- `Badge`
- `Breadcrumb`
- `Button`
- `Card`
- `Checkbox`
- `Dialog`
- `Drawer`
- `DropdownMenu`
- `EmptyState`
- `Form`
- `FormField`
- `IconButton`
- `Inline`
- `Input`
- `Pagination`
- `Popover`
- `Progress`
- `Radio`
- `Select`
- `Skeleton`
- `Stack`
- `Switch`
- `Tabs`
- `Textarea`
- `Toast`
- `Tooltip`
- `Combobox`
- `Command`
- `Autocomplete`
- `Cascader`
- `DataGrid`
- `DatePicker`
- `DateRangePicker`
- `FilterBar`
- `Steps`
- `MultiSelect`
- `TagInput`

- `Upload`

This is a foundation release wave, not the final surface area of the library.

For the current governance split, see `docs/stable-components.md`.

## Current higher-value expansion wave

Beyond the first foundation surface, Avenra UI now also includes these higher-value product lines:

- `TagInput`
- `MultiSelect`
- `DatePicker`
- `DateRangePicker`
- `FilterBar`
- `Steps`
- `Table`
- `DataGrid`

- `Tree`
- `Cascader`

These lines matter because they push the library beyond basic primitives and into real workflow-building territory.

## Current product areas

The current product surface now spans these areas:

- foundation actions and navigation
- form and field primitives
- search, filtering, and selection
- date input
- overlay and feedback
- data display
- workflow surfaces such as upload
- structural selection surfaces such as tree and cascader

This means Avenra UI is no longer only a foundation-component repository. It is already becoming a broader product interface system.

## High-value component direction

The current direction is to expand in a way that compounds product value instead of only increasing component count. That means:

- harden form, selection, overlay, and feedback groups before jumping too early into the heaviest enterprise widgets
- add high-frequency enhanced inputs such as `TagInput`, `MultiSelect`, `DatePicker`, and `DateRangePicker`
- turn grouped search and filtering into a first-class product workflow through `FilterBar`
- add guided multi-step progression through `Steps` where workflows need visible progress context
- continue moving into stronger workflow and structure surfaces such as `Upload`, `Tree`, `Cascader`, `Table`, and `DataGrid`


This is how Avenra UI intends to become a strong React ecosystem library: not by pretending the whole matrix is already done, but by making each new line credible when it lands.

## Roadmap shape

The current roadmap shape is:

### Now

- strengthen high-frequency input surfaces
- keep docs and support governance aligned with the real surface
- make field, selection, date, overlay, and feedback groups feel internally coherent
- finish turning newer workflow and structure surfaces into credible product lines, including the new `DataGrid` surface
- make guided setup and release flows more legible through the new `Steps` surface

### Next

- deepen data-display capability beyond the current `Table` baseline through the newly added `DataGrid` surface
- expand richer workflow and structure components on top of `Upload`, `Tree`, and `Cascader`
- deepen date and selection surfaces where they materially improve product flows

### Later

- expand into heavier enterprise patterns only after the surrounding system can support them credibly

This roadmap shape matters because Avenra UI is trying to become a product system, not a scattered widget list.

## Current product reality

The most important thing to understand today is this:

- the stable surface is real
- the experimental surface is real
- the product already extends beyond the earliest primitive wave
- the matrix is still expanding, but it is expanding from a base that now includes higher-value workflows and data-display entry points

That combination is the current Avenra UI reality: not finished, but no longer early in the naive sense.

## Who Avenra UI is for

Avenra UI is currently best suited to:

- React product teams that want a serious foundation instead of assembling many unrelated component packages
- teams that care about support governance and want to know what is stable versus still settling
- teams that prefer product-system coherence over raw matrix inflation
- teams willing to adopt a library that is already useful, but still actively climbing toward a broader surface

## Who Avenra UI is not for yet

Avenra UI is not yet the right default choice if you need:

- a fully mature enterprise matrix with every heavy component already stabilized
- a “set it and forget it” package where no experimental area is expected to move
- complete parity with the broadest legacy enterprise UI suites today

That is not a weakness to hide. It is the current product truth.

## Quality bar for every new line

Avenra UI should not treat a component as real product progress until the line includes:

- a coherent public API
- documented intended usage
- preview coverage
- tests for the important interaction contract
- styling that fits the existing product language
- an honest support-level expression

This is how the library avoids looking wide while remaining shallow.

## What makes this library different

The current differentiation is not a claim of maximum breadth. It is a claim of stronger product discipline:

- support levels are made explicit
- component groups are hardened as groups instead of only as isolated widgets
- product docs try to explain decision boundaries, not just export names
- new lines are expected to land with tests, previews, styling, and usage guidance together

In other words, Avenra UI is trying to become notable for coherence, not noise.

## What comes next

The next meaningful gains should come from:

- deeper data-display capability
- stronger workflow-oriented components
- continued reinforcement of support governance and product documentation

The product should keep getting more useful without becoming less honest.

## Current differentiation direction

Avenra UI is trying to become more than “another React component package” in three specific ways:

- by making support governance explicit instead of letting package exports silently imply maturity
- by making component-group consistency a first-class product concern instead of treating each widget as an isolated win
- by building documentation that explains product decisions, adoption boundaries, and component choice, not just prop tables

That does not make the library “finished.” It makes the direction legible.

## When Avenra UI is a good fit today

Avenra UI is a good fit today if you want:

- a React-first package boundary with a real support split
- a documented foundation wave that is actively expanding
- a design-system workspace that already includes tokens, themes, docs, and package governance
- a library you can evaluate honestly without being misled about maturity

Avenra UI is not the right fit today if you require:

- a complete enterprise matrix with every heavy data component already stable
- a finalized public theming platform across every override surface
- zero API movement in the currently experimental surface

If you are evaluating the library for real adoption, use `docs/product-handbook.md` together with `docs/stable-components.md` instead of relying only on package impressions.

## Styling and theming

The styling model is layered like this:

- `packages/tokens` defines raw CSS variables
- `packages/themes` applies semantic theme meaning on top of those variables
- `@avenra/ui` consumes that contract in component styles

Current boundary:

- the repo already contains token and theme packages
- the clearest documented adopter entry today is still the UI package and docs site
- theming guidance is documented honestly as a layering model and override direction, not as a fully expanded public platform yet

The current theming model is intentionally documented as a layered system before it is documented as a complete customization platform. That boundary is deliberate.

## Workspace structure

- `apps/docs` — Next.js docs site
- `apps/storybook` — Storybook component sandbox
- `packages/ui` — React UI package
- `packages/tokens` — design token foundation
- `packages/themes` — theme layer
- `packages/icons` — icon package scaffold
- `packages/utils` — shared helpers
- `packages/configs` — workspace config presets

## Local development

### Requirements

- Node.js compatible with the current workspace dependencies
- `pnpm@10.6.0`

### Bootstrap the workspace

```powershell
git clone https://github.com/hj01857655/AvenraUI.git
cd AvenraUI
pnpm install
```

### Run docs and Storybook

```powershell
pnpm --filter @avenra/docs dev
pnpm --filter @avenra/storybook dev
```

## Verification commands

```powershell
pnpm --filter @avenra/docs build
pnpm --filter @avenra/ui build
pnpm --filter @avenra/ui typecheck
pnpm exec vitest run apps/docs/app/page.test.tsx
```

## Repository

- GitHub: https://github.com/hj01857655/AvenraUI
- Default branch: `main`
- Package manager: `pnpm`
