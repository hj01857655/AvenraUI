import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Form } from './form';
import { FormField } from '../form-field/form-field';
import { Input } from '../input/input';

describe('Form', () => {
  it('reflects submitting state on the native form element', () => {
    const { container } = render(
      <Form submitting aria-label="Account form">
        <FormField label="Email">
          <Input />
        </FormField>
      </Form>,
    );

    const form = container.querySelector('form');

    expect(form).not.toBeNull();
    expect(form).toHaveClass('avenra-form');
    expect(form).toHaveAttribute('aria-busy', 'true');
    expect(form).toHaveAttribute('data-submitting', 'true');
    expect(form).toHaveAttribute('data-disabled', 'false');
  });

  it('propagates submitting state to child fields', () => {
    render(
      <Form submitting>
        <FormField label="Email">
          <Input />
        </FormField>
      </Form>,
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('propagates disabled state to child fields', () => {
    const { container } = render(
      <Form disabled>
        <FormField label="Email">
          <Input />
        </FormField>
      </Form>,
    );

    expect(container.querySelector('form')).toHaveAttribute('data-disabled', 'true');
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
