import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from '../../index';
import { FormField } from '../form-field/form-field';

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

    const input = screen.getByRole('textbox');
    const hint = screen.getByText('Use your work email');
    const error = screen.getByText('Email is required');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', `${hint.id} ${error.id}`);
  });

  it('keeps aria-invalid false and no error id when valid', () => {
    render(<Input id="name" label="Name" hint="Visible to your team" />);

    const input = screen.getByRole('textbox');
    const hint = screen.getByText('Visible to your team');

    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).toHaveAttribute('aria-describedby', hint.id);
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

  it('consumes FormField context when wrapped', () => {
    render(
      <FormField label="Wrapped email" hint="Context hint" error="Context error" required>
        <Input />
      </FormField>,
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Context hint')).toBeInTheDocument();
    expect(screen.getByText('Context error')).toBeInTheDocument();
  });

  it('respects required and invalid when rendered without a field wrapper', () => {
    render(<Input aria-label="Direct input" fieldWrapper={false} invalid required />);

    const input = screen.getByRole('textbox', { name: 'Direct input' });

    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
