import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Inline } from './inline';

describe('Inline', () => {
  it('applies align and gap classes', () => {
    const { container } = render(
      <Inline align="center" gap="sm">
        <span>Left</span>
        <span>Right</span>
      </Inline>,
    );

    const inline = container.querySelector('.avenra-inline');

    expect(inline).toHaveClass('avenra-inline--align-center');
    expect(inline).toHaveClass('avenra-inline--gap-sm');
  });
});
