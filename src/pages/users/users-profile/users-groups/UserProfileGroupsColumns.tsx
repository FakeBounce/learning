import { Trans } from '@lingui/macro';
import { Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

export const userProfileGroupsColumns = () =>
  [
    {
      field: 'name',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>),
      renderCell: (cell: GridRenderCellParams) => (
        <Typography fontSize={(theme) => theme.typography.body2.fontSize}>{cell.value}</Typography>
      )
    },
    {
      field: 'description',
      type: 'string',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Description</Trans>),
      renderCell: (cell: GridRenderCellParams) => (
        <Typography fontSize={(theme) => theme.typography.body2.fontSize}>{cell.value}</Typography>
      )
    }
  ] as GridColDef[];
