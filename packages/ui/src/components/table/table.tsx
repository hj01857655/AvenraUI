import { cn } from '@avenra/utils';
import { useMemo, useState, type ReactNode } from 'react';

export type TableAlign = 'start' | 'center' | 'end';
export type TableDensity = 'comfortable' | 'compact';
export type TableSortDirection = 'asc' | 'desc';
export type TableRowTone = 'default' | 'info' | 'success' | 'warning' | 'danger';
export interface TableSortState {
  columnId: string;
  direction: TableSortDirection;
}

type TableSortAccessorValue = string | number | boolean | Date | null | undefined;

export interface TableColumn<Row> {
  id: string;
  header: ReactNode;
  accessorKey?: keyof Row;
  renderCell?: (row: Row, rowIndex: number) => ReactNode;
  sortAccessor?: (row: Row, rowIndex: number) => TableSortAccessorValue;
  sortable?: boolean;
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
  density?: TableDensity;
  striped?: boolean;
  stickyHeader?: boolean;
  defaultSort?: TableSortState | null;
  sort?: TableSortState | null;
  onSortChange?: (sort: TableSortState | null) => void;
  getRowTone?: (row: Row, rowIndex: number) => TableRowTone;
}

function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (nextValue: T) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return [currentValue, setValue] as const;
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

function getSortValue<Row extends Record<string, unknown>>(
  column: TableColumn<Row>,
  row: Row,
  rowIndex: number,
): TableSortAccessorValue {
  if (column.sortAccessor) {
    return column.sortAccessor(row, rowIndex);
  }

  if (column.accessorKey) {
    const value = row[column.accessorKey];

    if (value instanceof Date || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value;
    }
  }

  return null;
}

function compareSortValues(left: TableSortAccessorValue, right: TableSortAccessorValue) {
  if (left == null && right == null) {
    return 0;
  }

  if (left == null) {
    return 1;
  }

  if (right == null) {
    return -1;
  }

  if (left instanceof Date && right instanceof Date) {
    return left.getTime() - right.getTime();
  }

  if (left instanceof Date) {
    return left.getTime() - new Date(String(right)).getTime();
  }

  if (right instanceof Date) {
    return new Date(String(left)).getTime() - right.getTime();
  }

  if (typeof left === 'number' && typeof right === 'number') {
    return left - right;
  }

  if (typeof left === 'boolean' && typeof right === 'boolean') {
    return Number(left) - Number(right);
  }

  return String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: 'base' });
}

function getRowToneClass(tone: TableRowTone | undefined) {
  switch (tone) {
    case 'info':
      return 'avenra-table__row--tone-info';
    case 'success':
      return 'avenra-table__row--tone-success';
    case 'warning':
      return 'avenra-table__row--tone-warning';
    case 'danger':
      return 'avenra-table__row--tone-danger';
    default:
      return undefined;
  }
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
  defaultSort = null,
  density = 'comfortable',
  emptyState = 'No rows available.',
  getRowTone,
  onSortChange,
  rowKey,
  rows,
  sort,
  stickyHeader = false,
  striped = false,
}: TableProps<Row>) {
  const [sortState, setSortState] = useControllableState<TableSortState | null>({
    value: sort,
    defaultValue: defaultSort,
    onChange: onSortChange,
  });

  const sortedRows = useMemo(() => {
    if (!sortState) {
      return rows;
    }

    const sortColumn = columns.find((column) => column.id === sortState.columnId && column.sortable);

    if (!sortColumn) {
      return rows;
    }

    return [...rows].sort((leftRow, rightRow) => {
      const leftValue = getSortValue(sortColumn, leftRow, rows.indexOf(leftRow));
      const rightValue = getSortValue(sortColumn, rightRow, rows.indexOf(rightRow));
      const comparison = compareSortValues(leftValue, rightValue);

      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [columns, rows, sortState]);

  return (
    <div
      className={cn(
        'avenra-table',
        density === 'compact' && 'avenra-table--compact',
        striped && 'avenra-table--striped',
        stickyHeader && 'avenra-table--sticky-header',
        className,
      )}
    >
      <table className="avenra-table__element">
        {caption ? <caption className="avenra-table__caption">{caption}</caption> : null}
        <thead className="avenra-table__head">
          <tr className="avenra-table__row">
            {columns.map((column) => {
              const isSorted = sortState?.columnId === column.id;
              const ariaSort = column.sortable ? (isSorted ? (sortState?.direction === 'asc' ? 'ascending' : 'descending') : 'none') : undefined;

              return (
                <th
                  key={column.id}
                  scope="col"
                  aria-sort={ariaSort}
                  className={cn('avenra-table__header', getAlignmentClass(column.align))}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className="avenra-table__sort"
                      aria-label={`Sort by ${typeof column.header === 'string' ? column.header : column.id}`}
                      onClick={() =>
                        setSortState({
                          columnId: column.id,
                          direction: isSorted && sortState?.direction === 'asc' ? 'desc' : 'asc',
                        })
                      }
                    >
                      <span>{column.header}</span>
                      <span aria-hidden="true" className="avenra-table__sort-indicator">
                        {isSorted ? (sortState?.direction === 'asc' ? '↑' : '↓') : '↕'}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="avenra-table__body">
          {sortedRows.length > 0 ? (
            sortedRows.map((row, rowIndex) => (
              <tr
                className={cn('avenra-table__row', getRowToneClass(getRowTone?.(row, rowIndex)))}
                key={getRowKey(row, rowIndex, rowKey)}
              >
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
