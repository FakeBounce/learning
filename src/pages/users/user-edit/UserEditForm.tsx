import { ReactNode } from 'react';
import { Box, FormControlLabel, Stack, Typography } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { Trans } from '@lingui/macro';
import LMSSwitch from '@src/components/lms/LMSSwitch';
import { Control, Controller } from 'react-hook-form';
import { EditUserForm } from '@src/pages/users/user-edit/UserEdit';

const labelWithRequired = (label: ReactNode) => (
  <>
    {label}
    <span className="MuiFormLabel-asterisk"> *</span>
  </>
);

interface UserEditFormProps {
  control: Control<EditUserForm>;
}

export default function UserEditForm({ control }: UserEditFormProps) {
  return (
    <Stack
      spacing={3}
      sx={{
        '& .MuiTextField-root:nth-of-type(odd)': { mr: 4 }
      }}
    >
      <Box display="flex">
        <RHFTextField name={'lastname'} label={labelWithRequired('Nom')} />
        <RHFTextField name={'firstname'} label={labelWithRequired('Prénom')} />
      </Box>
      <Box display="flex">
        <RHFTextField name={'email'} label={labelWithRequired('Email')} />
        <RHFTextField name={'login'} label={labelWithRequired('Login')} />
      </Box>
      <Box>
        <Typography variant="body2">
          <Trans>Double authentification</Trans>
        </Typography>
        <Box ml={1.5} mt={1}>
          <Controller
            name="use_double_auth"
            control={control}
            defaultValue={control._defaultValues.use_double_auth}
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
    </Stack>
  );
}
