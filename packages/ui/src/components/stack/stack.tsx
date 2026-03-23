import type { HTMLAttributes, ReactNode } from 'react';

type StackDirection = 'vertical' | 'horizontal';
type StackGap = 'sm' | 'md' | 'lg';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  direction?: StackDirection;
  gap?: StackGap;
}

export function Stack({
  children,
  className,
  direction = 'vertical',
  gap = 'md',
  ...props
}: StackProps) {
  return (
    <div
      className={['avenra-stack', `avenra-stack--${direction}`, `avenra-stack--gap-${gap}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
