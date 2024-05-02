import { memo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers';
import { Trans } from '@lingui/macro';

interface BaseRHFTextFieldProps {
  name: string;
  size?: 'small' | 'medium';
  required?: boolean;
}

type RHFTimerProps = BaseRHFTextFieldProps & Omit<TimePickerProps<any>, 'name' | 'size'>;

function RHFTimer({ name, size = 'small', required = false, ...other }: RHFTimerProps) {
  const { control } = useFormContext();
  const [pickerError, setPickerError] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TimePicker
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
                  <Trans>Durée invalide</Trans>
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

export default memo(RHFTimer);
