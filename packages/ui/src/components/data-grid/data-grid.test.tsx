import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DataGrid } from './data-grid';

describe('DataGrid', () => {
  it('renders headers and row cells from column definitions', () => {
    render(
      <DataGrid
        caption="Release health"
        columns={[
          { id: 'release', header: 'Release', accessorKey: 'release', rowHeader: true },
          { id: 'owner', header: 'Owner', accessorKey: 'owner' },
          { id: 'status', header: 'Status', accessorKey: 'status' },
        ]}
        rows={[
          { id: 'r1', release: 'Billing alerts', owner: 'Platform', status: 'Reviewing' },
          { id: 'r2', release: 'Session audit log', owner: 'Security', status: 'Blocked' },
        ]}
        rowKey="id"
      />,
    );

    const grid = screen.getByRole('table', { name: /release health/i });
    expect(within(grid).getByRole('columnheader', { name: /release/i })).toBeInTheDocument();
    expect(within(grid).getByRole('rowheader', { name: /billing alerts/i })).toBeInTheDocument();
    expect(within(grid).getByRole('cell', { name: /platform/i })).toBeInTheDocument();
    expect(within(grid).getByRole('cell', { name: /blocked/i })).toBeInTheDocument();
  });

  it('supports richer primary-secondary cell layouts and tone emphasis', () => {
    render(
      <DataGrid
        columns={[
          {
            id: 'release',
            header: 'Release',
            rowHeader: true,
            renderCell: (row) => ({
              primary: row.release,
              secondary: row.scope,
            }),
          },
          {
            id: 'status',
            header: 'Status',
            renderCell: (row) => ({
              primary: row.status,
              secondary: row.updatedAt,
              tone: row.status === 'Blocked' ? 'danger' : 'success',
            }),
          },
          {
            id: 'completion',
            header: 'Completion',
            align: 'end',
            renderCell: (row) => ({
              primary: `${row.completion}%`,
              secondary: `${row.openIssues} open issues`,
              tone: row.openIssues > 0 ? 'warning' : 'info',
            }),
          },
        ]}
        rows={[
          {
            id: 'r1',
            release: 'Billing alerts',
            scope: 'Workspace notifications',
            status: 'Ready',
            updatedAt: 'Updated today',
            completion: 100,
            openIssues: 0,
          },
          {
            id: 'r2',
            release: 'Session audit log',
            scope: 'Access history',
            status: 'Blocked',
            updatedAt: 'Waiting on review',
            completion: 64,
            openIssues: 3,
          },
        ]}
        rowKey="id"
      />,
    );

    const rowHeader = screen.getByRole('rowheader', { name: /billing alerts/i });
    expect(rowHeader).toHaveTextContent(/workspace notifications/i);

    const blockedStatus = screen.getByText('Blocked').closest('.avenra-data-grid__cell-stack');
    expect(blockedStatus).toHaveClass('avenra-data-grid__cell--tone-danger');

    const completionCell = screen.getByText('64%').closest('td');
    expect(completionCell).toHaveClass('avenra-data-grid__cell--align-end');
    expect(completionCell).toHaveTextContent(/3 open issues/i);
  });

  it('renders an empty state row when there are no rows', () => {
    render(
      <DataGrid
        caption="Archived releases"
        columns={[
          { id: 'release', header: 'Release', accessorKey: 'release' },
          { id: 'status', header: 'Status', accessorKey: 'status' },
        ]}
        rows={[]}
        emptyState="No archived releases yet."
      />,
    );

    expect(screen.getByRole('cell', { name: /no archived releases yet\./i })).toHaveAttribute('colspan', '2');
  });
});
