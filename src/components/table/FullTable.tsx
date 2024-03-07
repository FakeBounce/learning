import { Table, TableBody, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { TableSkeletonLoader } from '@src/components/table/TableSkeletonLoader';
import { ReactNode } from 'react';
import { styled } from '@mui/system';

const StyledFullTableContainer = styled(Box)(() => ({
  display: 'flex',
  flex: '1 1 0',
  overflow: 'auto',
  maxWidth: '100%',
  padding: 0,
  position: 'relative'
}));

interface FullTableProps {
  headerRenderer: ReactNode;
  bodyRenderer: ReactNode;
  isLoading: boolean;
  rowsNum: number;
  colsNum: number;
}
export default function FullTable({
  headerRenderer,
  bodyRenderer,
  isLoading,
  rowsNum,
  colsNum
}: FullTableProps) {
  return (
    <StyledFullTableContainer>
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>{headerRenderer}</TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? <TableSkeletonLoader rowsNum={rowsNum} colsNum={colsNum} /> : bodyRenderer}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledFullTableContainer>
  );
}
