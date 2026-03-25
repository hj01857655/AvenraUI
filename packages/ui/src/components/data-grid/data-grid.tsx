import { cn } from '@avenra/utils';
import { isValidElement, type ReactNode } from 'react';

export type DataGridAlign = 'start' | 'center' | 'end';
export type DataGridCellTone = 'default' | 'info' | 'success' | 'warning' | 'danger';

export interface DataGridCellContent {
  primary: ReactNode;
  secondary?: ReactNode;
  tone?: DataGridCellTone;
}

export type DataGridCellValue = ReactNode | DataGridCellContent;

export interface DataGridColumn<Row> {
  id: string;
  header: ReactNode;
  accessorKey?: keyof Row;
  renderCell?: (row: Row, rowIndex: number) => DataGridCellValue;
  align?: DataGridAlign;
  rowHeader?: boolean;
  width?: string;
}

export interface DataGridProps<Row extends Record<string, unknown>> {
  columns: DataGridColumn<Row>[];
  rows: Row[];
  caption?: string;
  emptyState?: ReactNode;
  rowKey?: keyof Row | ((row: Row, rowIndex: number) => string | number);
  className?: string;
}

function getAlignmentClass(align: DataGridAlign | undefined) {
  switch (align) {
    case 'center':
      return 'avenra-data-grid__cell--align-center';
    case 'end':
      return 'avenra-data-grid__cell--align-end';
    default:
      return 'avenra-data-grid__cell--align-start';
  }
}

function getCellToneClass(tone: DataGridCellTone | undefined) {
  switch (tone) {
    case 'info':
      return 'avenra-data-grid__cell--tone-info';
    case 'success':
      return 'avenra-data-grid__cell--tone-success';
    case 'warning':
      return 'avenra-data-grid__cell--tone-warning';
    case 'danger':
      return 'avenra-data-grid__cell--tone-danger';
    default:
      return undefined;
  }
}

function isCellContent(value: DataGridCellValue): value is DataGridCellContent {
  return typeof value === 'object' && value !== null && !isValidElement(value) && 'primary' in value;
}

function getPrimitiveCellValue(value: unknown) {
  if (value === undefined || value === null) {
    return '';
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return String(value);
}

function getCellValue<Row extends Record<string, unknown>>(column: DataGridColumn<Row>, row: Row, rowIndex: number): DataGridCellValue {
  if (column.renderCell) {
    return column.renderCell(row, rowIndex);
  }

  if (column.accessorKey) {
    return getPrimitiveCellValue(row[column.accessorKey]);
  }

  return '';
}

function getRowKey<Row extends Record<string, unknown>>(
  row: Row,
  rowIndex: number,
  rowKey: DataGridProps<Row>['rowKey'],
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

function DataGridCellBody({ value }: { value: DataGridCellValue }) {
  if (isCellContent(value)) {
    return (
      <div className={cn('avenra-data-grid__cell-stack', getCellToneClass(value.tone))}>
        <span className="avenra-data-grid__cell-primary">{value.primary}</span>
        {value.secondary ? <span className="avenra-data-grid__cell-secondary">{value.secondary}</span> : null}
      </div>
    );
  }

  return <div className="avenra-data-grid__cell-stack"><span className="avenra-data-grid__cell-primary">{value}</span></div>;
}

export function DataGrid<Row extends Record<string, unknown>>({
  caption,
  className,
  columns,
  emptyState = 'No data available.',
  rowKey,
  rows,
}: DataGridProps<Row>) {
  return (
    <div className={cn('avenra-data-grid', className)}>
      <table className="avenra-data-grid__element">
        {caption ? <caption className="avenra-data-grid__caption">{caption}</caption> : null}
        <thead className="avenra-data-grid__head">
          <tr className="avenra-data-grid__row">
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={cn('avenra-data-grid__header', getAlignmentClass(column.align))}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="avenra-data-grid__body">
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={getRowKey(row, rowIndex, rowKey)} className="avenra-data-grid__row">
                {columns.map((column) => {
                  const content = getCellValue(column, row, rowIndex);
                  const cellClassName = cn('avenra-data-grid__cell', getAlignmentClass(column.align));

                  if (column.rowHeader) {
                    return (
                      <th key={column.id} scope="row" className={cn(cellClassName, 'avenra-data-grid__row-header')}>
                        <DataGridCellBody value={content} />
                      </th>
                    );
                  }

                  return (
                    <td key={column.id} className={cellClassName}>
                      <DataGridCellBody value={content} />
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr className="avenra-data-grid__row">
              <td className="avenra-data-grid__cell avenra-data-grid__empty" colSpan={columns.length || 1}>
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
