import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Switch } from './switch';
import { FormField } from '../form-field/form-field';

describe('Switch', () => {
  it('renders label, hint, and invalid message accessibly', () => {
    render(
      <Switch
        id="marketing-consent"
        label="Marketing consent"
        hint="Used for product announcements"
        error="Choose whether marketing consent is enabled"
      />,
    );

    const control = screen.getByRole('switch', { name: 'Marketing consent' });
    const hint = screen.getByText('Used for product announcements');
    const error = screen.getByText('Choose whether marketing consent is enabled');

    expect(control).toHaveAttribute('type', 'checkbox');
    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(control).toHaveAttribute('aria-describedby', `${hint.id} ${error.id}`);
  });

  it('wires the visible label to the switch control', () => {
    render(<Switch id="notifications" label="Email notifications" />);

    const control = screen.getByLabelText('Email notifications');

    expect(control).toHaveAttribute('id', 'notifications');
    expect(control).toHaveAttribute('type', 'checkbox');
    expect(control).toHaveAttribute('role', 'switch');
  });

  it('keeps aria-invalid false and omits an error id when valid', () => {
    render(
      <Switch
        id="beta-access"
        label="Beta access"
        hint="Can be changed later"
      />,
    );

    const control = screen.getByRole('switch', { name: 'Beta access' });
    const hint = screen.getByText('Can be changed later');

    expect(control).toHaveAttribute('aria-invalid', 'false');
    expect(control).toHaveAttribute('aria-describedby', hint.id);
    expect(
      screen.queryByText(/marketing consent is enabled/i),
    ).not.toBeInTheDocument();
  });

  it('omits aria-describedby when neither hint nor error is present', () => {
    render(<Switch id="public-profile" label="Public profile" />);

    const control = screen.getByRole('switch', { name: 'Public profile' });

    expect(control).not.toHaveAttribute('aria-describedby');
  });

  it('supports checked and defaultChecked semantics for a boolean switch', () => {
    render(
      <>
        <Switch id="dark-mode-default" label="Dark mode" defaultChecked />
        <Switch id="dark-mode-manual" label="Manual theme" />
      </>,
    );

    const darkModeSwitch = screen.getByRole('switch', { name: 'Dark mode' });
    const manualThemeSwitch = screen.getByRole('switch', {
      name: 'Manual theme',
    });

    expect(darkModeSwitch).toBeChecked();
    expect(manualThemeSwitch).not.toBeChecked();
  });

  it('toggles checked state when the boolean control is clicked', () => {
    render(<Switch id="presence" label="Show online status" />);

    const control = screen.getByRole('switch', { name: 'Show online status' });

    expect(control).not.toBeChecked();

    fireEvent.click(control);
    expect(control).toBeChecked();

    fireEvent.click(control);
    expect(control).not.toBeChecked();
  });

  it('renders hint and error through FormField control layout', () => {
    render(
      <FormField hint="Context hint" error="Context error" required layout="control">
        <Switch label="Enable notifications" />
      </FormField>,
    );

    const toggle = screen.getByRole('switch', { name: 'Enable notifications' });

    expect(toggle).toHaveAttribute('required');
    expect(toggle).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Context hint')).toBeInTheDocument();
    expect(screen.getByText('Context error')).toBeInTheDocument();
  });

  it('respects required and invalid when rendered without a field wrapper', () => {
    render(<Switch fieldWrapper={false} invalid label="Direct switch" required />);

    const toggle = screen.getByRole('switch', { name: 'Direct switch' });

    expect(toggle).toHaveAttribute('required');
    expect(toggle).toHaveAttribute('aria-invalid', 'true');
  });
});
