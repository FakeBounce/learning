import {
  GetConnectedUserResponse,
  LoginRequest,
  LoginResponse,
  UpdateOrganizationViewRequest,
  UpdateOrganizationViewResponse,
  User
} from '@services/connected-user/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as UserServices from '@services/connected-user/connectedUserAPI';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { setSession } from '@utils/axios/session';

interface UserState {
  user: User;
  globalLoading: boolean;
  login: {
    loading: boolean;
    isAuthenticated: boolean;
  };
}

const initialState: UserState = {
  user: {
    organizationId: undefined
  } as User,
  globalLoading: false,
  login: {
    loading: false,
    isAuthenticated: false
  }
};

export const changeOrganizationView = createAsyncThunk(
  'connectedUser/changeOrganizationView',
  async (arg: UpdateOrganizationViewRequest, { rejectWithValue }) => {
    try {
      const response = await UserServices.updateOrganizationView(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const getUser = createAsyncThunk('connectedUser/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await UserServices.getUser();
    return response.data;
  } catch (e: any) {
    if (e.response.data) return rejectWithValue(e.response.data);
    throw e;
  }
});

export const login = createAsyncThunk(
  'connectedUser/login',
  async (arg: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await UserServices.login(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const refresh = createAsyncThunk('connectedUser/refresh', async (_, { rejectWithValue }) => {
  try {
    const response = await UserServices.refresh();
    return response.data;
  } catch (e: any) {
    if (e.response.data) return rejectWithValue(e.response.data);
    throw e;
  }
});

export const logout = createAsyncThunk('connectedUser/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await UserServices.logout();
    return response.data;
  } catch (e: any) {
    if (e.response.data) return rejectWithValue(e.response.data);
    throw e;
  }
});

export const connectedUserSlice = createSlice({
  name: 'connectedUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(login.fulfilled, (state, action: { payload: LoginResponse }) => {
        state.login.loading = false;
        state.login.isAuthenticated = true;
        setSession(action.payload.data);
      })
      .addCase(login.rejected, (state, action: AnyAction) => {
        state.login.loading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(refresh.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(refresh.fulfilled, (state, action: { payload: LoginResponse }) => {
        state.login.loading = false;
        state.login.isAuthenticated = true;
        setSession(action.payload.data);
      })
      .addCase(refresh.rejected, (state) => {
        state.login.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.login.isAuthenticated = false;
        state.user = initialState.user;
        setSession(null);
      })
      .addCase(logout.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(getUser.pending, (state) => {
        state.globalLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action: { payload: GetConnectedUserResponse }) => {
        state.user = {
          ...action.payload.data,
          organizationId: action.payload.data.organization_id,
          emailVerifiedAt: action.payload.data.email_verified_at,
          useDoubleAuth: action.payload.data.use_double_auth,
          isActive: action.payload.data.is_active
        };
        state.globalLoading = false;
      })
      .addCase(getUser.rejected, (state, action: AnyAction) => {
        state.globalLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })

      // @todo : Define what to do when the action is pending
      .addCase(changeOrganizationView.pending, () => {})
      .addCase(
        changeOrganizationView.fulfilled,
        (state, action: { payload: UpdateOrganizationViewResponse }) => {
          state.user = {
            ...state.user,
            organizationId: action.payload.data.id
          };
          enqueueSnackbar(action.payload.message.value, { variant: 'success' });
        }
      )
      .addCase(changeOrganizationView.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export default connectedUserSlice.reducer;
