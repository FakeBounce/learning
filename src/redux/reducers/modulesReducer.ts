import { enqueueSnackbar } from 'notistack';
import { createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { t } from '@lingui/macro';
import * as ModulesActions from '../actions/modulesActions';
import { initialModuleState } from '@services/modules/interfaces';

export const modulesSlice = createSlice({
  name: 'connectedUser',
  initialState: initialModuleState,
  reducers: {
    resetModuleState: () => initialModuleState
  },
  extraReducers: (builder) => {
    builder
      .addCase(ModulesActions.createModuleAction.pending, (state) => {
        state.moduleCreate.moduleCreateLoading = true;
      })
      .addCase(ModulesActions.createModuleAction.fulfilled, (state) => {
        state.moduleCreate.moduleCreateLoading = false;
        enqueueSnackbar(t`Le module à bien été créé`, { variant: 'success' });
      })
      .addCase(ModulesActions.createModuleAction.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      });
  }
});

export const { resetModuleState } = modulesSlice.actions;
export default modulesSlice.reducer;
