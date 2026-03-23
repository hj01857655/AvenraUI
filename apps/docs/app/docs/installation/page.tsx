import { Badge } from '@avenra/ui/src/components/badge/badge';

import { PagerNav } from '../../pager-nav';
import { commandSnippets, installationSteps } from '../../site-content';
import { getAdjacentPages } from '../../site-content';

export const metadata = {
  title: 'Installation'
};

function CodeBlock({ lines }: { lines: readonly string[] }) {
  return (
    <pre className="code-block">
      <code>{lines.join('\n')}</code>
    </pre>
  );
}

export default function InstallationPage() {
  const { previous, next } = getAdjacentPages('/docs/installation');

  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge variant="info" size="sm">
          Docs
        </Badge>
        <h1>Installation</h1>
        <p>
          The current setup is workspace-first. Start the repository locally, run the docs app and
          Storybook, and keep verification at the workspace level.
        </p>
      </section>

      <div className="content-grid">
        <article className="content-panel">
          <h2>Bootstrap the repo</h2>
          <CodeBlock lines={commandSnippets.install} />
        </article>

        <article className="content-panel">
          <h2>Run the apps</h2>
          <CodeBlock lines={commandSnippets.dev} />
        </article>
      </div>

      <article className="content-panel">
        <h2>Quality commands</h2>
        <CodeBlock lines={commandSnippets.quality} />
      </article>

      <article className="content-panel">
        <h2>What to expect</h2>
        <ol className="content-list content-list--ordered">
          {installationSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>

      <PagerNav previous={previous} next={next} />
    </div>
  );
}
