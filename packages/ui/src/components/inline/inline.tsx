import type { HTMLAttributes, ReactNode } from 'react';

type InlineAlign = 'start' | 'center' | 'end';
type InlineGap = 'sm' | 'md' | 'lg';

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  align?: InlineAlign;
  gap?: InlineGap;
}

export function Inline({ children, className, align = 'start', gap = 'md', ...props }: InlineProps) {
  return (
    <div
      className={['avenra-inline', `avenra-inline--align-${align}`, `avenra-inline--gap-${gap}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
