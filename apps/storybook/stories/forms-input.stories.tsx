import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties, ReactNode } from 'react'
import { useState } from 'react'

import { Autocomplete, Checkbox, Combobox, Command, Input, Radio, Select, Switch, TagInput, Textarea } from '@avenra/ui'

const canvasStyle = {
  display: 'grid',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '44rem'
} satisfies CSSProperties

const sectionStyle = {
  display: 'grid',
  gap: '0.875rem',
  padding: '1rem',
  borderRadius: '1rem',
  border: '1px solid var(--avenra-color-border, #E2E8F0)',
  background: 'var(--avenra-color-surface, #FFFFFF)'
} satisfies CSSProperties

const titleStyle = {
  margin: 0,
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: 'var(--avenra-color-text, #0F172A)'
} satisfies CSSProperties

const descriptionStyle = {
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: 1.6,
  color: 'var(--avenra-color-text-subtle, #475569)'
} satisfies CSSProperties

const frameworkOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular', disabled: true }
] as const

function StoryCanvas({ children }: { children: ReactNode }) {
  return <div style={canvasStyle}>{children}</div>
}

function StorySection({
  title,
  description,
  children
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section style={sectionStyle}>
      <div style={{ display: 'grid', gap: '0.25rem' }}>
        <h3 style={titleStyle}>{title}</h3>
        <p style={descriptionStyle}>{description}</p>
      </div>
      <div style={{ display: 'grid', gap: '1rem' }}>{children}</div>
    </section>
  )
}

const meta = {
  title: 'Components/Forms and Input/Stable Overview',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const AutocompleteFieldStates: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Autocomplete"
        description="Stable typeahead examples keep the shared field shell while showing thresholded search, empty messaging, validation, and disabled behavior."
      >
        <Autocomplete
          label="Country"
          hint="Type 2+ characters to start searching"
          placeholder="Search countries"
          emptyMessage="No country found"
          minQueryLength={2}
          defaultInputValue="au"
          options={[
            { value: 'ar', label: 'Argentina' },
            { value: 'au', label: 'Australia' },
            { value: 'at', label: 'Austria' }
          ]}
        />
        <Autocomplete
          label="Billing region"
          error="Select a supported billing region"
          invalid
          placeholder="Search billing regions"
          emptyMessage="No region found"
          options={[
            { value: 'apac', label: 'APAC' },
            { value: 'emea', label: 'EMEA' },
            { value: 'latam', label: 'LATAM' }
          ]}
        />
        <Autocomplete
          label="Archived market"
          hint="Readonly selections stay visible after sunset"
          placeholder="Search archived markets"
          defaultInputValue="Australia"
          disabled
          options={[
            { value: 'au', label: 'Australia' },
            { value: 'nz', label: 'New Zealand' }
          ]}
        />
      </StorySection>
    </StoryCanvas>
  )
}

function ControlledComboboxPreview() {
  const [value, setValue] = useState('react')
  const [inputValue, setInputValue] = useState('React')

  return (
    <Combobox
      label="Framework"
      hint="Controlled usage keeps selected value and visible query text in sync"
      options={frameworkOptions.slice()}
      value={value}
      inputValue={inputValue}
      onValueChange={(nextValue) => {
        setValue(nextValue)
        setInputValue(frameworkOptions.find((option) => option.value === nextValue)?.label ?? nextValue)
      }}
      onInputValueChange={setInputValue}
      placeholder="Search frameworks"
    />
  )
}

export const ComboboxStates: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Combobox"
        description="Stable searchable selection keeps the shared field shell while controlled input text and selected value stay aligned for longer option sets."
      >
        <ControlledComboboxPreview />
      </StorySection>
    </StoryCanvas>
  )
}

export const InputFieldStates: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Input"
        description="Single-line field examples covering the shared shell contract with label, hint, required, invalid, error, and disabled states."
      >
        <Input id="story-input-default" label="Workspace email" hint="Use the address tied to your workspace" required placeholder="team@avenra.dev" defaultValue="design@avenra.dev" />
        <Input id="story-input-invalid" label="Billing email" hint="Receipts and invoices go here" error="Enter a valid billing email" invalid defaultValue="billing@" />
        <Input id="story-input-disabled" label="Workspace slug" hint="Stable identifiers cannot change after provisioning" defaultValue="avenra-core" disabled />
      </StorySection>
    </StoryCanvas>
  )
}

export const TextareaFieldStates: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Textarea"
        description="Multiline fields keep the same shell contract while giving longer hints, validation messaging, and disabled state coverage."
      >
        <Textarea id="story-textarea-default" label="Release notes" hint="Share enough context so the next reviewer can act quickly" required defaultValue="Summarize the customer-visible changes for this release." />
        <Textarea id="story-textarea-invalid" label="Rollback plan" hint="Add the exact mitigation steps" error="A rollback plan is required before publishing" invalid defaultValue="" />
        <Textarea id="story-textarea-disabled" label="Archived notes" hint="Historical notes stay readonly after release" defaultValue="Published with stable onboarding updates." disabled />
      </StorySection>
    </StoryCanvas>
  )
}

export const CheckboxStates: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Checkbox"
        description="Independent binary choices show checked, unchecked, invalid, and disabled states while keeping hint and error messaging aligned with the shared control layout."
      >
        <Checkbox id="story-checkbox-default" label="Email product updates" hint="Stay informed when new stable components ship" defaultChecked />
        <Checkbox id="story-checkbox-invalid" label="Accept release policy" error="You must accept the release policy before continuing" invalid required />
        <Checkbox id="story-checkbox-disabled" label="Readonly deployment alerts" hint="This preference is managed by workspace policy" defaultChecked disabled />
      </StorySection>
    </StoryCanvas>
  )
}

export const CommandPalette: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Command"
        description="Keyboard-first search stays on the stable forms surface for command discovery, empty states, and workspace action recall without leaving the current flow."
      >
        <Command
          inputProps={{ 'aria-label': 'Search workspace commands' }}
          placeholder="Search commands"
          emptyMessage="Nothing found"
          options={[
            { value: 'open-settings', label: 'Open settings', keywords: ['preferences', 'workspace'] },
            { value: 'create-project', label: 'Create project', keywords: ['new', 'workspace'] },
            { value: 'invite-member', label: 'Invite member', keywords: ['user', 'team'] }
          ]}
        />
      </StorySection>
    </StoryCanvas>
  )
}

export const RadioStates: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Radio"
        description="Single-select choices keep native radio semantics while covering checked, unchecked, invalid, and disabled examples."
      >
        <Radio id="story-radio-admin" name="story-access-level" label="Workspace admin access" hint="Use radio when only one path should stay active" defaultChecked />
        <Radio id="story-radio-editor" name="story-access-level" label="Project editor access" />
        <Radio id="story-radio-viewer" name="story-access-level" label="Readonly access" disabled />
        <Radio id="story-radio-invalid" name="story-support-tier" label="Priority support" error="Choose one support tier before continuing" invalid required />
      </StorySection>
    </StoryCanvas>
  )
}

export const SelectFieldStates: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Select"
        description="Short stable option lists stay native while inheriting the same label, hint, error, invalid, required, and disabled shell contract as other field inputs."
      >
        <Select id="story-select-default" label="Role" hint="Choose the baseline permission set" required defaultValue="editor">
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="owner">Owner</option>
        </Select>
        <Select id="story-select-invalid" label="Approver" error="Pick an approver before saving" invalid defaultValue="">
          <option value="" disabled>
            Select approver
          </option>
          <option value="maria">Maria Chen</option>
          <option value="david">David Park</option>
          <option value="lina">Lina Ortiz</option>
        </Select>
        <Select id="story-select-disabled" label="Environment" hint="Provisioned from workspace settings" defaultValue="production" disabled>
          <option value="staging">Staging</option>
          <option value="production">Production</option>
        </Select>
      </StorySection>
    </StoryCanvas>
  )
}

export const TagInputFieldStates: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Tag Input"
        description="Free-form tags stay on the stable forms surface while keyboard commit, duplicate prevention, and removable tokens remain visible in the shared field shell."
      >
        <TagInput
          id="storybook-tag-input"
          label="Project tags"
          hint="Press Enter or comma to add a new tag"
          placeholder="Add a tag"
          defaultValue={['React', 'Design system']}
        />
        <TagInput
          id="storybook-tag-input-invalid"
          label="Release labels"
          error="Add at least one label before publishing"
          invalid
          defaultValue={[]}
        />
        <TagInput
          id="storybook-tag-input-disabled"
          label="Locked tags"
          hint="Managed from the synced workspace taxonomy"
          defaultValue={['Stable', 'Internal']}
          disabled
        />
      </StorySection>
    </StoryCanvas>
  )
}

export const SwitchFieldStates: Story = {
  render: () => (
    <StoryCanvas>
      <StorySection
        title="Switch"
        description="On-off preferences show checked, unchecked, invalid, and disabled states with the same shared control messaging used by checkbox and radio fields."
      >
        <Switch id="story-switch-default" label="Sync deployment notifications" hint="Keep publish and incident updates visible" defaultChecked />
        <Switch id="story-switch-invalid" label="Require reviewer acknowledgement" error="Turn this on before publishing externally" invalid />
        <Switch id="story-switch-disabled" label="Readonly mirror" hint="Controlled by workspace policy" defaultChecked disabled />
      </StorySection>
    </StoryCanvas>
  )
}
