import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: ReactNode;
  size?: 'small' | 'medium';
};

function RHFSelect({
  name,
  native,
  maxHeight = 220,
  size = 'small',
  helperText,
  children,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          size={size}
          SelectProps={{
            native,
            MenuProps: {
              PaperProps: {
                sx: {
                  ...(!native && {
                    px: 1,
                    maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                    '& .MuiMenuItem-root': {
                      px: 1,
                      borderRadius: 0.75,
                      typography: 'body2'
                    }
                  })
                }
              }
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

export default RHFSelect;
