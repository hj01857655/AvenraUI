import Link from 'next/link';
import { Alert } from '@avenra/ui/src/components/alert/alert';
import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Card } from '@avenra/ui/src/components/card/card';

import { componentGroups } from '../../site-content';
import { PagerNav } from '../../pager-nav';
import {
  adoptionChecklist,
  currentPositioningNotes,
  featuredLinks,
  getAdjacentPages
} from '../../site-content';

export const metadata = {
  title: 'Getting Started'
};

export default function GettingStartedPage() {
  const { previous, next } = getAdjacentPages('/docs/getting-started');

  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge variant="info" size="sm">
          Docs
        </Badge>
        <h1>Getting started</h1>
        <p>
          Start here if you need the shortest honest answer to three questions: what Avenra UI is,
          what can be adopted today, and which docs pages to open next.
        </p>
      </section>

      <div className="content-grid">
        <article className="content-panel">
          <h2>What Avenra UI is today</h2>
          <ul className="content-list">
            {currentPositioningNotes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="content-panel">
          <h2>Recommended first route</h2>
          <ol className="content-list content-list--ordered">
            {adoptionChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Current scope</p>
          <h2>Read the component surface by group before assuming broader product coverage.</h2>
          <p>
            The current docs are strongest around foundation components. This is the right place to
            judge whether the library already covers your immediate UI needs.
          </p>
        </div>

        <div className="feature-grid">
          {componentGroups.map((group) => (
            <Card
              key={group.title}
              title={group.title}
              description={group.description}
              className="surface-card"
            >
              <p className="component-group__usage">{group.items.join(', ')}</p>
            </Card>
          ))}
        </div>
      </section>

      <Alert title="Current reality" variant="warning">
        Treat this docs site as an honest adoption map of the current repository. It is stronger on
        real foundation coverage than on broad completeness claims.
      </Alert>

      <section className="link-grid" aria-label="Next docs pages">
        {featuredLinks.map((item) => (
          <Link key={item.href} href={item.href} className="doc-link-tile">
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </Link>
        ))}
      </section>

      <PagerNav previous={previous} next={next} />
    </div>
  );
}
