import FullTable from '@src/components/table/FullTable';
import { memo, useEffect, useState } from 'react';
import { TableRequestConfig } from '@services/interfaces';
import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { FullTableProps } from '@src/components/table/interfaces';
import { convertCamelToSnake } from '@utils/helpers/convertCasing';

export interface TableWithSortAndFilterProps
  extends Omit<
    FullTableProps,
    'onSortModelChange' | 'onFilterModelChange' | 'onPaginationModelChange'
  > {
  onChange: (_: TableRequestConfig) => void;
  defaultPageSize?: number;
}

const TableWithSortAndFilter = ({
  onChange,
  defaultPageSize,
  ...fullTableProps
}: TableWithSortAndFilterProps) => {
  const [tableRequestConfig, setTableRequestConfig] = useState<TableRequestConfig>({
    currentPage: 1,
    rowsPerPage: defaultPageSize || 10,
    sort: undefined,
    filters: undefined
  });

  const handleChangePage = (gridPaginationModel: GridPaginationModel) => {
    setTableRequestConfig({
      ...tableRequestConfig,
      currentPage: gridPaginationModel.page + 1,
      rowsPerPage: gridPaginationModel.pageSize
    });
  };

  const handleSort = (gridSortItems: GridSortModel) => {
    if (gridSortItems.length === 0) {
      setTableRequestConfig({
        ...tableRequestConfig,
        sort: undefined
      });
      return;
    } else if (gridSortItems[0].sort) {
      setTableRequestConfig({
        ...tableRequestConfig,
        sort: {
          field: convertCamelToSnake(gridSortItems[0].field),
          direction: gridSortItems[0].sort.toUpperCase() as 'ASC' | 'DESC'
        }
      });
    }
  };

  const handleFilterChange = (filterModel: GridFilterModel) => {
    if (filterModel.items.length === 0 || !filterModel.items[0].value) {
      setTableRequestConfig({
        ...tableRequestConfig,
        filters: undefined
      });
      return;
    }
    setTableRequestConfig({
      ...tableRequestConfig,
      filters: {
        operator: 'AND',
        items: [
          {
            field: convertCamelToSnake(filterModel.items[0].field),
            operator: filterModel.items[0].operator,
            value: filterModel.items[0].value
          }
        ]
      }
    });
  };

  useEffect(() => {
    onChange(tableRequestConfig);
  }, [tableRequestConfig]);

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
