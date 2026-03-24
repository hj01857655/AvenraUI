import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormField } from '../form-field/form-field';
import { TagInput } from './tag-input';

describe('TagInput', () => {
  it('renders label, hint, error, and existing tags accessibly', () => {
    render(
      <TagInput
        id="tech-stack"
        label="Tech stack"
        hint="Press Enter or comma to add a tag"
        error="Add at least one framework"
        defaultValue={['React']}
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Tech stack' });
    const hint = screen.getByText('Press Enter or comma to add a tag');
    const error = screen.getByText('Add at least one framework');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', `${hint.id} ${error.id}`);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove react/i })).toBeInTheDocument();
  });

  it('adds tags with keyboard commits, trims values, and avoids duplicates', () => {
    const onValueChange = vi.fn();

    render(
      <TagInput
        label="Skills"
        defaultValue={['React']}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Skills' });

    fireEvent.change(input, { target: { value: '  TypeScript  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith(['React', 'TypeScript']);
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'GraphQL' } });
    fireEvent.keyDown(input, { key: ',', code: 'Comma' });

    expect(screen.getByText('GraphQL')).toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith(['React', 'TypeScript', 'GraphQL']);

    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getAllByText('React')).toHaveLength(1);
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  it('removes tags with the remove button and Backspace when the input is empty', () => {
    const onValueChange = vi.fn();

    render(
      <TagInput
        label="Labels"
        defaultValue={['Design', 'Accessibility']}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Labels' });

    fireEvent.click(screen.getByRole('button', { name: /remove design/i }));
    expect(screen.queryByText('Design')).not.toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith(['Accessibility']);

    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(screen.queryByText('Accessibility')).not.toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it('inherits disabled field semantics from FormField and blocks tag mutations', () => {
    render(
      <FormField label="Wrapped tags" hint="Disabled from the form shell" disabled>
        <TagInput defaultValue={['Locked']} />
      </FormField>,
    );

    const input = screen.getByRole('textbox', { name: 'Wrapped tags' });
    const removeButton = screen.getByRole('button', { name: /remove locked/i });

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(removeButton).toBeDisabled();

    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(screen.getByText('Locked')).toBeInTheDocument();
  });
});
