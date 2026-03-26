# Stable Surface Governance

This document defines the current Avenra UI support split between the stable surface and the experimental / in-progress surface.

## Policy

- **Stable** means the component is part of the current formal Avenra UI support contract.
- **Experimental / in-progress** means the component is exported and documented today, but its API, behavior, or support expectations may still change while the contract settles.
- The goal of this split is governance clarity, not hiding useful work that already exists in the repository.

## Stable

- Alert
- Avatar
- Badge
- Breadcrumb
- Button
- Card
- Checkbox
- Dialog
- EmptyState
- IconButton
- Inline
- Input
- Popover
- Progress
- Radio
- Select
- Stack
- Steps
- Switch
- Tabs
- Textarea
- Tooltip

## Experimental / in-progress

- Autocomplete
- Cascader
- Combobox
- Command
- DataGrid
- DatePicker
- DateRangePicker
- Drawer
- DropdownMenu
- FilterBar
- Form
- FormField
- MultiSelect
- Pagination
- Skeleton
- TagInput
- Tree
- Toast
- Upload

## Expression alignment

The same split should stay aligned across:

- `packages/ui/src/index.ts`
- `apps/docs/app/components/component-catalog.ts`
- `apps/docs/app/components/component-docs.ts`
- `README.md`
