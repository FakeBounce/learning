import { memo, ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface BaseRHFTextFieldProps {
  name: string;
  helperText?: ReactNode;
  size?: 'small' | 'medium';
}

type RHFEditorProps = BaseRHFTextFieldProps & Omit<TextFieldProps, 'name' | 'size'>;

function RHFEditor({ name, helperText, size = 'small', ...other }: RHFEditorProps) {
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
          inputProps={{ 'data-testid': `mce-editor-${name}` }}
          {...other}
        />
      )}
    />
  );
}

export default memo(RHFEditor);
