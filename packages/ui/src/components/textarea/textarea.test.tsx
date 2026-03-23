import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders a multiline field with label, hint, and invalid state', () => {
    render(
      <Textarea
        id="message"
        label="Message"
        hint="Share context for your team"
        error="Message is required"
      />,
    );

    const textarea = screen.getByLabelText('Message');

    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'message-hint message-error');
  });
});
