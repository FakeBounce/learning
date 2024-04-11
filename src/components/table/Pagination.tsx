import { Box, TablePagination } from '@mui/material';
import { styled } from '@mui/system';
import { ChangeEvent } from 'react';

const StyledPaginationContainer = styled(Box)(({ theme }) => ({
  minHeight: 46,
  backgroundColor: 'white',
  bottom: 0,
  width: '100%',
  display: 'flex',
  zIndex: 2,
  borderRadius: theme.shape.customBorderRadius.large,
  justifyContent: 'flex-end',
  // @ts-expect-error Problem from MUI types
  boxShadow: theme.shadows[1]
}));

interface PaginationProps {
  totalCount: number;
  rowsPerPageOptions?: number[];
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Pagination = ({
  totalCount,
  currentPage,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 25, 100],
  onRowsPerPageChange,
  onPageChange
}: PaginationProps) => {
  return (
    <StyledPaginationContainer style={{ marginTop: 0 }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </StyledPaginationContainer>
  );
};

export default Pagination;
