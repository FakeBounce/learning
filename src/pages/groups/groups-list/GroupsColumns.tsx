import { MouseEvent, ReactNode } from 'react';
import { Trans } from '@lingui/macro';
import { Theme } from '@mui/material/styles';
import { Box, IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { Group } from '@services/groups/interfaces';
import Iconify from '@src/components/iconify/Iconify';

export interface OrderBy {
  id: string;
  direction: 'DESC' | 'ASC';
}

export interface GroupsColumn {
  id: 'name' | 'description' | 'nbUsers';
  label: ReactNode;
  maxWidth?: number;
  padding?: 'normal' | 'checkbox' | 'none';
  align?: 'right' | 'center';
  renderCell?: (
    row: Group,
    handleClick: (newGroup: Group) => (event: MouseEvent<HTMLElement>) => void
  ) => ReactNode;
}

const groupsAction: GroupsColumn = {
  id: 'nbUsers',
  label: "",
  renderCell: (row, handleClick) => {
    return(
      <Box display={"flex"} alignItems={"center"} justifyContent={"end"}>
        <IconButton onClick={handleClick(row)} sx={{ boxShadow: 'none' }}>
          <Iconify
            sx={{ color: (theme: Theme) => theme.palette.grey[900] }}
            icon={'pepicons-pop:dots-y'}
          />
        </IconButton>
      </Box>
    );
  }
};

export const groupsColumns: GroupsColumn[] = [
  {
    id: 'name',
    label: <Trans>Nom</Trans>,
    renderCell: (row) => {
      return(
        <Box display={"flex"} alignItems={"center"}>
          <Typography fontSize={(theme: Theme) => theme.typography.body2.fontSize} ml={1}>
            {row.name}
          </Typography>
        </Box>
      );
    }
  },
  {
    id: 'description',
    label: <Trans>Description</Trans>,
    renderCell: (row) => {
      return(
        <Box display={"flex"} alignItems={"center"}>
          <Typography fontSize={(theme: Theme) => theme.typography.body2.fontSize} ml={1}>
            {row.description}
          </Typography>
        </Box>
      );
    }
  },
  {
    id: 'nbUsers',
    label: <Trans>Nombre d'utilisateurs</Trans>,
    renderCell: (row) => {
      return(
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography fontSize={(theme: Theme) => theme.typography.body2.fontSize} ml={1}>
            {row.nbUsers}
          </Typography>
        </Box>
      );
    }
  },
];

export const groupsTableHeaderRenderer = (
  setOrderBy: (id: 'name' | 'description' | 'nbUsers') => void,
  orderBy: OrderBy | null,
  hasPermission: boolean
) => {
  if (hasPermission) {
    if(!groupsColumns.includes(groupsAction)) groupsColumns.push(groupsAction);
  }
  return groupsColumns.map((column, index) => (
    <TableCell
      key={`${column.id}-${index}`}
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
      <Box display={"flex"} alignItems={"center"}>
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
}

export const groupsTableRowsRenderer = (
  groups: Group[],
  handleClick: (newGroup: Group) => (event: MouseEvent<HTMLElement>) => void,
) => {
  return groups.map((row: Group) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {groupsColumns.map((column: GroupsColumn, index) => {
          if (column.renderCell) {
            return (
              <TableCell key={`${column.id}-${index}`} padding={column.padding || 'normal'}>
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
}