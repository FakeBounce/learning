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
  modulesCreate: {
    modulesCreateLoading: boolean;
  };
}
export const initialModulesState: ModulesState = {
  modulesList: {
    modulesListLoading: false,
    modulesListData: [],
    modulesListTotalCount: 0
  },
  modulesCreate: {
    modulesCreateLoading: false
  }
};

export const modulesSlice = createSlice({
  name: 'connectedUser',
  initialState: initialModulesState,
  reducers: {
    resetModuleState: () => initialModulesState
  },
  extraReducers: (builder) => {
    builder
      .addCase(ModulesActions.createModuleAction.pending, (state) => {
        state.modulesCreate.modulesCreateLoading = true;
      })
      .addCase(ModulesActions.createModuleAction.fulfilled, (state) => {
        state.modulesCreate.modulesCreateLoading = false;
        enqueueSnackbar(t`Le module à bien été créé`, { variant: 'success' });
      })
      .addCase(ModulesActions.createModuleAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ModulesActions.getModulesAction.pending, (state) => {
        state.modulesList.modulesListLoading = true;
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
      });
  }
});

export const { resetModuleState } = modulesSlice.actions;
export default modulesSlice.reducer;
