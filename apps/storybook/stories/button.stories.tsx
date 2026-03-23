import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, Avatar, Badge, Breadcrumb, Button, Card, Dialog, EmptyState, Inline, Input, Progress, Stack, Tabs, Textarea, Tooltip } from '@avenra/ui';

const meta = {
  title: 'Components/Button',
  component: Button
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Avenra Button'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary action',
    variant: 'secondary'
  }
};

export const Loading: Story = {
  args: {
    children: 'Saving',
    loading: true
  }
};

export const WithFormPreview: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: '28rem' }}>
      <Inline align="center" gap="sm">
        <Avatar name="Avenra UI" size="lg" />
        <Avatar name="Docs" />
        <Avatar size="sm" />
      </Inline>
      <Progress value={64} label="Storybook progress" />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Button stories' }
        ]}
      />
      <Tooltip content="Focused helper text">
        <Button size="sm" variant="secondary">
          Hover for details
        </Button>
      </Tooltip>
      <Input
        id="storybook-email"
        label="Email"
        hint="A focused field should feel calm and clear."
        placeholder="name@company.com"
      />
      <Alert title="Needs review" variant="warning">
        This draft still needs one pass before publishing.
      </Alert>
      <Card
        title="Message quality"
        description="Card keeps grouped controls readable and action-oriented."
        actions={<Badge variant="warning">Draft</Badge>}
        interactive
      >
        <Textarea
          id="storybook-message"
          label="Message"
          hint="Multiline fields should keep spacing and readability."
          placeholder="What do you want to build next?"
        />
        <Button>Continue</Button>
      </Card>
      <EmptyState
        title="No replies yet"
        description="Once collaborators answer, this thread summary will show activity here."
        action={<Button size="sm">Invite reviewers</Button>}
      />
      <Stack gap="sm">
        <Badge variant="warning">Draft</Badge>
        <Badge variant="info">Editing</Badge>
        <Badge variant="success">Published</Badge>
      </Stack>
      <Inline align="center" gap="sm">
        <Button size="sm">Save</Button>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
      </Inline>
      <Dialog
        trigger={<Button size="sm">Open dialog</Button>}
        title="Confirm publish"
        description="This action will make the draft visible to your team."
      >
        <Button size="sm" variant="ghost">
          Close
        </Button>
      </Dialog>
    </div>
  )
};

export const FeedbackStates: Story = {
  render: () => (
    <Stack gap="md" style={{ maxWidth: '32rem' }}>
      <Alert title="Build succeeded" variant="success">
        Shared tokens and components compiled without errors.
      </Alert>
      <Progress value={84} label="Release readiness" />
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/' },
          { label: 'Releases', href: '/releases' },
          { label: 'Current milestone' }
        ]}
      />
      <Tooltip content="Release confidence is trending up">
        <Badge variant="success">Tooltip active</Badge>
      </Tooltip>
      <Alert title="Heads up" variant="warning">
        A few story examples still need product copy polish.
      </Alert>
      <EmptyState
        title="Nothing scheduled yet"
        description="Plan your first release milestone to turn this dashboard into a live roadmap."
        action={<Button size="sm">Schedule release</Button>}
      />
      <Inline gap="sm">
        <Badge variant="neutral">Stable</Badge>
        <Badge variant="info">Preview</Badge>
        <Badge variant="success">Navigation</Badge>
        <Badge variant="warning">Overlay</Badge>
      </Inline>
      <Tabs
        items={[
          { id: 'system', label: 'System', content: 'Shared tokens and primitives stay consistent.' },
          { id: 'feedback', label: 'Feedback', content: 'Alerts and empty states communicate clearly.' }
        ]}
      />
    </Stack>
  )
};

