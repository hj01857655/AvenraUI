# Selection Components

This document explains how the current Avenra UI selection components are meant to be used.

The point is not to maximize overlap. The point is to make the right component choice obvious.

## Quick mapping

- `Select` — compact single selection from a short stable list
- `Combobox` — searchable single selection in a field-style experience
- `Autocomplete` — typeahead suggestions when the query should drive the result set
- `MultiSelect` — multiple selected values with one searchable selection surface
- `TagInput` — tokenized free-form or assisted multi-value input
- `Checkbox` — independent binary choices
- `Radio` — mutually exclusive visible options
- `Switch` — immediate setting toggle

## Select

Use `Select` when:

- the option set is small
- the labels are stable
- native browser select behavior is acceptable
- the user does not need search

Do not use `Select` when the list is large enough that filtering is the real interaction.

## Combobox

Use `Combobox` when:

- the user needs a single selected value
- the list should be searchable
- the interaction still belongs to a field-shaped form control

This is the right choice when search improves usability, but the component still behaves like a single-value field.

## Autocomplete

Use `Autocomplete` when:

- query text should progressively reveal suggestions
- results should not appear until the user has supplied enough signal
- the user is typing toward a suggestion rather than browsing a complete list

`Autocomplete` is not just a prettier `Select`. It is a suggestion-first interaction.

## MultiSelect

Use `MultiSelect` when:

- the user needs multiple chosen values
- the selection space is still structured
- search and chip-like selected values both matter

This is the structured, many-value counterpart to `Combobox`.

## TagInput

Use `TagInput` when:

- values are multi-item
- tokenized entry is useful
- the user may add values quickly through input-style interaction

`TagInput` should be treated as a tokenized input surface, not merely a visual alternative to `MultiSelect`.

## Checkbox, Radio, Switch

These are not interchangeable.

- `Checkbox` = independent yes/no items inside a set
- `Radio` = one of several visible options
- `Switch` = immediate on/off setting

If the interaction is a setting toggle, use `Switch`.
If the interaction is picking one option from a visible set, use `Radio`.
If the interaction is multiple independent toggles, use `Checkbox`.

## Current product direction

The current selection direction in Avenra UI is to make these roles clearer over time, not blur them together. The product should become easier to choose correctly as the library grows.
