import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FormField } from '../form-field/form-field';
import { DateRangePicker } from './date-range-picker';

describe('DateRangePicker', () => {
  it('renders label, hint, error, and the selected range value', () => {
    render(
      <DateRangePicker
        id="release-window"
        label="Release window"
        hint="Choose the public launch range"
        error="A complete range is required"
        defaultValue={{ start: '2026-03-18', end: '2026-03-24' }}
      />
    );

    expect(screen.getByLabelText('Release window')).toHaveValue('Mar 18, 2026 — Mar 24, 2026');
    expect(screen.getByText('Choose the public launch range')).toBeInTheDocument();
    expect(screen.getByText('A complete range is required')).toBeInTheDocument();
  });

  it('opens the calendar and commits a sorted start/end range', () => {
    render(
      <DateRangePicker
        id="billing-window"
        label="Billing window"
        defaultValue={{ start: '2026-03-23', end: '2026-03-23' }}
      />
    );

    const input = screen.getByRole('combobox', { name: /billing window/i });
    fireEvent.focus(input);

    fireEvent.click(screen.getByRole('gridcell', { name: /monday, march 23, 2026/i }));
    expect(screen.getByText(/select the end date to finish the range/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('gridcell', { name: /wednesday, march 18, 2026/i }));

    expect(input).toHaveValue('Mar 18, 2026 — Mar 23, 2026');
    expect(screen.queryByRole('dialog', { name: /choose date range/i })).not.toBeInTheDocument();
  });

  it('supports keyboard opening, navigation, selection, and escape dismissal', () => {
    render(
      <DateRangePicker
        id="planning-window"
        label="Planning window"
        defaultValue={{ start: '2026-03-24', end: '2026-03-24' }}
      />
    );

    const input = screen.getByRole('combobox', { name: /planning window/i });
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const activeDay = screen.getByRole('gridcell', { name: /tuesday, march 24, 2026/i });
    fireEvent.keyDown(activeDay, { key: 'Enter' });

    expect(screen.getByText(/select the end date to finish the range/i)).toBeInTheDocument();

    const startDay = screen.getByRole('gridcell', { name: /tuesday, march 24, 2026/i });
    fireEvent.keyDown(startDay, { key: 'ArrowRight' });
    const endDay = screen.getByRole('gridcell', { name: /wednesday, march 25, 2026/i });
    fireEvent.keyDown(endDay, { key: 'Enter' });

    expect(input).toHaveValue('Mar 24, 2026 — Mar 25, 2026');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByRole('dialog', { name: /choose date range/i })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('gridcell', { name: /wednesday, march 25, 2026/i }), { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /choose date range/i })).not.toBeInTheDocument();
  });

  it('inherits disabled state from form field context', () => {
    render(
      <FormField label="Archive window" disabled>
        <DateRangePicker />
      </FormField>
    );

    const input = screen.getByRole('combobox', { name: /archive window/i });
    expect(input).toBeDisabled();
    fireEvent.focus(input);
    expect(screen.queryByRole('dialog', { name: /choose date range/i })).not.toBeInTheDocument();
  });
});
