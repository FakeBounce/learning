import { Trans } from '@lingui/macro';
import { Avatar, Box } from '@mui/material';
import { Applicant } from '@services/applicants/interfaces';
import { MouseEvent } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TableCellActions } from '@src/components/table/TableCellActions';

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
      renderHeader: () => (
        <strong>
          <Trans>Id externe</Trans>
        </strong>
      )
    },
    {
      field: 'lastname',
      renderHeader: () => (
        <strong>
          <Trans>Nom</Trans>
        </strong>
      )
    },
    {
      field: 'firstname',
      renderHeader: () => (
        <strong>
          <Trans>Prénom</Trans>
        </strong>
      )
    },
    {
      field: 'email',
      minWidth: 200,
      renderHeader: () => (
        <strong>
          <Trans>Email</Trans>
        </strong>
      )
    },
    {
      field: 'phone',
      renderHeader: () => (
        <strong>
          <Trans>Téléphone</Trans>
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
      width: 120,
      renderCell: (cell: GridRenderCellParams) => (
        <TableCellActions cell={cell} handleClick={handleClick(cell.row)} />
      )
    }
  ] as GridColDef[];
