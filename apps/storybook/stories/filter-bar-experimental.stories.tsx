import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, DateRangePicker, FilterBar, Input, MultiSelect, Select, Stack } from '@avenra/ui';

const meta = {
  title: 'Components/Forms and Input/Experimental/Filter Bar',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkspaceFilters: Story = {
  render: () => (
    <div style={{ maxWidth: '64rem' }}>
      <FilterBar
        title="Workspace filters"
        description="Group the most common search and narrowing controls into one consistent product surface."
        actions={
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button size="sm">Apply filters</Button>
            <Button size="sm" variant="ghost">
              Reset
            </Button>
          </div>
        }
      >
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }}>
          <Input label="Search" placeholder="Search workspaces" />
          <Select label="Status" defaultValue="active">
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="archived">Archived</option>
          </Select>
          <MultiSelect
            label="Owners"
            placeholder="Search owners"
            options={[
              { value: 'mina', label: 'Mina Chen' },
              { value: 'david', label: 'David Park' },
              { value: 'lina', label: 'Lina Ortiz' }
            ]}
            defaultValue={['mina']}
          />
          <DateRangePicker
            label="Updated window"
            defaultValue={{ start: '2026-03-01', end: '2026-03-21' }}
          />
        </div>
      </FilterBar>
    </div>
  )
};

export const CompactStickyBar: Story = {
  render: () => (
    <div style={{ maxWidth: '64rem' }}>
      <FilterBar
        title="Advanced search"
        description="Compact density keeps frequently reused query controls visible while preserving vertical space."
        density="compact"
        sticky
        actions={<Button size="sm" variant="secondary">Save view</Button>}
      >
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' }}>
          <Input label="Keyword" placeholder="Invoices, alerts, owners…" />
          <Select label="Environment" defaultValue="production">
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="preview">Preview</option>
          </Select>
        </div>
      </FilterBar>
    </div>
  )
};
