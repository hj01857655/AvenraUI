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

## Current product position

Avenra UI is in the foundation-building phase of a serious public library.

What is true today:

- the repository has a real `@avenra/ui` package boundary
- a documented first wave of foundation components exists
- docs and Storybook both exist as product-facing support surfaces
- tokens and themes already exist in the repo as the styling foundation
- stable and experimental surfaces are now explicitly documented

What is not being claimed yet:

- full Element-class breadth across every enterprise pattern
- a finished public theming platform with every override surface documented
- mature data-heavy components such as full table / grid systems
- final API guarantees for every currently exported component

The goal is not to overstate maturity. The goal is to make the current support contract explicit while continuing to expand the product deliberately.

## Docs entry points

- Docs home: product positioning, current capability, and entry navigation
- Getting Started: current scope and recommended reading order
- Installation: package-consumer path and local workspace path
- Theming: styling layers, override direction, and current boundary notes
- Components: current documented component surface
- Stable surface governance: `docs/stable-components.md`
- Adoption guidance: `docs/adoption-guidance.md`
- Form semantics and field contract: `docs/form-experience.md`
- Selection component guidance: `docs/selection-components.md`
- Date input direction: `docs/date-inputs.md`
- Product direction: `docs/product-direction.md`

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
2. `docs/stable-components.md` for the support contract
3. `docs/adoption-guidance.md` for the current production-use boundary
4. `docs/form-experience.md` for the current field and validation model
5. `docs/selection-components.md` for choosing between the current selection primitives
6. `docs/date-inputs.md` for the current date-entry direction
7. `docs/product-direction.md` for the near-term expansion direction

That reading order reflects how the library is being built: support boundaries first, then usage clarity, then wider component breadth.

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
- `Popover`
- `Progress`
- `Radio`
- `Select`
- `Stack`
- `Switch`
- `Tabs`
- `Textarea`
- `Tooltip`

These are the components the repository currently treats as stable for external adoption.

## Experimental / in-progress surface

The following components are exported today, but still governed as experimental / in-progress:

- `Autocomplete`
- `Combobox`
- `Command`
- `Drawer`
- `DropdownMenu`
- `Form`
- `FormField`
- `Pagination`
- `Skeleton`
- `Toast`

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

This is a foundation release wave, not the final surface area of the library.

For the current governance split, see `docs/stable-components.md`.

## High-value component direction

The current direction is to expand in a way that compounds product value instead of only increasing component count. That means:

- harden form, selection, overlay, and feedback groups before jumping too early into the heaviest enterprise widgets
- add high-frequency enhanced inputs such as `TagInput`, `MultiSelect`, and date entry surfaces as the next layer of practical product value
- keep exports, docs, tests, and support governance aligned as the surface grows

This is how Avenra UI intends to become a strong React ecosystem library: not by pretending the whole matrix is already done, but by making each new line credible when it lands.

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
