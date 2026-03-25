import { cn } from '@avenra/utils';
import { useEffect, useId, useMemo, useRef, useState, type ButtonHTMLAttributes } from 'react';

import { FormField } from '../form-field/form-field';
import { getCompositeFieldContract } from '../form/field-contract';
import { useFormFieldContext } from '../form/context';

export interface CascaderOption {
  value: string;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
}

export type CascaderProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'defaultValue' | 'onChange' | 'value' | 'children'
> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
  options: CascaderOption[];
  value?: string[];
  defaultValue?: string[];
  open?: boolean;
  defaultOpen?: boolean;
  placeholder?: string;
  onValueChange?: (value: string[]) => void;
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

function findOptionPath(options: CascaderOption[], path: string[]) {
  const resolved: CascaderOption[] = [];
  let currentOptions = options;

  for (const value of path) {
    const match = currentOptions.find((option) => option.value === value);

    if (!match) {
      break;
    }

    resolved.push(match);
    currentOptions = match.children ?? [];
  }

  return resolved;
}

function getColumns(options: CascaderOption[], activePath: string[]) {
  const columns: CascaderOption[][] = [options];
  let currentOptions = options;

  for (const value of activePath) {
    const match = currentOptions.find((option) => option.value === value);

    if (!match?.children?.length) {
      break;
    }

    columns.push(match.children);
    currentOptions = match.children;
  }

  return columns;
}

function CascaderControl({
  className,
  defaultOpen = false,
  defaultValue,
  disabled,
  id,
  invalid,
  onBlur,
  onOpenChange,
  onValueChange,
  open,
  options,
  placeholder = 'Select a path',
  required,
  value,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: Omit<CascaderProps, 'error' | 'fieldWrapper' | 'hint' | 'label'>) {
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
    `avenra-cascader-${generatedId}`,
  );

  const [selectedPath, setSelectedPath] = useControllableState<string[]>({
    value,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange,
  });

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const selectedOptionPath = useMemo(() => findOptionPath(options, selectedPath), [options, selectedPath]);
  const [activePath, setActivePath] = useState<string[]>(selectedPath.slice(0, -1));

  useEffect(() => {
    if (!isOpen) {
      setActivePath(selectedPath.slice(0, -1));
    }
  }, [isOpen, selectedPath]);

  useEffect(() => {
    if (contract.disabled) {
      setIsOpen(false);
    }
  }, [contract.disabled, setIsOpen]);

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

  const columns = useMemo(() => getColumns(options, activePath), [activePath, options]);
  const selectedLabel =
    selectedOptionPath.length > 0 ? selectedOptionPath.map((option) => option.label).join(' / ') : placeholder;

  const commitSelection = (nextPath: string[]) => {
    setSelectedPath(nextPath);
    setActivePath(nextPath.slice(0, -1));
    setIsOpen(false);
  };

  const handleOptionClick = (option: CascaderOption, level: number) => {
    if (option.disabled || contract.disabled) {
      return;
    }

    const nextPath = [...activePath.slice(0, level), option.value];

    if (option.children?.length) {
      setActivePath(nextPath);
      return;
    }

    commitSelection(nextPath);
  };

  return (
    <div
      className={cn(
        'avenra-cascader',
        contract.invalid && 'avenra-cascader--invalid',
        contract.disabled && 'avenra-cascader--disabled',
        className,
      )}
      ref={rootRef}
    >
      <button
        {...props}
        aria-describedby={contract.ariaDescribedBy}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-invalid={contract.ariaInvalid}
        aria-labelledby={contract.ariaLabelledBy}
        className="avenra-cascader__trigger"
        disabled={contract.disabled}
        id={contract.id}
        onBlur={onBlur}
        onClick={() => {
          if (contract.disabled) {
            return;
          }

          setIsOpen(!isOpen);
          if (!isOpen) {
            setActivePath(selectedPath.slice(0, -1));
          }
        }}
        type="button"
      >
        <span className={cn('avenra-cascader__value', selectedOptionPath.length === 0 && 'avenra-cascader__value--placeholder')}>
          {selectedLabel}
        </span>
        <span aria-hidden="true" className="avenra-cascader__chevron">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen ? (
        <div className="avenra-cascader__panel" role="dialog" aria-label="Choose path">
          {columns.map((columnOptions, columnIndex) => (
            <ul className="avenra-cascader__column" key={`column-${columnIndex}`} role="list">
              {columnOptions.map((option) => {
                const currentPath = [...activePath.slice(0, columnIndex), option.value];
                const isActive = activePath[columnIndex] === option.value;
                const isSelected = selectedPath.join('/') === currentPath.join('/');
                const isBranch = (option.children?.length ?? 0) > 0;

                return (
                  <li className="avenra-cascader__item" key={option.value}>
                    <button
                      className={cn(
                        'avenra-cascader__option',
                        isActive && 'avenra-cascader__option--active',
                        isSelected && 'avenra-cascader__option--selected',
                        option.disabled && 'avenra-cascader__option--disabled',
                      )}
                      disabled={option.disabled}
                      onClick={() => handleOptionClick(option, columnIndex)}
                      type="button"
                    >
                      <span>{option.label}</span>
                      {isBranch ? <span aria-hidden="true">›</span> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Cascader({ error, fieldWrapper = true, hint, invalid, label, required, ...props }: CascaderProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <CascaderControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField error={error} hint={hint} invalid={invalid} label={label} required={required}>
      <CascaderControl {...props} />
    </FormField>
  );
}
