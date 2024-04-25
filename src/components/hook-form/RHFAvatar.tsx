import { Trans } from '@lingui/macro';
import { Avatar, Input, Stack, Typography } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { uploader } from '@utils/fileUploader';
import {
  ChangeEvent,
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import CircledAvatar from '@src/components/lms/CircledAvatar';
import { Controller, useFormContext } from 'react-hook-form';

interface RHFAvatarProps {
  name: string;
  image: string | File;
  setImage: Dispatch<SetStateAction<string | File>>;
  label?: ReactNode;
  size?: 'small' | 'medium';
}

function RHFAvatar({
  name,
  image,
  setImage,
  label = <Trans>Téléchargez une photo</Trans>,
  size = 'small'
}: RHFAvatarProps) {
  const [result, setResult] = useState<string | null>(null);
  const imageRef = useRef(null);
  const { control } = useFormContext();

  useEffect(() => {
    if (image !== '' && typeof image === 'string') {
      setResult(image);
    } else if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setResult(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
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
            <Input
              {...field}
              fullWidth
              value={field.value instanceof File ? field.value : ''}
              error={!!error}
              type={'file'}
              inputProps={{ accept: '.png,.jpeg,.gif,.jpg' }}
              sx={{ display: 'none' }}
              data-testid="file-upload"
              hidden
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  field.onChange(e);
                  setImage(e.target.files[0]);
                  uploader(e, setResult);
                }
              }}
              size={size}
            />
          </CircledAvatar>
          {error && (
            <Typography variant="caption" sx={{ color: (theme) => theme.palette.error.main }}>
              {error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
}
export default memo(RHFAvatar);
