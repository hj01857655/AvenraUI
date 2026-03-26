import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Steps } from './steps';

describe('Steps', () => {
  it('renders ordered horizontal steps with current, complete, and upcoming state', () => {
    render(
      <Steps
        currentStep={1}
        items={[
          { id: 'details', title: 'Project details', description: 'Name and ownership' },
          { id: 'review', title: 'Review', description: 'Check the release scope' },
          { id: 'launch', title: 'Launch', description: 'Ship to production' }
        ]}
      />
    );

    const list = screen.getByRole('list', { name: /progress steps/i });
    const items = screen.getAllByRole('listitem');

    expect(list).toHaveClass('avenra-steps', 'avenra-steps--horizontal');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveAttribute('data-state', 'complete');
    expect(items[1]).toHaveAttribute('data-state', 'current');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[2]).toHaveAttribute('data-state', 'upcoming');
  });

  it('supports vertical orientation and explicit completion state', () => {
    render(
      <Steps
        ariaLabel="Onboarding progress"
        currentStep={2}
        orientation="vertical"
        items={[
          { id: 'account', title: 'Create account', meta: '2 min' },
          { id: 'workspace', title: 'Set up workspace', meta: '5 min' },
          { id: 'invite', title: 'Invite teammates', meta: 'Optional' }
        ]}
      />
    );

    const list = screen.getByRole('list', { name: /onboarding progress/i });
    const items = screen.getAllByRole('listitem');

    expect(list).toHaveClass('avenra-steps', 'avenra-steps--vertical');
    expect(items[0]).toHaveAttribute('data-state', 'complete');
    expect(items[1]).toHaveAttribute('data-state', 'complete');
    expect(items[2]).toHaveAttribute('data-state', 'current');
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('uses explicit item status overrides when provided', () => {
    render(
      <Steps
        items={[
          { id: 'draft', title: 'Draft', status: 'complete' },
          { id: 'approval', title: 'Approval', status: 'current' },
          { id: 'archive', title: 'Archive', status: 'upcoming' }
        ]}
      />
    );

    const items = screen.getAllByRole('listitem');

    expect(items[0]).toHaveAttribute('data-state', 'complete');
    expect(items[1]).toHaveAttribute('data-state', 'current');
    expect(items[2]).toHaveAttribute('data-state', 'upcoming');
  });
});
