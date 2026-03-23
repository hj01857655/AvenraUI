import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import { primaryNavigation } from './site-content';
import { SiteNav } from './site-nav';

export function SiteShell({ children }: PropsWithChildren) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="site-brand" aria-label="Avenra UI home">
            <span className="site-brand__mark">AV</span>
            <span className="site-brand__copy">
              <strong>Avenra UI</strong>
              <span>React UI library and design system</span>
            </span>
          </Link>

          <SiteNav />

          <a
            className="site-header__repo"
            href="https://github.com/hj01857655/AvenraUI"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <p className="site-footer__eyebrow">Avenra UI</p>
            <p className="site-footer__text">
              A React-first design system workspace focused on a solid foundation before scale.
            </p>
          </div>
          <div className="site-footer__links">
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
