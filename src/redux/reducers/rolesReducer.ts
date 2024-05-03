import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetRolesRequest, Role } from '@services/roles/interfaces';
import * as rolesServices from '@services/roles/rolesAPI';
import { enqueueSnackbar } from 'notistack';
import { AnyAction } from 'redux';
import { createRoleAction, updateRoleAction } from '@redux/actions/rolesActions';

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
    resetRolesState: () => rolesInitialState,
    setCurrentRole: (state, action) => {
      state.currentRole.currentRoleData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRolesList.pending, (state) => {
        state.rolesList.rolesListLoading = true;
        state.rolesList.rolesListData = [];
        state.currentRole.currentRoleData = null;
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
      })
      .addCase(createRoleAction.pending, (state) => {
        state.rolesCreate.rolesCreateLoading = true;
      })
      .addCase(createRoleAction.fulfilled, (state, action) => {
        state.rolesCreate.rolesCreateLoading = false;
        enqueueSnackbar(action.payload.message.value, { variant: 'success' });
      })
      .addCase(createRoleAction.rejected, (_state, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(updateRoleAction.pending, (state) => {
        state.rolesUpdate.rolesUpdateLoading = true;
      })
      .addCase(updateRoleAction.fulfilled, (state, action) => {
        state.rolesUpdate.rolesUpdateLoading = false;
        enqueueSnackbar(action.payload.message.value, { variant: 'success' });
      })
      .addCase(updateRoleAction.rejected, (_state, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      });
  }
});

export const { resetRolesState, setCurrentRole } = rolesSlice.actions;

export default rolesSlice.reducer;
