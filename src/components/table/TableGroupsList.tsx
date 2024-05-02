import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { LMSCard } from '@src/components/lms';
import TableWithSortAndFilter, {
  TableWithSortAndFilterProps
} from '@src/components/table/TableWithSortAndFilter';
import { TableRequestConfig } from '@services/interfaces';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { memo } from 'react';
import { getGroupsList } from '@redux/actions/groupsActions';

interface TableGroupsListProps
  extends Omit<TableWithSortAndFilterProps, 'onChange' | 'rows' | 'rowCount'> {
  columns: GridColDef[];
  onRowSelectionModelChange: (_rowsSelected: GridRowSelectionModel) => void;
}

const TableGroupsList = ({
  columns,
  onRowSelectionModelChange,
  ...other
}: TableGroupsListProps) => {
  const { groupsListLoading, groupsListData, groupsListTotalCount } = useAppSelector(
    (state) => state.groups.groupsList
  );
  const dispatch = useAppDispatch();

  const handleTableChange = (groupsRequestConfig: TableRequestConfig) => {
    dispatch(getGroupsList(groupsRequestConfig));
  };

  return (
    <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2} px={2} mt={2}>
      <LMSCard isPageCard canExpand contentPadding={0}>
        <TableWithSortAndFilter
          columns={columns}
          rows={groupsListData}
          loading={groupsListLoading}
          onChange={handleTableChange}
          rowCount={groupsListTotalCount}
          checkboxSelection
          onRowSelectionModelChange={onRowSelectionModelChange}
          defaultPageSize={5}
          {...other}
        />
      </LMSCard>
    </Box>
  );
};

export default memo(TableGroupsList);
