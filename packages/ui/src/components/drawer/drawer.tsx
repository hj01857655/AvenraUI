import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';

export type DrawerTriggerElement = ReactElement<Record<string, unknown>>;

export interface DrawerProps {
  children?: ReactNode;
  defaultOpen?: boolean;
  description?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: string;
  trigger: DrawerTriggerElement;
}

export function Drawer({
  children,
  defaultOpen = false,
  description,
  onOpenChange,
  open,
  title,
  trigger,
}: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const generatedId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const panelId = useMemo(() => `avenra-drawer-panel-${generatedId.replace(/:/g, '')}`, [generatedId]);
  const titleId = useMemo(() => `avenra-drawer-title-${generatedId.replace(/:/g, '')}`, [generatedId]);
  const descriptionId = useMemo(
    () => `avenra-drawer-description-${generatedId.replace(/:/g, '')}`,
    [generatedId],
  );

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const wasOpenRef = useRef(isOpen);

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

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      wasOpenRef.current = true;
      return;
    }

    if (wasOpenRef.current) {
      triggerRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  if (!isValidElement(trigger)) {
    return null;
  }

  return (
    <>
      {cloneElement(trigger as DrawerTriggerElement, {
        'aria-controls': panelId,
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog',
        onClick: (event: ReactMouseEvent) => {
          triggerRef.current = event.currentTarget as HTMLElement;
          const originalOnClick = trigger.props.onClick;
          if (typeof originalOnClick === 'function') {
            originalOnClick(event);
          }
          setOpen(true);
        },
      })}
      {isOpen ? (
        <div className="avenra-drawer__backdrop" data-testid="avenra-drawer-backdrop" onClick={() => setOpen(false)}>
          <div
            id={panelId}
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={titleId}
            aria-modal="true"
            className="avenra-drawer"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
              if (event.key === 'Tab') {
                const focusable = [
                  closeButtonRef.current,
                  ...Array.from(
                    event.currentTarget.querySelectorAll<HTMLElement>(
                      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
                    ),
                  ),
                ].filter((element, index, array): element is HTMLElement => Boolean(element) && array.indexOf(element) === index);

                if (focusable.length === 0) {
                  return;
                }

                const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
                const nextIndex = event.shiftKey
                  ? (currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1)
                  : (currentIndex === -1 || currentIndex >= focusable.length - 1 ? 0 : currentIndex + 1);

                event.preventDefault();
                focusable[nextIndex]?.focus();
              }
            }}
          >
            <div className="avenra-drawer__header">
              <div className="avenra-drawer__header-copy">
                <h2 className="avenra-drawer__title" id={titleId}>
                  {title}
                </h2>
                {description ? (
                  <p className="avenra-drawer__description" id={descriptionId}>
                    {description}
                  </p>
                ) : null}
              </div>
              <button
                aria-label="Close drawer"
                className="avenra-drawer__close"
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="avenra-drawer__body">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
