import { enqueueSnackbar } from 'notistack';
import { createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { t } from '@lingui/macro';
import * as ModulesActions from '../actions/modulesActions';
import { Module } from '@services/modules/interfaces';

export interface ModulesState {
  modulesList: {
    modulesListLoading: boolean;
    modulesListData: Module[];
    modulesListTotalCount: number;
  };
  modulesCurrent: {
    modulesCurrentLoading: boolean;
    modulesCurrentData: Module | null;
    modulesCurrentIsEditing: boolean;
  };
  modulesCreate: {
    modulesCreateLoading: boolean;
  };
  modulesUpdate: {
    modulesUpdateLoading: boolean;
  };
}
export const initialModulesState: ModulesState = {
  modulesList: {
    modulesListLoading: false,
    modulesListData: [],
    modulesListTotalCount: 0
  },
  modulesCurrent: {
    modulesCurrentLoading: false,
    modulesCurrentData: null,
    modulesCurrentIsEditing: false
  },
  modulesCreate: {
    modulesCreateLoading: false
  },
  modulesUpdate: {
    modulesUpdateLoading: false
  }
};

export const modulesSlice = createSlice({
  name: 'connectedUser',
  initialState: initialModulesState,
  reducers: {
    resetModuleState: () => initialModulesState,
    startEditingModule: (state) => {
      state.modulesCurrent.modulesCurrentIsEditing = true;
    },
    cancelEditingModule: (state) => {
      state.modulesCurrent.modulesCurrentIsEditing = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(ModulesActions.createModuleAction.pending, (state) => {
        state.modulesCreate.modulesCreateLoading = true;
      })
      .addCase(ModulesActions.createModuleAction.fulfilled, (state) => {
        state.modulesCreate.modulesCreateLoading = false;
        enqueueSnackbar(t`Le module à bien été créé`, {
          variant: 'success'
        });
      })
      .addCase(ModulesActions.createModuleAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.getModulesAction.pending, (state) => {
        state.modulesList.modulesListLoading = true;
        state.modulesList.modulesListData = [];
      })
      .addCase(ModulesActions.getModulesAction.fulfilled, (state, action) => {
        state.modulesList.modulesListLoading = false;
        state.modulesList.modulesListData = action.payload.data.rows;
        state.modulesList.modulesListTotalCount = action.payload.data.pagination.totalResults;
      })
      .addCase(ModulesActions.getModulesAction.rejected, (state, action: AnyAction) => {
        state.modulesList.modulesListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(ModulesActions.getSingleModuleAction.pending, (state) => {
        state.modulesCurrent.modulesCurrentLoading = true;
      })
      .addCase(ModulesActions.getSingleModuleAction.fulfilled, (state, action) => {
        state.modulesCurrent.modulesCurrentLoading = false;
        state.modulesCurrent.modulesCurrentData = action.payload.data;
      })
      .addCase(ModulesActions.getSingleModuleAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      });
  }
});

export const { resetModuleState, startEditingModule, cancelEditingModule } = modulesSlice.actions;
export default modulesSlice.reducer;
