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

type CommandOption = {
  label: string;
  value: string;
  keywords?: string[];
  disabled?: boolean;
};

export type CommandProps = {
  className?: string;
  defaultOpen?: boolean;
  emptyMessage?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'role' | 'value' | 'defaultValue'>;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value: string) => void;
  open?: boolean;
  options: CommandOption[];
  placeholder?: string;
  value?: string;
};

function matchesOption(option: CommandOption, query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return true;
  }

  if (option.label.toLowerCase().includes(normalized) || option.value.toLowerCase().includes(normalized)) {
    return true;
  }

  return option.keywords?.some((keyword) => keyword.toLowerCase().includes(normalized)) ?? false;
}

export function Command({
  className,
  defaultOpen = true,
  emptyMessage = 'No results found',
  inputProps,
  onOpenChange,
  onSelect,
  open,
  options,
  placeholder = 'Search…',
  value,
}: CommandProps) {
  const generatedId = useId().replace(/:/g, '');
  const listboxId = `avenra-command-${generatedId}-listbox`;
  const [query, setQuery] = useState('');
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedValue, setSelectedValue] = useState(value ?? '');
  const rootRef = useRef<HTMLDivElement>(null);
  const isControlledOpen = open !== undefined;
  const isOpen = isControlledOpen ? open : internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlledOpen) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const selectedLabel = options.find((option) => option.value === selectedValue)?.label.trim().toLowerCase();

    if (!normalized || (selectedLabel && normalized === selectedLabel)) {
      return options;
    }

    return options.filter((option) => matchesOption(option, query));
  }, [options, query, selectedValue]);
  const activeOption = highlightedIndex >= 0 ? filteredOptions[highlightedIndex] : undefined;

  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
      return;
    }

    setHighlightedIndex(-1);
  }, [filteredOptions, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen]);

  const selectOption = (option: CommandOption) => {
    if (option.disabled) {
      return;
    }

    setSelectedValue(option.value);
    setQuery(option.label);
    setOpen(false);
    onSelect?.(option.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        setOpen(true);
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
        setOpen(true);
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

    if (event.key === 'Enter' && isOpen && activeOption) {
      event.preventDefault();
      selectOption(activeOption);
    }

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className={cn('avenra-command', className)} ref={rootRef}>
      <input
        {...inputProps}
        type="text"
        role="combobox"
        className={cn('avenra-input', 'avenra-command__input', inputProps?.className)}
        placeholder={placeholder}
        value={query}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activeOption ? `avenra-command-${generatedId}-option-${activeOption.value}` : undefined}
        onFocus={(event) => {
          setOpen(true);
          inputProps?.onFocus?.(event);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          inputProps?.onChange?.(event);
        }}
        onKeyDown={(event) => {
          handleKeyDown(event);
          inputProps?.onKeyDown?.(event);
        }}
      />

      {isOpen ? (
        <div className="avenra-command__panel" role="presentation">
          <ul className="avenra-command__listbox" id={listboxId} role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li key={option.value}>
                  <button
                    id={`avenra-command-${generatedId}-option-${option.value}`}
                    type="button"
                    role="option"
                    aria-selected={selectedValue === option.value}
                    disabled={option.disabled}
                    className={cn('avenra-command__option', index === highlightedIndex && 'avenra-command__option--active')}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectOption(option)}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            ) : (
              <li className="avenra-command__empty">{emptyMessage}</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
