import { cn } from '@avenra/utils';
import { useId, type InputHTMLAttributes } from 'react';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Checkbox({ className, disabled, error, hint, id, label, ...props }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? `avenra-checkbox-${generatedId.replace(/:/g, '')}`;
  const hintId = hint ? `${checkboxId}-hint` : undefined;
  const errorId = error ? `${checkboxId}-error` : undefined;
  const labelId = `${checkboxId}-label`;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="avenra-field">
      <label
        className={cn('avenra-checkbox', disabled && 'avenra-checkbox--disabled')}
        htmlFor={checkboxId}
      >
        <input
          id={checkboxId}
          type="checkbox"
          className={cn(
            'avenra-checkbox__control',
            error && 'avenra-checkbox__control--invalid',
            className,
          )}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          aria-labelledby={labelId}
          {...props}
        />
        <span className="avenra-checkbox__content">
          <span className={cn('avenra-field__label', 'avenra-checkbox__label')} id={labelId}>
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
