import Link from 'next/link';
import { Alert } from '@avenra/ui/src/components/alert/alert';
import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Card } from '@avenra/ui/src/components/card/card';
import { Skeleton } from '@avenra/ui/src/components/skeleton/skeleton';

import {
  componentCount,
  componentGroups,
  featureCards,
  featuredLinks,
  repositoryFacts
} from './site-content';

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-copy">
          <Badge variant="info" size="sm">
            Combined marketing site and docs entry
          </Badge>
          <h1>A UI system for shipping real product interfaces.</h1>
          <p className="hero-copy__lead">
            Avenra UI is being built as a React-first design system workspace: tokens, themes,
            components, docs, and Storybook moving together instead of drifting apart.
          </p>
          <div className="hero-copy__actions">
            <Link href="/components" className="cta-link cta-link--primary">
              Components
            </Link>
            <Link href="/docs/getting-started" className="cta-link cta-link--secondary">
              Getting started
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
            <span>Current documented direction</span>
            <strong>{componentCount}+ components in the first visible wave</strong>
          </div>
          <Alert title="Current phase" variant="info">
            The repository is still in build-out mode. The goal right now is a strong foundation,
            not a bloated catalog.
          </Alert>
          <div className="badge-cluster">
            {componentGroups.flatMap((group) => group.items).slice(0, 10).map((item) => (
              <Badge key={item} variant="neutral" size="sm">
                {item}
              </Badge>
            ))}
          </div>
          <article className="surface-card" aria-label="Loading preview">
            <h3>Loading states preview</h3>
            <p>Skeleton placeholders keep layout stable while docs and dashboards fetch real data.</p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <Skeleton width="42%" height="0.875rem" />
              <Skeleton width="100%" height="3rem" shape="rounded" />
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Skeleton shape="circular" size="lg" />
                <div style={{ display: 'grid', gap: '0.5rem', flex: 1 }}>
                  <Skeleton width="55%" height="0.875rem" />
                  <Skeleton width="85%" height="0.875rem" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-heading__eyebrow">What is shipping now</p>
          <h2>Foundation work is the product right now.</h2>
          <p>
            This stage is about making the system coherent: package boundaries, visual primitives,
            docs surfaces, and predictable development workflow.
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
          <p className="section-heading__eyebrow">Start here</p>
          <h2>Use the docs like a working map of the repository.</h2>
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
