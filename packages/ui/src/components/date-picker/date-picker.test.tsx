import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormField } from '../form-field/form-field';
import { DatePicker } from './date-picker';

describe('DatePicker', () => {
  it('renders label, hint, error, and selected value accessibly', () => {
    render(
      <DatePicker
        id="release-date"
        label="Release date"
        hint="Choose the date this update becomes visible"
        error="Release date is required"
        defaultValue="2026-03-18"
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Release date' });
    const hint = screen.getByText('Choose the date this update becomes visible');
    const error = screen.getByText('Release date is required');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', `${hint.id} ${error.id}`);
    expect(input).toHaveValue('Mar 18, 2026');
  });

  it('opens the calendar and selects a date from the panel', () => {
    const onValueChange = vi.fn();

    render(
      <DatePicker
        label="Publish date"
        defaultValue="2026-03-18"
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Publish date' });

    fireEvent.focus(input);
    fireEvent.click(screen.getByRole('gridcell', { name: /friday, march 20, 2026/i }));

    expect(onValueChange).toHaveBeenLastCalledWith('2026-03-20');
    expect(input).toHaveValue('Mar 20, 2026');
    expect(screen.queryByRole('dialog', { name: /choose date/i })).not.toBeInTheDocument();
  });

  it('supports keyboard opening, day navigation, and escape dismissal', () => {
    render(<DatePicker label="Start date" defaultValue="2026-03-18" />);

    const input = screen.getByRole('combobox', { name: 'Start date' });

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByRole('dialog', { name: /choose date/i })).toBeInTheDocument();

    const selectedDay = screen.getByRole('gridcell', { name: /wednesday, march 18, 2026/i });

    fireEvent.keyDown(selectedDay, { key: 'ArrowRight' });
    expect(screen.getByRole('gridcell', { name: /thursday, march 19, 2026/i })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('gridcell', { name: /thursday, march 19, 2026/i }), { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /choose date/i })).not.toBeInTheDocument();
  });

  it('inherits disabled field semantics from FormField and blocks opening', () => {
    render(
      <FormField label="Wrapped date" hint="Disabled from the form shell" disabled>
        <DatePicker defaultValue="2026-03-18" />
      </FormField>,
    );

    const input = screen.getByRole('combobox', { name: 'Wrapped date' });

    expect(input).toBeDisabled();
    expect(screen.getByRole('button', { name: /open calendar/i })).toBeDisabled();

    fireEvent.focus(input);
    expect(screen.queryByRole('dialog', { name: /choose date/i })).not.toBeInTheDocument();
  });
});
