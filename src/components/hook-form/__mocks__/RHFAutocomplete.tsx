import { useFormContext, Controller } from 'react-hook-form';
import { AutocompleteProps, TextField, TextFieldProps } from '@mui/material';
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
  onInputChange,
  loading,
  freeSolo,
  options,
  ...other
}: RHFAutocompleteProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          id={name}
          fullWidth
          onChange={(e) => {
            setValue(name, { label: e.target.value, value: e.target.value });
          }}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          size={size}
          {...other}
        />
      )}
    />
  );
}
