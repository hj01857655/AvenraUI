import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormField } from '../form-field/form-field';
import { MultiSelect } from './multi-select';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular', disabled: true },
];

describe('MultiSelect', () => {
  it('renders label, hint, error, and selected options accessibly', () => {
    render(
      <MultiSelect
        id="frameworks"
        label="Frameworks"
        hint="Choose every framework included in this workspace"
        error="Select at least one framework"
        defaultValue={['react']}
        options={options}
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Frameworks' });
    const hint = screen.getByText('Choose every framework included in this workspace');
    const error = screen.getByText('Select at least one framework');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', `${hint.id} ${error.id}`);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove react/i })).toBeInTheDocument();
  });

  it('supports keyboard filtering and multi-selection without duplicating selections', () => {
    const onValueChange = vi.fn();

    render(
      <MultiSelect
        label="Libraries"
        options={options}
        defaultValue={['react']}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Libraries' });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'sv' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByRole('button', { name: /remove svelte/i })).toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith(['react', 'svelte']);
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getAllByRole('button', { name: /remove react/i })).toHaveLength(1);
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('removes selected options with both the remove button and Backspace when the query is empty', () => {
    const onValueChange = vi.fn();

    render(
      <MultiSelect
        label="Stacks"
        options={options}
        defaultValue={['react', 'vue']}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Stacks' });

    fireEvent.click(screen.getByRole('button', { name: /remove react/i }));
    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith(['vue']);

    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(screen.queryByText('Vue')).not.toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it('inherits disabled field semantics and prevents selection changes', () => {
    render(
      <FormField label="Wrapped multi select" hint="Disabled from the form shell" disabled>
        <MultiSelect defaultValue={['react']} options={options} />
      </FormField>,
    );

    const input = screen.getByRole('combobox', { name: 'Wrapped multi select' });
    const removeButton = screen.getByRole('button', { name: /remove react/i });

    expect(input).toBeDisabled();
    expect(removeButton).toBeDisabled();

    fireEvent.focus(input);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
