import Box from '@mui/material/Box';
import { DataGridProps, GridColDef, DataGrid } from '@mui/x-data-grid';
import { memo } from 'react';

interface SimpleTableProps extends DataGridProps {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
}

function SimpleTable({ columns, rows, loading = false, ...other }: SimpleTableProps) {
  return (
    <Box display="flex" flex="1 1 0" sx={{ overflow: 'auto' }}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.id}
        columns={columns}
        loading={loading}
        rowCount={columns.length}
        disableColumnMenu
        hideFooter
        paginationMode={'server'}
        {...other}
      />
    </Box>
  );
}

export default memo(SimpleTable);
