import { MouseEvent } from 'react';
import { Trans } from '@lingui/macro';
import { Group } from '@services/groups/interfaces';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import StatusChip from '@src/components/lms/StatusChip';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

const groupsAction = (
  handleClick: (_newGroup: Group) => (_event: MouseEvent<HTMLElement>) => void
) => {
  return {
    field: 'id',
    display: 'flex',
    headerName: '',
    renderCell: (cell: GridRenderCellParams) => <StatusChip handleClick={handleClick(cell.row)} />
  } as GridColDef;
};

export const groupsColumns = (
  handleClick: (_newGroup: Group) => (_event: MouseEvent<HTMLElement>) => void,
  hasActions: boolean
) => {
  const columns = [
    {
      field: 'name',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>)
    },
    {
      field: 'description',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Description</Trans>)
    },
    {
      field: 'nbUsers',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nombre d'utilisateurs</Trans>)
    }
  ] as GridColDef[];
  if (hasActions) {
    columns.push(groupsAction(handleClick));
  }
  return columns;
};
