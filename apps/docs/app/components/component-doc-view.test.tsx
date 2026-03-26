import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ComponentDocView } from './component-doc-view';
import { componentDocs } from './component-docs';

describe('ComponentDocView', () => {
  it('renders live preview, example code, and pager links for a component doc', () => {
    render(<ComponentDocView doc={componentDocs.button} previous={null} next={componentDocs.input} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /button/i
      })
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: /preview/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /props/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /accessibility/i })).toBeInTheDocument();
    expect(screen.getAllByText(/stable/i, { selector: '.avenra-badge' }).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/current formal Avenra UI support contract/i).length
    ).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /publish/i })).toBeInTheDocument();
    expect(screen.getByText('variant')).toBeInTheDocument();
    expect(screen.getByText('Loading', { selector: 'li' })).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ Button \} from '@avenra\/ui';/i)).toHaveLength(2);
    expect(screen.getByRole('link', { name: /next: input/i })).toHaveAttribute(
      'href',
      '/components/input'
    );
  });

  it('renders dropdown-menu documentation with example import and preview trigger', () => {
    render(
      <ComponentDocView
        doc={componentDocs['dropdown-menu']}
        previous={componentDocs.dialog}
        next={componentDocs.drawer}
      />
    );

    expect(screen.getByRole('heading', { level: 1, name: /dropdown menu/i })).toBeInTheDocument();
    expect(
      screen.getAllByText(/import \{ Button, DropdownMenu \} from '@avenra\/ui';/i)
    ).toHaveLength(1);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    expect(screen.getByText('items')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /previous: dialog/i })).toHaveAttribute(
      'href',
      '/components/dialog'
    );
    expect(screen.getByRole('link', { name: /next: drawer/i })).toHaveAttribute(
      'href',
      '/components/drawer'
    );
  });

  it('renders drawer documentation with example import and preview trigger', () => {
    render(
      <ComponentDocView doc={componentDocs.drawer} previous={componentDocs['dropdown-menu']} next={componentDocs.popover} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /drawer/i })).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ Button, Drawer \} from '@avenra\/ui';/i)).toHaveLength(1);
    const dialog = screen.getByRole('dialog', { name: /workspace settings/i });

    expect(within(dialog).getByRole('button', { name: /close drawer/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/update access and notification preferences/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /previous: dropdown menu/i })).toHaveAttribute(
      'href',
      '/components/dropdown-menu'
    );
    expect(screen.getByRole('link', { name: /next: popover/i })).toHaveAttribute(
      'href',
      '/components/popover'
    );
  });

  it('renders live preview states for overlay and feedback docs instead of only code samples', () => {
    render(
      <ComponentDocView doc={componentDocs['dropdown-menu']} previous={componentDocs.dialog} next={componentDocs.drawer} />
    );

    expect(screen.getByRole('menuitem', { name: /duplicate workspace/i })).toBeDisabled();
    expect(screen.getByRole('menuitem', { name: /archive workspace/i })).toBeInTheDocument();

    cleanup();

    render(
      <ComponentDocView doc={componentDocs.toast} previous={componentDocs.skeleton} next={componentDocs.radio} />
    );

    expect(screen.getByRole('region', { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /push info toast/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /push error toast/i })).toBeInTheDocument();
    expect(screen.getByRole('alert', { name: /publish failed/i })).toBeInTheDocument();
  });

  it('renders pagination docs with both a dense range example and a boundary state preview', () => {
    render(
      <ComponentDocView doc={componentDocs.pagination} previous={componentDocs.progress} next={componentDocs.skeleton} />
    );

    const resultsPages = screen.getByRole('navigation', { name: /results pages/i });
    const reviewPages = screen.getByRole('navigation', { name: /review queue pages/i });

    expect(within(resultsPages).getAllByText('…')).toHaveLength(2);
    expect(within(resultsPages).getByRole('button', { name: 'Page 6' })).toHaveAttribute('aria-current', 'page');
    expect(within(reviewPages).getByRole('button', { name: /previous page/i })).toBeDisabled();
    expect(within(reviewPages).getByRole('button', { name: /next page/i })).not.toBeDisabled();
  });

  it('renders live preview states for selection docs without drifting from the current docs previews', () => {
    render(
      <ComponentDocView doc={componentDocs.autocomplete} previous={componentDocs.command} next={componentDocs['empty-state']} />
    );

    expect(screen.getByRole('combobox', { name: /^country$/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type 2\+ characters/i)).toBeInTheDocument();

    cleanup();

    render(
      <ComponentDocView doc={componentDocs.select} previous={componentDocs.radio} next={componentDocs.stack} />
    );

    expect(screen.getByRole('combobox', { name: /^role$/i })).toBeInTheDocument();

    cleanup();

    render(
      <ComponentDocView doc={componentDocs.checkbox} previous={componentDocs.card} next={componentDocs.combobox} />
    );

    expect(screen.getByRole('checkbox', { name: /lock audit exports/i })).toBeDisabled();

    cleanup();

    render(
      <ComponentDocView doc={componentDocs.switch} previous={componentDocs.stack} next={componentDocs.tabs} />
    );

    expect(screen.getByRole('switch', { name: /readonly sync/i })).toBeDisabled();
  });

  it('renders tag input docs with live tags and remove actions in the preview', () => {
    render(
      <ComponentDocView doc={componentDocs['tag-input']} previous={componentDocs.switch} next={componentDocs.textarea} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /tag input/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /project tags/i })).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove design system/i })).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ TagInput \} from '@avenra\/ui';/i)).toHaveLength(2);
  });

  it('renders multi select docs with selected chips and a live listbox preview', () => {
    render(
      <ComponentDocView doc={componentDocs['multi-select']} previous={componentDocs.input} next={componentDocs.radio} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /multi select/i })).toBeInTheDocument();
    const input = screen.getByRole('combobox', { name: /frameworks/i });
    expect(input).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove vue/i })).toBeInTheDocument();
    fireEvent.focus(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ MultiSelect \} from '@avenra\/ui';/i)).toHaveLength(2);
  });

  it('renders date picker docs with a live open calendar preview', () => {
    render(
      <ComponentDocView doc={componentDocs['date-picker']} previous={componentDocs.command} next={componentDocs.dialog} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /date picker/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /release date/i })).toHaveValue('Mar 18, 2026');
    expect(screen.getByRole('dialog', { name: /choose date/i })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: /wednesday, march 18, 2026/i })).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ DatePicker \} from '@avenra\/ui';/i)).toHaveLength(2);
  });

  it('renders date range picker docs with a live selected range preview', () => {
    render(
      <ComponentDocView
        doc={componentDocs['date-range-picker']}
        previous={componentDocs['date-picker']}
        next={componentDocs.dialog}
      />
    );

    expect(screen.getByRole('heading', { level: 1, name: /date range picker/i })).toBeInTheDocument();
    expect(screen.getByText(/experimental \/ in-progress/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /launch window/i })).toHaveValue('Mar 18, 2026 — Mar 24, 2026');
    expect(screen.getByRole('dialog', { name: /choose date range/i })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: /wednesday, march 18, 2026/i })).toBeInTheDocument();
    expect(screen.getByRole('gridcell', { name: /tuesday, march 24, 2026/i })).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ DateRangePicker \} from '@avenra\/ui';/i)).toHaveLength(2);
  });

  it('renders steps docs with horizontal and vertical progress previews', () => {
    render(
      <ComponentDocView doc={componentDocs.steps} previous={componentDocs.switch} next={componentDocs.tabs} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /steps/i })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /progress steps/i })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /onboarding progress/i })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')[1]).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText(/invite teammates/i)).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ Steps \} from '@avenra\/ui';/i)).toHaveLength(2);
  });

  it('renders table docs with a live data grid preview and empty state example', () => {
    render(
      <ComponentDocView doc={componentDocs.table} previous={componentDocs.tabs} next={componentDocs.textarea} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /table/i })).toBeInTheDocument();
    const table = screen.getByRole('table', { name: /release readiness/i });
    expect(screen.getByRole('button', { name: /sort by release/i })).toBeInTheDocument();
    expect(within(table).getAllByRole('rowheader')[0]).toHaveTextContent(/april update/i);
    expect(within(table).getByRole('columnheader', { name: /release/i })).toBeInTheDocument();
    expect(within(table).getByRole('cell', { name: /ready/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /no empty preview rows/i })).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ Table \} from '@avenra\/ui';/i)).toHaveLength(2);
  });

  it('renders data grid docs with richer cell layout and empty state preview', () => {
    render(
      <ComponentDocView doc={componentDocs['data-grid']} previous={componentDocs.table} next={componentDocs.textarea} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /data grid/i })).toBeInTheDocument();
    const grid = screen.getByRole('table', { name: /release delivery matrix/i });
    expect(within(grid).getByRole('rowheader', { name: /billing alerts/i })).toHaveTextContent(/workspace notifications/i);
    expect(within(grid).getByRole('cell', { name: /blocked waiting on qa sign-off/i })).toBeInTheDocument();
    expect(within(grid).getByRole('cell', { name: /64% 3 open issues/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /no archived delivery rows/i })).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ DataGrid \} from '@avenra\/ui';/i)).toHaveLength(2);
  });

  it('renders upload docs with a live selected file list preview', () => {
    render(
      <ComponentDocView doc={componentDocs.upload} previous={componentDocs.tooltip} next={componentDocs['empty-state']} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /upload/i })).toBeInTheDocument();
    expect(screen.queryByText(/experimental \/ in-progress/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /project files/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove preview\.png/i })).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ Upload \} from '@avenra\/ui';/i)).toHaveLength(2);
  });

  it('renders tree docs with a live hierarchical preview', () => {
    render(
      <ComponentDocView doc={componentDocs.tree} previous={componentDocs.upload} next={componentDocs['empty-state']} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /tree/i })).toBeInTheDocument();
    expect(screen.getByRole('tree', { name: /content structure/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^workspace$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^design system$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /assets/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /guides/i }).closest('[role="treeitem"]')).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getAllByText(/import \{ Tree \} from '@avenra\/ui';/i)).toHaveLength(2);
  });

  it('renders cascader docs with a live selected path preview', () => {
    render(
      <ComponentDocView doc={componentDocs.cascader} previous={componentDocs.tree} next={componentDocs.upload} />
    );

    expect(screen.getByRole('heading', { level: 1, name: /cascader/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /location/i })).toBeInTheDocument();
    expect(screen.getByText(/workspace \/ guides \/ api/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^assets$/i })).toBeDisabled();
    expect(screen.getAllByText(/import \{ Cascader \} from '@avenra\/ui';/i)).toHaveLength(2);
  });
});

