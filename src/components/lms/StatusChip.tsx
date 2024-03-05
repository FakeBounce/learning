import { Box, Chip, IconButton } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface StatisChipProps {
  row: any;
  activatedText: ReactNode;
  handleClick: (row: any) => (event: React.MouseEvent<HTMLElement>) => void;
}

export default function StatusChip({ row, activatedText, handleClick }: StatisChipProps) {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center">
      <Chip
        sx={{
          borderRadius: 1,
          backgroundColor: row.is_active ? theme.palette.primary.light : theme.palette.grey[300],
          color: row.is_active ? theme.palette.primary.darker : theme.palette.grey[900]
        }}
        label={activatedText}
      />
      <IconButton onClick={handleClick(row)} sx={{ boxShadow: 'none' }}>
        <Iconify sx={{ color: theme.palette.grey[900] }} icon={'pepicons-pop:dots-y'} />
      </IconButton>
    </Box>
  );
}