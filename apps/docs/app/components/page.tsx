import Link from 'next/link';
import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Card } from '@avenra/ui/src/components/card/card';

import { componentCatalogGroups } from './component-catalog';

export const metadata = {
  title: 'Components'
};

export default function ComponentsPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge variant="info" size="sm">
          Component directory
        </Badge>
        <h1>Current component surface</h1>
        <p>
          This page tracks the first visible wave of primitives already present in the repository.
          It is a catalog of what exists now, not a promise that every future component is already done.
        </p>
      </section>

      {componentCatalogGroups.map((group) => {
        return (
          <section key={group.title} className="section-block" aria-labelledby={`group-${group.title}`}>
            <div className="section-heading">
              <p className="section-heading__eyebrow">Component group</p>
              <h2 id={`group-${group.title}`}>{group.title}</h2>
              <p>{group.description}</p>
            </div>

            <div className="component-groups">
              {group.docs.map((doc) => (
                <Card
                  key={doc.slug}
                  title={doc.title}
                  description={doc.summary}
                  className="surface-card component-group"
                >
                  <div className="component-group__meta">
                    <Badge variant="neutral" size="sm">
                      {doc.slug}
                    </Badge>
                  </div>
                  <p className="component-group__usage">{doc.usage}</p>
                  <div className="component-group__actions">
                    <Link href={`/components/${doc.slug}`} className="doc-card__link">
                      Open {doc.title} doc
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
