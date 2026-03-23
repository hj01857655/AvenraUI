# Avenra UI Design

## Product Positioning
Avenra UI is a React-first component library and design system platform focused on modern product interfaces. It targets teams that want a branded, extensible, accessible UI foundation rather than a one-off component dump.

## Goals
- Build a reusable React UI library with TypeScript-first APIs.
- Establish a design-token foundation for color, typography, spacing, radius, shadow, motion, and layering.
- Support light and dark themes from the first release.
- Provide a polished documentation site and isolated component workbench.
- Keep architecture open for future package expansion such as icons, additional themes, and framework adapters.

## Scope for Phase 1
- Monorepo workspace using pnpm.
- Packages for `ui`, `tokens`, `themes`, `icons`, `utils`, and shared `configs`.
- Next.js docs app and Storybook app.
- Core component families: actions, form controls, feedback, overlay, navigation, and display primitives.
- Testing, linting, strict TypeScript, and library build pipeline.

## Deferred Scope
- Heavy data components such as DataTable, DatePicker, Tree, rich text editor, and charting.
- Multi-framework adapters.
- Visual regression infrastructure beyond Storybook-ready setup.

## Architecture
### Monorepo Structure
- `apps/docs`: product-facing docs and component examples.
- `apps/storybook`: isolated component development and preview environment.
- `packages/tokens`: raw design tokens and exported CSS variables.
- `packages/themes`: theme compositions built on top of tokens.
- `packages/ui`: React components and styling primitives.
- `packages/icons`: icon wrappers and internal icon exports.
- `packages/utils`: shared hooks and low-level helpers.
- `packages/configs`: reusable TypeScript, ESLint, Tailwind, and other shared config.

### Styling Model
- Tailwind CSS for app/docs ergonomics and rapid UI assembly.
- CSS variables as the stable cross-package contract for theming.
- Semantic design tokens instead of hardcoded colors inside components.
- Light and dark themes shipped together from the start.

### Component Strategy
- Start with high-frequency primitives and composition-friendly APIs.
- Keep interaction states accessible with visible focus rings, keyboard support, and proper disabled/loading behavior.
- Use SVG-based icons only, with consistent sizing and stroke rules.
- Ensure responsive behavior and no mobile horizontal overflow by default.

## Quality Standards
- TypeScript strict mode.
- ESLint and formatting baseline.
- Unit and interaction tests with Vitest and Testing Library.
- Storybook stories for component behavior and variants.
- Accessibility-aware defaults including labels, contrast, focus states, and reduced-motion support.

## First Component Wave
- Button
- IconButton
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Badge
- Avatar
- Card
- Tabs
- Dialog
- Drawer
- Tooltip
- Popover
- DropdownMenu
- Toast
- Alert
- Skeleton
- Progress
- Breadcrumb
- Pagination

## Brand Decision
- Brand name: Avenra UI
- Repository / workspace name: `avenra-ui`
- Planned package namespace: `@avenra/*`

## Success Criteria
- Repository can install with pnpm workspace.
- Docs app and Storybook app have a clear place in the workspace.
- Shared package boundaries are established before feature implementation.
- Architecture is ready for iterative component delivery without renaming or restructuring the project later.
