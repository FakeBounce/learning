import { Trans } from '@lingui/macro';
import { GridColDef } from '@mui/x-data-grid';
import { BulkCellRenderer } from '@utils/helpers/bulkCellRenderer';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

export const usersBulkColumns = [
  {
    field: 'lastname',
    display: 'flex',
    flex: 1,
    renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>),
    renderCell: BulkCellRenderer
  },
  {
    field: 'firstname',
    display: 'flex',
    flex: 1,
    renderHeader: () => renderHeaderCell(<Trans>Prénom</Trans>),
    renderCell: BulkCellRenderer
  },
  {
    field: 'email',
    display: 'flex',
    flex: 1,
    renderHeader: () => renderHeaderCell(<Trans>Email</Trans>),
    renderCell: BulkCellRenderer
  },
  {
    field: 'login',
    display: 'flex',
    flex: 1,
    renderHeader: () => renderHeaderCell(<Trans>Login</Trans>),
    renderCell: BulkCellRenderer
  }
] as GridColDef[];
