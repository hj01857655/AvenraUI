'use client';

import { Alert } from '@avenra/ui/src/components/alert/alert';
import { Avatar } from '@avenra/ui/src/components/avatar/avatar';
import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Breadcrumb } from '@avenra/ui/src/components/breadcrumb/breadcrumb';
import { Button } from '@avenra/ui/src/components/button/button';
import { Card } from '@avenra/ui/src/components/card/card';
import { Checkbox } from '@avenra/ui/src/components/checkbox/checkbox';
import { Dialog } from '@avenra/ui/src/components/dialog/dialog';
import { Drawer } from '@avenra/ui/src/components/drawer/drawer';
import { DropdownMenu } from '@avenra/ui/src/components/dropdown-menu/dropdown-menu';
import { EmptyState } from '@avenra/ui/src/components/empty-state/empty-state';
import { Form } from '@avenra/ui/src/components/form/form';
import { FormField } from '@avenra/ui/src/components/form-field/form-field';
import { IconButton } from '@avenra/ui/src/components/icon-button/icon-button';
import { Inline } from '@avenra/ui/src/components/inline/inline';

import { Input } from '@avenra/ui/src/components/input/input';
import { Popover } from '@avenra/ui/src/components/popover/popover';
import { Progress } from '@avenra/ui/src/components/progress/progress';
import { Pagination } from '@avenra/ui/src/components/pagination/pagination';
import { Radio } from '@avenra/ui/src/components/radio/radio';
import { Skeleton } from '@avenra/ui/src/components/skeleton/skeleton';
import { Select } from '@avenra/ui/src/components/select/select';
import { Stack } from '@avenra/ui/src/components/stack/stack';
import { Switch } from '@avenra/ui/src/components/switch/switch';
import { Tabs } from '@avenra/ui/src/components/tabs/tabs';
import { Textarea } from '@avenra/ui/src/components/textarea/textarea';
import { Tooltip } from '@avenra/ui/src/components/tooltip/tooltip';

import type { ComponentDoc } from './component-docs';

function PreviewCanvas({ children }: { children: React.ReactNode }) {
  return <div className="component-preview__canvas">{children}</div>;
}

export function ComponentPreview({ slug }: { slug: ComponentDoc['slug'] }) {
  switch (slug) {
    case 'alert':
      return (
        <PreviewCanvas>
          <Alert title="Build queued" variant="success">
            The release pipeline is processing the latest docs update.
          </Alert>
        </PreviewCanvas>
      );
    case 'avatar':
      return (
        <PreviewCanvas>
          <Inline align="center" gap="md">
            <Avatar name="Avenra Design" size="sm" />
            <Avatar name="Avenra Design" size="md" />
            <Avatar name="Avenra Design" size="lg" />
          </Inline>
        </PreviewCanvas>
      );
    case 'badge':
      return (
        <PreviewCanvas>
          <Inline align="center" gap="sm">
            <Badge variant="info">Docs</Badge>
            <Badge variant="success">Stable</Badge>
            <Badge variant="warning">Beta</Badge>
            <Badge variant="danger">Blocked</Badge>
          </Inline>
        </PreviewCanvas>
      );
    case 'breadcrumb':
      return (
        <PreviewCanvas>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Components', href: '/components' },
              { label: 'Breadcrumb' }
            ]}
          />
        </PreviewCanvas>
      );
    case 'button':
      return (
        <PreviewCanvas>
          <Inline align="center" gap="sm">
            <Button>Publish</Button>
            <Button variant="secondary">Save draft</Button>
            <Button variant="ghost">Cancel</Button>
          </Inline>
        </PreviewCanvas>
      );
    case 'card':
      return (
        <PreviewCanvas>
          <Card
            title="Project briefing"
            description="Combine compact status labels with richer content blocks."
            actions={<Badge variant="info">Preview</Badge>}
            interactive
          >
            <Button variant="secondary" size="sm">
              Review draft
            </Button>
          </Card>
        </PreviewCanvas>
      );
    case 'form':
      return (
        <PreviewCanvas>
          <Form>
            <Stack gap="md">
              <FormField label="Email" hint="We will only use this for account updates" required>
                <Input type="email" placeholder="team@avenra.dev" />
              </FormField>
              <FormField label="Role" error="A role is required">
                <Select defaultValue="">
                  <option value="" disabled>Select a role</option>
                  <option value="designer">Designer</option>
                  <option value="engineer">Engineer</option>
                </Select>
              </FormField>
            </Stack>
          </Form>
        </PreviewCanvas>
      );

    case 'form-field':
      return (
        <PreviewCanvas>
          <Stack gap="md">
            <FormField label="Project name" hint="Visible to your workspace" required>
              <Input placeholder="Avenra UI" />
            </FormField>
            <FormField layout="control" hint="Required before continuing" error="You must accept the terms">
              <Checkbox label="Accept working agreement" />
            </FormField>
          </Stack>
        </PreviewCanvas>
      );

    case 'checkbox':
      return (
        <PreviewCanvas>
          <Stack gap="sm">
            <Checkbox
              id="preview-checkbox"
              label="Email product updates"
              hint="Stay informed when new components ship"
              defaultChecked
            />
            <Checkbox id="preview-checkbox-2" label="Include release candidates" />
          </Stack>
        </PreviewCanvas>
      );
    case 'dialog':
      return (
        <PreviewCanvas>
          <Drawer
            trigger={<Button variant="secondary">Open drawer</Button>}
            title="Workspace settings"
            description="Update access and notification preferences."
          >
            <Stack gap="sm">
              <Input id="preview-drawer-name" label="Workspace name" defaultValue="Avenra" />
              <Button>Save changes</Button>
            </Stack>
          </Drawer>
        </PreviewCanvas>
      );
    case 'dropdown-menu':
      return (
        <PreviewCanvas>
          <DropdownMenu
            title="Workspace actions"
            trigger={<Button variant="secondary">Open menu</Button>}
            items={[
              { label: 'Rename workspace', onSelect: () => undefined },
              { label: 'Duplicate workspace', onSelect: () => undefined },
              { label: 'Archive workspace', onSelect: () => undefined, tone: 'danger' }
            ]}
          />
        </PreviewCanvas>
      );
    case 'empty-state':
      return (
        <PreviewCanvas>
          <EmptyState
            title="No components matched"
            description="Try broadening the search or switching to another category."
            action={<Button size="sm">Clear filters</Button>}
          />
        </PreviewCanvas>
      );
    case 'icon-button':
      return (
        <PreviewCanvas>
          <Inline align="center" gap="sm">
            <IconButton
              aria-label="Open filters"
              icon={<span aria-hidden="true">+</span>}
              variant="secondary"
            />
            <IconButton
              aria-label="Search components"
              icon={<span aria-hidden="true">?</span>}
              variant="ghost"
            />
          </Inline>
        </PreviewCanvas>
      );
    case 'input':
      return (
        <PreviewCanvas>
          <Input
            id="preview-input"
            label="Email"
            hint="Use the address tied to your workspace"
            defaultValue="team@avenra.dev"
          />
        </PreviewCanvas>
      );
    case 'inline':
      return (
        <PreviewCanvas>
          <Inline align="center" gap="sm">
            <Badge variant="success">Stable</Badge>
            <span>v1.8.0</span>
            <span>Updated 2 hours ago</span>
          </Inline>
        </PreviewCanvas>
      );
    case 'popover':
      return (
        <PreviewCanvas>
          <Popover
            trigger={<Button variant="secondary">Filters</Button>}
            title="Quick filters"
            content={<div>Only show components updated this week.</div>}
          />
        </PreviewCanvas>
      );
    case 'progress':
      return (
        <PreviewCanvas>
          <Stack gap="sm">
            <Progress value={68} label="Upload progress" />
            <Progress value={32} size="sm" label="Docs migration progress" />
          </Stack>
        </PreviewCanvas>
      );
    case 'pagination':
      return (
        <PreviewCanvas>
          <Pagination currentPage={6} totalPages={12} onPageChange={() => undefined} />
        </PreviewCanvas>
      );
    case 'skeleton':
      return (
        <PreviewCanvas>
          <Stack gap="sm">
            <Skeleton width="42%" height="0.875rem" />
            <Skeleton width="100%" height="3rem" shape="rounded" />
            <Inline align="center" gap="md">
              <Skeleton shape="circular" size="lg" />
              <Stack gap="sm" style={{ flex: 1 }}>
                <Skeleton width="55%" height="0.875rem" />
                <Skeleton width="85%" height="0.875rem" />
              </Stack>
            </Inline>
          </Stack>
        </PreviewCanvas>
      );
    case 'radio':
      return (
        <PreviewCanvas>
          <Stack gap="sm">
            <Radio
              id="preview-radio-1"
              name="preview-access"
              label="Workspace admin access"
              hint="Use a single-select control when only one path should stay active"
              defaultChecked
            />
            <Radio id="preview-radio-2" name="preview-access" label="Project editor access" />
          </Stack>
        </PreviewCanvas>
      );
    case 'select':
      return (
        <PreviewCanvas>
          <Select id="preview-select" label="Role" hint="Choose the baseline permission set" defaultValue="editor">
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="owner">Owner</option>
          </Select>
        </PreviewCanvas>
      );
    case 'stack':
      return (
        <PreviewCanvas>
          <Stack gap="sm">
            <Button>Save changes</Button>
            <Button variant="secondary">Preview</Button>
            <Button variant="ghost">Cancel</Button>
          </Stack>
        </PreviewCanvas>
      );
    case 'switch':
      return (
        <PreviewCanvas>
          <Switch
            id="preview-switch"
            label="Sync deployment notifications"
            hint="Keep publish and incident updates visible"
            defaultChecked
          />
        </PreviewCanvas>
      );
    case 'tabs':
      return (
        <PreviewCanvas>
          <Tabs
            items={[
              { id: 'general', label: 'General', content: <div>General settings</div> },
              { id: 'billing', label: 'Billing', content: <div>Billing settings</div> }
            ]}
            defaultTabId="general"
          />
        </PreviewCanvas>
      );
    case 'textarea':
      return (
        <PreviewCanvas>
          <Textarea
            id="preview-textarea"
            label="Notes"
            hint="Share enough context so the next reviewer can act quickly"
            defaultValue="Add project context..."
          />
        </PreviewCanvas>
      );
    case 'tooltip':
      return (
        <PreviewCanvas>
          <Tooltip content="Opens component usage guidance.">
            <IconButton aria-label="Open help" icon={<span aria-hidden="true">?</span>} />
          </Tooltip>
        </PreviewCanvas>
      );
    default:
      return null;
  }
}
