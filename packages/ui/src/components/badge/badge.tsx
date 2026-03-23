import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export function Badge({ children, variant = 'neutral', size = 'md', className, ...props }: BadgeProps) {
  return (
    <span
      className={[
        'avenra-badge',
        `avenra-badge--${variant}`,
        `avenra-badge--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}
