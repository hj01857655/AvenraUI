import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Stack } from './stack';

describe('Stack', () => {
  it('applies direction and gap classes', () => {
    const { container } = render(
      <Stack direction="horizontal" gap="lg">
        <span>One</span>
        <span>Two</span>
      </Stack>,
    );

    const stack = container.querySelector('.avenra-stack');

    expect(stack).toHaveClass('avenra-stack--horizontal');
    expect(stack).toHaveClass('avenra-stack--gap-lg');
  });
});
