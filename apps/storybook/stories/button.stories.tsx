import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@avenra/ui';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: 'Publish',
    size: 'md',
    variant: 'primary'
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    children: 'Save draft',
    variant: 'secondary'
  }
};

export const Ghost: Story = {
  args: {
    children: 'Cancel',
    variant: 'ghost'
  }
};

export const Loading: Story = {
  args: {
    children: 'Publishing',
    loading: true
  }
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  )
};

export const ActionGroup: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
      <Button {...args}>Publish</Button>
      <Button {...args} variant="secondary">
        Save draft
      </Button>
      <Button {...args} variant="ghost">
        Cancel
      </Button>
    </div>
  )
};

