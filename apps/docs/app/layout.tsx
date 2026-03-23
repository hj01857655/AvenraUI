import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Avenra UI',
  description: 'React-first component library and design system platform.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
