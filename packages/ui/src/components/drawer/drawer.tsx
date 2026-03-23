import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useState,
  type MouseEvent as ReactMouseEvent,
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
  const titleId = useMemo(() => `avenra-drawer-title-${generatedId.replace(/:/g, '')}`, [generatedId]);
  const descriptionId = useMemo(
    () => `avenra-drawer-description-${generatedId.replace(/:/g, '')}`,
    [generatedId],
  );

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

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isValidElement(trigger)) {
    return null;
  }

  return (
    <>
      {cloneElement(trigger as DrawerTriggerElement, {
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog',
        onClick: (event: ReactMouseEvent) => {
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
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={titleId}
            aria-modal="true"
            className="avenra-drawer"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
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
