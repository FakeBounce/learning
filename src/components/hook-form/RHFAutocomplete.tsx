import { useFormContext, Controller } from 'react-hook-form';
import { Autocomplete, AutocompleteProps, TextField, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';

interface BaseRHFAutocompleteProps {
  name: string;
  label: ReactNode;
  size?: 'small' | 'medium';
  helperText?: ReactNode;
}
type RHFAutocompleteProps = BaseRHFAutocompleteProps &
  Omit<TextFieldProps, 'name' | 'label' | 'size'> &
  Omit<AutocompleteProps<any, false, false, boolean>, 'renderInput' | 'onChange'>;

export default function RHFAutocomplete({
  name,
  label,
  size,
  helperText,
  ...other
}: RHFAutocompleteProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          {...other}
          size={size}
          fullWidth
          onChange={(_, newValue) => {
            setValue(name, newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              size={size}
              error={!!error}
              helperText={error ? error?.message : helperText}
            />
          )}
        />
      )}
    />
  );
}
