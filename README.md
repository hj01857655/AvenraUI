# Avenra UI

Avenra UI is a React component library and design-system workspace focused on shipping real product interfaces with a stable foundation first.

The current public-facing docs line is built around four questions:

- what the library is
- what component surface exists today
- how to start evaluating or installing it
- how theming is layered without overstating maturity

## Current product position

Avenra UI is not trying to look artificially “complete” before the base is ready.

What is true today:

- the repository has a real `@avenra/ui` package boundary
- the first visible wave of foundation components is documented
- docs and Storybook both exist as product-facing support surfaces
- tokens and themes already exist in the repo as the styling foundation

What is not being claimed yet:

- full Element-class breadth across every enterprise pattern
- a fully expanded public theming platform
- broad data-heavy component coverage

## Docs entry points

- Docs home: product positioning, current capability, and entry navigation
- Getting Started: current scope and recommended reading order
- Installation: package-consumer path and local workspace path
- Theming: styling layers, override direction, and current boundary notes
- Components: current documented component surface

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

## Current form experience contract

The current form work is centered on one shared field contract across text, selection, and choice controls:

- `Form` keeps the native `<form>` element, exposes busy state on the form surface, and propagates `disabled` / `submitting`
- `FormField` is the shared shell for `label`, `hint`, `error`, `required`, `invalid`, and disabled semantics
- `Input`, `Select`, `Textarea`, `Combobox`, and `Autocomplete` can own that shell directly or inherit it from `FormField`
- `Checkbox`, `Radio`, and `Switch` keep their own visible label and should use `FormField layout="control"` when shared hint or error text is needed

That is the current product direction for form composition: one consistent accessibility and messaging contract before expanding into larger data-entry surfaces.

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

## Styling and theming

The styling model is layered like this:

- `packages/tokens` defines raw CSS variables
- `packages/themes` applies semantic theme meaning on top of those variables
- `@avenra/ui` consumes that contract in component styles

Current boundary:

- the repo already contains token and theme packages
- the clearest documented adopter entry today is still the UI package and docs site
- theming guidance is documented honestly as a layering model and override direction, not as a fully expanded public platform yet

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
