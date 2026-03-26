import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tree } from '@avenra/ui';

const meta = {
  title: 'Components/Navigation and Display/Experimental Overview',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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
