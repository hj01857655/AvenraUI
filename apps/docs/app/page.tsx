'use client';

import '@avenra/ui/src/styles.css';
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Dialog,
  EmptyState,
  IconButton,
  Inline,
  Input,
  Popover,
  Progress,
  Radio,
  Select,
  Stack,
  Switch,
  Textarea,
  Tooltip
} from '@avenra/ui';

const highlights = [
  'React-first component APIs with TypeScript-first typing.',
  'Semantic tokens and light/dark themes designed as a shared contract.',
  'Accessible interaction defaults for product-grade buttons and beyond.'
];

export default function HomePage() {
  return (
    <main className="docs-home">
      <section className="docs-hero">
        <div className="docs-hero__copy">
          <span className="docs-eyebrow">Avenra UI</span>
          <h1>Build calm, polished interfaces with a design-system core.</h1>
          <p>
            Avenra UI is a React-first component library with tokens, themes, docs, and
            Storybook workflows shaped for modern SaaS products.
          </p>
          <div className="docs-hero__actions">
            <Button size="lg">Explore components</Button>
            <Button size="lg" variant="secondary">
              Read design principles
            </Button>
          </div>
        </div>

        <div className="docs-preview-card" aria-label="Avenra component preview examples">
          <div className="docs-preview-card__header">
            <span className="docs-preview-card__dot" />
            <span className="docs-preview-card__dot" />
            <span className="docs-preview-card__dot" />
          </div>
          <div className="docs-preview-card__body">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Avatar name="Avenra UI" size="lg" />
            <Progress value={68} label="Preview progress" />
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Components', href: '/components' },
                { label: 'Breadcrumb' }
              ]}
            />
            <Tooltip content="Open filtering options">
              <IconButton
                aria-label="Open filters"
                icon={(
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="size-4"
                  >
                    <path
                      d="M4 6h12M6.5 10h7M8.5 14h3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                variant="secondary"
              />
            </Tooltip>
            <Popover
              title="Filter actions"
              content={<p>Refine the component gallery by status, package, or accessibility priority.</p>}
              trigger={<Button size="sm" variant="secondary">Open popover</Button>}
            />
            <Input
              id="preview-email"
              label="Email"
              hint="Use the address tied to your workspace"
              placeholder="team@avenra.dev"
            />
            <Select id="preview-role" label="Role" hint="Choose the permission level for this workspace">
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="owner">Owner</option>
            </Select>
            <Checkbox
              id="preview-updates"
              label="Email product updates"
              hint="Stay informed when new components and accessibility improvements ship"
              defaultChecked
            />
            <Radio
              id="preview-plan"
              name="preview-access"
              label="Workspace admin access"
              hint="Use a single-select control when only one permission path should stay active"
              defaultChecked
            />
            <Switch
              id="preview-sync"
              label="Sync deployment notifications"
              hint="Keep publish and incident updates visible without leaving the workspace"
              defaultChecked
            />
            <Textarea
              id="preview-message"
              label="Message"
              hint="Share context so collaborators can respond faster"
              placeholder="Tell us what you're building with Avenra UI..."
            />
            <Card
              title="Project briefing"
              description="Combine compact status labels with rich content blocks."
              actions={<Badge variant="info">Preview</Badge>}
              interactive
            >
              <Button variant="secondary" size="sm">
                Review draft
              </Button>
            </Card>
            <Alert title="Build failed" variant="danger">
              Fix the type error and rerun the pipeline.
            </Alert>
            <EmptyState

              title="No notifications yet"
              description="When your workspace starts generating events, they will appear here."
              action={<Button size="sm">Create first event</Button>}
            />
            <Stack gap="sm">
              <Badge variant="warning">Draft</Badge>
              <Badge variant="info">Review</Badge>
              <Badge variant="success">Ready</Badge>
            </Stack>
            <Inline align="center" gap="sm">
              <Button size="sm">Primary action</Button>
              <Button size="sm" variant="ghost">
                Secondary
              </Button>
            </Inline>
            <Dialog
              trigger={<Button size="sm">Open dialog</Button>}
              title="Confirm publish"
              description="This action will make the draft visible to your team."
            >
              <Button size="sm" variant="ghost">
                Close
              </Button>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="docs-grid" aria-label="Avenra platform highlights">
        {highlights.map((item) => (
          <article key={item} className="docs-card">
            <Badge variant="neutral" size="sm">
              System Highlight
            </Badge>
            <h2>{item}</h2>
            <Alert title="Design system highlight" variant="info">
              Pair reusable primitives with stateful feedback so product teams ship faster.
            </Alert>
            <Progress value={72} label="Platform readiness" />
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Design system', href: '/design-system' },
                { label: 'Highlights' }
              ]}
            />
            <Popover
              title="Overlay preview"
              content={<p>Popover keeps supporting actions nearby without forcing a full dialog.</p>}
              trigger={<Badge variant="warning" size="sm">Open overlay</Badge>}
            />
            <Inline gap="sm">
              <Badge variant="neutral" size="sm">
                Layout
              </Badge>
              <Badge variant="info" size="sm">
                Feedback
              </Badge>
              <Badge variant="success" size="sm">
                Navigation
              </Badge>
              <Badge variant="warning" size="sm">
                Overlay
              </Badge>
            </Inline>

            <p>
              This foundation is being built to scale from a single product into a reusable UI
              platform without rewriting naming, tokens, or component contracts later.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
