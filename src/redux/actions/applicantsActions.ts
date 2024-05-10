import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateApplicantRequest,
  CreateBulkApplicantRequest,
  GetApplicantsListRequest,
  UpdateApplicantBlockRequest,
  UpdateApplicantPictureRequest,
  UpdateApplicantRequest
} from '@services/applicants/interfaces';
import * as ApplicantsServices from '@services/applicants/applicantsAPI';

export const getApplicantsList = createAsyncThunk(
  'applicants/list',
  async (arg: GetApplicantsListRequest, { rejectWithValue }) => {
    try {
      const response = await ApplicantsServices.getApplicants(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const getSingleApplicant = createAsyncThunk(
  'applicants/fetchSingle',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await ApplicantsServices.getSingleApplicant(id);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
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
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const updateApplicant = createAsyncThunk(
  'applicants/update',
  async (
    args: {
      applicantId: number;
      updateArgs: UpdateApplicantRequest;
      profilePicture?: File;
    },
    { rejectWithValue }
  ) => {
    try {
      const promises = [];
      const { updateArgs, profilePicture } = args;
      if (Object.keys(updateArgs.applicant).length > 0) {
        promises.push(ApplicantsServices.updateApplicant(updateArgs));
      }

      if (profilePicture) {
        promises.push(
          ApplicantsServices.updateApplicantPicture({
            applicantId: args.applicantId,
            profilePicture
          })
        );
      }
      const response = await Promise.all(promises);
      return response[response.length - 1].data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const updateApplicantPicture = createAsyncThunk(
  'applicants/updatePicture',
  async (arg: UpdateApplicantPictureRequest, { rejectWithValue }) => {
    try {
      const response = await ApplicantsServices.updateApplicantPicture(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const createApplicant = createAsyncThunk(
  'applicants/create',
  async (args: CreateApplicantRequest, { rejectWithValue }) => {
    try {
      const response = await ApplicantsServices.createApplicant(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const createBulkApplicant = createAsyncThunk(
  'applicants/createBulk',
  async (args: CreateBulkApplicantRequest, { rejectWithValue }) => {
    try {
      const response = await ApplicantsServices.createBulkApplicant(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);
