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

const storybookSurfaceEntries: StorybookSurfaceEntry[] = [
  { fileName: 'button.stories.tsx', title: 'Components/Button', slugs: ['button'] },
  {
    fileName: 'actions-navigation.stories.tsx',
    title: 'Components/Actions & Navigation',
    slugs: ['breadcrumb', 'icon-button', 'tabs']
  },
  {
    fileName: 'feedback-status.stories.tsx',
    title: 'Components/Feedback & Status',
    slugs: ['alert', 'avatar', 'badge', 'empty-state', 'progress']
  },
  {
    fileName: 'forms-input.stories.tsx',
    title: 'Components/Forms and Input',
    slugs: ['checkbox', 'input', 'radio', 'select', 'switch', 'textarea']
  },
  {
    fileName: 'layout-overlay.stories.tsx',
    title: 'Components/Layout & Overlay',
    slugs: ['card', 'dialog', 'inline', 'popover', 'stack', 'table', 'tooltip']
  },
  {
    fileName: 'forms-input-experimental-search.stories.tsx',
    title: 'Components/Forms and Input/Experimental Search & Selection',
    slugs: ['autocomplete', 'cascader', 'combobox', 'command', 'multi-select', 'tag-input']
  },
  {
    fileName: 'forms-input-experimental-date.stories.tsx',
    title: 'Components/Forms and Input/Experimental Date Inputs',
    slugs: ['date-picker', 'date-range-picker']
  },
  {
    fileName: 'forms-input-experimental-form-shell.stories.tsx',
    title: 'Components/Forms and Input/Experimental Form Shell',
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
    title: 'Components/Navigation and Display/Experimental',
    slugs: ['pagination', 'tree']
  }
];

const storyDirectory = path.dirname(fileURLToPath(import.meta.url));
const actualStoryFiles = readdirSync(storyDirectory)
  .filter((fileName) => fileName.endsWith('.stories.tsx'))
  .sort();

const stableSlugSet = new Set<string>(stableComponentSlugs);
const experimentalSlugSet = new Set<string>(experimentalComponentSlugs);
const governedSlugs = storybookSurfaceEntries.flatMap((entry) => entry.slugs);

function readStorySource(fileName: string) {
  return readFileSync(path.join(storyDirectory, fileName), 'utf8');
}

describe('storybook surface coverage governance', () => {
  it('keeps the governed story file list aligned with the checked-in stories', () => {
    const expectedFiles = storybookSurfaceEntries.map((entry) => entry.fileName).sort();

    expect(actualStoryFiles).toEqual(expectedFiles);
  });

  it('keeps story titles aligned with the governance registry', () => {
    for (const entry of storybookSurfaceEntries) {
      const source = readStorySource(entry.fileName);

      expect(source).toContain(`title: '${entry.title}'`);
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
});
