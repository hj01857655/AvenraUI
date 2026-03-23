import { cn } from '@avenra/utils';
import { useId, type InputHTMLAttributes } from 'react';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Switch({ className, disabled, error, hint, id, label, ...props }: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? `avenra-switch-${generatedId.replace(/:/g, '')}`;
  const hintId = hint ? `${switchId}-hint` : undefined;
  const errorId = error ? `${switchId}-error` : undefined;
  const labelId = `${switchId}-label`;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="avenra-field">
      <label className={cn('avenra-switch', disabled && 'avenra-switch--disabled')} htmlFor={switchId}>
        <input
          id={switchId}
          type="checkbox"
          role="switch"
          className={cn('avenra-switch__control', error && 'avenra-switch__control--invalid', className)}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          aria-labelledby={labelId}
          {...props}
        />
        <span className="avenra-switch__content">
          <span className={cn('avenra-field__label', 'avenra-switch__label')} id={labelId}>
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
