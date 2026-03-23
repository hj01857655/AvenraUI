import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
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
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
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
          const originalOnClick = trigger.props.onClick;
          if (typeof originalOnClick === 'function') {
            originalOnClick(event);
          }
          setOpen(!isOpen);
        },
      })}
      {isOpen ? (
        <div className="avenra-dropdown-menu__panel" id={menuId} role="menu">
          {title ? <div className="avenra-dropdown-menu__title">{title}</div> : null}
          <div className="avenra-dropdown-menu__items">
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={[
                  'avenra-dropdown-menu__item',
                  item.tone === 'danger' ? 'avenra-dropdown-menu__item--danger' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => {
                  if (item.disabled) {
                    return;
                  }

                  item.onSelect?.();
                  setOpen(false);
                }}
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
