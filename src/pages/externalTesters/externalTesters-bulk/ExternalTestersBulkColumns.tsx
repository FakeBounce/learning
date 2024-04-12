import { Trans } from '@lingui/macro';
import { Typography } from '@mui/material';
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

export const externalTestersBulkColumns = [
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
  }
] as GridColDef[];
