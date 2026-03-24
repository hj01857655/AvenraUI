import { cn } from '@avenra/utils';
import type { ReactNode } from 'react';

export type TableAlign = 'start' | 'center' | 'end';

export interface TableColumn<Row> {
  id: string;
  header: ReactNode;
  accessorKey?: keyof Row;
  renderCell?: (row: Row, rowIndex: number) => ReactNode;
  align?: TableAlign;
  rowHeader?: boolean;
  width?: string;
}

export interface TableProps<Row extends Record<string, unknown>> {
  columns: TableColumn<Row>[];
  rows: Row[];
  caption?: string;
  emptyState?: ReactNode;
  rowKey?: keyof Row | ((row: Row, rowIndex: number) => string | number);
  className?: string;
}

function getAlignmentClass(align: TableAlign | undefined) {
  switch (align) {
    case 'center':
      return 'avenra-table__cell--align-center';
    case 'end':
      return 'avenra-table__cell--align-end';
    default:
      return 'avenra-table__cell--align-start';
  }
}

function getCellContent<Row extends Record<string, unknown>>(column: TableColumn<Row>, row: Row, rowIndex: number) {
  if (column.renderCell) {
    return column.renderCell(row, rowIndex);
  }

  if (column.accessorKey) {
    const value = row[column.accessorKey];
    return value === undefined || value === null ? '' : String(value);
  }

  return '';
}

function getRowKey<Row extends Record<string, unknown>>(
  row: Row,
  rowIndex: number,
  rowKey: TableProps<Row>['rowKey'],
) {
  if (typeof rowKey === 'function') {
    return String(rowKey(row, rowIndex));
  }

  if (rowKey) {
    const value = row[rowKey];
    return value === undefined || value === null ? `${rowIndex}` : String(value);
  }

  return `${rowIndex}`;
}

export function Table<Row extends Record<string, unknown>>({
  caption,
  className,
  columns,
  emptyState = 'No rows available.',
  rowKey,
  rows,
}: TableProps<Row>) {
  return (
    <div className={cn('avenra-table', className)}>
      <table className="avenra-table__element">
        {caption ? <caption className="avenra-table__caption">{caption}</caption> : null}
        <thead className="avenra-table__head">
          <tr className="avenra-table__row">
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={cn('avenra-table__header', getAlignmentClass(column.align))}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="avenra-table__body">
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr className="avenra-table__row" key={getRowKey(row, rowIndex, rowKey)}>
                {columns.map((column) => {
                  const content = getCellContent(column, row, rowIndex);
                  const cellClassName = cn('avenra-table__cell', getAlignmentClass(column.align));

                  if (column.rowHeader) {
                    return (
                      <th className={cn(cellClassName, 'avenra-table__row-header')} key={column.id} scope="row">
                        {content}
                      </th>
                    );
                  }

                  return (
                    <td className={cellClassName} key={column.id}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr className="avenra-table__row">
              <td className="avenra-table__cell avenra-table__empty" colSpan={columns.length || 1}>
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
