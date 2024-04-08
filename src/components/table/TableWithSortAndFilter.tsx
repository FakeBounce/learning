import FullTable from '@src/components/table/FullTable';
import Pagination from '@src/components/table/Pagination';
import { ChangeEvent, memo, ReactNode, useEffect, useState } from 'react';
import { OrderBy, TableRequestConfig } from '@services/interfaces';

interface TableWithSortAndFilterProps {
  headerRenderer: (handleSort: (id: string) => void, orderBy: OrderBy | null) => ReactNode;
  rowsRenderer: ReactNode;
  isTableLoading?: boolean;
  totalRows: number;
  onChange: (applicantRequestConfig: TableRequestConfig) => void;
  skeletonCols?: number;
}

const TableWithSortAndFilter = ({
  headerRenderer,
  rowsRenderer,
  isTableLoading = false,
  totalRows,
  onChange,
  skeletonCols = 5
}: TableWithSortAndFilterProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);

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
    const defaultTableRequestConfig = {
      currentPage: currentPage,
      rowsPerPage: rowsPerPage
    };

    const tableRequestConfig =
      orderBy === null
        ? { ...defaultTableRequestConfig }
        : {
            ...defaultTableRequestConfig,
            sort: { field: orderBy.id, direction: orderBy.direction }
          };

    onChange(tableRequestConfig);
  }, [currentPage, rowsPerPage, orderBy]);

  return (
    <>
      <FullTable
        headerRenderer={headerRenderer(handleSort, orderBy)}
        bodyRenderer={rowsRenderer}
        isLoading={isTableLoading}
        rowsNum={rowsPerPage}
        colsNum={skeletonCols}
      />
      <Pagination
        totalCount={totalRows || 0}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default memo(TableWithSortAndFilter);
