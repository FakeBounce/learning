import { Trans } from '@lingui/macro';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import Iconify from '@src/components/iconify/Iconify';
import { uploader } from '@utils/fileUploader';
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { useAppSelector } from '@redux/hooks';
import CircledAvatar from '@src/components/lms/CircledAvatar';

const labelWithRequired = (label: ReactNode) => (
  <>
    {label}
    <span className="MuiFormLabel-asterisk"> *</span>
  </>
);

export default function OrganizationsUpdateForm({
  image,
  setImage
}: {
  image: string | File;
  setImage: Dispatch<SetStateAction<string | File>>;
}) {
  const [result, setResult] = useState<string | null>(null);
  const imageRef = useRef(null);
  const { currentOrganizationData, currentOrganizationLoading } = useAppSelector(
    (state) => state.organizations.currentOrganization
  );

  useEffect(() => {
    if (image !== '' && typeof image === 'string') {
      setResult(image);
    }
  }, [image]);

  if (currentOrganizationLoading || currentOrganizationData === null) {
    return <ProfileSkeleton rows={1} cols={2} />;
  }

  return (
    <Stack
      spacing={3}
      sx={{
        '& .MuiTextField-root': { mr: 4 }
      }}
    >
      <CircledAvatar>
        <Stack alignItems="center" spacing={1}>
          {result ? (
            <Avatar
              data-testid="avatar"
              ref={imageRef}
              src={result}
              sx={{
                width: 112,
                height: 112,
                borderRadius: (theme) => theme.shape.customBorderRadius.whole
              }}
            />
          ) : (
            <>
              <Iconify icon="majesticons:file-plus-line" />
              <Typography fontSize="10px">
                <Trans>Téléchargez une photo</Trans>
              </Typography>
            </>
          )}
        </Stack>
        <RHFTextField
          name="image"
          type={'file'}
          data-testid="file-upload"
          accept="image/*"
          value={''}
          sx={{ display: 'none' }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
              uploader(e, setResult);
            }
          }}
          hidden
        />
      </CircledAvatar>
      <Box display="flex">
        <RHFTextField name={'name'} label={labelWithRequired(<Trans>Nom</Trans>)} />
        <RHFTextField
          name={'address'}
          label={labelWithRequired(<Trans>Adresse siège social</Trans>)}
        />
      </Box>
    </Stack>
  );
}
