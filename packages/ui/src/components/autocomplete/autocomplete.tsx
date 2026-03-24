import { useMemo, useState } from 'react';

import { Combobox, type ComboboxOption, type ComboboxProps } from '../combobox/combobox';

export type AutocompleteOption = ComboboxOption;

export type AutocompleteProps = Omit<ComboboxProps, 'options'> & {
  options: AutocompleteOption[];
  minQueryLength?: number;
};

export function Autocomplete({
  defaultInputValue,
  inputValue,
  minQueryLength = 0,
  onInputValueChange,
  options,
  ...props
}: AutocompleteProps) {
  const [uncontrolledInputValue, setUncontrolledInputValue] = useState(defaultInputValue ?? '');
  const resolvedInputValue = inputValue ?? uncontrolledInputValue;

  const filteredOptions = useMemo(() => {
    return resolvedInputValue.trim().length >= minQueryLength ? options : [];
  }, [minQueryLength, options, resolvedInputValue]);

  return (
    <Combobox
      {...props}
      defaultInputValue={defaultInputValue}
      inputValue={resolvedInputValue}
      onInputValueChange={(nextValue) => {
        if (inputValue === undefined) {
          setUncontrolledInputValue(nextValue);
        }

        onInputValueChange?.(nextValue);
      }}
      options={filteredOptions}
    />
  );
}
