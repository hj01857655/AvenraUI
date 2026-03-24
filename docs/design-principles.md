# Design Principles

This document explains the product and API principles that currently guide Avenra UI.

These principles exist to keep the library from drifting into a pile of unrelated components.

## 1. React first

Avenra UI should feel native to modern React usage.

That means:

- controlled and uncontrolled patterns should be intentional
- composition should be preferred over rigid framework-style APIs
- field and overlay interactions should respect React application realities such as SSR and app-router environments

## 2. Support clarity over vague breadth

Exported does not automatically mean equally stable.

Avenra UI should continue to distinguish:

- what is stable
- what is experimental
- what is still directionally important but not yet support-contract complete

This is product honesty, not weakness.

## 3. Component groups matter more than isolated wins

The library should not optimize around random component count.

It should optimize around credible groups:

- form and field primitives
- selection and search
- overlay and feedback
- date entry
- data display

When a group feels coherent, the whole library becomes easier to adopt.

## 4. Documentation is part of the product

Docs are not a trailing artifact.

They should explain:

- what a component does
- when it should be used
- when a nearby component is the better choice
- what support level the component currently has

## 5. Design-system depth before surface inflation

Tokens, themes, state semantics, and group consistency should improve alongside component breadth.

This reduces the chance that the library becomes large but internally inconsistent.

## 6. Honest maturity signals

Avenra UI should not overclaim.

It is better to present:

- a credible support contract
- a clear product direction
- real documentation

than to imply a complete matrix that does not yet exist.
