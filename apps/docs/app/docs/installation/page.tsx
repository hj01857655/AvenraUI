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
          Use this page for two paths: evaluating the package-consumer contract, or running the
          repository locally to inspect docs and Storybook before wider adoption.
        </p>
      </section>

      <div className="content-grid">
        <article className="content-panel">
          <h2>Install the package</h2>
          <CodeBlock lines={commandSnippets.packageInstall} />
          <p>
            The current package peer range is built around React 19. Use the package root as the
            component entrypoint instead of reaching into implementation paths.
          </p>
        </article>

        <article className="content-panel">
          <h2>Use the documented import shape</h2>
          <CodeBlock lines={commandSnippets.packageUsage} />
          <p>
            This is the intended consumer-facing usage pattern documented by the site and README.
          </p>
        </article>
      </div>

      <div className="content-grid">
        <article className="content-panel">
          <h2>Bootstrap the workspace</h2>
          <CodeBlock lines={commandSnippets.repoInstall} />
        </article>

        <article className="content-panel">
          <h2>Run the docs surfaces</h2>
          <CodeBlock lines={commandSnippets.dev} />
          <p>
            Use the docs app to read the product surface and Storybook to inspect isolated
            component behavior while the library is still expanding.
          </p>
        </article>
      </div>

      <article className="content-panel">
        <h2>Verification commands</h2>
        <CodeBlock lines={commandSnippets.quality} />
      </article>

      <article className="content-panel">
        <h2>Current install guidance</h2>
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
