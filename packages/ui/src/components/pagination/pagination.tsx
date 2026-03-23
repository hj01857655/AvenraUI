import { cn } from '@avenra/utils';
import type { HTMLAttributes } from 'react';

type PaginationItem =
  | { type: 'page'; value: number }
  | { type: 'ellipsis'; value: string };

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  ariaLabel?: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  totalPages: number;
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), totalPages);
}

function getPaginationItems(currentPage: number, totalPages: number, siblingCount: number): PaginationItem[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => ({ type: 'page' as const, value: index + 1 }));
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const items: PaginationItem[] = [{ type: 'page', value: 1 }];

  if (showLeftEllipsis) {
    items.push({ type: 'ellipsis', value: 'left-ellipsis' });
  } else {
    for (let page = 2; page < leftSiblingIndex; page += 1) {
      items.push({ type: 'page', value: page });
    }
  }

  for (let page = leftSiblingIndex; page <= rightSiblingIndex; page += 1) {
    items.push({ type: 'page', value: page });
  }

  if (showRightEllipsis) {
    items.push({ type: 'ellipsis', value: 'right-ellipsis' });
  } else {
    for (let page = rightSiblingIndex + 1; page < totalPages; page += 1) {
      items.push({ type: 'page', value: page });
    }
  }

  items.push({ type: 'page', value: totalPages });

  return items;
}

export function Pagination({
  ariaLabel = 'Pagination',
  className,
  currentPage,
  onPageChange,
  siblingCount = 1,
  totalPages,
  ...props
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = clampPage(currentPage, safeTotalPages);
  const items = getPaginationItems(safeCurrentPage, safeTotalPages, siblingCount);

  const handlePageChange = (page: number) => {
    if (page === safeCurrentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <nav aria-label={ariaLabel} className={cn('avenra-pagination', className)} {...props}>
      <div className="avenra-pagination__list">
        <button
          type="button"
          className="avenra-button avenra-button--secondary avenra-button--sm avenra-pagination__button"
          onClick={() => handlePageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage <= 1}
          aria-label="Previous page"
        >
          Previous
        </button>

        {items.map((item) => {
          if (item.type === 'ellipsis') {
            return (
              <span key={item.value} aria-hidden="true" className="avenra-pagination__ellipsis">
                …
              </span>
            );
          }

          const isCurrent = item.value === safeCurrentPage;

          return (
            <button
              key={item.value}
              type="button"
              aria-current={isCurrent ? 'page' : undefined}
              aria-label={`Page ${item.value}`}
              className={cn(
                'avenra-button avenra-button--sm avenra-pagination__button',
                isCurrent ? 'avenra-button--primary avenra-pagination__button--current' : 'avenra-button--secondary'
              )}
              onClick={() => handlePageChange(item.value)}
              disabled={isCurrent}
            >
              {item.value}
            </button>
          );
        })}

        <button
          type="button"
          className="avenra-button avenra-button--secondary avenra-button--sm avenra-pagination__button"
          onClick={() => handlePageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage >= safeTotalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
