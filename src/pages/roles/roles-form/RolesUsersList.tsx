import { Box } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useFormContext } from 'react-hook-form';
import { memo } from 'react';
import {
  RolesGroupsColumns,
  RolesUsersColumns
} from '@src/pages/roles/roles-form/RolesUsersColumns';
import TableUsersList from '@src/components/table/TableUsersList';
import TableGroupsList from '@src/components/table/TableGroupsList';
import { MAX_HEIGHT_FULL_TABLE } from '@utils/globalConsts';

const RolesUsersList = ({ isEditing }: { isEditing: boolean }) => {
  const { currentRoleData } = useAppSelector((state) => state.roles.currentRole);

  const { setValue } = useFormContext();

  const handleUserRowSelection = (rowsSelected: GridRowSelectionModel) => {
    setValue('usersId', rowsSelected);
  };
  const handleGroupRowSelection = (rowsSelected: GridRowSelectionModel) => {
    setValue('groupsId', rowsSelected);
  };

  return (
    <Box>
      <TableUsersList
        columns={RolesUsersColumns({
          isEditing,
          currentRole: currentRoleData
        })}
        onRowSelectionModelChange={handleUserRowSelection}
        sx={{ '.MuiDataGrid-virtualScroller': { maxHeight: MAX_HEIGHT_FULL_TABLE } }}
      />
      <TableGroupsList
        columns={RolesGroupsColumns({
          isEditing,
          currentRole: currentRoleData
        })}
        onRowSelectionModelChange={handleGroupRowSelection}
        sx={{
          '.MuiDataGrid-virtualScroller': {
            maxHeight: MAX_HEIGHT_FULL_TABLE
          }
        }}
      />
    </Box>
  );
};

export default memo(RolesUsersList);
