import { Alert } from '@avenra/ui/src/components/alert/alert';
import { Badge } from '@avenra/ui/src/components/badge/badge';

import { PagerNav } from '../../pager-nav';
import { getAdjacentPages } from '../../site-content';
import { themingPrinciples } from '../../site-content';

export const metadata = {
  title: 'Theming'
};

export default function ThemingPage() {
  const { previous, next } = getAdjacentPages('/docs/theming');

  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge variant="info" size="sm">
          Docs
        </Badge>
        <h1>Theming and styling</h1>
        <p>
          Avenra UI is being shaped around a layered contract: raw tokens, theme compositions, and
          component styles that consume those values instead of redefining them inline.
        </p>
      </section>

      <div className="content-grid">
        <article className="content-panel">
          <h2>The intended stack</h2>
          <ul className="content-list">
            <li>Tokens define primitives such as color, spacing, radius, shadow, and motion.</li>
            <li>Themes turn those primitives into semantic meaning.</li>
            <li>Components read from that theme contract to stay visually aligned.</li>
          </ul>
        </article>

        <article className="content-panel">
          <h2>Current guiding rules</h2>
          <ul className="content-list">
            {themingPrinciples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <Alert title="Current scope" variant="info">
        The repository already has separate `tokens` and `themes` packages, but the docs are still
        describing the intended layering more than a polished public API. That is normal for this phase.
      </Alert>

      <PagerNav previous={previous} next={next} />
    </div>
  );
}
