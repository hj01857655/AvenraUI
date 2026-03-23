import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('shows content when the trigger is hovered', () => {
    render(
      <Tooltip content="Helpful details">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Hover me' }));

    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful details');
  });

  it('hides content after hover leaves', () => {
    render(
      <Tooltip content="Helpful details">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Hover me' });

    fireEvent.mouseEnter(trigger);
    fireEvent.mouseLeave(trigger);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
