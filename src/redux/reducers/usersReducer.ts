import { User } from '@services/connected-user/interfaces';
import {
  GetSingleUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  UpdateUserBlockRequest,
  UpdateUserBlockResponse,
  UpdateUserRequest,
  UpdateUserResponse
} from '@services/users/interfaces';
import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as UsersServices from '@services/users/usersAPI';
import { enqueueSnackbar } from 'notistack';
import { t } from '@lingui/macro';
import { changeOrganisationView } from '@redux/reducers/connectedUserReducer';

interface UsersState {
  usersList: {
    usersListData: User[];
    usersListLoading: boolean;
    usersListTotalCount: number | null;
  };
  singleUser: {
    singleUserData: User | null;
    singleUserLoading: boolean;
  };
  updatedUser: {
    updatedUserLoading: boolean;
  };
}

const initialState: UsersState = {
  usersList: {
    usersListData: [],
    usersListLoading: false,
    usersListTotalCount: null
  },
  singleUser: {
    singleUserData: null,
    singleUserLoading: false
  },
  updatedUser: {
    updatedUserLoading: false
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

export const getSingleUser = createAsyncThunk(
  'users/fetchSingle',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await UsersServices.getSingleUser(id);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async (arg: UpdateUserRequest, { rejectWithValue }) => {
    try {
      const response = await UsersServices.updateUser(arg);
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

      // Fetch Single User Reducers
      .addCase(getSingleUser.pending, (state) => {
        state.singleUser.singleUserLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action: { payload: GetSingleUserResponse }) => {
        state.singleUser.singleUserLoading = false;
        state.singleUser.singleUserData = action.payload.data;
      })
      .addCase(getSingleUser.rejected, (state, action: AnyAction) => {
        state.singleUser.singleUserLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })

      // Update User Reducers
      .addCase(updateUser.pending, (state) => {
        state.updatedUser.updatedUserLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: { payload: UpdateUserResponse }) => {
        state.singleUser.singleUserData = action.payload.data;
        enqueueSnackbar(t`Utilisateur enregistré !`, { variant: 'success' });
      })
      .addCase(updateUser.rejected, (_, action: AnyAction) => {
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
      })
      .addCase(changeOrganisationView.fulfilled, (state) => {
        state.usersList = initialState.usersList;
        state.singleUser = initialState.singleUser;
      });
  }
});

export default usersSlice.reducer;
