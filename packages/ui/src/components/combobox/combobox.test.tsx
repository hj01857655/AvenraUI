import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Combobox } from './combobox';

describe('Combobox', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Apricot', value: 'apricot' },
    { label: 'Banana', value: 'banana' }
  ];

  it('filters options and selects via keyboard in uncontrolled mode', () => {
    const onValueChange = vi.fn();

    render(
      <Combobox
        label="Fruit"
        placeholder="Search fruits"
        options={options}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Fruit' });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'ap' } });

    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apricot' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Banana' })).not.toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input).toHaveValue('Apple');
    expect(onValueChange).toHaveBeenCalledWith('apple');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports controlled value and open state', () => {
    const onOpenChange = vi.fn();
    const onValueChange = vi.fn();

    render(
      <Combobox
        label="Controlled fruit"
        open
        value="banana"
        inputValue="Banana"
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        options={options}
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Controlled fruit' });

    expect(input).toHaveValue('Banana');
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByRole('option', { name: 'Apple' }));
    expect(onValueChange).toHaveBeenCalledWith('apple');
  });

  it('renders empty state when no results match', () => {
    render(
      <Combobox
        label="Search"
        options={options}
        emptyMessage="No fruits found"
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Search' });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'zzz' } });

    expect(screen.getByText('No fruits found')).toBeInTheDocument();
  });
});
