import { Trans } from '@lingui/macro';
import { Avatar, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Organization } from '@services/organizations/interfaces';
import StatusChip from '@src/components/lms/StatusChip';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { MouseEvent } from 'react';
import { renderHeaderCell } from '@utils/helpers/tableRenders';

export const organizationsListColumns = (
  handleClick: (newOrganization: Organization) => (event: MouseEvent<HTMLElement>) => void
) => {
  return [
    {
      field: 'id',
      headerName: '',
      display: 'flex',
      renderCell: (row: GridRenderCellParams) => {
        const logo = row.row.logo || row.row.name?.charAt(0) || '';
        return <Avatar src={logo}>{logo}</Avatar>;
      }
    },
    {
      field: 'name',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nom</Trans>),
      // filterOperators: getGridNumericOperators()
      //   .filter((operator) => operator.value !== 'isAnyOf')
      //   .map((operator) => ({
      //     ...operator,
      //     InputComponent: operator.InputComponent ? RatingInputValue : undefined
      //   })),
      renderCell: (row: GridRenderCellParams) => {
        return (
          <Typography fontSize={(theme: Theme) => theme.typography.body2.fontSize} ml={1}>
            {row.row.name}
          </Typography>
        );
      }
    },
    {
      field: 'city',
      renderHeader: () => renderHeaderCell(<Trans>Ville</Trans>),
      display: 'flex',
      flex: 1
    },
    {
      field: 'isActive',
      sortable: true,
      disableColumnMenu: true,
      display: 'flex',
      renderHeader: () => renderHeaderCell(<Trans>Statut</Trans>),
      maxWidth: 120,
      flex: 1,
      padding: 'none',
      renderCell: (row: GridRenderCellParams) => {
        const activatedText = row.row.isActive ? <Trans>Activé</Trans> : <Trans>Bloqué</Trans>;
        return (
          <StatusChip
            isActive={row.row.isActive}
            activatedText={activatedText}
            handleClick={handleClick(row.row)}
          />
        );
      }
    }
  ] as GridColDef[];
};
