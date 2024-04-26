import { DataGrid } from '@mui/x-data-grid';
import { defaultSlotProps, FullTableProps } from '@src/components/table/interfaces';
import Box from '@mui/material/Box';

export default function FullTable({
  columns,
  rows,
  defaultPageSize = 10,
  rowCount = 0,
  loading = false,
  pageSizeOptions = [5, 10, 20, 50],
  onSortModelChange,
  onFilterModelChange,
  onPaginationModelChange
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
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        sortingMode={'server'}
        filterMode={'server'}
        paginationMode={'server'}
        slotProps={defaultSlotProps}
      />
    </Box>
  );
}
