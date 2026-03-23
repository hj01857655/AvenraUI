import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Card } from '@avenra/ui/src/components/card/card';

import { componentGroups } from '../site-content';

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

      <section className="component-groups" aria-label="Component groups">
        {componentGroups.map((group) => (
          <Card
            key={group.title}
            title={group.title}
            description={group.description}
            className="surface-card component-group"
          >
            <ul className="component-list">
              {group.items.map((item) => (
                <li key={item}>
                  <Badge variant="neutral" size="sm">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </section>
    </div>
  );
}
