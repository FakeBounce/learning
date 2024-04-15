import {
  BulkUserRequest,
  GetUsersRequest,
  UpdateUserBlockRequest,
  UpdateUserRequest
} from '@services/users/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as UsersServices from '@services/users/usersAPI';

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

export const createBulkUser = createAsyncThunk(
  'users/createBulk',
  async (arg: BulkUserRequest, { rejectWithValue }) => {
    try {
      const response = await UsersServices.createBulkUser(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);
