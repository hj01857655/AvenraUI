# Avenra Docs Site Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn `apps/docs` from a single landing page into a usable combined marketing site and documentation entrypoint.

**Architecture:** Keep the Next.js App Router app simple and file-based. Introduce shared site-content helpers for navigation and page metadata, add a reusable docs shell, expand route coverage with focused marketing/docs pages, and unify the visual system in `globals.css` so the site feels intentional without adding unnecessary framework weight.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Vitest, Testing Library, CSS

---

### Task 1: Lock the docs information architecture with tests

**Files:**
- Create: `E:\VSCodeSpace\avenra-ui\apps\docs\app\page.test.tsx`
- Modify: `E:\VSCodeSpace\avenra-ui\vitest.config.ts`

**Step 1: Write the failing test**
Assert that the docs homepage exposes top-level navigation and links into the docs structure.

**Step 2: Run test to verify it fails**
Run: `pnpm exec vitest run apps/docs/app/page.test.tsx`
Expected: FAIL because the current homepage does not expose the required docs-site navigation.

**Step 3: Add the minimal test support**
Update Vitest aliases so the docs app can import workspace packages during tests.

**Step 4: Re-run the test**
Run: `pnpm exec vitest run apps/docs/app/page.test.tsx`
Expected: FAIL with assertion mismatch instead of module-resolution failure.

### Task 2: Add shared site content and a reusable shell

**Files:**
- Create: `E:\VSCodeSpace\avenra-ui\apps\docs\app\site-content.ts`
- Create: `E:\VSCodeSpace\avenra-ui\apps\docs\app\site-shell.tsx`
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\layout.tsx`

**Step 1: Define navigation and page-summary data**
Centralize the docs navigation, featured links, and component catalog in one place.

**Step 2: Add a reusable shell**
Create a shared site frame with header, nav, footer, and page wrapper.

**Step 3: Wire the shell into layout**
Keep metadata minimal and make all pages use the shared frame.

### Task 3: Expand the route structure

**Files:**
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\page.tsx`
- Create: `E:\VSCodeSpace\avenra-ui\apps\docs\app\components\page.tsx`
- Create: `E:\VSCodeSpace\avenra-ui\apps\docs\app\docs\getting-started\page.tsx`
- Create: `E:\VSCodeSpace\avenra-ui\apps\docs\app\docs\installation\page.tsx`
- Create: `E:\VSCodeSpace\avenra-ui\apps\docs\app\docs\theming\page.tsx`

**Step 1: Rebuild the homepage**
Make it a real combined marketing/docs index with clear sections and calls to action.

**Step 2: Add component-directory page**
List current components and group them by category.

**Step 3: Add the first documentation pages**
Provide getting started, installation, and theming guidance that matches the current repository state.

### Task 4: Redesign the site styling

**Files:**
- Modify: `E:\VSCodeSpace\avenra-ui\apps\docs\app\globals.css`

**Step 1: Establish a distinct visual direction**
Replace the generic initial styles with a clearer editorial/product-docs aesthetic.

**Step 2: Style shared shell and content blocks**
Support header, navigation, hero, docs cards, code blocks, and responsive layouts.

**Step 3: Verify responsive behavior in CSS**
Ensure mobile and desktop layouts both read cleanly.

### Task 5: Verify behavior

**Files:**
- Test: `E:\VSCodeSpace\avenra-ui\apps\docs\app\page.test.tsx`

**Step 1: Run focused docs tests**
Run: `pnpm exec vitest run apps/docs/app/page.test.tsx`
Expected: PASS

**Step 2: Run docs build**
Run: `pnpm --filter @avenra/docs build`
Expected: PASS
