export {
  componentCount,
  componentGroupDefinitions,
  componentGroups
} from './components/component-catalog';

export interface SiteLink {
  href: string;
  label: string;
  description?: string;
}

export interface FeatureCard {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ComponentGroup {
  title: string;
  description: string;
  items: string[];
}

export interface ComponentGroupDefinition {
  title: string;
  description: string;
  items: string[];
}

export interface OrderedPage {
  href: string;
  label: string;
}

export const primaryNavigation: SiteLink[] = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/docs/getting-started', label: 'Getting started' },
  { href: '/docs/installation', label: 'Installation' },
  { href: '/docs/theming', label: 'Theming' }
];

export const featuredLinks: SiteLink[] = [
  {
    href: '/docs/getting-started',
    label: 'Getting started',
    description: 'Understand what Avenra UI is today, who the current docs are for, and how to navigate the repo without guessing.'
  },
  {
    href: '/docs/installation',
    label: 'Installation',
    description: 'See the current package-consumer import shape, local workspace setup, and the commands used to verify the docs and library.'
  },
  {
    href: '/docs/theming',
    label: 'Theming',
    description: 'See how tokens, themes, and component styling layer together, plus what is public today versus still repo-internal.'
  }
];

export const featureCards: FeatureCard[] = [
  {
    eyebrow: 'Adoption entry',
    title: 'The docs now frame Avenra UI as a product surface, not just an internal workspace.',
    description:
      'Home, Getting Started, Installation, and Theming are meant to tell an adopter what the library is, what exists now, and where the current limits still are.'
  },
  {
    eyebrow: 'Current library scope',
    title: 'The visible surface is still foundation-first: common controls before heavier enterprise widgets.',
    description:
      'Buttons, form controls, feedback surfaces, overlays, and layout primitives are documented now. Broader data-heavy components are still intentionally behind them.'
  },
  {
    eyebrow: 'Styling model',
    title: 'Tokens and themes are real packages in the repo, while the consumer-facing story stays centered on the UI package.',
    description:
      'The design-system layers already exist, but the docs stay honest that the strongest entry today is the UI package plus the repo docs, not a fully expanded public theming platform.'
  }
];

export const repositoryFacts = [
  'Current docs entry covers Home, Getting Started, Installation, Theming, and Components',
  'The current consumer import shape is centered on the @avenra/ui package',
  'First-wave foundation components are documented before heavier data widgets',
  'Tokens and themes already exist in the repo as the styling foundation'
] as const;

export const installationSteps = [
  'Choose the package-consumer path if you are evaluating Avenra UI for app adoption; choose the workspace path if you are contributing inside this repository.',
  'Use the package root as the component import surface instead of importing implementation files directly.',
  'Use docs build and focused test commands before calling docs adoption work complete.'
] as const;

export const themingPrinciples = [
  'Treat tokens as the stable contract for color, spacing, radius, shadow, motion, and type.',
  'Use themes to compose semantic meaning on top of those tokens instead of hardcoding values inside components.',
  'Keep app surfaces and the component package aligned by importing the same token and theme layers.',
  'Be explicit about what is public consumer guidance today versus what still exists mainly as repo-internal foundation.'
] as const;

export const commandSnippets = {
  packageInstall: ['pnpm add @avenra/ui react react-dom'],
  packageUsage: [
    "import { Button } from '@avenra/ui';",
    "import '@avenra/ui/styles.css';",
    '',
    'export function Example() {',
    '  return <Button>Ship it</Button>;',
    '}'
  ],
  repoInstall: ['git clone https://github.com/hj01857655/AvenraUI.git', 'cd AvenraUI', 'pnpm install'],
  dev: ['pnpm --filter @avenra/docs dev', 'pnpm --filter @avenra/storybook dev'],
  quality: [
    'pnpm --filter @avenra/docs build',
    'pnpm --filter @avenra/ui build',
    'pnpm --filter @avenra/ui typecheck',
    'pnpm exec vitest run apps/docs/app/page.test.tsx'
  ]
} as const;

export const adoptionChecklist = [
  'Read the docs homepage for current positioning and entry links.',
  'Open Installation for package import shape and local workspace commands.',
  'Use Components to judge the current surface area instead of assuming future scope.',
  'Use Theming to understand the layered styling model before overriding visuals.'
] as const;

export const currentPositioningNotes = [
  'Avenra UI is a React component library and design-system workspace aimed at real product interfaces.',
  'The current outward-facing story is honest about today’s scope: a strong foundation wave, not full product-library completeness yet.',
  'Docs and Storybook are support surfaces for adoption and validation, while packages remain the source of implementation truth.'
] as const;

export const themingLayers = [
  '`packages/tokens` defines the raw CSS variable contract.',
  '`packages/themes` layers semantic theme decisions on top of those variables.',
  '`@avenra/ui` consumes those layers inside the component styles so product surfaces stay visually consistent.'
] as const;

export const themingBoundaryNotes = [
  'The current docs describe the styling model and override approach, not a separate public install story for tokens and themes.',
  'For adopters, the strongest documented entry today is still the UI package and its styles surface.',
  'If you need deeper theming control, treat the repo packages as implementation context rather than assuming every styling layer is already a mature public API.'
] as const;

export const docsPageOrder: OrderedPage[] = [
  { href: '/docs/getting-started', label: 'Getting started' },
  { href: '/docs/installation', label: 'Installation' },
  { href: '/docs/theming', label: 'Theming' }
];

export function getAdjacentPages(currentHref: string) {
  const index = docsPageOrder.findIndex((item) => item.href === currentHref);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? docsPageOrder[index - 1] : null,
    next: index < docsPageOrder.length - 1 ? docsPageOrder[index + 1] : null
  };
}
