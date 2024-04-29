import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { LMSCard } from '@src/components/lms';
import TableWithSortAndFilter from '@src/components/table/TableWithSortAndFilter';
import { GroupsCreateUsersColumns } from '@src/pages/groups/groups-create/GroupsCreateUsersColumns';
import { TableRequestConfig } from '@services/interfaces';
import { getUsersList } from '@redux/actions/usersActions';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useFormContext } from 'react-hook-form';

export default function GroupsCreateUsersList() {
  const { usersListLoading, usersListData, usersListTotalCount } = useAppSelector(
    (state) => state.users.usersList
  );
  const { setValue } = useFormContext();
  const dispatch = useAppDispatch();

  const handleTableChange = (usersRequestConfig: TableRequestConfig) => {
    dispatch(getUsersList(usersRequestConfig));
  };

  const handleRowSelection = (rowsSelected: GridRowSelectionModel) => {
    setValue('usersId', rowsSelected);
  };

  return (
    <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2} px={2} mt={2}>
      <LMSCard isPageCard canExpand contentPadding={0}>
        <TableWithSortAndFilter
          columns={GroupsCreateUsersColumns()}
          rows={usersListData}
          loading={usersListLoading}
          onChange={handleTableChange}
          rowCount={usersListTotalCount}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelection}
          defaultPageSize={5}
        />
      </LMSCard>
    </Box>
  );
}
