import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetApplicantsListRequest,
  UpdateApplicantBlockRequest
} from '@services/applicants/interfaces';
import * as ApplicantsServices from '@services/applicants/applicantsAPI';

export const getApplicantsList = createAsyncThunk(
  'applicants/list',
  async (arg: GetApplicantsListRequest, { rejectWithValue }) => {
    try {
      const response = await ApplicantsServices.getApplicants(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const toggleApplicantBlock = createAsyncThunk(
  'applicants/toggleBlock',
  async (arg: UpdateApplicantBlockRequest, { rejectWithValue }) => {
    try {
      const response = await ApplicantsServices.updateApplicantBlock(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);
