# Form Experience

This document defines the current Avenra UI form contract.

The goal is not simply to render individual inputs. The goal is to make the whole form experience read as one product system with one shared semantic model.

## Core contract

The current form contract is built around three layers:

1. `Form`
2. `FormField`
3. the concrete field control

Each layer has a different responsibility.

## Form

`Form` keeps the native `<form>` element and preserves browser form semantics.

Current expectations:

- use the native form element as the surface
- propagate `disabled` and `submitting` state through form context
- avoid creating a custom orchestration layer that fights the platform

## FormField

`FormField` is the shared field shell.

It is responsible for:

- visible field label
- hint text
- error text
- required semantics
- invalid state
- disabled semantics
- wiring shared accessibility ids and descriptions

This is the current consistency anchor for the form experience.

## Field controls

Concrete fields are responsible for rendering and interaction, while aligning with the shared shell contract.

### Text and selection fields

These fields can own the full field shell directly or inherit it from `FormField`:

- `Input`
- `Select`
- `Textarea`
- `Combobox`
- `Autocomplete`
- `DatePicker`
- `MultiSelect`
- `TagInput`

### Choice controls

These controls keep their own visible label and should use `FormField layout="control"` when shared hint or error messaging is needed:

- `Checkbox`
- `Radio`
- `Switch`

## Why this matters

Without one shared field contract, every new component line invents its own version of:

- label placement
- disabled rules
- invalid styling
- hint/error placement
- `aria-describedby`

That is exactly the kind of drift Avenra UI is trying to avoid.

## Current product direction

The form system is being hardened before the library expands into heavier data-entry surfaces. That means the current priority is consistency and predictability, not maximum field count at any cost.

## Current boundary

The current contract should be treated as real and intentional, but not final forever. As heavier fields arrive, the contract can expand. It should not fragment.
