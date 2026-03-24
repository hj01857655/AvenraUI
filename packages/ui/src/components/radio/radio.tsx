import { cn } from '@avenra/utils';
import { useId, type InputHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { useFormFieldContext } from '../form/context';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function RadioControl({ className, id, label, required, ...props }: Omit<RadioProps, 'fieldWrapper' | 'hint' | 'error' | 'required' | 'invalid'> & { required?: boolean }) {
  const generatedId = useId();
  const field = useFormFieldContext();
  const radioId = id ?? field?.fieldId ?? `avenra-radio-${generatedId.replace(/:/g, '')}`;
  const labelId = field?.labelId ?? `${radioId}-label`;

  return (
    <label className={cn('avenra-radio', field?.disabled && 'avenra-radio--disabled')} htmlFor={radioId}>
      <input
        id={radioId}
        type="radio"
        className={cn('avenra-radio__control', field?.invalid && 'avenra-radio__control--invalid', className)}
        disabled={field?.disabled ?? props.disabled}
        aria-invalid={field?.invalid ? 'true' : props['aria-invalid'] ?? 'false'}
        aria-describedby={field?.describedBy ?? props['aria-describedby']}
        aria-labelledby={labelId}
        required={field?.required ?? required}
        {...props}
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
    return <RadioControl {...props} />;
  }

  return (
    <FormField hint={hint} error={error} required={required} invalid={invalid} layout="control">
      <RadioControl {...props} />
    </FormField>
  );
}
