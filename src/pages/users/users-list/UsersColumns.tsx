import { MouseEvent, ReactNode } from 'react';
import { Trans } from '@lingui/macro';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { UserFromAPI } from '@services/connected-user/interfaces';
import StatusChip from '@src/components/lms/StatusChip';
import Iconify from '@src/components/iconify/Iconify';

export interface OrderBy {
  id: string;
  direction: 'DESC' | 'ASC';
}
export interface UsersColumn {
  id: 'lastname' | 'firstname' | 'email' | 'is_active';
  label: ReactNode;
  maxWidth?: number;
  padding?: 'normal' | 'checkbox' | 'none';
  align?: 'right' | 'center';
  renderCell?: (
    row: UserFromAPI,
    handleClick: (newUser: UserFromAPI) => (event: MouseEvent<HTMLElement>) => void
  ) => ReactNode;
}

export const usersColumns: readonly UsersColumn[] = [
  {
    id: 'lastname',
    label: <Trans>Nom</Trans>,
    renderCell: (row) => {
      return (
        <Box display="flex" alignItems="center">
          <Typography fontSize={(theme) => theme.typography.body2.fontSize}>
            {row.lastname}
          </Typography>
        </Box>
      );
    }
  },
  {
    id: 'firstname',
    label: <Trans>Prénom</Trans>,
    renderCell: (row) => {
      return (
        <Box display="flex" alignItems="center">
          <Typography fontSize={(theme) => theme.typography.body2.fontSize}>
            {row.firstname}
          </Typography>
        </Box>
      );
    }
  },
  {
    id: 'email',
    label: <Trans>Email</Trans>,
    renderCell: (row) => {
      return (
        <Box display="flex" alignItems="center">
          <Typography fontSize={(theme) => theme.typography.body2.fontSize}>{row.email}</Typography>
        </Box>
      );
    }
  },
  {
    id: 'is_active',
    label: <Trans>Statut</Trans>,
    maxWidth: 100,
    renderCell: (row, handleClick) => {
      const activatedText = row.is_active ? <Trans>Activé</Trans> : <Trans>Bloqué</Trans>;

      return (
        <Box display="flex" alignItems="center">
          <StatusChip
            isActive={row.is_active}
            activatedText={activatedText}
            handleClick={handleClick(row)}
          />
        </Box>
      );
    }
  }
];

export const usersTableHeaderRender = (
  setOrderBy: (id: 'lastname' | 'firstname' | 'email' | 'is_active') => void,
  orderBy: OrderBy | null
) => {
  return usersColumns.map((column) => (
    <TableCell
      key={column.id}
      align={column.align}
      padding={column.padding || 'normal'}
      sx={{
        width: column.maxWidth,
        backgroundColor: (theme) => theme.palette.grey[200],
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

export const usersTableRowsRender = (
  listData: UserFromAPI[],
  handleClick: (newUser: UserFromAPI) => (event: MouseEvent<HTMLElement>) => void
) => {
  return listData.map((row: UserFromAPI) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {usersColumns.map((column: UsersColumn) => {
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
