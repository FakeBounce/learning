import { t } from '@lingui/macro';
import {
  CreateOrganisationsRequest,
  CreateOrganisationsResponse,
  GetOrganisationsRequest,
  GetOrganisationsResponse,
  Organisation,
  UpdateOrganisationsBlockRequest,
  UpdateOrganisationsBlockResponse,
  UpdateOrganisationsRequest,
  UpdateOrganisationsResponse
} from '@services/organisations/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as OrganisationsServices from '@services/organisations/organisationsAPI';
import { AnyAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OrganisationState {
  currentOrganisation: {
    currentOrganisationData: Organisation | null;
    currentOrganisationLoading: boolean;
  };
  organisationList: {
    organisationListData: Organisation[];
    organisationListLoading: boolean;
    organisationListTotalCount: number | null;
  };
  organisationCreate: {
    organisationCreateLoading: boolean;
  };
  organisationUpdate: {
    organisationUpdateLoading: boolean;
  };
}

const initialState: OrganisationState = {
  currentOrganisation: {
    currentOrganisationData: null,
    currentOrganisationLoading: false
  },
  organisationList: {
    organisationListData: [],
    organisationListLoading: false,
    organisationListTotalCount: null
  },
  organisationCreate: {
    organisationCreateLoading: false
  },
  organisationUpdate: {
    organisationUpdateLoading: false
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

export const getSingleOrganisation = createAsyncThunk(
  'organisations/fetchSingle',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await OrganisationsServices.getSingleOrganisation(id);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const updateOrganisations = createAsyncThunk(
  'organisations/update',
  async (arg: UpdateOrganisationsRequest, { rejectWithValue }) => {
    try {
      const response = await OrganisationsServices.updateOrganisations(arg);
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
      /*
          Fetch Single Organisation Reducers
           */
      .addCase(getSingleOrganisation.pending, (state) => {
        state.currentOrganisation.currentOrganisationLoading = true;
      })
      .addCase(
        getSingleOrganisation.fulfilled,
        (state, action: { payload: UpdateOrganisationsResponse }) => {
          // Decide what to do with the response
          state.currentOrganisation.currentOrganisationLoading = false;
          state.currentOrganisation.currentOrganisationData = action.payload.data;
        }
      )
      .addCase(getSingleOrganisation.rejected, (state, action: AnyAction) => {
        state.currentOrganisation.currentOrganisationLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(`${errorMessage}`, { variant: 'error' });
      })
      /*
        List Organisation Reducers
         */
      .addCase(getOrganisationsList.pending, (state) => {
        state.organisationList.organisationListLoading = true;
        state.currentOrganisation.currentOrganisationData = null;
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
      /*
        Organisations Block Reducers
         */
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
      /*
            Update Organisation Reducers
            We update the current organisation data in .fullfilled cause that's the one we are currently viewing
            Through the fetch single organisation action
             */
      .addCase(updateOrganisations.pending, (state) => {
        state.organisationUpdate.organisationUpdateLoading = true;
      })
      .addCase(
        updateOrganisations.fulfilled,
        (state, action: { payload: UpdateOrganisationsResponse }) => {
          // Decide what to do with the response
          state.organisationUpdate.organisationUpdateLoading = false;
          state.currentOrganisation.currentOrganisationData = action.payload.data;
          enqueueSnackbar(t`Organisation enregistrée !`, { variant: 'success' });
        }
      )
      .addCase(updateOrganisations.rejected, (state, action: AnyAction) => {
        state.organisationUpdate.organisationUpdateLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(`${errorMessage}`, { variant: 'error' });
      })
      /*
        Create Organisation Reducers
         */
      .addCase(createOrganisations.pending, (state) => {
        state.organisationCreate.organisationCreateLoading = true;
      })
      .addCase(
        createOrganisations.fulfilled,
        (state, action: { payload: CreateOrganisationsResponse }) => {
          // Decide what to do with the response
          state.organisationCreate.organisationCreateLoading = false;
          state.currentOrganisation.currentOrganisationData = action.payload.data;
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
