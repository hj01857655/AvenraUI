import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Dialog } from './dialog';

describe('Dialog', () => {
  it('opens from trigger and closes from dismiss action', () => {
    render(
      <Dialog
        trigger={<button type="button">Open dialog</button>}
        title="Confirm publish"
        description="This action will make the draft visible to your team."
      >
        <button type="button">Close</button>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { name: 'Confirm publish' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
