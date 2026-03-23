import { describe, expect, it } from 'vitest';

import { componentCatalogGroups } from './component-catalog';
import { componentGroupDefinitions, componentGroups } from '../site-content';
import { componentDocList, getComponentDoc } from './component-docs';

describe('component docs registry', () => {
  it('covers every component referenced by the docs navigation catalog', () => {
    const slugs = componentDocList.map((item) => item.slug);
    const expectedSlugs = componentGroupDefinitions.flatMap((group) => group.items);

    expect(slugs).toEqual(expect.arrayContaining(expectedSlugs));
    expect(new Set(slugs).size).toBe(slugs.length);

    expectedSlugs.forEach((slug) => {
      expect(getComponentDoc(slug)).not.toBeNull();
    });
  });

  it('renders navigation group labels from component doc titles', () => {
    const expectedTitles = componentGroupDefinitions.map((group) => ({
      title: group.title,
      description: group.description,
      items: group.items.map((slug) => getComponentDoc(slug)?.title)
    }));

    expect(componentGroups).toEqual(expectedTitles);
  });

  it('exposes structured decision metadata for documented components', () => {
    const buttonDoc = getComponentDoc('button');

    expect(buttonDoc?.props.some((prop) => prop.name === 'variant')).toBe(true);
    expect(buttonDoc?.states).toContain('Loading');
    expect(buttonDoc?.accessibility.length).toBeGreaterThan(0);
  });

  it('includes drawer in the docs registry with overlay flow metadata', () => {
    const drawerDoc = getComponentDoc('drawer');

    expect(drawerDoc).not.toBeNull();
    expect(drawerDoc?.title).toBe('Drawer');
    expect(drawerDoc?.category).toBe('Overlay surfaces');
    expect(drawerDoc?.props.some((prop) => prop.name === 'trigger')).toBe(true);
    expect(drawerDoc?.accessibility).toEqual(
      expect.arrayContaining([expect.stringMatching(/role="dialog"/i)])
    );
  });

  it('includes dropdown-menu in the docs registry with overlay-specific metadata', () => {
    const dropdownMenuDoc = getComponentDoc('dropdown-menu');

    expect(dropdownMenuDoc).not.toBeNull();
    expect(dropdownMenuDoc?.title).toBe('Dropdown Menu');
    expect(dropdownMenuDoc?.category).toBe('Overlay surfaces');
    expect(dropdownMenuDoc?.props.some((prop) => prop.name === 'items')).toBe(true);
    expect(dropdownMenuDoc?.accessibility).toEqual(
      expect.arrayContaining([expect.stringMatching(/aria-haspopup="menu"/i)])
    );
  });

  it('builds catalog groups from the documented components without gaps or duplicates', () => {
    const catalogSlugs = componentCatalogGroups.flatMap((group) => group.slugs);
    const catalogGroupTitles = componentCatalogGroups.map((group) => group.title);

    expect(catalogSlugs).toHaveLength(componentDocList.length);
    expect(new Set(catalogSlugs).size).toBe(componentDocList.length);
    expect(catalogSlugs.slice().sort()).toEqual(componentDocList.map((doc) => doc.slug).slice().sort());
    expect(catalogGroupTitles).toEqual(componentGroupDefinitions.map((group) => group.title));
  });
});
