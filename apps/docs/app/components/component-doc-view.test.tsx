import { render, screen } from '@testing-library/react';
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
    expect(screen.getByRole('button', { name: /publish/i })).toBeInTheDocument();
    expect(screen.getByText('variant')).toBeInTheDocument();
    expect(screen.getByText('Loading', { selector: 'li' })).toBeInTheDocument();
    expect(screen.getAllByText(/import \{ Button \} from '@avenra\/ui';/i)).toHaveLength(2);
    expect(screen.getByRole('link', { name: /next: input/i })).toHaveAttribute(
      'href',
      '/components/input'
    );
  });
});
