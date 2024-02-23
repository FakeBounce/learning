import { User } from '@services/connected-user/interfaces';
import {
  GetUsersRequest,
  GetUsersResponse,
  UpdateUserBlockRequest,
  UpdateUserBlockResponse
} from '@services/users/interfaces.ts';
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as UsersServices from '@services/users/usersAPI';
import { enqueueSnackbar } from 'notistack';

interface UsersState {
  usersList: {
    usersListData: User[];
    usersListLoading: boolean;
    usersListTotalCount: number | null;
  };
}

const initialState: UsersState = {
  usersList: {
    usersListData: [],
    usersListLoading: false,
    usersListTotalCount: null
  }
};

export const getUsersList = createAsyncThunk(
  'users/list',
  async (arg: GetUsersRequest, { rejectWithValue }) => {
    try {
      const response = await UsersServices.getUsers(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const toggleUserBlock = createAsyncThunk(
  'users/toggleBlock',
  async (arg: UpdateUserBlockRequest, { rejectWithValue }) => {
    try {
      const response = await UsersServices.toggleUserBlock(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //List Users Reducers
      .addCase(getUsersList.pending, (state) => {
        state.usersList.usersListLoading = true;
      })
      .addCase(getUsersList.fulfilled, (state, action: { payload: GetUsersResponse }) => {
        state.usersList.usersListLoading = false;
        state.usersList.usersListData = action.payload.data.rows;
        // state.usersList.usersListTotalCount = action.payload.data.pagination.total_results;
      })
      .addCase(getUsersList.rejected, (state, action: AnyAction) => {
        state.usersList.usersListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      // Users Block Reducers
      .addCase(toggleUserBlock.pending, (_) => {})
      .addCase(toggleUserBlock.fulfilled, (state, action: { payload: UpdateUserBlockResponse }) => {
        // Find the user in the list and update it
        const userIndex = state.usersList.usersListData.findIndex(
          (org) => org.id === action.payload.data.id
        );
        if (userIndex > -1) {
          state.usersList.usersListData[userIndex] = action.payload.data;
        }
      })
      .addCase(toggleUserBlock.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export default usersSlice.reducer;
