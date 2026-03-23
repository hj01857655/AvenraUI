# Avenra UI Bootstrap Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create the initial Avenra UI monorepo, documentation apps, shared packages, and baseline tooling for a React-first design system platform.

**Architecture:** The workspace uses a pnpm monorepo with separate apps for docs and Storybook, and separate packages for tokens, themes, ui, icons, utils, and shared configs. Styling is built on CSS variables and semantic design tokens, with React components living in `packages/ui` and platform-facing surfaces in `apps/docs` and `apps/storybook`.

**Tech Stack:** pnpm workspaces, TypeScript, React, Next.js, Storybook, Tailwind CSS, Vitest, Testing Library, ESLint, Prettier

---

### Task 1: Workspace root setup

**Files:**
- Create: `e:\VSCodeSpace\avenra-ui\package.json`
- Create: `e:\VSCodeSpace\avenra-ui\pnpm-workspace.yaml`
- Create: `e:\VSCodeSpace\avenra-ui\tsconfig.base.json`
- Create: `e:\VSCodeSpace\avenra-ui\.gitignore`
- Create: `e:\VSCodeSpace\avenra-ui\README.md`

**Step 1: Write the root manifest**
Create scripts for workspace dev, build, lint, test, and typecheck.

**Step 2: Add workspace package globs**
Include `apps/*` and `packages/*` in `pnpm-workspace.yaml`.

**Step 3: Add base TypeScript config**
Enable strict mode and shared path assumptions for all packages.

**Step 4: Add ignore rules and README**
Ignore build outputs, node_modules, coverage, and framework artifacts.

**Step 5: Verify**
Run: `pnpm install`
Expected: workspace lockfile and node_modules created without package manifest errors.

### Task 2: Shared configuration package

**Files:**
- Create: `e:\VSCodeSpace\avenra-ui\packages\configs\package.json`
- Create: `e:\VSCodeSpace\avenra-ui\packages\configs\tsconfig\base.json`
- Create: `e:\VSCodeSpace\avenra-ui\packages\configs\eslint\base.mjs`
- Create: `e:\VSCodeSpace\avenra-ui\packages\configs\tailwind\preset.ts`

**Step 1: Add configs package manifest**
Expose config entry points clearly.

**Step 2: Add shared tsconfig**
Extend from workspace root and expose reusable compiler options.

**Step 3: Add shared ESLint config**
Cover TypeScript and React-friendly defaults.

**Step 4: Add Tailwind preset**
Map semantic tokens and base design choices into a shared preset.

**Step 5: Verify**
Run: `pnpm --filter @avenra/configs lint`
Expected: config package can be consumed without path resolution errors.

### Task 3: Token and theme packages

**Files:**
- Create: `e:\VSCodeSpace\avenra-ui\packages\tokens\package.json`
- Create: `e:\VSCodeSpace\avenra-ui\packages\tokens\src\index.ts`
- Create: `e:\VSCodeSpace\avenra-ui\packages\tokens\src\css\tokens.css`
- Create: `e:\VSCodeSpace\avenra-ui\packages\themes\package.json`
- Create: `e:\VSCodeSpace\avenra-ui\packages\themes\src\index.ts`
- Create: `e:\VSCodeSpace\avenra-ui\packages\themes\src\css\themes.css`

**Step 1: Define raw design token exports**
Capture colors, spacing, typography, radius, shadows, and motion.

**Step 2: Publish CSS variable contract**
Export `:root` variables for light theme defaults.

**Step 3: Add theme package**
Layer semantic theme selectors such as dark mode on top of tokens.

**Step 4: Export package entry points**
Ensure docs and ui packages can import token/theme assets directly.

**Step 5: Verify**
Run: `pnpm --filter @avenra/tokens build`
Expected: token package compiles and CSS assets resolve.

### Task 4: UI foundation package

**Files:**
- Create: `e:\VSCodeSpace\avenra-ui\packages\ui\package.json`
- Create: `e:\VSCodeSpace\avenra-ui\packages\ui\src\index.ts`
- Create: `e:\VSCodeSpace\avenra-ui\packages\ui\src\styles.css`
- Create: `e:\VSCodeSpace\avenra-ui\packages\ui\src\components\button\button.tsx`
- Create: `e:\VSCodeSpace\avenra-ui\packages\ui\src\components\button\button.test.tsx`

**Step 1: Create the package manifest**
Set up build, test, and type exports for the component library.

**Step 2: Add global library stylesheet**
Import token and theme styles and expose base component layer rules.

**Step 3: Implement first reference component**
Use Button as the contract example for component structure, variants, and tests.

**Step 4: Export public APIs**
Ensure only stable component entry points are exported.

**Step 5: Verify**
Run: `pnpm --filter @avenra/ui test`
Expected: Button test passes.

### Task 5: Docs app bootstrap

**Files:**
- Create: `e:\VSCodeSpace\avenra-ui\apps\docs\package.json`
- Create: `e:\VSCodeSpace\avenra-ui\apps\docs\app\layout.tsx`
- Create: `e:\VSCodeSpace\avenra-ui\apps\docs\app\page.tsx`
- Create: `e:\VSCodeSpace\avenra-ui\apps\docs\app\globals.css`
- Create: `e:\VSCodeSpace\avenra-ui\apps\docs\next.config.ts`

**Step 1: Scaffold Next.js docs app structure**
Use App Router and a minimal but branded shell.

**Step 2: Wire in tokens/themes/ui styles**
Import shared styling and fonts cleanly.

**Step 3: Add landing documentation page**
Explain Avenra UI positioning, package layout, and first components.

**Step 4: Add metadata baseline**
Set title, description, and theme color behavior.

**Step 5: Verify**
Run: `pnpm --filter @avenra/docs dev`
Expected: docs app starts successfully.

### Task 6: Storybook app bootstrap

**Files:**
- Create: `e:\VSCodeSpace\avenra-ui\apps\storybook\package.json`
- Create: `e:\VSCodeSpace\avenra-ui\apps\storybook\.storybook\main.ts`
- Create: `e:\VSCodeSpace\avenra-ui\apps\storybook\.storybook\preview.ts`
- Create: `e:\VSCodeSpace\avenra-ui\apps\storybook\stories\button.stories.tsx`

**Step 1: Set up Storybook package manifest**
Add scripts for local component preview.

**Step 2: Configure Storybook**
Load shared styles and React framework support.

**Step 3: Add first component story**
Use Button to prove package integration.

**Step 4: Verify rendering**
Ensure stories compile against the workspace package.

**Step 5: Verify**
Run: `pnpm --filter @avenra/storybook dev`
Expected: Storybook starts and shows Button stories.

### Task 7: Tooling and verification baseline

**Files:**
- Create: `e:\VSCodeSpace\avenra-ui\vitest.workspace.ts`
- Create: `e:\VSCodeSpace\avenra-ui\eslint.config.mjs`
- Create: `e:\VSCodeSpace\avenra-ui\prettier.config.mjs`

**Step 1: Add workspace test configuration**
Prepare package-aware Vitest execution.

**Step 2: Add lint config entry**
Consume shared configs at the root.

**Step 3: Add formatter baseline**
Keep style stable across packages and apps.

**Step 4: Add root script validation**
Ensure root scripts call the right package tasks.

**Step 5: Verify**
Run: `pnpm lint && pnpm test && pnpm typecheck`
Expected: baseline workspace passes or reports only known missing implementation tasks.

### Task 8: Commit checkpoint

**Files:**
- Modify: `e:\VSCodeSpace\avenra-ui\README.md`

**Step 1: Document bootstrap status**
Record current scope and next milestone.

**Step 2: Review workspace tree**
Confirm all package names and paths match plan.

**Step 3: Commit**
Run:
`git add .`
`git commit -m "chore: bootstrap avenra ui workspace"`

**Step 4: Verify**
Run: `git status`
Expected: clean working tree.
