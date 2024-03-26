import { Box, Chip, IconButton } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { useTheme } from '@mui/material/styles';
import React, { ReactNode } from 'react';

interface StatisChipProps {
  isActive: boolean;
  activatedText: ReactNode;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function StatusChip({ isActive, activatedText, handleClick }: StatisChipProps) {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
      <Chip
        sx={{
          borderRadius: theme.shape.customBorderRadius.small,
          backgroundColor: isActive ? theme.palette.primary.light : theme.palette.grey[300],
          color: isActive ? theme.palette.primary.darker : theme.palette.grey[900]
        }}
        label={activatedText}
      />
      <IconButton onClick={handleClick} sx={{ boxShadow: 'none' }}>
        <Iconify sx={{ color: theme.palette.grey[900] }} icon={'pepicons-pop:dots-y'} />
      </IconButton>
    </Box>
  );
}
