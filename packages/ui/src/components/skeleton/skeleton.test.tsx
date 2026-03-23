import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders with the default rectangular shape', () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.querySelector('.avenra-skeleton');

    expect(skeleton).toHaveClass('avenra-skeleton--rectangular');
  });

  it('supports circular shape', () => {
    const { container } = render(<Skeleton shape="circular" size="lg" />);

    const skeleton = container.querySelector('.avenra-skeleton');

    expect(skeleton).toHaveClass('avenra-skeleton--circular');
    expect(skeleton).toHaveClass('avenra-skeleton--lg');
  });

  it('accepts custom width and height', () => {
    const { container } = render(<Skeleton width="12rem" height="1.5rem" />);

    const skeleton = container.querySelector('.avenra-skeleton');

    expect(skeleton).toHaveStyle({ width: '12rem', height: '1.5rem' });
  });
});
