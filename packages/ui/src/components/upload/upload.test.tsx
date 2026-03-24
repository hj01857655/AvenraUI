import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FormField } from '../form-field/form-field';
import { Upload } from './upload';

describe('Upload', () => {
  it('renders label, hint, error, and preselected files', () => {
    render(
      <Upload
        label="Project files"
        hint="Upload the assets needed for review"
        error="At least one file is required"
        defaultValue={[
          new File(['alpha'], 'brief.pdf', { type: 'application/pdf' }),
          new File(['beta'], 'spec.png', { type: 'image/png' }),
        ]}
      />
    );

    expect(screen.getByRole('button', { name: /project files/i })).toBeInTheDocument();
    expect(screen.getByText(/upload the assets needed for review/i)).toBeInTheDocument();
    expect(screen.getByText(/at least one file is required/i)).toBeInTheDocument();
    expect(screen.getByText('brief.pdf')).toBeInTheDocument();
    expect(screen.getByText('spec.png')).toBeInTheDocument();
  });

  it('adds selected files and removes a chosen file from the list', () => {
    render(<Upload label="Project files" />);

    const input = screen.getByLabelText(/project files/i, { selector: 'input[type="file"]' });
    const firstFile = new File(['alpha'], 'brief.pdf', { type: 'application/pdf' });
    const secondFile = new File(['beta'], 'diagram.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [firstFile, secondFile] } });

    expect(screen.getByText('brief.pdf')).toBeInTheDocument();
    expect(screen.getByText('diagram.png')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /remove brief\.pdf/i }));

    expect(screen.queryByText('brief.pdf')).not.toBeInTheDocument();
    expect(screen.getByText('diagram.png')).toBeInTheDocument();
  });

  it('inherits disabled state from FormField context', () => {
    render(
      <FormField label="Archive files" disabled>
        <Upload />
      </FormField>
    );

    expect(screen.getByRole('button', { name: /archive files/i })).toBeDisabled();
    expect(screen.getByLabelText(/archive files/i, { selector: 'input[type="file"]' })).toBeDisabled();
  });
});
