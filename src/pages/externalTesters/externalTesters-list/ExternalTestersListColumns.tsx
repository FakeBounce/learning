import { Trans } from '@lingui/macro';
import { Avatar, Box, Chip, IconButton, TableCell, TableRow } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Applicant } from '@services/applicants/interfaces';
import Iconify from '@src/components/iconify/Iconify';
import { ReactNode, MouseEvent } from 'react';
import { OrderBy } from '@services/interfaces';

export interface ExternalTestersColumn {
  id: 'id' | 'externalId' | 'email' | 'lastname' | 'firstname' | 'phone' | 'isActive';
  label: ReactNode;
  maxWidth?: number;
  padding?: 'normal' | 'checkbox' | 'none';
  align?: 'right' | 'center';
  renderCell?: (
    row: Applicant,
    handleClick: (newApplicant: Applicant) => (event: MouseEvent<HTMLElement>) => void
  ) => ReactNode;
}

export const externalTestersColumns: readonly ExternalTestersColumn[] = [
  {
    id: 'id',
    label: '',
    renderCell: (row) => {
      const logo = row.profilePicture || row.lastname[0];
      return (
        <Box display="flex" alignItems="center">
          <Avatar src={logo}>{logo}</Avatar>
        </Box>
      );
    }
  },
  { id: 'externalId', label: <Trans>Id externe</Trans> },
  { id: 'lastname', label: <Trans>Nom</Trans> },
  { id: 'firstname', label: <Trans>Prénom</Trans> },

  { id: 'email', label: <Trans>Email</Trans> },
  { id: 'phone', label: <Trans>Téléphone</Trans> },
  {
    id: 'isActive',
    label: <Trans>Statut</Trans>,
    maxWidth: 120,
    padding: 'none',
    renderCell: (row, handleClick) => {
      const activatedText = row.isActive ? <Trans>Activé</Trans> : <Trans>Bloqué</Trans>;
      return (
        <Box display="flex" alignItems="center">
          <Chip
            sx={{
              borderRadius: 1,
              backgroundColor: (theme: Theme) =>
                row.isActive ? theme.palette.primary.light : theme.palette.grey[200],
              color: (theme: Theme) =>
                row.isActive ? theme.palette.primary.darker : theme.palette.grey[900]
            }}
            label={activatedText}
          />
          <IconButton onClick={handleClick(row)} sx={{ boxShadow: 'none' }}>
            <Iconify
              sx={{ color: (theme: Theme) => theme.palette.grey[900] }}
              icon={'pepicons-pop:dots-y'}
            />
          </IconButton>
        </Box>
      );
    }
  }
];

export const externalTestersTableHeaderRenderer = (
  setOrderBy: (
    id: 'id' | 'email' | 'externalId' | 'lastname' | 'firstname' | 'phone' | 'isActive'
  ) => void,
  orderBy: OrderBy | null
) => {
  return externalTestersColumns.map((column) => (
    <TableCell
      key={column.id}
      align={column.align}
      padding={column.padding || 'normal'}
      sx={{
        width: column.maxWidth,
        backgroundColor: (theme: Theme) => theme.palette.grey[200],
        height: '3vh',
        cursor: 'pointer'
      }}
      onClick={() => setOrderBy(column.id)}
    >
      <Box display="flex" alignItems="center">
        {column.label}
        {orderBy?.id === column.id ? (
          <Iconify
            icon={
              orderBy.direction === 'ASC'
                ? 'fluent:arrow-sort-up-24-filled'
                : 'fluent:arrow-sort-down-20-filled'
            }
          />
        ) : null}
      </Box>
    </TableCell>
  ));
};

export const externalTestersTableRowsRenderer = (
  listData: Applicant[],
  handleClick: (newApplicant: Applicant) => (event: MouseEvent<HTMLElement>) => void
) => {
  return listData.map((row: Applicant) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {externalTestersColumns.map((column: ExternalTestersColumn) => {
          if (column.renderCell) {
            return (
              <TableCell key={column.id} padding={column.padding || 'normal'}>
                {column.renderCell(row, handleClick)}
              </TableCell>
            );
          }
          const value = row[column.id];
          return (
            <TableCell key={column.id} padding={column.padding || 'normal'}>
              {value}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });
};
