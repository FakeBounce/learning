import { DataGrid } from '@mui/x-data-grid/DataGrid';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import { memo } from 'react';

interface SimpleTableProps {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
}

function SimpleTable({ columns, rows, loading = false }: SimpleTableProps) {
  return (
    <Box display="flex" flex="1 1 0" sx={{ overflow: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        rowCount={columns.length}
        disableColumnMenu
        hideFooter
        paginationMode={'server'}
      />
    </Box>
  );
}

export default memo(SimpleTable);
