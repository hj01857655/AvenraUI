import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Checkbox } from './checkbox';
import { FormField } from '../form-field/form-field';

describe('Checkbox', () => {
  it('renders label, hint, and invalid message accessibly', () => {
    render(
      <Checkbox
        id="terms"
        label="Accept terms"
        hint="Required before continuing"
        error="You must accept the terms"
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    const hint = screen.getByText('Required before continuing');
    const error = screen.getByText('You must accept the terms');

    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute('aria-describedby', `${hint.id} ${error.id}`);
  });

  it('wires the visible label to the native checkbox control', () => {
    render(<Checkbox id="updates" label="Email updates" />);

    const checkbox = screen.getByLabelText('Email updates');

    expect(checkbox).toHaveAttribute('id', 'updates');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('supports checked state changes and defaultChecked for native checkbox behavior', () => {
    render(<Checkbox id="notifications" label="Product notifications" defaultChecked />);

    const checkbox = screen.getByRole('checkbox', { name: 'Product notifications' });

    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it("keeps aria-invalid false and doesn't include an error id when valid", () => {
    render(<Checkbox id="privacy" label="Privacy policy" hint="Visible during sign up" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Privacy policy' });
    const hint = screen.getByText('Visible during sign up');

    expect(checkbox).toHaveAttribute('aria-invalid', 'false');
    expect(checkbox).toHaveAttribute('aria-describedby', hint.id);
    expect(screen.queryByText(/must accept/i)).not.toBeInTheDocument();
  });

  it('omits aria-describedby when neither hint nor error is present', () => {
    render(<Checkbox id="analytics" label="Analytics" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Analytics' });

    expect(checkbox).not.toHaveAttribute('aria-describedby');
  });

  it('renders hint and error through FormField control layout', () => {
    render(
      <FormField hint="Context hint" error="Context error" required layout="control">
        <Checkbox label="Accept terms" />
      </FormField>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

    expect(checkbox).toHaveAttribute('required');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Context hint')).toBeInTheDocument();
    expect(screen.getByText('Context error')).toBeInTheDocument();
  });
});

