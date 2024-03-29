import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetGroupsRequest } from '@services/groups/interfaces';
import * as GroupsServices from '@services/groups/groupsAPI';

export const getGroups = createAsyncThunk(
  'groups/getGroups',
  async (args: GetGroupsRequest, { rejectWithValue }) => {
    try {
     const response = await GroupsServices.getGroups(args);
     return response.data;
    } catch (e: any) {
      if (e.response.data) return rejectWithValue(e.response.data);
      throw e;
    }
  }
);