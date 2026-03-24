export interface ComponentDocSection {
  title: string;
  body: string;
}

export type ComponentSupportLevel = 'stable' | 'experimental';

export interface ComponentDocProp {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

export interface ComponentDocMetadata {
  props: ComponentDocProp[];
  states: string[];
  accessibility: string[];
}

export interface ComponentDocContent {
  slug: string;
  title: string;
  packageImport: string;
  category: string;
  summary: string;
  usage: string;
  exampleCode: string;
  sections: ComponentDocSection[];
}

export interface ComponentDocGovernance {
  support: ComponentSupportLevel;
  supportLabel: 'Stable' | 'Experimental';
  supportSummary: string;
}

export interface ComponentDoc extends ComponentDocContent, ComponentDocMetadata, ComponentDocGovernance {}

export const stableComponentSlugs = [
  'alert',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'card',
  'checkbox',
  'dialog',
  'empty-state',
  'icon-button',
  'inline',
  'input',
  'popover',
  'progress',
  'radio',
  'select',
  'stack',
  'switch',
  'tabs',
  'textarea',
  'tooltip'
] as const;

export const experimentalComponentSlugs = [
  'autocomplete',
  'combobox',
  'command',
  'drawer',
  'dropdown-menu',
  'form',
  'form-field',
  'pagination',
  'skeleton',
  'toast'
] as const;

const stableComponentSlugSet = new Set<string>(stableComponentSlugs);
const experimentalComponentSlugSet = new Set<string>(experimentalComponentSlugs);

const componentDocContent = {
  button: {
    slug: 'button',
    title: 'Button',
    packageImport: "import { Button } from '@avenra/ui';",
    category: 'Actions and navigation',
    summary: 'Primary action control with size, variant, and loading support.',
    usage:
      'Use Button for the main decision in a view. Reserve primary emphasis for the highest-priority action and use secondary or ghost variants for supporting actions.',
    exampleCode: [
      "import { Button } from '@avenra/ui';",
      '',
      'export function PublishActions() {',
      '  return (',
      '    <div>',
      '      <Button>Publish</Button>',
      '      <Button variant="secondary">Save draft</Button>',
      '      <Button variant="ghost">Cancel</Button>',
      '    </div>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Variants',
        body: 'Use `primary`, `secondary`, and `ghost` to establish action hierarchy without inventing one-off button styles in feature code.'
      },
      {
        title: 'States',
        body: 'The component exposes a `loading` prop and disables interaction while loading so product flows can avoid accidental double submits.'
      }
    ]
  },
  alert: {
    slug: 'alert',
    title: 'Alert',
    packageImport: "import { Alert } from '@avenra/ui';",
    category: 'Feedback and status',
    summary: 'Inline status message for info, success, warning, and danger states.',
    usage:
      'Use Alert when the product needs to surface a state change, warning, or failure without forcing the user into a modal.',
    exampleCode: [
      "import { Alert } from '@avenra/ui';",
      '',
      'export function BuildStatus() {',
      '  return (',
      '    <Alert title="Build failed" variant="danger">',
      '      Fix the type error and rerun the pipeline.',
      '    </Alert>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Variants',
        body: 'Choose the alert variant based on product meaning, not visual preference. `danger` should remain rare and action-oriented.'
      },
      {
        title: 'Density',
        body: 'Alert works best for short, high-signal status copy. If the content becomes long or branching, that usually wants a richer panel or empty state.'
      }
    ]
  },
  avatar: {
    slug: 'avatar',
    title: 'Avatar',
    packageImport: "import { Avatar } from '@avenra/ui';",
    category: 'Layout and display',
    summary: 'Compact identity primitive with image and initials fallback modes.',
    usage:
      'Use Avatar anywhere user or workspace identity needs a small visual anchor, especially in lists, headers, and activity feeds.',
    exampleCode: [
      "import { Avatar } from '@avenra/ui';",
      '',
      'export function ReviewerChip() {',
      '  return <Avatar name="Avenra Design" size="lg" />;',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Fallback behavior',
        body: 'If no valid image source is provided, Avatar falls back to initials so list layouts do not collapse into empty image placeholders.'
      },
      {
        title: 'Sizing',
        body: 'Use `sm`, `md`, and `lg` to keep avatar density consistent across compact navigation, standard lists, and larger profile contexts.'
      }
    ]
  },
  badge: {
    slug: 'badge',
    title: 'Badge',
    packageImport: "import { Badge } from '@avenra/ui';",
    category: 'Feedback and status',
    summary: 'Small status label for mode, health, workflow stage, or classification.',
    usage:
      'Use Badge for short categorical labels that help users scan state quickly without opening a detail view.',
    exampleCode: [
      "import { Badge } from '@avenra/ui';",
      '',
      'export function ReleaseState() {',
      '  return <Badge variant="success">Ready</Badge>;',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Variants',
        body: 'Map badge variants to stable system meaning so users can learn the visual language instead of reinterpreting colors on each screen.'
      },
      {
        title: 'Copy',
        body: 'Keep badge text extremely short. They are best at scan speed, not explanation.'
      }
    ]
  },
  breadcrumb: {
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    packageImport: "import { Breadcrumb } from '@avenra/ui';",
    category: 'Actions and navigation',
    summary: 'Path indicator for showing where the user is inside a nested navigation hierarchy.',
    usage:
      'Use Breadcrumb when users can arrive deep in a product structure and need a quick way to understand or backtrack the current path.',
    exampleCode: [
      "import { Breadcrumb } from '@avenra/ui';",
      '',
      'export function PagePath() {',
      '  return (',
      '    <Breadcrumb',
      '      items={[',
      "        { label: 'Home', href: '/' },",
      "        { label: 'Components', href: '/components' },",
      "        { label: 'Breadcrumb' }",
      '      ]}',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Current item behavior',
        body: 'The last breadcrumb item renders as the current location instead of a link, which helps screen readers and prevents pointless self-navigation.'
      },
      {
        title: 'Density',
        body: 'Keep labels concise. Breadcrumbs should clarify orientation quickly, not restate full page descriptions.'
      }
    ]
  },
  card: {
    slug: 'card',
    title: 'Card',
    packageImport: "import { Card } from '@avenra/ui';",
    category: 'Layout and display',
    summary: 'Content container with optional title, description, actions, and interactive treatment.',
    usage:
      'Use Card when related content needs to stay grouped as one visual block, especially in dashboards, galleries, summaries, or dense product settings pages.',
    exampleCode: [
      "import { Badge, Button, Card } from '@avenra/ui';",
      '',
      'export function ProjectCard() {',
      '  return (',
      '    <Card',
      '      title="Project briefing"',
      '      description="Combine compact status labels with richer content blocks."',
      '      actions={<Badge variant="info">Preview</Badge>}',
      '      interactive',
      '    >',
      '      <Button variant="secondary" size="sm">Review draft</Button>',
      '    </Card>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Structure',
        body: 'Card accepts title, description, actions, and body content separately so teams can keep composition readable without recreating card layout by hand.'
      },
      {
        title: 'Interactive mode',
        body: 'Use the `interactive` flag when the whole card should feel click-ready or hover-responsive. Do not overuse it for purely decorative grouping.'
      }
    ]
  },
  checkbox: {
    slug: 'checkbox',
    title: 'Checkbox',
    packageImport: "import { Checkbox } from '@avenra/ui';",
    category: 'Forms and input',
    summary: 'Independent binary choice control with shared field messaging support.',
    usage:
      'Use Checkbox when users can independently turn options on or off without excluding other choices.',
    exampleCode: [
      "import { Checkbox } from '@avenra/ui';",
      '',
      'export function PreferencesField() {',
      '  return (',
      '    <Checkbox',
      '      id="updates"',
      '      label="Email product updates"',
      '      hint="Stay informed when new components ship"',
      '      defaultChecked',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Selection model',
        body: 'Checkbox is for independent toggles inside a set. If only one option may stay active, switch to Radio instead.'
      },
      {
        title: 'Validation',
        body: 'The field shares the same hint and error messaging contract as the other form controls, which keeps form composition consistent.'
      }
    ]
  },
  combobox: {
    slug: 'combobox',
    title: 'Combobox',
    packageImport: "import { Combobox } from '@avenra/ui';",
    category: 'Forms and input',
    summary: 'Searchable select field that keeps text entry, filtering, and selection in one input-driven control.',
    usage:
      'Use Combobox when the user needs to search a known option set but still stay anchored to a form field pattern instead of opening a larger command surface.',
    exampleCode: [
      "import { Combobox } from '@avenra/ui';",
      '',
      'const frameworkOptions = [',
      "  { value: 'react', label: 'React' },",
      "  { value: 'vue', label: 'Vue' },",
      "  { value: 'svelte', label: 'Svelte' }",
      '];',
      '',
      'export function FrameworkField() {',
      '  return (',
      '    <Combobox',
      '      label="Framework"',
      '      placeholder="Search frameworks"',
      '      options={frameworkOptions}',
      '      defaultValue="react"',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Selection and query control',
        body: 'Combobox separates selected value from input text so products can control search text, selected option, and open state independently when orchestration matters.'
      },
      {
        title: 'When to use',
        body: 'Choose Combobox when the option list is searchable but still belongs inside a normal form field. If the interaction is command-driven or action-first, use Command instead.'
      }
    ]
  },
  command: {
    slug: 'command',
    title: 'Command',
    packageImport: "import { Command } from '@avenra/ui';",
    category: 'Forms and input',
    summary: 'Command-style searchable action list for fast keyboard-first discovery and execution.',
    usage:
      'Use Command when the user is searching for actions, destinations, or tools rather than filling out a field value inside a form.',
    exampleCode: [
      "import { Command } from '@avenra/ui';",
      '',
      'const commandOptions = [',
      "  { value: 'open-settings', label: 'Open settings' },",
      "  { value: 'create-project', label: 'Create project' },",
      "  { value: 'invite-member', label: 'Invite member' }",
      '];',
      '',
      'export function WorkspaceCommandPalette() {',
      '  return (',
      '    <Command',
      '      placeholder="Search commands"',
      '      emptyMessage="Nothing found"',
      '      options={commandOptions}',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Action-oriented search',
        body: 'Command is for finding and executing actions quickly. It keeps focus on filtering and selection instead of presenting the interaction as a conventional form field.'
      },
      {
        title: 'Keyboard flow',
        body: 'Arrow keys move through filtered results, Enter selects the active item, and Escape dismisses the surface, which keeps command execution fast without reaching for the pointer.'
      }
    ]
  },
  autocomplete: {
    slug: 'autocomplete',
    title: 'Autocomplete',
    packageImport: "import { Autocomplete } from '@avenra/ui';",
    category: 'Forms and input',
    summary: 'Suggestion field built on Combobox for typeahead flows that should wait for meaningful query input.',
    usage:
      'Use Autocomplete when free typing should progressively reveal suggestions, especially when showing every option up front would add noise or overwhelm the field.',
    exampleCode: [
      "import { Autocomplete } from '@avenra/ui';",
      '',
      'const countryOptions = [',
      "  { value: 'ar', label: 'Argentina' },",
      "  { value: 'au', label: 'Australia' },",
      "  { value: 'at', label: 'Austria' }",
      '];',
      '',
      'export function CountryField() {',
      '  return (',
      '    <Autocomplete',
      '      label="Country"',
      '      placeholder="Search countries"',
      '      emptyMessage="No country found"',
      '      minQueryLength={2}',
      '      options={countryOptions}',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Typeahead threshold',
        body: 'Use `minQueryLength` to avoid opening large suggestion sets before the user has provided enough signal for useful matching.'
      },
      {
        title: 'Relationship to Combobox',
        body: 'Autocomplete reuses the Combobox interaction model but narrows it to suggestion-first search, which keeps product code simple when query length should gate results.'
      }
    ]
  },
  'empty-state': {
    slug: 'empty-state',
    title: 'EmptyState',
    packageImport: "import { EmptyState } from '@avenra/ui';",
    category: 'Feedback and status',
    summary: 'Structured placeholder for zero-data, first-run, or cleared-list product states.',
    usage:
      'Use EmptyState when the user needs context for why a view is blank and a clear next action to move forward.',
    exampleCode: [
      "import { Button, EmptyState } from '@avenra/ui';",
      '',
      'export function NotificationsEmpty() {',
      '  return (',
      '    <EmptyState',
      '      title="No notifications yet"',
      '      description="When your workspace starts generating events, they will appear here."',
      '      action={<Button size="sm">Create first event</Button>}',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Usefulness',
        body: 'An empty state should explain both the current absence and the next useful step. Pure decoration is not enough.'
      },
      {
        title: 'Action area',
        body: 'Provide an action when the user can do something meaningful immediately. If no action exists, keep the explanation concise and concrete.'
      }
    ]
  },
  'icon-button': {
    slug: 'icon-button',
    title: 'IconButton',
    packageImport: "import { IconButton } from '@avenra/ui';",
    category: 'Actions and navigation',
    summary: 'Compact action button for icon-led controls with accessibility safeguards.',
    usage:
      'Use IconButton for dense toolbars, inline controls, and secondary actions where a full-width button would add too much visual weight.',
    exampleCode: [
      "import { IconButton } from '@avenra/ui';",
      '',
      'export function FilterTrigger() {',
      '  return (',
      '    <IconButton',
      '      aria-label="Open filters"',
      '      icon={<span aria-hidden="true">+</span>}',
      '      variant="secondary"',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Accessibility contract',
        body: 'When IconButton is icon-only, it requires an `aria-label`. That enforcement prevents unlabeled controls from slipping through development unnoticed.'
      },
      {
        title: 'Density',
        body: 'Reach for IconButton when the action is common, localized, and visually obvious. If the meaning is ambiguous, use a normal Button with text instead.'
      }
    ]
  },
  input: {
    slug: 'input',
    title: 'Input',
    packageImport: "import { Input } from '@avenra/ui';",
    category: 'Forms and input',
    summary: 'Single-line text field with label, hint, and error affordances.',
    usage:
      'Use Input when the user needs to enter a compact value such as names, emails, search text, or short identifiers.',
    exampleCode: [
      "import { Input } from '@avenra/ui';",
      '',
      'export function EmailField() {',
      '  return (',
      '    <Input',
      '      id="email"',
      '      label="Email"',
      '      hint="Use the address tied to your workspace"',
      '      placeholder="team@avenra.dev"',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Structure',
        body: 'Input always renders a visible label and can append hint or error text so the field stays understandable without separate wrappers.'
      },
      {
        title: 'Validation',
        body: 'Pass `error` when the field state is invalid. The control marks `aria-invalid` and wires descriptive text automatically.'
      }
    ]
  },
  inline: {
    slug: 'inline',
    title: 'Inline',
    packageImport: "import { Inline } from '@avenra/ui';",
    category: 'Layout and display',
    summary: 'Horizontal layout primitive for keeping compact items aligned on a single row.',
    usage:
      'Use Inline when related actions, metadata, or small content blocks should stay visually grouped without writing ad hoc flex wrappers in product code.',
    exampleCode: [
      "import { Badge, Inline } from '@avenra/ui';",
      '',
      'export function ReleaseMeta() {',
      '  return (',
      '    <Inline align="center" gap="sm">',
      '      <Badge variant="success">Stable</Badge>',
      '      <span>v1.8.0</span>',
      '      <span>Updated 2 hours ago</span>',
      '    </Inline>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Alignment',
        body: 'Use the `align` prop to keep mixed content vertically aligned instead of manually tuning each child with margins.'
      },
      {
        title: 'Gap scale',
        body: 'Choose from the built-in `sm`, `md`, and `lg` gaps so dense toolbars and metadata rows share one spacing language.'
      }
    ]
  },
  progress: {
    slug: 'progress',
    title: 'Progress',
    packageImport: "import { Progress } from '@avenra/ui';",
    category: 'Feedback and status',
    summary: 'Linear progress indicator with built-in clamping and accessible progressbar semantics.',
    usage:
      'Use Progress to communicate determinate loading, completion percentage, or staged workflow advancement.',
    exampleCode: [
      "import { Progress } from '@avenra/ui';",
      '',
      'export function UploadProgress() {',
      '  return <Progress value={68} label="Upload progress" />;',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Value handling',
        body: 'Progress clamps values into the 0 to 100 range so callers do not need to sanitize every percent value before rendering.'
      },
      {
        title: 'Accessibility',
        body: 'Provide a meaningful label so assistive technology can announce what is progressing and how far along it is.'
      }
    ]
  },
  pagination: {
    slug: 'pagination',
    title: 'Pagination',
    packageImport: "import { Pagination } from '@avenra/ui';",
    category: 'Actions and navigation',
    summary: 'Controlled pagination navigation with previous/next controls, page buttons, and ellipsis gaps.',
    usage:
      'Use Pagination when collections are split across pages and the user needs both page position awareness and quick movement between nearby pages.',
    exampleCode: [
      "import { Pagination } from '@avenra/ui';",
      '',
      'export function ResultsPagination() {',
      '  return <Pagination currentPage={6} totalPages={12} onPageChange={(page) => console.log(page)} />;',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Controlled state',
        body: 'Pagination is intentionally controlled, so data loading and routing decisions stay in the consuming feature while the component focuses on rendering page affordances.'
      },
      {
        title: 'Range compression',
        body: 'The component keeps edge pages visible and inserts ellipsis only when ranges would otherwise become noisy, which makes long result sets easier to scan.'
      }
    ]
  },
  skeleton: {
    slug: 'skeleton',
    title: 'Skeleton',
    packageImport: "import { Skeleton } from '@avenra/ui';",
    category: 'Feedback and status',
    summary: 'Loading placeholder primitive for preserving layout while real content is still on the way.',
    usage:
      'Use Skeleton when the eventual content shape is known and you want the interface to stay stable during loading instead of collapsing or flashing.',
    exampleCode: [
      "import { Skeleton } from '@avenra/ui';",
      '',
      'export function ProfileLoadingState() {',
      '  return (',
      '    <div>',
      '      <Skeleton width="40%" height="0.875rem" />',
      '      <Skeleton width="100%" height="3rem" shape="rounded" />',
      '    </div>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Layout stability',
        body: 'Match Skeleton width, height, and shape to the final UI so content does not jump once loading completes.'
      },
      {
        title: 'Scope',
        body: 'Skeleton works best for short loading windows and known layout shapes. If the system needs progress detail or status explanation, pair it with richer messaging.'
      }
    ]
  },
  radio: {
    slug: 'radio',
    title: 'Radio',
    packageImport: "import { Radio } from '@avenra/ui';",
    category: 'Forms and input',
    summary: 'Single-select choice control for mutually exclusive options.',
    usage:
      'Use Radio when only one option in a set may be active and the user benefits from seeing the available choices side by side.',
    exampleCode: [
      "import { Radio } from '@avenra/ui';",
      '',
      'export function AccessMode() {',
      '  return (',
      '    <Radio',
      '      id="admin"',
      '      name="access-mode"',
      '      label="Workspace admin access"',
      '      hint="Use a single-select control when only one path should stay active"',
      '      defaultChecked',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Selection model',
        body: 'Radio is for mutually exclusive choices. If multiple items may be enabled independently, the control should be Checkbox instead.'
      },
      {
        title: 'Grouping',
        body: 'Use a shared `name` across related radios so the browser enforces the single-select behavior correctly.'
      }
    ]
  },
  select: {
    slug: 'select',
    title: 'Select',
    packageImport: "import { Select } from '@avenra/ui';",
    category: 'Forms and input',
    summary: 'Labelled native select wrapper with consistent field styling and validation.',
    usage:
      'Use Select when the user needs to pick one option from a short, stable list and native browser behavior is acceptable.',
    exampleCode: [
      "import { Select } from '@avenra/ui';",
      '',
      'export function RoleField() {',
      '  return (',
      '    <Select id="role" label="Role" hint="Choose the baseline permission set" defaultValue="editor">',
      '      <option value="viewer">Viewer</option>',
      '      <option value="editor">Editor</option>',
      '      <option value="owner">Owner</option>',
      '    </Select>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'When to use',
        body: 'Keep Select for concise option sets. If options become long, searchable, or async, that is a different component problem.'
      },
      {
        title: 'Accessibility',
        body: 'The field keeps the same label, hint, and error contract as Input so teams do not need separate wiring patterns per field type.'
      }
    ]
  },
  dialog: {
    slug: 'dialog',
    title: 'Dialog',
    packageImport: "import { Dialog } from '@avenra/ui';",
    category: 'Overlay surfaces',
    summary: 'Simple modal surface driven by a trigger element and close-on-action behavior.',
    usage:
      'Use Dialog for confirmations, blocking decisions, or short flows that need focused attention before the user returns to the page.',
    exampleCode: [
      "import { Button, Dialog } from '@avenra/ui';",
      '',
      'export function ConfirmPublish() {',
      '  return (',
      '    <Dialog',
      '      trigger={<Button>Open dialog</Button>}',
      '      title="Confirm publish"',
      '      description="This will make the draft visible to your team."',
      '    >',
      '      <Button variant="secondary">Close</Button>',
      '    </Dialog>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Trigger model',
        body: 'Dialog clones the provided trigger and opens the modal on click, which keeps call sites concise for common product actions.'
      },
      {
        title: 'Current limitation',
        body: 'The current version is intentionally lightweight. It is useful for simple confirms today, but richer focus management and composition patterns can come later.'
      }
    ]
  },
  'dropdown-menu': {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    packageImport: "import { DropdownMenu } from '@avenra/ui';",
    category: 'Overlay surfaces',
    summary: 'Compact action list that opens from a trigger element for contextual item-level commands.',
    usage:
      'Use DropdownMenu when the user needs a short set of secondary actions without leaving the current layout or expanding permanent toolbar chrome.',
    exampleCode: [
      "import { Button, DropdownMenu } from '@avenra/ui';",
      '',
      'export function WorkspaceActions() {',
      '  return (',
      '    <DropdownMenu',
      '      title="Workspace actions"',
      '      trigger={<Button variant="secondary">Open menu</Button>}',
      '      items={[',
      "        { label: 'Rename workspace', onSelect: () => undefined },",
      "        { label: 'Duplicate workspace', onSelect: () => undefined },",
      "        { label: 'Archive workspace', onSelect: () => undefined, tone: 'danger' }",
      '      ]}',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'When to use',
        body: 'Choose DropdownMenu for concise contextual actions attached to a trigger. If the interaction needs rich content, form fields, or long explanations, move up to Popover or Drawer instead.'
      },
      {
        title: 'Action design',
        body: 'Keep labels short, verb-led, and visually scannable. Reserve the danger tone for destructive actions so the menu remains easy to parse under pressure.'
      }
    ]
  },
  drawer: {
    slug: 'drawer',
    title: 'Drawer',
    packageImport: "import { Drawer } from '@avenra/ui';",
    category: 'Overlay surfaces',
    summary: 'Slide-over panel for longer contextual flows that should stay attached to the current page.',
    usage:
      'Use Drawer when the task needs more space than a popover or dialog body but should not force a full route transition.',
    exampleCode: [
      "import { Button, Drawer } from '@avenra/ui';",
      '',
      'export function WorkspaceDrawer() {',
      '  return (',
      '    <Drawer',
      '      trigger={<Button variant="secondary">Open drawer</Button>}',
      '      title="Workspace settings"',
      '      description="Update access and notification preferences."',
      '    >',
      '      <Button>Save changes</Button>',
      '    </Drawer>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'When Drawer wins',
        body: 'Drawer is better than Dialog when the task needs more breathing room, richer forms, or persistent context from the current page.'
      },
      {
        title: 'Dismissal model',
        body: 'The current implementation supports trigger open, close button, overlay click, and Escape dismissal, which covers the standard slide-over flow.'
      }
    ]
  },
  form: {
    slug: 'form',
    title: 'Form',
    packageImport: "import { Form } from '@avenra/ui';",
category: 'Forms and input',
    summary: 'Form-level context that propagates disabled and submitting state across fields.',
    usage:
      'Use Form to coordinate submit and disabled state across related fields without replacing native form semantics or forcing a form-library dependency.',
    exampleCode: [
      "import { Button, Form } from '@avenra/ui';",
      '',
      'export function AccountForm() {',
      '  return (',
      '    <Form submitting={false}>',
      '      <Button type="submit">Save</Button>',
      '    </Form>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'State model',
        body: 'Form provides disabled and submitting state through context so wrapped controls can stay consistent without each feature wiring that state manually.'
      }
    ]
  },
  'form-field': {
    slug: 'form-field',
    title: 'FormField',
    packageImport: "import { FormField } from '@avenra/ui';",
category: 'Forms and input',
    summary: 'Unified field shell for label, hint, error, required, invalid, and disabled state.',
    usage:
      'Use FormField as the standard structure around text inputs and choice controls so labels, hints, errors, and accessibility wiring stay consistent across the library.',
    exampleCode: [
      "import { FormField, Input } from '@avenra/ui';",
      '',
      'export function EmailField() {',
      '  return (',
      '    <FormField label="Email" hint="We\'ll use this for account updates." required>',
      '      <Input placeholder="name@example.com" />',
      '    </FormField>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Layout modes',
        body: 'Use the default stacked layout for text-like controls and the control layout for Checkbox, Radio, and Switch so the field shell stays consistent without duplicating labels.'
      }
    ]
  },
  popover: {
    slug: 'popover',
    title: 'Popover',
    packageImport: "import { Popover } from '@avenra/ui';",
    category: 'Overlay surfaces',
    summary: 'Contextual surface that opens from a trigger and dismisses on outside click or Escape.',
    usage:
      'Use Popover for lightweight supporting content, quick actions, or contextual details that should stay attached to a trigger without taking over the page.',
    exampleCode: [
      "import { Button, Popover } from '@avenra/ui';",
      '',
      'export function FilterPopover() {',
      '  return (',
      '    <Popover',
      '      trigger={<Button variant="secondary">Filters</Button>}',
      '      title="Quick filters"',
      '      content={<div>Only show components updated this week.</div>}',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Open state model',
        body: 'Popover supports both uncontrolled and controlled usage through `defaultOpen`, `open`, and `onOpenChange`, so feature code can start simple and scale when orchestration is needed.'
      },
      {
        title: 'Dismiss behavior',
        body: 'The current implementation closes on outside pointer down and Escape, which covers common contextual overlays without extra product wiring.'
      }
    ]
  },
  stack: {
    slug: 'stack',
    title: 'Stack',
    packageImport: "import { Stack } from '@avenra/ui';",
    category: 'Layout and display',
    summary: 'Directional layout primitive for spacing related blocks vertically or horizontally.',
    usage:
      'Use Stack when a component or page section needs predictable spacing between repeated blocks, form fields, or mixed content groups.',
    exampleCode: [
      "import { Button, Stack } from '@avenra/ui';",
      '',
      'export function PanelActions() {',
      '  return (',
      '    <Stack gap="sm">',
      '      <Button>Save changes</Button>',
      '      <Button variant="secondary">Preview</Button>',
      '    </Stack>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Direction control',
        body: 'Stack defaults to vertical flow, but `direction=\"horizontal\"` lets the same primitive handle compact action rows without switching to a different layout API.'
      },
      {
        title: 'Composition',
        body: 'Use Stack to centralize spacing decisions in one wrapper instead of pushing margin rules down into each child component.'
      }
    ]
  },
  switch: {
    slug: 'switch',
    title: 'Switch',
    packageImport: "import { Switch } from '@avenra/ui';",
    category: 'Forms and input',
    summary: 'Binary on/off control styled for setting toggles and live state changes.',
    usage:
      'Use Switch for immediate toggles where the user is turning a setting on or off, especially when the current state should read clearly at a glance.',
    exampleCode: [
      "import { Switch } from '@avenra/ui';",
      '',
      'export function NotificationsToggle() {',
      '  return (',
      '    <Switch',
      '      id="sync"',
      '      label="Sync deployment notifications"',
      '      hint="Keep publish and incident updates visible"',
      '      defaultChecked',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'When to prefer Switch',
        body: 'Switch works best for immediate binary settings. If the user is selecting one option from several, use Radio instead.'
      },
      {
        title: 'Semantics',
        body: 'The underlying input uses `role=\"switch\"` while keeping the same hint and error pattern as the rest of the form controls.'
      }
    ]
  },
  tabs: {
    slug: 'tabs',
    title: 'Tabs',
    packageImport: "import { Tabs } from '@avenra/ui';",
    category: 'Actions and navigation',
    summary: 'Client-side tabset for switching between related sections without leaving the page.',
    usage:
      'Use Tabs when several peer views belong to the same context and switching between them should feel immediate.',
    exampleCode: [
      "import { Tabs } from '@avenra/ui';",
      '',
      'export function SettingsTabs() {',
      '  return (',
      '    <Tabs',
      '      items={[',
      "        { id: 'general', label: 'General', content: <div>General settings</div> },",
      "        { id: 'billing', label: 'Billing', content: <div>Billing settings</div> }",
      '      ]}',
      '      defaultTabId="general"',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Content relationship',
        body: 'Tabs are best when the sections are peers within one task flow. If each panel feels like a different page, that usually wants navigation instead.'
      },
      {
        title: 'Default state',
        body: 'Use `defaultTabId` when one tab should be stable on first render. Otherwise the component falls back to the first item.'
      }
    ]
  },
  tooltip: {
    slug: 'tooltip',
    title: 'Tooltip',
    packageImport: "import { Tooltip } from '@avenra/ui';",
    category: 'Overlay surfaces',
    summary: 'Hover and focus helper text for compact controls that need short, contextual explanation.',
    usage:
      'Use Tooltip for brief supporting copy on dense UI elements where always-visible text would add noise but discoverability still matters.',
    exampleCode: [
      "import { IconButton, Tooltip } from '@avenra/ui';",
      '',
      'export function HelpHint() {',
      '  return (',
      '    <Tooltip content="Opens component usage guidance.">',
      '      <IconButton aria-label="Open help" icon={<span aria-hidden="true">?</span>} />',
      '    </Tooltip>',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Trigger behavior',
        body: 'Tooltip opens on both hover and keyboard focus, which keeps icon-heavy interfaces understandable for pointer and keyboard users.'
      },
      {
        title: 'Content scope',
        body: 'Keep tooltip content short and supportive. If the user needs actions, rich formatting, or persistent context, that is usually a Popover instead.'
      }
    ]
  },
  textarea: {
    slug: 'textarea',
    title: 'Textarea',
    packageImport: "import { Textarea } from '@avenra/ui';",
    category: 'Forms and input',
    summary: 'Multi-line text field with the same label, hint, and error contract as Input.',
    usage:
      'Use Textarea for messages, notes, descriptions, and any field where the user needs more than a short line of text.',
    exampleCode: [
      "import { Textarea } from '@avenra/ui';",
      '',
      'export function ProjectNotes() {',
      '  return (',
      '    <Textarea',
      '      id="notes"',
      '      label="Notes"',
      '      hint="Share enough context so the next reviewer can act quickly"',
      '      placeholder="Add project context..."',
      '    />',
      '  );',
      '}'
    ].join('\n'),
    sections: [
      {
        title: 'Consistency',
        body: 'Textarea keeps the same field conventions as Input so forms can mix single-line and multi-line controls without changing validation patterns.'
      },
      {
        title: 'Content length',
        body: 'Use Textarea when the answer is open-ended but still plain text. If formatting, attachments, or long-form collaboration matter, move to a richer editor.'
      }
    ]
  }
} as const satisfies Record<string, ComponentDocContent>;

const commonFieldAccessibility = [
  'Keep the visible label rendered at all times so screen readers and sighted users share the same field context.',
  'Wire hint and error copy through `aria-describedby` so validation feedback is attached to the control instead of floating nearby.'
];

const commonChoiceAccessibility = [
  'Preserve the explicit text label next to the control instead of relying on placeholder-only meaning.',
  'Keep related choices grouped logically so assistive technology users can understand the available selection set.'
];

export const componentDocMetadata = {
  button: {
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost'", description: 'Controls action hierarchy and visual emphasis.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Matches the button to toolbar, form, or hero density.' },
      { name: 'loading', type: 'boolean', description: 'Disables interaction and swaps the visible label to a loading state.' }
    ],
    states: ['Default', 'Disabled', 'Loading'],
    accessibility: [
      'Button uses the native `button` element, so keyboard activation and semantics come for free.',
      'Keep the visible label action-oriented so the control is understandable out of visual context.'
    ]
  },
  alert: {
    props: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", description: 'Maps the alert to system meaning.' },
      { name: 'title', type: 'ReactNode', description: 'Optional headline for the highest-signal part of the message.' },
      { name: 'children', type: 'ReactNode', description: 'Supporting description or follow-up guidance.' }
    ],
    states: ['Info', 'Success', 'Warning', 'Danger'],
    accessibility: [
      'The component renders with `role="alert"` so important status changes are announced to assistive technology.',
      'Keep alert copy short and specific; long branching instructions usually want a richer panel.'
    ]
  },
  avatar: {
    props: [
      { name: 'name', type: 'string', description: 'Used to derive initials when no valid image is available.' },
      { name: 'src', type: 'string', description: 'Image source for the identity thumbnail.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Aligns avatar density with the surrounding layout.' }
    ],
    states: ['Image', 'Initials fallback', 'Unknown fallback'],
    accessibility: [
      'Provide `alt` when rendering an actual image so non-visual users receive the same identity cue.',
      'Fallback initials keep the avatar discoverable even when the image source is missing or broken.'
    ]
  },
  badge: {
    props: [
      { name: 'variant', type: "'neutral' | 'success' | 'warning' | 'danger' | 'info'", description: 'Controls semantic tone.' },
      { name: 'size', type: "'sm' | 'md'", description: 'Keeps badge density consistent across layouts.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Short visible label.' }
    ],
    states: ['Neutral', 'Info', 'Success', 'Warning', 'Danger'],
    accessibility: [
      'Badge content should remain textual rather than color-only so state is readable without color perception.',
      'Keep labels compact so badges stay scannable inside dense lists and headers.'
    ]
  },
  breadcrumb: {
    props: [
      { name: 'items', type: 'BreadcrumbItem[]', required: true, description: 'Ordered trail of labels and optional links.' },
      { name: 'className', type: 'string', description: 'Optional wrapper class for layout integration.' }
    ],
    states: ['Linked ancestors', 'Current page item'],
    accessibility: [
      'Breadcrumb uses `nav` with `aria-label="Breadcrumb"` so the trail is announced as navigation.',
      'The last item exposes `aria-current="page"` instead of linking back to itself.'
    ]
  },
  card: {
    props: [
      { name: 'title', type: 'ReactNode', description: 'Optional card heading.' },
      { name: 'description', type: 'ReactNode', description: 'Short summary beneath the heading.' },
      { name: 'actions', type: 'ReactNode', description: 'Inline affordance area for status or secondary actions.' },
      { name: 'interactive', type: 'boolean', description: 'Adds hover-ready styling when the whole card should feel actionable.' }
    ],
    states: ['Static', 'Interactive'],
    accessibility: [
      'Keep interactive cards discoverable with a real nested control or link rather than color shift alone.',
      'Use heading text that still makes sense when the card is read out of page context.'
    ]
  },
  checkbox: {
    props: [
      { name: 'label', type: 'string', required: true, description: 'Visible choice label.' },

      { name: 'error', type: 'string', description: 'Validation message and invalid styling trigger.' }
    ],
    states: ['Unchecked', 'Checked', 'Disabled', 'Invalid'],
    accessibility: commonChoiceAccessibility
  },
  'empty-state': {
    props: [
      { name: 'title', type: 'ReactNode', required: true, description: 'Primary explanation for the missing state.' },
      { name: 'description', type: 'ReactNode', description: 'Secondary guidance that tells the user what happened.' },
      { name: 'action', type: 'ReactNode', description: 'Primary recovery action or next step.' }
    ],
    states: ['No results', 'First-run', 'Cleared list'],
    accessibility: [
      'Lead with a concrete title so the missing state is understandable without reading every sentence.',
      'If recovery is possible, provide a clear action instead of leaving the user in a dead end.'
    ]
  },
  'icon-button': {
    props: [
      { name: 'aria-label', type: 'string', description: 'Required when the button shows only an icon.' },
      { name: 'icon', type: 'ReactNode', description: 'Visual icon content for the control.' },
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost'", description: 'Matches surrounding action hierarchy.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Keeps compact controls aligned with toolbar density.' }
    ],
    states: ['Default', 'Disabled', 'Loading'],
    accessibility: [
      'Icon-only usage must provide an `aria-label`; the component throws in development if that contract is broken.',
      'Prefer a visible text label when the action is ambiguous or uncommon.'
    ]
  },
  input: {
    props: [
      { name: 'label', type: 'string', required: true, description: 'Visible field label.' },
      { name: 'hint', type: 'string', description: 'Optional helper copy for expected input.' },
      { name: 'error', type: 'string', description: 'Validation message and invalid visual state.' },
      { name: 'type', type: 'string', description: 'Native input type such as `text`, `email`, or `password`.' }
    ],
    states: ['Default', 'Focused', 'Invalid', 'Disabled'],
    accessibility: commonFieldAccessibility
  },
  inline: {
    props: [
      { name: 'align', type: "'start' | 'center' | 'end'", description: 'Controls cross-axis alignment of inline items.' },
      { name: 'gap', type: "'sm' | 'md' | 'lg'", description: 'Sets the spacing scale between children.' },
      { name: 'children', type: 'ReactNode', description: 'Items to keep aligned in one row.' }
    ],
    states: ['Start aligned', 'Centered', 'End aligned'],
    accessibility: [
      'Inline is purely layout; semantic roles still need to come from the children inside it.',
      'Use it to preserve reading order while improving visual alignment, not to reorder meaning.'
    ]
  },
  progress: {
    props: [
      { name: 'value', type: 'number', description: 'Determinate progress value, clamped between 0 and 100.' },
      { name: 'label', type: 'string', description: 'Accessible name for the progressbar.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Adjusts track thickness for the surrounding surface.' }
    ],
    states: ['Empty', 'Partial progress', 'Complete'],
    accessibility: [
      'Always provide a meaningful `label` so assistive technology can announce what is progressing.',
      'The progressbar exposes `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` automatically.'
    ]
  },
  pagination: {
    props: [
      { name: 'currentPage', type: 'number', required: true, description: 'Current active page in the controlled pagination state.' },
      { name: 'totalPages', type: 'number', required: true, description: 'Total number of available pages.' },
      { name: 'onPageChange', type: '(page: number) => void', required: true, description: 'Called when the user requests a different page.' },
      { name: 'siblingCount', type: 'number', description: 'Controls how many neighboring pages stay visible around the current page.' }
    ],
    states: ['First page', 'Middle range with ellipsis', 'Last page'],
    accessibility: [
      'Pagination renders inside a labeled navigation landmark so assistive technology can identify it as page navigation.',
      'The active page exposes `aria-current="page"`, and boundary controls disable correctly at the start and end of the range.'
    ]
  },
  skeleton: {
    props: [
      { name: 'width', type: 'number | string', description: 'Sets the placeholder width to match the expected final layout.' },
      { name: 'height', type: 'number | string', description: 'Sets the placeholder height.' },
      { name: 'shape', type: "'rectangular' | 'rounded' | 'circular'", description: 'Controls the visible placeholder geometry.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Applies preset density classes for common loading affordances.' }
    ],
    states: ['Rectangular', 'Rounded', 'Circular'],
    accessibility: [
      'Skeleton is marked `aria-hidden="true"` so assistive technology does not announce decorative loading placeholders as real content.',
      'Pair it with nearby loading copy when the user needs explicit status, not just spatial continuity.'
    ]
  },
  radio: {
    props: [
      { name: 'label', type: 'string', required: true, description: 'Visible choice label.' },
      { name: 'name', type: 'string', description: 'Shared browser grouping key for mutually exclusive choices.' },
      { name: 'hint', type: 'string', description: 'Optional support copy.' },
      { name: 'error', type: 'string', description: 'Validation state and message.' }
    ],
    states: ['Unchecked', 'Checked', 'Disabled', 'Invalid'],
    accessibility: [
      ...commonChoiceAccessibility,
      'Use a shared `name` value for the group so native single-select behavior stays intact.'
    ]
  },
  select: {
    props: [
      { name: 'label', type: 'string', required: true, description: 'Visible field label.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Native `option` elements or grouped options.' },
      { name: 'hint', type: 'string', description: 'Optional supporting guidance.' },
      { name: 'error', type: 'string', description: 'Validation state and message.' }
    ],
    states: ['Default', 'Focused', 'Invalid', 'Disabled'],
    accessibility: [
      ...commonFieldAccessibility,
      'Because this is a native select wrapper, keyboard navigation and option announcement follow browser behavior.'
    ]
  },
  dialog: {
    props: [
      { name: 'trigger', type: 'ReactElement', required: true, description: 'Element cloned to open the modal.' },
      { name: 'title', type: 'string', required: true, description: 'Accessible dialog heading.' },
      { name: 'description', type: 'string', description: 'Optional supporting copy under the heading.' },
      { name: 'children', type: 'ReactNode', description: 'Body content and close actions.' }
    ],
    states: ['Closed', 'Open'],
    accessibility: [
      'Dialog uses `role="dialog"` with `aria-modal="true"` and wires the title/description ids automatically.',
      'Keep the flow short and focused; long multi-step tasks need stronger focus management than this lightweight modal currently provides.'
    ]
  },
  'dropdown-menu': {
    props: [
      { name: 'trigger', type: 'ReactElement', required: true, description: 'Element cloned to open or close the menu.' },
      { name: 'items', type: 'DropdownMenuItem[]', required: true, description: 'Ordered menu items with labels, actions, and optional disabled or danger state.' },
      { name: 'title', type: 'string', description: 'Optional small heading shown above the item list.' }
    ],
    states: ['Closed', 'Open', 'Danger action'],
    accessibility: [
      'The trigger exposes `aria-haspopup="menu"` and `aria-expanded`, while menu items render with `role="menuitem"`.',
      'Use concise action labels and reserve the danger tone for destructive actions so the list stays scannable.'
    ]
  },
  drawer: {
    props: [
      { name: 'trigger', type: 'ReactElement', required: true, description: 'Element cloned to open the drawer.' },
      { name: 'title', type: 'string', required: true, description: 'Accessible heading inside the drawer panel.' },
      { name: 'description', type: 'string', description: 'Optional supporting copy under the title.' },
      { name: 'children', type: 'ReactNode', description: 'Drawer body content.' }
    ],
    states: ['Closed', 'Open'],
    accessibility: [
      'Drawer uses `role="dialog"` with `aria-modal="true"` and wires title and description ids for the panel.',
      'Dismissal supports close button, overlay click, and Escape to match the standard slide-over interaction.'
    ]
  },
  form: {
    props: [
      { name: 'disabled', type: 'boolean', description: 'Disables every wrapped field through shared form context.' },
      { name: 'submitting', type: 'boolean', description: 'Marks the form as busy and propagates non-interactive state to wrapped fields.' },
      { name: 'onSubmit', type: 'FormEventHandler<HTMLFormElement>', description: 'Uses the native form submit contract.' }
    ],
    states: ['Default', 'Disabled', 'Submitting'],
    accessibility: [
      'Form preserves the native `form` element so submit semantics, keyboard submission, and browser validation hooks remain available.',
      'Disabled and submitting state are propagated through context rather than duplicated on each control.'
    ]
  },
  'form-field': {
    props: [
      { name: 'label', type: 'string', description: 'Visible field label for stacked layout fields.' },
      { name: 'hint', type: 'string', description: 'Supporting guidance connected through aria-describedby.' },
      { name: 'error', type: 'string', description: 'Validation message that also marks the field invalid.' },
      { name: 'required', type: 'boolean', description: 'Adds required semantics and visible required treatment.' },
      { name: 'layout', type: "'stacked' | 'control'", description: 'Uses stacked layout for text controls and control layout for labeled choice controls.' }
    ],
    states: ['Default', 'Required', 'Invalid', 'Disabled'],
    accessibility: [
      'FormField generates and wires label, hint, and error ids so wrapped controls expose consistent aria-labelledby, aria-describedby, and aria-invalid behavior.',
      'Use the control layout for Checkbox, Radio, and Switch so the child component keeps its own visible label without duplicating text.'
    ]
  },
  combobox: {
    props: [
      { name: 'options', type: 'ComboboxOption[]', required: true, description: 'Searchable option set rendered in the listbox.' },
      { name: 'label', type: 'string', description: 'Visible field label when the control is used directly in a form.' },
      { name: 'value', type: 'string', description: 'Controlled selected option value.' },
      { name: 'inputValue', type: 'string', description: 'Controlled query text shown in the input.' },
      { name: 'open', type: 'boolean', description: 'Controlled popup visibility.' },
      { name: 'emptyMessage', type: 'string', description: 'Fallback copy rendered when filtering produces no matching options.' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the user commits a different option.' }
    ],
    states: ['Closed', 'Open', 'Filtered', 'No results', 'Controlled'],
    accessibility: [
      'Combobox keeps the input, popup, and active option linked through combobox, listbox, and option semantics.',
      'Keyboard navigation supports Arrow keys, Enter selection, and Escape dismissal without losing the current query.'
    ]
  },
  command: {
    props: [
      { name: 'options', type: 'CommandOption[]', required: true, description: 'Action rows filtered against the current query.' },
      { name: 'placeholder', type: 'string', description: 'Prompt text shown in the search input.' },
      { name: 'emptyMessage', type: 'string', description: 'Fallback copy rendered when no command matches.' },
      { name: 'open', type: 'boolean', description: 'Controlled panel visibility.' },
      { name: 'inputProps', type: 'InputHTMLAttributes<HTMLInputElement>', description: 'Additional input attributes forwarded to the search field.' },
      { name: 'onSelect', type: '(value: string) => void', description: 'Called when the user chooses a command option.' }
    ],
    states: ['Closed', 'Open', 'Filtered', 'No results', 'Controlled'],
    accessibility: [
      'Command uses combobox and listbox semantics so results remain searchable and keyboard reachable without a pointer.',
      'Disabled actions stay visible but non-interactive, which keeps command palette results predictable during search.'
    ]
  },
  autocomplete: {
    props: [
      { name: 'options', type: 'AutocompleteOption[]', required: true, description: 'Suggestion set exposed after the query threshold is met.' },
      { name: 'minQueryLength', type: 'number', description: 'Minimum number of typed characters required before suggestions appear.' },
      { name: 'label', type: 'string', description: 'Visible field label when used directly in a form.' },
      { name: 'inputValue', type: 'string', description: 'Controlled query text.' },
      { name: 'emptyMessage', type: 'string', description: 'Fallback copy rendered when no suggestions match.' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the user selects a suggestion.' }
    ],
    states: ['Closed', 'Open', 'Waiting for threshold', 'Filtered', 'No results'],
    accessibility: [
      'Autocomplete preserves editable text entry while exposing matching suggestions through a popup listbox.',
      'Selection can be committed with Enter or pointer click, while Escape closes the popup without clearing the field.'
    ]
  },
  popover: {
    props: [
      { name: 'trigger', type: 'ReactElement', required: true, description: 'Element cloned to toggle the surface.' },
      { name: 'content', type: 'ReactNode', required: true, description: 'Popover body content.' },
      { name: 'title', type: 'string', description: 'Optional small heading inside the panel.' },
      { name: 'position', type: "'top' | 'bottom'", description: 'Preferred panel placement relative to the trigger.' },
      { name: 'open', type: 'boolean', description: 'Controlled open state when orchestration is needed.' }
    ],
    states: ['Closed', 'Open', 'Controlled'],
    accessibility: [
      'The trigger reflects open state with `aria-expanded` and points to the panel with `aria-controls`.',
      'Escape and outside click both dismiss the current lightweight implementation.'
    ]
  },
  stack: {
    props: [
      { name: 'direction', type: "'vertical' | 'horizontal'", description: 'Controls layout axis.' },
      { name: 'gap', type: "'sm' | 'md' | 'lg'", description: 'Sets spacing between children.' },
      { name: 'children', type: 'ReactNode', description: 'Items to distribute along the chosen axis.' }
    ],
    states: ['Vertical', 'Horizontal'],
    accessibility: [
      'Stack is layout-only; semantics need to come from the wrapped content rather than the container itself.',
      'Use it to reduce margin spaghetti while preserving DOM order.'
    ]
  },
  switch: {
    props: [
      { name: 'label', type: 'string', required: true, description: 'Visible toggle label.' },
      { name: 'hint', type: 'string', description: 'Optional supporting explanation.' },
      { name: 'error', type: 'string', description: 'Validation message and invalid styling trigger.' }
    ],
    states: ['Off', 'On', 'Disabled', 'Invalid'],
    accessibility: [
      ...commonChoiceAccessibility,
      'The control exposes `role="switch"` so assistive technology announces it as a binary setting toggle.'
    ]
  },
  tabs: {
    props: [
      { name: 'items', type: 'TabsItem[]', required: true, description: 'Ordered tab labels and panel content.' },
      { name: 'defaultTabId', type: 'string', description: 'Initial active tab when the first item should not be the default.' }
    ],
    states: ['First tab active', 'Alternate tab active'],
    accessibility: [
      'Tabs use `tablist`, `tab`, and `tabpanel` roles so the relationship between trigger and panel stays explicit.',
      'Keep tab labels short and peer-level; if one tab label reads like a page title, the pattern is probably wrong.'
    ]
  },
  tooltip: {
    props: [
      { name: 'content', type: 'ReactNode', required: true, description: 'Short helper text shown on hover or focus.' },
      { name: 'children', type: 'ReactElement', required: true, description: 'Single interactive trigger element.' }
    ],
    states: ['Hidden', 'Visible on hover', 'Visible on focus'],
    accessibility: [
      'Tooltip opens on both hover and keyboard focus so keyboard users are not locked out of the hint.',
      'Keep tooltip content supportive and brief; interactive content belongs in Popover instead.'
    ]
  },
  textarea: {
    props: [
      { name: 'label', type: 'string', required: true, description: 'Visible field label.' },
      { name: 'hint', type: 'string', description: 'Optional helper copy for the expected response.' },
      { name: 'error', type: 'string', description: 'Validation state and message.' },
      { name: 'rows', type: 'number', description: 'Initial visible height of the multi-line field.' }
    ],
    states: ['Default', 'Focused', 'Invalid', 'Disabled'],
    accessibility: commonFieldAccessibility
  }
} as const satisfies Record<keyof typeof componentDocContent, ComponentDocMetadata>;

const componentDocKeys = Object.keys(componentDocContent) as Array<keyof typeof componentDocContent>;
const duplicatedSupportSlugs = componentDocKeys.filter(
  (slug) => stableComponentSlugSet.has(slug) && experimentalComponentSlugSet.has(slug)
);
const uncategorizedSupportSlugs = componentDocKeys.filter(
  (slug) => !stableComponentSlugSet.has(slug) && !experimentalComponentSlugSet.has(slug)
);

if (duplicatedSupportSlugs.length > 0) {
  throw new Error(`Component support slugs duplicated across stable and experimental: ${duplicatedSupportSlugs.join(', ')}`);
}

if (uncategorizedSupportSlugs.length > 0) {
  throw new Error(`Component support slugs missing governance classification: ${uncategorizedSupportSlugs.join(', ')}`);
}

function getComponentSupportLevel(slug: keyof typeof componentDocContent): ComponentSupportLevel {
  return stableComponentSlugSet.has(slug) ? 'stable' : 'experimental';
}

function getComponentSupportSummary(level: ComponentSupportLevel) {
  return level === 'stable'
    ? 'Stable surface. This component is part of the current formal Avenra UI support contract.'
    : 'Experimental / in-progress surface. This component is available for evaluation, but its API and support expectations may still change while the contract settles.';
}

function getComponentUsageWithSupportNote(usage: string, level: ComponentSupportLevel) {
  return level === 'stable'
    ? `${usage} This component is part of the current stable support surface.`
    : `${usage} This component is currently experimental / in-progress and may change while the support contract is still settling.`;
}

export const componentDocs = componentDocKeys.reduce(
  (registry, slug) => {
    const support = getComponentSupportLevel(slug);
    const supportSummary = getComponentSupportSummary(support);

    registry[slug] = {
      ...componentDocContent[slug],
      usage: getComponentUsageWithSupportNote(componentDocContent[slug].usage, support),
      sections: [
        {
          title: 'Support status',
          body: supportSummary
        },
        ...componentDocContent[slug].sections
      ],
      ...componentDocMetadata[slug],
      support,
      supportLabel: support === 'stable' ? 'Stable' : 'Experimental',
      supportSummary
    };

    return registry;
  },
  {} as Record<keyof typeof componentDocContent, ComponentDoc>
);

export const componentDocList = Object.values(componentDocs);

export function getComponentDoc(slug: string) {
  return componentDocList.find((item) => item.slug === slug) ?? null;
}

