import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Progress } from './progress';

describe('Progress', () => {
  it('renders progressbar semantics with clamped value', () => {
    render(<Progress value={120} label="Upload progress" />);

    const progress = screen.getByRole('progressbar', { name: 'Upload progress' });

    expect(progress).toHaveAttribute('aria-valuenow', '100');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders indicator width from the current value', () => {
    const { container } = render(<Progress value={48} />);

    const indicator = container.querySelector('.avenra-progress__indicator');

    expect(indicator).toHaveStyle({ width: '48%' });
  });

  it('supports size variants', () => {
    const { container } = render(<Progress value={24} size="sm" />);

    const progress = container.querySelector('.avenra-progress');

    expect(progress).toHaveClass('avenra-progress--sm');
  });
});
