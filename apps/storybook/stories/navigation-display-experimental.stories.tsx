import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Pagination, Tree } from '@avenra/ui';

function ControlledPaginationPreview() {
  const [page, setPage] = useState(6);

  return <Pagination ariaLabel="Release pages" currentPage={page} totalPages={12} onPageChange={setPage} />;
}

const meta = {
  title: 'Components/Navigation and Display/Experimental Overview',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaginationNavigationStates: Story = {
  render: () => <ControlledPaginationPreview />
};

export const TreeHierarchyStates: Story = {
  render: () => (
    <Tree
      ariaLabel="Content structure"
      defaultExpandedIds={['workspace', 'docs']}
      defaultSelectedId="guides"
      nodes={[
        {
          id: 'workspace',
          label: 'Workspace',
          children: [
            { id: 'design-system', label: 'Design system' },
            { id: 'assets', label: 'Assets', disabled: true },
            {
              id: 'docs',
              label: 'Docs',
              children: [{ id: 'guides', label: 'Guides' }]
            }
          ]
        }
      ]}
    />
  )
};
