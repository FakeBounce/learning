import { FC } from 'react';
import { GridColDef, GridRenderCellParams, GridRowProps } from '@mui/x-data-grid';

interface MockFullTableProps {
  columns: GridColDef[];
  rows: GridRenderCellParams[];
}

const MockFullTable: FC<MockFullTableProps> = ({ columns, rows }) => {
  const renderRow = (row: GridRowProps, column: GridColDef) => {
    return column.renderCell
      ? column.renderCell({
          formattedValue: undefined,
          hasFocus: false,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          rowNode: undefined,
          tabIndex: 0,
          id: row[column.field],
          row,
          value: row[column.field],
          field: column.field
        })
      : row[column.field];
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      {rows.map((row: any) => (
        <div key={row.id ?? row.email}>
          {columns.map((column: GridColDef) => (
            <div key={`${row.id}-${column.field}`}>{renderRow(row, column)}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MockFullTable;
