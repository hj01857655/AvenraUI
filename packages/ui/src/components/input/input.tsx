import { cn } from '@avenra/utils';
import type { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Input({ className, error, hint, id, label, type = 'text', ...props }: InputProps) {
  const inputId = id ?? 'avenra-input';
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const labelId = `${inputId}-label`;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="avenra-field">
      <label className="avenra-field__label" htmlFor={inputId} id={labelId}>
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className={cn('avenra-input', error && 'avenra-input--invalid', className)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
        {...props}
      />
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
