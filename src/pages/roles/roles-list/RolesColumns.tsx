import { Trans } from '@lingui/macro';
import { MouseEvent } from 'react';
import { Role } from '@services/roles/interfaces';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { renderHeaderCell } from '@utils/helpers/tableRenders';
import StatusChip from '@src/components/lms/StatusChip';

export const rolesColumns = (
  handleClick: (_newRole: Role) => (_event: MouseEvent<HTMLElement>) => void
) =>
  [
    {
      field: 'name',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>)
    },
    {
      field: 'description',
      display: 'flex',
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Description</Trans>)
    },
    {
      field: 'id',
      display: 'flex',
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      headerName: '',
      renderCell: (cell: GridRenderCellParams) => {
        return <StatusChip handleClick={handleClick(cell.row)} />;
      }
    }
  ] as GridColDef[];
