import { cn } from '@avenra/utils';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

const buttonVariants = {
  primary: 'avenra-button--primary',
  secondary: 'avenra-button--secondary',
  ghost: 'avenra-button--ghost'
} as const;

const buttonSizes = {
  sm: 'avenra-button--sm',
  md: 'avenra-button--md',
  lg: 'avenra-button--lg'
} as const;

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    variant?: keyof typeof buttonVariants;
    size?: keyof typeof buttonSizes;
  }
>;

export function Button({
  children,
  className,
  disabled,
  loading = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'avenra-button',
        buttonVariants[variant],
        buttonSizes[size],
        loading && 'avenra-button--loading',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : 'false'}
      {...props}
    >
      <span className="avenra-button__content">{loading ? 'Loading…' : children}</span>
    </button>
  );
}
