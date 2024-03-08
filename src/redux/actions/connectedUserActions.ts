import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest, UpdateOrganizationViewRequest } from '@services/connected-user/interfaces';
import * as UserServices from '@services/connected-user/connectedUserAPI';

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
