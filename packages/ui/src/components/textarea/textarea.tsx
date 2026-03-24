import { cn } from '@avenra/utils';
import type { TextareaHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { getFieldContract } from '../form/field-contract';
import { useFormFieldContext } from '../form/context';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function TextareaControl({
  className,
  disabled,
  id,
  invalid,
  required,
  rows = 4,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
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
    'avenra-textarea',
  );

  return (
    <textarea
      {...props}
      id={contract.id}
      rows={rows}
      className={cn('avenra-input', 'avenra-textarea', contract.invalid && 'avenra-input--invalid', className)}
      aria-invalid={contract.ariaInvalid}
      aria-describedby={contract.ariaDescribedBy}
      aria-labelledby={contract.ariaLabelledBy}
      disabled={contract.disabled}
      required={contract.required}
    />
  );
}

export function Textarea({ error, fieldWrapper = true, hint, invalid, label, required, ...props }: TextareaProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <TextareaControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <TextareaControl {...props} />
    </FormField>
  );
}
