import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SiteShell } from '../site-shell';
import ComponentsPage from './page';

describe('components directory page', () => {
  it('renders grouped component sections with component-specific links', () => {
    render(
      <SiteShell>
        <ComponentsPage />
      </SiteShell>
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /current component surface/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /actions and navigation/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /overlay surfaces/i
      })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /open button doc/i })).toHaveAttribute(
      'href',
      '/components/button'
    );
    expect(screen.getByRole('link', { name: /open skeleton doc/i })).toHaveAttribute(
      'href',
      '/components/skeleton'
    );
    expect(screen.getByRole('link', { name: /open inline doc/i })).toHaveAttribute(
      'href',
      '/components/inline'
    );
    expect(screen.getByRole('link', { name: /open drawer doc/i })).toHaveAttribute(
      'href',
      '/components/drawer'
    );
    expect(screen.getByRole('link', { name: /open tooltip doc/i })).toHaveAttribute(
      'href',
      '/components/tooltip'
    );
  });
});
