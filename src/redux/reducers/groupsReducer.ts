import { Group } from '@services/groups/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import * as GroupsAction from '@redux/actions/groupsActions';
import { pascalizeObject } from '@utils/helpers/convertCasing';
import { AnyAction } from 'redux';
import { enqueueSnackbar } from 'notistack';

interface GroupsState {
  groupsList: {
    groupsListData: Group[];
    groupsListLoading: boolean;
    groupsListTotalCount: number;
  };
}

const initialState: GroupsState = {
  groupsList: {
    groupsListData: [],
    groupsListLoading: false,
    groupsListTotalCount: 0
  },
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GroupsAction.getGroupsList.pending, (state) => {
        state.groupsList.groupsListLoading = true;
      })
      .addCase(GroupsAction.getGroupsList.fulfilled, (state, action) => {
        state.groupsList.groupsListData = pascalizeObject(action.payload.data.rows);
        state.groupsList.groupsListTotalCount = action.payload.data.pagination.total_results;
        state.groupsList.groupsListLoading = false;
      })
      .addCase(GroupsAction.getGroupsList.rejected, (state, action: AnyAction) => {
        state.groupsList.groupsListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export default groupsSlice.reducer;