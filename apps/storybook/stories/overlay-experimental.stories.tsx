import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Drawer, DropdownMenu, Input, Stack } from '@avenra/ui';

const meta = {
  title: 'Components/Overlay Surfaces/Experimental',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DrawerWorkspaceSettings: Story = {
  render: () => (
    <Drawer
      defaultOpen
      trigger={<Button variant="secondary">Open drawer</Button>}
      title="Workspace settings"
      description="Update access and notification preferences without leaving the current page."
    >
      <Stack gap="sm">
        <Input id="storybook-drawer-name" label="Workspace name" defaultValue="Avenra" />
        <Input id="storybook-drawer-slug" label="Workspace slug" defaultValue="avenra-ui" />
        <Button>Save changes</Button>
      </Stack>
    </Drawer>
  )
};

export const DropdownMenuActions: Story = {
  render: () => (
    <DropdownMenu
      defaultOpen
      title="Workspace actions"
      trigger={<Button variant="secondary">Open menu</Button>}
      items={[
        { label: 'Rename workspace', onSelect: () => undefined },
        { label: 'Duplicate workspace', disabled: true },
        { label: 'Archive workspace', onSelect: () => undefined, tone: 'danger' }
      ]}
    />
  )
};
