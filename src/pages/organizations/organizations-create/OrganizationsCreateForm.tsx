import { Trans } from '@lingui/macro';
import { Box, Stack } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { Dispatch, SetStateAction } from 'react';
import RHFAvatar from '@src/components/hook-form/RHFAvatar';
import { getEnvVariable } from '@utils/environnement';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import RHFAutocomplete from '@src/components/hook-form/RHFAutocomplete';

export default function OrganizationsCreateForm({
  image,
  setImage
}: {
  setImage: Dispatch<SetStateAction<string | File>>;
  image: string | File;
}) {
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    debounce: 500,
    apiKey: getEnvVariable('VITE_HOST_GOOGLE_PLACES_SECRET')
  });

  return (
    <Stack spacing={3}>
      <RHFAvatar name={'logo'} image={image} setImage={setImage} />
      <Box display="flex" gap={4}>
        <RHFTextField name={'name'} label={<Trans>Nom</Trans>} required />
        <RHFAutocomplete
          name={'address'}
          label={<Trans>Adresse siège social</Trans>}
          required
          onInputChange={(_, value) => {
            getPlacePredictions({ input: value, debounce: 500 });
          }}
          options={placePredictions.map((item) => {
            return { label: item.description, value: item.place_id };
          })}
          loading={isPlacePredictionsLoading}
          freeSolo
        />
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
