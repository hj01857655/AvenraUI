import { Alert } from '@avenra/ui/src/components/alert/alert';
import { Badge } from '@avenra/ui/src/components/badge/badge';

import { PagerNav } from '../../pager-nav';
import { getAdjacentPages } from '../../site-content';
import { commandSnippets, themingBoundaryNotes, themingLayers, themingPrinciples } from '../../site-content';

export const metadata = {
  title: 'Theming'
};

function CodeBlock({ lines }: { lines: readonly string[] }) {
  return (
    <pre className="code-block">
      <code>{lines.join('\n')}</code>
    </pre>
  );
}

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
          Avenra UI uses a layered styling model: raw tokens, theme decisions, and component styles
          consuming that contract. This page explains the model without pretending every styling
          layer is already a mature standalone public product.
        </p>
      </section>

      <div className="content-grid">
        <article className="content-panel">
          <h2>Current styling entry</h2>
          <CodeBlock lines={commandSnippets.packageUsage} />
          <p>
            The current docs surface points adopters to the UI package and its styles entry first,
            because that is the clearest documented path today.
          </p>
        </article>

        <article className="content-panel">
          <h2>Layering model</h2>
          <ul className="content-list">
            {themingLayers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="content-grid">
        <article className="content-panel">
          <h2>Guiding rules</h2>
          <ul className="content-list">
            {themingPrinciples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="content-panel">
          <h2>Override direction</h2>
          <CodeBlock
            lines={[
              ':root {',
              '  --color-primary: #7c3aed;',
              '  --color-primary-strong: #6d28d9;',
              '  --color-surface: #ffffff;',
              '  --color-text: #111827;',
              '}',
              '',
              '.theme-dark {',
              '  --color-surface: #0f172a;',
              '  --color-text: #f8fafc;',
              '}'
            ]}
          />
        </article>
      </div>

      <Alert title="Current scope" variant="info">
        The repository already has separate `tokens` and `themes` packages, but the public docs are
        intentionally careful: they describe the layering model and override direction more than a
        fully expanded public theming API.
      </Alert>

      <article className="content-panel">
        <h2>Boundary notes</h2>
        <ul className="content-list">
          {themingBoundaryNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <PagerNav previous={previous} next={next} />
    </div>
  );
}
