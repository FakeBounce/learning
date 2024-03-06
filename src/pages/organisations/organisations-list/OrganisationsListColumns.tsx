import { Trans } from '@lingui/macro';
import { Avatar, Box, Chip, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Organization } from '@services/organizations/interfaces';
import Iconify from '@src/components/iconify/Iconify';
import { ReactNode, MouseEvent } from 'react';

export interface OrderBy {
  id: string;
  direction: 'DESC' | 'ASC';
}
export interface OrganizationColumn {
  id: 'name' | 'city' | 'is_active';
  label: ReactNode;
  maxWidth?: number;
  padding?: 'normal' | 'checkbox' | 'none';
  align?: 'right' | 'center';
  renderCell?: (
    row: Organization,
    handleClick: (newOrganization: Organization) => (event: MouseEvent<HTMLElement>) => void
  ) => ReactNode;
}

export const organizationsListColumns: readonly OrganizationColumn[] = [
  {
    id: 'name',
    label: <Trans>Nom</Trans>,
    renderCell: (row) => {
      const logo = row.logo || row.name[0];
      return (
        <Box display="flex" alignItems="center">
          <Avatar src={logo}>{logo}</Avatar>
          <Typography fontSize={(theme: Theme) => theme.typography.body2.fontSize} ml={1}>
            {row.name}
          </Typography>
        </Box>
      );
    }
  },
  { id: 'city', label: <Trans>Ville</Trans> },
  {
    id: 'is_active',
    label: <Trans>Statut</Trans>,
    maxWidth: 120,
    padding: 'none',
    renderCell: (row, handleClick) => {
      const activatedText = row.is_active ? <Trans>Activé</Trans> : <Trans>Bloqué</Trans>;
      return (
        <Box display="flex" alignItems="center">
          <Chip
            sx={{
              borderRadius: 1,
              backgroundColor: (theme: Theme) =>
                row.is_active ? theme.palette.primary.light : theme.palette.grey[200],
              color: (theme: Theme) =>
                row.is_active ? theme.palette.primary.darker : theme.palette.grey[900]
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

export const organizationsTableHeaderRenderer = (
  setOrderBy: (id: 'name' | 'city' | 'is_active') => void,
  orderBy: OrderBy | null
) => {
  return organizationsListColumns.map((column) => (
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

export const organizationsTableRowsRenderer = (
  listData: Organization[],
  handleClick: (newOrganization: Organization) => (event: MouseEvent<HTMLElement>) => void
) => {
  return listData.map((row: Organization) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {organizationsListColumns.map((column: OrganizationColumn) => {
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
