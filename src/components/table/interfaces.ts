import { GridColDef, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { t } from '@lingui/macro';

export interface FullTableProps {
  columns: GridColDef[];
  rows: any[];
  defaultPageSize?: number;
  rowCount: number;
  loading?: boolean;
  pageSizeOptions?: number[];
  onSortModelChange: (_: GridSortModel) => void;
  onFilterModelChange: (_: GridFilterModel) => void;
  onPaginationModelChange: (_: GridPaginationModel) => void;
}

export const defaultSlotProps = {
  pagination: {
    labelRowsPerPage: t`Résultats par page`,
    labelDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) =>
      t`${from}-${to} sur ${count}`
  }
};

export const defaultLocaleText = {
  columnHeaderSortAsc: t`Trier en ASC`,
  columnHeaderSortDesc: t`Trier en DESC`,
  columnHeaderFilterTooltipLabel: t`Filtrer`,
  noRowsLabel: t`Aucun résultat`
};
