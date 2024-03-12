import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetApplicantsListRequest } from '@services/applicants/interfaces';
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

// export const toggleOrganizationsBlock = createAsyncThunk(
//     'organizations/toggleBlock',
//     async (arg: UpdateOrganizationsBlockRequest, { rejectWithValue }) => {
//         try {
//             const response = await organizationsServices.updateOrganizationsBlock(arg);
//             return response.data;
//         } catch (e: any) {
//             if (e.response.data) return rejectWithValue(e.response.data);
//             throw e;
//         }
//     }
// );
