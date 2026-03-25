import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Button, Card, Dialog, Inline, Popover, Stack, Table, Tooltip, type TableColumn } from '@avenra/ui';

type ReleaseRow = {
  id: string;
  release: string;
  owner: string;
  status: 'Ready' | 'Reviewing' | 'Blocked' | 'Draft';
  completion: number;
  updatedAt: string;
};

const releaseColumns: TableColumn<ReleaseRow>[] = [
  {
    id: 'release',
    header: 'Release',
    accessorKey: 'release',
    rowHeader: true,
    sortable: true,
    width: '34%'
  },
  {
    id: 'owner',
    header: 'Owner',
    accessorKey: 'owner'
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    renderCell: (row) => (
      <Badge
        variant={
          row.status === 'Ready'
            ? 'success'
            : row.status === 'Reviewing'
              ? 'info'
              : row.status === 'Blocked'
                ? 'warning'
                : 'neutral'
        }
      >
        {row.status}
      </Badge>
    ),
    sortAccessor: (row) => row.status
  },
  {
    id: 'completion',
    header: 'Completion',
    sortable: true,
    renderCell: (row) => `${row.completion}%`,
    sortAccessor: (row) => row.completion,
    align: 'end'
  },
  {
    id: 'updatedAt',
    header: 'Updated',
    accessorKey: 'updatedAt',
    sortable: true,
    align: 'end'
  }
];

const releaseRows: ReleaseRow[] = [
  { id: 'rel-18', release: 'Usage insights', owner: 'Analytics', status: 'Draft', completion: 19, updatedAt: 'Mar 29' },
  { id: 'rel-14', release: 'Dashboard refresh', owner: 'Design systems', status: 'Ready', completion: 100, updatedAt: 'Mar 18' },
  { id: 'rel-15', release: 'Billing alerts', owner: 'Platform', status: 'Reviewing', completion: 82, updatedAt: 'Mar 24' },
  { id: 'rel-17', release: 'Session audit log', owner: 'Security', status: 'Blocked', completion: 58, updatedAt: 'Mar 22' },
  { id: 'rel-16', release: 'Role sync', owner: 'Identity', status: 'Blocked', completion: 47, updatedAt: 'Mar 20' },
  { id: 'rel-19', release: 'Workspace templates', owner: 'Growth', status: 'Ready', completion: 96, updatedAt: 'Mar 27' }
];

const meta = {
  title: 'Components/Layout & Overlay',
  component: Card,
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardOverview: Story = {
  render: () => (
    <div style={{ maxWidth: '32rem' }}>
      <Card
        title="Release overview"
        description="Track the final checks before publishing the next workspace update."
        actions={<Button size="sm" variant="ghost">Open checklist</Button>}
        interactive
      >
        Final QA, docs sign-off, and analytics validation are all managed from the same review surface.
      </Card>
    </div>
  )
};

export const InlineActions: Story = {
  render: () => (
    <Inline align="center" gap="sm" style={{ flexWrap: 'wrap' }}>
      <Button size="sm">Approve</Button>
      <Button size="sm" variant="secondary">Request changes</Button>
      <Button size="sm" variant="ghost">Open preview</Button>
    </Inline>
  )
};

export const StackSections: Story = {
  render: () => (
    <Stack gap="md" style={{ maxWidth: '28rem' }}>
      <Card title="Planning" description="Confirm timeline and owners before implementation.">
        Design review completed this morning.
      </Card>
      <Card title="Build" description="Track handoff quality during implementation.">
        Storybook coverage and docs examples are ready for QA.
      </Card>
      <Card title="Launch" description="Prepare support and rollout messaging.">
        Internal release notes are scheduled for Friday.
      </Card>
    </Stack>
  )
};

export const DataTableReadiness: Story = {
  render: () => (
    <div style={{ maxWidth: '60rem', display: 'grid', gap: '0.75rem' }}>
      <div style={{ maxHeight: '18rem', overflow: 'auto', paddingRight: '0.25rem' }}>
        <Table
          caption="Release readiness"
          columns={releaseColumns}
          rows={releaseRows}
          rowKey="id"
          defaultSort={{ columnId: 'release', direction: 'asc' }}
          density="compact"
          striped
          stickyHeader
          getRowTone={(row) =>
            row.status === 'Blocked'
              ? 'danger'
              : row.status === 'Ready'
                ? 'success'
                : row.status === 'Reviewing'
                  ? 'info'
                  : 'default'
          }
        />
      </div>
      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--avenra-color-text-subtle)' }}>
        Use compact density, sticky headers, sorting, and row tone emphasis when operators need to scan larger release datasets quickly.
      </p>
    </div>
  )
};

export const PublishDialog: Story = {
  render: () => (
    <Dialog
      trigger={<Button>Publish changelog</Button>}
      title="Publish release notes"
      description="This will notify the team and make the latest updates visible in the workspace."
    >
      <Button size="sm">Confirm publish</Button>
    </Dialog>
  )
};

export const FilterPopover: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="secondary">Filters</Button>}
      title="Visibility filters"
      content={
        <Stack gap="sm">
          <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input type="checkbox" defaultChecked /> Active only
          </label>
          <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input type="checkbox" /> Include archived
          </label>
        </Stack>
      }
    />
  )
};

export const HelpfulTooltip: Story = {
  render: () => (
    <Tooltip content="Use concise titles so dialog headings stay scannable.">
      <Button variant="ghost">Writing tip</Button>
    </Tooltip>
  )
};
