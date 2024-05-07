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

  return axios.put(`/applicants/${applicantId}/${correctPath}`);
};

export const updateApplicant = async (
  args: UpdateApplicantRequest
): Promise<AxiosResponse<UpdateApplicantResponse>> => {
  const { applicantId, applicant } = args;

  const formData = { ...applicant };

  return axios.put(`/applicants/${applicantId}`, formData);
};

export const updateApplicantPicture = async (
  args: UpdateApplicantPictureRequest
): Promise<AxiosResponse<UpdateApplicantPictureResponse>> => {
  const { applicantId, profilePicture } = args;

  return axios.post(
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

  // @todo - Remove notifs cast when API is updated
  const formData = {
    ...applicantForApi,
    notifications: applicantForApi.notifications
      ? {
          email: applicantForApi.notifications
            ? applicantForApi.notifications?.email
              ? '1'
              : '0'
            : undefined,
          sms: applicantForApi.notifications
            ? applicantForApi.notifications?.sms
              ? '1'
              : '0'
            : undefined,
          app: applicantForApi.notifications
            ? applicantForApi.notifications?.app
              ? '1'
              : '0'
            : undefined
        }
      : undefined
  };

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
