import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { LMSCard } from '@src/components/lms';
import TableWithSortAndFilter, {
  TableWithSortAndFilterProps
} from '@src/components/table/TableWithSortAndFilter';
import { TableRequestConfig } from '@services/interfaces';
import { getUsersList } from '@redux/actions/usersActions';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { memo } from 'react';

interface TableUsersListProps
  extends Omit<TableWithSortAndFilterProps, 'onChange' | 'rows' | 'rowCount'> {
  columns: GridColDef[];
  onRowSelectionModelChange: (_rowsSelected: GridRowSelectionModel) => void;
}

const TableUsersList = ({ columns, onRowSelectionModelChange, ...other }: TableUsersListProps) => {
  const { usersListLoading, usersListData, usersListTotalCount } = useAppSelector(
    (state) => state.users.usersList
  );
  const dispatch = useAppDispatch();

  const handleTableChange = (usersRequestConfig: TableRequestConfig) => {
    dispatch(getUsersList(usersRequestConfig));
  };

  return (
    <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2} px={2} mt={2}>
      <LMSCard isPageCard canExpand contentPadding={0}>
        <TableWithSortAndFilter
          columns={columns}
          rows={usersListData}
          loading={usersListLoading}
          onChange={handleTableChange}
          rowCount={usersListTotalCount}
          checkboxSelection
          onRowSelectionModelChange={onRowSelectionModelChange}
          defaultPageSize={5}
          {...other}
        />
      </LMSCard>
    </Box>
  );
};

export default memo(TableUsersList);
