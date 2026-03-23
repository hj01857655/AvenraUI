import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from 'react';

export interface DialogProps {
  trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function Dialog({ trigger, title, description, children }: DialogProps) {
  const [open, setOpen] = useState(false);

  const triggerNode = cloneElement(trigger, {
    onClick: () => setOpen(true)
  });

  const content = Children.map(children, (child) => {
    if (!isValidElement<{ onClick?: MouseEventHandler<HTMLElement> }>(child)) {
      return child;
    }

    return cloneElement(child, {
      onClick: () => setOpen(false)
    });
  });

  return (
    <>
      {triggerNode}
      {open ? (
        <div className="avenra-dialog__backdrop" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="avenra-dialog-title"
            aria-describedby={description ? 'avenra-dialog-description' : undefined}
            className="avenra-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="avenra-dialog__header">
              <h2 id="avenra-dialog-title" className="avenra-dialog__title">
                {title}
              </h2>
              {description ? (
                <p id="avenra-dialog-description" className="avenra-dialog__description">
                  {description}
                </p>
              ) : null}
            </div>
            <div
              className="avenra-dialog__body"
              onClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest('button')) {
                  setOpen(false);
                }
              }}
            >
              {content}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

