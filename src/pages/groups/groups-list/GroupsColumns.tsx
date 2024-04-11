import { MouseEvent } from 'react';
import { Trans } from '@lingui/macro';
import { Group } from '@services/groups/interfaces';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import StatusChip from '@src/components/lms/StatusChip';

const groupsAction = (
  handleClick: (newGroup: Group) => (event: MouseEvent<HTMLElement>) => void
) => {
  return {
    field: 'id',
    display: 'flex',
    renderHeader: () => '',
    renderCell: (cell: GridRenderCellParams) => <StatusChip handleClick={handleClick(cell.row)} />
  } as GridColDef;
};

export const groupsColumns = (
  handleClick: (newGroup: Group) => (event: MouseEvent<HTMLElement>) => void,
  hasActions: boolean
) => {
  const columns = [
    {
      field: 'name',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Nom</Trans>
        </strong>
      )
    },
    {
      field: 'description',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Description</Trans>
        </strong>
      )
    },
    {
      field: 'nbUsers',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Nombre d'utilisateurs</Trans>
        </strong>
      )
    }
  ] as GridColDef[];
  if (hasActions) {
    columns.push(groupsAction(handleClick));
  }
  return columns;
};
