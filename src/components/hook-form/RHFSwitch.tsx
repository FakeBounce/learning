import { memo, ReactNode } from 'react';
import { Box, FormControlLabel, Typography } from '@mui/material';
import LMSSwitch from '@src/components/lms/LMSSwitch';
import { Controller, useFormContext } from 'react-hook-form';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';

interface RHFSwitchProps {
  name: string;
  required?: boolean;
  label: ReactNode;
  disabled?: boolean;
  centered?: boolean;
}

function RHFSwitch({ name, required = false, label, disabled, centered }: RHFSwitchProps) {
  const { control } = useFormContext();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={centered ? 'center' : 'initial'}
      alignItems={centered ? 'center' : 'initial'}
      gap={0.5}
    >
      <Typography variant="caption">
        {required ? (
          <LabelWithRequired name={name} label={label} />
        ) : (
          <label htmlFor={name}>{label}</label>
        )}
      </Typography>
      <Box>
        <Controller
          name={name}
          control={control}
          defaultValue={control._defaultValues[name]}
          render={({ field: { onChange, value } }) => {
            return (
              <FormControlLabel
                sx={{
                  margin: 0, // Set no margin here for FormControlLabel
                  '& .MuiFormControlLabel-root': {
                    margin: 0 // If specifically targeting this class is needed
                  }
                }}
                control={
                  <LMSSwitch
                    name={name}
                    checked={value}
                    handleChange={onChange}
                    disabled={disabled}
                  />
                }
                label=""
              />
            );
          }}
        />
      </Box>
    </Box>
  );
}

export default memo(RHFSwitch);
