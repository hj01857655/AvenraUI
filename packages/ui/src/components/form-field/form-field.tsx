import { cn } from '@avenra/utils';
import { useId, type ReactNode } from 'react';

import { FormFieldContext, useFormContext } from '../form/context';

export type FormFieldProps = {
  name?: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  layout?: 'stacked' | 'control';
  children: ReactNode;
};

export function FormField({
  children,
  disabled = false,
  error,
  hint,
  invalid,
  label,
  layout = 'stacked',
  name,
  required = false,
}: FormFieldProps) {
  const generatedId = useId().replace(/:/g, '');
  const form = useFormContext();
  const fieldId = name ? `avenra-field-${name}` : `avenra-field-${generatedId}`;
  const labelId = label ? `${fieldId}-label` : undefined;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedByIds = [hintId, errorId].filter((value): value is string => Boolean(value));
  const describedBy = describedByIds.join(' ') || undefined;
  const isInvalid = invalid ?? Boolean(error);
  const isDisabled = disabled || form?.disabled || form?.submitting || false;

  return (
    <FormFieldContext.Provider
      value={{
        fieldId,
        labelId,
        hintId,
        errorId,
        describedByIds,
        describedBy,
        required,
        disabled: isDisabled,
        invalid: isInvalid,
        layout,
      }}
    >
      <div
        className={cn(
          'avenra-field',
          layout === 'control' && 'avenra-field--control',
          isDisabled && 'avenra-field--disabled',
          isInvalid && 'avenra-field--invalid',
        )}
        data-layout={layout}
        data-disabled={isDisabled ? 'true' : 'false'}
        data-invalid={isInvalid ? 'true' : 'false'}
        data-required={required ? 'true' : 'false'}
      >
        {layout === 'stacked' && label ? (
          <label className="avenra-field__label" htmlFor={fieldId} id={labelId}>
            <span>{label}</span>
            {required ? <span className="avenra-field__required">*</span> : null}
          </label>
        ) : null}
        {children}
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
    </FormFieldContext.Provider>
  );
}
