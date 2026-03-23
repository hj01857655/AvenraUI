import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './card';

describe('Card', () => {
  it('renders title, description and actions slots', () => {
    render(
      <Card
        title="Project setup"
        description="Scaffold your workspace in minutes"
        actions={<button type="button">Open</button>}
      >
        Card content
      </Card>,
    );

    expect(screen.getByRole('heading', { name: 'Project setup' })).toBeInTheDocument();
    expect(screen.getByText('Scaffold your workspace in minutes')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('uses interactive class when interactive is true', () => {
    const { container } = render(<Card interactive title="Clickable card" />);

    const card = container.querySelector('.avenra-card');

    expect(card).toHaveClass('avenra-card--interactive');
  });
});
