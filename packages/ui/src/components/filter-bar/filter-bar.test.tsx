import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from '../button/button';
import { DateRangePicker } from '../date-range-picker/date-range-picker';
import { Input } from '../input/input';
import { MultiSelect } from '../multi-select/multi-select';
import { Select } from '../select/select';
import { FilterBar } from './filter-bar';

describe('FilterBar', () => {
  it('renders heading, description, controls, and actions inside a search region', () => {
    render(
      <FilterBar
        title="Release filters"
        description="Narrow the delivery board by team, status, and launch range."
        actions={<Button variant="secondary">Reset filters</Button>}
      >
        <Input aria-label="Search releases" placeholder="Search releases" />
        <Select aria-label="Status" defaultValue="review">
          <option value="review">In review</option>
          <option value="ready">Ready</option>
        </Select>
      </FilterBar>,
    );

    const region = screen.getByRole('search', { name: /release filters/i });

    expect(screen.getByRole('heading', { level: 2, name: /release filters/i })).toBeInTheDocument();
    expect(screen.getByText(/narrow the delivery board/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset filters/i })).toBeInTheDocument();
    expect(region).toContainElement(screen.getByRole('textbox', { name: /search releases/i }));
    expect(region).toContainElement(screen.getByRole('combobox', { name: /status/i }));
  });

  it('supports compact and sticky presentation for dense workflows', () => {
    render(
      <FilterBar title="Compact filters" density="compact" sticky actions={<Button>Apply</Button>}>
        <MultiSelect
          aria-label="Teams"
          options={[
            { value: 'design', label: 'Design' },
            { value: 'platform', label: 'Platform' },
          ]}
          defaultValue={['design']}
        />
        <DateRangePicker aria-label="Launch window" defaultValue={{ start: '2026-03-18', end: '2026-03-24' }} />
      </FilterBar>,
    );

    expect(screen.getByRole('search', { name: /compact filters/i })).toHaveClass(
      'avenra-filter-bar--compact',
      'avenra-filter-bar--sticky',
    );
    expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
  });

  it('still renders a search region without a visible header', () => {
    render(
      <FilterBar aria-label="Standalone filters">
        <Input aria-label="Search" />
      </FilterBar>,
    );

    expect(screen.getByRole('search', { name: /standalone filters/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
