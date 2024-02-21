import { Trans } from '@lingui/macro';
import { Avatar, Box, Chip, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Organisation } from '@services/organisations/interfaces';
import Iconify from '@src/components/iconify/Iconify';
import { ReactNode, MouseEvent } from 'react';

export interface OrderBy {
  id: string;
  direction: 'DESC' | 'ASC';
}
export interface OrganisationColumn {
  id: 'name' | 'city' | 'is_active';
  label: ReactNode;
  maxWidth?: number;
  padding?: 'normal' | 'checkbox' | 'none';
  align?: 'right' | 'center';
  renderCell?: (
    row: Organisation,
    handleClick: (newOrganisation: Organisation) => (event: MouseEvent<HTMLElement>) => void
  ) => ReactNode;
}

export const organisationsColumns: readonly OrganisationColumn[] = [
  {
    id: 'name',
    label: <Trans>Nom</Trans>,
    renderCell: (row) => {
      const theme = useTheme();
      const logo = row.logo || row.name[0];
      return (
        <Box display="flex" alignItems="center">
          <Avatar src={logo}>{logo}</Avatar>
          <Typography fontSize={theme.typography.body2.fontSize} ml={1}>
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
      const theme = useTheme();
      const activatedText = row.is_active ? <Trans>Activé</Trans> : <Trans>Bloqué</Trans>;
      return (
        <Box display="flex" alignItems="center">
          <Chip
            sx={{
              borderRadius: 1,
              backgroundColor: row.is_active
                ? theme.palette.primary.light
                : theme.palette.grey[200],
              color: row.is_active ? theme.palette.primary.darker : theme.palette.grey[900]
            }}
            label={activatedText}
          />
          <IconButton onClick={handleClick(row)} sx={{ boxShadow: 'none' }}>
            <Iconify sx={{ color: theme.palette.grey[900] }} icon={'pepicons-pop:dots-y'} />
          </IconButton>
        </Box>
      );
    }
  }
];

export const organisationsTableHeaderRenderer = (
  setOrderBy: (id: 'name' | 'city' | 'is_active') => void,
  orderBy: OrderBy | null
) => {
  const theme = useTheme();
  return organisationsColumns.map((column) => (
    <TableCell
      key={column.id}
      align={column.align}
      padding={column.padding || 'normal'}
      style={{
        width: column.maxWidth,
        backgroundColor: theme.palette.grey[200],
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

export const organisationsTableRowsRenderer = (
  listData: Organisation[],
  handleClick: (newOrganisation: Organisation) => (event: MouseEvent<HTMLElement>) => void
) => {
  return listData.map((row: Organisation) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {organisationsColumns.map((column: OrganisationColumn) => {
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
