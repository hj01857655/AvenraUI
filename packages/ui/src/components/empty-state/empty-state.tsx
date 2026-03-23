import type { HTMLAttributes, ReactNode } from 'react';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, action, children, className, ...props }: EmptyStateProps) {
  return (
    <section className={['avenra-empty-state', className].filter(Boolean).join(' ')} {...props}>
      <div className="avenra-empty-state__content">
        <h2 className="avenra-empty-state__title">{title}</h2>
        {description ? <p className="avenra-empty-state__description">{description}</p> : null}
        {children ? <div className="avenra-empty-state__body">{children}</div> : null}
      </div>
      {action ? <div className="avenra-empty-state__action">{action}</div> : null}
    </section>
  );
}
