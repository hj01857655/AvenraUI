# Avenra UI Public Library Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn Avenra UI from a bootstrap-stage monorepo into a publicly releasable React npm UI library foundation, with trustworthy package outputs, stable verification, aligned docs, and a clear stable-component surface.

**Architecture:** The work should proceed in four tracks that converge on one release gate: package publishing readiness, workspace verification stability, public documentation and Storybook reliability, and synchronized component surface governance. The immediate focus is not new component count. It is making the existing system behave like a real library product rather than an internal source tree.

**Tech Stack:** pnpm workspaces, TypeScript, React 19, Next.js 15, Storybook 9, Vitest, Testing Library, CSS variable-based theming

---

### Task 1: Define the public package contract for `@avenra/ui`

**Files:**
- Modify: `E:\VSCodeSpace\avenra-ui\packages\ui\package.json`
- Modify: `E:\VSCodeSpace\avenra-ui\packages\ui\tsconfig.json`
- Modify: `E:\VSCodeSpace\avenra-ui\packages\ui\src\index.ts`
- Modify: `E:\VSCodeSpace\avenra-ui\packages\ui\src\styles.css`
- Create or modify if needed: `E:\VSCodeSpace\avenra-ui\packages\ui\build.*`

**Step 1: Audit the current package manifest**

Confirm and document the current blockers:

- `private: true`
- `main` and `types` pointing at `src/index.ts`
- no public `exports`
- no distributable JS output

Run:
`Get-Content packages/ui/package.json`

Expected:
The current manifest reflects bootstrap-stage settings and needs a public-library contract.

**Step 2: Design the publishable manifest**

Define the target contract:

- remove `private`
- add `exports` for the root package
- add a style export for `styles.css`
- point runtime fields to `dist`
- keep only public stable exports in the package root

**Step 3: Implement real package outputs**

Replace declaration-only build behavior with actual library build output:

- JS output
- type declarations
- copied or emitted CSS assets

Do not leave consumers dependent on `src/` imports.

**Step 4: Verify the package contract**

Run:
`pnpm --filter @avenra/ui build`

Expected:
`dist` outputs exist and the package can be resolved through its public contract.

**Step 5: Commit checkpoint**

```powershell
git add packages/ui/package.json packages/ui/tsconfig.json packages/ui/src/index.ts packages/ui/src/styles.css
git commit -m "feat: define public ui package contract"
```

### Task 2: Stabilize root verification commands

**Files:**
- Modify: `E:\VSCodeSpace\avenra-ui\package.json`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\package.json`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\tsconfig.json`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\storybook\package.json`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\storybook\tsconfig.json`
- Modify: `E:\VSCodeSpace\avenra-ui\vitest.config.ts`

**Step 1: Fix `typecheck` determinism**

Address the current docs typecheck failure caused by `.next/types` assumptions. The resulting command should work from a clean checkout without requiring stale generated files.

Run:
`pnpm typecheck`

Expected today:
FAIL until the docs typecheck contract is fixed.

**Step 2: Replace placeholder test scripts where they mislead**

Current placeholders such as:

- `docs: tests pending bootstrap`
- `storybook: tests pending bootstrap`
- `tokens: no tests yet`

should be separated into one of these buckets:

- real verification command
- explicit temporary skip command that is named honestly and excluded from release gates

**Step 3: Make root verification green**

The target commands are:

- `pnpm build`
- `pnpm test`
- `pnpm typecheck`

All three must be repeatable from the workspace root.

**Step 4: Verify the release gate**

Run:
`pnpm build && pnpm test && pnpm typecheck`

Expected:
All pass from a clean working tree after the necessary fixes.

**Step 5: Commit checkpoint**

```powershell
git add package.json apps/docs/package.json apps/docs/tsconfig.json apps/storybook/package.json apps/storybook/tsconfig.json vitest.config.ts
git commit -m "chore: stabilize workspace verification gate"
```

### Task 3: Make Storybook and docs consume the public package shape

**Files:**
- Modify: `E:\VSCodeSpace\avenra-ui\apps\storybook\.storybook\main.ts`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\storybook\.storybook\preview.ts`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\storybook\stories\button.stories.tsx`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\next.config.ts`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\layout.tsx`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\components\component-preview.tsx`

**Step 1: Remove source-path dependence from public surfaces**

Storybook and docs should not rely on deep imports from `@avenra/ui/src/...` for public component examples when the intent is to represent the published library.

**Step 2: Fix Storybook build resolution**

The current root build fails because Storybook cannot resolve `@avenra/ui`. Fix aliasing or package-resolution flow so Storybook can build reliably.

Run:
`pnpm --filter @avenra/storybook build`

Expected:
PASS.

**Step 3: Align docs examples with stable exports**

Docs previews should reflect the stable public package surface, not undocumented internal files.

**Step 4: Verify both public surfaces**

Run:
- `pnpm --filter @avenra/docs build`
- `pnpm --filter @avenra/storybook build`

Expected:
Both succeed and render the current stable component surface consistently.

**Step 5: Commit checkpoint**

```powershell
git add apps/storybook/.storybook/main.ts apps/storybook/.storybook/preview.ts apps/storybook/stories/button.stories.tsx apps/docs/next.config.ts apps/docs/app/layout.tsx apps/docs/app/components/component-preview.tsx
git commit -m "feat: align docs and storybook with public package surface"
```

### Task 4: Establish stable versus experimental component governance

**Files:**
- Modify: `E:\VSCodeSpace\avenra-ui\packages\ui\src\index.ts`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\components\component-catalog.ts`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\components\component-docs.ts`
- Modify: `E:\VSCodeSpace\avenra-ui\README.md`
- Create: `E:\VSCodeSpace\avenra-ui\docs\stable-components.md`

**Step 1: Inventory the actual component surface**

Separate components into:

- stable and publicly exported
- implemented but experimental
- in-progress and not ready for export

**Step 2: Export only what is ready**

Do not treat every directory under `packages/ui/src/components` as public API automatically.

**Step 3: Publish the policy**

Create a short policy document that explains:

- what "stable" means
- what "experimental" means
- where experimental work may appear
- what must happen before a component is promoted

**Step 4: Verify surface alignment**

Check:

- package exports
- docs component catalog
- README component list

Expected:
No mismatch between what the repo claims and what the public package actually supports.

**Step 5: Commit checkpoint**

```powershell
git add packages/ui/src/index.ts apps/docs/app/components/component-catalog.ts apps/docs/app/components/component-docs.ts README.md docs/stable-components.md
git commit -m "docs: define stable and experimental component surface"
```

### Task 5: Upgrade the public docs and README from repo overview to product onboarding

**Files:**
- Modify: `E:\VSCodeSpace\avenra-ui\README.md`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\page.tsx`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\docs\installation\page.tsx`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\docs\theming\page.tsx`
- Create or modify if needed: `E:\VSCodeSpace\avenra-ui\apps\docs\app\docs\release-policy\page.tsx`

**Step 1: Rewrite README as a public library entry page**

The README must answer:

- what Avenra UI is
- who it is for
- how to install it
- how to import styles
- which components are stable
- where to find docs

**Step 2: Strengthen docs onboarding pages**

Installation and theming docs should include real public import examples and clear React usage context.

**Step 3: Add release and compatibility guidance**

Document:

- package maturity
- supported React range
- release channel expectations
- migration expectations for breaking changes

**Step 4: Verify docs rendering**

Run:
`pnpm --filter @avenra/docs build`

Expected:
PASS with updated onboarding content.

**Step 5: Commit checkpoint**

```powershell
git add README.md apps/docs/app/page.tsx apps/docs/app/docs/installation/page.tsx apps/docs/app/docs/theming/page.tsx
git commit -m "docs: upgrade public onboarding and theming guidance"
```

### Task 6: Prepare release automation and contributor gates

**Files:**
- Create: `E:\VSCodeSpace\avenra-ui\.github\workflows\ci.yml`
- Create: `E:\VSCodeSpace\avenra-ui\.github\workflows\release.yml`
- Modify: `E:\VSCodeSpace\avenra-ui\CONTRIBUTING.md`

**Step 1: Add CI workflow**

The CI workflow should run the same release gate used locally:

- install
- build
- test
- typecheck

**Step 2: Add release workflow skeleton**

Whether the initial strategy uses manual npm publish or changesets, the repository should have a documented and automatable release path.

**Step 3: Align contribution guidance**

Update contributing docs to reflect:

- stable verification commands
- component documentation expectations
- public API change requirements

**Step 4: Verify workflow config quality**

Review the workflow files and confirm they match actual package scripts before relying on them as a release gate.

**Step 5: Commit checkpoint**

```powershell
git add .github/workflows CONTRIBUTING.md
git commit -m "chore: add release and ci workflow foundation"
```

### Task 7: Promote Layer 0 and Layer 1 to a real public beta surface

**Files:**
- Modify as needed under: `E:\VSCodeSpace\avenra-ui\packages\ui\src\components\**`
- Modify as needed under: `E:\VSCodeSpace\avenra-ui\apps\docs\app\components\**`
- Modify as needed under: `E:\VSCodeSpace\avenra-ui\apps\storybook\stories\**`

**Step 1: Review every currently claimed core component**

For each stable candidate, confirm:

- exported
- styled
- tested
- documented
- accessible enough for beta

**Step 2: Remove or demote weak claims**

If a component is half-integrated, do not leave it implied as stable.

**Step 3: Fill critical gaps before beta**

Priority gaps to resolve first:

- Drawer package surface consistency
- Select robustness
- overlay consistency across Dialog, Popover, Drawer, Tooltip, DropdownMenu
- feedback consistency across Alert, Toast, Progress, Skeleton

**Step 4: Run focused package verification**

Run:
`pnpm --filter @avenra/ui test`

Expected:
The public beta component surface is backed by passing component tests.

**Step 5: Commit checkpoint**

```powershell
git add packages/ui apps/docs/app/components apps/storybook/stories
git commit -m "feat: promote beta-ready component surface"
```

### Task 8: Final beta release gate

**Files:**
- Review whole repository

**Step 1: Run the full release candidate gate**

Run:

```powershell
pnpm build
pnpm test
pnpm typecheck
```

Expected:
All pass from the repository root.

**Step 2: Validate package consumer experience**

From a clean example or documented install flow, verify that a consumer can:

- install `@avenra/ui`
- import styles
- render at least one stable component without source-path imports

**Step 3: Review the beta claim honestly**

Only call the package publicly beta-ready if:

- package contract is real
- docs are aligned
- Storybook builds
- root gates are green
- stable surface is documented

**Step 4: Final commit**

```powershell
git add .
git commit -m "chore: prepare avenra ui public beta foundation"
```
