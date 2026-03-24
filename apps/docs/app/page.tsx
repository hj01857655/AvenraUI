import Link from 'next/link';
import { Alert } from '@avenra/ui/src/components/alert/alert';
import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Card } from '@avenra/ui/src/components/card/card';

import {
  adoptionChecklist,
  componentCount,
  componentGroups,
  featureCards,
  featuredLinks,
  themingBoundaryNotes,
  repositoryFacts
} from './site-content';
import { HomeComponentShowcase } from './home-component-showcase';

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-copy">
          <Badge variant="info" size="sm">
            Docs adoption line
          </Badge>
          <h1>A UI system for shipping real product interfaces.</h1>
          <p className="hero-copy__lead">
            Avenra UI is a React component library and design-system workspace. This docs site is
            the minimal external adoption entry: what the library is, what exists today, how to
            start, and where the current limits still are.
          </p>
          <div className="hero-copy__actions">
            <Link href="/docs/getting-started" className="cta-link cta-link--primary">
              Getting started
            </Link>
            <Link href="/docs/installation" className="cta-link cta-link--secondary">
              Installation
            </Link>
            <Link href="/components" className="cta-link cta-link--secondary">
              Components
            </Link>
          </div>
          <ul className="fact-list" aria-label="Repository facts">
            {repositoryFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <div className="hero-panel">
          <div className="hero-panel__metric">
            <span>Current documented surface</span>
            <strong>{componentCount} components in the current foundation wave</strong>
          </div>
          <Alert title="Current adoption boundary" variant="info">
            The docs are now structured for adoption, but they still stay honest: Avenra UI is in a
            strong foundation phase, not at full Element-class breadth yet.
          </Alert>
          <ol className="content-list content-list--ordered">
            {adoptionChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Component spotlight</p>
          <h2>Homepage previews now come from the same docs catalog as the component pages.</h2>
          <p>
            The homepage is no longer a pile of ad hoc demo blocks. It now highlights a curated
            subset of completed components from the shared docs registry.
          </p>
        </div>

        <HomeComponentShowcase />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-heading__eyebrow">What is available now</p>
          <h2>Adoption starts with a documented foundation, not an inflated promise.</h2>
          <p>
            The current docs focus on the first wave of real package surface: common controls,
            component docs, theming direction, and a clean install-and-read path for adopters.
          </p>
        </div>

        <div className="feature-grid">
          {featureCards.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              description={item.description}
              actions={<Badge variant="warning" size="sm">{item.eyebrow}</Badge>}
              className="surface-card"
            />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Usage contract</p>
          <h2>Use the package root as the main entry and treat deeper internals as implementation detail.</h2>
          <p>
            The docs point adopters toward the package-level component entry, while also being
            clear that theming and styling are still stabilizing as a broader public surface.
          </p>
        </div>

        <div className="content-grid">
          <article className="content-panel">
            <h2>Current component groups</h2>
            <ul className="content-list">
              {componentGroups.map((group) => (
                <li key={group.title}>
                  <strong>{group.title}:</strong> {group.items.slice(0, 4).join(', ')}
                  {group.items.length > 4 ? ', …' : ''}
                </li>
              ))}
            </ul>
          </article>

          <article className="content-panel">
            <h2>Current boundary notes</h2>
            <ul className="content-list">
              {themingBoundaryNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Start here</p>
          <h2>Use the docs like a working map of the current product surface.</h2>
        </div>

        <div className="feature-grid">
          {featuredLinks.map((item) => (
            <article key={item.href} className="doc-card">
              <h3>{item.label}</h3>
              <p>{item.description}</p>
              <Link href={item.href} className="doc-card__link">
                Open page
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
