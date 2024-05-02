import { memo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface BaseRHFTextFieldProps {
  name: string;
  size?: 'small' | 'medium';
  required?: boolean;
}

type RHFTimerProps = BaseRHFTextFieldProps & {
  // Add any specific props you might need for testing
};

function RHFTimer({ name, size = 'small', required = false }: RHFTimerProps) {
  const { control } = useFormContext();
  const [pickerError, setPickerError] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <input
          type="time"
          {...field}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          onChange={(e) => {
            field.onChange(e); // Handle change events
            setPickerError(false); // Reset or handle errors as needed
          }}
          size={size === 'small' ? 10 : 20}
          required={required}
          aria-invalid={!!error || pickerError}
        />
      )}
    />
  );
}

export default memo(RHFTimer);
