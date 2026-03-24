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

export type MultiSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type MultiSelectProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'onChange' | 'size' | 'value'
> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  inputValue?: string;
  defaultInputValue?: string;
  open?: boolean;
  defaultOpen?: boolean;
  emptyMessage?: string;
  onValueChange?: (value: string[]) => void;
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

function MultiSelectControl({
  className,
  defaultInputValue,
  defaultOpen = false,
  defaultValue,
  disabled,
  emptyMessage = 'No options found',
  id,
  inputValue,
  invalid,
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
}: Omit<MultiSelectProps, 'fieldWrapper' | 'label' | 'hint' | 'error'>) {
  const generatedId = useId().replace(/:/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
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
    `avenra-multi-select-${generatedId}`,
  );

  const [selectedValues, setSelectedValues] = useControllableState<string[]>({
    value,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange,
  });

  const [query, setQuery] = useControllableState<string>({
    value: inputValue,
    defaultValue: defaultInputValue ?? '',
    onChange: onInputValueChange,
  });

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const optionMap = useMemo(() => new Map(options.map((option) => [option.value, option] as const)), [options]);
  const selectedOptions = selectedValues.map((valueItem) => optionMap.get(valueItem)).filter(Boolean) as MultiSelectOption[];

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  }, [options, query]);

  useEffect(() => {
    if (contract.disabled) {
      setIsOpen(false);
    }
  }, [contract.disabled, setIsOpen]);

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
      return;
    }

    const firstEnabledIndex = filteredOptions.findIndex((option) => !option.disabled);
    setHighlightedIndex(firstEnabledIndex);
  }, [filteredOptions, isOpen]);

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
    return () => window.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen, setIsOpen]);

  const listboxId = `${contract.id}-listbox`;
  const activeOption = highlightedIndex >= 0 ? filteredOptions[highlightedIndex] : undefined;

  const commitSelection = (option: MultiSelectOption) => {
    if (contract.disabled || option.disabled || selectedValues.includes(option.value)) {
      setQuery('');
      return;
    }

    setSelectedValues([...selectedValues, option.value]);
    setQuery('');
    setIsOpen(true);
  };

  const removeSelection = (valueToRemove: string) => {
    if (contract.disabled) {
      return;
    }

    setSelectedValues(selectedValues.filter((valueItem) => valueItem !== valueToRemove));
  };

  const moveHighlight = (direction: 1 | -1) => {
    if (filteredOptions.length === 0) {
      return;
    }

    let nextIndex = highlightedIndex;

    for (let count = 0; count < filteredOptions.length; count += 1) {
      nextIndex = nextIndex + direction;

      if (nextIndex < 0) {
        nextIndex = filteredOptions.length - 1;
      }

      if (nextIndex >= filteredOptions.length) {
        nextIndex = 0;
      }

      if (!filteredOptions[nextIndex]?.disabled) {
        setHighlightedIndex(nextIndex);
        return;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (contract.disabled) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }

      moveHighlight(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }

      moveHighlight(-1);
      return;
    }

    if (event.key === 'Enter' && isOpen && activeOption) {
      event.preventDefault();
      commitSelection(activeOption);
      return;
    }

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (event.key === 'Backspace' && query.length === 0 && selectedValues.length > 0) {
      event.preventDefault();
      removeSelection(selectedValues[selectedValues.length - 1] as string);
    }
  };

  return (
    <div
      className={cn(
        'avenra-multi-select',
        contract.invalid && 'avenra-multi-select--invalid',
        contract.disabled && 'avenra-multi-select--disabled',
        className,
      )}
      ref={rootRef}
      data-disabled={contract.disabled ? 'true' : 'false'}
      data-invalid={contract.invalid ? 'true' : 'false'}
      onBlur={(event) => {
        const nextFocused = event.relatedTarget;
        if (!nextFocused || !event.currentTarget.contains(nextFocused as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <ul className="avenra-multi-select__values">
        {selectedOptions.map((option) => (
          <li className="avenra-multi-select__token" key={option.value}>
            <span className="avenra-multi-select__token-label">{option.label}</span>
            <button
              type="button"
              className="avenra-multi-select__remove"
              aria-label={`Remove ${option.label}`}
              disabled={contract.disabled}
              onClick={() => removeSelection(option.value)}
            >
              ×
            </button>
          </li>
        ))}
        <li className="avenra-multi-select__input-slot">
          <input
            {...props}
            id={contract.id}
            type="text"
            role="combobox"
            autoComplete="off"
            className="avenra-multi-select__input"
            value={query}
            placeholder={placeholder}
            disabled={contract.disabled}
            required={contract.required && selectedValues.length === 0}
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-invalid={contract.ariaInvalid}
            aria-describedby={contract.ariaDescribedBy}
            aria-labelledby={contract.ariaLabelledBy}
            aria-disabled={contract.ariaDisabled}
            aria-activedescendant={activeOption ? `${contract.id}-option-${activeOption.value}` : undefined}
            onFocus={() => {
              if (!contract.disabled) {
                setIsOpen(true);
              }
            }}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
          />
        </li>
      </ul>

      {isOpen ? (
        <div className="avenra-multi-select__panel" role="presentation">
          <ul className="avenra-multi-select__listbox" id={listboxId} role="listbox" aria-multiselectable="true">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const selected = selectedValues.includes(option.value);

                return (
                  <li key={option.value}>
                    <button
                      id={`${contract.id}-option-${option.value}`}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      disabled={option.disabled}
                      className={cn(
                        'avenra-multi-select__option',
                        selected && 'avenra-multi-select__option--selected',
                        index === highlightedIndex && 'avenra-multi-select__option--active',
                      )}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => commitSelection(option)}
                    >
                      <span>{option.label}</span>
                      {selected ? <span className="avenra-multi-select__check">Selected</span> : null}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="avenra-multi-select__empty">{emptyMessage}</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function MultiSelect({
  error,
  fieldWrapper = true,
  hint,
  invalid,
  label,
  required,
  ...props
}: MultiSelectProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <MultiSelectControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <MultiSelectControl {...props} />
    </FormField>
  );
}
