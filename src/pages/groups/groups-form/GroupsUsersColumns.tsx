import { renderHeaderCell } from '@utils/helpers/tableRenders';
import { Trans } from '@lingui/macro';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Group } from '@services/groups/interfaces';

const findGroup = (groups: any[], groupId: number) => {
  return groups.find((group) => group.id === groupId);
};

export const GroupsUsersColumns = ({
  isEditing,
  currentGroup
}: {
  isEditing: boolean;
  currentGroup: Group | null;
}) => {
  const isEditingColumn: GridColDef = {
    field: 'id',
    display: 'flex',
    sortable: false,
    disableColumnMenu: true,
    renderHeader: () => renderHeaderCell(<Trans>Appartient déjà au groupe</Trans>),
    renderCell: (cell: GridRenderCellParams) => (
      <Typography>
        {cell.row.groups.length > 0 &&
        currentGroup &&
        findGroup(cell.row.groups, currentGroup.id) ? (
          <Trans>OUI</Trans>
        ) : (
          <Trans>NON</Trans>
        )}
      </Typography>
    )
  };

  const defaultColumns: GridColDef[] = [
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
  ];

  if (isEditing) {
    defaultColumns.push(isEditingColumn);
  }

  return defaultColumns;
};
