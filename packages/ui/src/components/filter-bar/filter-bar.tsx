import { cn } from '@avenra/utils';
import type { HTMLAttributes, ReactNode } from 'react';

export type FilterBarDensity = 'comfortable' | 'compact';

export interface FilterBarProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
  density?: FilterBarDensity;
  sticky?: boolean;
}

export function FilterBar({
  actions,
  children,
  className,
  density = 'comfortable',
  description,
  sticky = false,
  title,
  ...props
}: FilterBarProps) {
  const accessibleName = title ?? props['aria-label'] ?? 'Filters';
  const hasHeader = Boolean(title || description || actions);

  return (
    <section
      {...props}
      role="search"
      aria-label={accessibleName}
      className={cn(
        'avenra-filter-bar',
        density === 'compact' && 'avenra-filter-bar--compact',
        sticky && 'avenra-filter-bar--sticky',
        className,
      )}
    >
      {hasHeader ? (
        <div className="avenra-filter-bar__header">
          <div className="avenra-filter-bar__heading">
            {title ? <h2 className="avenra-filter-bar__title">{title}</h2> : null}
            {description ? <p className="avenra-filter-bar__description">{description}</p> : null}
          </div>
          {actions ? <div className="avenra-filter-bar__actions">{actions}</div> : null}
        </div>
      ) : null}

      <div className="avenra-filter-bar__controls">{children}</div>
    </section>
  );
}
