import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Table } from './table';

describe('Table', () => {
  it('renders headers and row cells from column definitions', () => {
    render(
      <Table
        caption="Release readiness"
        columns={[
          { id: 'name', header: 'Release', accessorKey: 'name' },
          { id: 'status', header: 'Status', accessorKey: 'status' },
          {
            id: 'owners',
            header: 'Owners',
            renderCell: (row) => row.owners.join(', '),
          },
        ]}
        rows={[
          { id: 'r1', name: 'March update', status: 'Ready', owners: ['Design', 'Docs'] },
          { id: 'r2', name: 'April update', status: 'Blocked', owners: ['UI'] },
        ]}
        rowKey={(row) => row.id}
      />
    );

    const table = screen.getByRole('table', { name: /release readiness/i });
    expect(within(table).getByRole('columnheader', { name: /release/i })).toBeInTheDocument();
    expect(within(table).getByRole('columnheader', { name: /status/i })).toBeInTheDocument();
    expect(within(table).getByRole('cell', { name: /design, docs/i })).toBeInTheDocument();
    expect(within(table).getByRole('cell', { name: /blocked/i })).toBeInTheDocument();
  });

  it('renders an empty state row when there are no rows', () => {
    render(
      <Table
        caption="Release readiness"
        columns={[
          { id: 'name', header: 'Release', accessorKey: 'name' },
          { id: 'status', header: 'Status', accessorKey: 'status' },
        ]}
        rows={[]}
        emptyState="No releases scheduled."
      />
    );

    const table = screen.getByRole('table', { name: /release readiness/i });
    expect(within(table).getByRole('cell', { name: /no releases scheduled\./i })).toHaveAttribute('colspan', '2');
  });

  it('supports row headers and custom alignment', () => {
    render(
      <Table
        columns={[
          { id: 'name', header: 'Workspace', accessorKey: 'name', rowHeader: true },
          { id: 'members', header: 'Members', accessorKey: 'members', align: 'end' },
        ]}
        rows={[
          { id: 'a', name: 'Avenra', members: 8 },
        ]}
        rowKey="id"
      />
    );

    expect(screen.getByRole('rowheader', { name: /avenra/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '8' })).toHaveClass('avenra-table__cell--align-end');
  });
});
