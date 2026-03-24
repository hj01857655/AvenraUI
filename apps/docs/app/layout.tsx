import type { Metadata } from 'next';
import '@avenra/ui/src/styles.css';
import './globals.css';
import { SiteShell } from './site-shell';

export const metadata: Metadata = {
  title: {
    default: 'Avenra UI',
    template: '%s | Avenra UI'
  },
  description:
    'Avenra UI docs for adopting the current React component library surface, installation path, theming model, and documented component coverage.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
