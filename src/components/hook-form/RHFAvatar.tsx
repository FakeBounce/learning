import { Trans } from '@lingui/macro';
import { Avatar, Stack, Typography } from '@mui/material';
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
import CircledAvatar from '@src/components/lms/CircledAvatar';

interface RHFAvatarProps {
  name: string;
  image: string | File;
  setImage: Dispatch<SetStateAction<string | File>>;
  label?: ReactNode;
}

export default function RHFAvatar({
  name,
  image,
  setImage,
  label = <Trans>Téléchargez une photo</Trans>
}: RHFAvatarProps) {
  const [result, setResult] = useState<string | null>(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (image !== '' && typeof image === 'string') {
      setResult(image);
    }
  }, [image]);

  return (
    <CircledAvatar>
      <Stack alignItems="center" spacing={1}>
        {result ? (
          <Avatar
            data-testid="avatar"
            ref={imageRef}
            src={result}
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: (theme) => theme.shape.customBorderRadius.whole
            }}
          />
        ) : (
          <>
            <Iconify icon="majesticons:file-plus-line" />
            <Typography fontSize="10px">{label}</Typography>
          </>
        )}
      </Stack>
      <RHFTextField
        name={name}
        type={'file'}
        data-testid="file-upload"
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
  );
}
