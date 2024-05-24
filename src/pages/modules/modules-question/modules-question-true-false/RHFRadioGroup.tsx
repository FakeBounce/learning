import { useFormContext, Controller } from 'react-hook-form';
import { FormLabel, RadioGroup, FormControl, FormHelperText, RadioGroupProps } from '@mui/material';
import { ReactNode } from 'react';
import LMSRadioReadonly from '@src/pages/modules/modules-question/modules-question-true-false/LMSRadioReadonly';

type Props = RadioGroupProps & {
  name: string;
  options: { label: string; value: any }[];
  label?: ReactNode;
  helperText?: ReactNode;
  disabled?: boolean;
};

export default function RHFRadioGroup({
  row,
  name,
  label,
  options,
  helperText,
  disabled = false,
  ...other
}: Props) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel
              id={labelledby}
              sx={{
                typography: 'body2',
                color: (theme) => theme.palette.common.black,
                fontWeight: (theme) => theme.typography.fontWeightBold,

                '&.Mui-focused': {
                  color: (theme) => theme.palette.common.black
                },
                ...(error && {
                  color: (theme) => theme.palette.error.main
                })
              }}
            >
              {label}
            </FormLabel>
          )}

          <RadioGroup
            {...field}
            aria-labelledby={labelledby}
            row={row}
            sx={{ gap: 2, mt: 1 }}
            {...other}
          >
            {options.map((option) => (
              <LMSRadioReadonly
                key={option.value}
                label={option.label}
                value={option.value}
                selected={field.value === option.value}
                disabled={disabled}
                error={!!error}
              />
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
