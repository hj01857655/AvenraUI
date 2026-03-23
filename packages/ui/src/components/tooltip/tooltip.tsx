import { HTMLAttributes, ReactElement, ReactNode, isValidElement, useId, useState } from 'react';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: ReactNode;
  children: ReactElement<{
    onBlur?: () => void;
    onFocus?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    'aria-describedby'?: string;
  }>;
}

export function Tooltip({ children, className, content, ...props }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  if (!isValidElement(children)) {
    return null;
  }

  const trigger = children;

  return (
    <span className={['avenra-tooltip', className].filter(Boolean).join(' ')} {...props}>
      <trigger.type
        {...trigger.props}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => {
          trigger.props.onMouseEnter?.();
          setOpen(true);
        }}
        onMouseLeave={() => {
          trigger.props.onMouseLeave?.();
          setOpen(false);
        }}
        onFocus={() => {
          trigger.props.onFocus?.();
          setOpen(true);
        }}
        onBlur={() => {
          trigger.props.onBlur?.();
          setOpen(false);
        }}
      />
      {open ? (
        <span id={tooltipId} role="tooltip" className="avenra-tooltip__content">
          {content}
        </span>
      ) : null}
    </span>
  );
}
