import { Stack } from '@mui/material';
import { LabelWithRequired, RHFTextField } from '@src/components/hook-form';
import { Trans } from '@lingui/macro';

export default function ForgotPasswordForm() {
  return (
    <Stack
      spacing={3}
    >
      <RHFTextField
        name={'organizationId'}
        label={
          LabelWithRequired({
            label: <Trans>Organisation ID</Trans>
          })
        }
      />
      <RHFTextField
        name={'email'}
        label={
          LabelWithRequired({
            label: <Trans>Adresse mail</Trans>
          })
        }
      />
    </Stack>
  );
}