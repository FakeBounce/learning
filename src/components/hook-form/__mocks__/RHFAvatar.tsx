// RHFAvatar.mock.tsx
import React, { Dispatch, SetStateAction, ReactNode } from 'react';
import { Avatar, Input, Stack, Typography } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import CircledAvatar from '@src/components/lms/CircledAvatar';

interface RHFAvatarProps {
  name: string;
  image: string | File;
  setImage: Dispatch<SetStateAction<string | File>>;
  label?: ReactNode;
  size?: 'small' | 'medium';
}

const RHFAvatar: React.FC<RHFAvatarProps> = ({
  image,
  setImage,
  label = <span>Téléchargez une photo</span>, // Using <span> for simplicity in tests
  size = 'small'
}) => {
  const result = typeof image === 'string' ? image : null;

  return (
    <CircledAvatar>
      <Stack alignItems="center" spacing={1}>
        {result ? (
          <Avatar
            data-testid="avatar"
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
        fullWidth
        value=""
        type="file"
        inputProps={{ accept: '.png,.jpeg,.gif,.jpg' }}
        sx={{ display: 'none' }}
        data-testid="file-upload"
        hidden
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}
        size={size}
      />
    </CircledAvatar>
  );
};

export default RHFAvatar;
