import { t } from '@lingui/macro';
import {
  CreateOrganizationsResponse,
  GetOrganizationsResponse,
  Organization,
  UpdateOrganizationsBlockResponse,
  UpdateOrganizationsResponse
} from '@services/organizations/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as OrganizationsActions from '../actions/organizationsActions';
import { AnyAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { changeOrganizationView } from '@redux/actions/connectedUserActions';
import { RootState } from '@redux/store';

interface OrganizationState {
  currentOrganization: {
    currentOrganizationData: Organization | null;
    currentOrganizationLoading: boolean;
  };
  organizationList: {
    organizationListData: Organization[];
    organizationListLoading: boolean;
    organizationListTotalCount: number;
  };
  organizationCreate: {
    organizationCreateLoading: boolean;
  };
  organizationUpdate: {
    organizationUpdateLoading: boolean;
  };
}

const initialState: OrganizationState = {
  currentOrganization: {
    currentOrganizationData: null,
    currentOrganizationLoading: false
  },
  organizationList: {
    organizationListData: [],
    organizationListLoading: false,
    organizationListTotalCount: 0
  },
  organizationCreate: {
    organizationCreateLoading: false
  },
  organizationUpdate: {
    organizationUpdateLoading: false
  }
};

export const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    resetOrganizationState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      /**
          Fetch Single organization Reducers
           **/
      .addCase(OrganizationsActions.getSingleOrganization.pending, (state) => {
        state.currentOrganization.currentOrganizationLoading = true;
      })
      .addCase(
        OrganizationsActions.getSingleOrganization.fulfilled,
        (state, action: { payload: UpdateOrganizationsResponse }) => {
          // Decide what to do with the response
          state.currentOrganization.currentOrganizationLoading = false;
          state.currentOrganization.currentOrganizationData = action.payload.data;
        }
      )
      .addCase(OrganizationsActions.getSingleOrganization.rejected, (state, action: AnyAction) => {
        state.currentOrganization.currentOrganizationLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(`${errorMessage}`, { variant: 'error' });
      })
      /**
        List organization Reducers
         **/
      .addCase(OrganizationsActions.getOrganizationsList.pending, (state) => {
        state.organizationList.organizationListLoading = true;
        state.currentOrganization.currentOrganizationData = null;
      })
      .addCase(
        OrganizationsActions.getOrganizationsList.fulfilled,
        (state, action: { payload: GetOrganizationsResponse }) => {
          state.organizationList.organizationListLoading = false;
          state.organizationList.organizationListData = action.payload.data.rows;
          state.organizationList.organizationListTotalCount =
            action.payload.data.pagination.totalResults;
        }
      )
      .addCase(OrganizationsActions.getOrganizationsList.rejected, (state, action: AnyAction) => {
        state.organizationList.organizationListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      /**
        organizations Block Reducers
         **/
      //  @todo Should we display loading ?
      .addCase(OrganizationsActions.toggleOrganizationsBlock.pending, (_) => {})
      .addCase(
        OrganizationsActions.toggleOrganizationsBlock.fulfilled,
        (state, action: { payload: UpdateOrganizationsBlockResponse }) => {
          // Find the organization in the list and update it
          const organizationIndex = selectOrganizationFindId(state, action.payload.data.id);
          if (organizationIndex > -1) {
            state.organizationList.organizationListData[organizationIndex] = action.payload.data;
          }
        }
      )
      .addCase(OrganizationsActions.toggleOrganizationsBlock.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      /**
            Update organization Reducers
            We update the current organization data in .fullfilled cause that's the one we are currently viewing
            Through the fetch single organization action
             **/
      .addCase(OrganizationsActions.updateOrganizations.pending, (state) => {
        state.organizationUpdate.organizationUpdateLoading = true;
      })
      .addCase(
        OrganizationsActions.updateOrganizations.fulfilled,
        (state, action: { payload: UpdateOrganizationsResponse }) => {
          // Decide what to do with the response
          state.organizationUpdate.organizationUpdateLoading = false;
          state.currentOrganization.currentOrganizationData = action.payload.data;
          enqueueSnackbar(t`Organisation enregistrée !`, { variant: 'success' });
        }
      )
      .addCase(OrganizationsActions.updateOrganizations.rejected, (state, action: AnyAction) => {
        state.organizationUpdate.organizationUpdateLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(`${errorMessage}`, { variant: 'error' });
      })
      /**
        Create organization Reducers
         **/
      .addCase(OrganizationsActions.createOrganizations.pending, (state) => {
        state.organizationCreate.organizationCreateLoading = true;
      })
      .addCase(
        OrganizationsActions.createOrganizations.fulfilled,
        (state, action: { payload: CreateOrganizationsResponse }) => {
          // Decide what to do with the response
          state.organizationCreate.organizationCreateLoading = false;
          state.currentOrganization.currentOrganizationData = action.payload.data;
          enqueueSnackbar(t`Organisation enregistrée !`, { variant: 'success' });
        }
      )
      .addCase(OrganizationsActions.createOrganizations.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(changeOrganizationView.fulfilled, (state) => {
        state.organizationList = initialState.organizationList;
        state.currentOrganization = initialState.currentOrganization;
      });
  }
});

export const selectOrganizationFindId = createSelector(
  [
    (state: OrganizationState) => state.organizationList.organizationListData,
    (_, idToFind) => idToFind
  ],
  (s, idToFind) => s.findIndex((org: Organization) => org.id === idToFind)
);

export const selectOrganizationsList = createSelector(
  (state: RootState) => state.organizations.organizationList,
  (s) => s
);
export const { resetOrganizationState } = organizationSlice.actions;

export default organizationSlice.reducer;
