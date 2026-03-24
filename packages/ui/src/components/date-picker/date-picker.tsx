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

export type DatePickerProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'max' | 'min' | 'onChange' | 'size' | 'type' | 'value'
> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  invalid?: boolean;
  fieldWrapper?: boolean;
  value?: string;
  defaultValue?: string;
  open?: boolean;
  defaultOpen?: boolean;
  min?: string;
  max?: string;
  onValueChange?: (value: string | undefined) => void;
  onOpenChange?: (open: boolean) => void;
};

type CalendarDay = {
  date: Date;
  iso: string;
  inMonth: boolean;
  isToday: boolean;
};

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

const inputFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const dayLabelFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

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

function createLocalDate(year: number, month: number, day: number) {
  return new Date(year, month, day, 12, 0, 0, 0);
}

function parseIsoDate(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return createLocalDate(year, month - 1, day);
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function startOfMonth(date: Date) {
  return createLocalDate(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, amount: number) {
  const copy = createLocalDate(date.getFullYear(), date.getMonth(), date.getDate());
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function addMonths(date: Date, amount: number) {
  return createLocalDate(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
}

function buildCalendarDays(visibleMonth: Date) {
  const monthStart = startOfMonth(visibleMonth);
  const offset = monthStart.getDay();
  const gridStart = addDays(monthStart, -offset);
  const today = createLocalDate(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );

  return Array.from({ length: 42 }, (_, index): CalendarDay => {
    const date = addDays(gridStart, index);

    return {
      date,
      iso: formatIsoDate(date),
      inMonth: date.getMonth() === visibleMonth.getMonth(),
      isToday: isSameDay(date, today),
    };
  });
}

function isOutsideRange(iso: string, min?: string, max?: string) {
  return (min !== undefined && iso < min) || (max !== undefined && iso > max);
}

function DatePickerControl({
  className,
  defaultOpen = false,
  defaultValue,
  disabled,
  id,
  invalid,
  max,
  min,
  name,
  onOpenChange,
  onValueChange,
  open,
  placeholder = 'Select date',
  required,
  value,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  'aria-labelledby': ariaLabelledBy,
}: Omit<DatePickerProps, 'fieldWrapper' | 'label' | 'hint' | 'error'>) {
  const generatedId = useId().replace(/:/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
  const dayButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
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
    `avenra-date-picker-${generatedId}`,
  );

  const [selectedValue, setSelectedValue] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const resolvedSelectedDate = parseIsoDate(selectedValue);
  const initialMonth = resolvedSelectedDate ?? createLocalDate(new Date().getFullYear(), new Date().getMonth(), 1);
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(initialMonth));
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [activeDate, setActiveDate] = useState<Date>(resolvedSelectedDate ?? initialMonth);

  useEffect(() => {
    if (resolvedSelectedDate) {
      setVisibleMonth(startOfMonth(resolvedSelectedDate));
      setActiveDate(resolvedSelectedDate);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const activeIso = formatIsoDate(activeDate);
    dayButtonRefs.current[activeIso]?.focus();
  }, [activeDate, isOpen, visibleMonth]);

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

  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const displayValue = resolvedSelectedDate ? inputFormatter.format(resolvedSelectedDate) : '';
  const panelId = `${contract.id}-dialog`;
  const monthLabelId = `${contract.id}-month-label`;

  const openCalendar = () => {
    if (contract.disabled) {
      return;
    }

    const nextActiveDate = resolvedSelectedDate ?? createLocalDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    setVisibleMonth(startOfMonth(nextActiveDate));
    setActiveDate(nextActiveDate);
    setIsOpen(true);
  };

  const selectDate = (date: Date) => {
    const iso = formatIsoDate(date);

    if (contract.disabled || isOutsideRange(iso, min, max)) {
      return;
    }

    setSelectedValue(iso);
    setVisibleMonth(startOfMonth(date));
    setActiveDate(date);
    setIsOpen(false);
  };

  const moveActiveDate = (offset: number) => {
    const nextDate = addDays(activeDate, offset);
    setActiveDate(nextDate);
    setVisibleMonth(startOfMonth(nextDate));
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (contract.disabled) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCalendar();
      return;
    }

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  const handleDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveActiveDate(1);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveActiveDate(-1);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActiveDate(7);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActiveDate(-7);
      return;
    }

    if (event.key === 'PageDown') {
      event.preventDefault();
      const nextMonth = addMonths(date, 1);
      setVisibleMonth(startOfMonth(nextMonth));
      setActiveDate(nextMonth);
      return;
    }

    if (event.key === 'PageUp') {
      event.preventDefault();
      const previousMonth = addMonths(date, -1);
      setVisibleMonth(startOfMonth(previousMonth));
      setActiveDate(previousMonth);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectDate(date);
    }
  };

  return (
    <div
      className={cn(
        'avenra-date-picker',
        contract.invalid && 'avenra-date-picker--invalid',
        contract.disabled && 'avenra-date-picker--disabled',
        className,
      )}
      ref={rootRef}
      data-disabled={contract.disabled ? 'true' : 'false'}
      data-invalid={contract.invalid ? 'true' : 'false'}
    >
      {name ? <input type="hidden" name={name} value={selectedValue ?? ''} /> : null}

      <div className="avenra-date-picker__control">
        <input
          id={contract.id}
          type="text"
          role="combobox"
          readOnly
          className="avenra-date-picker__input"
          value={displayValue}
          placeholder={placeholder}
          disabled={contract.disabled}
          required={contract.required && !selectedValue}
          aria-haspopup="dialog"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls={panelId}
          aria-invalid={contract.ariaInvalid}
          aria-describedby={contract.ariaDescribedBy}
          aria-labelledby={contract.ariaLabelledBy}
          aria-disabled={contract.ariaDisabled}
          onFocus={() => openCalendar()}
          onKeyDown={handleInputKeyDown}
        />
        <button
          type="button"
          className="avenra-date-picker__trigger"
          aria-label="Open calendar"
          disabled={contract.disabled}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
              return;
            }

            openCalendar();
          }}
        >
          📅
        </button>
      </div>

      {isOpen ? (
        <div
          className="avenra-date-picker__panel"
          id={panelId}
          role="dialog"
          aria-label="Choose date"
          aria-modal="false"
        >
          <div className="avenra-date-picker__header">
            <button
              type="button"
              className="avenra-date-picker__nav"
              aria-label="Previous month"
              onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
            >
              Prev
            </button>
            <div className="avenra-date-picker__month" id={monthLabelId}>
              {monthFormatter.format(visibleMonth)}
            </div>
            <button
              type="button"
              className="avenra-date-picker__nav"
              aria-label="Next month"
              onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
            >
              Next
            </button>
          </div>

          <div className="avenra-date-picker__weekdays" aria-hidden="true">
            {Array.from({ length: 7 }, (_, index) => (
              <span className="avenra-date-picker__weekday" key={index}>
                {weekdayFormatter.format(addDays(createLocalDate(2026, 2, 1), index))}
              </span>
            ))}
          </div>

          <div className="avenra-date-picker__grid" role="grid" aria-labelledby={monthLabelId}>
            {calendarDays.map((day) => {
              const isSelected = resolvedSelectedDate ? isSameDay(day.date, resolvedSelectedDate) : false;
              const isActive = isSameDay(day.date, activeDate);
              const disabledDay = isOutsideRange(day.iso, min, max);

              return (
                <button
                  key={day.iso}
                  ref={(node) => {
                    dayButtonRefs.current[day.iso] = node;
                  }}
                  type="button"
                  role="gridcell"
                  className={cn(
                    'avenra-date-picker__day',
                    !day.inMonth && 'avenra-date-picker__day--muted',
                    isSelected && 'avenra-date-picker__day--selected',
                    day.isToday && 'avenra-date-picker__day--today',
                  )}
                  aria-label={dayLabelFormatter.format(day.date)}
                  aria-pressed={isSelected}
                  disabled={disabledDay}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectDate(day.date)}
                  onKeyDown={(event) => handleDayKeyDown(event, day.date)}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function DatePicker({ error, fieldWrapper = true, hint, invalid, label, required, ...props }: DatePickerProps) {
  if (!fieldWrapper || (!label && !hint && !error && required === undefined && invalid === undefined)) {
    return <DatePickerControl {...props} invalid={invalid} required={required} />;
  }

  return (
    <FormField label={label} hint={hint} error={error} required={required} invalid={invalid}>
      <DatePickerControl {...props} />
    </FormField>
  );
}
