import { fireEvent, render, screen, within } from '@testing-library/react';
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

  it('supports sortable headers with uncontrolled sort state', () => {
    render(
      <Table
        columns={[
          { id: 'release', header: 'Release', accessorKey: 'release', rowHeader: true, sortable: true },
          { id: 'status', header: 'Status', accessorKey: 'status' },
        ]}
        defaultSort={{ columnId: 'release', direction: 'asc' }}
        rowKey="id"
        rows={[
          { id: 'may', release: 'May update', status: 'Draft' },
          { id: 'april', release: 'April update', status: 'Blocked' },
          { id: 'march', release: 'March update', status: 'Ready' },
        ]}
      />
    );

    expect(screen.getByRole('columnheader', { name: /release/i })).toHaveAttribute('aria-sort', 'ascending');
    expect(screen.getAllByRole('rowheader').map((cell) => cell.textContent)).toEqual([
      'April update',
      'March update',
      'May update',
    ]);

    fireEvent.click(screen.getByRole('button', { name: /sort by release/i }));

    expect(screen.getByRole('columnheader', { name: /release/i })).toHaveAttribute('aria-sort', 'descending');
    expect(screen.getAllByRole('rowheader').map((cell) => cell.textContent)).toEqual([
      'May update',
      'March update',
      'April update',
    ]);
  });

  it('supports compact density, sticky headers, striped rows, and row tone styling', () => {
    render(
      <Table
        columns={[
          { id: 'release', header: 'Release', accessorKey: 'release', rowHeader: true },
          { id: 'status', header: 'Status', accessorKey: 'status' },
        ]}
        density="compact"
        getRowTone={(row) => (row.status === 'Blocked' ? 'danger' : 'success')}
        rowKey="id"
        rows={[
          { id: 'april', release: 'April update', status: 'Blocked' },
          { id: 'march', release: 'March update', status: 'Ready' },
        ]}
        stickyHeader
        striped
      />
    );

    const tableRoot = screen.getByRole('table').parentElement;
    expect(tableRoot).toHaveClass('avenra-table--compact', 'avenra-table--sticky-header', 'avenra-table--striped');
    expect(screen.getByRole('rowheader', { name: /april update/i }).closest('tr')).toHaveClass(
      'avenra-table__row--tone-danger'
    );
    expect(screen.getByRole('rowheader', { name: /march update/i }).closest('tr')).toHaveClass(
      'avenra-table__row--tone-success'
    );
  });

  it('sorts date values without widening date comparisons to boolean values', () => {
    render(
      <Table
        columns={[
          { id: 'release', header: 'Release', accessorKey: 'release', rowHeader: true },
          { id: 'published', header: 'Published', accessorKey: 'published', sortable: true },
          { id: 'featured', header: 'Featured', accessorKey: 'featured', sortable: true },
        ]}
        defaultSort={{ columnId: 'published', direction: 'asc' }}
        rowKey="id"
        rows={[
          { id: 'may', release: 'May update', published: new Date('2026-05-02T00:00:00.000Z'), featured: true },
          { id: 'april', release: 'April update', published: new Date('2026-04-15T00:00:00.000Z'), featured: false },
          { id: 'june', release: 'June update', published: new Date('2026-06-20T00:00:00.000Z'), featured: true },
        ]}
      />
    );

    expect(screen.getAllByRole('rowheader').map((cell) => cell.textContent)).toEqual([
      'April update',
      'May update',
      'June update',
    ]);

    fireEvent.click(screen.getByRole('button', { name: /sort by featured/i }));

    expect(screen.getAllByRole('rowheader').map((cell) => cell.textContent)).toEqual([
      'April update',
      'May update',
      'June update',
    ]);
  });
});

