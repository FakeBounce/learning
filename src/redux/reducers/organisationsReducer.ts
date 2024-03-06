import { t } from '@lingui/macro';
import {
  CreateOrganisationsResponse,
  GetOrganisationsResponse,
  Organisation,
  UpdateOrganisationsBlockResponse,
  UpdateOrganisationsResponse
} from '@services/organisations/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as OrganisationsActions from '../actions/organisationsActions';
import { AnyAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { changeOrganisationView } from '@redux/reducers/connectedUserReducer';

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

export const organisationSlice = createSlice({
  name: 'organisations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*
          Fetch Single Organisation Reducers
           */
      .addCase(OrganisationsActions.getSingleOrganisation.pending, (state) => {
        state.currentOrganisation.currentOrganisationLoading = true;
      })
      .addCase(
        OrganisationsActions.getSingleOrganisation.fulfilled,
        (state, action: { payload: UpdateOrganisationsResponse }) => {
          // Decide what to do with the response
          state.currentOrganisation.currentOrganisationLoading = false;
          state.currentOrganisation.currentOrganisationData = action.payload.data;
        }
      )
      .addCase(OrganisationsActions.getSingleOrganisation.rejected, (state, action: AnyAction) => {
        state.currentOrganisation.currentOrganisationLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(`${errorMessage}`, { variant: 'error' });
      })
      /*
        List Organisation Reducers
         */
      .addCase(OrganisationsActions.getOrganisationsList.pending, (state) => {
        state.organisationList.organisationListLoading = true;
        state.currentOrganisation.currentOrganisationData = null;
      })
      .addCase(
        OrganisationsActions.getOrganisationsList.fulfilled,
        (state, action: { payload: GetOrganisationsResponse }) => {
          state.organisationList.organisationListLoading = false;
          state.organisationList.organisationListData = action.payload.data.rows;
          state.organisationList.organisationListTotalCount =
            action.payload.data.pagination.total_results;
        }
      )
      .addCase(OrganisationsActions.getOrganisationsList.rejected, (state, action: AnyAction) => {
        state.organisationList.organisationListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      /*
        Organisations Block Reducers
         */
      //  @todo Should we display loading ?
      .addCase(OrganisationsActions.toggleOrganisationsBlock.pending, (_) => {})
      .addCase(
        OrganisationsActions.toggleOrganisationsBlock.fulfilled,
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
      .addCase(OrganisationsActions.toggleOrganisationsBlock.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      /*
            Update Organisation Reducers
            We update the current organisation data in .fullfilled cause that's the one we are currently viewing
            Through the fetch single organisation action
             */
      .addCase(OrganisationsActions.updateOrganisations.pending, (state) => {
        state.organisationUpdate.organisationUpdateLoading = true;
      })
      .addCase(
        OrganisationsActions.updateOrganisations.fulfilled,
        (state, action: { payload: UpdateOrganisationsResponse }) => {
          // Decide what to do with the response
          state.organisationUpdate.organisationUpdateLoading = false;
          state.currentOrganisation.currentOrganisationData = action.payload.data;
          enqueueSnackbar(t`Organisation enregistrée !`, { variant: 'success' });
        }
      )
      .addCase(OrganisationsActions.updateOrganisations.rejected, (state, action: AnyAction) => {
        state.organisationUpdate.organisationUpdateLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(`${errorMessage}`, { variant: 'error' });
      })
      /*
        Create Organisation Reducers
         */
      .addCase(OrganisationsActions.createOrganisations.pending, (state) => {
        state.organisationCreate.organisationCreateLoading = true;
      })
      .addCase(
        OrganisationsActions.createOrganisations.fulfilled,
        (state, action: { payload: CreateOrganisationsResponse }) => {
          // Decide what to do with the response
          state.organisationCreate.organisationCreateLoading = false;
          state.currentOrganisation.currentOrganisationData = action.payload.data;
          enqueueSnackbar(t`Organisation enregistrée !`, { variant: 'success' });
        }
      )
      .addCase(OrganisationsActions.createOrganisations.rejected, (state, action: AnyAction) => {
        state.organisationCreate.organisationCreateLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        // @todo This is a temporary solution, we should handle the error message in a better way
        // Get first key of object data in payload.data and use it as the error message
        const specificError = action.payload.data[Object.keys(action.payload.data)[0]][0];

        enqueueSnackbar(`${errorMessage} : ${specificError}`, { variant: 'error' });
      })
      .addCase(changeOrganisationView.fulfilled, (state) => {
        state.organisationList = initialState.organisationList;
        state.currentOrganisation = initialState.currentOrganisation;
      });
  }
});

export const selectOrganisationState = createSelector(
  (state: RootState) => state.organisations,
  (s) => s
);

export default organisationSlice.reducer;
