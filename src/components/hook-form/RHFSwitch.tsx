import { memo, ReactNode } from 'react';
import { Box, FormControlLabel, Typography } from '@mui/material';
import LMSSwitch from '@src/components/lms/LMSSwitch';
import { Controller, useFormContext } from 'react-hook-form';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';

interface RHFSwitchProps {
  name: string;
  required?: boolean;
  label: ReactNode;
}

function RHFSwitch({ name, required = false, label }: RHFSwitchProps) {
  const { control } = useFormContext();
  return (
    <Box>
      <Typography variant="caption">
        {required ? <LabelWithRequired label={label} /> : label}
      </Typography>
      <Box ml={1.5} mt={1}>
        <Controller
          name={name}
          control={control}
          defaultValue={control._defaultValues[name]}
          render={({ field: { onChange, value } }) => {
            return (
              <FormControlLabel
                control={<LMSSwitch checked={value} handleChange={onChange} />}
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
