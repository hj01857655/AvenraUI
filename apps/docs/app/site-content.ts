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
    description: 'Understand how the monorepo is structured and where each package fits.'
  },
  {
    href: '/docs/installation',
    label: 'Installation',
    description: 'Install dependencies, boot the apps, and run the main workspace commands.'
  },
  {
    href: '/docs/theming',
    label: 'Theming',
    description: 'See how tokens, themes, and component styling are meant to layer together.'
  }
];

export const featureCards: FeatureCard[] = [
  {
    eyebrow: 'System foundation',
    title: 'Tokens, themes, docs, and components are being built as one stack.',
    description:
      'The repository is shaping the design-system core first so the library can scale without renaming or restructuring later.'
  },
  {
    eyebrow: 'Current delivery mode',
    title: 'High-frequency product primitives ship before heavier widgets.',
    description:
      'Buttons, form controls, feedback components, overlays, and layout primitives are the current focus before large data components.'
  },
  {
    eyebrow: 'Developer workflow',
    title: 'Docs and Storybook are first-class surfaces, not afterthoughts.',
    description:
      'The goal is for each component to have a clear implementation path, preview path, and documentation path from the start.'
  }
];

export const repositoryFacts = [
  'Monorepo managed with pnpm workspaces',
  'Next.js app for docs and Storybook app for isolated component work',
  'TypeScript-first package structure with shared configs',
  'Design tokens and themes separated from the component package'
] as const;

export const installationSteps = [
  'Clone the repository and install workspace dependencies with pnpm.',
  'Run the docs app and Storybook together during development.',
  'Use workspace-level build, lint, test, and typecheck commands before shipping changes.'
] as const;

export const themingPrinciples = [
  'Treat tokens as the stable contract for color, spacing, radius, shadow, motion, and type.',
  'Use themes to compose semantic meaning on top of those tokens instead of hardcoding values inside components.',
  'Keep app surfaces and the component package aligned by importing the same token and theme layers.'
] as const;

export const commandSnippets = {
  install: ['git clone https://github.com/hj01857655/AvenraUI.git', 'cd AvenraUI', 'pnpm install'],
  dev: ['pnpm dev', 'pnpm --filter @avenra/docs dev', 'pnpm --filter @avenra/storybook dev'],
  quality: ['pnpm build', 'pnpm lint', 'pnpm test', 'pnpm typecheck']
} as const;

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
