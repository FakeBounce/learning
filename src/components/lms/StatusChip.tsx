import { Box, Chip, IconButton } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { Theme } from '@mui/material/styles';
import React, { memo, ReactNode } from 'react';

interface StatusChipProps {
  isActive?: boolean;
  activatedText?: ReactNode;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

function StatusChip({ isActive = false, activatedText, handleClick }: StatusChipProps) {
  return (
    <Box display="flex" alignItems="center">
      {activatedText && (
        <Chip
          sx={{
            borderRadius: (theme) => theme.shape.customBorderRadius.small,
            backgroundColor: (theme) =>
              isActive ? theme.palette.primary.light : theme.palette.grey[300],
            color: (theme) => (isActive ? theme.palette.primary.darker : theme.palette.grey[900])
          }}
          label={activatedText}
        />
      )}
      <IconButton onClick={handleClick} sx={{ boxShadow: 'none' }}>
        <Iconify
          sx={{ color: (theme: Theme) => theme.palette.grey[900] }}
          icon={'pepicons-pop:dots-y'}
        />
      </IconButton>
    </Box>
  );
}

export default memo(StatusChip);
