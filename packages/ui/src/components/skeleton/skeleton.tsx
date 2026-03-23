import type { CSSProperties, HTMLAttributes } from 'react';

type SkeletonShape = 'rectangular' | 'rounded' | 'circular';
type SkeletonSize = 'sm' | 'md' | 'lg';

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  width?: number | string;
  height?: number | string;
  shape?: SkeletonShape;
  size?: SkeletonSize;
};

export function Skeleton({
  className,
  width,
  height,
  shape = 'rectangular',
  size = 'md',
  style,
  ...props
}: SkeletonProps) {
  const resolvedClassName = [
    'avenra-skeleton',
    `avenra-skeleton--${shape}`,
    `avenra-skeleton--${size}`,
    className
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedStyle: CSSProperties = {
    width,
    height,
    ...style
  };

  return <div aria-hidden="true" className={resolvedClassName} style={resolvedStyle} {...props} />;
}
