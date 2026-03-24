import { cn } from '@avenra/utils';
import type { ReactNode, SelectHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { getFieldContract } from '../form/field-contract';
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

function SelectControl({
  children,
  className,
  disabled,
  id,
  invalid,
  required,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode; invalid?: boolean }) {
  const field = useFormFieldContext();
  const contract = getFieldContract(
    field,
    {
      id,
      disabled,
      invalid,
      required,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-labelledby': ariaLabelledBy,
    },
    'avenra-select',
  );

  return (
    <select
      {...props}
      id={contract.id}
      className={cn('avenra-input', 'avenra-select', contract.invalid && 'avenra-input--invalid', className)}
      aria-invalid={contract.ariaInvalid}
      aria-describedby={contract.ariaDescribedBy}
      aria-labelledby={contract.ariaLabelledBy}
      disabled={contract.disabled}
      required={contract.required}
    >
      {children}
    </select>
  );
}

export function Select({ children, error, fieldWrapper = true, hint, invalid, label, required, ...props }: SelectProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return (
      <SelectControl {...props} invalid={invalid} required={required}>
        {children}
      </SelectControl>
    );
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <SelectControl {...props}>{children}</SelectControl>
    </FormField>
  );
}
