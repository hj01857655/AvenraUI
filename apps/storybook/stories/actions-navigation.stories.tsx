import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb, IconButton, Steps, Tabs } from '@avenra/ui';

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none">
      <path d="M10 4V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const meta = {
  title: 'Components/Actions and Navigation/Stable Overview',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BreadcrumbTrail: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Workspace', href: '/' },
        { label: 'Design system', href: '/design-system' },
        { label: 'Storybook coverage' }
      ]}
    />
  )
};

export const IconButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
      <IconButton aria-label="Search components" icon={<SearchIcon />} />
      <IconButton aria-label="Add component" icon={<PlusIcon />} variant="secondary" />
      <IconButton aria-label="Refresh stories" icon={<SearchIcon />} variant="ghost" loading />
    </div>
  )
};

export const StepsProgression: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '56rem' }}>
      <Steps
        currentStep={1}
        items={[
          { id: 'details', title: 'Project details', description: 'Name and ownership' },
          { id: 'review', title: 'Review', description: 'Check the release scope' },
          { id: 'launch', title: 'Launch', description: 'Ship to production' }
        ]}
      />
      <Steps
        ariaLabel="Onboarding progress"
        currentStep={2}
        orientation="vertical"
        items={[
          { id: 'account', title: 'Create account', meta: '2 min' },
          { id: 'workspace', title: 'Set up workspace', meta: '5 min' },
          { id: 'invite', title: 'Invite teammates', meta: 'Optional' }
        ]}
      />
    </div>
  )
};

export const TabsSections: Story = {
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <Tabs
        defaultTabId="overview"
        items={[
          {
            id: 'overview',
            label: 'Overview',
            content: 'Track the components that already have stable Storybook coverage and review them before release.'
          },
          {
            id: 'navigation',
            label: 'Navigation',
            content: 'Breadcrumbs, steps, and tabs help users stay oriented while moving across related product sections.'
          },
          {
            id: 'actions',
            label: 'Actions',
            content: 'Buttons and icon actions should keep hierarchy clear without adding visual noise.'
          }
        ]}
      />
    </div>
  )
};
