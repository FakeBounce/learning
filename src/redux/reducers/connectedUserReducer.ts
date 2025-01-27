import {
  GetConnectedUserResponse,
  LoginResponse,
  UpdateOrganizationViewResponse,
  ConnectedUser
} from '@services/connected-user/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as UserActions from '../actions/connectedUserActions';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { setSession } from '@utils/axios/session';
import { resetApp } from '@redux/actions/globalActions';
import { t } from '@lingui/macro';
import { RootState } from '@redux/store';

interface UserState {
  user: ConnectedUser;
  globalLoading: boolean;
  login: {
    loading: boolean;
    isAuthenticated: boolean;
  };
  forgotPassword: {
    loading: boolean;
  };
}

const initialState: UserState = {
  user: {} as ConnectedUser,
  globalLoading: false,
  login: {
    loading: false,
    isAuthenticated: false
  },
  forgotPassword: {
    loading: false
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
        state.globalLoading = true;
        setSession(action.payload.data);
      })
      .addCase(UserActions.login.rejected, (state, action: AnyAction) => {
        state.login.loading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(UserActions.refresh.fulfilled, (state, action: { payload: LoginResponse }) => {
        state.login.isAuthenticated = true;
        setSession(action.payload.data);
      })
      .addCase(UserActions.refresh.rejected, (state) => {
        state.globalLoading = false;
        state.login.isAuthenticated = false;
        state.user = initialState.user;
      })
      .addCase(UserActions.logout.fulfilled, (state) => {
        state.login.isAuthenticated = false;
        state.user = initialState.user;
        setSession(null);
      })
      .addCase(UserActions.logout.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(UserActions.forgotPassword.pending, (state) => {
        state.forgotPassword.loading = true;
      })
      .addCase(UserActions.forgotPassword.fulfilled, (state) => {
        state.forgotPassword.loading = false;
        enqueueSnackbar(t`Demande de réinitialisation de mot de passe envoyée`, {
          variant: 'success'
        });
      })
      .addCase(UserActions.forgotPassword.rejected, (state, action: AnyAction) => {
        state.forgotPassword.loading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(UserActions.getUser.pending, (state) => {
        state.globalLoading = true;
      })
      .addCase(
        UserActions.getUser.fulfilled,
        (state, action: { payload: GetConnectedUserResponse }) => {
          state.user = action.payload.data;
          state.globalLoading = false;
        }
      )
      .addCase(UserActions.getUser.rejected, (state, action: AnyAction) => {
        state.globalLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(
        UserActions.changeOrganizationView.fulfilled,
        (state, action: { payload: UpdateOrganizationViewResponse }) => {
          state.user = {
            ...state.user,
            currentOrganization: action.payload.data
          };
          enqueueSnackbar(action.payload.message.value, { variant: 'success' });
        }
      )
      .addCase(UserActions.changeOrganizationView.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(resetApp, (state) => {
        state.login.isAuthenticated = false;
        state.user = initialState.user;
        setSession(null);
      });
  }
});

export const selectIsOnMainOrganization = createSelector(
  (state: RootState) => state.connectedUser.user,
  (s) => s.currentOrganization?.id === s.mainOrganizationId
);

export default connectedUserSlice.reducer;
