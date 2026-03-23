import { cn } from '@avenra/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const iconButtonVariants = {
  primary: 'avenra-button--primary',
  secondary: 'avenra-button--secondary',
  ghost: 'avenra-button--ghost'
} as const;

const iconButtonSizes = {
  sm: 'avenra-icon-button--sm',
  md: 'avenra-icon-button--md',
  lg: 'avenra-icon-button--lg'
} as const;

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  loading?: boolean;
  size?: keyof typeof iconButtonSizes;
  variant?: keyof typeof iconButtonVariants;
};

export function IconButton({
  'aria-label': ariaLabel,
  children,
  className,
  disabled,
  icon,
  loading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: IconButtonProps) {
  const hasAccessibleName = typeof ariaLabel === 'string' ? ariaLabel.trim().length > 0 : ariaLabel != null;
  const isIconOnly = children == null;
  const visualContent = icon ?? children;
  const hasVisibleLabel = icon != null && children != null;

  if (process.env.NODE_ENV !== 'production' && isIconOnly && !hasAccessibleName) {
    throw new Error('IconButton requires an aria-label when used without visible text.');
  }

  return (
    <button
      type={type}
      className={cn(
        'avenra-button avenra-icon-button',
        iconButtonVariants[variant],
        iconButtonSizes[size],
        loading && 'avenra-button--loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : 'false'}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="avenra-button__content avenra-icon-button__content" aria-hidden={isIconOnly ? 'true' : undefined}>
        {loading ? <span className="avenra-icon-button__spinner" /> : visualContent}
        {hasVisibleLabel ? <span className="avenra-icon-button__label">{children}</span> : null}
      </span>
    </button>
  );
}
