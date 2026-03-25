import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DropdownMenu } from './dropdown-menu';

describe('DropdownMenu', () => {
  it('opens from an uncontrolled trigger and renders menu semantics', () => {
    render(
      <DropdownMenu
        trigger={<button type="button">Open menu</button>}
        items={[
          { label: 'Edit profile', onSelect: vi.fn() },
          { label: 'View billing', onSelect: vi.fn() },
        ]}
      />,
    );

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
  });

  it('closes on outside click and escape', () => {
    render(
      <div>
        <button type="button">Outside</button>
        <DropdownMenu
          defaultOpen
          trigger={<button type="button">Filters</button>}
          items={[{ label: 'Newest first', onSelect: vi.fn() }]}
        />
      </div>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Filters' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('calls onSelect for enabled items and closes the menu', () => {
    const onSelect = vi.fn();

    render(
      <DropdownMenu
        trigger={<button type="button">Actions</button>}
        items={[{ label: 'Delete project', onSelect, tone: 'danger' }]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete project' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('does not call onSelect for disabled items', () => {
    const onSelect = vi.fn();

    render(
      <DropdownMenu
        trigger={<button type="button">Actions</button>}
        items={[{ label: 'Archive project', onSelect, disabled: true }]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Archive project' }));

    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Archive project' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('supports controlled mode through open and onOpenChange', () => {
    const onOpenChange = vi.fn();

    render(
      <DropdownMenu
        open={false}
        onOpenChange={onOpenChange}
        trigger={<button type="button">More options</button>}
        items={[{ label: 'Rename', onSelect: vi.fn() }]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'More options' }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('focuses the first enabled item and supports ArrowDown plus Enter selection', () => {
    const rename = vi.fn();
    const archive = vi.fn();

    render(
      <DropdownMenu
        title="Workspace actions"
        trigger={<button type="button">Open menu</button>}
        items={[
          { label: 'Rename workspace', onSelect: rename },
          { label: 'Duplicate workspace', disabled: true },
          { label: 'Archive workspace', onSelect: archive, tone: 'danger' },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const renameItem = screen.getByRole('menuitem', { name: 'Rename workspace' });
    const archiveItem = screen.getByRole('menuitem', { name: 'Archive workspace' });

    expect(renameItem).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(archiveItem).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Enter' });

    expect(archive).toHaveBeenCalledTimes(1);
    expect(rename).not.toHaveBeenCalled();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('restores focus to the trigger when escape dismisses the menu', () => {
    render(
      <DropdownMenu
        title="Workspace actions"
        trigger={<button type="button">Open menu</button>}
        items={[{ label: 'Rename workspace', onSelect: vi.fn() }]}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Open menu' });

    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes on Tab and restores focus to the trigger', () => {
    render(
      <DropdownMenu
        title="Workspace actions"
        trigger={<button type="button">Open menu</button>}
        items={[{ label: 'Rename workspace', onSelect: vi.fn() }]}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Open menu' });

    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Tab' });

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
