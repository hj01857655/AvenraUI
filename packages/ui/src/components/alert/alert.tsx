import type { HTMLAttributes, ReactNode } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  variant?: AlertVariant;
  children?: ReactNode;
}

export function Alert({ title, variant = 'info', children, className, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={['avenra-alert', `avenra-alert--${variant}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      {title ? <h3 className="avenra-alert__title">{title}</h3> : null}
      {children ? <div className="avenra-alert__description">{children}</div> : null}
    </div>
  );
}
