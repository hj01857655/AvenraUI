import type { FormHTMLAttributes } from 'react';

import { FormContext } from './context';

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  disabled?: boolean;
  submitting?: boolean;
};

export function Form({ children, disabled = false, submitting = false, ...props }: FormProps) {
  return (
    <FormContext.Provider value={{ disabled, submitting }}>
      <form {...props}>{children}</form>
    </FormContext.Provider>
  );
}
