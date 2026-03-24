import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from './pagination';

describe('Pagination', () => {
  it('renders navigation controls and marks the current page', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={vi.fn()} />);

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 5' })).toHaveAttribute('aria-current', 'page');
  });

  it('disables boundary controls on the first and last pages', () => {
    const { rerender } = render(<Pagination currentPage={1} totalPages={4} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled();

    rerender(<Pagination currentPage={4} totalPages={4} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('emits onPageChange for page buttons and previous/next controls', () => {
    const onPageChange = vi.fn();

    render(<Pagination currentPage={3} totalPages={8} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Page 4' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 4);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 2);
    expect(onPageChange).toHaveBeenNthCalledWith(3, 4);
  });

  it('renders ellipsis when page ranges are truncated', () => {
    render(<Pagination currentPage={6} totalPages={12} onPageChange={vi.fn()} />);

    expect(screen.getAllByText('…')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 12' })).toBeInTheDocument();
  });

  it('clamps invalid page numbers into a safe visible state', () => {
    const { rerender } = render(<Pagination currentPage={0} totalPages={3} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');

    rerender(<Pagination currentPage={8} totalPages={3} onPageChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders a structured page list and keeps the current page non-interactive', () => {
    render(<Pagination currentPage={3} totalPages={7} onPageChange={vi.fn()} />);

    const nav = screen.getByRole('navigation', { name: 'Pagination' });
    const currentPage = screen.getByRole('button', { name: 'Page 3' });

    expect(within(nav).getByRole('list')).toBeInTheDocument();
    expect(within(nav).getAllByRole('listitem').length).toBeGreaterThan(0);
    expect(currentPage).toHaveAttribute('aria-current', 'page');
    expect(currentPage).toBeDisabled();
  });
});
