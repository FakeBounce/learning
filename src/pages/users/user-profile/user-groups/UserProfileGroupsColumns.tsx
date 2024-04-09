import { Trans } from '@lingui/macro';
import { Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export const userProfileGroupsColumns = () =>
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
      renderCell: (cell: GridRenderCellParams) => (
        <Typography fontSize={(theme) => theme.typography.body2.fontSize}>{cell.value}</Typography>
      )
    },
    {
      field: 'description',
      type: 'string',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Description</Trans>
        </strong>
      ),
      renderCell: (cell: GridRenderCellParams) => (
        <Typography fontSize={(theme) => theme.typography.body2.fontSize}>{cell.value}</Typography>
      )
    }
  ] as GridColDef[];
