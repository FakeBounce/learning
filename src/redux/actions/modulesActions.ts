import { createAsyncThunk } from '@reduxjs/toolkit';
import * as ModulesServices from '@services/modules/modulesAPI';
import { CreateModuleRequest } from '@services/modules/interfaces';

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
