import { cn } from '@avenra/utils';
import { useId, type ReactNode, type SelectHTMLAttributes } from 'react';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  label: string;
  hint?: string;
  error?: string;
};

export function Select({ children, className, error, hint, id, label, ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? `avenra-select-${generatedId.replace(/:/g, '')}`;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const labelId = `${selectId}-label`;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="avenra-field">
      <label className="avenra-field__label" htmlFor={selectId} id={labelId}>
        {label}
      </label>
      <select
        id={selectId}
        className={cn('avenra-input', 'avenra-select', error && 'avenra-input--invalid', className)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
        {...props}
      >
        {children}
      </select>
      {hint ? (
        <span className="avenra-field__hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="avenra-field__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
