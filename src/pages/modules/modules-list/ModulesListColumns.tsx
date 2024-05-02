import { Trans } from '@lingui/macro';
import { MouseEvent } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { renderHeaderCell } from '@utils/helpers/tableRenders';
import StatusChip from '@src/components/lms/StatusChip';
import { Module, ModuleRightUser } from '@services/modules/interfaces';
import { format } from 'date-fns';
import Iconify from '@src/components/iconify/Iconify';
import { renderModuleStatus } from '@utils/helpers/modulesDisplays';

const getAuthorFromRights = (cell: GridRenderCellParams) => {
  if (cell.row.rights && cell.row.rights.users && cell.row.rights.users.length > 0) {
    return cell.row.rights.users.find((user: ModuleRightUser) => user.right === 'owner').login;
  }
  return null;
};

export const modulesColumns = (
  handleClick: (_newRole: Module) => (_event: MouseEvent<HTMLElement>) => void
) =>
  [
    {
      field: 'isPublic',
      display: 'flex',
      align: 'center',
      headerName: '',
      resizable: false,
      disableColumnMenu: true,
      maxWidth: 50,
      renderCell: (cell: GridRenderCellParams) => {
        if (cell.row.isPublic) {
          return <Iconify icon={'eva:eye-fill'} />;
        }
        return null;
      }
    },
    {
      field: 'version',
      display: 'flex',
      renderHeader: () => renderHeaderCell(<Trans>Version</Trans>),
      renderCell: (cell: GridRenderCellParams) => <>V{cell.row.version}</>
    },
    {
      field: 'title',
      display: 'flex',
      flex: 1,
      renderHeader: () => renderHeaderCell(<Trans>Nom du module</Trans>)
    },
    {
      field: 'createdBy',
      display: 'flex',
      sortable: false,
      renderHeader: () => renderHeaderCell(<Trans>Auteur</Trans>),
      renderCell: getAuthorFromRights
    },
    {
      field: 'updatedAt',
      display: 'flex',
      renderHeader: () => renderHeaderCell(<Trans>Mise à jour</Trans>),
      renderCell: (cell: GridRenderCellParams) => format(new Date(cell.row.updatedAt), 'dd/MM/yyyy')
    },
    {
      field: 'timer',
      display: 'flex',
      renderHeader: () => renderHeaderCell(<Trans>Durée</Trans>)
    },
    {
      field: 'successRate',
      display: 'flex',
      renderHeader: () => renderHeaderCell(<Trans>Score</Trans>)
    },
    {
      field: 'status',
      display: 'flex',
      renderHeader: () => renderHeaderCell(<Trans>Statut</Trans>),
      renderCell: (cell: GridRenderCellParams) => renderModuleStatus(cell.row)
    },
    {
      field: 'isLocked',
      display: 'flex',
      align: 'center',
      headerName: '',
      resizable: false,
      disableColumnMenu: true,
      maxWidth: 50,
      renderCell: (cell: GridRenderCellParams) => {
        return <Iconify icon={cell.row.isLocked ? 'eva:lock-outline' : 'eva:unlock-outline'} />;
      }
    },
    {
      field: 'id',
      display: 'flex',
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      headerName: '',
      maxWidth: 50,
      renderCell: (cell: GridRenderCellParams) => {
        return <StatusChip handleClick={handleClick(cell.row)} />;
      }
    }
  ] as GridColDef[];