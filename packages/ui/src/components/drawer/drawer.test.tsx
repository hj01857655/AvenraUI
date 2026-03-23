import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Drawer } from '../../index';

describe('Drawer', () => {
  it('opens from an uncontrolled trigger and renders dialog semantics', () => {
    render(
      <Drawer
        trigger={<button type="button">Open drawer</button>}
        title="Workspace settings"
        description="Update access and notification preferences."
      >
        <button type="button">Save changes</button>
      </Drawer>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { name: 'Workspace settings' })).toBeInTheDocument();
    expect(screen.getByText('Update access and notification preferences.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('closes when the overlay is clicked', () => {
    render(
      <Drawer trigger={<button type="button">Open drawer</button>} title="Workspace settings">
        <button type="button">Save changes</button>
      </Drawer>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    fireEvent.click(screen.getByTestId('avenra-drawer-backdrop'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when escape is pressed', () => {
    render(
      <Drawer trigger={<button type="button">Open drawer</button>} title="Workspace settings">
        <button type="button">Save changes</button>
      </Drawer>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports controlled mode through open and onOpenChange', () => {
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <Drawer
        open={false}
        onOpenChange={onOpenChange}
        trigger={<button type="button">Open drawer</button>}
        title="Workspace settings"
      >
        <button type="button">Save changes</button>
      </Drawer>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <Drawer
        open
        onOpenChange={onOpenChange}
        trigger={<button type="button">Open drawer</button>}
        title="Workspace settings"
      >
        <button type="button">Save changes</button>
      </Drawer>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('omits aria-describedby when no description is provided', () => {
    render(
      <Drawer trigger={<button type="button">Open drawer</button>} title="Workspace settings">
        <button type="button">Save changes</button>
      </Drawer>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));

    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby');
  });

  it('prevents overlay dismissal when clicking inside the panel', () => {
    render(
      <Drawer trigger={<button type="button">Open drawer</button>} title="Workspace settings">
        <button type="button">Save changes</button>
      </Drawer>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    fireEvent.click(screen.getByRole('dialog'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
