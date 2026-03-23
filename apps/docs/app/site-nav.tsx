'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { primaryNavigation } from './site-content';

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname() ?? '/';

  return (
    <nav className="site-nav" aria-label="Primary">
      {primaryNavigation.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`site-nav__link${active ? ' site-nav__link--active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
