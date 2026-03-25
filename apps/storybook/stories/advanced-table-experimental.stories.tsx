import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Data and Tables/Experimental/Advanced Table',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlannedSurface: Story = {
  render: () => (
    <div style={{ maxWidth: '42rem', display: 'grid', gap: '0.75rem' }}>
      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Advanced Table</h3>
      <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--avenra-color-text-subtle, #475569)' }}>
        Storybook surface reserved for Mason&apos;s Advanced Table line. This placeholder keeps the category, naming, and
        future story location stable without reaching into component source work.
      </p>
    </div>
  )
};
