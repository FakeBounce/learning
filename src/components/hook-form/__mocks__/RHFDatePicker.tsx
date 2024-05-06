import { memo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface BaseRHFTextFieldProps {
  name: string;
  size?: 'small' | 'medium';
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

type RHFTimerProps = BaseRHFTextFieldProps & {
  // Add any specific props you might need for testing
};

function RHFDatePicker({
  name,
  size = 'small',
  label,
  required = false,
  disabled = false
}: RHFTimerProps) {
  const { control } = useFormContext();
  const [pickerError, setPickerError] = useState(false);

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <input
              type="date"
              {...field}
              id={name}
              name={name}
              disabled={disabled}
              value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
              onChange={(e) => {
                const dateValue = e.target.value
                  ? new Date(e.target.value).toISOString().substring(0, 10)
                  : '';
                field.onChange(dateValue); // pass the date string in 'YYYY-MM-DD'
                setPickerError(!e.target.value); // Adjust based on actual validation needs
              }}
              size={size === 'small' ? 10 : 20}
              required={required}
              aria-invalid={!!error || pickerError}
            />
          );
        }}
      />
    </>
  );
}

export default memo(RHFDatePicker);
