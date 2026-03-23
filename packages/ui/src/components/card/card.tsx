import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  interactive?: boolean;
  children?: ReactNode;
}

export function Card({
  title,
  description,
  actions,
  interactive = false,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <article
      className={['avenra-card', interactive && 'avenra-card--interactive', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {(title || actions) && (
        <header className="avenra-card__header">
          {title ? <h3 className="avenra-card__title">{title}</h3> : null}
          {actions ? <div className="avenra-card__actions">{actions}</div> : null}
        </header>
      )}

      {description ? <p className="avenra-card__description">{description}</p> : null}
      {children ? <div className="avenra-card__body">{children}</div> : null}
    </article>
  );
}
