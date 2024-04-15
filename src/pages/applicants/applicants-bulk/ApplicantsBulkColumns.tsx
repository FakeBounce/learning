import { Trans } from '@lingui/macro';
import { Typography } from '@mui/material';
import { isValid } from 'date-fns';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { BulkCellRenderer } from '@utils/helpers/bulkCellRenderer';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

export const applicantsBulkColumns = [
  {
    field: 'externalId',
    display: 'flex',
    renderHeader: () => renderHeaderCell(<Trans>Id externe</Trans>),
    renderCell: BulkCellRenderer
  },
  {
    field: 'lastname',
    display: 'flex',
    renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>),
    renderCell: BulkCellRenderer
  },
  {
    field: 'firstname',
    display: 'flex',
    renderHeader: () => renderHeaderCell(<Trans>Prénom</Trans>),
    renderCell: BulkCellRenderer
  },
  {
    field: 'birthDate',
    display: 'flex',
    renderHeader: () => renderHeaderCell(<Trans>Date naiss.</Trans>),
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
    renderHeader: () => renderHeaderCell(<Trans>Nom de naissance</Trans>),
    renderCell: BulkCellRenderer
  },
  {
    field: 'email',
    display: 'flex',
    renderHeader: () => renderHeaderCell(<Trans>Email</Trans>),
    renderCell: BulkCellRenderer
  },
  {
    field: 'phone',
    display: 'flex',
    renderHeader: () => renderHeaderCell(<Trans>Téléphone</Trans>),
    renderCell: BulkCellRenderer
  },
  {
    field: 'city',
    display: 'flex',
    renderHeader: () => renderHeaderCell(<Trans>Ville</Trans>),
    renderCell: BulkCellRenderer
  }
] as GridColDef[];
