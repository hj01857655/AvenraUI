import { createContext, useContext } from 'react';

export interface FormContextValue {
  disabled: boolean;
  submitting: boolean;
}

export interface FormFieldContextValue {
  fieldId: string;
  labelId?: string;
  hintId?: string;
  errorId?: string;
  describedBy?: string;
  required: boolean;
  disabled: boolean;
  invalid: boolean;
  layout: 'stacked' | 'control';
}

export const FormContext = createContext<FormContextValue | null>(null);
export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormContext() {
  return useContext(FormContext);
}

export function useFormFieldContext() {
  return useContext(FormFieldContext);
}
