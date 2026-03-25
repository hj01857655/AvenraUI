import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';

import { DatePicker, DateRangePicker, Stack } from '@avenra/ui';

const canvasStyle = {
  display: 'grid',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '44rem'
} satisfies CSSProperties;

const sectionStyle = {
  display: 'grid',
  gap: '0.875rem',
  padding: '1rem',
  borderRadius: '1rem',
  border: '1px solid var(--avenra-color-border, #E2E8F0)',
  background: 'var(--avenra-color-surface, #FFFFFF)'
} satisfies CSSProperties;

function StorySection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section style={sectionStyle}>
      <div style={{ display: 'grid', gap: '0.25rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--avenra-color-text-subtle, #475569)' }}>
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

const meta = {
  title: 'Components/Forms and Input/Experimental/Date Inputs',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DatePickerFieldStates: Story = {
  render: () => (
    <div style={canvasStyle}>
      <StorySection title="Date Picker" description="Single-date selection keeps the chosen ISO value in one field while the calendar overlay handles browsing and confirmation.">
        <Stack gap="md">
          <DatePicker
            id="storybook-date-picker"
            label="Release date"
            hint="Choose when the update becomes visible"
            defaultValue="2026-03-18"
            defaultOpen
            min="2026-03-01"
            max="2026-03-31"
          />
          <DatePicker
            id="storybook-date-picker-invalid"
            label="Cutoff date"
            error="Choose a valid cutoff within the launch window"
            invalid
            defaultValue="2026-03-08"
          />
        </Stack>
      </StorySection>
    </div>
  )
};

export const DateRangeFieldStates: Story = {
  render: () => (
    <div style={canvasStyle}>
      <StorySection title="Date Range Picker" description="Start and end dates stay in one workflow, with the displayed range normalized and reviewed before submission.">
        <Stack gap="md">
          <DateRangePicker
            id="storybook-date-range-picker"
            label="Launch window"
            hint="Choose the public launch range"
            defaultValue={{ start: '2026-03-18', end: '2026-03-24' }}
            defaultOpen
            min="2026-03-01"
            max="2026-03-31"
          />
          <DateRangePicker
            id="storybook-date-range-picker-invalid"
            label="Freeze period"
            error="Choose the full freeze period before publishing"
            invalid
            defaultValue={{ start: '2026-03-30', end: '2026-03-24' }}
          />
        </Stack>
      </StorySection>
    </div>
  )
};
