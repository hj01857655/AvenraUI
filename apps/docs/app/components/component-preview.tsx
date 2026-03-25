'use client';

import { useEffect } from 'react';

import { Alert } from '@avenra/ui/src/components/alert/alert';
import { Autocomplete } from '@avenra/ui/src/components/autocomplete/autocomplete';
import { Avatar } from '@avenra/ui/src/components/avatar/avatar';
import { Badge } from '@avenra/ui/src/components/badge/badge';
import { Breadcrumb } from '@avenra/ui/src/components/breadcrumb/breadcrumb';
import { Button } from '@avenra/ui/src/components/button/button';
import { Card } from '@avenra/ui/src/components/card/card';
import { Checkbox } from '@avenra/ui/src/components/checkbox/checkbox';
import { Combobox } from '@avenra/ui/src/components/combobox/combobox';
import { Command } from '@avenra/ui/src/components/command/command';
import { DatePicker } from '@avenra/ui/src/components/date-picker/date-picker';
import { DateRangePicker } from '@avenra/ui/src/components/date-range-picker/date-range-picker';
import { Dialog } from '@avenra/ui/src/components/dialog/dialog';
import { Drawer } from '@avenra/ui/src/components/drawer/drawer';
import { DropdownMenu } from '@avenra/ui/src/components/dropdown-menu/dropdown-menu';
import { EmptyState } from '@avenra/ui/src/components/empty-state/empty-state';
import { Form } from '@avenra/ui/src/components/form/form';
import { FormField } from '@avenra/ui/src/components/form-field/form-field';
import { IconButton } from '@avenra/ui/src/components/icon-button/icon-button';
import { Inline } from '@avenra/ui/src/components/inline/inline';
import { Input } from '@avenra/ui/src/components/input/input';
import { MultiSelect } from '@avenra/ui/src/components/multi-select/multi-select';
import { Pagination } from '@avenra/ui/src/components/pagination/pagination';
import { Popover } from '@avenra/ui/src/components/popover/popover';
import { Progress } from '@avenra/ui/src/components/progress/progress';
import { Radio } from '@avenra/ui/src/components/radio/radio';
import { Select } from '@avenra/ui/src/components/select/select';
import { Skeleton } from '@avenra/ui/src/components/skeleton/skeleton';
import { Stack } from '@avenra/ui/src/components/stack/stack';
import { Switch } from '@avenra/ui/src/components/switch/switch';
import { Table } from '@avenra/ui/src/components/table/table';
import { TagInput } from '@avenra/ui/src/components/tag-input/tag-input';
import { Tabs } from '@avenra/ui/src/components/tabs/tabs';
import { Textarea } from '@avenra/ui/src/components/textarea/textarea';
import { ToastProvider, useToast } from '@avenra/ui/src/components/toast/toast';
import { Tree } from '@avenra/ui/src/components/tree/tree';
import { Tooltip } from '@avenra/ui/src/components/tooltip/tooltip';
import { Upload } from '@avenra/ui/src/components/upload/upload';

import type { ComponentDoc } from './component-docs';

function PreviewCanvas({ children }: { children: React.ReactNode }) {
  return <div className="component-preview__canvas">{children}</div>;
}

function ToastPreviewSurface() {
  const { dismiss, push } = useToast();

  useEffect(() => {
    const ids = [
      push({
        title: 'Changes saved',
        description: 'Workspace settings synced successfully.',
        variant: 'success',
        duration: 60000
      }),
      push({
        title: 'Publish failed',
        description: 'Review the validation errors before retrying.',
        variant: 'error',
        duration: 60000
      })
    ];

    return () => {
      ids.forEach((id) => dismiss(id));
    };
  }, [dismiss, push]);

  return (
    <Inline align="center" gap="sm">
      <Button
        variant="secondary"
        onClick={() =>
          push({
            title: 'Invite sent',
            description: 'The workspace invitation email is on its way.',
            variant: 'info'
          })
        }
      >
        Push info toast
      </Button>
      <Button
        onClick={() =>
          push({
            title: 'Deploy blocked',
            description: 'A required environment variable is still missing.',
            variant: 'error'
          })
        }
      >
        Push error toast
      </Button>
    </Inline>
  );
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
    case 'autocomplete':
      return (
        <PreviewCanvas>
          <Autocomplete
            label="Country"
            placeholder="Type 2+ characters"
            emptyMessage="No country found"
            minQueryLength={2}
            options={[
              { value: 'ar', label: 'Argentina' },
              { value: 'au', label: 'Australia' },
              { value: 'at', label: 'Austria' }
            ]}
          />
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
              <FormField label="Role" hint="Short stable lists can stay native">
                <Select defaultValue="designer">
                  <option value="designer">Designer</option>
                  <option value="engineer">Engineer</option>
                  <option value="pm">Product manager</option>
                </Select>
              </FormField>
              <FormField label="Framework" hint="Search when the option set is larger than a short native select">
                <Combobox
                  placeholder="Search frameworks"
                  options={[
                    { value: 'react', label: 'React' },
                    { value: 'vue', label: 'Vue' },
                    { value: 'svelte', label: 'Svelte' }
                  ]}
                  defaultValue="react"
                />
              </FormField>
              <FormField layout="control" hint="Required before continuing" error="You must accept the terms">
                <Checkbox label="Accept working agreement" />
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
            <Checkbox
              id="preview-checkbox-2"
              label="Include release candidates"
              error="Pick the release channels you want to follow"
            />
            <Checkbox id="preview-checkbox-3" label="Lock audit exports" disabled />
          </Stack>
        </PreviewCanvas>
      );
    case 'combobox':
      return (
        <PreviewCanvas>
          <Stack gap="md">
            <Combobox
              label="Framework"
              placeholder="Search frameworks"
              emptyMessage="No framework found"
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue', disabled: true },
                { value: 'svelte', label: 'Svelte' }
              ]}
              defaultValue="react"
            />
            <Combobox
              label="Readonly framework"
              options={[
                { value: 'next', label: 'Next.js' },
                { value: 'remix', label: 'Remix' }
              ]}
              defaultValue="next"
              disabled
            />
          </Stack>
        </PreviewCanvas>
      );
    case 'command':
      return (
        <PreviewCanvas>
          <Command
            placeholder="Search commands"
            emptyMessage="Nothing found"
            options={[
              { value: 'open-settings', label: 'Open settings' },
              { value: 'create-project', label: 'Create project' },
              { value: 'invite-member', label: 'Invite member' }
            ]}
          />
        </PreviewCanvas>
      );
    case 'date-picker':
      return (
        <PreviewCanvas>
          <DatePicker
            id="preview-date-picker"
            label="Release date"
            hint="Choose when the update becomes visible"
            defaultValue="2026-03-18"
            defaultOpen
          />
        </PreviewCanvas>
      );
    case 'date-range-picker':
      return (
        <PreviewCanvas>
          <DateRangePicker
            id="preview-date-range-picker"
            label="Launch window"
            hint="Choose the public launch range"
            defaultValue={{ start: '2026-03-18', end: '2026-03-24' }}
            defaultOpen
          />
        </PreviewCanvas>
      );
    case 'dialog':
      return (
        <PreviewCanvas>
          <Dialog
            trigger={<Button variant="secondary">Open dialog</Button>}
            title="Confirm publish"
            description="This will make the draft visible to your workspace."
          >
            <Button variant="secondary">Close</Button>
          </Dialog>
        </PreviewCanvas>
      );
    case 'drawer':
      return (
        <PreviewCanvas>
          <Drawer
            defaultOpen
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
            defaultOpen
            title="Workspace actions"
            trigger={<Button variant="secondary">Open menu</Button>}
            items={[
              { label: 'Rename workspace', onSelect: () => undefined },
              { label: 'Duplicate workspace', disabled: true },
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
    case 'multi-select':
      return (
        <PreviewCanvas>
          <MultiSelect
            id="preview-multi-select"
            label="Frameworks"
            hint="Pick every framework active in this workspace"
            placeholder="Search frameworks"
            defaultValue={['react', 'vue']}
            options={[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'angular', label: 'Angular', disabled: true }
            ]}
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
    case 'table':
      return (
        <PreviewCanvas>
          <Stack gap="md">
            <Table
              caption="Release readiness"
              columns={[
                { id: 'release', header: 'Release', accessorKey: 'release', rowHeader: true },
                { id: 'status', header: 'Status', accessorKey: 'status' },
                { id: 'owner', header: 'Owner', accessorKey: 'owner' }
              ]}
              rows={[
                { id: 'march', release: 'March update', status: 'Ready', owner: 'Design' },
                { id: 'april', release: 'April update', status: 'Blocked', owner: 'Platform' }
              ]}
              rowKey="id"
            />
            <Table
              caption="Archived releases"
              columns={[
                { id: 'release', header: 'Release', accessorKey: 'release' },
                { id: 'status', header: 'Status', accessorKey: 'status' }
              ]}
              rows={[]}
              emptyState="No empty preview rows"
            />
          </Stack>
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
    case 'toast':
      return (
        <PreviewCanvas>
          <ToastProvider>
            <ToastPreviewSurface />
          </ToastProvider>
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
            <Radio id="preview-radio-3" name="preview-access" label="Readonly access" disabled />
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
          <Stack gap="sm">
            <Switch
              id="preview-switch"
              label="Sync deployment notifications"
              hint="Keep publish and incident updates visible"
              defaultChecked
            />
            <Switch id="preview-switch-disabled" label="Readonly sync" disabled />
          </Stack>
        </PreviewCanvas>
      );
    case 'tag-input':
      return (
        <PreviewCanvas>
          <TagInput
            id="preview-tag-input"
            label="Project tags"
            hint="Press Enter or comma to add a new tag"
            placeholder="Add a tag"
            defaultValue={['React', 'Design system']}
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
    case 'tree':
      return (
        <PreviewCanvas>
          <Tree
            ariaLabel="Content structure"
            defaultExpandedIds={['workspace', 'docs']}
            defaultSelectedId="guides"
            nodes={[
              {
                id: 'workspace',
                label: 'Workspace',
                children: [
                  { id: 'design-system', label: 'Design system' },
                  { id: 'assets', label: 'Assets', disabled: true },
                  {
                    id: 'docs',
                    label: 'Docs',
                    children: [{ id: 'guides', label: 'Guides' }]
                  }
                ]
              }
            ]}
          />
        </PreviewCanvas>
      );
    case 'upload':
      return (
        <PreviewCanvas>
          <Upload
            id="preview-upload"
            label="Project files"
            hint="Upload the assets needed for review"
            buttonLabel="Project files"
            defaultValue={[
              new File(['brief'], 'brief.pdf', { type: 'application/pdf' }),
              new File(['preview'], 'preview.png', { type: 'image/png' })
            ]}
          />
        </PreviewCanvas>
      );
    default:
      return null;
  }
}
