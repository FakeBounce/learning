import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { TableSkeletonLoader } from '@src/components/table/TableSkeletonLoader';
import { ReactNode } from 'react';

interface FullTableProps {
  maxHeigth?: string | number;
  headerRenderer: ReactNode;
  bodyRenderer: ReactNode;
  isLoading: boolean;
  rowsNum: number;
  colsNum: number;
}
export default function FullTable({
  maxHeigth = '61vh',
  headerRenderer,
  bodyRenderer,
  isLoading,
  rowsNum,
  colsNum
}: FullTableProps) {
  return (
    <TableContainer sx={{ maxHeight: maxHeigth }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>{headerRenderer}</TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? <TableSkeletonLoader rowsNum={rowsNum} colsNum={colsNum} /> : bodyRenderer}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
