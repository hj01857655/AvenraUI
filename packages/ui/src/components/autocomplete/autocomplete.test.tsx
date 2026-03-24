import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Autocomplete } from './autocomplete';

describe('Autocomplete', () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Apricot', value: 'apricot' },
    { label: 'Banana', value: 'banana' },
  ];

  it('respects minQueryLength before showing options', () => {
    render(<Autocomplete label="Search fruit" minQueryLength={2} options={options} />);

    const input = screen.getByRole('combobox', { name: 'Search fruit' });
    fireEvent.focus(input);

    expect(screen.getByText('No results found')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'ap' } });

    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apricot' })).toBeInTheDocument();
  });

  it('selects an option and forwards onValueChange', () => {
    const onValueChange = vi.fn();

    render(<Autocomplete label="Fruit" onValueChange={onValueChange} options={options} />);

    const input = screen.getByRole('combobox', { name: 'Fruit' });
    fireEvent.focus(input);
    fireEvent.click(screen.getByRole('option', { name: 'Banana' }));

    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('keeps direct invalid and required semantics when fieldWrapper is disabled', () => {
    render(
      <Autocomplete
        aria-label="Direct autocomplete"
        fieldWrapper={false}
        invalid
        required
        minQueryLength={2}
        options={options}
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Direct autocomplete' });

    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
