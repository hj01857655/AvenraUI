import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  it('renders title, description and action content', () => {
    render(
      <EmptyState
        title="No messages yet"
        description="Create your first thread to start collaborating."
        action={<button type="button">New thread</button>}
      />,
    );

    expect(screen.getByRole('heading', { name: 'No messages yet' })).toBeInTheDocument();
    expect(screen.getByText('Create your first thread to start collaborating.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New thread' })).toBeInTheDocument();
  });
});
