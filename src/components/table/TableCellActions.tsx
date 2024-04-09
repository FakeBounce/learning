import { Trans } from '@lingui/macro';
import { Box, Chip, IconButton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import Iconify from '@src/components/iconify/Iconify';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { MouseEvent } from 'react';

interface TableCellActionsProps {
  cell: GridRenderCellParams;
  handleClick?: (event: MouseEvent<HTMLElement>) => void;
}
export const TableCellActions = ({ cell, handleClick }: TableCellActionsProps) => {
  const activatedText = cell.row.isActive ? <Trans>Activé</Trans> : <Trans>Bloqué</Trans>;
  return (
    <Box display="flex" flex="1" alignItems="center" justifyContent="space-between">
      <Chip
        sx={{
          borderRadius: 1,
          backgroundColor: (theme: Theme) =>
            cell.row.isActive ? theme.palette.primary.light : theme.palette.grey[200],
          color: (theme: Theme) =>
            cell.row.isActive ? theme.palette.primary.darker : theme.palette.grey[900]
        }}
        label={activatedText}
      />
      {handleClick && (
        <IconButton onClick={handleClick} sx={{ boxShadow: 'none' }}>
          <Iconify
            sx={{ color: (theme: Theme) => theme.palette.grey[900] }}
            icon={'pepicons-pop:dots-y'}
          />
        </IconButton>
      )}
    </Box>
  );
};
