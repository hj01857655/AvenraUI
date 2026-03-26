import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';

import { Cascader, MultiSelect } from '@avenra/ui';

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

const frameworkOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular', disabled: true }
] as const;

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
  title: 'Components/Forms and Input/Experimental/Search and Selection',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CascaderStates: Story = {
  render: () => (
    <div style={canvasStyle}>
      <StorySection title="Cascader" description="Hierarchical choices open progressively so users can confirm each level before committing the final branch.">
        <Cascader
          label="Location"
          hint="Choose the section to edit"
          defaultOpen
          defaultValue={['workspace', 'guides', 'api']}
          options={[
            {
              value: 'workspace',
              label: 'Workspace',
              children: [
                {
                  value: 'guides',
                  label: 'Guides',
                  children: [
                    { value: 'api', label: 'API' },
                    { value: 'design', label: 'Design' }
                  ]
                },
                { value: 'assets', label: 'Assets', disabled: true }
              ]
            }
          ]}
        />
      </StorySection>
    </div>
  )
};

export const MultiSelectStates: Story = {
  render: () => (
    <div style={canvasStyle}>
      <StorySection title="Multi Select" description="Selected options stay visible as removable chips while the input keeps filtering a larger option set.">
        <MultiSelect
          id="storybook-multi-select"
          label="Frameworks"
          hint="Pick every framework active in this workspace"
          placeholder="Search frameworks"
          defaultValue={['react', 'vue']}
          options={frameworkOptions.slice()}
        />
      </StorySection>
    </div>
  )
};

