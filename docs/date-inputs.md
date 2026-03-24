# Date Inputs

This document explains the current date-entry direction in Avenra UI.

Date input is a product-critical surface. It should not be treated as just another text field.

## Current state

The current public direction includes:

- `DatePicker`

`DateRangePicker` and broader date-entry expansion may arrive as later lines, but the current documented support starts with a single-date field.

## Why date input matters

Date input is one of the clearest separators between a basic component set and a product-grade UI library.

It requires:

- field semantics
- input/display formatting
- panel interaction
- keyboard support
- validation boundaries
- realistic documentation

## Current DatePicker direction

The current `DatePicker` direction is:

- field-shaped interaction
- overlay calendar interaction
- form semantics integration
- disabled / invalid / required alignment with the shared field contract

It should behave like part of the Avenra form system, not like a disconnected widget.

## Current boundary

What is true today:

- date input has entered the public surface
- docs and tests should reflect it as a real component line
- it is meaningful product progress

What is not being claimed yet:

- a complete enterprise date stack
- every advanced range, locale, and calendar behavior already solved
- final breadth across all scheduling and timeline patterns

## Product direction

The date-input line should grow carefully:

1. stable single-date entry
2. credible range selection
3. richer date and scheduling interactions only after the base is stable

This follows the same philosophy as the rest of Avenra UI: make each new line real before expanding the matrix.
