import { Stack } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { Trans } from '@lingui/macro';

export default function ForgotPasswordForm() {
  return (
    <Stack spacing={3}>
      <RHFTextField name={'organizationUuid'} label={<Trans>Organisation ID</Trans>} required />
      <RHFTextField name={'email'} label={<Trans>Adresse mail</Trans>} required />
    </Stack>
  );
}
