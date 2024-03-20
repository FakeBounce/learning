import {
  GetConnectedUserResponse,
  LoginResponse,
  UpdateOrganizationViewResponse,
  User
} from '@services/connected-user/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as UserActions from '../actions/connectedUserActions';
import { createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { setSession } from '@utils/axios/session';
import * as RolesActions from '@redux/actions/rolesActions';
import { GetRolePermissionsResponse } from '@services/roles/interfaces';
import { PermissionTypeList } from '@services/permissions/interfaces';

interface UserState {
  user: User;
  permissions: PermissionTypeList;
  globalLoading: boolean;
  login: {
    loading: boolean;
    isAuthenticated: boolean;
  };
}

const initialState: UserState = {
  user: {} as User,
  permissions: {},
  globalLoading: false,
  login: {
    loading: false,
    isAuthenticated: false
  }
};

export const connectedUserSlice = createSlice({
  name: 'connectedUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UserActions.login.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(UserActions.login.fulfilled, (state, action: { payload: LoginResponse }) => {
        state.login.loading = false;
        state.login.isAuthenticated = true;
        setSession(action.payload.data);
      })
      .addCase(UserActions.login.rejected, (state, action: AnyAction) => {
        state.login.loading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(UserActions.refresh.pending, (state) => {
        state.globalLoading = true;
      })
      .addCase(UserActions.refresh.fulfilled, (state, action: { payload: LoginResponse }) => {
        state.globalLoading = false;
        state.login.isAuthenticated = true;
        setSession(action.payload.data);
      })
      .addCase(UserActions.refresh.rejected, (state) => {
        state.globalLoading = false;
        state.login.isAuthenticated = false;
        state.user = initialState.user;
        state.permissions = initialState.permissions;
      })
      .addCase(UserActions.logout.fulfilled, (state) => {
        state.login.isAuthenticated = false;
        state.user = initialState.user;
        state.permissions = initialState.permissions;
        setSession(null);
      })
      .addCase(UserActions.logout.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(UserActions.getUser.pending, (state) => {
        state.globalLoading = true;
      })
      .addCase(
        UserActions.getUser.fulfilled,
        (state, action: { payload: GetConnectedUserResponse }) => {
          state.user = {
            ...action.payload.data,
            organizationId: action.payload.data.organization_id,
            emailVerifiedAt: action.payload.data.email_verified_at,
            useDoubleAuth: action.payload.data.use_double_auth,
            isActive: action.payload.data.is_active
          };
          state.globalLoading = false;
        }
      )
      .addCase(UserActions.getUser.rejected, (state, action: AnyAction) => {
        state.globalLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      // @todo : Define what to do when the action is pending
      .addCase(UserActions.changeOrganizationView.pending, () => {})
      .addCase(
        UserActions.changeOrganizationView.fulfilled,
        (state, action: { payload: UpdateOrganizationViewResponse }) => {
          state.user = {
            ...state.user,
            organizationId: action.payload.data.id
          };
          enqueueSnackbar(action.payload.message.value, { variant: 'success' });
        }
      )
      .addCase(UserActions.changeOrganizationView.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(RolesActions.getRolePermissions.pending, (state) => {
        state.globalLoading = true;
      })
      .addCase(
        RolesActions.getRolePermissions.fulfilled,
        (state, action: { payload: GetRolePermissionsResponse }) => {
          state.globalLoading = false;
          state.permissions = action.payload.data;
        }
      )
      .addCase(RolesActions.getRolePermissions.rejected, (state, action: AnyAction) => {
        state.globalLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export default connectedUserSlice.reducer;
