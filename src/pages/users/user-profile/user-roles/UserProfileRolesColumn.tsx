import { Trans } from '@lingui/macro';
import { GridColDef } from '@mui/x-data-grid';

export const userProfileRolesColumns = () =>
  [
    {
      field: 'name',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Nom</Trans>
        </strong>
      )
    },
    {
      field: 'description',
      display: 'flex',
      flex: 1,
      renderHeader: () => (
        <strong>
          <Trans>Description</Trans>
        </strong>
      )
    }
  ] as GridColDef[];
