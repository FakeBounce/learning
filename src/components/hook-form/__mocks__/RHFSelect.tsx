import { useFormContext, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: ReactNode;
};

function RHFSelect({ name, children, ...other }: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <label htmlFor={name}>{other.label}</label>
          <select {...field} id={name} name={name} disabled={other.disabled}>
            {children}
          </select>
        </>
      )}
    />
  );
}

export default RHFSelect;
