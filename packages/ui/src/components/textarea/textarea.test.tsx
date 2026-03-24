import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Textarea } from './textarea';
import { FormField } from '../form-field/form-field';

describe('Textarea', () => {
  it('renders a multiline field with label, hint, and invalid state', () => {
    render(
      <Textarea
        id="message"
        label="Message"
        hint="Tell us more about the issue"
        error="Message is required"
      />,
    );

    const textarea = screen.getByRole('textbox');
    const hint = screen.getByText('Tell us more about the issue');
    const error = screen.getByText('Message is required');

    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', `${hint.id} ${error.id}`);
  });

  it('consumes FormField context when wrapped', () => {
    render(
      <FormField label="Wrapped bio" hint="Context hint" error="Context error" required>
        <Textarea />
      </FormField>,
    );

    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('required');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Context hint')).toBeInTheDocument();
    expect(screen.getByText('Context error')).toBeInTheDocument();
  });
});
