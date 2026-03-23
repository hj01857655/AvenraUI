import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { IconButton } from './icon-button';

describe('IconButton', () => {
  it('requires an accessible name for icon-only buttons', () => {
    expect(() =>
      render(
        <IconButton
          icon={<svg aria-hidden="true" data-testid="search-icon" viewBox="0 0 16 16" />}
        />,
      ),
    ).toThrow('IconButton requires an aria-label when used without visible text.');
  });

  it('uses aria-label as the accessible name for icon-only buttons', () => {
    render(
      <IconButton
        aria-label="Search"
        icon={<svg aria-hidden="true" data-testid="search-icon" viewBox="0 0 16 16" />}
      />,
    );

    const button = screen.getByRole('button', { name: 'Search' });

    expect(button).toHaveAttribute('aria-label', 'Search');
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('disables interaction and shows loading state when loading is true', () => {
    render(
      <IconButton
        aria-label="Refresh"
        icon={<svg aria-hidden="true" data-testid="refresh-icon" viewBox="0 0 16 16" />}
        loading
      />,
    );

    const button = screen.getByRole('button', { name: 'Refresh' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText((_, element) => element?.classList.contains('avenra-icon-button__spinner') ?? false)).toBeInTheDocument();
    expect(screen.queryByTestId('refresh-icon')).not.toBeInTheDocument();
  });

  it('keeps disabled buttons disabled even when not loading', () => {
    render(
      <IconButton
        aria-label="Delete"
        disabled
        icon={<svg aria-hidden="true" data-testid="delete-icon" viewBox="0 0 16 16" />}
      />,
    );

    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });

  it('applies variant and size classes for styling hooks', () => {
    render(
      <IconButton
        aria-label="Preview"
        icon={<svg aria-hidden="true" data-testid="preview-icon" viewBox="0 0 16 16" />}
        size="lg"
        variant="secondary"
      />,
    );

    const button = screen.getByRole('button', { name: 'Preview' });

    expect(button.className).toContain('avenra-button--secondary');
    expect(button.className).toContain('avenra-icon-button--lg');
  });

  it('renders a passed icon node alongside visible button text', () => {
    render(
      <IconButton icon={<svg aria-hidden="true" data-testid="leading-icon" viewBox="0 0 16 16" />}>
        Edit profile
      </IconButton>,
    );

    const button = screen.getByRole('button', { name: 'Edit profile' });

    expect(button).toBeEnabled();
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
    expect(screen.getByText('Edit profile')).toHaveClass('avenra-icon-button__label');
  });
});
