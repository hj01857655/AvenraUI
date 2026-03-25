import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormField } from '../form-field/form-field';
import { Cascader, type CascaderOption } from './cascader';

const options: CascaderOption[] = [
  {
    value: 'workspace',
    label: 'Workspace',
    children: [
      {
        value: 'guides',
        label: 'Guides',
        children: [
          { value: 'api', label: 'API' },
          { value: 'design', label: 'Design' },
        ],
      },
      {
        value: 'ops',
        label: 'Operations',
        children: [{ value: 'deploy', label: 'Deploy' }],
      },
      {
        value: 'assets',
        label: 'Assets',
        disabled: true,
      },
    ],
  },
];

describe('Cascader', () => {
  it('renders field copy and the committed path label', () => {
    render(
      <Cascader
        label="Location"
        hint="Choose the section to edit"
        error="Selection is required"
        options={options}
        defaultValue={['workspace', 'guides', 'api']}
      />
    );

    expect(screen.getByRole('button', { name: /location/i })).toBeInTheDocument();
    expect(screen.getByText(/choose the section to edit/i)).toBeInTheDocument();
    expect(screen.getByText(/selection is required/i)).toBeInTheDocument();
    expect(screen.getByText(/workspace \/ guides \/ api/i)).toBeInTheDocument();
  });

  it('supports step-by-step selection and ignores disabled options', () => {
    const onValueChange = vi.fn();

    render(<Cascader label="Location" options={options} onValueChange={onValueChange} />);

    fireEvent.click(screen.getByRole('button', { name: /location/i }));
    fireEvent.click(screen.getByRole('button', { name: /^workspace$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^guides$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^api$/i }));

    expect(onValueChange).toHaveBeenCalledWith(['workspace', 'guides', 'api']);
    expect(screen.getByText(/workspace \/ guides \/ api/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /location/i }));
    fireEvent.click(screen.getByRole('button', { name: /^workspace$/i }));
    expect(screen.getByRole('button', { name: /^assets$/i })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /^assets$/i }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('inherits disabled state from FormField context', () => {
    render(
      <FormField label="Location" disabled>
        <Cascader options={options} />
      </FormField>
    );

    const trigger = screen.getByRole('button', { name: /location/i });
    expect(trigger).toBeDisabled();
    fireEvent.click(trigger);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
