import { cn } from '@avenra/utils';
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';

import { FormField } from '../form-field/form-field';
import { getCompositeFieldContract } from '../form/field-contract';
import { useFormFieldContext } from '../form/context';

export type ComboboxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type ComboboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'defaultValue' | 'onChange' | 'size' | 'value'
> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  inputValue?: string;
  defaultInputValue?: string;
  open?: boolean;
  defaultOpen?: boolean;
  emptyMessage?: string;
  onValueChange?: (value: string) => void;
  onInputValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
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

function ComboboxControl({
  className,
  defaultInputValue,
  defaultOpen = false,
  defaultValue,
  disabled,
  emptyMessage = 'No results found',
  id,
  invalid,
  inputValue,
  onBlur,
  onFocus,
  onInputValueChange,
  onOpenChange,
  onValueChange,
  open,
  options,
  placeholder,
  required,
  value,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: Omit<ComboboxProps, 'fieldWrapper' | 'label' | 'hint' | 'error'>) {
  const generatedId = useId().replace(/:/g, '');
  const field = useFormFieldContext();
  const fallbackId = `avenra-combobox-${generatedId}`;
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
    fallbackId,
  );
  const comboboxId = contract.id;
  const listboxId = `${comboboxId}-listbox`;
  const fieldDisabled = contract.disabled;
  const fieldInvalid = contract.invalid;
  const fieldRequired = contract.required;

  const [selectedValue, setSelectedValue] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? '',
    onChange: onValueChange,
  });

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );

  const [query, setQuery] = useControllableState<string>({
    value: inputValue,
    defaultValue: defaultInputValue ?? selectedOption?.label ?? '',
    onChange: onInputValueChange,
  });

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const selectedLabel = selectedOption?.label.trim().toLowerCase();

    if (!normalized || (selectedLabel && normalized === selectedLabel)) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [options, query, selectedOption]);

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
      return;
    }

    const selectedIndex = filteredOptions.findIndex(
      (option) => option.value === selectedValue && !option.disabled,
    );

    setHighlightedIndex(selectedIndex);
  }, [filteredOptions, isOpen, selectedValue]);

  useEffect(() => {
    const selected = options.find((option) => option.value === selectedValue);

    if (selected && !inputValue) {
      setQuery(selected.label);
    }
  }, [inputValue, options, selectedValue, setQuery]);

  useEffect(() => {
    if (fieldDisabled) {
      setIsOpen(false);
    }
  }, [fieldDisabled, setIsOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen, setIsOpen]);

  const selectOption = (option: ComboboxOption) => {
    if (option.disabled) {
      return;
    }

    setSelectedValue(option.value);
    setQuery(option.label);
    setIsOpen(false);
  };

  const activeOption = highlightedIndex >= 0 ? filteredOptions[highlightedIndex] : undefined;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (fieldDisabled) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }

      for (let index = highlightedIndex + 1; index < filteredOptions.length; index += 1) {
        if (!filteredOptions[index]?.disabled) {
          setHighlightedIndex(index);
          return;
        }
      }

      for (let index = 0; index < filteredOptions.length; index += 1) {
        if (!filteredOptions[index]?.disabled) {
          setHighlightedIndex(index);
          return;
        }
      }
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }

      for (let index = highlightedIndex - 1; index >= 0; index -= 1) {
        if (!filteredOptions[index]?.disabled) {
          setHighlightedIndex(index);
          return;
        }
      }

      for (let index = filteredOptions.length - 1; index >= 0; index -= 1) {
        if (!filteredOptions[index]?.disabled) {
          setHighlightedIndex(index);
          return;
        }
      }
    }

    if (event.key === 'Home' && isOpen) {
      event.preventDefault();

      for (let index = 0; index < filteredOptions.length; index += 1) {
        if (!filteredOptions[index]?.disabled) {
          setHighlightedIndex(index);
          return;
        }
      }
    }

    if (event.key === 'End' && isOpen) {
      event.preventDefault();

      for (let index = filteredOptions.length - 1; index >= 0; index -= 1) {
        if (!filteredOptions[index]?.disabled) {
          setHighlightedIndex(index);
          return;
        }
      }
    }

    if (event.key === 'Enter' && isOpen && activeOption) {
      event.preventDefault();
      selectOption(activeOption);
    }

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div
      className="avenra-combobox"
      ref={rootRef}
      onBlur={(event) => {
        const nextFocused = event.relatedTarget;

        if (!nextFocused || !event.currentTarget.contains(nextFocused as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <input
        {...props}
        id={comboboxId}
        type="text"
        role="combobox"
        autoComplete="off"
        className={cn('avenra-input', 'avenra-combobox__input', fieldInvalid && 'avenra-input--invalid', className)}
        value={query}
        placeholder={placeholder}
        disabled={fieldDisabled}
        required={fieldRequired}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-invalid={contract.ariaInvalid}
        aria-describedby={contract.ariaDescribedBy}
        aria-labelledby={contract.ariaLabelledBy}
        aria-disabled={contract.ariaDisabled}
        aria-activedescendant={activeOption ? `${comboboxId}-option-${activeOption.value}` : undefined}
        onFocus={(event) => {
          setIsOpen(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          onBlur?.(event);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />

      {isOpen ? (
        <div className="avenra-combobox__panel" role="presentation">
          <ul className="avenra-combobox__listbox" id={listboxId} role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li key={option.value}>
                  <button
                    id={`${comboboxId}-option-${option.value}`}
                    type="button"
                    role="option"
                    aria-selected={selectedValue === option.value}
                    disabled={option.disabled}
                    className={cn(
                      'avenra-combobox__option',
                      selectedValue === option.value && 'avenra-combobox__option--selected',
                      index === highlightedIndex && 'avenra-combobox__option--active',
                    )}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectOption(option)}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            ) : (
              <li className="avenra-combobox__empty">{emptyMessage}</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function Combobox({
  error,
  fieldWrapper = true,
  hint,
  invalid,
  label,
  required,
  ...props
}: ComboboxProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <ComboboxControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <ComboboxControl {...props} />
    </FormField>
  );
}
