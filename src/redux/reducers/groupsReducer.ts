import { DeleteGroupResponse, Group } from '@services/groups/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import * as GroupsAction from '@redux/actions/groupsActions';
import { AnyAction } from 'redux';
import { enqueueSnackbar } from 'notistack';
interface GroupsState {
  groupsList: {
    groupsListData: Group[];
    groupsListLoading: boolean;
    groupsListTotalCount: number;
  };
  groupsDeleteLoading: boolean;
}

const groupsInitialState: GroupsState = {
  groupsList: {
    groupsListData: [],
    groupsListLoading: false,
    groupsListTotalCount: 0
  },
  groupsDeleteLoading: false
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: groupsInitialState,
  reducers: {
    resetGroupsState: () => groupsInitialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(GroupsAction.getGroupsList.pending, (state) => {
        state.groupsList.groupsListLoading = true;
      })
      .addCase(GroupsAction.getGroupsList.fulfilled, (state, action) => {
        state.groupsList.groupsListData = action.payload.data.rows;
        state.groupsList.groupsListTotalCount = action.payload.data.pagination.totalResults;
        state.groupsList.groupsListLoading = false;
      })
      .addCase(GroupsAction.getGroupsList.rejected, (state, action: AnyAction) => {
        state.groupsList.groupsListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(GroupsAction.deleteGroup.pending, (state) => {
        state.groupsDeleteLoading = true;
      })
      .addCase(
        GroupsAction.deleteGroup.fulfilled,
        (state, action: { payload: DeleteGroupResponse }) => {
          state.groupsDeleteLoading = false;
          enqueueSnackbar(action.payload.message.value, { variant: 'success' });
        }
      )
      .addCase(GroupsAction.deleteGroup.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      });
  }
});

export const { resetGroupsState } = groupsSlice.actions;

export default groupsSlice.reducer;
