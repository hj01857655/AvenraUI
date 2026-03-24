import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Command } from './command';

describe('Command', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Apricot', value: 'apricot' },
    { label: 'Banana', value: 'banana' },
  ];

  it('filters results and selects with keyboard', () => {
    const onSelect = vi.fn();

    render(<Command options={options} onSelect={onSelect} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'ap' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith('apple');
  });

  it('shows empty state when there are no results', () => {
    render(<Command options={options} emptyMessage="Nothing found" />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'zzz' } });

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('supports controlled open state', () => {
    const onOpenChange = vi.fn();

    render(<Command options={options} open={false} onOpenChange={onOpenChange} />);

    fireEvent.focus(screen.getByRole('combobox'));

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
