import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Alert } from './alert';

describe('Alert', () => {
  it('renders title, description and semantic variant classes', () => {
    render(
      <Alert title="Build failed" variant="danger">
        Fix the type error and try again.
      </Alert>,
    );

    const alert = screen.getByRole('alert');

    expect(alert.className).toContain('avenra-alert--danger');
    expect(screen.getByText('Build failed')).toBeInTheDocument();
    expect(screen.getByText('Fix the type error and try again.')).toBeInTheDocument();
  });
});
