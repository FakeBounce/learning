import { createAsyncThunk } from '@reduxjs/toolkit';
import * as ModulesServices from '@services/modules/modulesAPI';
import {
  CreateModuleMediaRequest,
  CreateModuleRequest,
  CreateModuleSubjectRequest,
  DeleteModuleMediaRequest,
  DeleteModuleSubjectRequest,
  GetModulesRequest,
  GetSingleModuleRequest,
  MoveModuleMediaRequest,
  MoveModuleSubjectRequest,
  UpdateModuleMediaRequest
} from '@services/modules/interfaces';

export const getModulesAction = createAsyncThunk(
  'modules/list',
  async (arg: GetModulesRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.getModules(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
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
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
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
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const createSubjectAction = createAsyncThunk(
  'modules/createSubject',
  async (args: CreateModuleSubjectRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.createSubject(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const deleteSubjectAction = createAsyncThunk(
  'modules/deleteSubject',
  async (args: DeleteModuleSubjectRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.deleteSubject(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const moveSubjectAction = createAsyncThunk(
  'modules/moveSubject',
  async (args: MoveModuleSubjectRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.moveSubject(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const createMediaAction = createAsyncThunk(
  'modules/createMedia',
  async (args: CreateModuleMediaRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.createMedia(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const deleteMediaAction = createAsyncThunk(
  'modules/deleteMedia',
  async (args: DeleteModuleMediaRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.deleteMedia(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const moveMediaAction = createAsyncThunk(
  'modules/moveMedia',
  async (args: MoveModuleMediaRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.moveMedia(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const updateMediaAction = createAsyncThunk(
  'modules/updateMedia',
  async (args: UpdateModuleMediaRequest, { rejectWithValue }) => {
    try {
      const response = await ModulesServices.updateMedia(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);
