import { GetGroupsRequest, Group } from '@services/groups/interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as GroupsServices from '@services/groups/groupsAPI';
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

export const getGroupsList = createAsyncThunk(
  'groups/list',
  async (arg: GetGroupsRequest, { rejectWithValue }) => {
    try {
      const response = await GroupsServices.getGroups(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroupsList.pending, (state) => {
        state.groupsList.groupsListLoading = true;
      })
      .addCase(getGroupsList.fulfilled, (state, action) => {
        state.groupsList.groupsListData = pascalizeObject(action.payload.data.rows);
        state.groupsList.groupsListTotalCount = action.payload.data.pagination.total_results;
        state.groupsList.groupsListLoading = false;
      })
      .addCase(getGroupsList.rejected, (state, action: AnyAction) => {
        state.groupsList.groupsListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export default groupsSlice.reducer;