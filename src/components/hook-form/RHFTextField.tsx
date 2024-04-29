import { memo, ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface BaseRHFTextFieldProps {
  name: string;
  helperText?: ReactNode;
  size?: 'small' | 'medium';
}

type RHFTextFieldProps = BaseRHFTextFieldProps & Omit<TextFieldProps, 'name' | 'size'>;

function RHFTextField({ name, helperText, size = 'small', ...other }: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          id={name}
          error={!!error}
          helperText={error ? error?.message : helperText}
          size={size}
          {...other}
        />
      )}
    />
  );
}

export default memo(RHFTextField);
