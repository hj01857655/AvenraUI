import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from '../../index';

describe('Input', () => {
  it('renders label, hint, and invalid message accessibly', () => {
    render(
      <Input
        id="email"
        label="Email"
        hint="Use your work email"
        error="Email is required"
      />,
    );

    const input = screen.getByLabelText('Email');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-hint email-error');
    expect(screen.getByText('Use your work email')).toHaveAttribute('id', 'email-hint');
    expect(screen.getByText('Email is required')).toHaveAttribute('id', 'email-error');
  });

  it('keeps aria-invalid false and no error id when valid', () => {
    render(<Input id="name" label="Name" hint="Visible to your team" />);

    const input = screen.getByLabelText('Name');

    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).toHaveAttribute('aria-describedby', 'name-hint');
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });
});
