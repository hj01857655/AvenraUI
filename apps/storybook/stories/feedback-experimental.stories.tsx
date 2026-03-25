import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Inline, Skeleton, Stack, ToastProvider, useToast } from '@avenra/ui';

function ToastStoryPreview() {
  const { dismiss, push } = useToast();

  return (
    <Stack gap="sm" style={{ alignItems: 'flex-start' }}>
      <Inline align="center" gap="sm">
        <Button
          size="sm"
          onClick={() =>
            push({
              title: 'Changes saved',
              description: 'Workspace settings synced successfully.',
              variant: 'success',
              duration: 60000
            })
          }
        >
          Push success
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            push({
              title: 'Publish failed',
              description: 'Review the validation errors before retrying.',
              variant: 'error',
              duration: 60000
            })
          }
        >
          Push error
        </Button>
        <Button size="sm" variant="ghost" onClick={() => dismiss()}>
          Dismiss latest
        </Button>
      </Inline>
    </Stack>
  );
}

const meta = {
  title: 'Components/Feedback and Status/Experimental',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SkeletonLoadingStates: Story = {
  render: () => (
    <Stack gap="sm" style={{ maxWidth: '32rem' }}>
      <Skeleton width="42%" height="0.875rem" />
      <Skeleton width="100%" height="3rem" shape="rounded" />
      <Inline align="center" gap="md">
        <Skeleton shape="circular" size="lg" />
        <Stack gap="sm" style={{ flex: 1 }}>
          <Skeleton width="55%" height="0.875rem" />
          <Skeleton width="85%" height="0.875rem" />
        </Stack>
      </Inline>
    </Stack>
  )
};

export const ToastWorkflow: Story = {
  render: () => (
    <ToastProvider>
      <ToastStoryPreview />
    </ToastProvider>
  )
};
