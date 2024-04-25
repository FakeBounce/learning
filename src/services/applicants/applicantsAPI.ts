import {
  CreateApplicantRequest,
  CreateApplicantResponse,
  CreateBulkApplicantRequest,
  CreateBulkApplicantResponse,
  GetApplicantsListRequest,
  GetApplicantsListResponse,
  GetSingleApplicantResponse,
  UpdateApplicantBlockRequest,
  UpdateApplicantBlockResponse,
  UpdateApplicantPictureRequest,
  UpdateApplicantPictureResponse,
  UpdateApplicantRequest,
  UpdateApplicantResponse
} from '@services/applicants/interfaces';
import axios from '@utils/axios';
import { AxiosResponse } from 'axios';

export const getApplicants = async (
  args: GetApplicantsListRequest
): Promise<AxiosResponse<GetApplicantsListResponse>> => {
  const { currentPage, rowsPerPage, type, sort, filters } = args;

  return axios.post('/applicants/filter', {
    type,
    page: currentPage,
    rowPerPage: rowsPerPage,
    filters,
    sort
  });
};

export const getSingleApplicant = async (
  id: number
): Promise<AxiosResponse<GetSingleApplicantResponse>> => {
  return axios.get(`/applicants/${id}`);
};

export const updateApplicantBlock = async (
  args: UpdateApplicantBlockRequest
): Promise<AxiosResponse<UpdateApplicantBlockResponse>> => {
  const { applicantId, setActive } = args;
  const correctPath = setActive ? 'unblock' : 'block';

  // @todo Not working right now
  return axios.put(`/applicants/${applicantId}/${correctPath}`);
};

export const updateApplicant = async (
  args: UpdateApplicantRequest
): Promise<AxiosResponse<UpdateApplicantResponse>> => {
  const { applicantId, applicant } = args;

  const formData = { ...applicant };
  // if (args.profilePicture) {
  //   formData['profilePicture'] = args.profilePicture;
  // }

  return axios.put(`/applicants/${applicantId}`, formData);
};

export const updateApplicantPicture = async (
  args: UpdateApplicantPictureRequest
): Promise<AxiosResponse<UpdateApplicantPictureResponse>> => {
  const { applicantId, profilePicture } = args;

  return axios.postForm(
    `/applicants/${applicantId}/profile-picture`,
    { image: profilePicture },
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );
};

export const createApplicant = async (
  args: CreateApplicantRequest
): Promise<AxiosResponse<CreateApplicantResponse>> => {
  const applicantForApi = args.applicant;

  const formData = {
    ...applicantForApi,
    groups_id: args.applicant.groups
  };
  // if (args.profilePicture) {
  //   formData['profile_picture'] = args.profilePicture;
  // }

  return axios.post(`/applicants`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const createBulkApplicant = async (
  args: CreateBulkApplicantRequest
): Promise<AxiosResponse<CreateBulkApplicantResponse>> => {
  const { type, applicantList } = args;

  const applicantsForApi = {
    type,
    group_id: 1,
    applicants: applicantList
  };

  return axios.post(`/applicants/add-multiple`, applicantsForApi);
};
