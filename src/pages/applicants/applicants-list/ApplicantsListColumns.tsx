import { Trans } from '@lingui/macro';
import { Avatar, Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { MouseEvent } from 'react';
import { Applicant } from '@services/applicants/interfaces';
import StatusChip from '@src/components/lms/StatusChip';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

export const applicantsColumns = (
  handleClick: (_newApplicant: Applicant) => (_event: MouseEvent<HTMLElement>) => void
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
      display: 'flex',
      renderHeader: () => renderHeaderCell(<Trans>Id externe</Trans>)
    },
    {
      field: 'lastname',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>)
    },
    {
      field: 'firstname',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Prénom</Trans>)
    },
    {
      field: 'birthDate',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Date naiss.</Trans>),
      renderCell: (cell: GridRenderCellParams) => {
        if (!cell.row.birthDate) return <Trans>/</Trans>;
        const birthDate = new Date(cell.row.birthDate).toLocaleDateString();
        return <Typography>{birthDate}</Typography>;
      }
    },
    {
      field: 'email',
      flex: 1,
      minWidth: 200,
      renderHeader: () => renderHeaderCell(<Trans>Email</Trans>)
    },
    {
      field: 'phone',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Téléphone</Trans>)
    },
    {
      field: 'city',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Ville</Trans>)
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
