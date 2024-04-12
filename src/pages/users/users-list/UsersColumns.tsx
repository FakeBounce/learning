import { MouseEvent } from 'react';
import { Trans } from '@lingui/macro';
import { User } from '@services/users/interfaces';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import StatusChip from '@src/components/lms/StatusChip';

export const usersColumns = (
  handleClick: (newUser: User) => (event: MouseEvent<HTMLElement>) => void
) =>
  [
    {
      field: 'lastname',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Nom</Trans>
        </strong>
      )
    },
    {
      field: 'firstname',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Prénom</Trans>
        </strong>
      )
    },
    {
      field: 'email',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Email</Trans>
        </strong>
      )
    },
    {
      field: 'isActive',
      display: 'flex',
      renderHeader: () => (
        <strong>
          <Trans>Statut</Trans>
        </strong>
      ),
      maxWidth: 100,
      renderCell: (cell: GridRenderCellParams) => {
        const activatedText = cell.row.isActive ? <Trans>Activé</Trans> : <Trans>Bloqué</Trans>;
        return (
          <StatusChip
            isActive={cell.row.isActive}
            activatedText={activatedText}
            handleClick={handleClick(cell.row)}
          />
        );
      }
    }
  ] as GridColDef[];
