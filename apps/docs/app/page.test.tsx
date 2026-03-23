import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SiteShell } from './site-shell';
import HomePage from './page';

describe('docs homepage', () => {
  it('exposes the main docs navigation and primary calls to action', () => {
    render(<SiteShell><HomePage /></SiteShell>);

    const primaryNav = screen.getByRole('navigation', { name: /primary/i });

    expect(
      screen.getByRole('heading', {
        name: /a ui system for shipping real product interfaces/i
      })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('link', { name: /components/i })[0]).toHaveAttribute('href', '/components');
    expect(screen.getAllByRole('link', { name: /getting started/i })[0]).toHaveAttribute(
      'href',
      '/docs/getting-started'
    );
    expect(within(primaryNav).getByRole('link', { name: /installation/i })).toHaveAttribute(
      'href',
      '/docs/installation'
    );
    expect(within(primaryNav).getByRole('link', { name: /theming/i })).toHaveAttribute(
      'href',
      '/docs/theming'
    );
  });
});
