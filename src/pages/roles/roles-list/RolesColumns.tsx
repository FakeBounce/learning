import { Trans } from '@lingui/macro';
import { Box, IconButton, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import Iconify from '@src/components/iconify/Iconify';
import { MouseEvent } from 'react';
import { Role } from '@services/roles/interfaces';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const rolesColumns = (
  handleClick: (newRole: Role) => (event: MouseEvent<HTMLElement>) => void
) =>
  [
    {
      field: 'name',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Nom</Trans>
        </strong>
      ),
      renderCell: (cell: GridRenderCellParams) => {
        return (
          <Typography fontSize={(theme: Theme) => theme.typography.body2.fontSize} ml={1}>
            {cell.value}
          </Typography>
        );
      }
    },
    {
      field: 'description',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Description</Trans>
        </strong>
      ),
      renderCell: (cell: GridRenderCellParams) => {
        return (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography fontSize={(theme: Theme) => theme.typography.body2.fontSize} ml={1}>
              {cell.value}
            </Typography>
            <IconButton onClick={handleClick(cell.row)} sx={{ boxShadow: 'none' }}>
              <Iconify
                sx={{ color: (theme: Theme) => theme.palette.grey[900] }}
                icon={'pepicons-pop:dots-y'}
              />
            </IconButton>
          </Box>
        );
      }
    }
  ] as GridColDef[];
