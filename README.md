# Avenra UI

Avenra UI is a React-first component library and design system monorepo. The current direction is to build a solid foundation first: shared tokens and themes, a typed UI package, a docs app, a Storybook sandbox, and a repeatable component delivery workflow.

This repository is in the early build-out stage. It already contains the first wave of high-frequency components and the package boundaries for a larger design system, but it is not positioned yet as a finished public library release.

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

## Direction

The repository is currently moving in the direction of a complete design-system platform, but the implementation strategy is staged:

1. stabilize the monorepo, tokens, themes, docs, and component workflow
2. expand the high-frequency component set
3. improve quality, examples, accessibility, and developer ergonomics
4. only then move into heavier and more opinionated component areas

## Repository

- GitHub: https://github.com/hj01857655/AvenraUI
- Default branch: `main`
- Package manager: `pnpm`
