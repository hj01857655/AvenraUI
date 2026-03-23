import { HTMLAttributes } from 'react';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

function clampValue(value?: number) {
  if (value == null || Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

export function Progress({ className, label, size = 'md', value = 0, ...props }: ProgressProps) {
  const currentValue = clampValue(value);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={currentValue}
      className={['avenra-progress', `avenra-progress--${size}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="avenra-progress__indicator" style={{ width: `${currentValue}%` }} />
    </div>
  );
}
