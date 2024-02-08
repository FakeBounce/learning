import {
  UpdateOrganisationViewRequest,
  UpdateOrganisationViewResponse
} from '@services/user/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as UserServices from '@services/user/userAPI';
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
  'user/changeOrganisationView',
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

export const userSlice = createSlice({
  name: 'user',
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

export default userSlice.reducer;
