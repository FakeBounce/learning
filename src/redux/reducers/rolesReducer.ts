import { createSlice } from '@reduxjs/toolkit';
import { Role } from '@services/roles/interfaces';
import { enqueueSnackbar } from 'notistack';
import { AnyAction } from 'redux';
import * as RolesActions from '@redux/actions/rolesActions';
import { Permissions } from '@services/permissions/interfaces';

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
  rolesDelete: {
    rolesDeleteLoading: boolean;
  };
  rolesPermissions: {
    rolesPermissionsLoading: boolean;
    rolesPermissionsData: Permissions | null;
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
  },
  rolesDelete: {
    rolesDeleteLoading: false
  },
  rolesPermissions: {
    rolesPermissionsLoading: false,
    rolesPermissionsData: null
  }
};

export const rolesSlice = createSlice({
  name: 'roles',
  initialState: rolesInitialState,
  reducers: {
    resetRolesState: () => rolesInitialState,
    resetUpdateRoleState: (state) => {
      state.rolesUpdate.rolesUpdateLoading = false;
    },
    resetDeleteRoleState: (state) => {
      state.rolesDelete.rolesDeleteLoading = false;
    },
    setCurrentRole: (state, action) => {
      state.currentRole.currentRoleData = action.payload;
    },
    removeRoleFromList: (state, action) => {
      state.rolesList.rolesListData = state.rolesList.rolesListData.filter(
        (role) => role.id !== action.payload
      );
      state.rolesList.rolesListTotalCount -= 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(RolesActions.getRolesList.pending, (state) => {
        state.rolesList.rolesListLoading = true;
        state.rolesList.rolesListData = [];
        state.currentRole.currentRoleData = null;
      })
      .addCase(RolesActions.getRolesList.fulfilled, (state, action) => {
        state.rolesList.rolesListData = action.payload.data.rows;
        state.rolesList.rolesListTotalCount = action.payload.data.pagination.totalResults;
        state.rolesList.rolesListLoading = false;
      })
      .addCase(RolesActions.getRolesList.rejected, (state, action: AnyAction) => {
        state.rolesList.rolesListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(RolesActions.createRoleAction.pending, (state) => {
        state.rolesCreate.rolesCreateLoading = true;
      })
      .addCase(RolesActions.createRoleAction.fulfilled, (state, action) => {
        state.rolesCreate.rolesCreateLoading = false;
        enqueueSnackbar(action.payload.message.value, { variant: 'success' });
      })
      .addCase(RolesActions.createRoleAction.rejected, (_state, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(RolesActions.updateRoleAction.pending, (state) => {
        state.rolesUpdate.rolesUpdateLoading = true;
      })
      .addCase(RolesActions.updateRoleAction.fulfilled, (state, action) => {
        state.rolesUpdate.rolesUpdateLoading = false;
        enqueueSnackbar(action.payload.message.value, { variant: 'success' });
      })
      .addCase(RolesActions.updateRoleAction.rejected, (_state, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(RolesActions.deleteRoleAction.pending, (state) => {
        state.rolesDelete.rolesDeleteLoading = true;
      })
      .addCase(RolesActions.deleteRoleAction.fulfilled, (state, action) => {
        state.rolesDelete.rolesDeleteLoading = false;
        enqueueSnackbar(action.payload.message.value, { variant: 'success' });
      })
      .addCase(RolesActions.deleteRoleAction.rejected, (_state, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(RolesActions.getRolePermissionsAction.pending, (state) => {
        state.rolesPermissions.rolesPermissionsLoading = true;
        state.rolesPermissions.rolesPermissionsData = null;
      })
      .addCase(RolesActions.getRolePermissionsAction.fulfilled, (state, action) => {
        state.rolesPermissions.rolesPermissionsLoading = false;
        state.rolesPermissions.rolesPermissionsData = action.payload.data;
      })
      .addCase(RolesActions.getRolePermissionsAction.rejected, (_state, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      });
  }
});

export const {
  resetRolesState,
  resetUpdateRoleState,
  resetDeleteRoleState,
  setCurrentRole,
  removeRoleFromList
} = rolesSlice.actions;

export default rolesSlice.reducer;
