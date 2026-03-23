import Link from 'next/link';
import { Alert } from '@avenra/ui/src/components/alert/alert';
import { Badge } from '@avenra/ui/src/components/badge/badge';

import { featuredLinks } from '../../site-content';

export const metadata = {
  title: 'Getting Started'
};

export default function GettingStartedPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge variant="info" size="sm">
          Docs
        </Badge>
        <h1>Getting started</h1>
        <p>
          The repository is organized as a pnpm workspace with separate apps for docs and Storybook,
          plus packages for UI, tokens, themes, utilities, icons, and shared configs.
        </p>
      </section>

      <div className="content-grid">
        <article className="content-panel">
          <h2>How to read the workspace</h2>
          <ul className="content-list">
            <li>`apps/docs` is the project-facing documentation surface.</li>
            <li>`apps/storybook` is the isolated component sandbox.</li>
            <li>`packages/ui` is the React component package.</li>
            <li>`packages/tokens` and `packages/themes` define the styling contract.</li>
            <li>`packages/configs` and `packages/utils` keep the workspace consistent.</li>
          </ul>
        </article>

        <article className="content-panel">
          <h2>Suggested flow</h2>
          <ol className="content-list content-list--ordered">
            <li>Start in docs to understand package roles and current scope.</li>
            <li>Open Storybook while developing or reviewing a component.</li>
            <li>Make component or token changes in the packages, not in the docs app.</li>
            <li>Use build, test, lint, and typecheck before treating work as complete.</li>
          </ol>
        </article>
      </div>

      <Alert title="Current reality" variant="warning">
        The docs site is still catching up with the codebase. Treat it as an honest map of the current
        repository, not as finished external product marketing.
      </Alert>

      <section className="link-grid" aria-label="Next docs pages">
        {featuredLinks.map((item) => (
          <Link key={item.href} href={item.href} className="doc-link-tile">
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
