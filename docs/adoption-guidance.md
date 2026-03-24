# Adoption Guidance

This document explains how to evaluate and adopt Avenra UI at its current maturity.

The goal is not to encourage indiscriminate use of every exported component. The goal is to make the support boundary clear enough that a team can adopt the library intentionally.

## Recommended adoption posture

There are currently two practical ways to adopt Avenra UI:

### 1. Stable-surface adoption

Use the current stable surface as the formal support contract for production interfaces.

This is the recommended path for:

- product teams that want lower change risk
- teams introducing Avenra UI into an existing codebase
- teams that need a predictable component baseline first

See `docs/stable-components.md` for the current stable list.

### 2. Foundation-plus-evaluation adoption

Adopt the stable surface in production, while evaluating selected experimental components behind controlled internal usage.

This is the recommended path for:

- teams building closely with the current expansion direction
- teams willing to absorb some API movement in exchange for earlier access to higher-value components
- internal product teams that can update quickly as the surface hardens

## What to treat as stable today

Treat the stable surface as the current production baseline.

That means:

- prefer stable components first
- use experimental components selectively
- do not assume “exported” automatically means “support contract complete”

## What to treat as experimental today

Experimental / in-progress components are useful and real, but should be adopted with explicit awareness that:

- their API may still move
- behavior may still tighten
- docs may still evolve as the component line hardens

This is a support statement, not a quality insult. Some experimental components are already very usable. The point is governance clarity.

## Good adoption patterns

Good current adoption patterns include:

- building production pages on the stable surface first
- using documented field and overlay contracts consistently
- evaluating experimental components in scoped flows before broad rollout
- keeping your own wrapper layer thin if you expect to absorb fast-moving improvements

## Bad adoption patterns

Avoid:

- treating every exported component as equally final
- depending on undocumented behavior from experimental components
- skipping the stable / experimental split when planning production rollout
- assuming the current matrix already covers every enterprise-heavy pattern

## Current recommendation

If your goal is long-lived production use today:

1. adopt the stable surface first
2. evaluate the experimental surface selectively
3. follow the product-direction docs as the matrix expands

That is the most realistic way to use Avenra UI while the library is still climbing toward a broader product-grade surface.
