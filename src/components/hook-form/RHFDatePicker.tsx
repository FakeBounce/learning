import { memo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { Trans } from '@lingui/macro';

interface BaseRHFTextFieldProps {
  name: string;
  size?: 'small' | 'medium';
  required?: boolean;
}

type RHFTimerProps = BaseRHFTextFieldProps & Omit<DatePickerProps<any>, 'name' | 'size'>;

function RHFDatePicker({ name, size = 'small', required = false, ...other }: RHFTimerProps) {
  const { control } = useFormContext();
  const [pickerError, setPickerError] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <DatePicker
            {...field}
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            onError={(eps) => {
              setPickerError(!!eps);
            }}
            slotProps={{
              textField: {
                size,
                error: !!error && pickerError,
                helperText: pickerError ? (
                  <Trans>Date invalide</Trans>
                ) : error ? (
                  error?.message
                ) : null,
                required
              }
            }}
            {...other}
          />
        );
      }}
    />
  );
}

export default memo(RHFDatePicker);
