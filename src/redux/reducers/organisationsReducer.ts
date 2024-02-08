import {
  GetOrganisationsRequest,
  GetOrganisationsResponse,
  Organisation,
  UpdateOrganisationsBlockRequest,
  UpdateOrganisationsBlockResponse
} from '@services/organisations/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as OrganisationsServices from '@services/organisations/organisationsAPI';
import { AnyAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OrganisationState {
  organisation: Organisation | undefined;
  organisationList: {
    organisationListData: Organisation[];
    organisationListLoading: boolean;
    organisationListTotalCount: number | null;
  };
}

const initialState: OrganisationState = {
  organisation: {} as Organisation,
  organisationList: {
    organisationListData: [],
    organisationListLoading: false,
    organisationListTotalCount: null
  }
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

export const toggleOrganisationsBlock = createAsyncThunk(
  'organisations/toggleBlock',
  async (arg: UpdateOrganisationsBlockRequest, { rejectWithValue }) => {
    try {
      const response = await OrganisationsServices.updateOrganisationsBlock(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const organisationSlice = createSlice({
  name: 'organisations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganisationsList.pending, (state) => {
        state.organisationList.organisationListLoading = true;
      })
      .addCase(
        getOrganisationsList.fulfilled,
        (state, action: { payload: GetOrganisationsResponse }) => {
          state.organisationList.organisationListLoading = false;
          state.organisationList.organisationListData = action.payload.data.rows;
          state.organisationList.organisationListTotalCount =
            action.payload.data.pagination.total_results;
        }
      )
      .addCase(getOrganisationsList.rejected, (state, action: AnyAction) => {
        state.organisationList.organisationListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      //  @todo Should we display loading ?
      .addCase(toggleOrganisationsBlock.pending, (_) => {})
      .addCase(
        toggleOrganisationsBlock.fulfilled,
        (state, action: { payload: UpdateOrganisationsBlockResponse }) => {
          // Find the organisation in the list and update it
          const organisationIndex = state.organisationList.organisationListData.findIndex(
            (org) => org.id === action.payload.data.id
          );
          if (organisationIndex > -1) {
            state.organisationList.organisationListData[organisationIndex] = action.payload.data;
          }
        }
      )
      .addCase(toggleOrganisationsBlock.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export const selectOrganisationState = createSelector(
  (state: RootState) => state.organisations,
  (s) => s
);

export default organisationSlice.reducer;
