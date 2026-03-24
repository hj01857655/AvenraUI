import { cn } from '@avenra/utils';
import type { TextareaHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { useFormFieldContext } from '../form/context';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
};

function TextareaControl({ className, id, rows = 4, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const field = useFormFieldContext();
  const textareaId = id ?? field?.fieldId ?? 'avenra-textarea';

  return (
    <textarea
      id={textareaId}
      rows={rows}
      className={cn('avenra-input', 'avenra-textarea', field?.invalid && 'avenra-input--invalid', className)}
      aria-invalid={field?.invalid ? 'true' : props['aria-invalid'] ?? 'false'}
      aria-describedby={field?.describedBy ?? props['aria-describedby']}
      aria-labelledby={field?.labelId ?? props['aria-labelledby']}
      disabled={field?.disabled ?? props.disabled}
      required={field?.required ?? props.required}
      {...props}
    />
  );
}

export function Textarea({ error, fieldWrapper = true, hint, invalid, label, required, ...props }: TextareaProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <TextareaControl {...props} />;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <TextareaControl {...props} />
    </FormField>
  );
}
