import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Forms and Input/Experimental/Advanced Search Bar',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlannedSurface: Story = {
  render: () => (
    <div style={{ maxWidth: '42rem', display: 'grid', gap: '0.75rem' }}>
      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Advanced Search Bar</h3>
      <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--avenra-color-text-subtle, #475569)' }}>
        Storybook surface reserved for Mason&apos;s Advanced Search Bar line. Governance keeps the location and naming stable
        while the component contract is still landing on the Mason branch.
      </p>
    </div>
  )
};
