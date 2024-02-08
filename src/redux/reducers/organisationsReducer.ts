import {
  GetOrganisationsRequest,
  GetOrganisationsResponse,
  Organisation
} from '@services/organisations/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as OrganisationsServices from '@services/organisations/organisationsAPI';
import { AnyAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OrganisationState {
  organisation: Organisation | undefined;
  organisationListLoading: boolean;
  organisationListError: string | undefined;
  organisationList: any;
  organisationListTotalCount: number | null;
}

const initialState: OrganisationState = {
  organisation: {} as Organisation,
  organisationListLoading: false,
  organisationListError: undefined,
  organisationList: [],
  organisationListTotalCount: null
};

export const getOrganisationsList = createAsyncThunk(
  'organisations/list',
  async (arg: GetOrganisationsRequest, { rejectWithValue }) => {
    try {
      const response = await OrganisationsServices.getOrganisations(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const organisationSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganisationsList.pending, (state) => {
        state.organisationListLoading = true;
        state.organisationListError = undefined;
      })
      .addCase(
        getOrganisationsList.fulfilled,
        (state, action: { payload: GetOrganisationsResponse }) => {
          state.organisationListLoading = false;
          state.organisationList = action.payload.data.rows;
          state.organisationListTotalCount = action.payload.data.pagination.total_results;
        }
      )
      .addCase(getOrganisationsList.rejected, (state, action: AnyAction) => {
        state.organisationListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export const selectOrganisationListState = createSelector(
  (state: RootState) => state.organisationList,
  (s) => s
);

export default organisationSlice.reducer;
