import {
  CreateGroupResponse,
  DeleteGroupResponse,
  Group,
  UpdateGroupResponse
} from '@services/groups/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import * as GroupsActions from '@redux/actions/groupsActions';
import { AnyAction } from 'redux';
import { enqueueSnackbar } from 'notistack';

interface GroupsState {
  groupsList: {
    groupsListData: Group[];
    groupsListLoading: boolean;
    groupsListTotalCount: number;
  };
  groupsDeleteLoading: boolean;
  groupsCreate: {
    groupsCreateLoading: boolean;
  };
  currentGroup: {
    currentGroupData: Group | null;
    currentGroupLoading: boolean;
  };
  groupsUpdate: {
    groupsUpdateLoading: boolean;
  };
}

export const groupsInitialState: GroupsState = {
  groupsList: {
    groupsListData: [],
    groupsListLoading: false,
    groupsListTotalCount: 0
  },
  groupsDeleteLoading: false,
  groupsCreate: {
    groupsCreateLoading: false
  },
  currentGroup: {
    currentGroupData: null,
    currentGroupLoading: false
  },
  groupsUpdate: {
    groupsUpdateLoading: false
  }
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: groupsInitialState,
  reducers: {
    resetGroupsState: () => groupsInitialState,
    setCurrentGroup: (state, action: { payload: Group }) => {
      state.currentGroup.currentGroupData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GroupsActions.getGroupsList.pending, (state) => {
        state.groupsList.groupsListLoading = true;
        state.groupsList.groupsListData = [];
        state.currentGroup.currentGroupData = null;
      })
      .addCase(GroupsActions.getGroupsList.fulfilled, (state, action) => {
        state.groupsList.groupsListData = action.payload.data.rows;
        state.groupsList.groupsListTotalCount = action.payload.data.pagination.totalResults;
        state.groupsList.groupsListLoading = false;
      })
      .addCase(GroupsActions.getGroupsList.rejected, (state, action: AnyAction) => {
        state.groupsList.groupsListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(GroupsActions.deleteGroup.pending, (state) => {
        state.groupsDeleteLoading = true;
      })
      .addCase(
        GroupsActions.deleteGroup.fulfilled,
        (state, action: { payload: DeleteGroupResponse }) => {
          state.groupsDeleteLoading = false;
          enqueueSnackbar(action.payload.message.value, { variant: 'success' });
        }
      )
      .addCase(GroupsActions.deleteGroup.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(GroupsActions.createGroup.pending, (state) => {
        state.groupsCreate.groupsCreateLoading = true;
      })
      .addCase(
        GroupsActions.createGroup.fulfilled,
        (state, action: { payload: CreateGroupResponse }) => {
          state.groupsCreate.groupsCreateLoading = false;
          enqueueSnackbar(action.payload.message.value, { variant: 'success' });
        }
      )
      .addCase(GroupsActions.createGroup.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(GroupsActions.updateGroupAction.pending, (state) => {
        state.groupsUpdate.groupsUpdateLoading = true;
      })
      .addCase(
        GroupsActions.updateGroupAction.fulfilled,
        (state, action: { payload: UpdateGroupResponse }) => {
          state.groupsUpdate.groupsUpdateLoading = false;
          enqueueSnackbar(action.payload.message.value, { variant: 'success' });
        }
      )
      .addCase(GroupsActions.updateGroupAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      });
  }
});

export const { resetGroupsState, setCurrentGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
