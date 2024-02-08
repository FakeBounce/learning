import { Skeleton, TableCell, TableRow } from '@mui/material';

export const TableSkeletonLoader = ({ rowsNum, colsNum }: { rowsNum: number; colsNum: number }) => {
  return [...Array(rowsNum)].map((_, index) => (
    <TableRow key={index}>
      {[...Array(colsNum)].map((_, index) => {
        if (index === 0) {
          return (
            <TableCell key={'skeleton-table-cell-0'} component="th" scope="row">
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          );
        }
        return (
          <TableCell key={`skeleton-table-cell-${index}`}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        );
      })}
    </TableRow>
  ));
};
