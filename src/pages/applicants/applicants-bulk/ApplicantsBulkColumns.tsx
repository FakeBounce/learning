import { Trans } from '@lingui/macro';
import { Typography } from '@mui/material';
import { isValid } from 'date-fns';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const ApplicantsBulkCellRender = (cell: GridRenderCellParams) => {
  if (cell.value === 'MD') {
    return (
      <Typography color="error">
        <Trans>Information obligatoire</Trans>
      </Typography>
    );
  }
  if (cell.value === 'IF') {
    return (
      <Typography color="error">
        <Trans>Format incorrect</Trans>
      </Typography>
    );
  }
  return <Typography>{cell.value}</Typography>;
};

export const applicantsBulkColumns = [
  {
    field: 'externalId',
    display: 'flex',
    renderHeader: () => (
      <strong>
        <Trans>Id externe</Trans>
      </strong>
    ),
    renderCell: ApplicantsBulkCellRender
  },
  {
    field: 'lastname',
    display: 'flex',
    renderHeader: () => (
      <strong>
        <Trans>Nom</Trans>
      </strong>
    ),
    renderCell: ApplicantsBulkCellRender
  },
  {
    field: 'firstname',
    display: 'flex',
    renderHeader: () => (
      <strong>
        <Trans>Prénom</Trans>
      </strong>
    ),
    renderCell: ApplicantsBulkCellRender
  },
  {
    field: 'birthDate',
    display: 'flex',
    renderHeader: () => (
      <strong>
        <Trans>Date naiss.</Trans>
      </strong>
    ),
    renderCell: (cell: GridRenderCellParams) => {
      if (cell.row.birthDate === 'MD') {
        return (
          <Typography color="error">
            <Trans>Information obligatoire</Trans>
          </Typography>
        );
      }
      if (cell.row.birthDate && isValid(new Date(cell.row.birthDate))) {
        const birthDate = new Date(cell.row.birthDate).toLocaleDateString();
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
    field: 'birthName',
    display: 'flex',
    renderHeader: () => (
      <strong>
        <Trans>Nom de naissance</Trans>
      </strong>
    ),
    renderCell: ApplicantsBulkCellRender
  },
  {
    field: 'email',
    display: 'flex',
    renderHeader: () => (
      <strong>
        <Trans>Email</Trans>
      </strong>
    ),
    renderCell: ApplicantsBulkCellRender
  },
  {
    field: 'phone',
    display: 'flex',
    renderHeader: () => (
      <strong>
        <Trans>Téléphone</Trans>
      </strong>
    ),
    renderCell: ApplicantsBulkCellRender
  },
  {
    field: 'city',
    display: 'flex',
    renderHeader: () => (
      <strong>
        <Trans>Ville</Trans>
      </strong>
    ),
    renderCell: ApplicantsBulkCellRender
  }
] as GridColDef[];
