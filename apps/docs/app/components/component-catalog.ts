import { componentDocList, type ComponentDoc } from './component-docs';

export interface ComponentCatalogGroupConfig {
  title: string;
  description: string;
}

export interface ComponentCatalogGroup extends ComponentCatalogGroupConfig {
  docs: ComponentDoc[];
  items: string[];
  slugs: ComponentDoc['slug'][];
}

export interface HomepageShowcaseEntry {
  slug: ComponentDoc['slug'];
  title: string;
  summary: string;
  href: string;
}

const componentCatalogGroupConfigs: readonly ComponentCatalogGroupConfig[] = [
  {
    title: 'Actions and navigation',
    description: 'Core controls used to move through product workflows and trigger work.'
  },
  {
    title: 'Forms and input',
    description: 'Input primitives for capture, selection, and inline editing flows.'
  },
  {
    title: 'Feedback and status',
    description: 'Status messaging and progress surfaces for real product states.'
  },
  {
    title: 'Layout and display',
    description: 'Display primitives that help structure dense interfaces cleanly.'
  },
  {
    title: 'Overlay surfaces',
    description: 'Contextual UI for layered actions and supporting information.'
  }
] as const;

function buildComponentCatalogGroups() {
  const groups = componentCatalogGroupConfigs.map((group) => {
    const docs = componentDocList.filter((doc) => doc.category === group.title);

    return {
      ...group,
      docs,
      items: docs.map((doc) => doc.title),
      slugs: docs.map((doc) => doc.slug)
    };
  });

  const knownCategories = new Set(componentCatalogGroupConfigs.map((group) => group.title));
  const unknownCategoryDocs = componentDocList.filter((doc) => !knownCategories.has(doc.category));

  if (unknownCategoryDocs.length > 0) {
    throw new Error(
      `Unknown component doc categories: ${unknownCategoryDocs.map((doc) => `${doc.slug}:${doc.category}`).join(', ')}`
    );
  }

  return groups;
}

export const componentCatalogGroups = buildComponentCatalogGroups();

export const componentGroupDefinitions = componentCatalogGroups.map(({ title, description, slugs }) => ({
  title,
  description,
  items: slugs
}));

export const componentGroups = componentCatalogGroups.map(({ title, description, items }) => ({
  title,
  description,
  items
}));

export const componentCount = componentDocList.length;

const homepageShowcaseSlugs = ['skeleton', 'drawer', 'dropdown-menu', 'tooltip'] as const satisfies readonly ComponentDoc['slug'][];

const componentDocsBySlug = new Map(componentDocList.map((doc) => [doc.slug, doc] as const));

export const homepageShowcaseEntries: HomepageShowcaseEntry[] = homepageShowcaseSlugs.map((slug) => {
  const doc = componentDocsBySlug.get(slug);

  if (!doc) {
    throw new Error(`Missing homepage showcase component doc for slug: ${slug}`);
  }

  return {
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary,
    href: `/components/${doc.slug}`
  };
});
