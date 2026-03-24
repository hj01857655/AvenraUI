import { cn } from '@avenra/utils';
import { useId, type InputHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { getFieldContract } from '../form/field-contract';
import { useFormFieldContext } from '../form/context';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function CheckboxControl({
  className,
  disabled,
  id,
  invalid,
  label,
  required,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: Omit<CheckboxProps, 'fieldWrapper' | 'hint' | 'error'>) {
  const generatedId = useId();
  const field = useFormFieldContext();
  const fallbackId = `avenra-checkbox-${generatedId.replace(/:/g, '')}`;
  const checkboxId = id ?? field?.fieldId ?? fallbackId;
  const internalLabelId = field?.labelId ?? `${checkboxId}-label`;
  const contract = getFieldContract(
    field,
    {
      id,
      disabled,
      invalid,
      required,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-labelledby': ariaLabelledBy ?? internalLabelId,
    },
    fallbackId,
  );
  const labelId = field?.labelId ?? internalLabelId;

  return (
    <label className={cn('avenra-checkbox', contract.disabled && 'avenra-checkbox--disabled')} htmlFor={contract.id}>
      <input
        {...props}
        id={contract.id}
        type="checkbox"
        className={cn('avenra-checkbox__control', contract.invalid && 'avenra-checkbox__control--invalid', className)}
        disabled={contract.disabled}
        aria-invalid={contract.ariaInvalid}
        aria-describedby={contract.ariaDescribedBy}
        aria-labelledby={contract.ariaLabelledBy ?? labelId}
        required={contract.required}
      />
      <span className="avenra-checkbox__content">
        <span className={cn('avenra-field__label', 'avenra-checkbox__label')} id={labelId}>
          {label}
        </span>
      </span>
    </label>
  );
}

export function Checkbox({ error, fieldWrapper = true, hint, invalid, required, ...props }: CheckboxProps) {
  if (!fieldWrapper || (!hint && !error && required === undefined && invalid === undefined)) {
    return <CheckboxControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField hint={hint} error={error} required={required} invalid={invalid} layout="control">
      <CheckboxControl {...props} />
    </FormField>
  );
}
