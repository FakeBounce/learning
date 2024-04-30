import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateRoleRequest, GetRolePermissionsRequest } from '@services/roles/interfaces';
import * as RolesServices from '@services/roles/rolesAPI';

export const getRolePermissions = createAsyncThunk(
  'roles/getRolePermissions',
  async (arg: GetRolePermissionsRequest, { rejectWithValue }) => {
    try {
      const response = await RolesServices.getRolePermissions(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
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
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);
