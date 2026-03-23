import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders an image when src and alt are provided', () => {
    render(<Avatar src="https://example.com/avatar.png" alt="Avenra User" size="lg" />);

    const avatar = screen.getByRole('img', { name: 'Avenra User' });

    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.png');
    expect(avatar.className).toContain('avenra-avatar--lg');
  });

  it('falls back to initials when no image source is provided', () => {
    render(<Avatar name="Avenra UI" />);

    const fallback = screen.getByText('AU');

    expect(fallback.className).toContain('avenra-avatar__fallback');
    expect(fallback.parentElement?.className).toContain('avenra-avatar--md');
  });

  it('supports a neutral placeholder when no name is available', () => {
    render(<Avatar size="sm" />);

    const fallback = screen.getByText('?');

    expect(fallback.parentElement?.className).toContain('avenra-avatar--sm');
  });
});
