import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import {
  defaultLocaleText,
  defaultSlotProps,
  FullTableProps
} from '@src/components/table/interfaces';
import Box from '@mui/material/Box';
import { TablePaginationProps } from '@mui/material';
import MuiPagination from '@mui/material/Pagination';
import { DEFAULT_PAGE_SIZE, MIN_HEIGHT_FULL_TABLE } from '@utils/globalConsts';

function Pagination({
  page,
  onPageChange,
  className
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default function FullTable({
  columns,
  rows,
  defaultPageSize = DEFAULT_PAGE_SIZE,
  rowCount = 0,
  loading = false,
  pageSizeOptions = [5, 10, 20, 50],
  onSortModelChange,
  onFilterModelChange,
  onPaginationModelChange,
  ...other
}: FullTableProps) {
  return (
    <Box display="flex" flex="1 1 0" sx={{ overflow: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        rowCount={rowCount}
        pageSizeOptions={pageSizeOptions}
        initialState={{
          pagination: { paginationModel: { pageSize: defaultPageSize } }
        }}
        onSortModelChange={onSortModelChange}
        onFilterModelChange={onFilterModelChange}
        onPaginationModelChange={onPaginationModelChange}
        disableColumnSelector
        disableRowSelectionOnClick
        sortingMode={'server'}
        filterMode={'server'}
        paginationMode={'server'}
        slots={{
          pagination: CustomPagination
        }}
        localeText={defaultLocaleText}
        slotProps={defaultSlotProps}
        {...other}
        sx={{
          '.MuiDataGrid-virtualScroller': {
            overflowY: 'scroll !important',
            minHeight: MIN_HEIGHT_FULL_TABLE
          },
          ...other.sx
        }}
      />
    </Box>
  );
}
