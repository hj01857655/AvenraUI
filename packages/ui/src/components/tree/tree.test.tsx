import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Tree, type TreeNode } from './tree';

const docsTree: TreeNode[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    children: [
      { id: 'design-system', label: 'Design system' },
      { id: 'assets', label: 'Assets', disabled: true },
      {
        id: 'docs',
        label: 'Docs',
        children: [{ id: 'guides', label: 'Guides' }],
      },
    ],
  },
];

describe('Tree', () => {
  it('renders expanded hierarchy, selected node, and disabled nodes', () => {
    render(
      <Tree
        ariaLabel="Content structure"
        nodes={docsTree}
        defaultExpandedIds={['workspace', 'docs']}
        defaultSelectedId="guides"
      />
    );

    expect(screen.getByRole('tree', { name: /content structure/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^workspace$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^design system$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /guides/i }).closest('[role="treeitem"]')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('button', { name: /assets/i })).toBeDisabled();
  });

  it('supports expand and collapse interactions', () => {
    render(<Tree ariaLabel="Content structure" nodes={docsTree} defaultExpandedIds={['workspace']} />);

    expect(screen.queryByRole('button', { name: /guides/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /expand docs/i }));
    expect(screen.getByRole('button', { name: /guides/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /collapse workspace/i }));
    expect(screen.queryByRole('button', { name: /design system/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /guides/i })).not.toBeInTheDocument();
  });

  it('emits selection changes and ignores disabled nodes', () => {
    const onSelectedIdChange = vi.fn();

    render(
      <Tree
        ariaLabel="Content structure"
        nodes={docsTree}
        defaultExpandedIds={['workspace']}
        onSelectedIdChange={onSelectedIdChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /design system/i }));
    fireEvent.click(screen.getByRole('button', { name: /assets/i }));

    expect(onSelectedIdChange).toHaveBeenCalledTimes(1);
    expect(onSelectedIdChange).toHaveBeenCalledWith('design-system');
  });
});
