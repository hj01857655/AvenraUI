import Link from 'next/link';
import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Card } from '@avenra/ui/src/components/card/card';

import { PagerNav } from '../pager-nav';
import type { ComponentDoc } from './component-docs';

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}

export function ComponentDocView({
  doc,
  previous,
  next
}: {
  doc: ComponentDoc;
  previous: ComponentDoc | null;
  next: ComponentDoc | null;
}) {
  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge variant="info" size="sm">
          {doc.category}
        </Badge>
        <h1>{doc.title}</h1>
        <p>{doc.summary}</p>
      </section>

      <div className="content-grid">
        <article className="content-panel">
          <h2>When to use</h2>
          <p>{doc.usage}</p>
        </article>

        <article className="content-panel">
          <h2>Import</h2>
          <CodeBlock code={doc.packageImport} />
          <p>
            Import from the public package entry in app code. The docs use direct source imports
            only for repository-local rendering.
          </p>
        </article>
      </div>

      <article className="content-panel">
        <h2>Example</h2>
        <CodeBlock code={doc.exampleCode} />
      </article>

      <section className="component-doc-sections">
        {doc.sections.map((section) => (
          <Card
            key={section.title}
            title={section.title}
            description={section.body}
            className="surface-card"
          />
        ))}
      </section>

      <div className="component-doc-backlink">
        <Link href="/components">Back to component directory</Link>
      </div>

      <PagerNav
        previous={previous ? { href: `/components/${previous.slug}`, label: previous.title } : null}
        next={next ? { href: `/components/${next.slug}`, label: next.title } : null}
      />
    </div>
  );
}
