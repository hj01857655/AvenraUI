import { cn } from '@avenra/utils';
import type { TextareaHTMLAttributes } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Textarea({ className, error, hint, id, label, rows = 4, ...props }: TextareaProps) {
  const textareaId = id ?? 'avenra-textarea';
  const hintId = hint ? `${textareaId}-hint` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;
  const labelId = `${textareaId}-label`;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="avenra-field">
      <label className="avenra-field__label" htmlFor={textareaId} id={labelId}>
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        className={cn('avenra-input', 'avenra-textarea', error && 'avenra-input--invalid', className)}
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
