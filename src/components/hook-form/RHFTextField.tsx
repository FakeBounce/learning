import { ReactNode } from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

interface BaseRHFTextFieldProps {
  name: string;
  helperText?: ReactNode;
  size?: 'small' | 'medium';
}

type RHFTextFieldProps = BaseRHFTextFieldProps & Omit<TextFieldProps, 'name' | 'size'>;

export default function RHFTextField({
  name,
  helperText,
  size = 'small',
  ...other
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
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
