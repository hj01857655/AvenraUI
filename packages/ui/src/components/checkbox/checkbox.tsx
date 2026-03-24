import { cn } from '@avenra/utils';
import { useId, type InputHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { useFormFieldContext } from '../form/context';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function CheckboxControl({ className, id, label, required, ...props }: Omit<CheckboxProps, 'fieldWrapper' | 'hint' | 'error' | 'required' | 'invalid'> & { required?: boolean }) {
  const generatedId = useId();
  const field = useFormFieldContext();
  const checkboxId = id ?? field?.fieldId ?? `avenra-checkbox-${generatedId.replace(/:/g, '')}`;
  const labelId = field?.labelId ?? `${checkboxId}-label`;

  return (
    <label className={cn('avenra-checkbox', field?.disabled && 'avenra-checkbox--disabled')} htmlFor={checkboxId}>
      <input
        id={checkboxId}
        type="checkbox"
        className={cn('avenra-checkbox__control', field?.invalid && 'avenra-checkbox__control--invalid', className)}
        disabled={field?.disabled ?? props.disabled}
        aria-invalid={field?.invalid ? 'true' : props['aria-invalid'] ?? 'false'}
        aria-describedby={field?.describedBy ?? props['aria-describedby']}
        aria-labelledby={labelId}
        required={field?.required ?? required}
        {...props}
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
    return <CheckboxControl {...props} />;
  }

  return (
    <FormField hint={hint} error={error} required={required} invalid={invalid} layout="control">
      <CheckboxControl {...props} />
    </FormField>
  );
}
