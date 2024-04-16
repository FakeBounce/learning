import { Trans } from '@lingui/macro';
import { GridColDef } from '@mui/x-data-grid';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

export const userProfileRolesColumns = () =>
  [
    {
      field: 'name',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>)
    },
    {
      field: 'description',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Description</Trans>)
    }
  ] as GridColDef[];
