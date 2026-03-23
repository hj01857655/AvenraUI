'use client';

import Link from 'next/link';
import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Card } from '@avenra/ui/src/components/card/card';

import { homepageShowcaseEntries } from './components/component-catalog';
import { ComponentPreview } from './components/component-preview';

export function HomeComponentShowcase() {
  return (
    <div className="home-showcase-grid" aria-label="Homepage component showcase">
      {homepageShowcaseEntries.map((entry) => (
        <Card
          key={entry.slug}
          title={entry.title}
          description={entry.summary}
          actions={
            <Badge variant="info" size="sm">
              Spotlight
            </Badge>
          }
          className="surface-card"
        >
          <div className="home-showcase-card__preview">
            <ComponentPreview slug={entry.slug} />
          </div>
          <div className="home-showcase-card__actions">
            <Link href={entry.href} className="doc-card__link">
              Open {entry.title} doc
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
