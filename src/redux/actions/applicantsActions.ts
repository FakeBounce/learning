import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateApplicantRequest,
  GetApplicantsListRequest,
  UpdateApplicantBlockRequest,
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
      if (e.response.data) return rejectWithValue(e.response.data);
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

export const updateApplicant = createAsyncThunk(
  'applicants/update',
  async (arg: UpdateApplicantRequest, { rejectWithValue }) => {
    try {
      const response = await ApplicantsServices.updateApplicant(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
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
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);