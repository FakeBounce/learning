import { MouseEvent } from 'react';
import { Trans } from '@lingui/macro';
import { User } from '@services/users/interfaces';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import StatusChip from '@src/components/lms/StatusChip';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

export const usersColumns = (
  handleClick: (_newUser: User) => (_event: MouseEvent<HTMLElement>) => void
) =>
  [
    {
      field: 'lastname',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>)
    },
    {
      field: 'firstname',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Prénom</Trans>)
    },
    {
      field: 'email',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Email</Trans>)
    },
    {
      field: 'isActive',
      display: 'flex',
      renderHeader: () => renderHeaderCell(<Trans>Statut</Trans>),
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
