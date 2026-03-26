import { cn } from '@avenra/utils';
import type { HTMLAttributes, ReactNode } from 'react';

export type StepsOrientation = 'horizontal' | 'vertical';
export type StepStatus = 'complete' | 'current' | 'upcoming';

export interface StepItem {
  id: string;
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
  status?: StepStatus;
}

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
  items: StepItem[];
  currentStep?: number;
  orientation?: StepsOrientation;
  ariaLabel?: string;
}

function resolveStepStatus(index: number, item: StepItem, currentStep: number | undefined): StepStatus {
  if (item.status) {
    return item.status;
  }

  if (currentStep === undefined) {
    return index === 0 ? 'current' : 'upcoming';
  }

  if (index < currentStep) {
    return 'complete';
  }

  if (index === currentStep) {
    return 'current';
  }

  return 'upcoming';
}

function getIndicatorLabel(index: number, status: StepStatus) {
  if (status === 'complete') {
    return 'Done';
  }

  if (status === 'current') {
    return 'Current';
  }

  return String(index + 1).padStart(2, '0');
}

export function Steps({ ariaLabel = 'Progress steps', className, currentStep, items, orientation = 'horizontal', ...props }: StepsProps) {
  return (
    <ol
      aria-label={ariaLabel}
      className={cn('avenra-steps', `avenra-steps--${orientation}`, className)}
      {...props}
    >
      {items.map((item, index) => {
        const status = resolveStepStatus(index, item, currentStep);
        const isCurrent = status === 'current';

        return (
          <li
            key={item.id}
            className={cn('avenra-steps__item', `avenra-steps__item--${status}`)}
            data-state={status}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <div className="avenra-steps__indicator" aria-hidden="true">
              <span className="avenra-steps__indicator-label">{getIndicatorLabel(index, status)}</span>
            </div>
            <div className="avenra-steps__content">
              <div className="avenra-steps__header">
                <span className="avenra-steps__title">{item.title}</span>
                {item.meta ? <span className="avenra-steps__meta">{item.meta}</span> : null}
              </div>
              {item.description ? <div className="avenra-steps__description">{item.description}</div> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
