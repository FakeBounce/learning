import { t } from '@lingui/macro';
import {
  CreateorganizationsRequest,
  CreateorganizationsResponse,
  GetOrganizationsRequest,
  GetOrganizationsResponse,
  Organization,
  updateOrganizationsBlockRequest,
  updateOrganizationsBlockResponse,
  updateOrganizationsRequest,
  updateOrganizationsResponse
} from '@services/organizations/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as organizationsServices from '@services/organizations/organizationsAPI';
import { AnyAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface organizationState {
  currentOrganization: {
    currentOrganizationData: Organization | null;
    currentOrganizationLoading: boolean;
  };
  organizationList: {
    organizationListData: Organization[];
    organizationListLoading: boolean;
    organizationListTotalCount: number | null;
  };
  organizationCreate: {
    organizationCreateLoading: boolean;
  };
  organizationUpdate: {
    organizationUpdateLoading: boolean;
  };
}

const initialState: organizationState = {
  currentOrganization: {
    currentOrganizationData: null,
    currentOrganizationLoading: false
  },
  organizationList: {
    organizationListData: [],
    organizationListLoading: false,
    organizationListTotalCount: null
  },
  organizationCreate: {
    organizationCreateLoading: false
  },
  organizationUpdate: {
    organizationUpdateLoading: false
  }
};

export const createOrganizations = createAsyncThunk(
  'organizations/create',
  async (arg: CreateorganizationsRequest, { rejectWithValue }) => {
    try {
      const response = await organizationsServices.createOrganizations(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const getSingleOrganization = createAsyncThunk(
  'organizations/fetchSingle',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await organizationsServices.getSingleOrganization(id);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const updateOrganizations = createAsyncThunk(
  'organizations/update',
  async (arg: updateOrganizationsRequest, { rejectWithValue }) => {
    try {
      const response = await organizationsServices.updateOrganizations(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const getOrganizationsList = createAsyncThunk(
  'organizations/list',
  async (arg: GetOrganizationsRequest, { rejectWithValue }) => {
    try {
      const response = await organizationsServices.getorganizations(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const toggleOrganizationsBlock = createAsyncThunk(
  'organizations/toggleBlock',
  async (arg: updateOrganizationsBlockRequest, { rejectWithValue }) => {
    try {
      const response = await organizationsServices.updateOrganizationsBlock(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*
          Fetch Single organization Reducers
           */
      .addCase(getSingleOrganization.pending, (state) => {
        state.currentOrganization.currentOrganizationLoading = true;
      })
      .addCase(
        getSingleOrganization.fulfilled,
        (state, action: { payload: updateOrganizationsResponse }) => {
          // Decide what to do with the response
          state.currentOrganization.currentOrganizationLoading = false;
          state.currentOrganization.currentOrganizationData = action.payload.data;
        }
      )
      .addCase(getSingleOrganization.rejected, (state, action: AnyAction) => {
        state.currentOrganization.currentOrganizationLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(`${errorMessage}`, { variant: 'error' });
      })
      /*
        List organization Reducers
         */
      .addCase(getOrganizationsList.pending, (state) => {
        state.organizationList.organizationListLoading = true;
        state.currentOrganization.currentOrganizationData = null;
      })
      .addCase(
        getOrganizationsList.fulfilled,
        (state, action: { payload: GetOrganizationsResponse }) => {
          state.organizationList.organizationListLoading = false;
          state.organizationList.organizationListData = action.payload.data.rows;
          state.organizationList.organizationListTotalCount =
            action.payload.data.pagination.total_results;
        }
      )
      .addCase(getOrganizationsList.rejected, (state, action: AnyAction) => {
        state.organizationList.organizationListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      /*
        organizations Block Reducers
         */
      //  @todo Should we display loading ?
      .addCase(toggleOrganizationsBlock.pending, (_) => {})
      .addCase(
        toggleOrganizationsBlock.fulfilled,
        (state, action: { payload: updateOrganizationsBlockResponse }) => {
          // Find the organization in the list and update it
          const organizationIndex = state.organizationList.organizationListData.findIndex(
            (org) => org.id === action.payload.data.id
          );
          if (organizationIndex > -1) {
            state.organizationList.organizationListData[organizationIndex] = action.payload.data;
          }
        }
      )
      .addCase(toggleOrganizationsBlock.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      /*
            Update organization Reducers
            We update the current organization data in .fullfilled cause that's the one we are currently viewing
            Through the fetch single organization action
             */
      .addCase(updateOrganizations.pending, (state) => {
        state.organizationUpdate.organizationUpdateLoading = true;
      })
      .addCase(
        updateOrganizations.fulfilled,
        (state, action: { payload: updateOrganizationsResponse }) => {
          // Decide what to do with the response
          state.organizationUpdate.organizationUpdateLoading = false;
          state.currentOrganization.currentOrganizationData = action.payload.data;
          enqueueSnackbar(t`organization enregistrée !`, { variant: 'success' });
        }
      )
      .addCase(updateOrganizations.rejected, (state, action: AnyAction) => {
        state.organizationUpdate.organizationUpdateLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(`${errorMessage}`, { variant: 'error' });
      })
      /*
        Create organization Reducers
         */
      .addCase(createOrganizations.pending, (state) => {
        state.organizationCreate.organizationCreateLoading = true;
      })
      .addCase(
        createOrganizations.fulfilled,
        (state, action: { payload: CreateorganizationsResponse }) => {
          // Decide what to do with the response
          state.organizationCreate.organizationCreateLoading = false;
          state.currentOrganization.currentOrganizationData = action.payload.data;
          enqueueSnackbar(t`organization enregistrée !`, { variant: 'success' });
        }
      )
      .addCase(createOrganizations.rejected, (state, action: AnyAction) => {
        state.organizationCreate.organizationCreateLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        // @todo This is a temporary solution, we should handle the error message in a better way
        // Get first key of object data in payload.data and use it as the error message
        const specificError = action.payload.data[Object.keys(action.payload.data)[0]][0];

        enqueueSnackbar(`${errorMessage} : ${specificError}`, { variant: 'error' });
      });
  }
});

export const selectorganizationState = createSelector(
  (state: RootState) => state.organizations,
  (s) => s
);

export default organizationSlice.reducer;
