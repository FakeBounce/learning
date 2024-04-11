import { Trans } from '@lingui/macro';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ApplicantForBulk } from '@services/applicants/interfaces';
import { ReactNode } from 'react';
import { isValid } from 'date-fns';
import { OrderBy } from '@services/interfaces';
import Iconify from '@src/components/iconify/Iconify';

export interface ApplicantsBulkColumn {
  id:
    | 'externalId'
    | 'email'
    | 'lastname'
    | 'firstname'
    | 'birthDate'
    | 'birthName'
    | 'phone'
    | 'city';
  label: ReactNode;
  padding?: 'normal' | 'checkbox' | 'none';
  renderCell?: (row: ApplicantForBulk) => ReactNode;
}

const ApplicantsBulkCellRender = (row: ApplicantForBulk, id: keyof ApplicantForBulk) => {
  if (row[id] === 'MD') {
    return (
      <Typography color="error">
        <Trans>Information obligatoire</Trans>
      </Typography>
    );
  }
  if (row[id] === 'IF') {
    return (
      <Typography color="error">
        <Trans>Format incorrect</Trans>
      </Typography>
    );
  }
  return <Typography>{row[id]}</Typography>;
};

export const applicantsBulkColumns: readonly ApplicantsBulkColumn[] = [
  {
    id: 'externalId',
    label: (
      <Typography>
        <Trans>Id externe</Trans>
      </Typography>
    ),
    renderCell: (row) => ApplicantsBulkCellRender(row, 'externalId')
  },
  {
    id: 'lastname',
    label: (
      <Typography>
        <Trans>Nom</Trans>
      </Typography>
    ),
    renderCell: (row) => ApplicantsBulkCellRender(row, 'lastname')
  },
  {
    id: 'firstname',
    label: (
      <Typography>
        <Trans>Prénom</Trans>
      </Typography>
    ),
    renderCell: (row) => ApplicantsBulkCellRender(row, 'firstname')
  },
  {
    id: 'birthDate',
    label: <Trans>Date naiss.</Trans>,
    renderCell: (row) => {
      if (row.birthDate === 'MD') {
        return (
          <Typography color="error">
            <Trans>Information obligatoire</Trans>
          </Typography>
        );
      }
      if (row.birthDate && isValid(new Date(row.birthDate))) {
        const birthDate = new Date(row.birthDate).toLocaleDateString();
        return <Typography>{birthDate}</Typography>;
      }
      return (
        <Typography color="error">
          <Trans>Format incorrect</Trans>
        </Typography>
      );
    }
  },
  {
    id: 'birthName',
    label: (
      <Typography>
        <Trans>Nom de naissance</Trans>
      </Typography>
    ),
    renderCell: (row) => ApplicantsBulkCellRender(row, 'birthName')
  },
  {
    id: 'email',
    label: (
      <Typography>
        <Trans>Email</Trans>
      </Typography>
    ),
    renderCell: (row) => ApplicantsBulkCellRender(row, 'email')
  },
  {
    id: 'phone',
    label: (
      <Typography>
        <Trans>Téléphone</Trans>
      </Typography>
    ),
    renderCell: (row) => ApplicantsBulkCellRender(row, 'phone')
  },
  {
    id: 'city',
    label: (
      <Typography>
        <Trans>Ville</Trans>
      </Typography>
    ),
    renderCell: (row) => ApplicantsBulkCellRender(row, 'city')
  }
];

export const applicantsBulkTableHeaderRenderer = (
  setOrderBy: (
    id:
      | 'externalId'
      | 'email'
      | 'lastname'
      | 'firstname'
      | 'birthDate'
      | 'birthName'
      | 'phone'
      | 'city'
  ) => void,
  orderBy: OrderBy | null
) => {
  return applicantsBulkColumns.map((column) => (
    <TableCell
      key={column.id}
      padding={column.padding || 'normal'}
      sx={{
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

export const applicantsBulkTableRowsRenderer = (listData: ApplicantForBulk[]) => {
  return listData.map((row: ApplicantForBulk) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
        {applicantsBulkColumns.map((column: ApplicantsBulkColumn) => {
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
};
