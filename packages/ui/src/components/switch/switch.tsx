import { cn } from '@avenra/utils';
import { useId, type InputHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { getFieldContract } from '../form/field-contract';
import { useFormFieldContext } from '../form/context';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function SwitchControl({
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
}: Omit<SwitchProps, 'fieldWrapper' | 'hint' | 'error'>) {
  const generatedId = useId();
  const field = useFormFieldContext();
  const fallbackId = `avenra-switch-${generatedId.replace(/:/g, '')}`;
  const switchId = id ?? field?.fieldId ?? fallbackId;
  const internalLabelId = field?.labelId ?? `${switchId}-label`;
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
    <label className={cn('avenra-switch', contract.disabled && 'avenra-switch--disabled')} htmlFor={contract.id}>
      <input
        {...props}
        id={contract.id}
        type="checkbox"
        role="switch"
        className={cn('avenra-switch__control', contract.invalid && 'avenra-switch__control--invalid', className)}
        disabled={contract.disabled}
        aria-invalid={contract.ariaInvalid}
        aria-describedby={contract.ariaDescribedBy}
        aria-labelledby={contract.ariaLabelledBy ?? labelId}
        required={contract.required}
      />
      <span className="avenra-switch__content">
        <span className={cn('avenra-field__label', 'avenra-switch__label')} id={labelId}>
          {label}
        </span>
      </span>
    </label>
  );
}

export function Switch({ error, fieldWrapper = true, hint, invalid, required, ...props }: SwitchProps) {
  if (!fieldWrapper || (!hint && !error && required === undefined && invalid === undefined)) {
    return <SwitchControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField hint={hint} error={error} required={required} invalid={invalid} layout="control">
      <SwitchControl {...props} />
    </FormField>
  );
}
