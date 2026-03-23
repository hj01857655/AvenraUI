import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tabs } from './tabs';

describe('Tabs', () => {
  it('renders tab triggers and switches the active panel', () => {
    render(
      <Tabs
        items={[
          { id: 'overview', label: 'Overview', content: 'Overview panel' },
          { id: 'activity', label: 'Activity', content: 'Activity panel' }
        ]}
      />,
    );

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview panel');

    fireEvent.click(screen.getByRole('tab', { name: 'Activity' }));

    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Activity panel');
  });
});
