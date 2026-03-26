import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Checkbox, Combobox, Form, FormField, Input, Select, Stack } from '@avenra/ui';

const meta = {
  title: 'Components/Forms and Input/Experimental/Form Shell',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormContextWorkflow: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '42rem' }}>
      <Form aria-label="Workspace provisioning form">
        <Stack gap="md">
          <FormField label="Email" hint="We will only use this for account updates" required>
            <Input type="email" placeholder="team@avenra.dev" />
          </FormField>
          <FormField label="Role" hint="Short stable lists can stay native">
            <Select defaultValue="designer">
              <option value="designer">Designer</option>
              <option value="engineer">Engineer</option>
              <option value="pm">Product manager</option>
            </Select>
          </FormField>
          <FormField label="Framework" hint="Search when the option set is larger than a short native select">
            <Combobox
              placeholder="Search frameworks"
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'svelte', label: 'Svelte' }
              ]}
              defaultValue="react"
            />
          </FormField>
          <FormField layout="control" hint="Required before continuing" error="You must accept the terms">
            <Checkbox label="Accept working agreement" />
          </FormField>
          <Button type="submit">Save configuration</Button>
        </Stack>
      </Form>
      <Form submitting aria-label="Submitting workspace form">
        <Stack gap="md">
          <FormField label="Workspace name" hint="Submitting disables nested fields through shared form context">
            <Input defaultValue="Avenra Cloud" />
          </FormField>
          <Button type="submit" loading>
            Saving
          </Button>
        </Stack>
      </Form>
    </div>
  )
};

export const FormFieldShellStates: Story = {
  render: () => (
    <Stack gap="md" style={{ maxWidth: '38rem' }}>
      <FormField label="Project name" hint="Visible to your workspace" required>
        <Input placeholder="Avenra UI" />
      </FormField>
      <FormField layout="control" hint="Required before continuing" error="You must accept the terms">
        <Checkbox label="Accept working agreement" />
      </FormField>
    </Stack>
  )
};

