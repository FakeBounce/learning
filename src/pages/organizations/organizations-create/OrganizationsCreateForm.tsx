import { Trans } from '@lingui/macro';
import { Box, Stack } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { Dispatch, SetStateAction } from 'react';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';
import RHFAvatar from '../../../components/hook-form/RHFAvatar';

export default function OrganizationsCreateForm({
  image,
  setImage
}: {
  setImage: Dispatch<SetStateAction<string | File>>;
  image: string | File;
}) {
  return (
    <Stack
      spacing={3}
      sx={{
        '& .MuiTextField-root': { mr: 4 }
      }}
    >
      <RHFAvatar name={'logo'} image={image} setImage={setImage} />
      <Box display="flex">
        <RHFTextField name={'name'} label={<LabelWithRequired label={<Trans>Nom</Trans>} />} />
        <RHFTextField
          name={'address'}
          label={<LabelWithRequired label={<Trans>Adresse siège social</Trans>} />}
        />
      </Box>

      <Box display="flex">
        <RHFTextField
          name={'adminLastName'}
          label={<LabelWithRequired label={<Trans>Nom admin client</Trans>} />}
        />
        <RHFTextField
          name={'adminFirstName'}
          label={<LabelWithRequired label={<Trans>Prénom admin client</Trans>} />}
        />
      </Box>

      <Box display="flex">
        <RHFTextField name={'login'} label={<LabelWithRequired label={<Trans>Login</Trans>} />} />
        <RHFTextField
          name={'adminEmail'}
          label={<LabelWithRequired label={<Trans>Email admin client</Trans>} />}
        />
      </Box>
    </Stack>
  );
}
