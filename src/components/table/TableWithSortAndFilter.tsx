import FullTable from '@src/components/table/FullTable';
import { memo, useCallback, useEffect, useState } from 'react';
import { FilterBy, OrderBy, TableRequestConfig } from '@services/interfaces';
import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { FullTableProps } from '@src/components/table/interfaces';
import { convertCamelToSnake } from '@utils/helpers/convertCasing';

interface TableWithSortAndFilterProps
  extends Omit<
    FullTableProps,
    'onSortModelChange' | 'onFilterModelChange' | 'onPaginationModelChange'
  > {
  onChange: (applicantRequestConfig: TableRequestConfig) => void;
  defaultPageSize?: number;
}

const TableWithSortAndFilter = ({
  onChange,
  defaultPageSize,
  ...fullTableProps
}: TableWithSortAndFilterProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize || 10);
  const [orderBy, setOrderBy] = useState<OrderBy | null>(null);
  const [filters, setFilters] = useState<FilterBy | null>(null);

  const handleChangePage = useCallback((gridPaginationModel: GridPaginationModel) => {
    if (gridPaginationModel.page !== currentPage) {
      setCurrentPage(gridPaginationModel.page);
      return;
    }
    if (gridPaginationModel.pageSize !== rowsPerPage) {
      setRowsPerPage(gridPaginationModel.pageSize);
      return;
    }
  }, []);

  const handleSort = useCallback((gridSortItems: GridSortModel) => {
    if (gridSortItems.length === 0) {
      setOrderBy(null);
      return;
    } else if (gridSortItems[0].sort) {
      setOrderBy({
        field: convertCamelToSnake(gridSortItems[0].field),
        direction: gridSortItems[0].sort.toUpperCase() as 'ASC' | 'DESC'
      });
    }
  }, []);

  const handleFilterChange = useCallback((filterModel: GridFilterModel) => {
    if (filterModel.items.length === 0 || !filterModel.items[0].value) {
      setFilters(null);
      return;
    }
    setFilters({
      operator: 'AND',
      items: [
        {
          field: convertCamelToSnake(filterModel.items[0].field),
          operator: filterModel.items[0].operator,
          value: filterModel.items[0].value
        }
      ]
    });
  }, []);

  useEffect(() => {
    const tableRequestConfig = {
      currentPage: currentPage,
      rowsPerPage: rowsPerPage
    } as TableRequestConfig;

    if (orderBy) {
      tableRequestConfig.sort = orderBy;
    }

    if (filters) {
      tableRequestConfig.filters = filters;
    }

    onChange(tableRequestConfig);
  }, [currentPage, rowsPerPage, orderBy, filters]);

  return (
    <FullTable
      {...fullTableProps}
      onPaginationModelChange={handleChangePage}
      onFilterModelChange={handleFilterChange}
      onSortModelChange={handleSort}
      defaultPageSize={defaultPageSize}
    />
  );
};

export default memo(TableWithSortAndFilter);
