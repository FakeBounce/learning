import { Trans } from '@lingui/macro';
import { Avatar, Box } from '@mui/material';
import { Applicant } from '@services/applicants/interfaces';
import { MouseEvent } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import StatusChip from '@src/components/lms/StatusChip';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

const updateWarning = (
  <Box
    sx={{
      borderRadius: (theme) => theme.shape.customBorderRadius.whole,
      backgroundColor: (theme) => theme.palette.warning.main,
      width: 25,
      height: 25,
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: -12,
      top: 15,
      fontSize: (theme) => theme.typography.h4.fontSize
    }}
  >
    !
  </Box>
);

export const externalTestersColumns = (
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
          <Box display="flex" alignItems="center" position="relative">
            <Avatar src={logo}>{logo}</Avatar>
            {cell.row.conflicts && Object.keys(cell.row.conflicts).length > 0 && updateWarning}
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
