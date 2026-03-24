import { cn } from '@avenra/utils';
import { useId, type InputHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { getFieldContract } from '../form/field-contract';
import { useFormFieldContext } from '../form/context';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function RadioControl({
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
}: Omit<RadioProps, 'fieldWrapper' | 'hint' | 'error'>) {
  const generatedId = useId();
  const field = useFormFieldContext();
  const fallbackId = `avenra-radio-${generatedId.replace(/:/g, '')}`;
  const radioId = id ?? field?.fieldId ?? fallbackId;
  const internalLabelId = field?.labelId ?? `${radioId}-label`;
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
    <label className={cn('avenra-radio', contract.disabled && 'avenra-radio--disabled')} htmlFor={contract.id}>
      <input
        {...props}
        id={contract.id}
        type="radio"
        className={cn('avenra-radio__control', contract.invalid && 'avenra-radio__control--invalid', className)}
        disabled={contract.disabled}
        aria-invalid={contract.ariaInvalid}
        aria-describedby={contract.ariaDescribedBy}
        aria-labelledby={contract.ariaLabelledBy ?? labelId}
        required={contract.required}
      />
      <span className="avenra-radio__content">
        <span className={cn('avenra-field__label', 'avenra-radio__label')} id={labelId}>
          {label}
        </span>
      </span>
    </label>
  );
}

export function Radio({ error, fieldWrapper = true, hint, invalid, required, ...props }: RadioProps) {
  if (!fieldWrapper || (!hint && !error && required === undefined && invalid === undefined)) {
    return <RadioControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField hint={hint} error={error} required={required} invalid={invalid} layout="control">
      <RadioControl {...props} />
    </FormField>
  );
}
