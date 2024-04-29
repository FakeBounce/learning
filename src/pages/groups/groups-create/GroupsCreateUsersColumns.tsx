import { renderHeaderCell } from '@utils/helpers/tableRenders';
import { Trans } from '@lingui/macro';
import { GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

export const GroupsCreateUsersColumns = () =>
  [
    {
      field: 'lastname',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>),
      renderCell: (cell) => (
        <Typography>
          {cell.row.lastname} {cell.row.firstname}
        </Typography>
      )
    },
    {
      field: 'email',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Email</Trans>)
    }
  ] as GridColDef[];
