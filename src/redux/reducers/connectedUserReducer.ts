import {
  UpdateOrganisationViewRequest,
  UpdateOrganisationViewResponse
} from '@services/connected-user/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as UserServices from '@services/connected-user/connectedUserAPI.ts';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { RootState } from '../store';

interface UserState {
  organisationId: number | null;
}

const initialState: UserState = {
  organisationId: null
};

export const changeOrganisationView = createAsyncThunk(
  'connected-user/changeOrganisationView',
  async (arg: UpdateOrganisationViewRequest, { rejectWithValue }) => {
    try {
      const response = await UserServices.updateOrganisationView(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const connectedUserSlice = createSlice({
  name: 'connectedUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // @todo : Define what to do when the action is pending
      .addCase(changeOrganisationView.pending, (_) => {})
      .addCase(
        changeOrganisationView.fulfilled,
        (state, action: { payload: UpdateOrganisationViewResponse }) => {
          state.organisationId = action.payload.data.id;
        }
      )
      .addCase(changeOrganisationView.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export const selectUserState = createSelector(
  (state: RootState) => state.user,
  (s) => s
);

export default connectedUserSlice.reducer;
