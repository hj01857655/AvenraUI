import type { FormHTMLAttributes } from 'react';
import { cn } from '@avenra/utils';

import { FormContext } from './context';

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  disabled?: boolean;
  submitting?: boolean;
};

export function Form({ children, className, disabled = false, submitting = false, ...props }: FormProps) {
  return (
    <FormContext.Provider value={{ disabled, submitting }}>
      <form
        {...props}
        className={cn('avenra-form', className)}
        aria-busy={submitting ? 'true' : props['aria-busy']}
        data-disabled={disabled ? 'true' : 'false'}
        data-submitting={submitting ? 'true' : 'false'}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}
