import { cn } from '@avenra/utils';
import { useId, type InputHTMLAttributes } from 'react';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Radio({ className, disabled, error, hint, id, label, ...props }: RadioProps) {
  const generatedId = useId();
  const radioId = id ?? `avenra-radio-${generatedId.replace(/:/g, '')}`;
  const hintId = hint ? `${radioId}-hint` : undefined;
  const errorId = error ? `${radioId}-error` : undefined;
  const labelId = `${radioId}-label`;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="avenra-field">
      <label className={cn('avenra-radio', disabled && 'avenra-radio--disabled')} htmlFor={radioId}>
        <input
          id={radioId}
          type="radio"
          className={cn('avenra-radio__control', error && 'avenra-radio__control--invalid', className)}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          aria-labelledby={labelId}
          {...props}
        />
        <span className="avenra-radio__content">
          <span className={cn('avenra-field__label', 'avenra-radio__label')} id={labelId}>
            {label}
          </span>
        </span>
      </label>
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
