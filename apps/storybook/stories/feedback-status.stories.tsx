import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, Avatar, Badge, Button, EmptyState, Inline, Progress, Stack } from '@avenra/ui';

const meta = {
  title: 'Components/Feedback and Status/Stable Overview',

  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlertStates: Story = {
  render: () => (
    <Stack gap="md" style={{ maxWidth: '40rem' }}>
      <Alert title="Release deployed" variant="success">
        Version 1.4.0 is live and all post-deploy checks passed.
      </Alert>
      <Alert title="Copy review needed" variant="warning">
        Marketing copy for the onboarding banner still needs approval.
      </Alert>
      <Alert title="Webhook failed" variant="danger">
        Billing events stopped syncing after the latest credential rotation.
      </Alert>
    </Stack>
  )
};

export const BadgeStates: Story = {
  render: () => (
    <Inline align="center" gap="sm" style={{ flexWrap: 'wrap' }}>
      <Badge variant="success">Stable</Badge>
      <Badge variant="info">Beta</Badge>
      <Badge variant="warning">Needs review</Badge>
      <Badge variant="danger">Blocked</Badge>
      <Badge size="sm">Draft</Badge>
    </Inline>
  )
};

export const ProgressSnapshots: Story = {
  render: () => (
    <Stack gap="md" style={{ maxWidth: '32rem' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>Migration readiness</p>
        <Progress value={28} label="Migration readiness" size="sm" />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>Documentation coverage</p>
        <Progress value={74} label="Documentation coverage" />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>Regression suite</p>
        <Progress value={96} label="Regression suite" size="lg" />
      </div>
    </Stack>
  )
};

export const AvatarRoster: Story = {
  render: () => (
    <Inline align="center" gap="md">
      <Avatar
        size="lg"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
        alt="Mina Chen"
        name="Mina Chen"
      />
      <Avatar name="Luis Ortega" />
      <Avatar name="QA Team" size="sm" />
      <Avatar size="sm" />
    </Inline>
  )
};

export const EmptyWorkspace: Story = {
  render: () => (
    <div style={{ maxWidth: '40rem' }}>
      <EmptyState
        title="No incidents assigned"
        description="Route alerts to an owner to start triage and keep your response queue current."
        action={<Button size="sm">Assign incident owner</Button>}
      >
        Teams with shared ownership usually resolve new issues faster and avoid duplicate follow-up.
      </EmptyState>
    </div>
  )
};
