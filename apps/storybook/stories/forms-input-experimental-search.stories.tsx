import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Forms and Input/Experimental/Search and Selection',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => <></>
};



