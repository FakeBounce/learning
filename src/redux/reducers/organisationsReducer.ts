import { t } from '@lingui/macro';
import {
  CreateOrganisationsRequest,
  CreateOrganisationsResponse,
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
  organisationCreate: {
    organisationCreateLoading: boolean;
    organisationCreateData: Organisation | null;
  };
}

const initialState: OrganisationState = {
  organisation: {} as Organisation,
  organisationCreate: {
    organisationCreateLoading: false,
    organisationCreateData: null
  },
  organisationList: {
    organisationListData: [],
    organisationListLoading: false,
    organisationListTotalCount: null
  }
};

export const createOrganisations = createAsyncThunk(
  'organisations/create',
  async (arg: CreateOrganisationsRequest, { rejectWithValue }) => {
    try {
      const response = await OrganisationsServices.createOrganisations(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

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

          // @todo This is probably a temporary solution
          // The back should return the correct amount of total results, despite adding a new organisation
          let mergedDatas = action.payload.data.rows;
          let totalResults = action.payload.data.pagination.total_results;

          if (state.organisationCreate.organisationCreateData !== null) {
            mergedDatas = [state.organisationCreate.organisationCreateData, ...mergedDatas];
            totalResults += 1;
          }

          state.organisationList.organisationListData = mergedDatas;
          state.organisationList.organisationListTotalCount = totalResults;
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
      })
      .addCase(createOrganisations.pending, (state) => {
        state.organisationCreate.organisationCreateLoading = true;
      })
      .addCase(
        createOrganisations.fulfilled,
        (state, action: { payload: CreateOrganisationsResponse }) => {
          // Decide what to do with the response
          state.organisationCreate.organisationCreateLoading = false;
          state.organisationCreate.organisationCreateData = action.payload.data;
          enqueueSnackbar(t`Organisation enregistrée !`, { variant: 'success' });
        }
      )
      .addCase(createOrganisations.rejected, (state, action: AnyAction) => {
        state.organisationCreate.organisationCreateLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        // @todo This is a temporary solution, we should handle the error message in a better way
        // Get first key of object data in payload.data and use it as the error message
        const specificError = action.payload.data[Object.keys(action.payload.data)[0]][0];

        enqueueSnackbar(`${errorMessage} : ${specificError}`, { variant: 'error' });
      });
  }
});

export const selectOrganisationState = createSelector(
  (state: RootState) => state.organisations,
  (s) => s
);

export default organisationSlice.reducer;
