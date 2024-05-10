import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateRoleRequest,
  DeleteRoleRequest,
  GetRolePermissionsRequest,
  GetRolesRequest,
  UpdateRoleRequest
} from '@services/roles/interfaces';
import * as RolesServices from '@services/roles/rolesAPI';

export const getRolePermissionsAction = createAsyncThunk(
  'roles/getRolePermissions',
  async (arg: GetRolePermissionsRequest, { rejectWithValue }) => {
    try {
      const response = await RolesServices.getRolePermissions(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const getRolesList = createAsyncThunk(
  'roles/list',
  async (arg: GetRolesRequest, { rejectWithValue }) => {
    try {
      const response = await RolesServices.getRoles(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const createRoleAction = createAsyncThunk(
  'roles/create',
  async (args: CreateRoleRequest, { rejectWithValue }) => {
    try {
      const response = await RolesServices.createRole(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const updateRoleAction = createAsyncThunk(
  'roles/update',
  async (args: UpdateRoleRequest, { rejectWithValue }) => {
    try {
      const response = await RolesServices.updateRole(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const deleteRoleAction = createAsyncThunk(
  'roles/delete',
  async (args: DeleteRoleRequest, { rejectWithValue }) => {
    try {
      const response = await RolesServices.deleteRole(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);
