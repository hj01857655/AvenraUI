import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Breadcrumb } from './breadcrumb';

describe('Breadcrumb', () => {
  it('renders breadcrumb navigation items in order', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Breadcrumb' }
        ]}
      />,
    );

    const navigation = screen.getByRole('navigation', { name: 'Breadcrumb' });
    const items = screen.getAllByRole('listitem');

    expect(navigation).toBeInTheDocument();
    expect(items).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByText('Breadcrumb')).toHaveAttribute('aria-current', 'page');
  });

  it('renders separators between items', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Library', href: '/library' },
          { label: 'Current' }
        ]}
      />,
    );

    const separators = screen.getAllByText('/');

    expect(separators).toHaveLength(2);
  });
});
