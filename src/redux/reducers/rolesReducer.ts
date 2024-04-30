import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetRolesRequest, Role } from '@services/roles/interfaces';
import * as rolesServices from '@services/roles/rolesAPI';
import { enqueueSnackbar } from 'notistack';
import { AnyAction } from 'redux';

interface RolesState {
  rolesList: {
    rolesListData: Role[];
    rolesListLoading: boolean;
    rolesListTotalCount: number;
  };
  currentRole: {
    currentRoleData: Role | null;
    currentRoleLoading: boolean;
  };
  rolesCreate: {
    rolesCreateLoading: boolean;
  };
  rolesUpdate: {
    rolesUpdateLoading: boolean;
  };
}

export const rolesInitialState: RolesState = {
  rolesList: {
    rolesListData: [],
    rolesListLoading: false,
    rolesListTotalCount: 0
  },
  currentRole: {
    currentRoleData: null,
    currentRoleLoading: false
  },
  rolesCreate: {
    rolesCreateLoading: false
  },
  rolesUpdate: {
    rolesUpdateLoading: false
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
  initialState: rolesInitialState,
  reducers: {
    resetRolesState: () => rolesInitialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRolesList.pending, (state) => {
        state.rolesList.rolesListLoading = true;
      })
      .addCase(getRolesList.fulfilled, (state, action) => {
        state.rolesList.rolesListData = action.payload.data.rows;
        state.rolesList.rolesListTotalCount = action.payload.data.pagination.totalResults;
        state.rolesList.rolesListLoading = false;
      })
      .addCase(getRolesList.rejected, (state, action: AnyAction) => {
        state.rolesList.rolesListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export const { resetRolesState } = rolesSlice.actions;

export default rolesSlice.reducer;
