import { cn } from '@avenra/utils';
import type { ReactNode, SelectHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { useFormFieldContext } from '../form/context';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function SelectControl({ children, className, id, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  const field = useFormFieldContext();
  const selectId = id ?? field?.fieldId ?? 'avenra-select';

  return (
    <select
      id={selectId}
      className={cn('avenra-input', 'avenra-select', field?.invalid && 'avenra-input--invalid', className)}
      aria-invalid={field?.invalid ? 'true' : props['aria-invalid'] ?? 'false'}
      aria-describedby={field?.describedBy ?? props['aria-describedby']}
      aria-labelledby={field?.labelId ?? props['aria-labelledby']}
      disabled={field?.disabled ?? props.disabled}
      required={field?.required ?? props.required}
      {...props}
    >
      {children}
    </select>
  );
}

export function Select({ children, error, fieldWrapper = true, hint, invalid, label, required, ...props }: SelectProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <SelectControl {...props}>{children}</SelectControl>;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <SelectControl {...props}>{children}</SelectControl>
    </FormField>
  );
}
