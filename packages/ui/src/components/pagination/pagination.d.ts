import type { HTMLAttributes } from 'react';
export interface PaginationProps extends HTMLAttributes<HTMLElement> {
    ariaLabel?: string;
    currentPage: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    totalPages: number;
}
export declare function Pagination({ ariaLabel, className, currentPage, onPageChange, siblingCount, totalPages, ...props }: PaginationProps): import("react/jsx-runtime").JSX.Element;
