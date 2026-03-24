import { cn } from '@avenra/utils';
import { useId, useState, type InputHTMLAttributes, type KeyboardEvent } from 'react';

import { FormField } from '../form-field/form-field';
import { getCompositeFieldContract } from '../form/field-contract';
import { useFormFieldContext } from '../form/context';

export type TagInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'size' | 'value'> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
  value?: string[];
  defaultValue?: string[];
  inputValue?: string;
  defaultInputValue?: string;
  onValueChange?: (value: string[]) => void;
  onInputValueChange?: (value: string) => void;
  allowDuplicates?: boolean;
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

function normalizeTag(value: string) {
  return value.trim();
}

function TagInputControl({
  allowDuplicates = false,
  className,
  defaultInputValue,
  defaultValue,
  disabled,
  id,
  inputValue,
  invalid,
  onChange,
  onInputValueChange,
  onValueChange,
  placeholder,
  required,
  value,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: Omit<TagInputProps, 'fieldWrapper' | 'label' | 'hint' | 'error'>) {
  const generatedId = useId().replace(/:/g, '');
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
    `avenra-tag-input-${generatedId}`,
  );

  const [tags, setTags] = useControllableState<string[]>({
    value,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange,
  });

  const [query, setQuery] = useControllableState<string>({
    value: inputValue,
    defaultValue: defaultInputValue ?? '',
    onChange: onInputValueChange,
  });

  const fieldDisabled = contract.disabled;
  const fieldInvalid = contract.invalid;
  const fieldRequired = contract.required;

  const commitTag = (rawValue: string) => {
    if (fieldDisabled) {
      return;
    }

    const nextTag = normalizeTag(rawValue);

    if (!nextTag) {
      setQuery('');
      return;
    }

    const duplicateExists = tags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase());

    if (!allowDuplicates && duplicateExists) {
      setQuery('');
      return;
    }

    setTags([...tags, nextTag]);
    setQuery('');
  };

  const removeTag = (tagToRemove: string) => {
    if (fieldDisabled) {
      return;
    }

    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (fieldDisabled) {
      return;
    }

    if ((event.key === 'Enter' || event.key === ',') && !event.nativeEvent.isComposing) {
      event.preventDefault();
      commitTag(query);
      return;
    }

    if (event.key === 'Backspace' && query.length === 0 && tags.length > 0) {
      event.preventDefault();
      removeTag(tags[tags.length - 1] as string);
    }
  };

  return (
    <div
      className={cn(
        'avenra-tag-input',
        fieldInvalid && 'avenra-tag-input--invalid',
        fieldDisabled && 'avenra-tag-input--disabled',
        className,
      )}
      data-disabled={fieldDisabled ? 'true' : 'false'}
      data-invalid={fieldInvalid ? 'true' : 'false'}
    >
      <ul className="avenra-tag-input__list">
        {tags.map((tag) => (
          <li className="avenra-tag-input__tag" key={tag}>
            <span className="avenra-tag-input__tag-label">{tag}</span>
            <button
              type="button"
              className="avenra-tag-input__remove"
              disabled={fieldDisabled}
              aria-label={`Remove ${tag}`}
              onClick={() => removeTag(tag)}
            >
              ×
            </button>
          </li>
        ))}
        <li className="avenra-tag-input__input-slot">
          <input
            {...props}
            id={contract.id}
            type="text"
            className="avenra-tag-input__input"
            value={query}
            placeholder={placeholder}
            disabled={fieldDisabled}
            required={fieldRequired && tags.length === 0}
            aria-invalid={contract.ariaInvalid}
            aria-describedby={contract.ariaDescribedBy}
            aria-labelledby={contract.ariaLabelledBy}
            aria-disabled={contract.ariaDisabled}
            onChange={(event) => {
              setQuery(event.target.value);
              onChange?.(event);
            }}
            onKeyDown={handleKeyDown}
          />
        </li>
      </ul>
    </div>
  );
}

export function TagInput({ error, fieldWrapper = true, hint, invalid, label, required, ...props }: TagInputProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <TagInputControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <TagInputControl {...props} />
    </FormField>
  );
}
