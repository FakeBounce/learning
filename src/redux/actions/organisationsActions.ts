import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateOrganisationsRequest,
  GetOrganisationsRequest,
  UpdateOrganisationsBlockRequest,
  UpdateOrganisationsRequest
} from '@services/organisations/interfaces';
import * as OrganisationsServices from '@services/organisations/organisationsAPI';

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
