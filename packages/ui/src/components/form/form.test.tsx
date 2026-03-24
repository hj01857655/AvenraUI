import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Form } from './form';
import { FormField } from '../form-field/form-field';
import { Input } from '../input/input';

describe('Form', () => {
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
    render(
      <Form disabled>
        <FormField label="Email">
          <Input />
        </FormField>
      </Form>,
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
