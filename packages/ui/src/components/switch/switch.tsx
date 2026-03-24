import { cn } from '@avenra/utils';
import { useId, type InputHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { useFormFieldContext } from '../form/context';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function SwitchControl({ className, id, label, required, ...props }: Omit<SwitchProps, 'fieldWrapper' | 'hint' | 'error' | 'required' | 'invalid'> & { required?: boolean }) {
  const generatedId = useId();
  const field = useFormFieldContext();
  const switchId = id ?? field?.fieldId ?? `avenra-switch-${generatedId.replace(/:/g, '')}`;
  const labelId = field?.labelId ?? `${switchId}-label`;

  return (
    <label className={cn('avenra-switch', field?.disabled && 'avenra-switch--disabled')} htmlFor={switchId}>
      <input
        id={switchId}
        type="checkbox"
        role="switch"
        className={cn('avenra-switch__control', field?.invalid && 'avenra-switch__control--invalid', className)}
        disabled={field?.disabled ?? props.disabled}
        aria-invalid={field?.invalid ? 'true' : props['aria-invalid'] ?? 'false'}
        aria-describedby={field?.describedBy ?? props['aria-describedby']}
        aria-labelledby={labelId}
        required={field?.required ?? required}
        {...props}
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
    return <SwitchControl {...props} />;
  }

  return (
    <FormField hint={hint} error={error} required={required} invalid={invalid} layout="control">
      <SwitchControl {...props} />
    </FormField>
  );
}
