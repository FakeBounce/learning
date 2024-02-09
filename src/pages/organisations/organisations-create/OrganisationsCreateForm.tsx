import { Trans } from '@lingui/macro';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { RHFTextField } from '@src/components/hook-form';
import Iconify from '@src/components/iconify/Iconify';
import theme from '@theme';
import { uploader } from '@utils/fileUploader';
import { ChangeEvent, ReactNode, useRef, useState } from 'react';

const StyledImageDisplayContainer = styled(Box)(() => ({
  width: 128,
  height: 128,
  border: `1px dashed ${theme.palette.grey[200]}`,
  borderRadius: 64,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const StyledImageDisplayer = styled(Box)(() => ({
  width: 112,
  height: 112,
  backgroundColor: theme.palette.grey[200],
  borderRadius: 64,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const labelWithRequired = (label: ReactNode) => (
  <>
    {label}
    <span className="MuiFormLabel-asterisk"> *</span>
  </>
);

export default function OrganisationsCreateForm({ setImage }: { setImage: (image: File) => void }) {
  const [result, setResult] = useState<string | null>('');
  const imageRef = useRef(null);

  return (
    <Stack
      spacing={3}
      sx={{
        '& .MuiTextField-root': { mr: 4 }
      }}
    >
      <StyledImageDisplayContainer component="label">
        <StyledImageDisplayer>
          <Stack alignItems="center" spacing={1}>
            {result ? (
              <Avatar
                ref={imageRef}
                src={result}
                sx={{ width: 112, height: 112, borderRadius: 56 }}
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
        </StyledImageDisplayer>
      </StyledImageDisplayContainer>
      <Box display="flex">
        <RHFTextField name={'name'} label={labelWithRequired(<Trans>Nom</Trans>)} />
        <RHFTextField
          name={'address'}
          label={labelWithRequired(<Trans>Adresse siège social</Trans>)}
        />
      </Box>

      <Box display="flex">
        <RHFTextField
          name={'adminLastName'}
          label={labelWithRequired(<Trans>Nom admin client</Trans>)}
        />
        <RHFTextField
          name={'adminFirstName'}
          label={labelWithRequired(<Trans>Prénom admin client</Trans>)}
        />
      </Box>

      <Box display="flex">
        <RHFTextField name={'login'} label={labelWithRequired(<Trans>Login</Trans>)} />
        <RHFTextField
          name={'adminEmail'}
          label={labelWithRequired(<Trans>Email admin client</Trans>)}
        />
      </Box>
    </Stack>
  );
}
