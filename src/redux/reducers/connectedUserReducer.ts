import {
  GetConnectedUserResponse,
  LoginResponse,
  UpdateOrganizationViewResponse,
  ConnectedUser,
  ConnectedUserOrganization
} from '@services/connected-user/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as UserActions from '../actions/connectedUserActions';
import { createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { setSession } from '@utils/axios/session';
import { resetApp } from '@redux/actions/globalActions';
import { pascalizeObject } from '@utils/helpers/convertCasing';

interface UserState {
  user: ConnectedUser;
  mainOrganization: ConnectedUserOrganization;
  globalLoading: boolean;
  login: {
    loading: boolean;
    isAuthenticated: boolean;
  };
}

const initialState: UserState = {
  user: {} as ConnectedUser,
  mainOrganization: {} as ConnectedUserOrganization,
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
        state.globalLoading = true;
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
      .addCase(UserActions.getUser.pending, (state) => {
        state.globalLoading = true;
      })
      .addCase(
        UserActions.getUser.fulfilled,
        (state, action: { payload: GetConnectedUserResponse }) => {
          const newUser = pascalizeObject(action.payload.data);
          // @todo : Remove this when the when API type fixed
          state.user = {
            ...newUser,
            currentOrganization: newUser.currentOrganisation,
            currentOrganisation: undefined
          };
          if (newUser.currentOrganisation.isMain) {
            state.mainOrganization = { ...newUser.currentOrganisation };
          }
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
            currentOrganization: pascalizeObject(action.payload.data)
          };
          enqueueSnackbar(action.payload.message.value, { variant: 'success' });
        }
      )
      .addCase(UserActions.changeOrganizationView.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(resetApp, (state) => {
        state.login.isAuthenticated = false;
        state.user = initialState.user;
        setSession(null);
      });
  }
});

export default connectedUserSlice.reducer;
