import { Stack } from '@mui/material';
import { LabelWithRequired, RHFTextField } from '@src/components/hook-form';

export default function ForgotPasswordForm() {
  return (
    <Stack
      spacing={3}
    >
      <RHFTextField
        name={'organization_id'}
        label={
          LabelWithRequired({ label: <label>Organisation ID</label> })
        }
      />
      <RHFTextField
        name={'email'}
        label={
          LabelWithRequired({ label: <label>Adresse mail</label> })
        }
      />
    </Stack>
  );
}