import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Select } from './select';

describe('Select', () => {
  it('renders label, hint, and invalid message accessibly', () => {
    render(
      <Select
        id="assignee"
        label="Assignee"
        hint="Choose the teammate responsible"
        error="Assignee is required"
      >
        <option value="">Select an assignee</option>
        <option value="alex">Alex</option>
        <option value="sam">Sam</option>
      </Select>,
    );

    const select = screen.getByLabelText('Assignee');

    expect(select.tagName).toBe('SELECT');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', 'assignee-hint assignee-error');
    expect(screen.getByText('Choose the teammate responsible')).toHaveAttribute(
      'id',
      'assignee-hint',
    );
    expect(screen.getByText('Assignee is required')).toHaveAttribute('id', 'assignee-error');
  });

  it('renders native options for the combobox', () => {
    render(
      <Select id="role" label="Role" defaultValue="editor">
        <option value="viewer">Viewer</option>
        <option value="editor">Editor</option>
        <option value="owner">Owner</option>
      </Select>,
    );

    const select = screen.getByRole('combobox', { name: 'Role' });
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(options.map((option) => option.textContent)).toEqual(['Viewer', 'Editor', 'Owner']);
    expect(select).toHaveValue('editor');
  });

  it("keeps aria-invalid false and doesn't include an error id when valid", () => {
    render(
      <Select id="team" label="Team" hint="Used for routing notifications">
        <option value="design">Design</option>
        <option value="engineering">Engineering</option>
      </Select>,
    );

    const select = screen.getByLabelText('Team');

    expect(select).toHaveAttribute('aria-invalid', 'false');
    expect(select).toHaveAttribute('aria-describedby', 'team-hint');
    expect(screen.getByText('Used for routing notifications')).toHaveAttribute('id', 'team-hint');
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });
});
