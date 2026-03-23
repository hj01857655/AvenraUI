import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ComponentDocView } from './component-doc-view';
import { componentDocs } from './component-docs';

describe('ComponentDocView', () => {
  it('renders example code and pager links for a component doc', () => {
    render(<ComponentDocView doc={componentDocs.button} previous={null} next={componentDocs.input} />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /button/i
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/import \{ Button \} from '@avenra\/ui';/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /next: input/i })).toHaveAttribute(
      'href',
      '/components/input'
    );
  });
});
