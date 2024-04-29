import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CreateGroupRequest,
  DeleteGroupRequest,
  GetGroupsRequest
} from '@services/groups/interfaces';
import * as GroupsServices from '@services/groups/groupsAPI';

export const getGroupsList = createAsyncThunk(
  'groups/list',
  async (arg: GetGroupsRequest, { rejectWithValue }) => {
    try {
      const response = await GroupsServices.getGroups(arg);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (args: DeleteGroupRequest, { rejectWithValue }) => {
    try {
      const response = await GroupsServices.deleteGroup(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);

export const createGroup = createAsyncThunk(
  'groups/create',
  async (args: CreateGroupRequest, { rejectWithValue }) => {
    try {
      const response = await GroupsServices.createGroup(args);
      return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);
