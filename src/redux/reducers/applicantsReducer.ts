import {
  Applicant,
  ApplicantState,
  ApplicantType,
  CreateApplicantResponse,
  CreateBulkApplicantResponse,
  GetApplicantsListResponse,
  GetSingleApplicantResponse,
  UpdateApplicantBlockResponse,
  UpdateApplicantResponse
} from '@services/applicants/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as ApplicantsActions from '@redux/actions/applicantsActions';
import { AnyAction, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  convertApplicantArrayValues,
  convertApplicantValues
} from '@utils/helpers/convertApplicantValues';
import { t } from '@lingui/macro';

export const initialApplicantState: ApplicantState = {
  applicantList: {
    applicantListData: [],
    applicantListLoading: false,
    applicantListTotalCount: 0
  },
  applicantProfile: {
    applicantProfileData: null,
    applicantProfileLoading: false
  },
  applicantUpdate: {
    applicantUpdateLoading: false,
    isEditing: false
  },
  applicantCreate: {
    applicantCreateLoading: false
  },
  applicantBulk: {
    applicantBulkLoading: false
  }
};

export const applicantSlice = createSlice({
  name: 'applicants',
  initialState: initialApplicantState,
  reducers: {
    cancelEditingApplicant: (state) => {
      state.applicantUpdate.isEditing = false;
    },
    startEditingApplicant: (state) => {
      state.applicantUpdate.isEditing = true;
    },
    resetApplicantsLoading: (state) => {
      state.applicantList.applicantListLoading = false;
      state.applicantProfile.applicantProfileLoading = false;
      state.applicantUpdate.applicantUpdateLoading = false;
      state.applicantCreate.applicantCreateLoading = false;
      state.applicantBulk.applicantBulkLoading = false;
    },
    resetApplicantState: () => initialApplicantState
  },
  extraReducers: (builder) => {
    builder
      .addCase(ApplicantsActions.getApplicantsList.pending, (state) => {
        state.applicantList.applicantListLoading = true;
      })
      .addCase(
        ApplicantsActions.getApplicantsList.fulfilled,
        (state, action: { payload: GetApplicantsListResponse }) => {
          state.applicantList.applicantListLoading = false;
          state.applicantList.applicantListData = convertApplicantArrayValues(
            action.payload.data.rows
          );
          state.applicantList.applicantListTotalCount = action.payload.data.pagination.totalResults;
        }
      )
      .addCase(ApplicantsActions.getApplicantsList.rejected, (state, action: AnyAction) => {
        state.applicantList.applicantListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(
        ApplicantsActions.toggleApplicantBlock.fulfilled,
        (state, action: { payload: UpdateApplicantBlockResponse }) => {
          // Find the applicant in the list and update it
          const applicantIndex = selectApplicantFindId(state, action.payload.data.id);
          if (applicantIndex > -1) {
            state.applicantList.applicantListData[applicantIndex] = action.payload.data;
            enqueueSnackbar(t`Le statut de l'étudiant a bien été modifié`, { variant: 'success' });
          }
        }
      )
      .addCase(ApplicantsActions.toggleApplicantBlock.rejected, (_, action: AnyAction) => {
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(ApplicantsActions.getSingleApplicant.pending, (state) => {
        state.applicantProfile.applicantProfileLoading = true;
        state.applicantProfile.applicantProfileData = null;
      })
      .addCase(
        ApplicantsActions.getSingleApplicant.fulfilled,
        (state, action: { payload: GetSingleApplicantResponse }) => {
          state.applicantProfile.applicantProfileLoading = false;
          state.applicantProfile.applicantProfileData = convertApplicantValues(action.payload.data);
        }
      )
      .addCase(ApplicantsActions.getSingleApplicant.rejected, (state, action: AnyAction) => {
        state.applicantProfile.applicantProfileLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(ApplicantsActions.updateApplicant.pending, (state) => {
        state.applicantUpdate.applicantUpdateLoading = true;
      })
      .addCase(
        ApplicantsActions.updateApplicant.fulfilled,
        (state, action: { payload: UpdateApplicantResponse }) => {
          state.applicantUpdate.applicantUpdateLoading = false;
          state.applicantProfile.applicantProfileData = action.payload.data;
          state.applicantUpdate.isEditing = false;
          enqueueSnackbar(t`Les modifications ont bien été enregistrées`, { variant: 'success' });
        }
      )
      .addCase(ApplicantsActions.updateApplicant.rejected, (_state, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ApplicantsActions.createApplicant.pending, (state) => {
        state.applicantCreate.applicantCreateLoading = true;
      })
      .addCase(
        ApplicantsActions.createApplicant.fulfilled,
        (state, action: { payload: CreateApplicantResponse }) => {
          state.applicantCreate.applicantCreateLoading = false;
          const messageToDisplay =
            action.payload.data.type === ApplicantType.TESTER
              ? t`Le testeur à bien été enregistré`
              : t`L'étudiant à bien été enregistré`;
          enqueueSnackbar(messageToDisplay, { variant: 'success' });
        }
      )
      .addCase(ApplicantsActions.createApplicant.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      })
      .addCase(ApplicantsActions.createBulkApplicant.pending, (state) => {
        state.applicantBulk.applicantBulkLoading = true;
      })
      .addCase(
        ApplicantsActions.createBulkApplicant.fulfilled,
        (state, action: { payload: CreateBulkApplicantResponse }) => {
          state.applicantBulk.applicantBulkLoading = false;
          const messageToDisplay =
            action.payload.data.rows[0].type === ApplicantType.TESTER
              ? t`Les testeurs ont bien été enregistrés`
              : t`Les étudiants ont bien été enregistrés`;
          enqueueSnackbar(messageToDisplay, { variant: 'success' });
        }
      )
      .addCase(ApplicantsActions.createBulkApplicant.rejected, (_, action: AnyAction) => {
        throw action.payload?.message?.value || action.error.message;
      });
  }
});

export const selectApplicantFindId = createSelector(
  [(state: ApplicantState) => state.applicantList.applicantListData, (_, idToFind) => idToFind],
  (s, idToFind) => s.findIndex((applicant: Applicant) => applicant.id === idToFind)
);

export const {
  startEditingApplicant,
  cancelEditingApplicant,
  resetApplicantState,
  resetApplicantsLoading
} = applicantSlice.actions;

export default applicantSlice.reducer;
