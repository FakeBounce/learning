import {
  GetSingleUserResponse,
  GetUsersResponse,
  UpdateUserBlockResponse,
  UpdateUserResponse,
  User
} from '@services/users/interfaces';
import { AnyAction, createSelector, createSlice } from '@reduxjs/toolkit';
import * as UsersActions from '@redux/actions/usersActions';
import { enqueueSnackbar } from 'notistack';
import { t } from '@lingui/macro';
import { changeOrganizationView } from '@redux/actions/connectedUserActions';
import { Organization } from '@services/organizations/interfaces';
import { RootState } from '@redux/store';

interface UsersState {
  usersList: {
    usersListData: User[];
    usersListLoading: boolean;
    usersListTotalCount: number;
  };
  singleUser: {
    singleUserData: User | null;
    singleUserLoading: boolean;
  };
  updatedUser: {
    updatedUserLoading: boolean;
  };
  usersBulk: {
    usersBulkLoading: boolean;
  };
}

export const initialUserState: UsersState = {
  usersList: {
    usersListData: [],
    usersListLoading: false,
    usersListTotalCount: 0
  },
  singleUser: {
    singleUserData: null,
    singleUserLoading: false
  },
  updatedUser: {
    updatedUserLoading: false
  },
  usersBulk: {
    usersBulkLoading: false
  }
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    resetUserState: () => initialUserState
  },
  extraReducers: (builder) => {
    builder
      //List Users Reducers
      .addCase(UsersActions.getUsersList.pending, (state) => {
        state.usersList.usersListLoading = true;
      })
      .addCase(
        UsersActions.getUsersList.fulfilled,
        (state, action: { payload: GetUsersResponse }) => {
          state.usersList.usersListLoading = false;
          state.usersList.usersListData = action.payload.data.rows;
          state.usersList.usersListTotalCount = action.payload.data.pagination.totalResults;
        }
      )
      .addCase(UsersActions.getUsersList.rejected, (state, action: AnyAction) => {
        state.usersList.usersListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })

      // Fetch Single User Reducers
      .addCase(UsersActions.getSingleUser.pending, (state) => {
        state.singleUser.singleUserLoading = true;
      })
      .addCase(
        UsersActions.getSingleUser.fulfilled,
        (state, action: { payload: GetSingleUserResponse }) => {
          state.singleUser.singleUserLoading = false;
          state.singleUser.singleUserData = action.payload.data;
        }
      )
      .addCase(UsersActions.getSingleUser.rejected, (state, action: AnyAction) => {
        state.singleUser.singleUserLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })

      // Update User Reducers
      .addCase(UsersActions.updateUser.pending, (state) => {
        state.updatedUser.updatedUserLoading = true;
      })
      .addCase(
        UsersActions.updateUser.fulfilled,
        (state, action: { payload: UpdateUserResponse }) => {
          state.updatedUser.updatedUserLoading = false;
          state.singleUser.singleUserData = action.payload.data;
          enqueueSnackbar(t`Utilisateur enregistré !`, { variant: 'success' });
        }
      )
      .addCase(UsersActions.updateUser.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(
        UsersActions.toggleUserBlock.fulfilled,
        (state, action: { payload: UpdateUserBlockResponse }) => {
          // Find the user in the list and update it
          const userIndex = selectUsersFindId(state, action.payload.data.id);
          if (userIndex > -1) {
            state.usersList.usersListData[userIndex] = action.payload.data;
          }
        }
      )
      .addCase(UsersActions.toggleUserBlock.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      // Users Block Reducers
      .addCase(UsersActions.createBulkUser.pending, (state) => {
        state.usersBulk.usersBulkLoading = true;
      })
      .addCase(UsersActions.createBulkUser.fulfilled, (state) => {
        state.usersBulk.usersBulkLoading = false;
        enqueueSnackbar(t`Utilisateurs créés !`, { variant: 'success' });
      })
      .addCase(UsersActions.createBulkUser.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(changeOrganizationView.fulfilled, (state) => {
        state.usersList = initialUserState.usersList;
        state.singleUser = initialUserState.singleUser;
      });
  }
});

export const selectUsersFindId = createSelector(
  [(state: RootState) => state.users.usersList.usersListData, (_, idToFind) => idToFind],
  (s, idToFind) => s.findIndex((org: Organization) => org.id === idToFind)
);

export const { resetUserState } = usersSlice.actions;

export default usersSlice.reducer;
