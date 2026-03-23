import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Popover } from './popover';

describe('Popover', () => {
  it('toggles from the trigger in uncontrolled mode', () => {
    render(
      <Popover
        trigger={<button type="button">Open popover</button>}
        content={<p>Popover content</p>}
      />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open popover' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Popover content')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open popover' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports controlled mode and emits open changes', () => {
    const onOpenChange = vi.fn();

    render(
      <Popover
        open={false}
        onOpenChange={onOpenChange}
        trigger={<button type="button">More options</button>}
        content={<p>Actions</p>}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'More options' }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on escape and outside click when open', () => {
    render(
      <div>
        <button type="button">Outside</button>
        <Popover
          defaultOpen
          trigger={<button type="button">Filters</button>}
          content={<p>Filter controls</p>}
        />
      </div>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Filters' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
