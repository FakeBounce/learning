import { ReactNode } from 'react';
import { Group } from '@services/groups/interfaces';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import { Box, TableCell, TableRow, Typography } from '@mui/material';

export interface UserProfileGroupsColumns {
  id: 'name' | 'description';
  label: ReactNode;
  maxWidth?: number;
  padding?: 'normal' | 'checkbox' | 'none';
  align?: 'right' | 'center';
  renderCell?: (row: Group) => ReactNode;
}

export const userProfileGroupsColumns: readonly UserProfileGroupsColumns[] = [
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

export const userProfileGroupsHeaderRender = () => {
  const theme = useTheme();

  return userProfileGroupsColumns.map((column) => (
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

export const userProfileGroupsRowRender = (
  listData: Group[]
) => {
  return listData.map((row: Group, index) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
        {userProfileGroupsColumns.map((column: UserProfileGroupsColumns) => {
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