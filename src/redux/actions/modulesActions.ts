import { createAsyncThunk } from '@reduxjs/toolkit';
import * as ModulesServices from '@services/modules/modulesAPI';
import {
  CreateModuleRequest,
  GetModulesRequest,
  GetSingleModuleRequest
} from '@services/modules/interfaces';

export const getModulesAction = createAsyncThunk(
  'modules/list',
  async (arg: GetModulesRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.getModules(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const getSingleModuleAction = createAsyncThunk(
  'modules/fetchSingle',
  async (arg: GetSingleModuleRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.getSingleModule(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const createModuleAction = createAsyncThunk(
  'modules/create',
  async (args: CreateModuleRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.createModule(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);
