import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { experimentalComponentSlugs, stableComponentSlugs } from '../../docs/app/components/component-docs';

type StorybookSurfaceEntry = {
  fileName: string;
  title: string;
  slugs: string[];
};

const plannedStorybookSurfaceEntries: StorybookSurfaceEntry[] = [
  {
    fileName: 'advanced-search-bar-experimental.stories.tsx',
    title: 'Components/Forms and Input/Experimental/Advanced Search Bar',
    slugs: []
  },
  {
    fileName: 'advanced-table-experimental.stories.tsx',
    title: 'Components/Data and Tables/Experimental/Advanced Table',
    slugs: []
  }
];

const storybookSurfaceEntries: StorybookSurfaceEntry[] = [
  {
    fileName: 'data-grid-experimental.stories.tsx',
    title: 'Components/Data and Tables/Experimental/Data Grid',
    slugs: ['data-grid']
  },
  {
    fileName: 'button.stories.tsx',
    title: 'Components/Actions and Navigation/Button',
    slugs: ['button']
  },
  {
    fileName: 'actions-navigation.stories.tsx',
    title: 'Components/Actions and Navigation/Stable Overview',
    slugs: ['breadcrumb', 'icon-button', 'steps', 'tabs']
  },
  {
    fileName: 'feedback-status.stories.tsx',
    title: 'Components/Feedback and Status/Stable Overview',
    slugs: ['alert', 'avatar', 'badge', 'empty-state', 'progress']
  },
  {
    fileName: 'forms-input.stories.tsx',
    title: 'Components/Forms and Input/Stable Overview',
    slugs: ['checkbox', 'input', 'radio', 'select', 'switch', 'textarea']
  },
  {
    fileName: 'layout-overlay.stories.tsx',
    title: 'Components/Layout and Overlay/Stable Overview',
    slugs: ['card', 'dialog', 'inline', 'popover', 'stack', 'table', 'tooltip']
  },
  {
    fileName: 'forms-input-experimental-search.stories.tsx',
    title: 'Components/Forms and Input/Experimental/Search and Selection',
    slugs: ['autocomplete', 'cascader', 'combobox', 'command', 'multi-select', 'tag-input']
  },
  {
    fileName: 'forms-input-experimental-date.stories.tsx',
    title: 'Components/Forms and Input/Experimental/Date Inputs',
    slugs: ['date-picker', 'date-range-picker']
  },
  {
    fileName: 'filter-bar-experimental.stories.tsx',
    title: 'Components/Forms and Input/Experimental/Filter Bar',
    slugs: ['filter-bar']
  },
  {
    fileName: 'forms-input-experimental-form-shell.stories.tsx',
    title: 'Components/Forms and Input/Experimental/Form Shell',
    slugs: ['form', 'form-field', 'upload']
  },
  {
    fileName: 'overlay-experimental.stories.tsx',
    title: 'Components/Overlay Surfaces/Experimental',
    slugs: ['drawer', 'dropdown-menu']
  },
  {
    fileName: 'feedback-experimental.stories.tsx',
    title: 'Components/Feedback and Status/Experimental',
    slugs: ['skeleton', 'toast']
  },
  {
    fileName: 'navigation-display-experimental.stories.tsx',
    title: 'Components/Navigation and Display/Experimental Overview',
    slugs: ['pagination', 'tree']
  }
];

const storyDirectory = path.dirname(fileURLToPath(import.meta.url));
const actualStoryFiles = readdirSync(storyDirectory)
  .filter((fileName) => fileName.endsWith('.stories.tsx'))
  .sort();

const stableSlugSet = new Set<string>(stableComponentSlugs);
const experimentalSlugSet = new Set<string>(experimentalComponentSlugs);
const allStorybookSurfaceEntries = [...storybookSurfaceEntries, ...plannedStorybookSurfaceEntries];
const governedSlugs = storybookSurfaceEntries.flatMap((entry) => entry.slugs);

function readStorySource(fileName: string) {
  return readFileSync(path.join(storyDirectory, fileName), 'utf8');
}

describe('storybook surface coverage governance', () => {
  it('keeps the governed story file list aligned with the checked-in stories', () => {
    const expectedFiles = allStorybookSurfaceEntries.map((entry) => entry.fileName).sort();

    expect(actualStoryFiles).toEqual(expectedFiles);
  });

  it('keeps story titles aligned with the governance registry', () => {
    for (const entry of allStorybookSurfaceEntries) {
      const source = readStorySource(entry.fileName);

      expect(source).toContain(`title: '${entry.title}'`);
      expect(entry.title.startsWith('Components/')).toBe(true);
    }
  });

  it('covers every public docs component exactly once across the governed stories', () => {
    const docsSlugs = [...stableComponentSlugs, ...experimentalComponentSlugs].slice().sort();
    const governedSortedSlugs = governedSlugs.slice().sort();

    expect(new Set(governedSlugs).size).toBe(governedSlugs.length);
    expect(governedSortedSlugs).toEqual(docsSlugs);
  });

  it('does not mix stable and experimental components inside the same governed story file', () => {
    for (const entry of storybookSurfaceEntries) {
      const stableCount = entry.slugs.filter((slug) => stableSlugSet.has(slug)).length;
      const experimentalCount = entry.slugs.filter((slug) => experimentalSlugSet.has(slug)).length;

      expect(stableCount === 0 || experimentalCount === 0).toBe(true);
    }
  });

  it('uses stable-overview naming for grouped stable surfaces and experimental naming for experimental groups', () => {
    for (const entry of storybookSurfaceEntries) {
      if (entry.slugs.length > 1 && entry.slugs.every((slug) => stableSlugSet.has(slug))) {
        expect(entry.title.endsWith('/Stable Overview')).toBe(true);
      }

      if (entry.slugs.some((slug) => experimentalSlugSet.has(slug))) {
        expect(entry.title.includes('/Experimental')).toBe(true);
      }
    }
  });

  it('keeps planned surfaces outside the docs-governed public component set until the component line lands', () => {
    for (const entry of plannedStorybookSurfaceEntries) {
      expect(entry.slugs).toEqual([]);
    }
  });

  it('registers real storybook coverage for filter bar instead of leaving it as a planned surface', () => {
    const filterBarEntry = storybookSurfaceEntries.find((entry) => entry.fileName === 'filter-bar-experimental.stories.tsx');

    expect(filterBarEntry).toBeDefined();
    expect(filterBarEntry?.slugs).toEqual(['filter-bar']);
  });

  it('covers steps inside the grouped actions and navigation stable surface', () => {
    const actionsNavigationEntry = storybookSurfaceEntries.find((entry) => entry.fileName === 'actions-navigation.stories.tsx');

    expect(actionsNavigationEntry?.slugs).toContain('steps');
  });
});
