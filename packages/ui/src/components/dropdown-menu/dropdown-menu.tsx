import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
} from 'react';

type DropdownMenuTriggerElement = ReactElement<Record<string, unknown>>;

export interface DropdownMenuItem {
  disabled?: boolean;
  label: string;
  onSelect?: () => void;
  tone?: 'default' | 'danger';
}

export interface DropdownMenuProps {
  defaultOpen?: boolean;
  items: DropdownMenuItem[];
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title?: string;
  trigger: DropdownMenuTriggerElement;
}

export function DropdownMenu({
  defaultOpen = false,
  items,
  onOpenChange,
  open,
  title,
  trigger,
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const generatedId = useId();
  const menuId = useMemo(() => `avenra-dropdown-menu-${generatedId.replace(/:/g, '')}`, [generatedId]);
  const titleId = useMemo(() => `avenra-dropdown-menu-title-${generatedId.replace(/:/g, '')}`, [generatedId]);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const triggerRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(open ?? defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const firstEnabledItem = itemRefs.current.find((item) => item && !item.disabled);
      firstEnabledItem?.focus();
      wasOpenRef.current = true;
      return;
    }

    if (wasOpenRef.current) {
      triggerRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  const getEnabledIndices = () =>
    items
      .map((item, index) => (item.disabled ? -1 : index))
      .filter((index) => index >= 0);

  const focusItemByIndex = (index: number) => {
    itemRefs.current[index]?.focus();
  };

  const selectItemByIndex = (index: number) => {
    const item = items[index];
    if (!item || item.disabled) {
      return;
    }

    item.onSelect?.();
    setOpen(false);
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const enabledIndices = getEnabledIndices();
    if (enabledIndices.length === 0) {
      return;
    }

    const activeIndex = itemRefs.current.findIndex((item) => item === document.activeElement);
    const currentEnabledPosition = enabledIndices.indexOf(activeIndex);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextPosition = currentEnabledPosition === -1 || currentEnabledPosition === enabledIndices.length - 1 ? 0 : currentEnabledPosition + 1;
      focusItemByIndex(enabledIndices[nextPosition]);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextPosition = currentEnabledPosition <= 0 ? enabledIndices.length - 1 : currentEnabledPosition - 1;
      focusItemByIndex(enabledIndices[nextPosition]);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusItemByIndex(enabledIndices[0]);
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusItemByIndex(enabledIndices[enabledIndices.length - 1]);
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (activeIndex >= 0) {
        event.preventDefault();
        selectItemByIndex(activeIndex);
      }
    }

    if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  if (!isValidElement(trigger)) {
    return null;
  }

  return (
    <div className="avenra-dropdown-menu" ref={rootRef}>
      {cloneElement(trigger as DropdownMenuTriggerElement, {
        'aria-controls': menuId,
        'aria-expanded': isOpen,
        'aria-haspopup': 'menu',
        onClick: (event: ReactMouseEvent) => {
          triggerRef.current = event.currentTarget as HTMLElement;
          const originalOnClick = trigger.props.onClick;
          if (typeof originalOnClick === 'function') {
            originalOnClick(event);
          }
          setOpen(!isOpen);
        },
      })}
      {isOpen ? (
        <div
          aria-labelledby={title ? titleId : undefined}
          className="avenra-dropdown-menu__panel"
          id={menuId}
          role="menu"
          onKeyDown={handleMenuKeyDown}
        >
          {title ? (
            <div className="avenra-dropdown-menu__title" id={titleId}>
              {title}
            </div>
          ) : null}
          <div className="avenra-dropdown-menu__items">
            {items.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                className={[
                  'avenra-dropdown-menu__item',
                  item.tone === 'danger' ? 'avenra-dropdown-menu__item--danger' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => selectItemByIndex(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
