import { Trans } from '@lingui/macro';
import { Avatar, Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { MouseEvent } from 'react';
import { Applicant } from '@services/applicants/interfaces';
import { TableCellActions } from '@src/components/table/TableCellActions';

export const applicantsColumns = (
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
      // flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Id externe</Trans>
        </strong>
      )
    },
    {
      field: 'lastname',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Nom</Trans>
        </strong>
      )
    },
    {
      field: 'firstname',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Prénom</Trans>
        </strong>
      )
    },
    {
      field: 'birthDate',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Date naiss.</Trans>
        </strong>
      ),
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
      renderHeader: () => (
        <strong>
          <Trans>Email</Trans>
        </strong>
      )
    },
    {
      field: 'phone',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Téléphone</Trans>
        </strong>
      )
    },
    {
      field: 'city',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Ville</Trans>
        </strong>
      )
    },
    {
      field: 'isActive',
      display: 'flex',
      sortable: true,
      disableColumnMenu: true,
      renderHeader: () => (
        <strong>
          <Trans>Statut</Trans>
        </strong>
      ),
      maxWidth: 120,
      flex: 1,
      renderCell: (cell: GridRenderCellParams) => (
        <TableCellActions cell={cell} handleClick={handleClick(cell.row)} />
      )
    }
  ] as GridColDef[];
