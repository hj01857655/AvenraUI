import { HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ className, items, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={['avenra-breadcrumb', className].filter(Boolean).join(' ')} {...props}>
      <ol className="avenra-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${index}-${String(item.label)}`} className="avenra-breadcrumb__item">
              {item.href && !isLast ? (
                <a href={item.href} className="avenra-breadcrumb__link">
                  {item.label}
                </a>
              ) : (
                <span className="avenra-breadcrumb__current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span className="avenra-breadcrumb__separator">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
