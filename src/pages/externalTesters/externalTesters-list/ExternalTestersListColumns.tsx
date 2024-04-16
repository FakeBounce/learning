import { Trans } from '@lingui/macro';
import { Avatar, Box } from '@mui/material';
import { Applicant } from '@services/applicants/interfaces';
import { MouseEvent } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import StatusChip from '@src/components/lms/StatusChip';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

export const externalTestersColumns = (
  handleClick: (newApplicant: Applicant) => (event: MouseEvent<HTMLElement>) => void
) =>
  [
    {
      field: 'id',
      display: 'flex',
      headerName: '',
      renderCell: (cell: GridRenderCellParams) => {
        const logo = cell.row.profilePicture || cell.row.lastname[0].toUpperCase();
        return (
          <Box display="flex" alignItems="center">
            <Avatar src={logo}>{logo}</Avatar>
          </Box>
        );
      }
    },
    {
      field: 'externalId',
      renderHeader: () => renderHeaderCell(<Trans>Id externe</Trans>)
    },
    {
      field: 'lastname',
      renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>)
    },
    {
      field: 'firstname',
      renderHeader: () => renderHeaderCell(<Trans>Prénom</Trans>)
    },
    {
      field: 'email',
      minWidth: 200,
      renderHeader: () => renderHeaderCell(<Trans>Email</Trans>)
    },
    {
      field: 'phone',
      renderHeader: () => renderHeaderCell(<Trans>Téléphone</Trans>)
    },
    {
      field: 'isActive',
      display: 'flex',
      renderHeader: () => renderHeaderCell(<Trans>Statut</Trans>),
      width: 120,
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
