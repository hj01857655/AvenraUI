import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Navigation and Display/Experimental Overview',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => <></>
};
