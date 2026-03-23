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
