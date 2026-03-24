import type { AriaAttributes } from 'react';

import type { FormFieldContextValue } from './context';

type AriaInvalidValue = AriaAttributes['aria-invalid'];

export type FieldContractInput = {
  id?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  'aria-invalid'?: AriaInvalidValue;
};

function isAriaInvalid(value: AriaInvalidValue | undefined) {
  return value === true || value === 'true' || value === 'grammar' || value === 'spelling';
}

function resolveAriaInvalid(explicitInvalid: boolean, ariaInvalid: AriaInvalidValue | undefined) {
  if (explicitInvalid) {
    return 'true';
  }

  if (ariaInvalid === undefined || ariaInvalid === false) {
    return 'false';
  }

  if (ariaInvalid === true) {
    return 'true';
  }

  return ariaInvalid;
}

export function getFieldContract(
  field: FormFieldContextValue | null,
  props: FieldContractInput,
  fallbackId: string,
) {
  const resolvedInvalid = field?.invalid ?? props.invalid ?? isAriaInvalid(props['aria-invalid']);
  const resolvedDisabled = field?.disabled ?? props.disabled ?? false;
  const resolvedRequired = field?.required ?? props.required ?? false;

  return {
    id: props.id ?? field?.fieldId ?? fallbackId,
    disabled: resolvedDisabled,
    required: resolvedRequired,
    invalid: resolvedInvalid,
    ariaInvalid: resolveAriaInvalid(resolvedInvalid, props['aria-invalid']),
    ariaDescribedBy: field?.describedBy ?? props['aria-describedby'],
    ariaLabelledBy: field?.labelId ?? props['aria-labelledby'],
  } as const;
}

export function getCompositeFieldContract(
  field: FormFieldContextValue | null,
  props: FieldContractInput,
  fallbackId: string,
) {
  const contract = getFieldContract(field, props, fallbackId);

  return {
    ...contract,
    ariaDisabled: contract.disabled ? 'true' : undefined,
  } as const;
}
