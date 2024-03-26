import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetRolePermissionsRequest } from '@services/roles/interfaces';
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
