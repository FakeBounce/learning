import { ReactNode } from 'react';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { Role } from '@services/roles/interfaces.ts';

export interface UserProfileRolesColumns {
  id: 'name' | 'description';
  label: ReactNode;
  maxWidth?: number;
  padding?: 'normal' | 'checkbox' | 'none';
  align?: 'right' | 'center';
  renderCell?: (row: Role) => ReactNode;
}

export const userProfileRolesColumns: readonly UserProfileRolesColumns[] = [
  {
    id: 'name',
    label: <Trans>Nom</Trans>,
    renderCell: (row) => {
      const theme = useTheme();

      return(
        <Box display="flex" alignItems="center">
          <Typography fontSize={theme.typography.body2.fontSize}>{row.name}</Typography>
        </Box>
      );
    }
  },
  {
    id: 'description',
    label: <Trans>Description</Trans>,
    renderCell: (row) => {
      const theme = useTheme();

      return(
        <Box display="flex" alignItems="center">
          <Typography fontSize={theme.typography.body2.fontSize}>{row.description}</Typography>
        </Box>
      );
    }
  }
];

export const userProfileRolesHeaderRender = () => {
  const theme = useTheme();

  return userProfileRolesColumns.map((column) => (
    <TableCell
      key={column.id}
      align={column.align}
      style={{
        maxWidth: column.maxWidth,
        padding: column.padding || 'normal',
        backgroundColor: theme.palette.grey[200],
        height: '3vh'
      }}
    >
      {column.label}
    </TableCell>
  ));
}

export const userProfileRolesRowRender = (
  listData: Role[]
) => {
  return listData.map((row: Role, index) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
        {userProfileRolesColumns.map((column: UserProfileRolesColumns) => {
          if (column.renderCell) {
            return (
              <TableCell key={column.id} padding={column.padding || 'normal'}>
                {column.renderCell(row)}
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