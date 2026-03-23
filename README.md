# Avenra UI

Avenra UI is a React component library and design-system monorepo. The workspace contains the public `@avenra/ui` package together with docs, Storybook, tokens, themes, and supporting packages.

## Install `@avenra/ui`

```powershell
pnpm add @avenra/ui react react-dom
```

`@avenra/ui` is published as a compiled package. Consumers should import from the package root instead of `src/`.

## Use the package

Always import components from the public package entrypoint and import styles from the public style entry:

```tsx
import { Button } from '@avenra/ui';
import '@avenra/ui/styles.css';

export function Example() {
  return <Button>Click me</Button>;
}
```

## Current focus

The project is currently focused on:

- building a reusable `@avenra/ui` component package with TypeScript-first APIs
- establishing `tokens + themes + ui` as the design-system core
- using `apps/docs` and `apps/storybook` as the two main developer surfaces
- shipping common, high-frequency components before moving into heavier data and enterprise widgets
- keeping the workspace structure stable so the library can expand without another repo reshuffle

## Current component coverage

The `@avenra/ui` package already exports these components:

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
- `IconButton`
- `Inline`
- `Input`
- `Pagination`
- `Popover`
- `Progress`
- `Radio`
- `Select`
- `Stack`
- `Switch`
- `Tabs`
- `Textarea`
- `Toast`
- `Tooltip`

This is the first wave of foundation components, not the final surface area of the library.

## What This Repo Is

This repository is a `pnpm` workspace with separate apps and packages:

- `apps/docs` — Next.js documentation site for project-facing docs and examples
- `apps/storybook` — Storybook sandbox for isolated component development
- `packages/ui` — React component library
- `packages/tokens` — raw design tokens and exported CSS variables
- `packages/themes` — theme definitions layered on top of tokens
- `packages/icons` — icon package scaffold
- `packages/utils` — shared helpers
- `packages/configs` — shared workspace config presets

## Package Overview

- `@avenra/ui` — React components and library styles
- `@avenra/tokens` — token exports and CSS token contract
- `@avenra/themes` — theme CSS and theme composition layer
- `@avenra/icons` — icon package scaffold
- `@avenra/utils` — utilities and low-level helpers
- `@avenra/configs` — shared TypeScript, ESLint, and related config

## Local development

### Requirements

- Node.js compatible with the current workspace dependencies
- `pnpm@10.6.0`

### Quick start

```powershell
git clone https://github.com/hj01857655/AvenraUI.git
cd AvenraUI
pnpm install
pnpm dev
```

`pnpm dev` starts both:

- `@avenra/docs`
- `@avenra/storybook`

## Common commands

```powershell
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm test:ui
pnpm --filter @avenra/docs dev
pnpm --filter @avenra/storybook dev
pnpm --filter @avenra/ui build
pnpm --filter @avenra/ui typecheck
pnpm --filter @avenra/ui test
```

## Project status

Current state:

- workspace and package boundaries are in place
- the first wave of core UI components exists in `packages/ui`
- docs and Storybook apps are present and wired into the workspace
- token and theme packages exist as the styling foundation
- some package areas are still scaffold-stage and not feature-complete

Near-term gaps still visible in the repo:

- docs content is still light
- Storybook and package-level polish are still evolving
- heavier components such as data-heavy widgets are intentionally deferred
- several packages are present as structure and foundation, not as mature product surfaces yet

## Repository

- GitHub: https://github.com/hj01857655/AvenraUI
- Default branch: `main`
- Package manager: `pnpm`
