import { Trans } from '@lingui/macro';
import { Box, Stack } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { Dispatch, SetStateAction } from 'react';
import RHFAvatar from '@src/components/hook-form/RHFAvatar';

export default function OrganizationsCreateForm({
  image,
  setImage
}: {
  setImage: Dispatch<SetStateAction<string | File>>;
  image: string | File;
}) {
  return (
    <Stack spacing={3}>
      <RHFAvatar name={'logo'} image={image} setImage={setImage} />
      <Box display="flex" gap={4}>
        <RHFTextField name={'name'} label={<Trans>Nom</Trans>} required />
        <RHFTextField name={'address'} label={<Trans>Adresse siège social</Trans>} required />
      </Box>

      <Box display="flex" gap={4}>
        <RHFTextField name={'adminLastName'} label={<Trans>Nom admin client</Trans>} required />
        <RHFTextField name={'adminFirstName'} label={<Trans>Prénom admin client</Trans>} required />
      </Box>

      <Box display="flex" gap={4}>
        <RHFTextField name={'login'} label={<Trans>Login</Trans>} required />
        <RHFTextField name={'adminEmail'} label={<Trans>Email admin client</Trans>} required />
      </Box>
    </Stack>
  );
}
