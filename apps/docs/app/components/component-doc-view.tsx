import Link from 'next/link';
import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Card } from '@avenra/ui/src/components/card/card';

import { PagerNav } from '../pager-nav';
import { ComponentPreview } from './component-preview';
import type { ComponentDoc } from './component-docs';

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}

function ListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="content-panel">
      <h2>{title}</h2>
      <ul className="content-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
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
  const usageSupportSuffix =
    doc.support === 'stable'
      ? ' This component is part of the current stable support surface.'
      : ' This component is currently experimental / in-progress and may change while the support contract is still settling.';
  const usageBody = doc.usage.endsWith(usageSupportSuffix)
    ? doc.usage.slice(0, -usageSupportSuffix.length)
    : doc.usage;
  const visibleSections = doc.sections.filter((section) => section.title !== 'Support status');

  return (
    <div className="page-stack">
      <section className="page-header">
        <Badge variant="info" size="sm">
          {doc.category}
        </Badge>
        <Badge variant={doc.support === 'stable' ? 'success' : 'warning'} size="sm">
          {doc.supportLabel}
        </Badge>
        <h1>{doc.title}</h1>
        <p>{doc.summary}</p>
        <p>{doc.supportSummary}</p>
      </section>

      <div className="content-grid">
        <article className="content-panel">
          <h2>When to use</h2>
          <p>{usageBody}</p>
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
        <h2>Preview</h2>
        <ComponentPreview slug={doc.slug} />
      </article>

      <article className="content-panel">
        <h2>Example</h2>
        <CodeBlock code={doc.exampleCode} />
      </article>

      <section className="component-doc-meta-grid">
        <article className="content-panel">
          <h2>Props</h2>
          <dl className="component-prop-list">
            {doc.props.map((prop) => (
              <div key={prop.name} className="component-prop-list__item">
                <div className="component-prop-list__header">
                  <code>{prop.name}</code>
                  {prop.required ? (
                    <Badge variant="warning" size="sm">
                      Required
                    </Badge>
                  ) : (
                    <Badge variant="neutral" size="sm">
                      Optional
                    </Badge>
                  )}
                </div>
                <p className="component-prop-list__type">{prop.type}</p>
                <p className="component-prop-list__description">{prop.description}</p>
              </div>
            ))}
          </dl>
        </article>

        <ListPanel title="States" items={doc.states} />
        <ListPanel title="Accessibility" items={doc.accessibility} />
      </section>

      <section className="component-doc-sections">
        {visibleSections.map((section) => (
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
