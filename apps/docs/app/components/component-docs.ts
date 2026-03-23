export interface ComponentDocSection {
  title: string;
  body: string;
}

export interface ComponentDoc {
  slug: string;
  title: string;
  packageImport: string;
  category: string;
  summary: string;
  usage: string;
  exampleCode: string;
  sections: ComponentDocSection[];
}

export const componentDocs = {
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
  }
} as const satisfies Record<string, ComponentDoc>;

export const componentDocList = Object.values(componentDocs);

export function getComponentDoc(slug: string) {
  return componentDocList.find((item) => item.slug === slug) ?? null;
}
