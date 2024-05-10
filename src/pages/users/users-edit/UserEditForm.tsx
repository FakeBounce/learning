import { Box, Stack } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { Trans } from '@lingui/macro';
import RHFSwitch from '@src/components/hook-form/RHFSwitch';

export default function UserEditForm() {
  return (
    <Stack
      spacing={3}
      sx={{
        '& .MuiTextField-root:nth-of-type(odd)': { mr: 4 }
      }}
    >
      <Box display="flex">
        <RHFTextField name={'lastname'} label={<Trans>Nom</Trans>} required />
        <RHFTextField name={'firstname'} label={<Trans>Prénom</Trans>} required />
      </Box>
      <Box display="flex">
        <RHFTextField name={'email'} label={<Trans>Email</Trans>} required />
        <RHFTextField name={'login'} label={<Trans>Login</Trans>} required />
      </Box>
      <Box>
        <RHFSwitch label={<Trans>Double authentification</Trans>} name="useDoubleAuth" />
      </Box>
    </Stack>
  );
}
