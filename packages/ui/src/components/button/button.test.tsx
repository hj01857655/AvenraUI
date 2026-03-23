import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('disables interaction and shows loading text when loading is true', () => {
    render(<Button loading>Save</Button>);

    const button = screen.getByRole('button', { name: 'Loading…' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('applies variant and size classes for styling hooks', () => {
    render(
      <Button variant="secondary" size="lg">
        Preview
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Preview' });

    expect(button.className).toContain('avenra-button--secondary');
    expect(button.className).toContain('avenra-button--lg');
  });
});
