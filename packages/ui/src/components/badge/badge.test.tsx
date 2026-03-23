import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './badge';

describe('Badge', () => {
  it('renders semantic variant and size classes', () => {
    render(
      <Badge variant="success" size="sm">
        Stable
      </Badge>,
    );

    const badge = screen.getByText('Stable');

    expect(badge.className).toContain('avenra-badge--success');
    expect(badge.className).toContain('avenra-badge--sm');
  });

  it('uses neutral and md as defaults', () => {
    render(<Badge>Default</Badge>);

    const badge = screen.getByText('Default');

    expect(badge.className).toContain('avenra-badge--neutral');
    expect(badge.className).toContain('avenra-badge--md');
  });
});
