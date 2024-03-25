import {
  ApplicantState,
  GetApplicantsListResponse,
  GetSingleApplicantResponse,
  UpdateApplicantResponse
} from '@services/applicants/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as ApplicantsActions from '@redux/actions/applicantsActions';
import { AnyAction, createSlice } from '@reduxjs/toolkit';
import {
  convertApplicantArrayValues,
  convertApplicantValues
} from '@utils/helpers/convertApplicantValues';
import { t } from '@lingui/macro';
import { pascalizeObject } from '@utils/helpers/convertCasing';

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
    applicantCreateLoading: false,
    hasCreated: false
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
    resetCreatingApplicant: (state) => {
      state.applicantCreate.hasCreated = false;
    }
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
          // @todo : Remove this line when the API will be ready
          state.applicantList.applicantListTotalCount = 2;
          // state.applicantList.applicantListTotalCount =
          //   action.payload.data.pagination.total_results;
        }
      )
      .addCase(ApplicantsActions.getApplicantsList.rejected, (state, action: AnyAction) => {
        state.applicantList.applicantListLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(ApplicantsActions.getSingleApplicant.pending, (state) => {
        state.applicantProfile.applicantProfileLoading = true;
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
          state.applicantProfile.applicantProfileData = pascalizeObject(action.payload.data);
          state.applicantUpdate.isEditing = false;
          enqueueSnackbar(t`Les modifications ont bien été enregistrées`, { variant: 'success' });
        }
      )
      .addCase(ApplicantsActions.updateApplicant.rejected, (state, action: AnyAction) => {
        state.applicantUpdate.applicantUpdateLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      })
      .addCase(ApplicantsActions.createApplicant.pending, (state) => {
        state.applicantCreate.applicantCreateLoading = true;
        state.applicantCreate.hasCreated = false;
      })
      .addCase(ApplicantsActions.createApplicant.fulfilled, (state) => {
        state.applicantCreate.applicantCreateLoading = false;
        state.applicantCreate.hasCreated = true;
        enqueueSnackbar(t`L'étudiant à bien été enregistré`, { variant: 'success' });
      })
      .addCase(ApplicantsActions.createApplicant.rejected, (state, action: AnyAction) => {
        state.applicantCreate.applicantCreateLoading = false;
        const errorMessage = action.payload?.message?.value || action.error.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      });
  }
});

export const { startEditingApplicant, cancelEditingApplicant, resetCreatingApplicant } =
  applicantSlice.actions;

export default applicantSlice.reducer;
