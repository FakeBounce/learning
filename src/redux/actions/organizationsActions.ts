import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateOrganizationsRequest,
  GetOrganizationsRequest,
  UpdateOrganizationsBlockRequest,
  UpdateOrganizationsRequest
} from '@services/organizations/interfaces';
import * as OrganizationsServices from '@services/organizations/organizationsAPI';

export const createOrganizations = createAsyncThunk(
  'organizations/create',
  async (arg: CreateOrganizationsRequest, { rejectWithValue }) => {
    try {
      const response = await OrganizationsServices.createOrganizations(arg);
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
      const response = await OrganizationsServices.getSingleOrganization(id);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const updateOrganizations = createAsyncThunk(
  'organizations/update',
  async (arg: UpdateOrganizationsRequest, { rejectWithValue }) => {
    try {
      const response = await OrganizationsServices.updateOrganizations(arg);
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
      const response = await OrganizationsServices.getOrganizations(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const toggleOrganizationsBlock = createAsyncThunk(
  'organizations/toggleBlock',
  async (arg: UpdateOrganizationsBlockRequest, { rejectWithValue }) => {
    try {
      const response = await OrganizationsServices.updateOrganizationsBlock(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);
