import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';

type PopoverTriggerElement = ReactElement<Record<string, unknown>>;

export type PopoverProps = {
  content: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  position?: 'top' | 'bottom';
  title?: string;
  trigger: PopoverTriggerElement;
};

export function Popover({
  content,
  defaultOpen = false,
  onOpenChange,
  open,
  position = 'bottom',
  title,
  trigger,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const panelId = useId();
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
    <div className={`avenra-popover avenra-popover--${position}`} ref={rootRef}>
      {cloneElement(trigger as PopoverTriggerElement, {
        'aria-controls': panelId,
        'aria-expanded': isOpen,
        onClick: (event: ReactMouseEvent) => {
          const originalOnClick = trigger.props.onClick;
          if (typeof originalOnClick === 'function') {
            originalOnClick(event);
          }
          setOpen(!isOpen);
        },
      })}
      {isOpen ? (
        <div className="avenra-popover__panel" id={panelId} role="dialog">
          {title ? <div className="avenra-popover__title">{title}</div> : null}
          <div className="avenra-popover__content">{content}</div>
        </div>
      ) : null}
    </div>
  );
}
