import { cn } from '@avenra/utils';
import type { InputHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { getFieldContract } from '../form/field-contract';
import { useFormFieldContext } from '../form/context';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function InputControl({
  className,
  disabled,
  id,
  invalid,
  required,
  type = 'text',
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
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
    'avenra-input',
  );

  return (
    <input
      {...props}
      id={contract.id}
      type={type}
      className={cn('avenra-input', contract.invalid && 'avenra-input--invalid', className)}
      aria-invalid={contract.ariaInvalid}
      aria-describedby={contract.ariaDescribedBy}
      aria-labelledby={contract.ariaLabelledBy}
      disabled={contract.disabled}
      required={contract.required}
    />
  );
}

export function Input({ error, fieldWrapper = true, hint, invalid, label, required, ...props }: InputProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <InputControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <InputControl {...props} />
    </FormField>
  );
}
