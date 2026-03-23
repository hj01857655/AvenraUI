# Contributing to AvenraUI

Thanks for contributing to AvenraUI.

## Before you start

- Use `pnpm` in the workspace root.
- Keep changes scoped and production-minded.
- Match the existing monorepo structure and naming.
- This repository is still in bootstrap stage, so some packages and scripts are intentionally minimal.

## Local development

```powershell
e:\VSCodeSpace\avenra-ui
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
```

Useful targeted commands:

```powershell
e:\VSCodeSpace\avenra-ui
pnpm --filter @avenra/docs dev
pnpm --filter @avenra/storybook dev
pnpm --filter @avenra/ui test
```

## Workspace areas

- `apps/docs` — Next.js documentation site
- `apps/storybook` — Storybook sandbox
- `packages/ui` — component library
- `packages/tokens` — design tokens
- `packages/themes` — theme layer
- `packages/icons` — icon package
- `packages/utils` — shared helpers
- `packages/configs` — shared configs

## Pull request expectations

- Keep PRs focused.
- Update docs when public APIs or developer workflows change.
- Add or update tests when behavior changes.
- Run the relevant validation commands before opening a PR.
- Include screenshots or short recordings for UI-facing changes when useful.

## Reporting issues

Use the GitHub issue templates and include:

- clear reproduction steps
- expected vs actual behavior
- affected app/package area
- environment details when relevant

## Bootstrap-stage note

AvenraUI is still being assembled. Some packages, scripts, and workflows are intentionally incomplete while the foundation is being finalized.
