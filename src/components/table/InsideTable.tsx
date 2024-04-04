import { Box } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import FullTable from '@src/components/table/FullTable';
import Pagination from '@src/components/table/Pagination';
import { ChangeEvent, memo, ReactNode, useEffect, useState } from 'react';
import { sortObjectTable } from '@utils/helpers/sorters';
import { OrderBy } from '@services/interfaces';

interface InsideTableProps {
  headerRenderer: (handleSort: (id: string) => void, orderBy: OrderBy | null) => ReactNode;
  rowsRenderer: (currentTableContent: any[]) => ReactNode;
  isTableLoading?: boolean;
  totalRows: number;
  skeletonRows?: number;
  skeletonCols?: number;
  tableContent: any[];
}

const InsideTable = ({
  headerRenderer,
  rowsRenderer,
  isTableLoading = false,
  tableContent,
  totalRows,
  skeletonRows = 2,
  skeletonCols = 5
}: InsideTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);
  const [currentTableContent, setCurrentTableContent] = useState<any[]>(tableContent);

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const handleSort = (id: string) => {
    if (orderBy?.id === id) {
      if (orderBy.direction === 'DESC') {
        setOrderBy(null);
        return;
      }
      setOrderBy({ id, direction: 'DESC' });
      return;
    } else {
      setOrderBy({ id, direction: 'ASC' });
    }
  };

  useEffect(() => {
    const newTable = sortObjectTable(tableContent, orderBy);
    setCurrentTableContent(
      newTable.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
    );
  }, [currentPage, rowsPerPage, orderBy]);

  return (
    <Box display="flex" flex="1 1 0" maxWidth="100%" minHeight={400}>
      <LMSCard isPageCard cardCss={{ paddingTop: 2 }}>
        <FullTable
          headerRenderer={headerRenderer(handleSort, orderBy)}
          bodyRenderer={rowsRenderer(currentTableContent)}
          isLoading={isTableLoading}
          rowsNum={skeletonRows}
          colsNum={skeletonCols}
        />
        <Pagination
          totalCount={totalRows || 0}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </LMSCard>
    </Box>
  );
};

export default memo(InsideTable);
