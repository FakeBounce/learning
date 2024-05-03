import { renderHeaderCell } from '@utils/helpers/tableRenders';
import { Trans } from '@lingui/macro';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Role } from '@services/roles/interfaces';

const findRole = (rolesList: Role[], roleId: number) => {
  return rolesList.find((role) => role.id === roleId);
};

// eslint-disable-next-line react/display-name
const renderIsInRoleCell = (currentRole: Role | null) => (cell: GridRenderCellParams) =>
  (
    <Typography>
      {cell.row.roles &&
      cell.row.roles.length > 0 &&
      currentRole &&
      findRole(cell.row.roles, currentRole.id) ? (
        <Trans>OUI</Trans>
      ) : (
        <Trans>NON</Trans>
      )}
    </Typography>
  );

export const RolesUsersColumns = ({
  isEditing,
  currentRole
}: {
  isEditing: boolean;
  currentRole: Role | null;
}) => {
  const isEditingColumn: GridColDef = {
    field: 'isAlreadyInRole',
    display: 'flex',
    flex: 1,
    renderHeader: () => renderHeaderCell(<Trans>Appartient déjà au groupe</Trans>),
    renderCell: renderIsInRoleCell(currentRole)
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
    },
    {
      field: 'id',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Type</Trans>),
      renderCell: () => {
        return (
          <Typography>
            <Trans>Utilisateur</Trans>
          </Typography>
        );
      }
    }
  ];

  if (isEditing) {
    defaultColumns.push(isEditingColumn);
  }

  return defaultColumns;
};

export const RolesGroupsColumns = ({
  isEditing,
  currentRole
}: {
  isEditing: boolean;
  currentRole: Role | null;
}) => {
  const isEditingColumn: GridColDef = {
    field: 'id',
    display: 'flex',
    flex: 1,
    renderHeader: () => renderHeaderCell(<Trans>Appartient déjà au groupe</Trans>),
    renderCell: renderIsInRoleCell(currentRole)
  };

  const defaultColumns: GridColDef[] = [
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
      renderHeader: () => renderHeaderCell(<Trans>Type</Trans>),
      renderCell: () => {
        return (
          <Typography>
            <Trans>Groupe</Trans>
          </Typography>
        );
      }
    }
  ];

  if (isEditing) {
    defaultColumns.push(isEditingColumn);
  }

  return defaultColumns;
};
