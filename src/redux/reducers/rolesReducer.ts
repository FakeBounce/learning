import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetRolesRequest, Role } from '@services/roles/interfaces';
import * as rolesServices from '@services/roles/rolesAPI';
import { enqueueSnackbar } from 'notistack';
import { AnyAction } from 'redux';
import { pascalizeObject } from '@utils/helpers/convertCasing';

interface RolesState {
  rolesList: {
    rolesListData: Role[];
    rolesListLoading: boolean;
    rolesListTotalCount: number;
  };
}

const initialState: RolesState = {
  rolesList: {
    rolesListData: [],
    rolesListLoading: false,
    rolesListTotalCount: 0
  }
};

export const getRolesList = createAsyncThunk(
  'roles/list',
  async (arg: GetRolesRequest, { rejectWithValue }) => {
    try {
      const response = await rolesServices.getRoles(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRolesList.pending, (state) => {
        state.rolesList.rolesListLoading = true;
      })
      .addCase(getRolesList.fulfilled, (state, action) => {
        state.rolesList.rolesListData = pascalizeObject(action.payload.data.rows);
        state.rolesList.rolesListTotalCount = action.payload.data.pagination.total_results;
        state.rolesList.rolesListLoading = false;
      })
      .addCase(getRolesList.rejected, (state, action: AnyAction) => {
        state.rolesList.rolesListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export default rolesSlice.reducer;
