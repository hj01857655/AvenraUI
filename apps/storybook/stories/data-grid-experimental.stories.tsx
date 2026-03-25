import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Data and Tables/Experimental/Data Grid',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlannedSurface: Story = {
  render: () => (
    <div style={{ maxWidth: '42rem', display: 'grid', gap: '0.75rem' }}>
      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Data Grid</h3>
      <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--avenra-color-text-subtle, #475569)' }}>
        Storybook surface reserved for Mason&apos;s DataGrid component line. The component implementation will land on the
        Mason branch, while this Storybook slot keeps the information architecture and governance path ready.
      </p>
    </div>
  )
};
