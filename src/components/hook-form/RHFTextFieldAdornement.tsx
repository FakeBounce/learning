import Iconify from '@src/components/iconify/Iconify';
import { memo, ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { IconButton, InputAdornment, TextField } from '@mui/material';

interface RHFTextFieldProps {
  name: string;
  helperText?: ReactNode;
  InputProps?: Record<string, any>;
  onClick: () => void;
  icon: string;
  [x: string]: any;
}

function RHFTextFieldAdornement({
  name,
  helperText,
  InputProps,
  onClick,
  icon,
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onClick} edge="end">
                  <Iconify icon={icon} />
                </IconButton>
              </InputAdornment>
            ),
            ...InputProps
          }}
          {...other}
        />
      )}
    />
  );
}

export default memo(RHFTextFieldAdornement);
