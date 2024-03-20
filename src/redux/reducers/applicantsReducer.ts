import {
  Applicant,
  GetApplicantsListResponse,
  GetSingleApplicantResponse
} from '@services/applicants/interfaces';
import { enqueueSnackbar } from 'notistack';
import * as ApplicantsActions from '@redux/actions/applicantsActions';
import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { convertApplicantValues } from '@utils/helpers/convertApplicantValues';

export interface ApplicantState {
  applicantList: {
    applicantListData: Applicant[];
    applicantListLoading: boolean;
    applicantListTotalCount: number | null;
  };
  applicantProfile: {
    applicantProfileData: Applicant | null;
    applicantProfileLoading: boolean;
  };
}

const initialState: ApplicantState = {
  applicantList: {
    applicantListData: [],
    applicantListLoading: false,
    applicantListTotalCount: 0
  },
  applicantProfile: {
    applicantProfileData: null,
    applicantProfileLoading: false
  }
};

export const applicantSlice = createSlice({
  name: 'applicants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ApplicantsActions.getApplicantsList.pending, (state) => {
        state.applicantList.applicantListLoading = true;
      })
      .addCase(
        ApplicantsActions.getApplicantsList.fulfilled,
        (state, action: { payload: GetApplicantsListResponse }) => {
          state.applicantList.applicantListLoading = false;
          state.applicantList.applicantListData = action.payload.data.rows;
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
      });
  }
});

export default applicantSlice.reducer;
