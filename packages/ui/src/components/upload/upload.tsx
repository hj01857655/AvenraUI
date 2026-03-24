import { cn } from '@avenra/utils';
import { useId, useRef, useState, type ChangeEvent, type InputHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { getCompositeFieldContract } from '../form/field-contract';
import { useFormFieldContext } from '../form/context';

export type UploadProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'onChange' | 'size' | 'type' | 'value'
> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
  value?: File[];
  defaultValue?: File[];
  buttonLabel?: string;
  emptyState?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (files: File[]) => void;
};

function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (nextValue: T) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return [currentValue, setValue] as const;
}

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadControl({
  buttonLabel = 'Select files',
  className,
  defaultValue,
  disabled,
  emptyState = 'No files selected.',
  id,
  invalid,
  multiple = true,
  onChange,
  onValueChange,
  required,
  value,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: Omit<UploadProps, 'error' | 'fieldWrapper' | 'hint' | 'label'>) {
  const generatedId = useId().replace(/:/g, '');
  const inputRef = useRef<HTMLInputElement>(null);
  const field = useFormFieldContext();
  const contract = getCompositeFieldContract(
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
    `avenra-upload-${generatedId}`,
  );
  const [files, setFiles] = useControllableState<File[]>({
    value,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange,
  });
  const triggerId = `${contract.id}-trigger`;
  const triggerLabelledBy = [contract.ariaLabelledBy, triggerId].filter(Boolean).join(' ');

  const commitFiles = (nextFiles: File[]) => {
    setFiles(nextFiles);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const nextFiles = multiple ? [...files, ...selectedFiles] : selectedFiles.slice(0, 1);

    commitFiles(nextFiles);
    onChange?.(event);
  };

  const removeFileAtIndex = (indexToRemove: number) => {
    if (contract.disabled) {
      return;
    }

    commitFiles(files.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div
      className={cn(
        'avenra-upload',
        contract.invalid && 'avenra-upload--invalid',
        contract.disabled && 'avenra-upload--disabled',
        className,
      )}
      data-disabled={contract.disabled ? 'true' : 'false'}
      data-invalid={contract.invalid ? 'true' : 'false'}
    >
      <input
        {...props}
        ref={inputRef}
        id={contract.id}
        className="avenra-upload__input"
        type="file"
        disabled={contract.disabled}
        multiple={multiple}
        required={contract.required && files.length === 0}
        aria-invalid={contract.ariaInvalid}
        aria-describedby={contract.ariaDescribedBy}
        aria-labelledby={contract.ariaLabelledBy}
        aria-disabled={contract.ariaDisabled}
        onChange={handleInputChange}
      />

      <div className="avenra-upload__toolbar">
        <button
          id={triggerId}
          type="button"
          className="avenra-upload__trigger"
          disabled={contract.disabled}
          aria-labelledby={triggerLabelledBy || undefined}
          onClick={() => inputRef.current?.click()}
        >
          {buttonLabel}
        </button>
        <p className="avenra-upload__summary">
          {files.length > 0 ? `${files.length} file${files.length === 1 ? '' : 's'} selected` : emptyState}
        </p>
      </div>

      {files.length > 0 ? (
        <ul className="avenra-upload__list">
          {files.map((file, index) => (
            <li className="avenra-upload__item" key={`${file.name}-${file.size}-${index}`}>
              <div className="avenra-upload__file">
                <span className="avenra-upload__name">{file.name}</span>
                <span className="avenra-upload__meta">{formatFileSize(file.size)}</span>
              </div>
              <button
                type="button"
                className="avenra-upload__remove"
                disabled={contract.disabled}
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFileAtIndex(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function Upload({ error, fieldWrapper = true, hint, invalid, label, required, ...props }: UploadProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <UploadControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <UploadControl {...props} />
    </FormField>
  );
}
