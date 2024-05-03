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
}

function RHFSwitch({ name, required = false, label, disabled }: RHFSwitchProps) {
  const { control } = useFormContext();
  return (
    <Box>
      <Typography variant="caption">
        {required ? <LabelWithRequired name={name} label={label} /> : label}
      </Typography>
      <Box ml={1.5} mt={1}>
        <Controller
          name={name}
          control={control}
          defaultValue={control._defaultValues[name]}
          render={({ field: { onChange, value } }) => {
            return (
              <FormControlLabel
                control={<LMSSwitch checked={value} handleChange={onChange} disabled={disabled} />}
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
