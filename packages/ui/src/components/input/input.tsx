import { cn } from '@avenra/utils';
import type { InputHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { useFormFieldContext } from '../form/context';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function InputControl({ className, id, type = 'text', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const field = useFormFieldContext();
  const inputId = id ?? field?.fieldId ?? 'avenra-input';

  return (
    <input
      id={inputId}
      type={type}
      className={cn('avenra-input', field?.invalid && 'avenra-input--invalid', className)}
      aria-invalid={field?.invalid ? 'true' : props['aria-invalid'] ?? 'false'}
      aria-describedby={field?.describedBy ?? props['aria-describedby']}
      aria-labelledby={field?.labelId ?? props['aria-labelledby']}
      disabled={field?.disabled ?? props.disabled}
      required={field?.required ?? props.required}
      {...props}
    />
  );
}

export function Input({ error, fieldWrapper = true, hint, invalid, label, required, ...props }: InputProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <InputControl {...props} />;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <InputControl {...props} />
    </FormField>
  );
}
